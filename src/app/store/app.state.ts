import { ActionReducerMap } from "@ngrx/store";
// States
import { AuthUserState } from "@app/store/states/auth.state";
import { UserState } from "./states/users.state";

// Reducers
import { authUserReducer } from "../core/features/auth/auth.reducer";
import { usersReducer } from "../core/features/users/users.reducer";


// Pueden ir definidos otros datos de los demás componentes
export interface AppState {
  auth: AuthUserState;
  users: UserState;
  //favourites: favouriteState
  //user: userState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authUserReducer,
  users: usersReducer
}
