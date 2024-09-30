import dayjs from 'dayjs'
import { GraphQLError } from 'graphql/error'

export type UserData = {
  email: string
  exp: number
}

export type UserContext = {
  jwtData: UserData
}
export const NOT_AUTHENTICATED = 'Not Authenticated'
export const TOKEN_EXPIRED = 'Token Expired'
export const TOKEN_VALID = 'Token Valid'

export type TOKEN_CHECK_OUTCOME =
  | typeof NOT_AUTHENTICATED
  | typeof TOKEN_EXPIRED
  | typeof TOKEN_VALID

export const validateToken = (
  userDataFromToken: UserData | null
): TOKEN_CHECK_OUTCOME => {
  if (!userDataFromToken || !userDataFromToken.email) {
    return NOT_AUTHENTICATED
  }

  const expirationTime = dayjs.unix(userDataFromToken.exp)
  const currentTime = dayjs()

  if (currentTime.isAfter(expirationTime)) {
    return TOKEN_EXPIRED
  }

  return TOKEN_VALID
}

export const handleTokenValidationError = (outcome: TOKEN_CHECK_OUTCOME) => {
  switch (outcome) {
    case NOT_AUTHENTICATED:
      throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
    case TOKEN_EXPIRED:
      return 'TOKEN_TIMEOUT'
    default:
      throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
  }
}
