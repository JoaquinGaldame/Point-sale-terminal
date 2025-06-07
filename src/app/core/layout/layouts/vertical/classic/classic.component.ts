import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// import { MessagesComponent } from 'app/layout/common/messages/messages.component';
// import { SearchComponent } from 'app/layout/common/search/search.component';
// import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'classic-layout',
    templateUrl  : './classic.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatButtonModule, MatIconModule, RouterOutlet],
})
export class ClassicLayoutComponent implements OnInit, OnDestroy
{
  isScreenSmall: boolean;
  // navigation: Navigation;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    // private _navigationService: NavigationService,
  )
  {
  }


  get currentYear(): number
  {
    return new Date().getFullYear();
  }


  ngOnInit(): void
  {
  }


  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}