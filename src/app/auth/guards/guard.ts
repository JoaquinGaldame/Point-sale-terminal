import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '@app/core/features/auth/auth.selectors';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  return store.select(selectAuthUser).pipe(map(auth => !!auth));
};