import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
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

export const users = sqliteTable('users', {
  id: id(),
  createdAt: createdAt(),
  updatedAt: createdAt(),
  email: text('email').notNull().unique(),
  imageUrl: text('image_url'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  middleName: text('middle_name'),
  username: text('username'),
})

export const userProfile = sqliteTable('user_profile', {
  id: id(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  displayName: text('display_name'),
  userInfo: text('user_info'),

  currentPreferredLanguage: text('current_preferred_language'),
  createdAt: createdAt(),
  updatedAt: createdAt(),
})

export const sentenceList = sqliteTable('game_records', {
  id: integer('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  sentence: text('sentence'),
  translatedSentence: text('translatedSentence'),
  language: text('language'),
  translation_language: text('translation_language'),
  groupId: id(),
  groupName: text('groupName'),
  sortOrder: integer('sortOrder'),
  archived: integer({ mode: 'boolean' }),
  updatedAt: createdAt(),
  createdAt: createdAt(),
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertUserProfile = typeof userProfile.$inferInsert
export type SelectUserProfile = typeof userProfile.$inferSelect

export type InsertGameRecords = typeof sentenceList.$inferInsert
export type SelectGameRecords = typeof sentenceList.$inferSelect
