import { AuthUserModel } from "./auth.interface";
import { ErrorResponse } from "../Api.interface";

export interface AuthUserState {
  loading: boolean;
  user: AuthUserModel | null;
  error: ErrorResponse | null;
}