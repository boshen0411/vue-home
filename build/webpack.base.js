/**
 * 公共配置
 */
const path = require('path')
const webpack = require('webpack')
const { pub } = require('./config')
const end = 'production' === process.env.NODE_ENV
const _url = path.join(__dirname, '../src')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		app: './src/main'
	},
	output: {
		publicPath: pub.assetsPublicPath,
	},
	module: {
		rules: [{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: _url
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: end,
					cssModules: end ? {
						camelCase: true,
						localIdentName: '[hash:base64:8]'
					} : {
						localIdentName: '[name]--[local]'
					}
				}
			},
			{
				test: /\.(c|sc)ss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'vue-style-loader',
					use: [
						'css-loader',
						'autoprefixer-loader',
						'sass-loader'
					]
				})
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 1e3,
					name: `img/[name]${['', '.[hash:10]'][+end]}.[ext]`
				}
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
				options: {
					name: `fonts/[name].[ext]`
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
            'typeof __DEV__': JSON.stringify('boolean'),
            __DEV__: !end
        })
	],
	resolve: {
		modules: [
			path.join(_url, 'utils'),
			'node_modules'
		],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.join(_url, 'components'),
			'~': path.join(_url, 'page'),
			'assets': path.join(_url, 'assets'),
			'style': path.join(_url, 'style'),
			'view': path.join(_url, 'views'),
			'api': path.join(_url, 'api'),
			'mock': path.join(_url, 'mock')
		},
		extensions: ['.js', '.jsx', '.vue', '.json', '.css', '.scss']
	}
}