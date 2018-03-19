const path = require('path');
__dirname = path.join(__dirname, '../');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: 'index-[contenthash].css',
    disable: process.env.NODE_ENV === 'development',
});
let cleanOptions = {
    root: __dirname,
    exclude: ['notRemove'], //ignore your folder on build
    verbose: false,
    dry: false,
    beforeEmit: false,
    allowExternal: false,
};
let htmlWebpackOptions = {
    template: 'index.ejs',
    title: 'Progressive Web Application',
    favicon: 'favicon.ico',
    meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: false,
        useShortDoctype: true,
        html5: true
    }
}
let pathsToClean = [path.resolve(__dirname, 'dist')];
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[chunkhash].js',
        publicPath: '', // you will get dist configuration virtually else you won't get err: GET http://localhost:8081/dist/bundle.js net::ERR_ABORTED
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all',
                    priority: -10,
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [require('@babel/plugin-proposal-object-rest-spread')],
                    },
                },
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        outputPath: 'img',
                    },
                }, ],
            },
            {
                test: /\.(s*)css$/,
                use: extractSass.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                    // use style-loader in development
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    },
                },
            },
        ],
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: true,
                ie8: true,
            },
        }),
        extractSass,
        new HtmlWebpackPlugin(htmlWebpackOptions),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true
        })
    ]
};

// Readme:
//  // https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs
//https://developers.google.com/web/progressive-web-apps/
//https://github.com/goldhand/sw-precache-webpack-plugin
//https://www.html5rocks.com/en/tutorials/workers/basics/#toc-gettingstarted
//https: //github.com/GoogleChrome/workbox/issues/1367
//https://github.com/GoogleChrome/workbox
//https://github.com/carloluis/webpack-optimization-splitchunks