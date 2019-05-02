import { Live2DCubismFramework as cubismmatrix44 } from "../../../../Framework/math/cubismmatrix44";
import { Live2DCubismFramework as csmvector } from "../../../../Framework/type/csmvector";
import Csm_csmVector = csmvector.csmVector;
import Csm_CubismMatrix44 = cubismmatrix44.CubismMatrix44;
import { LAppModel } from "./lappmodel";
export declare let s_instance: LAppLive2DManager;
export declare class LAppLive2DManager {
    static getInstance(): LAppLive2DManager;
    static releaseInstance(): void;
    getModel(no: number): LAppModel;
    releaseAllModel(): void;
    onDrag(x: number, y: number): void;
    onTap(x: number, y: number): void;
    onUpdate(): void;
    nextScene(): void;
    changeScene(index: number): void;
    constructor();
    _viewMatrix: Csm_CubismMatrix44;
    _models: Csm_csmVector<LAppModel>;
    _sceneIndex: number;
}
