/* eslint-disable no-plusplus */
import { subDays } from 'date-fns';
import faker from 'faker';
import { User } from '../../features/auth/utils/stateMgmt';

/**
 * @description Generate a bunch of fake users
 * @param num number
 */
export const makeFakeUsers = (num: number): User[] => {
  const users: User[] = [];
  let i = num;
  while (i > 0) {
    const u: User = {
      email: faker.internet.email(),
      address: faker.address.city(),
      phoneNumber: faker.phone.phoneNumberFormat(0),
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName(),
      avatar: faker.internet.avatar(),
      userID: faker.git.commitSha(),
      role: 'NORMAL',
      created: faker.date.between(
        subDays(new Date(), i + 1),
        subDays(new Date(), 60),
      ),
      isLoggedIn: false,
      isVerified: i % 3 === 0,
    };
    users.push(u);

    i--;
  }

  return users;
};
