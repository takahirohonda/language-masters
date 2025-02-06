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
# Show Only apps. We need to pass base and head
yarn nx show projects --affected --type app --base=origin/main --head=HEAD
# Can exclude end to end
nx show projects --affected --exclude=*-e2e
```
