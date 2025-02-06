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

# (3) Tailwind

## 3-1 Customising Tailwind container

- Configure custom container size

https://tailwindcss.com/docs/container
None width: 100%;

This is the default.

```bash
sm (640px) max-width: 640px;
md (768px) max-width: 768px;
lg (1024px) max-width: 1024px;
xl (1280px) max-width: 1280px;
2xl (1536px) max-width: 1536px;
```

Change it to this one.

```ts
export const BREAKPOINT = {
  XS: 640, // tablet - portrait
  SM: 768, // tablet - landscape
  MD: 1024, // laptop - smaller
  LG: 1280, // laptop - medium
  XL: 1536, // desktop
  XXL: 1920, // desktop - extra wide
} as const
```

We can add new breakpoints like this:

```ts
module.exports = {
  theme: {
    extend: {
      screens: {
        xs: '460px',
        sm: '768px',
        md: '1024px',
        lg: '1280px',
        xl: '1536px',
        '2xl': '1920px',
      },
    },
  },
  plugins: [],
}
```

# (4) Clerk Session and User data examples

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
  "firstName": "Test",
  "lastName": "Account",
  "publicMetadata": {},
  "privateMetadata": {},
  "unsafeMetadata": {},
  "emailAddresses": [
    {
      "id": "idn_2m8mLIZwAavzlzKBkFU9wi4D3xP",
      "emailAddress": "myemailaddress@email.com",
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
      "emailAddress": "myemailaddress@email.com",
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
