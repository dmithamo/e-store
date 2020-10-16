/**
 * @description Validate all the things!
 */
const ALPHABETIC_STRING_REGEX = /^[A-Za-z]+$/;

const PHONE_NUMBER_REGEX = /^[0-9]{10}$/;
const CONFIRM_CODE_REGEX = /^[0-9]{6}$/;
const NATIONAL_ID_REGEX = /^[0-9]{8,}$/;

/*
 * @description DATE_REGEX
 * Thankyou, Stack Overflow
 * Supports leap years too!
 * */
// const DATE_REGEX = ??

/*
 * @desccription PASSWORD_REGEX
 * (?=.*\d)          should contain at least one digit
 * (?=.*[a-z])       should contain at least one lower case
 * (?=.*[A-Z])       should contain at least one upper case
 * [a-zA-Z0-9]{8,}   should contain at least 8 from the mentioned characters
 *
 * Thankyou, Stack Overflow
 * */
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

/*
 * @description EMAIL_REGEX
 * Thankyou, Stack Overflow
 * */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidPassword(password: string): boolean {
  return PASSWORD_REGEX.test(password);
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isValidAlphabeticString(input: string): boolean {
  return ALPHABETIC_STRING_REGEX.test(input);
}

export function isValidPhoneNumber(input: string): boolean {
  return PHONE_NUMBER_REGEX.test(input);
}

export function isValidConfirmCode(input: string): boolean {
  return CONFIRM_CODE_REGEX.test(input);
}

export function isValidNationalID(input: string): boolean {
  return NATIONAL_ID_REGEX.test(input);
}

export function isValidDate(date: string) {
  return date !== '';
}

const VALIDATORS = {
  text: isValidAlphabeticString,
  email: isValidEmail,
  password: isValidPassword,
  tel: isValidPhoneNumber,
  confirmCode: isValidConfirmCode,
  date: isValidDate,
  nationalID: isValidNationalID,
};

export default VALIDATORS;
