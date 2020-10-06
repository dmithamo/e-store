import React from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/components/Button';
// import { RootState } from '../../common/store/rootReducer';

const NavByCategory: React.FC = (): JSX.Element => {
  const history = useHistory();
  // const { items } = useSelector((state: RootState) => state.shopFront);

  return (
    <StyledNavByCategory>
      <Button
        category="link"
        value="All Categories"
        onClick={() => {
          history.push('/shop');
        }}
      />
      {/* {Object.keys(items).map((category) => (
        <Button
          alignCenter
          category="link"
          value={category}
          onClick={() => {
            history.push(['shop', category.toLowerCase()].join('/'));
          }}
        />
      ))} */}
    </StyledNavByCategory>
  );
};

const StyledNavByCategory = styled.nav`
  font-size: 1em;
  font-family: var(--primaryBold);
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-transform: capitalize;
  button {
    width: 10%;
    color: var(--black);
    text-decoration: underline;
  }
`;

export default NavByCategory;
