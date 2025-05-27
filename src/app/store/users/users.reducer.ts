import { createReducer, on } from "@ngrx/store";
import { UserState } from "@app/core/models/users/users.state";
import { 
  loadUser, 
  loadedUserSuccess, 
  loadUserFailure,
  loadAllUsers,
  loadedAllUserSuccess,
  loadAllUserFailure 
} from "./users.actions";

export const initialState: UserState= {
  items: [],
  selectedUser: null,
  loading: false,
  error: null
}

export const usersReducer = createReducer(
  initialState,
  
  on(loadUser, (state) => ({
    ...state, 
    loading: true
  })),

  on(loadedUserSuccess, (state, {selectedUser}) => ({
    ...state,
    loading: false,
    selectedUser
  })),

  on(loadUserFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

   on(loadAllUsers, (state) => ({
    ...state, 
    loading: true
  })),

  on(loadedAllUserSuccess, (state, {users}) => ({
    ...state,
    loading: false,
    items: users
  })),

  on(loadAllUserFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  }))
)