import { defineConfig } from 'drizzle-kit'

import { config } from 'dotenv'
config({ path: '.env' })

console.log('TURSO_CONNECTION_URL:', process.env.TURSO_CONNECTION_URL)
console.log('TURSO_AUTH_TOKEN:', process.env.TURSO_AUTH_TOKEN)

export default defineConfig({
  dialect: 'turso',
  out: './apps/next-app/src/drizzle/migration',
  schema: './apps/next-app/src/drizzle/schema.ts',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL ?? '',
    authToken: process.env.TURSO_AUTH_TOKEN ?? '',
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
})
