const path = require('path');
const glob = require('glob');
const WebpackMerge = require('webpack-merge');
const WebpackBaseConfig = require('./webpack.base.conf');

var entries = {};

glob.sync("./Framework/**/*.ts").map(
	function (file) {
		// {key:value}の連想配列を生成
		// {
		//   **/*.js : './src/**/*.js',
		//   ...
		// }という形式のobjectになる
		const regEx = new RegExp(`./Framework`);
		const key = file.replace(regEx, '').replace('.ts', '');
		entries[key] = file;
	}
);

module.exports = WebpackMerge(WebpackBaseConfig, {
	// モード値を production に設定すると最適化された状態で、
	// development に設定するとソースマップ有効でJSファイルが出力される
	mode: 'development',

	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: entries,

	output: {
		filename: '[name].js',
		path: path.join(__dirname, '../Sample/TypeScript/Demo/dist/Framework/src')
	},
})