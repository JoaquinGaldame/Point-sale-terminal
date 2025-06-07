import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
// import { MessagesComponent } from 'app/layout/common/messages/messages.component';
// import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'classy-layout',
    templateUrl  : './classy.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatIconModule, MatButtonModule, RouterOutlet],
})
export class ClassyLayoutComponent implements OnInit, OnDestroy
{
  isScreenSmall: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
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