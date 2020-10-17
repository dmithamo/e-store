import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import FullPageOverlay from '../../common/components/FullPageOverlay';
import InlineError from '../../common/components/InlineError';
import FullPageLoader from '../../common/components/FullPageLoader';
import InfoBanner from './InfoBanner';
import { clearFormErrs } from './utils/stateMgmt';

type AuthFormWrapperProps = {
  header: string;
  footer: () => JSX.Element;
  error?: any;
  onCloseErrorBox: Function;
  formInputs: () => JSX.Element;
  formName: string;
  isLoading: boolean;
};

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  formInputs,
  header,
  footer,
  error,
  onCloseErrorBox,
  formName,
  isLoading,
}: AuthFormWrapperProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(clearFormErrs());
    },
    [],
  );
  return (
    <>
      {isLoading && <FullPageLoader />}
      <FullPageOverlay>
        <StyledAuthFormWrapper>
          <div className="container">
            <div className="info-banner">
              <InfoBanner />
            </div>

            <div className="auth-form">
              <h2 className="form-header">{header}</h2>
              {error && (
                <div className="errors">
                  <InlineError
                    error={error.message}
                    onClose={() => {
                      onCloseErrorBox();
                    }}
                  />
                </div>
              )}
              <div className={`form ${formName}`}>
                <div className="inputs">{formInputs()}</div>
              </div>
              <div className="footer">{footer()}</div>
            </div>
          </div>
        </StyledAuthFormWrapper>
      </FullPageOverlay>
    </>
  );
};

AuthFormWrapper.defaultProps = {
  error: false,
};

const StyledAuthFormWrapper = styled.div`
  width: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primaryBlue);
  box-shadow: 0 0 5px 3px var(--veryLightBlack);
  border-radius: 15px;

  div.container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    position: 'relative';
  }

  div.auth-form {
    width: 100%;
    background-color: var(--white);
    padding: 3em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0 15px 15px 0;
    position: relative;

    h2.form-header {
      font-size: 2em;
      width: 90%;
      color: var(--black);
    }

    div.errors {
      width: 90%;
      position: absolute;
      top: 2em;
      right: 2em;
    }

    div.form {
      padding: 0.1em;
      width: 90%;
      div.inputs {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
        padding: 1em 0;
        height: 30vh;
      }
    }

    div.sign-up {
      div.inputs {
        padding: 1em 0;
        height: 35vh;
      }
    }

    div.footer {
      margin-top: 3em;
    }
  }
`;

export default AuthFormWrapper;
