import { users } from '../app/drizzle/schema'
import { getDb } from './getDb'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async (email: string) => {
  const { db } = await getDb()
  const user = await db.select().from(users).where(eq(users.email, email))

  return user
}

export interface CreateUserArgs {
  firstName: string
  lastName: string
  email: string
  imageUrl?: string
}
export const createUser = async (user: CreateUserArgs) => {
  const { db } = await getDb()
  return db.insert(users).values(user)
}
