import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from './auth.utils';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { AuthUserModel } from '../features/auth/auth.interface';
import { AuthUserService } from '../services/auth-service/auth-user.service';
import { catchError, map, Observable, of, switchMap, take, throwError } from 'rxjs';
import { login, loginSuccess } from '../features/auth/auth.actions';
import { selectAuthUser } from '../features/auth/auth.selectors';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({providedIn: 'root'})
export class AuthService
{
  userAuthenticated$: Observable<AuthUserModel | null>;
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  constructor(
    private store: Store<AppState>,
    private _authUserService: AuthUserService,
    private actions$: Actions
  ){
    this.userAuthenticated$ = this.store.select(selectAuthUser);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  
  
  /**
   * Setter & getter for access token
   */
  set accessToken(token: string)
  {
    sessionStorage.setItem('accessToken', token);
  }

  get accessToken(): string
  {
    return sessionStorage.getItem('accessToken') ?? '';
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any>
  {
      return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any>
  {
      return this._httpClient.post('api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any>
  {
    // Throw error, if the user is already logged in
    if ( this._authenticated )
    {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post('api/auth/sign-in', credentials).pipe(
      switchMap((response: any) =>
      {
        // Store the access token in the local storage
        this.accessToken = response.accessToken;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Store the user on the user service
        // this._authUserService.user = response.user;

        // Return a new observable with the response
        return of(response);
      }),
    );
  }


  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any>
  {
    this._authUserService.getDataApi();
    // Sign in using the token
    return this._httpClient.post('api/auth/sign-in-with-token', {
      accessToken: this.accessToken,
    }).pipe(
        catchError(() =>

          // Return false
          of(false),
        ),
        switchMap((response: any) =>
        {
            // Replace the access token with the new one if it's available on
            // the response object.
            //
            // This is an added optional step for better security. Once you sign
            // in using the token, you should generate a new one on the server
            // side and attach it to the response object. Then the following
            // piece of code can replace the token with the refreshed one.
            if ( response.accessToken )
            {
              this.accessToken = response.accessToken;
            }

            // Set the authenticated flag to true
            this._authenticated = true;

            // Store the user on the user service
            // this._userService.user = response.user;

            // Return true
            return of(true);
        }),
    );
  }


    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
      // Remove the access token from the local storage
      sessionStorage.removeItem('accessToken');

      // Set the authenticated flag to false
      this._authenticated = false;

      // Return the observable
      return of(true);
    }


    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; password: string; company: string }): void
    {
      // return Observable<AuthUserModel>
      const username = user.name;
      const password = user.password;
      // return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { username: string; password: string }): Observable<AuthUserModel>
    {
      // return Observable<any>
      const username = credentials.username;
      const password = credentials.password;
      // return this._httpClient.post('api/auth/unlock-session', credentials);
      this.store.dispatch(login({username, password}))
      return this.actions$.pipe(
          ofType(loginSuccess), // <- tu acción de éxito
          map(action => action.user),
          take(1),
        catchError(() => {
          throw new Error('Login failed');
      })
  );
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
      // Check if the user is logged in
      if ( this._authenticated )
      {
        return of(true);
      }

      // Check the access token availability
      if ( !this.accessToken )
      {
        return of(false);
      }

      // Check the access token expire date
      if ( AuthUtils.isTokenExpired(this.accessToken) )
      {
        return of(false);
      }

      // If the access token exists, and it didn't expire, sign in using it
      return this.signInUsingToken();
    }

}