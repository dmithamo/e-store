import React from 'react';
import styled from 'styled-components';
import NavByCategory from './NavByCategory';

type ShopFrontWrapperProps = {
  children: JSX.Element | JSX.Element[] | null;
  showNav?: boolean;
  focusedCategory?: string;
  showViewMoreLink?: boolean;
};

const ShopFrontWrapper: React.FC<ShopFrontWrapperProps> = ({
  children,
  showNav,
  focusedCategory,
  showViewMoreLink,
}: ShopFrontWrapperProps): JSX.Element => (
  <StyledShopFrontWrapper>
    {showNav && (
      <NavByCategory
        focusedCategory={focusedCategory}
        showViewMoreLink={showViewMoreLink}
      />
    )}
    <section className="product-rows">{children}</section>
  </StyledShopFrontWrapper>
);

ShopFrontWrapper.defaultProps = {
  showNav: false,
  focusedCategory: '',
  showViewMoreLink: false,
};

const StyledShopFrontWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  section.product-rows {
    flex-grow: 1;
    display: grid;
    grid-template-rows: reapeat(5, 1fr);
    grid-gap: 20px;
  }
`;

export default ShopFrontWrapper;
