import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import FullPageImageBackground from '../../common/components/FullPageImageBackground';
import InfoBanner from './InfoBanner';

type AuthFormWrapperProps = {
  children: JSX.Element | JSX.Element[];
};

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  children,
}: AuthFormWrapperProps): JSX.Element => (
  <FullPageImageBackground>
    <StyledAuthFormWrapper>
      <div className="container">
        <div className="info-banner">
          <InfoBanner />
        </div>

        <div className="auth-form">{children}</div>
      </div>
    </StyledAuthFormWrapper>
  </FullPageImageBackground>
);

const StyledAuthFormWrapper = styled.div`
  width: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  box-shadow: 0 0 5px 3px ${colors.veryLightBlack};
  border-radius: 15px;

  div.container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    position: 'relative';
  }

  div.auth-form {
  }
`;

export default AuthFormWrapper;
