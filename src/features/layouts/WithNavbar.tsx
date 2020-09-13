/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';
import Navbar from '../navbar/Navbar';

export type WithNavbarProps = {
  children: JSX.Element[] | JSX.Element;
};

export default function WithNavbar({ children }: WithNavbarProps): JSX.Element {
  return (
    <StyledWithNavbar>
      <Navbar />
      <section>{children}</section>
    </StyledWithNavbar>
  );
}

const StyledWithNavbar = styled.div`
  display: flex;
  flex-direction: column;
  section {
    flex-grow: 1;
  }
`;
