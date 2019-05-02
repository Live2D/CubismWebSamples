import { Live2DCubismFramework as cubismid } from "../id/cubismid";
import { Live2DCubismFramework as csmvector } from "../type/csmvector";
import { Live2DCubismFramework as cubismmodel } from "../model/cubismmodel";
import CubismIdHandle = cubismid.CubismIdHandle;
import csmVector = csmvector.csmVector;
import CubismModel = cubismmodel.CubismModel;
export declare namespace Live2DCubismFramework {
    class CubismPose {
        static create(pose3json: ArrayBuffer, size: number): CubismPose;
        static delete(pose: CubismPose): void;
        updateParameters(model: CubismModel, deltaTimeSeconds: number): void;
        reset(model: CubismModel): void;
        copyPartOpacities(model: CubismModel): void;
        doFade(model: CubismModel, deltaTimeSeconds: number, beginIndex: number, partGroupCount: number): void;
        constructor();
        _partGroups: csmVector<PartData>;
        _partGroupCounts: csmVector<number>;
        _fadeTimeSeconds: number;
        _lastModel: CubismModel;
    }
    class PartData {
        constructor(v?: PartData);
        assignment(v: PartData): PartData;
        initialize(model: CubismModel): void;
        clone(): PartData;
        partId: CubismIdHandle;
        parameterIndex: number;
        partIndex: number;
        link: csmVector<PartData>;
    }
}
