import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/colors';
import Button from '../../common/components/Button';
import Input from '../../common/components/Input';
import { RootState } from '../../common/store/rootReducer';
import AuthFormWrapper from './AuthFormWrapper';

type CreateAccountFormProps = {};

const CreateAccountForm: React.FC<CreateAccountFormProps> = (): JSX.Element => {
  const [pageNumber, setPageNumber] = useState(1);
  const [credentials, setCredentials] = useState({
    userType: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  function handleInput(e: FormEvent) {
    setCredentials({
      ...credentials,
      [(e.target as HTMLTextAreaElement)
        .name]: (e.target as HTMLTextAreaElement).value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  const { isLoading } = useSelector((state: RootState) => state.auth);
  const history = useHistory();

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <AuthFormWrapper>
      <StyledCreateAccountForm>
        <form
          autoComplete="off"
          method=""
          onSubmit={(e: FormEvent) => {
            handleSubmit(e);
          }}
        >
          <h2 className="form-header">Sign up to get started</h2>
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
                setPageNumber(2);
              }}
            >
              <FontAwesomeIcon icon="arrow-alt-circle-right" />
            </Button>
          </span>

          {pageNumber === 1 && (
            <div className="page-one">
              <Input
                required
                type="text"
                name="firstname"
                placeholder="Enter your first name"
                label="First name"
                value={credentials.firstname}
                onChange={(e: FormEvent) => {
                  handleInput(e);
                }}
              />
              <Input
                required
                type="text"
                name="lastname"
                placeholder="Enter your last name"
                label="Last name"
                value={credentials.lastname}
                onChange={(e: FormEvent) => {
                  handleInput(e);
                }}
              />
              <Input
                required
                type="text"
                name="phoneNumber"
                placeholder="Enter your mobile phone number"
                label="Mobile number"
                value={credentials.phoneNumber}
                onChange={(e: FormEvent) => {
                  handleInput(e);
                }}
              />

              <div className="buttons">
                <Button
                  type="submit"
                  onClick={() => {
                    setPageNumber(2);
                  }}
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
                placeholder="Enter your email address"
                label="Email address"
                value={credentials.email}
                onChange={(e: FormEvent) => {
                  handleInput(e);
                }}
              />
              <Input
                required
                type="password"
                name="password"
                placeholder="Create a strong password"
                label="Password"
                value={credentials.password}
                onChange={(e: FormEvent) => {
                  handleInput(e);
                }}
              />
              <Input
                required
                type="password"
                name="repeatPassword"
                placeholder="Re-type your password"
                label="Repeat Password"
                value={credentials.repeatPassword}
                onChange={(e: FormEvent) => {
                  handleInput(e);
                }}
              />

              <div className="buttons">
                <Button
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
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
      </StyledCreateAccountForm>
    </AuthFormWrapper>
  );
};

const StyledCreateAccountForm = styled.div`
  /* box-shadow: 0 0 2px 2px ${colors.veryLightBlack};   */
  background-color: ${colors.white};
  padding: 4em 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 15px 15px 0;

  h2.form-header {
    margin-bottom: 0.2em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  span.form-pagination {
    padding: 0.5em 0;
    font-size: 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
  }

  form {
    padding: 0.1em;
    width: 90%;
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
    }

    label {
      margin-bottom: 2em;
    }

    div.buttons {
      width: 100%;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  div.redirect {
    margin-top: 3em;
  }
`;

export default CreateAccountForm;
