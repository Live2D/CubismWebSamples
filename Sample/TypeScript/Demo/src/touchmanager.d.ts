export declare class TouchManager {
    constructor();
    getCenterX(): number;
    getCenterY(): number;
    getDeltaX(): number;
    getDeltaY(): number;
    getStartX(): number;
    getStartY(): number;
    getScale(): number;
    getX(): number;
    getY(): number;
    getX1(): number;
    getY1(): number;
    getX2(): number;
    getY2(): number;
    isSingleTouch(): boolean;
    isFlickAvailable(): boolean;
    disableFlick(): void;
    touchesBegan(deviceX: number, deviceY: number): void;
    touchesMoved(deviceX: number, deviceY: number): void;
    getFlickDistance(): number;
    calculateDistance(x1: number, y1: number, x2: number, y2: number): number;
    calculateMovingAmount(v1: number, v2: number): number;
    _startY: number;
    _startX: number;
    _lastX: number;
    _lastY: number;
    _lastX1: number;
    _lastY1: number;
    _lastX2: number;
    _lastY2: number;
    _lastTouchDistance: number;
    _deltaX: number;
    _deltaY: number;
    _scale: number;
    _touchSingle: boolean;
    _flipAvailable: boolean;
}