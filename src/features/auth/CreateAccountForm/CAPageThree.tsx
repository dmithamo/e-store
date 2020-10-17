import { format, subYears } from 'date-fns';
import React, { FormEvent, useState } from 'react';
import CustomSelect from '../../../common/components/CustomSelect';
import Input from '../../../common/components/Input';
import validateCredentials from '../utils/validators';
import { Credentials } from './CreateAccountPage';
import FormNav from './FormNav';

type CAPageThreeProps = {
  onClickNext: Function;
  onClickPrev: Function;
  credentials: Partial<Credentials>;
  onCredentialsChange: Function;
};

const CAPageThree: React.FC<CAPageThreeProps> = ({
  onClickNext,
  onClickPrev,
  credentials,
  onCredentialsChange,
}: CAPageThreeProps): JSX.Element => {
  type ValidationErrors = {
    dob: string;
    nationalId: string;
    gender: string;
  };
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    dob: '',
    nationalId: '',
    gender: '',
  });
  const [isValidPageThree, setIsValidPageThree] = useState(true);

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

    setIsValidPageThree(true);
  }

  function validatePageThree() {
    const errs = validateCredentials([
      { name: 'dob', type: 'date', value: credentials.dob || '' },
      {
        name: 'nationalId',
        type: 'nationalId',
        value: credentials.nationalId || '',
      },
      {
        name: 'gender',
        type: 'text',
        value: credentials.gender || '',
      },
    ]);

    if (errs.dob === '' && errs.nationalId === '' && errs.gender === '') {
      onClickNext(0, credentials);
      return;
    }

    setValidationErrors({
      ...validationErrors,
      ...errs,
    });

    setIsValidPageThree(
      errs.dob === '' && errs.nationalId === '' && errs.gender === '',
    );
  }

  const genderOptions = [
    { label: 'Female', value: 'FEMALE' },
    { label: 'Male', value: 'MALE' },
  ];
  return (
    <>
      <Input
        required
        type="date"
        name="dob"
        label="Date of birth. You must be 18yrs or older to create an account"
        value={credentials.dob || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.dob}
        min="1970-01-01"
        max={`${format(subYears(new Date(), 18), 'yyyy-MM-dd')}`}
      />
      <Input
        required
        type="text"
        name="nationalId"
        placeholder="eg 30002345"
        label="National ID"
        value={credentials.nationalId || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.nationalId}
      />
      <CustomSelect
        name="gender"
        options={genderOptions}
        label="Gender"
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        value={credentials.gender || ''}
        error={validationErrors.gender}
      />
      <FormNav
        showPrev
        onClickNext={validatePageThree}
        onClickPrev={() => {
          onClickPrev(-1, credentials);
        }}
        nextIsDisabled={!isValidPageThree}
        pageNumber={3}
      />
    </>
  );
};

export default CAPageThree;
