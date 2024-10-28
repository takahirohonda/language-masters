module.exports = (context) => {
  let reactHookFormImported = false
  let usesReactHookFormMethods = false

  return {
    ImportDeclaration(node) {
      if (node.source.value === 'react-hook-form') {
        reactHookFormImported = true
      }
    },

    CallExpression(node) {
      if (reactHookFormImported) {
        const methodNames = ['register', 'handleSubmit', 'watch', 'reset'] // add more methods as needed
        if (
          node.callee &&
          node.callee.property &&
          methodNames.includes(node.callee.property.name)
        ) {
          usesReactHookFormMethods = true
        }
      }
    },

    JSXSpreadAttribute(node) {
      if (!usesReactHookFormMethods) {
        context.report({
          node,
          message: 'Prop spreading is not allowed unless using react-hook-form',
        })
      }
    },
  }
}
