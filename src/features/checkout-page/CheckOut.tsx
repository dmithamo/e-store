import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../common/store/rootReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/components/Button';

export type CheckoutPageProps = {};

const CheckoutPage: React.FC<CheckoutPageProps> = (): JSX.Element => {
  const [isEditingVisaCard, setIsEditingVisaCard] = useState(false);
  type PaymentOptions = 'MPESA' | 'VISA';

  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    PaymentOptions
  >('MPESA');

  return (
    <StyledCheckoutPage>
      <div className="container">
        <div className="main-container">
          {isEditingVisaCard ? '<EditVisaCard />' : '<ListPurchases />'}
        </div>

        <div className="payment-options">
          <div className="total-amount">
            <p>You have spent</p>
            <h2>KES 4,582.00</h2>
          </div>
          <div className="select-payment-option">
            <h2 className="title">Pay with</h2>
            <div className="options">
              <Button
                classes={selectedPaymentOption === 'MPESA' ? 'selected' : ''}
                alignCenter
                category="outline"
                onClick={() => {
                  setSelectedPaymentOption('MPESA');
                }}
              >
                <span>Mpesa</span>
                {selectedPaymentOption === 'MPESA' ? (
                  <span className="checkmark">&#10004;</span>
                ) : (
                  <></>
                )}
              </Button>
              <Button
                classes={selectedPaymentOption === 'VISA' ? 'selected' : ''}
                alignCenter
                category="outline"
                onClick={() => {
                  setSelectedPaymentOption('VISA');
                }}
              >
                <span>Visa</span>
                {selectedPaymentOption === 'VISA' ? (
                  <span className="checkmark">&#10004;</span>
                ) : (
                  <></>
                )}
              </Button>
            </div>
          </div>
          <div className="actions">
            <Button
              category="primary"
              onClick={() => {
                setIsEditingVisaCard(!isEditingVisaCard);
              }}
            >
              <span>Place order</span>
              <FontAwesomeIcon icon="arrow-right" />
            </Button>
            <Button category="outline" onClick={() => {}}>
              <span>Continue shopping instead</span>
              <FontAwesomeIcon icon="arrow-left" />
            </Button>
          </div>
        </div>
      </div>
    </StyledCheckoutPage>
  );
};

const StyledCheckoutPage = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em;
  background-color: var(--grey);

  div.container {
    background-color: var(--white);
    color: var(--black);
    width: 80%;
    height: 80vh;
    border-radius: 20px;
    margin: auto;
    box-shadow: var(--subtleShadow);
    padding: 2.5em 2.5em 2.5em 0;

    display: flex;

    div.main-container,
    div.payment-options {
      padding: 2em;
    }

    div.main-container {
      background-color: var(--white);
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    div.payment-options {
      height: 100%;
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 0 20px 20px 0;
      color: var(--white);
      background-color: var(--navyBlue);

      div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      div.total-amount {
        margin-bottom: 4em;
        p {
          opacity: 0.9;
        }

        h2 {
          font-size: 2em;
        }
      }

      div.select-payment-option {
        width: 100%;
        flex-grow: 1;
        div.options {
          flex-direction: row;
          width: 100%;
          button:first-of-type {
            margin-right: 2em;
          }
        }
      }

      div.actions {
        button:first-of-type {
          margin-bottom: 2em;
        }
      }
    }
  }
`;

export default CheckoutPage;
