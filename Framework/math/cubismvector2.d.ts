export declare namespace Live2DCubismFramework {
    class CubismVector2 {
        x?: number;
        y?: number;
        constructor(x?: number, y?: number);
        add(vector2: CubismVector2): CubismVector2;
        substract(vector2: CubismVector2): CubismVector2;
        multiply(vector2: CubismVector2): CubismVector2;
        multiplyByScaler(scalar: number): CubismVector2;
        division(vector2: CubismVector2): CubismVector2;
        divisionByScalar(scalar: number): CubismVector2;
        getLength(): number;
        getDistanceWith(a: CubismVector2): number;
        dot(a: CubismVector2): number;
        normalize(): void;
        isEqual(rhs: CubismVector2): boolean;
        isNotEqual(rhs: CubismVector2): boolean;
    }
}
