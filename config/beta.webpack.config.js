/* global require, module */

const _ = require('lodash');
const webpackConfig = require('./base.webpack.config');

webpackConfig.serve = {
    content: config.paths.public,
    dev: {
        publicPath: '/insightsbeta/platform/dashboard/'
    },
    // https://github.com/webpack-contrib/webpack-serve/blob/master/docs/addons/history-fallback.config.js
    add: app => app.use(convert(history({})))
};

module.exports = _.merge({},
    webpackConfig,
    require('./dev.webpack.plugins.js')
);
