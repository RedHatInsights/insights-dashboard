/* global */
const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    deployment: process.env.BETA ? 'beta/apps' : 'apps',
    debug: true
});

plugins.push(
    require('@redhat-cloud-services/frontend-components-config/federated-modules')({
        root: resolve(__dirname, '../'),
        exposes: {
            //ZeroStateBanner
            './ZeroStateBanner': resolve(__dirname, '../src/PresentationalComponents/ZeroState/ZeroStateBanner.js')
        }
    })
);

// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// plugins.push(new BundleAnalyzerPlugin())

module.exports = {
    ...webpackConfig,
    plugins
};
