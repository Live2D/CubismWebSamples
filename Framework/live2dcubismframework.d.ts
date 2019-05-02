/// <reference path="../Core/live2dcubismcore.d.ts" />
import { Live2DCubismFramework as cubismidmanager } from "./id/cubismidmanager";
import CubismIdManager = cubismidmanager.CubismIdManager;
export declare function strtod(s: string, endPtr: string[]): number;
export declare namespace Live2DCubismFramework {
    namespace Constant {
        const vertexOffset: number;
        const vertexStep: number;
    }
    function csmDelete<T>(address: T): void;
    class CubismFramework {
        static startUp(option?: Option): boolean;
        static cleanUp(): void;
        static initialize(): void;
        static dispose(): void;
        static isStarted(): boolean;
        static isInitialized(): boolean;
        static coreLogFunction(message: string): void;
        static getLoggingLevel(): LogLevel;
        static getIdManager(): CubismIdManager;
        private constructor();
    }
}
export declare class Option {
    logFunction: Live2DCubismCore.csmLogFunction;
    loggingLevel: LogLevel;
}
export declare enum LogLevel {
    LogLevel_Verbose = 0,
    LogLevel_Debug = 1,
    LogLevel_Info = 2,
    LogLevel_Warning = 3,
    LogLevel_Error = 4,
    LogLevel_Off = 5
}
