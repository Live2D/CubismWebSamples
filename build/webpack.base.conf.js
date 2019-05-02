const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

// import 文で .ts ファイルを解決するため
const extensions = [
	'js', 'ts', 'json'
].map(v => `.${v}`);

module.exports = {
	// ソースマップを含めた状態で出力
	devtool: 'source-map',
	resolve: {
		extensions,
		alias: {
			'@': resolve('/'),
		},
	},
	module: {
		rules: [
			{
				// 拡張子 .ts の場合
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						// TypeScriptをコンパイルする
						loader: 'awesome-typescript-loader',
						options: {
							useCache: true,
						}
					}
				]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new CheckerPlugin(),
	]
}