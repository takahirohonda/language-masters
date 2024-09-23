import { pgTable, text } from 'drizzle-orm/pg-core'
import { randomUUID } from 'crypto'
import { sql } from 'drizzle-orm'

const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

export const users = pgTable('users', {
  id: id(),
  createdAt: createdAt(),
  firstName: text('firstname').notNull(),
  lastName: text('lastname').notNull(),
  middleName: text('middlename'),
  email: text('email').unique().notNull(),
  defaultLanguage: text('default_language'),
  imageUrl: text('image_url'),
})
