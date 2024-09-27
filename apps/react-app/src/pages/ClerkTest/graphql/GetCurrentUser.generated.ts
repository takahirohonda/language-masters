import * as Types from '../../../types/gql-global-types'

import { gql, type TypedDocumentNode } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetCurrentUserQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetCurrentUserQueryResponse = {
  __typename?: 'Query'
  currentUser: {
    __typename?: 'User'
    createdAt: string | null
    defaultLanguage: string | null
    displayName: string | null
    email: string | null
    firstName: string | null
    id: string | null
    imageUrl: string | null
    lastName: string | null
  } | null
}

export const GetCurrentUser = gql`
  query GetCurrentUser {
    currentUser {
      createdAt
      defaultLanguage
      displayName
      email
      firstName
      id
      imageUrl
      lastName
    }
  }
` as unknown as TypedDocumentNode<
  GetCurrentUserQueryResponse,
  GetCurrentUserQueryVariables
>

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQueryResponse,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetCurrentUserQueryResponse,
    GetCurrentUserQueryVariables
  >(GetCurrentUser, options)
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQueryResponse,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetCurrentUserQueryResponse,
    GetCurrentUserQueryVariables
  >(GetCurrentUser, options)
}
export function useGetCurrentUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCurrentUserQueryResponse,
        GetCurrentUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetCurrentUserQueryResponse,
    GetCurrentUserQueryVariables
  >(GetCurrentUser, options)
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<
  typeof useGetCurrentUserSuspenseQuery
>
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQueryResponse,
  GetCurrentUserQueryVariables
>
