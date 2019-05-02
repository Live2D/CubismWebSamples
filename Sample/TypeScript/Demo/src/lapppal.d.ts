export declare class LAppPal {
    static loadFileAsBytes(filePath: string, callback: any): void;
    static releaseBytes(byteData: ArrayBuffer): void;
    static getDeltaTime(): number;
    static updateTime(): void;
    static printLog(format: string, ...args: any[]): void;
    static printMessage(message: string): void;
    static lastUpdate: number;
    static s_currentFrame: number;
    static s_lastFrame: number;
    static s_deltaTime: number;
}
