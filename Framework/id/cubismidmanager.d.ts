import { Live2DCubismFramework as cubismid } from "./cubismid";
import { Live2DCubismFramework as csmstring } from "../type/csmstring";
import csmString = csmstring.csmString;
import CubismId = cubismid.CubismId;
export declare namespace Live2DCubismFramework {
    class CubismIdManager {
        constructor();
        release(): void;
        registerIds(ids: string[] | csmString[]): void;
        registerId(id: string | csmString): CubismId;
        getId(id: csmString | string): CubismId;
        isExist(id: csmString | string): boolean;
        private findId;
        private _ids;
    }
}
