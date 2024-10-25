module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Allow props spreading only when using react-hook-form',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
    schema: [], // no options
  },
  create: function (context) {
    let reactHookFormImported = false
    let usesReactHookFormMethods = false

    return {
      // Check if react-hook-form is imported
      ImportDeclaration(node) {
        if (node.source.value === 'react-hook-form') {
          reactHookFormImported = true
        }
      },
      // Check for react-hook-form method usage (register, handleSubmit, etc.)
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
      // Check for JSX prop spreading and allow it only if react-hook-form methods are used
      JSXSpreadAttribute(node) {
        if (!usesReactHookFormMethods) {
          context.report({
            node,
            message:
              'Prop spreading is not allowed unless using react-hook-form',
          })
        }
      },
    }
  },
}
