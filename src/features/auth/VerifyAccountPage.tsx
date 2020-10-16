/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FullPageModal from '../../common/components/FullPageModal';
import Input from '../../common/components/Input';
import { RootState } from '../../common/store/rootReducer';
import { isValidConfirmCode } from '../../common/utils/validators';
import { verifyAccountCancel } from './utils/stateMgmt';

export default function VerifyAccountPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmCode, setConfirmCode] = useState('');
  const [errors, setErrors] = useState('');

  function handleSubmit() {
    if (confirmCode === '') {
      setErrors('Required');
      return;
    }
    if (!isValidConfirmCode(confirmCode)) {
      setErrors('Invalid confirmation code');
    }

    // make nw rrquest for code confirmation here
  }

  function handleCancel() {
    dispatch(verifyAccountCancel());
    history.push('/sign-in');
  }

  function handleInput(e: FormEvent) {
    setConfirmCode((e.target as HTMLTextAreaElement).value);
  }

  return (
    <FullPageModal
      title="Verify your account"
      subtitle="Safety first!"
      primaryAction={handleSubmit}
      primaryActionName="Verify Account"
      secondaryAction={handleCancel}
      secondaryActionName="Cancel and login instead"
    >
      <p>
        In order to keep&nbsp;
        <strong>hae</strong>
        &nbsp; safe and reliable, we need to verify your account before you can
        use it.
      </p>

      <p>
        <strong>
          Enter the confirmation code sent to your email adress to verify your
          account
        </strong>
      </p>

      <Input
        required
        type="text"
        name="email"
        placeholder="eg an@other.com"
        label="Confirmation code"
        value={confirmCode}
        onChange={handleInput}
        error={errors}
      />
    </FullPageModal>
  );
}
