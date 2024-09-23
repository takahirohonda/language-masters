import { drizzle } from 'drizzle-orm/node-postgres'
import { getXataClient } from './xata' // Generated client
import { Client } from 'pg'

export const getDb = () => {
  const xata = getXataClient()
  const client = new Client({ connectionString: xata.sql.connectionString })
  const db = drizzle(client)
  return {
    db,
  }
}
