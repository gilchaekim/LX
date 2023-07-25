import {
    apply, 
    mergeOptions, 
    parents, 
    toNode
} from '../util';

export default function (UICommon) {
    const DATA = UICommon.data;
    /**
     * 전달된 함수를 1회 실행
     * @param {function} plugin 전달된 함수를 1회 실행
     * @returns this
     */
    UICommon.use = function (plugin) {
        if (plugin.installed) return;
        plugin.call(null, this);
        plugin.installed = true;
        return this;
    }
        
    /**
     * 객체 형태의 컴포넌트를 Class 형태로 변환
     * @param {object} opts 컴포넌트 객체
     * @returns Class
     */
    UICommon.extend = function (opts) {
        const options = opts || {};
        const Super = this;
        const Sub = function G(options) {
            this._init(options)
        }
    
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);
    
        Sub.super = Super;
        Sub.extend = Super.extend;
        return Sub;
    }
    /**
     * event 발생 시 update 실행
     * @param {element} element 
     * @param {event} e 이벤트
     */
    UICommon.update = (element, e)=> {
        element = element ? toNode(element) : document.body;
        parents(element).reverse().forEach(element => update(element[DATA], e));
        apply(element, element => update(element[DATA], e));
    }
    Object.defineProperty(UICommon, 'container', {
    
        get() {
            return typeof container !== 'undefined' ? container : document.body;
        },
    
        set(element) {
            container = $(element);
        }
    
    });
}

function update(data, e) {
    if (!data) {
        return;
    }
    for (const name in data) {
        if (data[name]._connected) {
            data[name]._callUpdate(e);
        }
    }
}
