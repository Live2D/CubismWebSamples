# Cubism Web Samples

Live2D Cubism 3 Editorで出力したモデルを表示するアプリケーションのサンプル実装です。  

Cubism Coreライブラリと組み合わせて使用します。  


# フォルダ構成

- README.md  ...本ドキュメント
- Core       ...Coreライブラリが含まれるフォルダ
- Framework  ...レンダリングやアニメーション機能などのソースコードが含まれるフォルダ
- Samples    ...サンプルプロジェクトが含まれるフォルダ
- .vscode    ...Visual Studio Codeのタスクや設定が含まれるフォルダ


# Live2D Cubism Core for Web

モデルをロードするためのライブラリです。


# TypeScript環境

1. node.jsをインストールします。  

- https://nodejs.org/en/  

2. typescriptをインストールします。  

- https://www.typescriptlang.org/  

3. Visual Studio Codeをインストールします。  

4. 拡張機能として下記を追加します。  

- Debugger for Chrome
- Live Server

5. Visual Studio Codeを再起動します。  

6. ビルドに必要な物をインストールします。  
package.jsonがあるディレクトリに移動し、下記コマンドを実行します。  
`npm install`


# TypeScript Core Binding

CoreライブラリはTypeScript用に以下プロジェクトでバインドし、出力されたファイルをCoreフォルダに入れる必要があります。  

インストール、バインドに必要な手順については下記を参考にしてください。  
https://github.com/Live2D/CubismBindings

動作確認バージョン
- emscripten 1.37.40, 1.38.12, 1.38.21  
- Python 2.7.15  
- PyYAML 3.12  
- Pystache 0.5.4  

バインドに必要なemscriptenについては下記を参考にしてください。  
https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html#updating-the-sdk


# ビルド方法

上記TypeScript環境を前提とした操作になります。  

1. Visual Studio Codeでプロジェクトフォルダを開きます。  
(例)E:\Workspace\CubismWebSamples

2. ビルドし、JavaScriptを生成します。  
ctrl+shift+Bでビルドタスクを選択  
または　ターミナル上で npm run build-sample を実行すると、JavaScriptが生成されます。

    各タスクの説明  
    `npm:build-framework`   : フレームワークのみをビルドし、JavaScriptファイルを生成します。  
    `npm:watch-framework`   : フレームワークのみをウォッチし、変更が保存された際にJavaScriptファイルを生成します。  
    `npm:build-sample`      : サンプルをビルドします。  
    `npm:watch-sample`      : サンプルをウォッチします。  
    `npm:build-all`         : フレームワークとサンプルをビルドします。  
    `npm:watch-all`         : フレームワークとサンプルをウォッチします。  

3. サーバーを起動します。  
Visual Studio Codeの画面下の水色のフッターからGo Liveをクリックすると、サーバーが起動します。

4. 実行  
F5で実行し、remote web site with sourcemapを選択します。


# SDKマニュアル

[Cubism SDK Manual](http://docs.live2d.com/cubism-sdk-manual/top/)


# 変更履歴

当リポジトリの変更履歴については[コミットログ](https://github.com/Live2D/CubismWebSamples/commits/master)を参照ください。


# 動作確認環境

- Windows Google Chrome 70.0.3538.67  
- Windows Mozilla Firefox 63.0  
- Windows Microsoft Edge 17.17134  
- Windows Internet Explorer11 11.407.17134.0  ※（こちらのコミット以降に限ります。: [923b2398266be6f98b9fdbbdeb0bf3fd1d27a2b5](https://github.com/Live2D/CubismWebSamples/commit/923b2398266be6f98b9fdbbdeb0bf3fd1d27a2b5)）
- macOS Google Chrome 70.0.3538.77  
- macOS Mozilla Firefox 63.0  
- macOS Safari 12.0  
- iOS Safari 12.0  
- Android Google Chrome 70.0.3538.64  


# TODO
- 無し


# ライセンス

Cubism Web Samples は Live2D Open Software License で提供しています。
- Live2D Open Software License 
[日本語](http://www.live2d.com/eula/live2d-open-software-license-agreement_jp.html) 
[English](http://www.live2d.com/eula/live2d-open-software-license-agreement_en.html) 


Live2D Cubism Core for Web は Live2D Proprietary Software License で提供しています。
 - Live2D Proprietary Software License 
[日本語](http://www.live2d.com/eula/live2d-proprietary-software-license-agreement_jp.html) 
[English](http://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html) 


Live2D のサンプルモデルは Free Material License で提供しています。
- Free Material License 
[日本語](http://www.live2d.com/eula/live2d-free-material-license-agreement_jp.html) 
[English](http://www.live2d.com/eula/live2d-free-material-license-agreement_en.html) 
   - Samples/Resources/Haru/*
   - Samples/Resources/Hiyori/*
   - Samples/Resources/Mark/*
   - Samples/Res/Natori/

上記のモデルをご利用になられる場合、[こちら](https://docs.live2d.com/cubism-editor-manual/sample-model/)で各モデルに設定された利用条件に同意して頂く必要がございます。

直近会計年度の売上高が 1000 万円以上の事業者様がご利用になる場合は、SDKリリース(出版許諾)ライセンスに同意していただく必要がございます。 
- [SDKリリース(出版許諾)ライセンス](http://www.live2d.com/ja/products/releaselicense) 


*All business* users must obtain a Publication License. "Business" means an entity  with the annual gross revenue more than ten million (10,000,000) JPY for the most recent fiscal year.
- [SDK Release (Publication) License](http://www.live2d.com/en/products/releaselicense) 
