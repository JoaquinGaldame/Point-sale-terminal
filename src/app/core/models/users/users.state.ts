import { UserModel } from "./users.interface";
import { ErrorResponse } from "../Api.interface";

export interface UserState {
  items: UserModel[];
  selectedUser: UserModel | null;
  loading: boolean;
  error: ErrorResponse | null;
}