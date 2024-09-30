import { getUsers } from '../../../../db/user'

export const getUser = async () => {
  const userInDb = await getUsers()
  const {
    id,
    createdAt,
    firstName,
    lastName,
    displayName,
    email,
    defaultLanguage,
    imageUrl,
  } = userInDb[0]

  return {
    id,
    createdAt,
    firstName,
    lastName,
    displayName,
    email,
    defaultLanguage,
    imageUrl,
  }
}
