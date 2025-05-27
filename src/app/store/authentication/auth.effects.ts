import { Injectable } from "@angular/core";
import { AuthUserService } from "@app/core/services/auth-service/auth-user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { loadAuthUserFailure } from "./auth.actions";

@Injectable()
export class ItemsEffect {

  loadItems$ = createEffect( () => this.actions$.pipe(
    ofType('[Auth User] Load Auth User'),
    mergeMap(() => this.authService$.getDataApi()
    .pipe(
      map( user => ({ type: '[Auth User] Loaded Success', user})),
      catchError(error => of(loadAuthUserFailure({ error })))
    ))
   )
  )

  constructor(
    private actions$: Actions,
    private authService$: AuthUserService
  ){}
}