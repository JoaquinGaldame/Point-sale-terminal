import { Routes } from '@angular/router';
import { AuthSignOutComponent } from './sign-out.component';

export const SIGN_OUT_ROUTES: Routes = [
  {
     path     : '',
    component: AuthSignOutComponent,
  },
] as Routes;
