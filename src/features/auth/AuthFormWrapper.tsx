import React from 'react';
import styled from 'styled-components';
import FullPageOverlay from '../../common/components/FullPageOverlay';
import InfoBanner from './InfoBanner';

type AuthFormWrapperProps = {
  children: JSX.Element | JSX.Element[];
};

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  children,
}: AuthFormWrapperProps): JSX.Element => (
  <FullPageOverlay>
    <StyledAuthFormWrapper>
      <div className="container">
        <div className="info-banner">
          <InfoBanner />
        </div>

        <div className="auth-form">{children}</div>
      </div>
    </StyledAuthFormWrapper>
  </FullPageOverlay>
);

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
    background-color: var(--white);
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0 15px 15px 0;

    h2.form-header {
      margin-bottom: 0.5em;
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
  }
`;

export default AuthFormWrapper;
