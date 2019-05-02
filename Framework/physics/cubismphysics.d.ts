import { Live2DCubismFramework as cubismphysicsinternal } from './cubismphysicsinternal';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismvector2 } from '../math/cubismvector2';
import CubismPhysicsRig = cubismphysicsinternal.CubismPhysicsRig;
import CubismVector2 = cubismvector2.CubismVector2;
import CubismModel = cubismmodel.CubismModel;
export declare namespace Live2DCubismFramework {
    class CubismPhysics {
        static create(buffer: ArrayBuffer, size: number): CubismPhysics;
        static delete(physics: CubismPhysics): void;
        evaluate(model: CubismModel, deltaTimeSeconds: number): void;
        setOptions(options: Options): void;
        getOption(): Options;
        constructor();
        release(): void;
        parse(physicsJson: ArrayBuffer, size: number): void;
        initialize(): void;
        _physicsRig: CubismPhysicsRig;
        _options: Options;
    }
    class Options {
        constructor();
        gravity: CubismVector2;
        wind: CubismVector2;
    }
}
