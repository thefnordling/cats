var webpack = require('webpack');
var path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = [
    'wwwroot/js/*.js',
    'wwwroot/css/vendors.css'
]

// the clean options to use
let cleanOptions = {
    root: path.resolve('./'),
    verbose: true,
    dry: false
}

module.exports = {
    entry: {
        site: './Scripts/site.ts'
    },

    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]|(bootstrap-custom)/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    output: {
        path: path.resolve('wwwroot/js'),
        chunkFilename: '[name].js',
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function () { // postcss plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new MiniCssExtractPlugin({
            filename: "../css/vendors.css",
            chunkFilename: "../css/vendors.css"
        }),
        new webpack.ProvidePlugin({
             $: 'jquery'
        })
    ]
};