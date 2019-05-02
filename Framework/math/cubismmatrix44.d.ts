export declare namespace Live2DCubismFramework {
    class CubismMatrix44 {
        constructor();
        static multiply(a: Float32Array, b: Float32Array, dst: Float32Array): void;
        loadIdentity(): void;
        setMatrix(tr: Float32Array): void;
        getArray(): Float32Array;
        getScaleX(): number;
        getScaleY(): number;
        getTranslateX(): number;
        getTranslateY(): number;
        transformX(src: number): number;
        transformY(src: number): number;
        invertTransformX(src: number): number;
        invertTransformY(src: number): number;
        translateRelative(x: number, y: number): void;
        translate(x: number, y: number): void;
        translateX(x: number): void;
        translateY(y: number): void;
        scaleRelative(x: number, y: number): void;
        scale(x: number, y: number): void;
        multiplyByMatrix(m: CubismMatrix44): void;
        clone(): CubismMatrix44;
        protected _tr: Float32Array;
    }
}
