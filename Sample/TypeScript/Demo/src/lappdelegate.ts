/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/

import {Live2DCubismFramework as live2dcubismframework, Option} from "../../../../Framework/live2dcubismframework";
import {Live2DCubismFramework as cubismmatrix44} from "../../../../Framework/math/cubismmatrix44";
import Csm_CubismMatrix44 = cubismmatrix44.CubismMatrix44;
import Csm_CubismFramework = live2dcubismframework.CubismFramework;
import Csm_Option = Option;
import { LAppAllocator } from "./lappallocator";
import { LAppView } from "./lappview";
import { LAppPal } from "./lapppal";
import { LAppTextureManager } from "./lapptexturemanager";
import { LAppLive2DManager } from "./lapplive2dmanager";

export let canvas: HTMLCanvasElement = null;
export let s_instance: LAppDelegate = null;
export let gl: WebGLRenderingContext = null;

/**
 * アプリケーションクラス。
 * Cubism3の管理を行う。
 */
export class LAppDelegate
{
    /**
     * クラスのインスタンス（シングルトン）を返す。
     * インスタンスが生成されていない場合は内部でインスタンスを生成する。
     * 
     * @return クラスのインスタンス
     */
    public static getInstance(): LAppDelegate
    {
        if(s_instance == null)
        {
            s_instance = new LAppDelegate();
        }

        return s_instance;
    }

    /**
     * クラスのインスタンス（シングルトン）を解放する。
     */
    public static releaseInstance(): void
    {
        if(s_instance != null)
        {
            s_instance = void 0;
        }

        s_instance = null;
    }

    /**
     * APPに必要な物を初期化する。
     */
    public initialize(): boolean
    {
        // キャンバスの取得
        canvas = <HTMLCanvasElement>document.getElementById("SAMPLE");

        // glコンテキストを初期化
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if(!gl)
        {
            alert("WebGLを初期化できません。ブラウザはサポートしていないようです。");
            gl = null;

            // gl初期化失敗
            return false;
        }

        // 透過設定
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // マウス関連コールバック関数登録
        canvas.onmousedown = onClickBegan;
        canvas.onmousemove = onMouseMoved;
        canvas.onmouseup = onClickEnded;

        // AppViewの初期化
        this._view.initialize();

        // Cubism3の初期化
        this.initializeCubism();

        return true;
    }

    /**
     * 解放する。
     */
    public release(): void
    {
        this._textureManager = void 0;
        this._view = void 0;

        // リソースを解放
        LAppLive2DManager.releaseInstance();

        // Cubism3の解放
        Csm_CubismFramework.dispose();
    }

    /**
     * 実行処理。
     */
    public run(): void
    {
        // メインループ
        let loop = () =>
        {
            // 時間更新
            LAppPal.updateTime();

            // 画面の初期化
            gl.clearColor(0.0, 0.0, 0.0, 1.0);

            // 深度テストを有効化
            gl.enable(gl.DEPTH_TEST);

            // 近くにある物体は、遠くにある物体を覆い隠す
            gl.depthFunc(gl.LEQUAL);

            // カラーバッファや深度バッファをクリアする
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.clearDepth(1.0);

            this._view.initializeSprite();

            // 描画更新
            this._view.render();

            // ループのために再帰呼び出し
            setTimeout(loop, 1000.0/60);
        };
        loop();
    }

    /**
     * シェーダーを登録する。
     */
    public createShader(): WebGLProgram
    {
        // バーテックスシェーダーのコンパイル
        let vertexShaderId = gl.createShader(gl.VERTEX_SHADER);

        if(vertexShaderId == null)
        {
            console.log("failed to create vertexShader");
            return null;
        }

        const vertexShader: string =
            "precision mediump float;" +
            "attribute vec3 position;" +
            "attribute vec2 uv;" +
            "varying vec2 vuv;" +
            "void main(void)" +
            "{" +
            "   gl_Position = vec4(position, 1.0);" +
            "   vuv = uv;" +
            "}";

        gl.shaderSource(vertexShaderId, vertexShader);
        gl.compileShader(vertexShaderId);

        // フラグメントシェーダのコンパイル
        let fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER);
        
