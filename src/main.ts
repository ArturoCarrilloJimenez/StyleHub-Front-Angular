import { bootstrapApplication } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, importProvidersFrom } from '@angular/core';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es-ES');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
}).catch((err) => console.error(err));
