import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../../../common/components/Button';
import { RootState } from '../../../common/store/rootReducer';
import AuthFormWrapper from '../AuthFormWrapper';
import { createAccount } from '../utils/businessLogic';
import {
  clearFormErrs,
  registerUserFail,
  registerUserSuccess,
} from '../utils/stateMgmt';
import CAPageOne from './CAPageOne';
import CAPageThree from './CAPageThree';
import CAPageTwo from './CAPageTwo';

export type Credentials = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  password: string;
  repeatPassword: string;
  dob: string;
  nationalId: string;
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
    mobileNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
    dob: '',
    nationalId: '',
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

  async function handleSubmit() {
    try {
      setIsLoading(true);
      const [successfullyRegistered, res] = await createAccount(credentials);

      if (successfullyRegistered) {
        sessionStorage.setItem('token', res.token);
        dispatch(
          registerUserSuccess({
            userID: res.userId,
            token: res.token,
            email: credentials.email,
          }),
        );
      } else {
        dispatch(registerUserFail({ message: res.message }));
      }
    } catch (err) {
      dispatch(registerUserFail({ message: err.message }));
    } finally {
      setIsLoading(false);
    }
  }

  if (isRegistered && !user.isVerified) {
    return <Redirect to="/verify-account" />;
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
              mobileNumber: credentials.mobileNumber,
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
              nationalId: credentials.nationalId,
              gender: credentials.gender,
            }}
            onCredentialsChange={handleCredentialsChange}
          />
        );
    }
  };

  const formFooter = () => (
    <Button
      onClick={() => history.push('/sign-in')}
      category="link"
      value="Already have an account? Sign in instead"
    />
  );

  return (
    <AuthFormWrapper
      header="Sign up to get started"
      footer={formFooter}
      error={error}
      isLoading={isLoading}
      onCloseErrorBox={() => {
        dispatch(clearFormErrs());
      }}
      formInputs={() => renderPageHelper(pageNumber)}
      formName="sign-up"
    />
  );
};

export default CreateAccountForm;
