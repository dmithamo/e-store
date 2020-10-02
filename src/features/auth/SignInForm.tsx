/* eslint-disable indent */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../../common/components/Button';
import Input from '../../common/components/Input';
import { RootState } from '../../common/store/rootReducer';
import HTTPClient from '../../http-client';
import AuthFormWrapper from './AuthFormWrapper';
import { loginUserSuccess } from './utils/stateMgmt';
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

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateForm();
    const formIsValid = errs.email === '' && errs.password === '';

    if (formIsValid) {
      try {
        setIsLoading(true);
        const res = await HTTPClient.post('/auth', credentials);
        setIsLoading(false);
        if (res.status === 201) {
          dispatch(
            loginUserSuccess({
              email: res.data.email,
              avatar: '',
              phoneNumber: res.data.phoneNumber,
              userID: res.data.userID,
            }),
          );
          return;
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <AuthFormWrapper>
      <form
        autoComplete="off"
        method=""
        onSubmit={(e: FormEvent) => {
          handleSubmit(e);
        }}
      >
        <h2 className="form-header title">Sign in now</h2>

        <div className="page-one" style={{ padding: '3em 0' }}>
          <Input
            required
            type="email"
            name="email"
            placeholder="eg johnlark@email.com"
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

          <div className="buttons">
            <Button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
              disabled={validationErrors.email !== ''}
            >
              <span>Sign in</span>
              <FontAwesomeIcon icon="arrow-right" />
            </Button>
          </div>
        </div>
      </form>
      <div className="redirect">
        <Button
          onClick={() => history.push('/sign-up')}
          category="link"
          value="New here? Create an account for free"
        />
      </div>
    </AuthFormWrapper>
  );
};

export default SigninForm;
