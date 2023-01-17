module.exports = {
    "presets": [
        "@babel/env",
        "@babel/react",
        "@babel/flow"
    ],
    "plugins": [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-object-rest-spread",
        [
          'transform-imports',
          {
            '@patternfly/react-icons': {
              transform: (importName) =>
                `@patternfly/react-icons/dist/esm/icons/${importName
                  .split(/(?=[A-Z])/)
                  .join('-')
                  .toLowerCase()}`,
              preventFullImport: true,
            },
          },
          'react-icons',
        ],
    ],
    "env": {
      "componentTest": {
        plugins: [
          "istanbul"
        ]
      }
    }
}
