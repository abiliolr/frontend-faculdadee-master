import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

/**
 * Bootstraps the Angular application.
 *
 * This is the main entry point for the client-side application. It initializes
 * the root component (`AppComponent`) with the provided configuration (`appConfig`).
 *
 * @returns {Promise<void>} A promise that resolves when the application has been successfully bootstrapped.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
