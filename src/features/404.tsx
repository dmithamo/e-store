import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Styled404Page>
      You must be lost.&nbsp;
      <NavLink to="/">Let me take you home</NavLink>
    </Styled404Page>
  );
}

const Styled404Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin: auto;
  width: 100%;
  height: 100vh;
  a {
    background-color: var(--veryLightBlack);
    color: black;
    text-decoration: none;
    padding: 0.5em 0.75em;
    border-radius: 15px;
    font-weight: bold;
    :hover {
      background-color: var(--lightBlack);
      color: var(--white);
    }
  }
`;
