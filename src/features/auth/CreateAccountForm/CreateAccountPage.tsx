/* eslint-disable no-console */
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../../../common/components/Button';
import { RootState } from '../../../common/store/rootReducer';
import AuthFormWrapper from '../AuthFormWrapper';
import VerifyAccountPage from '../VerifyAccountPage';
import { createAccount } from '../utils/businessLogic';
import { registerUserFail, registerUserSuccess } from '../utils/stateMgmt';
import CAPageOne from './CAPageOne';
import CAPageTwo from './CAPageTwo';
import CAPageThree from './CAPageThree';

export type Credentials = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword: string;
  dob: string;
  nationalID: string;
  gender: string;
};

type CreateAccountFormProps = {};

const CreateAccountForm: React.FC<CreateAccountFormProps> = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState<Credentials>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
    dob: '',
    nationalID: '',
    gender: '',
  });

  const { user, isRegistered, error } = useSelector(
    (state: RootState) => state.auth,
  );

  function handleNavigation(
    offset: number,
    currentPageCreds: Partial<Credentials>,
  ) {
    setCredentials({ ...credentials, ...currentPageCreds });
    setPageNumber(pageNumber + offset);
  }

  function handleCredentialsChange({
    name,
    value,
  }: {
    [name: string]: string;
  }) {
    setCredentials({ ...credentials, [name]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const [successfullyRegistered, res] = await createAccount(credentials);
      console.log(successfullyRegistered, res);

      if (successfullyRegistered) {
        dispatch(registerUserSuccess(res));
      } else {
        dispatch(registerUserFail(res));
      }
    } catch (err) {
      dispatch(registerUserFail(err));
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isRegistered && !user.isVerified) {
    return <VerifyAccountPage />;
  }

  if (user.isVerified) {
    return <Redirect to="/" />;
  }

  const renderPageHelper = (pgNumber: number) => {
    switch (pgNumber) {
      case 1:
        return (
          <CAPageOne
            onClickNext={handleNavigation}
            credentials={{
              firstName: credentials.firstName,
              lastName: credentials.lastName,
              phoneNumber: credentials.phoneNumber,
            }}
            onCredentialsChange={handleCredentialsChange}
          />
        );
      case 2:
        return (
          <CAPageTwo
            onClickNext={handleNavigation}
            onClickPrev={handleNavigation}
            credentials={{
              email: credentials.email,
              password: credentials.password,
              repeatPassword: credentials.repeatPassword,
            }}
            onCredentialsChange={handleCredentialsChange}
          />
        );
      default:
        return (
          <CAPageThree
            onClickNext={handleSubmit}
            onClickPrev={handleNavigation}
            credentials={{
              dob: credentials.dob,
              nationalID: credentials.nationalID,
              gender: credentials.gender,
            }}
            onCredentialsChange={handleCredentialsChange}
          />
        );
    }
  };
  return (
    <AuthFormWrapper>
      {error && <div className="error-container">{error}</div>}

      <h2 className="form-header title">Sign up to get started</h2>

      {renderPageHelper(pageNumber)}

      <div className="redirect">
        <Button
          onClick={() => history.push('/sign-in')}
          category="link"
          value="Already have an account? Sign in instead"
        />
      </div>
    </AuthFormWrapper>
  );
};

export default CreateAccountForm;
