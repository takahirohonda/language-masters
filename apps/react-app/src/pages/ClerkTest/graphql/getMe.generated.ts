import * as Types from '../../../types/gql-global-types'

import { gql, type TypedDocumentNode } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>

export type MeQueryResponse = { __typename?: 'Query'; me: string | null }

export const Me = gql`
  query Me {
    me
  }
` as unknown as TypedDocumentNode<MeQueryResponse, MeQueryVariables>

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQueryResponse, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQueryResponse, MeQueryVariables>(Me, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQueryResponse, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQueryResponse, MeQueryVariables>(Me, options)
}
export function useMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<MeQueryResponse, MeQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<MeQueryResponse, MeQueryVariables>(Me, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>
export type MeQueryResult = Apollo.QueryResult<
  MeQueryResponse,
  MeQueryVariables
>
