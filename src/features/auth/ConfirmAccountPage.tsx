/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import colors from '../../assets/colors';
import FullPageModal from '../../common/components/FullPageModal';
import Input from '../../common/components/Input';
import { RootState } from '../../common/store/rootReducer';
import { isValidConfirmCode } from '../../common/utils/validators';

export default function ConfirmAccountPage() {
  const dispatch = useDispatch();
  const [confirmCode, setConfirmCode] = useState('');
  const [errors, setErrors] = useState('');

  function handleSubmit() {
    if (confirmCode === '') {
      setErrors('Required');
      return;
    }
    if (!isValidConfirmCode(confirmCode)) {
      setErrors('Invalid confirmation code');
      return;
    }

    // make nw rrquest for code confirmation here
    console.log(confirmCode);
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
