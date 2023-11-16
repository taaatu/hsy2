interface User {
  user_id?: number;
  email: string;
  password: string;
  full_name: string;
  company: string;
  user_group?: UserGroup;
}

enum UserGroup {
  ADMIN = 0,
  MANAGER = 1,
}

type LoginInput = Pick<User, 'email' | 'password'>;

export { UserGroup };
export type { User, LoginInput };
