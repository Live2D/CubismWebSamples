import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import csmString = csmstring.csmString;
import CubismIdHandle = cubismid.CubismIdHandle;
export declare namespace Live2DCubismFramework {
    enum CubismMotionCurveTarget {
        CubismMotionCurveTarget_Model = 0,
        CubismMotionCurveTarget_Parameter = 1,
        CubismMotionCurveTarget_PartOpacity = 2
    }
    enum CubismMotionSegmentType {
        CubismMotionSegmentType_Linear = 0,
        CubismMotionSegmentType_Bezier = 1,
        CubismMotionSegmentType_Stepped = 2,
        CubismMotionSegmentType_InverseStepped = 3
    }
    class CubismMotionPoint {
        time: number;
        value: number;
    }
    interface csmMotionSegmentEvaluationFunction {
        (points: CubismMotionPoint[], time: number): number;
    }
    class CubismMotionSegment {
        constructor();
        evaluate: csmMotionSegmentEvaluationFunction;
        basePointIndex: number;
        segmentType: number;
    }
    class CubismMotionCurve {
        constructor();
        type: CubismMotionCurveTarget;
        id: CubismIdHandle;
        segmentCount: number;
        baseSegmentIndex: number;
        fadeInTime: number;
        fadeOutTime: number;
    }
    class CubismMotionEvent {
        fireTime: number;
        value: csmString;
    }
    class CubismMotionData {
        constructor();
        duration: number;
        loop: boolean;
        curveCount: number;
        eventCount: number;
        fps: number;
        curves: csmVector<CubismMotionCurve>;
        segments: csmVector<CubismMotionSegment>;
        points: csmVector<CubismMotionPoint>;
        events: csmVector<CubismMotionEvent>;
    }
}
