const path    				= require('path');
const webpack 				= require('webpack');
const { VueLoaderPlugin } 	= require('vue-loader');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		app: [
			'./src/js/app.js',
			'./src/scss/styles.scss'
		]
	},
	output: {
		path: path.resolve(__dirname, './'),
		filename: 'public/js/app.js'
	},
	module: {
		rules: [
			{ 
				test: /\.vue$/, 
				exclude: /node_modules/, 
				loader: "vue-loader" 
			},
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" 
			},
			{
				test: /\.[s?]css/,
				use: [
					MiniCssExtractPlugin.loader,
					{ 
						loader: 'css-loader', 
						options: { 
							import: false,
							importLoaders: 1 
						} 
					},
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
	    	filename: 'public/css/styles.css'
	    }),
		new VueLoaderPlugin()
	]
}
