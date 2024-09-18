# (1) Drizzle cheat sheet

1. Defining auto increment integer

Use `serial` if you need `integer autoincrement`.

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
