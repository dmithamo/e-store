import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/colors';
import { breakpoints } from '../../common/constants';
import { RootState } from '../../common/store/rootReducer';

export type NavbarItemProps = {
  path: string;
  name: string;
  icon: any;
  needsAuth: boolean;
};
export default function NavbarItem({
  path,
  name,
  icon,
  needsAuth,
}: NavbarItemProps) {
  const { isAuthenticated } = useSelector((store: RootState) => store.auth);
  return needsAuth && !isAuthenticated ? (
    <></>
  ) : (
    <StyledNavbarItem exact activeClassName="active" to={path}>
      <FontAwesomeIcon icon={icon} />
      <span>{name}</span>
    </StyledNavbarItem>
  );
}

const StyledNavbarItem = styled(NavLink)`
  text-decoration: none;
  color: ${colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  width: fit-content;
  border-bottom: 2px solid ${colors.white};

  svg {
    margin-right: 0.3em;
    font-size: 1.3em;
    color: ${colors.lightBlack};
  }
  span {
    flex-grow: 1;
  }
  :hover {
    border-bottom: 2px solid ${colors.darkGrey};
    background-color: ${colors.grey};
    opacity: 1;
    svg {
      color: ${colors.black};
    }
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
