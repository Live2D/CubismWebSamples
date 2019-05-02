import { Live2DCubismFramework as cubismvector2 } from "./cubismvector2";
import CubismVector2 = cubismvector2.CubismVector2;
export declare namespace Live2DCubismFramework {
    class CubismMath {
        static range(value: number, min: number, max: number): number;
        static sin(x: number): number;
        static cos(x: number): number;
        static abs(x: number): number;
        static sqrt(x: number): number;
        static getEasingSine(value: number): number;
        static max(left: number, right: number): number;
        static min(left: number, right: number): number;
        static degreesToRadian(degrees: number): number;
        static radianToDegrees(radian: number): number;
        static directionToRadian(from: CubismVector2, to: CubismVector2): number;
        static directionToDegrees(from: CubismVector2, to: CubismVector2): number;
        static radianToDirection(totalAngle: number): CubismVector2;
        private constructor();
    }
}
