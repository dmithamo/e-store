import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

type AdminViewWrapperProps = {
  header: string;
  children: JSX.Element | JSX.Element[];
};

const AdminViewWrapper: React.FC<AdminViewWrapperProps> = ({
  header,
  children,
}: AdminViewWrapperProps): JSX.Element => (
  <StyledWrapper>
    <Sidebar />
    <div className="main">
      <h2>{header}</h2>
      <div>{children}</div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 250px auto;

  div#sidebar {
    width: 250px;
  }
  div.main {
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    h2 {
      font-weight: bold;
      text-transform: capitalize;
      padding: 1em 0;
    }
  }
`;

export default AdminViewWrapper;
