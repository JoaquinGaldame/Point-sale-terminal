import { UserModel } from "@app/core/features/users/users.interface";
import { ErrorResponse } from "@app/core/models/Api.interface";
import { createAction, props } from "@ngrx/store";

export const loadUser = createAction(
  '[User] Load User'
)

export const loadedUserSuccess = createAction(
  '[User] Loaded User Success',
  props<{ selectedUser: UserModel }>()
)

export const loadUserFailure = createAction(
  '[User] Loaded User Failure',
  props<{ error: ErrorResponse }>()
)

export const loadAllUsers = createAction(
  '[User] Load All Users'
)

export const loadedAllUserSuccess = createAction(
  '[User] Loaded All User Success',
  props<{ users: UserModel[] }>()
)

export const loadAllUserFailure = createAction(
  '[User] Loaded All User Failure',
  props<{ error: ErrorResponse }>()
)