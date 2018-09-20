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

6. ターミナルを起動し、package.jsonがあるディレクトリ上で npm install を実行すると、必要な物がインストールされます。  
    (例)E:\Workspace\CubismWebSamples  


# TypeScript Core Binding

CoreライブラリはTypeScript用に以下プロジェクトでバインドし、出力されたファイルをCoreフォルダに入れる必要があります。  
- https://github.com/Live2D/CubismBindings

CubismBindings/data/templates/js/.in/live2dcubismcore.tsの名前空間をLIVE2DCUBISMCOREからLive2DCubismCoreに変更し、  
CubismBindingsのREADME.mdに従いバインドします。  


# ビルド方法

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


# TODO

以下Core内関数の実装
- csmSetLogFunction
- csmGetLogFunction
- csmSetLogFunction
- csmGetVersion


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
   - Resources/Haru/*
   - Resources/Hiyori/*
   - Resources/Mark/*


直近会計年度の売上高が 1000 万円以上の事業者様がご利用になる場合は、SDKリリース(出版許諾)ライセンスに同意していただく必要がございます。 
- [SDKリリース(出版許諾)ライセンス](http://www.live2d.com/ja/products/releaselicense) 


*All business* users must obtain a Publication License. "Business" means an entity  with the annual gross revenue more than ten million (10,000,000) JPY for the most recent fiscal year.
- [SDK Release (Publication) License](http://www.live2d.com/en/products/releaselicense) 
