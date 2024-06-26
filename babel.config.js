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
    ],
    "env": {
      "componentTest": {
        plugins: [
          "istanbul"
        ]
      }
    }
}
