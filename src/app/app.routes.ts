import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutComponent } from './core/layout/layout.component';


export const routes: Routes = [
  // Redirección inicial
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},
  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {path: 'sign-in', loadChildren: () => import('src/app/modules/auth/sign-in/sign-in.routes').then(m =>m.SIGN_IN_ROUTES)},
    ]
  },



  // Auth routes for authenticated users
  {
    path: 'session',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {
        path: 'sign-out', 
        loadChildren: () => import('src/app/modules/auth/sign-out/sing-out.routes').then(m =>m.SIGN_OUT_ROUTES)
      },
      {
        path: 'unlock-session', 
        loadChildren: () => import('src/app/modules/auth/unlock-session/unlock-session.routes').then(m => m.UNLOCK_ROUTES)
      }
    ]
  },


  // Landing routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {
        path: 'home', 
        loadChildren: () => import('src/app/modules/home/home.routing').then(m => m.HOME_ROUTES)
      },
    ]
  },

  // {
  //   path: 'login',
  //   loadChildren: () => import('./auth/login/login.routes').then(m => m.LOGIN),
  // },
  // {
  //   path: '',
  //   canActivateChild: [authGuard],  // protege todas las hijas
  //   loadChildren: () => import('./core/layout/app.routes').then(m => m.APP_ROUTES),
  // },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  // }
];