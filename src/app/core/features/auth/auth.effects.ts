import { Injectable } from "@angular/core";
import { AuthUserService } from "@app/core/services/auth-service/auth-user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RedirectService } from "@app/core/navigation/redirect.service";
import { EMPTY, of } from "rxjs";
import { map, mergeMap, catchError, tap } from "rxjs/operators";
import { loginFailure, sigIn, sigInFailure, sigInSuccess } from "./auth.actions";


@Injectable()
export class ItemsEffect {
  constructor(
    private actions$: Actions,
    private authService$: AuthUserService,
    private router: Router,
    private redirectService: RedirectService
  ){}

  login$ = createEffect( () => this.actions$.pipe(
    ofType('[Auth] Login'),
    mergeMap(action => this.authService$.getDataApi()
    .pipe(
      map( user => ({ type: '[Auth] Login Success', user})),
      catchError(error => of(loginFailure({ error })))
    ))
   )
  )

sigIn$ = createEffect(() =>
  this.actions$.pipe(
    ofType(sigIn),
    mergeMap(action =>
      this.authService$.getDataApi().pipe(
        map(user => sigInSuccess({ user })),
        catchError(error => of(sigInFailure({ error })))
      )
    )
  )
);

  redirectOnLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sigInSuccess),
      tap(() => {
      const url = this.redirectService.getRedirectURL();
      this.router.navigateByUrl(url);
      this.redirectService.clearRedirectURL();
      })
    ),
    { dispatch: false }
  );

}