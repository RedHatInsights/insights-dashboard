const { resolve } = require('path');
const packageJson = require('./package.json');

module.exports = {
    appUrl: '/insights/dashboard',
    debug: true,
    useProxy: process.env.PROXY === 'true',
    proxyVerbose: true,
    plugins: [],
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
    },
    exposes: {
        './AppZeroState': resolve(__dirname, '../src/PresentationalComponents/ZeroState/AppZeroState.js'),
        './ZeroStateBanner': resolve(__dirname, '../src/PresentationalComponents/ZeroState/ZeroStateBanner.js'),
        './AppSection': resolve(__dirname, '../src/PresentationalComponents/ZeroState/AppSection.js'),
        './ZeroStateFooter': resolve(__dirname, '../src/PresentationalComponents/ZeroState/ZeroStateFooter.js'),
        './RootApp': resolve(__dirname, '../src/AppEntry.js')
    },
};