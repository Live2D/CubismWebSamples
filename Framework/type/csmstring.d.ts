export declare namespace Live2DCubismFramework {
    class csmString {
        append(c: string, length?: number): csmString;
        expansion(length: number, v: string): csmString;
        getBytes(): number;
        getLength(): number;
        isLess(s: csmString): boolean;
        isGreat(s: csmString): boolean;
        isEqual(s: string): boolean;
        isEmpty(): boolean;
        constructor(s: string);
        s: string;
    }
}
