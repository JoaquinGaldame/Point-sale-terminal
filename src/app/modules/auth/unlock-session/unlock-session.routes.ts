import { Routes } from '@angular/router';
import { AuthUnlockSessionComponent } from './unlock-session.component';

export const UNLOCK_ROUTES: Routes = [
  {
    path     : '',
    component: AuthUnlockSessionComponent,
  },
] as Routes;
