import { InsertUser, SelectUser, users } from '../drizzle/schema'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async (email: SelectUser['email']) => {
  const user = await db.select().from(users).where(eq(users.email, email))

  return user
}

export const getUsers = async () => {
  const allUsers = await db.select().from(users)

  return allUsers
}

export const createUser = async (user: InsertUser) => {
  return db.insert(users).values(user)
}
