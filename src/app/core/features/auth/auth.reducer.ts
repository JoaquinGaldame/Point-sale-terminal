import { createReducer, on } from "@ngrx/store";
import { AuthUserState } from "@app/store/states/auth.state";
import { 
  login, 
  loginSuccess, 
  loginFailure,
  sigIn,
  sigInSuccess,
  sigInFailure,
  logout,
  logoutSuccess,
  logoutFailure
} from "./auth.actions";

export const initialState: AuthUserState= {
  loading: false,
  rememberMe: false,
  user: null,
  error: null,
  initialized: false,
}

export const authUserReducer = createReducer(
  initialState,
  
  on(login, (state) => ({
    ...state, 
    loading: true
  })),

  on(loginSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    user: user,
    initialized: true
  })),

  on(loginFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
    initialized: true
  })),

  // --- Logout
  on(logout, (state) => ({
    ...state,
    loading: true
  })),

  on(logoutSuccess, () => ({
    ...initialState  // limpiamos completamente el estado al hacer logout
  })),

  on(logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(sigIn, (state) => ({
    ...state, 
    loading: true
  })),

  on(sigInSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    user: user,
    initialized: true,
  })),

  on(sigInFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  }))
)