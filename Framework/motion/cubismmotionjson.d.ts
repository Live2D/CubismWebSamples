import { Live2DCubismFramework as cubismjson } from '../utils/cubismjson';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import csmString = csmstring.csmString;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismJson = cubismjson.CubismJson;
export declare namespace Live2DCubismFramework {
    class CubismMotionJson {
        constructor(buffer: ArrayBuffer, size: number);
        release(): void;
        getMotionDuration(): number;
        isMotionLoop(): boolean;
        getMotionCurveCount(): number;
        getMotionFps(): number;
        getMotionTotalSegmentCount(): number;
        getMotionTotalPointCount(): number;
        isExistMotionFadeInTime(): boolean;
        isExistMotionFadeOutTime(): boolean;
        getMotionFadeInTime(): number;
        getMotionFadeOutTime(): number;
        getMotionCurveTarget(curveIndex: number): string;
        getMotionCurveId(curveIndex: number): CubismIdHandle;
        isExistMotionCurveFadeInTime(curveIndex: number): boolean;
        isExistMotionCurveFadeOutTime(curveIndex: number): boolean;
        getMotionCurveFadeInTime(curveIndex: number): number;
        getMotionCurveFadeOutTime(curveIndex: number): number;
        getMotionCurveSegmentCount(curveIndex: number): number;
        getMotionCurveSegment(curveIndex: number, segmentIndex: number): number;
        getEventCount(): number;
        getTotalEventValueSize(): number;
        getEventTime(userDataIndex: number): number;
        getEventValue(userDataIndex: number): csmString;
        _json: CubismJson;
    }
}
