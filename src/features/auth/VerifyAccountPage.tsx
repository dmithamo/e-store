/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'lodash/isEqual';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/components/Button';
import FullPageLoader from '../../common/components/FullPageLoader';
import FullPageModal from '../../common/components/FullPageModal';
import { RootState } from '../../common/store/rootReducer';
import { isValidConfirmCode } from '../../common/utils/validators';
import { verifyAccount } from './utils/businessLogic';
import { verifyAccountSuccess, verifyAccountFail } from './utils/stateMgmt';

interface ConfirmationCode {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
}

export default function VerifyAccountPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    user: { isVerified, userID, email },
    isRegistered,
  } = useSelector((state: RootState) => state.auth);
  const history = useHistory();
  const initialConfirmCode = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  };
  const [confirmCode, setConfirmCode] = useState<ConfirmationCode>(
    initialConfirmCode,
  );
  const [errors, setErrors] = useState('');

  function handleInput(e: FormEvent) {
    const targetEl = e.target as HTMLTextAreaElement;
    setConfirmCode({
      ...confirmCode,
      [targetEl.id]:
        targetEl.value.length > 1 ? confirmCode[targetEl.id] : targetEl.value,
    });
    if (targetEl.value !== '') {
      // eslint-disable-next-line
      document.getElementById(String(Number(targetEl.id) + 1))?.focus();
    }
  }

  function clearCode() {
    setConfirmCode(initialConfirmCode);
    // eslint-disable-next-line
    document.getElementById('1')?.focus();
  }

  async function handleSubmit() {
    if (Object.values(confirmCode).length < 6) {
      setErrors('Required');
      return;
    }
    if (!isValidConfirmCode(Object.values(confirmCode).join())) {
      setErrors('Invalid confirmation code');
    }
    if (!userID) {
      dispatch(verifyAccountFail({ message: 'Missing userID' }));
      return;
    }

    try {
      setIsLoading(true);
      const [successfullyVerified, res] = await verifyAccount(
        Object.values(confirmCode).join(''),
        userID,
      );

      if (successfullyVerified) {
        dispatch(verifyAccountSuccess(email));
      } else {
        dispatch(verifyAccountFail(res));
      }
    } catch (err) {
      dispatch(verifyAccountFail(err));
    } finally {
      setIsLoading(false);
    }
  }

  if (!isRegistered) {
    return <Redirect to="/sign-up" />;
  }

  if (isVerified) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <>
      {isLoading && <FullPageLoader />}
      <FullPageModal
        title="Verify your account"
        subtitle="Safety first!"
        primaryAction={handleSubmit}
        primaryActionName="Verify Account"
      >
        <p>
          <strong>
            Enter the confirmation code sent to your email adress to verify your
            account
          </strong>
        </p>
        <InputsContainer>
          <div className="inputs">
            {Object.keys(confirmCode).map((key) => (
              <input
                id={key}
                key={key}
                value={confirmCode[key]}
                onChange={handleInput}
              />
            ))}
          </div>
          {!isEqual(confirmCode, initialConfirmCode) ? (
            <Button category="link" onClick={clearCode} alignCenter>
              <FontAwesomeIcon size="lg" icon={['far', 'times-circle']} />
            </Button>
          ) : (
            <></>
          )}
        </InputsContainer>
      </FullPageModal>
    </>
  );
}

const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: around;
  align-items: center;

  div.inputs {
    flex: 1;
    display: flex;
    margin: auto;
    justify-content: space-between;
    align-items: center;

    input {
      width: 55px;
      height: 55px;
      border: 1px solid var(--veryLightBlack);
      padding: 1em;
      margin-right: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      outline: none;
      font-size: 16px;
      :focus {
        border: 1px solid var(--black);
      }

      :last-of-type {
        margin-right: 0;
      }
    }
  }

  span.button {
    margin-left: 1em;
  }

  transition: all ease-in-out 2s;
`;
