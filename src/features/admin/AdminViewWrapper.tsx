import * as React from 'react';
import styled from 'styled-components';
import ErrorPage from '../../common/components/ErrorPage';
import FullPageLoader from '../../common/components/FullPageLoader';
import { breakpoints } from '../../common/constants';
import Sidebar from './Sidebar';

type AdminViewWrapperProps = {
  header: string;
  children: JSX.Element | JSX.Element[];
  isLoading: boolean;
  error: any;
};

const AdminViewWrapper: React.FC<AdminViewWrapperProps> = ({
  header,
  children,
  isLoading,
  error,
}: AdminViewWrapperProps): JSX.Element => {
  if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <StyledWrapper>
      <Sidebar />
      <div className="main">
        <h2>{header}</h2>
        {isLoading ? <FullPageLoader /> : <div>{children}</div>}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 250px auto;

  div#sidebar {
    width: 250px;
    position: sticky;
    left: 0;
  }
  div.main {
    position: absolute;
    left: 250px;
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

  @media (max-width: ${breakpoints.smallLaptop}) {
    div#sidebar {
      width: 50px;
      a {
        justify-content: center;
        span {
          display: none;
        }
      }
      padding: 0.5em;
    }

    div.main {
      left: 50px;
    }
  }
`;

export default AdminViewWrapper;
