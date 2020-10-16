import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/hae-logo.png';

type LogoProps = {};

const Logo: React.FC<LogoProps> = () => (
  <StyledLogo>
    <img src={logo} alt="hae logo" />
  </StyledLogo>
);

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  overflow: hidden;

  img {
    width: 100px;
    margin: auto;
    padding: 0.3em;
  }
`;

export default Logo;
