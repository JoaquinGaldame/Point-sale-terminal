import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
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

export const selectErrorAuth = createSelector(
  selectAuthUserFeature,
  (state) => state.error
);

// auth.selectors.ts
export const selectAuthInitialized = createSelector(
  selectAuthUserFeature,
  (state) => state.initialized
);