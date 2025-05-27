interface UserData {
  email: string;
  contact_phone: string;
  address: string;
}

export interface UserModel {
  id: string;
  username: string;
  code: string;
  grupo_id: number;
  role: string;
  data?: UserData;
}