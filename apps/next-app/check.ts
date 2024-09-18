// import * as dotenv from 'dotenv'
// import { defineConfig } from 'drizzle-kit'

// dotenv.config({ path: 'apps/next-app/.env' })
require('dotenv').config({ path: 'apps/next-app/.env' })

console.log(`
  
  ${JSON.stringify({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  })}
  
  `)
