# Language Masters

In progress...

## 1. Get started

```bash
yarn nx dev react-app
yarn nx dev next-app
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
