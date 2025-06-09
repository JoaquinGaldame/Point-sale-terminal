import { DOCUMENT} from '@angular/common';
import { Component, inject, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ToolbarComponent } from './layouts/vertical/toolbar.component';
import { HorizontalComponent } from './layouts/horizontal/horizontal.component';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToolbarService } from '../services/toolbar.service';
import { AlertComponent } from '../Common/Components/alert/alert.component';
import { AlertService } from '../Common/Components/alert/alert.service';
import { AlertData } from '../Common/Components/alert/alert.types';
import { settingService } from '../services/settings.service';
import { ISettings } from '../Settings/settings.interface';
import { AppState } from '@app/store/app.state';

@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [ ToolbarComponent, HorizontalComponent, RouterOutlet, AlertComponent ],
})
export class LayoutComponent implements OnInit, OnDestroy
{
  alerta: AlertData | null = null;
  config: ISettings | null = null;
  layout: string = '';
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private _document: any,
    private _renderer2: Renderer2,
    private _router: Router,
    private _toolbarService: ToolbarService,
    private _alertService: AlertService,
    private _settingsService: settingService
  )
  {
    // Subscription to configuration
    this._settingsService.config$.subscribe(config => {
      this.config = config;
    });
    this._alertService.alerta$.subscribe((data) => {
      this.alerta = data;
    });
  }
  
  ngOnInit(): void
  {
  }

  private getChildRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
  

  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  get sidenavOpen(): boolean {
    return this._toolbarService.isOpen;
  }

  get sidenavFixed(): boolean {
    return this._toolbarService.isFixed;
  }

}