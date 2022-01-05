/* global */
const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('@redhat-cloud-services/frontend-components-config');
const HttpsProxyAgent = require('https-proxy-agent');
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    debug: true,
    appUrl: process.env.BETA ? '/beta/insights/dashboard' : '/insights/dashboard',
    env: `${process.env.ENVIRONMENT || 'stage'}-${process.env.BETA ? 'beta' : 'stable'}`,
    deployment: process.env.BETA ? 'beta/apps' : 'apps',
    useProxy: true,
    localChrome: process.env.INSIGHTS_CHROME,
    customProxy: process.env.API_ENDOINT ? [
        {
            context: (path) => path.includes('/api/'),
            target: process.env.API_ENDOINT,
            secure: true,
            changeOrigin: true,
            autoRewrite: true,
            ws: true,
            ...['prod', 'stage'].includes(process.env.ENVIRONMENT) && { agent: new HttpsProxyAgent('http://squid.corp.redhat.com:3128') }
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

    return { ...webpackConfig, plugins: plugins.filter((plugin) => plugin.constructor.name !== 'HtmlWebpackPlugin') };
};
