import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import shoppingCartDefault from '../../assets/img/shopping-cart-small.png';
import Button from '../../common/components/Button';
import DropDownMenu from '../../common/components/DropDownMenu';
import InlineImage from '../../common/components/InlineImage';
import AmountSpentPreview from '../checkout-page/AmountSpentPreview';

const ShoppingCart: React.FC = (): JSX.Element => {
  const history = useHistory();
  const icon = () => (
    <InlineImage src={shoppingCartDefault} alt="shopping cart" size="small" />
  );
  return (
    <DropDownMenu icon={icon}>
      <InlineImage
        src={shoppingCartDefault}
        alt="shopping cart"
        size="medium"
      />

      <AmountSpentPreview amount={4850} />
      <Button
        category="primary"
        onClick={() => {
          history.push('/checkout');
        }}
      >
        <span>Checkout</span>
        <FontAwesomeIcon icon="arrow-right" />
      </Button>
      <Button
        category="secondary"
        onClick={() => {
          history.push('/shop');
        }}
      >
        <span>Shop</span>
        <FontAwesomeIcon icon="arrow-left" />
      </Button>
    </DropDownMenu>
  );
};

export default ShoppingCart;
