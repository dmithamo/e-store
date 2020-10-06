import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/components/Button';
import Product from './Product';
import { ShopItem } from './utils/stateMgmt';
import ViewMoreButton from './ViewMoreBtn';

type ProductsRowProps = {
  products: ShopItem[];
  category: string;
  showCategory: boolean;
};

const ProductsRow: React.FC<ProductsRowProps> = ({
  products,
  category,
  showCategory,
}: ProductsRowProps): JSX.Element => {
  const history = useHistory();

  return (
    <StyledProductsRow>
      {showCategory && (
        <div className="header">
          <Button
            category="link"
            onClick={() => {
              history.push(`/shop/${category}`);
            }}
          >
            <h2>{category}</h2>
          </Button>
          <ViewMoreButton category={category} />
        </div>
      )}
      <div className="products">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </StyledProductsRow>
  );
};

const StyledProductsRow = styled.div`
  width: 100%;
  padding: 0 1em;
  margin-bottom: 3em;

  div.header {
    width: 25%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    button {
      text-transform: capitalize;
      margin: 0 0 2em 0;
      width: fit-content;
    }
  }

  div.products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    vertical-align: center;
  }
`;

export default ProductsRow;
