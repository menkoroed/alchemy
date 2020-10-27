const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, 'public')
	},
	resolve: {
		alias: {
			'@asset': path.resolve(__dirname, 'src', 'assets')
		}
	},
	devServer: {
		port: 3000
	},
	plugins: [
		new HTMLPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}]
			},
			{
				test: /\.(png|jpeg|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}
