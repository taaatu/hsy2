interface User {
  id: number;
  email: string;
  password: string;
  role?: UserRole;
}

enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
}

type LoginInput = Pick<User, 'email' | 'password'>;

export { User, LoginInput };
