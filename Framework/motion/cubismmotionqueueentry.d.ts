import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmotionqueuemanager } from './cubismmotionqueuemanager';
import CubismMotionQueueEntryHandle = cubismmotionqueuemanager.CubismMotionQueueEntryHandle;
import ACubismMotion = acubismmotion.ACubismMotion;
export declare namespace Live2DCubismFramework {
    class CubismMotionQueueEntry {
        constructor();
        release(): void;
        startFadeout(fadeoutSeconds: number, userTimeSeconds: number): void;
        isFinished(): boolean;
        isStarted(): boolean;
        getStartTime(): number;
        getFadeInStartTime(): number;
        getEndTime(): number;
        setStartTime(startTime: number): void;
        setFadeInStartTime(startTime: number): void;
        setEndTime(endTime: number): void;
        setIsFinished(f: boolean): void;
        setIsStarted(f: boolean): void;
        isAvailable(): boolean;
        setIsAvailable(v: boolean): void;
        setState(timeSeconds: number, weight: number): void;
        getStateTime(): number;
        getStateWeight(): number;
        getLastCheckEventTime(): number;
        setLastCheckEventTime(checkTime: number): void;
        _autoDelete: boolean;
        _motion: ACubismMotion;
        _available: boolean;
        _finished: boolean;
        _started: boolean;
        _startTimeSeconds: number;
        _fadeInStartTimeSeconds: number;
        _endTimeSeconds: number;
        _stateTimeSeconds: number;
        _stateWeight: number;
        _lastEventCheckSeconds: number;
        _motionQueueEntryHandle: CubismMotionQueueEntryHandle;
    }
}
