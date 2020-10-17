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
    nationalID: string;
    gender: string;
  };
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    dob: '',
    nationalID: '',
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
        name: 'nationalID',
        type: 'nationalID',
        value: credentials.nationalID || '',
      },
      {
        name: 'gender',
        type: 'text',
        value: credentials.gender || '',
      },
    ]);

    if (errs.dob === '' && errs.nationalID === '' && errs.gender === '') {
      onClickNext(0, credentials);
      return;
    }

    setValidationErrors({
      ...validationErrors,
      ...errs,
    });

    setIsValidPageThree(
      errs.dob === '' && errs.nationalID === '' && errs.gender === '',
    );
  }

  const genderOptions = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
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
        name="nationalID"
        placeholder="eg 30002345"
        label="National ID"
        value={credentials.nationalID || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.nationalID}
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
