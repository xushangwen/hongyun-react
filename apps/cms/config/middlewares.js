'use strict'

module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: env('CORS_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:3001,http://127.0.0.1:3001')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '2mb',
      formLimit: '2mb',
      textLimit: '2mb',
      formidable: { maxFileSize: 50 * 1024 * 1024 },
    },
  },
  'strapi::session',
  {
    name: 'strapi::favicon',
    config: { path: '../../public/assets/icons/hy_favicon.png' },
  },
  'strapi::public',
]
