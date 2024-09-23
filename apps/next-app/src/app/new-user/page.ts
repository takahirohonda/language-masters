import { auth, currentUser } from '@clerk/nextjs/server'

const NewUser = async () => {
  const data = auth()
  const currentUserData = await currentUser()

  console.log(JSON.stringify(data))
  console.log(JSON.stringify(currentUserData))
}

export default NewUser
