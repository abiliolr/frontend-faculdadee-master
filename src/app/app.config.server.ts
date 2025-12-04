import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/**
 * The server-specific application configuration.
 *
 * @remarks
 * This configuration is used when the application is running on the server (SSR).
 * It includes providers for server rendering and server-side routing.
 *
 * @type {ApplicationConfig}
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

/**
 * The merged application configuration for the server.
 *
 * @remarks
 * Combines the common application configuration (`appConfig`) with the server-specific configuration (`serverConfig`).
 *
 * @type {ApplicationConfig}
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
