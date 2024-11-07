import {
  SignedIn,
  SignUp,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from '@clerk/clerk-react'

import { useGetCurrentUserQuery } from './graphql/GetCurrentUser.generated'

export const ClerkTest = () => {
  const { loading, error, data } = useGetCurrentUserQuery()
  const loggedInUser = data?.currentUser

  return (
    <>
      <SignedOut>
        <SignInButton />
        <SignUp />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <SignOutButton />
      </SignedIn>
      {loggedInUser && <p>Logged in user: {JSON.stringify(loggedInUser)}</p>}
    </>
  )
}
