import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { selectAuthUser } from '@app/core/features/auth/auth.selectors';

export const NoAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);

  return store.select(selectAuthUser).pipe(
    take(1),
    map((user) => {
      if (user) {
        // return router.parseUrl('/home');
        return router.createUrlTree(['/home']);
      }

      return true;
    })
  );
};