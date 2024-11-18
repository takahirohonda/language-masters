# design-system

This library was generated with [Nx](https://nx.dev).

## Setting up

```bash
# First, set up a react library
yarn nx g @nx/react:library
# Then add configuration
yarn nx g @nx/react:storybook-configuration
```

## Running unit tests

Run `nx test design-system` to execute the unit tests via [Vitest](https://vitest.dev/).

## Troubleshooting

```bash
Failed to resolve entry for package "crypto". The package may have incorrect main/module/exports specified in its package.json. [plugin vite:dep-pre-bundle]
```

**Resolution**

We shouldn't use crypto package from npm because it's deprecated (https://www.npmjs.com/package/crypto). Vite uses build-in crypto module from Node.js. `crypto` as introduces when I was mucking around with Drizzle (see details in this PR https://github.com/takahirohonda/language-masters/pull/2).

See https://github.com/vitejs/vite/issues/12602.

```bash
yarn remove crypto
```
