export declare namespace Live2DCubismFramework {
    class csmPair<_KeyT, _ValT> {
        constructor(key?: _KeyT, value?: _ValT);
        first: _KeyT;
        second: _ValT;
    }
    class csmMap<_KeyT, _ValT> {
        constructor(size?: number);
        release(): void;
        appendKey(key: _KeyT): void;
        getValue(key: _KeyT): _ValT;
        setValue(key: _KeyT, value: _ValT): void;
        isExist(key: _KeyT): boolean;
        clear(): void;
        getSize(): number;
        prepareCapacity(newSize: number, fitToSize: boolean): void;
        begin(): iterator<_KeyT, _ValT>;
        end(): iterator<_KeyT, _ValT>;
        erase(ite: iterator<_KeyT, _ValT>): iterator<_KeyT, _ValT>;
        dumpAsInt(): void;
        static readonly DefaultSize = 10;
        _keyValues: csmPair<_KeyT, _ValT>[];
        _dummyValue: _ValT;
        _size: number;
    }
    class iterator<_KeyT, _ValT> {
        constructor(v?: csmMap<_KeyT, _ValT>, idx?: number);
        set(ite: iterator<_KeyT, _ValT>): iterator<_KeyT, _ValT>;
        preIncrement(): iterator<_KeyT, _ValT>;
        preDecrement(): iterator<_KeyT, _ValT>;
        increment(): iterator<_KeyT, _ValT>;
        decrement(): iterator<_KeyT, _ValT>;
        ptr(): csmPair<_KeyT, _ValT>;
        notEqual(ite: iterator<_KeyT, _ValT>): boolean;
        _index: number;
        _map: csmMap<_KeyT, _ValT>;
    }
}
