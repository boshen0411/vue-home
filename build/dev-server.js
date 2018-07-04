/**
 * webpack dev server 配置
 */
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const { dev, pub } = require('./config')

// 一个可以强制打开浏览器并跳转到指定 url 的插件
const opn = require('opn')

// http代理中間件
// const proxy = require('http-proxy-middleware')

// 使用 dev 环境的 webpack 配置
const webpackConfig = require('./webpack.dev')

// 如果没有指定运行端口，使用 dev.port 作为运行端口
const port = process.env.PORT || dev.port

// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
// const proxyTable = dev.proxyTable

const app = express()

// 启动 webpack 进行编译
const compiler = webpack(webpackConfig)

// 启动 webpack-dev-middleware，将编译后的文件暂存到内存中
const devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	noInfo: true,
	stats: {
		colors: true,
		chunks: false
	}
})

// 启动 webpack-hot-middleware，也就是常说的 Hot-reload
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
	heartbeat: 5e3
})

// 模板改變時重新加載頁面
compiler.plugin('compilation', compilation => {
	compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
		hotMiddleware.publish({
			action: 'reload'
		})
		cb()
	})
})

// api請求代理，将 proxyTable 中的请求配置挂在到启动的 express 服务上
/*Object.keys(proxyTable).forEach(context => {
	const options = proxyTable[context]
	if ('string' === typeof options){
		options = {
			target: options
		}
	}
	app.use(proxy(context, options))
})*/

// 操作囘調歷史api：使用 connect-history-api-fallback 匹配资源，
// 如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 将 Hot-reload 挂在到 express 服务上
app.use(hotMiddleware)

// 静态资源路径
const staticPath = path.posix.join(pub.assetsPublicPath)

// 为静态资源提供响应服务
app.use(staticPath, express.static('./src/assets'))

const url = `http://localhost:${ port }`

let resolve

const ready = new Promise(r => resolve = r)

console.log('> Starting dev server...')

devMiddleware.waitUntilValid(_ => {
	console.log(`> Listening at ${ url }\n`)
	// 如果不是生产环境，自动打开浏览器并跳到开发地址
	if (process.env.NODE_ENV !== 'production') {
		opn(url)
	}
	resolve()
})

const server = app.listen(port)

module.exports = {
	ready,
	close: server.close
}
