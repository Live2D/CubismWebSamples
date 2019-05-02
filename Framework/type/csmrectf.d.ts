export declare namespace Live2DCubismFramework {
    class csmRect {
        constructor(x?: number, y?: number, w?: number, h?: number);
        getCenterX(): number;
        getCenterY(): number;
        getRight(): number;
        getBottom(): number;
        setRect(r: csmRect): void;
        expand(w: number, h: number): void;
        x: number;
        y: number;
        width: number;
        height: number;
    }
}
