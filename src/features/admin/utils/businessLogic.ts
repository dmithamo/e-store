import api from '../../../http-client';
import { User } from '../../auth/utils/stateMgmt';

/**
 * @description rRtrieve all users
 */
export async function fetchUsers(): Promise<any> {
  try {
    const res = await api.get('/users');
    if (res && (res as any).status === 200) {
      return [true, (res as any).data];
    }

    return [false, res ? 'Server error' : 'Something went wrong'];
  } catch (error) {
    return [false, error];
  }
}

/**
 * @description Update a user's property
 * @param update object
 */
export async function updateUserProperty(update: Partial<User>): Promise<any> {
  try {
    const res = await api.post(`/users/${update.userID}`, update);

    if (res && (res as any).status === 201) {
      return [true, (res as any).data];
    }

    return [false, res ? 'Server error' : 'Something went wrong'];
  } catch (error) {
    return [false, error];
  }
}