        if(fragmentShaderId == null)
        {
            console.log("failed to create fragmentShader");
            return null;
        }

        const fragmentShader: string =
            "precision mediump float;" +
            "varying vec2 vuv;" +
            "uniform sampler2D texture;" +
            "void main(void)" +
            "{" +
            "   gl_FragColor = texture2D(texture, vuv);" +
            "}";

        gl.shaderSource(fragmentShaderId, fragmentShader);
        gl.compileShader(fragmentShaderId);

        // プログラムオブジェクトの作成
        let programId = gl.createProgram();
        gl.attachShader(programId, vertexShaderId);
        gl.attachShader(programId, fragmentShaderId);

        // リンク
        gl.linkProgram(programId);

        gl.useProgram(programId);

        return programId;
    }

    /**
     * View情報を取得する。
     */
    public getView(): LAppView
    {
        return this._view;
    }

    /**
     * アプリケーションを終了するかどうか。
     */
    public getIsEnd(): boolean
    {
        return this._isEnd;
    }

    /**
     * アプリケーションを終了する。
     */
     public appEnd(): void
     {
        this._isEnd = true;
     }

     public getTextureManager(): LAppTextureManager
     {
        return this._textureManager;
     }
    
    /**
     * コンストラクタ
     */
    constructor()
    {
        this._captured = false;
        this._mouseX = 0.0;
        this._mouseY = 0.0;
        this._isEnd = false;

        this._cubismAllocator = new LAppAllocator();
        this._cubismOption = new Csm_Option();
        this._view = new LAppView();
        this._textureManager = new LAppTextureManager();
    }

    /**
     * Cubism3の初期化
     */
    public initializeCubism(): void
    {
        // setup cubism
        Csm_CubismFramework.startUp();

        // initialize cubism
        Csm_CubismFramework.initialize();

        // load model
        LAppLive2DManager.getInstance();

        // default proj
        let projection: Csm_CubismMatrix44 = new Csm_CubismMatrix44();

        LAppPal.updateTime();
    }

    _cubismAllocator: LAppAllocator;    // Cubism3 Allocator
    _cubismOption: Csm_Option;          // Cubism3 Option
    _view: LAppView;                    // View情報
    _captured: boolean;                 // クリックしているか
    _mouseX: number;                    // マウスX座標
    _mouseY: number;                    // マウスY座標
    _isEnd: boolean;                    // APP終了しているか
    _textureManager: LAppTextureManager;// テクスチャマネージャー
}



/**
 * クリックしたときに呼ばれる。
 */
function onClickBegan(e): void
{
    LAppDelegate.getInstance()._captured = true;
    if(!LAppDelegate.getInstance()._view)
    {
        console.log("view notfound");
        return;
    }

    let posX: number = e.pageX;
    let posY: number = e.pageY;

    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}

/**
 * マウスポインタが動いたら呼ばれる。
 */
function onMouseMoved(e): void
{
    let rect = e.target.getBoundingClientRect();
    let posX: number = e.clientX - rect.left;
    let posY: number = e.clientY - rect.top;

    if(!LAppDelegate.getInstance()._captured)
    {
        return;
    }

    if(!LAppDelegate.getInstance()._view)
    {
        console.log("view notfound");
        return;
    }

    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}

/**
 * クリックが終了したら呼ばれる。
 */
function onClickEnded(e): void
{
    LAppDelegate.getInstance()._captured = false;
    let rect = e.target.getBoundingClientRect();
    let posX: number = e.clientX - rect.left;
    let posY: number = e.clientY - rect.top;

    if(!LAppDelegate.getInstance()._view)
    {
        console.log("view notfound");
        return;
    }
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}