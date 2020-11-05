/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../common/constants';

export type NavbarLinkProps = {
  path: string;
  children: JSX.Element | JSX.Element[];
};
export default function NavbarItem({ path, children }: NavbarLinkProps) {
  return (
    <StyledNavbarItem exact to={path}>
      {children}
    </StyledNavbarItem>
  );
}

const StyledNavbarItem = styled(NavLink)`
  text-decoration: none;
  color: var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  width: fit-content;

  :hover {
    opacity: 1;
  }

  @media (max-width: ${breakpoints.tablet}) {
    span {
      display: none;
    }
    svg {
      margin: 0;
    }
  }
`;
