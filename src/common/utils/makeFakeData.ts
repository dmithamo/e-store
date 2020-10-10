/* eslint-disable no-plusplus */
import { subDays } from 'date-fns';
import faker, { fake } from 'faker';
import { User } from '../../features/auth/utils/stateMgmt';
import { ShopItem } from '../../features/shop-front/utils/stateMgmt';

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
      role: i % 2 === 0 && i % 3 === 0 ? 'ADMIN' : 'NORMAL',
      created: faker.date.between(
        subDays(new Date(), i + 1),
        subDays(new Date(), 60),
      ),
      isLoggedIn: i % 3 === 0,
      isVerified: i % 3 === 0,
    };
    users.push(u);

    i--;
  }

  return users;
};

export const makeFakeProduct = (num: number): ShopItem[] => {
  const products: ShopItem[] = [];
  let i = num;

  while (i > 0) {
    const p: ShopItem = {
      id: faker.git.commitSha(),
      name: faker.commerce.productName(),
      rate: Number(faker.commerce.price()),
      category: faker.commerce.department(),
      quantityAvailable: 10,
      dateAvailable: i % 3 === 0 ? faker.date.past() : new Date(),
      img: faker.image.image(),
    };
    products.push(p);
    i--;
  }

  return products;
};
