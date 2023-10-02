interface User {
  user_id?: number;
  email: string;
  password: string;
  full_name: string;
  company: string;
  role?: UserRole;
}

enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
}

type LoginInput = Pick<User, 'email' | 'password'>;

export { User, LoginInput };
