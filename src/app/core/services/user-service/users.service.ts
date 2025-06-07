import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '@app/core/features/users/users.interface';
import { map, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService
{
  private _httpClient = inject(HttpClient);
  private _user: ReplaySubject<UserModel> = new ReplaySubject<UserModel>(1);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: UserModel)
  {
      // Store the value
      this._user.next(value);
  }

  get user$(): Observable<UserModel>
  {
      return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current signed-in user data
   */
  get(): Observable<UserModel>
  {
      return this._httpClient.get<UserModel>('api/common/user').pipe(
          tap((user) =>
          {
              this._user.next(user);
          }),
      );
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: UserModel): Observable<any>
  {
      return this._httpClient.patch<UserModel>('api/common/user', {user}).pipe(
          map((response) =>
          {
              this._user.next(response);
          }),
      );
  }
}
