import React from 'react';
import Product from './Product';
import ShopFrontWrapper from './ShopFrontWrapper';
import { ShopItem } from './utils/stateMgmt';

type SpecificProductProps = {
  product: ShopItem;
};

const SpecificProduct: React.FC<SpecificProductProps> = ({
  product,
}: SpecificProductProps): JSX.Element => (
  <ShopFrontWrapper showNav>
    <Product product={product} />
    <h2>PAGE DESIGN INCOMPLETE&trade;</h2>
  </ShopFrontWrapper>
);

export default SpecificProduct;
