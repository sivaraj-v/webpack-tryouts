const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractSass = new ExtractTextPlugin({
	filename: 'index.css',
	disable: process.env.NODE_ENV === 'development',
});
module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: 'dist', // you will get dist configuration virtually else you won't get err: GET http://localhost:8081/dist/bundle.js net::ERR_ABORTED
	},
	module: {
		rules: [
			{
				test: /\.js$/,
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
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
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
		],
	},
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: true,
				ie8: true,
			},
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		extractSass,
	],
};
