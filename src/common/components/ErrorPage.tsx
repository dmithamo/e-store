import * as React from 'react';
import styled from 'styled-components';

type ErrorPageProps = {
  error: object;
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
}: ErrorPageProps): JSX.Element => (
  <StyledErrorPage>
    <h2 className="title">Error fetching items</h2>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </StyledErrorPage>
);

const StyledErrorPage = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 80%;
  margin: auto;
  h2 {
    background-color: var(--veryLightBlack);
    padding: 1em;
    border-radius: 10px;
  }
`;

export default ErrorPage;
