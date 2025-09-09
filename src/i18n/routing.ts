import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Lista de todos los locales soportados
  locales: ['en', 'es'],

  // Usado cuando ningún locale coincide
  defaultLocale: 'en',
});
