import IS_VALID_INPUT from '../../../common/utils/validators';

type Errors = {
  [key: string]: string;
};

export default function validateCredentials(
  credentials: {
    value: string;
    name: string;
    type: string;
  }[],
): Errors {
  let errs: Errors = {};

  errs = credentials.reduce((errors, cred) => {
    if (!IS_VALID_INPUT[cred.type](cred.value)) {
      errors = {
        ...errors,
        [cred.name]: checkIsEmptyHelper(cred.value, cred.name),
      };
    } else {
      errors = {
        ...errors,
        [cred.name]: '',
      };
    }

    return errors;
  }, errs);

  function checkIsEmptyHelper(value: string, name: string): string {
    return value === ''
      ? `${name} is required`
      : `'${value}' is not a valid option for ${name}`;
  }

  return errs;
}
