import {
  SignedIn,
  SignUp,
  SignIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
  useAuth,
} from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useGetCurrentUserQuery } from './graphql/GetCurrentUser.generated'
import { useNavigate } from 'react-router-dom'
import { SIGN_IN } from '../../const/routes'

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
