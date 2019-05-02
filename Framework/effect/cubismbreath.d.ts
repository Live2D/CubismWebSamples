import { Live2DCubismFramework as csmvector } from "../type/csmvector";
import { Live2DCubismFramework as cubismmodel } from "../model/cubismmodel";
import { Live2DCubismFramework as cubismid } from "../id/cubismid";
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismModel = cubismmodel.CubismModel;
import csmVector = csmvector.csmVector;
export declare namespace Live2DCubismFramework {
    class CubismBreath {
        static create(): CubismBreath;
        static delete(instance: CubismBreath): void;
        setParameters(breathParameters: csmVector<BreathParameterData>): void;
        getParameters(): csmVector<BreathParameterData>;
        updateParameters(model: CubismModel, deltaTimeSeconds: number): void;
        constructor();
        _breathParameters: csmVector<BreathParameterData>;
        _currentTime: number;
    }
    class BreathParameterData {
        constructor(parameterId?: CubismIdHandle, offset?: number, peak?: number, cycle?: number, weight?: number);
        parameterId: CubismIdHandle;
        offset: number;
        peak: number;
        cycle: number;
        weight: number;
    }
}
