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
    take(1), // solo una vez
    map(([user, initialized]) => {
      // Si no hay usuario o no se ha inicializado el estado, redirige
      if (!user || !initialized) {
        return router.parseUrl('/sign-in');
      }
      return true;
    })
  );
};