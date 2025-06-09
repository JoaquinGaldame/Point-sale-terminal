import { inject, Injectable } from '@angular/core';
import { Navigation } from './navigation.types';
import { MENU_DEFINED } from './navigation';
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
  constructor() {
    const data: Navigation = {
    menu: MENU_DEFINED,
  };
    this._navigation.next(data);
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
      const data: Navigation = {
        menu: MENU_DEFINED
      }
      this._navigation.next(data)
      return this.navigation$;
      // return this._httpClient.get<Navigation>('api/common/navigation').pipe(
      //   tap((navigation) =>
      //   {
      //       this._navigation.next(navigation);
      //   }),
      // );
    }
}
