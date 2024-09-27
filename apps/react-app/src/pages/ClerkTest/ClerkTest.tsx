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

export const ClerkTest = () => {
  // https://clerk.com/docs/references/react/use-auth
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [token, setToken] = useState<string | null>(null)

  const getTokenAsync = async () => {
    const token = await getToken()
    setToken(token)
  }

  useEffect(() => {
    if (isSignedIn) {
      getTokenAsync()
    }
  }, [isSignedIn])

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
      {token && <p>my jwt: ${token}</p>}
    </>
  )
}
