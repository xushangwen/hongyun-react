'use strict'

const path = require('node:path')

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite')
  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'hongyun_cms'),
        user: env('DATABASE_USERNAME', 'hongyun'),
        password: env('DATABASE_PASSWORD'),
        charset: 'utf8mb4',
        ssl: env.bool('DATABASE_SSL', false)
          ? { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) }
          : false,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  }

  if (!connections[client]) {
    throw new Error(`Unsupported DATABASE_CLIENT: ${client}`)
  }

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  }
}
