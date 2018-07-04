/**
 * webpack属性设置
 */
const path = require('path')
const prod = path.resolve(__dirname, '../prod')

module.exports = {
	// 共同配置
	pub: {
		html: 'index.html',
		inject: true,
		template: 'src/index.html',
		title: '温州龙湾区人脸数据分析综合应用平台',
		assetsPublicPath: '/'
	},
	// 開發版本
	dev: {
		env: 'development',
		port: 90
	},
	// 生產版本
	end: {
		env: 'production',
		port: 80,
		favicon: './src/assets/favicon.ico',
		assetsRoot: prod
	}
}
