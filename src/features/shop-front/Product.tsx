import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import shoppingCart from '../../assets/img/shopping-cart-small.png';
import Button from '../../common/components/Button';
import InlineImage from '../../common/components/InlineImage';
import AddToCartModal from '../shopping-cart/AddToCartModal';
import { ShopItem } from './utils/stateMgmt';

type ProductProps = {
  product: ShopItem;
  hideDetailsBtn?: boolean;
};

const Product: React.FC<ProductProps> = ({
  product,
  hideDetailsBtn,
}: ProductProps): JSX.Element => {
  const history = useHistory();
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  return (
    <StyledContainer>
      {showAddToCartModal ? (
        <AddToCartModal
          onClose={() => {
            setShowAddToCartModal(false);
          }}
          item={product}
        />
      ) : (
        <></>
      )}

      <StyledProduct>
        <h2 className="name">{product.name}</h2>
        <h3 className="rate">{`KES ${product.rate}/hr`}</h3>
        <img className="product-img" src={product.img} alt={product.name} />
        <div className="actions">
          {!hideDetailsBtn ? (
            <Button
              category="link"
              classes="details-button"
              onClick={() => {
                history.push(
                  `/shop/${product.category.toLowerCase()}/${product.id}`,
                );
              }}
              value="Details"
            />
          ) : (
            <></>
          )}
          <Button
            category="secondary"
            classes="buy-button"
            onClick={() => {
              setShowAddToCartModal(true);
            }}
          >
            <InlineImage
              src={shoppingCart}
              size="smallest"
              alt="shopping cart"
            />
            <span>Hire item</span>
          </Button>
        </div>
      </StyledProduct>
    </StyledContainer>
  );
};

Product.defaultProps = { hideDetailsBtn: false };

const StyledContainer = styled.div`
  position: relative;
`;

const StyledProduct = styled.div`
  background-color: var(--white);
  padding: 1em 2em;
  position: relative;
  border-radius: 5px;
  height: 400px;

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
