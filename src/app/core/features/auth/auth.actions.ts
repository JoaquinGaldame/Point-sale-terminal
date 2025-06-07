import { AuthUserModel } from "./auth.interface";
import { ErrorResponse } from "@app/core/models/Api.interface";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
)

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AuthUserModel }>()
)

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: ErrorResponse }>()
)

// --- Logout
export const logout = createAction(
  '[Auth] Logout'
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

export const logoutFailure = createAction(
  '[Auth] Logout Failure',  // <- este type estaba mal antes
  props<{ error: ErrorResponse }>()
);


export const sigIn = createAction(
  '[Auth] Sign-in',
  props<{ username: string; password: string, rememberMe: boolean }>()
)

export const sigInSuccess = createAction(
  '[Auth] Sign-in Success',
  props<{ user: AuthUserModel }>()
)

export const sigInFailure = createAction(
  '[Auth] Sign-in Failure',
  props<{ error: ErrorResponse }>()
)
