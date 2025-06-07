import { AuthUserModel } from "@app/core/features/auth/auth.interface";
import { ErrorResponse } from "../../core/models/Api.interface";

export interface AuthUserState {
  loading: boolean;
  rememberMe: boolean;
  user: AuthUserModel | null;
  error: ErrorResponse | null;
  initialized: boolean;
}