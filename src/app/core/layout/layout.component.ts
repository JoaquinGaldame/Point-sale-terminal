import { DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { EmptyLayoutComponent } from './layouts/empty/empty.component';
import { CenteredLayoutComponent } from './layouts/horizontal/centered/centered.component'
import { ClassicLayoutComponent } from './layouts/vertical/classic/classic.component';
import { ClassyLayoutComponent } from './layouts/vertical/classy/classy.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, EmptyLayoutComponent, CenteredLayoutComponent, ClassyLayoutComponent, ClassicLayoutComponent],
})
export class LayoutComponent implements OnInit, OnDestroy
{
  layout: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document: any,
    private _renderer2: Renderer2,
    private _router: Router
  )
  {
    this.layout = 'empty';
  }
  
  ngOnInit(): void
  {
    // Subscribe to NavigationEnd event
    this._router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll),
    ).subscribe(() =>
    {
        // Update the layout
        this._updateLayout();
    });
  }
  

  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

      /**
     * Update the selected layout
     */
    private _updateLayout(): void
    {
        // Get the current activated route
        let route = this._activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }

        // 1. Set the layout from the config
        this.layout = "centered"

        // 2. Get the query parameter from the current route and
        // set the layout and save the layout to the config
        // const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout');
        // if ( layoutFromQueryParam )
        // {
        //     this.layout = layoutFromQueryParam;
        //     if ( this.config )
        //     {
        //         this.config.layout = layoutFromQueryParam;
        //     }
        // }

        // 3. Iterate through the paths and change the layout as we find
        // a config for it.
        //
        // The reason we do this is that there might be empty grouping
        // paths or componentless routes along the path. Because of that,
        // we cannot just assume that the layout configuration will be
        // in the last path's config or in the first path's config.
        //
        // So, we get all the paths that matched starting from root all
        // the way to the current activated route, walk through them one
        // by one and change the layout as we find the layout config. This
        // way, layout configuration can live anywhere within the path and
        // we won't miss it.
        //
        // Also, this will allow overriding the layout in any time so we
        // can have different layouts for different routes.
        const paths = route.pathFromRoot;
        paths.forEach((path) =>
        {
            // Check if there is a 'layout' data
            if ( path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout )
            {
                // Set the layout
                this.layout = path.routeConfig.data.layout;
            }
        });
    }

}