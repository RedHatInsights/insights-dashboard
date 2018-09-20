/* global require, module */

const _ = require('lodash');
const webpackConfig = _.cloneDeep(require('./base.webpack.config'));

webpackConfig.output.publicPath = '/insightsbeta/platform/dashboard/';

module.exports = _.merge({},
    webpackConfig,
    require('./beta.webpack.plugins.js')
);
