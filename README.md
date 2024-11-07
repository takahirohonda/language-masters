# Language Masters

In progress...

## 1. Get started

```bash
yarn nx dev react-app
yarn nx dev next-app
```

## 2. Get affected projects

```bash
yarn nx affected --target=build --base=origin/main --head=HEAD --graph
# just show affected projects
yarn nx show projects --affected
# Show Only apps
yarn nx show projects --affected --type app --base=origin/main --head=HEAD
# Can exclude end to end
nx show projects --affected --exclude=*-e2e
```

## REFERENCE

1. Creating projects

```bash
yarn nx g @nx/react:app react-app
yarn nx g @nx/next:app next-app

# Added a component lib
yarn nx g lib common --directory=components
```

2. Adding Tailwind CSS for react and next project.

```bash
nx g @nx/react:setup-tailwind --project=react-app
nx g @nx/react:setup-tailwind --project=next-app
nx g @nx/react:setup-tailwind --project=components-common
```

Reference: https://nx.dev/recipes/react/using-tailwind-css-in-react#step-4:-applying-configuration-to-libraries

3. Troubleshooting after adding eslint file

```bash
# Cannot find module 'eslint-plugin-jest'
yarn add eslint-plugin-jest eslint-plugin-prettier -D
```

# (1) Drizzle cheat sheet

1. Defining auto increment integer

Use `serial` if you need `integer autoincrement`.

2. Select: https://orm.drizzle.team/docs/select

```ts
import { eq, lt, gte, ne } from 'drizzle-orm'
await db.select().from(users).where(eq(users.id, 42))
await db.select().from(users).where(lt(users.id, 42))
await db.select().from(users).where(gte(users.id, 42))
await db.select().from(users).where(ne(users.id, 42))
```

# (2) Drizzle Kid Reference

```bash
yarn drizzle-kit generate --config=apps/next-app/drizzle.config.ts
export NODE_TLS_REJECT_UNAUTHORIZED=0
yarn drizzle-kit migrate --config=apps/next-app/drizzle.config.ts
```

# (3) Xata

Connection string -> if there is no port in the connection string, it should be empty.

```bash
postgresql://[User]:[Password]@[Host]:[Port]/[Database]
```

## Troubleshoot

### 1. no migration file...

```bash
[⣷] applying migrations...Error: Can't find meta/_journal.json file
    at readMigrationFiles (/Users/taka/code/mdh/language-masters/node_modules/src/migrator.ts:41:9)
    at migrate (/Users/taka/code/mdh/language-masters/node_modules/src/postgres-js/migrator.ts:9:21)
    at migrateFn (/Users/taka/code/mdh/language-masters/node_modules/drizzle-kit/bin.cjs:71903:18)
    at Object.handler (/Users/taka/code/mdh/language-masters/node_modules/drizzle-kit/bin.cjs:83571:11)
    at async run (/Users/taka/code/mdh/language-masters/node_modules/drizzle-kit/bin.cjs:82064:7)
```

This is because we haven't generated a migration file. use `yarn drizzle-kit generate ...`.

### 2. path for the migration file is wrong because \_\_dirname doesn't work in drizzle.config.ts file

```bash
Error: ENOENT: no such file or directory, open './/Users/taka/code/mdh/language-masters/apps/next-app/src/app/drizzle/migration/meta/0000_snapshot.json'
```

```ts
// __dirname doesn't work when running drizzle kit generate and migrate...
  // out: path.join(__dirname, 'src/app/drizzle/migration'),
  // schema: path.join(__dirname, 'src/app/drizzle/schema.ts'),
  out: './apps/next-app/src/app/drizzle/migration',
  schema: './apps/next-app/src/app/drizzle/schema.ts',
```

### 1. Read session and user data

https://clerk.com/docs/references/nextjs/read-session-data

`auth()` and `currentUser()` are App Router-specific helpers to user inside `Route Handlers`, `Middleware`, `Server Components` and `Server Actions`.

Output from `auth()`

```json
{
  "sessionClaims": {
    "azp": "http://localhost:3000",
    "exp": 1727128615,
    "iat": 1727128555,
    "iss": "https://main-man-74.clerk.accounts.dev",
    "nbf": 1727128545,
    "sid": "sess_2mUPw2i9V6osbyNjXPSTkV8ufjE",
    "sub": "user_2m8mLE6IqB4ynLlwmOtOQEC1C2j"
  },
  "sessionId": "sess_2mUPw2i9V6osbyNjXPSTkV8ufjE",
  "userId": "user_2m8mLE6IqB4ynLlwmOtOQEC1C2j"
}
```

```json
{
  "id": "user_2m8mLE6IqB4ynLlwmOtOQEC1C2j",
  "passwordEnabled": false,
  "totpEnabled": false,
  "backupCodeEnabled": false,
  "twoFactorEnabled": false,
  "banned": false,
  "locked": false,
  "createdAt": 1726466519641,
  "updatedAt": 1727128417032,
  "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybThtTEh0Vmp3a1RTV0N4a1FRSnZ6clhINjYifQ",
  "hasImage": true,
  "primaryEmailAddressId": "idn_2m8mLIZwAavzlzKBkFU9wi4D3xP",
  "primaryPhoneNumberId": null,
  "primaryWeb3WalletId": null,
  "lastSignInAt": 1727128416996,
  "externalId": null,
  "username": null,
  "firstName": "Takahiro ",
  "lastName": "Honda",
  "publicMetadata": {},
  "privateMetadata": {},
  "unsafeMetadata": {},
  "emailAddresses": [
    {
      "id": "idn_2m8mLIZwAavzlzKBkFU9wi4D3xP",
      "emailAddress": "takahiro.honda@myzeller.com",
      "verification": {
        "status": "verified",
        "strategy": "from_oauth_google",
        "externalVerificationRedirectURL": null,
        "attempts": null,
        "expireAt": null,
        "nonce": null
      },
      "linkedTo": [{ "id": "idn_2m8mLH4vqGfkI0tIidW9SFFE1IQ", "type": "oauth_google" }]
    }
  ],
  "phoneNumbers": [],
  "web3Wallets": [],
  "externalAccounts": [
    {
      "id": "idn_2m8mLH4vqGfkI0tIidW9SFFE1IQ",
      "approvedScopes": "email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile",
      "emailAddress": "takahiro.honda@myzeller.com",
      "imageUrl": "",
      "username": "",
      "publicMetadata": {},
      "label": null,
      "verification": {
        "status": "verified",
        "strategy": "oauth_google",
        "externalVerificationRedirectURL": null,
        "attempts": null,
        "expireAt": 1726467118028,
        "nonce": null
      }
    }
  ],
  "samlAccounts": [],
  "lastActiveAt": 1727128417064,
  "createOrganizationEnabled": true,
  "createOrganizationsLimit": null
}
```

# Test with Jest and react-testing-lib

## (1) TypeError: expect(...).toBeVisible is not a function

This is caused by missing @testing-library/jest-dom.

- (1) configure jest-dom with testing library
  Then, add `setupTests.ts` in `src`.

```ts
import '@testing-library/jest-dom'
```

Then add this line in `jest.config.ts`.

```ts
 setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
```

- (2) Add css module & jest-dom types

Add this line in `tsconfig.spec.json`

```json
{
...
// jest and node types are added by default
 "types": ["jest", "node",
    // these two lines should be added
    "@nx/react/typings/cssmodule.d.ts",
    "@testing-library/jest-dom"
    ]
}

```
