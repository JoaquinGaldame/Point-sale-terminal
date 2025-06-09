import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { EmptyLayoutComponent } from './core/layout/layouts/empty/empty.component';


export const routes: Routes = [
  // Redirección inicial
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},
  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: EmptyLayoutComponent,
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
    data: { layout: 'default' },
    children: [
      {
        path: 'home', 
        loadChildren: () => import('src/app/modules/home/home.routing').then(m => m.HOME_ROUTES)
      },
      {
        path: 'ventas', 
        loadChildren: () => import('src/app/modules/ventas/ventas.routing').then(m => m.VENTAS_ROUTES)
      },
      {
        path: 'movCajas', 
        loadChildren: () => import('src/app/modules/movimiento-caja/movimiento-caja.routing').then(m => m.MovimCaja_ROUTES)
      },
      {
        path: 'formEgresoIngreso', 
        loadChildren: () => import('src/app/modules/form-egreso-ingreso/from-egreso-ingreso.routing').then(m => m.FormEgreIngre_ROUTES)
      },
      {
        path: 'reportes', 
        loadChildren: () => import('src/app/modules/reportes/reportes.routing').then(m => m.REPORTES_ROUTES)
      },
      {
        path: 'productos', 
        loadChildren: () => import('src/app/modules/productos/productos.routing').then(m => m.PRODUCTOS_ROUTES)
      }
    ]
  },
];