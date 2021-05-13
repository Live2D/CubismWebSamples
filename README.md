#  \[Beta Version\] Cubism Web Samples

Live2D Cubism 4 Editor で出力したモデルを表示するアプリケーションのサンプル実装です。

Cubism Web Framework および Live2D Cubism Core と組み合わせて使用します。

**本 SDK は、 Beta バージョンとなります。先行して新機能を取り込んでいるため、不安定な挙動を示す場合がございます。安定した製品をお求めの方は、公式サイトから配布されている正式版のパッケージ又は `develop` `master` ブランチをご利用ください。**

**[Beta Version] の SDK の不具合、各種ご意見等に関しましては、 Live2D コミュニティ にてご連絡ください。直接のコードに対する指摘、修正等は、直接 Pull requests としてご投稿ください。**


## ライセンス

本 SDK を使用する前に、[ライセンス](LICENSE.md)をご確認ください。


## 注意事項

本 SDK を使用する前に、[注意事項](NOTICE.md)をご確認ください。


## ディレクトリ構成

```
.
├─ .vscode          # Visual Studio Code 用プロジェクト設定ディレクトリ
├─ Core             # Live2D Cubism Core が含まれるディレクトリ
├─ Framework        # レンダリングやアニメーション機能などのソースコードが含まれるディレクトリ
└─ Samples
   ├─ Resources     # モデルのファイルや画像などのリソースが含まれるディレクトリ
   └─ TypeScript    # TypeScript のサンプルプロジェクトが含まれるディレクトリ
```


## Live2D Cubism Core for Web

モデルをロードするためのライブラリです。

当リポジトリではCubism Coreを管理していません。
[こちら](https://www.live2d.com/download/cubism-sdk/download-web/)からCubism SDK for Webをダウンロードして、
Coreディレクトリのファイルをコピーしてください。


## 開発環境構築

1. [Node.js] と [Visual Studio Code] をインストールします
1. Visual Studio Code で **本 SDK のトップディレクトリ** を開き、推奨拡張機能をインストールします
    * ポップアップ通知の他、拡張機能タブから `@recommended` を入力することで確認できます

### サンプルデモの動作確認

コマンドパレット（*View > Command Palette...*）で `>Tasks: Run Task` を入力することで、タスク一覧が表示されます。

1. タスク一覧から　`npm: install - Samples/TypeScript/Demo` を選択して依存パッケージのダウンロードを行います
1. タスク一覧から `npm: build - Samples/TypeScript/Demo` を選択してサンプルデモのビルドを行います
1. タスク一覧から `npm: serve - Samples/TypeScript/Demo` を選択して動作確認用の簡易サーバを起動します
1. ブラウザの URL 欄に `http://localhost:5000/Samples/TypeScript/Demo/` と入力してアクセスします
1. コマンドパレットから `>Tasks: Terminate Task` を入力して `npm: serve` を選択すると簡易サーバが終了します

その他のタスクに関してはサンプルプロジェクトの [README.md](Samples/TypeScript/README.md) を参照ください。

NOTE: デバック用の設定は、`.vscode/tasks.json` に記述しています。

### プロジェクトのデバック

Visual Studio Code で **本 SDK のトップディレクトリ** を開き、 *F5* キーを入力すると Debugger for Chrome が起動します。

Visual Studio Code 上でブレイクポイントを貼って Chrome ブラウザと連動してデバックを行うことができます。

NOTE: デバック用の設定は、`.vscode/launch.json` に記述しています。


## SDKマニュアル

[Cubism SDK Manual](https://docs.live2d.com/cubism-sdk-manual/top/)


## 変更履歴

当リポジトリの変更履歴については [CHANGELOG.md](CHANGELOG.md) を参照ください。


## 開発環境

### Node.js

* 15.14.0
* 14.16.1
* 12.22.1
* 10.24.1


## 動作確認環境

| プラットフォーム | ブラウザ | バージョン |
| --- | --- | --- |
| Android | Google Chrome | 88.0.4324.181 |
| Android | Microsoft Edge | 46.01.4.5140 |
| Android | Mozilla Firefox | 86.1.1 |
| iOS / iPadOS | Google Chrome | 87.0.4280.77 |
| iOS / iPadOS | Microsoft Edge | 46.1.10 |
| iOS / iPadOS | Mozilla Firefox | 32.0 |
| iOS / iPadOS | Safari | 604.1 |
| Linux | Google Chrome | 89.0.4389.72 |
| Linux | Mozilla Firefox | 86.0 |
| macOS | Google Chrome | 88.0.4324.192 |
| macOS | Microsoft Edge | 88.0.705.81 |
| macOS | Mozilla Firefox | 86.0 |
| macOS | Safari | 14.0.2 |
| Windows | Google Chrome | 88.0.4324.190 |
| Windows | Internet Explorer 11 | 20H2(19042.685) |
| Windows | Microsoft Edge | 88.0.705.74 |
| Windows | Mozilla Firefox | 86.0 |

Note: 動作確認時のサーバの起動は `./Samples/TypeScript/Demo/package.json` の `serve` スクリプトを使用して行っています。
