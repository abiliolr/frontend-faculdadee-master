// src/app/app.config.ts

// MUDANÇA 1: Importar o provider de Zona
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; 

/**
 * The application configuration.
 *
 * @remarks
 * This configuration object sets up the global providers for the application, including:
 * - Zone change detection.
 * - Router with the defined routes.
 * - HTTP client for making API requests.
 *
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(), 
    provideRouter(routes),
    provideHttpClient()
  ]
};
