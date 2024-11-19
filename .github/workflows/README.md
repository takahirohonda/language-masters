## Notes

Trying to deploy react app only when the app or its dependency changed.

```yml
name: Deploy to GitHub Page from main branch
on:
  push:
    branches:
      - main
jobs:
  run-test-deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        os: [ubuntu-latest]
        node-version: [20.x]
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install
        run: |
          yarn install
      - name: Detect affected projects
        id: affected_apps_step
        run: |
          set -x
          AFFECTED=$(yarn nx show projects --affected --type app --base=origin/main --head=HEAD)
          if [ -z "$AFFECTED" ]; then
            echo "No affected apps found."
          else
            echo "Affected apps are: $AFFECTED"
            echo "{affected_apps}={$AFFECTED}" >> $GITHUB_OUTPUT
          fi
      - name: Checking output from affected app step
        run: |
          echo "Affected apps are: ${{ steps.affected_apps_step.outputs.affected_apps }}"
      - name: Build and Deploy react-app if affected
        if: ${{ contains(steps.affected_apps_step.outputs.affected_apps, 'react-app') }}
        run: |
          echo "Deploying affected project: $AFFECTED"
          yarn nx build-ci react-app
      - name: Deploy to Github page
        uses: JamesIves/github-pages-deploy-action@3.7.1
        if: ${{ contains(steps.affected_apps_step.outputs.affected_apps, 'react-app') }}
        with:
          ACCESS_TOKEN: ${{ secrets.LANGUAGE_MASTERS_DEPLOY  }}
          BRANCH: master # The branch the action should deploy to.
          FOLDER: dist/apps/react-app # The folder the action should deploy.
          REPOSITORY_NAME: takahirohonda/takahirohonda.github.io
          TARGET_FOLDER: language-masters-react
          CLEAN: true # Automatically remove deleted files from the deploy branch
```

It seems like the script is working...

Log from github action...

```bash
Run set -x
  set -x
  AFFECTED=$(yarn nx show projects --affected --type app --base=origin/main --head=HEAD)
  if [ -z "$AFFECTED" ]; then
    echo "No affected apps found."
  else
    echo "Affected apps are: $AFFECTED"
    echo "{affected_apps}={$AFFECTED}" >> $GITHUB_OUTPUT
  fi
  shell: /usr/bin/bash -e {0}
++ yarn nx show projects --affected --type app --base=origin/main --head=HEAD
+ AFFECTED='yarn run v1.22.21
$ /home/runner/work/language-masters/language-masters/node_modules/.bin/nx show projects --affected --type app --base=origin/main --head=HEAD
Done in 2.82s.'
+ '[' -z 'yarn run v1.22.21
$ /home/runner/work/language-masters/language-masters/node_modules/.bin/nx show projects --affected --type app --base=origin/main --head=HEAD
Done in 2.82s.' ']'
+ echo 'Affected apps are: yarn run v1.22.21
$ /home/runner/work/language-masters/language-masters/node_modules/.bin/nx show projects --affected --type app --base=origin/main --head=HEAD
Done in 2.82s.'
+ echo '{affected_apps}={yarn run v1.22.21
$ /home/runner/work/language-masters/language-masters/node_modules/.bin/nx show projects --affected --type app --base=origin/main --head=HEAD
Done in 2.82s.}'
Affected apps are: yarn run v1.22.21
$ /home/runner/work/language-masters/language-masters/node_modules/.bin/nx show projects --affected --type app --base=origin/main --head=HEAD
Done in 2.82s.
Error: Unable to process file command 'output' successfully.
Error: Invalid format 'Done in 2.82s.}'
```
