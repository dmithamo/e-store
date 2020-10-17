import api from '../../../http-client';
import { Credentials } from '../CreateAccountForm/CreateAccountPage';

/**
 * @description Create a new account with given credentials
 * @param credentials object
 */
export async function createAccount(credentials: Credentials): Promise<any> {
  try {
    const res = await api.post('/register', credentials);
    if (res && res.status === 200) {
      return [true, res.data];
    }

    return [false, res ? 'Server error' : 'Something went wrong'];
  } catch (error) {
    return [false, error];
  }
}

/**
 * @description Make request to verify new account
 * @param confirmationCode string
 * @param email string
 * @returns [boolean, string] ie [did this succeed?, error-if-any, else empty string]
 */
export async function verifyAccount(
  confirmationCode: string,
  email: string,
): Promise<any> {
  try {
    if (!email || !confirmationCode) {
      return [false, 'Missing email or confirmation code'];
    }
    const res = await api.post('/auth/verify-account', {});

    if (res && res.status === 200) {
      return [true, ''];
    }
  } catch (error) {
    return [false, error];
  }

  return [true, ''];
}

/**
 * @description Sign in with given credentials
 * @param credentials object
 */
export async function signIn(credentials: Partial<Credentials>): Promise<any> {
  try {
    const res = await api.post('/login', credentials);
    if (res && res.status === 200) {
      return [true, res.data];
    }

    return [false, res ? 'Server error' : 'Something went wrong'];
  } catch (error) {
    return [false, error];
  }
}
