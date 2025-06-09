import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './store/app.state';

// Auth
import { AuthEffect } from './core/features/auth/auth.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideStore(ROOT_REDUCERS), 
    provideEffects(AuthEffect), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
