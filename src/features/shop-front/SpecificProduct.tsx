import * as React from 'react';
import Product from './Product';
import ShopFrontWrapper from './ShopFrontWrapper';
import { ShopItem } from './utils/stateMgmt';

type SpecificProductProps = {
  product: ShopItem;
};

const SpecificProduct: React.FC<SpecificProductProps> = ({
  product,
}: SpecificProductProps): JSX.Element => (
  <ShopFrontWrapper showNav focusedCategory={product.category} showViewMoreLink>
    <Product product={product} hideDetailsBtn />
    <h2>PAGE DESIGN INCOMPLETE&trade;</h2>
  </ShopFrontWrapper>
);

export default SpecificProduct;
