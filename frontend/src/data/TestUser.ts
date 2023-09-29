import { User } from '../interfaces/User';

export const u1: User = {
  id: 1,
  email: 'urho.kekkonen@test.com',
  password: '1234',
  full_name: 'Urho Kekkonen',
  company: 'Kekkonen Oy',
};

const u2: User = {
  id: 2,
  email: 'sauliniinistö@test.com',
  password: '1234',
  full_name: 'Sauli Niinistö',
  company: 'Niinistön talot Oy',
};

export const testUserList: User[] = [u1, u2];
