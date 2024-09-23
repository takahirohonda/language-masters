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
  firstname: text('name').notNull(),
  lastname: text('name').notNull(),
  middlename: text('name'),
  email: text('email').unique().notNull(),
  defaultLanguage: text('default_language'),
  imgUrl: text('img_url'),
})
