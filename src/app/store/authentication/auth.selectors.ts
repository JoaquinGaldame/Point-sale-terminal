import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { authUserReducer } from './auth.reducer';

// Selecciona el estado de User Authenticated
export const selectAuthUserFeature = (state: AppState) => state.auth;

// Selecciona la lista de clientes
export const selectAuthUser = createSelector(
  selectAuthUserFeature,
  (state) => state.user || null
);

export const selectLoadingAuth = createSelector(
  selectAuthUserFeature,
  (state) => state.loading
);
