require('dotenv').config({ path: 'apps/next-app/.env' })
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  // __dirname doesn't work when running drizzle kit generate and migrate...
  // out: path.join(__dirname, 'src/app/drizzle/migration'),
  out: './apps/next-app/src/drizzle/migration',
  schema: './apps/next-app/src/drizzle/schema.ts',
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
