/// <reference path="../../Core/live2dcubismcore.d.ts" />
import { Live2DCubismFramework as cubismmodel } from "./cubismmodel";
import CubismModel = cubismmodel.CubismModel;
export declare namespace Live2DCubismFramework {
    class CubismMoc {
        static create(mocBytes: ArrayBuffer): CubismMoc;
        static delete(moc: CubismMoc): void;
        createModel(): CubismModel;
        deleteModel(model: CubismModel): void;
        private constructor();
        release(): void;
        _moc: Live2DCubismCore.Moc;
        _modelCount: number;
    }
}
