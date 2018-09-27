/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/

import {Live2DCubismFramework as csmvector} from "../../../../Framework/type/csmvector";
import Csm_csmVector = csmvector.csmVector;
import { gl } from "./lappdelegate";

/**
 * テクスチャ管理クラス
 * 画像読み込み、管理を行うクラス。
 */
export class LAppTextureManager
{
    /**
     * コンストラクタ
     */
    constructor()
    {
        this._textures = new Csm_csmVector<TextureInfo>();
    }

    /**
     * プリマルチプライ処理
     * @param red 画像のRed値
     * @param green 画像のGreen値
     * @param blue 画像のBlue値
     * @param alpha 画像のAlpha値
     */
    public premultiply(red: number, green: number, blue: number, alpha: number): number
    {
        return (
            (red * (alpha + 1) >> 8) |
            ((green * (alpha + 1) >> 8) << 8) |
            ((blue * (alpha + 1) >> 8) << 16) |
            (((alpha)) << 24)
        );
    }

    /**
     * 画像読み込み
     * 
     * @param fileName 読み込む画像ファイルパス名
     * @return 画像情報、読み込み失敗時はnullを返す
     */
    public createTextureFromPngFile(fileName: string, callback: any): TextureInfo
    {
        // search loaded texture already
        for(let i: number = 0; i < this._textures.getSize(); i++)
        {
            if(this._textures.at(i).fileName == fileName)
            {
                return this._textures.at(i);
            }
        }

        // データのオンロードをトリガーにする
        let img = new Image();
        img.onload = () =>
        {
            // テクスチャオブジェクトの作成
            let tex: WebGLTexture = gl.createTexture();

            // テクスチャを選択
            gl.bindTexture(gl.TEXTURE_2D, tex);
            
            // テクスチャにピクセルを書き込む
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            // テクスチャにピクセルを書き込む
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            
            // ミップマップを生成
            gl.generateMipmap(gl.TEXTURE_2D);
            
            // テクスチャをバインド
            gl.bindTexture(gl.TEXTURE_2D, tex);

            let textureInfo: TextureInfo = new TextureInfo();

            if(textureInfo != null)
            {
                textureInfo.fileName = fileName;
                textureInfo.width = img.width;
                textureInfo.height = img.height;
                textureInfo.id = tex;
                this._textures.pushBack(textureInfo);
            }

            callback(textureInfo);
        }
        img.src = fileName;

        return null;
    }

    /**
     * 画像の解放
     * 
     * 配列に存在する画像全てを解放する。
     */
    public releaseTextures(): void
    {
        for(let i: number = 0; i < this._textures.getSize(); i++)
        {
            this._textures.set(i, void 0);
        }

        this._textures.clear();
    }

    /**
     * 画像の解放
     * 
     * 指定したテクスチャの画像を解放する。
     * @param texture 解放するテクスチャ
     */
    public releaseTextureByTexture(texture: WebGLTexture)
    {
        for(let i: number = 0; i < this._textures.getSize(); i++)
        {
            if(this._textures.at(i).id != texture)
            {
                continue;
            }

            this._textures.set(i, void 0);
            this._textures.remove(i);
            break;
        }
    }

    /**
     * 画像の解放
     * 
     * 指定した名前の画像を解放する。
     * @param fileName 解放する画像ファイルパス名
     */
    public releaseTextureByFilePath(fileName: string): void
    {
        for(let i: number = 0; i < this._textures.getSize(); i++)
        {
            if(this._textures.at(i).fileName == fileName)
            {
                this._textures.set(i, void 0);
                this._textures.remove(i);
                break;
            }
        }
    }

    _textures: Csm_csmVector<TextureInfo>;
}

/**
 * 画像情報構造体
 */
export class TextureInfo
{
    id: WebGLTexture = null;    // テクスチャ
    width: number = 0;          // 横幅
    height: number = 0;         // 高さ
    fileName: string;           // ファイル名 
}