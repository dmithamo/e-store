import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/colors';
import Button from '../../common/components/Button';
import Logo from '../../common/components/Logo';
import { breakpoints } from '../../common/constants';
import { RootState } from '../../common/store/rootReducer';
import SearchBar from './SearchBar';
import ShoppingCart from './ShoppingCart';
import UserAvatar from './UserAvatar';

export default function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const history = useHistory();
  return (
    <StyledNavbar>
      <div className="home">
        <Logo />
      </div>
      <SearchBar />
      <div className="far-left">
        {isAuthenticated ? (
          <>
            <ShoppingCart />
            <UserAvatar />
          </>
        ) : (
          <Button
            category="primary"
            value="Get started"
            onClick={() => {
              history.push('/sign-up');
            }}
          />
        )}
      </div>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  padding: 0.5em 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  width: 100%;
  background-color: ${colors.white};

  div.home {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  div.far-left {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  a.active {
    border-bottom: 2px solid ${colors.black};
    background-color: ${colors.grey};
    opacity: 1;
    svg {
      color: ${colors.black};
    }
  }

  @media (max-width: ${breakpoints.smallLaptop}) {
    div.home,
    div.rest {
      width: fit-content;
    }
  }
`;
