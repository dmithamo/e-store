import React from 'react';
import styled from 'styled-components';

export type NoNavbarProps = {
  children: JSX.Element[] | JSX.Element;
};

export default function NoNavbar({ children }: NoNavbarProps): JSX.Element {
  return <StyledNoNavbar>{children}</StyledNoNavbar>;
}

const StyledNoNavbar = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
`;
