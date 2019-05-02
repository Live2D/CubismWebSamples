import { Live2DCubismFramework as csmstring } from "../type/csmstring";
import csmString = csmstring.csmString;
export declare namespace Live2DCubismFramework {
    class CubismId {
        getString(): csmString;
        constructor(id: string | csmString);
        isEqual(c: string | csmString | CubismId): boolean;
        isNotEqual(c: string | csmString | CubismId): boolean;
        private _id;
    }
    type CubismIdHandle = CubismId;
}
