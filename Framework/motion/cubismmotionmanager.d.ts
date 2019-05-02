import { Live2DCubismFramework as cubismmotionqueuemanager } from "./cubismmotionqueuemanager";
import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import CubismMotionQueueEntryHandle = cubismmotionqueuemanager.CubismMotionQueueEntryHandle;
import CubismModel = cubismmodel.CubismModel;
import ACubismMotion = acubismmotion.ACubismMotion;
import CubismMotionQueueManager = cubismmotionqueuemanager.CubismMotionQueueManager;
export declare namespace Live2DCubismFramework {
    class CubismMotionManager extends CubismMotionQueueManager {
        constructor();
        getCurrentPriority(): number;
        getReservePriority(): number;
        setReservePriority(val: number): void;
        startMotionPriority(motion: ACubismMotion, autoDelete: boolean, priority: number): CubismMotionQueueEntryHandle;
        updateMotion(model: CubismModel, deltaTimeSeconds: number): boolean;
        reserveMotion(priority: number): boolean;
        _currentPriority: number;
        _reservePriority: number;
    }
}
