'use strict'

module.exports = {
  apps: [
    {
      name: 'hongyun-cms',
      cwd: './apps/cms',
      script: 'node_modules/@strapi/strapi/bin/strapi.js',
      args: 'start',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '1337',
      },
    },
    {
      name: 'hongyun-api',
      cwd: './apps/api',
      script: '.output/server/index.mjs',
      interpreter: 'node',
      // Nitro production runtime does not load apps/api/.env by itself.
      interpreter_args: '--env-file=.env',
      // BFF cache and abuse limits are process-local; keep one worker until
      // a shared Redis cache/rate-limit store is configured.
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        NITRO_HOST: '127.0.0.1',
        NITRO_PORT: '3001',
      },
    },
    {
      name: 'hongyun-resume-scan',
      cwd: './apps/cms',
      script: 'scripts/process-resumes.js',
      autorestart: false,
      cron_restart: '*/10 * * * *',
      env: { NODE_ENV: 'production' },
    },
    {
      name: 'hongyun-retention-cleanup',
      cwd: './apps/cms',
      script: 'scripts/retention-cleanup.js',
      autorestart: false,
      cron_restart: '15 3 * * *',
      env: { NODE_ENV: 'production' },
    },
  ],
}
