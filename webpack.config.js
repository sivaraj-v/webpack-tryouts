const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist' // you will get dist configuration virtually else you won't get err: GET http://localhost:8081/dist/bundle.js net::ERR_ABORTED
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [ // This is executed in reverse order #important
                    'style-loader',
                    'css-loader' // this is used to understand the import statement in js for css
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: true,
                ie8: true
            }
        })
    ]
};