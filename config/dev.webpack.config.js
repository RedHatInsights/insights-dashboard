/* global */
const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('@redhat-cloud-services/frontend-components-config');
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    debug: true,
    appUrl: process.env.BETA ? '/beta/insights/dashboard' : '/insights/dashboard',
    env: `${process.env.ENVIRONMENT || 'stage'}-${process.env.BETA ? 'beta' : 'stable'}`,
    deployment: process.env.BETA ? 'beta/apps' : 'apps',
    useProxy: true,
    useChromeTemplate: true,
    localChrome: process.env.INSIGHTS_CHROME,
    customProxy: process.env.API_ENDOINT ? [
        {
            context: (path) => path.includes('/api/'),
            target: process.env.API_ENDOINT,
            secure: true,
            changeOrigin: true,
            autoRewrite: true,
            ws: true
        }
    ] : []
});

plugins.push(
    require('@redhat-cloud-services/frontend-components-config/federated-modules')({
        root: resolve(__dirname, '../')
    })
);

webpackConfig.devServer.client.overlay = false;

module.exports = (env) => {
    env && env.analyze === 'true' && plugins.push(new BundleAnalyzerPlugin());

    return { ...webpackConfig, plugins };
};
