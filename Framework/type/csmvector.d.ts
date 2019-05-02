export declare namespace Live2DCubismFramework {
    class csmVector<T> {
        constructor(initialCapacity?: number);
        at(index: number): T;
        set(index: number, value: T): void;
        get(offset?: number): T[];
        pushBack(value: T): void;
        clear(): void;
        getSize(): number;
        assign(newSize: number, value: T): void;
        resize(newSize: number, value?: T): void;
        updateSize(newSize: number, value?: any, callPlacementNew?: boolean): void;
        insert(position: iterator<T>, begin: iterator<T>, end: iterator<T>): void;
        remove(index: number): boolean;
        erase(ite: iterator<T>): iterator<T>;
        prepareCapacity(newSize: number): void;
        begin(): iterator<T>;
        end(): iterator<T>;
        getOffset(offset: number): csmVector<T>;
        _ptr: T[];
        _size: number;
        _capacity: number;
        static readonly s_defaultSize = 10;
    }
    class iterator<T> {
        constructor(v?: csmVector<T>, index?: number);
        set(ite: iterator<T>): iterator<T>;
        preIncrement(): iterator<T>;
        preDecrement(): iterator<T>;
        increment(): iterator<T>;
        decrement(): iterator<T>;
        ptr(): T;
        substitution(ite: iterator<T>): iterator<T>;
        notEqual(ite: iterator<T>): boolean;
        _index: number;
        _vector: csmVector<T>;
    }
}
