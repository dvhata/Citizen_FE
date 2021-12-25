import { UserData } from "./UserData";

export interface User {
  success?: boolean;
  user?: UserData;
  users?: UserData[];
  is_active?: number;
  token?: string;
  message?:string;
}