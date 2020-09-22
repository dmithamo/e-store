/**
 * @description Validate all the things!
 */
const ALPHABETIC_STRING_REGEX = /^[A-Za-z]+$/;

const PHONE_NUMBER_REGEX = /^[0-9]{10}$/;

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
/*
 * (?=.*\d)          should contain at least one digit
 * (?=.*[a-z])       should contain at least one lower case
 * (?=.*[A-Z])       should contain at least one upper case
 * [a-zA-Z0-9]{8,}   should contain at least 8 from the mentioned characters
 *
 * Thankyou, Stack Overflow
 * */

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/*
 *
 * Thankyou, Stack Overflow
 * */

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
const VALIDATORS = {
  text: isValidAlphabeticString,
  email: isValidEmail,
  password: isValidPassword,
  tel: isValidPhoneNumber,
};

export default VALIDATORS;
