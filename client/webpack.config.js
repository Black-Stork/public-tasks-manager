'use strict';

const environment = require('./environments/environment');

var webpack = require('webpack');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: './app/app.jsx',
    output: {
        //path: __dirname,
        filename: './public/dist/bundle.js'
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
            './app/components',
            './app/components/Main',
            './app/components/Tasks',
            './app/api'
        ],
        alias: {
            'task-actions': 'app/actions/task.actions.jsx',
            actionTypes: 'app/actions/actionTypes.jsx',
            configureStore: 'app/store/configureStore.jsx'
        },
        extensions: ['.js', '.jsx']
    },
    //devServer: {
    //    contentBase: '.',
    //    host: 'localhost',
    //    port: 9000
    //},
    module: {
        rules: [
          {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              options: {
                  presets: ['react', 'es2015', 'stage-0']
              },
              exclude: /(node_modules|bower_components)/
          }
        ]
    },
    devtool: environment.production ? "source-map" : "inline-sourcemap",
    plugins: !environment.production ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ 
            mangle: false, 
            sourcemap: false,
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(config.environment)
            }
        }),
        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        }, ['abc.js'])
    ],
};