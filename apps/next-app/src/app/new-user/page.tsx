import { auth, currentUser } from '@clerk/nextjs/server'

import { createUser, getUserByEmail } from '../../db/user'
import { LOGGED_IN_USER_LANDING_PAGE } from '../../const/routes'
import { redirect } from 'next/navigation'

const NewUser = async () => {
  const user = await currentUser()

  if (!user) {
    // handle error here
    return
  }

  const { firstName, lastName, emailAddresses, imageUrl } = user
  const email = emailAddresses?.[0].emailAddress

  console.log(`checking user from currentUser: ${email}`)

  const userInDb = await getUserByEmail(email)

  console.log(`checking userInDb: ${JSON.stringify(userInDb)}`)

  if (userInDb && userInDb.length > 1) {
    redirect(LOGGED_IN_USER_LANDING_PAGE)
  } else {
    const createUserOutcome = await createUser({
      firstName: firstName || '',
      lastName: lastName || '',
      email,
      imageUrl,
    })

    console.log(
      `checking createUserOutcome: ${JSON.stringify(createUserOutcome)}`
    )
  }
  redirect(LOGGED_IN_USER_LANDING_PAGE)
}

export default NewUser
