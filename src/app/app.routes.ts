import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      children:[
        {
          path: 'home',
          loadChildren: () => import('./modules/home/home.routing').then(m=>m.HOME_ROUTES),
        },
        {
          path: 'ventas',
          loadChildren: () => import('./modules/ventas/ventas.routing').then(m=>m.VENTAS_ROUTES),
        },
        {
          path: 'formEgresoIngreso',
          loadChildren: () => import('./modules/form-egreso-ingreso/from-egreso-ingreso.routing').then(m=>m.FormEgreIngre_ROUTES),
        },
        {
          path: 'movimientoCaja',
          loadChildren: () => import('./modules/movimiento-caja/movimiento-caja.routing').then(m=>m.MovimCaja_ROUTES),
        },
        {
          path: 'reportes',
          loadChildren: () => import('./modules/reportes/reportes.routing').then(m=>m.REPORTES_ROUTES),
        },
        {
          path: 'configuracion',
          loadChildren: () => import('./core/Settings/settings.routing').then(m=>m.SETTINGS_ROUTES),
        },
        {
            path: '**',
            redirectTo: 'home',
        },
      ]
    }
  ];
  