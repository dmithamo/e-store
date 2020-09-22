import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DropDownMenu from '../../common/components/DropDownMenu';

const ShoppingCart: React.FC = (): JSX.Element => {
  const icon = () => (
    <FontAwesomeIcon style={{ fontSize: '1.5em' }} icon="shopping-cart" />
  );
  return (
    <DropDownMenu icon={icon}>
      <p>&lt;Shopped items here/&gt;</p>
      <p>&lt;Checkout button here/&gt;</p>
    </DropDownMenu>
  );
};

export default ShoppingCart;
