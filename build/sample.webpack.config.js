const path = require('path');
const WebpackMerge = require('webpack-merge');
const WebpackBaseConfig = require('./webpack.base.conf');

module.exports = WebpackMerge(WebpackBaseConfig, {

	// モード値を production に設定すると最適化された状態で、
	// development に設定するとソースマップ有効でJSファイルが出力される
	mode: 'development',

	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: './Sample/TypeScript/Demo/src/main.ts',

	output: {
		filename: 'index.js',
		path: path.join(__dirname, '../Sample/TypeScript/Demo/dist')
	},
})