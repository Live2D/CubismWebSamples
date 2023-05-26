# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).


## [4-r.7] - 2023-05-25

### Added

* Add compiler options `noImplicitAny` and `useUnknownInCatchVariables` to `tsconfig.json`.
* Add some functions for checking consistency of MOC3 files.
  * Add the function of checking consistency in `lappmodel.setupModel()`.
  * Add the function of checking consistency before loading a model. (`lappmodel.hasMocConsistencyFromFile()`)
  * This feature is enabled by default. Please see the following manual for more information.
    * https://docs.live2d.com/cubism-sdk-manual/moc3-consistency/

### Fixed

* Fix a problem in which `haru` motion and voice were incorrect combination.

## [4-r.6.2] - 2023-03-16

### Fixed

* Fix some problems related to Cubism Core.
  * See `CHANGELOG.md` in Core.


## [4-r.6.1] - 2023-03-10

### Added

* Add funciton to validate MOC3 files.
  * See `CHANGELOG.md` in Core and Framework.


## [4-r.6] - 2023-02-21

### Removed

* Remove Debugger for Chrome from recommended extensions.
  * Use `Javascript Debugger`, a built-in feature of Visual Studio Code.


## [4-r.5] - 2022-09-08

### Added

* Add the multilingual supported documents.


## [4-r.5-beta.5] - 2022-08-04

### Changed

* Update `Mao` model.

### Fixed

* Fix crash with exception when reading .moc3 files of unsupported versions.


## [4-r.5-beta.4] - 2022-07-07

### Added

* Add `Mao` model.


## [4-r.5-beta.3] - 2022-06-16

### Fixed

* Fix a problem in which ViewPort was sometimes not set correctly.

### Removed

* End support for Internet Explorer.


## [4-r.5-beta.2] - 2022-06-02

### Fixed

* Fixed a bug that caused Multiply Color / Screen Color of different objects to be applied.
  * See `CHANGELOG.md` in Core.
  * No modifications to Samples and Framework.


## [4-r.5-beta.1] - 2022-05-19

### Added

* Support Multiply Color / Screen Color added in Cubism 4.2.
  * See Framework and Core.


## [4-r.4] - 2021-12-09

### Changed

* Update sample models. (Made with Cubism Editor 4.1.02)

### Fixed

* Fix a bug where the move process would affect other models while displaying multiple models. by [@catCoder](https://community.live2d.com/discussion/1043/multiple-models-when-using-translaterelative)
* Fix breathing behavior was different from Cubism Viewer (for OW).


## [4-r.3] - 2021-06-10

### Fixed

* Fixed the model path. It was causing a 404 when an exact path was required.

## [4-r.3-beta.1] - 2021-05-13

### Added

* Add the sample to manipulate the lip-sync from a waveform on the audio file(.wav).
* Add sample voices to `Haru`.


## [4-r.2] - 2021-03-09

### Added

* Add dynamic screen size and touch detection support.

### Fixed

* Adjust size calculation for models displayed in a window and fix to use a view matrix.
* Avoiding needless namespace syntax to simplify imports by [@cocor-au-lait](https://github.com/cocor-au-lait)


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


[4-r.7]: https://github.com/Live2D/CubismWebSamples/compare/4-r.6.2...4-r.7
[4-r.6.2]: https://github.com/Live2D/CubismWebSamples/compare/4-r.6.1...4-r.6.2
[4-r.6.1]: https://github.com/Live2D/CubismWebSamples/compare/4-r.6...4-r.6.1
[4-r.6]: https://github.com/Live2D/CubismWebSamples/compare/4-r.5...4-r.6
[4-r.5]: https://github.com/Live2D/CubismWebSamples/compare/4-r.5-beta.5...4-r.5
[4-r.5-beta.5]: https://github.com/Live2D/CubismWebSamples/compare/4-r.5-beta.4...4-r.5-beta.5
[4-r.5-beta.4]: https://github.com/Live2D/CubismWebSamples/compare/4-r.5-beta.3...4-r.5-beta.4
[4-r.5-beta.3]: https://github.com/Live2D/CubismWebSamples/compare/4-r.5-beta.2...4-r.5-beta.3
[4-r.5-beta.2]: https://github.com/Live2D/CubismWebSamples/compare/4-r.5-beta.1...4-r.5-beta.2
[4-r.5-beta.1]: https://github.com/Live2D/CubismWebSamples/compare/4-r.4...4-r.5-beta.1
[4-r.4]: https://github.com/Live2D/CubismWebSamples/compare/4-r.3...4-r.4
[4-r.3]: https://github.com/Live2D/CubismWebSamples/compare/4-r.3-beta.1...4-r.3
[4-r.3-beta.1]: https://github.com/Live2D/CubismWebSamples/compare/4-r.2...4-r.3-beta.1
[4-r.2]: https://github.com/Live2D/CubismWebSamples/compare/4-r.1...4-r.2
[4-r.1]: https://github.com/Live2D/CubismWebSamples/compare/4-beta.2...4-r.1
[4-beta.2]: https://github.com/Live2D/CubismWebSamples/compare/4-beta.1...4-beta.2
[4-beta.1]: https://github.com/Live2D/CubismWebSamples/compare/e36ab2233a89de9225f64e5a02d521bc7235bd03...4-beta.1
