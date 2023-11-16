import { User } from './User';

interface MessageResponse {
  message: string;
  id?: number;
}

interface TokenResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export type { MessageResponse, TokenResponse };
