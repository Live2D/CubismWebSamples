import { Live2DCubismFramework as cubismMatrix44 } from "../../../../Framework/math/cubismmatrix44";
import { Live2DCubismFramework as cubismviewmatrix } from "../../../../Framework/math/cubismviewmatrix";
import Csm_CubismViewMatrix = cubismviewmatrix.CubismViewMatrix;
import Csm_CubismMatrix44 = cubismMatrix44.CubismMatrix44;
import { TouchManager } from "./touchmanager";
import { LAppSprite } from "./lappsprite";
export declare class LAppView {
    constructor();
    initialize(): void;
    release(): void;
    render(): void;
    initializeSprite(): void;
    onTouchesBegan(pointX: number, pointY: number): void;
    onTouchesMoved(pointX: number, pointY: number): void;
    onTouchesEnded(pointX: number, pointY: number): void;
    transformViewX(deviceX: number): number;
    transformViewY(deviceY: number): number;
    transformScreenX(deviceX: number): number;
    transformScreenY(deviceY: number): number;
    _touchManager: TouchManager;
    _deviceToScreen: Csm_CubismMatrix44;
    _viewMatrix: Csm_CubismViewMatrix;
    _programId: WebGLProgram;
    _back: LAppSprite;
    _gear: LAppSprite;
    _changeModel: boolean;
    _isClick: boolean;
}
