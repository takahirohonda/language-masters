# Setting up GraphQL in Next.js

## What's needed?

```bash
yarn add @as-integrations/next @apollo/server graphql
```

[apollo-serve-integration-next](https://github.com/apollo-server-integrations/apollo-server-integration-next)

Verifying JWT from clerk. Used public key (which is in the pem format) from clerk.

```ts
var cert = fs.readFileSync('public.pem') // Make sure to configure this file...
const jwtData = await jwt.verify(token, cert)
```

# GraphQL default scalar types

`Int`: A signed 32‐bit integer.
`Float`: A signed double-precision floating-point value.
`String`: A UTF‐8 character sequence.
`Boolean`: true or false.
`ID`: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.