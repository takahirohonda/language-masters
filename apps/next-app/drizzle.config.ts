require('dotenv').config({ path: 'apps/next-app/.env' })
import { defineConfig } from 'drizzle-kit'
import * as path from 'path'

export default defineConfig({
  dialect: 'postgresql',
  out: path.join(__dirname, 'src/app/drizzle/migration'),
  schema: path.join(__dirname, 'src/app/drizzle/schema.ts'),
  dbCredentials: {
    host: process.env.DB_HOST!,
    // port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: 'require',
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
})
