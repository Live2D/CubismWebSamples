export declare namespace Live2DCubismFramework {
    class CubismString {
        static getFormatedString(format: string, ...args: any[]): string;
        static isStartWith(text: string, startWord: string): boolean;
        static stringToFloat(string: string, length: number, position: number, outEndPos: number[]): number;
        private constructor();
    }
}
