import { UserModel } from "../users/users.interface";

interface PermissionPages {
  page_id: number;
  nivel_acceso: string;
  path: string;
}

export interface AuthUserModel {
  user: UserModel;
  access_token: string;
  company: string;
  permissions: PermissionPages[];
}