import { getUser } from "./resolvers/user"

const resolvers = {
  Query: {
    currentUser: async () => await getUser()
  },
}

export default resolvers
