const webpack = require('webpack');
const path = require('path');

var WebpackNotifierPlugin = require('webpack-notifier');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*const UglifyJsPlugin = require('uglifyjs-webpack-plugin');*/


const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

/*--------- Use ExtractTextWebpackPlugin -----------------------------
 |
 |  Extract text from a bundle, or bundles, into a separate file
 |
 *-------------------------------------------------------------------*/
/*
const ExtractTextPlugin = require("extract-text-webpack-plugin");
*/


/*--------- Use HtmlWebpackPlugin -----------------------------------
 |
 |  The HtmlWebpackPlugin simplifies creation of HTML files to serve
 |  your webpack bundles. This is especially useful for webpack bundles
 |  that include a hash in the filename which changes every
 |  compilation. You can either let the plugin generate an HTML file
 |  for you, supply your own template using lodash templates, or use
 |  your own loader.
 *-------------------------------------------------------------------*/
/*const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './views/client/index.html',
    filename: 'index.html',
    inject: 'body'
});*/


const APP_DIR = path.resolve(__dirname, './views/client/templates/Components');
const BUILD_DIR = path.resolve(__dirname, './public/js');


module.exports = {
    entry:{
      index:  [ APP_DIR + '/master.jsx' ]
    },
    output:{
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    watch: true,
    devServer: {
        contentBase: './views/client/',
        //   port: 9001,
        compress: true,
        hot: true,
        open: true
    },
    module: {
        rules: [

            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(scss)$/,
                use: ['css-hot-loader'].concat(extractSCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { alias: { '../img': '../public/img' } }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }))
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        // loader: 'url-loader'
                        loader: 'file-loader',
                        options: {
                            name: './img/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[hash].[ext]'
                }
            }

        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        /*new UglifyJsPlugin(),*/
        new webpack.NamedModulesPlugin(),
        new WebpackNotifierPlugin(),
        extractCSS,
        extractSCSS,
        new HtmlWebpackPlugin(
            {
                inject: true,
                template: './views/client/index.html'
            }
        ),
        /*new CopyWebpackPlugin([
                {from: './public/img', to: 'img'}
            ],
            {copyUnmodified: false}
        )*/
    ]


};