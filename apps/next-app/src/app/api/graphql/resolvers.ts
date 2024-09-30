import { getUser } from './resolvers/user'
import {
  handleTokenValidationError,
  TOKEN_VALID,
  UserContext,
  validateToken,
} from './utils'

const resolvers = {
  Query: {
    currentUser: async (_, _, ctx: UserContext) => {
      const result = validateToken(ctx.jwtData)
      if (result !== TOKEN_VALID) {
        handleTokenValidationError(result)
      }
      return await getUser()
    },
  },
}

export default resolvers
