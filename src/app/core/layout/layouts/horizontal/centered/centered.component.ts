import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Navigation } from '@app/core/navigation/navigation.types';
import { NavigationService } from '@app/core/navigation/navigation.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'centered-layout',
    templateUrl  : './centered.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf ,MatButtonModule, MatIconModule, RouterOutlet],
})
export class CenteredLayoutComponent implements OnInit, OnDestroy
{
  navigation: Navigation | null;
  isScreenSmall: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService,
  )
  {
    this.navigation = null;
    this.isScreenSmall = false;
  }

  /**
   * Getter for current year
   */
  get currentYear(): number
  {
      return new Date().getFullYear();
  }

      /**
     * On init
     */
  ngOnInit(): void
  {
    // Subscribe to navigation data
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) =>
    {
      this.navigation = navigation;
    });
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
}