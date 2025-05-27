import { ActionReducerMap } from "@ngrx/store";
// States
import { AuthUserState } from "@app/core/models/auth/auth.state";
import { UserState } from "@app/core/models/users/users.state";

// Reducers
import { authUserReducer } from "./authentication/auth.reducer";
import { usersReducer } from "./users/users.reducer";


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
