import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Defines the server-side routes configuration.
 *
 * @remarks
 * This array specifies how routes should be rendered on the server.
 * By default, all routes (`**`) are configured for prerendering (`RenderMode.Prerender`).
 *
 * @type {ServerRoute[]}
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
