/* global require, module, __dirname */
/* eslint-disable space-unary-ops */

const { plugins } = require('./base.webpack.plugins');
const path = require('path');
const webpack = require('webpack');

/**
 * sets release to insights
 */
const Release = new webpack.DefinePlugin({
    RELEASE: JSON.stringify('insightsbeta')
});
plugins.push(Release);

/**
 * Copys entry html to distribution folder
 *
 * @type {var}
 */
const HtmlWebpackPlugin = new (require('html-webpack-plugin'))({
    title: 'Insights Dashboard',
    filename: 'index-beta.html',
    template: path.resolve(__dirname, '../src/index-beta.html')
});
plugins.push(HtmlWebpackPlugin);

module.exports = { plugins };
