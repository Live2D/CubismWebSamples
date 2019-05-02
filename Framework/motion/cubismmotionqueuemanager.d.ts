import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import csmString = csmstring.csmString;
import CubismModel = cubismmodel.CubismModel;
import csmVector = csmvector.csmVector;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import ACubismMotion = acubismmotion.ACubismMotion;
export declare namespace Live2DCubismFramework {
    class CubismMotionQueueManager {
        constructor();
        release(): void;
        startMotion(motion: ACubismMotion, autoDelete: boolean, userTimeSeconds: number): CubismMotionQueueEntryHandle;
        isFinished(): boolean;
        isFinishedByHandle(motionQueueEntryNumber: CubismMotionQueueEntryHandle): boolean;
        stopAllMotions(): void;
        getCubismMotionQueueEntry(motionQueueEntryNumber: any): CubismMotionQueueEntry;
        setEventCallback(callback: CubismMotionEventFunction, customData?: any): void;
        doUpdateMotion(model: CubismModel, userTimeSeconds: number): boolean;
        _userTimeSeconds: number;
        _motions: csmVector<CubismMotionQueueEntry>;
        _eventCallBack: CubismMotionEventFunction;
        _eventCustomData: any;
    }
    interface CubismMotionEventFunction {
        (caller: CubismMotionQueueManager, eventValue: csmString, customData: any): void;
    }
    type CubismMotionQueueEntryHandle = any;
    const InvalidMotionQueueEntryHandleValue: CubismMotionQueueEntryHandle;
}
