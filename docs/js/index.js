(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var objPrototype = Object.prototype;
  var hasOwnProperty = objPrototype.hasOwnProperty;

  /**
   * 객체에 key 속성이 존재하는가
   * @param {object} obj 객체
   * @param {string} key 속성 명
   * @returns Boolean
   */
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  var hyphenateRe = /\B([A-Z])/g;

  /**
   * 카멜케이스 구분을 하이픈 구분으로 변경
   * @from    'abcdAbcdAbcd' 
   * @to      'abcd-abcd-abcd'
   */
  var hyphenate = memoize(function (str) {
    return str.replace(hyphenateRe, '-$1').toLowerCase();
  });
  var camelizeRe = /-(\w)/g;

  /**
   * 하이픈케이스 구분을 카멜케이스 구분으로 변경
   * @from    'abcd-abcd-abcd' 
   * @to      'abcdAbcdAbcd'
   */
  var camelize = memoize(function (str) {
    return str.replace(camelizeRe, toUpper);
  });

  /**
   * 첫 글자를 대문자로 치환
   * @from    'aaaa' 
   * @to      'Aaaa'
   */
  var ucfirst = memoize(function (str) {
    return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
  });
  function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
  }
  var strPrototype = String.prototype;
  var startsWithFn = strPrototype.startsWith || function (search) {
    return this.lastIndexOf(search, 0) === 0;
  };

  /**
   * str 의 첫번째 내열된 문자열이 search인가
   * @param {string} str 검색할 문자열
   * @param {string} search 찾을 문자열
   * @returns Boolean
   */
  function startsWith(str, search) {
    return startsWithFn.call(str, search);
  }
  var endsWithFn = strPrototype.endsWith || function (search) {
    return this.substr(-search.length) === search;
  };

  /**
   * str 의 마지막 내열된 문자열이 search인가
   * @param {string} str 검색할 문자열
   * @param {string} search 찾을 문자열
   * @returns Boolean
   */
  function endsWith(str, search) {
    return endsWithFn.call(str, search);
  }
  var arrPrototype = Array.prototype;
  var includesFn = function includesFn(search, i) {
    return !!~this.indexOf(search, i);
  };
  var includesStr = strPrototype.includes || includesFn;
  var includesArray = arrPrototype.includes || includesFn;

  /**
   * obj안에 search가 존재하는가
   * @param {array} obj 검색할 배열
   * @param {*} search 찾을 요소
   * @returns Boolean
   */
  function includes(obj, search) {
    return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
  }
  var findIndexFn = arrPrototype.findIndex || function (predicate) {
    for (var i = 0; i < this.length; i++) {
      if (predicate.call(arguments[1], this[i], i, this)) {
        return i;
      }
    }
    return -1;
  };

  /**
   * predicate 식에 만족하는 index를 반환, 만족하는 결과가 없으면 -1을 반환함
   * @param {array} array 검색할 배열
   * @param {function} predicate 판별할 함수
   * @returns index
   */
  function findIndex(array, predicate) {
    return findIndexFn.call(array, predicate);
  }
  var isArray = Array.isArray;
  function isFunction(obj) {
    return typeof obj === 'function';
  }
  function isObject(obj) {
    return obj !== null && _typeof(obj) === 'object';
  }
  var toString = objPrototype.toString;
  function isPlainObject(obj) {
    return toString.call(obj) === '[object Object]';
  }
  function isWindow(obj) {
    return isObject(obj) && obj === obj.window;
  }
  function isDocument(obj) {
    return nodeType(obj) === 9;
  }
  function isNode(obj) {
    return nodeType(obj) >= 1;
  }
  function isElement(obj) {
    return nodeType(obj) === 1;
  }
  function nodeType(obj) {
    return !isWindow(obj) && isObject(obj) && obj.nodeType;
  }
  function isBoolean(value) {
    return typeof value === 'boolean';
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function isNumber(value) {
    return typeof value === 'number';
  }
  function isNumeric(value) {
    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
  }
  function typeOf(obj) {
    return toString.call(obj).slice(8, -1).toLowerCase();
  }
  function isDate(value) {
    return typeOf(value) === 'date' && !isNaN(value.getTime());
  }
  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
  function getDaysInMonth(year, month) {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }

  /**
   * Add leading zeroes to the given value
   * @param {number} value - The value to add.
   * @param {number} [length=1] - The expected value length.
   * @returns {string} Returns converted value.
   */
  function addLeadingZero(value) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var str = String(Math.abs(value));
    var i = str.length;
    var result = '';
    if (value < 0) {
      result += '-';
    }
    while (i < length) {
      i += 1;
      result += '0';
    }
    return result + str;
  }
  function isEmpty$1(obj) {
    return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
  }
  function isUndefined(value) {
    return value === void 0;
  }
  function toBoolean(value) {
    return isBoolean(value) ? value : value === 'true' || value === '1' || value === '' ? true : value === 'false' || value === '0' ? false : value;
  }
  function toNumber(value) {
    var number = Number(value);
    return !isNaN(number) ? number : false;
  }
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  var toArray = Array.from || function (value) {
    return arrPrototype.slice.call(value);
  };
  function toNode(element) {
    return toNodes(element)[0];
  }
  function toNodes(element) {
    return element && (isNode(element) ? [element] : toArray(element).filter(isNode)) || [];
  }
  function toWindow(element) {
    if (isWindow(element)) {
      return element;
    }
    element = toNode(element);
    return element ? (isDocument(element) ? element : element.ownerDocument).defaultView : window;
  }
  function toMs(time) {
    return !time ? 0 : endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000;
  }
  function isEqual(value, other) {
    return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, function (val, key) {
      return val === other[key];
    });
  }

  /**
   * 
   * @param {*} value 
   * @param {*} a 
   * @param {*} b 
   * @returns 
   */

  function swap(value, a, b) {
    return value.replace(new RegExp("".concat(a, "|").concat(b), 'g'), function (match) {
      return match === a ? b : a;
    });
  }
  var assign = Object.assign || function (target) {
    target = Object(target);
    for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
      var source = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
      if (source !== null) {
        for (var key in source) {
          if (hasOwn(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
  function last(array) {
    return array[array.length - 1];
  }
  function each(obj, cb) {
    for (var key in obj) {
      if (false === cb(obj[key], key)) {
        return false;
      }
    }
    return true;
  }
  function sortBy(array, prop) {
    return array.slice().sort(function (_ref, _ref2) {
      var _ref$prop = _ref[prop],
        propA = _ref$prop === void 0 ? 0 : _ref$prop;
      var _ref2$prop = _ref2[prop],
        propB = _ref2$prop === void 0 ? 0 : _ref2$prop;
      return propA > propB ? 1 : propB > propA ? -1 : 0;
    });
  }
  function sumBy(array, iteratee) {
    return array.reduce(function (sum, item) {
      return sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]);
    }, 0);
  }
  function uniqueBy(array, prop) {
    var seen = new Set();
    return array.filter(function (_ref3) {
      var check = _ref3[prop];
      return seen.has(check) ? false : seen.add(check) || true;
    } // IE 11 does not return the Set object
    );
  }

  function clamp(number) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.min(Math.max(toNumber(number) || 0, min), max);
  }
  function noop() {}
  function intersectRect() {
    for (var _len = arguments.length, rects = new Array(_len), _key = 0; _key < _len; _key++) {
      rects[_key] = arguments[_key];
    }
    return [['bottom', 'top'], ['right', 'left']].every(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        minProp = _ref5[0],
        maxProp = _ref5[1];
      return Math.min.apply(Math, _toConsumableArray(rects.map(function (_ref6) {
        var min = _ref6[minProp];
        return min;
      }))) - Math.max.apply(Math, _toConsumableArray(rects.map(function (_ref7) {
        var max = _ref7[maxProp];
        return max;
      }))) > 0;
    });
  }
  function pointInRect(point, rect) {
    return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
  }
  var Dimensions = {
    ratio: function ratio(dimensions, prop, value) {
      var _ref8;
      var aProp = prop === 'width' ? 'height' : 'width';
      return _ref8 = {}, _defineProperty(_ref8, aProp, dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp]), _defineProperty(_ref8, prop, value), _ref8;
    },
    contain: function contain(dimensions, maxDimensions) {
      var _this = this;
      dimensions = assign({}, dimensions);
      each(dimensions, function (_, prop) {
        return dimensions = dimensions[prop] > maxDimensions[prop] ? _this.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      });
      return dimensions;
    },
    cover: function cover(dimensions, maxDimensions) {
      var _this2 = this;
      dimensions = this.contain(dimensions, maxDimensions);
      each(dimensions, function (_, prop) {
        return dimensions = dimensions[prop] < maxDimensions[prop] ? _this2.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      });
      return dimensions;
    }
  };
  function getIndex(i, elements) {
    var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var finite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    elements = toNodes(elements);
    var _elements = elements,
      length = _elements.length;
    i = isNumeric(i) ? toNumber(i) : i === 'next' ? current + 1 : i === 'previous' ? current - 1 : elements.indexOf(toNode(i));
    if (finite) {
      return clamp(i, 0, length - 1);
    }
    i %= length;
    return i < 0 ? i + length : i;
  }
  function memoize(fn) {
    var cache = Object.create(null);
    return function (key) {
      return cache[key] || (cache[key] = fn(key));
    };
  }

  function attr(element, name, value) {
    if (isObject(name)) {
      for (var key in name) {
        attr(element, key, name[key]);
      }
      return;
    }
    if (isUndefined(value)) {
      element = toNode(element);
      return element && element.getAttribute(name);
    } else {
      toNodes(element).forEach(function (element) {
        if (isFunction(value)) {
          value = value.call(element, attr(element, name));
        }
        if (value === null) {
          removeAttr(element, name);
        } else {
          element.setAttribute(name, value);
        }
      });
    }
  }
  function hasAttr(element, name) {
    return toNodes(element).some(function (element) {
      return element.hasAttribute(name);
    });
  }
  function removeAttr(element, name) {
    element = toNodes(element);
    name.split(' ').forEach(function (name) {
      return element.forEach(function (element) {
        return element.hasAttribute(name) && element.removeAttribute(name);
      });
    });
  }
  function data(element, attribute) {
    for (var i = 0, attrs = [attribute, "data-".concat(attribute)]; i < attrs.length; i++) {
      if (hasAttr(element, attrs[i])) {
        return attr(element, attrs[i]);
      }
    }
  }

  /**
   * 엘리먼트에 클래스 추가
   * @param {Object} element 
   * @param  {...any} args 추가 할 클래스 리스트
   */
  function addClass(element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    apply$1(element, args, 'add');
  }

  /**
   * 엘리먼트에 클래스 제거
   * @param {Object} element 
   * @param  {...any} args 삭제 할 클래스 리스트
   */
  function removeClass(element) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    apply$1(element, args, 'remove');
  }

  //확인 필요12231
  function removeClasses(element, cls) {
    attr(element, 'class', function (value) {
      return (value || '').replace(new RegExp("\\b".concat(cls, "\\b"), 'g'), '');
    });
  }

  /**
   * 클래스 치환
   * @param {Object} element 
   * @param  {...any} args ["삭제 할 클래스네임", "추가 할 클래스 네임"]
   */
  function replaceClass(element) {
    (arguments.length <= 1 ? undefined : arguments[1]) && removeClass(element, arguments.length <= 1 ? undefined : arguments[1]);
    (arguments.length <= 2 ? undefined : arguments[2]) && addClass(element, arguments.length <= 2 ? undefined : arguments[2]);
  }

  /**
   * 클래스가 존재하는지 확인
   * @param {Object} element 
   * @param {"string"} cls 확인 할 클래스네임
   * @returns Boolean
   */
  function hasClass(element, cls) {
    return cls && toNodes(element).some(function (element) {
      return element.classList.contains(cls.split(' ')[0]);
    });
  }

  /**
   * 클래스 토글
   * @param {Array} element 
   * @param  {...any} args  
   */
  function toggleClass(element) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    if (!args.length) {
      return;
    }
    args = getArgs$1(args);
    var force = !isString(last(args)) ? args.pop() : []; // in iOS 9.3 force === undefined evaluates to false

    args = args.filter(Boolean);
    toNodes(element).forEach(function (_ref) {
      var classList = _ref.classList;
      for (var i = 0; i < args.length; i++) {
        supports.Force ? classList.toggle.apply(classList, _toConsumableArray([args[i]].concat(force))) : classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]);
      }
    });
  }
  function test() {
    var aa = {
      bb: 1,
      cc: 2
    };
    console.log(hasOwn(aa, 'dd'));
    // console.log(getArgs(['aab', 'ddddd dsf dsf22', 'ddddd dfffd', 'ddddddfffd']))
  }

  function apply$1(element, args, fn) {
    var args = getArgs$1(args).filter(Boolean); // Array.prototype.filter(), 배열을 검색해서 boolean으로 평가 후 false로 평가되는 값을 제거한다.
    args.length && toNodes(element).forEach(function (_ref2) {
      var classList = _ref2.classList;
      supports.Multiple ? classList[fn].apply(classList, _toConsumableArray(args)) : args.forEach(function (cls) {
        return classList[fn](cls);
      });
    });
  }
  function getArgs$1(args) {
    return args.reduce(function (args, arg) {
      return (
        /**
         * concat을 콜하여 문자열이고 문자열 사이에 공백이 있는지 체크하여 공백이 있으면 공백을 기준으로 배열로 나눠서 합치고.
         * 공백이 없다면 그냥 합쳐서 반환한다.
         * 또한 concat에 잘못된 값이 전달되어 에러가 발생할 경우 (args.concat.call(args)로 하면 뒤의 값을 반환한다.) 빈 배열을 반환한다.
         */
        args.concat.call(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg)
      );
    }, []);
  }

  // IE 11
  var supports = {
    get Multiple1111() {
      return this;
    },
    get Force() {
      return this.get('_force');
    },
    get: function get(key) {
      if (!hasOwn(this, key)) {
        var _document$createEleme = document.createElement('_'),
          classList = _document$createEleme.classList;
        classList.add('a', 'b');
        classList.toggle('c', false);
        this._multiple = classList.contains('b');
        this._force = !classList.contains('c');
      }
      return this[key];
    }
  };

  var inBrowser$1 = typeof window !== 'undefined';
  inBrowser$1 && /msie|trident/i.test(window.navigator.userAgent);
  inBrowser$1 && attr(document.documentElement, 'dir') === 'rtl';
  navigator && /android/i.test(navigator.userAgent);
  var hasTouchEvents$1 = inBrowser$1 && 'ontouchstart' in window;
  inBrowser$1 && (hasTouchEvents$1 || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints); // IE >=11

  var Promise$1 = inBrowser$1 && window.Promise || PromiseFn;
  var Deferred = /*#__PURE__*/_createClass(function Deferred() {
    var _this = this;
    _classCallCheck(this, Deferred);
    this.promise = new Promise$1(function (resolve, reject) {
      _this.reject = reject;
      _this.resolve = resolve;
    });
  });

  /**
   * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
   */

  //  var Promise = window.Promise || PromiseFn;
  var RESOLVED = 0;
  var REJECTED = 1;
  var PENDING = 2;
  var async = inBrowser$1 && window.setImmediate || setTimeout;
  function PromiseFn(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];
    var promise = this;
    try {
      executor(function (x) {
        promise.resolve(x);
      }, function (r) {
        promise.reject(r);
      });
    } catch (e) {
      promise.reject(e);
    }
  }
  PromiseFn.reject = function (r) {
    return new PromiseFn(function (resolve, reject) {
      reject(r);
    });
  };
  PromiseFn.resolve = function (x) {
    return new PromiseFn(function (resolve, reject) {
      resolve(x);
    });
  };
  PromiseFn.all = function all(iterable) {
    return new PromiseFn(function (resolve, reject) {
      var result = [];
      var count = 0;
      if (iterable.length === 0) {
        resolve(result);
      }
      function resolver(i) {
        return function (x) {
          result[i] = x;
          count += 1;
          if (count === iterable.length) {
            resolve(result);
          }
        };
      }
      for (var i = 0; i < iterable.length; i += 1) {
        PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
      }
    });
  };
  PromiseFn.race = function race(iterable) {
    return new PromiseFn(function (resolve, reject) {
      for (var i = 0; i < iterable.length; i += 1) {
        PromiseFn.resolve(iterable[i]).then(resolve, reject);
      }
    });
  };
  var p = PromiseFn.prototype;
  p.resolve = function resolve(x) {
    var promise = this;
    if (promise.state === PENDING) {
      if (x === promise) {
        throw new TypeError('Promise settled with itself.');
      }
      var called = false;
      try {
        var then = x && x.then;
        if (x !== null && isObject(x) && isFunction(then)) {
          then.call(x, function (x) {
            if (!called) {
              promise.resolve(x);
            }
            called = true;
          }, function (r) {
            if (!called) {
              promise.reject(r);
            }
            called = true;
          });
          return;
        }
      } catch (e) {
        if (!called) {
          promise.reject(e);
        }
        return;
      }
      promise.state = RESOLVED;
      promise.value = x;
      promise.notify();
    }
  };
  p.reject = function reject(reason) {
    var promise = this;
    if (promise.state === PENDING) {
      if (reason === promise) {
        throw new TypeError('Promise settled with itself.');
      }
      promise.state = REJECTED;
      promise.value = reason;
      promise.notify();
    }
  };
  p.notify = function notify() {
    var _this2 = this;
    async(function () {
      if (_this2.state !== PENDING) {
        while (_this2.deferred.length) {
          var _this2$deferred$shift = _this2.deferred.shift(),
            _this2$deferred$shift2 = _slicedToArray(_this2$deferred$shift, 4),
            onResolved = _this2$deferred$shift2[0],
            onRejected = _this2$deferred$shift2[1],
            resolve = _this2$deferred$shift2[2],
            reject = _this2$deferred$shift2[3];
          try {
            if (_this2.state === RESOLVED) {
              if (isFunction(onResolved)) {
                resolve(onResolved.call(undefined, _this2.value));
              } else {
                resolve(_this2.value);
              }
            } else if (_this2.state === REJECTED) {
              if (isFunction(onRejected)) {
                resolve(onRejected.call(undefined, _this2.value));
              } else {
                reject(_this2.value);
              }
            }
          } catch (e) {
            reject(e);
          }
        }
      }
    });
  };
  p.then = function then(onResolved, onRejected) {
    var _this3 = this;
    return new PromiseFn(function (resolve, reject) {
      _this3.deferred.push([onResolved, onRejected, resolve, reject]);
      _this3.notify();
    });
  };
  p["catch"] = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  /* global DocumentTouch */
  var inBrowser = typeof window !== 'undefined';
  var isIE = inBrowser && /msie|trident/i.test(window.navigator.userAgent);
  var isRtl = inBrowser && attr(document.documentElement, 'dir') === 'rtl';
  var isAndroid = navigator && /android/i.test(navigator.userAgent);
  var hasTouchEvents = inBrowser && 'ontouchstart' in window;
  var hasPointerEvents = inBrowser && window.PointerEvent;
  var hasTouch = inBrowser && (hasTouchEvents || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints); // IE >=11

  var pointerDown = hasPointerEvents ? 'pointerdown' : hasTouchEvents ? 'touchstart' : 'mousedown';
  var pointerMove = hasPointerEvents ? 'pointermove' : hasTouchEvents ? 'touchmove' : 'mousemove';
  var pointerUp = hasPointerEvents ? 'pointerup' : hasTouchEvents ? 'touchend' : 'mouseup';
  var pointerEnter = hasPointerEvents ? 'pointerenter' : hasTouchEvents ? '' : 'mouseenter';
  var pointerLeave = hasPointerEvents ? 'pointerleave' : hasTouchEvents ? '' : 'mouseleave';
  var pointerCancel = hasPointerEvents ? 'pointercancel' : 'touchcancel';

  var voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
  };

  /**
   * 요소가 다음에 해당되는 태그인지 확인 [area, base, br, col, embed, hr, img, input, keygen, link, menuitem, meta, param, source, track, wbr]
   * @param {element} element 
   * @returns Boolean
   */
  function isVoidElement(element) {
    return toNodes(element).some(function (element) {
      return voidElements[element.tagName.toLowerCase()];
    });
  }

  /**
   * 요소가 화면에  dislplay상태인지 확인
   * @param {element} element 
   * @returns Boolean
   */
  function isVisible(element) {
    return toNodes(element).some(function (element) {
      return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
    });
  }
  var selInput = 'input,select,textarea,button';

  /**
   * 요소가 form [input,select,textarea,button] 중 하나인가
   * @param {element} element 
   * @returns Boolean
   */
  function isInput(element) {
    return toNodes(element).some(function (element) {
      return matches(element, selInput);
    });
  }
  var selFocusable = "".concat(selInput, ",a[href],[tabindex]");

  /**
   * 포커싱이 가능한 요소인가
   * @param {element} element 
   * @returns boolean
   */
  function isFocusable(element) {
    return matches(element, selFocusable);
  }

  /**
   * 부모요소 선택
   * @param {element} element 
   * @returns element의 부모 요소
   */
  function parent(element) {
    element = toNode(element);
    return element && isElement(element.parentNode) && element.parentNode;
  }
  function filter(element, selector) {
    return toNodes(element).filter(function (element) {
      return matches(element, selector);
    });
  }
  var elProto = inBrowser ? Element.prototype : {};
  var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || noop;

  /**
   * element가 selector의 셀렉터로 css에서 선언되었는가
   * @param {element} element 
   * @param {string} selector css 셀렉터 문자열
   * @returns Boolean
   */
  function matches(element, selector) {
    return toNodes(element).some(function (element) {
      return matchesFn.call(element, selector);
    });
  }
  elProto.closest || function (selector) {
    var ancestor = this;
    do {
      if (matches(ancestor, selector)) {
        return ancestor;
      }
    } while (ancestor = parent(ancestor));
  };

  /**
   * element의 상위 요소 중 selector와 일치되는 엘리먼트 반환
   * @param {element} element 
   * @param {string} selector 검색할 셀렉터 문자열
   * @returns element
   */
  function closest(element, selector) {
    return isElement(element) ? element.closest(startsWith(selector, '>') ? selector.slice(1) : selector) : toNodes(element).map(function (element) {
      return closest(element, selector);
    }).filter(Boolean);
  }
  function within(element, selector) {
    return isString(selector) ? !!closest(element, selector) : toNode(selector).contains(toNode(element));
  }

  /**
   * element의 부모 요소들 중 selector와 매칭되는 요소들 전부 선택
   * @param {element} element 
   * @param {string} selector 셀렉터 문자열
   * @returns 매칭되는 엘리먼드 배열
   */
  function parents(element, selector) {
    var elements = [];
    while (element = parent(element)) {
      if (!selector || matches(element, selector)) {
        elements.push(element);
      }
    }
    return elements;
  }

  /**
   * element의 자식요소 중 selector와 매칭되는 엘리먼트를 반환
   * @param {element} element 
   * @param {string} selector 검색할 셀렉터 문자열
   * @returns selector와 매칭되는 엘리먼트
   */
  function children(element, selector) {
    element = toNode(element);
    var children = element ? toNodes(element.children) : [];
    return selector ? filter(children, selector) : children;
  }
  /**
   * array 중 몇번째에 element가 속해있는가
   * @param {array} element node lists
   * @param {element} ref 찾을 엘리먼트
   * @returns index
   */
  function index(element, ref) {
    return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
  }

  function query(selector, context) {
    return find(selector, getContext(selector, context));
  }
  function queryAll(selector, context) {
    return findAll(selector, getContext(selector, context));
  }
  function getContext(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return isString(selector) && isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
  }
  function find(selector, context) {
    return toNode(_query(selector, context, 'querySelector'));
  }
  function findAll(selector, context) {
    return toNodes(_query(selector, context, 'querySelectorAll'));
  }
  function _query(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var queryFn = arguments.length > 2 ? arguments[2] : undefined;
    if (!selector || !isString(selector)) {
      return selector;
    }
    selector = selector.replace(contextSanitizeRe, '$1 *');
    if (isContextSelector(selector)) {
      selector = splitSelector(selector).map(function (selector) {
        var ctx = context;
        if (selector[0] === '!') {
          var selectors = selector.substr(1).trim().split(' ');
          ctx = closest(parent(context), selectors[0]);
          selector = selectors.slice(1).join(' ').trim();
        }
        if (selector[0] === '-') {
          var _selectors = selector.substr(1).trim().split(' ');
          var prev = (ctx || context).previousElementSibling;
          ctx = matches(prev, selector.substr(1)) ? prev : null;
          selector = _selectors.slice(1).join(' ');
        }
        if (!ctx) {
          return null;
        }
        return "".concat(domPath(ctx), " ").concat(selector);
      }).filter(Boolean).join(',');
      context = document;
    }
    try {
      return context[queryFn](selector);
    } catch (e) {
      return null;
    }
  }
  var contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
  var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
  var isContextSelector = memoize(function (selector) {
    return selector.match(contextSelectorRe);
  });
  var selectorRe = /.*?[^\\](?:,|$)/g;
  var splitSelector = memoize(function (selector) {
    return selector.match(selectorRe).map(function (selector) {
      return selector.replace(/,$/, '').trim();
    });
  });
  function domPath(element) {
    var names = [];
    while (element.parentNode) {
      if (element.id) {
        names.unshift("#".concat(escape(element.id)));
        break;
      } else {
        var _element = element,
          tagName = _element.tagName;
        if (tagName !== 'HTML') {
          tagName += ":nth-child(".concat(index(element) + 1, ")");
        }
        names.unshift(tagName);
        element = element.parentNode;
      }
    }
    return names.join(' > ');
  }
  var escapeFn = inBrowser && window.CSS && CSS.escape || function (css) {
    return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) {
      return "\\".concat(match);
    });
  };
  function escape(css) {
    return isString(css) ? escapeFn.call(null, css) : '';
  }

  function on() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // console.log(args);
    var _getArgs = getArgs(args),
      _getArgs2 = _slicedToArray(_getArgs, 5),
      targets = _getArgs2[0],
      type = _getArgs2[1],
      selector = _getArgs2[2],
      listener = _getArgs2[3],
      useCapture = _getArgs2[4];
    targets = toEventTargets(targets);
    if (listener.length > 1) {
      listener = detail(listener);
    }
    if (useCapture && useCapture.self) {
      listener = selfFilter(listener);
    }
    if (selector) {
      listener = delegate(selector, listener);
    }
    // console.log(...args)

    useCapture = useCaptureFilter(useCapture);
    type.split(' ').forEach(function (type) {
      return targets.forEach(function (target) {
        return target.addEventListener(type, listener, useCapture);
      });
    });
    return function () {
      return off(targets, type, listener, useCapture);
    };
  }
  function off(targets, type, listener) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    useCapture = useCaptureFilter(useCapture);
    targets = toEventTargets(targets);
    type.split(' ').forEach(function (type) {
      return targets.forEach(function (target) {
        return target.removeEventListener(type, listener, useCapture);
      });
    });
  }
  function once() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var _getArgs3 = getArgs(args),
      _getArgs4 = _slicedToArray(_getArgs3, 6),
      element = _getArgs4[0],
      type = _getArgs4[1],
      selector = _getArgs4[2],
      listener = _getArgs4[3],
      useCapture = _getArgs4[4],
      condition = _getArgs4[5];
    var off = on(element, type, selector, function (e) {
      var result = !condition || condition(e);
      if (result) {
        off();
        listener(e, result);
      }
    }, useCapture);
    return off;
  }
  function trigger(targets, event, detail) {
    return toEventTargets(targets).reduce(function (notCanceled, target) {
      return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail));
    }, true);
  }
  function createEvent(e) {
    var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var detail = arguments.length > 3 ? arguments[3] : undefined;
    if (isString(e)) {
      var event = document.createEvent('CustomEvent'); // IE 11
      event.initCustomEvent(e, bubbles, cancelable, detail);
      e = event;
    }
    return e;
  }
  function getArgs(args) {
    if (isFunction(args[2])) {
      args.splice(2, 0, false);
    }
    return args;
  }
  function delegate(selector, listener) {
    var _this = this;
    return function (e) {
      var current = selector[0] === '>' ? findAll(selector, e.currentTarget).reverse().filter(function (element) {
        return within(e.target, element);
      })[0] : closest(e.target, selector);
      if (current) {
        e.current = current;
        listener.call(_this, e);
      }
    };
  }
  function detail(listener) {
    return function (e) {
      return isArray(e.detail) ? listener.apply(void 0, [e].concat(_toConsumableArray(e.detail))) : listener(e);
    };
  }
  function selfFilter(listener) {
    return function (e) {
      if (e.target === e.currentTarget || e.target === e.current) {
        return listener.call(null, e);
      }
    };
  }
  function useCaptureFilter(options) {
    return options && isIE && !isBoolean(options) ? !!options.capture : options;
  }
  function isEventTarget(target) {
    return target && 'addEventListener' in target;
  }
  function toEventTarget(target) {
    return isEventTarget(target) ? target : toNode(target);
  }
  function toEventTargets(target) {
    return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
  }
  function isTouch(e) {
    return e.pointerType === 'touch' || !!e.touches;
  }
  function getEventPos(e) {
    var touches = e.touches,
      changedTouches = e.changedTouches;
    var _ref = touches && touches[0] || changedTouches && changedTouches[0] || e,
      x = _ref.clientX,
      y = _ref.clientY;
    return {
      x: x,
      y: y
    };
  }

  /**
   * readyState 이후 실행
   * @param {function} fn readyState 이후 실행할 함수 내용
   */
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
      return;
    }
    var unbind = on(document, 'DOMContentLoaded', function () {
      unbind();
      fn();
    });
  }
  function isTag(element, tagName) {
    var _element$tagName;
    return (element === null || element === void 0 ? void 0 : (_element$tagName = element.tagName) === null || _element$tagName === void 0 ? void 0 : _element$tagName.toLowerCase()) === tagName.toLowerCase();
  }

  /**
   * element 자식노드의 내용을 모두 비움
   * @param {element} element 
   * @returns element
   */
  function empty(element) {
    element = $$1(element);
    element.innerHTML = '';
    return element;
  }
  function html(parent, html) {
    parent = $$1(parent);
    return isUndefined(html) ? parent.innerHTML : append(parent.hasChildNodes() ? empty(parent) : parent, html);
  }

  /**
   * parent 자식 첫번째로 element 를 추가
   * @param {element} parent 타겟 엘리먼트
   * @param {element} element 추가 할 엘리먼드
   * @returns 추가된 엘리먼트
   */
  function prepend(parent, element) {
    parent = $$1(parent);
    if (!parent.hasChildNodes()) {
      return append(parent, element);
    } else {
      return insertNodes(element, function (element) {
        return parent.insertBefore(element, parent.firstChild);
      });
    }
  }

  /**
   * parent 자식 마지막으로 element 를 추가
   * @param {element} parent 타겟 엘리먼트
   * @param {element} element 추가 할 엘리먼드
   * @returns 추가된 엘리먼트
   */
  function append(parent, element) {
    parent = $$1(parent);
    return insertNodes(element, function (element) {
      return parent.appendChild(element);
    });
  }

  /**
   * ref의 이전 노드에 element를 추가
   * @param {element} ref 타겟 요소
   * @param {element} element 추가 할 엘리면트
   * @returns 추가된 엘리먼트
   */
  function before(ref, element) {
    ref = $$1(ref);
    return insertNodes(element, function (element) {
      return ref.parentNode.insertBefore(element, ref);
    });
  }

  /**
   * ref의 다음 노드에 element를 추가
   * @param {element} ref 타겟 요소
   * @param {element} element 추가 할 엘리면트
   * @returns 추가된 엘리먼트
   */
  function after(ref, element) {
    ref = $$1(ref);
    return insertNodes(element, function (element) {
      return ref.nextSibling ? before(ref.nextSibling, element) : append(ref.parentNode, element);
    });
  }
  function insertNodes(element, fn) {
    element = isString(element) ? fragment(element) : element;
    return element ? 'length' in element ? toNodes(element).map(fn) : fn(element) : null;
  }

  /**
   * element를 삭제
   * @param {element} element 
   */
  function remove$1(element) {
    toNodes(element).forEach(function (element) {
      return element.parentNode && element.parentNode.removeChild(element);
    });
  }

  /**
   * element를 structure로 랩핑
   * @param {element} element 
   * @param {string} structure  랩핑할 엘리먼트 문자열 ex) `<div>`
   * @returns structure element
   */
  function wrapAll(element, structure) {
    structure = toNode(before(element, structure));
    while (structure.firstChild) {
      structure = structure.firstChild;
    }
    append(structure, element);
    return structure;
  }

  /**
   * element하위요소 전부를 structure로 랩핑
   * @param {element} element 
   * @param {string} structure  랩핑할 엘리먼트 문자열 ex) `<div>`
   * @returns structure element
   */
  function wrapInner(element, structure) {
    return toNodes(toNodes(element).map(function (element) {
      return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure);
    }));
  }

  /**
   * 랜덤문자열 생성
   * @param {number} 길이
   * @return {string} 랜덤문자열
   */
  function randomStr(len) {
    var keystr = '',
      x;
    for (var i = 0; i < len; i++) {
      x = Math.floor(Math.random() * 36);
      if (x < 10) {
        keystr += String(x);
      } else {
        keystr += String.fromCharCode(x + 87);
      }
    }
    return keystr;
  }

  /**
   * element요소의 하위 요소를 제외하고 제거 
   * @param {element} element 
   */
  function unwrap(element) {
    toNodes(element).map(parent).filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (parent) {
      before(parent, parent.childNodes);
      remove$1(parent);
    });
  }
  var fragmentRe = /^\s*<(\w+|!)[^>]*>/;
  var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

  /**
   * 전달된 문자열 형식의 html을 실제 엘리먼트러 전환
   * @param {string} html 엘리먼트로 전환될 문자열 형식의 html
   * @returns element
   */
  function fragment(html) {
    var matches = singleTagRe.exec(html);
    if (matches) {
      return document.createElement(matches[1]);
    }
    var container = document.createElement('div');
    if (fragmentRe.test(html)) {
      container.insertAdjacentHTML('beforeend', html.trim());
    } else {
      container.textContent = html;
    }
    return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;
  }

  /**
   * node 하위요소를 전부 탐색하여 fn으로 전달된 함수를 살행
   * @param {element} node 탐색할 node element
   * @param {function} fn 실행할 함수 
   */
  function apply(node, fn) {
    if (!isElement(node)) {
      return;
    }
    fn(node);
    node = node.firstElementChild;
    while (node) {
      var next = node.nextElementSibling;
      apply(node, fn);
      node = next;
    }
  }

  /**
   * selector와 매칭되는 단일 엘리먼트
   * @param {String} selector css 선택자 형식의 문자열
   * @param {element} context context
   * @returns element
   */
  function $$1(selector, context) {
    return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
  }

  /**
   * selector와 매칭되는 하나이상의 엘리먼트
   * @param {String} selector css 선택자 형식의 문자열
   * @param {element} context context
   * @returns element
   */
  function $$(selector, context) {
    return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
  }
  function isHtml(str) {
    return isString(str) && (str[0] === '<' || str.match(/^\s*</));
  }

  var cssNumber = {
    'animation-iteration-count': true,
    'column-count': true,
    'fill-opacity': true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'stroke-dasharray': true,
    'stroke-dashoffset': true,
    'widows': true,
    'z-index': true,
    'zoom': true
  };
  function css(element, property, value) {
    var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    return toNodes(element).map(function (element) {
      if (isString(property)) {
        property = propName(property);
        if (isUndefined(value)) {
          return getComputedStyle(element).getPropertyValue(property);
        } else if (!value && !isNumber(value)) {
          element.style.removeProperty(property);
        } else {
          element.style.setProperty(property, isNumeric(value) && !cssNumber[property] ? "".concat(value, "px") : value, priority);
        }
      } else if (isArray(property)) {
        var styles = getStyles(element);
        return property.reduce(function (props, property) {
          props[property] = styles[propName(property)];
          return props;
        }, {});
      } else if (isObject(property)) {
        priority = value;
        each(property, function (value, property) {
          return css(element, property, value, priority);
        });
      }
      return element;
    })[0];
  }
  function getStyles(element, pseudoElt) {
    return toWindow(element).getComputedStyle(element, pseudoElt);
  }
  function getStyle(element, property, pseudoElt) {
    return getStyles(element, pseudoElt)[property];
  }
  var parseCssVar = memoize(function (name) {
    /* usage in css: .uk-name:before { content:"xyz" } */

    var element = append(document.documentElement, document.createElement('div'));
    addClass(element, "uk-".concat(name));
    name = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
    remove$1(element);
    return name;
  });
  function getCssVar(name) {
    return !isIE ? getStyles(document.documentElement).getPropertyValue("--uk-".concat(name)) : parseCssVar(name);
  }

  // https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty
  var propName = memoize(function (name) {
    return vendorPropName(name);
  });
  var cssPrefixes = ['webkit', 'moz', 'ms'];
  function vendorPropName(name) {
    if (startsWith(name, '--')) {
      return name;
    }
    name = hyphenate(name);
    var style = document.documentElement.style;
    if (name in style) {
      return name;
    }
    var i = cssPrefixes.length,
      prefixedName;
    while (i--) {
      prefixedName = "-".concat(cssPrefixes[i], "-").concat(name);
      if (prefixedName in style) {
        return prefixedName;
      }
    }
  }

  var transitionClassName = 'mui-transition';
  function transition(element, props) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
    var timing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'linear';
    return Promise$1.all(toNodes(element).map(function (element) {
      return new Promise$1(function (resolve, reject) {
        for (var name in props) {
          var value = css(element, name);
          if (value === '') {
            css(element, name, value);
          }
        }
        var timer = setTimeout(function () {
          return trigger(element, 'transitionend');
        }, duration);
        once(element, 'transitionend transitioncanceled', function (_ref) {
          var type = _ref.type;
          clearTimeout(timer);
          removeClass(element, transitionClassName);
          css(element, {
            transitionProperty: '',
            transitionDuration: '',
            transitionTimingFunction: ''
          });
          type === 'transitioncanceled' ? reject() : resolve(element);
        }, {
          self: true
        });
        addClass(element, transitionClassName);
        css(element, assign({
          transitionProperty: Object.keys(props).map(propName).join(','),
          transitionDuration: "".concat(duration, "ms"),
          transitionTimingFunction: timing
        }, props));
      });
    }));
  }
  var Transition = {
    start: transition,
    stop: function stop(element) {
      trigger(element, 'transitionend');
      return Promise$1.resolve();
    },
    cancel: function cancel(element) {
      trigger(element, 'transitioncanceled');
    },
    inProgress: function inProgress(element) {
      return hasClass(element, transitionClassName);
    }
  };
  var animationPrefix = 'mui-animation-';
  function animate(element, animation) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    var origin = arguments.length > 3 ? arguments[3] : undefined;
    var out = arguments.length > 4 ? arguments[4] : undefined;
    return Promise$1.all(toNodes(element).map(function (element) {
      return new Promise$1(function (resolve, reject) {
        trigger(element, 'animationcanceled');
        var timer = setTimeout(function () {
          return trigger(element, 'animationend');
        }, duration);
        once(element, 'animationend animationcanceled', function (_ref2) {
          var type = _ref2.type;
          clearTimeout(timer);
          type === 'animationcanceled' ? reject() : resolve(element);
          css(element, 'animationDuration', '');
          removeClasses(element, "".concat(animationPrefix, "\\S*"));
        }, {
          self: true
        });
        css(element, 'animationDuration', "".concat(duration, "ms"));
        addClass(element, animation, animationPrefix + (out ? 'leave' : 'enter'));
        if (startsWith(animation, animationPrefix)) {
          origin && addClass(element, "uk-transform-origin-".concat(origin));
          out && addClass(element, "".concat(animationPrefix, "reverse"));
        }
      });
    }));
  }
  var _inProgress = new RegExp("".concat(animationPrefix, "(enter|leave)"));
  var Animation = {
    "in": animate,
    out: function out(element, animation, duration, origin) {
      return animate(element, animation, duration, origin, true);
    },
    inProgress: function inProgress(element) {
      return _inProgress.test(attr(element, 'class'));
    },
    cancel: function cancel(element) {
      trigger(element, 'animationcanceled');
    }
  };

  var dirs$1 = {
    width: ['left', 'right'],
    height: ['top', 'bottom']
  };

  /**
   * 크기 및 위치값 정보
   * @param {element} element 
   * @returns {
   *  height,
   *  height
   *  width
   *  top
   *  left
   *  bottom
   *  right
   * }
   */
  function dimensions(element) {
    var rect = isElement(element) ? toNode(element).getBoundingClientRect() : {
      height: height(element),
      width: width(element),
      top: 0,
      left: 0
    };
    return {
      height: rect.height,
      width: rect.width,
      top: rect.top,
      left: rect.left,
      bottom: rect.top + rect.height,
      right: rect.left + rect.width
    };
  }
  function offset(element, coordinates) {
    var currentOffset = dimensions(element);
    var _toWindow = toWindow(element),
      pageYOffset = _toWindow.pageYOffset,
      pageXOffset = _toWindow.pageXOffset;
    var offsetBy = {
      height: pageYOffset,
      width: pageXOffset
    };
    for (var dir in dirs$1) {
      for (var i in dirs$1[dir]) {
        currentOffset[dirs$1[dir][i]] += offsetBy[dir];
      }
    }
    if (!coordinates) {
      return currentOffset;
    }
    var pos = css(element, 'position');
    each(css(element, ['left', 'top']), function (value, prop) {
      return css(element, prop, coordinates[prop] - currentOffset[prop] + toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value));
    });
  }

  /**
   * 
   * @param {element} element 
   * @returns {
   * top,
   * left
   * }
   */
  function position(element) {
    var _offset = offset(element),
      top = _offset.top,
      left = _offset.left;
    var _toNode = toNode(element),
      _toNode$ownerDocument = _toNode.ownerDocument,
      body = _toNode$ownerDocument.body,
      documentElement = _toNode$ownerDocument.documentElement,
      offsetParent = _toNode.offsetParent;
    var parent = offsetParent || documentElement;
    while (parent && (parent === body || parent === documentElement) && css(parent, 'position') === 'static') {
      parent = parent.parentNode;
    }
    if (isElement(parent)) {
      var parentOffset = offset(parent);
      top -= parentOffset.top + toFloat(css(parent, 'borderTopWidth'));
      left -= parentOffset.left + toFloat(css(parent, 'borderLeftWidth'));
    }
    return {
      top: top - toFloat(css(element, 'marginTop')),
      left: left - toFloat(css(element, 'marginLeft'))
    };
  }
  function offsetPosition(element) {
    var offset = [0, 0];
    element = toNode(element);
    do {
      offset[0] += element.offsetTop;
      offset[1] += element.offsetLeft;
      if (css(element, 'position') === 'fixed') {
        var win = toWindow(element);
        offset[0] += win.pageYOffset;
        offset[1] += win.pageXOffset;
        return offset;
      }
    } while (element = element.offsetParent);
    return offset;
  }

  /**
   * height 값 반환
   */
  var height = dimension('height');

  /**
   * width 값 반환
   */
  var width = dimension('width');
  function dimension(prop) {
    var propName = ucfirst(prop);
    return function (element, value) {
      if (isUndefined(value)) {
        if (isWindow(element)) {
          return element["inner".concat(propName)];
        }
        if (isDocument(element)) {
          var doc = element.documentElement;
          return Math.max(doc["offset".concat(propName)], doc["scroll".concat(propName)]);
        }
        element = toNode(element);
        value = css(element, prop);
        value = value === 'auto' ? element["offset".concat(propName)] : toFloat(value) || 0;
        return value - boxModelAdjust(element, prop);
      } else {
        return css(element, prop, !value && value !== 0 ? '' : +value + boxModelAdjust(element, prop) + 'px');
      }
    };
  }
  function boxModelAdjust(element, prop) {
    var sizing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'border-box';
    return css(element, 'boxSizing') === sizing ? dirs$1[prop].map(ucfirst).reduce(function (value, prop) {
      return value + toFloat(css(element, "padding".concat(prop))) + toFloat(css(element, "border".concat(prop, "Width")));
    }, 0) : 0;
  }
  function flipPosition(pos) {
    for (var dir in dirs$1) {
      for (var i in dirs$1[dir]) {
        if (dirs$1[dir][i] === pos) {
          return dirs$1[dir][1 - i];
        }
      }
    }
    return pos;
  }
  function toPx(value) {
    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'width';
    var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
    return isNumeric(value) ? +value : endsWith(value, 'vh') ? percent(height(toWindow(element)), value) : endsWith(value, 'vw') ? percent(width(toWindow(element)), value) : endsWith(value, '%') ? percent(dimensions(element)[property], value) : toFloat(value);
  }
  function percent(base, value) {
    return base * toFloat(value) / 100;
  }

  var strats = {};
  strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;

  // args strategy
  strats.args = function (parentVal, childVal) {
    return childVal !== false && concatStrat(childVal || parentVal);
  };

  // update strategy
  strats.update = function (parentVal, childVal) {
    return sortBy(concatStrat(parentVal, isFunction(childVal) ? {
      read: childVal
    } : childVal), 'order');
  };

  // property strategy
  strats.props = function (parentVal, childVal) {
    if (isArray(childVal)) {
      childVal = childVal.reduce(function (value, key) {
        value[key] = String;
        return value;
      }, {});
    }
    return strats.methods(parentVal, childVal);
  };

  // extend strategy
  strats.computed = strats.methods = function (parentVal, childVal) {
    return childVal ? parentVal ? assign({}, parentVal, childVal) : childVal : parentVal;
  };

  // data strategy
  strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
      if (!childVal) {
        return parentVal;
      }
      if (!parentVal) {
        return childVal;
      }
      return function (vm) {
        return mergeFnData(parentVal, childVal, vm);
      };
    }
    return mergeFnData(parentVal, childVal, vm);
  };
  function mergeFnData(parentVal, childVal, vm) {
    return strats.computed(isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal, isFunction(childVal) ? childVal.call(vm, vm) : childVal);
  }

  // concat strategy
  function concatStrat(parentVal, childVal) {
    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  }

  // default strategy
  function defaultStrat(parentVal, childVal) {
    return isUndefined(childVal) ? parentVal : childVal;
  }
  function mergeOptions(parent, child, vm) {
    var options = {};
    if (isFunction(child)) {
      child = child.options;
    }
    if (child["extends"]) {
      parent = mergeOptions(parent, child["extends"], vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
    for (var key in parent) {
      mergeKey(key);
    }
    for (var _key in child) {
      if (!hasOwn(parent, _key)) {
        mergeKey(_key);
      }
    }
    function mergeKey(key) {
      options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
    }
    return options;
  }
  function parseOptions(options) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    try {
      return !options ? {} : startsWith(options, '{') ? JSON.parse(options) : args.length && !includes(options, ':') ? _defineProperty({}, args[0], options) : options.split(';').reduce(function (options, option) {
        var _option$split = option.split(/:(.*)/),
          _option$split2 = _slicedToArray(_option$split, 2),
          key = _option$split2[0],
          value = _option$split2[1];
        if (key && !isUndefined(value)) {
          options[key.trim()] = value.trim();
        }
        return options;
      }, {});
    } catch (e) {
      return {};
    }
  }

  /*
      Based on:
      Copyright (c) 2016 Wilson Page wilsonpage@me.com
      https://github.com/wilsonpage/fastdom
  */

  var fastdom = {
    reads: [],
    writes: [],
    read: function read(task) {
      this.reads.push(task);
      scheduleFlush();
      return task;
    },
    write: function write(task) {
      this.writes.push(task);
      scheduleFlush();
      return task;
    },
    clear: function clear(task) {
      remove(this.reads, task);
      remove(this.writes, task);
    },
    flush: flush
  };
  function flush() {
    var recursion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    runTasks(fastdom.reads);
    runTasks(fastdom.writes.splice(0));
    fastdom.scheduled = false;
    if (fastdom.reads.length || fastdom.writes.length) {
      scheduleFlush(recursion + 1);
    }
  }
  var RECURSION_LIMIT = 4;
  function scheduleFlush(recursion) {
    if (fastdom.scheduled) {
      return;
    }
    fastdom.scheduled = true;
    if (recursion && recursion < RECURSION_LIMIT) {
      Promise$1.resolve().then(function () {
        return flush(recursion);
      });
    } else {
      requestAnimationFrame(function () {
        return flush();
      });
    }
  }
  function runTasks(tasks) {
    var task;
    while (task = tasks.shift()) {
      try {
        task();
      } catch (e) {
        console.error(e);
      }
    }
  }
  function remove(array, item) {
    var index = array.indexOf(item);
    return ~index && array.splice(index, 1);
  }

  function isInView(element) {
    var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var offsetLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (!isVisible(element)) {
      return false;
    }
    return intersectRect.apply(void 0, _toConsumableArray(scrollParents(element).map(function (parent) {
      var _offsetViewport = offsetViewport(parent),
        top = _offsetViewport.top,
        left = _offsetViewport.left,
        bottom = _offsetViewport.bottom,
        right = _offsetViewport.right;
      return {
        top: top - offsetTop,
        left: left - offsetLeft,
        bottom: bottom + offsetTop,
        right: right + offsetLeft
      };
    }).concat(offset(element))));
  }
  function scrollIntoView(element) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$offset = _ref.offset,
      offsetBy = _ref$offset === void 0 ? 0 : _ref$offset;
    var parents = isVisible(element) ? scrollParents(element) : [];
    return parents.reduce(function (fn, scrollElement, i) {
      var scrollTop = scrollElement.scrollTop,
        scrollHeight = scrollElement.scrollHeight,
        offsetHeight = scrollElement.offsetHeight;
      var viewport = offsetViewport(scrollElement);
      var maxScroll = scrollHeight - viewport.height;
      var _ref2 = parents[i - 1] ? offsetViewport(parents[i - 1]) : offset(element),
        elHeight = _ref2.height,
        elTop = _ref2.top;
      var top = Math.ceil(elTop - viewport.top - offsetBy + scrollTop);
      if (offsetBy > 0 && offsetHeight < elHeight + offsetBy) {
        top += offsetBy;
      } else {
        offsetBy = 0;
      }
      if (top > maxScroll) {
        offsetBy -= top - maxScroll;
        top = maxScroll;
      } else if (top < 0) {
        offsetBy -= top;
        top = 0;
      }
      return function () {
        return scrollTo(scrollElement, top - scrollTop).then(fn);
      };
    }, function () {
      return Promise.resolve();
    })();
    function scrollTo(element, top) {
      return new Promise(function (resolve) {
        var scroll = element.scrollTop;
        var duration = getDuration(Math.abs(top));
        var start = Date.now();
        (function step() {
          var percent = ease(clamp((Date.now() - start) / duration));
          element.scrollTop = scroll + top * percent;

          // scroll more if we have not reached our destination
          if (percent === 1) {
            resolve();
          } else {
            requestAnimationFrame(step);
          }
        })();
      });
    }
    function getDuration(dist) {
      return 40 * Math.pow(dist, 0.375);
    }
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  }
  function scrolledOver(element) {
    var startOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var endOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (!isVisible(element)) {
      return 0;
    }
    var _scrollParents = scrollParents(element, /auto|scroll/, true),
      _scrollParents2 = _slicedToArray(_scrollParents, 1),
      scrollElement = _scrollParents2[0];
    var scrollHeight = scrollElement.scrollHeight,
      scrollTop = scrollElement.scrollTop;
    var _offsetViewport2 = offsetViewport(scrollElement),
      viewportHeight = _offsetViewport2.height;
    var maxScroll = scrollHeight - viewportHeight;
    var elementOffsetTop = offsetPosition(element)[0] - offsetPosition(scrollElement)[0];
    var start = Math.max(0, elementOffsetTop - viewportHeight + startOffset);
    var end = Math.min(maxScroll, elementOffsetTop + element.offsetHeight - endOffset);
    return clamp((scrollTop - start) / (end - start));
  }
  function scrollParents(element) {
    var overflowRe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /auto|scroll|hidden|clip/;
    var scrollable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollEl = scrollingElement(element);
    var ancestors = parents(element).reverse();
    ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
    var fixedIndex = findIndex(ancestors, function (el) {
      return css(el, 'position') === 'fixed';
    });
    if (~fixedIndex) {
      ancestors = ancestors.slice(fixedIndex);
    }
    return [scrollEl].concat(ancestors.filter(function (parent) {
      return overflowRe.test(css(parent, 'overflow')) && (!scrollable || parent.scrollHeight > offsetViewport(parent).height);
    })).reverse();
  }
  function offsetViewport(scrollElement) {
    var window = toWindow(scrollElement);
    var documentElement = window.document.documentElement;
    var viewportElement = scrollElement === scrollingElement(scrollElement) ? window : scrollElement;
    var visualViewport = window.visualViewport;
    if (isWindow(viewportElement) && visualViewport) {
      var height = visualViewport.height,
        width = visualViewport.width,
        scale = visualViewport.scale,
        top = visualViewport.pageTop,
        left = visualViewport.pageLeft;
      height = Math.round(height * scale);
      width = Math.round(width * scale);
      return {
        height: height,
        width: width,
        top: top,
        left: left,
        bottom: top + height,
        right: left + width
      };
    }
    var rect = offset(viewportElement);
    for (var _i = 0, _arr = [['width', 'x', 'left', 'right'], ['height', 'y', 'top', 'bottom']]; _i < _arr.length; _i++) {
      var _arr$_i = _slicedToArray(_arr[_i], 4),
        prop = _arr$_i[0],
        dir = _arr$_i[1],
        start = _arr$_i[2],
        end = _arr$_i[3];
      if (isWindow(viewportElement)) {
        // iOS 12 returns <body> as scrollingElement
        viewportElement = documentElement;
      } else {
        rect[start] += toFloat(css(viewportElement, "border-".concat(start, "-width")));
      }
      rect[prop] = rect[dir] = viewportElement["client".concat(ucfirst(prop))];
      rect[end] = rect[prop] + rect[start];
    }
    return rect;
  }
  function scrollingElement(element) {
    return toWindow(element).document.scrollingElement;
  }

  /**
   * length 길이만큼 str길이를 잘라서 반환
   * @param {string} str 입력값
   * @param {number} length maxlength 길이
   * @returns str 길이 중 length길이만큼 자른 값
   */
  function headStr(str, length) {
    return str.slice(0, length);
  }

  /**
   * 숫자만 추출하여 반환
   * @param {string} val 평가 값
   * @returns val 숫자만
   */
  function numberOnly(val) {
    return val.replace(/[A-Za-z]/g, "").replace(/[^\dM-]/g, "").replace(/\-/g, "");
  }

  /**
   * 날짜 형식의 값으로 변환
   * @param {string} value 입력 값
   * @param {array} pattern 날짜 패턴 ([yyyy, mm, dd], [yy, mm, dd])
   * @returns 주어진 날짜 형식의 값
   */
  function dateFormat(value, pattern) {
    var valArr;
    var newVal = "";
    value = numberOnly(value);
    valArr = value.split("");
    for (var i = 0; i < pattern.length; i++) {
      var str = valArr.splice(0, pattern[i].length).join("");
      switch (pattern[i]) {
        case "yyyy":
          {
            break;
          }
        case "yy":
          {
            break;
          }
        case "mm":
          {
            if (str === "00") {
              str = "01";
            } else if (toNumber(str.slice(0, 1)) > 1) {
              str = "0".concat(toNumber(str));
            } else if (toNumber(str) > 12) {
              str = "12";
            }
            break;
          }
        case "dd":
          {
            if (str === "00") {
              str = "01";
            } else if (toNumber(str.slice(0, 1)) > 3) {
              str = "0".concat(toNumber(str));
            } else if (toNumber(str) > 31) {
              str = "31";
            }
            break;
          }
      }
      newVal += str;
    }
    return newVal;
  }

  /**
   * 숫자만 추출하여 반환
   * @param {string} value 입력 값
   * @param {string} delimiter 기호
   * @returns value 에서 delimiter를 뺀 값
   */
  function numerFormat(value, delimiter) {
    return numberOnly(value).replace(/(\d)(?=(\d{3})+$)/g, "$1".concat(delimiter));
  }

  /**
   * 숫자만 추출하여 반환
   * @param {array} blocks 
   * @returns value 에서 delimiter를 뺀 값
   */
  function getMaxlength(blocks) {
    return blocks.reduce(function (previous, current) {
      return previous + current;
    }, 0);
  }
  function uppercaseFormat(value) {
    return value.toUpperCase();
  }
  function lowercaseFormat(value) {
    return value.toLowerCase();
  }
  /**
   * [ . ? * + ^ $ [ \ ] \ \ ( ) { } | - ]
   * 구분자를 받아 구분자를 검색하는 정규식문자를 만들어 반환
   * @param {string} delimiter 구분자
   * @returns 구분자를 찾는 정규식
   */
  function getDelimiterREByDelimiter(delimiter) {
    return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g");
  }

  /**
   * 입력값 중 delimiter, delimiters 와 일치하는 문자가 있으면 삭제 후 반환
   * @param {String} value 입력 값
   * @param {string} delimiter 구분자 문자열
   * @param {array} delimiters 구분자 배열
   * @returns 구분자를 삭제한 값
   */
  function getRawValue(value, delimiter, delimiters, maxlength) {
    // single delimiter
    if (delimiters.length === 0) {
      var delimiterRE = delimiter ? getDelimiterREByDelimiter(delimiter) : "";
      value = value.replace(delimiterRE, "");
    } else {
      // multiple delimiters
      delimiters.forEach(function (current) {
        current.split("").forEach(function (letter) {
          value = value.replace(getDelimiterREByDelimiter(letter), "");
        });
      });
    }
    return maxlength !== 0 ? headStr(value, maxlength) : value;
  }

  /**
   * value 에서 re를 검사하여 제거한 후 반환
   * @param {string} value 검사할 값
   * @param {RegExp} re 정규식
   * @returns 치횐된 값
   */
  function strip(value, re) {
    return value.replace(re, "");
  }

  /**
   * 입력값을 받아 가공하여 반환
   * @param {string} value 입력값
   * @param {array} blocks 구분 배열
   * @param {number} blocksLength 구분배열 길이
   * @param {string} delimiter 구분자
   * @param {array} delimiters 구분자 배열
   * @param {boolean} delimiterLazyShow 값이 입력된 후에 구분자를 붙일 것인가?
   * @returns 가공된 값
   */
  function getFormattedValue(value, blocks, delimiter, delimiters, delimiterLazyShow) {
    var result = "",
      multipleDelimiters = delimiters.length > 0,
      currentDelimiter = "";

    // no options, normal input
    if (blocks.length === 0) {
      return value;
    }
    blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length),
          rest = value.slice(length);
        if (multipleDelimiters) {
          currentDelimiter = delimiters[index] || currentDelimiter;
        } else {
          currentDelimiter = delimiter;
        }
        if (delimiterLazyShow) {
          if (index > 0) {
            result += currentDelimiter;
          }
          result += sub;
        } else {
          result += sub;
          if (sub.length === length && index < blocks.length - 1) {
            result += currentDelimiter;
          }
        }

        // update remaining string
        value = rest;
      }
    });
    return result;
  }

  /**
   * 커서가 값의 끝에 위치할 경우 새 값의 길이 반환,
   *
   * @param {number} prevPos 입력박스 커서 위치 값 selectionEnd
   * @param {string} oldValue 입력박스 값
   * @param {string} newValue pps.result 값
   * @param {string} delimiter 구분자
   * @param {array} delimiters 구분자 배열
   * @returns 계산된 커서 인덱스
   */
  function getNextCursorPosition(prevPos, oldValue, newValue, delimiter, delimiters) {
    // If cursor was at the end of value, just place it back.
    // Because new value could contain additional chars.
    if (oldValue.length === prevPos) {
      return newValue.length;
    }
    return prevPos + getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters);
  }
  function getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters) {
    var oldRawValue, newRawValue, lengthOffset;
    oldRawValue = getRawValue(oldValue.slice(0, prevPos), delimiter, delimiters);
    newRawValue = getRawValue(newValue.slice(0, prevPos), delimiter, delimiters);
    lengthOffset = oldRawValue.length - newRawValue.length;
    return lengthOffset !== 0 ? lengthOffset / Math.abs(lengthOffset) : 0;
  }

  /**
   * 입력박스 내 값의 선택영역을 설정한다.
   * start, end 두 값으로 지정하는데 시작과 끝의 값은 같다.
   * @param {element} element 엘리먼트
   * @param {number} position 커서 마지막 위치
   * @param {document} doc
   */
  function setSelection(element, position, doc) {
    if (element !== getActiveElement(doc)) {
      return;
    }

    // cursor is already in the end
    if (element && element.value.length <= position) {
      return;
    }
    if (element.createTextRange) {
      var range = element.createTextRange();
      range.move("character", position);
      range.select();
    } else {
      try {
        element.setSelectionRange(position, position);
      } catch (e) {
        // eslint-disable-next-line
        console.warn("The input element type does not support selection");
      }
    }
  }

  /**
   * document.actoveElement 반환
   * shadowRoot가 랜더랑 되었다면 shadowRoot에서 포커싱된 엘리먼드 재 검사
   * @param {element} parent 엘리먼트
   * @returns 포커싱 된 엘리먼트 반환
   */
  function getActiveElement(parent) {
    var activeElement = parent.activeElement;
    if (activeElement && activeElement.shadowRoot) {
      return getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  }

  /**
   * 입력값의 마지막 문자가 delimiter 와 일치하는가? delimiter : ""
   * @param {string} value 입력 값
   * @param {string} delimiter 구분자 문자열
   * @param {array} delimiters 구분자 배열
   * @returns 구분자 또는 빈 문자열
   */
  function getPostDelimiter(value, delimiter, delimiters) {
    // single delimiter
    if (delimiters.length === 0) {
      return value.slice(-delimiter.length) === delimiter ? delimiter : "";
    }

    // multiple delimiters
    var matchedDelimiter = "";
    delimiters.forEach(function (current) {
      if (value.slice(-current.length) === current) {
        matchedDelimiter = current;
      }
    });
    return matchedDelimiter;
  }

  function observeIntersection(targets, cb, options) {
    var intersecting = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var observer = new IntersectionObserver(intersecting ? function (entries, observer) {
      if (entries.some(function (entry) {
        return entry.isIntersecting;
      })) {
        cb(entries, observer);
      }
    } : cb, options);
    var _iterator = _createForOfIteratorHelper(toNodes(targets)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        observer.observe(el);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return observer;
  }
  var hasResizeObserver = inBrowser && window.ResizeObserver;
  function observeResize(targets, cb) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      box: 'border-box'
    };
    if (hasResizeObserver) {
      return observe(ResizeObserver, targets, cb, options);
    }

    // Fallback Safari < 13.1
    initResizeListener();
    listeners.add(cb);
    return {
      disconnect: function disconnect() {
        listeners["delete"](cb);
      }
    };
  }
  var listeners;
  function initResizeListener() {
    if (listeners) {
      return;
    }
    listeners = new Set();

    // throttle 'resize'
    var pendingResize;
    var handleResize = function handleResize() {
      if (pendingResize) {
        return;
      }
      pendingResize = true;
      requestAnimationFrame(function () {
        return pendingResize = false;
      });
      var _iterator2 = _createForOfIteratorHelper(listeners),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var listener = _step2.value;
          listener();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
    on(window, 'load resize', handleResize);
    on(document, 'loadedmetadata load', handleResize, true);
  }
  function observeMutation(targets, cb, options) {
    return observe(MutationObserver, targets, cb, options);
  }
  function observe(Observer, targets, cb, options) {
    var observer = new Observer(cb);
    var _iterator3 = _createForOfIteratorHelper(toNodes(targets)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var el = _step3.value;
        observer.observe(el, options);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return observer;
  }

  var dirs = [['width', 'x', 'left', 'right'], ['height', 'y', 'top', 'bottom']];
  function positionAt(element, target, options) {
    var position;
    options = _objectSpread2({
      attach: _objectSpread2({
        element: ['left', 'top'],
        target: ['left', 'top']
      }, options.attach),
      offset: [0, 0],
      placement: []
    }, options);
    if (!isArray(target)) {
      target = [target, target];
    }
    position = getPosition(element, target, options);
    offset(element, position);
    return position;
  }
  function getPosition(element, target, options) {
    var position = attachTo(element, target, options);
    var boundary = options.boundary,
      _options$viewportOffs = options.viewportOffset,
      viewportOffset = _options$viewportOffs === void 0 ? 0 : _options$viewportOffs,
      placement = options.placement;
    var offsetPosition = position;
    for (var _i = 0, _Object$entries = Object.entries(dirs); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        i = _Object$entries$_i[0],
        _Object$entries$_i$ = _slicedToArray(_Object$entries$_i[1], 4),
        prop = _Object$entries$_i$[0],
        start = _Object$entries$_i$[2],
        end = _Object$entries$_i$[3];
      var viewport = getViewport(target[i], viewportOffset, boundary, i);
      if (isWithin(position, viewport, i)) {
        continue;
      }
      var offsetBy = 0;

      // Flip
      if (placement[i] === 'flip') {
        var attach = options.attach.target[i];
        if (attach === end && position[end] <= viewport[end] || attach === start && position[start] >= viewport[start]) {
          continue;
        }
        offsetBy = flip(element, target, options, i)[start] - position[start];
        var scrollArea = getScrollArea(target[i], viewportOffset, i);
        if (!isWithin(applyOffset(position, offsetBy, i), scrollArea, i)) {
          if (isWithin(position, scrollArea, i)) {
            continue;
          }
          if (options.recursion) {
            return false;
          }
          var newPos = flipAxis(element, target, options);
          if (newPos && isWithin(newPos, scrollArea, 1 - i)) {
            return newPos;
          }
          continue;
        }

        // Shift
      } else if (placement[i] === 'shift') {
        var targetDim = offset(target[i]);
        var elOffset = options.offset;
        offsetBy = clamp(clamp(position[start], viewport[start], viewport[end] - position[prop]), targetDim[start] - position[prop] + elOffset[i], targetDim[end] - elOffset[i]) - position[start];
        offsetPosition.cale = offsetBy;
      }
      offsetPosition = applyOffset(offsetPosition, offsetBy, i);
    }
    return offsetPosition;
  }
  function attachTo(element, target, options) {
    var _attach$offset$option = _objectSpread2({
        attach: _objectSpread2({
          element: ['left', 'top'],
          target: ['left', 'top']
        }, options.attach),
        offset: [0, 0]
      }, options),
      attach = _attach$offset$option.attach,
      offsetBy = _attach$offset$option.offset;
    var elOffset = offset(element);
    for (var _i2 = 0, _Object$entries2 = Object.entries(dirs); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        i = _Object$entries2$_i[0],
        _Object$entries2$_i$ = _slicedToArray(_Object$entries2$_i[1], 4),
        prop = _Object$entries2$_i$[0],
        start = _Object$entries2$_i$[2],
        end = _Object$entries2$_i$[3];
      var targetOffset = attach.target[i] === attach.element[i] ? offsetViewport(target[i]) : offset(target[i]);
      elOffset = applyOffset(elOffset, targetOffset[start] - elOffset[start] + moveBy(attach.target[i], end, targetOffset[prop]) - moveBy(attach.element[i], end, elOffset[prop]) + +offsetBy[i], i);
    }
    return elOffset;
  }
  function applyOffset(position, offset, i) {
    var _dirs$i = _slicedToArray(dirs[i], 4),
      dir = _dirs$i[1],
      start = _dirs$i[2],
      end = _dirs$i[3];
    var newPos = _objectSpread2({}, position);
    newPos[start] = position[dir] = position[start] + offset;
    newPos[end] += offset;
    return newPos;
  }
  function moveBy(attach, end, dim) {
    return attach === 'center' ? dim / 2 : attach === end ? dim : 0;
  }
  function getViewport(element, viewportOffset, boundary, i) {
    var viewport = getIntersectionArea.apply(void 0, _toConsumableArray(scrollParents(element).map(offsetViewport)));
    if (viewportOffset) {
      viewport[dirs[i][2]] += viewportOffset;
      viewport[dirs[i][3]] -= viewportOffset;
    }
    if (boundary) {
      viewport = getIntersectionArea(viewport, offset(boundary));
    }
    return viewport;
  }
  function getScrollArea(element, viewportOffset, i) {
    var _dirs$i2 = _slicedToArray(dirs[i], 4),
      prop = _dirs$i2[0],
      start = _dirs$i2[2],
      end = _dirs$i2[3];
    var _scrollParents = scrollParents(element),
      _scrollParents2 = _slicedToArray(_scrollParents, 1),
      scrollElement = _scrollParents2[0];
    var viewport = offsetViewport(scrollElement);
    viewport[start] -= scrollElement["scroll".concat(ucfirst(start))] - viewportOffset;
    viewport[end] = viewport[start] + scrollElement["scroll".concat(ucfirst(prop))] - viewportOffset;
    return viewport;
  }
  function getIntersectionArea() {
    var area = {};
    for (var _len = arguments.length, rects = new Array(_len), _key = 0; _key < _len; _key++) {
      rects[_key] = arguments[_key];
    }
    for (var _i3 = 0, _rects = rects; _i3 < _rects.length; _i3++) {
      var rect = _rects[_i3];
      var _iterator = _createForOfIteratorHelper(dirs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 4),
            start = _step$value[2],
            end = _step$value[3];
          area[start] = Math.max(area[start] || 0, rect[start]);
          area[end] = Math.min.apply(Math, _toConsumableArray([area[end], rect[end]].filter(Boolean)));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return area;
  }
  function isWithin(positionA, positionB, i) {
    var _dirs$i3 = _slicedToArray(dirs[i], 4),
      start = _dirs$i3[2],
      end = _dirs$i3[3];
    return positionA[start] >= positionB[start] && positionA[end] <= positionB[end];
  }
  function flip(element, target, _ref, i) {
    var offset = _ref.offset,
      attach = _ref.attach;
    return attachTo(element, target, {
      attach: {
        element: flipAttach(attach.element, i),
        target: flipAttach(attach.target, i)
      },
      offset: flipOffset(offset, i)
    });
  }
  function flipAxis(element, target, options) {
    return getPosition(element, target, _objectSpread2(_objectSpread2({}, options), {}, {
      attach: {
        element: options.attach.element.map(flipAttachAxis).reverse(),
        target: options.attach.target.map(flipAttachAxis).reverse()
      },
      offset: options.offset.reverse(),
      placement: options.placement.reverse(),
      recursion: true
    }));
  }
  function flipAttach(attach, i) {
    var newAttach = _toConsumableArray(attach);
    var index = dirs[i].indexOf(attach[i]);
    if (~index) {
      newAttach[i] = dirs[i][1 - index % 2 + 2];
    }
    return newAttach;
  }
  function flipAttachAxis(prop) {
    for (var i = 0; i < dirs.length; i++) {
      var index = dirs[i].indexOf(prop);
      if (~index) {
        return dirs[1 - i][index % 2 + 2];
      }
    }
  }
  function flipOffset(offset, i) {
    offset = _toConsumableArray(offset);
    offset[i] *= -1;
    return offset;
  }

  var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    replaceClass: replaceClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    test: test,
    transition: transition,
    Transition: Transition,
    animate: animate,
    Animation: Animation,
    attr: attr,
    hasAttr: hasAttr,
    removeAttr: removeAttr,
    data: data,
    dimensions: dimensions,
    offset: offset,
    position: position,
    offsetPosition: offsetPosition,
    height: height,
    width: width,
    boxModelAdjust: boxModelAdjust,
    flipPosition: flipPosition,
    toPx: toPx,
    query: query,
    queryAll: queryAll,
    find: find,
    findAll: findAll,
    escape: escape,
    Promise: Promise$1,
    Deferred: Deferred,
    isVoidElement: isVoidElement,
    isVisible: isVisible,
    selInput: selInput,
    isInput: isInput,
    selFocusable: selFocusable,
    isFocusable: isFocusable,
    parent: parent,
    filter: filter,
    matches: matches,
    closest: closest,
    within: within,
    parents: parents,
    children: children,
    index: index,
    on: on,
    off: off,
    once: once,
    trigger: trigger,
    createEvent: createEvent,
    toEventTargets: toEventTargets,
    isTouch: isTouch,
    getEventPos: getEventPos,
    hasOwn: hasOwn,
    hyphenate: hyphenate,
    camelize: camelize,
    ucfirst: ucfirst,
    startsWith: startsWith,
    endsWith: endsWith,
    includes: includes,
    findIndex: findIndex,
    isArray: isArray,
    isFunction: isFunction,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isWindow: isWindow,
    isDocument: isDocument,
    isNode: isNode,
    isElement: isElement,
    isBoolean: isBoolean,
    isString: isString,
    isNumber: isNumber,
    isNumeric: isNumeric,
    typeOf: typeOf,
    isDate: isDate,
    isLeapYear: isLeapYear,
    getDaysInMonth: getDaysInMonth,
    addLeadingZero: addLeadingZero,
    isEmpty: isEmpty$1,
    isUndefined: isUndefined,
    toBoolean: toBoolean,
    toNumber: toNumber,
    toFloat: toFloat,
    toArray: toArray,
    toNode: toNode,
    toNodes: toNodes,
    toWindow: toWindow,
    toMs: toMs,
    isEqual: isEqual,
    swap: swap,
    assign: assign,
    last: last,
    each: each,
    sortBy: sortBy,
    sumBy: sumBy,
    uniqueBy: uniqueBy,
    clamp: clamp,
    noop: noop,
    intersectRect: intersectRect,
    pointInRect: pointInRect,
    Dimensions: Dimensions,
    getIndex: getIndex,
    memoize: memoize,
    mergeOptions: mergeOptions,
    parseOptions: parseOptions,
    ready: ready,
    isTag: isTag,
    empty: empty,
    html: html,
    prepend: prepend,
    append: append,
    before: before,
    after: after,
    remove: remove$1,
    wrapAll: wrapAll,
    wrapInner: wrapInner,
    randomStr: randomStr,
    unwrap: unwrap,
    fragment: fragment,
    apply: apply,
    $: $$1,
    $$: $$,
    fastdom: fastdom,
    css: css,
    getCssVar: getCssVar,
    propName: propName,
    inBrowser: inBrowser,
    isIE: isIE,
    isRtl: isRtl,
    isAndroid: isAndroid,
    hasTouch: hasTouch,
    pointerDown: pointerDown,
    pointerMove: pointerMove,
    pointerUp: pointerUp,
    pointerEnter: pointerEnter,
    pointerLeave: pointerLeave,
    pointerCancel: pointerCancel,
    isInView: isInView,
    scrollIntoView: scrollIntoView,
    scrolledOver: scrolledOver,
    scrollParents: scrollParents,
    offsetViewport: offsetViewport,
    headStr: headStr,
    numberOnly: numberOnly,
    dateFormat: dateFormat,
    numerFormat: numerFormat,
    getMaxlength: getMaxlength,
    uppercaseFormat: uppercaseFormat,
    lowercaseFormat: lowercaseFormat,
    getDelimiterREByDelimiter: getDelimiterREByDelimiter,
    getRawValue: getRawValue,
    strip: strip,
    getFormattedValue: getFormattedValue,
    getNextCursorPosition: getNextCursorPosition,
    getPositionOffset: getPositionOffset,
    setSelection: setSelection,
    getActiveElement: getActiveElement,
    getPostDelimiter: getPostDelimiter,
    observeIntersection: observeIntersection,
    observeResize: observeResize,
    observeMutation: observeMutation,
    positionAt: positionAt
  });

  function globalApi (UICommon) {
    var DATA = UICommon.data;
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
    };

    /**
     * 객체 형태의 컴포넌트를 Class 형태로 변환
     * @param {object} opts 컴포넌트 객체
     * @returns Class
     */
    UICommon.extend = function (opts) {
      var options = opts || {};
      var Super = this;
      var Sub = function G(options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.options = mergeOptions(Super.options, options);
      Sub["super"] = Super;
      Sub.extend = Super.extend;
      return Sub;
    };
    /**
     * event 발생 시 update 실행
     * @param {element} element 
     * @param {event} e 이벤트
     */
    UICommon.update = function (element, e) {
      element = element ? toNode(element) : document.body;
      parents(element).reverse().forEach(function (element) {
        return update(element[DATA], e);
      });
      apply(element, function (element) {
        return update(element[DATA], e);
      });
    };
    Object.defineProperty(UICommon, 'container', {
      get: function get() {
        return typeof container !== 'undefined' ? container : document.body;
      },
      set: function set(element) {
        container = $(element);
      }
    });
  }
  function update(data, e) {
    if (!data) {
      return;
    }
    for (var name in data) {
      if (data[name]._connected) {
        data[name]._callUpdate(e);
      }
    }
  }

  function initializeApi (UICommon) {
    var uid = 0;
    UICommon.prefix;
    UICommon.prototype._init = function (opts) {
      var options = opts || {};
      options.data = normalizeData(options, this.constructor.options);
      this.$options = mergeOptions(this.constructor.options, options, this);
      this.$el = null;
      this.$props = {};
      this._uid = uid++;
      this._initData();
      this._initMethods();
      this._initComputeds();
      this._callHook('created');
      if (options.el) {
        this.$mount(options.el);
      }
    };
    UICommon.prototype._initData = function () {
      var _ = this;
      var _this$$options$data = this.$options.data,
        data = _this$$options$data === void 0 ? {} : _this$$options$data;
      for (var key in data) {
        _.$props[key] = _[key] = data[key];
      }
    };
    UICommon.prototype._initMethods = function () {
      var _ = this;
      var methods = this.$options.methods;
      if (methods) {
        for (var key in methods) {
          _[key] = methods[key].bind(_);
        }
      }
    };
    UICommon.prototype._initComputeds = function () {
      var _ = this;
      var computed = this.$options.computed;
      _._computeds = {};
      if (computed) {
        for (var key in computed) {
          registerComputed(_, key, computed[key]);
        }
      }
    };
    UICommon.prototype._initProps = function (props) {
      var key;
      props = props || getProps(this.$options, this.$name);
      for (key in props) {
        if (!isUndefined(props[key])) {
          this.$props[key] = props[key];
        }
      }
      var exclude = [this.$options.computed, this.$options.methods];
      for (key in this.$props) {
        if (key in props && notIn(exclude, key)) {
          this[key] = this.$props[key];
        }
      }
    };
    UICommon.prototype._initEvents = function () {
      this._events = [];
      var _ = this;
      var events = _.$options.events;
      if (events) {
        events.forEach(function (event) {
          if (!hasOwn(event, 'handler')) {
            for (var key in event) {
              registerEvent(_, event[key], key);
            }
          } else {
            registerEvent(_, event);
          }
        });
      }
    };
    UICommon.prototype._unbindEvents = function () {
      this._events.forEach(function (unbind) {
        return unbind();
      });
      delete this._events;
    };
    UICommon.prototype._initObservers = function () {
      this._observers = [initChildListObserver(this), initPropsObserver(this)];
    };
    UICommon.prototype.registerObserver = function () {
      var _this$_observers;
      (_this$_observers = this._observers).push.apply(_this$_observers, arguments);
    };
    UICommon.prototype._disconnectObservers = function () {
      this._observers.forEach(function (observer) {
        return observer && observer.disconnect();
      });
    };
    UICommon.prototype._callHook = function (hook) {
      var _this = this;
      var handlers = this.$options[hook];
      if (handlers) handlers.forEach(function (handlers) {
        return handlers.call(_this);
      });
    };
    UICommon.prototype._callConnected = function () {
      if (this._connected) return;
      this._data = {};
      this._computeds = {};
      this._frames = {
        reads: {},
        writes: {}
      };
      this._initProps();
      this._callHook('beforeConnect');
      this._connected = true;
      this._initEvents();
      if (window.MutationObserver) this._initObservers();
      this._callHook('connected');
      this._callUpdate();
    };
    UICommon.prototype._callDisconnected = function () {
      if (!this._connected) return;
      this._callHook('beforeDisconnect');
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
      this._unbindEvents();
      this._callHook('disconnected');
      this._connected = false;
    };
    UICommon.prototype._callUpdate = function () {
      var _this2 = this;
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'update';
      if (!this._connected) {
        return;
      }
      if (e === 'update' || e === 'resize') {
        this._callWatches();
      }
      if (!this.$options.update) {
        return;
      }
      if (!this._updates) {
        this._updates = new Set();
        fastdom.read(function () {
          if (_this2._connected) {
            runUpdates.call(_this2, _this2._updates);
          }
          delete _this2._updates;
        });
      }
      this._updates.add(e.type || e);
    };
    UICommon.prototype._callWatches = function () {
      var _this3 = this;
      var _frames = this._frames;
      if (_frames._watch) {
        return;
      }
      var initital = !hasOwn(_frames, '_watch');
      _frames._watch = fastdom.read(function () {
        if (!_this3._connected) {
          return;
        }
        var computed = _this3.$options.computed,
          _computeds = _this3._computeds;
        for (var key in computed) {
          var hasPrev = hasOwn(_computeds, key);
          var prev = _computeds[key];
          delete _computeds[key];
          var _computed$key = computed[key],
            watch = _computed$key.watch,
            immediate = _computed$key.immediate;
          if (watch && (initital && immediate || hasPrev && !isEqual(prev, _this3[key]))) {
            watch.call(_this3, _this3[key], prev);
          }
        }
        _frames._watch = null;
      });
    };
    function runUpdates(types) {
      var _this4 = this;
      var _iterator = _createForOfIteratorHelper(this.$options.update),
        _step;
      try {
        var _loop = function _loop() {
          var _step$value = _step.value,
            read = _step$value.read,
            write = _step$value.write,
            _step$value$events = _step$value.events,
            events = _step$value$events === void 0 ? [] : _step$value$events;
          if (!types.has('update') && !events.some(function (type) {
            return types.has(type);
          })) {
            return "continue";
          }
          var result = void 0;
          if (read) {
            result = read.call(_this4, _this4._data, types);
            if (result && isPlainObject(result)) {
              assign(_this4._data, result);
            }
          }
          if (write && result !== false) {
            fastdom.write(function () {
              if (_this4._connected) {
                write.call(_this4, _this4._data, types);
              }
            });
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();
          if (_ret === "continue") continue;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  function getProps(opts, name) {
    var data$1 = {};
    var _opts$args = opts.args,
      args = _opts$args === void 0 ? [] : _opts$args,
      _opts$props = opts.props,
      props = _opts$props === void 0 ? {} : _opts$props,
      el = opts.el;
    if (!props) {
      return data$1;
    }
    for (var key in props) {
      var prop = hyphenate(key);
      var value = data(el, prop);
      if (isUndefined(value)) {
        continue;
      }
      value = props[key] === Boolean && value === '' ? true : coerce(props[key], value);
      if (prop === 'target' && (!value || startsWith(value, '_'))) {
        continue;
      }
      data$1[key] = value;
    }
    var options = parseOptions(data(el, name), args);
    for (var _key in options) {
      var _prop = camelize(_key);
      if (props[_prop] !== undefined) {
        data$1[_prop] = coerce(props[_prop], options[_key]);
      }
    }
    return data$1;
  }
  function notIn(options, key) {
    return options.every(function (arr) {
      return !arr || !hasOwn(arr, key);
    });
  }
  function coerce(type, value) {
    if (type === Boolean) {
      return toBoolean(value);
    } else if (type === Number) {
      return toNumber(value);
    } else if (type === 'list') {
      return toList(value);
    }
    return type ? type(value) : value;
  }
  function toList(value) {
    return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map(function (value) {
      return isNumeric(value) ? toNumber(value) : toBoolean(value.trim());
    }) : [value];
  }
  function registerEvent(component, event, key) {
    if (!isPlainObject(event)) {
      event = {
        name: key,
        handler: event
      };
    }
    var _event = event,
      name = _event.name,
      el = _event.el,
      handler = _event.handler,
      capture = _event.capture,
      passive = _event.passive,
      delegate = _event.delegate,
      filter = _event.filter,
      self = _event.self;
    el = isFunction(el) ? el.call(component) : el || component.$el;
    if (isArray(el)) {
      el.forEach(function (el) {
        return registerEvent(component, _objectSpread2(_objectSpread2({}, event), {}, {
          el: el
        }), key);
      });
      return;
    }
    if (!el || filter && !filter.call(component)) {
      return;
    }
    component._events.push(on(el, name, delegate ? isString(delegate) ? delegate : delegate.call(component) : null, isString(handler) ? component[handler] : handler.bind(component), {
      passive: passive,
      capture: capture,
      self: self
    }));
  }
  function normalizeData(_ref, _ref2) {
    var data = _ref.data;
      _ref.el;
    var args = _ref2.args,
      _ref2$props = _ref2.props,
      props = _ref2$props === void 0 ? {} : _ref2$props;
    data = isArray(data) ? !isEmpty(args) ? data.slice(0, args.length).reduce(function (data, value, index) {
      if (isPlainObject(value)) {
        assign(data, value);
      } else {
        data[args[index]] = value;
      }
      return data;
    }, {}) : undefined : data;
    if (data) {
      for (var key in data) {
        if (isUndefined(data[key])) {
          delete data[key];
        } else {
          data[key] = props[key] ? coerce(props[key], data[key]) : data[key];
        }
      }
    }
    return data;
  }
  function registerComputed(component, key, cb) {
    Object.defineProperty(component, key, {
      enumerable: true,
      get: function get() {
        var _computeds = component._computeds,
          $props = component.$props,
          $el = component.$el;
        if (!hasOwn(_computeds, key)) {
          _computeds[key] = (cb.get || cb).call(component, $props, $el);
        }
        return _computeds[key];
      },
      set: function set(value) {
        var _computeds = component._computeds;
        _computeds[key] = cb.set ? cb.set.call(component, value) : value;
        if (isUndefined(_computeds[key])) {
          delete _computeds[key];
        }
      }
    });
  }
  function initChildListObserver(component) {
    var el = component.$options.el;
    var observer = new MutationObserver(function () {
      return component.$emit();
    });
    observer.observe(el, {
      childList: true,
      subtree: true
    });
    return observer;
  }
  function initPropsObserver(component) {
    var $name = component.$name,
      $options = component.$options,
      $props = component.$props;
    var attrs = $options.attrs,
      props = $options.props,
      el = $options.el;
    if (!props || attrs === false) {
      return;
    }
    var attributes = isArray(attrs) ? attrs : Object.keys(props);
    var filter = attributes.map(function (key) {
      return hyphenate(key);
    }).concat($name);
    var observer = new MutationObserver(function (records) {
      var data = getProps($options, $name);
      if (records.some(function (_ref3) {
        var attributeName = _ref3.attributeName;
        var prop = attributeName.replace('data-', '');
        return (prop === $name ? attributes : [camelize(prop), camelize(attributeName)]).some(function (prop) {
          return !isUndefined(data[prop]) && data[prop] !== $props[prop];
        });
      })) {
        component.$reset();
      }
    });
    observer.observe(el, {
      attributes: true,
      attributeFilter: filter.concat(filter.map(function (key) {
        return "data-".concat(key);
      })).concat(filter.map(function (key) {
        return "".concat(key);
      }))
    });
    return observer;
  }

  function instanceApi (UICommon) {
    var DATA = UICommon.data;
    UICommon.prototype.$create = function (component, element, data) {
      return UICommon[component](element, data);
    };
    UICommon.prototype.$mount = function (el) {
      var name = this.$options.name;
      if (!el[DATA]) {
        el[DATA] = {};
      }
      if (el[DATA][name]) return;
      el[DATA][name] = this;
      this.$el = this.$options.el = this.$options.el || el;
      if (within(el, document)) {
        this._callConnected();
      }
    };
    UICommon.prototype.$reset = function () {
      this._callDisconnected();
      this._callConnected();
    };
    UICommon.prototype.$destroy = function () {
      var removeEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$$options = this.$options,
        el = _this$$options.el,
        name = _this$$options.name;
      if (el) this._callDisconnected();
      this._callHook('destory');
      if (!el || !el[DATA]) return;
      delete el[DATA][name];
      if (!isEmpty$1(el[DATA])) delete el[DATA];
      if (removeEl) remove$1(this.$el);
    };
    UICommon.prototype.$emit = function (e) {
      this._callUpdate(e);
    };
    UICommon.prototype.$update = function () {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var e = arguments.length > 1 ? arguments[1] : undefined;
      UICommon.update(element, e);
    };
    UICommon.prototype.$getComponent = UICommon.getComponent;
    var names = {};
    Object.defineProperties(UICommon.prototype, {
      $container: Object.getOwnPropertyDescriptor(UICommon, 'container'),
      $name: {
        get: function get() {
          var name = this.$options.name;
          if (!names[name]) {
            names[name] = UICommon.prefix + hyphenate(name);
          }
          return names[name];
        }
      }
    });
  }

  var pageNavigation = {
    "extends": Button,
    props: {
      media: Boolean,
      boundary: Boolean,
      tabContents: String
    },
    data: {
      target: ">ul.".concat(cssPrefix, "tab-nav>*>:first-child"),
      clsContainer: ">ul.".concat(cssPrefix, "tab-nav>*"),
      tabContents: ">.".concat(cssPrefix, "tab-contents>div"),
      clsOpen: "".concat(cssPrefix, "active"),
      isContainer: true
    },
    computed: {
      tabContents: {
        get: function get(_ref, $el) {
          var tabContents = _ref.tabContents;
          return $$(tabContents, $el);
        },
        watch: function watch(tabContents) {
          var n = this.index() < 0 ? 0 : this.index();
          this.activeTab(tabContents[n]);
        },
        immediate: true
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.target;
      },
      handler: function handler(e) {
        var n = this.index();
        this.activeTab(this.tabContents[n]);
      }
    }],
    methods: {
      activeTab: function activeTab(item) {
        var _this = this;
        this.tabContents.map(function (el) {
          return toggleClass(el, _this.clsOpen, el === item);
        });
      }
    }
  };

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PageNavigation: pageNavigation
  });

  function componentCore (GCui) {
    var DATA = GCui.data;
    var components = {};
    GCui.component = function (name, options) {
      name = hyphenate(name);
      if (!options) {
        if (isPlainObject(components[name])) {
          components[name] = GCui.extend(components[name]);
        }
        return components[name];
      }
      GCui[name] = function (element, data) {
        // 토스트 팝업을 위한..
        if (!isElement(element) && isPlainObject(element)) {
          data = element;
          element = null;
        }
        var component = GCui.component(name);
        return component.options.functional ? new component({
          data: isPlainObject(element) ? element : Array.prototype.slice.call(arguments)
        }) : !element ? init(element) : $$(element).map(init)[0];
        function init(element) {
          var instance = GCui.getComponent(element, name);
          // console.log(instance)
          // console.log(new component({el: element, data}));

          if (instance) {
            if (!data) {
              return instance;
            } else {
              instance.$destroy();
            }
          }
          return new component({
            el: element,
            data: data
          });
        }
      };
      var opt = isPlainObject(options) ? assign({}, options) : options.options;
      opt.name = name;
      if (opt.install) {
        opt.install(GCui, opt, name);
      }
      if (GCui._initialized && !opt.functional) {
        fastdom.read(function () {
          return GCui[name]("[".concat(GCui.prefixName, "-").concat(id, "],[data-").concat(GCui.prefixName, "-").concat(id, "]"));
        });
      }
      return components[name] = isPlainObject(options) ? opt : options;
    };
    GCui.getComponents = function (element) {
      return element && element[DATA] || {};
    };
    GCui.getComponent = function (element, name) {
      return GCui.getComponents(element)[name];
    };
    GCui.connect = function (node) {
      if (node[DATA]) {
        for (var name in node[DATA]) {
          node[DATA][name]._callConnected();
        }
      }
      for (var i = 0; i < node.attributes.length; i++) {
        var _name = getComponentName(node.attributes[i].name);
        if (_name && _name in components) {
          GCui[_name](node);
        }
      }
    };
    GCui.disconnect = function (node) {
      for (var name in node[DATA]) {
        node[DATA][name]._callDisconnected();
      }
    };
  }
  function getComponentName(attribute) {
    var prefix = 'mui';
    return startsWith(attribute, "".concat(prefix, "-")) || startsWith(attribute, "data-".concat(prefix, "-")) ? camelize(attribute.replace("data-".concat(prefix, "-"), '').replace("".concat(prefix, "-"), '')) : false;
  }

  function setFramewrok (UICommon) {
    var connect = UICommon.connect,
      disconnect = UICommon.disconnect;
    if (!window.MutationObserver) {
      console.log('not support MutationObserver');
      return;
    }
    fastdom.read(function () {
      if (document.body) {
        apply(document.body, connect);
      }
      new MutationObserver(function (mutations) {
        var updates = [];
        mutations.forEach(function (mutation) {
          applyMutation(mutation, updates);
        });
        updates.forEach(function (el) {
          UICommon.update(el);
        });
      }).observe(document, {
        childList: true,
        subtree: true,
        characterData: true
        // attributes: true
      });

      UICommon._initialized = true;
    });
    function applyMutation(mutation, updates) {
      var target = mutation.target,
        type = mutation.type;
      // console.log(mutation);
      var update = type !== 'attributes' ? applyChildList(mutation) : applyAttribute(mutation);
      if (update && !updates.some(function (element) {
        return element.contains(target);
      })) {
        updates.push(target.contains ? target : target.parentNode); // IE 11 text node does not implement contains
      }
    }

    function applyAttribute(_ref) {
      var target = _ref.target,
        attributeName = _ref.attributeName;
      if (attributeName === 'href') {
        return true;
      }
      var name = getComponentName(attributeName);
      if (!name || !(name in UICommon)) {
        return;
      }
      if (hasAttr(target, attributeName)) {
        UICommon[name](target);
        return true;
      }
      var component = UICommon.getComponent(target, name);
      if (component) {
        component.$destroy();
        return true;
      }
    }
    function applyChildList(_ref2) {
      var addedNodes = _ref2.addedNodes,
        removedNodes = _ref2.removedNodes;
      for (var i = 0; i < addedNodes.length; i++) {
        apply(addedNodes[i], connect);
      }
      for (var _i = 0; _i < removedNodes.length; _i++) {
        apply(removedNodes[_i], disconnect);
      }
      return true;
    }
  }

  // import {fastdom, ready, $, $$, on} from '../../asset/js/util'
  var UiGuide = function UiGuide(options) {
    this._init(options);
  };
  UiGuide.util = util;
  UiGuide.data = 'uiComponents';
  UiGuide.prefixName = 'uiguide';
  UiGuide.prefix = "uiguide-";
  UiGuide.options = {};

  // globalAPI Start
  globalApi(UiGuide);
  // globalAPI End

  // hooksAPI, stateAPI Start
  initializeApi(UiGuide);
  // hooksAPI End

  // componentAPI Start
  componentCore(UiGuide);
  // componentAPI End

  // instanceAPI Start
  instanceApi(UiGuide);
  // instanceAPI End

  // boot Start
  setFramewrok(UiGuide);
  // boot End

  each(components, function (component, name) {
    return UiGuide.component();
  });

}));
//# sourceMappingURL=index.js.map
