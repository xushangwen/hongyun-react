'use strict'

module.exports = ({ env }) => ({
  host: env('HOST', '127.0.0.1'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', undefined),
  proxy: env.bool('IS_PROXIED', false) ? { koa: true } : false,
  app: { keys: env.array('APP_KEYS') },
  webhooks: { populateRelations: false },
})
