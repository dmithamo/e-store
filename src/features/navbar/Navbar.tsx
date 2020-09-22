import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import colors from '../../assets/colors';
import Button from '../../common/components/Button';
import Logo from '../../common/components/Logo';
import { breakpoints } from '../../common/constants';
import { RootState } from '../../common/store/rootReducer';
import NavbarLink from './NavbarLink';
import SearchBar from './SearchBar';
import ShoppingCart from './ShoppingCart';
import UserAvatar from './UserAvatar';

export default function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <StyledNavbar>
      <p className="navbar-item home">
        <NavbarLink path="/">
          <Logo />
        </NavbarLink>
      </p>
      <p className="navbar-item">
        <SearchBar />
      </p>
      <p className="navbar-item">
        {isAuthenticated ? (
          <>
            <ShoppingCart />
            <UserAvatar />
          </>
        ) : (
          <NavbarLink path="/sign-up">
            <Button category="primary" value="Get started" onClick={() => {}} />
          </NavbarLink>
        )}
      </p>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  width: 100%;
  background-color: ${colors.white};

  p.navbar-item {
    display: flex;
    align-items: center;
    margin: 0;
  }

  p.home {
    justify-content: flex-start;
  }

  @media (max-width: ${breakpoints.smallLaptop}) {
  }
`;
