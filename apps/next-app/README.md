# Main App

## Setting up Database

1. install dependencies

```bash
yarn add @xata.io/cli
yarn add drizzle-orm @xata.io/client
yarn add -D drizzle-kit
```

2. Initialise

```bash
cd apps/next-app
yarn xata auth login
yarn xata init --db https://The-Hondas-Music-s-workspace-l1odfs.ap-southeast-2.xata.sh/db/language-masters:main
```

3. Query

```js
import { getXataClient } from './xata'
const xata = getXataClient()

const record = await xata.db.tableName.read('rec_xyz')
console.log(record)
```
