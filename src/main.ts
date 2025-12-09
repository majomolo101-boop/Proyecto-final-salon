import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ← AGREGAR
import { App } from './app/app';
import { routes } from './app/app.routes'; // ← AGREGAR

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // ← ESTO SOLUCIONA EL ERROR
  ]
}).catch((err) => console.error(err));
