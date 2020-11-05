import * as React from 'react';
import { FormEvent, useState } from 'react';
import Input from '../../../common/components/Input';
import validateCredentials from '../utils/validators';
import { Credentials } from './CreateAccountPage';
import FormNav from './FormNav';

type CAPAgeTwoProps = {
  onClickNext: Function;
  onClickPrev: Function;
  credentials: Partial<Credentials>;
  onCredentialsChange: Function;
};

const CAPageTwo: React.FC<CAPAgeTwoProps> = ({
  onClickNext,
  onClickPrev,
  credentials,
  onCredentialsChange,
}: CAPAgeTwoProps): JSX.Element => {
  type ValidationErrors = {
    email: string;
    password: string;
    repeatPassword: string;
  };
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [isValidPageTwo, setIsValidPageTwo] = useState(true);

  function handleInput(e: FormEvent) {
    const { name, value } = e.target as HTMLTextAreaElement;
    onCredentialsChange({
      name,
      value,
    });

    setValidationErrors({
      ...validationErrors,
      // [name]: validateCredentials([{ name, value, type }])[name],
      [name]: '',
    });

    setIsValidPageTwo(true);
  }

  function validatePageTwo() {
    const errs = validateCredentials([
      { name: 'email', type: 'email', value: credentials.email || '' },
      {
        name: 'password',
        type: 'password',
        value: credentials.password || '',
      },
      {
        name: 'repeatPassword',
        type: 'password',
        value: credentials.repeatPassword || '',
      },
    ]);

    errs.repeatPassword =
      credentials.password === credentials.repeatPassword
        ? ''
        : 'Passwords do not match';

    if (
      (errs as any).email === '' &&
      (errs as any).password === '' &&
      (errs as any).repeatPassword === ''
    ) {
      onClickNext(1, credentials);
      return;
    }

    setValidationErrors({
      ...validationErrors,
      ...errs,
    });

    setIsValidPageTwo(
      errs.email === '' && errs.password === '' && errs.repeatPassword === '',
    );
  }

  return (
    <>
      <Input
        required
        type="email"
        name="email"
        placeholder="eg dmuthoni@email.com"
        label="Email address"
        value={credentials.email || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.email}
      />
      <Input
        required
        type="password"
        name="password"
        placeholder="eg exBd3Qwert"
        label="Password"
        hasHideToggle
        value={credentials.password || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.password || validationErrors.repeatPassword}
      />
      <Input
        required
        type="password"
        name="repeatPassword"
        placeholder="eg exBd3Qwert"
        label="Repeat Password"
        hasHideToggle
        value={credentials.repeatPassword || ''}
        onChange={(e: FormEvent) => {
          handleInput(e);
        }}
        error={validationErrors.repeatPassword}
      />

      <FormNav
        showPrev
        onClickNext={validatePageTwo}
        onClickPrev={() => {
          onClickPrev(-1, credentials);
        }}
        nextIsDisabled={!isValidPageTwo}
        pageNumber={2}
      />
    </>
  );
};

export default CAPageTwo;
