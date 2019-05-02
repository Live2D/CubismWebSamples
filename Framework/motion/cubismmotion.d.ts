import { Live2DCubismFramework as cubismmotioninternal } from './cubismmotioninternal';
import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import csmString = csmstring.csmString;
import CubismMotionData = cubismmotioninternal.CubismMotionData;
import CubismIdHandle = cubismid.CubismIdHandle;
import csmVector = csmvector.csmVector;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import CubismModel = cubismmodel.CubismModel;
import ACubismMotion = acubismmotion.ACubismMotion;
export declare namespace Live2DCubismFramework {
    class CubismMotion extends ACubismMotion {
        static create(buffer: ArrayBuffer, size: number): CubismMotion;
        doUpdateParameters(model: CubismModel, userTimeSeconds: number, fadeWeight: number, motionQueueEntry: CubismMotionQueueEntry): void;
        setIsLoop(loop: boolean): void;
        isLoop(): boolean;
        setIsLoopFadeIn(loopFadeIn: boolean): void;
        isLoopFadeIn(): boolean;
        getDuration(): number;
        getLoopDuration(): number;
        setParameterFadeInTime(parameterId: CubismIdHandle, value: number): void;
        setParameterFadeOutTime(parameterId: CubismIdHandle, value: number): void;
        getParameterFadeInTime(parameterId: CubismIdHandle): number;
        getParameterFadeOutTime(parameterId: CubismIdHandle): number;
        setEffectIds(eyeBlinkParameterIds: csmVector<CubismIdHandle>, lipSyncParameterIds: csmVector<CubismIdHandle>): void;
        constructor();
        release(): void;
        parse(motionJson: ArrayBuffer, size: number): void;
        getFiredEvent(beforeCheckTimeSeconds: number, motionTimeSeconds: number): csmVector<csmString>;
        _sourceFrameRate: number;
        _loopDurationSeconds: number;
        _isLoop: boolean;
        _isLoopFadeIn: boolean;
        _lastWeight: number;
        _motionData: CubismMotionData;
        _eyeBlinkParameterIds: csmVector<CubismIdHandle>;
        _lipSyncParameterIds: csmVector<CubismIdHandle>;
        _modelCurveIdEyeBlink: CubismIdHandle;
        _modelCurveIdLipSync: CubismIdHandle;
    }
}
