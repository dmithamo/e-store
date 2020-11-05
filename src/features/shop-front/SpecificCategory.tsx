import * as React from 'react';
import ProductsRow from './ProductsRow';
import ShopFrontWrapper from './ShopFrontWrapper';
import { ShopItem } from './utils/stateMgmt';

type SpecificCategoryProps = {
  category: string;
  products: ShopItem[];
};

const SpecificCategory: React.FC<SpecificCategoryProps> = ({
  category,
  products,
}: SpecificCategoryProps): JSX.Element => (
  <ShopFrontWrapper focusedCategory={category} showNav>
    <ProductsRow
      key={category}
      showCategory={false}
      category={category}
      products={products}
    />
    <h2>PAGE DESIGN INCOMPLETE&trade;</h2>
  </ShopFrontWrapper>
);

export default SpecificCategory;
