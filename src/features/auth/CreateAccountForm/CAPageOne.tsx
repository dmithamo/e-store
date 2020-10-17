import React, { FormEvent, useState } from 'react';
import Input from '../../../common/components/Input';
import validateCredentials from '../utils/validators';
import { Credentials } from './CreateAccountPage';
import FormNav from './FormNav';

type CAPAgeOneProps = {
  onClickNext: Function;
  credentials: Partial<Credentials>;
  onCredentialsChange: Function;
};

const CAPageOne: React.FC<CAPAgeOneProps> = ({
  onClickNext,
  credentials,
  onCredentialsChange,
}: CAPAgeOneProps): JSX.Element => {
  type ValidationErrors = {
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
  });
  const [isValidPageOne, setIsValidPageOne] = useState(true);

  function handleInput(e: FormEvent) {
    const { name, value } = e.target as HTMLTextAreaElement;
    onCredentialsChange({
      name,
      value,
    });

    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });

    setIsValidPageOne(true);
  }

  function validatePageOne() {
    const errs = validateCredentials([
      { name: 'firstName', type: 'text', value: credentials.firstName || '' },
      { name: 'lastName', type: 'text', value: credentials.lastName || '' },
      {
        name: 'mobileNumber',
        type: 'tel',
        value: credentials.mobileNumber || '',
      },
    ]);

    if (
      errs.firstName === '' &&
      errs.lastName === '' &&
      errs.mobileNumber === ''
    ) {
      onClickNext(1, credentials);
      return;
    }

    setValidationErrors({
      ...validationErrors,
      ...errs,
    });

    setIsValidPageOne(
      errs.firstName === '' && errs.lastName === '' && errs.mobileNumber === '',
    );
  }

  return (
    <>
      <Input
        required
        type="text"
        name="firstName"
        placeholder="eg Deniece"
        label="First name"
        value={credentials.firstName || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.firstName}
      />
      <Input
        required
        type="text"
        name="lastName"
        placeholder="eg Muthoni"
        label="Last name"
        value={credentials.lastName || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.lastName}
      />
      <Input
        required
        type="tel"
        name="mobileNumber"
        placeholder="eg 0700112233"
        label="Mobile number"
        value={credentials.mobileNumber || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.mobileNumber}
      />

      <FormNav
        showPrev={false}
        onClickNext={validatePageOne}
        onClickPrev={() => {}}
        nextIsDisabled={!isValidPageOne}
        pageNumber={1}
      />
    </>
  );
};

export default CAPageOne;
