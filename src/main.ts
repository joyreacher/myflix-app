import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
/** check for production environment */
if (environment.production) {
  enableProdMode();
}
/** Load app.module.ts */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
