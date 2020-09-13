import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import { breakpoints } from '../../common/constants';
import allTheRoutes from '../routes/allTheRoutes';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  return (
    <StyledSidebar>
      <div className="home">
        <SidebarItem
          key={allTheRoutes[0].path}
          path={allTheRoutes[0].path}
          name={allTheRoutes[0].name}
          icon={allTheRoutes[0].icon}
        />
      </div>
      <div className="rest">
        {allTheRoutes.slice(1).map((r) => (
          <SidebarItem key={r.path} path={r.path} name={r.name} icon={r.icon} />
        ))}
      </div>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.nav`
  padding: 0.5em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  width: 100%;

  div.home {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 1;
  }

  div.rest {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
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
