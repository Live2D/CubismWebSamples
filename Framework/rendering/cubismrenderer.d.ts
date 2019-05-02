import { Live2DCubismFramework as cubismmatrix44 } from '../math/cubismmatrix44';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import CubismModel = cubismmodel.CubismModel;
import CubismMatrix44 = cubismmatrix44.CubismMatrix44;
export declare namespace Live2DCubismFramework {
    abstract class CubismRenderer {
        static create(): CubismRenderer;
        static delete(renderer: CubismRenderer): void;
        initialize(model: CubismModel): void;
        drawModel(): void;
        setMvpMatrix(matrix44: CubismMatrix44): void;
        getMvpMatrix(): CubismMatrix44;
        setModelColor(red: number, green: number, blue: number, alpha: number): void;
        getModelColor(): CubismTextureColor;
        setIsPremultipliedAlpha(enable: boolean): void;
        isPremultipliedAlpha(): boolean;
        setIsCulling(culling: boolean): void;
        isCulling(): boolean;
        setAnisotropy(n: number): void;
        getAnisotropy(): number;
        getModel(): CubismModel;
        protected constructor();
        abstract doDrawModel(): void;
        abstract drawMesh(textureNo: number, indexCount: number, vertexCount: number, indexArray: Uint16Array, vertexArray: Float32Array, uvArray: Float32Array, opacity: number, colorBlendMode: CubismBlendMode): void;
        static staticRelease: Function;
        protected _mvpMatrix4x4: CubismMatrix44;
        protected _modelColor: CubismTextureColor;
        protected _isCulling: boolean;
        protected _isPremultipliedAlpha: boolean;
        protected _anisortopy: any;
        protected _model: CubismModel;
    }
    enum CubismBlendMode {
        CubismBlendMode_Normal = 0,
        CubismBlendMode_Additive = 1,
        CubismBlendMode_Multiplicative = 2
    }
    class CubismTextureColor {
        constructor();
        R: number;
        G: number;
        B: number;
        A: number;
    }
}
