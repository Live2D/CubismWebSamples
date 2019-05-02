import { Live2DCubismFramework as cubismmatrix44 } from "./cubismmatrix44";
import CubismMatrix44 = cubismmatrix44.CubismMatrix44;
export declare namespace Live2DCubismFramework {
    class CubismViewMatrix extends CubismMatrix44 {
        constructor();
        adjustTranslate(x: number, y: number): void;
        adjustScale(cx: number, cy: number, scale: number): void;
        setScreenRect(left: number, right: number, bottom: number, top: number): void;
        setMaxScreenRect(left: number, right: number, bottom: number, top: number): void;
        setMaxScale(maxScale: number): void;
        setMinScale(minScale: number): void;
        getMaxScale(): number;
        getMinScale(): number;
        isMaxScale(): boolean;
        isMinScale(): boolean;
        getScreenLeft(): number;
        getScreenRight(): number;
        getScreenBottom(): number;
        getScreenTop(): number;
        getMaxLeft(): number;
        getMaxRight(): number;
        getMaxBottom(): number;
        getMaxTop(): number;
        private _screenLeft;
        private _screenRight;
        private _screenTop;
        private _screenBottom;
        private _maxLeft;
        private _maxRight;
        private _maxTop;
        private _maxBottom;
        private _maxScale;
        private _minScale;
    }
}
