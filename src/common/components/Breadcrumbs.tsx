import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

type BreadcrumbsProps = {
  current: string;
  root: string;
};
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  root,
  current,
}: BreadcrumbsProps): JSX.Element => {
  const history = useHistory();

  return (
    <StyledBreadcrumbs>
      <Button
        alignCenter
        category="link"
        onClick={() => {
          history.push(root);
        }}
      >
        <h4>Back</h4>
      </Button>
      <span className="divider">|</span>
      <span className="current">{current}</span>
    </StyledBreadcrumbs>
  );
};

const StyledBreadcrumbs = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: capitalize;
  font-size: 1.2em;
  padding: 1em 0;

  button {
    color: var(--black) !important;
    text-decoration: underline;
  }

  span.divider {
    padding: 0 1em;
  }

  span.current {
    text-decoration: none;
    color: var(--black);
    padding: 0;
  }
`;

export default Breadcrumbs;
