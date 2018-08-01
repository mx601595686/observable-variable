"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableVariable_1 = require("./ObservableVariable");
/**
 * 可观察改变集合
 */
class ObservableSet extends ObservableVariable_1.ObservableVariable {
    constructor(value) {
        super(value);
        //#endregion
        //#region 属性
        this._onAdd = new Set();
        this._onRemove = new Set();
        if (this !== value)
            if (Array.isArray(value))
                this._value = new Set(value);
    }
    static observe(value, path) {
        if (path === undefined) {
            return new ObservableSet(value);
        }
        else if ('string' === typeof path) {
            path = path.split('.');
        }
        for (let index = 0, end = path.length - 1; index < end; index++) {
            value = value[path[index]];
        }
        value[path[path.length - 1]] = new ObservableSet(value[path[path.length - 1]]);
    }
    /**
     * 集合元素个数
     */
    get size() {
        return this._value.size;
    }
    //#endregion
    //#region toJSON
    toJSON() {
        return this.serializable ? [...this._value] : undefined;
    }
    on(event, callback) {
        switch (event) {
            case 'add':
                this._onAdd.add(callback);
                break;
            case 'remove':
                this._onRemove.add(callback);
                break;
            default:
                super.on(event, callback);
                break;
        }
    }
    once(event, callback) {
        super.once(event, callback);
    }
    off(event, callback) {
        switch (event) {
            case 'add':
                callback ? this._onAdd.delete(callback) : this._onAdd.clear();
                break;
            case 'remove':
                callback ? this._onRemove.delete(callback) : this._onRemove.clear();
                break;
            default:
                super.off(event, callback);
                break;
        }
    }
    //#endregion
    //#region 集合修改操作方法
    /**
     * 用来清空一个 Set 对象中的所有元素。
     */
    clear() {
        if (this._onRemove.size > 0) {
            this._value.forEach(value => {
                this._value.delete(value);
                this._onRemove.forEach(callback => callback(value));
            });
        }
        else
            this._value.clear();
    }
    /**
     * 从一个 Set 对象中删除指定的元素。
     */
    delete(value) {
        if (this._onRemove.size > 0) {
            const result = this._value.delete(value);
            if (result)
                this._onRemove.forEach(callback => callback(value));
            return result;
        }
        else
            return this._value.delete(value);
    }
    /**
     * 用来向一个 Set 对象的末尾添加一个指定的值。
     */
    add(value) {
        if (this._onAdd.size > 0) {
            if (!this._value.has(value)) {
                this._value.add(value);
                this._onAdd.forEach(callback => callback(value));
            }
        }
        else
            this._value.add(value);
        return this;
    }
    //#endregion
    //#region 集合读取操作方法
    /**
     * 返回一个新的包含 [value, value] 对的 Iterator 对象，返回的迭代器的迭代顺序与 Set 对象的插入顺序相同。
     */
    entries() {
        return this._value.entries();
    }
    /**
     * 根据集合中元素的顺序，对每个元素都执行提供的 callback 函数一次。
     */
    forEach(callbackfn, thisArg) {
        this._value.forEach(callbackfn, thisArg);
    }
    /**
     * 返回一个布尔值来指示对应的值value是否存在Set对象中
     */
    has(value) {
        return this._value.has(value);
    }
    /**
     * 行为与 value 方法完全一致，返回 Set 对象的元素。
     */
    keys() {
        return this._value.keys();
    }
    /**
     * 返回一个 Iterator  对象，这个对象以插入Set 对象的顺序包含了原 Set 对象里的每个元素。
     */
    values() {
        return this._value.values();
    }
}
exports.ObservableSet = ObservableSet;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9ic2VydmFibGVEYXRhVHlwZS9PYnNlcnZhYmxlU2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQXlFO0FBRXpFOztHQUVHO0FBQ0gsbUJBQThCLFNBQVEsdUNBQTBCO0lBcUM1RCxZQUFZLEtBQXNDO1FBQzlDLEtBQUssQ0FBQyxLQUFZLENBQUMsQ0FBQztRQVJ4QixZQUFZO1FBRVosWUFBWTtRQUVGLFdBQU0sR0FBNEMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1RCxjQUFTLEdBQTRDLElBQUksR0FBRyxFQUFFLENBQUM7UUFLckUsSUFBSSxJQUFJLEtBQUssS0FBSztZQUNkLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQTNCRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQVUsRUFBRSxJQUFVO1FBQ2pDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLEVBQUU7WUFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7UUFFRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM3RCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzlCO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJ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b250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGVWYXJpYWJsZSwgT25TZXRDYWxsYmFjayB9IGZyb20gXCIuL09ic2VydmFibGVWYXJpYWJsZVwiO1xyXG5cclxuLyoqXHJcbiAqIOWPr+inguWvn+aUueWPmOmbhuWQiFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTZXQ8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlVmFyaWFibGU8U2V0PFQ+PiB7XHJcblxyXG4gICAgLy8jcmVnaW9uIOmdmeaAgeaWueazlVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG5LiA5Liq5pWw57uE6L2s5o2i5oiQ5Y+v6KeC5a+f6ZuG5ZCI77yM55u45b2T5LqOIG5ldyBPYnNlcnZhYmxlU2V0KHZhbHVlKVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb2JzZXJ2ZTxUPih2YWx1ZTogT2JzZXJ2YWJsZVNldDxUPiB8IFNldDxUPiB8IFRbXSk6IE9ic2VydmFibGVTZXQ8VD47XHJcbiAgICAvKipcclxuICAgICAqIOWwhuWvueixoeS4reaMh+WumuS9jee9rueahOS4gOS4quaVsOe7hOi9rOaNouaIkOWPr+inguWvn+mbhuWQiO+8jOi3r+W+hOmAmui/h2AuYOWIhuWJslxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb2JzZXJ2ZShvYmplY3Q6IG9iamVjdCwgcGF0aDogc3RyaW5nKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICog5bCG5a+56LGh5Lit5oyH5a6a5L2N572u55qE5LiA5Liq5pWw57uE6L2s5o2i5oiQ5Y+v6KeC5a+f6ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvYnNlcnZlKG9iamVjdDogb2JqZWN0LCBwYXRoOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICBzdGF0aWMgb2JzZXJ2ZSh2YWx1ZTogYW55LCBwYXRoPzogYW55KTogYW55IHtcclxuICAgICAgICBpZiAocGF0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVNldCh2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHBhdGgpIHtcclxuICAgICAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMCwgZW5kID0gcGF0aC5sZW5ndGggLSAxOyBpbmRleCA8IGVuZDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW3BhdGhbaW5kZXhdXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhbHVlW3BhdGhbcGF0aC5sZW5ndGggLSAxXV0gPSBuZXcgT2JzZXJ2YWJsZVNldCh2YWx1ZVtwYXRoW3BhdGgubGVuZ3RoIC0gMV1dKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24g5bGe5oCnXHJcblxyXG4gICAgcHJvdGVjdGVkIF9vbkFkZDogU2V0PE9uQWRkT3JSZW1vdmVTZXRFbGVtZW50Q2FsbGJhY2s8VD4+ID0gbmV3IFNldCgpO1xyXG4gICAgcHJvdGVjdGVkIF9vblJlbW92ZTogU2V0PE9uQWRkT3JSZW1vdmVTZXRFbGVtZW50Q2FsbGJhY2s8VD4+ID0gbmV3IFNldCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBPYnNlcnZhYmxlU2V0PFQ+IHwgU2V0PFQ+IHwgVFtdKSB7XHJcbiAgICAgICAgc3VwZXIodmFsdWUgYXMgYW55KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMgIT09IHZhbHVlKVxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ldyBTZXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZuG5ZCI5YWD57Sg5Liq5pWwXHJcbiAgICAgKi9cclxuICAgIGdldCBzaXplKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiB0b0pTT05cclxuXHJcbiAgICBwcm90ZWN0ZWQgdG9KU09OKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWFsaXphYmxlID8gWy4uLnRoaXMuX3ZhbHVlXSA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIOS6i+S7tue7keWumuaWueazlVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T6K6+572u5YC855qE5pe25YCZ6Kem5Y+RXHJcbiAgICAgKi9cclxuICAgIG9uKGV2ZW50OiAnc2V0JywgY2FsbGJhY2s6IE9uU2V0Q2FsbGJhY2s8U2V0PFQ+Pik6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WQkembhuWQiOS4rea3u+WKoOWFg+e0oOaXtuinpuWPkVxyXG4gICAgICovXHJcbiAgICBvbihldmVudDogJ2FkZCcsIGNhbGxiYWNrOiBPbkFkZE9yUmVtb3ZlU2V0RWxlbWVudENhbGxiYWNrPFQ+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5Yig6Zmk6ZuG5ZCI5Lit5YWD57Sg5pe26Kem5Y+RXHJcbiAgICAgKi9cclxuICAgIG9uKGV2ZW50OiAncmVtb3ZlJywgY2FsbGJhY2s6IE9uQWRkT3JSZW1vdmVTZXRFbGVtZW50Q2FsbGJhY2s8VD4pOiB2b2lkO1xyXG4gICAgb24oZXZlbnQ6IGFueSwgY2FsbGJhY2s6IGFueSk6IGFueSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudCkge1xyXG4gICAgICAgICAgICBjYXNlICdhZGQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25BZGQuYWRkKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uUmVtb3ZlLmFkZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzdXBlci5vbihldmVudCwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uY2UoZXZlbnQ6ICdzZXQnLCBjYWxsYmFjazogT25TZXRDYWxsYmFjazxTZXQ8VD4+KTogdm9pZDtcclxuICAgIG9uY2UoZXZlbnQ6ICdhZGQnLCBjYWxsYmFjazogT25BZGRPclJlbW92ZVNldEVsZW1lbnRDYWxsYmFjazxUPik6IHZvaWQ7XHJcbiAgICBvbmNlKGV2ZW50OiAncmVtb3ZlJywgY2FsbGJhY2s6IE9uQWRkT3JSZW1vdmVTZXRFbGVtZW50Q2FsbGJhY2s8VD4pOiB2b2lkO1xyXG4gICAgb25jZShldmVudDogYW55LCBjYWxsYmFjazogYW55KTogYW55IHtcclxuICAgICAgICBzdXBlci5vbmNlKGV2ZW50LCBjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgb2ZmKGV2ZW50OiAnc2V0JywgY2FsbGJhY2s/OiBPblNldENhbGxiYWNrPFNldDxUPj4pOiB2b2lkO1xyXG4gICAgb2ZmKGV2ZW50OiAnYWRkJywgY2FsbGJhY2s/OiBPbkFkZE9yUmVtb3ZlU2V0RWxlbWVudENhbGxiYWNrPFQ+KTogdm9pZDtcclxuICAgIG9mZihldmVudDogJ3JlbW92ZScsIGNhbGxiYWNrPzogT25BZGRPclJlbW92ZVNldEVsZW1lbnRDYWxsYmFjazxUPik6IHZvaWQ7XHJcbiAgICBvZmYoZXZlbnQ6IGFueSwgY2FsbGJhY2s6IGFueSk6IGFueSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudCkge1xyXG4gICAgICAgICAgICBjYXNlICdhZGQnOlxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPyB0aGlzLl9vbkFkZC5kZWxldGUoY2FsbGJhY2spIDogdGhpcy5fb25BZGQuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID8gdGhpcy5fb25SZW1vdmUuZGVsZXRlKGNhbGxiYWNrKSA6IHRoaXMuX29uUmVtb3ZlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzdXBlci5vZmYoZXZlbnQsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24g6ZuG5ZCI5L+u5pS55pON5L2c5pa55rOVXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjmnaXmuIXnqbrkuIDkuKogU2V0IOWvueixoeS4reeahOaJgOacieWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fb25SZW1vdmUuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZS5kZWxldGUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25SZW1vdmUuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayh2YWx1ZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7juS4gOS4qiBTZXQg5a+56LGh5Lit5Yig6Zmk5oyH5a6a55qE5YWD57Sg44CCXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZSh2YWx1ZTogVCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9vblJlbW92ZS5zaXplID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl92YWx1ZS5kZWxldGUodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB0aGlzLl9vblJlbW92ZS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHZhbHVlKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5kZWxldGUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55So5p2l5ZCR5LiA5LiqIFNldCDlr7nosaHnmoTmnKvlsL7mt7vliqDkuIDkuKrmjIflrprnmoTlgLzjgIJcclxuICAgICAqL1xyXG4gICAgYWRkKHZhbHVlOiBUKTogdGhpcyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQWRkLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmFsdWUuaGFzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUuYWRkKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uQWRkLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodmFsdWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZS5hZGQodmFsdWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24g6ZuG5ZCI6K+75Y+W5pON5L2c5pa55rOVXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57kuIDkuKrmlrDnmoTljIXlkKsgW3ZhbHVlLCB2YWx1ZV0g5a+555qEIEl0ZXJhdG9yIOWvueixoe+8jOi/lOWbnueahOi/reS7o+WZqOeahOi/reS7o+mhuuW6j+S4jiBTZXQg5a+56LGh55qE5o+S5YWl6aG65bqP55u45ZCM44CCXHJcbiAgICAgKi9cclxuICAgIGVudHJpZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLmVudHJpZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrumbhuWQiOS4reWFg+e0oOeahOmhuuW6j++8jOWvueavj+S4quWFg+e0oOmDveaJp+ihjOaPkOS+m+eahCBjYWxsYmFjayDlh73mlbDkuIDmrKHjgIJcclxuICAgICAqL1xyXG4gICAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFQsIHZhbHVlMjogVCwgc2V0OiBTZXQ8VD4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl92YWx1ZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LiA5Liq5biD5bCU5YC85p2l5oyH56S65a+55bqU55qE5YC8dmFsdWXmmK/lkKblrZjlnKhTZXTlr7nosaHkuK1cclxuICAgICAqL1xyXG4gICAgaGFzKHZhbHVlOiBUKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLmhhcyh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooYzkuLrkuI4gdmFsdWUg5pa55rOV5a6M5YWo5LiA6Ie077yM6L+U5ZueIFNldCDlr7nosaHnmoTlhYPntKDjgIJcclxuICAgICAqL1xyXG4gICAga2V5cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUua2V5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LiA5LiqIEl0ZXJhdG9yICDlr7nosaHvvIzov5nkuKrlr7nosaHku6Xmj5LlhaVTZXQg5a+56LGh55qE6aG65bqP5YyF5ZCr5LqG5Y6fIFNldCDlr7nosaHph4znmoTmr4/kuKrlhYPntKDjgIJcclxuICAgICAqL1xyXG4gICAgdmFsdWVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPbkFkZE9yUmVtb3ZlU2V0RWxlbWVudENhbGxiYWNrPFQ+IHsgKHZhbHVlOiBUKTogdm9pZCB9OyJdfQ==
