/* global */
const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    deployment: process.env.BETA === 'true' ? 'beta/apps' : 'apps',
    debug: true
});

plugins.push(
    require('@redhat-cloud-services/frontend-components-config/federated-modules')({
        root: resolve(__dirname, '../'),
        exposes: {
            './AppZeroState': resolve(__dirname, '../src/PresentationalComponents/ZeroState/AppZeroState.js'),
            './ZeroStateBanner': resolve(__dirname, '../src/PresentationalComponents/ZeroState/ZeroStateBanner.js'),
            './AppSection': resolve(__dirname, '../src/PresentationalComponents/ZeroState/AppSection.js'),
            './ZeroStateFooter': resolve(__dirname, '../src/PresentationalComponents/ZeroState/ZeroStateFooter.js'),
            './RootApp': resolve(__dirname, '../src/AppEntry.js')
        },
        shared: [
            {
                'react-router-dom': { singleton: true, requiredVersion: '*' }
            }
        ]
    })
);

// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// plugins.push(new BundleAnalyzerPlugin())

module.exports = {
    ...webpackConfig,
    plugins
};
