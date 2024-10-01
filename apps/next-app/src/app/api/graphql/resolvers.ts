import { getUser } from './resolvers/user'
import {
  handleTokenValidationError,
  TOKEN_VALID,
  UserContext,
  validateToken,
} from './utils'

const resolvers = {
  Query: {
    currentUser: async (parent, args, ctx: UserContext, info) => {
      const result = validateToken(ctx.jwtData)
      if (result !== TOKEN_VALID) {
        handleTokenValidationError(result)
      }
      return await getUser()
    },
  },
}

export default resolvers
