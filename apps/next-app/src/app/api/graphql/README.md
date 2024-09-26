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
