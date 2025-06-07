import { UserModel } from "@app/core/features/users/users.interface";
import { ErrorResponse } from "@app/core/models/Api.interface";

export interface UserState {
  items: UserModel[];
  selectedUser: UserModel | null;
  loading: boolean;
  error: ErrorResponse | null;
}