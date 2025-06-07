import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { filter, map, take } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { selectAuthUser,selectAuthInitialized } from '@app/core/features/auth/auth.selectors';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);

  return combineLatest([
  store.select(selectAuthUser),
  store.select(selectAuthInitialized)
]).pipe(
  filter(([_, initialized]) => initialized), // Espera hasta que esté inicializado
  take(1),
  map(([user]) => {
    if (user) return true;
    return router.parseUrl(`sign-in`);
  })
);
};