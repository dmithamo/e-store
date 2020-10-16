/* eslint-disable indent */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../../common/components/Button';
import Input from '../../common/components/Input';
import { RootState } from '../../common/store/rootReducer';
import AuthFormWrapper from './AuthFormWrapper';
import VerifyAccountPage from './VerifyAccountPage';
import { createAccount } from './utils/businessLogic';
import { registerUserFail, registerUserSuccess } from './utils/stateMgmt';
import validateCredentials from './utils/validators';

export type Credentials = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type CreateAccountFormProps = {};

const CreateAccountForm: React.FC<CreateAccountFormProps> = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  type ValidationErrors = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [isValidPageOne, setIsValidPageOne] = useState(true);
  const [isValidPageTwo, setIsValidPageTwo] = useState(true);
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
  });

  const { user, isRegistered, error } = useSelector(
    (state: RootState) => state.auth,
  );

  function handleInput(e: FormEvent) {
    const { name, value, type } = e.target as HTMLTextAreaElement;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    setValidationErrors({
      ...validationErrors,
      [name]: validateCredentials([{ name, value, type }])[name],
      repeatPassword: '',
    });

    setIsValidPageOne(true);
    setIsValidPageTwo(true);
  }

  function validatePageOne() {
    const errs = validateCredentials([
      { name: 'firstName', type: 'text', value: credentials.firstName },
      { name: 'lastName', type: 'text', value: credentials.lastName },
      {
        name: 'phoneNumber',
        type: 'tel',
        value: credentials.phoneNumber,
      },
    ]);

    setValidationErrors({
      ...validationErrors,
      ...errs,
    });

    const pageOneValid =
      errs.firstName === '' && errs.lastName === '' && errs.phoneNumber === '';

    setIsValidPageOne(pageOneValid);
    setPageNumber(pageOneValid ? 2 : 1);
  }

  function validatePageTwo() {
    let errs = validateCredentials([
      { name: 'email', type: 'email', value: credentials.email },
      { name: 'password', type: 'password', value: credentials.password },
    ]);

    errs = {
      ...errs,
      repeatPassword:
        credentials.password === credentials.repeatPassword
          ? ''
          : 'passwords do not match',
    };

    setValidationErrors({
      ...validationErrors,
      ...errs,
    });

    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validatePageTwo();

    const pageTwoValid =
      errs.email === '' && errs.password === '' && errs.repeatPassword === '';

    setIsValidPageTwo(pageTwoValid);

    if (pageTwoValid) {
      try {
        setIsLoading(true);
        const [createdSuccessfully, res] = await createAccount(credentials);
        if (createdSuccessfully) {
          dispatch(
            registerUserSuccess({
              email: res.email,
              phoneNumber: credentials.phoneNumber,
            }),
          );
        } else {
          dispatch(
            registerUserFail({
              error: res,
            }),
          );
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        registerUserFail({ error: err });
      }
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

  return (
    <AuthFormWrapper>
      {error && <div className="error-container">{error}</div>}
      <form
        autoComplete="off"
        method=""
        onSubmit={(e: FormEvent) => {
          handleSubmit(e);
        }}
      >
        <h2 className="form-header title">Sign up to get started</h2>
        <span className="form-pagination">
          <Button
            title="Step 1 of 2"
            category="link"
            type="button"
            onClick={() => {
              setPageNumber(1);
            }}
          >
            <FontAwesomeIcon icon="arrow-alt-circle-left" />
          </Button>
          <Button
            title="Step 2 of 2"
            category="link"
            type="button"
            onClick={() => {
              validatePageOne();
            }}
            disabled={!isValidPageOne}
          >
            <FontAwesomeIcon icon="arrow-alt-circle-right" />
          </Button>
        </span>

        {pageNumber === 1 && (
          <div className="page-one">
            <Input
              required
              type="text"
              name="firstName"
              placeholder="eg Deniece"
              label="First name"
              value={credentials.firstName}
              onChange={(e: FormEvent) => {
                handleInput(e);
              }}
              error={validationErrors.firstName}
            />
            <Input
              required
              type="text"
              name="lastName"
              placeholder="eg Muthoni"
              label="Last name"
              value={credentials.lastName}
              onChange={(e: FormEvent) => {
                handleInput(e);
              }}
              error={validationErrors.lastName}
            />
            <Input
              required
              type="tel"
              name="phoneNumber"
              placeholder="eg 0700112233"
              label="Mobile number"
              value={credentials.phoneNumber}
              onChange={(e: FormEvent) => {
                handleInput(e);
              }}
              error={validationErrors.phoneNumber}
            />

            <div className="buttons">
              <Button
                type="submit"
                onClick={() => {
                  validatePageOne();
                }}
                disabled={!isValidPageOne}
              >
                <span>Next</span>
                <FontAwesomeIcon icon="arrow-right" />
              </Button>
            </div>
          </div>
        )}

        {pageNumber === 2 && (
          <div className="page-two">
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
              error={
                validationErrors.password || validationErrors.repeatPassword
              }
            />
            <Input
              required
              type="password"
              name="repeatPassword"
              placeholder="eg exBd3Qwert"
              label="Repeat Password"
              hasHideToggle
              value={credentials.repeatPassword}
              onChange={(e: FormEvent) => {
                handleInput(e);
              }}
              error={validationErrors.repeatPassword}
            />

            <div className="buttons">
              <Button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                disabled={!isValidPageTwo}
              >
                <span>Create your account</span>
                <FontAwesomeIcon icon="arrow-right" />
              </Button>
            </div>
          </div>
        )}
      </form>
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
