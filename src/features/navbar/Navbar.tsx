import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/components/Button';
import Logo from '../../common/components/Logo';
import { breakpoints } from '../../common/constants';
import { RootState } from '../../common/store/rootReducer';
import NavbarLink from './NavbarLink';
import SearchBar from './SearchBar';
import ShoppingCart from './ShoppingCart';
import UserDetails from './UserDetails';

export default function Navbar() {
  const [isUploading, setIsUploading] = useState(false);
  const {
    user: { isLoggedIn, roleId },
  } = useSelector((state: RootState) => state.auth);

  const isAdmin = roleId === 1;
  return (
    <>
      <StyledNavbar>
        <div className="navbar-item home">
          <NavbarLink path={isAdmin ? '/admin/accounts' : '/shop'}>
            <Logo />
          </NavbarLink>
        </div>
        <div className="navbar-item">
          <SearchBar />
        </div>
        <div className="navbar-item">
          {isLoggedIn ? (
            <>
              {!isAdmin ? (
                <div style={{ width: '150px' }}>
                  <Button
                    category="primary"
                    onClick={() => {
                      setIsUploading(true);
                    }}
                  >
                    <FontAwesomeIcon icon="plus-circle" />
                    <span>Upload an item</span>
                  </Button>
                </div>
              ) : (
                <></>
              )}

              {!isAdmin ? <ShoppingCart /> : <></>}
              <UserDetails />
            </>
          ) : (
            <>
              <NavbarLink path="/sign-in">
                <Button category="link" value="Sign in" onClick={() => {}} />
              </NavbarLink>
              <NavbarLink path="/sign-up">
                <Button
                  category="primary"
                  value="Get started"
                  onClick={() => {}}
                />
              </NavbarLink>
            </>
          )}
        </div>
      </StyledNavbar>

      {isUploading && <p>Uploading all the things </p>}
    </>
  );
}

const StyledNavbar = styled.nav`
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  width: 100%;
  background-color: var(--white);

  position: sticky;
  top: 0;
  z-index: 800;

  div.navbar-item {
    display: flex;
    align-items: center;
    margin: 0;

    svg.navbar-icon {
      color: var(--black);
      font-size: 2em;
      :hover {
        color: var(--primaryBlueDarker);
      }
    }
  }

  p.home {
    justify-content: flex-start;
  }

  @media (max-width: ${breakpoints.smallLaptop}) {
  }
`;
