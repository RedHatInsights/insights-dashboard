/* global require, module */
/* eslint-disable space-unary-ops */

const { plugins } = require('./base.webpack.plugins');
const webpack = require('webpack');

/**
 * sets release to insightsbeta
 */
const Release = new webpack.DefinePlugin({
    RELEASE: JSON.stringify('insights')
});
plugins.push(Release);

module.exports = { plugins };
