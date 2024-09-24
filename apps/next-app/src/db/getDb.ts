import { drizzle } from 'drizzle-orm/node-postgres'
import { getXataClient } from './xata' // Generated client
import { Client } from 'pg'

export const getDb = async () => {
  if (!globalThis.db) {
    const xata = getXataClient()
    const client = new Client({ connectionString: xata.sql.connectionString })
    await client.connect()
    globalThis.db = drizzle(client)
  }

  return { db: globalThis.db }
}
