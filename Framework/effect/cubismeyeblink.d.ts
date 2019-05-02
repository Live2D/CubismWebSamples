import { Live2DCubismFramework as csmvector } from "../type/csmvector";
import { Live2DCubismFramework as icubismmodelsetting } from "../icubismmodelsetting";
import { Live2DCubismFramework as cubismid } from "../id/cubismid";
import { Live2DCubismFramework as cubismmodel } from "../model/cubismmodel";
import CubismModel = cubismmodel.CubismModel;
import CubismIdHandle = cubismid.CubismIdHandle;
import ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;
import csmVector = csmvector.csmVector;
export declare namespace Live2DCubismFramework {
    class CubismEyeBlink {
        static create(modelSetting?: ICubismModelSetting): CubismEyeBlink;
        static delete(eyeBlink: CubismEyeBlink): void;
        setBlinkingInterval(blinkingInterval: number): void;
        setBlinkingSetting(closing: number, closed: number, opening: number): void;
        setParameterIds(parameterIds: csmVector<CubismIdHandle>): void;
        getParameterIds(): csmVector<CubismIdHandle>;
        updateParameters(model: CubismModel, deltaTimeSeconds: number): void;
        constructor(modelSetting: ICubismModelSetting);
        determinNextBlinkingTiming(): number;
        _blinkingState: number;
        _parameterIds: csmVector<CubismIdHandle>;
        _nextBlinkingTime: number;
        _stateStartTimeSeconds: number;
        _blinkingIntervalSeconds: number;
        _closingSeconds: number;
        _closedSeconds: number;
        _openingSeconds: number;
        _userTimeSeconds: number;
        static readonly CloseIfZero: boolean;
    }
    enum EyeState {
        EyeState_First = 0,
        EyeState_Interval = 1,
        EyeState_Closing = 2,
        EyeState_Closed = 3,
        EyeState_Opening = 4
    }
}
