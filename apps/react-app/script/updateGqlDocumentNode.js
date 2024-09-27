export default function (_, content) {
  let splitContent = content.split('\n')

  // Step 1: Add type import TypedDocumentNode
  const gqlImportIndex = splitContent.findIndex((text) =>
    text.includes("from '@apollo/client'")
  )
  if (gqlImportIndex === -1) {
    return
  }
  splitContent.splice(
    gqlImportIndex,
    1,
    "import { gql, type TypedDocumentNode } from '@apollo/client'"
  )

  // Step 2: find gql DocumentNode declaration
  const gqlIndex = splitContent.findIndex((text) => text.includes('gql`'))

  if (gqlIndex === -1) {
    return
  }

  // Step 3: Get Document name
  const gqlDocument = new RegExp(
    /(?:query|mutation|fragment|subscription)\s(\w+)/
  ).exec(splitContent[gqlIndex + 1])
  const documentName = gqlDocument?.[1]
  if (!documentName) {
    return
  }

  // Step 4: Find closing for gql`
  let endGqlIndex = -1
  for (let index = gqlIndex; index < splitContent.length; index++) {
    if (splitContent[index].includes('`;')) {
      endGqlIndex = index
      break
    }
  }

  if (endGqlIndex === -1) {
    return
  }

  const operation = (function () {
    const contentLine = splitContent[gqlIndex + 1]
    if (contentLine.includes('query')) {
      return 'Query'
    }
    if (contentLine.includes('mutation')) {
      return 'Mutation'
    }
    if (contentLine.includes('subscription')) {
      return 'Subscription'
    }
    return 'Fragment'
  })()

  // Step 5: Add TypedDocumentNode generics with Response and Variable types
  // Dedupe operation names for document nodes
  // that already has the operation name appended
  const documentNameOperation = documentName.includes(operation)
    ? documentName
    : `${documentName}${operation}`

  if (operation === 'Fragment') {
    splitContent.splice(
      endGqlIndex,
      1,
      `${splitContent[endGqlIndex]} as unknown as TypedDocumentNode<
        ${documentNameOperation},
        undefined
      >`
        // clean up semicolon to properly lint
        .replace(';', '')
    )
  } else {
    splitContent.splice(
      endGqlIndex,
      1,
      `${splitContent[endGqlIndex]} as unknown as TypedDocumentNode<
        ${documentNameOperation}Response,
        ${documentNameOperation}Variables
      >`
        // clean up semicolon to properly lint
        .replace(';', '')
    )
  }

  return splitContent.join('\n')
}
