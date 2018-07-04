/**
 * webpack 生产版本配置
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const PreloadPlugin = require('preload-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { pub, end } = require('./config')
const base = require('./webpack.base')

module.exports = merge(base, {
	output: {
		path: end.assetsRoot,
		filename: 'js/[name].[chunkhash:10].js',
		chunkFilename: 'js/[id].[chunkhash:10].js'
	},
	plugins: [
		// 刪除prod文件夾
        new CleanPlugin([ 'prod' ], {
            root: path.resolve(__dirname, '../')
        }),
		new webpack.EnvironmentPlugin({
            NODE_ENV: end.env
        }),
        // new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
            },
            output: {
                comments: false
            }
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].[contenthash:10].css'
		}),
		new OptimizeCSSPlugin({		// 可以移除重复的样式
			cssProcessorOptions: { safe: true }
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module, count){
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					0 === module.resource.indexOf(path.join(__dirname, '../node_modules'))
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			// extract webpack runtime and module manifest to its own file in order to
    		// prevent vendor hash from being updated whenever app bundle is updated
			name: 'manifest',
			chunks: [ 'vendor' ]
		}),
		new HtmlPlugin({
			title: pub.title,
			filename: pub.html,
			template: pub.template,
			inject: pub.inject,
			favicon: end.favicon,
			minify: {
				removeComments: true,			 // 去注释
				collapseWhitespace: true,		 // 压缩空格
				removeAttributeQuotes: true  	 // 去除属性引用
			},
			chunksSortMode: 'dependency'
		}),
		new PreloadPlugin({
			rel: 'preload',
			as: x => (/\.css$/.test(x)) ? 'style' : 'script',
    		include: [ 'manifest', 'vendor', 'app' ]		// 指定預加載的模塊
    	}),
		new PreloadPlugin({
    		rel: 'prefetch',		// 預請求
    		as: 'script',
    		include: [
				'echarts',
				'echarts_bar',
				'echarts_pie',
				'echarts_line',
				'echarts_grid',
				'echarts_title',
				'echarts_tooltip',
				'echarts_axisPointer',
				'echarts_legendScroll'
			]
    	})
	]
})
