import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import CubismModel = cubismmodel.CubismModel;
import CubismIdHandle = cubismid.CubismIdHandle;
import ACubismMotion = acubismmotion.ACubismMotion;
export declare namespace Live2DCubismFramework {
    class CubismExpressionMotion extends ACubismMotion {
        static create(buffer: ArrayBuffer, size: number): CubismExpressionMotion;
        doUpdateParameters(model: CubismModel, userTimeSeconds: number, weight: number, motionQueueEntry: CubismMotionQueueEntry): void;
        constructor();
        _parameters: csmVector<ExpressionParameter>;
    }
    enum ExpressionBlendType {
        ExpressionBlendType_Add = 0,
        ExpressionBlendType_Multiply = 1,
        ExpressionBlendType_Overwrite = 2
    }
    class ExpressionParameter {
        parameterId: CubismIdHandle;
        blendType: ExpressionBlendType;
        value: number;
    }
}
