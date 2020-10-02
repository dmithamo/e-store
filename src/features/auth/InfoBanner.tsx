import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/colors';
import Button from '../../common/components/Button';

const InfoBanner: React.FC = () => {
  const history = useHistory();
  return (
    <StyledInfoBanner>
      <h1>
        Welcome to&nbsp;
        <span>hae</span>
      </h1>
      <p>
        <span>Your account allows you to hire anything and everything.</span>
        <span>
          You can also use your account to hire stuff out, make some extra cash!
        </span>
      </p>

      <Button
        onClick={() => history.push('/info')}
        value="Learn more"
        category="outline"
        alignCenter
      />
    </StyledInfoBanner>
  );
};

const StyledInfoBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: ${colors.white};
  padding: 2em;
  height: 100%;
  width: 100%;

  h1 {
    font-weight: 700;
    font-size: 1.5em;

    span {
      border-bottom: 5px solid ${colors.white};
    }
  }

  p {
    padding: 2em 0;
    display: flex;
    flex-direction: column;
  }

  button {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default InfoBanner;
