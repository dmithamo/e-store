import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from '../../common/components/Button';
import InlineImage from '../../common/components/InlineImage';
import CoverAllTheThings from '../../common/components/JustOverlay';
import useClickOutside, {
  useEcapeKeyPress,
} from '../../common/utils/hooks/useClickOutside';
import { ShopItem } from '../shop-front/utils/stateMgmt';

type Props = {
  item: ShopItem;
  onClose: () => void;
};

const AddToCartModal: React.FC<Props> = ({
  item,
  onClose,
}: Props): JSX.Element => {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  useEcapeKeyPress(onClose);

  return (
    <>
      <StyledModalModal ref={ref}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '0 2em',
          }}
        >
          <h2 style={{ flexGrow: 1 }}>Add to cart</h2>
          <button
            style={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              background: 'none',
              font: 'inherit',
              textDecoration: 'underline',
              opacity: '0.75',
            }}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

        <InlineImage size="large" alt={item.name} src={item.img} />
        <h2>{item.name}</h2>
        <h3>
          @ KES&nbsp;
          {item.rate}
          &nbsp;per day
        </h3>
        <Button
          alignCenter
          category="primary"
          classes="buy-button"
          onClick={() => {}}
        >
          <span>Add to Cart</span>
        </Button>
      </StyledModalModal>
      <CoverAllTheThings />
    </>
  );
};

const StyledModalModal = styled.div`
  padding: 2em 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--subtleShadow);
  background-color: white;
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 999;
  min-width: 400px;
  min-height: 500px;
`;

export default AddToCartModal;
