# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).


## [Unreleased]


## [4-r.1] - 2020-01-30

### Added

* Add development workflow using *Webpack Dev Server*.
* Add `README.md` to Sample project.
* Add Prettier and ESLint for format and check code quality.

### Changed

* `/Framework` directory is now git submodule.
  * See [Cubism Web Framework CHANGELOG](/Framework/CHANGELOG.md) about framework changes.
* Rename `/Sample` directory to `/Samples`
* Move `/Resources` directory to just below `/Samples` directory.
* Move `package.json` and `tsconfig.json` to Sample project.
* Reformat code using Prettier and ESLint.

### Removed

* Remove some unused functions in Demo project.
* Remove Webpack settings for framework.


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


[Unreleased]: https://github.com/Live2D/CubismWebSamples/compare/4-r.1...HEAD
[4-r.1]: https://github.com/Live2D/CubismWebSamples/compare/4-beta.2...4-r.1
[4-beta.2]: https://github.com/Live2D/CubismWebSamples/compare/4-beta.1...4-beta.2
[4-beta.1]: https://github.com/Live2D/CubismWebSamples/compare/e36ab2233a89de9225f64e5a02d521bc7235bd03...4-beta.1
