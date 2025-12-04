import 'zone.js/node';

// MUDANÇA DA CORREÇÃO 1: Importar BootstrapContext
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';

// MUDANÇA 1: Importar AppComponent em vez de App
import { AppComponent } from './app/app'; 
import { config } from './app/app.config.server';

/**
 * Bootstraps the Angular application for server-side rendering (SSR).
 *
 * This function is the entry point for the server application. It initializes
 * the root component (`AppComponent`) with the server-specific configuration (`config`).
 *
 * @param {BootstrapContext} context - The bootstrap context provided by the Angular server platform.
 * @returns {Promise<ApplicationRef>} A promise that resolves with the application reference when bootstrapping is complete.
 */
// MUDANÇA 2: Usar AppComponent aqui também
// MUDANÇA DA CORREÇÃO 2: Aceitar 'context' como argumento
const bootstrap = (context: BootstrapContext) => 
  bootstrapApplication(AppComponent, config, context);

export default bootstrap;
