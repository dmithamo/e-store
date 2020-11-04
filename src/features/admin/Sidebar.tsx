import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

type SidebarItemProps = { name: string; path: string; icon: any };

const sidabarItems: SidebarItemProps[] = [
  { name: 'dashboard', path: '/admin/dashboard', icon: 'chart-line' },
  { name: 'manage accounts', path: '/admin/accounts', icon: 'user-edit' },
  { name: 'manage products', path: '/admin/products', icon: 'cart-arrow-down' },
];

const Sidebar: React.FC = (): JSX.Element => (
  <StyledSidebar id="sidebar">
    {sidabarItems.map((itm) => (
      <SidebarItem key={itm.name} {...itm} />
    ))}
  </StyledSidebar>
);

const StyledSidebar = styled.div`
  width: 100%;
  background-color: var(--navyBlue);
  color: var(--white);
  padding: 2em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: var(--subtleShadow);

  a {
    margin-bottom: 3em;
    width: 100%;
    text-decoration: none;
    background: none;
    color: var(--offWhite);
    border: 1px solid var(--navyBlue);
    padding: 0.85em 1.1em;
    font-size: 1em;
    font-weight: bolder;
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 5px;

    svg {
      font-size: 1.3em;
    }

    :hover {
      background-color: var(--white);
      border: 1px solid var(--white);
      color: var(--black);
    }
  }

  a.active-nav {
    background-color: var(--white);
    border: 1px solid var(--white);
    color: var(--black);
  }
`;

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  path,
  icon,
}: SidebarItemProps): JSX.Element => (
  <NavLink to={path} activeClassName="active-nav">
    <span>{name}</span>
    <FontAwesomeIcon icon={icon} />
  </NavLink>
);

export default Sidebar;
