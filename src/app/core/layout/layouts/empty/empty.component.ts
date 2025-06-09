import { NgIf } from '@angular/common';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from '@app/core/Common/Components/alert/alert.component';
import { AlertService } from '@app/core/Common/Components/alert/alert.service';
import { AlertData } from '@app/core/Common/Components/alert/alert.types';
import { Subject } from 'rxjs';

@Component({
    selector     : 'empty-layout',
    templateUrl  : './empty.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, RouterOutlet, AlertComponent],
})
export class EmptyLayoutComponent implements OnDestroy
{
  alerta: AlertData| null = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _alertService: AlertService,
  )
  {
    this._alertService.alerta$.subscribe((data) => {
      this.alerta = data;
    });
  }

  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}