import { Live2DCubismFramework as csmstring } from "../type/csmstring";
import { Live2DCubismFramework as csmmap } from "../type/csmmap";
import { Live2DCubismFramework as csmvector } from "../type/csmvector";
import csmVector = csmvector.csmVector;
import csmMap = csmmap.csmMap;
import csmString = csmstring.csmString;
export declare namespace Live2DCubismFramework {
    abstract class Value {
        constructor();
        abstract getString(defaultValue?: string, indent?: string): string;
        getRawString(defaultValue?: string, indent?: string): string;
        toInt(defaultValue?: number): number;
        toFloat(defaultValue?: number): number;
        toBoolean(defaultValue?: boolean): boolean;
        getSize(): number;
        getArray(defaultValue?: Value[]): Value[];
        getVector(defaultValue?: csmVector<Value>): csmVector<Value>;
        getMap(defaultValue?: csmMap<string, Value>): csmMap<string, Value>;
        getValueByIndex(index: number): Value;
        getValueByString(s: string | csmString): Value;
        getKeys(): csmVector<string>;
        isError(): boolean;
        isNull(): boolean;
        isBool(): boolean;
        isFloat(): boolean;
        isString(): boolean;
        isArray(): boolean;
        isMap(): boolean;
        equals(value: csmString): boolean;
        equals(value: string): boolean;
        equals(value: number): boolean;
        equals(value: boolean): boolean;
        isStatic(): boolean;
        setErrorNotForClientCall(errorStr: string): Value;
        static staticInitializeNotForClientCall(): void;
        static staticReleaseNotForClientCall(): void;
        protected _stringBuffer: string;
        private static s_dummyKeys;
        static errorValue: Value;
        static nullValue: Value;
    }
    class CubismJson {
        constructor(buffer?: ArrayBuffer, length?: number);
        static create(buffer: ArrayBuffer, size: number): CubismJson;
        static delete(instance: CubismJson): void;
        getRoot(): Value;
        arrayBufferToString(buffer: ArrayBuffer): string;
        private pad;
        parseBytes(buffer: ArrayBuffer, size: number): boolean;
        getParseError(): string;
        checkEndOfFile(): boolean;
        protected parseValue(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
        protected parseString(string: string, length: number, begin: number, outEndPos: number[]): string;
        protected parseObject(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
        protected parseArray(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
        _error: string;
        _lineCount: number;
        _root: Value;
    }
    class JsonFloat extends Value {
        constructor(v: number);
        isFloat(): boolean;
        getString(defaultValue: string, indent: string): string;
        toInt(defaultValue?: number): number;
        toFloat(defaultValue?: number): number;
        equals(value: csmString): boolean;
        equals(value: string): boolean;
        equals(value: number): boolean;
        equals(value: boolean): boolean;
        private _value;
    }
    class JsonBoolean extends Value {
        isBool(): boolean;
        toBoolean(defaultValue?: boolean): boolean;
        getString(defaultValue: string, indent: string): string;
        equals(value: csmString): boolean;
        equals(value: string): boolean;
        equals(value: number): boolean;
        equals(value: boolean): boolean;
        isStatic(): boolean;
        constructor(v: boolean);
        static trueValue: JsonBoolean;
        static falseValue: JsonBoolean;
        private _boolValue;
    }
    class JsonString extends Value {
        constructor(s: string);
        constructor(s: csmString);
        isString(): boolean;
        getString(defaultValue: string, indent: string): string;
        equals(value: csmString): boolean;
        equals(value: string): boolean;
        equals(value: number): boolean;
        equals(value: boolean): boolean;
    }
    class JsonError extends JsonString {
        isStatic(): boolean;
        setErrorNotForClientCall(s: string): Value;
        constructor(s: csmString | string, isStatic: boolean);
        isError(): boolean;
        protected _isStatic: boolean;
    }
    class JsonNullvalue extends Value {
        isNull(): boolean;
        getString(defaultValue: string, indent: string): string;
        isStatic(): boolean;
        constructor();
    }
    class JsonArray extends Value {
        constructor();
        release(): void;
        isArray(): boolean;
        getValueByIndex(index: number): Value;
        getValueByString(s: string | csmString): Value;
        getString(defaultValue: string, indent: string): string;
        add(v: Value): void;
        getVector(defaultValue?: csmVector<Value>): csmVector<Value>;
        getSize(): number;
        private _array;
    }
    class JsonMap extends Value {
        constructor();
        release(): void;
        isMap(): boolean;
        getValueByString(s: string | csmString): Value;
        getValueByIndex(index: number): Value;
        getString(defaultValue: string, indent: string): string;
        getMap(defaultValue?: csmMap<string, Value>): csmMap<string, Value>;
        put(key: string, v: Value): void;
        getKeys(): csmVector<string>;
        getSize(): number;
        private _map;
        private _keys;
    }
}
