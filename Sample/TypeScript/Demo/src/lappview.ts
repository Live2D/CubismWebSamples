/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Live2DCubismFramework as cubismMatrix44 } from '../../../../Framework/math/cubismmatrix44';
import { Live2DCubismFramework as cubismviewmatrix } from '../../../../Framework/math/cubismviewmatrix';
import Csm_CubismViewMatrix = cubismviewmatrix.CubismViewMatrix;
import Csm_CubismMatrix44 = cubismMatrix44.CubismMatrix44;
import { TouchManager } from './touchmanager';
import { LAppDefine } from './lappdefine';
import { LAppLive2DManager } from './lapplive2dmanager';
import { canvas, gl, LAppDelegate } from './lappdelegate';
import { LAppSprite } from './lappsprite';
import { TextureInfo } from './lapptexturemanager';
import { LAppPal } from './lapppal';

/**
 * 描画クラス。
 */
export class LAppView {
	/**
	 * コンストラクタ
	 */
	constructor() {
		this._programId = null;
		this._back = null;
		this._gear = null;

		// タッチ関係のイベント管理
		this._touchManager = new TouchManager();

		// デバイス座標からスクリーン座標に変換するための
		this._deviceToScreen = new Csm_CubismMatrix44();

		// 画面の表示の拡大縮小や移動の変換を行う行列
		this._viewMatrix = new Csm_CubismViewMatrix();
	}

	/**
	 * 初期化する。
	 */
	public initialize(): void {
		let width: number;
		let height: number;
		width = canvas.width;
		height = canvas.height;

		const ratio: number = height / width;
		const left: number = LAppDefine.ViewLogicalLeft;
		const right: number = LAppDefine.ViewLogicalRight;
		const bottom: number = -ratio;
		const top: number = ratio;

		this._viewMatrix.setScreenRect(left, right, bottom, top); // デバイスに対応する画面の範囲。 Xの左端、Xの右端、Yの下端、Yの上端

		const screenW: number = Math.abs(left - right);
		this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
		this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);

		// 表示範囲の設定
		this._viewMatrix.setMaxScale(LAppDefine.ViewMaxScale); // 限界拡張率
		this._viewMatrix.setMinScale(LAppDefine.ViewMinScale); // 限界縮小率

