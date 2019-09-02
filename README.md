# Cubism Web Samples

Live2D Cubism 4 Editorで出力したモデルを表示するアプリケーションのサンプル実装です。

Cubism Coreライブラリと組み合わせて使用します。


## ディレクトリ構成

```
.
├─ .vscode              # Visual Studio Codeのタスクや設定が含まれるディレクトリ
├─ Core                 # Cubism Coreが含まれるディレクトリ
├─ Framework            # レンダリングやアニメーション機能などのソースコードが含まれるディレクトリ
└─ Samples
   └─ TypeScript
      └─ Demo           # サンプルプロジェクトが含まれるディレクトリ
         ├─ Resources   # モデルのファイルや画像などのリソースが含まれるディレクトリ
         └─ src
```


## Live2D Cubism Core for Web

モデルをロードするためのライブラリです。

当リポジトリではCubism Coreを管理していません。
[こちら](https://www.live2d.com/download/cubism-sdk/download-web/)からCubism SDK for Webをダウンロードして、
Coreディレクトリのファイルをコピーしてください。


## 開発環境の構築方法

1. [Node.js](https://nodejs.org/)をインストールします。

1. [Visual Studio Code](https://code.visualstudio.com/)をインストールします。

1. Visual Studio Codeの拡張機能として下記を追加します。
   - [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
   - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)


## ビルド方法

1. Visual Studio Codeでプロジェクトディレクトリを開きます。

1. ビルドに必要な物をインストールします。
   ctrl+shift+P(macOSでは⌘+⇧+P)で`Tasks: Run Task`から`npm: install`を選択、
   または、`package.json`があるディレクトリ上にてターミナル上で`npm install`でサーバが起動します。

1. ビルドを行います。
   ctrl+shift+B(macOSでは⌘+⇧+B)でビルドタスクを選択、またはターミナル上でnpmコマンドを実行してJavaScriptを生成します。

### ビルドタスクの説明

| コマンド | 説明 |
| --- | --- |
| `npm: build-framework` | フレームワークのみをビルドし、JavaScriptファイルを生成します |
| `npm: watch-framework` | フレームワークのみをウォッチし、変更が保存された際にJavaScriptファイルを再生成します |
| `npm: build-sample` | サンプルをビルドします |
| `npm: watch-sample` | サンプルをウォッチします |
| `npm: build-all` | フレームワークとサンプルをビルドします |
| `npm: watch-all` | フレームワークとサンプルをウォッチします |


## ローカルサーバの起動方法

ビルドした成果物はそのままファイルを開くだけでは正常に動作しないため、ローカルサーバを起動する必要があります。

### 開発時

Visual Studio Codeの画面下の水色のフッターから「Go Live」をクリックするとサーバが起動します。
ブラウザ上で`index.html`のパスまで進むと動作を確認することが出来ます。

ファイルの更新が行われると自動でブラウザのリロードが行われます。
また、`F5`を押すとでDebugger for Chromeの拡張が起動してデバッグを行うことが出来ます。

### 検証時

ctrl+shift+P(macOSでは⌘+⇧+P)で`Tasks: Run Task`から`npm: serve`を選択、
または、`package.json`があるディレクトリ上にてターミナル上で`npm run serve`でサーバが起動します。
ブラウザ上で`index.html`のパスまで進むと動作を確認することが出来ます。

シンプルな構成のサーバのため検証時におすすめです。


## SDKマニュアル

[Cubism SDK Manual](https://docs.live2d.com/cubism-sdk-manual/top/)


## 変更履歴

当リポジトリの変更履歴については[CHANGELOG.md](/CHANGELOG.md)を参照ください。


## 動作確認環境

| Node.js | バージョン |
| --- | --- |
| Current | 12.9.1 |
| LTS | 10.16.3 |

| プラットフォーム | ブラウザ | バージョン |
| --- | --- | --- |
| Android | Google Chrome | 76.0.3809.89 |
| Android | Microsoft Edge | 42.0.2.3819 |
| Android | Mozilla Firefox | 68.0 |
| iOS | Google Chrome | 76.0.3809.81 |
| iOS | Microsoft Edge | 44.5.3 |
| iOS | Mozilla Firefox | 18.1 |
| iOS | Safari | 604.1 |
| macOS | Google Chrome | 76.0.3809.87 |
| macOS | Mozilla Firefox | 68.0.1 |
| macOS | Safari | 12.1.2 |
| Windows | Google Chrome | 76.0.3809.100 |
| Windows | Internet Explorer 11 | 11.885.17134.0 |
| Windows | Microsoft Edge | 44.18362.1.0 |
| Windows | Mozilla Firefox | 68.0.1 |

Note: 動作確認時のサーバの起動は[検証時](/README.md#検証時)の方法で行っています。


## ライセンス

Cubism Web Samples は Live2D Open Software License で提供しています。
- Live2D Open Software License

  [日本語](https://www.live2d.com/eula/live2d-open-software-license-agreement_jp.html)
  [English](https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html)

Live2D Cubism Core for Web は Live2D Proprietary Software License で提供しています。
- Live2D Proprietary Software License

  [日本語](https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_jp.html)
  [English](https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html)

Live2D のサンプルモデルは Free Material License で提供しています。
- Free Material License

  [日本語](https://www.live2d.com/eula/live2d-free-material-license-agreement_jp.html)
  [English](https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html)
  - `./Sample/TypeScript/Demo/Resources/Haru`
  - `./Sample/TypeScript/Demo/Resources/Hiyori`
  - `./Sample/TypeScript/Demo/Resources/Mark`
  - `./Sample/TypeScript/Demo/Resources/Natori`
  - `./Sample/TypeScript/Demo/Resources/Rice`

上記のモデルをご利用になられる場合、[こちら](https://docs.live2d.com/cubism-editor-manual/sample-model/)で各モデルに設定された利用条件に同意して頂く必要がございます。

直近会計年度の売上高が 1000 万円以上の事業者様がご利用になる場合は、SDKリリース(出版許諾)ライセンスに同意していただく必要がございます。
- [SDKリリース(出版許諾)ライセンス](https://www.live2d.com/ja/products/releaselicense)

*All business* users must obtain a Publication License. "Business" means an entity with the annual gross revenue more than ten million (10,000,000) JPY for the most recent fiscal year.
- [SDK Release (Publication) License](https://www.live2d.com/en/products/releaselicense)
