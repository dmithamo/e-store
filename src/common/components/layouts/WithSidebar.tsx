import React from 'react';
import styled from 'styled-components';
import Navbar from '../../../features/navbar/Navbar';
import Sidebar from '../../../features/admin/Sidebar';

export type WithSidebarProps = {
  children: JSX.Element[] | JSX.Element;
};

export default function WithSidebar({
  children,
}: WithSidebarProps): JSX.Element {
  return (
    <>
      <StyledWithSidebar>
        <Navbar />
        <section>
          <Sidebar />
          <div id="main-content">{children}</div>
        </section>
      </StyledWithSidebar>
    </>
  );
}

const StyledWithSidebar = styled.div`
  display: flex;
  flex-direction: column;
  section {
    position: relative;
    flex-grow: 1;
    margin: auto;
    width: 100%;
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr auto;

    div#sidebar {
      width: 250px;
      top: 0;
    }

    div#main-content {
      padding: 2em;
      position: absolute;
      left: 250px;
    }
  }
`;
