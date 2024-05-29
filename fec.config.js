const { resolve } = require('path');

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
                    version: '^6.3.0',
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