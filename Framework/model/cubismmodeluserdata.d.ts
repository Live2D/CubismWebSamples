import { Live2DCubismFramework as cubismid } from "../id/cubismid";
import { Live2DCubismFramework as csmstring } from "../type/csmstring";
import { Live2DCubismFramework as csmvector } from "../type/csmvector";
import csmVector = csmvector.csmVector;
import csmString = csmstring.csmString;
import CubismIdHandle = cubismid.CubismIdHandle;
export declare namespace Live2DCubismFramework {
    class CubismModelUserDataNode {
        targetType: CubismIdHandle;
        targetId: CubismIdHandle;
        value: csmString;
    }
    class CubismModelUserData {
        static create(buffer: ArrayBuffer, size: number): CubismModelUserData;
        static delete(modelUserData: CubismModelUserData): void;
        getArtMeshUserDatas(): csmVector<CubismModelUserDataNode>;
        parseUserData(buffer: ArrayBuffer, size: number): void;
        constructor();
        release(): void;
        private _userDataNodes;
        private _artMeshUserDataNode;
    }
}
