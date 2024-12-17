import {UserInfo} from '../types/user.ts';
import faker from 'faker';

export function createRandomUserInfo(): UserInfo {
  return {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
    email: faker.internet.email(),
    token: faker.datatype.uuid(),
  };
}
