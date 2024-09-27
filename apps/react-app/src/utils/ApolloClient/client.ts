import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client'

export const getClient = ({ uri, token }: { uri: string; token: string }) => {
  const httpLink = createHttpLink({ uri, credentials: 'include' })

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return forward(operation)
  })

  return new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
}
