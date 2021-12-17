import { UserData } from "./UserData";

export interface User {
  success?: boolean;
  user?: UserData;
  is_active?: number;
  token?: string;
  message?:string;
}