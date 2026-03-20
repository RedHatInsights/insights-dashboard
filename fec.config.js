const { resolve } = require('path');
const packageJson = require('./package.json');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = {
  appUrl: '/insights/dashboard',
  debug: true,
  useProxy: process.env.PROXY === 'true',
  proxyVerbose: true,
  devtool: 'hidden-source-map',
  _unstableSpdy: true,
  plugins: [
    // Put the Sentry Webpack plugin after all other plugins
    ...(process.env.ENABLE_SENTRY
      ? [
          sentryWebpackPlugin({
            ...(process.env.SENTRY_AUTH_TOKEN && {
              authToken: process.env.SENTRY_AUTH_TOKEN,
            }),
            org: 'red-hat-it',
            project: 'dashboard-rhel',
            moduleMetadata: ({ release }) => ({
              dsn: `https://f8eb44de949e487e853185c09340f3cf@o490301.ingest.us.sentry.io/4505397435367424`,
              org: 'red-hat-it',
              project: 'dashboard-rhel',
              release,
            }),
          }),
        ]
      : []),
  ],
  ...(process.env.port ? { port: parseInt(process.env.port) } : {}),
  moduleFederation: {
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          version: packageJson.dependencies['react-router-dom'],
          requiredVersion: '>=6.0.0 <7.0.0',
        },
      },
    ],
    exposes: {
      './AppZeroState': resolve(
        __dirname,
        './src/PresentationalComponents/ZeroState/AppZeroState.js'
      ),
      './ZeroStateBanner': resolve(
        __dirname,
        './src/PresentationalComponents/ZeroState/ZeroStateBanner.js'
      ),
      './AppSection': resolve(
        __dirname,
        './src/PresentationalComponents/ZeroState/AppSection.js'
      ),
      './ZeroStateFooter': resolve(
        __dirname,
        './src/PresentationalComponents/ZeroState/ZeroStateFooter.js'
      ),
      './RootApp': resolve(__dirname, './src/AppEntry.js'),
    },
  },
  frontendCRDPath: 'frontend.yaml',
};
