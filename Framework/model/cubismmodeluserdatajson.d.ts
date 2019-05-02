import { Live2DCubismFramework as cubismid } from "../id/cubismid";
import CubismIdHandle = cubismid.CubismIdHandle;
export declare namespace Live2DCubismFramework {
    class CubismModelUserDataJson {
        constructor(buffer: ArrayBuffer, size: number);
        release(): void;
        getUserDataCount(): number;
        getTotalUserDataSize(): number;
        getUserDataTargetType(i: number): string;
        getUserDataId(i: number): CubismIdHandle;
        getUserDataValue(i: number): string;
        private _json;
    }
}
