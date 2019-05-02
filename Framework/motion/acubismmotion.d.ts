import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import csmString = csmstring.csmString;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import CubismModel = cubismmodel.CubismModel;
export declare namespace Live2DCubismFramework {
    abstract class ACubismMotion {
        static delete(motion: ACubismMotion): void;
        constructor();
        release(): void;
        updateParameters(model: CubismModel, motionQueueEntry: CubismMotionQueueEntry, userTimeSeconds: number): void;
        setFadeInTime(fadeInSeconds: number): void;
        setFadeOutTime(fadeOutSeconds: number): void;
        getFadeOutTime(): number;
        getFadeInTime(): number;
        setWeight(weight: number): void;
        getWeight(): number;
        getDuration(): number;
        getLoopDuration(): number;
        setOffsetTime(offsetSeconds: number): void;
        getFiredEvent(beforeCheckTimeSeconds: number, motionTimeSeconds: number): csmVector<csmString>;
        abstract doUpdateParameters(model: CubismModel, userTimeSeconds: number, weight: number, motionQueueEntry: CubismMotionQueueEntry): void;
        _fadeInSeconds: number;
        _fadeOutSeconds: number;
        _weight: number;
        _offsetSeconds: number;
        _firedEventValues: csmVector<csmString>;
    }
}
