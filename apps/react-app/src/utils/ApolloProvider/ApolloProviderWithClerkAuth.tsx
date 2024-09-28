import { useAuth } from '@clerk/clerk-react'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { getClient } from './client'
import { GRAPHQL_NEXT_ENDPOINT } from '../../const/env'
import { ApolloProvider } from '@apollo/client'
import { SIGN_IN } from '../../const/routes'
import { useNavigate } from 'react-router-dom'

export const ApolloProviderWithClerkAuth = ({
  children,
}: {
  children: ReactNode
}) => {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()
  const client = useMemo(
    () =>
      getClient({
        uri: GRAPHQL_NEXT_ENDPOINT,
        token,
      }),
    [token]
  )

  const getTokenAsync = useCallback(async () => {
    const token = await getToken()
    setToken(token)
  }, [getToken])

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate(SIGN_IN)
    }
  }, [isSignedIn, isLoaded, navigate, token])

  useEffect(() => {
    if (isSignedIn) {
      getTokenAsync()
    }
  }, [getTokenAsync, isSignedIn])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
