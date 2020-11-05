import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/components/Button';
import ViewMoreButton from './ViewMoreBtn';

type NavByCategoryProps = {
  focusedCategory?: string;
  showViewMoreLink?: boolean;
};

const NavByCategory: React.FC<NavByCategoryProps> = ({
  focusedCategory: category = '',
  showViewMoreLink,
}: NavByCategoryProps): JSX.Element => {
  const history = useHistory();

  return (
    <StyledNavByCategory>
      {showViewMoreLink ? (
        <ViewMoreButton category={category} />
      ) : (
        <h2>{category}</h2>
      )}
      <Button
        category="link"
        value="All Categories"
        onClick={() => {
          history.push('/shop');
        }}
      />
    </StyledNavByCategory>
  );
};

NavByCategory.defaultProps = {
  focusedCategory: '',
  showViewMoreLink: false,
};

const StyledNavByCategory = styled.nav`
  font-size: 1em;
  font-family: var(--primaryBold);
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  button {
    color: var(--black);
    text-decoration: underline;
  }
  h2 {
    margin-right: 1em;
  }
`;

export default NavByCategory;
