import { ObservableVariable } from './ObservableVariable';
import type { ObservableVariableOptions } from './ObservableVariable';

/**
 * 可观察改变 Set
 */
export class ObservableSet<T> extends ObservableVariable<ReadonlySet<T>> {
    protected readonly _onAdd: Set<(value: T, oSet: ObservableSet<T>) => void> = new Set();
    protected readonly _onDelete: Set<(value: T, oSet: ObservableSet<T>) => void> = new Set();

    /**
     * Set 中元素个数
     */
    get size(): number {
        return this._value.size;
    }

    constructor(value: ObservableSet<T> | ReadonlySet<T> | readonly T[] = new Set(), options?: ObservableVariableOptions) {
        super(value as any, options);

        if (this !== value) { // 确保不是重复包裹
            if (Array.isArray(value))
                this._value = new Set(value);
        }
    }

    // @ts-expect-error
    toJSON(): T[] | undefined {
        return this._serializable ? [...this._value] : undefined;
    }

    // #region 事件绑定

    /**
     * 当改变变量值的时候触发
     */
    on(event: 'set', callback: (newValue: ReadonlySet<T>, oldValue: ReadonlySet<T>, oSet: this) => void): void;
    /**
     * 在变量值发生改变之前触发，返回一个新的值用于替换要设置的值
     * 注意：该回调只允许设置一个，重复设置将覆盖之前的回调。该回调不会受 ensureChange 的影响，只要用户设置值就会被触发
     */
    on(event: 'beforeSet', callback: (newValue: ReadonlySet<T>, oldValue: ReadonlySet<T>, oSet: this) => ReadonlySet<T>): void;
    /**
     * 当向 Set 中添加元素时触发
     */
    on(event: 'add', callback: (value: T, oSet: this) => void): void;
    /**
     * 当删除 Set 中元素时触发
     */
    on(event: 'delete', callback: (value: T, oSet: this) => void): void;
    on(event: any, callback: any): void {
        switch (event) {
            case 'add':
                this._onAdd.add(callback);
                break;

            case 'delete':
                this._onDelete.add(callback);
                break;

            default:
                super.on(event, callback);
                break;
        }
    }

    once(event: 'set', callback: (newValue: ReadonlySet<T>, oldValue: ReadonlySet<T>, oSet: this) => void): void;
    once(event: 'beforeSet', callback: (newValue: ReadonlySet<T>, oldValue: ReadonlySet<T>, oSet: this) => ReadonlySet<T>): void;
    once(event: 'add', callback: (value: T, oSet: this) => void): void;
    once(event: 'delete', callback: (value: T, oSet: this) => void): void;
    once(event: any, callback: any): void {
        super.once(event, callback);
    }

    off(event: 'set', callback?: (newValue: ReadonlySet<T>, oldValue: ReadonlySet<T>, oSet: this) => void): void;
    off(event: 'beforeSet', callback?: (newValue: ReadonlySet<T>, oldValue: ReadonlySet<T>, oSet: this) => ReadonlySet<T>): void;
    off(event: 'add', callback?: (value: T, oSet: this) => void): void;
    off(event: 'delete', callback?: (value: T, oSet: this) => void): void;
    off(event: any, callback: any): void {
        switch (event) {
            case 'add':
                callback ? this._onAdd.delete(callback) : this._onAdd.clear();
                break;

            case 'delete':
                callback ? this._onDelete.delete(callback) : this._onDelete.clear();
                break;

            default:
                super.off(event, callback);
                break;
        }
    }

    // #endregion

    // #region Set 修改操作方法

    /**
     * 清除 Set 中所有元素，清除成功将触发 delete 事件
     */
    clear(): void {
        if (this._onDelete.size > 0) {
            for (const item of this._value) {
                (this._value as Set<T>).delete(item);
                for (const callback of this._onDelete) callback(item, this);
            }
        } else
            (this._value as Set<T>).clear();
    }

    /**
     * 从 Set 中删除元素，删除成功将触发 delete 事件
     */
    delete(value: T): boolean {
        if (this._onDelete.size > 0) {
            const result = (this._value as Set<T>).delete(value);
            if (result) for (const callback of this._onDelete) callback(value, this);
            return result;
        } else
            return (this._value as Set<T>).delete(value);
    }

    /**
     * 向 Set 的末尾添加一个元素，添加成功将触发 add 事件
     */
    add(value: T): this {
        if (this._onAdd.size > 0) {
            if (!this._value.has(value)) {
                (this._value as Set<T>).add(value);
                for (const callback of this._onAdd) callback(value, this);
            }
        } else
            (this._value as Set<T>).add(value);

        return this;
    }

    // #endregion

    // #region Set 读取操作方法

    /**
     * 返回一个包含 [value, value] 键值对的 Iterator 对象，返回的迭代器的迭代顺序与 Set 对象的插入顺序相同
     */
    entries(): IterableIterator<[T, T]> {
        return this._value.entries();
    }

    /**
     * 根据 Set 中元素的顺序，对每个元素都执行提供的回调函数一次
     */
    forEach<H>(callback: (this: H, value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: H): void {
        this._value.forEach(callback, thisArg);
    }

    /**
     * 返回一个布尔值来指示对应的值 value 是否存于 Set 中
     */
    has(value: T): boolean {
        return this._value.has(value);
    }

    /**
     * 行为与 values 方法完全一致，返回 Set 的元素迭代器
     */
    keys(): IterableIterator<T> {
        return this._value.keys();
    }

    /**
     * 返回一个元素迭代器，迭代顺序与 Set 对象的插入顺序相同
     */
    values(): IterableIterator<T> {
        return this._value.values();
    }

    /**
     * 返回一个元素迭代器，迭代顺序与 Set 对象的插入顺序相同
     */
    [Symbol.iterator](): IterableIterator<T> {
        return this._value[Symbol.iterator]();
    }

    // #endregion
}

export function oSet<T>(value?: ObservableSet<T> | ReadonlySet<T> | readonly T[], options?: ObservableVariableOptions): ObservableSet<T> {
    return new ObservableSet(value, options);
}