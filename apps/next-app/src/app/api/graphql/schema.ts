// Adding #graphql to the beginning of a template literal
// provides GraphQL syntax highlighting in supporting IDEs

const schema = `#graphql
type Query {
	currentUser: User
}

type User {
	id: ID
	createdAt: String
	firstName: String
	lastName: String
	displayName: String
	email: String
	defaultLanguage: String
	imageUrl: String
}
`

export default schema

