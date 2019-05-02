import { Live2DCubismFramework as cubismvector2 } from '../math/cubismvector2';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismVector2 = cubismvector2.CubismVector2;
export declare namespace Live2DCubismFramework {
    enum CubismPhysicsTargetType {
        CubismPhysicsTargetType_Parameter = 0
    }
    enum CubismPhysicsSource {
        CubismPhysicsSource_X = 0,
        CubismPhysicsSource_Y = 1,
        CubismPhysicsSource_Angle = 2
    }
    class PhysicsJsonEffectiveForces {
        constructor();
        gravity: CubismVector2;
        wind: CubismVector2;
    }
    class CubismPhysicsParameter {
        id: CubismIdHandle;
        targetType: CubismPhysicsTargetType;
    }
    class CubismPhysicsNormalization {
        minimum: number;
        maximum: number;
        defalut: number;
    }
    class CubismPhysicsParticle {
        constructor();
        initialPosition: CubismVector2;
        mobility: number;
        delay: number;
        acceleration: number;
        radius: number;
        position: CubismVector2;
        lastPosition: CubismVector2;
        lastGravity: CubismVector2;
        force: CubismVector2;
        velocity: CubismVector2;
    }
    class CubismPhysicsSubRig {
        constructor();
        inputCount: number;
        outputCount: number;
        particleCount: number;
        baseInputIndex: number;
        baseOutputIndex: number;
        baseParticleIndex: number;
        normalizationPosition: CubismPhysicsNormalization;
        normalizationAngle: CubismPhysicsNormalization;
    }
    interface normalizedPhysicsParameterValueGetter {
        (targetTranslation: CubismVector2, targetAngle: {
            angle: number;
        }, value: number, parameterMinimunValue: number, parameterMaximumValue: number, parameterDefaultValue: number, normalizationPosition: CubismPhysicsNormalization, normalizationAngle: CubismPhysicsNormalization, isInverted: boolean, weight: number): void;
    }
    interface physicsValueGetter {
        (translation: CubismVector2, particles: CubismPhysicsParticle[], particleIndex: number, isInverted: boolean, parentGravity: CubismVector2): number;
    }
    interface physicsScaleGetter {
        (translationScale: CubismVector2, angleScale: number): number;
    }
    class CubismPhysicsInput {
        constructor();
        source: CubismPhysicsParameter;
        sourceParameterIndex: number;
        weight: number;
        type: number;
        reflect: boolean;
        getNormalizedParameterValue: normalizedPhysicsParameterValueGetter;
    }
    class CubismPhysicsOutput {
        constructor();
        destination: CubismPhysicsParameter;
        destinationParameterIndex: number;
        vertexIndex: number;
        translationScale: CubismVector2;
        angleScale: number;
        weight: number;
        type: CubismPhysicsSource;
        reflect: boolean;
        valueBelowMinimum: number;
        valueExceededMaximum: number;
        getValue: physicsValueGetter;
        getScale: physicsScaleGetter;
    }
    class CubismPhysicsRig {
        constructor();
        subRigCount: number;
        settings: csmVector<CubismPhysicsSubRig>;
        inputs: csmVector<CubismPhysicsInput>;
        outputs: csmVector<CubismPhysicsOutput>;
        particles: csmVector<CubismPhysicsParticle>;
        gravity: CubismVector2;
        wind: CubismVector2;
    }
}
