const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
let pathsToClean = ['dist'];
module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle-[chunkhash].js',
		publicPath: '', // you will get dist configuration virtually else you won't get err: GET http://localhost:8081/dist/bundle.js net::ERR_ABORTED
	},
	module: {
		rules: [
			{
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
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]?[hash]',
							outputPath: 'img',
						},
					},
				],
			},
			{
				test: /\.(s*)css$/,
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
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src'],
						minimize: false,
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
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
	],
};
