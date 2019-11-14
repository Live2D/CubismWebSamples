# Cubism 4 SDK 注意事項


## Cubism Core

### [注意事項] macOS Catalina での `.bundle` と `.dylib` の利用について

macOS Catalina 上で `.bundle` と `.dylib` を利用する際、公証の確認のためオンライン環境に接続している必要があります。

詳しくは、Apple社 公式ドキュメントをご確認ください。

* [Apple社 公式ドキュメント](https://developer.apple.com/documentation/security/notarizing_your_app_before_distribution)


##  Cubism 4 SDK for Unity beta 2 (4-beta.2)


### [制限事項] macOS Catalina のサポートについて

現在、最新の Unity Editor `2019.2.11f1` では、下記のターゲットへのビルド時にエラーが発生し完了せず、ブロッキング状態となっています:

* iOS
* iPad OS
* WebGL


#### 対応方法

* Cubism 4 SDK for Unity では、当面の間 macOS Catalina のサポートをいたしません。
  * 問題が解消されるまで、 macOS Mojave までのサポートといたします。


## Cubism 4 SDK for Native beta 2 (4-beta.2)


### [制限事項] Xcode 11 での Cocos2d-x 版サンプルのビルドについて

現在、 Cocos2d-x のライブラリの問題のため、 Xcode 11 ではサンプルプロジェクトがビルド時にエラーが発生し完了せず、ブロッキング状態となっています。
なお、Stack Overflow に紹介されている方法を使用することにより、ビルドを正常に完了し、成果物も実行可能となります。


#### 対応方法

* Stack Overflowに紹介されている修正方法をご案内いたします。
  * [Xcode 11, Cocos2dx compilation problem: Argument value 10880 is outside the valid range [0, 255] btVector3.h](https://stackoverflow.com/questions/58064487/xcode-11-cocos2dx-compilation-problem-argument-value-10880-is-outside-the-vali)

* 公式コミュニティの報告
  * [Xcode 11 - ios 13 - Cocos not running](https://discuss.cocos2d-x.org/t/xcode-11-ios-13-cocos-not-running/46825/5)


---

©Live2D
