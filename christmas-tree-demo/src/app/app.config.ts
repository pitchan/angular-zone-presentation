import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// ⚠️ NOTE PÉDAGOGIQUE IMPORTANTE ⚠️
// Pour l'instant, on active Zone.js (coalescing: true est une bonne pratique).
// Si tu veux tester le VRAI mode zoneless, remplace provideZoneChangeDetection 
// par provideExperimentalZonelessChangeDetection().
// ATTENTION : Si tu fais ça, la page 1 (Zone.js) ne fonctionnera plus automatiquement 
// car setInterval ne déclenchera plus le refresh ! C'est la preuve que Zone a disparu.

export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
