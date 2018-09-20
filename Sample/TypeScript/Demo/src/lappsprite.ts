/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/

import { gl, canvas } from "./lappdelegate";

/**
 * スプライトを実装するクラス
 * 
 * テクスチャＩＤ、Rectの管理
 */
 export class LAppSprite
 {
     /**
      * コンストラクタ
      * @param x            x座標
      * @param y            y座標
      * @param width        横幅
      * @param height       高さ
      * @param textureId    テクスチャ
      */
    constructor(x: number, y: number, width: number, height: number, textureId: WebGLTexture)
    {
        this._rect = new Rect();
        this._rect.left = (x - width * 0.5);
        this._rect.right = (x + width * 0.5);
        this._rect.up = (y + height * 0.5);
        this._rect.down = (y - height * 0.5);
        this._texture = textureId;
    }

    /**
     * テクスチャを返す
     */
    public getTexture(): WebGLTexture
    {
        return this._texture;
    }

    /**
     * 描画する。
     * @param programId シェーダープログラム
     * @param canvas 描画するキャンパス情報
     */
    public render(programId: WebGLProgram): void
    {
        if(!this._texture)
        {
            return;
        }

        // 何番目のattribute変数か
        let positionLocation = gl.getAttribLocation(programId, "position");
        let uvLocation = gl.getAttribLocation(programId, "uv");
        
        let textureLocation: WebGLUniformLocation = null;
        textureLocation = gl.getUniformLocation(programId, "texture");
        
        // attribute属性を有効にする
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(uvLocation);
        
        // uniform属性の登録
        gl.uniform1i(textureLocation, 0);
        
        const uvVertex: Float32Array = new Float32Array([
            1.0, 0.0,
            0.0, 0.0,
            0.0, 1.0,
            1.0, 1.0
        ]);
        let vuv: WebGLBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vuv);
        gl.bufferData(gl.ARRAY_BUFFER, uvVertex, gl.STATIC_DRAW);
        
        // attribute属性を登録
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);
        
        // 画面サイズを取得する。
        let maxWidth, maxHeight;
        maxWidth = canvas.width;
        maxHeight = canvas.height;
        
        // 頂点データ
        let positionVertex: Float32Array = new Float32Array([
            (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.up   - maxHeight * 0.5) / (maxHeight * 0.5),
            (this._rect.left  - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.up   - maxHeight * 0.5) / (maxHeight * 0.5),
            (this._rect.left  - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
            (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5)
        ]);
        
        let vposition: WebGLBuffer = gl.createBuffer();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindBuffer(gl.ARRAY_BUFFER, vposition);
        gl.bufferData(gl.ARRAY_BUFFER, positionVertex, gl.STATIC_DRAW);
        
        // attribute属性を登録
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        
        // モデルの描画
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
    
    /**
     * 当たり判定
     * @param pointX x座標
     * @param pointY y座標
     */
    public isHit(pointX: number, pointY: number): boolean
    {
        // 画面サイズを取得する。
        let maxWidth, maxHeight;
        maxWidth = canvas.width;
        maxHeight = canvas.height;

        // Y座標は変換する必要あり
        let y = maxHeight - pointY;

        return (pointX >= this._rect.left && pointX <= this._rect.right && y <= this._rect.up && y >= this._rect.down);
    }

     _texture: WebGLTexture;    // テクスチャ
     _rect: Rect;               // 矩形
 }


 export class Rect
 {
     public left: number;   // 左辺
     public right: number;  // 右辺
     public up: number;     // 上辺
     public down: number;   // 下辺
 }