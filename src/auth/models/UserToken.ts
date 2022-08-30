import { UserPayload } from '../models/UserPayload';
export interface UserToken {
  message: string;
  access_token: string;
  user: UserPayload;
}
