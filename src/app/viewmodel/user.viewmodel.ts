export class User {
  user_id: number;
  name: string;
  email: string;
  phoneNo: string;
  address: string;
  userName: string;
  password: string;
  confPassword?: string;
  created_at: string | null;
  updated_at: string | null;
  userAvatar: string;
  role: string;
  refreshToken?: string;
  accessToken?: string;
}