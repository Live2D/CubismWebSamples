import { LogLevel } from "../live2dcubismframework";
export declare const CubismLogPrint: (level: LogLevel, fmt: string, args: any[]) => void;
export declare const CubismLogPrintIn: (level: LogLevel, fmt: string, args: any[]) => void;
export declare let CSM_ASSERT: (expr: any) => void;
export declare let CubismLogVerbose: (fmt: string, ...args: any[]) => void;
export declare let CubismLogDebug: (fmt: string, ...args: any[]) => void;
export declare let CubismLogInfo: (fmt: string, ...args: any[]) => void;
export declare let CubismLogWarning: (fmt: string, ...args: any[]) => void;
export declare let CubismLogError: (fmt: string, ...args: any[]) => void;
export declare namespace Live2DCubismFramework {
    class CubismDebug {
        static print(logLevel: LogLevel, format: string, args?: any[]): void;
        static dumpBytes(logLevel: LogLevel, data: Uint8Array, length: number): void;
        private constructor();
    }
}
