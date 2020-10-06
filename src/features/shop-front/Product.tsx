import React from 'react';
import styled from 'styled-components';
import Button from '../../common/components/Button';
import InlineImage from '../../common/components/InlineImage';
import { ShopItem } from './utils/stateMgmt';
import shoppingCart from '../../assets/img/shopping-cart-small.png';
import { useHistory } from 'react-router-dom';

type ProductProps = {
  product: ShopItem;
};

const Product: React.FC<ProductProps> = ({
  product,
}: ProductProps): JSX.Element => {
  const history = useHistory();
  return (
    <StyledProduct>
      <h2 className="name">{product.name}</h2>
      <h3 className="rate">{`KES ${product.rate}/hr`}</h3>
      <img className="product-img" src={product.img} alt={product.name} />
      <div className="actions">
        <Button
          category="link"
          classes="details-button"
          onClick={() => {
            history.push(
              [
                'shop',
                product.category
                  ? product.category.toLowerCase()
                  : 'uncategorised',
                product.id,
              ].join('/'),
            );
          }}
          value="Details"
        />
        <Button category="secondary" classes="buy-button" onClick={() => {}}>
          <InlineImage src={shoppingCart} size="smallest" alt="shopping cart" />
          <span>Hire item</span>
        </Button>
      </div>
    </StyledProduct>
  );
};

Product.defaultProps = {};

const StyledProduct = styled.div`
  background-color: var(--white);
  padding: 1em 2em;
  position: relative;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  :hover {
    box-shadow: var(--subtleShadow2);
  }

  h2.name {
    text-transform: capitalize;
    font-family: var(--primaryBold);
  }

  h3.rate {
    font-family: var(--primaryRegular);
  }

  img.product-img {
    width: 250px;
    height: auto;
    margin: auto;
  }

  div.actions {
    width: 100%;
    display: flex;
    align-items: center;

    button.details-button {
      width: 20%;
    }

    button.buy-button {
      flex-grow: 1;
      padding: 0.6em 1em;
      color: var(--primaryBlueDarker);
      font-weight: bold;
    }
  }
`;

export default Product;
