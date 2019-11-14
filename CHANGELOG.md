# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [4-beta.2] - 2019-11-14

### Fixed

* Fix file name case of `cubismrenderer_webgl.ts`.


## [4-beta.1] - 2019-09-04

### Added

* Add method for Moc file version.
* Support new Inverted Masking features.
* Add `.editorconfig` and `.gitattributes` to manage file formats.
* Add `CHANGELOG.md`.
* Add way to create a simpler local server.
* Add sample model `/Sample/TypeScript/Demo/Resources/Rice`.

### Changed

* Upgrade Core version to 04.00.0000 (67108864).
* Convert all file formats according to `.editorconfig`.
* Rename `cubismrenderer_WebGL.ts` to `cubismrenderer_webgl.ts`.
* What was `CubismSdkPackage.json` is currently being changed to`cubism-info.yml`.
* Upgrade all dependency packages and lock package version by adding `package-lock.json`.
* Update `README.md`.
  * Delete guidance from `README.md` due to suspension of *Cubism Bindings*.
* Update `.gitignore`.

### Fixed

* Fix issue with reloading model images in WebKit.


[4-beta.2]: https://github.com/Live2D/CubismWebSamples/compare/4-beta.1...4-beta.2
[4-beta.1]: https://github.com/Live2D/CubismWebSamples/compare/e36ab2233a89de9225f64e5a02d521bc7235bd03...4-beta.1
