import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/colors';
import Button from '../../common/components/Button';
import Input from '../../common/components/Input';
import AuthFormWrapper from './AuthFormWrapper';

type SignInFormProps = {};

const SignInForm: React.FC<SignInFormProps> = (): JSX.Element => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
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

  const history = useHistory();
  return (
    <AuthFormWrapper>
      <StyledSignInForm>
        <form
          autoComplete="off"
          method=""
          onSubmit={(e: FormEvent) => {
            handleSubmit(e);
          }}
        >
          <h2 className="form-header">Sign in now</h2>

          <Input
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
            type="password"
            name="password"
            placeholder="Enter your password"
            label="Password"
            value={credentials.password}
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
              <span>Sign in</span>
              <FontAwesomeIcon icon="arrow-right" />
            </Button>
          </div>
        </form>
        <div className="redirect">
          <Button
            onClick={() => history.push('/create-account')}
            category="link"
            value="New here? Create a free account now"
          />
        </div>
      </StyledSignInForm>
    </AuthFormWrapper>
  );
};

const StyledSignInForm = styled.div`
  /* box-shadow: 0 0 2px 2px ${colors.veryLightBlack};   */
  background-color: ${colors.white};
  padding: 6em 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 15px 15px 0;
  border-radius: 0 15px 15px 0;

  h2.form-header {
    margin-bottom: 1.2em;
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

export default SignInForm;
