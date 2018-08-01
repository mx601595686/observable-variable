"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 可观察改变变量
 */
class ObservableVariable {
    constructor(value) {
        this._onSet = new Set();
        //#endregion
        //#region toJSON
        /**
         * 该变量是否允许toJSON，默认true
         */
        this.serializable = true;
        //确保不重复包裹变量
        if (value instanceof ObservableVariable) {
            /**
             * 如果造中使用了return，那么不管是父类还是子类的原型都将不会附加到该对象上
             * 构造函数也就退化成了普通方法
             * 子类构造中的this等于return的返回值
             */
            return value;
        }
        this._value = value;
    }
    static observe(value, path) {
        if (path === undefined) {
            return new ObservableVariable(value);
        }
        else if ('string' === typeof path) {
            path = path.split('.');
        }
        for (let index = 0, end = path.length - 1; index < end; index++) {
            value = value[path[index]];
        }
        value[path[path.length - 1]] = new ObservableVariable(value[path[path.length - 1]]);
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (this._onSet.size > 0) {
            const oldValue = this._value;
            this._value = v;
            this._onSet.forEach(callback => callback(v, oldValue));
        }
        else
            this._value = v;
    }
    toJSON() {
        return this.serializable ? this._value : undefined;
    }
    on(event, callback) {
        switch (event) {
            case 'set':
                this._onSet.add(callback);
                break;
        }
    }
    once(event, callback) {
        const tempCallback = (...args) => { this.off(event, tempCallback); callback(...args); };
        this.on(event, tempCallback);
    }
    off(event, callback) {
        switch (event) {
            case 'set':
                callback ? this._onSet.delete(callback) : this._onSet.clear();
                break;
        }
    }
}
exports.ObservableVariable = ObservableVariable;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9ic2VydmFibGVEYXRhVHlwZS9PYnNlcnZhYmxlVmFyaWFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNIO0lBcUNJLFlBQVksS0FBZ0M7UUFGbEMsV0FBTSxHQUEwQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBNkJwRCxZQUFZO1FBRVosZ0JBQWdCO1FBRWhCOztXQUVHO1FBQ0ksaUJBQVksR0FBWSxJQUFJLENBQUM7UUFqQ2hDLFdBQVc7UUFDWCxJQUFJLEtBQUssWUFBWSxrQkFBa0IsRUFBRTtZQUNyQzs7OztlQUlHO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBakNELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBVSxFQUFFLElBQVU7UUFDakMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxLQUFLLE9BQU8sSUFBSSxFQUFFO1lBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDN0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM5QjtRQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBdUJELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxLQUFLLENBQUMsQ0FBSTtRQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUN0QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzFEOztZQUNHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFXUyxNQUFNO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkQsQ0FBQztJQVVELEVBQUUsQ0FBQyxLQUFVLEVBQUUsUUFBYTtRQUN4QixRQUFRLEtBQUssRUFBRTtZQUNYLEtBQUssS0FBSztnQkFDTixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUIsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUdELElBQUksQ0FBQyxLQUFVLEVBQUUsUUFBYTtRQUMxQixNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9GLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFHRCxHQUFHLENBQUMsS0FBVSxFQUFFLFFBQWE7UUFDekIsUUFBUSxLQUFLLEVBQUU7WUFDWCxLQUFLLEtBQUs7Z0JBQ04sUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUQsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUdKO0FBN0dELGdEQTZHQyIsImZpbGUiOiJPYnNlcnZhYmxlRGF0YVR5cGUvT2JzZXJ2YWJsZVZhcmlhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWPr+inguWvn+aUueWPmOWPmOmHj1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVWYXJpYWJsZTxUPntcclxuXHJcbiAgICAvLyNyZWdpb24g6Z2Z5oCB5pa55rOVXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIbkuIDkuKrlj5jph4/ovazmjaLmiJDlj6/op4Llr5/lj5jph4/vvIznm7jlvZPkuo4gbmV3IE9ic2VydmFibGVWYXJpYWJsZSh2YWx1ZSlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9ic2VydmU8VD4odmFsdWU6IE9ic2VydmFibGVWYXJpYWJsZTxUPiB8IFQpOiBPYnNlcnZhYmxlVmFyaWFibGU8VD47XHJcbiAgICAvKipcclxuICAgICAqIOWwhuWvueixoeS4reaMh+WumuS9jee9rueahOS4gOS4quWPmOmHj+i9rOaNouaIkOWPr+inguWvn+WPmOmHj++8jOi3r+W+hOmAmui/h2AuYOWIhuWJslxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb2JzZXJ2ZShvYmplY3Q6IG9iamVjdCwgcGF0aDogc3RyaW5nKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICog5bCG5a+56LGh5Lit5oyH5a6a5L2N572u55qE5LiA5Liq5Y+Y6YeP6L2s5o2i5oiQ5Y+v6KeC5a+f5Y+Y6YePXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvYnNlcnZlKG9iamVjdDogb2JqZWN0LCBwYXRoOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICBzdGF0aWMgb2JzZXJ2ZSh2YWx1ZTogYW55LCBwYXRoPzogYW55KTogYW55IHtcclxuICAgICAgICBpZiAocGF0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVZhcmlhYmxlKHZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgcGF0aCkge1xyXG4gICAgICAgICAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwLCBlbmQgPSBwYXRoLmxlbmd0aCAtIDE7IGluZGV4IDwgZW5kOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbcGF0aFtpbmRleF1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFsdWVbcGF0aFtwYXRoLmxlbmd0aCAtIDFdXSA9IG5ldyBPYnNlcnZhYmxlVmFyaWFibGUodmFsdWVbcGF0aFtwYXRoLmxlbmd0aCAtIDFdXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIOWxnuaAp1xyXG5cclxuICAgIHByb3RlY3RlZCBfdmFsdWU6IFQ7ICAvL+S/neWtmOeahOWPmOmHj+WAvFxyXG4gICAgcHJvdGVjdGVkIF9vblNldDogU2V0PE9uU2V0Q2FsbGJhY2s8VD4+ID0gbmV3IFNldCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBPYnNlcnZhYmxlVmFyaWFibGU8VD4gfCBUKSB7XHJcbiAgICAgICAgLy/noa7kv53kuI3ph43lpI3ljIXoo7nlj5jph49cclxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlVmFyaWFibGUpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWmguaenOmAoOS4reS9v+eUqOS6hnJldHVybu+8jOmCo+S5iOS4jeeuoeaYr+eItuexu+i/mOaYr+WtkOexu+eahOWOn+Wei+mDveWwhuS4jeS8mumZhOWKoOWIsOivpeWvueixoeS4ilxyXG4gICAgICAgICAgICAgKiDmnoTpgKDlh73mlbDkuZ/lsLHpgIDljJbmiJDkuobmma7pgJrmlrnms5VcclxuICAgICAgICAgICAgICog5a2Q57G75p6E6YCg5Lit55qEdGhpc+etieS6jnJldHVybueahOi/lOWbnuWAvFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IFQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHY6IFQpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25TZXQuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2O1xyXG4gICAgICAgICAgICB0aGlzLl9vblNldC5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHYsIG9sZFZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdjtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor6Xlj5jph4/mmK/lkKblhYHorrh0b0pTT07vvIzpu5jorqR0cnVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXJpYWxpemFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHByb3RlY3RlZCB0b0pTT04oKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpYWxpemFibGUgPyB0aGlzLl92YWx1ZSA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24g5LqL5Lu257uR5a6a5pa55rOVXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPorr7nva7lgLznmoTml7blgJnop6blj5FcclxuICAgICAqL1xyXG4gICAgb24oZXZlbnQ6ICdzZXQnLCBjYWxsYmFjazogT25TZXRDYWxsYmFjazxUPik6IHZvaWQ7XHJcbiAgICBvbihldmVudDogYW55LCBjYWxsYmFjazogYW55KTogYW55IHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NldCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vblNldC5hZGQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uY2UoZXZlbnQ6ICdzZXQnLCBjYWxsYmFjazogT25TZXRDYWxsYmFjazxUPik6IHZvaWQ7XHJcbiAgICBvbmNlKGV2ZW50OiBhbnksIGNhbGxiYWNrOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHRlbXBDYWxsYmFjayA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyB0aGlzLm9mZihldmVudCwgdGVtcENhbGxiYWNrKTsgY2FsbGJhY2soLi4uYXJncyk7IH07XHJcbiAgICAgICAgdGhpcy5vbihldmVudCwgdGVtcENhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBvZmYoZXZlbnQ6ICdzZXQnLCBjYWxsYmFjaz86IE9uU2V0Q2FsbGJhY2s8VD4pOiB2b2lkO1xyXG4gICAgb2ZmKGV2ZW50OiBhbnksIGNhbGxiYWNrOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY2FzZSAnc2V0JzpcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID8gdGhpcy5fb25TZXQuZGVsZXRlKGNhbGxiYWNrKSA6IHRoaXMuX29uU2V0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT25TZXRDYWxsYmFjazxUPiB7IChuZXdWYWx1ZTogVCwgb2xkVmFsdWU6IFQpOiB2b2lkOyB9Il19
