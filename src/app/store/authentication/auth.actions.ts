import { AuthUserModel } from "@app/core/models/auth/auth.interface";
import { ErrorResponse } from "@app/core/models/Api.interface";
import { createAction, props } from "@ngrx/store";

export const loadAuthUser = createAction(
  '[Auth User] Load Auth User'
)

export const loadedAuthUserSuccess = createAction(
  '[Auth User] Loaded Success',
  props<{ user: AuthUserModel }>()
)

export const loadAuthUserFailure = createAction(
  '[Auth User] Loaded Failure',
  props<{ error: ErrorResponse }>()
)