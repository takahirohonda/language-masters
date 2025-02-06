import { currentUser } from '@clerk/nextjs/server'

import { createUser, getUserByEmail } from '../../db/user'
import { LOGGED_IN_USER_LANDING_PAGE } from '../../const/routes'
import { redirect } from 'next/navigation'

const NewUser = async () => {
  const user = await currentUser()

  if (!user) {
    console.error('[Core] No user from currentUser()')
    return
  }

  const { firstName, lastName, emailAddresses, imageUrl, username } = user
  const email = emailAddresses?.[0].emailAddress

  console.log(`checking user from currentUser: ${email}`)

  const userInDb = await getUserByEmail(email)

  console.log(`checking userInDb: ${JSON.stringify(userInDb)}`)

  if (userInDb[0]) {
    redirect(LOGGED_IN_USER_LANDING_PAGE)
  } else {
    const createUserOutcome = await createUser({
      email,
      firstName,
      lastName,
      imageUrl,
      username,
    })

    console.log(
      `checking createUserOutcome: ${JSON.stringify(createUserOutcome)}`
    )
  }
  redirect(LOGGED_IN_USER_LANDING_PAGE)
}

export default NewUser
