import { createReducer, on } from "@ngrx/store";
import { AuthUserState } from "@app/core/models/auth/auth.state";
import { 
  loadAuthUser, 
  loadedAuthUserSuccess, 
  loadAuthUserFailure 
} from "./auth.actions";

export const initialState: AuthUserState= {
  loading: false,
  user: null,
  error: null
}

export const authUserReducer = createReducer(
  initialState,
  
  on(loadAuthUser, (state) => ({
    ...state, 
    loading: true
  })),

  on(loadedAuthUserSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    user: user
  })),

  on(loadAuthUserFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  }))
)