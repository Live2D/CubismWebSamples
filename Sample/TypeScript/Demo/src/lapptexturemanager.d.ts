import { Live2DCubismFramework as csmvector } from "../../../../Framework/type/csmvector";
import Csm_csmVector = csmvector.csmVector;
export declare class LAppTextureManager {
    constructor();
    release(): void;
    createTextureFromPngFile(fileName: string, usePremultiply: boolean, callback: any): void;
    releaseTextures(): void;
    releaseTextureByTexture(texture: WebGLTexture): void;
    releaseTextureByFilePath(fileName: string): void;
    _textures: Csm_csmVector<TextureInfo>;
}
export declare class TextureInfo {
    img: HTMLImageElement;
    id: WebGLTexture;
    width: number;
    height: number;
    usePremultply: boolean;
    fileName: string;
}
