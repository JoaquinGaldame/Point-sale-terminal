import { Routes } from '@angular/router';
import { AuthSignInComponent } from './sign-in.component';

export const SIGN_IN_ROUTES: Routes = [
  {
    path     : '',
    component: AuthSignInComponent,
  },
] as Routes;
