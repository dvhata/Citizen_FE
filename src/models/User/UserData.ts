export interface UserData {
    id?: number;
    name?: string;
    role?: number;
    permission?: string;
    start_at?: Date;
    end_at?: Date;
    area?:string;
    password?:string;
    is_active?: boolean;
  }