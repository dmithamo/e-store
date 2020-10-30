/* eslint-disable indent */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../../common/components/Button';
import Input from '../../common/components/Input';
import { RootState } from '../../common/store/rootReducer';
import AuthFormWrapper from './AuthFormWrapper';
import { signIn } from './utils/businessLogic';
import {
  clearFormErrs,
  loginUserFailure,
  loginUserSuccess,
} from './utils/stateMgmt';
import validateCredentials from './utils/validators';

type SignInFormProps = {};

const SigninForm: React.FC<SignInFormProps> = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  type ValidationErrors = {
    email: string;
    password: string;
  };
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const {
    user: { isLoggedIn, isVerified, roleId },
    error,
  } = useSelector((state: RootState) => state.auth);

  function handleInput(e: FormEvent) {
    const { name, value } = e.target as HTMLTextAreaElement;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });
  }

  function validateForm() {
    let errs = validateCredentials([
      { name: 'email', type: 'email', value: credentials.email },
      { name: 'password', type: 'password', value: credentials.password },
    ]);

    errs = {
      ...errs,
      password: errs.password.includes('not a valid option')
        ? ''
        : errs.password,
    };
    setValidationErrors({
      ...validationErrors,
      ...errs,
    });
    return errs;
  }

  async function handleSubmit() {
    const errs = validateForm();
    const formIsValid = errs.email === '' && errs.password === '';

    if (formIsValid) {
      try {
        setIsLoading(true);
        const [isSuccessfullySignedIn, res] = await signIn(credentials);
        setIsLoading(false);
        if (isSuccessfullySignedIn) {
          sessionStorage.setItem('token', res.token);
          dispatch(
            loginUserSuccess({
              userID: res.userId,
              roleID: res.roleId,
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
              isVerified: true,
              created: res.created_at || new Date(),
            }),
          );
        } else {
          dispatch(loginUserFailure({ message: res }));
        }
      } catch (err) {
        dispatch(loginUserFailure({ message: err.message }));
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (isLoggedIn && isVerified) {
    return <Redirect to={roleId === 1 ? '/admin/accounts' : '/shop'} />;
  }

  if (isLoggedIn && !isVerified) {
    return <Redirect to="/verify-account" />;
  }

  const renderPageHelper = () => (
    <>
      <Input
        required
        type="email"
        name="email"
        placeholder="eg dmuthoni@email.com"
        label="Email address"
        value={credentials.email}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.email}
      />
      <Input
        required
        type="password"
        name="password"
        placeholder="eg exBd3Qwert"
        label="Password"
        hasHideToggle
        value={credentials.password}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.password}
      />

      <Button
        type="submit"
        onClick={() => {
          handleSubmit();
        }}
        disabled={validationErrors.email !== '' || isLoading}
      >
        <span>Sign in</span>
        <FontAwesomeIcon icon="arrow-right" />
      </Button>
    </>
  );

  const formFooter = () => (
    <Button
      onClick={() => history.push('/sign-up')}
      category="link"
      value="New here? Create a free account"
    />
  );

  return (
    <AuthFormWrapper
      header="Sign in"
      footer={formFooter}
      error={error}
      isLoading={isLoading}
      onCloseErrorBox={() => {
        dispatch(clearFormErrs());
      }}
      formInputs={() => renderPageHelper()}
      formName="sign-in"
    />
  );
};

export default SigninForm;
