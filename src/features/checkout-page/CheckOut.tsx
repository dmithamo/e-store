import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/components/Button';
import AmountSpentPreview from './AmountSpentPreview';
import { useHistory } from 'react-router-dom';
import MpesaDetailsForm from './MpesaDetails';
import VisaDetailsForm from './VisaDetails';

export type CheckoutPageProps = {};

const CheckoutPage: React.FC<CheckoutPageProps> = (): JSX.Element => {
  const history = useHistory();
  type PaymentOptions = 'MPESA' | 'VISA';

  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    PaymentOptions
  >('MPESA');

  return (
    <StyledCheckoutPage>
      <div className="container">
        <div className="main-container">
          {1 + 1 === 2 && '<ListOfPurchases />'}
        </div>

        <div className="payment-options">
          <AmountSpentPreview amount={4850} />
          <div className="select-payment-option">
            <h2 className="title">Pay with</h2>
            <div className="options">
              <Button
                classes={selectedPaymentOption === 'MPESA' ? 'selected' : ''}
                category="outline"
                onClick={() => {
                  setSelectedPaymentOption('MPESA');
                }}
              >
                <FontAwesomeIcon icon="mobile-alt" />
                <span>Mpesa</span>
                {selectedPaymentOption === 'MPESA' ? (
                  <span className="checkmark">&#10004;</span>
                ) : (
                  <></>
                )}
              </Button>
              <Button
                classes={selectedPaymentOption === 'VISA' ? 'selected' : ''}
                category="outline"
                onClick={() => {
                  setSelectedPaymentOption('VISA');
                }}
              >
                <FontAwesomeIcon icon={['fab', 'cc-visa']} />
                <span>Visa</span>
                {selectedPaymentOption === 'VISA' ? (
                  <span className="checkmark">&#10004;</span>
                ) : (
                  <></>
                )}
              </Button>
            </div>

            <div className="card-details">
              {selectedPaymentOption === 'MPESA' ? (
                <MpesaDetailsForm />
              ) : (
                <VisaDetailsForm />
              )}
            </div>
          </div>
          <div className="actions">
            <Button category="primary" onClick={() => {}}>
              <span>Place order</span>
              <FontAwesomeIcon icon="arrow-right" />
            </Button>
            <Button
              category="outline"
              onClick={() => {
                history.push('/shop');
              }}
            >
              <span>Shop</span>
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
    width: 95%;
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
        width: 100%;
      }

      div.select-payment-option {
        margin-top: 2em;

        flex-grow: 1;
        div.options {
          flex-direction: row;
          width: 100%;
          button {
            width: 90%;
          }
        }

        div.card-details {
          justify-content: center;
          align-items: center;
          flex-grow: 1;
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