		// 表示できる最大範囲
		this._viewMatrix.setMaxScreenRect(
			LAppDefine.ViewLogicalMaxLeft,
			LAppDefine.ViewLogicalMaxRight,
			LAppDefine.ViewLogicalMaxBottom,
			LAppDefine.ViewLogicalMaxTop,
		);
	}

	/**
	 * 解放する
	 */
	public release(): void {
		this._viewMatrix = null;
		this._touchManager = null;
		this._deviceToScreen = null;

		this._gear.release();
		this._gear = null;

		this._back.release();
		this._back = null;

		gl.deleteProgram(this._programId);
		this._programId = null;
	}

	/**
	 * 描画する。
	 */
	public render(): void {
		gl.useProgram(this._programId);

		if (this._back) {
			this._back.render(this._programId);
		}
		if (this._gear) {
			this._gear.render(this._programId);
		}

		gl.flush();

		const live2DManager: LAppLive2DManager = LAppLive2DManager.getInstance();

		live2DManager.onUpdate();
	}

	/**
	 * 画像の初期化を行う。
	 */
	public initializeSprite(): void {
		const width: number = canvas.width;
		const height: number = canvas.height;

		const textureManager = LAppDelegate.getInstance().getTextureManager();
		const resourcesPath = LAppDefine.ResourcesPath;

		let imageName: string = '';

		// 背景画像初期化
		imageName = LAppDefine.BackImageName;

		// 非同期なのでコールバック関数を作成
		const initBackGroundTexture = (textureInfo: TextureInfo): void => {
			const x: number = width * 0.5;
			const y: number = height * 0.5;

			const fwidth = textureInfo.width * 2.0;
			const fheight = height * 0.95;
			this._back = new LAppSprite(x, y, fwidth, fheight, textureInfo.id);
		};

		textureManager.createTextureFromPngFile(
			resourcesPath + imageName,
			false,
			initBackGroundTexture,
		);

		// 歯車画像初期化
		imageName = LAppDefine.GearImageName;
		const initGearTexture = (textureInfo: TextureInfo): void => {
			const x = width - textureInfo.width * 0.5;
			const y = height - textureInfo.height * 0.5;
			const fwidth = textureInfo.width;
			const fheight = textureInfo.height;
			this._gear = new LAppSprite(x, y, fwidth, fheight, textureInfo.id);
		};

		textureManager.createTextureFromPngFile(
			resourcesPath + imageName,
			false,
			initGearTexture,
		);

		// シェーダーを作成
		if (this._programId == null) {
			this._programId = LAppDelegate.getInstance().createShader();
		}
	}

	/**
	 * タッチされた時に呼ばれる。
	 *
	 * @param pointX スクリーンX座標
	 * @param pointY スクリーンY座標
	 */
	public onTouchesBegan(pointX: number, pointY: number): void {
		this._touchManager.touchesBegan(pointX, pointY);
	}

	/**
	 * タッチしているときにポインタが動いたら呼ばれる。
	 *
	 * @param pointX スクリーンX座標
	 * @param pointY スクリーンY座標
	 */
	public onTouchesMoved(pointX: number, pointY: number): void {
		const viewX: number = this.transformViewX(this._touchManager.getX());
		const viewY: number = this.transformViewY(this._touchManager.getY());

		this._touchManager.touchesMoved(pointX, pointY);

		const live2DManager: LAppLive2DManager = LAppLive2DManager.getInstance();
		live2DManager.onDrag(viewX, viewY);
	}

	/**
	 * タッチが終了したら呼ばれる。
	 *
	 * @param pointX スクリーンX座標
	 * @param pointY スクリーンY座標
	 */
	public onTouchesEnded(pointX: number, pointY: number): void {
		// タッチ終了
		const live2DManager: LAppLive2DManager = LAppLive2DManager.getInstance();
		live2DManager.onDrag(0.0, 0.0);

		{
			// シングルタップ
			const x: number = this._deviceToScreen.transformX(
				this._touchManager.getX(),
			); // 論理座標変換した座標を取得。
			const y: number = this._deviceToScreen.transformY(
				this._touchManager.getY(),
			); // 論理座標変化した座標を取得。

			if (LAppDefine.DebugTouchLogEnable) {
				LAppPal.printLog('[APP]touchesEnded x: {0} y: {1}', x, y);
			}
			live2DManager.onTap(x, y);

			// 歯車にタップしたか
			if (this._gear.isHit(pointX, pointY)) {
				live2DManager.nextScene();
			}
		}
	}

	/**
	 * X座標をView座標に変換する。
	 *
	 * @param deviceX デバイスX座標
	 */
	public transformViewX(deviceX: number): number {
		const screenX: number = this._deviceToScreen.transformX(deviceX); // 論理座標変換した座標を取得。
		return this._viewMatrix.invertTransformX(screenX); // 拡大、縮小、移動後の値。
	}

	/**
	 * Y座標をView座標に変換する。
	 *
	 * @param deviceY デバイスY座標
	 */
	public transformViewY(deviceY: number): number {
		const screenY: number = this._deviceToScreen.transformY(deviceY); // 論理座標変換した座標を取得。
		return this._viewMatrix.invertTransformY(screenY);
	}

	/**
	 * X座標をScreen座標に変換する。
	 * @param deviceX デバイスX座標
	 */
	public transformScreenX(deviceX: number): number {
		return this._deviceToScreen.transformX(deviceX);
	}

	/**
	 * Y座標をScreen座標に変換する。
	 *
	 * @param deviceY デバイスY座標
	 */
	public transformScreenY(deviceY: number): number {
		return this._deviceToScreen.transformY(deviceY);
	}

	public _touchManager: TouchManager; // タッチマネージャー
	public _deviceToScreen: Csm_CubismMatrix44; // デバイスからスクリーンへの行列
	public _viewMatrix: Csm_CubismViewMatrix; // viewMatrix
	public _programId: WebGLProgram; // シェーダID
	public _back: LAppSprite; // 背景画像
	public _gear: LAppSprite; // ギア画像
	public _changeModel: boolean; // モデル切り替えフラグ
	public _isClick: boolean; // クリック中
}
