import type { CodegenConfig } from '@graphql-codegen/cli'
import updateGqlDocumentNodes from './script/updateGqlDocumentNode'

const token = process.env.API_TOKEN

const GRAPHQL_LOCAL_ENDPOINT = 'http://localhost:3000/api/graphql'

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [GRAPHQL_LOCAL_ENDPOINT]: {
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    },
  },
  documents: ['apps/react-app/src/**/*.graphql'],
  generates: {
    // 'apps/react-app/src/generated/': {
    //   preset: 'client',
    // },
    'apps/react-app/src/types/gql-global-types.ts': {
      plugins: ['typescript'],
      config: {},
    },
    'apps/react-app/src': {
      hooks: {
        beforeOneFileWrite: updateGqlDocumentNodes,
      },
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'types/gql-global-types',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      // Maintainers reason why generated types are not flattened
      config: {
        avoidOptionals: true,
        operationResultSuffix: 'Response',
        documentVariableSuffix: '',
        fragmentVariableSuffix: 'Doc',
        dedupeOperationSuffix: true,
        withHooks: true,
        // To make existing ID typing work
        scalars: {
          ID: {
            input: 'string',
            output: 'string',
          },
        },
      },
    },
  },
}

export default config
