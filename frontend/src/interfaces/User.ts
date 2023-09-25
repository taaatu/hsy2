interface User {
  id: number;
  email: string;
  password: string;
}

type LoginInput = Pick<User, 'email' | 'password'>;

export { User, LoginInput };
