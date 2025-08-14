import { defineConfig } from 'drizzle-kit'

import { env } from './src/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/models',
  out: './drizzle',
  dbCredentials: {
    url: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
  },
})