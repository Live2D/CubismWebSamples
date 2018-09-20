
var path = require('path');
var glob = require('glob');

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


module.exports = {

    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: entries,

    output: {
        filename : '[name].js',
        path: path.join(__dirname, 'Sample/TypeScript/Demo/dist/Framework/src')
    },

    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,

                // TypeScriptをコンパイルする
                use: 'ts-loader'
            }
        ]
    },
    
    // ソースマップを含めた状態で出力
    devtool: 'inline-source-map',

    // import 文で .ts ファイルを解決するため
    resolve: {
        extensions: [
            '.ts',
        ]
    }
}