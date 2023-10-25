(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
  typeof define === 'function' && define.amd ? define(['uikit-util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.GCui = factory(global.uikitUtil));
})(this, (function (uikitUtil) { 'use strict';

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
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
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
  function _readOnlyError(name) {
    throw new TypeError("\"" + name + "\" is read-only");
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
  function isObject$2(obj) {
    return obj !== null && _typeof(obj) === 'object';
  }
  var toString = objPrototype.toString;
  function isPlainObject(obj) {
    return toString.call(obj) === '[object Object]';
  }
  function isWindow(obj) {
    return isObject$2(obj) && obj === obj.window;
  }
  function isDocument$1(obj) {
    return nodeType(obj) === 9;
  }
  function isNode$1(obj) {
    return nodeType(obj) >= 1;
  }
  function isElement(obj) {
    return nodeType(obj) === 1;
  }
  function nodeType(obj) {
    return !isWindow(obj) && isObject$2(obj) && obj.nodeType;
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
    return !(isArray(obj) ? obj.length : isObject$2(obj) ? Object.keys(obj).length : false);
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
  var toArray$1 = Array.from || function (value) {
    return arrPrototype.slice.call(value);
  };
  function toNode$1(element) {
    return toNodes(element)[0];
  }
  function toNodes(element) {
    return element && (isNode$1(element) ? [element] : toArray$1(element).filter(isNode$1)) || [];
  }
  function toWindow(element) {
    if (isWindow(element)) {
      return element;
    }
    element = toNode$1(element);
    return element ? (isDocument$1(element) ? element : element.ownerDocument).defaultView : window;
  }
  function toMs$1(time) {
    return !time ? 0 : endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000;
  }
  function isEqual(value, other) {
    return value === other || isObject$2(value) && isObject$2(other) && Object.keys(value).length === Object.keys(other).length && each(value, function (val, key) {
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
  function sortBy$1(array, prop) {
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
    i = isNumeric(i) ? toNumber(i) : i === 'next' ? current + 1 : i === 'previous' ? current - 1 : elements.indexOf(toNode$1(i));
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
    if (isObject$2(name)) {
      for (var key in name) {
        attr(element, key, name[key]);
      }
      return;
    }
    if (isUndefined(value)) {
      element = toNode$1(element);
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
  function removeClasses$1(element, cls) {
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
        if (x !== null && isObject$2(x) && isFunction(then)) {
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
    element = toNode$1(element);
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
    return isString(selector) ? !!closest(element, selector) : toNode$1(selector).contains(toNode$1(element));
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
    element = toNode$1(element);
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
    return ref ? toNodes(element).indexOf(toNode$1(ref)) : children(parent(element)).indexOf(element);
  }

  function query(selector, context) {
    return find(selector, getContext(selector, context));
  }
  function queryAll(selector, context) {
    return findAll(selector, getContext(selector, context));
  }
  function getContext(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return isString(selector) && isContextSelector(selector) || isDocument$1(context) ? context : context.ownerDocument;
  }
  function find(selector, context) {
    return toNode$1(_query(selector, context, 'querySelector'));
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
    return isEventTarget(target) ? target : toNode$1(target);
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
    structure = toNode$1(before(element, structure));
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
    return isHtml(selector) ? toNode$1(fragment(selector)) : find(selector, context);
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
      } else if (isObject$2(property)) {
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
  function transition$1(element, props) {
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
    start: transition$1,
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
  function animate$1(element, animation) {
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
          removeClasses$1(element, "".concat(animationPrefix, "\\S*"));
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
    "in": animate$1,
    out: function out(element, animation, duration, origin) {
      return animate$1(element, animation, duration, origin, true);
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
    var rect = isElement(element) ? toNode$1(element).getBoundingClientRect() : {
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
    var _toNode = toNode$1(element),
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
    element = toNode$1(element);
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
        if (isDocument$1(element)) {
          var doc = element.documentElement;
          return Math.max(doc["offset".concat(propName)], doc["scroll".concat(propName)]);
        }
        element = toNode$1(element);
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
    return sortBy$1(concatStrat(parentVal, isFunction(childVal) ? {
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
  function scrollTop(element, top) {
    if (isWindow(element) || isDocument(element)) {
      element = getScrollingElement(element);
    } else {
      element = toNode(element);
    }
    element.scrollTop = top;
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
    removeClasses: removeClasses$1,
    replaceClass: replaceClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    test: test,
    transition: transition$1,
    Transition: Transition,
    animate: animate$1,
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
    isObject: isObject$2,
    isPlainObject: isPlainObject,
    isWindow: isWindow,
    isDocument: isDocument$1,
    isNode: isNode$1,
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
    toArray: toArray$1,
    toNode: toNode$1,
    toNodes: toNodes,
    toWindow: toWindow,
    toMs: toMs$1,
    isEqual: isEqual,
    swap: swap,
    assign: assign,
    last: last,
    each: each,
    sortBy: sortBy$1,
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
    scrollTop: scrollTop,
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

  var prefixStr = 'mui';
  var jsPrefix = prefixStr;
  var cssPrefix = "".concat(prefixStr, "_");

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
      element = element ? toNode$1(element) : document.body;
      parents(element).reverse().forEach(function (element) {
        return update$1(element[DATA], e);
      });
      apply(element, function (element) {
        return update$1(element[DATA], e);
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
  function update$1(data, e) {
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
      props = props || getProps$1(this.$options, this.$name);
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
  function getProps$1(opts, name) {
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
      value = props[key] === Boolean && value === '' ? true : coerce$1(props[key], value);
      if (prop === 'target' && (!value || startsWith(value, '_'))) {
        continue;
      }
      data$1[key] = value;
    }
    var options = parseOptions(data(el, name), args);
    for (var _key in options) {
      var _prop = camelize(_key);
      if (props[_prop] !== undefined) {
        data$1[_prop] = coerce$1(props[_prop], options[_key]);
      }
    }
    return data$1;
  }
  function notIn(options, key) {
    return options.every(function (arr) {
      return !arr || !hasOwn(arr, key);
    });
  }
  function coerce$1(type, value) {
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
          data[key] = props[key] ? coerce$1(props[key], data[key]) : data[key];
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
      var data = getProps$1($options, $name);
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

  var Class = {
    connected: function connected() {
      !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
    }
  };

  var Togglable = {
    props: {
      cls: Boolean,
      animation: 'list',
      duration: Number,
      origin: String,
      transition: String
    },
    data: {
      cls: false,
      animation: [false],
      duration: 300,
      origin: false,
      transition: 'linear',
      clsEnter: "".concat(cssPrefix, "togglabe-enter"),
      clsLeave: "".concat(cssPrefix, "togglabe-leave"),
      initProps: {
        overflow: '',
        height: '',
        paddingTop: '',
        paddingBottom: '',
        marginTop: '',
        marginBottom: ''
      },
      hideProps: {
        overflow: 'hidden',
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0
      }
    },
    computed: {
      hasAnimation: function hasAnimation(_ref) {
        var animation = _ref.animation;
        return !!animation[0];
      },
      hasTransition: function hasTransition(_ref2) {
        var animation = _ref2.animation;
        return this.hasAnimation && animation[0] === true;
      }
    },
    methods: {
      toggleElement: function toggleElement(targets, toggle, animate) {
        var _this = this;
        return new Promise$1(function (resolve) {
          return Promise$1.all(toNodes(targets).map(function (el) {
            var show = isBoolean(toggle) ? toggle : !_this.isToggled(el);
            if (!trigger(el, "before".concat(show ? 'show' : 'hide'), [_this])) {
              return Promise$1.reject();
            }
            var promise = (isFunction(animate) ? animate : animate === false || !_this.hasAnimation ? _this._toggle : _this.hasTransition ? toggleHeight(_this) : toggleAnimation(_this))(el, show, _this) || Promise$1.resolve();
            var cls = show ? _this.clsEnter : _this.clsLeave;
            addClass(el, cls);
            trigger(el, show ? 'show' : 'hide', [_this]);
            var done = function done() {
              removeClass(el, cls);
              trigger(el, show ? 'shown' : 'hidden', [_this]);
              _this.$update(el);
            };
            return promise ? promise.then(done, function () {
              removeClass(el, cls);
              return Promise$1.reject();
            }) : done();
          })).then(resolve, noop);
        });
      },
      isToggled: function isToggled() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
        var _toNodes = toNodes(el);
        var _toNodes2 = _slicedToArray(_toNodes, 1);
        el = _toNodes2[0];
        return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(' ')[0]) : isVisible(el);
      },
      _toggle: function _toggle(el, toggled) {
        if (!el) {
          return;
        }
        toggled = Boolean(toggled);
        var changed;
        if (this.cls) {
          changed = includes(this.cls, ' ') || toggled !== hasClass(el, this.cls);
          changed && toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
        } else {
          changed = toggled === el.hidden;
          changed && (el.hidden = !toggled);
        }
        $$('[autofocus]', el).some(function (el) {
          return isVisible(el) ? el.focus() || true : el.blur();
        });
        if (changed) {
          trigger(el, 'toggled', [toggled, this]);
          // this.$update(el);
        }
      }
    }
  };

  function toggleHeight(_ref3) {
    var isToggled = _ref3.isToggled,
      duration = _ref3.duration,
      initProps = _ref3.initProps,
      hideProps = _ref3.hideProps,
      transition = _ref3.transition,
      _toggle = _ref3._toggle;
    return function (el, show) {
      var inProgress = Transition.inProgress(el);
      var inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
      var currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;
      Transition.cancel(el);
      if (!isToggled(el)) {
        _toggle(el, true);
      }
      height(el, '');

      // Update child components first
      fastdom.flush();
      var endHeight = height(el) + (inProgress ? 0 : inner);
      height(el, currentHeight);
      return (show ? Transition.start(el, assign({}, initProps, {
        overflow: 'hidden',
        height: endHeight
      }), Math.round(duration * (1 - currentHeight / endHeight)), transition) : Transition.start(el, hideProps, Math.round(duration * (currentHeight / endHeight)), transition).then(function () {
        return _toggle(el, false);
      })).then(function () {
        return css(el, initProps);
      });
    };
  }
  function toggleAnimation(cmp) {
    return function (el, show) {
      Animation.cancel(el);
      var animation = cmp.animation,
        duration = cmp.duration,
        _toggle = cmp._toggle;
      if (show) {
        _toggle(el, true);
        return Animation["in"](el, animation[0], duration, cmp.origin);
      }
      return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(function () {
        return _toggle(el, false);
      });
    };
  }

  var accordion = {
    mixins: [Togglable],
    props: {
      targets: String,
      active: null,
      openText: String,
      closeText: String,
      collapsible: Boolean,
      multiple: Boolean,
      toggle: String,
      content: String,
      transition: String,
      offset: Number
    },
    data: {
      targets: '> *',
      active: false,
      animation: [true],
      collapsible: true,
      multiple: true,
      openText: "열기",
      closeText: "닫기",
      clsOpen: 'mui_open',
      toggle: ' .mui_acc_button',
      content: '> .mui_acc_content',
      transition: 'ease',
      duration: 500,
      offset: 0
    },
    computed: {
      items: {
        get: function get(_ref, $el) {
          var targets = _ref.targets;
          return $$(targets, $el);
        },
        watch: function watch(items, prev) {
          var _this = this;
          items.forEach(function (el) {
            return hide$1($$1(_this.content, el), !hasClass(el, _this.clsOpen));
          });
          if (prev || hasClass(items, this.clsOpen)) {
            return;
          }
          var active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
          if (active) {
            this.toggle(active, false);
          }
        },
        immediate: true
      },
      toggles: function toggles(_ref2) {
        var toggle = _ref2.toggle;
        return this.items.map(function (item) {
          return $$1(toggle, item);
        });
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return "".concat(this.targets, " ").concat(this.$props.toggle);
      },
      handler: function handler(e) {
        e.preventDefault();
        this.toggle(index(this.toggles, e.current));
      }
    }],
    methods: {
      toggle: function toggle(item, animate) {
        var _this2 = this;
        var items = [this.items[getIndex(item, this.items)]];
        var activeItems = filter(this.items, ".".concat(this.clsOpen));
        if (!this.multiple && !includes(activeItems, items[0])) {
          items = items.concat(activeItems);
        }
        if (!this.collapsible && activeItems.length < 2 && !filter(items, ":not(.".concat(this.clsOpen, ")")).length) {
          return;
        }
        items.forEach(function (el) {
          return _this2.toggleElement(el, !hasClass(el, _this2.clsOpen), function (el, show) {
            toggleClass(el, _this2.clsOpen, show);
            $$1(_this2.$props.toggle, el).innerHTML = show ? _this2.closeText : _this2.openText;
            attr($$1(_this2.$props.toggle, el), 'aria-expanded', show);
            var content = $$1("".concat(el._wrapper ? '> * ' : '').concat(_this2.content), el);
            if (animate === false || !_this2.hasTransition) {
              hide$1(content, !show);
              return;
            }
            if (!el._wrapper) {
              el._wrapper = wrapAll(content, "<div".concat(show ? ' hidden' : '', ">"));
            }
            hide$1(content, false);
            return toggleHeight(_this2)(el._wrapper, show).then(function () {
              hide$1(content, !show);
              delete el._wrapper;
              unwrap(content);
              if (show) {
                var toggle = $$1(_this2.$props.toggle, el);
                if (!isInView(toggle)) {
                  scrollIntoView(toggle, {
                    offset: _this2.offset
                  });
                }
              }
            });
          });
        });
      }
    }
  };
  function hide$1(el, hide) {
    el && (el.hidden = hide);
  }

  var Button = {
    mixins: [Togglable],
    props: {
      target: String,
      clsContainer: String,
      multiple: Boolean,
      isContainer: Boolean
    },
    data: {
      target: ".".concat(cssPrefix, "item"),
      clsActive: "".concat(cssPrefix, "active"),
      clsContainer: ".".concat(cssPrefix, "box"),
      isContainer: false,
      multiple: false
    },
    computed: {
      connects: {
        get: function get(_ref, $el) {
          var target = _ref.target,
            clsContainer = _ref.clsContainer,
            isContainer = _ref.isContainer;
          var el = isContainer ? clsContainer : target;
          return $$(el, $el);
        },
        watch: function watch(connects) {
          var n = this.index() < 0 ? 0 : this.index();
          this.toggle(connects[n]);
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
        e.preventDefault();
        this.toggle(e.current);
      }
    }],
    methods: {
      index: function index() {
        var _this = this;
        return findIndex(this.connects, function (el) {
          return hasClass(el, _this.clsActive);
        });
      },
      toggle: function toggle(target) {
        var _this2 = this;
        var item = this.isContainer ? closest(target, this.clsContainer) : target;
        var lists = [this.connects[getIndex(item, this.connects)]];
        var activeItem = filter(this.connects, ".".concat(this.clsActive));
        if (!this.multiple) {
          if (hasClass(item, this.clsActive)) return false;
          lists = lists.concat(activeItem);
        }
        lists.forEach(function (el) {
          return _this2.toggleElement(el, !hasClass(el, _this2.clsActive), function (el, show) {
            return toggleClass(el, _this2.clsActive, show);
          });
        });
      }
    }
  };

  var tab = {
    "extends": Button,
    props: {
      media: Boolean,
      boundary: Boolean,
      tabContents: String
    },
    data: {
      target: ">ul.".concat(cssPrefix, "tab_nav>*>:first-child"),
      clsContainer: ">ul.".concat(cssPrefix, "tab_nav>*"),
      tabContents: ">.tab_contents>div",
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

  var Lazyload = {
    data: {
      preload: 5
    },
    methods: {
      lazyload: function lazyload() {
        var _this = this;
        var observeTargets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
        var targets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$el;
        this.registerObserver(observeIntersection(observeTargets, function (entries, observer) {
          var _iterator = _createForOfIteratorHelper(toNodes(isFunction(targets) ? targets() : targets)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var el = _step.value;
              $$('[loading="lazy"]', el).slice(0, _this.preload - 1).forEach(function (el) {
                return removeAttr(el, 'loading');
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var _iterator2 = _createForOfIteratorHelper(entries.filter(function (_ref) {
              var isIntersecting = _ref.isIntersecting;
              return isIntersecting;
            }).map(function (_ref2) {
              var target = _ref2.target;
              return target;
            })),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _el = _step2.value;
              observer.unobserve(_el);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }));
      }
    }
  };

  var toggle = {
    mixins: [Lazyload, Togglable],
    props: {
      href: String,
      target: null,
      mode: 'list',
      queued: Boolean
    },
    data: {
      target: false,
      href: false,
      mode: 'click',
      queued: false,
      cont: ".".concat(cssPrefix, "toggle-cont"),
      activeClass: "".concat(cssPrefix, "active")
    },
    computed: {
      target: {
        get: function get(_ref, $el) {
          var href = _ref.href,
            target = _ref.target;
          target = queryAll(target || href, $el);
          return target.length && target || [$el];
        },
        watch: function watch() {
          this.updateAria();
          this.lazyload(this.$el, this.target);
        },
        document: true,
        immediate: true
      }
    },
    connected: function connected() {
      if (!includes(this.mode, 'media') && !isFocusable(this.$el)) {
        attr(this.$el, 'tabindex', '0');
      }
    },
    events: [{
      name: 'click',
      filter: function filter() {
        var _this = this;
        return ['click', 'hover'].some(function (mode) {
          return includes(_this.mode, mode);
        });
      },
      handler: function handler(e) {
        e.preventDefault();
        this.toggle();
      }
    }, {
      name: 'hide show',
      self: true,
      el: function el() {
        return this.target;
      },
      handler: function handler(_ref2) {
        var type = _ref2.type;
        this.updateAria(type === 'show');
      }
    }],
    methods: {
      toggle: function toggle(type) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var leaving, _iterator, _step, el, isLeaving, toggled;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (trigger(_this2.target, type || 'toggle', [_this2])) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  if (_this2.queued) {
                    _context.next = 4;
                    break;
                  }
                  return _context.abrupt("return", _this2.toggleElement(_this2.target));
                case 4:
                  leaving = _this2.target.filter(function (el) {
                    return hasClass(el, _this2.clsLeave);
                  });
                  if (!leaving.length) {
                    _context.next = 9;
                    break;
                  }
                  _iterator = _createForOfIteratorHelper(_this2.target);
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      el = _step.value;
                      isLeaving = includes(leaving, el);
                      _this2.toggleElement(el, isLeaving, isLeaving);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                  return _context.abrupt("return");
                case 9:
                  toggled = _this2.target.filter(_this2.isToggled);
                  _context.next = 12;
                  return _this2.toggleElement(toggled, false);
                case 12:
                  _context.next = 14;
                  return _this2.toggleElement(_this2.target.filter(function (el) {
                    return !includes(toggled, el);
                  }), true);
                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      updateAria: function updateAria(toggled) {
        var $el = this.$el,
          isToggled = this.isToggled,
          activeClass = this.activeClass,
          target = this.target;
        attr($el, 'aria-expanded', isBoolean(toggled) ? toggled : isToggled(target));
        toggleClass($el, activeClass, isToggled(target));
      }
    }
  };

  var Container = {
    props: {
      container: Boolean
    },
    data: {
      container: true
    },
    computed: {
      container: function container(_ref) {
        var container = _ref.container;
        return container === true && this.$container || container && $$1(container);
      }
    }
  };

  var Position = {
    props: {
      pos: String,
      offset: null,
      flip: Boolean,
      shift: Boolean,
      inset: Boolean
    },
    data: {
      pos: "bottom-".concat(isRtl ? 'right' : 'left'),
      offset: false,
      flip: true,
      shift: true,
      inset: false
    },
    connected: function connected() {
      this.pos = this.$props.pos.split('-').concat('center').slice(0, 2);
      var _this$pos = _slicedToArray(this.pos, 2);
      this.dir = _this$pos[0];
      this.align = _this$pos[1];
      this.axis = includes(['top', 'bottom'], this.dir) ? 'y' : 'x';
    },
    methods: {
      positionAt: function positionAt$1(element, target, boundary) {
        var offset = [this.getPositionOffset(element), this.getShiftOffset(element)];
        var placement = [this.flip && 'flip', this.shift && 'shift'];
        var attach = {
          element: [this.inset ? this.dir : flipPosition(this.dir), this.align],
          target: [this.dir, this.align]
        };
        if (this.axis === 'y') {
          for (var prop in attach) {
            attach[prop].reverse();
          }
          offset.reverse();
          placement.reverse();
        }
        var _scrollParents = scrollParents(element, /auto|scroll/),
          _scrollParents2 = _slicedToArray(_scrollParents, 1),
          scrollElement = _scrollParents2[0];
        scrollElement.scrollTop;
          scrollElement.scrollLeft;

        // Ensure none positioned element does not generate scrollbars
        var elDim = dimensions(element);
        css(element, {
          top: -elDim.height,
          left: -elDim.width
        });
        return positionAt(element, target, {
          attach: attach,
          offset: offset,
          boundary: boundary,
          placement: placement,
          viewportOffset: this.getViewportOffset(element)
        });
      },
      getPositionOffset: function getPositionOffset(element) {
        return toPx(this.offset === false ? css(element, '--mui-position-offset') : this.offset, this.axis === 'x' ? 'width' : 'height', element) * (includes(['left', 'top'], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
      },
      getShiftOffset: function getShiftOffset(element) {
        return this.align === 'center' ? 0 : toPx(css(element, '--mui-position-shift-offset'), this.axis === 'y' ? 'width' : 'height', element) * (includes(['left', 'top'], this.align) ? 1 : -1);
      },
      getViewportOffset: function getViewportOffset(element) {
        return toPx(css(element, '--mui-position-viewport-offset'));
      }
    }
  };

  var _events;
  var tooltip = {
    mixins: [Container, Togglable, Position],
    props: {
      text: String
    },
    data: {
      text: '',
      delay: 0,
      offset: 4,
      pos: 'bottom-left',
      animation: ['mui-animation-tooltip'],
      duration: 200,
      cls: 'mui_active'
    },
    connected: function connected() {
      // console.log(this.text);
    },
    events: (_events = {
      focus: 'show',
      blur: 'hide'
    }, _defineProperty(_events, "".concat(pointerEnter, " ").concat(pointerLeave), function _(e) {
      if (!isTouch(e)) {
        this[e.type === pointerEnter ? 'show' : 'hide']();
      }
    }), _defineProperty(_events, pointerDown, function (e) {
      if (isTouch(e)) {
        this.show();
      }
    }), _events),
    methods: {
      show: function show() {
        var _this = this;
        if (this.isToggled(this.tooltip || null) || !this.text) {
          return;
        }
        this._unbind = once(document, "show keydown ".concat(pointerDown), this.hide, false, function (e) {
          return e.type === pointerDown && !within(e.target, _this.$el) || e.type === 'keydown' && e.keyCode === 27 || e.type === 'show' && e.detail[0] !== _this && e.detail[0].$name === _this.$name;
        });
        clearTimeout(this.showTimer);
        this.showTimer = setTimeout(this._show, this.delay);
      },
      _show: function _show() {
        var _this2 = this;
        this.tooltip = append(this.container, "<div class=\"mui_".concat(this.$options.name, "_content\">\n                    <div class=\"mui_arrow\"></div>\n                    <div class=\"mui_").concat(this.$options.name, "_inner\"><span class=\"text\">").concat(this.text, "</div>\n                 </div>"));
        on(this.tooltip, 'toggled', function (e, toggled) {
          if (!toggled) {
            return;
          }
          var position = _this2.positionAt(_this2.tooltip, _this2.$el);
          if (!!(position !== null && position !== void 0 && position.cale)) {
            // console.log($('.mui_arrow', this.tooltip));
            console.log(position.cale);
            css($$1('.mui_arrow', _this2.tooltip), 'transform', "translateX(".concat(position.cale * -1, "px)"));
          }
          var _getAlignment = getAlignment(_this2.tooltip, _this2.$el, _this2.pos),
            _getAlignment2 = _slicedToArray(_getAlignment, 2),
            dir = _getAlignment2[0],
            align = _getAlignment2[1];
          _this2.origin = _this2.axis === 'y' ? "".concat(flipPosition(dir), "-").concat(align) : "".concat(align, "-").concat(flipPosition(dir));
        });
        this.toggleElement(this.tooltip, true);
      },
      hide: function hide() {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!matches(_this3.$el, 'input:focus')) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  clearTimeout(_this3.showTimer);
                  if (_this3.isToggled(_this3.tooltip || null)) {
                    _context.next = 5;
                    break;
                  }
                  return _context.abrupt("return");
                case 5:
                  _context.next = 7;
                  return _this3.toggleElement(_this3.tooltip, false, false);
                case 7:
                  remove$1(_this3.tooltip);
                  _this3.tooltip = null;
                  _this3._unbind();
                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    }
  };
  function getAlignment(el, target, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      dir = _ref2[0],
      align = _ref2[1];
    var elOffset = offset(el);
    var targetOffset = offset(target);
    var properties = [['left', 'right'], ['top', 'bottom']];
    for (var _i = 0, _properties = properties; _i < _properties.length; _i++) {
      var _props = _properties[_i];
      if (elOffset[_props[0]] >= targetOffset[_props[1]]) {
        dir = _props[1];
        break;
      }
      if (elOffset[_props[1]] <= targetOffset[_props[0]]) {
        dir = _props[0];
        break;
      }
    }
    var props = includes(properties[0], dir) ? properties[1] : properties[0];
    if (elOffset[props[0]] === targetOffset[props[0]]) {
      align = props[0];
    } else if (elOffset[props[1]] === targetOffset[props[1]]) {
      align = props[1];
    } else {
      align = 'center';
    }
    return [dir, align];
  }

  var formatter = {
    props: {
      numeric: Boolean,
      prefix: String,
      uppercase: Boolean,
      lowercase: Boolean,
      tailPrefix: Boolean,
      delimiter: String,
      blocks: String,
      dateForm: Boolean,
      viewMaxLength: Boolean
    },
    data: {
      numeric: false,
      numericOnly: false,
      dateForm: false,
      prefix: "",
      uppercase: false,
      lowercase: false,
      tailPrefix: false,
      viewMaxLength: false,
      delimiter: "",
      delimiters: [],
      datePattern: ['yyyy', 'mm', 'dd'],
      delimiterLazyShow: false,
      isBackward: null,
      lastInputValue: "",
      postDelimiterBackspace: false,
      blocks: [],
      template: "<span class=\"mui_maxlength\">\n      (<span class=\"current\"></span> /\n      <span class=\"maximun\"></span> )\n    </span>"
    },
    computed: {
      blocks: function blocks(_ref) {
        var dateForm = _ref.dateForm,
          datePattern = _ref.datePattern,
          blocks = _ref.blocks;
        if (dateForm && datePattern) {
          return datePattern.reduce(function (block, len) {
            block.push(len.length);
            return block;
          }, []);
        }
        return isString(blocks) ? toArray(blocks, "|") : blocks;
      }
    },
    connected: function connected() {
      var $el = this.$el,
        numeric = this.numeric,
        dateForm = this.dateForm,
        datePattern = this.datePattern,
        blocks = this.blocks;
      $el.rawValue = $el.value;
      this.lastValue = "";
      if (dateForm || numeric) this.numericOnly = true;
      if (dateForm && datePattern) {
        this.delimiter = '-';
      }
      if (numeric && this.delimiter === "") {
        this.delimiter = ",";
      }
      if (this.viewMaxLength) {
        this.Maxlengthel = after(this.$el, this.template);
        this.MaxlengthCurrent = $$1('.current', this.Maxlengthel);
        this.MaxlengthCurrent.innerHTML = $el.value.length;
        this.MaxlengthMaximun = $$1('.maximun', this.Maxlengthel);
        this.MaxlengthMaximun.innerHTML = $el.maxLength;
      }
      this.maxlength = getMaxlength(blocks);
      this.formatter(this.$el.rawValue);
    },
    destory: function destory() {
      console.log('destory');
    },
    events: [{
      name: 'input',
      handler: function handler(e) {
        this.isBackward = this.isBackward || e.inputType === 'deleteContentBackward';
        var postDelimiter = getPostDelimiter(this.lastInputValue, this.delimiter, this.delimiters);
        if (this.isBackward && postDelimiter) {
          this.postDelimiterBackspace = postDelimiter;
        } else {
          this.postDelimiterBackspace = false;
        }
        this.formatter(e);
      }
    }, {
      name: 'keydown',
      handler: function handler(e) {
        this.lastInputValue = this.$el.value;
        this.isBackward = e.keyCode === 8;
      }
    }],
    methods: {
      formatter: function formatter() {
        var $el = this.$el,
          numeric = this.numeric,
          uppercase = this.uppercase,
          lowercase = this.lowercase,
          dateForm = this.dateForm,
          isBackward = this.isBackward,
          datePattern = this.datePattern,
          blocks = this.blocks,
          delimiter = this.delimiter,
          maxlength = this.maxlength,
          delimiters = this.delimiters,
          delimiterLazyShow = this.delimiterLazyShow,
          numericOnly = this.numericOnly,
          postDelimiterBackspace = this.postDelimiterBackspace,
          viewMaxLength = this.viewMaxLength;
        var value = $el.value;
        if (isBackward && postDelimiterBackspace) {
          value = headStr(value, value.length - postDelimiterBackspace.length);
        }
        if (numericOnly) value = numberOnly(value);
        $el.rawValue = getRawValue(value, delimiter, delimiters, maxlength);
        if (!numeric && !uppercase && !lowercase && !dateForm && !!!blocks.length && !viewMaxLength) return;
        if (numeric) {
          $el.rawValue = numerFormat($el.rawValue, delimiter);
        }
        if (dateForm) {
          $el.rawValue = dateFormat($el.rawValue, datePattern);
        }
        if (uppercase) {
          $el.rawValue = uppercaseFormat($el.rawValue);
        }
        if (lowercase) {
          $el.rawValue = lowercaseFormat($el.rawValue);
        }
        this.lastValue = getFormattedValue($el.rawValue, blocks, delimiter, delimiters, delimiterLazyShow);
        this.updateValueState();
      },
      updateValueState: function updateValueState() {
        var $el = this.$el,
          lastValue = this.lastValue,
          delimiter = this.delimiter,
          delimiters = this.delimiters,
          viewMaxLength = this.viewMaxLength;
        var cursorPos = $el.selectionEnd;
        cursorPos = getNextCursorPosition(cursorPos, $el.value, lastValue, delimiter, delimiters);
        if (isAndroid) {
          window.setTimeout(function () {
            $el.value = lastValue;
            setSelection($el, cursorPos, document);
          }, 1);
          return;
        }
        $el.value = lastValue;
        if (viewMaxLength) {
          this.MaxlengthCurrent.innerHTML = lastValue.length;
        }
        setSelection($el, cursorPos, document);
      }
    }
  };
  function toArray(str, dvd) {
    var result = [];
    str.split(dvd).forEach(function (n) {
      result.push(toNumber(n));
    });
    return result;
  }

  var prevented;
  function preventBackgroundScroll(el) {
    // 'overscroll-behavior: contain' only works consistently if el overflows (Safari)
    var off = on(el, 'touchmove', function (e) {
      if (e.targetTouches.length !== 1) {
        return;
      }
      var _scrollParents = scrollParents(e.target),
        _scrollParents2 = _slicedToArray(_scrollParents, 1),
        _scrollParents2$ = _scrollParents2[0],
        scrollHeight = _scrollParents2$.scrollHeight,
        clientHeight = _scrollParents2$.clientHeight;
      if (clientHeight >= scrollHeight && e.cancelable) {
        e.preventDefault();
      }
    }, {
      passive: false
    });
    if (prevented) {
      return off;
    }
    prevented = true;
    var _document = document,
      scrollingElement = _document.scrollingElement;
    css(scrollingElement, {
      overflowY: CSS.supports('overflow', 'clip') ? 'clip' : 'hidden',
      touchAction: 'none',
      paddingRight: width(window) - scrollingElement.clientWidth || ''
    });
    return function () {
      prevented = false;
      off();
      css(scrollingElement, {
        overflowY: '',
        touchAction: '',
        paddingRight: ''
      });
    };
  }
  function isSameSiteAnchor(el) {
    return ['origin', 'pathname', 'search'].every(function (part) {
      return el[part] === location[part];
    });
  }

  var active = [];
  var Modal = {
    mixins: [Class, Container, Togglable],
    props: {
      selPanel: String,
      selClose: String,
      escClose: Boolean,
      bgClose: Boolean,
      stack: Boolean,
      role: String,
      layerd: Boolean
    },
    data: {
      cls: 'mui_open',
      escClose: true,
      bgClose: true,
      overlay: true,
      stack: false,
      role: 'dialog',
      returnFocusTarget: null,
      layerd: true
    },
    computed: {
      panel: function panel(_ref, $el) {
        var selPanel = _ref.selPanel;
        return $$1(selPanel, $el);
      },
      transitionElement: function transitionElement() {
        return this.panel;
      },
      bgClose: function bgClose(_ref2) {
        var bgClose = _ref2.bgClose;
        return bgClose && this.panel;
      }
    },
    connected: function connected() {
      attr(this.panel || this.$el, 'role', this.role);
      if (this.overlay) {
        attr(this.panel || this.$el, 'aria-modal', true);
      }
    },
    beforeDisconnect: function beforeDisconnect() {
      if (includes(active, this)) {
        this.toggleElement(this.$el, false, false);
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return "".concat(this.selClose, ",a[href*=\"#\"]");
      },
      handler: function handler(e) {
        var current = e.current,
          defaultPrevented = e.defaultPrevented;
        var hash = current.hash;
        if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, this.$el) && $$1(hash, document.body)) {
          this.hide();
        } else if (matches(current, this.selClose)) {
          e.preventDefault();
          this.hide();
        }
      }
    }, {
      name: 'toggle',
      self: true,
      handler: function handler(e) {
        if (e.defaultPrevented) {
          return;
        }
        e.preventDefault();
        if (this.isToggled() === includes(active, this)) {
          this.returnFocusTarget = e.detail[0].$el;
          this.toggle();
        }
      }
    }, {
      name: 'beforeshow',
      self: true,
      handler: function handler(e) {
        if (includes(active, this)) {
          return false;
        }
        if (!this.stack && active.length) {
          if (this.layerd) {
            active.push(this);
            return false;
          }
          Promise.all(active.map(function (modal) {
            return modal.hide();
          })).then(this.show);
          e.preventDefault();
        } else {
          active.push(this);
        }
      }
    }, {
      name: 'show',
      self: true,
      handler: function handler() {
        if (this.stack) {
          css(this.$el, 'zIndex', toFloat(css(this.$el, 'zIndex')) + active.length);
        }
        var handlers = [this.overlay && preventBackgroundFocus(this), this.overlay && preventBackgroundScroll(this.$el), this.bgClose && listenForBackgroundClose(this), this.escClose && listenForEscClose(this)];
        once(this.$el, 'hidden', function () {
          return handlers.forEach(function (handler) {
            return handler && handler();
          });
        }, {
          self: true
        });
        addClass(document.documentElement, this.clsPage);
      }
    }, {
      name: 'shown',
      self: true,
      handler: function handler() {
        var _this = this;
        if (!isFocusable(this.$el)) {
          attr(this.$el, 'tabindex', '-1');
        }
        active.forEach(function (arr, i) {
          return arr.$el !== _this.$el ? attr(arr.$el, 'tabindex', '') : '';
        });
        if (!matches(this.$el, ':focus-within') || this.layerd) {
          this.$el.focus();
        }
      }
    }, {
      name: 'hidden',
      self: true,
      handler: function handler() {
        var _this2 = this;
        if (includes(active, this)) {
          active.splice(active.indexOf(this), 1);
        }
        css(this.$el, 'zIndex', '');
        if (!active.some(function (modal) {
          return modal.clsPage === _this2.clsPage;
        })) {
          removeClass(document.documentElement, this.clsPage);
        }
        active.forEach(function (arr, i) {
          if (arr.$el !== _this2.$el) {
            arr.$el.focus();
            attr(arr.$el, 'tabindex', '-1');
          }
        });
      }
    }],
    methods: {
      toggle: function toggle() {
        return this.isToggled() ? this.hide() : this.show();
      },
      show: function show() {
        var _this3 = this;
        if (this.container && parent(this.$el) !== this.container) {
          append(this.container, this.$el);
          return new Promise(function (resolve) {
            return requestAnimationFrame(function () {
              return _this3.show().then(resolve);
            });
          });
        }
        return this.toggleElement(this.$el, true, animate);
      },
      hide: function hide() {
        return this.toggleElement(this.$el, false, animate);
      }
    }
  };
  function animate(el, show, self) {
    var transitionElement = self.transitionElement,
      _toggle = self._toggle;
    return new Promise(function (resolve, reject) {
      return once(el, 'show hide', function () {
        var _el$_reject;
        (_el$_reject = el._reject) === null || _el$_reject === void 0 ? void 0 : _el$_reject.call(el);
        el._reject = reject;
        _toggle(el, show);
        var off = once(transitionElement, 'transitionstart', function () {
          once(transitionElement, 'transitionend transitioncancel', resolve, {
            self: true
          });
          clearTimeout(timer);
        }, {
          self: true
        });
        var timer = setTimeout(function () {
          off();
          resolve();
        }, toMs(css(transitionElement, 'transitionDuration')));
      });
    }).then(function () {
      if (!show && !!self.returnFocusTarget) {
        setTimeout(function () {
          self.returnFocusTarget.focus();
        }, 0);
      }
      return delete el._reject;
    });
  }
  function toMs(time) {
    return time ? endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000 : 0;
  }
  function preventBackgroundFocus(modal) {
    return on(document, 'focusin', function (e) {
      if (last(active) === modal && !within(e.target, modal.$el)) {
        modal.$el.focus();
      }
    });
  }
  function listenForBackgroundClose(modal) {
    return on(document, pointerDown, function (_ref3) {
      var target = _ref3.target;
      if (last(active) !== modal || modal.overlay && !within(target, modal.$el) || within(target, modal.panel)) {
        return;
      }
      once(document, "".concat(pointerUp, " ").concat(pointerCancel, " scroll"), function (_ref4) {
        var defaultPrevented = _ref4.defaultPrevented,
          type = _ref4.type,
          newTarget = _ref4.target;
        if (!defaultPrevented && type === pointerUp && target === newTarget) {
          modal.hide();
        }
      }, true);
    });
  }
  function listenForEscClose(modal) {
    return on(document, 'keydown', function (e) {
      if (e.keyCode === 27 && last(active) === modal) {
        modal.hide();
      }
    });
  }

  var modal = {
    install: install,
    mixins: [Modal],
    data: {
      clsPage: 'mui_modal_page',
      selPanel: '.mui_modal_dialog',
      selClose: '.mui_modal_close, .mui_modal_close_default, .mui_modal_close_outside, .mui_modal_close_full'
    },
    events: [{
      name: 'show',
      self: true,
      handler: function handler() {
        if (hasClass(this.panel, 'mui_auto_vertical')) {
          addClass(this.$el, 'mui_flex');
        } else {
          css(this.$el, 'display', 'block');
        }
        height(this.$el); // force reflow
      }
    }, {
      name: 'hidden',
      self: true,
      handler: function handler() {
        css(this.$el, 'display', '');
        removeClass(this.$el, 'mui_flex');
      }
    }]
  };
  function install(_ref) {
    var modal = _ref.modal;
    modal.dialog = function (content, options) {
      var dialog = modal("<div class=\"mui_modal system_pop".concat(!!(options !== null && options !== void 0 && options.closeBtn) ? " close_btn" : "").concat(!!(options !== null && options !== void 0 && options.className) ? " ".concat(options.className) : "", "\">\n                <div class=\"mui_modal_dialog mui_auto_vertical\">\n                    <div class=\"mui_modal_body\">").concat(content, "</div>\n                </div>\n             </div>"), options);
      dialog.show();
      on(dialog.$el, 'hidden', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.resolve();
              case 2:
                dialog.$destroy(true);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), {
        self: true
      });
      return dialog;
    };
    modal.alert = function (message, options) {
      return openDialog(function (_ref3) {
        var i18n = _ref3.i18n;
        return "\n            ".concat(!!message.title ? "<div class=\"mui_modal_header\">".concat(isString(message.title) ? message.title : html(message.title), "</div>") : "", "\n            <div class=\"mui_modal_content\">").concat(isString(message.text) ? message.text : html(message.text), "</div>\n            <div class=\"mui_modal_footer\">\n                <button class=\"mui_button mui_modal_close\" autofocus><span>").concat(message.ok ? message.ok : i18n.ok, "</span></button>\n            </div>\n            ").concat(!!(options !== null && options !== void 0 && options.closeBtn) ? "<button class=\"mui_modal_close\">닫기</button>" : "", "\n            ");
      }, options, function (deferred) {
        return deferred.resolve();
      });
    };
    modal.confirm = function (message, options) {
      return openDialog(function (_ref4) {
        var i18n = _ref4.i18n;
        return "<form>\n                ".concat(!!message.title ? "<div class=\"mui_modal_header\">".concat(isString(message.title) ? message.title : html(message.title), "</div>") : "", "\n                <div class=\"mui_modal_content\">").concat(isString(message.text) ? message.text : html(message.text), "</div>\n                <div class=\"mui_modal_footer confirm\">\n                    <button class=\"mui_button mui_modal_close\" type=\"button\"><span>").concat(message.cancel ? message.cancel : i18n.cancel, "</span></button>\n                    <button class=\"mui_button\" autofocus><span>").concat(message.ok ? message.ok : i18n.ok, "</span></button>\n                </div>\n                ").concat(!!(options !== null && options !== void 0 && options.closeBtn) ? "<button class=\"mui_modal_close\">닫기</button>" : "", "\n            </form>");
      }, options, function (deferred) {
        return deferred.reject();
      });
    };
    modal.i18n = {
      ok: '확인',
      cancel: '취소'
    };
    function openDialog(tmpl, options, hideFn, submitFn) {
      options = _objectSpread2({
        bgClose: true,
        escClose: true,
        role: 'alertdialog',
        i18n: modal.i18n,
        layerd: true
      }, options);
      var dialog = modal.dialog(tmpl(options), options);
      var deferred = new Deferred();
      var resolved = false;
      on(dialog.$el, 'submit', 'form', function (e) {
        e.preventDefault();
        deferred.resolve(submitFn === null || submitFn === void 0 ? void 0 : submitFn(dialog));
        resolved = true;
        dialog.hide();
      });
      on(dialog.$el, 'hide', function () {
        return !resolved && hideFn(deferred);
      });
      deferred.promise.dialog = dialog;
      return deferred.promise;
    }
  }

  /**
   * Swiper 9.2.0
   * Most modern mobile touch slider and framework with hardware accelerated transitions
   * https://swiperjs.com
   *
   * Copyright 2014-2023 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: March 31, 2023
   */

  function isObject$1(e) {
    return null !== e && "object" == _typeof(e) && "constructor" in e && e.constructor === Object;
  }
  function extend$1(e, t) {
    void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach(function (s) {
      void 0 === e[s] ? e[s] = t[s] : isObject$1(t[s]) && isObject$1(e[s]) && Object.keys(t[s]).length > 0 && extend$1(e[s], t[s]);
    });
  }
  var ssrDocument = {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: ""
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {}
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS: function createElementNS() {
      return {};
    },
    importNode: function importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  function getDocument() {
    var e = "undefined" != typeof document ? document : {};
    return extend$1(e, ssrDocument), e;
  }
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState: function replaceState() {},
      pushState: function pushState() {},
      go: function go() {},
      back: function back() {}
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return "";
        }
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
    matchMedia: function matchMedia() {
      return {};
    },
    requestAnimationFrame: function requestAnimationFrame(e) {
      return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0);
    },
    cancelAnimationFrame: function cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    }
  };
  function getWindow() {
    var e = "undefined" != typeof window ? window : {};
    return extend$1(e, ssrWindow), e;
  }
  function deleteProps(e) {
    var t = e;
    Object.keys(t).forEach(function (e) {
      try {
        t[e] = null;
      } catch (e) {}
      try {
        delete t[e];
      } catch (e) {}
    });
  }
  function nextTick(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle$1(e) {
    var t = getWindow();
    var s;
    return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s;
  }
  function getTranslate(e, t) {
    void 0 === t && (t = "x");
    var s = getWindow();
    var a, i, r;
    var n = getComputedStyle$1(e);
    return s.WebKitCSSMatrix ? (i = n.transform || n.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map(function (e) {
      return e.replace(",", ".");
    }).join(", ")), r = new s.WebKitCSSMatrix("none" === i ? "" : i)) : (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), a = r.toString().split(",")), "x" === t && (i = s.WebKitCSSMatrix ? r.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = s.WebKitCSSMatrix ? r.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0;
  }
  function isObject(e) {
    return "object" == _typeof(e) && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
  }
  function isNode(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function extend() {
    var e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (var s = 1; s < arguments.length; s += 1) {
      var a = s < 0 || arguments.length <= s ? void 0 : arguments[s];
      if (null != a && !isNode(a)) {
        var _s = Object.keys(Object(a)).filter(function (e) {
          return t.indexOf(e) < 0;
        });
        for (var _t = 0, i = _s.length; _t < i; _t += 1) {
          var _i = _s[_t],
            r = Object.getOwnPropertyDescriptor(a, _i);
          void 0 !== r && r.enumerable && (isObject(e[_i]) && isObject(a[_i]) ? a[_i].__swiper__ ? e[_i] = a[_i] : extend(e[_i], a[_i]) : !isObject(e[_i]) && isObject(a[_i]) ? (e[_i] = {}, a[_i].__swiper__ ? e[_i] = a[_i] : extend(e[_i], a[_i])) : e[_i] = a[_i]);
        }
      }
    }
    return e;
  }
  function setCSSProperty(e, t, s) {
    e.style.setProperty(t, s);
  }
  function animateCSSModeScroll(e) {
    var t = e.swiper,
      s = e.targetPosition,
      a = e.side;
    var i = getWindow(),
      r = -t.translate;
    var n,
      l = null;
    var o = t.params.speed;
    t.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(t.cssModeFrameID);
    var d = s > r ? "next" : "prev",
      c = function c(e, t) {
        return "next" === d && e >= t || "prev" === d && e <= t;
      },
      p = function p() {
        n = new Date().getTime(), null === l && (l = n);
        var e = Math.max(Math.min((n - l) / o, 1), 0),
          d = .5 - Math.cos(e * Math.PI) / 2;
        var u = r + d * (s - r);
        if (c(u, s) && (u = s), t.wrapperEl.scrollTo(_defineProperty({}, a, u)), c(u, s)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout(function () {
          t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo(_defineProperty({}, a, u));
        }), void i.cancelAnimationFrame(t.cssModeFrameID);
        t.cssModeFrameID = i.requestAnimationFrame(p);
      };
    p();
  }
  function getSlideTransformEl(e) {
    return e.querySelector(".swiper-slide-transform") || e.shadowEl && e.shadowEl.querySelector(".swiper-slide-transform") || e;
  }
  function elementChildren(e, t) {
    return void 0 === t && (t = ""), _toConsumableArray(e.children).filter(function (e) {
      return e.matches(t);
    });
  }
  function createElement(e, t) {
    var _s$classList;
    void 0 === t && (t = []);
    var s = document.createElement(e);
    return (_s$classList = s.classList).add.apply(_s$classList, _toConsumableArray(Array.isArray(t) ? t : [t])), s;
  }
  function elementOffset(e) {
    var t = getWindow(),
      s = getDocument(),
      a = e.getBoundingClientRect(),
      i = s.body,
      r = e.clientTop || i.clientTop || 0,
      n = e.clientLeft || i.clientLeft || 0,
      l = e === t ? t.scrollY : e.scrollTop,
      o = e === t ? t.scrollX : e.scrollLeft;
    return {
      top: a.top + l - r,
      left: a.left + o - n
    };
  }
  function elementPrevAll(e, t) {
    var s = [];
    for (; e.previousElementSibling;) {
      var a = e.previousElementSibling;
      t ? a.matches(t) && s.push(a) : s.push(a), e = a;
    }
    return s;
  }
  function elementNextAll(e, t) {
    var s = [];
    for (; e.nextElementSibling;) {
      var a = e.nextElementSibling;
      t ? a.matches(t) && s.push(a) : s.push(a), e = a;
    }
    return s;
  }
  function elementStyle(e, t) {
    return getWindow().getComputedStyle(e, null).getPropertyValue(t);
  }
  function elementIndex(e) {
    var t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling);) {
        1 === s.nodeType && (t += 1);
      }
      return t;
    }
  }
  function elementParents(e, t) {
    var s = [];
    var a = e.parentElement;
    for (; a;) {
      t ? a.matches(t) && s.push(a) : s.push(a), a = a.parentElement;
    }
    return s;
  }
  function elementTransitionEnd(e, t) {
    t && e.addEventListener("transitionend", function s(a) {
      a.target === e && (t.call(e, a), e.removeEventListener("transitionend", s));
    });
  }
  function elementOuterSize(e, t, s) {
    var a = getWindow();
    return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(a.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(a.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth;
  }
  var support, deviceCached, browser;
  function calcSupport() {
    var e = getWindow(),
      t = getDocument();
    return {
      smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
      touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
    };
  }
  function getSupport() {
    return support || (support = calcSupport()), support;
  }
  function calcDevice(e) {
    var _ref = void 0 === e ? {} : e,
      t = _ref.userAgent;
    var s = getSupport(),
      a = getWindow(),
      i = a.navigator.platform,
      r = t || a.navigator.userAgent,
      n = {
        ios: !1,
        android: !1
      },
      l = a.screen.width,
      o = a.screen.height,
      d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
    var c = r.match(/(iPad).*OS\s([\d_]+)/);
    var p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
      u = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
      m = "Win32" === i;
    var f = "MacIntel" === i;
    return !c && f && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf("".concat(l, "x").concat(o)) >= 0 && (c = r.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), f = !1), d && !m && (n.os = "android", n.android = !0), (c || u || p) && (n.os = "ios", n.ios = !0), n;
  }
  function getDevice(e) {
    return void 0 === e && (e = {}), deviceCached || (deviceCached = calcDevice(e)), deviceCached;
  }
  function calcBrowser() {
    var e = getWindow();
    var t = !1;
    function s() {
      var t = e.navigator.userAgent.toLowerCase();
      return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
    }
    if (s()) {
      var _s2 = String(e.navigator.userAgent);
      if (_s2.includes("Version/")) {
        var _s2$split$1$split$0$s = _s2.split("Version/")[1].split(" ")[0].split(".").map(function (e) {
            return Number(e);
          }),
          _s2$split$1$split$0$s2 = _slicedToArray(_s2$split$1$split$0$s, 2),
          _e = _s2$split$1$split$0$s2[0],
          a = _s2$split$1$split$0$s2[1];
        t = _e < 16 || 16 === _e && a < 2;
      }
    }
    return {
      isSafari: t || s(),
      needPerspectiveFix: t,
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
    };
  }
  function getBrowser() {
    return browser || (browser = calcBrowser()), browser;
  }
  function Resize$1(e) {
    var t = e.swiper,
      s = e.on,
      a = e.emit;
    var i = getWindow();
    var r = null,
      n = null;
    var l = function l() {
        t && !t.destroyed && t.initialized && (a("beforeResize"), a("resize"));
      },
      o = function o() {
        t && !t.destroyed && t.initialized && a("orientationchange");
      };
    s("init", function () {
      t.params.resizeObserver && void 0 !== i.ResizeObserver ? t && !t.destroyed && t.initialized && (r = new ResizeObserver(function (e) {
        n = i.requestAnimationFrame(function () {
          var s = t.width,
            a = t.height;
          var i = s,
            r = a;
          e.forEach(function (e) {
            var s = e.contentBoxSize,
              a = e.contentRect,
              n = e.target;
            n && n !== t.el || (i = a ? a.width : (s[0] || s).inlineSize, r = a ? a.height : (s[0] || s).blockSize);
          }), i === s && r === a || l();
        });
      }), r.observe(t.el)) : (i.addEventListener("resize", l), i.addEventListener("orientationchange", o));
    }), s("destroy", function () {
      n && i.cancelAnimationFrame(n), r && r.unobserve && t.el && (r.unobserve(t.el), r = null), i.removeEventListener("resize", l), i.removeEventListener("orientationchange", o);
    });
  }
  function Observer(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on,
      i = e.emit;
    var r = [],
      n = getWindow(),
      l = function l(e, s) {
        void 0 === s && (s = {});
        var a = new (n.MutationObserver || n.WebkitMutationObserver)(function (e) {
          if (t.__preventObserver__) return;
          if (1 === e.length) return void i("observerUpdate", e[0]);
          var s = function s() {
            i("observerUpdate", e[0]);
          };
          n.requestAnimationFrame ? n.requestAnimationFrame(s) : n.setTimeout(s, 0);
        });
        a.observe(e, {
          attributes: void 0 === s.attributes || s.attributes,
          childList: void 0 === s.childList || s.childList,
          characterData: void 0 === s.characterData || s.characterData
        }), r.push(a);
      };
    s({
      observer: !1,
      observeParents: !1,
      observeSlideChildren: !1
    }), a("init", function () {
      if (t.params.observer) {
        if (t.params.observeParents) {
          var _e2 = elementParents(t.el);
          for (var _t2 = 0; _t2 < _e2.length; _t2 += 1) {
            l(_e2[_t2]);
          }
        }
        l(t.el, {
          childList: t.params.observeSlideChildren
        }), l(t.wrapperEl, {
          attributes: !1
        });
      }
    }), a("destroy", function () {
      r.forEach(function (e) {
        e.disconnect();
      }), r.splice(0, r.length);
    });
  }
  var eventsEmitter = {
    on: function on(e, t, s) {
      var a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ("function" != typeof t) return a;
      var i = s ? "unshift" : "push";
      return e.split(" ").forEach(function (e) {
        a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][i](t);
      }), a;
    },
    once: function once(e, t, s) {
      var a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ("function" != typeof t) return a;
      function i() {
        a.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
        for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++) {
          r[n] = arguments[n];
        }
        t.apply(a, r);
      }
      return i.__emitterProxy = t, a.on(e, i, s);
    },
    onAny: function onAny(e, t) {
      var s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      var a = t ? "unshift" : "push";
      return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s;
    },
    offAny: function offAny(e) {
      var t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      var s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off: function off(e, t) {
      var s = this;
      return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach(function (e) {
        void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(function (a, i) {
          (a === t || a.__emitterProxy && a.__emitterProxy === t) && s.eventsListeners[e].splice(i, 1);
        });
      }), s) : s;
    },
    emit: function emit() {
      var e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      var t, s, a;
      for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++) {
        r[n] = arguments[n];
      }
      "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0], s = r.slice(1, r.length), a = e) : (t = r[0].events, s = r[0].data, a = r[0].context || e), s.unshift(a);
      return (Array.isArray(t) ? t : t.split(" ")).forEach(function (t) {
        e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach(function (e) {
          e.apply(a, [t].concat(_toConsumableArray(s)));
        }), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach(function (e) {
          e.apply(a, s);
        });
      }), e;
    }
  };
  function updateSize() {
    var e = this;
    var t, s;
    var a = e.el;
    t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : a.clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : a.clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(elementStyle(a, "padding-left") || 0, 10) - parseInt(elementStyle(a, "padding-right") || 0, 10), s = s - parseInt(elementStyle(a, "padding-top") || 0, 10) - parseInt(elementStyle(a, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
      width: t,
      height: s,
      size: e.isHorizontal() ? t : s
    }));
  }
  function updateSlides() {
    var e = this;
    function t(t) {
      return e.isHorizontal() ? t : {
        width: "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        marginRight: "marginBottom"
      }[t];
    }
    function s(e, s) {
      return parseFloat(e.getPropertyValue(t(s)) || 0);
    }
    var a = e.params,
      i = e.wrapperEl,
      r = e.slidesEl,
      n = e.size,
      l = e.rtlTranslate,
      o = e.wrongRTL,
      d = e.virtual && a.virtual.enabled,
      c = d ? e.virtual.slides.length : e.slides.length,
      p = elementChildren(r, ".".concat(e.params.slideClass, ", swiper-slide")),
      u = d ? e.virtual.slides.length : p.length;
    var m = [];
    var f = [],
      h = [];
    var g = a.slidesOffsetBefore;
    "function" == typeof g && (g = a.slidesOffsetBefore.call(e));
    var v = a.slidesOffsetAfter;
    "function" == typeof v && (v = a.slidesOffsetAfter.call(e));
    var w = e.snapGrid.length,
      b = e.slidesGrid.length;
    var y = a.spaceBetween,
      E = -g,
      S = 0,
      x = 0;
    if (void 0 === n) return;
    "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * n), e.virtualSize = -y, p.forEach(function (e) {
      l ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = "";
    }), a.centeredSlides && a.cssMode && (setCSSProperty(i, "--swiper-centered-offset-before", ""), setCSSProperty(i, "--swiper-centered-offset-after", ""));
    var T = a.grid && a.grid.rows > 1 && e.grid;
    var M;
    T && e.grid.initSlides(u);
    var C = "auto" === a.slidesPerView && a.breakpoints && Object.keys(a.breakpoints).filter(function (e) {
      return void 0 !== a.breakpoints[e].slidesPerView;
    }).length > 0;
    for (var _i2 = 0; _i2 < u; _i2 += 1) {
      var _r = void 0;
      if (M = 0, p[_i2] && (_r = p[_i2]), T && e.grid.updateSlide(_i2, _r, u, t), !p[_i2] || "none" !== elementStyle(_r, "display")) {
        if ("auto" === a.slidesPerView) {
          C && (p[_i2].style[t("width")] = "");
          var _n = getComputedStyle(_r),
            _l = _r.style.transform,
            _o = _r.style.webkitTransform;
          if (_l && (_r.style.transform = "none"), _o && (_r.style.webkitTransform = "none"), a.roundLengths) M = e.isHorizontal() ? elementOuterSize(_r, "width", !0) : elementOuterSize(_r, "height", !0);else {
            var _e3 = s(_n, "width"),
              _t3 = s(_n, "padding-left"),
              _a = s(_n, "padding-right"),
              _i3 = s(_n, "margin-left"),
              _l2 = s(_n, "margin-right"),
              _o2 = _n.getPropertyValue("box-sizing");
            if (_o2 && "border-box" === _o2) M = _e3 + _i3 + _l2;else {
              var _r2 = _r,
                _s3 = _r2.clientWidth,
                _n2 = _r2.offsetWidth;
              M = _e3 + _t3 + _a + _i3 + _l2 + (_n2 - _s3);
            }
          }
          _l && (_r.style.transform = _l), _o && (_r.style.webkitTransform = _o), a.roundLengths && (M = Math.floor(M));
        } else M = (n - (a.slidesPerView - 1) * y) / a.slidesPerView, a.roundLengths && (M = Math.floor(M)), p[_i2] && (p[_i2].style[t("width")] = "".concat(M, "px"));
        p[_i2] && (p[_i2].swiperSlideSize = M), h.push(M), a.centeredSlides ? (E = E + M / 2 + S / 2 + y, 0 === S && 0 !== _i2 && (E = E - n / 2 - y), 0 === _i2 && (E = E - n / 2 - y), Math.abs(E) < .001 && (E = 0), a.roundLengths && (E = Math.floor(E)), x % a.slidesPerGroup == 0 && m.push(E), f.push(E)) : (a.roundLengths && (E = Math.floor(E)), (x - Math.min(e.params.slidesPerGroupSkip, x)) % e.params.slidesPerGroup == 0 && m.push(E), f.push(E), E = E + M + y), e.virtualSize += M + y, S = M, x += 1;
      }
    }
    if (e.virtualSize = Math.max(e.virtualSize, n) + v, l && o && ("slide" === a.effect || "coverflow" === a.effect) && (i.style.width = "".concat(e.virtualSize + a.spaceBetween, "px")), a.setWrapperSize && (i.style[t("width")] = "".concat(e.virtualSize + a.spaceBetween, "px")), T && e.grid.updateWrapperSize(M, m, t), !a.centeredSlides) {
      var _t4 = [];
      for (var _s4 = 0; _s4 < m.length; _s4 += 1) {
        var _i4 = m[_s4];
        a.roundLengths && (_i4 = Math.floor(_i4)), m[_s4] <= e.virtualSize - n && _t4.push(_i4);
      }
      m = _t4, Math.floor(e.virtualSize - n) - Math.floor(m[m.length - 1]) > 1 && m.push(e.virtualSize - n);
    }
    if (d && a.loop) {
      var _t5 = h[0] + y;
      if (a.slidesPerGroup > 1) {
        var _s5 = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / a.slidesPerGroup),
          _i5 = _t5 * a.slidesPerGroup;
        for (var _e4 = 0; _e4 < _s5; _e4 += 1) {
          m.push(m[m.length - 1] + _i5);
        }
      }
      for (var _s6 = 0; _s6 < e.virtual.slidesBefore + e.virtual.slidesAfter; _s6 += 1) {
        1 === a.slidesPerGroup && m.push(m[m.length - 1] + _t5), f.push(f[f.length - 1] + _t5), e.virtualSize += _t5;
      }
    }
    if (0 === m.length && (m = [0]), 0 !== a.spaceBetween) {
      var _s7 = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
      p.filter(function (e, t) {
        return !(a.cssMode && !a.loop) || t !== p.length - 1;
      }).forEach(function (e) {
        e.style[_s7] = "".concat(y, "px");
      });
    }
    if (a.centeredSlides && a.centeredSlidesBounds) {
      var _e5 = 0;
      h.forEach(function (t) {
        _e5 += t + (a.spaceBetween ? a.spaceBetween : 0);
      }), _e5 -= a.spaceBetween;
      var _t6 = _e5 - n;
      m = m.map(function (e) {
        return e < 0 ? -g : e > _t6 ? _t6 + v : e;
      });
    }
    if (a.centerInsufficientSlides) {
      var _e6 = 0;
      if (h.forEach(function (t) {
        _e6 += t + (a.spaceBetween ? a.spaceBetween : 0);
      }), _e6 -= a.spaceBetween, _e6 < n) {
        var _t7 = (n - _e6) / 2;
        m.forEach(function (e, s) {
          m[s] = e - _t7;
        }), f.forEach(function (e, s) {
          f[s] = e + _t7;
        });
      }
    }
    if (Object.assign(e, {
      slides: p,
      snapGrid: m,
      slidesGrid: f,
      slidesSizesGrid: h
    }), a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) {
      setCSSProperty(i, "--swiper-centered-offset-before", -m[0] + "px"), setCSSProperty(i, "--swiper-centered-offset-after", e.size / 2 - h[h.length - 1] / 2 + "px");
      var _t8 = -e.snapGrid[0],
        _s8 = -e.slidesGrid[0];
      e.snapGrid = e.snapGrid.map(function (e) {
        return e + _t8;
      }), e.slidesGrid = e.slidesGrid.map(function (e) {
        return e + _s8;
      });
    }
    if (u !== c && e.emit("slidesLengthChange"), m.length !== w && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== b && e.emit("slidesGridLengthChange"), a.watchSlidesProgress && e.updateSlidesOffset(), !(d || a.cssMode || "slide" !== a.effect && "fade" !== a.effect)) {
      var _t9 = "".concat(a.containerModifierClass, "backface-hidden"),
        _s9 = e.el.classList.contains(_t9);
      u <= a.maxBackfaceHiddenSlides ? _s9 || e.el.classList.add(_t9) : _s9 && e.el.classList.remove(_t9);
    }
  }
  function updateAutoHeight(e) {
    var t = this,
      s = [],
      a = t.virtual && t.params.virtual.enabled;
    var i,
      r = 0;
    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
    var n = function n(e) {
      return a ? t.getSlideIndexByData(e) : t.slides[e];
    };
    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) {
      if (t.params.centeredSlides) (t.visibleSlides || []).forEach(function (e) {
        s.push(e);
      });else for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
        var _e7 = t.activeIndex + i;
        if (_e7 > t.slides.length && !a) break;
        s.push(n(_e7));
      }
    } else s.push(n(t.activeIndex));
    for (i = 0; i < s.length; i += 1) {
      if (void 0 !== s[i]) {
        var _e8 = s[i].offsetHeight;
        r = _e8 > r ? _e8 : r;
      }
    }
    (r || 0 === r) && (t.wrapperEl.style.height = "".concat(r, "px"));
  }
  function updateSlidesOffset() {
    var e = this,
      t = e.slides,
      s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
    for (var a = 0; a < t.length; a += 1) {
      t[a].swiperSlideOffset = (e.isHorizontal() ? t[a].offsetLeft : t[a].offsetTop) - s;
    }
  }
  function updateSlidesProgress(e) {
    void 0 === e && (e = this && this.translate || 0);
    var t = this,
      s = t.params,
      a = t.slides,
      i = t.rtlTranslate,
      r = t.snapGrid;
    if (0 === a.length) return;
    void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
    var n = -e;
    i && (n = e), a.forEach(function (e) {
      e.classList.remove(s.slideVisibleClass);
    }), t.visibleSlidesIndexes = [], t.visibleSlides = [];
    for (var _e9 = 0; _e9 < a.length; _e9 += 1) {
      var l = a[_e9];
      var o = l.swiperSlideOffset;
      s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
      var d = (n + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween),
        c = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween),
        p = -(n - o),
        u = p + t.slidesSizesGrid[_e9];
      (p >= 0 && p < t.size - 1 || u > 1 && u <= t.size || p <= 0 && u >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(_e9), a[_e9].classList.add(s.slideVisibleClass)), l.progress = i ? -d : d, l.originalProgress = i ? -c : c;
    }
  }
  function updateProgress(e) {
    var t = this;
    if (void 0 === e) {
      var _s10 = t.rtlTranslate ? -1 : 1;
      e = t && t.translate && t.translate * _s10 || 0;
    }
    var s = t.params,
      a = t.maxTranslate() - t.minTranslate();
    var i = t.progress,
      r = t.isBeginning,
      n = t.isEnd,
      l = t.progressLoop;
    var o = r,
      d = n;
    if (0 === a) i = 0, r = !0, n = !0;else {
      i = (e - t.minTranslate()) / a;
      var _s11 = Math.abs(e - t.minTranslate()) < 1,
        _l3 = Math.abs(e - t.maxTranslate()) < 1;
      r = _s11 || i <= 0, n = _l3 || i >= 1, _s11 && (i = 0), _l3 && (i = 1);
    }
    if (s.loop) {
      var _s12 = t.getSlideIndexByData(0),
        _a2 = t.getSlideIndexByData(t.slides.length - 1),
        _i6 = t.slidesGrid[_s12],
        _r3 = t.slidesGrid[_a2],
        _n3 = t.slidesGrid[t.slidesGrid.length - 1],
        _o3 = Math.abs(e);
      l = _o3 >= _i6 ? (_o3 - _i6) / _n3 : (_o3 + _n3 - _r3) / _n3, l > 1 && (l -= 1);
    }
    Object.assign(t, {
      progress: i,
      progressLoop: l,
      isBeginning: r,
      isEnd: n
    }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !d && t.emit("reachEnd toEdge"), (o && !r || d && !n) && t.emit("fromEdge"), t.emit("progress", i);
  }
  function updateSlidesClasses() {
    var e = this,
      t = e.slides,
      s = e.params,
      a = e.slidesEl,
      i = e.activeIndex,
      r = e.virtual && s.virtual.enabled,
      n = function n(e) {
        return elementChildren(a, ".".concat(s.slideClass).concat(e, ", swiper-slide").concat(e))[0];
      };
    var l;
    if (t.forEach(function (e) {
      e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass);
    }), r) {
      if (s.loop) {
        var _t10 = i - e.virtual.slidesBefore;
        _t10 < 0 && (_t10 = e.virtual.slides.length + _t10), _t10 >= e.virtual.slides.length && (_t10 -= e.virtual.slides.length), l = n("[data-swiper-slide-index=\"".concat(_t10, "\"]"));
      } else l = n("[data-swiper-slide-index=\"".concat(i, "\"]"));
    } else l = t[i];
    if (l) {
      l.classList.add(s.slideActiveClass);
      var _e10 = elementNextAll(l, ".".concat(s.slideClass, ", swiper-slide"))[0];
      s.loop && !_e10 && (_e10 = t[0]), _e10 && _e10.classList.add(s.slideNextClass);
      var _a3 = elementPrevAll(l, ".".concat(s.slideClass, ", swiper-slide"))[0];
      s.loop && 0 === !_a3 && (_a3 = t[t.length - 1]), _a3 && _a3.classList.add(s.slidePrevClass);
    }
    e.emitSlidesClasses();
  }
  var processLazyPreloader = function processLazyPreloader(e, t) {
      if (!e || e.destroyed || !e.params) return;
      var s = t.closest(e.isElement ? "swiper-slide" : ".".concat(e.params.slideClass));
      if (s) {
        var _t11 = s.querySelector(".".concat(e.params.lazyPreloaderClass));
        _t11 && _t11.remove();
      }
    },
    unlazy = function unlazy(e, t) {
      if (!e.slides[t]) return;
      var s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    preload = function preload(e) {
      if (!e || e.destroyed || !e.params) return;
      var t = e.params.lazyPreloadPrevNext;
      var s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      var a = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView),
        i = e.activeIndex,
        r = i + a - 1;
      if (e.params.rewind) for (var _a4 = i - t; _a4 <= r + t; _a4 += 1) {
        var _t12 = (_a4 % s + s) % s;
        _t12 !== i && _t12 > r && unlazy(e, _t12);
      } else for (var _a5 = Math.max(r - t, 0); _a5 <= Math.min(r + t, s - 1); _a5 += 1) {
        _a5 !== i && _a5 > r && unlazy(e, _a5);
      }
    };
  function getActiveIndexByTranslate(e) {
    var t = e.slidesGrid,
      s = e.params,
      a = e.rtlTranslate ? e.translate : -e.translate;
    var i;
    for (var _e11 = 0; _e11 < t.length; _e11 += 1) {
      void 0 !== t[_e11 + 1] ? a >= t[_e11] && a < t[_e11 + 1] - (t[_e11 + 1] - t[_e11]) / 2 ? i = _e11 : a >= t[_e11] && a < t[_e11 + 1] && (i = _e11 + 1) : a >= t[_e11] && (i = _e11);
    }
    return s.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i;
  }
  function updateActiveIndex(e) {
    var t = this,
      s = t.rtlTranslate ? t.translate : -t.translate,
      a = t.snapGrid,
      i = t.params,
      r = t.activeIndex,
      n = t.realIndex,
      l = t.snapIndex;
    var o,
      d = e;
    var c = function c(e) {
      var s = e - t.virtual.slidesBefore;
      return s < 0 && (s = t.virtual.slides.length + s), s >= t.virtual.slides.length && (s -= t.virtual.slides.length), s;
    };
    if (void 0 === d && (d = getActiveIndexByTranslate(t)), a.indexOf(s) >= 0) o = a.indexOf(s);else {
      var _e12 = Math.min(i.slidesPerGroupSkip, d);
      o = _e12 + Math.floor((d - _e12) / i.slidesPerGroup);
    }
    if (o >= a.length && (o = a.length - 1), d === r) return o !== l && (t.snapIndex = o, t.emit("snapIndexChange")), void (t.params.loop && t.virtual && t.params.virtual.enabled && (t.realIndex = c(d)));
    var p;
    p = t.virtual && i.virtual.enabled && i.loop ? c(d) : t.slides[d] ? parseInt(t.slides[d].getAttribute("data-swiper-slide-index") || d, 10) : d, Object.assign(t, {
      snapIndex: o,
      realIndex: p,
      previousIndex: r,
      activeIndex: d
    }), t.initialized && preload(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), n !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
  }
  function updateClickedSlide(e) {
    var t = this,
      s = t.params,
      a = e.closest(".".concat(s.slideClass, ", swiper-slide"));
    var i,
      r = !1;
    if (a) for (var _e13 = 0; _e13 < t.slides.length; _e13 += 1) {
      if (t.slides[_e13] === a) {
        r = !0, i = _e13;
        break;
      }
    }
    if (!a || !r) return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
    t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(a.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = i, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
  }
  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide
  };
  function getSwiperTranslate(e) {
    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
    var t = this.params,
      s = this.rtlTranslate,
      a = this.translate,
      i = this.wrapperEl;
    if (t.virtualTranslate) return s ? -a : a;
    if (t.cssMode) return a;
    var r = getTranslate(i, e);
    return s && (r = -r), r || 0;
  }
  function setTranslate(e, t) {
    var s = this,
      a = s.rtlTranslate,
      i = s.params,
      r = s.wrapperEl,
      n = s.progress;
    var l = 0,
      o = 0;
    var d;
    s.isHorizontal() ? l = a ? -e : e : o = e, i.roundLengths && (l = Math.floor(l), o = Math.floor(o)), i.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -o : i.virtualTranslate || (r.style.transform = "translate3d(".concat(l, "px, ").concat(o, "px, 0px)")), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? l : o;
    var c = s.maxTranslate() - s.minTranslate();
    d = 0 === c ? 0 : (e - s.minTranslate()) / c, d !== n && s.updateProgress(e), s.emit("setTranslate", s.translate, t);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(e, t, s, a, i) {
    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === a && (a = !0);
    var r = this,
      n = r.params,
      l = r.wrapperEl;
    if (r.animating && n.preventInteractionOnTransition) return !1;
    var o = r.minTranslate(),
      d = r.maxTranslate();
    var c;
    if (c = a && e > o ? o : a && e < d ? d : e, r.updateProgress(c), n.cssMode) {
      var _e14 = r.isHorizontal();
      if (0 === t) l[_e14 ? "scrollLeft" : "scrollTop"] = -c;else {
        var _l$scrollTo;
        if (!r.support.smoothScroll) return animateCSSModeScroll({
          swiper: r,
          targetPosition: -c,
          side: _e14 ? "left" : "top"
        }), !0;
        l.scrollTo((_l$scrollTo = {}, _defineProperty(_l$scrollTo, _e14 ? "left" : "top", -c), _defineProperty(_l$scrollTo, "behavior", "smooth"), _l$scrollTo));
      }
      return !0;
    }
    return 0 === t ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) {
      r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd"));
    }), r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))), !0;
  }
  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
    translateTo: translateTo
  };
  function setTransition(e, t) {
    var s = this;
    s.params.cssMode || (s.wrapperEl.style.transitionDuration = "".concat(e, "ms")), s.emit("setTransition", e, t);
  }
  function transitionEmit(e) {
    var t = e.swiper,
      s = e.runCallbacks,
      a = e.direction,
      i = e.step;
    var r = t.activeIndex,
      n = t.previousIndex;
    var l = a;
    if (l || (l = r > n ? "next" : r < n ? "prev" : "reset"), t.emit("transition".concat(i)), s && r !== n) {
      if ("reset" === l) return void t.emit("slideResetTransition".concat(i));
      t.emit("slideChangeTransition".concat(i)), "next" === l ? t.emit("slideNextTransition".concat(i)) : t.emit("slidePrevTransition".concat(i));
    }
  }
  function transitionStart(e, t) {
    void 0 === e && (e = !0);
    var s = this,
      a = s.params;
    a.cssMode || (a.autoHeight && s.updateAutoHeight(), transitionEmit({
      swiper: s,
      runCallbacks: e,
      direction: t,
      step: "Start"
    }));
  }
  function transitionEnd(e, t) {
    void 0 === e && (e = !0);
    var s = this,
      a = s.params;
    s.animating = !1, a.cssMode || (s.setTransition(0), transitionEmit({
      swiper: s,
      runCallbacks: e,
      direction: t,
      step: "End"
    }));
  }
  var transition = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd
  };
  function slideTo(e, t, s, a, i) {
    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e && (e = parseInt(e, 10));
    var r = this;
    var n = e;
    n < 0 && (n = 0);
    var l = r.params,
      o = r.snapGrid,
      d = r.slidesGrid,
      c = r.previousIndex,
      p = r.activeIndex,
      u = r.rtlTranslate,
      m = r.wrapperEl,
      f = r.enabled;
    if (r.animating && l.preventInteractionOnTransition || !f && !a && !i) return !1;
    var h = Math.min(r.params.slidesPerGroupSkip, n);
    var g = h + Math.floor((n - h) / r.params.slidesPerGroup);
    g >= o.length && (g = o.length - 1);
    var v = -o[g];
    if (l.normalizeSlideIndex) for (var _e15 = 0; _e15 < d.length; _e15 += 1) {
      var _t13 = -Math.floor(100 * v),
        _s13 = Math.floor(100 * d[_e15]),
        _a6 = Math.floor(100 * d[_e15 + 1]);
      void 0 !== d[_e15 + 1] ? _t13 >= _s13 && _t13 < _a6 - (_a6 - _s13) / 2 ? n = _e15 : _t13 >= _s13 && _t13 < _a6 && (n = _e15 + 1) : _t13 >= _s13 && (n = _e15);
    }
    if (r.initialized && n !== p) {
      if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1;
      if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (p || 0) !== n) return !1;
    }
    var w;
    if (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(v), w = n > p ? "next" : n < p ? "prev" : "reset", u && -v === r.translate || !u && v === r.translate) return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== l.effect && r.setTranslate(v), "reset" !== w && (r.transitionStart(s, w), r.transitionEnd(s, w)), !1;
    if (l.cssMode) {
      var _e16 = r.isHorizontal(),
        _s14 = u ? v : -v;
      if (0 === t) {
        var _t14 = r.virtual && r.params.virtual.enabled;
        _t14 && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), _t14 && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0, requestAnimationFrame(function () {
          m[_e16 ? "scrollLeft" : "scrollTop"] = _s14;
        })) : m[_e16 ? "scrollLeft" : "scrollTop"] = _s14, _t14 && requestAnimationFrame(function () {
          r.wrapperEl.style.scrollSnapType = "", r._immediateVirtual = !1;
        });
      } else {
        var _m$scrollTo;
        if (!r.support.smoothScroll) return animateCSSModeScroll({
          swiper: r,
          targetPosition: _s14,
          side: _e16 ? "left" : "top"
        }), !0;
        m.scrollTo((_m$scrollTo = {}, _defineProperty(_m$scrollTo, _e16 ? "left" : "top", _s14), _defineProperty(_m$scrollTo, "behavior", "smooth"), _m$scrollTo));
      }
      return !0;
    }
    return r.setTransition(t), r.setTranslate(v), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(s, w), 0 === t ? r.transitionEnd(s, w) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
      r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, w));
    }), r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)), !0;
  }
  function slideToLoop(e, t, s, a) {
    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e) {
      e = parseInt(e, 10);
    }
    var i = this;
    var r = e;
    return i.params.loop && (i.virtual && i.params.virtual.enabled ? r += i.virtual.slidesBefore : r = i.getSlideIndexByData(r)), i.slideTo(r, t, s, a);
  }
  function slideNext(e, t, s) {
    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
    var a = this,
      i = a.enabled,
      r = a.params,
      n = a.animating;
    if (!i) return a;
    var l = r.slidesPerGroup;
    "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
    var o = a.activeIndex < r.slidesPerGroupSkip ? 1 : l,
      d = a.virtual && r.virtual.enabled;
    if (r.loop) {
      if (n && !d && r.loopPreventsSliding) return !1;
      a.loopFix({
        direction: "next"
      }), a._clientLeft = a.wrapperEl.clientLeft;
    }
    return r.rewind && a.isEnd ? a.slideTo(0, e, t, s) : a.slideTo(a.activeIndex + o, e, t, s);
  }
  function slidePrev(e, t, s) {
    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
    var a = this,
      i = a.params,
      r = a.snapGrid,
      n = a.slidesGrid,
      l = a.rtlTranslate,
      o = a.enabled,
      d = a.animating;
    if (!o) return a;
    var c = a.virtual && i.virtual.enabled;
    if (i.loop) {
      if (d && !c && i.loopPreventsSliding) return !1;
      a.loopFix({
        direction: "prev"
      }), a._clientLeft = a.wrapperEl.clientLeft;
    }
    function p(e) {
      return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
    }
    var u = p(l ? a.translate : -a.translate),
      m = r.map(function (e) {
        return p(e);
      });
    var f = r[m.indexOf(u) - 1];
    if (void 0 === f && i.cssMode) {
      var _e17;
      r.forEach(function (t, s) {
        u >= t && (_e17 = s);
      }), void 0 !== _e17 && (f = r[_e17 > 0 ? _e17 - 1 : _e17]);
    }
    var h = 0;
    if (void 0 !== f && (h = n.indexOf(f), h < 0 && (h = a.activeIndex - 1), "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (h = h - a.slidesPerViewDynamic("previous", !0) + 1, h = Math.max(h, 0))), i.rewind && a.isBeginning) {
      var _i7 = a.params.virtual && a.params.virtual.enabled && a.virtual ? a.virtual.slides.length - 1 : a.slides.length - 1;
      return a.slideTo(_i7, e, t, s);
    }
    return a.slideTo(h, e, t, s);
  }
  function slideReset(e, t, s) {
    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
    return this.slideTo(this.activeIndex, e, t, s);
  }
  function slideToClosest(e, t, s, a) {
    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === a && (a = .5);
    var i = this;
    var r = i.activeIndex;
    var n = Math.min(i.params.slidesPerGroupSkip, r),
      l = n + Math.floor((r - n) / i.params.slidesPerGroup),
      o = i.rtlTranslate ? i.translate : -i.translate;
    if (o >= i.snapGrid[l]) {
      var _e18 = i.snapGrid[l];
      o - _e18 > (i.snapGrid[l + 1] - _e18) * a && (r += i.params.slidesPerGroup);
    } else {
      var _e19 = i.snapGrid[l - 1];
      o - _e19 <= (i.snapGrid[l] - _e19) * a && (r -= i.params.slidesPerGroup);
    }
    return r = Math.max(r, 0), r = Math.min(r, i.slidesGrid.length - 1), i.slideTo(r, e, t, s);
  }
  function slideToClickedSlide() {
    var e = this,
      t = e.params,
      s = e.slidesEl,
      a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
    var i,
      r = e.clickedIndex;
    var n = e.isElement ? "swiper-slide" : ".".concat(t.slideClass);
    if (t.loop) {
      if (e.animating) return;
      i = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(), r = e.getSlideIndex(elementChildren(s, "".concat(n, "[data-swiper-slide-index=\"").concat(i, "\"]"))[0]), nextTick(function () {
        e.slideTo(r);
      })) : e.slideTo(r) : r > e.slides.length - a ? (e.loopFix(), r = e.getSlideIndex(elementChildren(s, "".concat(n, "[data-swiper-slide-index=\"").concat(i, "\"]"))[0]), nextTick(function () {
        e.slideTo(r);
      })) : e.slideTo(r);
    } else e.slideTo(r);
  }
  var slide$1 = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide
  };
  function loopCreate(e) {
    var t = this,
      s = t.params,
      a = t.slidesEl;
    if (!s.loop || t.virtual && t.params.virtual.enabled) return;
    elementChildren(a, ".".concat(s.slideClass, ", swiper-slide")).forEach(function (e, t) {
      e.setAttribute("data-swiper-slide-index", t);
    }), t.loopFix({
      slideRealIndex: e,
      direction: s.centeredSlides ? void 0 : "next"
    });
  }
  function loopFix(e) {
    var _ref2 = void 0 === e ? {} : e,
      t = _ref2.slideRealIndex,
      _ref2$slideTo = _ref2.slideTo,
      s = _ref2$slideTo === void 0 ? !0 : _ref2$slideTo,
      a = _ref2.direction,
      i = _ref2.setTranslate,
      r = _ref2.activeSlideIndex,
      n = _ref2.byController,
      l = _ref2.byMousewheel;
    var o = this;
    if (!o.params.loop) return;
    o.emit("beforeLoopFix");
    var d = o.slides,
      c = o.allowSlidePrev,
      p = o.allowSlideNext,
      u = o.slidesEl,
      m = o.params;
    if (o.allowSlidePrev = !0, o.allowSlideNext = !0, o.virtual && m.virtual.enabled) return s && (m.centeredSlides || 0 !== o.snapIndex ? m.centeredSlides && o.snapIndex < m.slidesPerView ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0) : o.snapIndex === o.snapGrid.length - 1 && o.slideTo(o.virtual.slidesBefore, 0, !1, !0) : o.slideTo(o.virtual.slides.length, 0, !1, !0)), o.allowSlidePrev = c, o.allowSlideNext = p, void o.emit("loopFix");
    var f = "auto" === m.slidesPerView ? o.slidesPerViewDynamic() : Math.ceil(parseFloat(m.slidesPerView, 10));
    var h = m.loopedSlides || f;
    h % m.slidesPerGroup != 0 && (h += m.slidesPerGroup - h % m.slidesPerGroup), o.loopedSlides = h;
    var g = [],
      v = [];
    var w = o.activeIndex;
    void 0 === r ? r = o.getSlideIndex(o.slides.filter(function (e) {
      return e.classList.contains(m.slideActiveClass);
    })[0]) : w = r;
    var b = "next" === a || !a,
      y = "prev" === a || !a;
    var E = 0,
      S = 0;
    if (r < h) {
      E = Math.max(h - r, m.slidesPerGroup);
      for (var _e20 = 0; _e20 < h - r; _e20 += 1) {
        var _t15 = _e20 - Math.floor(_e20 / d.length) * d.length;
        g.push(d.length - _t15 - 1);
      }
    } else if (r > o.slides.length - 2 * h) {
      S = Math.max(r - (o.slides.length - 2 * h), m.slidesPerGroup);
      for (var _e21 = 0; _e21 < S; _e21 += 1) {
        var _t16 = _e21 - Math.floor(_e21 / d.length) * d.length;
        v.push(_t16);
      }
    }
    if (y && g.forEach(function (e) {
      u.prepend(o.slides[e]);
    }), b && v.forEach(function (e) {
      u.append(o.slides[e]);
    }), o.recalcSlides(), m.watchSlidesProgress && o.updateSlidesOffset(), s) if (g.length > 0 && y) {
      if (void 0 === t) {
        var _e22 = o.slidesGrid[w],
          _t17 = o.slidesGrid[w + E] - _e22;
        l ? o.setTranslate(o.translate - _t17) : (o.slideTo(w + E, 0, !1, !0), i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += _t17));
      } else i && o.slideToLoop(t, 0, !1, !0);
    } else if (v.length > 0 && b) if (void 0 === t) {
      var _e23 = o.slidesGrid[w],
        _t18 = o.slidesGrid[w - S] - _e23;
      l ? o.setTranslate(o.translate - _t18) : (o.slideTo(w - S, 0, !1, !0), i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += _t18));
    } else o.slideToLoop(t, 0, !1, !0);
    if (o.allowSlidePrev = c, o.allowSlideNext = p, o.controller && o.controller.control && !n) {
      var _e24 = {
        slideRealIndex: t,
        slideTo: !1,
        direction: a,
        setTranslate: i,
        activeSlideIndex: r,
        byController: !0
      };
      Array.isArray(o.controller.control) ? o.controller.control.forEach(function (t) {
        !t.destroyed && t.params.loop && t.loopFix(_e24);
      }) : o.controller.control instanceof o.constructor && o.controller.control.params.loop && o.controller.control.loopFix(_e24);
    }
    o.emit("loopFix");
  }
  function loopDestroy() {
    var e = this,
      t = e.params,
      s = e.slidesEl;
    if (!t.loop || e.virtual && e.params.virtual.enabled) return;
    e.recalcSlides();
    var a = [];
    e.slides.forEach(function (e) {
      var t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
      a[t] = e;
    }), e.slides.forEach(function (e) {
      e.removeAttribute("data-swiper-slide-index");
    }), a.forEach(function (e) {
      s.append(e);
    }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
  }
  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy
  };
  function setGrabCursor(e) {
    var t = this;
    if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
    var s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
    t.isElement && (t.__preventObserver__ = !0), s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(function () {
      t.__preventObserver__ = !1;
    });
  }
  function unsetGrabCursor() {
    var e = this;
    e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(function () {
      e.__preventObserver__ = !1;
    }));
  }
  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor
  };
  function closestElement(e, t) {
    return void 0 === t && (t = this), function t(s) {
      if (!s || s === getDocument() || s === getWindow()) return null;
      s.assignedSlot && (s = s.assignedSlot);
      var a = s.closest(e);
      return a || s.getRootNode ? a || t(s.getRootNode().host) : null;
    }(t);
  }
  function onTouchStart(e) {
    var t = this,
      s = getDocument(),
      a = getWindow(),
      i = t.touchEventsData;
    i.evCache.push(e);
    var r = t.params,
      n = t.touches,
      l = t.enabled;
    if (!l) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    var o = e;
    o.originalEvent && (o = o.originalEvent);
    var d = o.target;
    if ("wrapper" === r.touchEventsTarget && !t.wrapperEl.contains(d)) return;
    if ("which" in o && 3 === o.which) return;
    if ("button" in o && o.button > 0) return;
    if (i.isTouched && i.isMoved) return;
    var c = !!r.noSwipingClass && "" !== r.noSwipingClass,
      p = e.composedPath ? e.composedPath() : e.path;
    c && o.target && o.target.shadowRoot && p && (d = p[0]);
    var u = r.noSwipingSelector ? r.noSwipingSelector : ".".concat(r.noSwipingClass),
      m = !(!o.target || !o.target.shadowRoot);
    if (r.noSwiping && (m ? closestElement(u, d) : d.closest(u))) return void (t.allowClick = !0);
    if (r.swipeHandler && !d.closest(r.swipeHandler)) return;
    n.currentX = o.pageX, n.currentY = o.pageY;
    var f = n.currentX,
      h = n.currentY,
      g = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
      v = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (g && (f <= v || f >= a.innerWidth - v)) {
      if ("prevent" !== g) return;
      e.preventDefault();
    }
    Object.assign(i, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0
    }), n.startX = f, n.startY = h, i.touchStartTime = now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, r.threshold > 0 && (i.allowThresholdMove = !1);
    var w = !0;
    d.matches(i.focusableElements) && (w = !1, "SELECT" === d.nodeName && (i.isTouched = !1)), s.activeElement && s.activeElement.matches(i.focusableElements) && s.activeElement !== d && s.activeElement.blur();
    var b = w && t.allowTouchMove && r.touchStartPreventDefault;
    !r.touchStartForcePreventDefault && !b || d.isContentEditable || o.preventDefault(), t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !r.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", o);
  }
  function onTouchMove(e) {
    var t = getDocument(),
      s = this,
      a = s.touchEventsData,
      i = s.params,
      r = s.touches,
      n = s.rtlTranslate,
      l = s.enabled;
    if (!l) return;
    if (!i.simulateTouch && "mouse" === e.pointerType) return;
    var o = e;
    if (o.originalEvent && (o = o.originalEvent), !a.isTouched) return void (a.startMoving && a.isScrolling && s.emit("touchMoveOpposite", o));
    var d = a.evCache.findIndex(function (e) {
      return e.pointerId === o.pointerId;
    });
    d >= 0 && (a.evCache[d] = o);
    var c = a.evCache.length > 1 ? a.evCache[0] : o,
      p = c.pageX,
      u = c.pageY;
    if (o.preventedByNestedSwiper) return r.startX = p, void (r.startY = u);
    if (!s.allowTouchMove) return o.target.matches(a.focusableElements) || (s.allowClick = !1), void (a.isTouched && (Object.assign(r, {
      startX: p,
      startY: u,
      prevX: s.touches.currentX,
      prevY: s.touches.currentY,
      currentX: p,
      currentY: u
    }), a.touchStartTime = now()));
    if (i.touchReleaseOnEdges && !i.loop) if (s.isVertical()) {
      if (u < r.startY && s.translate <= s.maxTranslate() || u > r.startY && s.translate >= s.minTranslate()) return a.isTouched = !1, void (a.isMoved = !1);
    } else if (p < r.startX && s.translate <= s.maxTranslate() || p > r.startX && s.translate >= s.minTranslate()) return;
    if (t.activeElement && o.target === t.activeElement && o.target.matches(a.focusableElements)) return a.isMoved = !0, void (s.allowClick = !1);
    if (a.allowTouchCallbacks && s.emit("touchMove", o), o.targetTouches && o.targetTouches.length > 1) return;
    r.currentX = p, r.currentY = u;
    var m = r.currentX - r.startX,
      f = r.currentY - r.startY;
    if (s.params.threshold && Math.sqrt(Math.pow(m, 2) + Math.pow(f, 2)) < s.params.threshold) return;
    if (void 0 === a.isScrolling) {
      var _e25;
      s.isHorizontal() && r.currentY === r.startY || s.isVertical() && r.currentX === r.startX ? a.isScrolling = !1 : m * m + f * f >= 25 && (_e25 = 180 * Math.atan2(Math.abs(f), Math.abs(m)) / Math.PI, a.isScrolling = s.isHorizontal() ? _e25 > i.touchAngle : 90 - _e25 > i.touchAngle);
    }
    if (a.isScrolling && s.emit("touchMoveOpposite", o), void 0 === a.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (a.startMoving = !0)), a.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled && a.evCache.length > 1) return void (a.isTouched = !1);
    if (!a.startMoving) return;
    s.allowClick = !1, !i.cssMode && o.cancelable && o.preventDefault(), i.touchMoveStopPropagation && !i.nested && o.stopPropagation();
    var h = s.isHorizontal() ? m : f,
      g = s.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
    i.oneWayMovement && (h = Math.abs(h) * (n ? 1 : -1), g = Math.abs(g) * (n ? 1 : -1)), r.diff = h, h *= i.touchRatio, n && (h = -h, g = -g);
    var v = s.touchesDirection;
    s.swipeDirection = h > 0 ? "prev" : "next", s.touchesDirection = g > 0 ? "prev" : "next";
    var w = s.params.loop && !i.cssMode;
    if (!a.isMoved) {
      if (w && s.loopFix({
        direction: s.swipeDirection
      }), a.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) {
        var _e26 = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0
        });
        s.wrapperEl.dispatchEvent(_e26);
      }
      a.allowMomentumBounce = !1, !i.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", o);
    }
    var b;
    a.isMoved && v !== s.touchesDirection && w && Math.abs(h) >= 1 && (s.loopFix({
      direction: s.swipeDirection,
      setTranslate: !0
    }), b = !0), s.emit("sliderMove", o), a.isMoved = !0, a.currentTranslate = h + a.startTranslate;
    var y = !0,
      E = i.resistanceRatio;
    if (i.touchReleaseOnEdges && (E = 0), h > 0 ? (w && !b && a.currentTranslate > (i.centeredSlides ? s.minTranslate() - s.size / 2 : s.minTranslate()) && s.loopFix({
      direction: "prev",
      setTranslate: !0,
      activeSlideIndex: 0
    }), a.currentTranslate > s.minTranslate() && (y = !1, i.resistance && (a.currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + a.startTranslate + h, E)))) : h < 0 && (w && !b && a.currentTranslate < (i.centeredSlides ? s.maxTranslate() + s.size / 2 : s.maxTranslate()) && s.loopFix({
      direction: "next",
      setTranslate: !0,
      activeSlideIndex: s.slides.length - ("auto" === i.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(i.slidesPerView, 10)))
    }), a.currentTranslate < s.maxTranslate() && (y = !1, i.resistance && (a.currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - a.startTranslate - h, E)))), y && (o.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), s.allowSlidePrev || s.allowSlideNext || (a.currentTranslate = a.startTranslate), i.threshold > 0) {
      if (!(Math.abs(h) > i.threshold || a.allowThresholdMove)) return void (a.currentTranslate = a.startTranslate);
      if (!a.allowThresholdMove) return a.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, a.currentTranslate = a.startTranslate, void (r.diff = s.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY);
    }
    i.followFinger && !i.cssMode && ((i.freeMode && i.freeMode.enabled && s.freeMode || i.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && i.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(a.currentTranslate), s.setTranslate(a.currentTranslate));
  }
  function onTouchEnd(e) {
    var t = this,
      s = t.touchEventsData,
      a = s.evCache.findIndex(function (t) {
        return t.pointerId === e.pointerId;
      });
    if (a >= 0 && s.evCache.splice(a, 1), ["pointercancel", "pointerout", "pointerleave"].includes(e.type)) {
      if (!("pointercancel" === e.type && (t.browser.isSafari || t.browser.isWebView))) return;
    }
    var i = t.params,
      r = t.touches,
      n = t.rtlTranslate,
      l = t.slidesGrid,
      o = t.enabled;
    if (!o) return;
    if (!i.simulateTouch && "mouse" === e.pointerType) return;
    var d = e;
    if (d.originalEvent && (d = d.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", d), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && i.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void (s.startMoving = !1);
    i.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    var c = now(),
      p = c - s.touchStartTime;
    if (t.allowClick) {
      var _e27 = d.path || d.composedPath && d.composedPath();
      t.updateClickedSlide(_e27 && _e27[0] || d.target), t.emit("tap click", d), p < 300 && c - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", d);
    }
    if (s.lastClickTime = now(), nextTick(function () {
      t.destroyed || (t.allowClick = !0);
    }), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === r.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void (s.startMoving = !1);
    var u;
    if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, u = i.followFinger ? n ? t.translate : -t.translate : -s.currentTranslate, i.cssMode) return;
    if (t.params.freeMode && i.freeMode.enabled) return void t.freeMode.onTouchEnd({
      currentPos: u
    });
    var m = 0,
      f = t.slidesSizesGrid[0];
    for (var _e28 = 0; _e28 < l.length; _e28 += _e28 < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
      var _t19 = _e28 < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== l[_e28 + _t19] ? u >= l[_e28] && u < l[_e28 + _t19] && (m = _e28, f = l[_e28 + _t19] - l[_e28]) : u >= l[_e28] && (m = _e28, f = l[l.length - 1] - l[l.length - 2]);
    }
    var h = null,
      g = null;
    i.rewind && (t.isBeginning ? g = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (h = 0));
    var v = (u - l[m]) / f,
      w = m < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (p > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection && (v >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? h : m + w) : t.slideTo(m)), "prev" === t.swipeDirection && (v > 1 - i.longSwipesRatio ? t.slideTo(m + w) : null !== g && v < 0 && Math.abs(v) > i.longSwipesRatio ? t.slideTo(g) : t.slideTo(m));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation && (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl) ? d.target === t.navigation.nextEl ? t.slideTo(m + w) : t.slideTo(m) : ("next" === t.swipeDirection && t.slideTo(null !== h ? h : m + w), "prev" === t.swipeDirection && t.slideTo(null !== g ? g : m));
    }
  }
  var timeout;
  function onResize() {
    var e = this,
      t = e.params,
      s = e.el;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    var a = e.allowSlideNext,
      i = e.allowSlidePrev,
      r = e.snapGrid,
      n = e.virtual && e.params.virtual.enabled;
    e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
    var l = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(timeout), timeout = setTimeout(function () {
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
    }, 500)), e.allowSlidePrev = i, e.allowSlideNext = a, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function onClick(e) {
    var t = this;
    t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function onScroll() {
    var e = this,
      t = e.wrapperEl,
      s = e.rtlTranslate,
      a = e.enabled;
    if (!a) return;
    var i;
    e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
    var r = e.maxTranslate() - e.minTranslate();
    i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, i !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
  }
  function onLoad(e) {
    processLazyPreloader(this, e.target), this.update();
  }
  var dummyEventAttached = !1;
  function dummyEventListener() {}
  var events = function events(e, t) {
    var s = getDocument(),
      a = e.params,
      i = e.el,
      r = e.wrapperEl,
      n = e.device,
      l = !!a.nested,
      o = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    i[o]("pointerdown", e.onTouchStart, {
      passive: !1
    }), s[o]("pointermove", e.onTouchMove, {
      passive: !1,
      capture: l
    }), s[o]("pointerup", e.onTouchEnd, {
      passive: !0
    }), s[o]("pointercancel", e.onTouchEnd, {
      passive: !0
    }), s[o]("pointerout", e.onTouchEnd, {
      passive: !0
    }), s[o]("pointerleave", e.onTouchEnd, {
      passive: !0
    }), (a.preventClicks || a.preventClicksPropagation) && i[o]("click", e.onClick, !0), a.cssMode && r[o]("scroll", e.onScroll), a.updateOnWindowResize ? e[d](n.ios || n.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, !0) : e[d]("observerUpdate", onResize, !0), i[o]("load", e.onLoad, {
      capture: !0
    });
  };
  function attachEvents() {
    var e = this,
      t = getDocument(),
      s = e.params;
    e.onTouchStart = onTouchStart.bind(e), e.onTouchMove = onTouchMove.bind(e), e.onTouchEnd = onTouchEnd.bind(e), s.cssMode && (e.onScroll = onScroll.bind(e)), e.onClick = onClick.bind(e), e.onLoad = onLoad.bind(e), dummyEventAttached || (t.addEventListener("touchstart", dummyEventListener), dummyEventAttached = !0), events(e, "on");
  }
  function detachEvents() {
    events(this, "off");
  }
  var events$1 = {
    attachEvents: attachEvents,
    detachEvents: detachEvents
  };
  var isGridEnabled = function isGridEnabled(e, t) {
    return e.grid && t.grid && t.grid.rows > 1;
  };
  function setBreakpoint() {
    var e = this,
      t = e.realIndex,
      s = e.initialized,
      a = e.params,
      i = e.el,
      r = a.breakpoints;
    if (!r || r && 0 === Object.keys(r).length) return;
    var n = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
    if (!n || e.currentBreakpoint === n) return;
    var l = (n in r ? r[n] : void 0) || e.originalParams,
      o = isGridEnabled(e, a),
      d = isGridEnabled(e, l),
      c = a.enabled;
    o && !d ? (i.classList.remove("".concat(a.containerModifierClass, "grid"), "".concat(a.containerModifierClass, "grid-column")), e.emitContainerClasses()) : !o && d && (i.classList.add("".concat(a.containerModifierClass, "grid")), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === a.grid.fill) && i.classList.add("".concat(a.containerModifierClass, "grid-column")), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(function (t) {
      var s = a[t] && a[t].enabled,
        i = l[t] && l[t].enabled;
      s && !i && e[t].disable(), !s && i && e[t].enable();
    });
    var p = l.direction && l.direction !== a.direction,
      u = a.loop && (l.slidesPerView !== a.slidesPerView || p);
    p && s && e.changeDirection(), extend(e.params, l);
    var m = e.params.enabled;
    Object.assign(e, {
      allowTouchMove: e.params.allowTouchMove,
      allowSlideNext: e.params.allowSlideNext,
      allowSlidePrev: e.params.allowSlidePrev
    }), c && !m ? e.disable() : !c && m && e.enable(), e.currentBreakpoint = n, e.emit("_beforeBreakpoint", l), u && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()), e.emit("breakpoint", l);
  }
  function getBreakpoint(e, t, s) {
    if (void 0 === t && (t = "window"), !e || "container" === t && !s) return;
    var a = !1;
    var i = getWindow(),
      r = "window" === t ? i.innerHeight : s.clientHeight,
      n = Object.keys(e).map(function (e) {
        if ("string" == typeof e && 0 === e.indexOf("@")) {
          var _t20 = parseFloat(e.substr(1));
          return {
            value: r * _t20,
            point: e
          };
        }
        return {
          value: e,
          point: e
        };
      });
    n.sort(function (e, t) {
      return parseInt(e.value, 10) - parseInt(t.value, 10);
    });
    for (var _e29 = 0; _e29 < n.length; _e29 += 1) {
      var _n$_e = n[_e29],
        _r4 = _n$_e.point,
        l = _n$_e.value;
      "window" === t ? i.matchMedia("(min-width: ".concat(l, "px)")).matches && (a = _r4) : l <= s.clientWidth && (a = _r4);
    }
    return a || "max";
  }
  var breakpoints = {
    setBreakpoint: setBreakpoint,
    getBreakpoint: getBreakpoint
  };
  function prepareClasses(e, t) {
    var s = [];
    return e.forEach(function (e) {
      "object" == _typeof(e) ? Object.keys(e).forEach(function (a) {
        e[a] && s.push(t + a);
      }) : "string" == typeof e && s.push(t + e);
    }), s;
  }
  function addClasses() {
    var _i$classList;
    var e = this,
      t = e.classNames,
      s = e.params,
      a = e.rtl,
      i = e.el,
      r = e.device,
      n = prepareClasses(["initialized", s.direction, {
        "free-mode": e.params.freeMode && s.freeMode.enabled
      }, {
        autoheight: s.autoHeight
      }, {
        rtl: a
      }, {
        grid: s.grid && s.grid.rows > 1
      }, {
        "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
      }, {
        android: r.android
      }, {
        ios: r.ios
      }, {
        "css-mode": s.cssMode
      }, {
        centered: s.cssMode && s.centeredSlides
      }, {
        "watch-progress": s.watchSlidesProgress
      }], s.containerModifierClass);
    t.push.apply(t, _toConsumableArray(n)), (_i$classList = i.classList).add.apply(_i$classList, _toConsumableArray(t)), e.emitContainerClasses();
  }
  function removeClasses() {
    var _e$classList;
    var e = this.el,
      t = this.classNames;
    (_e$classList = e.classList).remove.apply(_e$classList, _toConsumableArray(t)), this.emitContainerClasses();
  }
  var classes = {
    addClasses: addClasses,
    removeClasses: removeClasses
  };
  function checkOverflow() {
    var e = this,
      t = e.isLocked,
      s = e.params,
      a = s.slidesOffsetBefore;
    if (a) {
      var _t21 = e.slides.length - 1,
        _s15 = e.slidesGrid[_t21] + e.slidesSizesGrid[_t21] + 2 * a;
      e.isLocked = e.size > _s15;
    } else e.isLocked = 1 === e.snapGrid.length;
    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
  }
  var checkOverflow$1 = {
      checkOverflow: checkOverflow
    },
    defaults = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements: "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopedSlides: null,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1
    };
  function moduleExtendParams(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      var a = Object.keys(s)[0],
        i = s[a];
      "object" == _typeof(i) && null !== i ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && !0 === e[a] && (e[a] = {
        auto: !0
      }), a in e && "enabled" in i ? (!0 === e[a] && (e[a] = {
        enabled: !0
      }), "object" != _typeof(e[a]) || "enabled" in e[a] || (e[a].enabled = !0), e[a] || (e[a] = {
        enabled: !1
      }), extend(t, s)) : extend(t, s)) : extend(t, s);
    };
  }
  var prototypes = {
      eventsEmitter: eventsEmitter,
      update: update,
      translate: translate,
      transition: transition,
      slide: slide$1,
      loop: loop,
      grabCursor: grabCursor,
      events: events$1,
      breakpoints: breakpoints,
      checkOverflow: checkOverflow$1,
      classes: classes
    },
    extendedDefaults = {};
  var Swiper = /*#__PURE__*/function () {
    function Swiper() {
      var _a7, _a8, _n$modules;
      _classCallCheck(this, Swiper);
      var e, t;
      for (var s = arguments.length, a = new Array(s), i = 0; i < s; i++) {
        a[i] = arguments[i];
      }
      1 === a.length && a[0].constructor && "Object" === Object.prototype.toString.call(a[0]).slice(8, -1) ? t = a[0] : (_a7 = a, _a8 = _slicedToArray(_a7, 2), e = _a8[0], t = _a8[1], _a7), t || (t = {}), t = extend({}, t), e && !t.el && (t.el = e);
      var r = getDocument();
      if (t.el && "string" == typeof t.el && r.querySelectorAll(t.el).length > 1) {
        var _e30 = [];
        return r.querySelectorAll(t.el).forEach(function (s) {
          var a = extend({}, t, {
            el: s
          });
          _e30.push(new Swiper(a));
        }), _e30;
      }
      var n = this;
      n.__swiper__ = !0, n.support = getSupport(), n.device = getDevice({
        userAgent: t.userAgent
      }), n.browser = getBrowser(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = _toConsumableArray(n.__modules__), t.modules && Array.isArray(t.modules) && (_n$modules = n.modules).push.apply(_n$modules, _toConsumableArray(t.modules));
      var l = {};
      n.modules.forEach(function (e) {
        e({
          params: t,
          swiper: n,
          extendParams: moduleExtendParams(t, l),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n)
        });
      });
      var o = extend({}, defaults, l);
      return n.params = extend({}, o, extendedDefaults, t), n.originalParams = extend({}, n.params), n.passedParams = extend({}, t), n.params && n.params.on && Object.keys(n.params.on).forEach(function (e) {
        n.on(e, n.params.on[e]);
      }), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
        enabled: n.params.enabled,
        el: e,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal: function isHorizontal() {
          return "horizontal" === n.params.direction;
        },
        isVertical: function isVertical() {
          return "vertical" === n.params.direction;
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: n.params.allowSlideNext,
        allowSlidePrev: n.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: n.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: []
        },
        allowClick: !0,
        allowTouchMove: n.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        imagesToLoad: [],
        imagesLoaded: 0
      }), n.emit("_swiper"), n.params.init && n.init(), n;
    }
    _createClass(Swiper, [{
      key: "getSlideIndex",
      value: function getSlideIndex(e) {
        var t = this.slidesEl,
          s = this.params,
          a = elementIndex(elementChildren(t, ".".concat(s.slideClass, ", swiper-slide"))[0]);
        return elementIndex(e) - a;
      }
    }, {
      key: "getSlideIndexByData",
      value: function getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter(function (t) {
          return 1 * t.getAttribute("data-swiper-slide-index") === e;
        })[0]);
      }
    }, {
      key: "recalcSlides",
      value: function recalcSlides() {
        var e = this.slidesEl,
          t = this.params;
        this.slides = elementChildren(e, ".".concat(t.slideClass, ", swiper-slide"));
      }
    }, {
      key: "enable",
      value: function enable() {
        var e = this;
        e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
      }
    }, {
      key: "disable",
      value: function disable() {
        var e = this;
        e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
      }
    }, {
      key: "setProgress",
      value: function setProgress(e, t) {
        var s = this;
        e = Math.min(Math.max(e, 0), 1);
        var a = s.minTranslate(),
          i = (s.maxTranslate() - a) * e + a;
        s.translateTo(i, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
      }
    }, {
      key: "emitContainerClasses",
      value: function emitContainerClasses() {
        var e = this;
        if (!e.params._emitClasses || !e.el) return;
        var t = e.el.className.split(" ").filter(function (t) {
          return 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass);
        });
        e.emit("_containerClasses", t.join(" "));
      }
    }, {
      key: "getSlideClasses",
      value: function getSlideClasses(e) {
        var t = this;
        return t.destroyed ? "" : e.className.split(" ").filter(function (e) {
          return 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass);
        }).join(" ");
      }
    }, {
      key: "emitSlidesClasses",
      value: function emitSlidesClasses() {
        var e = this;
        if (!e.params._emitClasses || !e.el) return;
        var t = [];
        e.slides.forEach(function (s) {
          var a = e.getSlideClasses(s);
          t.push({
            slideEl: s,
            classNames: a
          }), e.emit("_slideClass", s, a);
        }), e.emit("_slideClasses", t);
      }
    }, {
      key: "slidesPerViewDynamic",
      value: function slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        var s = this.params,
          a = this.slides,
          i = this.slidesGrid,
          r = this.slidesSizesGrid,
          n = this.size,
          l = this.activeIndex;
        var o = 1;
        if (s.centeredSlides) {
          var _e31,
            _t22 = a[l].swiperSlideSize;
          for (var _s16 = l + 1; _s16 < a.length; _s16 += 1) {
            a[_s16] && !_e31 && (_t22 += a[_s16].swiperSlideSize, o += 1, _t22 > n && (_e31 = !0));
          }
          for (var _s17 = l - 1; _s17 >= 0; _s17 -= 1) {
            a[_s17] && !_e31 && (_t22 += a[_s17].swiperSlideSize, o += 1, _t22 > n && (_e31 = !0));
          }
        } else if ("current" === e) for (var _e32 = l + 1; _e32 < a.length; _e32 += 1) {
          (t ? i[_e32] + r[_e32] - i[l] < n : i[_e32] - i[l] < n) && (o += 1);
        } else for (var _e33 = l - 1; _e33 >= 0; _e33 -= 1) {
          i[l] - i[_e33] < n && (o += 1);
        }
        return o;
      }
    }, {
      key: "update",
      value: function update() {
        var e = this;
        if (!e || e.destroyed) return;
        var t = e.snapGrid,
          s = e.params;
        function a() {
          var t = e.rtlTranslate ? -1 * e.translate : e.translate,
            s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        var i;
        s.breakpoints && e.setBreakpoint(), _toConsumableArray(e.el.querySelectorAll('[loading="lazy"]')).forEach(function (t) {
          t.complete && processLazyPreloader(e, t);
        }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (a(), e.params.autoHeight && e.updateAutoHeight()) : (i = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), i || a()), s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
      }
    }, {
      key: "changeDirection",
      value: function changeDirection(e, t) {
        void 0 === t && (t = !0);
        var s = this,
          a = s.params.direction;
        return e || (e = "horizontal" === a ? "vertical" : "horizontal"), e === a || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove("".concat(s.params.containerModifierClass).concat(a)), s.el.classList.add("".concat(s.params.containerModifierClass).concat(e)), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach(function (t) {
          "vertical" === e ? t.style.width = "" : t.style.height = "";
        }), s.emit("changeDirection"), t && s.update()), s;
      }
    }, {
      key: "changeLanguageDirection",
      value: function changeLanguageDirection(e) {
        var t = this;
        t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.el.classList.add("".concat(t.params.containerModifierClass, "rtl")), t.el.dir = "rtl") : (t.el.classList.remove("".concat(t.params.containerModifierClass, "rtl")), t.el.dir = "ltr"), t.update());
      }
    }, {
      key: "mount",
      value: function mount(e) {
        var t = this;
        if (t.mounted) return !0;
        var s = e || t.params.el;
        if ("string" == typeof s && (s = document.querySelector(s)), !s) return !1;
        s.swiper = t, s.shadowEl && (t.isElement = !0);
        var a = function a() {
          return ".".concat((t.params.wrapperClass || "").trim().split(" ").join("."));
        };
        var i = function () {
          if (s && s.shadowRoot && s.shadowRoot.querySelector) {
            return s.shadowRoot.querySelector(a());
          }
          return elementChildren(s, a())[0];
        }();
        return !i && t.params.createElements && (i = createElement("div", t.params.wrapperClass), s.append(i), elementChildren(s, ".".concat(t.params.slideClass)).forEach(function (e) {
          i.append(e);
        })), Object.assign(t, {
          el: s,
          wrapperEl: i,
          slidesEl: t.isElement ? s : i,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === elementStyle(s, "direction"),
          rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === elementStyle(s, "direction")),
          wrongRTL: "-webkit-box" === elementStyle(i, "display")
        }), !0;
      }
    }, {
      key: "init",
      value: function init(e) {
        var t = this;
        if (t.initialized) return t;
        return !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents(), _toConsumableArray(t.el.querySelectorAll('[loading="lazy"]')).forEach(function (e) {
          e.complete ? processLazyPreloader(t, e) : e.addEventListener("load", function (e) {
            processLazyPreloader(t, e.target);
          });
        }), preload(t), t.initialized = !0, preload(t), t.emit("init"), t.emit("afterInit")), t;
      }
    }, {
      key: "destroy",
      value: function destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        var s = this,
          a = s.params,
          i = s.el,
          r = s.wrapperEl,
          n = s.slides;
        return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), i.removeAttribute("style"), r.removeAttribute("style"), n && n.length && n.forEach(function (e) {
          e.classList.remove(a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index");
        })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach(function (e) {
          s.off(e);
        }), !1 !== e && (s.el.swiper = null, deleteProps(s)), s.destroyed = !0), null;
      }
    }], [{
      key: "extendDefaults",
      value: function extendDefaults(e) {
        extend(extendedDefaults, e);
      }
    }, {
      key: "extendedDefaults",
      get: function get() {
        return extendedDefaults;
      }
    }, {
      key: "defaults",
      get: function get() {
        return defaults;
      }
    }, {
      key: "installModule",
      value: function installModule(e) {
        Swiper.prototype.__modules__ || (Swiper.prototype.__modules__ = []);
        var t = Swiper.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
    }, {
      key: "use",
      value: function use(e) {
        return Array.isArray(e) ? (e.forEach(function (e) {
          return Swiper.installModule(e);
        }), Swiper) : (Swiper.installModule(e), Swiper);
      }
    }]);
    return Swiper;
  }();
  function Virtual(e) {
    var t,
      s = e.swiper,
      a = e.extendParams,
      i = e.on,
      r = e.emit;
    a({
      virtual: {
        enabled: !1,
        slides: [],
        cache: !0,
        renderSlide: null,
        renderExternal: null,
        renderExternalUpdate: !0,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    });
    var n = getDocument();
    s.virtual = {
      cache: {},
      from: void 0,
      to: void 0,
      slides: [],
      offset: 0,
      slidesGrid: []
    };
    var l = n.createElement("div");
    function o(e, t) {
      var a = s.params.virtual;
      if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t];
      var i;
      return a.renderSlide ? (i = a.renderSlide.call(s, e, t), "string" == typeof i && (l.innerHTML = i, i = l.children[0])) : i = s.isElement ? createElement("swiper-slide") : createElement("div", s.params.slideClass), i.setAttribute("data-swiper-slide-index", t), a.renderSlide || (i.innerHTML = e), a.cache && (s.virtual.cache[t] = i), i;
    }
    function d(e) {
      var _s$params = s.params,
        t = _s$params.slidesPerView,
        a = _s$params.slidesPerGroup,
        i = _s$params.centeredSlides,
        n = _s$params.loop,
        _s$params$virtual = s.params.virtual,
        l = _s$params$virtual.addSlidesBefore,
        d = _s$params$virtual.addSlidesAfter,
        _s$virtual = s.virtual,
        c = _s$virtual.from,
        p = _s$virtual.to,
        u = _s$virtual.slides,
        m = _s$virtual.slidesGrid,
        f = _s$virtual.offset;
      s.params.cssMode || s.updateActiveIndex();
      var h = s.activeIndex || 0;
      var g, v, w;
      g = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top", i ? (v = Math.floor(t / 2) + a + d, w = Math.floor(t / 2) + a + l) : (v = t + (a - 1) + d, w = (n ? t : a) + l);
      var b = h - w,
        y = h + v;
      n || (b = Math.max(b, 0), y = Math.min(y, u.length - 1));
      var E = (s.slidesGrid[b] || 0) - (s.slidesGrid[0] || 0);
      function S() {
        s.updateSlides(), s.updateProgress(), s.updateSlidesClasses(), r("virtualUpdate");
      }
      if (n && h >= w ? (b -= w, i || (E += s.slidesGrid[0])) : n && h < w && (b = -w, i && (E += s.slidesGrid[0])), Object.assign(s.virtual, {
        from: b,
        to: y,
        offset: E,
        slidesGrid: s.slidesGrid,
        slidesBefore: w,
        slidesAfter: v
      }), c === b && p === y && !e) return s.slidesGrid !== m && E !== f && s.slides.forEach(function (e) {
        e.style[g] = "".concat(E, "px");
      }), s.updateProgress(), void r("virtualUpdate");
      if (s.params.virtual.renderExternal) return s.params.virtual.renderExternal.call(s, {
        offset: E,
        from: b,
        to: y,
        slides: function () {
          var e = [];
          for (var _t23 = b; _t23 <= y; _t23 += 1) {
            e.push(u[_t23]);
          }
          return e;
        }()
      }), void (s.params.virtual.renderExternalUpdate ? S() : r("virtualUpdate"));
      var x = [],
        T = [],
        M = function M(e) {
          var t = e;
          return e < 0 ? t = u.length + e : t >= u.length && (t -= u.length), t;
        };
      if (e) s.slidesEl.querySelectorAll(".".concat(s.params.slideClass, ", swiper-slide")).forEach(function (e) {
        e.remove();
      });else for (var _e34 = c; _e34 <= p; _e34 += 1) {
        if (_e34 < b || _e34 > y) {
          var _t24 = M(_e34);
          s.slidesEl.querySelectorAll(".".concat(s.params.slideClass, "[data-swiper-slide-index=\"").concat(_t24, "\"], swiper-slide[data-swiper-slide-index=\"").concat(_t24, "\"]")).forEach(function (e) {
            e.remove();
          });
        }
      }
      var C = n ? -u.length : 0,
        P = n ? 2 * u.length : u.length;
      for (var _t25 = C; _t25 < P; _t25 += 1) {
        if (_t25 >= b && _t25 <= y) {
          var _s18 = M(_t25);
          void 0 === p || e ? T.push(_s18) : (_t25 > p && T.push(_s18), _t25 < c && x.push(_s18));
        }
      }
      if (T.forEach(function (e) {
        s.slidesEl.append(o(u[e], e));
      }), n) for (var _e35 = x.length - 1; _e35 >= 0; _e35 -= 1) {
        var _t26 = x[_e35];
        s.slidesEl.prepend(o(u[_t26], _t26));
      } else x.sort(function (e, t) {
        return t - e;
      }), x.forEach(function (e) {
        s.slidesEl.prepend(o(u[e], e));
      });
      elementChildren(s.slidesEl, ".swiper-slide, swiper-slide").forEach(function (e) {
        e.style[g] = "".concat(E, "px");
      }), S();
    }
    i("beforeInit", function () {
      if (!s.params.virtual.enabled) return;
      var e;
      if (void 0 === s.passedParams.virtual.slides) {
        var _t27 = _toConsumableArray(s.slidesEl.children).filter(function (e) {
          return e.matches(".".concat(s.params.slideClass, ", swiper-slide"));
        });
        _t27 && _t27.length && (s.virtual.slides = _toConsumableArray(_t27), e = !0, _t27.forEach(function (e, t) {
          e.setAttribute("data-swiper-slide-index", t), s.virtual.cache[t] = e, e.remove();
        }));
      }
      e || (s.virtual.slides = s.params.virtual.slides), s.classNames.push("".concat(s.params.containerModifierClass, "virtual")), s.params.watchSlidesProgress = !0, s.originalParams.watchSlidesProgress = !0, s.params.initialSlide || d();
    }), i("setTranslate", function () {
      s.params.virtual.enabled && (s.params.cssMode && !s._immediateVirtual ? (clearTimeout(t), t = setTimeout(function () {
        d();
      }, 100)) : d());
    }), i("init update resize", function () {
      s.params.virtual.enabled && s.params.cssMode && setCSSProperty(s.wrapperEl, "--swiper-virtual-size", "".concat(s.virtualSize, "px"));
    }), Object.assign(s.virtual, {
      appendSlide: function appendSlide(e) {
        if ("object" == _typeof(e) && "length" in e) for (var _t28 = 0; _t28 < e.length; _t28 += 1) {
          e[_t28] && s.virtual.slides.push(e[_t28]);
        } else s.virtual.slides.push(e);
        d(!0);
      },
      prependSlide: function prependSlide(e) {
        var t = s.activeIndex;
        var a = t + 1,
          i = 1;
        if (Array.isArray(e)) {
          for (var _t29 = 0; _t29 < e.length; _t29 += 1) {
            e[_t29] && s.virtual.slides.unshift(e[_t29]);
          }
          a = t + e.length, i = e.length;
        } else s.virtual.slides.unshift(e);
        if (s.params.virtual.cache) {
          var _e36 = s.virtual.cache,
            _t30 = {};
          Object.keys(_e36).forEach(function (s) {
            var a = _e36[s],
              r = a.getAttribute("data-swiper-slide-index");
            r && a.setAttribute("data-swiper-slide-index", parseInt(r, 10) + i), _t30[parseInt(s, 10) + i] = a;
          }), s.virtual.cache = _t30;
        }
        d(!0), s.slideTo(a, 0);
      },
      removeSlide: function removeSlide(e) {
        if (null == e) return;
        var t = s.activeIndex;
        if (Array.isArray(e)) for (var _a9 = e.length - 1; _a9 >= 0; _a9 -= 1) {
          s.virtual.slides.splice(e[_a9], 1), s.params.virtual.cache && delete s.virtual.cache[e[_a9]], e[_a9] < t && (t -= 1), t = Math.max(t, 0);
        } else s.virtual.slides.splice(e, 1), s.params.virtual.cache && delete s.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
        d(!0), s.slideTo(t, 0);
      },
      removeAllSlides: function removeAllSlides() {
        s.virtual.slides = [], s.params.virtual.cache && (s.virtual.cache = {}), d(!0), s.slideTo(0, 0);
      },
      update: d
    });
  }
  function Keyboard(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on,
      i = e.emit;
    var r = getDocument(),
      n = getWindow();
    function l(e) {
      if (!t.enabled) return;
      var s = t.rtlTranslate;
      var a = e;
      a.originalEvent && (a = a.originalEvent);
      var l = a.keyCode || a.charCode,
        o = t.params.keyboard.pageUpDown,
        d = o && 33 === l,
        c = o && 34 === l,
        p = 37 === l,
        u = 39 === l,
        m = 38 === l,
        f = 40 === l;
      if (!t.allowSlideNext && (t.isHorizontal() && u || t.isVertical() && f || c)) return !1;
      if (!t.allowSlidePrev && (t.isHorizontal() && p || t.isVertical() && m || d)) return !1;
      if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || r.activeElement && r.activeElement.nodeName && ("input" === r.activeElement.nodeName.toLowerCase() || "textarea" === r.activeElement.nodeName.toLowerCase()))) {
        if (t.params.keyboard.onlyInViewport && (d || c || p || u || m || f)) {
          var _e37 = !1;
          if (elementParents(t.el, ".".concat(t.params.slideClass, ", swiper-slide")).length > 0 && 0 === elementParents(t.el, ".".concat(t.params.slideActiveClass)).length) return;
          var _a10 = t.el,
            _i8 = _a10.clientWidth,
            _r5 = _a10.clientHeight,
            _l4 = n.innerWidth,
            _o4 = n.innerHeight,
            _d = elementOffset(_a10);
          s && (_d.left -= _a10.scrollLeft);
          var _c = [[_d.left, _d.top], [_d.left + _i8, _d.top], [_d.left, _d.top + _r5], [_d.left + _i8, _d.top + _r5]];
          for (var _t31 = 0; _t31 < _c.length; _t31 += 1) {
            var _s19 = _c[_t31];
            if (_s19[0] >= 0 && _s19[0] <= _l4 && _s19[1] >= 0 && _s19[1] <= _o4) {
              if (0 === _s19[0] && 0 === _s19[1]) continue;
              _e37 = !0;
            }
          }
          if (!_e37) return;
        }
        t.isHorizontal() ? ((d || c || p || u) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((c || u) && !s || (d || p) && s) && t.slideNext(), ((d || p) && !s || (c || u) && s) && t.slidePrev()) : ((d || c || m || f) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (c || f) && t.slideNext(), (d || m) && t.slidePrev()), i("keyPress", l);
      }
    }
    function o() {
      t.keyboard.enabled || (r.addEventListener("keydown", l), t.keyboard.enabled = !0);
    }
    function d() {
      t.keyboard.enabled && (r.removeEventListener("keydown", l), t.keyboard.enabled = !1);
    }
    t.keyboard = {
      enabled: !1
    }, s({
      keyboard: {
        enabled: !1,
        onlyInViewport: !0,
        pageUpDown: !0
      }
    }), a("init", function () {
      t.params.keyboard.enabled && o();
    }), a("destroy", function () {
      t.keyboard.enabled && d();
    }), Object.assign(t.keyboard, {
      enable: o,
      disable: d
    });
  }
  function Mousewheel(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on,
      i = e.emit;
    var r = getWindow();
    var n;
    s({
      mousewheel: {
        enabled: !1,
        releaseOnEdges: !1,
        invert: !1,
        forceToAxis: !1,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null
      }
    }), t.mousewheel = {
      enabled: !1
    };
    var l,
      o = now();
    var d = [];
    function c() {
      t.enabled && (t.mouseEntered = !0);
    }
    function p() {
      t.enabled && (t.mouseEntered = !1);
    }
    function u(e) {
      return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta) && !(t.params.mousewheel.thresholdTime && now() - o < t.params.mousewheel.thresholdTime) && (e.delta >= 6 && now() - o < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), i("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), i("scroll", e.raw)), o = new r.Date().getTime(), !1));
    }
    function m(e) {
      var s = e,
        a = !0;
      if (!t.enabled) return;
      var r = t.params.mousewheel;
      t.params.cssMode && s.preventDefault();
      var o = t.el;
      "container" !== t.params.mousewheel.eventsTarget && (o = document.querySelector(t.params.mousewheel.eventsTarget));
      var c = o && o.contains(s.target);
      if (!t.mouseEntered && !c && !r.releaseOnEdges) return !0;
      s.originalEvent && (s = s.originalEvent);
      var p = 0;
      var m = t.rtlTranslate ? -1 : 1,
        f = function (e) {
          var t = 0,
            s = 0,
            a = 0,
            i = 0;
          return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = s, s = 0), a = 10 * t, i = 10 * s, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (a = e.deltaX), e.shiftKey && !a && (a = i, i = 0), (a || i) && e.deltaMode && (1 === e.deltaMode ? (a *= 40, i *= 40) : (a *= 800, i *= 800)), a && !t && (t = a < 1 ? -1 : 1), i && !s && (s = i < 1 ? -1 : 1), {
            spinX: t,
            spinY: s,
            pixelX: a,
            pixelY: i
          };
        }(s);
      if (r.forceToAxis) {
        if (t.isHorizontal()) {
          if (!(Math.abs(f.pixelX) > Math.abs(f.pixelY))) return !0;
          p = -f.pixelX * m;
        } else {
          if (!(Math.abs(f.pixelY) > Math.abs(f.pixelX))) return !0;
          p = -f.pixelY;
        }
      } else p = Math.abs(f.pixelX) > Math.abs(f.pixelY) ? -f.pixelX * m : -f.pixelY;
      if (0 === p) return !0;
      r.invert && (p = -p);
      var h = t.getTranslate() + p * r.sensitivity;
      if (h >= t.minTranslate() && (h = t.minTranslate()), h <= t.maxTranslate() && (h = t.maxTranslate()), a = !!t.params.loop || !(h === t.minTranslate() || h === t.maxTranslate()), a && t.params.nested && s.stopPropagation(), t.params.freeMode && t.params.freeMode.enabled) {
        var _e38 = {
            time: now(),
            delta: Math.abs(p),
            direction: Math.sign(p)
          },
          _a11 = l && _e38.time < l.time + 500 && _e38.delta <= l.delta && _e38.direction === l.direction;
        if (!_a11) {
          l = void 0;
          var _o5 = t.getTranslate() + p * r.sensitivity;
          var _c2 = t.isBeginning,
            _u = t.isEnd;
          if (_o5 >= t.minTranslate() && (_o5 = t.minTranslate()), _o5 <= t.maxTranslate() && (_o5 = t.maxTranslate()), t.setTransition(0), t.setTranslate(_o5), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses(), (!_c2 && t.isBeginning || !_u && t.isEnd) && t.updateSlidesClasses(), t.params.loop && t.loopFix({
            direction: _e38.direction < 0 ? "next" : "prev",
            byMousewheel: !0
          }), t.params.freeMode.sticky) {
            clearTimeout(n), n = void 0, d.length >= 15 && d.shift();
            var _s20 = d.length ? d[d.length - 1] : void 0,
              _a12 = d[0];
            if (d.push(_e38), _s20 && (_e38.delta > _s20.delta || _e38.direction !== _s20.direction)) d.splice(0);else if (d.length >= 15 && _e38.time - _a12.time < 500 && _a12.delta - _e38.delta >= 1 && _e38.delta <= 6) {
              var _s21 = p > 0 ? .8 : .2;
              l = _e38, d.splice(0), n = nextTick(function () {
                t.slideToClosest(t.params.speed, !0, void 0, _s21);
              }, 0);
            }
            n || (n = nextTick(function () {
              l = _e38, d.splice(0), t.slideToClosest(t.params.speed, !0, void 0, .5);
            }, 500));
          }
          if (_a11 || i("scroll", s), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), _o5 === t.minTranslate() || _o5 === t.maxTranslate()) return !0;
        }
      } else {
        var _s22 = {
          time: now(),
          delta: Math.abs(p),
          direction: Math.sign(p),
          raw: e
        };
        d.length >= 2 && d.shift();
        var _a13 = d.length ? d[d.length - 1] : void 0;
        if (d.push(_s22), _a13 ? (_s22.direction !== _a13.direction || _s22.delta > _a13.delta || _s22.time > _a13.time + 150) && u(_s22) : u(_s22), function (e) {
          var s = t.params.mousewheel;
          if (e.direction < 0) {
            if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
          } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges) return !0;
          return !1;
        }(_s22)) return !0;
      }
      return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1;
    }
    function f(e) {
      var s = t.el;
      "container" !== t.params.mousewheel.eventsTarget && (s = document.querySelector(t.params.mousewheel.eventsTarget)), s[e]("mouseenter", c), s[e]("mouseleave", p), s[e]("wheel", m);
    }
    function h() {
      return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", m), !0) : !t.mousewheel.enabled && (f("addEventListener"), t.mousewheel.enabled = !0, !0);
    }
    function g() {
      return t.params.cssMode ? (t.wrapperEl.addEventListener(event, m), !0) : !!t.mousewheel.enabled && (f("removeEventListener"), t.mousewheel.enabled = !1, !0);
    }
    a("init", function () {
      !t.params.mousewheel.enabled && t.params.cssMode && g(), t.params.mousewheel.enabled && h();
    }), a("destroy", function () {
      t.params.cssMode && h(), t.mousewheel.enabled && g();
    }), Object.assign(t.mousewheel, {
      enable: h,
      disable: g
    });
  }
  function createElementIfNotDefined(e, t, s, a) {
    return e.params.createElements && Object.keys(a).forEach(function (i) {
      if (!s[i] && !0 === s.auto) {
        var r = elementChildren(e.el, ".".concat(a[i]))[0];
        r || (r = createElement("div", a[i]), r.className = a[i], e.el.append(r)), s[i] = r, t[i] = r;
      }
    }), s;
  }
  function Navigation(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on,
      i = e.emit;
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    }), t.navigation = {
      nextEl: null,
      prevEl: null
    };
    var r = function r(e) {
      return Array.isArray(e) || (e = [e].filter(function (e) {
        return !!e;
      })), e;
    };
    function n(e) {
      var s;
      return e && "string" == typeof e && t.isElement && (s = t.el.shadowRoot.querySelector(e), s) ? s : (e && ("string" == typeof e && (s = _toConsumableArray(document.querySelectorAll(e))), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))), e && !s ? e : s);
    }
    function l(e, s) {
      var a = t.params.navigation;
      (e = r(e)).forEach(function (e) {
        var _e$classList2;
        e && ((_e$classList2 = e.classList)[s ? "add" : "remove"].apply(_e$classList2, _toConsumableArray(a.disabledClass.split(" "))), "BUTTON" === e.tagName && (e.disabled = s), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](a.lockClass));
      });
    }
    function o() {
      var _t$navigation = t.navigation,
        e = _t$navigation.nextEl,
        s = _t$navigation.prevEl;
      if (t.params.loop) return l(s, !1), void l(e, !1);
      l(s, t.isBeginning && !t.params.rewind), l(e, t.isEnd && !t.params.rewind);
    }
    function d(e) {
      e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), i("navigationPrev"));
    }
    function c(e) {
      e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), i("navigationNext"));
    }
    function p() {
      var e = t.params.navigation;
      if (t.params.navigation = createElementIfNotDefined(t, t.originalParams.navigation, t.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      }), !e.nextEl && !e.prevEl) return;
      var s = n(e.nextEl),
        a = n(e.prevEl);
      Object.assign(t.navigation, {
        nextEl: s,
        prevEl: a
      }), s = r(s), a = r(a);
      var i = function i(s, a) {
        var _s$classList2;
        s && s.addEventListener("click", "next" === a ? c : d), !t.enabled && s && (_s$classList2 = s.classList).add.apply(_s$classList2, _toConsumableArray(e.lockClass.split(" ")));
      };
      s.forEach(function (e) {
        return i(e, "next");
      }), a.forEach(function (e) {
        return i(e, "prev");
      });
    }
    function u() {
      var _t$navigation2 = t.navigation,
        e = _t$navigation2.nextEl,
        s = _t$navigation2.prevEl;
      e = r(e), s = r(s);
      var a = function a(e, s) {
        var _e$classList3;
        e.removeEventListener("click", "next" === s ? c : d), (_e$classList3 = e.classList).remove.apply(_e$classList3, _toConsumableArray(t.params.navigation.disabledClass.split(" ")));
      };
      e.forEach(function (e) {
        return a(e, "next");
      }), s.forEach(function (e) {
        return a(e, "prev");
      });
    }
    a("init", function () {
      !1 === t.params.navigation.enabled ? m() : (p(), o());
    }), a("toEdge fromEdge lock unlock", function () {
      o();
    }), a("destroy", function () {
      u();
    }), a("enable disable", function () {
      var _t$navigation3 = t.navigation,
        e = _t$navigation3.nextEl,
        s = _t$navigation3.prevEl;
      e = r(e), s = r(s), [].concat(_toConsumableArray(e), _toConsumableArray(s)).filter(function (e) {
        return !!e;
      }).forEach(function (e) {
        return e.classList[t.enabled ? "remove" : "add"](t.params.navigation.lockClass);
      });
    }), a("click", function (e, s) {
      var _t$navigation4 = t.navigation,
        a = _t$navigation4.nextEl,
        n = _t$navigation4.prevEl;
      a = r(a), n = r(n);
      var l = s.target;
      if (t.params.navigation.hideOnClick && !n.includes(l) && !a.includes(l)) {
        if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === l || t.pagination.el.contains(l))) return;
        var _e39;
        a.length ? _e39 = a[0].classList.contains(t.params.navigation.hiddenClass) : n.length && (_e39 = n[0].classList.contains(t.params.navigation.hiddenClass)), i(!0 === _e39 ? "navigationShow" : "navigationHide"), [].concat(_toConsumableArray(a), _toConsumableArray(n)).filter(function (e) {
          return !!e;
        }).forEach(function (e) {
          return e.classList.toggle(t.params.navigation.hiddenClass);
        });
      }
    });
    var m = function m() {
      var _t$el$classList;
      (_t$el$classList = t.el.classList).add.apply(_t$el$classList, _toConsumableArray(t.params.navigation.navigationDisabledClass.split(" "))), u();
    };
    Object.assign(t.navigation, {
      enable: function enable() {
        var _t$el$classList2;
        (_t$el$classList2 = t.el.classList).remove.apply(_t$el$classList2, _toConsumableArray(t.params.navigation.navigationDisabledClass.split(" "))), p(), o();
      },
      disable: m,
      update: o,
      init: p,
      destroy: u
    });
  }
  function classesToSelector(e) {
    return void 0 === e && (e = ""), ".".concat(e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, "."));
  }
  function Pagination(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on,
      i = e.emit;
    var r = "swiper-pagination";
    var n;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: function formatFractionCurrent(e) {
          return e;
        },
        formatFractionTotal: function formatFractionTotal(e) {
          return e;
        },
        bulletClass: "".concat(r, "-bullet"),
        bulletActiveClass: "".concat(r, "-bullet-active"),
        modifierClass: "".concat(r, "-"),
        currentClass: "".concat(r, "-current"),
        totalClass: "".concat(r, "-total"),
        hiddenClass: "".concat(r, "-hidden"),
        progressbarFillClass: "".concat(r, "-progressbar-fill"),
        progressbarOppositeClass: "".concat(r, "-progressbar-opposite"),
        clickableClass: "".concat(r, "-clickable"),
        lockClass: "".concat(r, "-lock"),
        horizontalClass: "".concat(r, "-horizontal"),
        verticalClass: "".concat(r, "-vertical"),
        paginationDisabledClass: "".concat(r, "-disabled")
      }
    }), t.pagination = {
      el: null,
      bullets: []
    };
    var l = 0;
    var o = function o(e) {
      return Array.isArray(e) || (e = [e].filter(function (e) {
        return !!e;
      })), e;
    };
    function d() {
      return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length;
    }
    function c(e, s) {
      var a = t.params.pagination.bulletActiveClass;
      e && (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && (e.classList.add("".concat(a, "-").concat(s)), (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && e.classList.add("".concat(a, "-").concat(s, "-").concat(s)));
    }
    function p(e) {
      var s = e.target.closest(classesToSelector(t.params.pagination.bulletClass));
      if (!s) return;
      e.preventDefault();
      var a = elementIndex(s) * t.params.slidesPerGroup;
      if (t.params.loop) {
        if (t.realIndex === a) return;
        (a < t.loopedSlides || a > t.slides.length - t.loopedSlides) && t.loopFix({
          direction: a < t.loopedSlides ? "prev" : "next",
          activeSlideIndex: a,
          slideTo: !1
        }), t.slideToLoop(a);
      } else t.slideTo(a);
    }
    function u() {
      var e = t.rtl,
        s = t.params.pagination;
      if (d()) return;
      var a,
        r = t.pagination.el;
      r = o(r);
      var p = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
        u = t.params.loop ? Math.ceil(p / t.params.slidesPerGroup) : t.snapGrid.length;
      if (a = t.params.loop ? t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex : void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0, "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
        var _i9 = t.pagination.bullets;
        var _o6, _d2, _p;
        if (s.dynamicBullets && (n = elementOuterSize(_i9[0], t.isHorizontal() ? "width" : "height", !0), r.forEach(function (e) {
          e.style[t.isHorizontal() ? "width" : "height"] = n * (s.dynamicMainBullets + 4) + "px";
        }), s.dynamicMainBullets > 1 && void 0 !== t.previousIndex && (l += a - (t.previousIndex || 0), l > s.dynamicMainBullets - 1 ? l = s.dynamicMainBullets - 1 : l < 0 && (l = 0)), _o6 = Math.max(a - l, 0), _d2 = _o6 + (Math.min(_i9.length, s.dynamicMainBullets) - 1), _p = (_d2 + _o6) / 2), _i9.forEach(function (e) {
          var _e$classList4;
          var t = _toConsumableArray(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(function (e) {
            return "".concat(s.bulletActiveClass).concat(e);
          })).map(function (e) {
            return "string" == typeof e && e.includes(" ") ? e.split(" ") : e;
          }).flat();
          (_e$classList4 = e.classList).remove.apply(_e$classList4, _toConsumableArray(t));
        }), r.length > 1) _i9.forEach(function (e) {
          var _e$classList5, _e$classList6;
          var t = elementIndex(e);
          t === a && (_e$classList5 = e.classList).add.apply(_e$classList5, _toConsumableArray(s.bulletActiveClass.split(" "))), s.dynamicBullets && (t >= _o6 && t <= _d2 && (_e$classList6 = e.classList).add.apply(_e$classList6, _toConsumableArray("".concat(s.bulletActiveClass, "-main").split(" "))), t === _o6 && c(e, "prev"), t === _d2 && c(e, "next"));
        });else {
          var _e40$classList;
          var _e40 = _i9[a];
          if (_e40 && (_e40$classList = _e40.classList).add.apply(_e40$classList, _toConsumableArray(s.bulletActiveClass.split(" "))), s.dynamicBullets) {
            var _e41 = _i9[_o6],
              _t32 = _i9[_d2];
            for (var _e42 = _o6; _e42 <= _d2; _e42 += 1) {
              var _i9$_e42$classList;
              _i9[_e42] && (_i9$_e42$classList = _i9[_e42].classList).add.apply(_i9$_e42$classList, _toConsumableArray("".concat(s.bulletActiveClass, "-main").split(" ")));
            }
            c(_e41, "prev"), c(_t32, "next");
          }
        }
        if (s.dynamicBullets) {
          var _a14 = Math.min(_i9.length, s.dynamicMainBullets + 4),
            _r6 = (n * _a14 - n) / 2 - _p * n,
            _l5 = e ? "right" : "left";
          _i9.forEach(function (e) {
            e.style[t.isHorizontal() ? _l5 : "top"] = "".concat(_r6, "px");
          });
        }
      }
      r.forEach(function (e, r) {
        if ("fraction" === s.type && (e.querySelectorAll(classesToSelector(s.currentClass)).forEach(function (e) {
          e.textContent = s.formatFractionCurrent(a + 1);
        }), e.querySelectorAll(classesToSelector(s.totalClass)).forEach(function (e) {
          e.textContent = s.formatFractionTotal(u);
        })), "progressbar" === s.type) {
          var _i10;
          _i10 = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
          var _r7 = (a + 1) / u;
          var _n4 = 1,
            _l6 = 1;
          "horizontal" === _i10 ? _n4 = _r7 : _l6 = _r7, e.querySelectorAll(classesToSelector(s.progressbarFillClass)).forEach(function (e) {
            e.style.transform = "translate3d(0,0,0) scaleX(".concat(_n4, ") scaleY(").concat(_l6, ")"), e.style.transitionDuration = "".concat(t.params.speed, "ms");
          });
        }
        "custom" === s.type && s.renderCustom ? (e.innerHTML = s.renderCustom(t, a + 1, u), 0 === r && i("paginationRender", e)) : (0 === r && i("paginationRender", e), i("paginationUpdate", e)), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
      });
    }
    function m() {
      var e = t.params.pagination;
      if (d()) return;
      var s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length;
      var a = t.pagination.el;
      a = o(a);
      var r = "";
      if ("bullets" === e.type) {
        var _a15 = t.params.loop ? Math.ceil(s / t.params.slidesPerGroup) : t.snapGrid.length;
        t.params.freeMode && t.params.freeMode.enabled && _a15 > s && (_a15 = s);
        for (var _s23 = 0; _s23 < _a15; _s23 += 1) {
          e.renderBullet ? r += e.renderBullet.call(t, _s23, e.bulletClass) : r += "<".concat(e.bulletElement, " class=\"").concat(e.bulletClass, "\"></").concat(e.bulletElement, ">");
        }
      }
      "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : "<span class=\"".concat(e.currentClass, "\"></span> / <span class=\"").concat(e.totalClass, "\"></span>")), "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : "<span class=\"".concat(e.progressbarFillClass, "\"></span>")), t.pagination.bullets = [], a.forEach(function (s) {
        var _t$pagination$bullets;
        "custom" !== e.type && (s.innerHTML = r || ""), "bullets" === e.type && (_t$pagination$bullets = t.pagination.bullets).push.apply(_t$pagination$bullets, _toConsumableArray(s.querySelectorAll(classesToSelector(e.bulletClass))));
      }), "custom" !== e.type && i("paginationRender", a[0]);
    }
    function f() {
      t.params.pagination = createElementIfNotDefined(t, t.originalParams.pagination, t.params.pagination, {
        el: "swiper-pagination"
      });
      var e = t.params.pagination;
      if (!e.el) return;
      var s;
      "string" == typeof e.el && t.isElement && (s = t.el.shadowRoot.querySelector(e.el)), s || "string" != typeof e.el || (s = _toConsumableArray(document.querySelectorAll(e.el))), s || (s = e.el), s && 0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(s) && s.length > 1 && (s = _toConsumableArray(t.el.querySelectorAll(e.el)), s.length > 1 && (s = s.filter(function (e) {
        return elementParents(e, ".swiper")[0] === t.el;
      })[0])), Array.isArray(s) && 1 === s.length && (s = s[0]), Object.assign(t.pagination, {
        el: s
      }), s = o(s), s.forEach(function (s) {
        "bullets" === e.type && e.clickable && s.classList.add(e.clickableClass), s.classList.add(e.modifierClass + e.type), s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass), "bullets" === e.type && e.dynamicBullets && (s.classList.add("".concat(e.modifierClass).concat(e.type, "-dynamic")), l = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && s.classList.add(e.progressbarOppositeClass), e.clickable && s.addEventListener("click", p), t.enabled || s.classList.add(e.lockClass);
      }));
    }
    function h() {
      var e = t.params.pagination;
      if (d()) return;
      var s = t.pagination.el;
      s && (s = o(s), s.forEach(function (s) {
        s.classList.remove(e.hiddenClass), s.classList.remove(e.modifierClass + e.type), s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), e.clickable && s.removeEventListener("click", p);
      })), t.pagination.bullets && t.pagination.bullets.forEach(function (t) {
        var _t$classList;
        return (_t$classList = t.classList).remove.apply(_t$classList, _toConsumableArray(e.bulletActiveClass.split(" ")));
      });
    }
    a("init", function () {
      !1 === t.params.pagination.enabled ? g() : (f(), m(), u());
    }), a("activeIndexChange", function () {
      void 0 === t.snapIndex && u();
    }), a("snapIndexChange", function () {
      u();
    }), a("snapGridLengthChange", function () {
      m(), u();
    }), a("destroy", function () {
      h();
    }), a("enable disable", function () {
      var e = t.pagination.el;
      e && (e = o(e), e.forEach(function (e) {
        return e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass);
      }));
    }), a("lock unlock", function () {
      u();
    }), a("click", function (e, s) {
      var a = s.target;
      var r = t.pagination.el;
      if (Array.isArray(r) || (r = [r].filter(function (e) {
        return !!e;
      })), t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !a.classList.contains(t.params.pagination.bulletClass)) {
        if (t.navigation && (t.navigation.nextEl && a === t.navigation.nextEl || t.navigation.prevEl && a === t.navigation.prevEl)) return;
        var _e43 = r[0].classList.contains(t.params.pagination.hiddenClass);
        i(!0 === _e43 ? "paginationShow" : "paginationHide"), r.forEach(function (e) {
          return e.classList.toggle(t.params.pagination.hiddenClass);
        });
      }
    });
    var g = function g() {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      var e = t.pagination.el;
      e && (e = o(e), e.forEach(function (e) {
        return e.classList.add(t.params.pagination.paginationDisabledClass);
      })), h();
    };
    Object.assign(t.pagination, {
      enable: function enable() {
        t.el.classList.remove(t.params.pagination.paginationDisabledClass);
        var e = t.pagination.el;
        e && (e = o(e), e.forEach(function (e) {
          return e.classList.remove(t.params.pagination.paginationDisabledClass);
        })), f(), m(), u();
      },
      disable: g,
      render: m,
      update: u,
      init: f,
      destroy: h
    });
  }
  function Scrollbar(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on,
      i = e.emit;
    var r = getDocument();
    var n,
      l,
      o,
      d,
      c = !1,
      p = null,
      u = null;
    function m() {
      if (!t.params.scrollbar.el || !t.scrollbar.el) return;
      var e = t.scrollbar,
        s = t.rtlTranslate,
        a = e.dragEl,
        i = e.el,
        r = t.params.scrollbar,
        n = t.params.loop ? t.progressLoop : t.progress;
      var d = l,
        c = (o - l) * n;
      s ? (c = -c, c > 0 ? (d = l - c, c = 0) : -c + l > o && (d = o + c)) : c < 0 ? (d = l + c, c = 0) : c + l > o && (d = o - c), t.isHorizontal() ? (a.style.transform = "translate3d(".concat(c, "px, 0, 0)"), a.style.width = "".concat(d, "px")) : (a.style.transform = "translate3d(0px, ".concat(c, "px, 0)"), a.style.height = "".concat(d, "px")), r.hide && (clearTimeout(p), i.style.opacity = 1, p = setTimeout(function () {
        i.style.opacity = 0, i.style.transitionDuration = "400ms";
      }, 1e3));
    }
    function f() {
      if (!t.params.scrollbar.el || !t.scrollbar.el) return;
      var e = t.scrollbar,
        s = e.dragEl,
        a = e.el;
      s.style.width = "", s.style.height = "", o = t.isHorizontal() ? a.offsetWidth : a.offsetHeight, d = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), l = "auto" === t.params.scrollbar.dragSize ? o * d : parseInt(t.params.scrollbar.dragSize, 10), t.isHorizontal() ? s.style.width = "".concat(l, "px") : s.style.height = "".concat(l, "px"), a.style.display = d >= 1 ? "none" : "", t.params.scrollbar.hide && (a.style.opacity = 0), t.params.watchOverflow && t.enabled && e.el.classList[t.isLocked ? "add" : "remove"](t.params.scrollbar.lockClass);
    }
    function h(e) {
      return t.isHorizontal() ? e.clientX : e.clientY;
    }
    function g(e) {
      var s = t.scrollbar,
        a = t.rtlTranslate,
        i = s.el;
      var r;
      r = (h(e) - elementOffset(i)[t.isHorizontal() ? "left" : "top"] - (null !== n ? n : l / 2)) / (o - l), r = Math.max(Math.min(r, 1), 0), a && (r = 1 - r);
      var d = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
      t.updateProgress(d), t.setTranslate(d), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    function v(e) {
      var s = t.params.scrollbar,
        a = t.scrollbar,
        r = t.wrapperEl,
        l = a.el,
        o = a.dragEl;
      c = !0, n = e.target === o ? h(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), r.style.transitionDuration = "100ms", o.style.transitionDuration = "100ms", g(e), clearTimeout(u), l.style.transitionDuration = "0ms", s.hide && (l.style.opacity = 1), t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"), i("scrollbarDragStart", e);
    }
    function w(e) {
      var s = t.scrollbar,
        a = t.wrapperEl,
        r = s.el,
        n = s.dragEl;
      c && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, g(e), a.style.transitionDuration = "0ms", r.style.transitionDuration = "0ms", n.style.transitionDuration = "0ms", i("scrollbarDragMove", e));
    }
    function b(e) {
      var s = t.params.scrollbar,
        a = t.scrollbar,
        r = t.wrapperEl,
        n = a.el;
      c && (c = !1, t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "", r.style.transitionDuration = ""), s.hide && (clearTimeout(u), u = nextTick(function () {
        n.style.opacity = 0, n.style.transitionDuration = "400ms";
      }, 1e3)), i("scrollbarDragEnd", e), s.snapOnRelease && t.slideToClosest());
    }
    function y(e) {
      var s = t.scrollbar,
        a = t.params,
        i = s.el;
      if (!i) return;
      var n = i,
        l = !!a.passiveListeners && {
          passive: !1,
          capture: !1
        },
        o = !!a.passiveListeners && {
          passive: !0,
          capture: !1
        };
      if (!n) return;
      var d = "on" === e ? "addEventListener" : "removeEventListener";
      n[d]("pointerdown", v, l), r[d]("pointermove", w, l), r[d]("pointerup", b, o);
    }
    function E() {
      var e = t.scrollbar,
        s = t.el;
      t.params.scrollbar = createElementIfNotDefined(t, t.originalParams.scrollbar, t.params.scrollbar, {
        el: "swiper-scrollbar"
      });
      var a = t.params.scrollbar;
      if (!a.el) return;
      var i, n;
      "string" == typeof a.el && t.isElement && (i = t.el.shadowRoot.querySelector(a.el)), i || "string" != typeof a.el ? i || (i = a.el) : i = r.querySelectorAll(a.el), t.params.uniqueNavElements && "string" == typeof a.el && i.length > 1 && 1 === s.querySelectorAll(a.el).length && (i = s.querySelector(a.el)), i.length > 0 && (i = i[0]), i.classList.add(t.isHorizontal() ? a.horizontalClass : a.verticalClass), i && (n = i.querySelector(".".concat(t.params.scrollbar.dragClass)), n || (n = createElement("div", t.params.scrollbar.dragClass), i.append(n))), Object.assign(e, {
        el: i,
        dragEl: n
      }), a.draggable && t.params.scrollbar.el && t.scrollbar.el && y("on"), i && i.classList[t.enabled ? "remove" : "add"](t.params.scrollbar.lockClass);
    }
    function S() {
      var e = t.params.scrollbar,
        s = t.scrollbar.el;
      s && s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.params.scrollbar.el && t.scrollbar.el && y("off");
    }
    s({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
        scrollbarDisabledClass: "swiper-scrollbar-disabled",
        horizontalClass: "swiper-scrollbar-horizontal",
        verticalClass: "swiper-scrollbar-vertical"
      }
    }), t.scrollbar = {
      el: null,
      dragEl: null
    }, a("init", function () {
      !1 === t.params.scrollbar.enabled ? x() : (E(), f(), m());
    }), a("update resize observerUpdate lock unlock", function () {
      f();
    }), a("setTranslate", function () {
      m();
    }), a("setTransition", function (e, s) {
      !function (e) {
        t.params.scrollbar.el && t.scrollbar.el && (t.scrollbar.dragEl.style.transitionDuration = "".concat(e, "ms"));
      }(s);
    }), a("enable disable", function () {
      var e = t.scrollbar.el;
      e && e.classList[t.enabled ? "remove" : "add"](t.params.scrollbar.lockClass);
    }), a("destroy", function () {
      S();
    });
    var x = function x() {
      t.el.classList.add(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.el && t.scrollbar.el.classList.add(t.params.scrollbar.scrollbarDisabledClass), S();
    };
    Object.assign(t.scrollbar, {
      enable: function enable() {
        t.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.el && t.scrollbar.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass), E(), f(), m();
      },
      disable: x,
      updateSize: f,
      setTranslate: m,
      init: E,
      destroy: S
    });
  }
  function Parallax(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      parallax: {
        enabled: !1
      }
    });
    var i = function i(e, s) {
        var a = t.rtl,
          i = a ? -1 : 1,
          r = e.getAttribute("data-swiper-parallax") || "0";
        var n = e.getAttribute("data-swiper-parallax-x"),
          l = e.getAttribute("data-swiper-parallax-y");
        var o = e.getAttribute("data-swiper-parallax-scale"),
          d = e.getAttribute("data-swiper-parallax-opacity"),
          c = e.getAttribute("data-swiper-parallax-rotate");
        if (n || l ? (n = n || "0", l = l || "0") : t.isHorizontal() ? (n = r, l = "0") : (l = r, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * s * i + "%" : n * s * i + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px", null != d) {
          var _t33 = d - (d - 1) * (1 - Math.abs(s));
          e.style.opacity = _t33;
        }
        var p = "translate3d(".concat(n, ", ").concat(l, ", 0px)");
        if (null != o) {
          p += " scale(".concat(o - (o - 1) * (1 - Math.abs(s)), ")");
        }
        if (c && null != c) {
          p += " rotate(".concat(c * s * -1, "deg)");
        }
        e.style.transform = p;
      },
      r = function r() {
        var e = t.el,
          s = t.slides,
          a = t.progress,
          r = t.snapGrid;
        elementChildren(e, "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach(function (e) {
          i(e, a);
        }), s.forEach(function (e, s) {
          var n = e.progress;
          t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (n += Math.ceil(s / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), e.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]").forEach(function (e) {
            i(e, n);
          });
        });
      };
    a("beforeInit", function () {
      t.params.parallax.enabled && (t.params.watchSlidesProgress = !0, t.originalParams.watchSlidesProgress = !0);
    }), a("init", function () {
      t.params.parallax.enabled && r();
    }), a("setTranslate", function () {
      t.params.parallax.enabled && r();
    }), a("setTransition", function (e, s) {
      t.params.parallax.enabled && function (e) {
        void 0 === e && (e = t.params.speed);
        var s = t.el;
        s.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach(function (t) {
          var s = parseInt(t.getAttribute("data-swiper-parallax-duration"), 10) || e;
          0 === e && (s = 0), t.style.transitionDuration = "".concat(s, "ms");
        });
      }(s);
    });
  }
  function Zoom(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on,
      i = e.emit;
    var r = getWindow();
    s({
      zoom: {
        enabled: !1,
        maxRatio: 3,
        minRatio: 1,
        toggle: !0,
        containerClass: "swiper-zoom-container",
        zoomedSlideClass: "swiper-slide-zoomed"
      }
    }), t.zoom = {
      enabled: !1
    };
    var n,
      l,
      o = 1,
      d = !1;
    var c = [],
      p = {
        originX: 0,
        originY: 0,
        slideEl: void 0,
        slideWidth: void 0,
        slideHeight: void 0,
        imageEl: void 0,
        imageWrapEl: void 0,
        maxRatio: 3
      },
      u = {
        isTouched: void 0,
        isMoved: void 0,
        currentX: void 0,
        currentY: void 0,
        minX: void 0,
        minY: void 0,
        maxX: void 0,
        maxY: void 0,
        width: void 0,
        height: void 0,
        startX: void 0,
        startY: void 0,
        touchesStart: {},
        touchesCurrent: {}
      },
      m = {
        x: void 0,
        y: void 0,
        prevPositionX: void 0,
        prevPositionY: void 0,
        prevTime: void 0
      };
    var f = 1;
    function h() {
      if (c.length < 2) return 1;
      var e = c[0].pageX,
        t = c[0].pageY,
        s = c[1].pageX,
        a = c[1].pageY;
      return Math.sqrt(Math.pow(s - e, 2) + Math.pow(a - t, 2));
    }
    function g(e) {
      var s = t.isElement ? "swiper-slide" : ".".concat(t.params.slideClass);
      return !!e.target.matches(s) || t.slides.filter(function (t) {
        return t.contains(e.target);
      }).length > 0;
    }
    function v(e) {
      if ("mouse" === e.pointerType && c.splice(0, c.length), !g(e)) return;
      var s = t.params.zoom;
      if (n = !1, l = !1, c.push(e), !(c.length < 2)) {
        if (n = !0, p.scaleStart = h(), !p.slideEl) {
          p.slideEl = e.target.closest(".".concat(t.params.slideClass, ", swiper-slide")), p.slideEl || (p.slideEl = t.slides[t.activeIndex]);
          var _a16 = p.slideEl.querySelector(".".concat(s.containerClass));
          if (_a16 && (_a16 = _a16.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), p.imageEl = _a16, p.imageWrapEl = _a16 ? elementParents(p.imageEl, ".".concat(s.containerClass))[0] : void 0, !p.imageWrapEl) return void (p.imageEl = void 0);
          p.maxRatio = p.imageWrapEl.getAttribute("data-swiper-zoom") || s.maxRatio;
        }
        if (p.imageEl) {
          var _ref3 = function () {
              if (c.length < 2) return {
                x: null,
                y: null
              };
              var e = p.imageEl.getBoundingClientRect();
              return [(c[0].pageX + (c[1].pageX - c[0].pageX) / 2 - e.x) / o, (c[0].pageY + (c[1].pageY - c[0].pageY) / 2 - e.y) / o];
            }(),
            _ref4 = _slicedToArray(_ref3, 2),
            _e44 = _ref4[0],
            _t34 = _ref4[1];
          p.originX = _e44, p.originY = _t34, p.imageEl.style.transitionDuration = "0ms";
        }
        d = !0;
      }
    }
    function w(e) {
      if (!g(e)) return;
      var s = t.params.zoom,
        a = t.zoom,
        i = c.findIndex(function (t) {
          return t.pointerId === e.pointerId;
        });
      i >= 0 && (c[i] = e), c.length < 2 || (l = !0, p.scaleMove = h(), p.imageEl && (a.scale = p.scaleMove / p.scaleStart * o, a.scale > p.maxRatio && (a.scale = p.maxRatio - 1 + Math.pow(a.scale - p.maxRatio + 1, .5)), a.scale < s.minRatio && (a.scale = s.minRatio + 1 - Math.pow(s.minRatio - a.scale + 1, .5)), p.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(a.scale, ")")));
    }
    function b(e) {
      if (!g(e)) return;
      if ("mouse" === e.pointerType && "pointerout" === e.type) return;
      var s = t.params.zoom,
        a = t.zoom,
        i = c.findIndex(function (t) {
          return t.pointerId === e.pointerId;
        });
      i >= 0 && c.splice(i, 1), n && l && (n = !1, l = !1, p.imageEl && (a.scale = Math.max(Math.min(a.scale, p.maxRatio), s.minRatio), p.imageEl.style.transitionDuration = "".concat(t.params.speed, "ms"), p.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(a.scale, ")"), o = a.scale, d = !1, a.scale > 1 && p.slideEl ? p.slideEl.classList.add("".concat(s.zoomedSlideClass)) : a.scale <= 1 && p.slideEl && p.slideEl.classList.remove("".concat(s.zoomedSlideClass)), 1 === a.scale && (p.originX = 0, p.originY = 0, p.slideEl = void 0)));
    }
    function y(e) {
      if (!g(e) || !function (e) {
        var s = ".".concat(t.params.zoom.containerClass);
        return !!e.target.matches(s) || _toConsumableArray(t.el.querySelectorAll(s)).filter(function (t) {
          return t.contains(e.target);
        }).length > 0;
      }(e)) return;
      var s = t.zoom;
      if (!p.imageEl) return;
      if (!u.isTouched || !p.slideEl) return;
      u.isMoved || (u.width = p.imageEl.offsetWidth, u.height = p.imageEl.offsetHeight, u.startX = getTranslate(p.imageWrapEl, "x") || 0, u.startY = getTranslate(p.imageWrapEl, "y") || 0, p.slideWidth = p.slideEl.offsetWidth, p.slideHeight = p.slideEl.offsetHeight, p.imageWrapEl.style.transitionDuration = "0ms");
      var a = u.width * s.scale,
        i = u.height * s.scale;
      if (a < p.slideWidth && i < p.slideHeight) return;
      u.minX = Math.min(p.slideWidth / 2 - a / 2, 0), u.maxX = -u.minX, u.minY = Math.min(p.slideHeight / 2 - i / 2, 0), u.maxY = -u.minY, u.touchesCurrent.x = c.length > 0 ? c[0].pageX : e.pageX, u.touchesCurrent.y = c.length > 0 ? c[0].pageY : e.pageY;
      if (Math.max(Math.abs(u.touchesCurrent.x - u.touchesStart.x), Math.abs(u.touchesCurrent.y - u.touchesStart.y)) > 5 && (t.allowClick = !1), !u.isMoved && !d) {
        if (t.isHorizontal() && (Math.floor(u.minX) === Math.floor(u.startX) && u.touchesCurrent.x < u.touchesStart.x || Math.floor(u.maxX) === Math.floor(u.startX) && u.touchesCurrent.x > u.touchesStart.x)) return void (u.isTouched = !1);
        if (!t.isHorizontal() && (Math.floor(u.minY) === Math.floor(u.startY) && u.touchesCurrent.y < u.touchesStart.y || Math.floor(u.maxY) === Math.floor(u.startY) && u.touchesCurrent.y > u.touchesStart.y)) return void (u.isTouched = !1);
      }
      e.cancelable && e.preventDefault(), e.stopPropagation(), u.isMoved = !0;
      var r = (s.scale - o) / (p.maxRatio - t.params.zoom.minRatio),
        n = p.originX,
        l = p.originY;
      u.currentX = u.touchesCurrent.x - u.touchesStart.x + u.startX + r * (u.width - 2 * n), u.currentY = u.touchesCurrent.y - u.touchesStart.y + u.startY + r * (u.height - 2 * l), u.currentX < u.minX && (u.currentX = u.minX + 1 - Math.pow(u.minX - u.currentX + 1, .8)), u.currentX > u.maxX && (u.currentX = u.maxX - 1 + Math.pow(u.currentX - u.maxX + 1, .8)), u.currentY < u.minY && (u.currentY = u.minY + 1 - Math.pow(u.minY - u.currentY + 1, .8)), u.currentY > u.maxY && (u.currentY = u.maxY - 1 + Math.pow(u.currentY - u.maxY + 1, .8)), m.prevPositionX || (m.prevPositionX = u.touchesCurrent.x), m.prevPositionY || (m.prevPositionY = u.touchesCurrent.y), m.prevTime || (m.prevTime = Date.now()), m.x = (u.touchesCurrent.x - m.prevPositionX) / (Date.now() - m.prevTime) / 2, m.y = (u.touchesCurrent.y - m.prevPositionY) / (Date.now() - m.prevTime) / 2, Math.abs(u.touchesCurrent.x - m.prevPositionX) < 2 && (m.x = 0), Math.abs(u.touchesCurrent.y - m.prevPositionY) < 2 && (m.y = 0), m.prevPositionX = u.touchesCurrent.x, m.prevPositionY = u.touchesCurrent.y, m.prevTime = Date.now(), p.imageWrapEl.style.transform = "translate3d(".concat(u.currentX, "px, ").concat(u.currentY, "px,0)");
    }
    function E() {
      var e = t.zoom;
      p.slideEl && t.activeIndex !== t.slides.indexOf(p.slideEl) && (p.imageEl && (p.imageEl.style.transform = "translate3d(0,0,0) scale(1)"), p.imageWrapEl && (p.imageWrapEl.style.transform = "translate3d(0,0,0)"), p.slideEl.classList.remove("".concat(t.params.zoom.zoomedSlideClass)), e.scale = 1, o = 1, p.slideEl = void 0, p.imageEl = void 0, p.imageWrapEl = void 0, p.originX = 0, p.originY = 0);
    }
    function S(e) {
      var s = t.zoom,
        a = t.params.zoom;
      if (!p.slideEl) {
        e && e.target && (p.slideEl = e.target.closest(".".concat(t.params.slideClass, ", swiper-slide"))), p.slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? p.slideEl = elementChildren(t.slidesEl, ".".concat(t.params.slideActiveClass))[0] : p.slideEl = t.slides[t.activeIndex]);
        var _s24 = p.slideEl.querySelector(".".concat(a.containerClass));
        _s24 && (_s24 = _s24.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), p.imageEl = _s24, p.imageWrapEl = _s24 ? elementParents(p.imageEl, ".".concat(a.containerClass))[0] : void 0;
      }
      if (!p.imageEl || !p.imageWrapEl) return;
      var i, n, l, d, c, m, f, h, g, v, w, b, y, E, S, x, T, M;
      t.params.cssMode && (t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.touchAction = "none"), p.slideEl.classList.add("".concat(a.zoomedSlideClass)), void 0 === u.touchesStart.x && e ? (i = e.pageX, n = e.pageY) : (i = u.touchesStart.x, n = u.touchesStart.y);
      var C = "number" == typeof e ? e : null;
      1 === o && C && (i = void 0, n = void 0), s.scale = C || p.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, o = C || p.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, !e || 1 === o && C ? (f = 0, h = 0) : (T = p.slideEl.offsetWidth, M = p.slideEl.offsetHeight, l = elementOffset(p.slideEl).left + r.scrollX, d = elementOffset(p.slideEl).top + r.scrollY, c = l + T / 2 - i, m = d + M / 2 - n, g = p.imageEl.offsetWidth, v = p.imageEl.offsetHeight, w = g * s.scale, b = v * s.scale, y = Math.min(T / 2 - w / 2, 0), E = Math.min(M / 2 - b / 2, 0), S = -y, x = -E, f = c * s.scale, h = m * s.scale, f < y && (f = y), f > S && (f = S), h < E && (h = E), h > x && (h = x)), C && 1 === s.scale && (p.originX = 0, p.originY = 0), p.imageWrapEl.style.transitionDuration = "300ms", p.imageWrapEl.style.transform = "translate3d(".concat(f, "px, ").concat(h, "px,0)"), p.imageEl.style.transitionDuration = "300ms", p.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(s.scale, ")");
    }
    function x() {
      var e = t.zoom,
        s = t.params.zoom;
      if (!p.slideEl) {
        t.params.virtual && t.params.virtual.enabled && t.virtual ? p.slideEl = elementChildren(t.slidesEl, ".".concat(t.params.slideActiveClass))[0] : p.slideEl = t.slides[t.activeIndex];
        var _e45 = p.slideEl.querySelector(".".concat(s.containerClass));
        _e45 && (_e45 = _e45.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), p.imageEl = _e45, p.imageWrapEl = _e45 ? elementParents(p.imageEl, ".".concat(s.containerClass))[0] : void 0;
      }
      p.imageEl && p.imageWrapEl && (t.params.cssMode && (t.wrapperEl.style.overflow = "", t.wrapperEl.style.touchAction = ""), e.scale = 1, o = 1, p.imageWrapEl.style.transitionDuration = "300ms", p.imageWrapEl.style.transform = "translate3d(0,0,0)", p.imageEl.style.transitionDuration = "300ms", p.imageEl.style.transform = "translate3d(0,0,0) scale(1)", p.slideEl.classList.remove("".concat(s.zoomedSlideClass)), p.slideEl = void 0, p.originX = 0, p.originY = 0);
    }
    function T(e) {
      var s = t.zoom;
      s.scale && 1 !== s.scale ? x() : S(e);
    }
    function M() {
      return {
        passiveListener: !!t.params.passiveListeners && {
          passive: !0,
          capture: !1
        },
        activeListenerWithCapture: !t.params.passiveListeners || {
          passive: !1,
          capture: !0
        }
      };
    }
    function C() {
      var e = t.zoom;
      if (e.enabled) return;
      e.enabled = !0;
      var _M = M(),
        s = _M.passiveListener,
        a = _M.activeListenerWithCapture;
      t.wrapperEl.addEventListener("pointerdown", v, s), t.wrapperEl.addEventListener("pointermove", w, a), ["pointerup", "pointercancel", "pointerout"].forEach(function (e) {
        t.wrapperEl.addEventListener(e, b, s);
      }), t.wrapperEl.addEventListener("pointermove", y, a);
    }
    function P() {
      var e = t.zoom;
      if (!e.enabled) return;
      e.enabled = !1;
      var _M2 = M(),
        s = _M2.passiveListener,
        a = _M2.activeListenerWithCapture;
      t.wrapperEl.removeEventListener("pointerdown", v, s), t.wrapperEl.removeEventListener("pointermove", w, a), ["pointerup", "pointercancel", "pointerout"].forEach(function (e) {
        t.wrapperEl.removeEventListener(e, b, s);
      }), t.wrapperEl.removeEventListener("pointermove", y, a);
    }
    Object.defineProperty(t.zoom, "scale", {
      get: function get() {
        return f;
      },
      set: function set(e) {
        if (f !== e) {
          var _t35 = p.imageEl,
            _s25 = p.slideEl;
          i("zoomChange", e, _t35, _s25);
        }
        f = e;
      }
    }), a("init", function () {
      t.params.zoom.enabled && C();
    }), a("destroy", function () {
      P();
    }), a("touchStart", function (e, s) {
      t.zoom.enabled && function (e) {
        var s = t.device;
        if (!p.imageEl) return;
        if (u.isTouched) return;
        s.android && e.cancelable && e.preventDefault(), u.isTouched = !0;
        var a = c.length > 0 ? c[0] : e;
        u.touchesStart.x = a.pageX, u.touchesStart.y = a.pageY;
      }(s);
    }), a("touchEnd", function (e, s) {
      t.zoom.enabled && function () {
        var e = t.zoom;
        if (!p.imageEl) return;
        if (!u.isTouched || !u.isMoved) return u.isTouched = !1, void (u.isMoved = !1);
        u.isTouched = !1, u.isMoved = !1;
        var s = 300,
          a = 300;
        var i = m.x * s,
          r = u.currentX + i,
          n = m.y * a,
          l = u.currentY + n;
        0 !== m.x && (s = Math.abs((r - u.currentX) / m.x)), 0 !== m.y && (a = Math.abs((l - u.currentY) / m.y));
        var o = Math.max(s, a);
        u.currentX = r, u.currentY = l;
        var d = u.width * e.scale,
          c = u.height * e.scale;
        u.minX = Math.min(p.slideWidth / 2 - d / 2, 0), u.maxX = -u.minX, u.minY = Math.min(p.slideHeight / 2 - c / 2, 0), u.maxY = -u.minY, u.currentX = Math.max(Math.min(u.currentX, u.maxX), u.minX), u.currentY = Math.max(Math.min(u.currentY, u.maxY), u.minY), p.imageWrapEl.style.transitionDuration = "".concat(o, "ms"), p.imageWrapEl.style.transform = "translate3d(".concat(u.currentX, "px, ").concat(u.currentY, "px,0)");
      }();
    }), a("doubleTap", function (e, s) {
      !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && T(s);
    }), a("transitionEnd", function () {
      t.zoom.enabled && t.params.zoom.enabled && E();
    }), a("slideChange", function () {
      t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && E();
    }), Object.assign(t.zoom, {
      enable: C,
      disable: P,
      "in": S,
      out: x,
      toggle: T
    });
  }
  function Controller(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    function i(e, t) {
      var s = function () {
        var e, t, s;
        return function (a, i) {
          for (t = -1, e = a.length; e - t > 1;) {
            s = e + t >> 1, a[s] <= i ? t = s : e = s;
          }
          return e;
        };
      }();
      var a, i;
      return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
        return e ? (i = s(this.x, e), a = i - 1, (e - this.x[a]) * (this.y[i] - this.y[a]) / (this.x[i] - this.x[a]) + this.y[a]) : 0;
      }, this;
    }
    function r() {
      t.controller.control && t.controller.spline && (t.controller.spline = void 0, delete t.controller.spline);
    }
    s({
      controller: {
        control: void 0,
        inverse: !1,
        by: "slide"
      }
    }), t.controller = {
      control: void 0
    }, a("beforeInit", function () {
      if ("undefined" != typeof window && ("string" == typeof t.params.controller.control || t.params.controller.control instanceof HTMLElement)) {
        var _e46 = document.querySelector(t.params.controller.control);
        if (_e46 && _e46.swiper) t.controller.control = _e46.swiper;else if (_e46) {
          var _s26 = function _s26(a) {
            t.controller.control = a.detail[0], t.update(), _e46.removeEventListener("init", _s26);
          };
          _e46.addEventListener("init", _s26);
        }
      } else t.controller.control = t.params.controller.control;
    }), a("update", function () {
      r();
    }), a("resize", function () {
      r();
    }), a("observerUpdate", function () {
      r();
    }), a("setTranslate", function (e, s, a) {
      t.controller.control && t.controller.setTranslate(s, a);
    }), a("setTransition", function (e, s, a) {
      t.controller.control && t.controller.setTransition(s, a);
    }), Object.assign(t.controller, {
      setTranslate: function setTranslate(e, s) {
        var a = t.controller.control;
        var r, n;
        var l = t.constructor;
        function o(e) {
          if (e.destroyed) return;
          var s = t.rtlTranslate ? -t.translate : t.translate;
          "slide" === t.params.controller.by && (!function (e) {
            t.controller.spline || (t.controller.spline = t.params.loop ? new i(t.slidesGrid, e.slidesGrid) : new i(t.snapGrid, e.snapGrid));
          }(e), n = -t.controller.spline.interpolate(-s)), n && "container" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()), n = (s - t.minTranslate()) * r + e.minTranslate()), t.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, t), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        if (Array.isArray(a)) for (var _e47 = 0; _e47 < a.length; _e47 += 1) {
          a[_e47] !== s && a[_e47] instanceof l && o(a[_e47]);
        } else a instanceof l && s !== a && o(a);
      },
      setTransition: function setTransition(e, s) {
        var a = t.constructor,
          i = t.controller.control;
        var r;
        function n(s) {
          s.destroyed || (s.setTransition(e, t), 0 !== e && (s.transitionStart(), s.params.autoHeight && nextTick(function () {
            s.updateAutoHeight();
          }), elementTransitionEnd(s.wrapperEl, function () {
            i && s.transitionEnd();
          })));
        }
        if (Array.isArray(i)) for (r = 0; r < i.length; r += 1) {
          i[r] !== s && i[r] instanceof a && n(i[r]);
        } else i instanceof a && s !== i && n(i);
      }
    });
  }
  function A11y(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      a11y: {
        enabled: !0,
        notificationClass: "swiper-notification",
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        slideLabelMessage: "{{index}} / {{slidesLength}}",
        containerMessage: null,
        containerRoleDescriptionMessage: null,
        itemRoleDescriptionMessage: null,
        slideRole: "group",
        id: null
      }
    }), t.a11y = {
      clicked: !1
    };
    var i = null;
    function r(e) {
      var t = i;
      0 !== t.length && (t.innerHTML = "", t.innerHTML = e);
    }
    var n = function n(e) {
      return Array.isArray(e) || (e = [e].filter(function (e) {
        return !!e;
      })), e;
    };
    function l(e) {
      (e = n(e)).forEach(function (e) {
        e.setAttribute("tabIndex", "0");
      });
    }
    function o(e) {
      (e = n(e)).forEach(function (e) {
        e.setAttribute("tabIndex", "-1");
      });
    }
    function d(e, t) {
      (e = n(e)).forEach(function (e) {
        e.setAttribute("role", t);
      });
    }
    function c(e, t) {
      (e = n(e)).forEach(function (e) {
        e.setAttribute("aria-roledescription", t);
      });
    }
    function p(e, t) {
      (e = n(e)).forEach(function (e) {
        e.setAttribute("aria-label", t);
      });
    }
    function u(e) {
      (e = n(e)).forEach(function (e) {
        e.setAttribute("aria-disabled", !0);
      });
    }
    function m(e) {
      (e = n(e)).forEach(function (e) {
        e.setAttribute("aria-disabled", !1);
      });
    }
    function f(e) {
      if (13 !== e.keyCode && 32 !== e.keyCode) return;
      var s = t.params.a11y,
        a = e.target;
      t.pagination && t.pagination.el && (a === t.pagination.el || t.pagination.el.contains(e.target)) && !e.target.matches(classesToSelector(t.params.pagination.bulletClass)) || (t.navigation && t.navigation.nextEl && a === t.navigation.nextEl && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)), t.navigation && t.navigation.prevEl && a === t.navigation.prevEl && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)), t.pagination && a.matches(classesToSelector(t.params.pagination.bulletClass)) && a.click());
    }
    function h() {
      return t.pagination && t.pagination.bullets && t.pagination.bullets.length;
    }
    function g() {
      return h() && t.params.pagination.clickable;
    }
    var v = function v(e, t, s) {
        l(e), "BUTTON" !== e.tagName && (d(e, "button"), e.addEventListener("keydown", f)), p(e, s), function (e, t) {
          (e = n(e)).forEach(function (e) {
            e.setAttribute("aria-controls", t);
          });
        }(e, t);
      },
      w = function w() {
        t.a11y.clicked = !0;
      },
      b = function b() {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            t.destroyed || (t.a11y.clicked = !1);
          });
        });
      },
      y = function y(e) {
        if (t.a11y.clicked) return;
        var s = e.target.closest(".".concat(t.params.slideClass, ", swiper-slide"));
        if (!s || !t.slides.includes(s)) return;
        var a = t.slides.indexOf(s) === t.activeIndex,
          i = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(s);
        a || i || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0, t.slideTo(t.slides.indexOf(s), 0));
      },
      E = function E() {
        var e = t.params.a11y;
        e.itemRoleDescriptionMessage && c(t.slides, e.itemRoleDescriptionMessage), e.slideRole && d(t.slides, e.slideRole);
        var s = t.slides.length;
        e.slideLabelMessage && t.slides.forEach(function (a, i) {
          var r = t.params.loop ? parseInt(a.getAttribute("data-swiper-slide-index"), 10) : i;
          p(a, e.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, s));
        });
      },
      S = function S() {
        var e = t.params.a11y;
        t.el.append(i);
        var s = t.el;
        e.containerRoleDescriptionMessage && c(s, e.containerRoleDescriptionMessage), e.containerMessage && p(s, e.containerMessage);
        var a = t.wrapperEl,
          r = e.id || a.getAttribute("id") || "swiper-wrapper-".concat((l = 16, void 0 === l && (l = 16), "x".repeat(l).replace(/x/g, function () {
            return Math.round(16 * Math.random()).toString(16);
          })));
        var l;
        var o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
        var d;
        d = r, n(a).forEach(function (e) {
          e.setAttribute("id", d);
        }), function (e, t) {
          (e = n(e)).forEach(function (e) {
            e.setAttribute("aria-live", t);
          });
        }(a, o), E();
        var _ref5 = t.navigation ? t.navigation : {},
          u = _ref5.nextEl,
          m = _ref5.prevEl;
        if (u = n(u), m = n(m), u && u.forEach(function (t) {
          return v(t, r, e.nextSlideMessage);
        }), m && m.forEach(function (t) {
          return v(t, r, e.prevSlideMessage);
        }), g()) {
          (Array.isArray(t.pagination.el) ? t.pagination.el : [t.pagination.el]).forEach(function (e) {
            e.addEventListener("keydown", f);
          });
        }
        t.el.addEventListener("focus", y, !0), t.el.addEventListener("pointerdown", w, !0), t.el.addEventListener("pointerup", b, !0);
      };
    a("beforeInit", function () {
      i = createElement("span", t.params.a11y.notificationClass), i.setAttribute("aria-live", "assertive"), i.setAttribute("aria-atomic", "true"), t.isElement && i.setAttribute("slot", "container-end");
    }), a("afterInit", function () {
      t.params.a11y.enabled && S();
    }), a("slidesLengthChange snapGridLengthChange slidesGridLengthChange", function () {
      t.params.a11y.enabled && E();
    }), a("fromEdge toEdge afterInit lock unlock", function () {
      t.params.a11y.enabled && function () {
        if (t.params.loop || t.params.rewind || !t.navigation) return;
        var _t$navigation5 = t.navigation,
          e = _t$navigation5.nextEl,
          s = _t$navigation5.prevEl;
        s && (t.isBeginning ? (u(s), o(s)) : (m(s), l(s))), e && (t.isEnd ? (u(e), o(e)) : (m(e), l(e)));
      }();
    }), a("paginationUpdate", function () {
      t.params.a11y.enabled && function () {
        var e = t.params.a11y;
        h() && t.pagination.bullets.forEach(function (s) {
          t.params.pagination.clickable && (l(s), t.params.pagination.renderBullet || (d(s, "button"), p(s, e.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(s) + 1)))), s.matches(classesToSelector(t.params.pagination.bulletActiveClass)) ? s.setAttribute("aria-current", "true") : s.removeAttribute("aria-current");
        });
      }();
    }), a("destroy", function () {
      t.params.a11y.enabled && function () {
        i && i.length > 0 && i.remove();
        var _ref6 = t.navigation ? t.navigation : {},
          e = _ref6.nextEl,
          s = _ref6.prevEl;
        e = n(e), s = n(s), e && e.forEach(function (e) {
          return e.removeEventListener("keydown", f);
        }), s && s.forEach(function (e) {
          return e.removeEventListener("keydown", f);
        }), g() && (Array.isArray(t.pagination.el) ? t.pagination.el : [t.pagination.el]).forEach(function (e) {
          e.removeEventListener("keydown", f);
        });
        t.el.removeEventListener("focus", y, !0), t.el.removeEventListener("pointerdown", w, !0), t.el.removeEventListener("pointerup", b, !0);
      }();
    });
  }
  function History(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      history: {
        enabled: !1,
        root: "",
        replaceState: !1,
        key: "slides",
        keepQuery: !1
      }
    });
    var i = !1,
      r = {};
    var n = function n(e) {
        return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
      },
      l = function l(e) {
        var t = getWindow();
        var s;
        s = e ? new URL(e) : t.location;
        var a = s.pathname.slice(1).split("/").filter(function (e) {
            return "" !== e;
          }),
          i = a.length;
        return {
          key: a[i - 2],
          value: a[i - 1]
        };
      },
      o = function o(e, s) {
        var a = getWindow();
        if (!i || !t.params.history.enabled) return;
        var r;
        r = t.params.url ? new URL(t.params.url) : a.location;
        var l = t.slides[s];
        var o = n(l.getAttribute("data-history"));
        if (t.params.history.root.length > 0) {
          var _s27 = t.params.history.root;
          "/" === _s27[_s27.length - 1] && (_s27 = _s27.slice(0, _s27.length - 1)), o = "".concat(_s27, "/").concat(e ? "".concat(e, "/") : "").concat(o);
        } else r.pathname.includes(e) || (o = "".concat(e ? "".concat(e, "/") : "").concat(o));
        t.params.history.keepQuery && (o += r.search);
        var d = a.history.state;
        d && d.value === o || (t.params.history.replaceState ? a.history.replaceState({
          value: o
        }, null, o) : a.history.pushState({
          value: o
        }, null, o));
      },
      d = function d(e, s, a) {
        if (s) for (var _i11 = 0, _r8 = t.slides.length; _i11 < _r8; _i11 += 1) {
          var _r9 = t.slides[_i11];
          if (n(_r9.getAttribute("data-history")) === s) {
            var _s28 = t.getSlideIndex(_r9);
            t.slideTo(_s28, e, a);
          }
        } else t.slideTo(0, e, a);
      },
      c = function c() {
        r = l(t.params.url), d(t.params.speed, r.value, !1);
      };
    a("init", function () {
      t.params.history.enabled && function () {
        var e = getWindow();
        if (t.params.history) {
          if (!e.history || !e.history.pushState) return t.params.history.enabled = !1, void (t.params.hashNavigation.enabled = !0);
          i = !0, r = l(t.params.url), r.key || r.value ? (d(0, r.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", c)) : t.params.history.replaceState || e.addEventListener("popstate", c);
        }
      }();
    }), a("destroy", function () {
      t.params.history.enabled && function () {
        var e = getWindow();
        t.params.history.replaceState || e.removeEventListener("popstate", c);
      }();
    }), a("transitionEnd _freeModeNoMomentumRelease", function () {
      i && o(t.params.history.key, t.activeIndex);
    }), a("slideChange", function () {
      i && t.params.cssMode && o(t.params.history.key, t.activeIndex);
    });
  }
  function HashNavigation(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.emit,
      i = e.on,
      r = !1;
    var n = getDocument(),
      l = getWindow();
    s({
      hashNavigation: {
        enabled: !1,
        replaceState: !1,
        watchState: !1
      }
    });
    var o = function o() {
        a("hashChange");
        var e = n.location.hash.replace("#", "");
        if (e !== t.slides[t.activeIndex].getAttribute("data-hash")) {
          var _s29 = t.getSlideIndex(elementChildren(t.slidesEl, ".".concat(t.params.slideClass, "[data-hash=\"").concat(e, "\"], swiper-slide[data-hash=\"").concat(e, "\"]"))[0]);
          if (void 0 === _s29) return;
          t.slideTo(_s29);
        }
      },
      d = function d() {
        if (r && t.params.hashNavigation.enabled) if (t.params.hashNavigation.replaceState && l.history && l.history.replaceState) l.history.replaceState(null, null, "#".concat(t.slides[t.activeIndex].getAttribute("data-hash")) || ""), a("hashSet");else {
          var _e48 = t.slides[t.activeIndex],
            _s30 = _e48.getAttribute("data-hash") || _e48.getAttribute("data-history");
          n.location.hash = _s30 || "", a("hashSet");
        }
      };
    i("init", function () {
      t.params.hashNavigation.enabled && function () {
        if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled) return;
        r = !0;
        var e = n.location.hash.replace("#", "");
        if (e) {
          var _s31 = 0;
          for (var _a17 = 0, _i12 = t.slides.length; _a17 < _i12; _a17 += 1) {
            var _i13 = t.slides[_a17];
            if ((_i13.getAttribute("data-hash") || _i13.getAttribute("data-history")) === e) {
              var _e49 = t.getSlideIndex(_i13);
              t.slideTo(_e49, _s31, t.params.runCallbacksOnInit, !0);
            }
          }
        }
        t.params.hashNavigation.watchState && l.addEventListener("hashchange", o);
      }();
    }), i("destroy", function () {
      t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && l.removeEventListener("hashchange", o);
    }), i("transitionEnd _freeModeNoMomentumRelease", function () {
      r && d();
    }), i("slideChange", function () {
      r && t.params.cssMode && d();
    });
  }
  function Autoplay(e) {
    var t,
      s,
      a = e.swiper,
      i = e.extendParams,
      r = e.on,
      n = e.emit,
      l = e.params;
    a.autoplay = {
      running: !1,
      paused: !1,
      timeLeft: 0
    }, i({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !0,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1
      }
    });
    var o,
      d,
      c,
      p,
      u,
      m,
      f,
      h = l && l.autoplay ? l.autoplay.delay : 3e3,
      g = l && l.autoplay ? l.autoplay.delay : 3e3,
      v = new Date().getTime;
    function w(e) {
      a && !a.destroyed && a.wrapperEl && e.target === a.wrapperEl && (a.wrapperEl.removeEventListener("transitionend", w), T());
    }
    var b = function b() {
        if (a.destroyed || !a.autoplay.running) return;
        a.autoplay.paused ? d = !0 : d && (g = o, d = !1);
        var e = a.autoplay.paused ? o : v + g - new Date().getTime();
        a.autoplay.timeLeft = e, n("autoplayTimeLeft", e, e / h), s = requestAnimationFrame(function () {
          b();
        });
      },
      y = function y(e) {
        if (a.destroyed || !a.autoplay.running) return;
        cancelAnimationFrame(s), b();
        var i = void 0 === e ? a.params.autoplay.delay : e;
        h = a.params.autoplay.delay, g = a.params.autoplay.delay;
        var r = function () {
          var e;
          if (e = a.virtual && a.params.virtual.enabled ? a.slides.filter(function (e) {
            return e.classList.contains("swiper-slide-active");
          })[0] : a.slides[a.activeIndex], !e) return;
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        }();
        !Number.isNaN(r) && r > 0 && void 0 === e && (i = r, h = r, g = r), o = i;
        var l = a.params.speed,
          d = function d() {
            a && !a.destroyed && (a.params.autoplay.reverseDirection ? !a.isBeginning || a.params.loop || a.params.rewind ? (a.slidePrev(l, !0, !0), n("autoplay")) : a.params.autoplay.stopOnLastSlide || (a.slideTo(a.slides.length - 1, l, !0, !0), n("autoplay")) : !a.isEnd || a.params.loop || a.params.rewind ? (a.slideNext(l, !0, !0), n("autoplay")) : a.params.autoplay.stopOnLastSlide || (a.slideTo(0, l, !0, !0), n("autoplay")), a.params.cssMode && (v = new Date().getTime(), requestAnimationFrame(function () {
              y();
            })));
          };
        return i > 0 ? (clearTimeout(t), t = setTimeout(function () {
          d();
        }, i)) : requestAnimationFrame(function () {
          d();
        }), i;
      },
      E = function E() {
        a.autoplay.running = !0, y(), n("autoplayStart");
      },
      S = function S() {
        a.autoplay.running = !1, clearTimeout(t), cancelAnimationFrame(s), n("autoplayStop");
      },
      x = function x(e, s) {
        if (a.destroyed || !a.autoplay.running) return;
        clearTimeout(t), e || (f = !0);
        var i = function i() {
          n("autoplayPause"), a.params.autoplay.waitForTransition ? a.wrapperEl.addEventListener("transitionend", w) : T();
        };
        if (a.autoplay.paused = !0, s) return m && (o = a.params.autoplay.delay), m = !1, void i();
        var r = o || a.params.autoplay.delay;
        o = r - (new Date().getTime() - v), a.isEnd && o < 0 && !a.params.loop || (o < 0 && (o = 0), i());
      },
      T = function T() {
        a.isEnd && o < 0 && !a.params.loop || a.destroyed || !a.autoplay.running || (v = new Date().getTime(), f ? (f = !1, y(o)) : y(), a.autoplay.paused = !1, n("autoplayResume"));
      },
      M = function M() {
        if (a.destroyed || !a.autoplay.running) return;
        var e = getDocument();
        "hidden" === e.visibilityState && (f = !0, x(!0)), "visible" === e.visibilityState && T();
      },
      C = function C(e) {
        "mouse" === e.pointerType && (f = !0, x(!0));
      },
      P = function P(e) {
        "mouse" === e.pointerType && a.autoplay.paused && T();
      };
    r("init", function () {
      a.params.autoplay.enabled && (a.params.autoplay.pauseOnMouseEnter && (a.el.addEventListener("pointerenter", C), a.el.addEventListener("pointerleave", P)), getDocument().addEventListener("visibilitychange", M), v = new Date().getTime(), E());
    }), r("destroy", function () {
      a.el.removeEventListener("pointerenter", C), a.el.removeEventListener("pointerleave", P), getDocument().removeEventListener("visibilitychange", M), a.autoplay.running && S();
    }), r("beforeTransitionStart", function (e, t, s) {
      !a.destroyed && a.autoplay.running && (s || !a.params.autoplay.disableOnInteraction ? x(!0, !0) : S());
    }), r("sliderFirstMove", function () {
      !a.destroyed && a.autoplay.running && (a.params.autoplay.disableOnInteraction ? S() : (c = !0, p = !1, f = !1, u = setTimeout(function () {
        f = !0, p = !0, x(!0);
      }, 200)));
    }), r("touchEnd", function () {
      if (!a.destroyed && a.autoplay.running && c) {
        if (clearTimeout(u), clearTimeout(t), a.params.autoplay.disableOnInteraction) return p = !1, void (c = !1);
        p && a.params.cssMode && T(), p = !1, c = !1;
      }
    }), r("slideChange", function () {
      !a.destroyed && a.autoplay.running && (m = !0);
    }), Object.assign(a.autoplay, {
      start: E,
      stop: S,
      pause: x,
      resume: T
    });
  }
  function Thumb(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs"
      }
    });
    var i = !1,
      r = !1;
    function n() {
      var e = t.thumbs.swiper;
      if (!e || e.destroyed) return;
      var s = e.clickedIndex,
        a = e.clickedSlide;
      if (a && a.classList.contains(t.params.thumbs.slideThumbActiveClass)) return;
      if (null == s) return;
      var i;
      i = e.params.loop ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : s, t.params.loop ? t.slideToLoop(i) : t.slideTo(i);
    }
    function l() {
      var e = t.params.thumbs;
      if (i) return !1;
      i = !0;
      var s = t.constructor;
      if (e.swiper instanceof s) t.thumbs.swiper = e.swiper, Object.assign(t.thumbs.swiper.originalParams, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), Object.assign(t.thumbs.swiper.params, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), t.thumbs.swiper.update();else if (isObject(e.swiper)) {
        var _a18 = Object.assign({}, e.swiper);
        Object.assign(_a18, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        }), t.thumbs.swiper = new s(_a18), r = !0;
      }
      return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass), t.thumbs.swiper.on("tap", n), !0;
    }
    function o(e) {
      var s = t.thumbs.swiper;
      if (!s || s.destroyed) return;
      var a = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView;
      var i = 1;
      var r = t.params.thumbs.slideThumbActiveClass;
      if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (i = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (i = 1), i = Math.floor(i), s.slides.forEach(function (e) {
        return e.classList.remove(r);
      }), s.params.loop || s.params.virtual && s.params.virtual.enabled) for (var _e50 = 0; _e50 < i; _e50 += 1) {
        elementChildren(s.slidesEl, "[data-swiper-slide-index=\"".concat(t.realIndex + _e50, "\"]")).forEach(function (e) {
          e.classList.add(r);
        });
      } else for (var _e51 = 0; _e51 < i; _e51 += 1) {
        s.slides[t.realIndex + _e51] && s.slides[t.realIndex + _e51].classList.add(r);
      }
      var n = t.params.thumbs.autoScrollOffset,
        l = n && !s.params.loop;
      if (t.realIndex !== s.realIndex || l) {
        var _i14 = s.activeIndex;
        var _r10, _o7;
        if (s.params.loop) {
          var _e52 = s.slides.filter(function (e) {
            return e.getAttribute("data-swiper-slide-index") === "".concat(t.realIndex);
          })[0];
          _r10 = s.slides.indexOf(_e52), _o7 = t.activeIndex > t.previousIndex ? "next" : "prev";
        } else _r10 = t.realIndex, _o7 = _r10 > t.previousIndex ? "next" : "prev";
        l && (_r10 += "next" === _o7 ? n : -1 * n), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(_r10) < 0 && (s.params.centeredSlides ? _r10 = _r10 > _i14 ? _r10 - Math.floor(a / 2) + 1 : _r10 + Math.floor(a / 2) - 1 : _r10 > _i14 && s.params.slidesPerGroup, s.slideTo(_r10, e ? 0 : void 0));
      }
    }
    t.thumbs = {
      swiper: null
    }, a("beforeInit", function () {
      var e = t.params.thumbs;
      if (e && e.swiper) if ("string" == typeof e.swiper || e.swiper instanceof HTMLElement) {
        var _s32 = getDocument(),
          _a19 = function _a19() {
            var a = "string" == typeof e.swiper ? _s32.querySelector(e.swiper) : e.swiper;
            if (a && a.swiper) e.swiper = a.swiper, l(), o(!0);else if (a) {
              var _s33 = function _s33(i) {
                e.swiper = i.detail[0], a.removeEventListener("init", _s33), l(), o(!0), e.swiper.update(), t.update();
              };
              a.addEventListener("init", _s33);
            }
            return a;
          },
          _i15 = function _i15() {
            if (t.destroyed) return;
            _a19() || requestAnimationFrame(_i15);
          };
        requestAnimationFrame(_i15);
      } else l(), o(!0);
    }), a("slideChange update resize observerUpdate", function () {
      o();
    }), a("setTransition", function (e, s) {
      var a = t.thumbs.swiper;
      a && !a.destroyed && a.setTransition(s);
    }), a("beforeDestroy", function () {
      var e = t.thumbs.swiper;
      e && !e.destroyed && r && e.destroy();
    }), Object.assign(t.thumbs, {
      init: l,
      update: o
    });
  }
  function freeMode(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.emit,
      i = e.once;
    s({
      freeMode: {
        enabled: !1,
        momentum: !0,
        momentumRatio: 1,
        momentumBounce: !0,
        momentumBounceRatio: 1,
        momentumVelocityRatio: 1,
        sticky: !1,
        minimumVelocity: .02
      }
    }), Object.assign(t, {
      freeMode: {
        onTouchStart: function onTouchStart() {
          var e = t.getTranslate();
          t.setTranslate(e), t.setTransition(0), t.touchEventsData.velocities.length = 0, t.freeMode.onTouchEnd({
            currentPos: t.rtl ? t.translate : -t.translate
          });
        },
        onTouchMove: function onTouchMove() {
          var e = t.touchEventsData,
            s = t.touches;
          0 === e.velocities.length && e.velocities.push({
            position: s[t.isHorizontal() ? "startX" : "startY"],
            time: e.touchStartTime
          }), e.velocities.push({
            position: s[t.isHorizontal() ? "currentX" : "currentY"],
            time: now()
          });
        },
        onTouchEnd: function onTouchEnd(e) {
          var s = e.currentPos;
          var r = t.params,
            n = t.wrapperEl,
            l = t.rtlTranslate,
            o = t.snapGrid,
            d = t.touchEventsData,
            c = now() - d.touchStartTime;
          if (s < -t.minTranslate()) t.slideTo(t.activeIndex);else if (s > -t.maxTranslate()) t.slides.length < o.length ? t.slideTo(o.length - 1) : t.slideTo(t.slides.length - 1);else {
            if (r.freeMode.momentum) {
              if (d.velocities.length > 1) {
                var _e54 = d.velocities.pop(),
                  _s35 = d.velocities.pop(),
                  _a20 = _e54.position - _s35.position,
                  _i16 = _e54.time - _s35.time;
                t.velocity = _a20 / _i16, t.velocity /= 2, Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0), (_i16 > 150 || now() - _e54.time > 300) && (t.velocity = 0);
              } else t.velocity = 0;
              t.velocity *= r.freeMode.momentumVelocityRatio, d.velocities.length = 0;
              var _e53 = 1e3 * r.freeMode.momentumRatio;
              var _s34 = t.velocity * _e53;
              var _c3 = t.translate + _s34;
              l && (_c3 = -_c3);
              var p,
                u = !1;
              var m = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
              var f;
              if (_c3 < t.maxTranslate()) r.freeMode.momentumBounce ? (_c3 + t.maxTranslate() < -m && (_c3 = t.maxTranslate() - m), p = t.maxTranslate(), u = !0, d.allowMomentumBounce = !0) : _c3 = t.maxTranslate(), r.loop && r.centeredSlides && (f = !0);else if (_c3 > t.minTranslate()) r.freeMode.momentumBounce ? (_c3 - t.minTranslate() > m && (_c3 = t.minTranslate() + m), p = t.minTranslate(), u = !0, d.allowMomentumBounce = !0) : _c3 = t.minTranslate(), r.loop && r.centeredSlides && (f = !0);else if (r.freeMode.sticky) {
                var _e55;
                for (var _t36 = 0; _t36 < o.length; _t36 += 1) {
                  if (o[_t36] > -_c3) {
                    _e55 = _t36;
                    break;
                  }
                }
                _c3 = Math.abs(o[_e55] - _c3) < Math.abs(o[_e55 - 1] - _c3) || "next" === t.swipeDirection ? o[_e55] : o[_e55 - 1], _c3 = -_c3;
              }
              if (f && i("transitionEnd", function () {
                t.loopFix();
              }), 0 !== t.velocity) {
                if (_e53 = l ? Math.abs((-_c3 - t.translate) / t.velocity) : Math.abs((_c3 - t.translate) / t.velocity), r.freeMode.sticky) {
                  var _s36 = Math.abs((l ? -_c3 : _c3) - t.translate),
                    _a21 = t.slidesSizesGrid[t.activeIndex];
                  _e53 = _s36 < _a21 ? r.speed : _s36 < 2 * _a21 ? 1.5 * r.speed : 2.5 * r.speed;
                }
              } else if (r.freeMode.sticky) return void t.slideToClosest();
              r.freeMode.momentumBounce && u ? (t.updateProgress(p), t.setTransition(_e53), t.setTranslate(_c3), t.transitionStart(!0, t.swipeDirection), t.animating = !0, elementTransitionEnd(n, function () {
                t && !t.destroyed && d.allowMomentumBounce && (a("momentumBounce"), t.setTransition(r.speed), setTimeout(function () {
                  t.setTranslate(p), elementTransitionEnd(n, function () {
                    t && !t.destroyed && t.transitionEnd();
                  });
                }, 0));
              })) : t.velocity ? (a("_freeModeNoMomentumRelease"), t.updateProgress(_c3), t.setTransition(_e53), t.setTranslate(_c3), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, elementTransitionEnd(n, function () {
                t && !t.destroyed && t.transitionEnd();
              }))) : t.updateProgress(_c3), t.updateActiveIndex(), t.updateSlidesClasses();
            } else {
              if (r.freeMode.sticky) return void t.slideToClosest();
              r.freeMode && a("_freeModeNoMomentumRelease");
            }
            (!r.freeMode.momentum || c >= r.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
          }
        }
      }
    });
  }
  function Grid(e) {
    var t,
      s,
      a,
      i = e.swiper,
      r = e.extendParams;
    r({
      grid: {
        rows: 1,
        fill: "column"
      }
    });
    i.grid = {
      initSlides: function initSlides(e) {
        var r = i.params.slidesPerView,
          _i$params$grid = i.params.grid,
          n = _i$params$grid.rows,
          l = _i$params$grid.fill;
        s = t / n, a = Math.floor(e / n), t = Math.floor(e / n) === e / n ? e : Math.ceil(e / n) * n, "auto" !== r && "row" === l && (t = Math.max(t, r * n));
      },
      updateSlide: function updateSlide(e, r, n, l) {
        var _i$params = i.params,
          o = _i$params.slidesPerGroup,
          d = _i$params.spaceBetween,
          _i$params$grid2 = i.params.grid,
          c = _i$params$grid2.rows,
          p = _i$params$grid2.fill;
        var u, m, f;
        if ("row" === p && o > 1) {
          var _s37 = Math.floor(e / (o * c)),
            _a22 = e - c * o * _s37,
            _i17 = 0 === _s37 ? o : Math.min(Math.ceil((n - _s37 * c * o) / c), o);
          f = Math.floor(_a22 / _i17), m = _a22 - f * _i17 + _s37 * o, u = m + f * t / c, r.style.order = u;
        } else "column" === p ? (m = Math.floor(e / c), f = e - m * c, (m > a || m === a && f === c - 1) && (f += 1, f >= c && (f = 0, m += 1))) : (f = Math.floor(e / s), m = e - f * s);
        r.style[l("margin-top")] = 0 !== f ? d && "".concat(d, "px") : "";
      },
      updateWrapperSize: function updateWrapperSize(e, s, a) {
        var _i$params2 = i.params,
          r = _i$params2.spaceBetween,
          n = _i$params2.centeredSlides,
          l = _i$params2.roundLengths,
          o = i.params.grid.rows;
        if (i.virtualSize = (e + r) * t, i.virtualSize = Math.ceil(i.virtualSize / o) - r, i.wrapperEl.style[a("width")] = "".concat(i.virtualSize + r, "px"), n) {
          var _e56 = [];
          for (var _t37 = 0; _t37 < s.length; _t37 += 1) {
            var _a23 = s[_t37];
            l && (_a23 = Math.floor(_a23)), s[_t37] < i.virtualSize + s[0] && _e56.push(_a23);
          }
          s.splice(0, s.length), s.push.apply(s, _e56);
        }
      }
    };
  }
  function appendSlide(e) {
    var t = this,
      s = t.params,
      a = t.slidesEl;
    s.loop && t.loopDestroy();
    var i = function i(e) {
      if ("string" == typeof e) {
        var _t38 = document.createElement("div");
        _t38.innerHTML = e, a.append(_t38.children[0]), _t38.innerHTML = "";
      } else a.append(e);
    };
    if ("object" == _typeof(e) && "length" in e) for (var _t39 = 0; _t39 < e.length; _t39 += 1) {
      e[_t39] && i(e[_t39]);
    } else i(e);
    t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update();
  }
  function prependSlide(e) {
    var t = this,
      s = t.params,
      a = t.activeIndex,
      i = t.slidesEl;
    s.loop && t.loopDestroy();
    var r = a + 1;
    var n = function n(e) {
      if ("string" == typeof e) {
        var _t40 = document.createElement("div");
        _t40.innerHTML = e, i.prepend(_t40.children[0]), _t40.innerHTML = "";
      } else i.prepend(e);
    };
    if ("object" == _typeof(e) && "length" in e) {
      for (var _t41 = 0; _t41 < e.length; _t41 += 1) {
        e[_t41] && n(e[_t41]);
      }
      r = a + e.length;
    } else n(e);
    t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), t.slideTo(r, 0, !1);
  }
  function addSlide(e, t) {
    var s = this,
      a = s.params,
      i = s.activeIndex,
      r = s.slidesEl;
    var n = i;
    a.loop && (n -= s.loopedSlides, s.loopDestroy(), s.recalcSlides());
    var l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    var o = n > e ? n + 1 : n;
    var d = [];
    for (var _t42 = l - 1; _t42 >= e; _t42 -= 1) {
      var _e57 = s.slides[_t42];
      _e57.remove(), d.unshift(_e57);
    }
    if ("object" == _typeof(t) && "length" in t) {
      for (var _e58 = 0; _e58 < t.length; _e58 += 1) {
        t[_e58] && r.append(t[_e58]);
      }
      o = n > e ? n + t.length : n;
    } else r.append(t);
    for (var _e59 = 0; _e59 < d.length; _e59 += 1) {
      r.append(d[_e59]);
    }
    s.recalcSlides(), a.loop && s.loopCreate(), a.observer && !s.isElement || s.update(), a.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
  }
  function removeSlide(e) {
    var t = this,
      s = t.params,
      a = t.activeIndex;
    var i = a;
    s.loop && (i -= t.loopedSlides, t.loopDestroy());
    var r,
      n = i;
    if ("object" == _typeof(e) && "length" in e) {
      for (var _s38 = 0; _s38 < e.length; _s38 += 1) {
        r = e[_s38], t.slides[r] && t.slides[r].remove(), r < n && (n -= 1);
      }
      n = Math.max(n, 0);
    } else r = e, t.slides[r] && t.slides[r].remove(), r < n && (n -= 1), n = Math.max(n, 0);
    t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
  }
  function removeAllSlides() {
    var e = this,
      t = [];
    for (var s = 0; s < e.slides.length; s += 1) {
      t.push(s);
    }
    e.removeSlide(t);
  }
  function Manipulation(e) {
    var t = e.swiper;
    Object.assign(t, {
      appendSlide: appendSlide.bind(t),
      prependSlide: prependSlide.bind(t),
      addSlide: addSlide.bind(t),
      removeSlide: removeSlide.bind(t),
      removeAllSlides: removeAllSlides.bind(t)
    });
  }
  function effectInit(e) {
    var t = e.effect,
      s = e.swiper,
      a = e.on,
      i = e.setTranslate,
      r = e.setTransition,
      n = e.overwriteParams,
      l = e.perspective,
      o = e.recreateShadows,
      d = e.getEffectParams;
    var c;
    a("beforeInit", function () {
      if (s.params.effect !== t) return;
      s.classNames.push("".concat(s.params.containerModifierClass).concat(t)), l && l() && s.classNames.push("".concat(s.params.containerModifierClass, "3d"));
      var e = n ? n() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }), a("setTranslate", function () {
      s.params.effect === t && i();
    }), a("setTransition", function (e, a) {
      s.params.effect === t && r(a);
    }), a("transitionEnd", function () {
      if (s.params.effect === t && o) {
        if (!d || !d().slideShadows) return;
        s.slides.forEach(function (e) {
          e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(function (e) {
            return e.remove();
          });
        }), o();
      }
    }), a("virtualUpdate", function () {
      s.params.effect === t && (s.slides.length || (c = !0), requestAnimationFrame(function () {
        c && s.slides && s.slides.length && (i(), c = !1);
      }));
    });
  }
  function effectTarget(e, t) {
    var s = getSlideTransformEl(t);
    return s !== t && (s.style.backfaceVisibility = "hidden", s.style["-webkit-backface-visibility"] = "hidden"), s;
  }
  function effectVirtualTransitionEnd(e) {
    var t = e.swiper,
      s = e.duration,
      a = e.transformElements,
      i = e.allSlides;
    var r = t.activeIndex;
    if (t.params.virtualTranslate && 0 !== s) {
      var _e60,
        _s39 = !1;
      _e60 = i ? a : a.filter(function (e) {
        var s = e.classList.contains("swiper-slide-transform") ? function (e) {
          if (!e.parentElement) return t.slides.filter(function (t) {
            return t.shadowEl && t.shadowEl === e.parentNode;
          })[0];
          return e.parentElement;
        }(e) : e;
        return t.getSlideIndex(s) === r;
      }), _e60.forEach(function (e) {
        elementTransitionEnd(e, function () {
          if (_s39) return;
          if (!t || t.destroyed) return;
          _s39 = !0, t.animating = !1;
          var e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0
          });
          t.wrapperEl.dispatchEvent(e);
        });
      });
    }
  }
  function EffectFade(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      fadeEffect: {
        crossFade: !1
      }
    });
    effectInit({
      effect: "fade",
      swiper: t,
      on: a,
      setTranslate: function setTranslate() {
        var e = t.slides,
          s = t.params.fadeEffect;
        for (var _a24 = 0; _a24 < e.length; _a24 += 1) {
          var _e61 = t.slides[_a24];
          var i = -_e61.swiperSlideOffset;
          t.params.virtualTranslate || (i -= t.translate);
          var r = 0;
          t.isHorizontal() || (r = i, i = 0);
          var n = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(_e61.progress), 0) : 1 + Math.min(Math.max(_e61.progress, -1), 0),
            l = effectTarget(s, _e61);
          l.style.opacity = n, l.style.transform = "translate3d(".concat(i, "px, ").concat(r, "px, 0px)");
        }
      },
      setTransition: function setTransition(e) {
        var s = t.slides.map(function (e) {
          return getSlideTransformEl(e);
        });
        s.forEach(function (t) {
          t.style.transitionDuration = "".concat(e, "ms");
        }), effectVirtualTransitionEnd({
          swiper: t,
          duration: e,
          transformElements: s,
          allSlides: !0
        });
      },
      overwriteParams: function overwriteParams() {
        return {
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !t.params.cssMode
        };
      }
    });
  }
  function EffectCube(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      cubeEffect: {
        slideShadows: !0,
        shadow: !0,
        shadowOffset: 20,
        shadowScale: .94
      }
    });
    var i = function i(e, t, s) {
      var a = s ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"),
        i = s ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
      a || (a = createElement("div", "swiper-slide-shadow-" + (s ? "left" : "top")), e.append(a)), i || (i = createElement("div", "swiper-slide-shadow-" + (s ? "right" : "bottom")), e.append(i)), a && (a.style.opacity = Math.max(-t, 0)), i && (i.style.opacity = Math.max(t, 0));
    };
    effectInit({
      effect: "cube",
      swiper: t,
      on: a,
      setTranslate: function setTranslate() {
        var e = t.el,
          s = t.wrapperEl,
          a = t.slides,
          r = t.width,
          n = t.height,
          l = t.rtlTranslate,
          o = t.size,
          d = t.browser,
          c = t.params.cubeEffect,
          p = t.isHorizontal(),
          u = t.virtual && t.params.virtual.enabled;
        var m,
          f = 0;
        c.shadow && (p ? (m = t.slidesEl.querySelector(".swiper-cube-shadow"), m || (m = createElement("div", "swiper-cube-shadow"), t.slidesEl.append(m)), m.style.height = "".concat(r, "px")) : (m = e.querySelector(".swiper-cube-shadow"), m || (m = createElement("div", "swiper-cube-shadow"), e.append(m))));
        for (var _e62 = 0; _e62 < a.length; _e62 += 1) {
          var _t43 = a[_e62];
          var _s40 = _e62;
          u && (_s40 = parseInt(_t43.getAttribute("data-swiper-slide-index"), 10));
          var _r11 = 90 * _s40,
            _n5 = Math.floor(_r11 / 360);
          l && (_r11 = -_r11, _n5 = Math.floor(-_r11 / 360));
          var _d3 = Math.max(Math.min(_t43.progress, 1), -1);
          var _m = 0,
            _h = 0,
            g = 0;
          _s40 % 4 == 0 ? (_m = 4 * -_n5 * o, g = 0) : (_s40 - 1) % 4 == 0 ? (_m = 0, g = 4 * -_n5 * o) : (_s40 - 2) % 4 == 0 ? (_m = o + 4 * _n5 * o, g = o) : (_s40 - 3) % 4 == 0 && (_m = -o, g = 3 * o + 4 * o * _n5), l && (_m = -_m), p || (_h = _m, _m = 0);
          var v = "rotateX(".concat(p ? 0 : -_r11, "deg) rotateY(").concat(p ? _r11 : 0, "deg) translate3d(").concat(_m, "px, ").concat(_h, "px, ").concat(g, "px)");
          _d3 <= 1 && _d3 > -1 && (f = 90 * _s40 + 90 * _d3, l && (f = 90 * -_s40 - 90 * _d3)), _t43.style.transform = v, c.slideShadows && i(_t43, _d3, p);
        }
        if (s.style.transformOrigin = "50% 50% -".concat(o / 2, "px"), s.style["-webkit-transform-origin"] = "50% 50% -".concat(o / 2, "px"), c.shadow) if (p) m.style.transform = "translate3d(0px, ".concat(r / 2 + c.shadowOffset, "px, ").concat(-r / 2, "px) rotateX(90deg) rotateZ(0deg) scale(").concat(c.shadowScale, ")");else {
          var _e63 = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
            _t44 = 1.5 - (Math.sin(2 * _e63 * Math.PI / 360) / 2 + Math.cos(2 * _e63 * Math.PI / 360) / 2),
            _s41 = c.shadowScale,
            _a25 = c.shadowScale / _t44,
            _i18 = c.shadowOffset;
          m.style.transform = "scale3d(".concat(_s41, ", 1, ").concat(_a25, ") translate3d(0px, ").concat(n / 2 + _i18, "px, ").concat(-n / 2 / _a25, "px) rotateX(-90deg)");
        }
        var h = (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0;
        s.style.transform = "translate3d(0px,0,".concat(h, "px) rotateX(").concat(t.isHorizontal() ? 0 : f, "deg) rotateY(").concat(t.isHorizontal() ? -f : 0, "deg)"), s.style.setProperty("--swiper-cube-translate-z", "".concat(h, "px"));
      },
      setTransition: function setTransition(e) {
        var s = t.el,
          a = t.slides;
        if (a.forEach(function (t) {
          t.style.transitionDuration = "".concat(e, "ms"), t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(function (t) {
            t.style.transitionDuration = "".concat(e, "ms");
          });
        }), t.params.cubeEffect.shadow && !t.isHorizontal()) {
          var _t45 = s.querySelector(".swiper-cube-shadow");
          _t45 && (_t45.style.transitionDuration = "".concat(e, "ms"));
        }
      },
      recreateShadows: function recreateShadows() {
        var e = t.isHorizontal();
        t.slides.forEach(function (t) {
          var s = Math.max(Math.min(t.progress, 1), -1);
          i(t, s, e);
        });
      },
      getEffectParams: function getEffectParams() {
        return t.params.cubeEffect;
      },
      perspective: function perspective() {
        return !0;
      },
      overwriteParams: function overwriteParams() {
        return {
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: !1,
          virtualTranslate: !0
        };
      }
    });
  }
  function createShadow(e, t, s) {
    var a = "swiper-slide-shadow" + (s ? "-".concat(s) : ""),
      i = getSlideTransformEl(t);
    var r = i.querySelector(".".concat(a));
    return r || (r = createElement("div", "swiper-slide-shadow" + (s ? "-".concat(s) : "")), i.append(r)), r;
  }
  function EffectFlip(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      flipEffect: {
        slideShadows: !0,
        limitRotation: !0
      }
    });
    var i = function i(e, s, a) {
      var i = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"),
        r = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
      i || (i = createShadow(a, e, t.isHorizontal() ? "left" : "top")), r || (r = createShadow(a, e, t.isHorizontal() ? "right" : "bottom")), i && (i.style.opacity = Math.max(-s, 0)), r && (r.style.opacity = Math.max(s, 0));
    };
    effectInit({
      effect: "flip",
      swiper: t,
      on: a,
      setTranslate: function setTranslate() {
        var e = t.slides,
          s = t.rtlTranslate,
          a = t.params.flipEffect;
        for (var r = 0; r < e.length; r += 1) {
          var n = e[r];
          var l = n.progress;
          t.params.flipEffect.limitRotation && (l = Math.max(Math.min(n.progress, 1), -1));
          var o = n.swiperSlideOffset;
          var d = -180 * l,
            c = 0,
            p = t.params.cssMode ? -o - t.translate : -o,
            u = 0;
          t.isHorizontal() ? s && (d = -d) : (u = p, p = 0, c = -d, d = 0), n.style.zIndex = -Math.abs(Math.round(l)) + e.length, a.slideShadows && i(n, l, a);
          var m = "translate3d(".concat(p, "px, ").concat(u, "px, 0px) rotateX(").concat(c, "deg) rotateY(").concat(d, "deg)");
          effectTarget(a, n).style.transform = m;
        }
      },
      setTransition: function setTransition(e) {
        var s = t.slides.map(function (e) {
          return getSlideTransformEl(e);
        });
        s.forEach(function (t) {
          t.style.transitionDuration = "".concat(e, "ms"), t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(function (t) {
            t.style.transitionDuration = "".concat(e, "ms");
          });
        }), effectVirtualTransitionEnd({
          swiper: t,
          duration: e,
          transformElements: s
        });
      },
      recreateShadows: function recreateShadows() {
        var e = t.params.flipEffect;
        t.slides.forEach(function (s) {
          var a = s.progress;
          t.params.flipEffect.limitRotation && (a = Math.max(Math.min(s.progress, 1), -1)), i(s, a, e);
        });
      },
      getEffectParams: function getEffectParams() {
        return t.params.flipEffect;
      },
      perspective: function perspective() {
        return !0;
      },
      overwriteParams: function overwriteParams() {
        return {
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !t.params.cssMode
        };
      }
    });
  }
  function EffectCoverflow(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: !0
      }
    });
    effectInit({
      effect: "coverflow",
      swiper: t,
      on: a,
      setTranslate: function setTranslate() {
        var e = t.width,
          s = t.height,
          a = t.slides,
          i = t.slidesSizesGrid,
          r = t.params.coverflowEffect,
          n = t.isHorizontal(),
          l = t.translate,
          o = n ? e / 2 - l : s / 2 - l,
          d = n ? r.rotate : -r.rotate,
          c = r.depth;
        for (var _e64 = 0, _t46 = a.length; _e64 < _t46; _e64 += 1) {
          var _t47 = a[_e64],
            _s42 = i[_e64],
            _l7 = (o - _t47.swiperSlideOffset - _s42 / 2) / _s42,
            p = "function" == typeof r.modifier ? r.modifier(_l7) : _l7 * r.modifier;
          var u = n ? d * p : 0,
            m = n ? 0 : d * p,
            f = -c * Math.abs(p),
            h = r.stretch;
          "string" == typeof h && -1 !== h.indexOf("%") && (h = parseFloat(r.stretch) / 100 * _s42);
          var g = n ? 0 : h * p,
            v = n ? h * p : 0,
            w = 1 - (1 - r.scale) * Math.abs(p);
          Math.abs(v) < .001 && (v = 0), Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(u) < .001 && (u = 0), Math.abs(m) < .001 && (m = 0), Math.abs(w) < .001 && (w = 0);
          var b = "translate3d(".concat(v, "px,").concat(g, "px,").concat(f, "px)  rotateX(").concat(m, "deg) rotateY(").concat(u, "deg) scale(").concat(w, ")");
          if (effectTarget(r, _t47).style.transform = b, _t47.style.zIndex = 1 - Math.abs(Math.round(p)), r.slideShadows) {
            var _e65 = n ? _t47.querySelector(".swiper-slide-shadow-left") : _t47.querySelector(".swiper-slide-shadow-top"),
              _s43 = n ? _t47.querySelector(".swiper-slide-shadow-right") : _t47.querySelector(".swiper-slide-shadow-bottom");
            _e65 || (_e65 = createShadow(r, _t47, n ? "left" : "top")), _s43 || (_s43 = createShadow(r, _t47, n ? "right" : "bottom")), _e65 && (_e65.style.opacity = p > 0 ? p : 0), _s43 && (_s43.style.opacity = -p > 0 ? -p : 0);
          }
        }
      },
      setTransition: function setTransition(e) {
        t.slides.map(function (e) {
          return getSlideTransformEl(e);
        }).forEach(function (t) {
          t.style.transitionDuration = "".concat(e, "ms"), t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(function (t) {
            t.style.transitionDuration = "".concat(e, "ms");
          });
        });
      },
      perspective: function perspective() {
        return !0;
      },
      overwriteParams: function overwriteParams() {
        return {
          watchSlidesProgress: !0
        };
      }
    });
  }
  function EffectCreative(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      creativeEffect: {
        limitProgress: 1,
        shadowPerProgress: !1,
        progressMultiplier: 1,
        perspective: !0,
        prev: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        },
        next: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        }
      }
    });
    var i = function i(e) {
      return "string" == typeof e ? e : "".concat(e, "px");
    };
    effectInit({
      effect: "creative",
      swiper: t,
      on: a,
      setTranslate: function setTranslate() {
        var e = t.slides,
          s = t.wrapperEl,
          a = t.slidesSizesGrid,
          r = t.params.creativeEffect,
          n = r.progressMultiplier,
          l = t.params.centeredSlides;
        if (l) {
          var _e66 = a[0] / 2 - t.params.slidesOffsetBefore || 0;
          s.style.transform = "translateX(calc(50% - ".concat(_e66, "px))");
        }
        var _loop = function _loop(_s44) {
          var a = e[_s44],
            o = a.progress,
            d = Math.min(Math.max(a.progress, -r.limitProgress), r.limitProgress);
          var c = d;
          l || (c = Math.min(Math.max(a.originalProgress, -r.limitProgress), r.limitProgress));
          var p = a.swiperSlideOffset,
            u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
            m = [0, 0, 0];
          var f = !1;
          t.isHorizontal() || (u[1] = u[0], u[0] = 0);
          var h = {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: 1,
            opacity: 1
          };
          d < 0 ? (h = r.next, f = !0) : d > 0 && (h = r.prev, f = !0), u.forEach(function (e, t) {
            u[t] = "calc(".concat(e, "px + (").concat(i(h.translate[t]), " * ").concat(Math.abs(d * n), "))");
          }), m.forEach(function (e, t) {
            m[t] = h.rotate[t] * Math.abs(d * n);
          }), a.style.zIndex = -Math.abs(Math.round(o)) + e.length;
          var g = u.join(", "),
            v = "rotateX(".concat(m[0], "deg) rotateY(").concat(m[1], "deg) rotateZ(").concat(m[2], "deg)"),
            w = c < 0 ? "scale(".concat(1 + (1 - h.scale) * c * n, ")") : "scale(".concat(1 - (1 - h.scale) * c * n, ")"),
            b = c < 0 ? 1 + (1 - h.opacity) * c * n : 1 - (1 - h.opacity) * c * n,
            y = "translate3d(".concat(g, ") ").concat(v, " ").concat(w);
          if (f && h.shadow || !f) {
            var _e67 = a.querySelector(".swiper-slide-shadow");
            if (!_e67 && h.shadow && (_e67 = createShadow(r, a)), _e67) {
              var _t48 = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
              _e67.style.opacity = Math.min(Math.max(Math.abs(_t48), 0), 1);
            }
          }
          var E = effectTarget(r, a);
          E.style.transform = y, E.style.opacity = b, h.origin && (E.style.transformOrigin = h.origin);
        };
        for (var _s44 = 0; _s44 < e.length; _s44 += 1) {
          _loop(_s44);
        }
      },
      setTransition: function setTransition(e) {
        var s = t.slides.map(function (e) {
          return getSlideTransformEl(e);
        });
        s.forEach(function (t) {
          t.style.transitionDuration = "".concat(e, "ms"), t.querySelectorAll(".swiper-slide-shadow").forEach(function (t) {
            t.style.transitionDuration = "".concat(e, "ms");
          });
        }), effectVirtualTransitionEnd({
          swiper: t,
          duration: e,
          transformElements: s,
          allSlides: !0
        });
      },
      perspective: function perspective() {
        return t.params.creativeEffect.perspective;
      },
      overwriteParams: function overwriteParams() {
        return {
          watchSlidesProgress: !0,
          virtualTranslate: !t.params.cssMode
        };
      }
    });
  }
  function EffectCards(e) {
    var t = e.swiper,
      s = e.extendParams,
      a = e.on;
    s({
      cardsEffect: {
        slideShadows: !0,
        rotate: !0,
        perSlideRotate: 2,
        perSlideOffset: 8
      }
    });
    effectInit({
      effect: "cards",
      swiper: t,
      on: a,
      setTranslate: function setTranslate() {
        var e = t.slides,
          s = t.activeIndex,
          a = t.params.cardsEffect,
          _t$touchEventsData = t.touchEventsData,
          i = _t$touchEventsData.startTranslate,
          r = _t$touchEventsData.isTouched,
          n = t.translate;
        for (var l = 0; l < e.length; l += 1) {
          var o = e[l],
            d = o.progress,
            c = Math.min(Math.max(d, -4), 4);
          var p = o.swiperSlideOffset;
          t.params.centeredSlides && !t.params.cssMode && (t.wrapperEl.style.transform = "translateX(".concat(t.minTranslate(), "px)")), t.params.centeredSlides && t.params.cssMode && (p -= e[0].swiperSlideOffset);
          var u = t.params.cssMode ? -p - t.translate : -p,
            m = 0;
          var f = -100 * Math.abs(c);
          var h = 1,
            g = -a.perSlideRotate * c,
            v = a.perSlideOffset - .75 * Math.abs(c);
          var w = t.virtual && t.params.virtual.enabled ? t.virtual.from + l : l,
            b = (w === s || w === s - 1) && c > 0 && c < 1 && (r || t.params.cssMode) && n < i,
            y = (w === s || w === s + 1) && c < 0 && c > -1 && (r || t.params.cssMode) && n > i;
          if (b || y) {
            var _e68 = Math.pow(1 - Math.abs((Math.abs(c) - .5) / .5), .5);
            g += -28 * c * _e68, h += -.5 * _e68, v += 96 * _e68, m = -25 * _e68 * Math.abs(c) + "%";
          }
          if (u = c < 0 ? "calc(".concat(u, "px + (").concat(v * Math.abs(c), "%))") : c > 0 ? "calc(".concat(u, "px + (-").concat(v * Math.abs(c), "%))") : "".concat(u, "px"), !t.isHorizontal()) {
            var _e69 = m;
            m = u, u = _e69;
          }
          var E = c < 0 ? "" + (1 + (1 - h) * c) : "" + (1 - (1 - h) * c),
            S = "\n        translate3d(".concat(u, ", ").concat(m, ", ").concat(f, "px)\n        rotateZ(").concat(a.rotate ? g : 0, "deg)\n        scale(").concat(E, ")\n      ");
          if (a.slideShadows) {
            var _e70 = o.querySelector(".swiper-slide-shadow");
            _e70 || (_e70 = createShadow(a, o)), _e70 && (_e70.style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1));
          }
          o.style.zIndex = -Math.abs(Math.round(d)) + e.length;
          effectTarget(a, o).style.transform = S;
        }
      },
      setTransition: function setTransition(e) {
        var s = t.slides.map(function (e) {
          return getSlideTransformEl(e);
        });
        s.forEach(function (t) {
          t.style.transitionDuration = "".concat(e, "ms"), t.querySelectorAll(".swiper-slide-shadow").forEach(function (t) {
            t.style.transitionDuration = "".concat(e, "ms");
          });
        }), effectVirtualTransitionEnd({
          swiper: t,
          duration: e,
          transformElements: s
        });
      },
      perspective: function perspective() {
        return !0;
      },
      overwriteParams: function overwriteParams() {
        return {
          watchSlidesProgress: !0,
          virtualTranslate: !t.params.cssMode
        };
      }
    });
  }
  Object.keys(prototypes).forEach(function (e) {
    Object.keys(prototypes[e]).forEach(function (t) {
      Swiper.prototype[t] = prototypes[e][t];
    });
  }), Swiper.use([Resize$1, Observer]);
  var modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
  Swiper.use(modules);

  var swiperData = {};
  var slider = {
    mixins: [Class],
    props: {
      autoplay: Boolean,
      arrow: Boolean,
      pagination: Boolean,
      paginationType: String,
      paging: Boolean,
      controller: Boolean,
      scrollbar: Boolean,
      loop: Boolean,
      lazy: Boolean,
      preloadImages: Boolean
    },
    data: {
      index: 0,
      delay: 3000,
      autoplay: false,
      slider: '.slider',
      scrollbar: false,
      loop: true,
      preloadImages: true,
      lazy: true,
      paging: false,
      arrow: false,
      Swiper: null,
      clickable: true,
      controller: false,
      pagination: false,
      paginationType: "bullets",
      //	'bullets' | 'fraction' | 'progressbar' | 'custom'
      pagingTemplate: "<div class=\"swiper_page_nav\">\n            <em class=\"current\"></em>\n            <em class=\"total\"></em>\n        </div>",
      arrowTemplate: "<div class=\"mui_page_arrows\">\n            <button type=\"button\" class=\"mui_button_prev\"><span class=\"hidden\">\uC774\uC804</span></button>\n            <button type=\"button\" class=\"mui_button_next\"><span class=\"hidden\">\uB2E4\uC74C</span></button>\n        </div>",
      controllerTemplate: "<div class=\"swiper_controller\">\n            <button type=\"button\" class=\"control_btn\"><span>\uC7AC\uC0DD/\uC815\uC9C0</span></button>\n        </div>",
      paginationTemplate: "<div class=\"swiper_pagenation\"></div>",
      scrollbarTemplate: "<div class=\"swiper_scrollbar\"></div>"
    },
    beforeConnect: function beforeConnect() {
      var cls = "swiper_".concat(randomStr(8));
      var _this$$props = this.$props,
        autoplay = _this$$props.autoplay,
        delay = _this$$props.delay,
        arrow = _this$$props.arrow,
        pagination = _this$$props.pagination,
        paginationType = _this$$props.paginationType,
        paginationTemplate = _this$$props.paginationTemplate,
        scrollbarTemplate = _this$$props.scrollbarTemplate,
        arrowTemplate = _this$$props.arrowTemplate,
        scrollbar = _this$$props.scrollbar;
      swiperData = {};
      if (autoplay) {
        swiperData.autoplay = {
          delay: delay
        };
      }
      if (arrow) {
        var nextCls = "next_".concat(randomStr(8));
        var prevCls = "prev_".concat(randomStr(8));
        var arrows = append(this.$el, arrowTemplate);
        addClass(find('.mui_button_next', arrows), nextCls);
        addClass(find('.mui_button_prev', arrows), prevCls);
        swiperData.navigation = {
          nextEl: ".".concat(nextCls),
          prevEl: ".".concat(prevCls)
        };
      }
      if (scrollbar) {
        addClass(append(this.$el, scrollbarTemplate), cls);
        swiperData.scrollbar = {
          el: ".".concat(cls)
        };
      }
      if (pagination) {
        addClass(append(this.$el, paginationTemplate), cls);
        swiperData.pagination = {
          el: ".".concat(cls),
          type: paginationType
        };
      }
    },
    connected: function connected() {
      var $el = this.$el,
        pagingTemplate = this.pagingTemplate,
        $props = this.$props,
        format = this.format,
        slider = this.slider,
        setCurrentIndex = this.setCurrentIndex,
        controller = this.controller,
        controllerTemplate = this.controllerTemplate;
      var data = Object.assign({}, $props, swiperData);
      this.Swiper = new Swiper(slider, data);
      if (this.paging) {
        this.paging = append($el, pagingTemplate);
        setCurrentIndex();
        $$1('.total', this.paging).innerHTML = format(this.Swiper.slides.length);
      }
      if (controller) {
        this.controller = append($el, controllerTemplate);
      }
      swiperEvents(this);
    },
    computed: {
      slider: function slider(_ref, $el) {
        var slider = _ref.slider;
        return $$1(slider, $el);
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return '.control_btn';
      },
      handler: function handler(e) {
        var btn = e.current;
        hasClass(btn, 'stop') ? this.play(btn) : this.stop(btn);
      }
    }],
    methods: {
      format: function format(number) {
        return String(number).length === 1 ? "0".concat(number) : number;
      },
      play: function play(el) {
        var Swiper = this.Swiper;
        Swiper.autoplay.start();
        removeClass(el, 'stop');
      },
      stop: function stop(el) {
        var Swiper = this.Swiper;
        Swiper.autoplay.stop();
        addClass(el, 'stop');
      },
      setCurrentIndex: function setCurrentIndex() {
        var format = this.format,
          paging = this.paging,
          Swiper = this.Swiper;
        var activeEl = Swiper.slides.find(function (el) {
          return hasClass(el, 'swiper-slide-active');
        });
        var activeIndex = Number(attr(activeEl, 'aria-label').split('/')[0]);
        $$1('.current', paging).innerHTML = format(activeIndex);
      }
    }
  };
  function swiperEvents(obj) {
    var Swiper = obj.Swiper,
      paging = obj.paging,
      setCurrentIndex = obj.setCurrentIndex;
    Swiper.on('slideChange', function () {
      setTimeout(function () {
        !!paging && setCurrentIndex();
      }, 0);
    });
  }

  var tree = {
    props: {
      data: Object,
      mainFrame: String,
      idName: String
    },
    data: {
      data: null,
      buildData: [],
      idName: "treeId",
      treeNavCls: "tree_nav",
      treeLink: ".tree_lists a.name",
      activeCls: 'mui-active',
      highlightCls: 'mui-highlight',
      highlightItem: 'highlightItem',
      activeItem: 'activeItem',
      mainFrame: null,
      index: 0,
      template: "<div class=\"tree_control\">\n            <div class=\"path_box\">\uD604\uC7AC \uD398\uC774\uC9C0 : <p class=\"page_path\"></p></div>\n            <span class=\"collapse\">\n                <button type=\"button\" class=\"open_all\">open all</button>\n                <button type=\"button\" class=\"close_all\">close all</button>\n            </span>\n            <span class=\"search\">\n                <input type=\"text\"> \n                <button type=\"button\">\uAC80\uC0C9</button>\n            </span>\n        </div>"
    },
    beforeConnect: function beforeConnect() {
      this.$wrap = append(this.$el, '<div id="tree_wrap"></div>');
      this.appendTree(this.data);
      this.filepath = $('.page_path', prepend(this.$el, this.template));
      if (!!this.highlightItem) {
        var _$;
        var src = (_$ = $("#".concat(this.highlightItem))) === null || _$ === void 0 ? void 0 : _$.pathname;
        attr(this.mainFrame, 'src', src);
        this.setFilePath(src);
      }
    },
    computed: {
      mainFrame: function mainFrame(_ref) {
        var mainFrame = _ref.mainFrame;
        return $(mainFrame);
      },
      highlightItem: function highlightItem() {
        return localStorage.getItem(this.keyHighlightItem);
      },
      activeItem: function activeItem(_ref2) {
        _ref2.keyActiveItem;
        return JSON.parse(localStorage.getItem(this.keyActiveItem)) || [];
      },
      keyHighlightItem: function keyHighlightItem(_ref3) {
        var idName = _ref3.idName,
          highlightItem = _ref3.highlightItem;
        return "".concat(idName).concat(highlightItem);
      },
      keyActiveItem: function keyActiveItem(_ref4) {
        var idName = _ref4.idName,
          activeItem = _ref4.activeItem;
        return "".concat(idName).concat(activeItem);
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.treeLink;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.highlight(e.current.id);
        attr(this.mainFrame, 'src', e.current.pathname);
        this.setFilePath(e.current.pathname);
      }
    }, {
      name: 'load',
      el: function el() {
        return this.mainFrame;
      },
      handler: function handler(e) {
        addClass(this.mainFrame.contentDocument.documentElement, 'guide_scroll');
      }
    }, {
      name: 'click',
      delegate: function delegate() {
        return '.collapse button';
      },
      handler: function handler(e) {
        e.preventDefault();
        this.collapseAll(e.current.className === 'open_all');
      }
    }, {
      name: 'click',
      delegate: function delegate() {
        return ".".concat(this.treeNavCls);
      },
      handler: function handler(e) {
        var item = parent(e.current);
        var id = e.current.id;
        var activeCls = this.activeCls,
          setSelected = this.setSelected;
        if (hasClass(item, activeCls)) {
          removeClass(item, activeCls);
          setSelected(id, false);
        } else {
          addClass(item, activeCls);
          setSelected(id, true);
        }
      }
    }],
    methods: {
      build: function build(data) {
        return this.sortData(data, 0);
      },
      appendTree: function appendTree(data) {
        var $wrap = this.$wrap,
          build = this.build;
        append($wrap, build(data));
      },
      sortData: function sortData(data, index) {
        var _this = this;
        var deps = ++index;
        var hilight = this.highlightItem;
        var $wrap = this.$wrap,
          treeNavCls = this.treeNavCls,
          highlightCls = this.highlightCls,
          activeCls = this.activeCls,
          idName = this.idName,
          activeItem = this.activeItem;
        var str = '';
        empty($wrap);
        each(data, function (data, key) {
          var idIndex = _this.index++;
          var id = "".concat(idName).concat(deps).concat(idIndex);
          if (!isArray(data)) {
            str += "\n                    <div class=\"tree_wrap ".concat(activeItem.length && activeItem.find(function (arr) {
              return arr === id;
            }) ? activeCls : "", "\">\n                        <button tabindex=\"-1\" type=\"button\" id=\"").concat(id, "\" class=\"").concat(treeNavCls, "\">").concat(key, "</button>\n                        <div class=\"tree_sub_wrap\">").concat(_this.sortData(data, deps), "</div>\n                    </div>\n                    ");
          } else {
            str += "\n                    <div class=\"tree_lists ".concat(data[1] ? data[1] : "", "\">\n                        <span>\n                            <a href=\"").concat(data[0], "\" class=\"name ").concat(hilight === id ? highlightCls : "", "\" id=\"").concat(id, "\">").concat(key, "</a>\n                            <a href=\"").concat(data[0], "\" class=\"blank\" target=\"_blank\" title=\"\uC0C8 \uCC3D\" tabindex=\"-1\">").concat(key, "</a>\n                        </span>\n                    </div>\n                    ");
          }
        });
        return str;
      },
      highlight: function highlight(id) {
        var highlightCls = this.highlightCls,
          setHighlight = this.setHighlight,
          $el = this.$el;
        var newItem = $("#".concat(id), $el);
        var highlightItem = this.highlightItem;
        var item = $("#".concat(highlightItem), $el);
        item && removeClass(item, highlightCls);
        this.highlightItem = id;
        addClass(newItem, highlightCls);
        setHighlight(id);
      },
      setSelected: function setSelected(id, action) {
        var _this2 = this;
        var items = this.activeItem;
        var add = function add(id) {
          return !items.find(function (arr) {
            return arr === id;
          }) && items.push(id);
        };
        var remove = function remove(id) {
          for (var i = 0; i < _this2.activeItem.length; i++) {
            if (_this2.activeItem[i] === id) {
              _this2.activeItem.splice(i, 1);
            }
          }
        };
        (action ? add : remove)(id);
        this.activeItem = items;
        localStorage.setItem(this.keyActiveItem, JSON.stringify(this.activeItem));
      },
      setHighlight: function setHighlight(id) {
        localStorage.setItem(this.keyHighlightItem, id);
      },
      refresh: function refresh() {
        this.clearStorage();
      },
      collapseAll: function collapseAll(bool) {
        var _this3 = this;
        var $wrap = this.$wrap,
          activeCls = this.activeCls;
        $$(".".concat(this.treeNavCls), $wrap).forEach(function (el, i) {
          (bool ? addClass : removeClass)(parent(el), activeCls);
          _this3.setSelected(el.id, bool);
        });
      },
      closeAll: function closeAll() {},
      setFilePath: function setFilePath(path) {
        html(this.filepath, path);
      },
      clearStorage: function clearStorage() {
        localStorage.removeItem(this.keyActiveItem);
      }
    }
  };

  var addimage = {
    props: {
      target: String,
      addfile: String
    },
    data: {
      active: 'mui_active',
      addfile: ' input[type="file"]',
      target: '',
      activeClass: "mui_active"
    },
    computed: {
      target: function target(_ref, $el) {
        var target = _ref.target;
        return $$1(target, $el);
      }
    },
    events: [{
      name: 'change',
      delegate: function delegate() {
        return this.$props.addfile;
      },
      handler: function handler(e) {
        var imageSrc = URL.createObjectURL(e.target.files[0]);
        addClass(this.target, this.activeClass);
        css(this.target, {
          "background-image": "url(".concat(imageSrc, ")"),
          "background-repeat": "no-repeat",
          "background-position": "center",
          "background-size": "100%"
        });
        // css(this.target, {"background":"#f00"})
      }
    }]
  };

  var acclist = {
    mixins: [Togglable],
    props: {
      targets: String,
      active: null,
      openText: String,
      closeText: String,
      collapsible: Boolean,
      multiple: Boolean,
      toggle: String,
      content: String,
      transition: String,
      offset: Number
    },
    data: {
      targets: '> .list',
      active: false,
      animation: [true],
      openSize: null,
      closeSize: null,
      openText: "열기",
      closeText: "닫기",
      clsOpen: 'mui_active',
      toggle: ' .ctrl',
      transition: 'ease',
      duration: 300,
      offset: 0
    },
    computed: {
      items: {
        get: function get(_ref, $el) {
          var targets = _ref.targets;
          return $$(targets, $el);
        },
        watch: function watch(items, prev) {
          var _this = this;
          items.forEach(function (el) {
            return hide($$1(_this.content, el), !hasClass(el, _this.clsOpen));
          });
          if (prev || hasClass(items, this.clsOpen)) {
            return;
          }
          var active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
          if (active) {
            this.toggle(active, false);
          }
        },
        immediate: true
      },
      toggles: function toggles(_ref2) {
        var toggle = _ref2.toggle;
        return this.items.map(function (item) {
          return $$1(toggle, item);
        });
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return "".concat(this.targets, " ").concat(this.$props.toggle);
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log(index(this.toggles, e.current));
        this.toggle(index(this.toggles, e.current));
      }
    }],
    methods: {
      toggle: function toggle(item, animate) {
        var _this2 = this;
        var items = [this.items[getIndex(item, this.items)]];
        var activeItems = filter(this.items, ".".concat(this.clsOpen));
        this.closeSize = toFloat(css(items, 'paddingLeft')) + toFloat(css(items, 'paddingRight')) + width(items);
        this.openSize = width(this.$el) - this.closeSize * (this.items.length - 1);

        // css(items, 'width', `${itemWidth}px`)
        // css(activeItems, 'width', `${minWidth}px`)
        // addClass(items, this.clsOpen);
        // removeClass(activeItems, this.clsOpen);
        if (!this.multiple && !includes(activeItems, items[0])) {
          items = items.concat(activeItems);
        }

        // console.log(items);
        items.forEach(function (el) {
          return _this2.toggleElement(el, !hasClass(el, _this2.clsOpen), function (el, show) {
            toggleClass(el, _this2.clsOpen, show);
            // return toggleAccordion(this)(el, show)
            css(items, 'width', "".concat(_this2.openSize, "px"));
            css(activeItems, 'width', "".concat(_this2.closeSize, "px"));
          });
        });
      }
    }
  };
  function hide(el, hide) {
    el && (el.hidden = hide);
  }

  var scrollbar = {
    mixins: [Togglable],
    props: {
      targets: String,
      active: null,
      openText: String,
      closeText: String,
      collapsible: Boolean,
      multiple: Boolean,
      toggle: String,
      content: String,
      transition: String,
      offset: Number
    },
    data: {
      target: ' .edit_contents',
      active: false,
      animation: [true],
      openSize: null,
      closeSize: null,
      blocks: ' .blocks',
      slide: " .swiper-wrapper > .swiper-slide",
      clsOpen: 'mui_active',
      toggle: ' .ctrl',
      transition: 'ease',
      duration: 300,
      offset: 0
    },
    computed: {
      target: function target(_ref, $el) {
        var target = _ref.target;
        return $$1(target, $el);
      }
    },
    connected: function connected() {
      this.setSize();
      this.Swiper = new Swiper(this.target, {
        mousewheel: true,
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true
      });
    },
    methods: {
      setSize: function setSize() {
        var itemsWidth = $$(this.blocks).reduce(function (size, element) {
          return size + width(element) + toFloat(css(element, 'marginLeft'));
        }, 0);
        css($$1(this.slide), 'width', "".concat(itemsWidth, "px"));
      }
    }
  };

  var datepicker = {
    mixins: [Position],
    props: {
      pickerButton: Boolean,
      value: String
    },
    data: {
      target: '> * input',
      pcikerBtn: '>.mui_picker_btn',
      dateBtn: '.mui_days button',
      testValue: '',
      testBtn: '>.testbtn',
      pickerButton: false,
      value: '',
      offset: 20,
      initialValue: '',
      initialDate: null,
      viewDate: null,
      isActivePicker: false,
      days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      daysMin: ['일', '월', '화', '수', '목', '금', '토'],
      months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      weekStart: 0,
      //시작 요일
      weeks: null,
      bodys: null,
      prevBtn: '.picker_header>.prev_btn',
      nextBtn: '.picker_header>.next_btn',
      $year: '.picker_header>.year_month>.current_year',
      $month: '.picker_header>.year_month>.current_month',
      datePattern: ['yyyy', 'mm', 'dd'],
      format: 'yyyy-mm-dd',
      // The start view date
      startDate: null,
      // The end view date
      endDate: null,
      // The initial date
      date: null,
      // Filter each date item (return `false` to disable a date item)
      filter: null,
      pickerHeader: '.picker_contents>.mui_calendar>.head',
      pickerBody: '.picker_contents>.mui_calendar>.body',
      activeClassName: 'mui_active',
      disabledClassName: 'mui_disabled',
      weeksClassName: 'mui_weeks',
      daysClassName: 'mui_days',
      todayClassName: 'mui_today',
      selectedClassName: 'mui_selected',
      template: "<div class=\"mui_datepicker_layer\">\n                <div class=\"inset\">\n                  <div class=\"picker_header\">\n                    <button type=\"button\" class=\"prev_btn\"><span class=\"text\"><span class=\"hidden\">\uC774\uC804 \uB2EC \uBCF4\uAE30</span></button>\n                    <span class=\"year_month\">\n                      <span class=\"current_year\"></span>\n                      <span class=\"current_month\"></span>\n                    </span>                  \n                    <button type=\"button\" class=\"next_btn\"><span class=\"text\"><span class=\"hidden\">\uB2E4\uC74C \uB2EC \uBCF4\uAE30</span></span></button>\n                  </div>\n                  <div class=\"picker_contents\">\n                    <table class=\"mui_calendar\">\n                      <thead class=\"head\"></thead>\n                      <tbody class=\"body\"></tbody>\n                    </table>\n                  </div>\n                </div>\n              </div>"
    },
    created: function created() {
      this.calendar = append(document.body, this.template);
      console.log('sdfsdfs');
    },
    computed: {
      prevBtn: function prevBtn(_ref) {
        var prevBtn = _ref.prevBtn;
        return $$1(prevBtn, this.calendar);
      },
      nextBtn: function nextBtn(_ref2) {
        var nextBtn = _ref2.nextBtn;
        return $$1(nextBtn, this.calendar);
      },
      $year: function $year(_ref3) {
        var $year = _ref3.$year;
        return $$1($year, this.calendar);
      },
      $month: function $month(_ref4) {
        var $month = _ref4.$month;
        return $$1($month, this.calendar);
      },
      target: function target(_ref5, $el) {
        var target = _ref5.target;
        return $$1(target, $el);
      },
      format: function format(_ref6) {
        var format = _ref6.format;
        return this.parseFormat(format);
      }
    },
    connected: function connected() {
      this.pickerButton;
        var startDate = this.startDate,
        endDate = this.endDate;
        this.$el;
      var initialValue = this.initialValue,
        date = this.date;
      initialValue = this.getValue();
      date = this.parseDate(date || initialValue);
      this.date = date;
      this.viewDate = new Date(date);
      this.initialDate = new Date(this.date);

      // startDate, endDate  = range 형태의 켈린더일 경우 사용
      if (startDate) {
        this.parseDate(startDate), _readOnlyError("startDate");
        if (date.getTime() < startDate.getTime()) {
          date = new Date(startDate);
        }
        this.startDate = startDate;
      }
      if (endDate) {
        this.parseDate(endDate), _readOnlyError("endDate");
        if (startDate && endDate.getTime() < startDate.getTime()) {
          _readOnlyError("endDate");
        }
        if (date.getTime() > endDate.getTime()) {
          date = new Date(endDate);
        }
        this.endDate = endDate;
      }
    },
    destory: function destory() {
      console.log('destory');
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.$props.target;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: document,
      handler: function handler(e) {
        var target = e.target;
        var hidden = true;
        var $el = this.$el,
          calendar = this.calendar;
        if (this.isActivePicker) {
          while (target !== document) {
            if (target === $el || target === calendar) {
              hidden = false;
              break;
            }
            target = target.parentNode;
          }
          if (hidden) {
            this.closePickerDate();
          }
        }
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return this.$props.prevBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        var year = this.viewDate.getFullYear();
        var month = this.viewDate.getMonth() - 1;
        var day = this.viewDate.getDate();
        this.viewDate = new Date(year, month, day);
        this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return this.$props.nextBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        var year = this.viewDate.getFullYear();
        var month = this.viewDate.getMonth() + 1;
        var day = this.viewDate.getDate();
        this.viewDate = new Date(year, month, day);
        this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return "".concat(this.pickerBody, " ").concat(this.dateBtn);
      },
      handler: function handler(e) {
        e.preventDefault();
        var val = this.parseDate(data(e.current, 'date'));
        this.setDate(val);
        this.closePickerDate();
      }
    },
    // 
    {
      name: 'keyup',
      delegate: function delegate() {
        return this.$props.target;
      },
      handler: function handler(e) {
        var self = e.target;
        var val = this.parseDate(this.parseDate(this.getValue()));
        this.viewDate = val;
        this.date = val;
        this.renderPickerDate();
        console.log(self.value);
      }
    }, {
      name: 'click',
      delegate: function delegate() {
        return this.pcikerBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.setValue();
      }
    }],
    methods: {
      renderPickerDate: function renderPickerDate() {
        var viewDate = this.viewDate,
          $year = this.$year,
          $month = this.$month,
          months = this.months,
          calendar = this.calendar;
        var yearText = viewDate.getFullYear();
        var montText = months[viewDate.getMonth()];
        this.weeks = find(this.pickerHeader, this.calendar);
        this.bodys = find(this.pickerBody, this.calendar);
        this.weeks.innerHTML = this.renderWeek();
        this.isActivePicker = true;
        $year.innerHTML = yearText;
        $month.innerHTML = montText;
        addClass(calendar, 'mui_active');
        this.renderDays();
        // css(calendar, 'top', `30%`)
        // css(calendar, 'top', `${dimensions(this.$el).top + dimensions(this.$el).height}px`)
        // css(calendar, 'left', `${dimensions(this.$el).left}px`)
        this.positionAt(calendar, this.$el);
      },
      closePickerDate: function closePickerDate() {
        var weeks = this.weeks,
          bodys = this.bodys,
          calendar = this.calendar;
        weeks.innerHTML = '';
        bodys.innerHTML = '';
        this.isActivePicker = false;
        removeClass(calendar, 'mui_active');
      },
      getValue: function getValue() {
        console.log(dateFormat(this.target.value, this.datePattern));
        // datePattern()
        // dateFormat(this.target.value, this.datePattern)
        return this.target.value;
      },
      setValue: function setValue() {
        console.log('aa');
        this.target.value = this.formatDate(this.date);
      },
      createItem: function createItem(data, type) {
        var selectedClassName = this.selectedClassName,
          disabledClassName = this.disabledClassName,
          weeksClassName = this.weeksClassName,
          daysClassName = this.daysClassName,
          todayClassName = this.todayClassName;
        var itemDefault = {
          text: '',
          view: '',
          prev: false,
          next: false,
          active: false,
          disabled: false,
          picked: false,
          classes: type === 'title' ? [weeksClassName] : [daysClassName],
          tag: type === 'title' ? 'th' : 'td'
        };
        var item = mergeOptions(itemDefault, data);
        if (item.active) item.classes.push(todayClassName);
        if (item.picked) item.classes.push(selectedClassName);

        // 이전 달이거나 다음 달일 경우
        if (item.prev || item.next) item.classes.push(disabledClassName);
        if (type !== 'title') {
          item.text = "<button type=\"button\" data-date=\"".concat(item.data, "\">").concat(item.text, "</button>");
        }
        return "<".concat(item.tag, " class=\"").concat(item.classes.join(' '), "\">").concat(item.text, "</").concat(item.tag, ">");
      },
      renderWeek: function renderWeek() {
        var _this = this;
        var items = ['<tr>'];
        var weekStart = this.weekStart,
          days = this.days,
          daysMin = this.daysMin;
        weekStart = parseInt(weekStart, 10) % 7;
        days = days.slice(weekStart).concat(days.slice(0, weekStart));
        daysMin = daysMin.slice(weekStart).concat(daysMin.slice(0, weekStart));
        each(daysMin, function (day, i) {
          items.push(_this.createItem({
            text: day,
            title: daysMin[i]
          }, 'title'));
        });
        items.push('</tr>');
        // console.log(items)
        return items.join('');
        // this.$week.html(items.join(''));
      },
      renderYears: function renderYears() {
        var options = this.options,
          startDate = this.startDate,
          endDate = this.endDate;
        var disabledClass = options.disabledClass,
          filter = options.filter,
          yearSuffix = options.yearSuffix;
        var viewYear = this.viewDate.getFullYear();
        var now = new Date();
        var thisYear = now.getFullYear();
        var year = this.date.getFullYear();
        var start = -5;
        var end = 6;
        var items = [];
        var prevDisabled = false;
        var nextDisabled = false;
        var i;
        for (i = start; i <= end; i += 1) {
          var date = new Date(viewYear + i, 1, 1);
          var disabled = false;
          if (startDate) {
            disabled = date.getFullYear() < startDate.getFullYear();
            if (i === start) {
              prevDisabled = disabled;
            }
          }
          if (!disabled && endDate) {
            disabled = date.getFullYear() > endDate.getFullYear();
            if (i === end) {
              nextDisabled = disabled;
            }
          }
          if (!disabled && filter) {
            disabled = filter.call(this.$element, date, 'year') === false;
          }
          var picked = viewYear + i === year;
          var view = picked ? 'year picked' : 'year';
          items.push(this.createItem({
            picked: picked,
            disabled: disabled,
            text: viewYear + i,
            view: disabled ? 'year disabled' : view,
            highlighted: date.getFullYear() === thisYear
          }));
        }
        this.$yearsPrev.toggleClass(disabledClass, prevDisabled);
        this.$yearsNext.toggleClass(disabledClass, nextDisabled);
        this.$yearsCurrent.toggleClass(disabledClass, true).html("".concat(viewYear + start + yearSuffix, " - ").concat(viewYear + end).concat(yearSuffix));
        this.$years.html(items.join(''));
      },
      renderMonths: function renderMonths() {
        var options = this.options,
          startDate = this.startDate,
          endDate = this.endDate,
          viewDate = this.viewDate;
        var disabledClass = options.disabledClass || '';
        var months = options.monthsShort;
        var filter = $$1.isFunction(options.filter) && options.filter;
        var viewYear = viewDate.getFullYear();
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth();
        var year = this.date.getFullYear();
        var month = this.date.getMonth();
        var items = [];
        var prevDisabled = false;
        var nextDisabled = false;
        var i;
        for (i = 0; i <= 11; i += 1) {
          var date = new Date(viewYear, i, 1);
          var disabled = false;
          if (startDate) {
            prevDisabled = date.getFullYear() === startDate.getFullYear();
            disabled = prevDisabled && date.getMonth() < startDate.getMonth();
          }
          if (!disabled && endDate) {
            nextDisabled = date.getFullYear() === endDate.getFullYear();
            disabled = nextDisabled && date.getMonth() > endDate.getMonth();
          }
          if (!disabled && filter) {
            disabled = filter.call(this.$element, date, 'month') === false;
          }
          var picked = viewYear === year && i === month;
          var view = picked ? 'month picked' : 'month';
          items.push(this.createItem({
            disabled: disabled,
            picked: picked,
            highlighted: viewYear === thisYear && date.getMonth() === thisMonth,
            index: i,
            text: months[i],
            view: disabled ? 'month disabled' : view
          }));
        }
        this.$yearPrev.toggleClass(disabledClass, prevDisabled);
        this.$yearNext.toggleClass(disabledClass, nextDisabled);
        this.$yearCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(viewYear + options.yearSuffix || '');
        this.$months.html(items.join(''));
      },
      renderDays: function renderDays() {
        this.$el;
          var startDate = this.startDate,
          endDate = this.endDate,
          viewDate = this.viewDate,
          currentDate = this.date;
        var weekStart = this.weekStart,
          filter = this.filter;
        var viewYear = viewDate.getFullYear();
        var viewMonth = viewDate.getMonth();
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth();
        var thisDay = now.getDate();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        var day = currentDate.getDate();
        var length;
        var i;
        var n;

        // Days of prev month
        // -----------------------------------------------------------------------
        var prevItems = [];
        var prevViewYear = viewYear;
        var prevViewMonth = viewMonth;
        if (viewMonth === 0) {
          prevViewYear -= 1;
          prevViewMonth = 11;
        } else {
          prevViewMonth -= 1;
        }

        // 이전달의 마지막 날 또는 이전달의 길이
        length = getDaysInMonth(prevViewYear, prevViewMonth);

        // 이번달의 첫 날
        var firstDay = new Date(viewYear, viewMonth, 1);
        // console.log(this.formatDate(firstDay))

        // 이전 달 중 보이는 날의 길이
        // [0,1,2,3,4,5,6] - [0,1,2,3,4,5,6] => [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]
        n = firstDay.getDay() - parseInt(weekStart, 10) % 7;
        // [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] => [1,2,3,4,5,6,7]

        if (n <= 0) {
          n += 7;
        }
        if (startDate) {
          firstDay.getTime() <= startDate.getTime();
        }
        for (i = length - (n - 1); i <= length; i += 1) {
          var prevViewDate = new Date(prevViewYear, prevViewMonth, i);
          var disabled = false;
          if (startDate) {
            disabled = prevViewDate.getTime() < startDate.getTime();
          }
          if (!disabled && filter) {
            disabled = filter.call($element, prevViewDate, 'day') === false;
          }
          prevItems.push(this.createItem({
            disabled: disabled,
            active: prevViewYear === thisYear && prevViewMonth === thisMonth && prevViewDate.getDate() === thisDay,
            prev: true,
            picked: prevViewYear === year && prevViewMonth === month && i === day,
            text: i,
            view: 'day prev',
            data: this.formatDate(prevViewDate)
          }));
        }

        // Days of next month
        // -----------------------------------------------------------------------

        var nextItems = [];
        var nextViewYear = viewYear;
        var nextViewMonth = viewMonth;
        if (viewMonth === 11) {
          nextViewYear += 1;
          nextViewMonth = 0;
        } else {
          nextViewMonth += 1;
        }

        // 이번달의 마지막 날
        length = getDaysInMonth(viewYear, viewMonth);

        // 켈린더 개수 42칸 유지 (이번달 게수에서 이전 달 개수를 뺀 값) (42 means 6 rows and 7 columns)
        n = 42 - (prevItems.length + length);

        // 이번달의 마지막 날
        var lastDate = new Date(viewYear, viewMonth, length);

        // endDate가 있을 경우
        if (endDate) {
          lastDate.getTime() >= endDate.getTime();
        }
        for (i = 1; i <= n; i += 1) {
          var date = new Date(nextViewYear, nextViewMonth, i);
          var picked = nextViewYear === year && nextViewMonth === month && i === day;
          var _disabled = false;
          if (endDate) {
            _disabled = date.getTime() > endDate.getTime();
          }
          if (!_disabled && filter) {
            _disabled = filter.call($element, date, 'day') === false;
          }
          nextItems.push(this.createItem({
            disabled: _disabled,
            picked: picked,
            active: nextViewYear === thisYear && nextViewMonth === thisMonth && date.getDate() === thisDay,
            next: true,
            text: i,
            view: 'day next',
            data: this.formatDate(date)
          }));
        }

        // Days of current month
        // -----------------------------------------------------------------------

        var items = [];
        for (i = 1; i <= length; i += 1) {
          var _date = new Date(viewYear, viewMonth, i);
          var _disabled2 = false;
          if (startDate) {
            _disabled2 = _date.getTime() < startDate.getTime();
          }
          if (!_disabled2 && endDate) {
            _disabled2 = _date.getTime() > endDate.getTime();
          }
          if (!_disabled2 && filter) {
            _disabled2 = filter.call($element, _date, 'day') === false;
          }
          var _picked = viewYear === year && viewMonth === month && i === day;
          var view = _picked ? 'day picked' : 'day';
          items.push(this.createItem({
            disabled: _disabled2,
            picked: _picked,
            active: viewYear === thisYear && viewMonth === thisMonth && _date.getDate() === thisDay,
            text: i,
            view: _disabled2 ? 'day disabled' : view,
            data: this.formatDate(_date)
          }));
        }

        // , items, nextItems
        var currItems = [].concat(prevItems, items, nextItems);
        var itemes = [];
        // console.log(currItems)
        var column = 7;
        for (var _i = 0; _i < currItems.length; _i++) {
          var num = _i % column;
          if (num === 0) {
            itemes.push('<tr>');
            itemes.push(currItems[_i]);
          } else if (num === column - 1) {
            itemes.push(currItems[_i]);
            itemes.push('</tr>');
          } else {
            itemes.push(currItems[_i]);
          }
        }

        // Render days picker
        // -----------------------------------------------------------------------
        empty(this.bodys);
        this.bodys.innerHTML = itemes.join('');
        // this.$monthPrev.toggleClass(disabledClass, prevDisabled);
        // this.$monthNext.toggleClass(disabledClass, nextDisabled);
        // this.$monthCurrent
        //   .toggleClass(disabledClass, prevDisabled && nextDisabled)
        //   .html(options.yearFirst
        //     ? `${viewYear + yearSuffix} ${months[viewMonth]}`
        //     : `${months[viewMonth]} ${viewYear}${yearSuffix}`);
        // this.$days.html(prevItems.join('') + items.join('') + nextItems.join(''));
      },
      formatDate: function formatDate(date) {
        var format = this.format;
        var formatted = '';
        if (isDate(date)) {
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          var values = {
            d: day,
            dd: addLeadingZero(day, 2),
            m: month + 1,
            mm: addLeadingZero(month + 1, 2),
            yy: String(year).substring(2),
            yyyy: addLeadingZero(year, 4)
          };
          formatted = format.source;
          each(format.parts, function (part) {
            formatted = formatted.replace(part, values[part]);
          });
        }
        return formatted;
      },
      parseDate: function parseDate(date) {
        console.log(date);
        var format = this.format;
        var parts = [];
        if (!isDate(date)) {
          if (isString(date)) {
            parts = date.match(/\d+/g) || [];
          }
          date = date ? new Date(date) : new Date();
          if (!isDate(date)) {
            date = new Date();
          }
          if (parts.length === format.parts.length) {
            // Set year and month first
            each(parts, function (i, part) {
              var value = parseInt(part, 10);
              switch (format.parts[i]) {
                case 'yy':
                  date.setFullYear(2000 + value);
                  break;
                case 'yyyy':
                  // Converts 2-digit year to 2000+
                  date.setFullYear(part.length === 2 ? 2000 + value : value);
                  break;
                case 'mm':
                case 'm':
                  date.setMonth(value - 1);
                  break;
              }
            });

            // Set day in the last to avoid converting `31/10/2019` to `01/10/2019`
            each(parts, function (i, part) {
              var value = parseInt(part, 10);
              switch (format.parts[i]) {
                case 'dd':
                case 'd':
                  date.setDate(value);
                  break;
              }
            });
          }
        }

        // Ignore hours, minutes, seconds and milliseconds to avoid side effect (#192)
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      },
      setDate: function setDate(val) {
        this.viewDate = val;
        this.date = val;
        this.setValue();
      },
      parseFormat: function parseFormat(format) {
        var source = String(format).toLowerCase();
        var parts = source.match(/(y|m|d)+/g);
        if (!parts || parts.length === 0) {
          throw new Error('Invalid date format.');
        }
        format = {
          source: source,
          parts: parts
        };
        each(parts, function (part) {
          switch (part) {
            case 'dd':
            case 'd':
              format.hasDay = true;
              break;
            case 'mm':
            case 'm':
              format.hasMonth = true;
              break;
            case 'yyyy':
            case 'yy':
              format.hasYear = true;
              break;
          }
        });
        return format;
      }
    },
    update: {
      write: function write() {
        if (this.isActivePicker) this.closePickerDate();
      },
      events: ['scroll', 'resize']
    }
  };

  var Media = {
    props: {
      media: Boolean
    },
    data: {
      media: false
    },
    connected: function connected() {
      var _this = this;
      var media = toMedia(this.media, this.$el);
      this.matchMedia = true;
      if (media) {
        this.mediaObj = window.matchMedia(media);
        var handler = function handler() {
          _this.matchMedia = _this.mediaObj.matches;
          trigger(_this.$el, createEvent("mediachange", false, true, [_this.mediaObj]));
        };
        this.offMediaObj = on(this.mediaObj, "change", function () {
          handler();
          _this.$emit("resize");
        });
        handler();
      }
    },
    disconnected: function disconnected() {
      var _this$offMediaObj;
      (_this$offMediaObj = this.offMediaObj) === null || _this$offMediaObj === void 0 ? void 0 : _this$offMediaObj.call(this);
    }
  };
  function toMedia(value, element) {
    if (isString(value)) {
      if (startsWith(value, "@")) {
        value = toFloat(css(element, "--uk-breakpoint-".concat(value.substr(1))));
      } else if (isNaN(value)) {
        return value;
      }
    }
    return value && isNumeric(value) ? "(min-width: ".concat(value, "px)") : "";
  }

  var Resize = {
    connected: function connected() {
      var _this$$options$resize,
        _this = this;
      this.registerObserver(observeResize(((_this$$options$resize = this.$options.resizeTargets) === null || _this$$options$resize === void 0 ? void 0 : _this$$options$resize.call(this)) || this.$el, function () {
        return _this.$emit('resize');
      }));
    }
  };

  var Scroll = {
    connected: function connected() {
      var _this = this;
      registerScrollListener(this._uid, function () {
        return _this.$emit('scroll');
      });
    },
    disconnected: function disconnected() {
      unregisterScrollListener(this._uid);
    }
  };
  var scrollListeners = new Map();
  var unbindScrollListener;
  function registerScrollListener(id, listener) {
    unbindScrollListener = unbindScrollListener || on(window, 'scroll', function () {
      return scrollListeners.forEach(function (listener) {
        return listener();
      });
    }, {
      passive: true,
      capture: true
    });
    scrollListeners.set(id, listener);
  }
  function unregisterScrollListener(id) {
    scrollListeners["delete"](id);
    if (unbindScrollListener && !scrollListeners.size) {
      unbindScrollListener();
      unbindScrollListener = null;
    }
  }

  var sticky = {
    mixins: [Class, Media, Resize, Scroll],
    props: {
      position: String,
      top: null,
      bottom: null,
      start: null,
      end: null,
      offset: String,
      overflowFlip: Boolean,
      animation: String,
      clsActive: String,
      clsInactive: String,
      clsFixed: String,
      clsBelow: String,
      selTarget: String,
      showOnUp: Boolean,
      targetOffset: Number
    },
    data: {
      position: 'top',
      top: false,
      bottom: false,
      start: false,
      end: false,
      offset: 0,
      overflowFlip: false,
      animation: '',
      clsActive: 'mui_active',
      clsInactive: '',
      clsFixed: 'mui_sticky_fixed',
      clsBelow: 'mui_sticky_below',
      selTarget: '',
      showOnUp: false,
      targetOffset: false
    },
    computed: {
      selTarget: function selTarget(_ref, $el) {
        var selTarget = _ref.selTarget;
        return selTarget && $$1(selTarget, $el) || $el;
      }
    },
    resizeTargets: function resizeTargets() {
      return document.documentElement;
    },
    connected: function connected() {
      this.start = coerce(this.start || this.top);
      this.end = coerce(this.end || this.bottom);
      this.placeholder = $$1('+ .mui-sticky-placeholder', this.$el) || $$1('<div class="mui-sticky-placeholder"></div>');
      this.isFixed = false;
      this.setActive(false);
    },
    disconnected: function disconnected() {
      if (this.isFixed) {
        this.hide();
        removeClass(this.selTarget, this.clsInactive);
      }
      remove$1(this.placeholder);
      this.placeholder = null;
    },
    events: [{
      name: 'resize',
      el: function el() {
        return window;
      },
      handler: function handler() {
        this.$emit('resize');
      }
    }, {
      name: 'load hashchange popstate',
      el: function el() {
        return window;
      },
      filter: function filter() {
        return this.targetOffset !== false;
      },
      handler: function handler() {
        var _this = this;
        var _document = document,
          scrollingElement = _document.scrollingElement;
        if (!location.hash || scrollingElement.scrollTop === 0) {
          return;
        }
        setTimeout(function () {
          var targetOffset = offset($$1(location.hash));
          var elOffset = offset(_this.$el);
          if (_this.isFixed && intersectRect(targetOffset, elOffset)) {
            scrollingElement.scrollTop = targetOffset.top - elOffset.height - toPx(_this.targetOffset, 'height', _this.placeholder) - toPx(_this.offset, 'height', _this.placeholder);
          }
        });
      }
    }],
    update: [{
      read: function read(_ref2, types) {
        var _this2 = this;
        var height$1 = _ref2.height,
          margin = _ref2.margin;
        this.inactive = !this.matchMedia || !isVisible(this.$el);
        if (this.inactive) {
          return false;
        }
        var hide = this.active && types.has('resize');
        if (hide) {
          css(this.selTarget, 'transition', '0s');
          this.hide();
        }
        if (!this.active) {
          height$1 = offset(this.$el).height;
          margin = css(this.$el, 'margin');
        }
        if (hide) {
          this.show();
          requestAnimationFrame(function () {
            return css(_this2.selTarget, 'transition', '');
          });
        }
        var referenceElement = this.isFixed ? this.placeholder : this.$el;
        var windowHeight = height(window);
        var position = this.position;
        if (this.overflowFlip && height$1 > windowHeight) {
          position = position === 'top' ? 'bottom' : 'top';
        }
        var offset$1 = toPx(this.offset, 'height', referenceElement);
        if (position === 'bottom' && (height$1 < windowHeight || this.overflowFlip)) {
          offset$1 += windowHeight - height$1;
        }
        var overflow = this.overflowFlip ? 0 : Math.max(0, height$1 + offset$1 - windowHeight);
        var topOffset = offset(referenceElement).top;
        var start = (this.start === false ? topOffset : parseProp(this.start, this.$el, topOffset)) - offset$1;
        var end = this.end === false ? document.scrollingElement.scrollHeight - windowHeight : parseProp(this.end, this.$el, topOffset + height$1, true) - offset(this.$el).height + overflow - offset$1;
        return {
          start: start,
          end: end,
          offset: offset$1,
          overflow: overflow,
          topOffset: topOffset,
          height: height$1,
          margin: margin,
          width: dimensions(referenceElement).width,
          top: offsetPosition(referenceElement)[0]
        };
      },
      write: function write(_ref3) {
        var height = _ref3.height,
          margin = _ref3.margin;
        var placeholder = this.placeholder;
        css(placeholder, {
          height: height,
          margin: margin
        });
        if (!within(placeholder, document)) {
          after(this.$el, placeholder);
          placeholder.hidden = true;
        }
      },
      events: ['resize']
    }, {
      read: function read(_ref4) {
        var _ref4$scroll = _ref4.scroll,
          prevScroll = _ref4$scroll === void 0 ? 0 : _ref4$scroll,
          _ref4$dir = _ref4.dir,
          prevDir = _ref4$dir === void 0 ? 'down' : _ref4$dir,
          overflow = _ref4.overflow,
          _ref4$overflowScroll = _ref4.overflowScroll,
          overflowScroll = _ref4$overflowScroll === void 0 ? 0 : _ref4$overflowScroll,
          start = _ref4.start,
          end = _ref4.end;
        var scroll = document.scrollingElement.scrollTop;
        var dir = prevScroll <= scroll ? 'down' : 'up';
        return {
          dir: dir,
          prevDir: prevDir,
          scroll: scroll,
          prevScroll: prevScroll,
          offsetParentTop: offset((this.isFixed ? this.placeholder : this.$el).offsetParent).top,
          overflowScroll: clamp(overflowScroll + clamp(scroll, start, end) - clamp(prevScroll, start, end), 0, overflow)
        };
      },
      write: function write(data, types) {
        var _this3 = this;
        var isScrollUpdate = types.has('scroll');
        var _data$initTimestamp = data.initTimestamp,
          initTimestamp = _data$initTimestamp === void 0 ? 0 : _data$initTimestamp,
          dir = data.dir,
          prevDir = data.prevDir,
          scroll = data.scroll,
          _data$prevScroll = data.prevScroll,
          prevScroll = _data$prevScroll === void 0 ? 0 : _data$prevScroll,
          top = data.top,
          start = data.start,
          topOffset = data.topOffset,
          height = data.height;
        if (scroll < 0 || scroll === prevScroll && isScrollUpdate || this.showOnUp && !isScrollUpdate && !this.isFixed) {
          return;
        }
        var now = Date.now();
        if (now - initTimestamp > 300 || dir !== prevDir) {
          data.initScroll = scroll;
          data.initTimestamp = now;
        }
        if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll) <= 30 && Math.abs(prevScroll - scroll) <= 10) {
          return;
        }
        if (this.inactive || scroll < start || this.showOnUp && (scroll <= start || dir === 'down' && isScrollUpdate || dir === 'up' && !this.isFixed && scroll <= topOffset + height)) {
          if (!this.isFixed) {
            if (Animation.inProgress(this.$el) && top > scroll) {
              Animation.cancel(this.$el);
              this.hide();
            }
            return;
          }
          this.isFixed = false;
          if (this.animation && scroll > topOffset) {
            Animation.cancel(this.$el);
            Animation.out(this.$el, this.animation).then(function () {
              return _this3.hide();
            }, noop);
          } else {
            this.hide();
          }
        } else if (this.isFixed) {
          this.update();
        } else if (this.animation && scroll > topOffset) {
          Animation.cancel(this.$el);
          this.show();
          Animation["in"](this.$el, this.animation)["catch"](noop);
        } else {
          this.show();
        }
      },
      events: ['resize', 'scroll']
    }],
    methods: {
      show: function show() {
        this.isFixed = true;
        this.update();
        this.placeholder.hidden = false;
      },
      hide: function hide() {
        this.setActive(false);
        removeClass(this.$el, this.clsFixed, this.clsBelow);
        css(this.$el, {
          position: '',
          top: '',
          width: ''
        });
        this.placeholder.hidden = true;
      },
      update: function update() {
        var _this$_data = this._data,
          width = _this$_data.width,
          _this$_data$scroll = _this$_data.scroll,
          scroll = _this$_data$scroll === void 0 ? 0 : _this$_data$scroll,
          overflow = _this$_data.overflow,
          _this$_data$overflowS = _this$_data.overflowScroll,
          overflowScroll = _this$_data$overflowS === void 0 ? 0 : _this$_data$overflowS,
          start = _this$_data.start,
          end = _this$_data.end,
          offset = _this$_data.offset,
          topOffset = _this$_data.topOffset,
          height = _this$_data.height,
          offsetParentTop = _this$_data.offsetParentTop;
        var active = start !== 0 || scroll > start;
        var position = 'fixed';
        if (scroll > end) {
          offset += end - offsetParentTop;
          position = 'absolute';
        }
        if (overflow) {
          offset -= overflowScroll;
        }
        css(this.$el, {
          position: position,
          top: "".concat(offset, "px"),
          width: width
        });
        this.setActive(active);
        toggleClass(this.$el, this.clsBelow, scroll > topOffset + height);
        addClass(this.$el, this.clsFixed);
      },
      setActive: function setActive(active) {
        var prev = this.active;
        this.active = active;
        if (active) {
          replaceClass(this.selTarget, this.clsInactive, this.clsActive);
          prev !== active && trigger(this.$el, 'active');
        } else {
          replaceClass(this.selTarget, this.clsActive, this.clsInactive);
          prev !== active && trigger(this.$el, 'inactive');
        }
      }
    }
  };
  function parseProp(value, el, propOffset, padding) {
    if (!value) {
      return 0;
    }
    if (isNumeric(value) || isString(value) && value.match(/^-?\d/)) {
      return propOffset + toPx(value, 'height', el, true);
    } else {
      var refElement = value === true ? parent(el) : query(value, el);
      return offset(refElement).bottom - (padding && refElement && within(el, refElement) ? toFloat(css(refElement, 'paddingBottom')) : 0);
    }
  }
  function coerce(value) {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return value;
  }

  function getRows(items) {
    return sortBy(items, 'top', 'bottom');
  }
  function sortBy(items, startProp, endProp) {
    var sorted = [[]];
    var _iterator4 = _createForOfIteratorHelper(items),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var el = _step4.value;
        if (!isVisible(el)) {
          continue;
        }
        var dim = getOffset(el);
        for (var i = sorted.length - 1; i >= 0; i--) {
          var current = sorted[i];
          if (!current[0]) {
            current.push(el);
            break;
          }
          var startDim = void 0;
          if (current[0].offsetParent === el.offsetParent) {
            startDim = getOffset(current[0]);
          } else {
            dim = getOffset(el, true);
            startDim = getOffset(current[0], true);
          }
          if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
            sorted.push([el]);
            break;
          }
          if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
            current.push(el);
            break;
          }
          if (i === 0) {
            sorted.unshift([el]);
            break;
          }
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return sorted;
  }
  function getOffset(element) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var offsetTop = element.offsetTop,
      offsetLeft = element.offsetLeft,
      offsetHeight = element.offsetHeight,
      offsetWidth = element.offsetWidth;
    if (offset) {
      var _offsetPosition = offsetPosition(element);
      var _offsetPosition2 = _slicedToArray(_offsetPosition, 2);
      offsetTop = _offsetPosition2[0];
      offsetLeft = _offsetPosition2[1];
    }
    return {
      top: offsetTop,
      left: offsetLeft,
      bottom: offsetTop + offsetHeight,
      right: offsetLeft + offsetWidth
    };
  }

  var clsLeave = 'uk-transition-leave';
  var clsEnter = 'uk-transition-enter';
  function fade(action, target, duration) {
    var stagger = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var index = transitionIndex(target, true);
    var propsIn = {
      opacity: 1
    };
    var propsOut = {
      opacity: 0
    };
    var wrapIndexFn = function wrapIndexFn(fn) {
      return function () {
        return index === transitionIndex(target) ? fn() : Promise.reject();
      };
    };
    var leaveFn = wrapIndexFn(function () {
      uikitUtil.addClass(target, clsLeave);
      return Promise.all(getTransitionNodes(target).map(function (child, i) {
        return new Promise(function (resolve) {
          return setTimeout(function () {
            return uikitUtil.Transition.start(child, propsOut, duration / 2, 'ease').then(resolve);
          }, i * stagger);
        });
      })).then(function () {
        return uikitUtil.removeClass(target, clsLeave);
      });
    });
    var enterFn = wrapIndexFn(function () {
      var oldHeight = uikitUtil.height(target);
      uikitUtil.addClass(target, clsEnter);
      action();
      uikitUtil.css(uikitUtil.children(target), {
        opacity: 0
      });

      // Ensure UIkit updates have propagated
      return new Promise(function (resolve) {
        return requestAnimationFrame(function () {
          var nodes = uikitUtil.children(target);
          var newHeight = uikitUtil.height(target);

          // Ensure Grid cells do not stretch when height is applied
          uikitUtil.css(target, 'alignContent', 'flex-start');
          uikitUtil.height(target, oldHeight);
          var transitionNodes = getTransitionNodes(target);
          uikitUtil.css(nodes, propsOut);
          var transitions = transitionNodes.map(function (child, i) {
            return new Promise(function (resolve) {
              return setTimeout(function () {
                return uikitUtil.Transition.start(child, propsIn, duration / 2, 'ease').then(resolve);
              }, i * stagger);
            });
          });
          if (oldHeight !== newHeight) {
            transitions.push(uikitUtil.Transition.start(target, {
              height: newHeight
            }, duration / 2 + transitionNodes.length * stagger, 'ease'));
          }
          Promise.all(transitions).then(function () {
            uikitUtil.removeClass(target, clsEnter);
            if (index === transitionIndex(target)) {
              uikitUtil.css(target, {
                height: '',
                alignContent: ''
              });
              uikitUtil.css(nodes, {
                opacity: ''
              });
              delete target.dataset.transition;
            }
            resolve();
          });
        });
      });
    });
    return uikitUtil.hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : uikitUtil.hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
  }
  function transitionIndex(target, next) {
    if (next) {
      target.dataset.transition = 1 + transitionIndex(target);
    }
    return uikitUtil.toNumber(target.dataset.transition) || 0;
  }
  function waitTransitionend(target) {
    return Promise.all(uikitUtil.children(target).filter(uikitUtil.Transition.inProgress).map(function (el) {
      return new Promise(function (resolve) {
        return uikitUtil.once(el, 'transitionend transitioncanceled', resolve);
      });
    }));
  }
  function getTransitionNodes(target) {
    return getRows(uikitUtil.children(target)).reduce(function (nodes, row) {
      return nodes.concat(uikitUtil.sortBy(row.filter(function (el) {
        return uikitUtil.isInView(el);
      }), 'offsetLeft'));
    }, []);
  }

  function slide (action, target, duration) {
    return new Promise(function (resolve) {
      return requestAnimationFrame(function () {
        var nodes = children(target);

        // Get current state
        var currentProps = nodes.map(function (el) {
          return getProps(el, true);
        });
        var targetProps = css(target, ['height', 'padding']);

        // Cancel previous animations
        Transition.cancel(target);
        nodes.forEach(Transition.cancel);
        reset(target);

        // Adding, sorting, removing nodes
        action();

        // Find new nodes
        nodes = nodes.concat(children(target).filter(function (el) {
          return !includes(nodes, el);
        }));

        // Wait for update to propagate
        Promise.resolve().then(function () {
          // Force update
          fastdom.flush();

          // Get new state
          var targetPropsTo = css(target, ['height', 'padding']);
          var _getTransitionProps = getTransitionProps(target, nodes, currentProps),
            _getTransitionProps2 = _slicedToArray(_getTransitionProps, 2),
            propsTo = _getTransitionProps2[0],
            propsFrom = _getTransitionProps2[1];

          // Reset to previous state
          nodes.forEach(function (el, i) {
            return propsFrom[i] && css(el, propsFrom[i]);
          });
          css(target, _objectSpread2({
            display: 'block'
          }, targetProps));

          // Start transitions on next frame
          requestAnimationFrame(function () {
            var transitions = nodes.map(function (el, i) {
              return parent(el) === target && Transition.start(el, propsTo[i], duration, 'ease');
            }).concat(Transition.start(target, targetPropsTo, duration, 'ease'));
            Promise.all(transitions).then(function () {
              nodes.forEach(function (el, i) {
                return parent(el) === target && css(el, 'display', propsTo[i].opacity === 0 ? 'none' : '');
              });
              reset(target);
            }, noop).then(resolve);
          });
        });
      });
    });
  }
  function getProps(el, opacity) {
    var zIndex = css(el, 'zIndex');
    return isVisible(el) ? _objectSpread2({
      display: '',
      opacity: opacity ? css(el, 'opacity') : '0',
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: zIndex === 'auto' ? index(el) : zIndex
    }, getPositionWithMargin(el)) : false;
  }
  function getTransitionProps(target, nodes, currentProps) {
    var propsTo = nodes.map(function (el, i) {
      return parent(el) && i in currentProps ? currentProps[i] ? isVisible(el) ? getPositionWithMargin(el) : {
        opacity: 0
      } : {
        opacity: isVisible(el) ? 1 : 0
      } : false;
    });
    var propsFrom = propsTo.map(function (props, i) {
      var from = parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));
      if (!from) {
        return false;
      }
      if (!props) {
        delete from.opacity;
      } else if (!('opacity' in props)) {
        var opacity = from.opacity;
        if (opacity % 1) {
          props.opacity = 1;
        } else {
          delete from.opacity;
        }
      }
      return from;
    });
    return [propsTo, propsFrom];
  }
  function reset(el) {
    css(el.children, {
      height: '',
      left: '',
      opacity: '',
      pointerEvents: '',
      position: '',
      top: '',
      marginTop: '',
      marginLeft: '',
      transform: '',
      width: '',
      zIndex: ''
    });
    css(el, {
      height: '',
      display: '',
      padding: ''
    });
  }
  function getPositionWithMargin(el) {
    var _offset = offset(el),
      height = _offset.height,
      width = _offset.width;
    var _position = position(el),
      top = _position.top,
      left = _position.left;
    var _css = css(el, ['marginTop', 'marginLeft']),
      marginLeft = _css.marginLeft,
      marginTop = _css.marginTop;
    return {
      top: top,
      left: left,
      height: height,
      width: width,
      marginLeft: marginLeft,
      marginTop: marginTop,
      transform: ''
    };
  }

  var Animate = {
    props: {
      duration: Number,
      animation: Boolean
    },
    data: {
      duration: 50,
      animation: 'slide'
    },
    methods: {
      animate: function animate(action) {
        var _this = this;
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$el;
        var name = this.animation;
        var animationFn = name === 'fade' ? fade : name === 'delayed-fade' ? function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return fade.apply(void 0, args.concat([40]));
        } : name ? slide : function () {
          action();
          return Promise.resolve();
        };
        return animationFn(action, target, this.duration).then(function () {
          return _this.$update(target, 'resize');
        }, noop);
      }
    }
  };

  var sortable = {
    mixins: [Class, Animate],
    props: {
      group: String,
      threshold: Number,
      clsItem: String,
      clsPlaceholder: String,
      clsDrag: String,
      clsDragState: String,
      clsBase: String,
      clsNoDrag: String,
      clsEmpty: String,
      clsCustom: String,
      handle: String
    },
    data: {
      group: false,
      threshold: 5,
      clsItem: 'mui-sortable-item',
      clsPlaceholder: 'mui-sortable-placeholder',
      clsDrag: 'mui-sortable-drag',
      clsDragState: 'mui-drag',
      clsBase: 'mui-sortable',
      clsNoDrag: 'mui-sortable-nodrag',
      clsEmpty: 'mui-sortable-empty',
      clsCustom: '',
      handle: false,
      pos: {}
    },
    created: function created() {
      var _this = this;
      var _loop = function _loop() {
        var key = _arr[_i];
        var fn = _this[key];
        _this[key] = function (e) {
          assign(_this.pos, getEventPos(e));
          fn(e);
        };
      };
      for (var _i = 0, _arr = ['init', 'start', 'move', 'end']; _i < _arr.length; _i++) {
        _loop();
      }
    },
    events: {
      name: pointerDown,
      passive: false,
      handler: 'init'
    },
    computed: {
      target: function target() {
        return (this.$el.tBodies || [this.$el])[0];
      },
      items: function items() {
        return children(this.target);
      },
      isEmpty: {
        get: function get() {
          return isEmpty$1(this.items);
        },
        watch: function watch(empty) {
          toggleClass(this.target, this.clsEmpty, empty);
        },
        immediate: true
      },
      handles: {
        get: function get(_ref, el) {
          var handle = _ref.handle;
          return handle ? $$(handle, el) : this.items;
        },
        watch: function watch(handles, prev) {
          css(prev, {
            touchAction: '',
            userSelect: ''
          });
          css(handles, {
            touchAction: hasTouch ? 'none' : '',
            userSelect: 'none'
          }); // touchAction set to 'none' causes a performance drop in Chrome 80
        },

        immediate: true
      }
    },
    update: {
      write: function write(data) {
        if (!this.drag || !parent(this.placeholder)) {
          return;
        }
        var _this$pos = this.pos,
          x = _this$pos.x,
          y = _this$pos.y,
          _this$origin = this.origin,
          offsetTop = _this$origin.offsetTop,
          offsetLeft = _this$origin.offsetLeft,
          placeholder = this.placeholder;
        css(this.drag, {
          top: y - offsetTop,
          left: x - offsetLeft
        });
        var sortable = this.getSortable(document.elementFromPoint(x, y));
        if (!sortable) {
          return;
        }
        var items = sortable.items;
        if (items.some(Transition.inProgress)) {
          return;
        }
        var target = findTarget(items, {
          x: x,
          y: y
        });
        if (items.length && (!target || target === placeholder)) {
          return;
        }
        var previous = this.getSortable(placeholder);
        var insertTarget = findInsertTarget(sortable.target, target, placeholder, x, y, sortable === previous && data.moved !== target);
        if (insertTarget === false) {
          return;
        }
        if (insertTarget && placeholder === insertTarget) {
          return;
        }
        if (sortable !== previous) {
          previous.remove(placeholder);
          data.moved = target;
        } else {
          delete data.moved;
        }
        sortable.insert(placeholder, insertTarget);
        this.touched.add(sortable);
      },
      events: ['move']
    },
    methods: {
      init: function init(e) {
        var target = e.target,
          button = e.button,
          defaultPrevented = e.defaultPrevented;
        var _this$items$filter = this.items.filter(function (el) {
            return within(target, el);
          }),
          _this$items$filter2 = _slicedToArray(_this$items$filter, 1),
          placeholder = _this$items$filter2[0];
        if (!placeholder || defaultPrevented || button > 0 || isInput(target) || within(target, ".".concat(this.clsNoDrag)) || this.handle && !within(target, this.handle)) {
          return;
        }
        e.preventDefault();
        this.touched = new Set([this]);
        this.placeholder = placeholder;
        this.origin = _objectSpread2({
          target: target,
          index: index(placeholder)
        }, this.pos);
        on(document, pointerMove, this.move);
        on(document, pointerUp, this.end);
        if (!this.threshold) {
          this.start(e);
        }
      },
      start: function start(e) {
        this.drag = appendDrag(this.$container, this.placeholder);
        var _this$placeholder$get = this.placeholder.getBoundingClientRect(),
          left = _this$placeholder$get.left,
          top = _this$placeholder$get.top;
        assign(this.origin, {
          offsetLeft: this.pos.x - left,
          offsetTop: this.pos.y - top
        });
        addClass(this.drag, this.clsDrag, this.clsCustom);
        addClass(this.placeholder, this.clsPlaceholder);
        addClass(this.items, this.clsItem);
        addClass(document.documentElement, this.clsDragState);
        trigger(this.$el, 'start', [this, this.placeholder]);
        trackScroll(this.pos);
        this.move(e);
      },
      move: function move(e) {
        if (this.drag) {
          this.$emit('move');
        } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
          this.start(e);
        }
      },
      end: function end() {
        off(document, pointerMove, this.move);
        off(document, pointerUp, this.end);
        if (!this.drag) {
          return;
        }
        untrackScroll();
        var sortable = this.getSortable(this.placeholder);
        if (this === sortable) {
          if (this.origin.index !== index(this.placeholder)) {
            trigger(this.$el, 'moved', [this, this.placeholder]);
          }
        } else {
          trigger(sortable.$el, 'added', [sortable, this.placeholder]);
          trigger(this.$el, 'removed', [this, this.placeholder]);
        }
        trigger(this.$el, 'stop', [this, this.placeholder]);
        remove$1(this.drag);
        this.drag = null;
        var _iterator = _createForOfIteratorHelper(this.touched),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
              clsPlaceholder = _step$value.clsPlaceholder,
              clsItem = _step$value.clsItem;
            var _iterator2 = _createForOfIteratorHelper(this.touched),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _sortable = _step2.value;
                removeClass(_sortable.items, clsPlaceholder, clsItem);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.touched = null;
        removeClass(document.documentElement, this.clsDragState);
      },
      insert: function insert(element, target) {
        var _this2 = this;
        addClass(this.items, this.clsItem);
        var insert = function insert() {
          return target ? before(target, element) : append(_this2.target, element);
        };
        this.animate(insert);
      },
      remove: function remove(element) {
        if (!within(element, this.target)) {
          return;
        }
        this.animate(function () {
          return remove$1(element);
        });
      },
      getSortable: function getSortable(element) {
        do {
          var sortable = this.$getComponent(element, 'sortable');
          if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
            return sortable;
          }
        } while (element = parent(element));
      }
    }
  };
  var trackTimer;
  function trackScroll(pos) {
    var last = Date.now();
    trackTimer = setInterval(function () {
      var x = pos.x,
        y = pos.y;
      y += document.scrollingElement.scrollTop;
      var dist = (Date.now() - last) * 0.3;
      last = Date.now();
      scrollParents(document.elementFromPoint(x, pos.y), /auto|scroll/).reverse().some(function (scrollEl) {
        var scroll = scrollEl.scrollTop,
          scrollHeight = scrollEl.scrollHeight;
        var _offsetViewport = offsetViewport(scrollEl),
          top = _offsetViewport.top,
          bottom = _offsetViewport.bottom,
          height = _offsetViewport.height;
        if (top < y && top + 35 > y) {
          scroll -= dist;
        } else if (bottom > y && bottom - 35 < y) {
          scroll += dist;
        } else {
          return;
        }
        if (scroll > 0 && scroll < scrollHeight - height) {
          scrollEl.scrollTop = scroll;
          return true;
        }
      });
    }, 15);
  }
  function untrackScroll() {
    clearInterval(trackTimer);
  }
  function appendDrag(container, element) {
    var clone = append(container, element.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g, '$1div$2'));
    css(clone, 'margin', '0', 'important');
    css(clone, {
      boxSizing: 'border-box',
      width: element.offsetWidth,
      height: element.offsetHeight,
      padding: css(element, 'padding')
    });
    height(clone.firstElementChild, height(element.firstElementChild));
    return clone;
  }
  function findTarget(items, point) {
    return items[findIndex(items, function (item) {
      return pointInRect(point, item.getBoundingClientRect());
    })];
  }
  function findInsertTarget(list, target, placeholder, x, y, sameList) {
    if (!children(list).length) {
      return;
    }
    var rect = target.getBoundingClientRect();
    if (!sameList) {
      if (!isHorizontal(list, placeholder)) {
        return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
      }
      return target;
    }
    var placeholderRect = placeholder.getBoundingClientRect();
    var sameRow = linesIntersect([rect.top, rect.bottom], [placeholderRect.top, placeholderRect.bottom]);
    var pointerPos = sameRow ? x : y;
    var lengthProp = sameRow ? 'width' : 'height';
    var startProp = sameRow ? 'left' : 'top';
    var endProp = sameRow ? 'right' : 'bottom';
    var diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
    if (placeholderRect[startProp] < rect[startProp]) {
      if (diff && pointerPos < rect[startProp] + diff) {
        return false;
      }
      return target.nextElementSibling;
    }
    if (diff && pointerPos > rect[endProp] - diff) {
      return false;
    }
    return target;
  }
  function isHorizontal(list, placeholder) {
    var single = children(list).length === 1;
    if (single) {
      append(list, placeholder);
    }
    var items = children(list);
    var isHorizontal = items.some(function (el, i) {
      var rectA = el.getBoundingClientRect();
      return items.slice(i + 1).some(function (el) {
        var rectB = el.getBoundingClientRect();
        return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
      });
    });
    if (single) {
      remove$1(placeholder);
    }
    return isHorizontal;
  }
  function linesIntersect(lineA, lineB) {
    return lineA[1] > lineB[0] && lineB[1] > lineA[0];
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var apexcharts_common = {exports: {}};

  /*!
   * ApexCharts v3.44.0
   * (c) 2018-2023 ApexCharts
   * Released under the MIT License.
   */
  apexcharts_common.exports;

  (function (module, exports) {
  function t(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a);}return i}function e(e){for(var i=1;i<arguments.length;i++){var a=null!=arguments[i]?arguments[i]:{};i%2?t(Object(a),!0).forEach((function(t){o(e,t,a[t]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):t(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t));}));}return e}function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a);}}function r(t,e,i){return e&&s(t.prototype,e),i&&s(t,i),t}function o(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e);}function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},l(t)}function h(t,e){return h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},h(t,e)}function c(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return !1}}();return function(){var i,a=l(t);if(e){var s=l(this).constructor;i=Reflect.construct(a,arguments,s);}else i=a.apply(this,arguments);return c(this,i)}}function g(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var i=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==i)return;var a,s,r=[],o=!0,n=!1;try{for(i=i.call(t);!(o=(a=i.next()).done)&&(r.push(a.value),!e||r.length!==e);o=!0);}catch(t){n=!0,s=t;}finally{try{o||null==i.return||i.return();}finally{if(n)throw s}}return r}(t,e)||p(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||p(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){if(t){if("string"==typeof t)return f(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return "Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?f(t,e):void 0}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}var x=function(){function t(){a(this,t);}return r(t,[{key:"shadeRGBColor",value:function(t,e){var i=e.split(","),a=t<0?0:255,s=t<0?-1*t:t,r=parseInt(i[0].slice(4),10),o=parseInt(i[1],10),n=parseInt(i[2],10);return "rgb("+(Math.round((a-r)*s)+r)+","+(Math.round((a-o)*s)+o)+","+(Math.round((a-n)*s)+n)+")"}},{key:"shadeHexColor",value:function(t,e){var i=parseInt(e.slice(1),16),a=t<0?0:255,s=t<0?-1*t:t,r=i>>16,o=i>>8&255,n=255&i;return "#"+(16777216+65536*(Math.round((a-r)*s)+r)+256*(Math.round((a-o)*s)+o)+(Math.round((a-n)*s)+n)).toString(16).slice(1)}},{key:"shadeColor",value:function(e,i){return t.isColorHex(i)?this.shadeHexColor(e,i):this.shadeRGBColor(e,i)}}],[{key:"bind",value:function(t,e){return function(){return t.apply(e,arguments)}}},{key:"isObject",value:function(t){return t&&"object"===i(t)&&!Array.isArray(t)&&null!=t}},{key:"is",value:function(t,e){return Object.prototype.toString.call(e)==="[object "+t+"]"}},{key:"listToArray",value:function(t){var e,i=[];for(e=0;e<t.length;e++)i[e]=t[e];return i}},{key:"extend",value:function(t,e){var i=this;"function"!=typeof Object.assign&&(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var a=arguments[i];if(null!=a)for(var s in a)a.hasOwnProperty(s)&&(e[s]=a[s]);}return e});var a=Object.assign({},t);return this.isObject(t)&&this.isObject(e)&&Object.keys(e).forEach((function(s){i.isObject(e[s])&&s in t?a[s]=i.extend(t[s],e[s]):Object.assign(a,o({},s,e[s]));})),a}},{key:"extendArray",value:function(e,i){var a=[];return e.map((function(e){a.push(t.extend(i,e));})),e=a}},{key:"monthMod",value:function(t){return t%12}},{key:"clone",value:function(e){if(t.is("Array",e)){for(var a=[],s=0;s<e.length;s++)a[s]=this.clone(e[s]);return a}if(t.is("Null",e))return null;if(t.is("Date",e))return e;if("object"===i(e)){var r={};for(var o in e)e.hasOwnProperty(o)&&(r[o]=this.clone(e[o]));return r}return e}},{key:"log10",value:function(t){return Math.log(t)/Math.LN10}},{key:"roundToBase10",value:function(t){return Math.pow(10,Math.floor(Math.log10(t)))}},{key:"roundToBase",value:function(t,e){return Math.pow(e,Math.floor(Math.log(t)/Math.log(e)))}},{key:"parseNumber",value:function(t){return null===t?t:parseFloat(t)}},{key:"stripNumber",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return Number.isInteger(t)?t:parseFloat(t.toPrecision(e))}},{key:"randomId",value:function(){return (Math.random()+1).toString(36).substring(4)}},{key:"noExponents",value:function(t){var e=String(t).split(/[eE]/);if(1===e.length)return e[0];var i="",a=t<0?"-":"",s=e[0].replace(".",""),r=Number(e[1])+1;if(r<0){for(i=a+"0.";r++;)i+="0";return i+s.replace(/^-/,"")}for(r-=s.length;r--;)i+="0";return s+i}},{key:"getDimensions",value:function(t){var e=getComputedStyle(t,null),i=t.clientHeight,a=t.clientWidth;return i-=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom),[a-=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight),i]}},{key:"getBoundingClientRect",value:function(t){var e=t.getBoundingClientRect();return {top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:t.clientWidth,height:t.clientHeight,x:e.left,y:e.top}}},{key:"getLargestStringFromArr",value:function(t){return t.reduce((function(t,e){return Array.isArray(e)&&(e=e.reduce((function(t,e){return t.length>e.length?t:e}))),t.length>e.length?t:e}),0)}},{key:"hexToRgba",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#999999",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.6;"#"!==t.substring(0,1)&&(t="#999999");var i=t.replace("#","");i=i.match(new RegExp("(.{"+i.length/3+"})","g"));for(var a=0;a<i.length;a++)i[a]=parseInt(1===i[a].length?i[a]+i[a]:i[a],16);return void 0!==e&&i.push(e),"rgba("+i.join(",")+")"}},{key:"getOpacityFromRGBA",value:function(t){return parseFloat(t.replace(/^.*,(.+)\)/,"$1"))}},{key:"rgb2hex",value:function(t){return (t=t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===t.length?"#"+("0"+parseInt(t[1],10).toString(16)).slice(-2)+("0"+parseInt(t[2],10).toString(16)).slice(-2)+("0"+parseInt(t[3],10).toString(16)).slice(-2):""}},{key:"isColorHex",value:function(t){return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9A-F]{8}$)/i.test(t)}},{key:"getPolygonPos",value:function(t,e){for(var i=[],a=2*Math.PI/e,s=0;s<e;s++){var r={};r.x=t*Math.sin(s*a),r.y=-t*Math.cos(s*a),i.push(r);}return i}},{key:"polarToCartesian",value:function(t,e,i,a){var s=(a-90)*Math.PI/180;return {x:t+i*Math.cos(s),y:e+i*Math.sin(s)}}},{key:"escapeString",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x",i=t.toString().slice();return i=i.replace(/[` ~!@#$%^&*()|+\=?;:'",.<>{}[\]\\/]/gi,e)}},{key:"negToZero",value:function(t){return t<0?0:t}},{key:"moveIndexInArray",value:function(t,e,i){if(i>=t.length)for(var a=i-t.length+1;a--;)t.push(void 0);return t.splice(i,0,t.splice(e,1)[0]),t}},{key:"extractNumber",value:function(t){return parseFloat(t.replace(/[^\d.]*/g,""))}},{key:"findAncestor",value:function(t,e){for(;(t=t.parentElement)&&!t.classList.contains(e););return t}},{key:"setELstyles",value:function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t.style.key=e[i]);}},{key:"isNumber",value:function(t){return !isNaN(t)&&parseFloat(Number(t))===t&&!isNaN(parseInt(t,10))}},{key:"isFloat",value:function(t){return Number(t)===t&&t%1!=0}},{key:"isSafari",value:function(){return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)}},{key:"isFirefox",value:function(){return navigator.userAgent.toLowerCase().indexOf("firefox")>-1}},{key:"isIE11",value:function(){if(-1!==window.navigator.userAgent.indexOf("MSIE")||window.navigator.appVersion.indexOf("Trident/")>-1)return !0}},{key:"isIE",value:function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(e>0)return parseInt(t.substring(e+5,t.indexOf(".",e)),10);if(t.indexOf("Trident/")>0){var i=t.indexOf("rv:");return parseInt(t.substring(i+3,t.indexOf(".",i)),10)}var a=t.indexOf("Edge/");return a>0&&parseInt(t.substring(a+5,t.indexOf(".",a)),10)}}]),t}(),b=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.setEasingFunctions();}return r(t,[{key:"setEasingFunctions",value:function(){var t;if(!this.w.globals.easing){switch(this.w.config.chart.animations.easing){case"linear":t="-";break;case"easein":t="<";break;case"easeout":t=">";break;case"easeinout":default:t="<>";break;case"swing":t=function(t){var e=1.70158;return (t-=1)*t*((e+1)*t+e)+1};break;case"bounce":t=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};break;case"elastic":t=function(t){return t===!!t?t:Math.pow(2,-10*t)*Math.sin((t-.075)*(2*Math.PI)/.3)+1};}this.w.globals.easing=t;}}},{key:"animateLine",value:function(t,e,i,a){t.attr(e).animate(a).attr(i);}},{key:"animateMarker",value:function(t,e,i,a,s,r){e||(e=0),t.attr({r:e,width:e,height:e}).animate(a,s).attr({r:i,width:i.width,height:i.height}).afterAll((function(){r();}));}},{key:"animateCircle",value:function(t,e,i,a,s){t.attr({r:e.r,cx:e.cx,cy:e.cy}).animate(a,s).attr({r:i.r,cx:i.cx,cy:i.cy});}},{key:"animateRect",value:function(t,e,i,a,s){t.attr(e).animate(a).attr(i).afterAll((function(){return s()}));}},{key:"animatePathsGradually",value:function(t){var e=t.el,i=t.realIndex,a=t.j,s=t.fill,r=t.pathFrom,o=t.pathTo,n=t.speed,l=t.delay,h=this.w,c=0;h.config.chart.animations.animateGradually.enabled&&(c=h.config.chart.animations.animateGradually.delay),h.config.chart.animations.dynamicAnimation.enabled&&h.globals.dataChanged&&"bar"!==h.config.chart.type&&(c=0),this.morphSVG(e,i,a,"line"!==h.config.chart.type||h.globals.comboCharts?s:"stroke",r,o,n,l*c);}},{key:"showDelayedElements",value:function(){this.w.globals.delayedElements.forEach((function(t){var e=t.el;e.classList.remove("apexcharts-element-hidden"),e.classList.add("apexcharts-hidden-element-shown");}));}},{key:"animationCompleted",value:function(t){var e=this.w;e.globals.animationEnded||(e.globals.animationEnded=!0,this.showDelayedElements(),"function"==typeof e.config.chart.events.animationEnd&&e.config.chart.events.animationEnd(this.ctx,{el:t,w:e}));}},{key:"morphSVG",value:function(t,e,i,a,s,r,o,n){var l=this,h=this.w;s||(s=t.attr("pathFrom")),r||(r=t.attr("pathTo"));var c=function(t){return "radar"===h.config.chart.type&&(o=1),"M 0 ".concat(h.globals.gridHeight)};(!s||s.indexOf("undefined")>-1||s.indexOf("NaN")>-1)&&(s=c()),(!r||r.indexOf("undefined")>-1||r.indexOf("NaN")>-1)&&(r=c()),h.globals.shouldAnimate||(o=1),t.plot(s).animate(1,h.globals.easing,n).plot(s).animate(o,h.globals.easing,n).plot(r).afterAll((function(){x.isNumber(i)?i===h.globals.series[h.globals.maxValsInArrayIndex].length-2&&h.globals.shouldAnimate&&l.animationCompleted(t):"none"!==a&&h.globals.shouldAnimate&&(!h.globals.comboCharts&&e===h.globals.series.length-1||h.globals.comboCharts)&&l.animationCompleted(t),l.showDelayedElements();}));}}]),t}(),v=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"getDefaultFilter",value:function(t,e){var i=this.w;t.unfilter(!0),(new window.SVG.Filter).size("120%","180%","-5%","-40%"),"none"!==i.config.states.normal.filter?this.applyFilter(t,e,i.config.states.normal.filter.type,i.config.states.normal.filter.value):i.config.chart.dropShadow.enabled&&this.dropShadow(t,i.config.chart.dropShadow,e);}},{key:"addNormalFilter",value:function(t,e){var i=this.w;i.config.chart.dropShadow.enabled&&!t.node.classList.contains("apexcharts-marker")&&this.dropShadow(t,i.config.chart.dropShadow,e);}},{key:"addLightenFilter",value:function(t,e,i){var a=this,s=this.w,r=i.intensity;t.unfilter(!0);new window.SVG.Filter;t.filter((function(t){var i=s.config.chart.dropShadow;(i.enabled?a.addShadow(t,e,i):t).componentTransfer({rgb:{type:"linear",slope:1.5,intercept:r}});})),t.filterer.node.setAttribute("filterUnits","userSpaceOnUse"),this._scaleFilterSize(t.filterer.node);}},{key:"addDarkenFilter",value:function(t,e,i){var a=this,s=this.w,r=i.intensity;t.unfilter(!0);new window.SVG.Filter;t.filter((function(t){var i=s.config.chart.dropShadow;(i.enabled?a.addShadow(t,e,i):t).componentTransfer({rgb:{type:"linear",slope:r}});})),t.filterer.node.setAttribute("filterUnits","userSpaceOnUse"),this._scaleFilterSize(t.filterer.node);}},{key:"applyFilter",value:function(t,e,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.5;switch(i){case"none":this.addNormalFilter(t,e);break;case"lighten":this.addLightenFilter(t,e,{intensity:a});break;case"darken":this.addDarkenFilter(t,e,{intensity:a});}}},{key:"addShadow",value:function(t,e,i){var a=i.blur,s=i.top,r=i.left,o=i.color,n=i.opacity,l=t.flood(Array.isArray(o)?o[e]:o,n).composite(t.sourceAlpha,"in").offset(r,s).gaussianBlur(a).merge(t.source);return t.blend(t.source,l)}},{key:"dropShadow",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=e.top,s=e.left,r=e.blur,o=e.color,n=e.opacity,l=e.noUserSpaceOnUse,h=this.w;return t.unfilter(!0),x.isIE()&&"radialBar"===h.config.chart.type||(o=Array.isArray(o)?o[i]:o,t.filter((function(t){var e=null;e=x.isSafari()||x.isFirefox()||x.isIE()?t.flood(o,n).composite(t.sourceAlpha,"in").offset(s,a).gaussianBlur(r):t.flood(o,n).composite(t.sourceAlpha,"in").offset(s,a).gaussianBlur(r).merge(t.source),t.blend(t.source,e);})),l||t.filterer.node.setAttribute("filterUnits","userSpaceOnUse"),this._scaleFilterSize(t.filterer.node)),t}},{key:"setSelectionFilter",value:function(t,e,i){var a=this.w;if(void 0!==a.globals.selectedDataPoints[e]&&a.globals.selectedDataPoints[e].indexOf(i)>-1){t.node.setAttribute("selected",!0);var s=a.config.states.active.filter;"none"!==s&&this.applyFilter(t,e,s.type,s.value);}}},{key:"_scaleFilterSize",value:function(t){!function(e){for(var i in e)e.hasOwnProperty(i)&&t.setAttribute(i,e[i]);}({width:"200%",height:"200%",x:"-50%",y:"-50%"});}}]),t}(),m=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"roundPathCorners",value:function(t,e){function i(t,e,i){var s=e.x-t.x,r=e.y-t.y,o=Math.sqrt(s*s+r*r);return a(t,e,Math.min(1,i/o))}function a(t,e,i){return {x:t.x+(e.x-t.x)*i,y:t.y+(e.y-t.y)*i}}function s(t,e){t.length>2&&(t[t.length-2]=e.x,t[t.length-1]=e.y);}function r(t){return {x:parseFloat(t[t.length-2]),y:parseFloat(t[t.length-1])}}t.indexOf("NaN")>-1&&(t="");var o=t.split(/[,\s]/).reduce((function(t,e){var i=e.match("([a-zA-Z])(.+)");return i?(t.push(i[1]),t.push(i[2])):t.push(e),t}),[]).reduce((function(t,e){return parseFloat(e)==e&&t.length?t[t.length-1].push(e):t.push([e]),t}),[]),n=[];if(o.length>1){var l=r(o[0]),h=null;"Z"==o[o.length-1][0]&&o[0].length>2&&(h=["L",l.x,l.y],o[o.length-1]=h),n.push(o[0]);for(var c=1;c<o.length;c++){var d=n[n.length-1],g=o[c],u=g==h?o[1]:o[c+1];if(u&&d&&d.length>2&&"L"==g[0]&&u.length>2&&"L"==u[0]){var p,f,x=r(d),b=r(g),v=r(u);p=i(b,x,e),f=i(b,v,e),s(g,p),g.origPoint=b,n.push(g);var m=a(p,b,.5),y=a(b,f,.5),w=["C",m.x,m.y,y.x,y.y,f.x,f.y];w.origPoint=b,n.push(w);}else n.push(g);}if(h){var k=r(n[n.length-1]);n.push(["Z"]),s(n[0],k);}}else n=o;return n.reduce((function(t,e){return t+e.join(" ")+" "}),"")}},{key:"drawLine",value:function(t,e,i,a){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"#a8a8a8",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null,n=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"butt";return this.w.globals.dom.Paper.line().attr({x1:t,y1:e,x2:i,y2:a,stroke:s,"stroke-dasharray":r,"stroke-width":o,"stroke-linecap":n})}},{key:"drawRect",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"#fefefe",o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:1,n=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,l=arguments.length>8&&void 0!==arguments[8]?arguments[8]:null,h=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,c=this.w.globals.dom.Paper.rect();return c.attr({x:t,y:e,width:i>0?i:0,height:a>0?a:0,rx:s,ry:s,opacity:o,"stroke-width":null!==n?n:0,stroke:null!==l?l:"none","stroke-dasharray":h}),c.node.setAttribute("fill",r),c}},{key:"drawPolygon",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#e1e1e1",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none";return this.w.globals.dom.Paper.polygon(t).attr({fill:a,stroke:e,"stroke-width":i})}},{key:"drawCircle",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;t<0&&(t=0);var i=this.w.globals.dom.Paper.circle(2*t);return null!==e&&i.attr(e),i}},{key:"drawPath",value:function(t){var e=t.d,i=void 0===e?"":e,a=t.stroke,s=void 0===a?"#a8a8a8":a,r=t.strokeWidth,o=void 0===r?1:r,n=t.fill,l=t.fillOpacity,h=void 0===l?1:l,c=t.strokeOpacity,d=void 0===c?1:c,g=t.classes,u=t.strokeLinecap,p=void 0===u?null:u,f=t.strokeDashArray,x=void 0===f?0:f,b=this.w;return null===p&&(p=b.config.stroke.lineCap),(i.indexOf("undefined")>-1||i.indexOf("NaN")>-1)&&(i="M 0 ".concat(b.globals.gridHeight)),b.globals.dom.Paper.path(i).attr({fill:n,"fill-opacity":h,stroke:s,"stroke-opacity":d,"stroke-linecap":p,"stroke-width":o,"stroke-dasharray":x,class:g})}},{key:"group",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.w.globals.dom.Paper.group();return null!==t&&e.attr(t),e}},{key:"move",value:function(t,e){var i=["M",t,e].join(" ");return i}},{key:"line",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=null;return null===i?a=[" L",t,e].join(" "):"H"===i?a=[" H",t].join(" "):"V"===i&&(a=[" V",e].join(" ")),a}},{key:"curve",value:function(t,e,i,a,s,r){var o=["C",t,e,i,a,s,r].join(" ");return o}},{key:"quadraticCurve",value:function(t,e,i,a){return ["Q",t,e,i,a].join(" ")}},{key:"arc",value:function(t,e,i,a,s,r,o){var n="A";arguments.length>7&&void 0!==arguments[7]&&arguments[7]&&(n="a");var l=[n,t,e,i,a,s,r,o].join(" ");return l}},{key:"renderPaths",value:function(t){var i,a=t.j,s=t.realIndex,r=t.pathFrom,o=t.pathTo,n=t.stroke,l=t.strokeWidth,h=t.strokeLinecap,c=t.fill,d=t.animationDelay,g=t.initialSpeed,u=t.dataChangeSpeed,p=t.className,f=t.shouldClipToGrid,x=void 0===f||f,m=t.bindEventsOnPaths,y=void 0===m||m,w=t.drawShadow,k=void 0===w||w,A=this.w,S=new v(this.ctx),C=new b(this.ctx),L=this.w.config.chart.animations.enabled,P=L&&this.w.config.chart.animations.dynamicAnimation.enabled,I=!!(L&&!A.globals.resized||P&&A.globals.dataChanged&&A.globals.shouldAnimate);I?i=r:(i=o,A.globals.animationEnded=!0);var M=A.config.stroke.dashArray,T=0;T=Array.isArray(M)?M[s]:A.config.stroke.dashArray;var z=this.drawPath({d:i,stroke:n,strokeWidth:l,fill:c,fillOpacity:1,classes:p,strokeLinecap:h,strokeDashArray:T});if(z.attr("index",s),x&&z.attr({"clip-path":"url(#gridRectMask".concat(A.globals.cuid,")")}),"none"!==A.config.states.normal.filter.type)S.getDefaultFilter(z,s);else if(A.config.chart.dropShadow.enabled&&k&&(!A.config.chart.dropShadow.enabledOnSeries||A.config.chart.dropShadow.enabledOnSeries&&-1!==A.config.chart.dropShadow.enabledOnSeries.indexOf(s))){var X=A.config.chart.dropShadow;S.dropShadow(z,X,s);}y&&(z.node.addEventListener("mouseenter",this.pathMouseEnter.bind(this,z)),z.node.addEventListener("mouseleave",this.pathMouseLeave.bind(this,z)),z.node.addEventListener("mousedown",this.pathMouseDown.bind(this,z))),z.attr({pathTo:o,pathFrom:r});var E={el:z,j:a,realIndex:s,pathFrom:r,pathTo:o,fill:c,strokeWidth:l,delay:d};return !L||A.globals.resized||A.globals.dataChanged?!A.globals.resized&&A.globals.dataChanged||C.showDelayedElements():C.animatePathsGradually(e(e({},E),{},{speed:g})),A.globals.dataChanged&&P&&I&&C.animatePathsGradually(e(e({},E),{},{speed:u})),z}},{key:"drawPattern",value:function(t,e,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#a8a8a8",s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;return this.w.globals.dom.Paper.pattern(e,i,(function(r){"horizontalLines"===t?r.line(0,0,i,0).stroke({color:a,width:s+1}):"verticalLines"===t?r.line(0,0,0,e).stroke({color:a,width:s+1}):"slantedLines"===t?r.line(0,0,e,i).stroke({color:a,width:s}):"squares"===t?r.rect(e,i).fill("none").stroke({color:a,width:s}):"circles"===t&&r.circle(e).fill("none").stroke({color:a,width:s});}))}},{key:"drawGradient",value:function(t,e,i,a,s){var r,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,n=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,h=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,c=this.w;e.length<9&&0===e.indexOf("#")&&(e=x.hexToRgba(e,a)),i.length<9&&0===i.indexOf("#")&&(i=x.hexToRgba(i,s));var d=0,g=1,u=1,p=null;null!==n&&(d=void 0!==n[0]?n[0]/100:0,g=void 0!==n[1]?n[1]/100:1,u=void 0!==n[2]?n[2]/100:1,p=void 0!==n[3]?n[3]/100:null);var f=!("donut"!==c.config.chart.type&&"pie"!==c.config.chart.type&&"polarArea"!==c.config.chart.type&&"bubble"!==c.config.chart.type);if(r=null===l||0===l.length?c.globals.dom.Paper.gradient(f?"radial":"linear",(function(t){t.at(d,e,a),t.at(g,i,s),t.at(u,i,s),null!==p&&t.at(p,e,a);})):c.globals.dom.Paper.gradient(f?"radial":"linear",(function(t){(Array.isArray(l[h])?l[h]:l).forEach((function(e){t.at(e.offset/100,e.color,e.opacity);}));})),f){var b=c.globals.gridWidth/2,v=c.globals.gridHeight/2;"bubble"!==c.config.chart.type?r.attr({gradientUnits:"userSpaceOnUse",cx:b,cy:v,r:o}):r.attr({cx:.5,cy:.5,r:.8,fx:.2,fy:.2});}else "vertical"===t?r.from(0,0).to(0,1):"diagonal"===t?r.from(0,0).to(1,1):"horizontal"===t?r.from(0,1).to(1,1):"diagonal2"===t&&r.from(1,0).to(0,1);return r}},{key:"getTextBasedOnMaxWidth",value:function(t){var e=t.text,i=t.maxWidth,a=t.fontSize,s=t.fontFamily,r=this.getTextRects(e,a,s),o=r.width/e.length,n=Math.floor(i/o);return i<r.width?e.slice(0,n-3)+"...":e}},{key:"drawText",value:function(t){var i=this,a=t.x,s=t.y,r=t.text,o=t.textAnchor,n=t.fontSize,l=t.fontFamily,h=t.fontWeight,c=t.foreColor,d=t.opacity,g=t.maxWidth,u=t.cssClass,p=void 0===u?"":u,f=t.isPlainText,x=void 0===f||f,b=this.w;void 0===r&&(r="");var v=r;o||(o="start"),c&&c.length||(c=b.config.chart.foreColor),l=l||b.config.chart.fontFamily,h=h||"regular";var m,y={maxWidth:g,fontSize:n=n||"11px",fontFamily:l};return Array.isArray(r)?m=b.globals.dom.Paper.text((function(t){for(var a=0;a<r.length;a++)v=r[a],g&&(v=i.getTextBasedOnMaxWidth(e({text:r[a]},y))),0===a?t.tspan(v):t.tspan(v).newLine();})):(g&&(v=this.getTextBasedOnMaxWidth(e({text:r},y))),m=x?b.globals.dom.Paper.plain(r):b.globals.dom.Paper.text((function(t){return t.tspan(v)}))),m.attr({x:a,y:s,"text-anchor":o,"dominant-baseline":"auto","font-size":n,"font-family":l,"font-weight":h,fill:c,class:"apexcharts-text "+p}),m.node.style.fontFamily=l,m.node.style.opacity=d,m}},{key:"drawMarker",value:function(t,e,i){t=t||0;var a=i.pSize||0,s=null;if("square"===i.shape||"rect"===i.shape){var r=void 0===i.pRadius?a/2:i.pRadius;null!==e&&a||(a=0,r=0);var o=1.2*a+r,n=this.drawRect(o,o,o,o,r);n.attr({x:t-o/2,y:e-o/2,cx:t,cy:e,class:i.class?i.class:"",fill:i.pointFillColor,"fill-opacity":i.pointFillOpacity?i.pointFillOpacity:1,stroke:i.pointStrokeColor,"stroke-width":i.pointStrokeWidth?i.pointStrokeWidth:0,"stroke-opacity":i.pointStrokeOpacity?i.pointStrokeOpacity:1}),s=n;}else "circle"!==i.shape&&i.shape||(x.isNumber(e)||(a=0,e=0),s=this.drawCircle(a,{cx:t,cy:e,class:i.class?i.class:"",stroke:i.pointStrokeColor,fill:i.pointFillColor,"fill-opacity":i.pointFillOpacity?i.pointFillOpacity:1,"stroke-width":i.pointStrokeWidth?i.pointStrokeWidth:0,"stroke-opacity":i.pointStrokeOpacity?i.pointStrokeOpacity:1}));return s}},{key:"pathMouseEnter",value:function(t,e){var i=this.w,a=new v(this.ctx),s=parseInt(t.node.getAttribute("index"),10),r=parseInt(t.node.getAttribute("j"),10);if("function"==typeof i.config.chart.events.dataPointMouseEnter&&i.config.chart.events.dataPointMouseEnter(e,this.ctx,{seriesIndex:s,dataPointIndex:r,w:i}),this.ctx.events.fireEvent("dataPointMouseEnter",[e,this.ctx,{seriesIndex:s,dataPointIndex:r,w:i}]),("none"===i.config.states.active.filter.type||"true"!==t.node.getAttribute("selected"))&&"none"!==i.config.states.hover.filter.type&&!i.globals.isTouchDevice){var o=i.config.states.hover.filter;a.applyFilter(t,s,o.type,o.value);}}},{key:"pathMouseLeave",value:function(t,e){var i=this.w,a=new v(this.ctx),s=parseInt(t.node.getAttribute("index"),10),r=parseInt(t.node.getAttribute("j"),10);"function"==typeof i.config.chart.events.dataPointMouseLeave&&i.config.chart.events.dataPointMouseLeave(e,this.ctx,{seriesIndex:s,dataPointIndex:r,w:i}),this.ctx.events.fireEvent("dataPointMouseLeave",[e,this.ctx,{seriesIndex:s,dataPointIndex:r,w:i}]),"none"!==i.config.states.active.filter.type&&"true"===t.node.getAttribute("selected")||"none"!==i.config.states.hover.filter.type&&a.getDefaultFilter(t,s);}},{key:"pathMouseDown",value:function(t,e){var i=this.w,a=new v(this.ctx),s=parseInt(t.node.getAttribute("index"),10),r=parseInt(t.node.getAttribute("j"),10),o="false";if("true"===t.node.getAttribute("selected")){if(t.node.setAttribute("selected","false"),i.globals.selectedDataPoints[s].indexOf(r)>-1){var n=i.globals.selectedDataPoints[s].indexOf(r);i.globals.selectedDataPoints[s].splice(n,1);}}else {if(!i.config.states.active.allowMultipleDataPointsSelection&&i.globals.selectedDataPoints.length>0){i.globals.selectedDataPoints=[];var l=i.globals.dom.Paper.select(".apexcharts-series path").members,h=i.globals.dom.Paper.select(".apexcharts-series circle, .apexcharts-series rect").members,c=function(t){Array.prototype.forEach.call(t,(function(t){t.node.setAttribute("selected","false"),a.getDefaultFilter(t,s);}));};c(l),c(h);}t.node.setAttribute("selected","true"),o="true",void 0===i.globals.selectedDataPoints[s]&&(i.globals.selectedDataPoints[s]=[]),i.globals.selectedDataPoints[s].push(r);}if("true"===o){var d=i.config.states.active.filter;if("none"!==d)a.applyFilter(t,s,d.type,d.value);else if("none"!==i.config.states.hover.filter&&!i.globals.isTouchDevice){var g=i.config.states.hover.filter;a.applyFilter(t,s,g.type,g.value);}}else if("none"!==i.config.states.active.filter.type)if("none"===i.config.states.hover.filter.type||i.globals.isTouchDevice)a.getDefaultFilter(t,s);else {g=i.config.states.hover.filter;a.applyFilter(t,s,g.type,g.value);}"function"==typeof i.config.chart.events.dataPointSelection&&i.config.chart.events.dataPointSelection(e,this.ctx,{selectedDataPoints:i.globals.selectedDataPoints,seriesIndex:s,dataPointIndex:r,w:i}),e&&this.ctx.events.fireEvent("dataPointSelection",[e,this.ctx,{selectedDataPoints:i.globals.selectedDataPoints,seriesIndex:s,dataPointIndex:r,w:i}]);}},{key:"rotateAroundCenter",value:function(t){var e={};return t&&"function"==typeof t.getBBox&&(e=t.getBBox()),{x:e.x+e.width/2,y:e.y+e.height/2}}},{key:"getTextRects",value:function(t,e,i,a){var s=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],r=this.w,o=this.drawText({x:-200,y:-200,text:t,textAnchor:"start",fontSize:e,fontFamily:i,foreColor:"#fff",opacity:0});a&&o.attr("transform",a),r.globals.dom.Paper.add(o);var n=o.bbox();return s||(n=o.node.getBoundingClientRect()),o.remove(),{width:n.width,height:n.height}}},{key:"placeTextWithEllipsis",value:function(t,e,i){if("function"==typeof t.getComputedTextLength&&(t.textContent=e,e.length>0&&t.getComputedTextLength()>=i/1.1)){for(var a=e.length-3;a>0;a-=3)if(t.getSubStringLength(0,a)<=i/1.1)return void(t.textContent=e.substring(0,a)+"...");t.textContent=".";}}}],[{key:"setAttrs",value:function(t,e){for(var i in e)e.hasOwnProperty(i)&&t.setAttribute(i,e[i]);}}]),t}(),y=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"getStackedSeriesTotals",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=this.w,i=[];if(0===e.globals.series.length)return i;for(var a=0;a<e.globals.series[e.globals.maxValsInArrayIndex].length;a++){for(var s=0,r=0;r<e.globals.series.length;r++)void 0!==e.globals.series[r][a]&&-1===t.indexOf(r)&&(s+=e.globals.series[r][a]);i.push(s);}return i}},{key:"getSeriesTotalByIndex",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===t?this.w.config.series.reduce((function(t,e){return t+e}),0):this.w.globals.series[t].reduce((function(t,e){return t+e}),0)}},{key:"isSeriesNull",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return 0===(null===t?this.w.config.series.filter((function(t){return null!==t})):this.w.config.series[t].data.filter((function(t){return null!==t}))).length}},{key:"seriesHaveSameValues",value:function(t){return this.w.globals.series[t].every((function(t,e,i){return t===i[0]}))}},{key:"getCategoryLabels",value:function(t){var e=this.w,i=t.slice();return e.config.xaxis.convertedCatToNumeric&&(i=t.map((function(t,i){return e.config.xaxis.labels.formatter(t-e.globals.minX+1)}))),i}},{key:"getLargestSeries",value:function(){var t=this.w;t.globals.maxValsInArrayIndex=t.globals.series.map((function(t){return t.length})).indexOf(Math.max.apply(Math,t.globals.series.map((function(t){return t.length}))));}},{key:"getLargestMarkerSize",value:function(){var t=this.w,e=0;return t.globals.markers.size.forEach((function(t){e=Math.max(e,t);})),t.config.markers.discrete&&t.config.markers.discrete.length&&t.config.markers.discrete.forEach((function(t){e=Math.max(e,t.size);})),e>0&&(e+=t.config.markers.hover.sizeOffset+1),t.globals.markers.largestSize=e,e}},{key:"getSeriesTotals",value:function(){var t=this.w;t.globals.seriesTotals=t.globals.series.map((function(t,e){var i=0;if(Array.isArray(t))for(var a=0;a<t.length;a++)i+=t[a];else i+=t;return i}));}},{key:"getSeriesTotalsXRange",value:function(t,e){var i=this.w;return i.globals.series.map((function(a,s){for(var r=0,o=0;o<a.length;o++)i.globals.seriesX[s][o]>t&&i.globals.seriesX[s][o]<e&&(r+=a[o]);return r}))}},{key:"getPercentSeries",value:function(){var t=this.w;t.globals.seriesPercent=t.globals.series.map((function(e,i){var a=[];if(Array.isArray(e))for(var s=0;s<e.length;s++){var r=t.globals.stackedSeriesTotals[s],o=0;r&&(o=100*e[s]/r),a.push(o);}else {var n=100*e/t.globals.seriesTotals.reduce((function(t,e){return t+e}),0);a.push(n);}return a}));}},{key:"getCalculatedRatios",value:function(){var t,e,i,a,s=this.w.globals,r=[],o=0,n=[],l=.1,h=0;if(s.yRange=[],s.isMultipleYAxis)for(var c=0;c<s.minYArr.length;c++)s.yRange.push(Math.abs(s.minYArr[c]-s.maxYArr[c])),n.push(0);else s.yRange.push(Math.abs(s.minY-s.maxY));s.xRange=Math.abs(s.maxX-s.minX),s.zRange=Math.abs(s.maxZ-s.minZ);for(var d=0;d<s.yRange.length;d++)r.push(s.yRange[d]/s.gridHeight);if(e=s.xRange/s.gridWidth,i=Math.abs(s.initialMaxX-s.initialMinX)/s.gridWidth,t=s.yRange/s.gridWidth,a=s.xRange/s.gridHeight,(o=s.zRange/s.gridHeight*16)||(o=1),s.minY!==Number.MIN_VALUE&&0!==Math.abs(s.minY)&&(s.hasNegs=!0),s.isMultipleYAxis){n=[];for(var g=0;g<r.length;g++)n.push(-s.minYArr[g]/r[g]);}else n.push(-s.minY/r[0]),s.minY!==Number.MIN_VALUE&&0!==Math.abs(s.minY)&&(l=-s.minY/t,h=s.minX/e);return {yRatio:r,invertedYRatio:t,zRatio:o,xRatio:e,initialXRatio:i,invertedXRatio:a,baseLineInvertedY:l,baseLineY:n,baseLineX:h}}},{key:"getLogSeries",value:function(t){var e=this,i=this.w;return i.globals.seriesLog=t.map((function(t,a){return i.config.yaxis[a]&&i.config.yaxis[a].logarithmic?t.map((function(t){return null===t?null:e.getLogVal(i.config.yaxis[a].logBase,t,a)})):t})),i.globals.invalidLogScale?t:i.globals.seriesLog}},{key:"getBaseLog",value:function(t,e){return Math.log(e)/Math.log(t)}},{key:"getLogVal",value:function(t,e,i){if(0===e)return 0;var a=this.w,s=0===a.globals.minYArr[i]?-1:this.getBaseLog(t,a.globals.minYArr[i]),r=(0===a.globals.maxYArr[i]?0:this.getBaseLog(t,a.globals.maxYArr[i]))-s;return e<1?e/r:(this.getBaseLog(t,e)-s)/r}},{key:"getLogYRatios",value:function(t){var e=this,i=this.w,a=this.w.globals;return a.yLogRatio=t.slice(),a.logYRange=a.yRange.map((function(t,s){if(i.config.yaxis[s]&&e.w.config.yaxis[s].logarithmic){var r,o=-Number.MAX_VALUE,n=Number.MIN_VALUE;return a.seriesLog.forEach((function(t,e){t.forEach((function(t){i.config.yaxis[e]&&i.config.yaxis[e].logarithmic&&(o=Math.max(t,o),n=Math.min(t,n));}));})),r=Math.pow(a.yRange[s],Math.abs(n-o)/a.yRange[s]),a.yLogRatio[s]=r/a.gridHeight,r}})),a.invalidLogScale?t.slice():a.yLogRatio}}],[{key:"checkComboSeries",value:function(t){var e=!1,i=0,a=0;return t.length&&void 0!==t[0].type&&t.forEach((function(t){"bar"!==t.type&&"column"!==t.type&&"candlestick"!==t.type&&"boxPlot"!==t.type||i++,void 0!==t.type&&a++;})),a>0&&(e=!0),{comboBarCount:i,comboCharts:e}}},{key:"extendArrayProps",value:function(t,e,i){return e.yaxis&&(e=t.extendYAxis(e,i)),e.annotations&&(e.annotations.yaxis&&(e=t.extendYAxisAnnotations(e)),e.annotations.xaxis&&(e=t.extendXAxisAnnotations(e)),e.annotations.points&&(e=t.extendPointAnnotations(e))),e}}]),t}(),w=function(){function t(e){a(this,t),this.w=e.w,this.annoCtx=e;}return r(t,[{key:"setOrientations",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this.w;if("vertical"===t.label.orientation){var a=null!==e?e:0,s=i.globals.dom.baseEl.querySelector(".apexcharts-xaxis-annotations .apexcharts-xaxis-annotation-label[rel='".concat(a,"']"));if(null!==s){var r=s.getBoundingClientRect();s.setAttribute("x",parseFloat(s.getAttribute("x"))-r.height+4),"top"===t.label.position?s.setAttribute("y",parseFloat(s.getAttribute("y"))+r.width):s.setAttribute("y",parseFloat(s.getAttribute("y"))-r.width);var o=this.annoCtx.graphics.rotateAroundCenter(s),n=o.x,l=o.y;s.setAttribute("transform","rotate(-90 ".concat(n," ").concat(l,")"));}}}},{key:"addBackgroundToAnno",value:function(t,e){var i=this.w;if(!t||void 0===e.label.text||void 0!==e.label.text&&!String(e.label.text).trim())return null;var a=i.globals.dom.baseEl.querySelector(".apexcharts-grid").getBoundingClientRect(),s=t.getBoundingClientRect(),r=e.label.style.padding.left,o=e.label.style.padding.right,n=e.label.style.padding.top,l=e.label.style.padding.bottom;"vertical"===e.label.orientation&&(n=e.label.style.padding.left,l=e.label.style.padding.right,r=e.label.style.padding.top,o=e.label.style.padding.bottom);var h=s.left-a.left-r,c=s.top-a.top-n,d=this.annoCtx.graphics.drawRect(h-i.globals.barPadForNumericAxis,c,s.width+r+o,s.height+n+l,e.label.borderRadius,e.label.style.background,1,e.label.borderWidth,e.label.borderColor,0);return e.id&&d.node.classList.add(e.id),d}},{key:"annotationsBackground",value:function(){var t=this,e=this.w,i=function(i,a,s){var r=e.globals.dom.baseEl.querySelector(".apexcharts-".concat(s,"-annotations .apexcharts-").concat(s,"-annotation-label[rel='").concat(a,"']"));if(r){var o=r.parentNode,n=t.addBackgroundToAnno(r,i);n&&(o.insertBefore(n.node,r),i.label.mouseEnter&&n.node.addEventListener("mouseenter",i.label.mouseEnter.bind(t,i)),i.label.mouseLeave&&n.node.addEventListener("mouseleave",i.label.mouseLeave.bind(t,i)),i.label.click&&n.node.addEventListener("click",i.label.click.bind(t,i)));}};e.config.annotations.xaxis.map((function(t,e){i(t,e,"xaxis");})),e.config.annotations.yaxis.map((function(t,e){i(t,e,"yaxis");})),e.config.annotations.points.map((function(t,e){i(t,e,"point");}));}},{key:"getY1Y2",value:function(t,e){var i,a="y1"===t?e.y:e.y2,s=this.w;if(this.annoCtx.invertAxis){var r=s.globals.labels.indexOf(a);s.config.xaxis.convertedCatToNumeric&&(r=s.globals.categoryLabels.indexOf(a));var o=s.globals.dom.baseEl.querySelector(".apexcharts-yaxis-texts-g text:nth-child("+(r+1)+")");o&&(i=parseFloat(o.getAttribute("y")));}else {var n;if(s.config.yaxis[e.yAxisIndex].logarithmic)n=(a=new y(this.annoCtx.ctx).getLogVal(a,e.yAxisIndex))/s.globals.yLogRatio[e.yAxisIndex];else n=(a-s.globals.minYArr[e.yAxisIndex])/(s.globals.yRange[e.yAxisIndex]/s.globals.gridHeight);i=s.globals.gridHeight-n,!e.marker||void 0!==e.y&&null!==e.y||(i=0),s.config.yaxis[e.yAxisIndex]&&s.config.yaxis[e.yAxisIndex].reversed&&(i=n);}return "string"==typeof a&&a.indexOf("px")>-1&&(i=parseFloat(a)),i}},{key:"getX1X2",value:function(t,e){var i=this.w,a=this.annoCtx.invertAxis?i.globals.minY:i.globals.minX,s=this.annoCtx.invertAxis?i.globals.maxY:i.globals.maxX,r=this.annoCtx.invertAxis?i.globals.yRange[0]:i.globals.xRange,o=(e.x-a)/(r/i.globals.gridWidth);this.annoCtx.inversedReversedAxis&&(o=(s-e.x)/(r/i.globals.gridWidth)),"category"!==i.config.xaxis.type&&!i.config.xaxis.convertedCatToNumeric||this.annoCtx.invertAxis||i.globals.dataFormatXNumeric||(o=this.getStringX(e.x));var n=(e.x2-a)/(r/i.globals.gridWidth);return this.annoCtx.inversedReversedAxis&&(n=(s-e.x2)/(r/i.globals.gridWidth)),"category"!==i.config.xaxis.type&&!i.config.xaxis.convertedCatToNumeric||this.annoCtx.invertAxis||i.globals.dataFormatXNumeric||(n=this.getStringX(e.x2)),void 0!==e.x&&null!==e.x||!e.marker||(o=i.globals.gridWidth),"x1"===t&&"string"==typeof e.x&&e.x.indexOf("px")>-1&&(o=parseFloat(e.x)),"x2"===t&&"string"==typeof e.x2&&e.x2.indexOf("px")>-1&&(n=parseFloat(e.x2)),"x1"===t?o:n}},{key:"getStringX",value:function(t){var e=this.w,i=t;e.config.xaxis.convertedCatToNumeric&&e.globals.categoryLabels.length&&(t=e.globals.categoryLabels.indexOf(t)+1);var a=e.globals.labels.indexOf(t),s=e.globals.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g text:nth-child("+(a+1)+")");return s&&(i=parseFloat(s.getAttribute("x"))),i}}]),t}(),k=function(){function t(e){a(this,t),this.w=e.w,this.annoCtx=e,this.invertAxis=this.annoCtx.invertAxis,this.helpers=new w(this.annoCtx);}return r(t,[{key:"addXaxisAnnotation",value:function(t,e,i){var a,s=this.w,r=this.helpers.getX1X2("x1",t),o=t.label.text,n=t.strokeDashArray;if(x.isNumber(r)){if(null===t.x2||void 0===t.x2){var l=this.annoCtx.graphics.drawLine(r+t.offsetX,0+t.offsetY,r+t.offsetX,s.globals.gridHeight+t.offsetY,t.borderColor,n,t.borderWidth);e.appendChild(l.node),t.id&&l.node.classList.add(t.id);}else {if((a=this.helpers.getX1X2("x2",t))<r){var h=r;r=a,a=h;}var c=this.annoCtx.graphics.drawRect(r+t.offsetX,0+t.offsetY,a-r,s.globals.gridHeight+t.offsetY,0,t.fillColor,t.opacity,1,t.borderColor,n);c.node.classList.add("apexcharts-annotation-rect"),c.attr("clip-path","url(#gridRectMask".concat(s.globals.cuid,")")),e.appendChild(c.node),t.id&&c.node.classList.add(t.id);}var d=this.annoCtx.graphics.getTextRects(o,parseFloat(t.label.style.fontSize)),g="top"===t.label.position?4:"center"===t.label.position?s.globals.gridHeight/2+("vertical"===t.label.orientation?d.width/2:0):s.globals.gridHeight,u=this.annoCtx.graphics.drawText({x:r+t.label.offsetX,y:g+t.label.offsetY-("vertical"===t.label.orientation?"top"===t.label.position?d.width/2-12:-d.width/2:0),text:o,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,fontWeight:t.label.style.fontWeight,foreColor:t.label.style.color,cssClass:"apexcharts-xaxis-annotation-label ".concat(t.label.style.cssClass," ").concat(t.id?t.id:"")});u.attr({rel:i}),e.appendChild(u.node),this.annoCtx.helpers.setOrientations(t,i);}}},{key:"drawXAxisAnnotations",value:function(){var t=this,e=this.w,i=this.annoCtx.graphics.group({class:"apexcharts-xaxis-annotations"});return e.config.annotations.xaxis.map((function(e,a){t.addXaxisAnnotation(e,i.node,a);})),i}}]),t}(),A=function(){function t(e){a(this,t),this.w=e.w,this.annoCtx=e,this.helpers=new w(this.annoCtx);}return r(t,[{key:"addYaxisAnnotation",value:function(t,e,i){var a,s=this.w,r=t.strokeDashArray,o=this.helpers.getY1Y2("y1",t),n=t.label.text;if(null===t.y2||void 0===t.y2){var l=this.annoCtx.graphics.drawLine(0+t.offsetX,o+t.offsetY,this._getYAxisAnnotationWidth(t),o+t.offsetY,t.borderColor,r,t.borderWidth);e.appendChild(l.node),t.id&&l.node.classList.add(t.id);}else {if((a=this.helpers.getY1Y2("y2",t))>o){var h=o;o=a,a=h;}var c=this.annoCtx.graphics.drawRect(0+t.offsetX,a+t.offsetY,this._getYAxisAnnotationWidth(t),o-a,0,t.fillColor,t.opacity,1,t.borderColor,r);c.node.classList.add("apexcharts-annotation-rect"),c.attr("clip-path","url(#gridRectMask".concat(s.globals.cuid,")")),e.appendChild(c.node),t.id&&c.node.classList.add(t.id);}var d="right"===t.label.position?s.globals.gridWidth:"center"===t.label.position?s.globals.gridWidth/2:0,g=this.annoCtx.graphics.drawText({x:d+t.label.offsetX,y:(null!=a?a:o)+t.label.offsetY-3,text:n,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,fontWeight:t.label.style.fontWeight,foreColor:t.label.style.color,cssClass:"apexcharts-yaxis-annotation-label ".concat(t.label.style.cssClass," ").concat(t.id?t.id:"")});g.attr({rel:i}),e.appendChild(g.node);}},{key:"_getYAxisAnnotationWidth",value:function(t){var e=this.w;e.globals.gridWidth;return (t.width.indexOf("%")>-1?e.globals.gridWidth*parseInt(t.width,10)/100:parseInt(t.width,10))+t.offsetX}},{key:"drawYAxisAnnotations",value:function(){var t=this,e=this.w,i=this.annoCtx.graphics.group({class:"apexcharts-yaxis-annotations"});return e.config.annotations.yaxis.map((function(e,a){t.addYaxisAnnotation(e,i.node,a);})),i}}]),t}(),S=function(){function t(e){a(this,t),this.w=e.w,this.annoCtx=e,this.helpers=new w(this.annoCtx);}return r(t,[{key:"addPointAnnotation",value:function(t,e,i){this.w;var a=this.helpers.getX1X2("x1",t),s=this.helpers.getY1Y2("y1",t);if(x.isNumber(a)){var r={pSize:t.marker.size,pointStrokeWidth:t.marker.strokeWidth,pointFillColor:t.marker.fillColor,pointStrokeColor:t.marker.strokeColor,shape:t.marker.shape,pRadius:t.marker.radius,class:"apexcharts-point-annotation-marker ".concat(t.marker.cssClass," ").concat(t.id?t.id:"")},o=this.annoCtx.graphics.drawMarker(a+t.marker.offsetX,s+t.marker.offsetY,r);e.appendChild(o.node);var n=t.label.text?t.label.text:"",l=this.annoCtx.graphics.drawText({x:a+t.label.offsetX,y:s+t.label.offsetY-t.marker.size-parseFloat(t.label.style.fontSize)/1.6,text:n,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,fontWeight:t.label.style.fontWeight,foreColor:t.label.style.color,cssClass:"apexcharts-point-annotation-label ".concat(t.label.style.cssClass," ").concat(t.id?t.id:"")});if(l.attr({rel:i}),e.appendChild(l.node),t.customSVG.SVG){var h=this.annoCtx.graphics.group({class:"apexcharts-point-annotations-custom-svg "+t.customSVG.cssClass});h.attr({transform:"translate(".concat(a+t.customSVG.offsetX,", ").concat(s+t.customSVG.offsetY,")")}),h.node.innerHTML=t.customSVG.SVG,e.appendChild(h.node);}if(t.image.path){var c=t.image.width?t.image.width:20,d=t.image.height?t.image.height:20;o=this.annoCtx.addImage({x:a+t.image.offsetX-c/2,y:s+t.image.offsetY-d/2,width:c,height:d,path:t.image.path,appendTo:".apexcharts-point-annotations"});}t.mouseEnter&&o.node.addEventListener("mouseenter",t.mouseEnter.bind(this,t)),t.mouseLeave&&o.node.addEventListener("mouseleave",t.mouseLeave.bind(this,t)),t.click&&o.node.addEventListener("click",t.click.bind(this,t));}}},{key:"drawPointAnnotations",value:function(){var t=this,e=this.w,i=this.annoCtx.graphics.group({class:"apexcharts-point-annotations"});return e.config.annotations.points.map((function(e,a){t.addPointAnnotation(e,i.node,a);})),i}}]),t}();var C={name:"en",options:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],toolbar:{exportToSVG:"Download SVG",exportToPNG:"Download PNG",exportToCSV:"Download CSV",menu:"Menu",selection:"Selection",selectionZoom:"Selection Zoom",zoomIn:"Zoom In",zoomOut:"Zoom Out",pan:"Panning",reset:"Reset Zoom"}}},L=function(){function t(){a(this,t),this.yAxis={show:!0,showAlways:!1,showForNullSeries:!0,seriesName:void 0,opposite:!1,reversed:!1,logarithmic:!1,logBase:10,tickAmount:void 0,forceNiceScale:!1,max:void 0,min:void 0,floating:!1,decimalsInFloat:void 0,labels:{show:!0,minWidth:0,maxWidth:160,offsetX:0,offsetY:0,align:void 0,rotate:0,padding:20,style:{colors:[],fontSize:"11px",fontWeight:400,fontFamily:void 0,cssClass:""},formatter:void 0},axisBorder:{show:!1,color:"#e0e0e0",width:1,offsetX:0,offsetY:0},axisTicks:{show:!1,color:"#e0e0e0",width:6,offsetX:0,offsetY:0},title:{text:void 0,rotate:-90,offsetY:0,offsetX:0,style:{color:void 0,fontSize:"11px",fontWeight:900,fontFamily:void 0,cssClass:""}},tooltip:{enabled:!1,offsetX:0},crosshairs:{show:!0,position:"front",stroke:{color:"#b6b6b6",width:1,dashArray:0}}},this.pointAnnotation={id:void 0,x:0,y:null,yAxisIndex:0,seriesIndex:0,mouseEnter:void 0,mouseLeave:void 0,click:void 0,marker:{size:4,fillColor:"#fff",strokeWidth:2,strokeColor:"#333",shape:"circle",offsetX:0,offsetY:0,radius:2,cssClass:""},label:{borderColor:"#c2c2c2",borderWidth:1,borderRadius:2,text:void 0,textAnchor:"middle",offsetX:0,offsetY:0,mouseEnter:void 0,mouseLeave:void 0,click:void 0,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,fontWeight:400,cssClass:"",padding:{left:5,right:5,top:2,bottom:2}}},customSVG:{SVG:void 0,cssClass:void 0,offsetX:0,offsetY:0},image:{path:void 0,width:20,height:20,offsetX:0,offsetY:0}},this.yAxisAnnotation={id:void 0,y:0,y2:null,strokeDashArray:1,fillColor:"#c2c2c2",borderColor:"#c2c2c2",borderWidth:1,opacity:.3,offsetX:0,offsetY:0,width:"100%",yAxisIndex:0,label:{borderColor:"#c2c2c2",borderWidth:1,borderRadius:2,text:void 0,textAnchor:"end",position:"right",offsetX:0,offsetY:-3,mouseEnter:void 0,mouseLeave:void 0,click:void 0,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,fontWeight:400,cssClass:"",padding:{left:5,right:5,top:2,bottom:2}}}},this.xAxisAnnotation={id:void 0,x:0,x2:null,strokeDashArray:1,fillColor:"#c2c2c2",borderColor:"#c2c2c2",borderWidth:1,opacity:.3,offsetX:0,offsetY:0,label:{borderColor:"#c2c2c2",borderWidth:1,borderRadius:2,text:void 0,textAnchor:"middle",orientation:"vertical",position:"top",offsetX:0,offsetY:0,mouseEnter:void 0,mouseLeave:void 0,click:void 0,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,fontWeight:400,cssClass:"",padding:{left:5,right:5,top:2,bottom:2}}}},this.text={x:0,y:0,text:"",textAnchor:"start",foreColor:void 0,fontSize:"13px",fontFamily:void 0,fontWeight:400,appendTo:".apexcharts-annotations",backgroundColor:"transparent",borderColor:"#c2c2c2",borderRadius:0,borderWidth:0,paddingLeft:4,paddingRight:4,paddingTop:2,paddingBottom:2};}return r(t,[{key:"init",value:function(){return {annotations:{yaxis:[this.yAxisAnnotation],xaxis:[this.xAxisAnnotation],points:[this.pointAnnotation],texts:[],images:[],shapes:[]},chart:{animations:{enabled:!0,easing:"easeinout",speed:800,animateGradually:{delay:150,enabled:!0},dynamicAnimation:{enabled:!0,speed:350}},background:"transparent",locales:[C],defaultLocale:"en",dropShadow:{enabled:!1,enabledOnSeries:void 0,top:2,left:2,blur:4,color:"#000",opacity:.35},events:{animationEnd:void 0,beforeMount:void 0,mounted:void 0,updated:void 0,click:void 0,mouseMove:void 0,mouseLeave:void 0,xAxisLabelClick:void 0,legendClick:void 0,markerClick:void 0,selection:void 0,dataPointSelection:void 0,dataPointMouseEnter:void 0,dataPointMouseLeave:void 0,beforeZoom:void 0,beforeResetZoom:void 0,zoomed:void 0,scrolled:void 0,brushScrolled:void 0},foreColor:"#373d3f",fontFamily:"Helvetica, Arial, sans-serif",height:"auto",parentHeightOffset:15,redrawOnParentResize:!0,redrawOnWindowResize:!0,id:void 0,group:void 0,offsetX:0,offsetY:0,selection:{enabled:!1,type:"x",fill:{color:"#24292e",opacity:.1},stroke:{width:1,color:"#24292e",opacity:.4,dashArray:3},xaxis:{min:void 0,max:void 0},yaxis:{min:void 0,max:void 0}},sparkline:{enabled:!1},brush:{enabled:!1,autoScaleYaxis:!0,target:void 0,targets:void 0},stacked:!1,stackType:"normal",toolbar:{show:!0,offsetX:0,offsetY:0,tools:{download:!0,selection:!0,zoom:!0,zoomin:!0,zoomout:!0,pan:!0,reset:!0,customIcons:[]},export:{csv:{filename:void 0,columnDelimiter:",",headerCategory:"category",headerValue:"value",dateFormatter:function(t){return new Date(t).toDateString()}},png:{filename:void 0},svg:{filename:void 0}},autoSelected:"zoom"},type:"line",width:"100%",zoom:{enabled:!0,type:"x",autoScaleYaxis:!1,zoomedArea:{fill:{color:"#90CAF9",opacity:.4},stroke:{color:"#0D47A1",opacity:.4,width:1}}}},plotOptions:{area:{fillTo:"origin"},bar:{horizontal:!1,columnWidth:"70%",barHeight:"70%",distributed:!1,borderRadius:0,borderRadiusApplication:"around",borderRadiusWhenStacked:"last",rangeBarOverlap:!0,rangeBarGroupRows:!1,hideZeroBarsWhenGrouped:!1,isDumbbell:!1,dumbbellColors:void 0,isFunnel:!1,isFunnel3d:!0,colors:{ranges:[],backgroundBarColors:[],backgroundBarOpacity:1,backgroundBarRadius:0},dataLabels:{position:"top",maxItems:100,hideOverflowingLabels:!0,orientation:"horizontal",total:{enabled:!1,formatter:void 0,offsetX:0,offsetY:0,style:{color:"#373d3f",fontSize:"12px",fontFamily:void 0,fontWeight:600}}}},bubble:{zScaling:!0,minBubbleRadius:void 0,maxBubbleRadius:void 0},candlestick:{colors:{upward:"#00B746",downward:"#EF403C"},wick:{useFillColor:!0}},boxPlot:{colors:{upper:"#00E396",lower:"#008FFB"}},heatmap:{radius:2,enableShades:!0,shadeIntensity:.5,reverseNegativeShade:!1,distributed:!1,useFillColorAsStroke:!1,colorScale:{inverse:!1,ranges:[],min:void 0,max:void 0}},treemap:{enableShades:!0,shadeIntensity:.5,distributed:!1,reverseNegativeShade:!1,useFillColorAsStroke:!1,dataLabels:{format:"scale"},colorScale:{inverse:!1,ranges:[],min:void 0,max:void 0}},radialBar:{inverseOrder:!1,startAngle:0,endAngle:360,offsetX:0,offsetY:0,hollow:{margin:5,size:"50%",background:"transparent",image:void 0,imageWidth:150,imageHeight:150,imageOffsetX:0,imageOffsetY:0,imageClipped:!0,position:"front",dropShadow:{enabled:!1,top:0,left:0,blur:3,color:"#000",opacity:.5}},track:{show:!0,startAngle:void 0,endAngle:void 0,background:"#f2f2f2",strokeWidth:"97%",opacity:1,margin:5,dropShadow:{enabled:!1,top:0,left:0,blur:3,color:"#000",opacity:.5}},dataLabels:{show:!0,name:{show:!0,fontSize:"16px",fontFamily:void 0,fontWeight:600,color:void 0,offsetY:0,formatter:function(t){return t}},value:{show:!0,fontSize:"14px",fontFamily:void 0,fontWeight:400,color:void 0,offsetY:16,formatter:function(t){return t+"%"}},total:{show:!1,label:"Total",fontSize:"16px",fontWeight:600,fontFamily:void 0,color:void 0,formatter:function(t){return t.globals.seriesTotals.reduce((function(t,e){return t+e}),0)/t.globals.series.length+"%"}}}},pie:{customScale:1,offsetX:0,offsetY:0,startAngle:0,endAngle:360,expandOnClick:!0,dataLabels:{offset:0,minAngleToShowLabel:10},donut:{size:"65%",background:"transparent",labels:{show:!1,name:{show:!0,fontSize:"16px",fontFamily:void 0,fontWeight:600,color:void 0,offsetY:-10,formatter:function(t){return t}},value:{show:!0,fontSize:"20px",fontFamily:void 0,fontWeight:400,color:void 0,offsetY:10,formatter:function(t){return t}},total:{show:!1,showAlways:!1,label:"Total",fontSize:"16px",fontWeight:400,fontFamily:void 0,color:void 0,formatter:function(t){return t.globals.seriesTotals.reduce((function(t,e){return t+e}),0)}}}}},polarArea:{rings:{strokeWidth:1,strokeColor:"#e8e8e8"},spokes:{strokeWidth:1,connectorColors:"#e8e8e8"}},radar:{size:void 0,offsetX:0,offsetY:0,polygons:{strokeWidth:1,strokeColors:"#e8e8e8",connectorColors:"#e8e8e8",fill:{colors:void 0}}}},colors:void 0,dataLabels:{enabled:!0,enabledOnSeries:void 0,formatter:function(t){return null!==t?t:""},textAnchor:"middle",distributed:!1,offsetX:0,offsetY:0,style:{fontSize:"12px",fontFamily:void 0,fontWeight:600,colors:void 0},background:{enabled:!0,foreColor:"#fff",borderRadius:2,padding:4,opacity:.9,borderWidth:1,borderColor:"#fff",dropShadow:{enabled:!1,top:1,left:1,blur:1,color:"#000",opacity:.45}},dropShadow:{enabled:!1,top:1,left:1,blur:1,color:"#000",opacity:.45}},fill:{type:"solid",colors:void 0,opacity:.85,gradient:{shade:"dark",type:"horizontal",shadeIntensity:.5,gradientToColors:void 0,inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[0,50,100],colorStops:[]},image:{src:[],width:void 0,height:void 0},pattern:{style:"squares",width:6,height:6,strokeWidth:2}},forecastDataPoints:{count:0,fillOpacity:.5,strokeWidth:void 0,dashArray:4},grid:{show:!0,borderColor:"#e0e0e0",strokeDashArray:0,position:"back",xaxis:{lines:{show:!1}},yaxis:{lines:{show:!0}},row:{colors:void 0,opacity:.5},column:{colors:void 0,opacity:.5},padding:{top:0,right:10,bottom:0,left:12}},labels:[],legend:{show:!0,showForSingleSeries:!1,showForNullSeries:!0,showForZeroSeries:!0,floating:!1,position:"bottom",horizontalAlign:"center",inverseOrder:!1,fontSize:"12px",fontFamily:void 0,fontWeight:400,width:void 0,height:void 0,formatter:void 0,tooltipHoverFormatter:void 0,offsetX:-20,offsetY:4,customLegendItems:[],labels:{colors:void 0,useSeriesColors:!1},markers:{width:12,height:12,strokeWidth:0,fillColors:void 0,strokeColor:"#fff",radius:12,customHTML:void 0,offsetX:0,offsetY:0,onClick:void 0},itemMargin:{horizontal:5,vertical:2},onItemClick:{toggleDataSeries:!0},onItemHover:{highlightDataSeries:!0}},markers:{discrete:[],size:0,colors:void 0,strokeColors:"#fff",strokeWidth:2,strokeOpacity:.9,strokeDashArray:0,fillOpacity:1,shape:"circle",width:8,height:8,radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,showNullDataPoints:!0,hover:{size:void 0,sizeOffset:3}},noData:{text:void 0,align:"center",verticalAlign:"middle",offsetX:0,offsetY:0,style:{color:void 0,fontSize:"14px",fontFamily:void 0}},responsive:[],series:void 0,states:{normal:{filter:{type:"none",value:0}},hover:{filter:{type:"lighten",value:.1}},active:{allowMultipleDataPointsSelection:!1,filter:{type:"darken",value:.5}}},title:{text:void 0,align:"left",margin:5,offsetX:0,offsetY:0,floating:!1,style:{fontSize:"14px",fontWeight:900,fontFamily:void 0,color:void 0}},subtitle:{text:void 0,align:"left",margin:5,offsetX:0,offsetY:30,floating:!1,style:{fontSize:"12px",fontWeight:400,fontFamily:void 0,color:void 0}},stroke:{show:!0,curve:"smooth",lineCap:"butt",width:2,colors:void 0,dashArray:0,fill:{type:"solid",colors:void 0,opacity:.85,gradient:{shade:"dark",type:"horizontal",shadeIntensity:.5,gradientToColors:void 0,inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[0,50,100],colorStops:[]}}},tooltip:{enabled:!0,enabledOnSeries:void 0,shared:!0,followCursor:!1,intersect:!1,inverseOrder:!1,custom:void 0,fillSeriesColor:!1,theme:"light",cssClass:"",style:{fontSize:"12px",fontFamily:void 0},onDatasetHover:{highlightDataSeries:!1},x:{show:!0,format:"dd MMM",formatter:void 0},y:{formatter:void 0,title:{formatter:function(t){return t?t+": ":""}}},z:{formatter:void 0,title:"Size: "},marker:{show:!0,fillColors:void 0},items:{display:"flex"},fixed:{enabled:!1,position:"topRight",offsetX:0,offsetY:0}},xaxis:{type:"category",categories:[],convertedCatToNumeric:!1,offsetX:0,offsetY:0,overwriteCategories:void 0,labels:{show:!0,rotate:-45,rotateAlways:!1,hideOverlappingLabels:!0,trim:!1,minHeight:void 0,maxHeight:120,showDuplicates:!0,style:{colors:[],fontSize:"12px",fontWeight:400,fontFamily:void 0,cssClass:""},offsetX:0,offsetY:0,format:void 0,formatter:void 0,datetimeUTC:!0,datetimeFormatter:{year:"yyyy",month:"MMM 'yy",day:"dd MMM",hour:"HH:mm",minute:"HH:mm:ss",second:"HH:mm:ss"}},group:{groups:[],style:{colors:[],fontSize:"12px",fontWeight:400,fontFamily:void 0,cssClass:""}},axisBorder:{show:!0,color:"#e0e0e0",width:"100%",height:1,offsetX:0,offsetY:0},axisTicks:{show:!0,color:"#e0e0e0",height:6,offsetX:0,offsetY:0},tickAmount:void 0,tickPlacement:"on",min:void 0,max:void 0,range:void 0,floating:!1,decimalsInFloat:void 0,position:"bottom",title:{text:void 0,offsetX:0,offsetY:0,style:{color:void 0,fontSize:"12px",fontWeight:900,fontFamily:void 0,cssClass:""}},crosshairs:{show:!0,width:1,position:"back",opacity:.9,stroke:{color:"#b6b6b6",width:1,dashArray:3},fill:{type:"solid",color:"#B1B9C4",gradient:{colorFrom:"#D8E3F0",colorTo:"#BED1E6",stops:[0,100],opacityFrom:.4,opacityTo:.5}},dropShadow:{enabled:!1,left:0,top:0,blur:1,opacity:.4}},tooltip:{enabled:!0,offsetY:0,formatter:void 0,style:{fontSize:"12px",fontFamily:void 0}}},yaxis:this.yAxis,theme:{mode:"light",palette:"palette1",monochrome:{enabled:!1,color:"#008FFB",shadeTo:"light",shadeIntensity:.65}}}}}]),t}(),P=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.graphics=new m(this.ctx),this.w.globals.isBarHorizontal&&(this.invertAxis=!0),this.helpers=new w(this),this.xAxisAnnotations=new k(this),this.yAxisAnnotations=new A(this),this.pointsAnnotations=new S(this),this.w.globals.isBarHorizontal&&this.w.config.yaxis[0].reversed&&(this.inversedReversedAxis=!0),this.xDivision=this.w.globals.gridWidth/this.w.globals.dataPoints;}return r(t,[{key:"drawAxesAnnotations",value:function(){var t=this.w;if(t.globals.axisCharts){for(var e=this.yAxisAnnotations.drawYAxisAnnotations(),i=this.xAxisAnnotations.drawXAxisAnnotations(),a=this.pointsAnnotations.drawPointAnnotations(),s=t.config.chart.animations.enabled,r=[e,i,a],o=[i.node,e.node,a.node],n=0;n<3;n++)t.globals.dom.elGraphical.add(r[n]),!s||t.globals.resized||t.globals.dataChanged||"scatter"!==t.config.chart.type&&"bubble"!==t.config.chart.type&&t.globals.dataPoints>1&&o[n].classList.add("apexcharts-element-hidden"),t.globals.delayedElements.push({el:o[n],index:0});this.helpers.annotationsBackground();}}},{key:"drawImageAnnos",value:function(){var t=this;this.w.config.annotations.images.map((function(e,i){t.addImage(e,i);}));}},{key:"drawTextAnnos",value:function(){var t=this;this.w.config.annotations.texts.map((function(e,i){t.addText(e,i);}));}},{key:"addXaxisAnnotation",value:function(t,e,i){this.xAxisAnnotations.addXaxisAnnotation(t,e,i);}},{key:"addYaxisAnnotation",value:function(t,e,i){this.yAxisAnnotations.addYaxisAnnotation(t,e,i);}},{key:"addPointAnnotation",value:function(t,e,i){this.pointsAnnotations.addPointAnnotation(t,e,i);}},{key:"addText",value:function(t,e){var i=t.x,a=t.y,s=t.text,r=t.textAnchor,o=t.foreColor,n=t.fontSize,l=t.fontFamily,h=t.fontWeight,c=t.cssClass,d=t.backgroundColor,g=t.borderWidth,u=t.strokeDashArray,p=t.borderRadius,f=t.borderColor,x=t.appendTo,b=void 0===x?".apexcharts-annotations":x,v=t.paddingLeft,m=void 0===v?4:v,y=t.paddingRight,w=void 0===y?4:y,k=t.paddingBottom,A=void 0===k?2:k,S=t.paddingTop,C=void 0===S?2:S,L=this.w,P=this.graphics.drawText({x:i,y:a,text:s,textAnchor:r||"start",fontSize:n||"12px",fontWeight:h||"regular",fontFamily:l||L.config.chart.fontFamily,foreColor:o||L.config.chart.foreColor,cssClass:c}),I=L.globals.dom.baseEl.querySelector(b);I&&I.appendChild(P.node);var M=P.bbox();if(s){var T=this.graphics.drawRect(M.x-m,M.y-C,M.width+m+w,M.height+A+C,p,d||"transparent",1,g,f,u);I.insertBefore(T.node,P.node);}}},{key:"addImage",value:function(t,e){var i=this.w,a=t.path,s=t.x,r=void 0===s?0:s,o=t.y,n=void 0===o?0:o,l=t.width,h=void 0===l?20:l,c=t.height,d=void 0===c?20:c,g=t.appendTo,u=void 0===g?".apexcharts-annotations":g,p=i.globals.dom.Paper.image(a);p.size(h,d).move(r,n);var f=i.globals.dom.baseEl.querySelector(u);return f&&f.appendChild(p.node),p}},{key:"addXaxisAnnotationExternal",value:function(t,e,i){return this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"xaxis",contextMethod:i.addXaxisAnnotation}),i}},{key:"addYaxisAnnotationExternal",value:function(t,e,i){return this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"yaxis",contextMethod:i.addYaxisAnnotation}),i}},{key:"addPointAnnotationExternal",value:function(t,e,i){return void 0===this.invertAxis&&(this.invertAxis=i.w.globals.isBarHorizontal),this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"point",contextMethod:i.addPointAnnotation}),i}},{key:"addAnnotationExternal",value:function(t){var e=t.params,i=t.pushToMemory,a=t.context,s=t.type,r=t.contextMethod,o=a,n=o.w,l=n.globals.dom.baseEl.querySelector(".apexcharts-".concat(s,"-annotations")),h=l.childNodes.length+1,c=new L,d=Object.assign({},"xaxis"===s?c.xAxisAnnotation:"yaxis"===s?c.yAxisAnnotation:c.pointAnnotation),g=x.extend(d,e);switch(s){case"xaxis":this.addXaxisAnnotation(g,l,h);break;case"yaxis":this.addYaxisAnnotation(g,l,h);break;case"point":this.addPointAnnotation(g,l,h);}var u=n.globals.dom.baseEl.querySelector(".apexcharts-".concat(s,"-annotations .apexcharts-").concat(s,"-annotation-label[rel='").concat(h,"']")),p=this.helpers.addBackgroundToAnno(u,g);return p&&l.insertBefore(p.node,u),i&&n.globals.memory.methodsToExec.push({context:o,id:g.id?g.id:x.randomId(),method:r,label:"addAnnotation",params:e}),a}},{key:"clearAnnotations",value:function(t){var e=t.w,i=e.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis-annotations, .apexcharts-xaxis-annotations, .apexcharts-point-annotations");e.globals.memory.methodsToExec.map((function(t,i){"addText"!==t.label&&"addAnnotation"!==t.label||e.globals.memory.methodsToExec.splice(i,1);})),i=x.listToArray(i),Array.prototype.forEach.call(i,(function(t){for(;t.firstChild;)t.removeChild(t.firstChild);}));}},{key:"removeAnnotation",value:function(t,e){var i=t.w,a=i.globals.dom.baseEl.querySelectorAll(".".concat(e));a&&(i.globals.memory.methodsToExec.map((function(t,a){t.id===e&&i.globals.memory.methodsToExec.splice(a,1);})),Array.prototype.forEach.call(a,(function(t){t.parentElement.removeChild(t);})));}}]),t}(),I=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.months31=[1,3,5,7,8,10,12],this.months30=[2,4,6,9,11],this.daysCntOfYear=[0,31,59,90,120,151,181,212,243,273,304,334];}return r(t,[{key:"isValidDate",value:function(t){return !isNaN(this.parseDate(t))}},{key:"getTimeStamp",value:function(t){return Date.parse(t)?this.w.config.xaxis.labels.datetimeUTC?new Date(new Date(t).toISOString().substr(0,25)).getTime():new Date(t).getTime():t}},{key:"getDate",value:function(t){return this.w.config.xaxis.labels.datetimeUTC?new Date(new Date(t).toUTCString()):new Date(t)}},{key:"parseDate",value:function(t){var e=Date.parse(t);if(!isNaN(e))return this.getTimeStamp(t);var i=Date.parse(t.replace(/-/g,"/").replace(/[a-z]+/gi," "));return i=this.getTimeStamp(i)}},{key:"parseDateWithTimezone",value:function(t){return Date.parse(t.replace(/-/g,"/").replace(/[a-z]+/gi," "))}},{key:"formatDate",value:function(t,e){var i=this.w.globals.locale,a=this.w.config.xaxis.labels.datetimeUTC,s=["\0"].concat(u(i.months)),r=["\x01"].concat(u(i.shortMonths)),o=["\x02"].concat(u(i.days)),n=["\x03"].concat(u(i.shortDays));function l(t,e){var i=t+"";for(e=e||2;i.length<e;)i="0"+i;return i}var h=a?t.getUTCFullYear():t.getFullYear();e=(e=(e=e.replace(/(^|[^\\])yyyy+/g,"$1"+h)).replace(/(^|[^\\])yy/g,"$1"+h.toString().substr(2,2))).replace(/(^|[^\\])y/g,"$1"+h);var c=(a?t.getUTCMonth():t.getMonth())+1;e=(e=(e=(e=e.replace(/(^|[^\\])MMMM+/g,"$1"+s[0])).replace(/(^|[^\\])MMM/g,"$1"+r[0])).replace(/(^|[^\\])MM/g,"$1"+l(c))).replace(/(^|[^\\])M/g,"$1"+c);var d=a?t.getUTCDate():t.getDate();e=(e=(e=(e=e.replace(/(^|[^\\])dddd+/g,"$1"+o[0])).replace(/(^|[^\\])ddd/g,"$1"+n[0])).replace(/(^|[^\\])dd/g,"$1"+l(d))).replace(/(^|[^\\])d/g,"$1"+d);var g=a?t.getUTCHours():t.getHours(),p=g>12?g-12:0===g?12:g;e=(e=(e=(e=e.replace(/(^|[^\\])HH+/g,"$1"+l(g))).replace(/(^|[^\\])H/g,"$1"+g)).replace(/(^|[^\\])hh+/g,"$1"+l(p))).replace(/(^|[^\\])h/g,"$1"+p);var f=a?t.getUTCMinutes():t.getMinutes();e=(e=e.replace(/(^|[^\\])mm+/g,"$1"+l(f))).replace(/(^|[^\\])m/g,"$1"+f);var x=a?t.getUTCSeconds():t.getSeconds();e=(e=e.replace(/(^|[^\\])ss+/g,"$1"+l(x))).replace(/(^|[^\\])s/g,"$1"+x);var b=a?t.getUTCMilliseconds():t.getMilliseconds();e=e.replace(/(^|[^\\])fff+/g,"$1"+l(b,3)),b=Math.round(b/10),e=e.replace(/(^|[^\\])ff/g,"$1"+l(b)),b=Math.round(b/10);var v=g<12?"AM":"PM";e=(e=(e=e.replace(/(^|[^\\])f/g,"$1"+b)).replace(/(^|[^\\])TT+/g,"$1"+v)).replace(/(^|[^\\])T/g,"$1"+v.charAt(0));var m=v.toLowerCase();e=(e=e.replace(/(^|[^\\])tt+/g,"$1"+m)).replace(/(^|[^\\])t/g,"$1"+m.charAt(0));var y=-t.getTimezoneOffset(),w=a||!y?"Z":y>0?"+":"-";if(!a){var k=(y=Math.abs(y))%60;w+=l(Math.floor(y/60))+":"+l(k);}e=e.replace(/(^|[^\\])K/g,"$1"+w);var A=(a?t.getUTCDay():t.getDay())+1;return e=(e=(e=(e=(e=e.replace(new RegExp(o[0],"g"),o[A])).replace(new RegExp(n[0],"g"),n[A])).replace(new RegExp(s[0],"g"),s[c])).replace(new RegExp(r[0],"g"),r[c])).replace(/\\(.)/g,"$1")}},{key:"getTimeUnitsfromTimestamp",value:function(t,e,i){var a=this.w;void 0!==a.config.xaxis.min&&(t=a.config.xaxis.min),void 0!==a.config.xaxis.max&&(e=a.config.xaxis.max);var s=this.getDate(t),r=this.getDate(e),o=this.formatDate(s,"yyyy MM dd HH mm ss fff").split(" "),n=this.formatDate(r,"yyyy MM dd HH mm ss fff").split(" ");return {minMillisecond:parseInt(o[6],10),maxMillisecond:parseInt(n[6],10),minSecond:parseInt(o[5],10),maxSecond:parseInt(n[5],10),minMinute:parseInt(o[4],10),maxMinute:parseInt(n[4],10),minHour:parseInt(o[3],10),maxHour:parseInt(n[3],10),minDate:parseInt(o[2],10),maxDate:parseInt(n[2],10),minMonth:parseInt(o[1],10)-1,maxMonth:parseInt(n[1],10)-1,minYear:parseInt(o[0],10),maxYear:parseInt(n[0],10)}}},{key:"isLeapYear",value:function(t){return t%4==0&&t%100!=0||t%400==0}},{key:"calculcateLastDaysOfMonth",value:function(t,e,i){return this.determineDaysOfMonths(t,e)-i}},{key:"determineDaysOfYear",value:function(t){var e=365;return this.isLeapYear(t)&&(e=366),e}},{key:"determineRemainingDaysOfYear",value:function(t,e,i){var a=this.daysCntOfYear[e]+i;return e>1&&this.isLeapYear()&&a++,a}},{key:"determineDaysOfMonths",value:function(t,e){var i=30;switch(t=x.monthMod(t),!0){case this.months30.indexOf(t)>-1:2===t&&(i=this.isLeapYear(e)?29:28);break;case this.months31.indexOf(t)>-1:default:i=31;}return i}}]),t}(),M=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.tooltipKeyFormat="dd MMM";}return r(t,[{key:"xLabelFormat",value:function(t,e,i,a){var s=this.w;if("datetime"===s.config.xaxis.type&&void 0===s.config.xaxis.labels.formatter&&void 0===s.config.tooltip.x.formatter){var r=new I(this.ctx);return r.formatDate(r.getDate(e),s.config.tooltip.x.format)}return t(e,i,a)}},{key:"defaultGeneralFormatter",value:function(t){return Array.isArray(t)?t.map((function(t){return t})):t}},{key:"defaultYFormatter",value:function(t,e,i){var a=this.w;return x.isNumber(t)&&(t=0!==a.globals.yValueDecimal?t.toFixed(void 0!==e.decimalsInFloat?e.decimalsInFloat:a.globals.yValueDecimal):a.globals.maxYArr[i]-a.globals.minYArr[i]<5?t.toFixed(1):t.toFixed(0)),t}},{key:"setLabelFormatters",value:function(){var t=this,e=this.w;return e.globals.xaxisTooltipFormatter=function(e){return t.defaultGeneralFormatter(e)},e.globals.ttKeyFormatter=function(e){return t.defaultGeneralFormatter(e)},e.globals.ttZFormatter=function(t){return t},e.globals.legendFormatter=function(e){return t.defaultGeneralFormatter(e)},void 0!==e.config.xaxis.labels.formatter?e.globals.xLabelFormatter=e.config.xaxis.labels.formatter:e.globals.xLabelFormatter=function(t){if(x.isNumber(t)){if(!e.config.xaxis.convertedCatToNumeric&&"numeric"===e.config.xaxis.type){if(x.isNumber(e.config.xaxis.decimalsInFloat))return t.toFixed(e.config.xaxis.decimalsInFloat);var i=e.globals.maxX-e.globals.minX;return i>0&&i<100?t.toFixed(1):t.toFixed(0)}if(e.globals.isBarHorizontal)if(e.globals.maxY-e.globals.minYArr<4)return t.toFixed(1);return t.toFixed(0)}return t},"function"==typeof e.config.tooltip.x.formatter?e.globals.ttKeyFormatter=e.config.tooltip.x.formatter:e.globals.ttKeyFormatter=e.globals.xLabelFormatter,"function"==typeof e.config.xaxis.tooltip.formatter&&(e.globals.xaxisTooltipFormatter=e.config.xaxis.tooltip.formatter),(Array.isArray(e.config.tooltip.y)||void 0!==e.config.tooltip.y.formatter)&&(e.globals.ttVal=e.config.tooltip.y),void 0!==e.config.tooltip.z.formatter&&(e.globals.ttZFormatter=e.config.tooltip.z.formatter),void 0!==e.config.legend.formatter&&(e.globals.legendFormatter=e.config.legend.formatter),e.config.yaxis.forEach((function(i,a){void 0!==i.labels.formatter?e.globals.yLabelFormatters[a]=i.labels.formatter:e.globals.yLabelFormatters[a]=function(s){return e.globals.xyCharts?Array.isArray(s)?s.map((function(e){return t.defaultYFormatter(e,i,a)})):t.defaultYFormatter(s,i,a):s};})),e.globals}},{key:"heatmapLabelFormatters",value:function(){var t=this.w;if("heatmap"===t.config.chart.type){t.globals.yAxisScale[0].result=t.globals.seriesNames.slice();var e=t.globals.seriesNames.reduce((function(t,e){return t.length>e.length?t:e}),0);t.globals.yAxisScale[0].niceMax=e,t.globals.yAxisScale[0].niceMin=e;}}}]),t}(),T=function(t){var e,i=t.isTimeline,a=t.ctx,s=t.seriesIndex,r=t.dataPointIndex,o=t.y1,n=t.y2,l=t.w,h=l.globals.seriesRangeStart[s][r],c=l.globals.seriesRangeEnd[s][r],d=l.globals.labels[r],g=l.config.series[s].name?l.config.series[s].name:"",u=l.globals.ttKeyFormatter,p=l.config.tooltip.y.title.formatter,f={w:l,seriesIndex:s,dataPointIndex:r,start:h,end:c};("function"==typeof p&&(g=p(g,f)),null!==(e=l.config.series[s].data[r])&&void 0!==e&&e.x&&(d=l.config.series[s].data[r].x),i)||"datetime"===l.config.xaxis.type&&(d=new M(a).xLabelFormat(l.globals.ttKeyFormatter,d,d,{i:void 0,dateFormatter:new I(a).formatDate,w:l}));"function"==typeof u&&(d=u(d,f)),Number.isFinite(o)&&Number.isFinite(n)&&(h=o,c=n);var x="",b="",v=l.globals.colors[s];if(void 0===l.config.tooltip.x.formatter)if("datetime"===l.config.xaxis.type){var m=new I(a);x=m.formatDate(m.getDate(h),l.config.tooltip.x.format),b=m.formatDate(m.getDate(c),l.config.tooltip.x.format);}else x=h,b=c;else x=l.config.tooltip.x.formatter(h),b=l.config.tooltip.x.formatter(c);return {start:h,end:c,startVal:x,endVal:b,ylabel:d,color:v,seriesName:g}},z=function(t){var e=t.color,i=t.seriesName,a=t.ylabel,s=t.start,r=t.end,o=t.seriesIndex,n=t.dataPointIndex,l=t.ctx.tooltip.tooltipLabels.getFormatters(o);s=l.yLbFormatter(s),r=l.yLbFormatter(r);var h=l.yLbFormatter(t.w.globals.series[o][n]),c='<span class="value start-value">\n  '.concat(s,'\n  </span> <span class="separator">-</span> <span class="value end-value">\n  ').concat(r,"\n  </span>");return '<div class="apexcharts-tooltip-rangebar"><div> <span class="series-name" style="color: '+e+'">'+(i||"")+'</span></div><div> <span class="category">'+a+": </span> "+(t.w.globals.comboCharts?"rangeArea"===t.w.config.series[o].type||"rangeBar"===t.w.config.series[o].type?c:"<span>".concat(h,"</span>"):c)+" </div></div>"},X=function(){function t(e){a(this,t),this.opts=e;}return r(t,[{key:"hideYAxis",value:function(){this.opts.yaxis[0].show=!1,this.opts.yaxis[0].title.text="",this.opts.yaxis[0].axisBorder.show=!1,this.opts.yaxis[0].axisTicks.show=!1,this.opts.yaxis[0].floating=!0;}},{key:"line",value:function(){return {chart:{animations:{easing:"swing"}},dataLabels:{enabled:!1},stroke:{width:5,curve:"straight"},markers:{size:0,hover:{sizeOffset:6}},xaxis:{crosshairs:{width:1}}}}},{key:"sparkline",value:function(t){this.hideYAxis();return x.extend(t,{grid:{show:!1,padding:{left:0,right:0,top:0,bottom:0}},legend:{show:!1},xaxis:{labels:{show:!1},tooltip:{enabled:!1},axisBorder:{show:!1},axisTicks:{show:!1}},chart:{toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1}})}},{key:"bar",value:function(){return {chart:{stacked:!1,animations:{easing:"swing"}},plotOptions:{bar:{dataLabels:{position:"center"}}},dataLabels:{style:{colors:["#fff"]},background:{enabled:!1}},stroke:{width:0,lineCap:"round"},fill:{opacity:.85},legend:{markers:{shape:"square",radius:2,size:8}},tooltip:{shared:!1,intersect:!0},xaxis:{tooltip:{enabled:!1},tickPlacement:"between",crosshairs:{width:"barWidth",position:"back",fill:{type:"gradient"},dropShadow:{enabled:!1},stroke:{width:0}}}}}},{key:"funnel",value:function(){return this.hideYAxis(),e(e({},this.bar()),{},{chart:{animations:{easing:"linear",speed:800,animateGradually:{enabled:!1}}},plotOptions:{bar:{horizontal:!0,borderRadiusApplication:"around",borderRadius:0,dataLabels:{position:"center"}}},grid:{show:!1,padding:{left:0,right:0}},xaxis:{labels:{show:!1},tooltip:{enabled:!1},axisBorder:{show:!1},axisTicks:{show:!1}}})}},{key:"candlestick",value:function(){var t=this;return {stroke:{width:1,colors:["#333"]},fill:{opacity:1},dataLabels:{enabled:!1},tooltip:{shared:!0,custom:function(e){var i=e.seriesIndex,a=e.dataPointIndex,s=e.w;return t._getBoxTooltip(s,i,a,["Open","High","","Low","Close"],"candlestick")}},states:{active:{filter:{type:"none"}}},xaxis:{crosshairs:{width:1}}}}},{key:"boxPlot",value:function(){var t=this;return {chart:{animations:{dynamicAnimation:{enabled:!1}}},stroke:{width:1,colors:["#24292e"]},dataLabels:{enabled:!1},tooltip:{shared:!0,custom:function(e){var i=e.seriesIndex,a=e.dataPointIndex,s=e.w;return t._getBoxTooltip(s,i,a,["Minimum","Q1","Median","Q3","Maximum"],"boxPlot")}},markers:{size:5,strokeWidth:1,strokeColors:"#111"},xaxis:{crosshairs:{width:1}}}}},{key:"rangeBar",value:function(){return {chart:{animations:{animateGradually:!1}},stroke:{width:0,lineCap:"square"},plotOptions:{bar:{borderRadius:0,dataLabels:{position:"center"}}},dataLabels:{enabled:!1,formatter:function(t,e){e.ctx;var i=e.seriesIndex,a=e.dataPointIndex,s=e.w,r=function(){var t=s.globals.seriesRangeStart[i][a];return s.globals.seriesRangeEnd[i][a]-t};return s.globals.comboCharts?"rangeBar"===s.config.series[i].type||"rangeArea"===s.config.series[i].type?r():t:r()},background:{enabled:!1},style:{colors:["#fff"]}},markers:{size:10},tooltip:{shared:!1,followCursor:!0,custom:function(t){return t.w.config.plotOptions&&t.w.config.plotOptions.bar&&t.w.config.plotOptions.bar.horizontal?function(t){var i=T(e(e({},t),{},{isTimeline:!0})),a=i.color,s=i.seriesName,r=i.ylabel,o=i.startVal,n=i.endVal;return z(e(e({},t),{},{color:a,seriesName:s,ylabel:r,start:o,end:n}))}(t):function(t){var i=T(t),a=i.color,s=i.seriesName,r=i.ylabel,o=i.start,n=i.end;return z(e(e({},t),{},{color:a,seriesName:s,ylabel:r,start:o,end:n}))}(t)}},xaxis:{tickPlacement:"between",tooltip:{enabled:!1},crosshairs:{stroke:{width:0}}}}}},{key:"dumbbell",value:function(t){var e,i;return null!==(e=t.plotOptions.bar)&&void 0!==e&&e.barHeight||(t.plotOptions.bar.barHeight=2),null!==(i=t.plotOptions.bar)&&void 0!==i&&i.columnWidth||(t.plotOptions.bar.columnWidth=2),t}},{key:"area",value:function(){return {stroke:{width:4,fill:{type:"solid",gradient:{inverseColors:!1,shade:"light",type:"vertical",opacityFrom:.65,opacityTo:.5,stops:[0,100,100]}}},fill:{type:"gradient",gradient:{inverseColors:!1,shade:"light",type:"vertical",opacityFrom:.65,opacityTo:.5,stops:[0,100,100]}},markers:{size:0,hover:{sizeOffset:6}},tooltip:{followCursor:!1}}}},{key:"rangeArea",value:function(){return {stroke:{curve:"straight",width:0},fill:{type:"solid",opacity:.6},markers:{size:0},states:{hover:{filter:{type:"none"}},active:{filter:{type:"none"}}},tooltip:{intersect:!1,shared:!0,followCursor:!0,custom:function(t){return function(t){var i=T(t),a=i.color,s=i.seriesName,r=i.ylabel,o=i.start,n=i.end;return z(e(e({},t),{},{color:a,seriesName:s,ylabel:r,start:o,end:n}))}(t)}}}}},{key:"brush",value:function(t){return x.extend(t,{chart:{toolbar:{autoSelected:"selection",show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{width:1},tooltip:{enabled:!1},xaxis:{tooltip:{enabled:!1}}})}},{key:"stacked100",value:function(t){t.dataLabels=t.dataLabels||{},t.dataLabels.formatter=t.dataLabels.formatter||void 0;var e=t.dataLabels.formatter;return t.yaxis.forEach((function(e,i){t.yaxis[i].min=0,t.yaxis[i].max=100;})),"bar"===t.chart.type&&(t.dataLabels.formatter=e||function(t){return "number"==typeof t&&t?t.toFixed(0)+"%":t}),t}},{key:"stackedBars",value:function(){var t=this.bar();return e(e({},t),{},{plotOptions:e(e({},t.plotOptions),{},{bar:e(e({},t.plotOptions.bar),{},{borderRadiusApplication:"end",borderRadiusWhenStacked:"last"})})})}},{key:"convertCatToNumeric",value:function(t){return t.xaxis.convertedCatToNumeric=!0,t}},{key:"convertCatToNumericXaxis",value:function(t,e,i){t.xaxis.type="numeric",t.xaxis.labels=t.xaxis.labels||{},t.xaxis.labels.formatter=t.xaxis.labels.formatter||function(t){return x.isNumber(t)?Math.floor(t):t};var a=t.xaxis.labels.formatter,s=t.xaxis.categories&&t.xaxis.categories.length?t.xaxis.categories:t.labels;return i&&i.length&&(s=i.map((function(t){return Array.isArray(t)?t:String(t)}))),s&&s.length&&(t.xaxis.labels.formatter=function(t){return x.isNumber(t)?a(s[Math.floor(t)-1]):a(t)}),t.xaxis.categories=[],t.labels=[],t.xaxis.tickAmount=t.xaxis.tickAmount||"dataPoints",t}},{key:"bubble",value:function(){return {dataLabels:{style:{colors:["#fff"]}},tooltip:{shared:!1,intersect:!0},xaxis:{crosshairs:{width:0}},fill:{type:"solid",gradient:{shade:"light",inverse:!0,shadeIntensity:.55,opacityFrom:.4,opacityTo:.8}}}}},{key:"scatter",value:function(){return {dataLabels:{enabled:!1},tooltip:{shared:!1,intersect:!0},markers:{size:6,strokeWidth:1,hover:{sizeOffset:2}}}}},{key:"heatmap",value:function(){return {chart:{stacked:!1},fill:{opacity:1},dataLabels:{style:{colors:["#fff"]}},stroke:{colors:["#fff"]},tooltip:{followCursor:!0,marker:{show:!1},x:{show:!1}},legend:{position:"top",markers:{shape:"square",size:10,offsetY:2}},grid:{padding:{right:20}}}}},{key:"treemap",value:function(){return {chart:{zoom:{enabled:!1}},dataLabels:{style:{fontSize:14,fontWeight:600,colors:["#fff"]}},stroke:{show:!0,width:2,colors:["#fff"]},legend:{show:!1},fill:{gradient:{stops:[0,100]}},tooltip:{followCursor:!0,x:{show:!1}},grid:{padding:{left:0,right:0}},xaxis:{crosshairs:{show:!1},tooltip:{enabled:!1}}}}},{key:"pie",value:function(){return {chart:{toolbar:{show:!1}},plotOptions:{pie:{donut:{labels:{show:!1}}}},dataLabels:{formatter:function(t){return t.toFixed(1)+"%"},style:{colors:["#fff"]},background:{enabled:!1},dropShadow:{enabled:!0}},stroke:{colors:["#fff"]},fill:{opacity:1,gradient:{shade:"light",stops:[0,100]}},tooltip:{theme:"dark",fillSeriesColor:!0},legend:{position:"right"}}}},{key:"donut",value:function(){return {chart:{toolbar:{show:!1}},dataLabels:{formatter:function(t){return t.toFixed(1)+"%"},style:{colors:["#fff"]},background:{enabled:!1},dropShadow:{enabled:!0}},stroke:{colors:["#fff"]},fill:{opacity:1,gradient:{shade:"light",shadeIntensity:.35,stops:[80,100],opacityFrom:1,opacityTo:1}},tooltip:{theme:"dark",fillSeriesColor:!0},legend:{position:"right"}}}},{key:"polarArea",value:function(){return this.opts.yaxis[0].tickAmount=this.opts.yaxis[0].tickAmount?this.opts.yaxis[0].tickAmount:6,{chart:{toolbar:{show:!1}},dataLabels:{formatter:function(t){return t.toFixed(1)+"%"},enabled:!1},stroke:{show:!0,width:2},fill:{opacity:.7},tooltip:{theme:"dark",fillSeriesColor:!0},legend:{position:"right"}}}},{key:"radar",value:function(){return this.opts.yaxis[0].labels.offsetY=this.opts.yaxis[0].labels.offsetY?this.opts.yaxis[0].labels.offsetY:6,{dataLabels:{enabled:!1,style:{fontSize:"11px"}},stroke:{width:2},markers:{size:3,strokeWidth:1,strokeOpacity:1},fill:{opacity:.2},tooltip:{shared:!1,intersect:!0,followCursor:!0},grid:{show:!1},xaxis:{labels:{formatter:function(t){return t},style:{colors:["#a8a8a8"],fontSize:"11px"}},tooltip:{enabled:!1},crosshairs:{show:!1}}}}},{key:"radialBar",value:function(){return {chart:{animations:{dynamicAnimation:{enabled:!0,speed:800}},toolbar:{show:!1}},fill:{gradient:{shade:"dark",shadeIntensity:.4,inverseColors:!1,type:"diagonal2",opacityFrom:1,opacityTo:1,stops:[70,98,100]}},legend:{show:!1,position:"right"},tooltip:{enabled:!1,fillSeriesColor:!0}}}},{key:"_getBoxTooltip",value:function(t,e,i,a,s){var r=t.globals.seriesCandleO[e][i],o=t.globals.seriesCandleH[e][i],n=t.globals.seriesCandleM[e][i],l=t.globals.seriesCandleL[e][i],h=t.globals.seriesCandleC[e][i];return t.config.series[e].type&&t.config.series[e].type!==s?'<div class="apexcharts-custom-tooltip">\n          '.concat(t.config.series[e].name?t.config.series[e].name:"series-"+(e+1),": <strong>").concat(t.globals.series[e][i],"</strong>\n        </div>"):'<div class="apexcharts-tooltip-box apexcharts-tooltip-'.concat(t.config.chart.type,'">')+"<div>".concat(a[0],': <span class="value">')+r+"</span></div>"+"<div>".concat(a[1],': <span class="value">')+o+"</span></div>"+(n?"<div>".concat(a[2],': <span class="value">')+n+"</span></div>":"")+"<div>".concat(a[3],': <span class="value">')+l+"</span></div>"+"<div>".concat(a[4],': <span class="value">')+h+"</span></div></div>"}}]),t}(),E=function(){function t(e){a(this,t),this.opts=e;}return r(t,[{key:"init",value:function(t){var e=t.responsiveOverride,a=this.opts,s=new L,r=new X(a);this.chartType=a.chart.type,a=this.extendYAxis(a),a=this.extendAnnotations(a);var o=s.init(),n={};if(a&&"object"===i(a)){var l,h,c,d,g,u,p,f,b,v,m={};m=-1!==["line","area","bar","candlestick","boxPlot","rangeBar","rangeArea","bubble","scatter","heatmap","treemap","pie","polarArea","donut","radar","radialBar"].indexOf(a.chart.type)?r[a.chart.type]():r.line(),null!==(l=a.plotOptions)&&void 0!==l&&null!==(h=l.bar)&&void 0!==h&&h.isFunnel&&(m=r.funnel()),a.chart.stacked&&"bar"===a.chart.type&&(m=r.stackedBars()),null!==(c=a.chart.brush)&&void 0!==c&&c.enabled&&(m=r.brush(m)),a.chart.stacked&&"100%"===a.chart.stackType&&(a=r.stacked100(a)),null!==(d=a.plotOptions)&&void 0!==d&&null!==(g=d.bar)&&void 0!==g&&g.isDumbbell&&(a=r.dumbbell(a)),"monotoneCubic"===(null===(u=a)||void 0===u||null===(p=u.stroke)||void 0===p?void 0:p.curve)&&(a.stroke.curve="smooth"),this.checkForDarkTheme(window.Apex),this.checkForDarkTheme(a),a.xaxis=a.xaxis||window.Apex.xaxis||{},e||(a.xaxis.convertedCatToNumeric=!1),(null!==(f=(a=this.checkForCatToNumericXAxis(this.chartType,m,a)).chart.sparkline)&&void 0!==f&&f.enabled||null!==(b=window.Apex.chart)&&void 0!==b&&null!==(v=b.sparkline)&&void 0!==v&&v.enabled)&&(m=r.sparkline(m)),n=x.extend(o,m);}var y=x.extend(n,window.Apex);return o=x.extend(y,a),o=this.handleUserInputErrors(o)}},{key:"checkForCatToNumericXAxis",value:function(t,e,i){var a,s,r=new X(i),o=("bar"===t||"boxPlot"===t)&&(null===(a=i.plotOptions)||void 0===a||null===(s=a.bar)||void 0===s?void 0:s.horizontal),n="pie"===t||"polarArea"===t||"donut"===t||"radar"===t||"radialBar"===t||"heatmap"===t,l="datetime"!==i.xaxis.type&&"numeric"!==i.xaxis.type,h=i.xaxis.tickPlacement?i.xaxis.tickPlacement:e.xaxis&&e.xaxis.tickPlacement;return o||n||!l||"between"===h||(i=r.convertCatToNumeric(i)),i}},{key:"extendYAxis",value:function(t,e){var i=new L;(void 0===t.yaxis||!t.yaxis||Array.isArray(t.yaxis)&&0===t.yaxis.length)&&(t.yaxis={}),t.yaxis.constructor!==Array&&window.Apex.yaxis&&window.Apex.yaxis.constructor!==Array&&(t.yaxis=x.extend(t.yaxis,window.Apex.yaxis)),t.yaxis.constructor!==Array?t.yaxis=[x.extend(i.yAxis,t.yaxis)]:t.yaxis=x.extendArray(t.yaxis,i.yAxis);var a=!1;t.yaxis.forEach((function(t){t.logarithmic&&(a=!0);}));var s=t.series;return e&&!s&&(s=e.config.series),a&&s.length!==t.yaxis.length&&s.length&&(t.yaxis=s.map((function(e,a){if(e.name||(s[a].name="series-".concat(a+1)),t.yaxis[a])return t.yaxis[a].seriesName=s[a].name,t.yaxis[a];var r=x.extend(i.yAxis,t.yaxis[0]);return r.show=!1,r}))),a&&s.length>1&&s.length!==t.yaxis.length&&console.warn("A multi-series logarithmic chart should have equal number of series and y-axes"),t}},{key:"extendAnnotations",value:function(t){return void 0===t.annotations&&(t.annotations={},t.annotations.yaxis=[],t.annotations.xaxis=[],t.annotations.points=[]),t=this.extendYAxisAnnotations(t),t=this.extendXAxisAnnotations(t),t=this.extendPointAnnotations(t)}},{key:"extendYAxisAnnotations",value:function(t){var e=new L;return t.annotations.yaxis=x.extendArray(void 0!==t.annotations.yaxis?t.annotations.yaxis:[],e.yAxisAnnotation),t}},{key:"extendXAxisAnnotations",value:function(t){var e=new L;return t.annotations.xaxis=x.extendArray(void 0!==t.annotations.xaxis?t.annotations.xaxis:[],e.xAxisAnnotation),t}},{key:"extendPointAnnotations",value:function(t){var e=new L;return t.annotations.points=x.extendArray(void 0!==t.annotations.points?t.annotations.points:[],e.pointAnnotation),t}},{key:"checkForDarkTheme",value:function(t){t.theme&&"dark"===t.theme.mode&&(t.tooltip||(t.tooltip={}),"light"!==t.tooltip.theme&&(t.tooltip.theme="dark"),t.chart.foreColor||(t.chart.foreColor="#f6f7f8"),t.chart.background||(t.chart.background="#424242"),t.theme.palette||(t.theme.palette="palette4"));}},{key:"handleUserInputErrors",value:function(t){var e=t;if(e.tooltip.shared&&e.tooltip.intersect)throw new Error("tooltip.shared cannot be enabled when tooltip.intersect is true. Turn off any other option by setting it to false.");if("bar"===e.chart.type&&e.plotOptions.bar.horizontal){if(e.yaxis.length>1)throw new Error("Multiple Y Axis for bars are not supported. Switch to column chart by setting plotOptions.bar.horizontal=false");e.yaxis[0].reversed&&(e.yaxis[0].opposite=!0),e.xaxis.tooltip.enabled=!1,e.yaxis[0].tooltip.enabled=!1,e.chart.zoom.enabled=!1;}return "bar"!==e.chart.type&&"rangeBar"!==e.chart.type||e.tooltip.shared&&"barWidth"===e.xaxis.crosshairs.width&&e.series.length>1&&(e.xaxis.crosshairs.width="tickWidth"),"candlestick"!==e.chart.type&&"boxPlot"!==e.chart.type||e.yaxis[0].reversed&&(console.warn("Reversed y-axis in ".concat(e.chart.type," chart is not supported.")),e.yaxis[0].reversed=!1),e}}]),t}(),Y=function(){function t(){a(this,t);}return r(t,[{key:"initGlobalVars",value:function(t){t.series=[],t.seriesCandleO=[],t.seriesCandleH=[],t.seriesCandleM=[],t.seriesCandleL=[],t.seriesCandleC=[],t.seriesRangeStart=[],t.seriesRangeEnd=[],t.seriesRange=[],t.seriesPercent=[],t.seriesGoals=[],t.seriesX=[],t.seriesZ=[],t.seriesNames=[],t.seriesTotals=[],t.seriesLog=[],t.seriesColors=[],t.stackedSeriesTotals=[],t.seriesXvalues=[],t.seriesYvalues=[],t.labels=[],t.hasXaxisGroups=!1,t.groups=[],t.hasSeriesGroups=!1,t.seriesGroups=[],t.categoryLabels=[],t.timescaleLabels=[],t.noLabelsProvided=!1,t.resizeTimer=null,t.selectionResizeTimer=null,t.delayedElements=[],t.pointsArray=[],t.dataLabelsRects=[],t.isXNumeric=!1,t.skipLastTimelinelabel=!1,t.skipFirstTimelinelabel=!1,t.isDataXYZ=!1,t.isMultiLineX=!1,t.isMultipleYAxis=!1,t.maxY=-Number.MAX_VALUE,t.minY=Number.MIN_VALUE,t.minYArr=[],t.maxYArr=[],t.maxX=-Number.MAX_VALUE,t.minX=Number.MAX_VALUE,t.initialMaxX=-Number.MAX_VALUE,t.initialMinX=Number.MAX_VALUE,t.maxDate=0,t.minDate=Number.MAX_VALUE,t.minZ=Number.MAX_VALUE,t.maxZ=-Number.MAX_VALUE,t.minXDiff=Number.MAX_VALUE,t.yAxisScale=[],t.xAxisScale=null,t.xAxisTicksPositions=[],t.yLabelsCoords=[],t.yTitleCoords=[],t.barPadForNumericAxis=0,t.padHorizontal=0,t.xRange=0,t.yRange=[],t.zRange=0,t.dataPoints=0,t.xTickAmount=0;}},{key:"globalVars",value:function(t){return {chartID:null,cuid:null,events:{beforeMount:[],mounted:[],updated:[],clicked:[],selection:[],dataPointSelection:[],zoomed:[],scrolled:[]},colors:[],clientX:null,clientY:null,fill:{colors:[]},stroke:{colors:[]},dataLabels:{style:{colors:[]}},radarPolygons:{fill:{colors:[]}},markers:{colors:[],size:t.markers.size,largestSize:0},animationEnded:!1,isTouchDevice:"ontouchstart"in window||navigator.msMaxTouchPoints,isDirty:!1,isExecCalled:!1,initialConfig:null,initialSeries:[],lastXAxis:[],lastYAxis:[],columnSeries:null,labels:[],timescaleLabels:[],noLabelsProvided:!1,allSeriesCollapsed:!1,collapsedSeries:[],collapsedSeriesIndices:[],ancillaryCollapsedSeries:[],ancillaryCollapsedSeriesIndices:[],risingSeries:[],dataFormatXNumeric:!1,capturedSeriesIndex:-1,capturedDataPointIndex:-1,selectedDataPoints:[],goldenPadding:35,invalidLogScale:!1,ignoreYAxisIndexes:[],yAxisSameScaleIndices:[],maxValsInArrayIndex:0,radialSize:0,selection:void 0,zoomEnabled:"zoom"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.zoom&&t.chart.zoom.enabled,panEnabled:"pan"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.pan,selectionEnabled:"selection"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.selection,yaxis:null,mousedown:!1,lastClientPosition:{},visibleXRange:void 0,yValueDecimal:0,total:0,SVGNS:"http://www.w3.org/2000/svg",svgWidth:0,svgHeight:0,noData:!1,locale:{},dom:{},memory:{methodsToExec:[]},shouldAnimate:!0,skipLastTimelinelabel:!1,skipFirstTimelinelabel:!1,delayedElements:[],axisCharts:!0,isDataXYZ:!1,resized:!1,resizeTimer:null,comboCharts:!1,dataChanged:!1,previousPaths:[],allSeriesHasEqualX:!0,pointsArray:[],dataLabelsRects:[],lastDrawnDataLabelsIndexes:[],hasNullValues:!1,easing:null,zoomed:!1,gridWidth:0,gridHeight:0,rotateXLabels:!1,defaultLabels:!1,xLabelFormatter:void 0,yLabelFormatters:[],xaxisTooltipFormatter:void 0,ttKeyFormatter:void 0,ttVal:void 0,ttZFormatter:void 0,LINE_HEIGHT_RATIO:1.618,xAxisLabelsHeight:0,xAxisGroupLabelsHeight:0,xAxisLabelsWidth:0,yAxisLabelsWidth:0,scaleX:1,scaleY:1,translateX:0,translateY:0,translateYAxisX:[],yAxisWidths:[],translateXAxisY:0,translateXAxisX:0,tooltip:null}}},{key:"init",value:function(t){var e=this.globalVars(t);return this.initGlobalVars(e),e.initialConfig=x.extend({},t),e.initialSeries=x.clone(t.series),e.lastXAxis=x.clone(e.initialConfig.xaxis),e.lastYAxis=x.clone(e.initialConfig.yaxis),e}}]),t}(),F=function(){function t(e){a(this,t),this.opts=e;}return r(t,[{key:"init",value:function(){var t=new E(this.opts).init({responsiveOverride:!1});return {config:t,globals:(new Y).init(t)}}}]),t}(),R=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.opts=null,this.seriesIndex=0;}return r(t,[{key:"clippedImgArea",value:function(t){var e=this.w,i=e.config,a=parseInt(e.globals.gridWidth,10),s=parseInt(e.globals.gridHeight,10),r=a>s?a:s,o=t.image,n=0,l=0;void 0===t.width&&void 0===t.height?void 0!==i.fill.image.width&&void 0!==i.fill.image.height?(n=i.fill.image.width+1,l=i.fill.image.height):(n=r+1,l=r):(n=t.width,l=t.height);var h=document.createElementNS(e.globals.SVGNS,"pattern");m.setAttrs(h,{id:t.patternID,patternUnits:t.patternUnits?t.patternUnits:"userSpaceOnUse",width:n+"px",height:l+"px"});var c=document.createElementNS(e.globals.SVGNS,"image");h.appendChild(c),c.setAttributeNS(window.SVG.xlink,"href",o),m.setAttrs(c,{x:0,y:0,preserveAspectRatio:"none",width:n+"px",height:l+"px"}),c.style.opacity=t.opacity,e.globals.dom.elDefs.node.appendChild(h);}},{key:"getSeriesIndex",value:function(t){var e=this.w,i=e.config.chart.type;return ("bar"===i||"rangeBar"===i)&&e.config.plotOptions.bar.distributed||"heatmap"===i||"treemap"===i?this.seriesIndex=t.seriesNumber:this.seriesIndex=t.seriesNumber%e.globals.series.length,this.seriesIndex}},{key:"fillPath",value:function(t){var e=this.w;this.opts=t;var i,a,s,r=this.w.config;this.seriesIndex=this.getSeriesIndex(t);var o=this.getFillColors()[this.seriesIndex];void 0!==e.globals.seriesColors[this.seriesIndex]&&(o=e.globals.seriesColors[this.seriesIndex]),"function"==typeof o&&(o=o({seriesIndex:this.seriesIndex,dataPointIndex:t.dataPointIndex,value:t.value,w:e}));var n=t.fillType?t.fillType:this.getFillType(this.seriesIndex),l=Array.isArray(r.fill.opacity)?r.fill.opacity[this.seriesIndex]:r.fill.opacity;t.color&&(o=t.color),o||(o="#fff",console.warn("undefined color - ApexCharts"));var h=o;if(-1===o.indexOf("rgb")?o.length<9&&(h=x.hexToRgba(o,l)):o.indexOf("rgba")>-1&&(l=x.getOpacityFromRGBA(o)),t.opacity&&(l=t.opacity),"pattern"===n&&(a=this.handlePatternFill({fillConfig:t.fillConfig,patternFill:a,fillColor:o,fillOpacity:l,defaultColor:h})),"gradient"===n&&(s=this.handleGradientFill({fillConfig:t.fillConfig,fillColor:o,fillOpacity:l,i:this.seriesIndex})),"image"===n){var c=r.fill.image.src,d=t.patternID?t.patternID:"";this.clippedImgArea({opacity:l,image:Array.isArray(c)?t.seriesNumber<c.length?c[t.seriesNumber]:c[0]:c,width:t.width?t.width:void 0,height:t.height?t.height:void 0,patternUnits:t.patternUnits,patternID:"pattern".concat(e.globals.cuid).concat(t.seriesNumber+1).concat(d)}),i="url(#pattern".concat(e.globals.cuid).concat(t.seriesNumber+1).concat(d,")");}else i="gradient"===n?s:"pattern"===n?a:h;return t.solid&&(i=h),i}},{key:"getFillType",value:function(t){var e=this.w;return Array.isArray(e.config.fill.type)?e.config.fill.type[t]:e.config.fill.type}},{key:"getFillColors",value:function(){var t=this.w,e=t.config,i=this.opts,a=[];return t.globals.comboCharts?"line"===t.config.series[this.seriesIndex].type?Array.isArray(t.globals.stroke.colors)?a=t.globals.stroke.colors:a.push(t.globals.stroke.colors):Array.isArray(t.globals.fill.colors)?a=t.globals.fill.colors:a.push(t.globals.fill.colors):"line"===e.chart.type?Array.isArray(t.globals.stroke.colors)?a=t.globals.stroke.colors:a.push(t.globals.stroke.colors):Array.isArray(t.globals.fill.colors)?a=t.globals.fill.colors:a.push(t.globals.fill.colors),void 0!==i.fillColors&&(a=[],Array.isArray(i.fillColors)?a=i.fillColors.slice():a.push(i.fillColors)),a}},{key:"handlePatternFill",value:function(t){var e=t.fillConfig,i=t.patternFill,a=t.fillColor,s=t.fillOpacity,r=t.defaultColor,o=this.w.config.fill;e&&(o=e);var n=this.opts,l=new m(this.ctx),h=Array.isArray(o.pattern.strokeWidth)?o.pattern.strokeWidth[this.seriesIndex]:o.pattern.strokeWidth,c=a;Array.isArray(o.pattern.style)?i=void 0!==o.pattern.style[n.seriesNumber]?l.drawPattern(o.pattern.style[n.seriesNumber],o.pattern.width,o.pattern.height,c,h,s):r:i=l.drawPattern(o.pattern.style,o.pattern.width,o.pattern.height,c,h,s);return i}},{key:"handleGradientFill",value:function(t){var i=t.fillColor,a=t.fillOpacity,s=t.fillConfig,r=t.i,o=this.w.config.fill;s&&(o=e(e({},o),s));var n,l=this.opts,h=new m(this.ctx),c=new x,d=o.gradient.type,g=i,u=void 0===o.gradient.opacityFrom?a:Array.isArray(o.gradient.opacityFrom)?o.gradient.opacityFrom[r]:o.gradient.opacityFrom;g.indexOf("rgba")>-1&&(u=x.getOpacityFromRGBA(g));var p=void 0===o.gradient.opacityTo?a:Array.isArray(o.gradient.opacityTo)?o.gradient.opacityTo[r]:o.gradient.opacityTo;if(void 0===o.gradient.gradientToColors||0===o.gradient.gradientToColors.length)n="dark"===o.gradient.shade?c.shadeColor(-1*parseFloat(o.gradient.shadeIntensity),i.indexOf("rgb")>-1?x.rgb2hex(i):i):c.shadeColor(parseFloat(o.gradient.shadeIntensity),i.indexOf("rgb")>-1?x.rgb2hex(i):i);else if(o.gradient.gradientToColors[l.seriesNumber]){var f=o.gradient.gradientToColors[l.seriesNumber];n=f,f.indexOf("rgba")>-1&&(p=x.getOpacityFromRGBA(f));}else n=i;if(o.gradient.gradientFrom&&(g=o.gradient.gradientFrom),o.gradient.gradientTo&&(n=o.gradient.gradientTo),o.gradient.inverseColors){var b=g;g=n,n=b;}return g.indexOf("rgb")>-1&&(g=x.rgb2hex(g)),n.indexOf("rgb")>-1&&(n=x.rgb2hex(n)),h.drawGradient(d,g,n,u,p,l.size,o.gradient.stops,o.gradient.colorStops,r)}}]),t}(),H=function(){function t(e,i){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"setGlobalMarkerSize",value:function(){var t=this.w;if(t.globals.markers.size=Array.isArray(t.config.markers.size)?t.config.markers.size:[t.config.markers.size],t.globals.markers.size.length>0){if(t.globals.markers.size.length<t.globals.series.length+1)for(var e=0;e<=t.globals.series.length;e++)void 0===t.globals.markers.size[e]&&t.globals.markers.size.push(t.globals.markers.size[0]);}else t.globals.markers.size=t.config.series.map((function(e){return t.config.markers.size}));}},{key:"plotChartMarkers",value:function(t,e,i,a){var s,r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=this.w,n=e,l=t,h=null,c=new m(this.ctx),d=o.config.markers.discrete&&o.config.markers.discrete.length;if((o.globals.markers.size[e]>0||r||d)&&(h=c.group({class:r||d?"":"apexcharts-series-markers"})).attr("clip-path","url(#gridRectMarkerMask".concat(o.globals.cuid,")")),Array.isArray(l.x))for(var g=0;g<l.x.length;g++){var u=i;1===i&&0===g&&(u=0),1===i&&1===g&&(u=1);var p="apexcharts-marker";if("line"!==o.config.chart.type&&"area"!==o.config.chart.type||o.globals.comboCharts||o.config.tooltip.intersect||(p+=" no-pointer-events"),(Array.isArray(o.config.markers.size)?o.globals.markers.size[e]>0:o.config.markers.size>0)||r||d){x.isNumber(l.y[g])?p+=" w".concat(x.randomId()):p="apexcharts-nullpoint";var f=this.getMarkerConfig({cssClass:p,seriesIndex:e,dataPointIndex:u});o.config.series[n].data[u]&&(o.config.series[n].data[u].fillColor&&(f.pointFillColor=o.config.series[n].data[u].fillColor),o.config.series[n].data[u].strokeColor&&(f.pointStrokeColor=o.config.series[n].data[u].strokeColor)),a&&(f.pSize=a),(l.x[g]<0||l.x[g]>o.globals.gridWidth||l.y[g]<-o.globals.markers.largestSize||l.y[g]>o.globals.gridHeight+o.globals.markers.largestSize)&&(f.pSize=0),(s=c.drawMarker(l.x[g],l.y[g],f)).attr("rel",u),s.attr("j",u),s.attr("index",e),s.node.setAttribute("default-marker-size",f.pSize),new v(this.ctx).setSelectionFilter(s,e,u),this.addEvents(s),h&&h.add(s);}else void 0===o.globals.pointsArray[e]&&(o.globals.pointsArray[e]=[]),o.globals.pointsArray[e].push([l.x[g],l.y[g]]);}return h}},{key:"getMarkerConfig",value:function(t){var e=t.cssClass,i=t.seriesIndex,a=t.dataPointIndex,s=void 0===a?null:a,r=t.finishRadius,o=void 0===r?null:r,n=this.w,l=this.getMarkerStyle(i),h=n.globals.markers.size[i],c=n.config.markers;return null!==s&&c.discrete.length&&c.discrete.map((function(t){t.seriesIndex===i&&t.dataPointIndex===s&&(l.pointStrokeColor=t.strokeColor,l.pointFillColor=t.fillColor,h=t.size,l.pointShape=t.shape);})),{pSize:null===o?h:o,pRadius:c.radius,width:Array.isArray(c.width)?c.width[i]:c.width,height:Array.isArray(c.height)?c.height[i]:c.height,pointStrokeWidth:Array.isArray(c.strokeWidth)?c.strokeWidth[i]:c.strokeWidth,pointStrokeColor:l.pointStrokeColor,pointFillColor:l.pointFillColor,shape:l.pointShape||(Array.isArray(c.shape)?c.shape[i]:c.shape),class:e,pointStrokeOpacity:Array.isArray(c.strokeOpacity)?c.strokeOpacity[i]:c.strokeOpacity,pointStrokeDashArray:Array.isArray(c.strokeDashArray)?c.strokeDashArray[i]:c.strokeDashArray,pointFillOpacity:Array.isArray(c.fillOpacity)?c.fillOpacity[i]:c.fillOpacity,seriesIndex:i}}},{key:"addEvents",value:function(t){var e=this.w,i=new m(this.ctx);t.node.addEventListener("mouseenter",i.pathMouseEnter.bind(this.ctx,t)),t.node.addEventListener("mouseleave",i.pathMouseLeave.bind(this.ctx,t)),t.node.addEventListener("mousedown",i.pathMouseDown.bind(this.ctx,t)),t.node.addEventListener("click",e.config.markers.onClick),t.node.addEventListener("dblclick",e.config.markers.onDblClick),t.node.addEventListener("touchstart",i.pathMouseDown.bind(this.ctx,t),{passive:!0});}},{key:"getMarkerStyle",value:function(t){var e=this.w,i=e.globals.markers.colors,a=e.config.markers.strokeColor||e.config.markers.strokeColors;return {pointStrokeColor:Array.isArray(a)?a[t]:a,pointFillColor:Array.isArray(i)?i[t]:i}}}]),t}(),D=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled;}return r(t,[{key:"draw",value:function(t,e,i){var a=this.w,s=new m(this.ctx),r=i.realIndex,o=i.pointsPos,n=i.zRatio,l=i.elParent,h=s.group({class:"apexcharts-series-markers apexcharts-series-".concat(a.config.chart.type)});if(h.attr("clip-path","url(#gridRectMarkerMask".concat(a.globals.cuid,")")),Array.isArray(o.x))for(var c=0;c<o.x.length;c++){var d=e+1,g=!0;0===e&&0===c&&(d=0),0===e&&1===c&&(d=1);var u=0,p=a.globals.markers.size[r];if(n!==1/0){var f=a.config.plotOptions.bubble;p=a.globals.seriesZ[r][d],f.zScaling&&(p/=n),f.minBubbleRadius&&p<f.minBubbleRadius&&(p=f.minBubbleRadius),f.maxBubbleRadius&&p>f.maxBubbleRadius&&(p=f.maxBubbleRadius);}a.config.chart.animations.enabled||(u=p);var x=o.x[c],b=o.y[c];if(u=u||0,null!==b&&void 0!==a.globals.series[r][d]||(g=!1),g){var v=this.drawPoint(x,b,u,p,r,d,e);h.add(v);}l.add(h);}}},{key:"drawPoint",value:function(t,e,i,a,s,r,o){var n=this.w,l=s,h=new b(this.ctx),c=new v(this.ctx),d=new R(this.ctx),g=new H(this.ctx),u=new m(this.ctx),p=g.getMarkerConfig({cssClass:"apexcharts-marker",seriesIndex:l,dataPointIndex:r,finishRadius:"bubble"===n.config.chart.type||n.globals.comboCharts&&n.config.series[s]&&"bubble"===n.config.series[s].type?a:null});a=p.pSize;var f,x=d.fillPath({seriesNumber:s,dataPointIndex:r,color:p.pointFillColor,patternUnits:"objectBoundingBox",value:n.globals.series[s][o]});if("circle"===p.shape?f=u.drawCircle(i):"square"!==p.shape&&"rect"!==p.shape||(f=u.drawRect(0,0,p.width-p.pointStrokeWidth/2,p.height-p.pointStrokeWidth/2,p.pRadius)),n.config.series[l].data[r]&&n.config.series[l].data[r].fillColor&&(x=n.config.series[l].data[r].fillColor),f.attr({x:t-p.width/2-p.pointStrokeWidth/2,y:e-p.height/2-p.pointStrokeWidth/2,cx:t,cy:e,fill:x,"fill-opacity":p.pointFillOpacity,stroke:p.pointStrokeColor,r:a,"stroke-width":p.pointStrokeWidth,"stroke-dasharray":p.pointStrokeDashArray,"stroke-opacity":p.pointStrokeOpacity}),n.config.chart.dropShadow.enabled){var y=n.config.chart.dropShadow;c.dropShadow(f,y,s);}if(!this.initialAnim||n.globals.dataChanged||n.globals.resized)n.globals.animationEnded=!0;else {var w=n.config.chart.animations.speed;h.animateMarker(f,0,"circle"===p.shape?a:{width:p.width,height:p.height},w,n.globals.easing,(function(){window.setTimeout((function(){h.animationCompleted(f);}),100);}));}if(n.globals.dataChanged&&"circle"===p.shape)if(this.dynamicAnim){var k,A,S,C,L=n.config.chart.animations.dynamicAnimation.speed;null!=(C=n.globals.previousPaths[s]&&n.globals.previousPaths[s][o])&&(k=C.x,A=C.y,S=void 0!==C.r?C.r:a);for(var P=0;P<n.globals.collapsedSeries.length;P++)n.globals.collapsedSeries[P].index===s&&(L=1,a=0);0===t&&0===e&&(a=0),h.animateCircle(f,{cx:k,cy:A,r:S},{cx:t,cy:e,r:a},L,n.globals.easing);}else f.attr({r:a});return f.attr({rel:r,j:r,index:s,"default-marker-size":a}),c.setSelectionFilter(f,s,r),g.addEvents(f),f.node.classList.add("apexcharts-marker"),f}},{key:"centerTextInBubble",value:function(t){var e=this.w;return {y:t+=parseInt(e.config.dataLabels.style.fontSize,10)/4}}}]),t}(),O=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"dataLabelsCorrection",value:function(t,e,i,a,s,r,o){var n=this.w,l=!1,h=new m(this.ctx).getTextRects(i,o),c=h.width,d=h.height;e<0&&(e=0),e>n.globals.gridHeight+d&&(e=n.globals.gridHeight+d/2),void 0===n.globals.dataLabelsRects[a]&&(n.globals.dataLabelsRects[a]=[]),n.globals.dataLabelsRects[a].push({x:t,y:e,width:c,height:d});var g=n.globals.dataLabelsRects[a].length-2,u=void 0!==n.globals.lastDrawnDataLabelsIndexes[a]?n.globals.lastDrawnDataLabelsIndexes[a][n.globals.lastDrawnDataLabelsIndexes[a].length-1]:0;if(void 0!==n.globals.dataLabelsRects[a][g]){var p=n.globals.dataLabelsRects[a][u];(t>p.x+p.width||e>p.y+p.height||e+d<p.y||t+c<p.x)&&(l=!0);}return (0===s||r)&&(l=!0),{x:t,y:e,textRects:h,drawnextLabel:l}}},{key:"drawDataLabel",value:function(t){var e=this,i=t.type,a=t.pos,s=t.i,r=t.j,o=t.isRangeStart,n=t.strokeWidth,l=void 0===n?2:n,h=this.w,c=new m(this.ctx),d=h.config.dataLabels,g=0,u=0,p=r,f=null;if(!d.enabled||!Array.isArray(a.x))return f;f=c.group({class:"apexcharts-data-labels"});for(var x=0;x<a.x.length;x++)if(g=a.x[x]+d.offsetX,u=a.y[x]+d.offsetY+l,!isNaN(g)){1===r&&0===x&&(p=0),1===r&&1===x&&(p=1);var b=h.globals.series[s][p];"rangeArea"===i&&(b=o?h.globals.seriesRangeStart[s][p]:h.globals.seriesRangeEnd[s][p]);var v="",y=function(t){return h.config.dataLabels.formatter(t,{ctx:e.ctx,seriesIndex:s,dataPointIndex:p,w:h})};if("bubble"===h.config.chart.type)v=y(b=h.globals.seriesZ[s][p]),u=a.y[x],u=new D(this.ctx).centerTextInBubble(u,s,p).y;else void 0!==b&&(v=y(b));this.plotDataLabelsText({x:g,y:u,text:v,i:s,j:p,parent:f,offsetCorrection:!0,dataLabelsConfig:h.config.dataLabels});}return f}},{key:"plotDataLabelsText",value:function(t){var e=this.w,i=new m(this.ctx),a=t.x,s=t.y,r=t.i,o=t.j,n=t.text,l=t.textAnchor,h=t.fontSize,c=t.parent,d=t.dataLabelsConfig,g=t.color,u=t.alwaysDrawDataLabel,p=t.offsetCorrection;if(!(Array.isArray(e.config.dataLabels.enabledOnSeries)&&e.config.dataLabels.enabledOnSeries.indexOf(r)<0)){var f={x:a,y:s,drawnextLabel:!0,textRects:null};p&&(f=this.dataLabelsCorrection(a,s,n,r,o,u,parseInt(d.style.fontSize,10))),e.globals.zoomed||(a=f.x,s=f.y),f.textRects&&(a<-10-f.textRects.width||a>e.globals.gridWidth+f.textRects.width+10)&&(n="");var x=e.globals.dataLabels.style.colors[r];(("bar"===e.config.chart.type||"rangeBar"===e.config.chart.type)&&e.config.plotOptions.bar.distributed||e.config.dataLabels.distributed)&&(x=e.globals.dataLabels.style.colors[o]),"function"==typeof x&&(x=x({series:e.globals.series,seriesIndex:r,dataPointIndex:o,w:e})),g&&(x=g);var b=d.offsetX,y=d.offsetY;if("bar"!==e.config.chart.type&&"rangeBar"!==e.config.chart.type||(b=0,y=0),f.drawnextLabel){var w=i.drawText({width:100,height:parseInt(d.style.fontSize,10),x:a+b,y:s+y,foreColor:x,textAnchor:l||d.textAnchor,text:n,fontSize:h||d.style.fontSize,fontFamily:d.style.fontFamily,fontWeight:d.style.fontWeight||"normal"});if(w.attr({class:"apexcharts-datalabel",cx:a,cy:s}),d.dropShadow.enabled){var k=d.dropShadow;new v(this.ctx).dropShadow(w,k);}c.add(w),void 0===e.globals.lastDrawnDataLabelsIndexes[r]&&(e.globals.lastDrawnDataLabelsIndexes[r]=[]),e.globals.lastDrawnDataLabelsIndexes[r].push(o);}}}},{key:"addBackgroundToDataLabel",value:function(t,e){var i=this.w,a=i.config.dataLabels.background,s=a.padding,r=a.padding/2,o=e.width,n=e.height,l=new m(this.ctx).drawRect(e.x-s,e.y-r/2,o+2*s,n+r,a.borderRadius,"transparent"===i.config.chart.background?"#fff":i.config.chart.background,a.opacity,a.borderWidth,a.borderColor);a.dropShadow.enabled&&new v(this.ctx).dropShadow(l,a.dropShadow);return l}},{key:"dataLabelsBackground",value:function(){var t=this.w;if("bubble"!==t.config.chart.type)for(var e=t.globals.dom.baseEl.querySelectorAll(".apexcharts-datalabels text"),i=0;i<e.length;i++){var a=e[i],s=a.getBBox(),r=null;if(s.width&&s.height&&(r=this.addBackgroundToDataLabel(a,s)),r){a.parentNode.insertBefore(r.node,a);var o=a.getAttribute("fill");t.config.chart.animations.enabled&&!t.globals.resized&&!t.globals.dataChanged?r.animate().attr({fill:o}):r.attr({fill:o}),a.setAttribute("fill",t.config.dataLabels.background.foreColor);}}}},{key:"bringForward",value:function(){for(var t=this.w,e=t.globals.dom.baseEl.querySelectorAll(".apexcharts-datalabels"),i=t.globals.dom.baseEl.querySelector(".apexcharts-plot-series:last-child"),a=0;a<e.length;a++)i&&i.insertBefore(e[a],i.nextSibling);}}]),t}(),N=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.legendInactiveClass="legend-mouseover-inactive";}return r(t,[{key:"getAllSeriesEls",value:function(){return this.w.globals.dom.baseEl.getElementsByClassName("apexcharts-series")}},{key:"getSeriesByName",value:function(t){return this.w.globals.dom.baseEl.querySelector(".apexcharts-inner .apexcharts-series[seriesName='".concat(x.escapeString(t),"']"))}},{key:"isSeriesHidden",value:function(t){var e=this.getSeriesByName(t),i=parseInt(e.getAttribute("data:realIndex"),10);return {isHidden:e.classList.contains("apexcharts-series-collapsed"),realIndex:i}}},{key:"addCollapsedClassToSeries",value:function(t,e){var i=this.w;function a(i){for(var a=0;a<i.length;a++)i[a].index===e&&t.node.classList.add("apexcharts-series-collapsed");}a(i.globals.collapsedSeries),a(i.globals.ancillaryCollapsedSeries);}},{key:"toggleSeries",value:function(t){var e=this.isSeriesHidden(t);return this.ctx.legend.legendHelpers.toggleDataSeries(e.realIndex,e.isHidden),e.isHidden}},{key:"showSeries",value:function(t){var e=this.isSeriesHidden(t);e.isHidden&&this.ctx.legend.legendHelpers.toggleDataSeries(e.realIndex,!0);}},{key:"hideSeries",value:function(t){var e=this.isSeriesHidden(t);e.isHidden||this.ctx.legend.legendHelpers.toggleDataSeries(e.realIndex,!1);}},{key:"resetSeries",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=this.w,s=x.clone(a.globals.initialSeries);a.globals.previousPaths=[],i?(a.globals.collapsedSeries=[],a.globals.ancillaryCollapsedSeries=[],a.globals.collapsedSeriesIndices=[],a.globals.ancillaryCollapsedSeriesIndices=[]):s=this.emptyCollapsedSeries(s),a.config.series=s,t&&(e&&(a.globals.zoomed=!1,this.ctx.updateHelpers.revertDefaultAxisMinMax()),this.ctx.updateHelpers._updateSeries(s,a.config.chart.animations.dynamicAnimation.enabled));}},{key:"emptyCollapsedSeries",value:function(t){for(var e=this.w,i=0;i<t.length;i++)e.globals.collapsedSeriesIndices.indexOf(i)>-1&&(t[i].data=[]);return t}},{key:"toggleSeriesOnHover",value:function(t,e){var i=this.w;e||(e=t.target);var a=i.globals.dom.baseEl.querySelectorAll(".apexcharts-series, .apexcharts-datalabels");if("mousemove"===t.type){var s=parseInt(e.getAttribute("rel"),10)-1,r=null,o=null;i.globals.axisCharts||"radialBar"===i.config.chart.type?i.globals.axisCharts?(r=i.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(s,"']")),o=i.globals.dom.baseEl.querySelector(".apexcharts-datalabels[data\\:realIndex='".concat(s,"']"))):r=i.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(s+1,"']")):r=i.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(s+1,"'] path"));for(var n=0;n<a.length;n++)a[n].classList.add(this.legendInactiveClass);null!==r&&(i.globals.axisCharts||r.parentNode.classList.remove(this.legendInactiveClass),r.classList.remove(this.legendInactiveClass),null!==o&&o.classList.remove(this.legendInactiveClass));}else if("mouseout"===t.type)for(var l=0;l<a.length;l++)a[l].classList.remove(this.legendInactiveClass);}},{key:"highlightRangeInSeries",value:function(t,e){var i=this,a=this.w,s=a.globals.dom.baseEl.getElementsByClassName("apexcharts-heatmap-rect"),r=function(t){for(var e=0;e<s.length;e++)s[e].classList[t](i.legendInactiveClass);};if("mousemove"===t.type){var o=parseInt(e.getAttribute("rel"),10)-1;r("add"),function(t){for(var e=0;e<s.length;e++){var a=parseInt(s[e].getAttribute("val"),10);a>=t.from&&a<=t.to&&s[e].classList.remove(i.legendInactiveClass);}}(a.config.plotOptions.heatmap.colorScale.ranges[o]);}else "mouseout"===t.type&&r("remove");}},{key:"getActiveConfigSeriesIndex",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"asc",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=this.w,a=0;if(i.config.series.length>1)for(var s=i.config.series.map((function(t,a){return t.data&&t.data.length>0&&-1===i.globals.collapsedSeriesIndices.indexOf(a)&&(!i.globals.comboCharts||0===e.length||e.length&&e.indexOf(i.config.series[a].type)>-1)?a:-1})),r="asc"===t?0:s.length-1;"asc"===t?r<s.length:r>=0;"asc"===t?r++:r--)if(-1!==s[r]){a=s[r];break}return a}},{key:"getBarSeriesIndices",value:function(){return this.w.globals.comboCharts?this.w.config.series.map((function(t,e){return "bar"===t.type||"column"===t.type?e:-1})).filter((function(t){return -1!==t})):this.w.config.series.map((function(t,e){return e}))}},{key:"getPreviousPaths",value:function(){var t=this.w;function e(e,i,a){for(var s=e[i].childNodes,r={type:a,paths:[],realIndex:e[i].getAttribute("data:realIndex")},o=0;o<s.length;o++)if(s[o].hasAttribute("pathTo")){var n=s[o].getAttribute("pathTo");r.paths.push({d:n});}t.globals.previousPaths.push(r);}t.globals.previousPaths=[];["line","area","bar","rangebar","rangeArea","candlestick","radar"].forEach((function(i){for(var a,s=(a=i,t.globals.dom.baseEl.querySelectorAll(".apexcharts-".concat(a,"-series .apexcharts-series"))),r=0;r<s.length;r++)e(s,r,i);})),this.handlePrevBubbleScatterPaths("bubble"),this.handlePrevBubbleScatterPaths("scatter");var i=t.globals.dom.baseEl.querySelectorAll(".apexcharts-".concat(t.config.chart.type," .apexcharts-series"));if(i.length>0)for(var a=function(e){for(var i=t.globals.dom.baseEl.querySelectorAll(".apexcharts-".concat(t.config.chart.type," .apexcharts-series[data\\:realIndex='").concat(e,"'] rect")),a=[],s=function(t){var e=function(e){return i[t].getAttribute(e)},s={x:parseFloat(e("x")),y:parseFloat(e("y")),width:parseFloat(e("width")),height:parseFloat(e("height"))};a.push({rect:s,color:i[t].getAttribute("color")});},r=0;r<i.length;r++)s(r);t.globals.previousPaths.push(a);},s=0;s<i.length;s++)a(s);t.globals.axisCharts||(t.globals.previousPaths=t.globals.series);}},{key:"handlePrevBubbleScatterPaths",value:function(t){var e=this.w,i=e.globals.dom.baseEl.querySelectorAll(".apexcharts-".concat(t,"-series .apexcharts-series"));if(i.length>0)for(var a=0;a<i.length;a++){for(var s=e.globals.dom.baseEl.querySelectorAll(".apexcharts-".concat(t,"-series .apexcharts-series[data\\:realIndex='").concat(a,"'] circle")),r=[],o=0;o<s.length;o++)r.push({x:s[o].getAttribute("cx"),y:s[o].getAttribute("cy"),r:s[o].getAttribute("r")});e.globals.previousPaths.push(r);}}},{key:"clearPreviousPaths",value:function(){var t=this.w;t.globals.previousPaths=[],t.globals.allSeriesCollapsed=!1;}},{key:"handleNoData",value:function(){var t=this.w,e=t.config.noData,i=new m(this.ctx),a=t.globals.svgWidth/2,s=t.globals.svgHeight/2,r="middle";if(t.globals.noData=!0,t.globals.animationEnded=!0,"left"===e.align?(a=10,r="start"):"right"===e.align&&(a=t.globals.svgWidth-10,r="end"),"top"===e.verticalAlign?s=50:"bottom"===e.verticalAlign&&(s=t.globals.svgHeight-50),a+=e.offsetX,s=s+parseInt(e.style.fontSize,10)+2+e.offsetY,void 0!==e.text&&""!==e.text){var o=i.drawText({x:a,y:s,text:e.text,textAnchor:r,fontSize:e.style.fontSize,fontFamily:e.style.fontFamily,foreColor:e.style.color,opacity:1,class:"apexcharts-text-nodata"});t.globals.dom.Paper.add(o);}}},{key:"setNullSeriesToZeroValues",value:function(t){for(var e=this.w,i=0;i<t.length;i++)if(0===t[i].length)for(var a=0;a<t[e.globals.maxValsInArrayIndex].length;a++)t[i].push(0);return t}},{key:"hasAllSeriesEqualX",value:function(){for(var t=!0,e=this.w,i=this.filteredSeriesX(),a=0;a<i.length-1;a++)if(i[a][0]!==i[a+1][0]){t=!1;break}return e.globals.allSeriesHasEqualX=t,t}},{key:"filteredSeriesX",value:function(){var t=this.w.globals.seriesX.map((function(t){return t.length>0?t:[]}));return t}}]),t}(),W=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.twoDSeries=[],this.threeDSeries=[],this.twoDSeriesX=[],this.seriesGoals=[],this.coreUtils=new y(this.ctx);}return r(t,[{key:"isMultiFormat",value:function(){return this.isFormatXY()||this.isFormat2DArray()}},{key:"isFormatXY",value:function(){var t=this.w.config.series.slice(),e=new N(this.ctx);if(this.activeSeriesIndex=e.getActiveConfigSeriesIndex(),void 0!==t[this.activeSeriesIndex].data&&t[this.activeSeriesIndex].data.length>0&&null!==t[this.activeSeriesIndex].data[0]&&void 0!==t[this.activeSeriesIndex].data[0].x&&null!==t[this.activeSeriesIndex].data[0])return !0}},{key:"isFormat2DArray",value:function(){var t=this.w.config.series.slice(),e=new N(this.ctx);if(this.activeSeriesIndex=e.getActiveConfigSeriesIndex(),void 0!==t[this.activeSeriesIndex].data&&t[this.activeSeriesIndex].data.length>0&&void 0!==t[this.activeSeriesIndex].data[0]&&null!==t[this.activeSeriesIndex].data[0]&&t[this.activeSeriesIndex].data[0].constructor===Array)return !0}},{key:"handleFormat2DArray",value:function(t,e){for(var i=this.w.config,a=this.w.globals,s="boxPlot"===i.chart.type||"boxPlot"===i.series[e].type,r=0;r<t[e].data.length;r++)if(void 0!==t[e].data[r][1]&&(Array.isArray(t[e].data[r][1])&&4===t[e].data[r][1].length&&!s?this.twoDSeries.push(x.parseNumber(t[e].data[r][1][3])):t[e].data[r].length>=5?this.twoDSeries.push(x.parseNumber(t[e].data[r][4])):this.twoDSeries.push(x.parseNumber(t[e].data[r][1])),a.dataFormatXNumeric=!0),"datetime"===i.xaxis.type){var o=new Date(t[e].data[r][0]);o=new Date(o).getTime(),this.twoDSeriesX.push(o);}else this.twoDSeriesX.push(t[e].data[r][0]);for(var n=0;n<t[e].data.length;n++)void 0!==t[e].data[n][2]&&(this.threeDSeries.push(t[e].data[n][2]),a.isDataXYZ=!0);}},{key:"handleFormatXY",value:function(t,e){var i=this.w.config,a=this.w.globals,s=new I(this.ctx),r=e;a.collapsedSeriesIndices.indexOf(e)>-1&&(r=this.activeSeriesIndex);for(var o=0;o<t[e].data.length;o++)void 0!==t[e].data[o].y&&(Array.isArray(t[e].data[o].y)?this.twoDSeries.push(x.parseNumber(t[e].data[o].y[t[e].data[o].y.length-1])):this.twoDSeries.push(x.parseNumber(t[e].data[o].y))),void 0!==t[e].data[o].goals&&Array.isArray(t[e].data[o].goals)?(void 0===this.seriesGoals[e]&&(this.seriesGoals[e]=[]),this.seriesGoals[e].push(t[e].data[o].goals)):(void 0===this.seriesGoals[e]&&(this.seriesGoals[e]=[]),this.seriesGoals[e].push(null));for(var n=0;n<t[r].data.length;n++){var l="string"==typeof t[r].data[n].x,h=Array.isArray(t[r].data[n].x),c=!h&&!!s.isValidDate(t[r].data[n].x.toString());if(l||c)if(l||i.xaxis.convertedCatToNumeric){var d=a.isBarHorizontal&&a.isRangeData;"datetime"!==i.xaxis.type||d?(this.fallbackToCategory=!0,this.twoDSeriesX.push(t[r].data[n].x),isNaN(t[r].data[n].x)||"category"===this.w.config.xaxis.type||"string"==typeof t[r].data[n].x||(a.isXNumeric=!0)):this.twoDSeriesX.push(s.parseDate(t[r].data[n].x));}else "datetime"===i.xaxis.type?this.twoDSeriesX.push(s.parseDate(t[r].data[n].x.toString())):(a.dataFormatXNumeric=!0,a.isXNumeric=!0,this.twoDSeriesX.push(parseFloat(t[r].data[n].x)));else h?(this.fallbackToCategory=!0,this.twoDSeriesX.push(t[r].data[n].x)):(a.isXNumeric=!0,a.dataFormatXNumeric=!0,this.twoDSeriesX.push(t[r].data[n].x));}if(t[e].data[0]&&void 0!==t[e].data[0].z){for(var g=0;g<t[e].data.length;g++)this.threeDSeries.push(t[e].data[g].z);a.isDataXYZ=!0;}}},{key:"handleRangeData",value:function(t,e){var i=this.w.globals,a={};return this.isFormat2DArray()?a=this.handleRangeDataFormat("array",t,e):this.isFormatXY()&&(a=this.handleRangeDataFormat("xy",t,e)),i.seriesRangeStart.push(a.start),i.seriesRangeEnd.push(a.end),i.seriesRange.push(a.rangeUniques),i.seriesRange.forEach((function(t,e){t&&t.forEach((function(t,e){t.y.forEach((function(e,i){for(var a=0;a<t.y.length;a++)if(i!==a){var s=e.y1,r=e.y2,o=t.y[a].y1;s<=t.y[a].y2&&o<=r&&(t.overlaps.indexOf(e.rangeName)<0&&t.overlaps.push(e.rangeName),t.overlaps.indexOf(t.y[a].rangeName)<0&&t.overlaps.push(t.y[a].rangeName));}}));}));})),a}},{key:"handleCandleStickBoxData",value:function(t,e){var i=this.w.globals,a={};return this.isFormat2DArray()?a=this.handleCandleStickBoxDataFormat("array",t,e):this.isFormatXY()&&(a=this.handleCandleStickBoxDataFormat("xy",t,e)),i.seriesCandleO[e]=a.o,i.seriesCandleH[e]=a.h,i.seriesCandleM[e]=a.m,i.seriesCandleL[e]=a.l,i.seriesCandleC[e]=a.c,a}},{key:"handleRangeDataFormat",value:function(t,e,i){var a=[],s=[],r=e[i].data.filter((function(t,e,i){return e===i.findIndex((function(e){return e.x===t.x}))})).map((function(t,e){return {x:t.x,overlaps:[],y:[]}}));if("array"===t)for(var o=0;o<e[i].data.length;o++)Array.isArray(e[i].data[o])?(a.push(e[i].data[o][1][0]),s.push(e[i].data[o][1][1])):(a.push(e[i].data[o]),s.push(e[i].data[o]));else if("xy"===t)for(var n=function(t){var o=Array.isArray(e[i].data[t].y),n=x.randomId(),l=e[i].data[t].x,h={y1:o?e[i].data[t].y[0]:e[i].data[t].y,y2:o?e[i].data[t].y[1]:e[i].data[t].y,rangeName:n};e[i].data[t].rangeName=n;var c=r.findIndex((function(t){return t.x===l}));r[c].y.push(h),a.push(h.y1),s.push(h.y2);},l=0;l<e[i].data.length;l++)n(l);return {start:a,end:s,rangeUniques:r}}},{key:"handleCandleStickBoxDataFormat",value:function(t,e,i){var a=this.w,s="boxPlot"===a.config.chart.type||"boxPlot"===a.config.series[i].type,r=[],o=[],n=[],l=[],h=[];if("array"===t)if(s&&6===e[i].data[0].length||!s&&5===e[i].data[0].length)for(var c=0;c<e[i].data.length;c++)r.push(e[i].data[c][1]),o.push(e[i].data[c][2]),s?(n.push(e[i].data[c][3]),l.push(e[i].data[c][4]),h.push(e[i].data[c][5])):(l.push(e[i].data[c][3]),h.push(e[i].data[c][4]));else for(var d=0;d<e[i].data.length;d++)Array.isArray(e[i].data[d][1])&&(r.push(e[i].data[d][1][0]),o.push(e[i].data[d][1][1]),s?(n.push(e[i].data[d][1][2]),l.push(e[i].data[d][1][3]),h.push(e[i].data[d][1][4])):(l.push(e[i].data[d][1][2]),h.push(e[i].data[d][1][3])));else if("xy"===t)for(var g=0;g<e[i].data.length;g++)Array.isArray(e[i].data[g].y)&&(r.push(e[i].data[g].y[0]),o.push(e[i].data[g].y[1]),s?(n.push(e[i].data[g].y[2]),l.push(e[i].data[g].y[3]),h.push(e[i].data[g].y[4])):(l.push(e[i].data[g].y[2]),h.push(e[i].data[g].y[3])));return {o:r,h:o,m:n,l:l,c:h}}},{key:"parseDataAxisCharts",value:function(t){var e,i=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.ctx,s=this.w.config,r=this.w.globals,o=new I(a),n=s.labels.length>0?s.labels.slice():s.xaxis.categories.slice();if(r.isRangeBar="rangeBar"===s.chart.type&&r.isBarHorizontal,r.hasXaxisGroups="category"===s.xaxis.type&&s.xaxis.group.groups.length>0,r.hasXaxisGroups&&(r.groups=s.xaxis.group.groups),r.hasSeriesGroups=null===(e=t[0])||void 0===e?void 0:e.group,r.hasSeriesGroups){var l=[],h=u(new Set(t.map((function(t){return t.group}))));t.forEach((function(t,e){var i=h.indexOf(t.group);l[i]||(l[i]=[]),l[i].push(t.name);})),r.seriesGroups=l;}for(var c=function(){for(var t=0;t<n.length;t++)if("string"==typeof n[t]){if(!o.isValidDate(n[t]))throw new Error("You have provided invalid Date format. Please provide a valid JavaScript Date");i.twoDSeriesX.push(o.parseDate(n[t]));}else i.twoDSeriesX.push(n[t]);},d=0;d<t.length;d++){if(this.twoDSeries=[],this.twoDSeriesX=[],this.threeDSeries=[],void 0===t[d].data)return void console.error("It is a possibility that you may have not included 'data' property in series.");if("rangeBar"!==s.chart.type&&"rangeArea"!==s.chart.type&&"rangeBar"!==t[d].type&&"rangeArea"!==t[d].type||(r.isRangeData=!0,r.isComboCharts?"rangeBar"!==t[d].type&&"rangeArea"!==t[d].type||this.handleRangeData(t,d):"rangeBar"!==s.chart.type&&"rangeArea"!==s.chart.type||this.handleRangeData(t,d)),this.isMultiFormat())this.isFormat2DArray()?this.handleFormat2DArray(t,d):this.isFormatXY()&&this.handleFormatXY(t,d),"candlestick"!==s.chart.type&&"candlestick"!==t[d].type&&"boxPlot"!==s.chart.type&&"boxPlot"!==t[d].type||this.handleCandleStickBoxData(t,d),r.series.push(this.twoDSeries),r.labels.push(this.twoDSeriesX),r.seriesX.push(this.twoDSeriesX),r.seriesGoals=this.seriesGoals,d!==this.activeSeriesIndex||this.fallbackToCategory||(r.isXNumeric=!0);else {"datetime"===s.xaxis.type?(r.isXNumeric=!0,c(),r.seriesX.push(this.twoDSeriesX)):"numeric"===s.xaxis.type&&(r.isXNumeric=!0,n.length>0&&(this.twoDSeriesX=n,r.seriesX.push(this.twoDSeriesX))),r.labels.push(this.twoDSeriesX);var g=t[d].data.map((function(t){return x.parseNumber(t)}));r.series.push(g);}r.seriesZ.push(this.threeDSeries),void 0!==t[d].name?r.seriesNames.push(t[d].name):r.seriesNames.push("series-"+parseInt(d+1,10)),void 0!==t[d].color?r.seriesColors.push(t[d].color):r.seriesColors.push(void 0);}return this.w}},{key:"parseDataNonAxisCharts",value:function(t){var e=this.w.globals,i=this.w.config;e.series=t.slice(),e.seriesNames=i.labels.slice();for(var a=0;a<e.series.length;a++)void 0===e.seriesNames[a]&&e.seriesNames.push("series-"+(a+1));return this.w}},{key:"handleExternalLabelsData",value:function(t){var e=this.w.config,i=this.w.globals;if(e.xaxis.categories.length>0)i.labels=e.xaxis.categories;else if(e.labels.length>0)i.labels=e.labels.slice();else if(this.fallbackToCategory){if(i.labels=i.labels[0],i.seriesRange.length&&(i.seriesRange.map((function(t){t.forEach((function(t){i.labels.indexOf(t.x)<0&&t.x&&i.labels.push(t.x);}));})),i.labels=Array.from(new Set(i.labels.map(JSON.stringify)),JSON.parse)),e.xaxis.convertedCatToNumeric)new X(e).convertCatToNumericXaxis(e,this.ctx,i.seriesX[0]),this._generateExternalLabels(t);}else this._generateExternalLabels(t);}},{key:"_generateExternalLabels",value:function(t){var e=this.w.globals,i=this.w.config,a=[];if(e.axisCharts){if(e.series.length>0)if(this.isFormatXY())for(var s=i.series.map((function(t,e){return t.data.filter((function(t,e,i){return i.findIndex((function(e){return e.x===t.x}))===e}))})),r=s.reduce((function(t,e,i,a){return a[t].length>e.length?t:i}),0),o=0;o<s[r].length;o++)a.push(o+1);else for(var n=0;n<e.series[e.maxValsInArrayIndex].length;n++)a.push(n+1);e.seriesX=[];for(var l=0;l<t.length;l++)e.seriesX.push(a);this.w.globals.isBarHorizontal||(e.isXNumeric=!0);}if(0===a.length){a=e.axisCharts?[]:e.series.map((function(t,e){return e+1}));for(var h=0;h<t.length;h++)e.seriesX.push(a);}e.labels=a,i.xaxis.convertedCatToNumeric&&(e.categoryLabels=a.map((function(t){return i.xaxis.labels.formatter(t)}))),e.noLabelsProvided=!0;}},{key:"parseData",value:function(t){var e=this.w,i=e.config,a=e.globals;if(this.excludeCollapsedSeriesInYAxis(),this.fallbackToCategory=!1,this.ctx.core.resetGlobals(),this.ctx.core.isMultipleY(),a.axisCharts?(this.parseDataAxisCharts(t),this.coreUtils.getLargestSeries()):this.parseDataNonAxisCharts(t),i.chart.stacked){var s=new N(this.ctx);a.series=s.setNullSeriesToZeroValues(a.series);}this.coreUtils.getSeriesTotals(),a.axisCharts&&(a.stackedSeriesTotals=this.coreUtils.getStackedSeriesTotals()),this.coreUtils.getPercentSeries(),a.dataFormatXNumeric||a.isXNumeric&&("numeric"!==i.xaxis.type||0!==i.labels.length||0!==i.xaxis.categories.length)||this.handleExternalLabelsData(t);for(var r=this.coreUtils.getCategoryLabels(a.labels),o=0;o<r.length;o++)if(Array.isArray(r[o])){a.isMultiLineX=!0;break}}},{key:"excludeCollapsedSeriesInYAxis",value:function(){var t=this,e=this.w;e.globals.ignoreYAxisIndexes=e.globals.collapsedSeries.map((function(i,a){if(t.w.globals.isMultipleYAxis&&!e.config.chart.stacked)return i.index}));}}]),t}(),B=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"getLabel",value:function(t,e,i,a){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"12px",o=!(arguments.length>6&&void 0!==arguments[6])||arguments[6],n=this.w,l=void 0===t[a]?"":t[a],h=l,c=n.globals.xLabelFormatter,d=n.config.xaxis.labels.formatter,g=!1,u=new M(this.ctx),p=l;o&&(h=u.xLabelFormat(c,l,p,{i:a,dateFormatter:new I(this.ctx).formatDate,w:n}),void 0!==d&&(h=d(l,t[a],{i:a,dateFormatter:new I(this.ctx).formatDate,w:n})));var f,x;e.length>0?(f=e[a].unit,x=null,e.forEach((function(t){"month"===t.unit?x="year":"day"===t.unit?x="month":"hour"===t.unit?x="day":"minute"===t.unit&&(x="hour");})),g=x===f,i=e[a].position,h=e[a].value):"datetime"===n.config.xaxis.type&&void 0===d&&(h=""),void 0===h&&(h=""),h=Array.isArray(h)?h:h.toString();var b=new m(this.ctx),v={};v=n.globals.rotateXLabels&&o?b.getTextRects(h,parseInt(r,10),null,"rotate(".concat(n.config.xaxis.labels.rotate," 0 0)"),!1):b.getTextRects(h,parseInt(r,10));var y=!n.config.xaxis.labels.showDuplicates&&this.ctx.timeScale;return !Array.isArray(h)&&(0===h.indexOf("NaN")||0===h.toLowerCase().indexOf("invalid")||h.toLowerCase().indexOf("infinity")>=0||s.indexOf(h)>=0&&y)&&(h=""),{x:i,text:h,textRect:v,isBold:g}}},{key:"checkLabelBasedOnTickamount",value:function(t,e,i){var a=this.w,s=a.config.xaxis.tickAmount;return "dataPoints"===s&&(s=Math.round(a.globals.gridWidth/120)),s>i||t%Math.round(i/(s+1))==0||(e.text=""),e}},{key:"checkForOverflowingLabels",value:function(t,e,i,a,s){var r=this.w;if(0===t&&r.globals.skipFirstTimelinelabel&&(e.text=""),t===i-1&&r.globals.skipLastTimelinelabel&&(e.text=""),r.config.xaxis.labels.hideOverlappingLabels&&a.length>0){var o=s[s.length-1];e.x<o.textRect.width/(r.globals.rotateXLabels?Math.abs(r.config.xaxis.labels.rotate)/12:1.01)+o.x&&(e.text="");}return e}},{key:"checkForReversedLabels",value:function(t,e){var i=this.w;return i.config.yaxis[t]&&i.config.yaxis[t].reversed&&e.reverse(),e}},{key:"isYAxisHidden",value:function(t){var e=this.w,i=new y(this.ctx);return !e.config.yaxis[t].show||!e.config.yaxis[t].showForNullSeries&&i.isSeriesNull(t)&&-1===e.globals.collapsedSeriesIndices.indexOf(t)}},{key:"getYAxisForeColor",value:function(t,e){var i=this.w;return Array.isArray(t)&&i.globals.yAxisScale[e]&&this.ctx.theme.pushExtraColors(t,i.globals.yAxisScale[e].result.length,!1),t}},{key:"drawYAxisTicks",value:function(t,e,i,a,s,r,o){var n=this.w,l=new m(this.ctx),h=n.globals.translateY;if(a.show&&e>0){!0===n.config.yaxis[s].opposite&&(t+=a.width);for(var c=e;c>=0;c--){var d=h+e/10+n.config.yaxis[s].labels.offsetY-1;n.globals.isBarHorizontal&&(d=r*c),"heatmap"===n.config.chart.type&&(d+=r/2);var g=l.drawLine(t+i.offsetX-a.width+a.offsetX,d+a.offsetY,t+i.offsetX+a.offsetX,d+a.offsetY,a.color);o.add(g),h+=r;}}}}]),t}(),G=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"scaleSvgNode",value:function(t,e){var i=parseFloat(t.getAttributeNS(null,"width")),a=parseFloat(t.getAttributeNS(null,"height"));t.setAttributeNS(null,"width",i*e),t.setAttributeNS(null,"height",a*e),t.setAttributeNS(null,"viewBox","0 0 "+i+" "+a);}},{key:"fixSvgStringForIe11",value:function(t){if(!x.isIE11())return t.replace(/&nbsp;/g,"&#160;");var e=0,i=t.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/g,(function(t){return 2===++e?'xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev"':t}));return i=(i=i.replace(/xmlns:NS\d+=""/g,"")).replace(/NS\d+:(\w+:\w+=")/g,"$1")}},{key:"getSvgString",value:function(t){null==t&&(t=1);var e=this.w.globals.dom.Paper.svg();if(1!==t){var i=this.w.globals.dom.Paper.node.cloneNode(!0);this.scaleSvgNode(i,t),e=(new XMLSerializer).serializeToString(i);}return this.fixSvgStringForIe11(e)}},{key:"cleanup",value:function(){var t=this.w,e=t.globals.dom.baseEl.getElementsByClassName("apexcharts-xcrosshairs"),i=t.globals.dom.baseEl.getElementsByClassName("apexcharts-ycrosshairs"),a=t.globals.dom.baseEl.querySelectorAll(".apexcharts-zoom-rect, .apexcharts-selection-rect");Array.prototype.forEach.call(a,(function(t){t.setAttribute("width",0);})),e&&e[0]&&(e[0].setAttribute("x",-500),e[0].setAttribute("x1",-500),e[0].setAttribute("x2",-500)),i&&i[0]&&(i[0].setAttribute("y",-100),i[0].setAttribute("y1",-100),i[0].setAttribute("y2",-100));}},{key:"svgUrl",value:function(){this.cleanup();var t=this.getSvgString(),e=new Blob([t],{type:"image/svg+xml;charset=utf-8"});return URL.createObjectURL(e)}},{key:"dataURI",value:function(t){var e=this;return new Promise((function(i){var a=e.w,s=t?t.scale||t.width/a.globals.svgWidth:1;e.cleanup();var r=document.createElement("canvas");r.width=a.globals.svgWidth*s,r.height=parseInt(a.globals.dom.elWrap.style.height,10)*s;var o="transparent"===a.config.chart.background?"#fff":a.config.chart.background,n=r.getContext("2d");n.fillStyle=o,n.fillRect(0,0,r.width*s,r.height*s);var l=e.getSvgString(s);if(window.canvg&&x.isIE11()){var h=window.canvg.Canvg.fromString(n,l,{ignoreClear:!0,ignoreDimensions:!0});h.start();var c=r.msToBlob();h.stop(),i({blob:c});}else {var d="data:image/svg+xml,"+encodeURIComponent(l),g=new Image;g.crossOrigin="anonymous",g.onload=function(){if(n.drawImage(g,0,0),r.msToBlob){var t=r.msToBlob();i({blob:t});}else {var e=r.toDataURL("image/png");i({imgURI:e});}},g.src=d;}}))}},{key:"exportToSVG",value:function(){this.triggerDownload(this.svgUrl(),this.w.config.chart.toolbar.export.svg.filename,".svg");}},{key:"exportToPng",value:function(){var t=this;this.dataURI().then((function(e){var i=e.imgURI,a=e.blob;a?navigator.msSaveOrOpenBlob(a,t.w.globals.chartID+".png"):t.triggerDownload(i,t.w.config.chart.toolbar.export.png.filename,".png");}));}},{key:"exportToCSV",value:function(t){var e=this,i=t.series,a=t.fileName,s=t.columnDelimiter,r=void 0===s?",":s,o=t.lineDelimiter,n=void 0===o?"\n":o,l=this.w;i||(i=l.config.series);var h=[],c=[],d="",g=l.globals.series.map((function(t,e){return -1===l.globals.collapsedSeriesIndices.indexOf(e)?t:[]})),p=Math.max.apply(Math,u(i.map((function(t){return t.data?t.data.length:0})))),f=new W(this.ctx),b=new B(this.ctx),v=function(t){var i="";if(l.globals.axisCharts){if("category"===l.config.xaxis.type||l.config.xaxis.convertedCatToNumeric)if(l.globals.isBarHorizontal){var a=l.globals.yLabelFormatters[0],s=new N(e.ctx).getActiveConfigSeriesIndex();i=a(l.globals.labels[t],{seriesIndex:s,dataPointIndex:t,w:l});}else i=b.getLabel(l.globals.labels,l.globals.timescaleLabels,0,t).text;"datetime"===l.config.xaxis.type&&(l.config.xaxis.categories.length?i=l.config.xaxis.categories[t]:l.config.labels.length&&(i=l.config.labels[t]));}else i=l.config.labels[t];return Array.isArray(i)&&(i=i.join(" ")),x.isNumber(i)?i:i.split(r).join("")},m=function(t,e){if(h.length&&0===e&&c.push(h.join(r)),t.data){t.data=t.data.length&&t.data||u(Array(p)).map((function(){return ""}));for(var a=0;a<t.data.length;a++){h=[];var s=v(a);if(s||(f.isFormatXY()?s=i[e].data[a].x:f.isFormat2DArray()&&(s=i[e].data[a]?i[e].data[a][0]:"")),0===e){h.push((d=s,"datetime"===l.config.xaxis.type&&String(d).length>=10?l.config.chart.toolbar.export.csv.dateFormatter(s):x.isNumber(s)?s:s.split(r).join("")));for(var o=0;o<l.globals.series.length;o++){var n;if(f.isFormatXY())h.push(null===(n=i[o].data[a])||void 0===n?void 0:n.y);else h.push(g[o][a]);}}("candlestick"===l.config.chart.type||t.type&&"candlestick"===t.type)&&(h.pop(),h.push(l.globals.seriesCandleO[e][a]),h.push(l.globals.seriesCandleH[e][a]),h.push(l.globals.seriesCandleL[e][a]),h.push(l.globals.seriesCandleC[e][a])),("boxPlot"===l.config.chart.type||t.type&&"boxPlot"===t.type)&&(h.pop(),h.push(l.globals.seriesCandleO[e][a]),h.push(l.globals.seriesCandleH[e][a]),h.push(l.globals.seriesCandleM[e][a]),h.push(l.globals.seriesCandleL[e][a]),h.push(l.globals.seriesCandleC[e][a])),"rangeBar"===l.config.chart.type&&(h.pop(),h.push(l.globals.seriesRangeStart[e][a]),h.push(l.globals.seriesRangeEnd[e][a])),h.length&&c.push(h.join(r));}}var d;};h.push(l.config.chart.toolbar.export.csv.headerCategory),"boxPlot"===l.config.chart.type?(h.push("minimum"),h.push("q1"),h.push("median"),h.push("q3"),h.push("maximum")):"candlestick"===l.config.chart.type?(h.push("open"),h.push("high"),h.push("low"),h.push("close")):"rangeBar"===l.config.chart.type?(h.push("minimum"),h.push("maximum")):i.map((function(t,e){var i=(t.name?t.name:"series-".concat(e))+"";l.globals.axisCharts&&h.push(i.split(r).join("")?i.split(r).join(""):"series-".concat(e));})),l.globals.axisCharts||(h.push(l.config.chart.toolbar.export.csv.headerValue),c.push(h.join(r))),i.map((function(t,e){l.globals.axisCharts?m(t,e):((h=[]).push(l.globals.labels[e].split(r).join("")),h.push(g[e]),c.push(h.join(r)));})),d+=c.join(n),this.triggerDownload("data:text/csv; charset=utf-8,"+encodeURIComponent("\ufeff"+d),a||l.config.chart.toolbar.export.csv.filename,".csv");}},{key:"triggerDownload",value:function(t,e,i){var a=document.createElement("a");a.href=t,a.download=(e||this.w.globals.chartID)+i,document.body.appendChild(a),a.click(),document.body.removeChild(a);}}]),t}(),V=function(){function t(e,i){a(this,t),this.ctx=e,this.elgrid=i,this.w=e.w;var s=this.w;this.axesUtils=new B(e),this.xaxisLabels=s.globals.labels.slice(),s.globals.timescaleLabels.length>0&&!s.globals.isBarHorizontal&&(this.xaxisLabels=s.globals.timescaleLabels.slice()),s.config.xaxis.overwriteCategories&&(this.xaxisLabels=s.config.xaxis.overwriteCategories),this.drawnLabels=[],this.drawnLabelsRects=[],"top"===s.config.xaxis.position?this.offY=0:this.offY=s.globals.gridHeight+1,this.offY=this.offY+s.config.xaxis.axisBorder.offsetY,this.isCategoryBarHorizontal="bar"===s.config.chart.type&&s.config.plotOptions.bar.horizontal,this.xaxisFontSize=s.config.xaxis.labels.style.fontSize,this.xaxisFontFamily=s.config.xaxis.labels.style.fontFamily,this.xaxisForeColors=s.config.xaxis.labels.style.colors,this.xaxisBorderWidth=s.config.xaxis.axisBorder.width,this.isCategoryBarHorizontal&&(this.xaxisBorderWidth=s.config.yaxis[0].axisBorder.width.toString()),this.xaxisBorderWidth.indexOf("%")>-1?this.xaxisBorderWidth=s.globals.gridWidth*parseInt(this.xaxisBorderWidth,10)/100:this.xaxisBorderWidth=parseInt(this.xaxisBorderWidth,10),this.xaxisBorderHeight=s.config.xaxis.axisBorder.height,this.yaxis=s.config.yaxis[0];}return r(t,[{key:"drawXaxis",value:function(){var t=this.w,e=new m(this.ctx),i=e.group({class:"apexcharts-xaxis",transform:"translate(".concat(t.config.xaxis.offsetX,", ").concat(t.config.xaxis.offsetY,")")}),a=e.group({class:"apexcharts-xaxis-texts-g",transform:"translate(".concat(t.globals.translateXAxisX,", ").concat(t.globals.translateXAxisY,")")});i.add(a);for(var s=[],r=0;r<this.xaxisLabels.length;r++)s.push(this.xaxisLabels[r]);if(this.drawXAxisLabelAndGroup(!0,e,a,s,t.globals.isXNumeric,(function(t,e){return e})),t.globals.hasXaxisGroups){var o=t.globals.groups;s=[];for(var n=0;n<o.length;n++)s.push(o[n].title);var l={};t.config.xaxis.group.style&&(l.xaxisFontSize=t.config.xaxis.group.style.fontSize,l.xaxisFontFamily=t.config.xaxis.group.style.fontFamily,l.xaxisForeColors=t.config.xaxis.group.style.colors,l.fontWeight=t.config.xaxis.group.style.fontWeight,l.cssClass=t.config.xaxis.group.style.cssClass),this.drawXAxisLabelAndGroup(!1,e,a,s,!1,(function(t,e){return o[t].cols*e}),l);}if(void 0!==t.config.xaxis.title.text){var h=e.group({class:"apexcharts-xaxis-title"}),c=e.drawText({x:t.globals.gridWidth/2+t.config.xaxis.title.offsetX,y:this.offY+parseFloat(this.xaxisFontSize)+("bottom"===t.config.xaxis.position?t.globals.xAxisLabelsHeight:-t.globals.xAxisLabelsHeight-10)+t.config.xaxis.title.offsetY,text:t.config.xaxis.title.text,textAnchor:"middle",fontSize:t.config.xaxis.title.style.fontSize,fontFamily:t.config.xaxis.title.style.fontFamily,fontWeight:t.config.xaxis.title.style.fontWeight,foreColor:t.config.xaxis.title.style.color,cssClass:"apexcharts-xaxis-title-text "+t.config.xaxis.title.style.cssClass});h.add(c),i.add(h);}if(t.config.xaxis.axisBorder.show){var d=t.globals.barPadForNumericAxis,g=e.drawLine(t.globals.padHorizontal+t.config.xaxis.axisBorder.offsetX-d,this.offY,this.xaxisBorderWidth+d,this.offY,t.config.xaxis.axisBorder.color,0,this.xaxisBorderHeight);this.elgrid&&this.elgrid.elGridBorders&&t.config.grid.show?this.elgrid.elGridBorders.add(g):i.add(g);}return i}},{key:"drawXAxisLabelAndGroup",value:function(t,e,i,a,s,r){var o,n=this,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{},h=[],c=[],d=this.w,g=l.xaxisFontSize||this.xaxisFontSize,u=l.xaxisFontFamily||this.xaxisFontFamily,p=l.xaxisForeColors||this.xaxisForeColors,f=l.fontWeight||d.config.xaxis.labels.style.fontWeight,x=l.cssClass||d.config.xaxis.labels.style.cssClass,b=d.globals.padHorizontal,v=a.length,m="category"===d.config.xaxis.type?d.globals.dataPoints:v;if(0===m&&v>m&&(m=v),s){var y=m>1?m-1:m;o=d.globals.gridWidth/Math.min(y,v-1),b=b+r(0,o)/2+d.config.xaxis.labels.offsetX;}else o=d.globals.gridWidth/m,b=b+r(0,o)+d.config.xaxis.labels.offsetX;for(var w=function(s){var l=b-r(s,o)/2+d.config.xaxis.labels.offsetX;0===s&&1===v&&o/2===b&&1===m&&(l=d.globals.gridWidth/2);var y=n.axesUtils.getLabel(a,d.globals.timescaleLabels,l,s,h,g,t),w=28;d.globals.rotateXLabels&&t&&(w=22),d.config.xaxis.title.text&&"top"===d.config.xaxis.position&&(w+=parseFloat(d.config.xaxis.title.style.fontSize)+2),t||(w=w+parseFloat(g)+(d.globals.xAxisLabelsHeight-d.globals.xAxisGroupLabelsHeight)+(d.globals.rotateXLabels?10:0)),y=void 0!==d.config.xaxis.tickAmount&&"dataPoints"!==d.config.xaxis.tickAmount&&"datetime"!==d.config.xaxis.type?n.axesUtils.checkLabelBasedOnTickamount(s,y,v):n.axesUtils.checkForOverflowingLabels(s,y,v,h,c);if(d.config.xaxis.labels.show){var k=e.drawText({x:y.x,y:n.offY+d.config.xaxis.labels.offsetY+w-("top"===d.config.xaxis.position?d.globals.xAxisHeight+d.config.xaxis.axisTicks.height-2:0),text:y.text,textAnchor:"middle",fontWeight:y.isBold?600:f,fontSize:g,fontFamily:u,foreColor:Array.isArray(p)?t&&d.config.xaxis.convertedCatToNumeric?p[d.globals.minX+s-1]:p[s]:p,isPlainText:!1,cssClass:(t?"apexcharts-xaxis-label ":"apexcharts-xaxis-group-label ")+x});if(i.add(k),k.on("click",(function(t){if("function"==typeof d.config.chart.events.xAxisLabelClick){var e=Object.assign({},d,{labelIndex:s});d.config.chart.events.xAxisLabelClick(t,n.ctx,e);}})),t){var A=document.createElementNS(d.globals.SVGNS,"title");A.textContent=Array.isArray(y.text)?y.text.join(" "):y.text,k.node.appendChild(A),""!==y.text&&(h.push(y.text),c.push(y));}}s<v-1&&(b+=r(s+1,o));},k=0;k<=v-1;k++)w(k);}},{key:"drawXaxisInversed",value:function(t){var e,i,a=this,s=this.w,r=new m(this.ctx),o=s.config.yaxis[0].opposite?s.globals.translateYAxisX[t]:0,n=r.group({class:"apexcharts-yaxis apexcharts-xaxis-inversed",rel:t}),l=r.group({class:"apexcharts-yaxis-texts-g apexcharts-xaxis-inversed-texts-g",transform:"translate("+o+", 0)"});n.add(l);var h=[];if(s.config.yaxis[t].show)for(var c=0;c<this.xaxisLabels.length;c++)h.push(this.xaxisLabels[c]);e=s.globals.gridHeight/h.length,i=-e/2.2;var d=s.globals.yLabelFormatters[0],g=s.config.yaxis[0].labels;if(g.show)for(var u=function(o){var n=void 0===h[o]?"":h[o];n=d(n,{seriesIndex:t,dataPointIndex:o,w:s});var c=a.axesUtils.getYAxisForeColor(g.style.colors,t),u=0;Array.isArray(n)&&(u=n.length/2*parseInt(g.style.fontSize,10));var p=g.offsetX-15,f="end";a.yaxis.opposite&&(f="start"),"left"===s.config.yaxis[0].labels.align?(p=g.offsetX,f="start"):"center"===s.config.yaxis[0].labels.align?(p=g.offsetX,f="middle"):"right"===s.config.yaxis[0].labels.align&&(f="end");var x=r.drawText({x:p,y:i+e+g.offsetY-u,text:n,textAnchor:f,foreColor:Array.isArray(c)?c[o]:c,fontSize:g.style.fontSize,fontFamily:g.style.fontFamily,fontWeight:g.style.fontWeight,isPlainText:!1,cssClass:"apexcharts-yaxis-label "+g.style.cssClass,maxWidth:g.maxWidth});l.add(x),x.on("click",(function(t){if("function"==typeof s.config.chart.events.xAxisLabelClick){var e=Object.assign({},s,{labelIndex:o});s.config.chart.events.xAxisLabelClick(t,a.ctx,e);}}));var b=document.createElementNS(s.globals.SVGNS,"title");if(b.textContent=Array.isArray(n)?n.join(" "):n,x.node.appendChild(b),0!==s.config.yaxis[t].labels.rotate){var v=r.rotateAroundCenter(x.node);x.node.setAttribute("transform","rotate(".concat(s.config.yaxis[t].labels.rotate," 0 ").concat(v.y,")"));}i+=e;},p=0;p<=h.length-1;p++)u(p);if(void 0!==s.config.yaxis[0].title.text){var f=r.group({class:"apexcharts-yaxis-title apexcharts-xaxis-title-inversed",transform:"translate("+o+", 0)"}),x=r.drawText({x:s.config.yaxis[0].title.offsetX,y:s.globals.gridHeight/2+s.config.yaxis[0].title.offsetY,text:s.config.yaxis[0].title.text,textAnchor:"middle",foreColor:s.config.yaxis[0].title.style.color,fontSize:s.config.yaxis[0].title.style.fontSize,fontWeight:s.config.yaxis[0].title.style.fontWeight,fontFamily:s.config.yaxis[0].title.style.fontFamily,cssClass:"apexcharts-yaxis-title-text "+s.config.yaxis[0].title.style.cssClass});f.add(x),n.add(f);}var b=0;this.isCategoryBarHorizontal&&s.config.yaxis[0].opposite&&(b=s.globals.gridWidth);var v=s.config.xaxis.axisBorder;if(v.show){var y=r.drawLine(s.globals.padHorizontal+v.offsetX+b,1+v.offsetY,s.globals.padHorizontal+v.offsetX+b,s.globals.gridHeight+v.offsetY,v.color,0);this.elgrid&&this.elgrid.elGridBorders&&s.config.grid.show?this.elgrid.elGridBorders.add(y):n.add(y);}return s.config.yaxis[0].axisTicks.show&&this.axesUtils.drawYAxisTicks(b,h.length,s.config.yaxis[0].axisBorder,s.config.yaxis[0].axisTicks,0,e,n),n}},{key:"drawXaxisTicks",value:function(t,e,i){var a=this.w,s=t;if(!(t<0||t-2>a.globals.gridWidth)){var r=this.offY+a.config.xaxis.axisTicks.offsetY;if(e=e+r+a.config.xaxis.axisTicks.height,"top"===a.config.xaxis.position&&(e=r-a.config.xaxis.axisTicks.height),a.config.xaxis.axisTicks.show){var o=new m(this.ctx).drawLine(t+a.config.xaxis.axisTicks.offsetX,r+a.config.xaxis.offsetY,s+a.config.xaxis.axisTicks.offsetX,e+a.config.xaxis.offsetY,a.config.xaxis.axisTicks.color);i.add(o),o.node.classList.add("apexcharts-xaxis-tick");}}}},{key:"getXAxisTicksPositions",value:function(){var t=this.w,e=[],i=this.xaxisLabels.length,a=t.globals.padHorizontal;if(t.globals.timescaleLabels.length>0)for(var s=0;s<i;s++)a=this.xaxisLabels[s].position,e.push(a);else for(var r=i,o=0;o<r;o++){var n=r;t.globals.isXNumeric&&"bar"!==t.config.chart.type&&(n-=1),a+=t.globals.gridWidth/n,e.push(a);}return e}},{key:"xAxisLabelCorrections",value:function(){var t=this.w,e=new m(this.ctx),i=t.globals.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g"),a=t.globals.dom.baseEl.querySelectorAll(".apexcharts-xaxis-texts-g text:not(.apexcharts-xaxis-group-label)"),s=t.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis-inversed text"),r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-xaxis-inversed-texts-g text tspan");if(t.globals.rotateXLabels||t.config.xaxis.labels.rotateAlways)for(var o=0;o<a.length;o++){var n=e.rotateAroundCenter(a[o]);n.y=n.y-1,n.x=n.x+1,a[o].setAttribute("transform","rotate(".concat(t.config.xaxis.labels.rotate," ").concat(n.x," ").concat(n.y,")")),a[o].setAttribute("text-anchor","end");i.setAttribute("transform","translate(0, ".concat(-10,")"));var l=a[o].childNodes;t.config.xaxis.labels.trim&&Array.prototype.forEach.call(l,(function(i){e.placeTextWithEllipsis(i,i.textContent,t.globals.xAxisLabelsHeight-("bottom"===t.config.legend.position?20:10));}));}else !function(){for(var i=t.globals.gridWidth/(t.globals.labels.length+1),s=0;s<a.length;s++){var r=a[s].childNodes;t.config.xaxis.labels.trim&&"datetime"!==t.config.xaxis.type&&Array.prototype.forEach.call(r,(function(t){e.placeTextWithEllipsis(t,t.textContent,i);}));}}();if(s.length>0){var h=s[s.length-1].getBBox(),c=s[0].getBBox();h.x<-20&&s[s.length-1].parentNode.removeChild(s[s.length-1]),c.x+c.width>t.globals.gridWidth&&!t.globals.isBarHorizontal&&s[0].parentNode.removeChild(s[0]);for(var d=0;d<r.length;d++)e.placeTextWithEllipsis(r[d],r[d].textContent,t.config.yaxis[0].labels.maxWidth-(t.config.yaxis[0].title.text?2*parseFloat(t.config.yaxis[0].title.style.fontSize):0)-15);}}}]),t}(),j=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;var i=this.w;this.xaxisLabels=i.globals.labels.slice(),this.axesUtils=new B(e),this.isRangeBar=i.globals.seriesRange.length&&i.globals.isBarHorizontal,i.globals.timescaleLabels.length>0&&(this.xaxisLabels=i.globals.timescaleLabels.slice());}return r(t,[{key:"drawGridArea",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.w,i=new m(this.ctx);null===t&&(t=i.group({class:"apexcharts-grid"}));var a=i.drawLine(e.globals.padHorizontal,1,e.globals.padHorizontal,e.globals.gridHeight,"transparent"),s=i.drawLine(e.globals.padHorizontal,e.globals.gridHeight,e.globals.gridWidth,e.globals.gridHeight,"transparent");return t.add(s),t.add(a),t}},{key:"drawGrid",value:function(){var t=null;return this.w.globals.axisCharts&&(t=this.renderGrid(),this.drawGridArea(t.el)),t}},{key:"createGridMask",value:function(){var t=this.w,e=t.globals,i=new m(this.ctx),a=Array.isArray(t.config.stroke.width)?0:t.config.stroke.width;if(Array.isArray(t.config.stroke.width)){var s=0;t.config.stroke.width.forEach((function(t){s=Math.max(s,t);})),a=s;}e.dom.elGridRectMask=document.createElementNS(e.SVGNS,"clipPath"),e.dom.elGridRectMask.setAttribute("id","gridRectMask".concat(e.cuid)),e.dom.elGridRectMarkerMask=document.createElementNS(e.SVGNS,"clipPath"),e.dom.elGridRectMarkerMask.setAttribute("id","gridRectMarkerMask".concat(e.cuid)),e.dom.elForecastMask=document.createElementNS(e.SVGNS,"clipPath"),e.dom.elForecastMask.setAttribute("id","forecastMask".concat(e.cuid)),e.dom.elNonForecastMask=document.createElementNS(e.SVGNS,"clipPath"),e.dom.elNonForecastMask.setAttribute("id","nonForecastMask".concat(e.cuid));var r=t.config.chart.type,o=0,n=0;("bar"===r||"rangeBar"===r||"candlestick"===r||"boxPlot"===r||t.globals.comboBarCount>0)&&t.globals.isXNumeric&&!t.globals.isBarHorizontal&&(o=t.config.grid.padding.left,n=t.config.grid.padding.right,e.barPadForNumericAxis>o&&(o=e.barPadForNumericAxis,n=e.barPadForNumericAxis)),e.dom.elGridRect=i.drawRect(-a-o-2,2*-a-2,e.gridWidth+a+n+o+4,e.gridHeight+4*a+4,0,"#fff");var l=t.globals.markers.largestSize+1;e.dom.elGridRectMarker=i.drawRect(2*-l,2*-l,e.gridWidth+4*l,e.gridHeight+4*l,0,"#fff"),e.dom.elGridRectMask.appendChild(e.dom.elGridRect.node),e.dom.elGridRectMarkerMask.appendChild(e.dom.elGridRectMarker.node);var h=e.dom.baseEl.querySelector("defs");h.appendChild(e.dom.elGridRectMask),h.appendChild(e.dom.elForecastMask),h.appendChild(e.dom.elNonForecastMask),h.appendChild(e.dom.elGridRectMarkerMask);}},{key:"_drawGridLines",value:function(t){var e=t.i,i=t.x1,a=t.y1,s=t.x2,r=t.y2,o=t.xCount,n=t.parent,l=this.w;if(!(0===e&&l.globals.skipFirstTimelinelabel||e===o-1&&l.globals.skipLastTimelinelabel&&!l.config.xaxis.labels.formatter||"radar"===l.config.chart.type)){l.config.grid.xaxis.lines.show&&this._drawGridLine({i:e,x1:i,y1:a,x2:s,y2:r,xCount:o,parent:n});var h=0;if(l.globals.hasXaxisGroups&&"between"===l.config.xaxis.tickPlacement){var c=l.globals.groups;if(c){for(var d=0,g=0;d<e&&g<c.length;g++)d+=c[g].cols;d===e&&(h=.6*l.globals.xAxisLabelsHeight);}}new V(this.ctx).drawXaxisTicks(i,h,l.globals.dom.elGraphical);}}},{key:"_drawGridLine",value:function(t){var e=t.i,i=t.x1,a=t.y1,s=t.x2,r=t.y2,o=t.xCount,n=t.parent,l=this.w,h=!1,c=n.node.classList.contains("apexcharts-gridlines-horizontal"),d=l.config.grid.strokeDashArray,g=l.globals.barPadForNumericAxis;(0===a&&0===r||0===i&&0===s)&&(h=!0),a===l.globals.gridHeight&&r===l.globals.gridHeight&&(h=!0),!l.globals.isBarHorizontal||0!==e&&e!==o-1||(h=!0);var u=new m(this).drawLine(i-(c?g:0),a,s+(c?g:0),r,l.config.grid.borderColor,d);u.node.classList.add("apexcharts-gridline"),h&&l.config.grid.show?this.elGridBorders.add(u):n.add(u);}},{key:"_drawGridBandRect",value:function(t){var e=t.c,i=t.x1,a=t.y1,s=t.x2,r=t.y2,o=t.type,n=this.w,l=new m(this.ctx),h=n.globals.barPadForNumericAxis;if("column"!==o||"datetime"!==n.config.xaxis.type){var c=n.config.grid[o].colors[e],d=l.drawRect(i-("row"===o?h:0),a,s+("row"===o?2*h:0),r,0,c,n.config.grid[o].opacity);this.elg.add(d),d.attr("clip-path","url(#gridRectMask".concat(n.globals.cuid,")")),d.node.classList.add("apexcharts-grid-".concat(o));}}},{key:"_drawXYLines",value:function(t){var e=this,i=t.xCount,a=t.tickAmount,s=this.w;if(s.config.grid.xaxis.lines.show||s.config.xaxis.axisTicks.show){var r,o=s.globals.padHorizontal,n=s.globals.gridHeight;s.globals.timescaleLabels.length?function(t){for(var a=t.xC,s=t.x1,r=t.y1,o=t.x2,n=t.y2,l=0;l<a;l++)s=e.xaxisLabels[l].position,o=e.xaxisLabels[l].position,e._drawGridLines({i:l,x1:s,y1:r,x2:o,y2:n,xCount:i,parent:e.elgridLinesV});}({xC:i,x1:o,y1:0,x2:r,y2:n}):(s.globals.isXNumeric&&(i=s.globals.xAxisScale.result.length),function(t){for(var a=t.xC,r=t.x1,o=t.y1,n=t.x2,l=t.y2,h=0;h<a+(s.globals.isXNumeric?0:1);h++)0===h&&1===a&&1===s.globals.dataPoints&&(n=r=s.globals.gridWidth/2),e._drawGridLines({i:h,x1:r,y1:o,x2:n,y2:l,xCount:i,parent:e.elgridLinesV}),n=r+=s.globals.gridWidth/(s.globals.isXNumeric?a-1:a);}({xC:i,x1:o,y1:0,x2:r,y2:n}));}if(s.config.grid.yaxis.lines.show){var l=0,h=0,c=s.globals.gridWidth,d=a+1;this.isRangeBar&&(d=s.globals.labels.length);for(var g=0;g<d+(this.isRangeBar?1:0);g++)this._drawGridLine({i:g,xCount:d+(this.isRangeBar?1:0),x1:0,y1:l,x2:c,y2:h,parent:this.elgridLinesH}),h=l+=s.globals.gridHeight/(this.isRangeBar?d:a);}}},{key:"_drawInvertedXYLines",value:function(t){var e=t.xCount,i=this.w;if(i.config.grid.xaxis.lines.show||i.config.xaxis.axisTicks.show)for(var a,s=i.globals.padHorizontal,r=i.globals.gridHeight,o=0;o<e+1;o++){i.config.grid.xaxis.lines.show&&this._drawGridLine({i:o,xCount:e+1,x1:s,y1:0,x2:a,y2:r,parent:this.elgridLinesV}),new V(this.ctx).drawXaxisTicks(s,0,i.globals.dom.elGraphical),a=s=s+i.globals.gridWidth/e+.3;}if(i.config.grid.yaxis.lines.show)for(var n=0,l=0,h=i.globals.gridWidth,c=0;c<i.globals.dataPoints+1;c++)this._drawGridLine({i:c,xCount:i.globals.dataPoints+1,x1:0,y1:n,x2:h,y2:l,parent:this.elgridLinesH}),l=n+=i.globals.gridHeight/i.globals.dataPoints;}},{key:"renderGrid",value:function(){var t=this.w,e=new m(this.ctx);this.elg=e.group({class:"apexcharts-grid"}),this.elgridLinesH=e.group({class:"apexcharts-gridlines-horizontal"}),this.elgridLinesV=e.group({class:"apexcharts-gridlines-vertical"}),this.elGridBorders=e.group({class:"apexcharts-grid-borders"}),this.elg.add(this.elgridLinesH),this.elg.add(this.elgridLinesV),t.config.grid.show||(this.elgridLinesV.hide(),this.elgridLinesH.hide(),this.elGridBorders.hide());for(var i,a=t.globals.yAxisScale.length?t.globals.yAxisScale[0].result.length-1:5,s=0;s<t.globals.series.length&&(void 0!==t.globals.yAxisScale[s]&&(a=t.globals.yAxisScale[s].result.length-1),!(a>2));s++);return !t.globals.isBarHorizontal||this.isRangeBar?(i=this.xaxisLabels.length,this.isRangeBar&&(i--,a=t.globals.labels.length,t.config.xaxis.tickAmount&&t.config.xaxis.labels.formatter&&(i=t.config.xaxis.tickAmount)),this._drawXYLines({xCount:i,tickAmount:a})):(i=a,a=t.globals.xTickAmount,this._drawInvertedXYLines({xCount:i,tickAmount:a})),this.drawGridBands(i,a),{el:this.elg,elGridBorders:this.elGridBorders,xAxisTickWidth:t.globals.gridWidth/i}}},{key:"drawGridBands",value:function(t,e){var i=this.w;if(void 0!==i.config.grid.row.colors&&i.config.grid.row.colors.length>0)for(var a=0,s=i.globals.gridHeight/e,r=i.globals.gridWidth,o=0,n=0;o<e;o++,n++)n>=i.config.grid.row.colors.length&&(n=0),this._drawGridBandRect({c:n,x1:0,y1:a,x2:r,y2:s,type:"row"}),a+=i.globals.gridHeight/e;if(void 0!==i.config.grid.column.colors&&i.config.grid.column.colors.length>0)for(var l=i.globals.isBarHorizontal||"on"!==i.config.xaxis.tickPlacement||"category"!==i.config.xaxis.type&&!i.config.xaxis.convertedCatToNumeric?t:t-1,h=i.globals.padHorizontal,c=i.globals.padHorizontal+i.globals.gridWidth/l,d=i.globals.gridHeight,g=0,u=0;g<t;g++,u++)u>=i.config.grid.column.colors.length&&(u=0),this._drawGridBandRect({c:u,x1:h,y1:0,x2:c,y2:d,type:"column"}),h+=i.globals.gridWidth/l;}}]),t}(),_=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"niceScale",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,s=arguments.length>4?arguments[4]:void 0,r=this.w,o=Math.abs(e-t);if("dataPoints"===(i=this._adjustTicksForSmallRange(i,a,o))&&(i=r.globals.dataPoints-1),t===Number.MIN_VALUE&&0===e||!x.isNumber(t)&&!x.isNumber(e)||t===Number.MIN_VALUE&&e===-Number.MAX_VALUE)return t=0,e=i,this.linearScale(t,e,i);t>e?(console.warn("axis.min cannot be greater than axis.max"),e=t+.1):t===e&&(t=0===t?0:t-.5,e=0===e?2:e+.5);var n=[];o<1&&s&&("candlestick"===r.config.chart.type||"candlestick"===r.config.series[a].type||"boxPlot"===r.config.chart.type||"boxPlot"===r.config.series[a].type||r.globals.isRangeData)&&(e*=1.01);var l=i+1;l<2?l=2:l>2&&(l-=2);var h=o/l,c=Math.floor(x.log10(h)),d=Math.pow(10,c),g=Math.round(h/d);g<1&&(g=1);var u=g*d,p=u*Math.floor(t/u),f=u*Math.ceil(e/u),b=p;if(s&&o>2){for(;n.push(x.stripNumber(b,7)),!((b+=u)>f););return {result:n,niceMin:n[0],niceMax:n[n.length-1]}}var v=t;(n=[]).push(x.stripNumber(v,7));for(var m=Math.abs(e-t)/i,y=0;y<=i;y++)v+=m,n.push(v);return n[n.length-2]>=e&&n.pop(),{result:n,niceMin:n[0],niceMax:n[n.length-1]}}},{key:"linearScale",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,a=arguments.length>3?arguments[3]:void 0,s=Math.abs(e-t);"dataPoints"===(i=this._adjustTicksForSmallRange(i,a,s))&&(i=this.w.globals.dataPoints-1);var r=s/i;i===Number.MAX_VALUE&&(i=10,r=1);for(var o=[],n=t;i>=0;)o.push(n),n+=r,i-=1;return {result:o,niceMin:o[0],niceMax:o[o.length-1]}}},{key:"logarithmicScaleNice",value:function(t,e,i){e<=0&&(e=Math.max(t,i)),t<=0&&(t=Math.min(e,i));for(var a=[],s=Math.ceil(Math.log(e)/Math.log(i)+1),r=Math.floor(Math.log(t)/Math.log(i));r<s;r++)a.push(Math.pow(i,r));return {result:a,niceMin:a[0],niceMax:a[a.length-1]}}},{key:"logarithmicScale",value:function(t,e,i){e<=0&&(e=Math.max(t,i)),t<=0&&(t=Math.min(e,i));for(var a=[],s=Math.log(e)/Math.log(i),r=Math.log(t)/Math.log(i),o=s-r,n=Math.round(o),l=o/n,h=0,c=r;h<n;h++,c+=l)a.push(Math.pow(i,c));return a.push(Math.pow(i,s)),{result:a,niceMin:t,niceMax:e}}},{key:"_adjustTicksForSmallRange",value:function(t,e,i){var a=t;if(void 0!==e&&this.w.config.yaxis[e].labels.formatter&&void 0===this.w.config.yaxis[e].tickAmount){var s=Number(this.w.config.yaxis[e].labels.formatter(1));x.isNumber(s)&&0===this.w.globals.yValueDecimal&&(a=Math.ceil(i));}return a<t?a:t}},{key:"setYScaleForIndex",value:function(t,e,i){var a=this.w.globals,s=this.w.config,r=a.isBarHorizontal?s.xaxis:s.yaxis[t];void 0===a.yAxisScale[t]&&(a.yAxisScale[t]=[]);var o=Math.abs(i-e);if(r.logarithmic&&o<=5&&(a.invalidLogScale=!0),r.logarithmic&&o>5)a.allSeriesCollapsed=!1,a.yAxisScale[t]=this.logarithmicScale(e,i,r.logBase),a.yAxisScale[t]=r.forceNiceScale?this.logarithmicScaleNice(e,i,r.logBase):this.logarithmicScale(e,i,r.logBase);else if(i!==-Number.MAX_VALUE&&x.isNumber(i))if(a.allSeriesCollapsed=!1,void 0===r.min&&void 0===r.max||r.forceNiceScale){var n=void 0===s.yaxis[t].max&&void 0===s.yaxis[t].min||s.yaxis[t].forceNiceScale;a.yAxisScale[t]=this.niceScale(e,i,r.tickAmount?r.tickAmount:o<5&&o>1?o+1:5,t,n);}else a.yAxisScale[t]=this.linearScale(e,i,r.tickAmount,t);else a.yAxisScale[t]=this.linearScale(0,5,5);}},{key:"setXScale",value:function(t,e){var i=this.w,a=i.globals,s=i.config.xaxis,r=Math.abs(e-t);return e!==-Number.MAX_VALUE&&x.isNumber(e)?a.xAxisScale=this.linearScale(t,e,s.tickAmount?s.tickAmount:r<5&&r>1?r+1:5,0):a.xAxisScale=this.linearScale(0,5,5),a.xAxisScale}},{key:"setMultipleYScales",value:function(){var t=this,e=this.w.globals,i=this.w.config,a=e.minYArr.concat([]),s=e.maxYArr.concat([]),r=[];i.yaxis.forEach((function(e,o){var n=o;i.series.forEach((function(t,i){t.name===e.seriesName&&(n=i,o!==i?r.push({index:i,similarIndex:o,alreadyExists:!0}):r.push({index:i}));}));var l=a[n],h=s[n];t.setYScaleForIndex(o,l,h);})),this.sameScaleInMultipleAxes(a,s,r);}},{key:"sameScaleInMultipleAxes",value:function(t,e,i){var a=this,s=this.w.config,r=this.w.globals,o=[];i.forEach((function(t){t.alreadyExists&&(void 0===o[t.index]&&(o[t.index]=[]),o[t.index].push(t.index),o[t.index].push(t.similarIndex));})),r.yAxisSameScaleIndices=o,o.forEach((function(t,e){o.forEach((function(i,a){var s,r;e!==a&&(s=t,r=i,s.filter((function(t){return -1!==r.indexOf(t)}))).length>0&&(o[e]=o[e].concat(o[a]));}));}));var n=o.map((function(t){return t.filter((function(e,i){return t.indexOf(e)===i}))})).map((function(t){return t.sort()}));o=o.filter((function(t){return !!t}));var l=n.slice(),h=l.map((function(t){return JSON.stringify(t)}));l=l.filter((function(t,e){return h.indexOf(JSON.stringify(t))===e}));var c=[],d=[];t.forEach((function(t,i){l.forEach((function(a,s){a.indexOf(i)>-1&&(void 0===c[s]&&(c[s]=[],d[s]=[]),c[s].push({key:i,value:t}),d[s].push({key:i,value:e[i]}));}));}));var g=Array.apply(null,Array(l.length)).map(Number.prototype.valueOf,Number.MIN_VALUE),u=Array.apply(null,Array(l.length)).map(Number.prototype.valueOf,-Number.MAX_VALUE);c.forEach((function(t,e){t.forEach((function(t,i){g[e]=Math.min(t.value,g[e]);}));})),d.forEach((function(t,e){t.forEach((function(t,i){u[e]=Math.max(t.value,u[e]);}));})),t.forEach((function(t,e){d.forEach((function(t,i){var o=g[i],n=u[i];s.chart.stacked&&(n=0,t.forEach((function(t,e){t.value!==-Number.MAX_VALUE&&(n+=t.value),o!==Number.MIN_VALUE&&(o+=c[i][e].value);}))),t.forEach((function(i,l){t[l].key===e&&(void 0!==s.yaxis[e].min&&(o="function"==typeof s.yaxis[e].min?s.yaxis[e].min(r.minY):s.yaxis[e].min),void 0!==s.yaxis[e].max&&(n="function"==typeof s.yaxis[e].max?s.yaxis[e].max(r.maxY):s.yaxis[e].max),a.setYScaleForIndex(e,o,n));}));}));}));}},{key:"autoScaleY",value:function(t,e,i){t||(t=this);var a=t.w;if(a.globals.isMultipleYAxis||a.globals.collapsedSeries.length)return console.warn("autoScaleYaxis not supported in a multi-yaxis chart."),e;var s=a.globals.seriesX[0],r=a.config.chart.stacked;return e.forEach((function(t,o){for(var n=0,l=0;l<s.length;l++)if(s[l]>=i.xaxis.min){n=l;break}var h,c,d=a.globals.minYArr[o],g=a.globals.maxYArr[o],u=a.globals.stackedSeriesTotals;a.globals.series.forEach((function(o,l){var p=o[n];r?(p=u[n],h=c=p,u.forEach((function(t,e){s[e]<=i.xaxis.max&&s[e]>=i.xaxis.min&&(t>c&&null!==t&&(c=t),o[e]<h&&null!==o[e]&&(h=o[e]));}))):(h=c=p,o.forEach((function(t,e){if(s[e]<=i.xaxis.max&&s[e]>=i.xaxis.min){var r=t,o=t;a.globals.series.forEach((function(i,a){null!==t&&(r=Math.min(i[e],r),o=Math.max(i[e],o));})),o>c&&null!==o&&(c=o),r<h&&null!==r&&(h=r);}}))),void 0===h&&void 0===c&&(h=d,c=g),c*=c<0?.9:1.1,0===(h*=h<0?1.1:.9)&&0===c&&(h=-1,c=1),c<0&&c<g&&(c=g),h<0&&h>d&&(h=d),e.length>1?(e[l].min=void 0===t.min?h:t.min,e[l].max=void 0===t.max?c:t.max):(e[0].min=void 0===t.min?h:t.min,e[0].max=void 0===t.max?c:t.max);}));})),e}}]),t}(),U=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.scales=new _(e);}return r(t,[{key:"init",value:function(){this.setYRange(),this.setXRange(),this.setZRange();}},{key:"getMinYMaxY",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.MAX_VALUE,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-Number.MAX_VALUE,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,s=this.w.config,r=this.w.globals,o=-Number.MAX_VALUE,n=Number.MIN_VALUE;null===a&&(a=t+1);var l=r.series,h=l,c=l;"candlestick"===s.chart.type?(h=r.seriesCandleL,c=r.seriesCandleH):"boxPlot"===s.chart.type?(h=r.seriesCandleO,c=r.seriesCandleC):r.isRangeData&&(h=r.seriesRangeStart,c=r.seriesRangeEnd);for(var d=t;d<a;d++){r.dataPoints=Math.max(r.dataPoints,l[d].length),r.categoryLabels.length&&(r.dataPoints=r.categoryLabels.filter((function(t){return void 0!==t})).length),r.labels.length&&"datetime"!==s.xaxis.type&&0!==r.series.reduce((function(t,e){return t+e.length}),0)&&(r.dataPoints=Math.max(r.dataPoints,r.labels.length));for(var g=0;g<r.series[d].length;g++){var u=l[d][g];null!==u&&x.isNumber(u)?(void 0!==c[d][g]&&(o=Math.max(o,c[d][g]),e=Math.min(e,c[d][g])),void 0!==h[d][g]&&(e=Math.min(e,h[d][g]),i=Math.max(i,h[d][g])),"candlestick"!==this.w.config.chart.type&&"boxPlot"!==this.w.config.chart.type&&"rangeArea"===this.w.config.chart.type&&"rangeBar"===this.w.config.chart.type||("candlestick"!==this.w.config.chart.type&&"boxPlot"!==this.w.config.chart.type||void 0!==r.seriesCandleC[d][g]&&(o=Math.max(o,r.seriesCandleO[d][g]),o=Math.max(o,r.seriesCandleH[d][g]),o=Math.max(o,r.seriesCandleL[d][g]),o=Math.max(o,r.seriesCandleC[d][g]),"boxPlot"===this.w.config.chart.type&&(o=Math.max(o,r.seriesCandleM[d][g]))),!s.series[d].type||"candlestick"===s.series[d].type&&"boxPlot"===s.series[d].type&&"rangeArea"===s.series[d].type&&"rangeBar"===s.series[d].type||(o=Math.max(o,r.series[d][g]),e=Math.min(e,r.series[d][g])),i=o),r.seriesGoals[d]&&r.seriesGoals[d][g]&&Array.isArray(r.seriesGoals[d][g])&&r.seriesGoals[d][g].forEach((function(t){n!==Number.MIN_VALUE&&(n=Math.min(n,t.value),e=n),o=Math.max(o,t.value),i=o;})),x.isFloat(u)&&(u=x.noExponents(u),r.yValueDecimal=Math.max(r.yValueDecimal,u.toString().split(".")[1].length)),n>h[d][g]&&h[d][g]<0&&(n=h[d][g])):r.hasNullValues=!0;}}return "rangeBar"===s.chart.type&&r.seriesRangeStart.length&&r.isBarHorizontal&&(n=e),"bar"===s.chart.type&&(n<0&&o<0&&(o=0),n===Number.MIN_VALUE&&(n=0)),{minY:n,maxY:o,lowestY:e,highestY:i}}},{key:"setYRange",value:function(){var t=this.w.globals,e=this.w.config;t.maxY=-Number.MAX_VALUE,t.minY=Number.MIN_VALUE;var i=Number.MAX_VALUE;if(t.isMultipleYAxis)for(var a=0;a<t.series.length;a++){var s=this.getMinYMaxY(a,i,null,a+1);t.minYArr.push(s.minY),t.maxYArr.push(s.maxY),i=s.lowestY;}var r=this.getMinYMaxY(0,i,null,t.series.length);if(t.minY=r.minY,t.maxY=r.maxY,i=r.lowestY,e.chart.stacked&&this._setStackedMinMax(),("line"===e.chart.type||"area"===e.chart.type||"candlestick"===e.chart.type||"boxPlot"===e.chart.type||"rangeBar"===e.chart.type&&!t.isBarHorizontal)&&t.minY===Number.MIN_VALUE&&i!==-Number.MAX_VALUE&&i!==t.maxY){var o=t.maxY-i;(i>=0&&i<=10||void 0!==e.yaxis[0].min||void 0!==e.yaxis[0].max)&&(o=0),t.minY=i-5*o/100,i>0&&t.minY<0&&(t.minY=0),t.maxY=t.maxY+5*o/100;}if(e.yaxis.forEach((function(e,i){void 0!==e.max&&("number"==typeof e.max?t.maxYArr[i]=e.max:"function"==typeof e.max&&(t.maxYArr[i]=e.max(t.isMultipleYAxis?t.maxYArr[i]:t.maxY)),t.maxY=t.maxYArr[i]),void 0!==e.min&&("number"==typeof e.min?t.minYArr[i]=e.min:"function"==typeof e.min&&(t.minYArr[i]=e.min(t.isMultipleYAxis?t.minYArr[i]===Number.MIN_VALUE?0:t.minYArr[i]:t.minY)),t.minY=t.minYArr[i]);})),t.isBarHorizontal){["min","max"].forEach((function(i){void 0!==e.xaxis[i]&&"number"==typeof e.xaxis[i]&&("min"===i?t.minY=e.xaxis[i]:t.maxY=e.xaxis[i]);}));}return t.isMultipleYAxis?(this.scales.setMultipleYScales(),t.minY=i,t.yAxisScale.forEach((function(e,i){t.minYArr[i]=e.niceMin,t.maxYArr[i]=e.niceMax;}))):(this.scales.setYScaleForIndex(0,t.minY,t.maxY),t.minY=t.yAxisScale[0].niceMin,t.maxY=t.yAxisScale[0].niceMax,t.minYArr[0]=t.yAxisScale[0].niceMin,t.maxYArr[0]=t.yAxisScale[0].niceMax),{minY:t.minY,maxY:t.maxY,minYArr:t.minYArr,maxYArr:t.maxYArr,yAxisScale:t.yAxisScale}}},{key:"setXRange",value:function(){var t=this.w.globals,e=this.w.config,i="numeric"===e.xaxis.type||"datetime"===e.xaxis.type||"category"===e.xaxis.type&&!t.noLabelsProvided||t.noLabelsProvided||t.isXNumeric;if(t.isXNumeric&&function(){for(var e=0;e<t.series.length;e++)if(t.labels[e])for(var i=0;i<t.labels[e].length;i++)null!==t.labels[e][i]&&x.isNumber(t.labels[e][i])&&(t.maxX=Math.max(t.maxX,t.labels[e][i]),t.initialMaxX=Math.max(t.maxX,t.labels[e][i]),t.minX=Math.min(t.minX,t.labels[e][i]),t.initialMinX=Math.min(t.minX,t.labels[e][i]));}(),t.noLabelsProvided&&0===e.xaxis.categories.length&&(t.maxX=t.labels[t.labels.length-1],t.initialMaxX=t.labels[t.labels.length-1],t.minX=1,t.initialMinX=1),t.isXNumeric||t.noLabelsProvided||t.dataFormatXNumeric){var a;if(void 0===e.xaxis.tickAmount?(a=Math.round(t.svgWidth/150),"numeric"===e.xaxis.type&&t.dataPoints<30&&(a=t.dataPoints-1),a>t.dataPoints&&0!==t.dataPoints&&(a=t.dataPoints-1)):"dataPoints"===e.xaxis.tickAmount?(t.series.length>1&&(a=t.series[t.maxValsInArrayIndex].length-1),t.isXNumeric&&(a=t.maxX-t.minX-1)):a=e.xaxis.tickAmount,t.xTickAmount=a,void 0!==e.xaxis.max&&"number"==typeof e.xaxis.max&&(t.maxX=e.xaxis.max),void 0!==e.xaxis.min&&"number"==typeof e.xaxis.min&&(t.minX=e.xaxis.min),void 0!==e.xaxis.range&&(t.minX=t.maxX-e.xaxis.range),t.minX!==Number.MAX_VALUE&&t.maxX!==-Number.MAX_VALUE)if(e.xaxis.convertedCatToNumeric&&!t.dataFormatXNumeric){for(var s=[],r=t.minX-1;r<t.maxX;r++)s.push(r+1);t.xAxisScale={result:s,niceMin:s[0],niceMax:s[s.length-1]};}else t.xAxisScale=this.scales.setXScale(t.minX,t.maxX);else t.xAxisScale=this.scales.linearScale(0,a,a),t.noLabelsProvided&&t.labels.length>0&&(t.xAxisScale=this.scales.linearScale(1,t.labels.length,a-1),t.seriesX=t.labels.slice());i&&(t.labels=t.xAxisScale.result.slice());}return t.isBarHorizontal&&t.labels.length&&(t.xTickAmount=t.labels.length),this._handleSingleDataPoint(),this._getMinXDiff(),{minX:t.minX,maxX:t.maxX}}},{key:"setZRange",value:function(){var t=this.w.globals;if(t.isDataXYZ)for(var e=0;e<t.series.length;e++)if(void 0!==t.seriesZ[e])for(var i=0;i<t.seriesZ[e].length;i++)null!==t.seriesZ[e][i]&&x.isNumber(t.seriesZ[e][i])&&(t.maxZ=Math.max(t.maxZ,t.seriesZ[e][i]),t.minZ=Math.min(t.minZ,t.seriesZ[e][i]));}},{key:"_handleSingleDataPoint",value:function(){var t=this.w.globals,e=this.w.config;if(t.minX===t.maxX){var i=new I(this.ctx);if("datetime"===e.xaxis.type){var a=i.getDate(t.minX);e.xaxis.labels.datetimeUTC?a.setUTCDate(a.getUTCDate()-2):a.setDate(a.getDate()-2),t.minX=new Date(a).getTime();var s=i.getDate(t.maxX);e.xaxis.labels.datetimeUTC?s.setUTCDate(s.getUTCDate()+2):s.setDate(s.getDate()+2),t.maxX=new Date(s).getTime();}else ("numeric"===e.xaxis.type||"category"===e.xaxis.type&&!t.noLabelsProvided)&&(t.minX=t.minX-2,t.initialMinX=t.minX,t.maxX=t.maxX+2,t.initialMaxX=t.maxX);}}},{key:"_getMinXDiff",value:function(){var t=this.w.globals;t.isXNumeric&&t.seriesX.forEach((function(e,i){1===e.length&&e.push(t.seriesX[t.maxValsInArrayIndex][t.seriesX[t.maxValsInArrayIndex].length-1]);var a=e.slice();a.sort((function(t,e){return t-e})),a.forEach((function(e,i){if(i>0){var s=e-a[i-1];s>0&&(t.minXDiff=Math.min(s,t.minXDiff));}})),1!==t.dataPoints&&t.minXDiff!==Number.MAX_VALUE||(t.minXDiff=.5);}));}},{key:"_setStackedMinMax",value:function(){var t=this,e=this.w.globals;if(e.series.length){var i=e.seriesGroups;i.length||(i=[this.w.config.series.map((function(t){return t.name}))]);var a={},s={};i.forEach((function(i){a[i]=[],s[i]=[],t.w.config.series.map((function(t,e){return i.indexOf(t.name)>-1?e:null})).filter((function(t){return null!==t})).forEach((function(t){for(var r=0;r<e.series[e.maxValsInArrayIndex].length;r++)void 0===a[i][r]&&(a[i][r]=0,s[i][r]=0),null!==e.series[t][r]&&x.isNumber(e.series[t][r])&&(e.series[t][r]>0?a[i][r]+=parseFloat(e.series[t][r])+1e-4:s[i][r]+=parseFloat(e.series[t][r]));}));})),Object.entries(a).forEach((function(t){var i=g(t,1)[0];a[i].forEach((function(t,r){e.maxY=Math.max(e.maxY,a[i][r]),e.minY=Math.min(e.minY,s[i][r]);}));}));}}}]),t}(),q=function(){function t(e,i){a(this,t),this.ctx=e,this.elgrid=i,this.w=e.w;var s=this.w;this.xaxisFontSize=s.config.xaxis.labels.style.fontSize,this.axisFontFamily=s.config.xaxis.labels.style.fontFamily,this.xaxisForeColors=s.config.xaxis.labels.style.colors,this.isCategoryBarHorizontal="bar"===s.config.chart.type&&s.config.plotOptions.bar.horizontal,this.xAxisoffX=0,"bottom"===s.config.xaxis.position&&(this.xAxisoffX=s.globals.gridHeight),this.drawnLabels=[],this.axesUtils=new B(e);}return r(t,[{key:"drawYaxis",value:function(t){var e=this,i=this.w,a=new m(this.ctx),s=i.config.yaxis[t].labels.style,r=s.fontSize,o=s.fontFamily,n=s.fontWeight,l=a.group({class:"apexcharts-yaxis",rel:t,transform:"translate("+i.globals.translateYAxisX[t]+", 0)"});if(this.axesUtils.isYAxisHidden(t))return l;var h=a.group({class:"apexcharts-yaxis-texts-g"});l.add(h);var c=i.globals.yAxisScale[t].result.length-1,d=i.globals.gridHeight/c,g=i.globals.translateY,u=i.globals.yLabelFormatters[t],p=i.globals.yAxisScale[t].result.slice();p=this.axesUtils.checkForReversedLabels(t,p);var f="";if(i.config.yaxis[t].labels.show)for(var x=function(l){var x=p[l];x=u(x,l,i);var b=i.config.yaxis[t].labels.padding;i.config.yaxis[t].opposite&&0!==i.config.yaxis.length&&(b*=-1);var v="end";i.config.yaxis[t].opposite&&(v="start"),"left"===i.config.yaxis[t].labels.align?v="start":"center"===i.config.yaxis[t].labels.align?v="middle":"right"===i.config.yaxis[t].labels.align&&(v="end");var m=e.axesUtils.getYAxisForeColor(s.colors,t),y=i.config.yaxis[t].labels.offsetY;"heatmap"===i.config.chart.type&&(y-=(i.globals.gridHeight/i.globals.series.length-1)/2);var w=a.drawText({x:b,y:g+c/10+y+1,text:x,textAnchor:v,fontSize:r,fontFamily:o,fontWeight:n,maxWidth:i.config.yaxis[t].labels.maxWidth,foreColor:Array.isArray(m)?m[l]:m,isPlainText:!1,cssClass:"apexcharts-yaxis-label "+s.cssClass});l===c&&(f=w),h.add(w);var k=document.createElementNS(i.globals.SVGNS,"title");if(k.textContent=Array.isArray(x)?x.join(" "):x,w.node.appendChild(k),0!==i.config.yaxis[t].labels.rotate){var A=a.rotateAroundCenter(f.node),S=a.rotateAroundCenter(w.node);w.node.setAttribute("transform","rotate(".concat(i.config.yaxis[t].labels.rotate," ").concat(A.x," ").concat(S.y,")"));}g+=d;},b=c;b>=0;b--)x(b);if(void 0!==i.config.yaxis[t].title.text){var v=a.group({class:"apexcharts-yaxis-title"}),y=0;i.config.yaxis[t].opposite&&(y=i.globals.translateYAxisX[t]);var w=a.drawText({x:y,y:i.globals.gridHeight/2+i.globals.translateY+i.config.yaxis[t].title.offsetY,text:i.config.yaxis[t].title.text,textAnchor:"end",foreColor:i.config.yaxis[t].title.style.color,fontSize:i.config.yaxis[t].title.style.fontSize,fontWeight:i.config.yaxis[t].title.style.fontWeight,fontFamily:i.config.yaxis[t].title.style.fontFamily,cssClass:"apexcharts-yaxis-title-text "+i.config.yaxis[t].title.style.cssClass});v.add(w),l.add(v);}var k=i.config.yaxis[t].axisBorder,A=31+k.offsetX;if(i.config.yaxis[t].opposite&&(A=-31-k.offsetX),k.show){var S=a.drawLine(A,i.globals.translateY+k.offsetY-2,A,i.globals.gridHeight+i.globals.translateY+k.offsetY+2,k.color,0,k.width);l.add(S);}return i.config.yaxis[t].axisTicks.show&&this.axesUtils.drawYAxisTicks(A,c,k,i.config.yaxis[t].axisTicks,t,d,l),l}},{key:"drawYaxisInversed",value:function(t){var e=this.w,i=new m(this.ctx),a=i.group({class:"apexcharts-xaxis apexcharts-yaxis-inversed"}),s=i.group({class:"apexcharts-xaxis-texts-g",transform:"translate(".concat(e.globals.translateXAxisX,", ").concat(e.globals.translateXAxisY,")")});a.add(s);var r=e.globals.yAxisScale[t].result.length-1,o=e.globals.gridWidth/r+.1,n=o+e.config.xaxis.labels.offsetX,l=e.globals.xLabelFormatter,h=e.globals.yAxisScale[t].result.slice(),c=e.globals.timescaleLabels;c.length>0&&(this.xaxisLabels=c.slice(),r=(h=c.slice()).length),h=this.axesUtils.checkForReversedLabels(t,h);var d=c.length;if(e.config.xaxis.labels.show)for(var g=d?0:r;d?g<d:g>=0;d?g++:g--){var u=h[g];u=l(u,g,e);var p=e.globals.gridWidth+e.globals.padHorizontal-(n-o+e.config.xaxis.labels.offsetX);if(c.length){var f=this.axesUtils.getLabel(h,c,p,g,this.drawnLabels,this.xaxisFontSize);p=f.x,u=f.text,this.drawnLabels.push(f.text),0===g&&e.globals.skipFirstTimelinelabel&&(u=""),g===h.length-1&&e.globals.skipLastTimelinelabel&&(u="");}var x=i.drawText({x:p,y:this.xAxisoffX+e.config.xaxis.labels.offsetY+30-("top"===e.config.xaxis.position?e.globals.xAxisHeight+e.config.xaxis.axisTicks.height-2:0),text:u,textAnchor:"middle",foreColor:Array.isArray(this.xaxisForeColors)?this.xaxisForeColors[t]:this.xaxisForeColors,fontSize:this.xaxisFontSize,fontFamily:this.xaxisFontFamily,fontWeight:e.config.xaxis.labels.style.fontWeight,isPlainText:!1,cssClass:"apexcharts-xaxis-label "+e.config.xaxis.labels.style.cssClass});s.add(x),x.tspan(u);var b=document.createElementNS(e.globals.SVGNS,"title");b.textContent=u,x.node.appendChild(b),n+=o;}return this.inversedYAxisTitleText(a),this.inversedYAxisBorder(a),a}},{key:"inversedYAxisBorder",value:function(t){var e=this.w,i=new m(this.ctx),a=e.config.xaxis.axisBorder;if(a.show){var s=0;"bar"===e.config.chart.type&&e.globals.isXNumeric&&(s-=15);var r=i.drawLine(e.globals.padHorizontal+s+a.offsetX,this.xAxisoffX,e.globals.gridWidth,this.xAxisoffX,a.color,0,a.height);this.elgrid&&this.elgrid.elGridBorders&&e.config.grid.show?this.elgrid.elGridBorders.add(r):t.add(r);}}},{key:"inversedYAxisTitleText",value:function(t){var e=this.w,i=new m(this.ctx);if(void 0!==e.config.xaxis.title.text){var a=i.group({class:"apexcharts-xaxis-title apexcharts-yaxis-title-inversed"}),s=i.drawText({x:e.globals.gridWidth/2+e.config.xaxis.title.offsetX,y:this.xAxisoffX+parseFloat(this.xaxisFontSize)+parseFloat(e.config.xaxis.title.style.fontSize)+e.config.xaxis.title.offsetY+20,text:e.config.xaxis.title.text,textAnchor:"middle",fontSize:e.config.xaxis.title.style.fontSize,fontFamily:e.config.xaxis.title.style.fontFamily,fontWeight:e.config.xaxis.title.style.fontWeight,foreColor:e.config.xaxis.title.style.color,cssClass:"apexcharts-xaxis-title-text "+e.config.xaxis.title.style.cssClass});a.add(s),t.add(a);}}},{key:"yAxisTitleRotate",value:function(t,e){var i=this.w,a=new m(this.ctx),s={width:0,height:0},r={width:0,height:0},o=i.globals.dom.baseEl.querySelector(" .apexcharts-yaxis[rel='".concat(t,"'] .apexcharts-yaxis-texts-g"));null!==o&&(s=o.getBoundingClientRect());var n=i.globals.dom.baseEl.querySelector(".apexcharts-yaxis[rel='".concat(t,"'] .apexcharts-yaxis-title text"));if(null!==n&&(r=n.getBoundingClientRect()),null!==n){var l=this.xPaddingForYAxisTitle(t,s,r,e);n.setAttribute("x",l.xPos-(e?10:0));}if(null!==n){var h=a.rotateAroundCenter(n);n.setAttribute("transform","rotate(".concat(e?-1*i.config.yaxis[t].title.rotate:i.config.yaxis[t].title.rotate," ").concat(h.x," ").concat(h.y,")"));}}},{key:"xPaddingForYAxisTitle",value:function(t,e,i,a){var s=this.w,r=0,o=0,n=10;return void 0===s.config.yaxis[t].title.text||t<0?{xPos:o,padd:0}:(a?(o=e.width+s.config.yaxis[t].title.offsetX+i.width/2+n/2,0===(r+=1)&&(o-=n/2)):(o=-1*e.width+s.config.yaxis[t].title.offsetX+n/2+i.width/2,s.globals.isBarHorizontal&&(n=25,o=-1*e.width-s.config.yaxis[t].title.offsetX-n)),{xPos:o,padd:n})}},{key:"setYAxisXPosition",value:function(t,e){var i=this.w,a=0,s=0,r=18,o=1;i.config.yaxis.length>1&&(this.multipleYs=!0),i.config.yaxis.map((function(n,l){var h=i.globals.ignoreYAxisIndexes.indexOf(l)>-1||!n.show||n.floating||0===t[l].width,c=t[l].width+e[l].width;n.opposite?i.globals.isBarHorizontal?(s=i.globals.gridWidth+i.globals.translateX-1,i.globals.translateYAxisX[l]=s-n.labels.offsetX):(s=i.globals.gridWidth+i.globals.translateX+o,h||(o=o+c+20),i.globals.translateYAxisX[l]=s-n.labels.offsetX+20):(a=i.globals.translateX-r,h||(r=r+c+20),i.globals.translateYAxisX[l]=a+n.labels.offsetX);}));}},{key:"setYAxisTextAlignments",value:function(){var t=this.w,e=t.globals.dom.baseEl.getElementsByClassName("apexcharts-yaxis");(e=x.listToArray(e)).forEach((function(e,i){var a=t.config.yaxis[i];if(a&&!a.floating&&void 0!==a.labels.align){var s=t.globals.dom.baseEl.querySelector(".apexcharts-yaxis[rel='".concat(i,"'] .apexcharts-yaxis-texts-g")),r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis[rel='".concat(i,"'] .apexcharts-yaxis-label"));r=x.listToArray(r);var o=s.getBoundingClientRect();"left"===a.labels.align?(r.forEach((function(t,e){t.setAttribute("text-anchor","start");})),a.opposite||s.setAttribute("transform","translate(-".concat(o.width,", 0)"))):"center"===a.labels.align?(r.forEach((function(t,e){t.setAttribute("text-anchor","middle");})),s.setAttribute("transform","translate(".concat(o.width/2*(a.opposite?1:-1),", 0)"))):"right"===a.labels.align&&(r.forEach((function(t,e){t.setAttribute("text-anchor","end");})),a.opposite&&s.setAttribute("transform","translate(".concat(o.width,", 0)")));}}));}}]),t}(),Z=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.documentEvent=x.bind(this.documentEvent,this);}return r(t,[{key:"addEventListener",value:function(t,e){var i=this.w;i.globals.events.hasOwnProperty(t)?i.globals.events[t].push(e):i.globals.events[t]=[e];}},{key:"removeEventListener",value:function(t,e){var i=this.w;if(i.globals.events.hasOwnProperty(t)){var a=i.globals.events[t].indexOf(e);-1!==a&&i.globals.events[t].splice(a,1);}}},{key:"fireEvent",value:function(t,e){var i=this.w;if(i.globals.events.hasOwnProperty(t)){e&&e.length||(e=[]);for(var a=i.globals.events[t],s=a.length,r=0;r<s;r++)a[r].apply(null,e);}}},{key:"setupEventHandlers",value:function(){var t=this,e=this.w,i=this.ctx,a=e.globals.dom.baseEl.querySelector(e.globals.chartClass);this.ctx.eventList.forEach((function(t){a.addEventListener(t,(function(t){var a=Object.assign({},e,{seriesIndex:e.globals.capturedSeriesIndex,dataPointIndex:e.globals.capturedDataPointIndex});"mousemove"===t.type||"touchmove"===t.type?"function"==typeof e.config.chart.events.mouseMove&&e.config.chart.events.mouseMove(t,i,a):"mouseleave"===t.type||"touchleave"===t.type?"function"==typeof e.config.chart.events.mouseLeave&&e.config.chart.events.mouseLeave(t,i,a):("mouseup"===t.type&&1===t.which||"touchend"===t.type)&&("function"==typeof e.config.chart.events.click&&e.config.chart.events.click(t,i,a),i.ctx.events.fireEvent("click",[t,i,a]));}),{capture:!1,passive:!0});})),this.ctx.eventList.forEach((function(i){e.globals.dom.baseEl.addEventListener(i,t.documentEvent,{passive:!0});})),this.ctx.core.setupBrushHandler();}},{key:"documentEvent",value:function(t){var e=this.w,i=t.target.className;if("click"===t.type){var a=e.globals.dom.baseEl.querySelector(".apexcharts-menu");a&&a.classList.contains("apexcharts-menu-open")&&"apexcharts-menu-icon"!==i&&a.classList.remove("apexcharts-menu-open");}e.globals.clientX="touchmove"===t.type?t.touches[0].clientX:t.clientX,e.globals.clientY="touchmove"===t.type?t.touches[0].clientY:t.clientY;}}]),t}(),$=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"setCurrentLocaleValues",value:function(t){var e=this.w.config.chart.locales;window.Apex.chart&&window.Apex.chart.locales&&window.Apex.chart.locales.length>0&&(e=this.w.config.chart.locales.concat(window.Apex.chart.locales));var i=e.filter((function(e){return e.name===t}))[0];if(!i)throw new Error("Wrong locale name provided. Please make sure you set the correct locale name in options");var a=x.extend(C,i);this.w.globals.locale=a.options;}}]),t}(),J=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"drawAxis",value:function(t,e){var i,a,s=this,r=this.w.globals,o=this.w.config,n=new V(this.ctx,e),l=new q(this.ctx,e);r.axisCharts&&"radar"!==t&&(r.isBarHorizontal?(a=l.drawYaxisInversed(0),i=n.drawXaxisInversed(0),r.dom.elGraphical.add(i),r.dom.elGraphical.add(a)):(i=n.drawXaxis(),r.dom.elGraphical.add(i),o.yaxis.map((function(t,e){if(-1===r.ignoreYAxisIndexes.indexOf(e)&&(a=l.drawYaxis(e),r.dom.Paper.add(a),"back"===s.w.config.grid.position)){var i=r.dom.Paper.children()[1];i.remove(),r.dom.Paper.add(i);}}))));}}]),t}(),Q=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"drawXCrosshairs",value:function(){var t=this.w,e=new m(this.ctx),i=new v(this.ctx),a=t.config.xaxis.crosshairs.fill.gradient,s=t.config.xaxis.crosshairs.dropShadow,r=t.config.xaxis.crosshairs.fill.type,o=a.colorFrom,n=a.colorTo,l=a.opacityFrom,h=a.opacityTo,c=a.stops,d=s.enabled,g=s.left,u=s.top,p=s.blur,f=s.color,b=s.opacity,y=t.config.xaxis.crosshairs.fill.color;if(t.config.xaxis.crosshairs.show){"gradient"===r&&(y=e.drawGradient("vertical",o,n,l,h,null,c,null));var w=e.drawRect();1===t.config.xaxis.crosshairs.width&&(w=e.drawLine());var k=t.globals.gridHeight;(!x.isNumber(k)||k<0)&&(k=0);var A=t.config.xaxis.crosshairs.width;(!x.isNumber(A)||A<0)&&(A=0),w.attr({class:"apexcharts-xcrosshairs",x:0,y:0,y2:k,width:A,height:k,fill:y,filter:"none","fill-opacity":t.config.xaxis.crosshairs.opacity,stroke:t.config.xaxis.crosshairs.stroke.color,"stroke-width":t.config.xaxis.crosshairs.stroke.width,"stroke-dasharray":t.config.xaxis.crosshairs.stroke.dashArray}),d&&(w=i.dropShadow(w,{left:g,top:u,blur:p,color:f,opacity:b})),t.globals.dom.elGraphical.add(w);}}},{key:"drawYCrosshairs",value:function(){var t=this.w,e=new m(this.ctx),i=t.config.yaxis[0].crosshairs,a=t.globals.barPadForNumericAxis;if(t.config.yaxis[0].crosshairs.show){var s=e.drawLine(-a,0,t.globals.gridWidth+a,0,i.stroke.color,i.stroke.dashArray,i.stroke.width);s.attr({class:"apexcharts-ycrosshairs"}),t.globals.dom.elGraphical.add(s);}var r=e.drawLine(-a,0,t.globals.gridWidth+a,0,i.stroke.color,0,0);r.attr({class:"apexcharts-ycrosshairs-hidden"}),t.globals.dom.elGraphical.add(r);}}]),t}(),K=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"checkResponsiveConfig",value:function(t){var e=this,i=this.w,a=i.config;if(0!==a.responsive.length){var s=a.responsive.slice();s.sort((function(t,e){return t.breakpoint>e.breakpoint?1:e.breakpoint>t.breakpoint?-1:0})).reverse();var r=new E({}),o=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=s[0].breakpoint,o=window.innerWidth>0?window.innerWidth:screen.width;if(o>a){var n=y.extendArrayProps(r,i.globals.initialConfig,i);t=x.extend(n,t),t=x.extend(i.config,t),e.overrideResponsiveOptions(t);}else for(var l=0;l<s.length;l++)o<s[l].breakpoint&&(t=y.extendArrayProps(r,s[l].options,i),t=x.extend(i.config,t),e.overrideResponsiveOptions(t));};if(t){var n=y.extendArrayProps(r,t,i);n=x.extend(i.config,n),o(n=x.extend(n,t));}else o({});}}},{key:"overrideResponsiveOptions",value:function(t){var e=new E(t).init({responsiveOverride:!0});this.w.config=e;}}]),t}(),tt=function(){function t(e){a(this,t),this.ctx=e,this.colors=[],this.w=e.w;var i=this.w;this.isColorFn=!1,this.isHeatmapDistributed="treemap"===i.config.chart.type&&i.config.plotOptions.treemap.distributed||"heatmap"===i.config.chart.type&&i.config.plotOptions.heatmap.distributed,this.isBarDistributed=i.config.plotOptions.bar.distributed&&("bar"===i.config.chart.type||"rangeBar"===i.config.chart.type);}return r(t,[{key:"init",value:function(){this.setDefaultColors();}},{key:"setDefaultColors",value:function(){var t,e=this,i=this.w,a=new x;if(i.globals.dom.elWrap.classList.add("apexcharts-theme-".concat(i.config.theme.mode)),void 0===i.config.colors||0===(null===(t=i.config.colors)||void 0===t?void 0:t.length)?i.globals.colors=this.predefined():(i.globals.colors=i.config.colors,Array.isArray(i.config.colors)&&i.config.colors.length>0&&"function"==typeof i.config.colors[0]&&(i.globals.colors=i.config.series.map((function(t,a){var s=i.config.colors[a];return s||(s=i.config.colors[0]),"function"==typeof s?(e.isColorFn=!0,s({value:i.globals.axisCharts?i.globals.series[a][0]?i.globals.series[a][0]:0:i.globals.series[a],seriesIndex:a,dataPointIndex:a,w:i})):s})))),i.globals.seriesColors.map((function(t,e){t&&(i.globals.colors[e]=t);})),i.config.theme.monochrome.enabled){var s=[],r=i.globals.series.length;(this.isBarDistributed||this.isHeatmapDistributed)&&(r=i.globals.series[0].length*i.globals.series.length);for(var o=i.config.theme.monochrome.color,n=1/(r/i.config.theme.monochrome.shadeIntensity),l=i.config.theme.monochrome.shadeTo,h=0,c=0;c<r;c++){var d=void 0;"dark"===l?(d=a.shadeColor(-1*h,o),h+=n):(d=a.shadeColor(h,o),h+=n),s.push(d);}i.globals.colors=s.slice();}var g=i.globals.colors.slice();this.pushExtraColors(i.globals.colors);["fill","stroke"].forEach((function(t){void 0===i.config[t].colors?i.globals[t].colors=e.isColorFn?i.config.colors:g:i.globals[t].colors=i.config[t].colors.slice(),e.pushExtraColors(i.globals[t].colors);})),void 0===i.config.dataLabels.style.colors?i.globals.dataLabels.style.colors=g:i.globals.dataLabels.style.colors=i.config.dataLabels.style.colors.slice(),this.pushExtraColors(i.globals.dataLabels.style.colors,50),void 0===i.config.plotOptions.radar.polygons.fill.colors?i.globals.radarPolygons.fill.colors=["dark"===i.config.theme.mode?"#424242":"none"]:i.globals.radarPolygons.fill.colors=i.config.plotOptions.radar.polygons.fill.colors.slice(),this.pushExtraColors(i.globals.radarPolygons.fill.colors,20),void 0===i.config.markers.colors?i.globals.markers.colors=g:i.globals.markers.colors=i.config.markers.colors.slice(),this.pushExtraColors(i.globals.markers.colors);}},{key:"pushExtraColors",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=this.w,s=e||a.globals.series.length;if(null===i&&(i=this.isBarDistributed||this.isHeatmapDistributed||"heatmap"===a.config.chart.type&&a.config.plotOptions.heatmap.colorScale.inverse),i&&a.globals.series.length&&(s=a.globals.series[a.globals.maxValsInArrayIndex].length*a.globals.series.length),t.length<s)for(var r=s-t.length,o=0;o<r;o++)t.push(t[o]);}},{key:"updateThemeOptions",value:function(t){t.chart=t.chart||{},t.tooltip=t.tooltip||{};var e=t.theme.mode||"light",i=t.theme.palette?t.theme.palette:"dark"===e?"palette4":"palette1",a=t.chart.foreColor?t.chart.foreColor:"dark"===e?"#f6f7f8":"#373d3f";return t.tooltip.theme=e,t.chart.foreColor=a,t.theme.palette=i,t}},{key:"predefined",value:function(){switch(this.w.config.theme.palette){case"palette1":default:this.colors=["#008FFB","#00E396","#FEB019","#FF4560","#775DD0"];break;case"palette2":this.colors=["#3f51b5","#03a9f4","#4caf50","#f9ce1d","#FF9800"];break;case"palette3":this.colors=["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B"];break;case"palette4":this.colors=["#4ecdc4","#c7f464","#81D4FA","#fd6a6a","#546E7A"];break;case"palette5":this.colors=["#2b908f","#f9a3a4","#90ee7e","#fa4443","#69d2e7"];break;case"palette6":this.colors=["#449DD1","#F86624","#EA3546","#662E9B","#C5D86D"];break;case"palette7":this.colors=["#D7263D","#1B998B","#2E294E","#F46036","#E2C044"];break;case"palette8":this.colors=["#662E9B","#F86624","#F9C80E","#EA3546","#43BCCD"];break;case"palette9":this.colors=["#5C4742","#A5978B","#8D5B4C","#5A2A27","#C4BBAF"];break;case"palette10":this.colors=["#A300D6","#7D02EB","#5653FE","#2983FF","#00B1F2"];}return this.colors}}]),t}(),et=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"draw",value:function(){this.drawTitleSubtitle("title"),this.drawTitleSubtitle("subtitle");}},{key:"drawTitleSubtitle",value:function(t){var e=this.w,i="title"===t?e.config.title:e.config.subtitle,a=e.globals.svgWidth/2,s=i.offsetY,r="middle";if("left"===i.align?(a=10,r="start"):"right"===i.align&&(a=e.globals.svgWidth-10,r="end"),a+=i.offsetX,s=s+parseInt(i.style.fontSize,10)+i.margin/2,void 0!==i.text){var o=new m(this.ctx).drawText({x:a,y:s,text:i.text,textAnchor:r,fontSize:i.style.fontSize,fontFamily:i.style.fontFamily,fontWeight:i.style.fontWeight,foreColor:i.style.color,opacity:1});o.node.setAttribute("class","apexcharts-".concat(t,"-text")),e.globals.dom.Paper.add(o);}}}]),t}(),it=function(){function t(e){a(this,t),this.w=e.w,this.dCtx=e;}return r(t,[{key:"getTitleSubtitleCoords",value:function(t){var e=this.w,i=0,a=0,s="title"===t?e.config.title.floating:e.config.subtitle.floating,r=e.globals.dom.baseEl.querySelector(".apexcharts-".concat(t,"-text"));if(null!==r&&!s){var o=r.getBoundingClientRect();i=o.width,a=e.globals.axisCharts?o.height+5:o.height;}return {width:i,height:a}}},{key:"getLegendsRect",value:function(){var t=this.w,e=t.globals.dom.elLegendWrap;t.config.legend.height||"top"!==t.config.legend.position&&"bottom"!==t.config.legend.position||(e.style.maxHeight=t.globals.svgHeight/2+"px");var i=Object.assign({},x.getBoundingClientRect(e));return null!==e&&!t.config.legend.floating&&t.config.legend.show?this.dCtx.lgRect={x:i.x,y:i.y,height:i.height,width:0===i.height?0:i.width}:this.dCtx.lgRect={x:0,y:0,height:0,width:0},"left"!==t.config.legend.position&&"right"!==t.config.legend.position||1.5*this.dCtx.lgRect.width>t.globals.svgWidth&&(this.dCtx.lgRect.width=t.globals.svgWidth/1.5),this.dCtx.lgRect}},{key:"getLargestStringFromMultiArr",value:function(t,e){var i=t;if(this.w.globals.isMultiLineX){var a=e.map((function(t,e){return Array.isArray(t)?t.length:1})),s=Math.max.apply(Math,u(a));i=e[a.indexOf(s)];}return i}}]),t}(),at=function(){function t(e){a(this,t),this.w=e.w,this.dCtx=e;}return r(t,[{key:"getxAxisLabelsCoords",value:function(){var t,e=this.w,i=e.globals.labels.slice();if(e.config.xaxis.convertedCatToNumeric&&0===i.length&&(i=e.globals.categoryLabels),e.globals.timescaleLabels.length>0){var a=this.getxAxisTimeScaleLabelsCoords();t={width:a.width,height:a.height},e.globals.rotateXLabels=!1;}else {this.dCtx.lgWidthForSideLegends="left"!==e.config.legend.position&&"right"!==e.config.legend.position||e.config.legend.floating?0:this.dCtx.lgRect.width;var s=e.globals.xLabelFormatter,r=x.getLargestStringFromArr(i),o=this.dCtx.dimHelpers.getLargestStringFromMultiArr(r,i);e.globals.isBarHorizontal&&(o=r=e.globals.yAxisScale[0].result.reduce((function(t,e){return t.length>e.length?t:e}),0));var n=new M(this.dCtx.ctx),l=r;r=n.xLabelFormat(s,r,l,{i:void 0,dateFormatter:new I(this.dCtx.ctx).formatDate,w:e}),o=n.xLabelFormat(s,o,l,{i:void 0,dateFormatter:new I(this.dCtx.ctx).formatDate,w:e}),(e.config.xaxis.convertedCatToNumeric&&void 0===r||""===String(r).trim())&&(o=r="1");var h=new m(this.dCtx.ctx),c=h.getTextRects(r,e.config.xaxis.labels.style.fontSize),d=c;if(r!==o&&(d=h.getTextRects(o,e.config.xaxis.labels.style.fontSize)),(t={width:c.width>=d.width?c.width:d.width,height:c.height>=d.height?c.height:d.height}).width*i.length>e.globals.svgWidth-this.dCtx.lgWidthForSideLegends-this.dCtx.yAxisWidth-this.dCtx.gridPad.left-this.dCtx.gridPad.right&&0!==e.config.xaxis.labels.rotate||e.config.xaxis.labels.rotateAlways){if(!e.globals.isBarHorizontal){e.globals.rotateXLabels=!0;var g=function(t){return h.getTextRects(t,e.config.xaxis.labels.style.fontSize,e.config.xaxis.labels.style.fontFamily,"rotate(".concat(e.config.xaxis.labels.rotate," 0 0)"),!1)};c=g(r),r!==o&&(d=g(o)),t.height=(c.height>d.height?c.height:d.height)/1.5,t.width=c.width>d.width?c.width:d.width;}}else e.globals.rotateXLabels=!1;}return e.config.xaxis.labels.show||(t={width:0,height:0}),{width:t.width,height:t.height}}},{key:"getxAxisGroupLabelsCoords",value:function(){var t,e=this.w;if(!e.globals.hasXaxisGroups)return {width:0,height:0};var i,a=(null===(t=e.config.xaxis.group.style)||void 0===t?void 0:t.fontSize)||e.config.xaxis.labels.style.fontSize,s=e.globals.groups.map((function(t){return t.title})),r=x.getLargestStringFromArr(s),o=this.dCtx.dimHelpers.getLargestStringFromMultiArr(r,s),n=new m(this.dCtx.ctx),l=n.getTextRects(r,a),h=l;return r!==o&&(h=n.getTextRects(o,a)),i={width:l.width>=h.width?l.width:h.width,height:l.height>=h.height?l.height:h.height},e.config.xaxis.labels.show||(i={width:0,height:0}),{width:i.width,height:i.height}}},{key:"getxAxisTitleCoords",value:function(){var t=this.w,e=0,i=0;if(void 0!==t.config.xaxis.title.text){var a=new m(this.dCtx.ctx).getTextRects(t.config.xaxis.title.text,t.config.xaxis.title.style.fontSize);e=a.width,i=a.height;}return {width:e,height:i}}},{key:"getxAxisTimeScaleLabelsCoords",value:function(){var t,e=this.w;this.dCtx.timescaleLabels=e.globals.timescaleLabels.slice();var i=this.dCtx.timescaleLabels.map((function(t){return t.value})),a=i.reduce((function(t,e){return void 0===t?(console.error("You have possibly supplied invalid Date format. Please supply a valid JavaScript Date"),0):t.length>e.length?t:e}),0);return 1.05*(t=new m(this.dCtx.ctx).getTextRects(a,e.config.xaxis.labels.style.fontSize)).width*i.length>e.globals.gridWidth&&0!==e.config.xaxis.labels.rotate&&(e.globals.overlappingXLabels=!0),t}},{key:"additionalPaddingXLabels",value:function(t){var e=this,i=this.w,a=i.globals,s=i.config,r=s.xaxis.type,o=t.width;a.skipLastTimelinelabel=!1,a.skipFirstTimelinelabel=!1;var n=i.config.yaxis[0].opposite&&i.globals.isBarHorizontal,l=function(t,n){s.yaxis.length>1&&function(t){return -1!==a.collapsedSeriesIndices.indexOf(t)}(n)||function(t){if(e.dCtx.timescaleLabels&&e.dCtx.timescaleLabels.length){var n=e.dCtx.timescaleLabels[0],l=e.dCtx.timescaleLabels[e.dCtx.timescaleLabels.length-1].position+o/1.75-e.dCtx.yAxisWidthRight,h=n.position-o/1.75+e.dCtx.yAxisWidthLeft,c="right"===i.config.legend.position&&e.dCtx.lgRect.width>0?e.dCtx.lgRect.width:0;l>a.svgWidth-a.translateX-c&&(a.skipLastTimelinelabel=!0),h<-(t.show&&!t.floating||"bar"!==s.chart.type&&"candlestick"!==s.chart.type&&"rangeBar"!==s.chart.type&&"boxPlot"!==s.chart.type?10:o/1.75)&&(a.skipFirstTimelinelabel=!0);}else "datetime"===r?e.dCtx.gridPad.right<o&&!a.rotateXLabels&&(a.skipLastTimelinelabel=!0):"datetime"!==r&&e.dCtx.gridPad.right<o/2-e.dCtx.yAxisWidthRight&&!a.rotateXLabels&&!i.config.xaxis.labels.trim&&("between"!==i.config.xaxis.tickPlacement||i.globals.isBarHorizontal)&&(e.dCtx.xPadRight=o/2+1);}(t);};s.yaxis.forEach((function(t,i){n?(e.dCtx.gridPad.left<o&&(e.dCtx.xPadLeft=o/2+1),e.dCtx.xPadRight=o/2+1):l(t,i);}));}}]),t}(),st=function(){function t(e){a(this,t),this.w=e.w,this.dCtx=e;}return r(t,[{key:"getyAxisLabelsCoords",value:function(){var t=this,e=this.w,i=[],a=10,s=new B(this.dCtx.ctx);return e.config.yaxis.map((function(r,o){var n={seriesIndex:o,dataPointIndex:-1,w:e},l=e.globals.yAxisScale[o],h=0;if(!s.isYAxisHidden(o)&&r.labels.show&&void 0!==r.labels.minWidth&&(h=r.labels.minWidth),!s.isYAxisHidden(o)&&r.labels.show&&l.result.length){var c=e.globals.yLabelFormatters[o],d=l.niceMin===Number.MIN_VALUE?0:l.niceMin,g=l.result.reduce((function(t,e){var i,a;return (null===(i=String(c(t,n)))||void 0===i?void 0:i.length)>(null===(a=String(c(e,n)))||void 0===a?void 0:a.length)?t:e}),d),u=g=c(g,n);if(void 0!==g&&0!==g.length||(g=l.niceMax),e.globals.isBarHorizontal){a=0;var p=e.globals.labels.slice();g=x.getLargestStringFromArr(p),g=c(g,{seriesIndex:o,dataPointIndex:-1,w:e}),u=t.dCtx.dimHelpers.getLargestStringFromMultiArr(g,p);}var f=new m(t.dCtx.ctx),b="rotate(".concat(r.labels.rotate," 0 0)"),v=f.getTextRects(g,r.labels.style.fontSize,r.labels.style.fontFamily,b,!1),y=v;g!==u&&(y=f.getTextRects(u,r.labels.style.fontSize,r.labels.style.fontFamily,b,!1)),i.push({width:(h>y.width||h>v.width?h:y.width>v.width?y.width:v.width)+a,height:y.height>v.height?y.height:v.height});}else i.push({width:0,height:0});})),i}},{key:"getyAxisTitleCoords",value:function(){var t=this,e=this.w,i=[];return e.config.yaxis.map((function(e,a){if(e.show&&void 0!==e.title.text){var s=new m(t.dCtx.ctx),r="rotate(".concat(e.title.rotate," 0 0)"),o=s.getTextRects(e.title.text,e.title.style.fontSize,e.title.style.fontFamily,r,!1);i.push({width:o.width,height:o.height});}else i.push({width:0,height:0});})),i}},{key:"getTotalYAxisWidth",value:function(){var t=this.w,e=0,i=0,a=0,s=t.globals.yAxisScale.length>1?10:0,r=new B(this.dCtx.ctx),o=function(o,n){var l=t.config.yaxis[n].floating,h=0;o.width>0&&!l?(h=o.width+s,function(e){return t.globals.ignoreYAxisIndexes.indexOf(e)>-1}(n)&&(h=h-o.width-s)):h=l||r.isYAxisHidden(n)?0:5,t.config.yaxis[n].opposite?a+=h:i+=h,e+=h;};return t.globals.yLabelsCoords.map((function(t,e){o(t,e);})),t.globals.yTitleCoords.map((function(t,e){o(t,e);})),t.globals.isBarHorizontal&&!t.config.yaxis[0].floating&&(e=t.globals.yLabelsCoords[0].width+t.globals.yTitleCoords[0].width+15),this.dCtx.yAxisWidthLeft=i,this.dCtx.yAxisWidthRight=a,e}}]),t}(),rt=function(){function t(e){a(this,t),this.w=e.w,this.dCtx=e;}return r(t,[{key:"gridPadForColumnsInNumericAxis",value:function(t){var e=this.w;if(e.globals.noData||e.globals.allSeriesCollapsed)return 0;var i=function(t){return "bar"===t||"rangeBar"===t||"candlestick"===t||"boxPlot"===t},a=e.config.chart.type,s=0,r=i(a)?e.config.series.length:1;if(e.globals.comboBarCount>0&&(r=e.globals.comboBarCount),e.globals.collapsedSeries.forEach((function(t){i(t.type)&&(r-=1);})),e.config.chart.stacked&&(r=1),(i(a)||e.globals.comboBarCount>0)&&e.globals.isXNumeric&&!e.globals.isBarHorizontal&&r>0){var o,n,l=Math.abs(e.globals.initialMaxX-e.globals.initialMinX);l<=3&&(l=e.globals.dataPoints),o=l/t,e.globals.minXDiff&&e.globals.minXDiff/o>0&&(n=e.globals.minXDiff/o),n>t/2&&(n/=2),(s=n/r*parseInt(e.config.plotOptions.bar.columnWidth,10)/100)<1&&(s=1),s=s/(r>1?1:1.5)+5,e.globals.barPadForNumericAxis=s;}return s}},{key:"gridPadFortitleSubtitle",value:function(){var t=this,e=this.w,i=e.globals,a=this.dCtx.isSparkline||!e.globals.axisCharts?0:10;["title","subtitle"].forEach((function(i){void 0!==e.config[i].text?a+=e.config[i].margin:a+=t.dCtx.isSparkline||!e.globals.axisCharts?0:5;})),!e.config.legend.show||"bottom"!==e.config.legend.position||e.config.legend.floating||e.globals.axisCharts||(a+=10);var s=this.dCtx.dimHelpers.getTitleSubtitleCoords("title"),r=this.dCtx.dimHelpers.getTitleSubtitleCoords("subtitle");i.gridHeight=i.gridHeight-s.height-r.height-a,i.translateY=i.translateY+s.height+r.height+a;}},{key:"setGridXPosForDualYAxis",value:function(t,e){var i=this.w,a=new B(this.dCtx.ctx);i.config.yaxis.map((function(s,r){-1!==i.globals.ignoreYAxisIndexes.indexOf(r)||s.floating||a.isYAxisHidden(r)||(s.opposite&&(i.globals.translateX=i.globals.translateX-(e[r].width+t[r].width)-parseInt(i.config.yaxis[r].labels.style.fontSize,10)/1.2-12),i.globals.translateX<2&&(i.globals.translateX=2));}));}}]),t}(),ot=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.lgRect={},this.yAxisWidth=0,this.yAxisWidthLeft=0,this.yAxisWidthRight=0,this.xAxisHeight=0,this.isSparkline=this.w.config.chart.sparkline.enabled,this.dimHelpers=new it(this),this.dimYAxis=new st(this),this.dimXAxis=new at(this),this.dimGrid=new rt(this),this.lgWidthForSideLegends=0,this.gridPad=this.w.config.grid.padding,this.xPadRight=0,this.xPadLeft=0;}return r(t,[{key:"plotCoords",value:function(){var t=this,e=this.w,i=e.globals;this.lgRect=this.dimHelpers.getLegendsRect(),this.isSparkline&&((e.config.markers.discrete.length>0||e.config.markers.size>0)&&Object.entries(this.gridPad).forEach((function(e){var i=g(e,2),a=i[0],s=i[1];t.gridPad[a]=Math.max(s,t.w.globals.markers.largestSize/1.5);})),this.gridPad.top=Math.max(e.config.stroke.width/2,this.gridPad.top),this.gridPad.bottom=Math.max(e.config.stroke.width/2,this.gridPad.bottom)),i.axisCharts?this.setDimensionsForAxisCharts():this.setDimensionsForNonAxisCharts(),this.dimGrid.gridPadFortitleSubtitle(),i.gridHeight=i.gridHeight-this.gridPad.top-this.gridPad.bottom,i.gridWidth=i.gridWidth-this.gridPad.left-this.gridPad.right-this.xPadRight-this.xPadLeft;var a=this.dimGrid.gridPadForColumnsInNumericAxis(i.gridWidth);i.gridWidth=i.gridWidth-2*a,i.translateX=i.translateX+this.gridPad.left+this.xPadLeft+(a>0?a+4:0),i.translateY=i.translateY+this.gridPad.top;}},{key:"setDimensionsForAxisCharts",value:function(){var t=this,e=this.w,i=e.globals,a=this.dimYAxis.getyAxisLabelsCoords(),s=this.dimYAxis.getyAxisTitleCoords();e.globals.yLabelsCoords=[],e.globals.yTitleCoords=[],e.config.yaxis.map((function(t,i){e.globals.yLabelsCoords.push({width:a[i].width,index:i}),e.globals.yTitleCoords.push({width:s[i].width,index:i});})),this.yAxisWidth=this.dimYAxis.getTotalYAxisWidth();var r=this.dimXAxis.getxAxisLabelsCoords(),o=this.dimXAxis.getxAxisGroupLabelsCoords(),n=this.dimXAxis.getxAxisTitleCoords();this.conditionalChecksForAxisCoords(r,n,o),i.translateXAxisY=e.globals.rotateXLabels?this.xAxisHeight/8:-4,i.translateXAxisX=e.globals.rotateXLabels&&e.globals.isXNumeric&&e.config.xaxis.labels.rotate<=-45?-this.xAxisWidth/4:0,e.globals.isBarHorizontal&&(i.rotateXLabels=!1,i.translateXAxisY=parseInt(e.config.xaxis.labels.style.fontSize,10)/1.5*-1),i.translateXAxisY=i.translateXAxisY+e.config.xaxis.labels.offsetY,i.translateXAxisX=i.translateXAxisX+e.config.xaxis.labels.offsetX;var l=this.yAxisWidth,h=this.xAxisHeight;i.xAxisLabelsHeight=this.xAxisHeight-n.height,i.xAxisGroupLabelsHeight=i.xAxisLabelsHeight-r.height,i.xAxisLabelsWidth=this.xAxisWidth,i.xAxisHeight=this.xAxisHeight;var c=10;("radar"===e.config.chart.type||this.isSparkline)&&(l=0,h=i.goldenPadding),this.isSparkline&&(this.lgRect={height:0,width:0}),(this.isSparkline||"treemap"===e.config.chart.type)&&(l=0,h=0,c=0),this.isSparkline||this.dimXAxis.additionalPaddingXLabels(r);var d=function(){i.translateX=l,i.gridHeight=i.svgHeight-t.lgRect.height-h-(t.isSparkline||"treemap"===e.config.chart.type?0:e.globals.rotateXLabels?10:15),i.gridWidth=i.svgWidth-l;};switch("top"===e.config.xaxis.position&&(c=i.xAxisHeight-e.config.xaxis.axisTicks.height-5),e.config.legend.position){case"bottom":i.translateY=c,d();break;case"top":i.translateY=this.lgRect.height+c,d();break;case"left":i.translateY=c,i.translateX=this.lgRect.width+l,i.gridHeight=i.svgHeight-h-12,i.gridWidth=i.svgWidth-this.lgRect.width-l;break;case"right":i.translateY=c,i.translateX=l,i.gridHeight=i.svgHeight-h-12,i.gridWidth=i.svgWidth-this.lgRect.width-l-5;break;default:throw new Error("Legend position not supported")}this.dimGrid.setGridXPosForDualYAxis(s,a),new q(this.ctx).setYAxisXPosition(a,s);}},{key:"setDimensionsForNonAxisCharts",value:function(){var t=this.w,e=t.globals,i=t.config,a=0;t.config.legend.show&&!t.config.legend.floating&&(a=20);var s="pie"===i.chart.type||"polarArea"===i.chart.type||"donut"===i.chart.type?"pie":"radialBar",r=i.plotOptions[s].offsetY,o=i.plotOptions[s].offsetX;if(!i.legend.show||i.legend.floating)return e.gridHeight=e.svgHeight-i.grid.padding.left+i.grid.padding.right,e.gridWidth=e.gridHeight,e.translateY=r,void(e.translateX=o+(e.svgWidth-e.gridWidth)/2);switch(i.legend.position){case"bottom":e.gridHeight=e.svgHeight-this.lgRect.height-e.goldenPadding,e.gridWidth=e.svgWidth,e.translateY=r-10,e.translateX=o+(e.svgWidth-e.gridWidth)/2;break;case"top":e.gridHeight=e.svgHeight-this.lgRect.height-e.goldenPadding,e.gridWidth=e.svgWidth,e.translateY=this.lgRect.height+r+10,e.translateX=o+(e.svgWidth-e.gridWidth)/2;break;case"left":e.gridWidth=e.svgWidth-this.lgRect.width-a,e.gridHeight="auto"!==i.chart.height?e.svgHeight:e.gridWidth,e.translateY=r,e.translateX=o+this.lgRect.width+a;break;case"right":e.gridWidth=e.svgWidth-this.lgRect.width-a-5,e.gridHeight="auto"!==i.chart.height?e.svgHeight:e.gridWidth,e.translateY=r,e.translateX=o+10;break;default:throw new Error("Legend position not supported")}}},{key:"conditionalChecksForAxisCoords",value:function(t,e,i){var a=this.w,s=a.globals.hasXaxisGroups?2:1,r=i.height+t.height+e.height,o=a.globals.isMultiLineX?1.2:a.globals.LINE_HEIGHT_RATIO,n=a.globals.rotateXLabels?22:10,l=a.globals.rotateXLabels&&"bottom"===a.config.legend.position?10:0;this.xAxisHeight=r*o+s*n+l,this.xAxisWidth=t.width,this.xAxisHeight-e.height>a.config.xaxis.labels.maxHeight&&(this.xAxisHeight=a.config.xaxis.labels.maxHeight),a.config.xaxis.labels.minHeight&&this.xAxisHeight<a.config.xaxis.labels.minHeight&&(this.xAxisHeight=a.config.xaxis.labels.minHeight),a.config.xaxis.floating&&(this.xAxisHeight=0);var h=0,c=0;a.config.yaxis.forEach((function(t){h+=t.labels.minWidth,c+=t.labels.maxWidth;})),this.yAxisWidth<h&&(this.yAxisWidth=h),this.yAxisWidth>c&&(this.yAxisWidth=c);}}]),t}(),nt=function(){function t(e){a(this,t),this.w=e.w,this.lgCtx=e;}return r(t,[{key:"getLegendStyles",value:function(){var t=document.createElement("style");t.setAttribute("type","text/css");var e=document.createTextNode("\t\n    \t\n      .apexcharts-legend {\t\n        display: flex;\t\n        overflow: auto;\t\n        padding: 0 10px;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom, .apexcharts-legend.apx-legend-position-top {\t\n        flex-wrap: wrap\t\n      }\t\n      .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\t\n        flex-direction: column;\t\n        bottom: 0;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-left, .apexcharts-legend.apx-legend-position-top.apexcharts-align-left, .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\t\n        justify-content: flex-start;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {\t\n        justify-content: center;  \t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-right, .apexcharts-legend.apx-legend-position-top.apexcharts-align-right {\t\n        justify-content: flex-end;\t\n      }\t\n      .apexcharts-legend-series {\t\n        cursor: pointer;\t\n        line-height: normal;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom .apexcharts-legend-series, .apexcharts-legend.apx-legend-position-top .apexcharts-legend-series{\t\n        display: flex;\t\n        align-items: center;\t\n      }\t\n      .apexcharts-legend-text {\t\n        position: relative;\t\n        font-size: 14px;\t\n      }\t\n      .apexcharts-legend-text *, .apexcharts-legend-marker * {\t\n        pointer-events: none;\t\n      }\t\n      .apexcharts-legend-marker {\t\n        position: relative;\t\n        display: inline-block;\t\n        cursor: pointer;\t\n        margin-right: 3px;\t\n        border-style: solid;\n      }\t\n      \t\n      .apexcharts-legend.apexcharts-align-right .apexcharts-legend-series, .apexcharts-legend.apexcharts-align-left .apexcharts-legend-series{\t\n        display: inline-block;\t\n      }\t\n      .apexcharts-legend-series.apexcharts-no-click {\t\n        cursor: auto;\t\n      }\t\n      .apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {\t\n        display: none !important;\t\n      }\t\n      .apexcharts-inactive-legend {\t\n        opacity: 0.45;\t\n      }");return t.appendChild(e),t}},{key:"getLegendBBox",value:function(){var t=this.w.globals.dom.baseEl.querySelector(".apexcharts-legend").getBoundingClientRect(),e=t.width;return {clwh:t.height,clww:e}}},{key:"appendToForeignObject",value:function(){this.w.globals.dom.elLegendForeign.appendChild(this.getLegendStyles());}},{key:"toggleDataSeries",value:function(t,e){var i=this,a=this.w;if(a.globals.axisCharts||"radialBar"===a.config.chart.type){a.globals.resized=!0;var s=null,r=null;if(a.globals.risingSeries=[],a.globals.axisCharts?(s=a.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(t,"']")),r=parseInt(s.getAttribute("data:realIndex"),10)):(s=a.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(t+1,"']")),r=parseInt(s.getAttribute("rel"),10)-1),e)[{cs:a.globals.collapsedSeries,csi:a.globals.collapsedSeriesIndices},{cs:a.globals.ancillaryCollapsedSeries,csi:a.globals.ancillaryCollapsedSeriesIndices}].forEach((function(t){i.riseCollapsedSeries(t.cs,t.csi,r);}));else this.hideSeries({seriesEl:s,realIndex:r});}else {var o=a.globals.dom.Paper.select(" .apexcharts-series[rel='".concat(t+1,"'] path")),n=a.config.chart.type;if("pie"===n||"polarArea"===n||"donut"===n){var l=a.config.plotOptions.pie.donut.labels;new m(this.lgCtx.ctx).pathMouseDown(o.members[0],null),this.lgCtx.ctx.pie.printDataLabelsInner(o.members[0].node,l);}o.fire("click");}}},{key:"hideSeries",value:function(t){var e=t.seriesEl,i=t.realIndex,a=this.w,s=x.clone(a.config.series);if(a.globals.axisCharts){var r=!1;if(a.config.yaxis[i]&&a.config.yaxis[i].show&&a.config.yaxis[i].showAlways&&(r=!0,a.globals.ancillaryCollapsedSeriesIndices.indexOf(i)<0&&(a.globals.ancillaryCollapsedSeries.push({index:i,data:s[i].data.slice(),type:e.parentNode.className.baseVal.split("-")[1]}),a.globals.ancillaryCollapsedSeriesIndices.push(i))),!r){a.globals.collapsedSeries.push({index:i,data:s[i].data.slice(),type:e.parentNode.className.baseVal.split("-")[1]}),a.globals.collapsedSeriesIndices.push(i);var o=a.globals.risingSeries.indexOf(i);a.globals.risingSeries.splice(o,1);}}else a.globals.collapsedSeries.push({index:i,data:s[i]}),a.globals.collapsedSeriesIndices.push(i);for(var n=e.childNodes,l=0;l<n.length;l++)n[l].classList.contains("apexcharts-series-markers-wrap")&&(n[l].classList.contains("apexcharts-hide")?n[l].classList.remove("apexcharts-hide"):n[l].classList.add("apexcharts-hide"));a.globals.allSeriesCollapsed=a.globals.collapsedSeries.length===a.config.series.length,s=this._getSeriesBasedOnCollapsedState(s),this.lgCtx.ctx.updateHelpers._updateSeries(s,a.config.chart.animations.dynamicAnimation.enabled);}},{key:"riseCollapsedSeries",value:function(t,e,i){var a=this.w,s=x.clone(a.config.series);if(t.length>0){for(var r=0;r<t.length;r++)t[r].index===i&&(a.globals.axisCharts?(s[i].data=t[r].data.slice(),t.splice(r,1),e.splice(r,1),a.globals.risingSeries.push(i)):(s[i]=t[r].data,t.splice(r,1),e.splice(r,1),a.globals.risingSeries.push(i)));s=this._getSeriesBasedOnCollapsedState(s),this.lgCtx.ctx.updateHelpers._updateSeries(s,a.config.chart.animations.dynamicAnimation.enabled);}}},{key:"_getSeriesBasedOnCollapsedState",value:function(t){var e=this.w;return e.globals.axisCharts?t.forEach((function(i,a){e.globals.collapsedSeriesIndices.indexOf(a)>-1&&(t[a].data=[]);})):t.forEach((function(i,a){e.globals.collapsedSeriesIndices.indexOf(a)>-1&&(t[a]=0);})),t}}]),t}(),lt=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.onLegendClick=this.onLegendClick.bind(this),this.onLegendHovered=this.onLegendHovered.bind(this),this.isBarsDistributed="bar"===this.w.config.chart.type&&this.w.config.plotOptions.bar.distributed&&1===this.w.config.series.length,this.legendHelpers=new nt(this);}return r(t,[{key:"init",value:function(){var t=this.w,e=t.globals,i=t.config;if((i.legend.showForSingleSeries&&1===e.series.length||this.isBarsDistributed||e.series.length>1||!e.axisCharts)&&i.legend.show){for(;e.dom.elLegendWrap.firstChild;)e.dom.elLegendWrap.removeChild(e.dom.elLegendWrap.firstChild);this.drawLegends(),x.isIE11()?document.getElementsByTagName("head")[0].appendChild(this.legendHelpers.getLegendStyles()):this.legendHelpers.appendToForeignObject(),"bottom"===i.legend.position||"top"===i.legend.position?this.legendAlignHorizontal():"right"!==i.legend.position&&"left"!==i.legend.position||this.legendAlignVertical();}}},{key:"drawLegends",value:function(){var t=this,e=this.w,i=e.config.legend.fontFamily,a=e.globals.seriesNames,s=e.globals.colors.slice();if("heatmap"===e.config.chart.type){var r=e.config.plotOptions.heatmap.colorScale.ranges;a=r.map((function(t){return t.name?t.name:t.from+" - "+t.to})),s=r.map((function(t){return t.color}));}else this.isBarsDistributed&&(a=e.globals.labels.slice());e.config.legend.customLegendItems.length&&(a=e.config.legend.customLegendItems);for(var o=e.globals.legendFormatter,n=e.config.legend.inverseOrder,l=n?a.length-1:0;n?l>=0:l<=a.length-1;n?l--:l++){var h,c=o(a[l],{seriesIndex:l,w:e}),d=!1,g=!1;if(e.globals.collapsedSeries.length>0)for(var u=0;u<e.globals.collapsedSeries.length;u++)e.globals.collapsedSeries[u].index===l&&(d=!0);if(e.globals.ancillaryCollapsedSeriesIndices.length>0)for(var p=0;p<e.globals.ancillaryCollapsedSeriesIndices.length;p++)e.globals.ancillaryCollapsedSeriesIndices[p]===l&&(g=!0);var f=document.createElement("span");f.classList.add("apexcharts-legend-marker");var b=e.config.legend.markers.offsetX,v=e.config.legend.markers.offsetY,w=e.config.legend.markers.height,k=e.config.legend.markers.width,A=e.config.legend.markers.strokeWidth,S=e.config.legend.markers.strokeColor,C=e.config.legend.markers.radius,L=f.style;L.background=s[l],L.color=s[l],L.setProperty("background",s[l],"important"),e.config.legend.markers.fillColors&&e.config.legend.markers.fillColors[l]&&(L.background=e.config.legend.markers.fillColors[l]),void 0!==e.globals.seriesColors[l]&&(L.background=e.globals.seriesColors[l],L.color=e.globals.seriesColors[l]),L.height=Array.isArray(w)?parseFloat(w[l])+"px":parseFloat(w)+"px",L.width=Array.isArray(k)?parseFloat(k[l])+"px":parseFloat(k)+"px",L.left=(Array.isArray(b)?parseFloat(b[l]):parseFloat(b))+"px",L.top=(Array.isArray(v)?parseFloat(v[l]):parseFloat(v))+"px",L.borderWidth=Array.isArray(A)?A[l]:A,L.borderColor=Array.isArray(S)?S[l]:S,L.borderRadius=Array.isArray(C)?parseFloat(C[l])+"px":parseFloat(C)+"px",e.config.legend.markers.customHTML&&(Array.isArray(e.config.legend.markers.customHTML)?e.config.legend.markers.customHTML[l]&&(f.innerHTML=e.config.legend.markers.customHTML[l]()):f.innerHTML=e.config.legend.markers.customHTML()),m.setAttrs(f,{rel:l+1,"data:collapsed":d||g}),(d||g)&&f.classList.add("apexcharts-inactive-legend");var P=document.createElement("div"),I=document.createElement("span");I.classList.add("apexcharts-legend-text"),I.innerHTML=Array.isArray(c)?c.join(" "):c;var M=e.config.legend.labels.useSeriesColors?e.globals.colors[l]:Array.isArray(e.config.legend.labels.colors)?null===(h=e.config.legend.labels.colors)||void 0===h?void 0:h[l]:e.config.legend.labels.colors;M||(M=e.config.chart.foreColor),I.style.color=M,I.style.fontSize=parseFloat(e.config.legend.fontSize)+"px",I.style.fontWeight=e.config.legend.fontWeight,I.style.fontFamily=i||e.config.chart.fontFamily,m.setAttrs(I,{rel:l+1,i:l,"data:default-text":encodeURIComponent(c),"data:collapsed":d||g}),P.appendChild(f),P.appendChild(I);var T=new y(this.ctx);if(!e.config.legend.showForZeroSeries)0===T.getSeriesTotalByIndex(l)&&T.seriesHaveSameValues(l)&&!T.isSeriesNull(l)&&-1===e.globals.collapsedSeriesIndices.indexOf(l)&&-1===e.globals.ancillaryCollapsedSeriesIndices.indexOf(l)&&P.classList.add("apexcharts-hidden-zero-series");e.config.legend.showForNullSeries||T.isSeriesNull(l)&&-1===e.globals.collapsedSeriesIndices.indexOf(l)&&-1===e.globals.ancillaryCollapsedSeriesIndices.indexOf(l)&&P.classList.add("apexcharts-hidden-null-series"),e.globals.dom.elLegendWrap.appendChild(P),e.globals.dom.elLegendWrap.classList.add("apexcharts-align-".concat(e.config.legend.horizontalAlign)),e.globals.dom.elLegendWrap.classList.add("apx-legend-position-"+e.config.legend.position),P.classList.add("apexcharts-legend-series"),P.style.margin="".concat(e.config.legend.itemMargin.vertical,"px ").concat(e.config.legend.itemMargin.horizontal,"px"),e.globals.dom.elLegendWrap.style.width=e.config.legend.width?e.config.legend.width+"px":"",e.globals.dom.elLegendWrap.style.height=e.config.legend.height?e.config.legend.height+"px":"",m.setAttrs(P,{rel:l+1,seriesName:x.escapeString(a[l]),"data:collapsed":d||g}),(d||g)&&P.classList.add("apexcharts-inactive-legend"),e.config.legend.onItemClick.toggleDataSeries||P.classList.add("apexcharts-no-click");}e.globals.dom.elWrap.addEventListener("click",t.onLegendClick,!0),e.config.legend.onItemHover.highlightDataSeries&&0===e.config.legend.customLegendItems.length&&(e.globals.dom.elWrap.addEventListener("mousemove",t.onLegendHovered,!0),e.globals.dom.elWrap.addEventListener("mouseout",t.onLegendHovered,!0));}},{key:"setLegendWrapXY",value:function(t,e){var i=this.w,a=i.globals.dom.elLegendWrap,s=a.getBoundingClientRect(),r=0,o=0;if("bottom"===i.config.legend.position)o+=i.globals.svgHeight-s.height/2;else if("top"===i.config.legend.position){var n=new ot(this.ctx),l=n.dimHelpers.getTitleSubtitleCoords("title").height,h=n.dimHelpers.getTitleSubtitleCoords("subtitle").height;o=o+(l>0?l-10:0)+(h>0?h-10:0);}a.style.position="absolute",r=r+t+i.config.legend.offsetX,o=o+e+i.config.legend.offsetY,a.style.left=r+"px",a.style.top=o+"px","bottom"===i.config.legend.position?(a.style.top="auto",a.style.bottom=5-i.config.legend.offsetY+"px"):"right"===i.config.legend.position&&(a.style.left="auto",a.style.right=25+i.config.legend.offsetX+"px");["width","height"].forEach((function(t){a.style[t]&&(a.style[t]=parseInt(i.config.legend[t],10)+"px");}));}},{key:"legendAlignHorizontal",value:function(){var t=this.w;t.globals.dom.elLegendWrap.style.right=0;var e=this.legendHelpers.getLegendBBox(),i=new ot(this.ctx),a=i.dimHelpers.getTitleSubtitleCoords("title"),s=i.dimHelpers.getTitleSubtitleCoords("subtitle"),r=0;"bottom"===t.config.legend.position?r=-e.clwh/1.8:"top"===t.config.legend.position&&(r=a.height+s.height+t.config.title.margin+t.config.subtitle.margin-10),this.setLegendWrapXY(20,r);}},{key:"legendAlignVertical",value:function(){var t=this.w,e=this.legendHelpers.getLegendBBox(),i=0;"left"===t.config.legend.position&&(i=20),"right"===t.config.legend.position&&(i=t.globals.svgWidth-e.clww-10),this.setLegendWrapXY(i,20);}},{key:"onLegendHovered",value:function(t){var e=this.w,i=t.target.classList.contains("apexcharts-legend-series")||t.target.classList.contains("apexcharts-legend-text")||t.target.classList.contains("apexcharts-legend-marker");if("heatmap"===e.config.chart.type||this.isBarsDistributed){if(i){var a=parseInt(t.target.getAttribute("rel"),10)-1;this.ctx.events.fireEvent("legendHover",[this.ctx,a,this.w]),new N(this.ctx).highlightRangeInSeries(t,t.target);}}else !t.target.classList.contains("apexcharts-inactive-legend")&&i&&new N(this.ctx).toggleSeriesOnHover(t,t.target);}},{key:"onLegendClick",value:function(t){var e=this.w;if(!e.config.legend.customLegendItems.length&&(t.target.classList.contains("apexcharts-legend-series")||t.target.classList.contains("apexcharts-legend-text")||t.target.classList.contains("apexcharts-legend-marker"))){var i=parseInt(t.target.getAttribute("rel"),10)-1,a="true"===t.target.getAttribute("data:collapsed"),s=this.w.config.chart.events.legendClick;"function"==typeof s&&s(this.ctx,i,this.w),this.ctx.events.fireEvent("legendClick",[this.ctx,i,this.w]);var r=this.w.config.legend.markers.onClick;"function"==typeof r&&t.target.classList.contains("apexcharts-legend-marker")&&(r(this.ctx,i,this.w),this.ctx.events.fireEvent("legendMarkerClick",[this.ctx,i,this.w])),"treemap"!==e.config.chart.type&&"heatmap"!==e.config.chart.type&&!this.isBarsDistributed&&e.config.legend.onItemClick.toggleDataSeries&&this.legendHelpers.toggleDataSeries(i,a);}}}]),t}(),ht=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;var i=this.w;this.ev=this.w.config.chart.events,this.selectedClass="apexcharts-selected",this.localeValues=this.w.globals.locale.toolbar,this.minX=i.globals.minX,this.maxX=i.globals.maxX;}return r(t,[{key:"createToolbar",value:function(){var t=this,e=this.w,i=function(){return document.createElement("div")},a=i();if(a.setAttribute("class","apexcharts-toolbar"),a.style.top=e.config.chart.toolbar.offsetY+"px",a.style.right=3-e.config.chart.toolbar.offsetX+"px",e.globals.dom.elWrap.appendChild(a),this.elZoom=i(),this.elZoomIn=i(),this.elZoomOut=i(),this.elPan=i(),this.elSelection=i(),this.elZoomReset=i(),this.elMenuIcon=i(),this.elMenu=i(),this.elCustomIcons=[],this.t=e.config.chart.toolbar.tools,Array.isArray(this.t.customIcons))for(var s=0;s<this.t.customIcons.length;s++)this.elCustomIcons.push(i());var r=[],o=function(i,a,s){var o=i.toLowerCase();t.t[o]&&e.config.chart.zoom.enabled&&r.push({el:a,icon:"string"==typeof t.t[o]?t.t[o]:s,title:t.localeValues[i],class:"apexcharts-".concat(o,"-icon")});};o("zoomIn",this.elZoomIn,'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>\n</svg>\n'),o("zoomOut",this.elZoomOut,'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>\n</svg>\n');var n=function(i){t.t[i]&&e.config.chart[i].enabled&&r.push({el:"zoom"===i?t.elZoom:t.elSelection,icon:"string"==typeof t.t[i]?t.t[i]:"zoom"===i?'<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">\n    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>\n    <path d="M0 0h24v24H0V0z" fill="none"/>\n    <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>\n</svg>':'<svg fill="#6E8192" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2z"/>\n</svg>',title:t.localeValues["zoom"===i?"selectionZoom":"selection"],class:e.globals.isTouchDevice?"apexcharts-element-hidden":"apexcharts-".concat(i,"-icon")});};n("zoom"),n("selection"),this.t.pan&&e.config.chart.zoom.enabled&&r.push({el:this.elPan,icon:"string"==typeof this.t.pan?this.t.pan:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="24" viewBox="0 0 24 24" width="24">\n    <defs>\n        <path d="M0 0h24v24H0z" id="a"/>\n    </defs>\n    <clipPath id="b">\n        <use overflow="visible" xlink:href="#a"/>\n    </clipPath>\n    <path clip-path="url(#b)" d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"/>\n</svg>',title:this.localeValues.pan,class:e.globals.isTouchDevice?"apexcharts-element-hidden":"apexcharts-pan-icon"}),o("reset",this.elZoomReset,'<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n</svg>'),this.t.download&&r.push({el:this.elMenuIcon,icon:"string"==typeof this.t.download?this.t.download:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',title:this.localeValues.menu,class:"apexcharts-menu-icon"});for(var l=0;l<this.elCustomIcons.length;l++)r.push({el:this.elCustomIcons[l],icon:this.t.customIcons[l].icon,title:this.t.customIcons[l].title,index:this.t.customIcons[l].index,class:"apexcharts-toolbar-custom-icon "+this.t.customIcons[l].class});r.forEach((function(t,e){t.index&&x.moveIndexInArray(r,e,t.index);}));for(var h=0;h<r.length;h++)m.setAttrs(r[h].el,{class:r[h].class,title:r[h].title}),r[h].el.innerHTML=r[h].icon,a.appendChild(r[h].el);this._createHamburgerMenu(a),e.globals.zoomEnabled?this.elZoom.classList.add(this.selectedClass):e.globals.panEnabled?this.elPan.classList.add(this.selectedClass):e.globals.selectionEnabled&&this.elSelection.classList.add(this.selectedClass),this.addToolbarEventListeners();}},{key:"_createHamburgerMenu",value:function(t){this.elMenuItems=[],t.appendChild(this.elMenu),m.setAttrs(this.elMenu,{class:"apexcharts-menu"});var e=[{name:"exportSVG",title:this.localeValues.exportToSVG},{name:"exportPNG",title:this.localeValues.exportToPNG},{name:"exportCSV",title:this.localeValues.exportToCSV}];this.w.globals.allSeriesHasEqualX||e.splice(2,1);for(var i=0;i<e.length;i++)this.elMenuItems.push(document.createElement("div")),this.elMenuItems[i].innerHTML=e[i].title,m.setAttrs(this.elMenuItems[i],{class:"apexcharts-menu-item ".concat(e[i].name),title:e[i].title}),this.elMenu.appendChild(this.elMenuItems[i]);}},{key:"addToolbarEventListeners",value:function(){var t=this;this.elZoomReset.addEventListener("click",this.handleZoomReset.bind(this)),this.elSelection.addEventListener("click",this.toggleZoomSelection.bind(this,"selection")),this.elZoom.addEventListener("click",this.toggleZoomSelection.bind(this,"zoom")),this.elZoomIn.addEventListener("click",this.handleZoomIn.bind(this)),this.elZoomOut.addEventListener("click",this.handleZoomOut.bind(this)),this.elPan.addEventListener("click",this.togglePanning.bind(this)),this.elMenuIcon.addEventListener("click",this.toggleMenu.bind(this)),this.elMenuItems.forEach((function(e){e.classList.contains("exportSVG")?e.addEventListener("click",t.handleDownload.bind(t,"svg")):e.classList.contains("exportPNG")?e.addEventListener("click",t.handleDownload.bind(t,"png")):e.classList.contains("exportCSV")&&e.addEventListener("click",t.handleDownload.bind(t,"csv"));}));for(var e=0;e<this.t.customIcons.length;e++)this.elCustomIcons[e].addEventListener("click",this.t.customIcons[e].click.bind(this,this.ctx,this.ctx.w));}},{key:"toggleZoomSelection",value:function(t){this.ctx.getSyncedCharts().forEach((function(e){e.ctx.toolbar.toggleOtherControls();var i="selection"===t?e.ctx.toolbar.elSelection:e.ctx.toolbar.elZoom,a="selection"===t?"selectionEnabled":"zoomEnabled";e.w.globals[a]=!e.w.globals[a],i.classList.contains(e.ctx.toolbar.selectedClass)?i.classList.remove(e.ctx.toolbar.selectedClass):i.classList.add(e.ctx.toolbar.selectedClass);}));}},{key:"getToolbarIconsReference",value:function(){var t=this.w;this.elZoom||(this.elZoom=t.globals.dom.baseEl.querySelector(".apexcharts-zoom-icon")),this.elPan||(this.elPan=t.globals.dom.baseEl.querySelector(".apexcharts-pan-icon")),this.elSelection||(this.elSelection=t.globals.dom.baseEl.querySelector(".apexcharts-selection-icon"));}},{key:"enableZoomPanFromToolbar",value:function(t){this.toggleOtherControls(),"pan"===t?this.w.globals.panEnabled=!0:this.w.globals.zoomEnabled=!0;var e="pan"===t?this.elPan:this.elZoom,i="pan"===t?this.elZoom:this.elPan;e&&e.classList.add(this.selectedClass),i&&i.classList.remove(this.selectedClass);}},{key:"togglePanning",value:function(){this.ctx.getSyncedCharts().forEach((function(t){t.ctx.toolbar.toggleOtherControls(),t.w.globals.panEnabled=!t.w.globals.panEnabled,t.ctx.toolbar.elPan.classList.contains(t.ctx.toolbar.selectedClass)?t.ctx.toolbar.elPan.classList.remove(t.ctx.toolbar.selectedClass):t.ctx.toolbar.elPan.classList.add(t.ctx.toolbar.selectedClass);}));}},{key:"toggleOtherControls",value:function(){var t=this,e=this.w;e.globals.panEnabled=!1,e.globals.zoomEnabled=!1,e.globals.selectionEnabled=!1,this.getToolbarIconsReference(),[this.elPan,this.elSelection,this.elZoom].forEach((function(e){e&&e.classList.remove(t.selectedClass);}));}},{key:"handleZoomIn",value:function(){var t=this.w;t.globals.isRangeBar&&(this.minX=t.globals.minY,this.maxX=t.globals.maxY);var e=(this.minX+this.maxX)/2,i=(this.minX+e)/2,a=(this.maxX+e)/2,s=this._getNewMinXMaxX(i,a);t.globals.disableZoomIn||this.zoomUpdateOptions(s.minX,s.maxX);}},{key:"handleZoomOut",value:function(){var t=this.w;if(t.globals.isRangeBar&&(this.minX=t.globals.minY,this.maxX=t.globals.maxY),!("datetime"===t.config.xaxis.type&&new Date(this.minX).getUTCFullYear()<1e3)){var e=(this.minX+this.maxX)/2,i=this.minX-(e-this.minX),a=this.maxX-(e-this.maxX),s=this._getNewMinXMaxX(i,a);t.globals.disableZoomOut||this.zoomUpdateOptions(s.minX,s.maxX);}}},{key:"_getNewMinXMaxX",value:function(t,e){var i=this.w.config.xaxis.convertedCatToNumeric;return {minX:i?Math.floor(t):t,maxX:i?Math.floor(e):e}}},{key:"zoomUpdateOptions",value:function(t,e){var i=this.w;if(void 0!==t||void 0!==e){if(!(i.config.xaxis.convertedCatToNumeric&&(t<1&&(t=1,e=i.globals.dataPoints),e-t<2))){var a={min:t,max:e},s=this.getBeforeZoomRange(a);s&&(a=s.xaxis);var r={xaxis:a},o=x.clone(i.globals.initialConfig.yaxis);if(i.config.chart.zoom.autoScaleYaxis)o=new _(this.ctx).autoScaleY(this.ctx,o,{xaxis:a});i.config.chart.group||(r.yaxis=o),this.w.globals.zoomed=!0,this.ctx.updateHelpers._updateOptions(r,!1,this.w.config.chart.animations.dynamicAnimation.enabled),this.zoomCallback(a,o);}}else this.handleZoomReset();}},{key:"zoomCallback",value:function(t,e){"function"==typeof this.ev.zoomed&&this.ev.zoomed(this.ctx,{xaxis:t,yaxis:e});}},{key:"getBeforeZoomRange",value:function(t,e){var i=null;return "function"==typeof this.ev.beforeZoom&&(i=this.ev.beforeZoom(this,{xaxis:t,yaxis:e})),i}},{key:"toggleMenu",value:function(){var t=this;window.setTimeout((function(){t.elMenu.classList.contains("apexcharts-menu-open")?t.elMenu.classList.remove("apexcharts-menu-open"):t.elMenu.classList.add("apexcharts-menu-open");}),0);}},{key:"handleDownload",value:function(t){var e=this.w,i=new G(this.ctx);switch(t){case"svg":i.exportToSVG(this.ctx);break;case"png":i.exportToPng(this.ctx);break;case"csv":i.exportToCSV({series:e.config.series,columnDelimiter:e.config.chart.toolbar.export.csv.columnDelimiter});}}},{key:"handleZoomReset",value:function(t){this.ctx.getSyncedCharts().forEach((function(t){var e=t.w;if(e.globals.lastXAxis.min=e.globals.initialConfig.xaxis.min,e.globals.lastXAxis.max=e.globals.initialConfig.xaxis.max,t.updateHelpers.revertDefaultAxisMinMax(),"function"==typeof e.config.chart.events.beforeResetZoom){var i=e.config.chart.events.beforeResetZoom(t,e);i&&t.updateHelpers.revertDefaultAxisMinMax(i);}"function"==typeof e.config.chart.events.zoomed&&t.ctx.toolbar.zoomCallback({min:e.config.xaxis.min,max:e.config.xaxis.max}),e.globals.zoomed=!1;var a=t.ctx.series.emptyCollapsedSeries(x.clone(e.globals.initialSeries));t.updateHelpers._updateSeries(a,e.config.chart.animations.dynamicAnimation.enabled);}));}},{key:"destroy",value:function(){this.elZoom=null,this.elZoomIn=null,this.elZoomOut=null,this.elPan=null,this.elSelection=null,this.elZoomReset=null,this.elMenuIcon=null;}}]),t}(),ct=function(t){n(i,ht);var e=d(i);function i(t){var s;return a(this,i),(s=e.call(this,t)).ctx=t,s.w=t.w,s.dragged=!1,s.graphics=new m(s.ctx),s.eventList=["mousedown","mouseleave","mousemove","touchstart","touchmove","mouseup","touchend"],s.clientX=0,s.clientY=0,s.startX=0,s.endX=0,s.dragX=0,s.startY=0,s.endY=0,s.dragY=0,s.moveDirection="none",s}return r(i,[{key:"init",value:function(t){var e=this,i=t.xyRatios,a=this.w,s=this;this.xyRatios=i,this.zoomRect=this.graphics.drawRect(0,0,0,0),this.selectionRect=this.graphics.drawRect(0,0,0,0),this.gridRect=a.globals.dom.baseEl.querySelector(".apexcharts-grid"),this.zoomRect.node.classList.add("apexcharts-zoom-rect"),this.selectionRect.node.classList.add("apexcharts-selection-rect"),a.globals.dom.elGraphical.add(this.zoomRect),a.globals.dom.elGraphical.add(this.selectionRect),"x"===a.config.chart.selection.type?this.slDraggableRect=this.selectionRect.draggable({minX:0,minY:0,maxX:a.globals.gridWidth,maxY:a.globals.gridHeight}).on("dragmove",this.selectionDragging.bind(this,"dragging")):"y"===a.config.chart.selection.type?this.slDraggableRect=this.selectionRect.draggable({minX:0,maxX:a.globals.gridWidth}).on("dragmove",this.selectionDragging.bind(this,"dragging")):this.slDraggableRect=this.selectionRect.draggable().on("dragmove",this.selectionDragging.bind(this,"dragging")),this.preselectedSelection(),this.hoverArea=a.globals.dom.baseEl.querySelector("".concat(a.globals.chartClass," .apexcharts-svg")),this.hoverArea.classList.add("apexcharts-zoomable"),this.eventList.forEach((function(t){e.hoverArea.addEventListener(t,s.svgMouseEvents.bind(s,i),{capture:!1,passive:!0});}));}},{key:"destroy",value:function(){this.slDraggableRect&&(this.slDraggableRect.draggable(!1),this.slDraggableRect.off(),this.selectionRect.off()),this.selectionRect=null,this.zoomRect=null,this.gridRect=null;}},{key:"svgMouseEvents",value:function(t,e){var i=this.w,a=this,s=this.ctx.toolbar,r=i.globals.zoomEnabled?i.config.chart.zoom.type:i.config.chart.selection.type,o=i.config.chart.toolbar.autoSelected;if(e.shiftKey?(this.shiftWasPressed=!0,s.enableZoomPanFromToolbar("pan"===o?"zoom":"pan")):this.shiftWasPressed&&(s.enableZoomPanFromToolbar(o),this.shiftWasPressed=!1),e.target){var n,l=e.target.classList;if(e.target.parentNode&&null!==e.target.parentNode&&(n=e.target.parentNode.classList),!(l.contains("apexcharts-selection-rect")||l.contains("apexcharts-legend-marker")||l.contains("apexcharts-legend-text")||n&&n.contains("apexcharts-toolbar"))){if(a.clientX="touchmove"===e.type||"touchstart"===e.type?e.touches[0].clientX:"touchend"===e.type?e.changedTouches[0].clientX:e.clientX,a.clientY="touchmove"===e.type||"touchstart"===e.type?e.touches[0].clientY:"touchend"===e.type?e.changedTouches[0].clientY:e.clientY,"mousedown"===e.type&&1===e.which){var h=a.gridRect.getBoundingClientRect();a.startX=a.clientX-h.left,a.startY=a.clientY-h.top,a.dragged=!1,a.w.globals.mousedown=!0;}if(("mousemove"===e.type&&1===e.which||"touchmove"===e.type)&&(a.dragged=!0,i.globals.panEnabled?(i.globals.selection=null,a.w.globals.mousedown&&a.panDragging({context:a,zoomtype:r,xyRatios:t})):(a.w.globals.mousedown&&i.globals.zoomEnabled||a.w.globals.mousedown&&i.globals.selectionEnabled)&&(a.selection=a.selectionDrawing({context:a,zoomtype:r}))),"mouseup"===e.type||"touchend"===e.type||"mouseleave"===e.type){var c=a.gridRect.getBoundingClientRect();a.w.globals.mousedown&&(a.endX=a.clientX-c.left,a.endY=a.clientY-c.top,a.dragX=Math.abs(a.endX-a.startX),a.dragY=Math.abs(a.endY-a.startY),(i.globals.zoomEnabled||i.globals.selectionEnabled)&&a.selectionDrawn({context:a,zoomtype:r}),i.globals.panEnabled&&i.config.xaxis.convertedCatToNumeric&&a.delayedPanScrolled()),i.globals.zoomEnabled&&a.hideSelectionRect(this.selectionRect),a.dragged=!1,a.w.globals.mousedown=!1;}this.makeSelectionRectDraggable();}}}},{key:"makeSelectionRectDraggable",value:function(){var t=this.w;if(this.selectionRect){var e=this.selectionRect.node.getBoundingClientRect();e.width>0&&e.height>0&&this.slDraggableRect.selectize({points:"l, r",pointSize:8,pointType:"rect"}).resize({constraint:{minX:0,minY:0,maxX:t.globals.gridWidth,maxY:t.globals.gridHeight}}).on("resizing",this.selectionDragging.bind(this,"resizing"));}}},{key:"preselectedSelection",value:function(){var t=this.w,e=this.xyRatios;if(!t.globals.zoomEnabled)if(void 0!==t.globals.selection&&null!==t.globals.selection)this.drawSelectionRect(t.globals.selection);else if(void 0!==t.config.chart.selection.xaxis.min&&void 0!==t.config.chart.selection.xaxis.max){var i=(t.config.chart.selection.xaxis.min-t.globals.minX)/e.xRatio,a={x:i,y:0,width:t.globals.gridWidth-(t.globals.maxX-t.config.chart.selection.xaxis.max)/e.xRatio-i,height:t.globals.gridHeight,translateX:0,translateY:0,selectionEnabled:!0};this.drawSelectionRect(a),this.makeSelectionRectDraggable(),"function"==typeof t.config.chart.events.selection&&t.config.chart.events.selection(this.ctx,{xaxis:{min:t.config.chart.selection.xaxis.min,max:t.config.chart.selection.xaxis.max},yaxis:{}});}}},{key:"drawSelectionRect",value:function(t){var e=t.x,i=t.y,a=t.width,s=t.height,r=t.translateX,o=void 0===r?0:r,n=t.translateY,l=void 0===n?0:n,h=this.w,c=this.zoomRect,d=this.selectionRect;if(this.dragged||null!==h.globals.selection){var g={transform:"translate("+o+", "+l+")"};h.globals.zoomEnabled&&this.dragged&&(a<0&&(a=1),c.attr({x:e,y:i,width:a,height:s,fill:h.config.chart.zoom.zoomedArea.fill.color,"fill-opacity":h.config.chart.zoom.zoomedArea.fill.opacity,stroke:h.config.chart.zoom.zoomedArea.stroke.color,"stroke-width":h.config.chart.zoom.zoomedArea.stroke.width,"stroke-opacity":h.config.chart.zoom.zoomedArea.stroke.opacity}),m.setAttrs(c.node,g)),h.globals.selectionEnabled&&(d.attr({x:e,y:i,width:a>0?a:0,height:s>0?s:0,fill:h.config.chart.selection.fill.color,"fill-opacity":h.config.chart.selection.fill.opacity,stroke:h.config.chart.selection.stroke.color,"stroke-width":h.config.chart.selection.stroke.width,"stroke-dasharray":h.config.chart.selection.stroke.dashArray,"stroke-opacity":h.config.chart.selection.stroke.opacity}),m.setAttrs(d.node,g));}}},{key:"hideSelectionRect",value:function(t){t&&t.attr({x:0,y:0,width:0,height:0});}},{key:"selectionDrawing",value:function(t){var e=t.context,i=t.zoomtype,a=this.w,s=e,r=this.gridRect.getBoundingClientRect(),o=s.startX-1,n=s.startY,l=!1,h=!1,c=s.clientX-r.left-o,d=s.clientY-r.top-n,g={};return Math.abs(c+o)>a.globals.gridWidth?c=a.globals.gridWidth-o:s.clientX-r.left<0&&(c=o),o>s.clientX-r.left&&(l=!0,c=Math.abs(c)),n>s.clientY-r.top&&(h=!0,d=Math.abs(d)),g="x"===i?{x:l?o-c:o,y:0,width:c,height:a.globals.gridHeight}:"y"===i?{x:0,y:h?n-d:n,width:a.globals.gridWidth,height:d}:{x:l?o-c:o,y:h?n-d:n,width:c,height:d},s.drawSelectionRect(g),s.selectionDragging("resizing"),g}},{key:"selectionDragging",value:function(t,e){var i=this,a=this.w,s=this.xyRatios,r=this.selectionRect,o=0;"resizing"===t&&(o=30);var n=function(t){return parseFloat(r.node.getAttribute(t))},l={x:n("x"),y:n("y"),width:n("width"),height:n("height")};a.globals.selection=l,"function"==typeof a.config.chart.events.selection&&a.globals.selectionEnabled&&(clearTimeout(this.w.globals.selectionResizeTimer),this.w.globals.selectionResizeTimer=window.setTimeout((function(){var t=i.gridRect.getBoundingClientRect(),e=r.node.getBoundingClientRect(),o={xaxis:{min:a.globals.xAxisScale.niceMin+(e.left-t.left)*s.xRatio,max:a.globals.xAxisScale.niceMin+(e.right-t.left)*s.xRatio},yaxis:{min:a.globals.yAxisScale[0].niceMin+(t.bottom-e.bottom)*s.yRatio[0],max:a.globals.yAxisScale[0].niceMax-(e.top-t.top)*s.yRatio[0]}};a.config.chart.events.selection(i.ctx,o),a.config.chart.brush.enabled&&void 0!==a.config.chart.events.brushScrolled&&a.config.chart.events.brushScrolled(i.ctx,o);}),o));}},{key:"selectionDrawn",value:function(t){var e=t.context,i=t.zoomtype,a=this.w,s=e,r=this.xyRatios,o=this.ctx.toolbar;if(s.startX>s.endX){var n=s.startX;s.startX=s.endX,s.endX=n;}if(s.startY>s.endY){var l=s.startY;s.startY=s.endY,s.endY=l;}var h=void 0,c=void 0;a.globals.isRangeBar?(h=a.globals.yAxisScale[0].niceMin+s.startX*r.invertedYRatio,c=a.globals.yAxisScale[0].niceMin+s.endX*r.invertedYRatio):(h=a.globals.xAxisScale.niceMin+s.startX*r.xRatio,c=a.globals.xAxisScale.niceMin+s.endX*r.xRatio);var d=[],g=[];if(a.config.yaxis.forEach((function(t,e){d.push(a.globals.yAxisScale[e].niceMax-r.yRatio[e]*s.startY),g.push(a.globals.yAxisScale[e].niceMax-r.yRatio[e]*s.endY);})),s.dragged&&(s.dragX>10||s.dragY>10)&&h!==c)if(a.globals.zoomEnabled){var u=x.clone(a.globals.initialConfig.yaxis),p=x.clone(a.globals.initialConfig.xaxis);if(a.globals.zoomed=!0,a.config.xaxis.convertedCatToNumeric&&(h=Math.floor(h),c=Math.floor(c),h<1&&(h=1,c=a.globals.dataPoints),c-h<2&&(c=h+1)),"xy"!==i&&"x"!==i||(p={min:h,max:c}),"xy"!==i&&"y"!==i||u.forEach((function(t,e){u[e].min=g[e],u[e].max=d[e];})),a.config.chart.zoom.autoScaleYaxis){var f=new _(s.ctx);u=f.autoScaleY(s.ctx,u,{xaxis:p});}if(o){var b=o.getBeforeZoomRange(p,u);b&&(p=b.xaxis?b.xaxis:p,u=b.yaxis?b.yaxis:u);}var v={xaxis:p};a.config.chart.group||(v.yaxis=u),s.ctx.updateHelpers._updateOptions(v,!1,s.w.config.chart.animations.dynamicAnimation.enabled),"function"==typeof a.config.chart.events.zoomed&&o.zoomCallback(p,u);}else if(a.globals.selectionEnabled){var m,y=null;m={min:h,max:c},"xy"!==i&&"y"!==i||(y=x.clone(a.config.yaxis)).forEach((function(t,e){y[e].min=g[e],y[e].max=d[e];})),a.globals.selection=s.selection,"function"==typeof a.config.chart.events.selection&&a.config.chart.events.selection(s.ctx,{xaxis:m,yaxis:y});}}},{key:"panDragging",value:function(t){var e=t.context,i=this.w,a=e;if(void 0!==i.globals.lastClientPosition.x){var s=i.globals.lastClientPosition.x-a.clientX,r=i.globals.lastClientPosition.y-a.clientY;Math.abs(s)>Math.abs(r)&&s>0?this.moveDirection="left":Math.abs(s)>Math.abs(r)&&s<0?this.moveDirection="right":Math.abs(r)>Math.abs(s)&&r>0?this.moveDirection="up":Math.abs(r)>Math.abs(s)&&r<0&&(this.moveDirection="down");}i.globals.lastClientPosition={x:a.clientX,y:a.clientY};var o=i.globals.isRangeBar?i.globals.minY:i.globals.minX,n=i.globals.isRangeBar?i.globals.maxY:i.globals.maxX;i.config.xaxis.convertedCatToNumeric||a.panScrolled(o,n);}},{key:"delayedPanScrolled",value:function(){var t=this.w,e=t.globals.minX,i=t.globals.maxX,a=(t.globals.maxX-t.globals.minX)/2;"left"===this.moveDirection?(e=t.globals.minX+a,i=t.globals.maxX+a):"right"===this.moveDirection&&(e=t.globals.minX-a,i=t.globals.maxX-a),e=Math.floor(e),i=Math.floor(i),this.updateScrolledChart({xaxis:{min:e,max:i}},e,i);}},{key:"panScrolled",value:function(t,e){var i=this.w,a=this.xyRatios,s=x.clone(i.globals.initialConfig.yaxis),r=a.xRatio,o=i.globals.minX,n=i.globals.maxX;i.globals.isRangeBar&&(r=a.invertedYRatio,o=i.globals.minY,n=i.globals.maxY),"left"===this.moveDirection?(t=o+i.globals.gridWidth/15*r,e=n+i.globals.gridWidth/15*r):"right"===this.moveDirection&&(t=o-i.globals.gridWidth/15*r,e=n-i.globals.gridWidth/15*r),i.globals.isRangeBar||(t<i.globals.initialMinX||e>i.globals.initialMaxX)&&(t=o,e=n);var l={min:t,max:e};i.config.chart.zoom.autoScaleYaxis&&(s=new _(this.ctx).autoScaleY(this.ctx,s,{xaxis:l}));var h={xaxis:{min:t,max:e}};i.config.chart.group||(h.yaxis=s),this.updateScrolledChart(h,t,e);}},{key:"updateScrolledChart",value:function(t,e,i){var a=this.w;this.ctx.updateHelpers._updateOptions(t,!1,!1),"function"==typeof a.config.chart.events.scrolled&&a.config.chart.events.scrolled(this.ctx,{xaxis:{min:e,max:i}});}}]),i}(),dt=function(){function t(e){a(this,t),this.w=e.w,this.ttCtx=e,this.ctx=e.ctx;}return r(t,[{key:"getNearestValues",value:function(t){var e=t.hoverArea,i=t.elGrid,a=t.clientX,s=t.clientY,r=this.w,o=i.getBoundingClientRect(),n=o.width,l=o.height,h=n/(r.globals.dataPoints-1),c=l/r.globals.dataPoints,d=this.hasBars();!r.globals.comboCharts&&!d||r.config.xaxis.convertedCatToNumeric||(h=n/r.globals.dataPoints);var g=a-o.left-r.globals.barPadForNumericAxis,u=s-o.top;g<0||u<0||g>n||u>l?(e.classList.remove("hovering-zoom"),e.classList.remove("hovering-pan")):r.globals.zoomEnabled?(e.classList.remove("hovering-pan"),e.classList.add("hovering-zoom")):r.globals.panEnabled&&(e.classList.remove("hovering-zoom"),e.classList.add("hovering-pan"));var p=Math.round(g/h),f=Math.floor(u/c);d&&!r.config.xaxis.convertedCatToNumeric&&(p=Math.ceil(g/h),p-=1);var b=null,v=null,m=r.globals.seriesXvalues.map((function(t){return t.filter((function(t){return x.isNumber(t)}))})),y=r.globals.seriesYvalues.map((function(t){return t.filter((function(t){return x.isNumber(t)}))}));if(r.globals.isXNumeric){var w=this.ttCtx.getElGrid().getBoundingClientRect(),k=g*(w.width/n),A=u*(w.height/l);b=(v=this.closestInMultiArray(k,A,m,y)).index,p=v.j,null!==b&&(m=r.globals.seriesXvalues[b],p=(v=this.closestInArray(k,m)).index);}return r.globals.capturedSeriesIndex=null===b?-1:b,(!p||p<1)&&(p=0),r.globals.isBarHorizontal?r.globals.capturedDataPointIndex=f:r.globals.capturedDataPointIndex=p,{capturedSeries:b,j:r.globals.isBarHorizontal?f:p,hoverX:g,hoverY:u}}},{key:"closestInMultiArray",value:function(t,e,i,a){var s=this.w,r=0,o=null,n=-1;s.globals.series.length>1?r=this.getFirstActiveXArray(i):o=0;var l=i[r][0],h=Math.abs(t-l);if(i.forEach((function(e){e.forEach((function(e,i){var a=Math.abs(t-e);a<=h&&(h=a,n=i);}));})),-1!==n){var c=a[r][n],d=Math.abs(e-c);o=r,a.forEach((function(t,i){var a=Math.abs(e-t[n]);a<=d&&(d=a,o=i);}));}return {index:o,j:n}}},{key:"getFirstActiveXArray",value:function(t){for(var e=this.w,i=0,a=t.map((function(t,e){return t.length>0?e:-1})),s=0;s<a.length;s++)if(-1!==a[s]&&-1===e.globals.collapsedSeriesIndices.indexOf(s)&&-1===e.globals.ancillaryCollapsedSeriesIndices.indexOf(s)){i=a[s];break}return i}},{key:"closestInArray",value:function(t,e){for(var i=e[0],a=null,s=Math.abs(t-i),r=0;r<e.length;r++){var o=Math.abs(t-e[r]);o<s&&(s=o,a=r);}return {index:a}}},{key:"isXoverlap",value:function(t){var e=[],i=this.w.globals.seriesX.filter((function(t){return void 0!==t[0]}));if(i.length>0)for(var a=0;a<i.length-1;a++)void 0!==i[a][t]&&void 0!==i[a+1][t]&&i[a][t]!==i[a+1][t]&&e.push("unEqual");return 0===e.length}},{key:"isInitialSeriesSameLen",value:function(){for(var t=!0,e=this.w.globals.initialSeries,i=0;i<e.length-1;i++)if(e[i].data.length!==e[i+1].data.length){t=!1;break}return t}},{key:"getBarsHeight",value:function(t){return u(t).reduce((function(t,e){return t+e.getBBox().height}),0)}},{key:"getElMarkers",value:function(t){return "number"==typeof t?this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series[data\\:realIndex='".concat(t,"'] .apexcharts-series-markers-wrap > *")):this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers-wrap > *")}},{key:"getAllMarkers",value:function(){var t=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers-wrap");(t=u(t)).sort((function(t,e){var i=Number(t.getAttribute("data:realIndex")),a=Number(e.getAttribute("data:realIndex"));return a<i?1:a>i?-1:0}));var e=[];return t.forEach((function(t){e.push(t.querySelector(".apexcharts-marker"));})),e}},{key:"hasMarkers",value:function(t){return this.getElMarkers(t).length>0}},{key:"getElBars",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-bar-series,  .apexcharts-candlestick-series, .apexcharts-boxPlot-series, .apexcharts-rangebar-series")}},{key:"hasBars",value:function(){return this.getElBars().length>0}},{key:"getHoverMarkerSize",value:function(t){var e=this.w,i=e.config.markers.hover.size;return void 0===i&&(i=e.globals.markers.size[t]+e.config.markers.hover.sizeOffset),i}},{key:"toggleAllTooltipSeriesGroups",value:function(t){var e=this.w,i=this.ttCtx;0===i.allTooltipSeriesGroups.length&&(i.allTooltipSeriesGroups=e.globals.dom.baseEl.querySelectorAll(".apexcharts-tooltip-series-group"));for(var a=i.allTooltipSeriesGroups,s=0;s<a.length;s++)"enable"===t?(a[s].classList.add("apexcharts-active"),a[s].style.display=e.config.tooltip.items.display):(a[s].classList.remove("apexcharts-active"),a[s].style.display="none");}}]),t}(),gt=function(){function t(e){a(this,t),this.w=e.w,this.ctx=e.ctx,this.ttCtx=e,this.tooltipUtil=new dt(e);}return r(t,[{key:"drawSeriesTexts",value:function(t){var e=t.shared,i=void 0===e||e,a=t.ttItems,s=t.i,r=void 0===s?0:s,o=t.j,n=void 0===o?null:o,l=t.y1,h=t.y2,c=t.e,d=this.w;void 0!==d.config.tooltip.custom?this.handleCustomTooltip({i:r,j:n,y1:l,y2:h,w:d}):this.toggleActiveInactiveSeries(i);var g=this.getValuesToPrint({i:r,j:n});this.printLabels({i:r,j:n,values:g,ttItems:a,shared:i,e:c});var u=this.ttCtx.getElTooltip();this.ttCtx.tooltipRect.ttWidth=u.getBoundingClientRect().width,this.ttCtx.tooltipRect.ttHeight=u.getBoundingClientRect().height;}},{key:"printLabels",value:function(t){var i,a=this,s=t.i,r=t.j,o=t.values,n=t.ttItems,l=t.shared,h=t.e,c=this.w,d=[],g=function(t){return c.globals.seriesGoals[t]&&c.globals.seriesGoals[t][r]&&Array.isArray(c.globals.seriesGoals[t][r])},u=o.xVal,p=o.zVal,f=o.xAxisTTVal,x="",b=c.globals.colors[s];null!==r&&c.config.plotOptions.bar.distributed&&(b=c.globals.colors[r]);for(var v=function(t,o){var v=a.getFormatters(s);x=a.getSeriesName({fn:v.yLbTitleFormatter,index:s,seriesIndex:s,j:r}),"treemap"===c.config.chart.type&&(x=v.yLbTitleFormatter(String(c.config.series[s].data[r].x),{series:c.globals.series,seriesIndex:s,dataPointIndex:r,w:c}));var m=c.config.tooltip.inverseOrder?o:t;if(c.globals.axisCharts){var y=function(t){var e,i,a,s;return c.globals.isRangeData?v.yLbFormatter(null===(e=c.globals.seriesRangeStart)||void 0===e||null===(i=e[t])||void 0===i?void 0:i[r],{series:c.globals.seriesRangeStart,seriesIndex:t,dataPointIndex:r,w:c})+" - "+v.yLbFormatter(null===(a=c.globals.seriesRangeEnd)||void 0===a||null===(s=a[t])||void 0===s?void 0:s[r],{series:c.globals.seriesRangeEnd,seriesIndex:t,dataPointIndex:r,w:c}):v.yLbFormatter(c.globals.series[t][r],{series:c.globals.series,seriesIndex:t,dataPointIndex:r,w:c})};if(l)v=a.getFormatters(m),x=a.getSeriesName({fn:v.yLbTitleFormatter,index:m,seriesIndex:s,j:r}),b=c.globals.colors[m],i=y(m),g(m)&&(d=c.globals.seriesGoals[m][r].map((function(t){return {attrs:t,val:v.yLbFormatter(t.value,{seriesIndex:m,dataPointIndex:r,w:c})}})));else {var w,k=null==h||null===(w=h.target)||void 0===w?void 0:w.getAttribute("fill");k&&(b=-1!==k.indexOf("url")?document.querySelector(k.substr(4).slice(0,-1)).childNodes[0].getAttribute("stroke"):k),i=y(s),g(s)&&Array.isArray(c.globals.seriesGoals[s][r])&&(d=c.globals.seriesGoals[s][r].map((function(t){return {attrs:t,val:v.yLbFormatter(t.value,{seriesIndex:s,dataPointIndex:r,w:c})}})));}}null===r&&(i=v.yLbFormatter(c.globals.series[s],e(e({},c),{},{seriesIndex:s,dataPointIndex:s}))),a.DOMHandling({i:s,t:m,j:r,ttItems:n,values:{val:i,goalVals:d,xVal:u,xAxisTTVal:f,zVal:p},seriesName:x,shared:l,pColor:b});},m=0,y=c.globals.series.length-1;m<c.globals.series.length;m++,y--)v(m,y);}},{key:"getFormatters",value:function(t){var e,i=this.w,a=i.globals.yLabelFormatters[t];return void 0!==i.globals.ttVal?Array.isArray(i.globals.ttVal)?(a=i.globals.ttVal[t]&&i.globals.ttVal[t].formatter,e=i.globals.ttVal[t]&&i.globals.ttVal[t].title&&i.globals.ttVal[t].title.formatter):(a=i.globals.ttVal.formatter,"function"==typeof i.globals.ttVal.title.formatter&&(e=i.globals.ttVal.title.formatter)):e=i.config.tooltip.y.title.formatter,"function"!=typeof a&&(a=i.globals.yLabelFormatters[0]?i.globals.yLabelFormatters[0]:function(t){return t}),"function"!=typeof e&&(e=function(t){return t}),{yLbFormatter:a,yLbTitleFormatter:e}}},{key:"getSeriesName",value:function(t){var e=t.fn,i=t.index,a=t.seriesIndex,s=t.j,r=this.w;return e(String(r.globals.seriesNames[i]),{series:r.globals.series,seriesIndex:a,dataPointIndex:s,w:r})}},{key:"DOMHandling",value:function(t){t.i;var e=t.t,i=t.j,a=t.ttItems,s=t.values,r=t.seriesName,o=t.shared,n=t.pColor,l=this.w,h=this.ttCtx,c=s.val,d=s.goalVals,g=s.xVal,u=s.xAxisTTVal,p=s.zVal,f=null;f=a[e].children,l.config.tooltip.fillSeriesColor&&(a[e].style.backgroundColor=n,f[0].style.display="none"),h.showTooltipTitle&&(null===h.tooltipTitle&&(h.tooltipTitle=l.globals.dom.baseEl.querySelector(".apexcharts-tooltip-title")),h.tooltipTitle.innerHTML=g),h.isXAxisTooltipEnabled&&(h.xaxisTooltipText.innerHTML=""!==u?u:g);var x=a[e].querySelector(".apexcharts-tooltip-text-y-label");x&&(x.innerHTML=r||"");var b=a[e].querySelector(".apexcharts-tooltip-text-y-value");b&&(b.innerHTML=void 0!==c?c:""),f[0]&&f[0].classList.contains("apexcharts-tooltip-marker")&&(l.config.tooltip.marker.fillColors&&Array.isArray(l.config.tooltip.marker.fillColors)&&(n=l.config.tooltip.marker.fillColors[e]),f[0].style.backgroundColor=n),l.config.tooltip.marker.show||(f[0].style.display="none");var v=a[e].querySelector(".apexcharts-tooltip-text-goals-label"),m=a[e].querySelector(".apexcharts-tooltip-text-goals-value");if(d.length&&l.globals.seriesGoals[e]){var y=function(){var t="<div >",e="<div>";d.forEach((function(i,a){t+=' <div style="display: flex"><span class="apexcharts-tooltip-marker" style="background-color: '.concat(i.attrs.strokeColor,'; height: 3px; border-radius: 0; top: 5px;"></span> ').concat(i.attrs.name,"</div>"),e+="<div>".concat(i.val,"</div>");})),v.innerHTML=t+"</div>",m.innerHTML=e+"</div>";};o?l.globals.seriesGoals[e][i]&&Array.isArray(l.globals.seriesGoals[e][i])?y():(v.innerHTML="",m.innerHTML=""):y();}else v.innerHTML="",m.innerHTML="";null!==p&&(a[e].querySelector(".apexcharts-tooltip-text-z-label").innerHTML=l.config.tooltip.z.title,a[e].querySelector(".apexcharts-tooltip-text-z-value").innerHTML=void 0!==p?p:"");o&&f[0]&&(null==c||l.globals.ancillaryCollapsedSeriesIndices.indexOf(e)>-1||l.globals.collapsedSeriesIndices.indexOf(e)>-1?f[0].parentNode.style.display="none":f[0].parentNode.style.display=l.config.tooltip.items.display);}},{key:"toggleActiveInactiveSeries",value:function(t){var e=this.w;if(t)this.tooltipUtil.toggleAllTooltipSeriesGroups("enable");else {this.tooltipUtil.toggleAllTooltipSeriesGroups("disable");var i=e.globals.dom.baseEl.querySelector(".apexcharts-tooltip-series-group");i&&(i.classList.add("apexcharts-active"),i.style.display=e.config.tooltip.items.display);}}},{key:"getValuesToPrint",value:function(t){var e=t.i,i=t.j,a=this.w,s=this.ctx.series.filteredSeriesX(),r="",o="",n=null,l=null,h={series:a.globals.series,seriesIndex:e,dataPointIndex:i,w:a},c=a.globals.ttZFormatter;null===i?l=a.globals.series[e]:a.globals.isXNumeric&&"treemap"!==a.config.chart.type?(r=s[e][i],0===s[e].length&&(r=s[this.tooltipUtil.getFirstActiveXArray(s)][i])):r=void 0!==a.globals.labels[i]?a.globals.labels[i]:"";var d=r;a.globals.isXNumeric&&"datetime"===a.config.xaxis.type?r=new M(this.ctx).xLabelFormat(a.globals.ttKeyFormatter,d,d,{i:void 0,dateFormatter:new I(this.ctx).formatDate,w:this.w}):r=a.globals.isBarHorizontal?a.globals.yLabelFormatters[0](d,h):a.globals.xLabelFormatter(d,h);return void 0!==a.config.tooltip.x.formatter&&(r=a.globals.ttKeyFormatter(d,h)),a.globals.seriesZ.length>0&&a.globals.seriesZ[e].length>0&&(n=c(a.globals.seriesZ[e][i],a)),o="function"==typeof a.config.xaxis.tooltip.formatter?a.globals.xaxisTooltipFormatter(d,h):r,{val:Array.isArray(l)?l.join(" "):l,xVal:Array.isArray(r)?r.join(" "):r,xAxisTTVal:Array.isArray(o)?o.join(" "):o,zVal:n}}},{key:"handleCustomTooltip",value:function(t){var e=t.i,i=t.j,a=t.y1,s=t.y2,r=t.w,o=this.ttCtx.getElTooltip(),n=r.config.tooltip.custom;Array.isArray(n)&&n[e]&&(n=n[e]),o.innerHTML=n({ctx:this.ctx,series:r.globals.series,seriesIndex:e,dataPointIndex:i,y1:a,y2:s,w:r});}}]),t}(),ut=function(){function t(e){a(this,t),this.ttCtx=e,this.ctx=e.ctx,this.w=e.w;}return r(t,[{key:"moveXCrosshairs",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this.ttCtx,a=this.w,s=i.getElXCrosshairs(),r=t-i.xcrosshairsWidth/2,o=a.globals.labels.slice().length;if(null!==e&&(r=a.globals.gridWidth/o*e),null===s||a.globals.isBarHorizontal||(s.setAttribute("x",r),s.setAttribute("x1",r),s.setAttribute("x2",r),s.setAttribute("y2",a.globals.gridHeight),s.classList.add("apexcharts-active")),r<0&&(r=0),r>a.globals.gridWidth&&(r=a.globals.gridWidth),i.isXAxisTooltipEnabled){var n=r;"tickWidth"!==a.config.xaxis.crosshairs.width&&"barWidth"!==a.config.xaxis.crosshairs.width||(n=r+i.xcrosshairsWidth/2),this.moveXAxisTooltip(n);}}},{key:"moveYCrosshairs",value:function(t){var e=this.ttCtx;null!==e.ycrosshairs&&m.setAttrs(e.ycrosshairs,{y1:t,y2:t}),null!==e.ycrosshairsHidden&&m.setAttrs(e.ycrosshairsHidden,{y1:t,y2:t});}},{key:"moveXAxisTooltip",value:function(t){var e=this.w,i=this.ttCtx;if(null!==i.xaxisTooltip&&0!==i.xcrosshairsWidth){i.xaxisTooltip.classList.add("apexcharts-active");var a=i.xaxisOffY+e.config.xaxis.tooltip.offsetY+e.globals.translateY+1+e.config.xaxis.offsetY;if(t-=i.xaxisTooltip.getBoundingClientRect().width/2,!isNaN(t)){t+=e.globals.translateX;var s;s=new m(this.ctx).getTextRects(i.xaxisTooltipText.innerHTML),i.xaxisTooltipText.style.minWidth=s.width+"px",i.xaxisTooltip.style.left=t+"px",i.xaxisTooltip.style.top=a+"px";}}}},{key:"moveYAxisTooltip",value:function(t){var e=this.w,i=this.ttCtx;null===i.yaxisTTEls&&(i.yaxisTTEls=e.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxistooltip"));var a=parseInt(i.ycrosshairsHidden.getAttribute("y1"),10),s=e.globals.translateY+a,r=i.yaxisTTEls[t].getBoundingClientRect().height,o=e.globals.translateYAxisX[t]-2;e.config.yaxis[t].opposite&&(o-=26),s-=r/2,-1===e.globals.ignoreYAxisIndexes.indexOf(t)?(i.yaxisTTEls[t].classList.add("apexcharts-active"),i.yaxisTTEls[t].style.top=s+"px",i.yaxisTTEls[t].style.left=o+e.config.yaxis[t].tooltip.offsetX+"px"):i.yaxisTTEls[t].classList.remove("apexcharts-active");}},{key:"moveTooltip",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=this.w,s=this.ttCtx,r=s.getElTooltip(),o=s.tooltipRect,n=null!==i?parseFloat(i):1,l=parseFloat(t)+n+5,h=parseFloat(e)+n/2;if(l>a.globals.gridWidth/2&&(l=l-o.ttWidth-n-10),l>a.globals.gridWidth-o.ttWidth-10&&(l=a.globals.gridWidth-o.ttWidth),l<-20&&(l=-20),a.config.tooltip.followCursor){var c=s.getElGrid().getBoundingClientRect();(l=s.e.clientX-c.left)>a.globals.gridWidth/2&&(l-=s.tooltipRect.ttWidth),(h=s.e.clientY+a.globals.translateY-c.top)>a.globals.gridHeight/2&&(h-=s.tooltipRect.ttHeight);}else a.globals.isBarHorizontal||o.ttHeight/2+h>a.globals.gridHeight&&(h=a.globals.gridHeight-o.ttHeight+a.globals.translateY);isNaN(l)||(l+=a.globals.translateX,r.style.left=l+"px",r.style.top=h+"px");}},{key:"moveMarkers",value:function(t,e){var i=this.w,a=this.ttCtx;if(i.globals.markers.size[t]>0)for(var s=i.globals.dom.baseEl.querySelectorAll(" .apexcharts-series[data\\:realIndex='".concat(t,"'] .apexcharts-marker")),r=0;r<s.length;r++)parseInt(s[r].getAttribute("rel"),10)===e&&(a.marker.resetPointsSize(),a.marker.enlargeCurrentPoint(e,s[r]));else a.marker.resetPointsSize(),this.moveDynamicPointOnHover(e,t);}},{key:"moveDynamicPointOnHover",value:function(t,e){var i,a,s=this.w,r=this.ttCtx,o=s.globals.pointsArray,n=r.tooltipUtil.getHoverMarkerSize(e),l=s.config.series[e].type;if(!l||"column"!==l&&"candlestick"!==l&&"boxPlot"!==l){i=o[e][t][0],a=o[e][t][1]?o[e][t][1]:0;var h=s.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(e,"'] .apexcharts-series-markers circle"));h&&a<s.globals.gridHeight&&a>0&&(h.setAttribute("r",n),h.setAttribute("cx",i),h.setAttribute("cy",a)),this.moveXCrosshairs(i),r.fixedTooltip||this.moveTooltip(i,a,n);}}},{key:"moveDynamicPointsOnHover",value:function(t){var e,i=this.ttCtx,a=i.w,s=0,r=0,o=a.globals.pointsArray;e=new N(this.ctx).getActiveConfigSeriesIndex("asc",["line","area","scatter","bubble"]);var n=i.tooltipUtil.getHoverMarkerSize(e);o[e]&&(s=o[e][t][0],r=o[e][t][1]);var l=i.tooltipUtil.getAllMarkers();if(null!==l)for(var h=0;h<a.globals.series.length;h++){var c=o[h];if(a.globals.comboCharts&&void 0===c&&l.splice(h,0,null),c&&c.length){var d=o[h][t][1],g=void 0;if(l[h].setAttribute("cx",s),"rangeArea"===a.config.chart.type&&!a.globals.comboCharts){var u=t+a.globals.series[h].length;g=o[h][u][1],d-=Math.abs(d-g)/2;}null!==d&&!isNaN(d)&&d<a.globals.gridHeight+n&&d+n>0?(l[h]&&l[h].setAttribute("r",n),l[h]&&l[h].setAttribute("cy",d)):l[h]&&l[h].setAttribute("r",0);}}this.moveXCrosshairs(s),i.fixedTooltip||this.moveTooltip(s,r||a.globals.gridHeight,n);}},{key:"moveStickyTooltipOverBars",value:function(t,e){var i=this.w,a=this.ttCtx,s=i.globals.columnSeries?i.globals.columnSeries.length:i.globals.series.length,r=s>=2&&s%2==0?Math.floor(s/2):Math.floor(s/2)+1;i.globals.isBarHorizontal&&(r=new N(this.ctx).getActiveConfigSeriesIndex("desc")+1);var o=i.globals.dom.baseEl.querySelector(".apexcharts-bar-series .apexcharts-series[rel='".concat(r,"'] path[j='").concat(t,"'], .apexcharts-candlestick-series .apexcharts-series[rel='").concat(r,"'] path[j='").concat(t,"'], .apexcharts-boxPlot-series .apexcharts-series[rel='").concat(r,"'] path[j='").concat(t,"'], .apexcharts-rangebar-series .apexcharts-series[rel='").concat(r,"'] path[j='").concat(t,"']"));o||"number"!=typeof e||(o=i.globals.dom.baseEl.querySelector(".apexcharts-bar-series .apexcharts-series[data\\:realIndex='".concat(e,"'] path[j='").concat(t,"'],\n        .apexcharts-candlestick-series .apexcharts-series[data\\:realIndex='").concat(e,"'] path[j='").concat(t,"'],\n        .apexcharts-boxPlot-series .apexcharts-series[data\\:realIndex='").concat(e,"'] path[j='").concat(t,"'],\n        .apexcharts-rangebar-series .apexcharts-series[data\\:realIndex='").concat(e,"'] path[j='").concat(t,"']")));var n=o?parseFloat(o.getAttribute("cx")):0,l=o?parseFloat(o.getAttribute("cy")):0,h=o?parseFloat(o.getAttribute("barWidth")):0,c=a.getElGrid().getBoundingClientRect(),d=o&&(o.classList.contains("apexcharts-candlestick-area")||o.classList.contains("apexcharts-boxPlot-area"));i.globals.isXNumeric?(o&&!d&&(n-=s%2!=0?h/2:0),o&&d&&i.globals.comboCharts&&(n-=h/2)):i.globals.isBarHorizontal||(n=a.xAxisTicksPositions[t-1]+a.dataPointsDividedWidth/2,isNaN(n)&&(n=a.xAxisTicksPositions[t]-a.dataPointsDividedWidth/2)),i.globals.isBarHorizontal?l-=a.tooltipRect.ttHeight:i.config.tooltip.followCursor?l=a.e.clientY-c.top-a.tooltipRect.ttHeight/2:l+a.tooltipRect.ttHeight+15>i.globals.gridHeight&&(l=i.globals.gridHeight),i.globals.isBarHorizontal||this.moveXCrosshairs(n),a.fixedTooltip||this.moveTooltip(n,l||i.globals.gridHeight);}}]),t}(),pt=function(){function t(e){a(this,t),this.w=e.w,this.ttCtx=e,this.ctx=e.ctx,this.tooltipPosition=new ut(e);}return r(t,[{key:"drawDynamicPoints",value:function(){var t=this.w,e=new m(this.ctx),i=new H(this.ctx),a=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series");a=u(a),t.config.chart.stacked&&a.sort((function(t,e){return parseFloat(t.getAttribute("data:realIndex"))-parseFloat(e.getAttribute("data:realIndex"))}));for(var s=0;s<a.length;s++){var r=a[s].querySelector(".apexcharts-series-markers-wrap");if(null!==r){var o=void 0,n="apexcharts-marker w".concat((Math.random()+1).toString(36).substring(4));"line"!==t.config.chart.type&&"area"!==t.config.chart.type||t.globals.comboCharts||t.config.tooltip.intersect||(n+=" no-pointer-events");var l=i.getMarkerConfig({cssClass:n,seriesIndex:Number(r.getAttribute("data:realIndex"))});(o=e.drawMarker(0,0,l)).node.setAttribute("default-marker-size",0);var h=document.createElementNS(t.globals.SVGNS,"g");h.classList.add("apexcharts-series-markers"),h.appendChild(o.node),r.appendChild(h);}}}},{key:"enlargeCurrentPoint",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,s=this.w;"bubble"!==s.config.chart.type&&this.newPointSize(t,e);var r=e.getAttribute("cx"),o=e.getAttribute("cy");if(null!==i&&null!==a&&(r=i,o=a),this.tooltipPosition.moveXCrosshairs(r),!this.fixedTooltip){if("radar"===s.config.chart.type){var n=this.ttCtx.getElGrid().getBoundingClientRect();r=this.ttCtx.e.clientX-n.left;}this.tooltipPosition.moveTooltip(r,o,s.config.markers.hover.size);}}},{key:"enlargePoints",value:function(t){for(var e=this.w,i=this,a=this.ttCtx,s=t,r=e.globals.dom.baseEl.querySelectorAll(".apexcharts-series:not(.apexcharts-series-collapsed) .apexcharts-marker"),o=e.config.markers.hover.size,n=0;n<r.length;n++){var l=r[n].getAttribute("rel"),h=r[n].getAttribute("index");if(void 0===o&&(o=e.globals.markers.size[h]+e.config.markers.hover.sizeOffset),s===parseInt(l,10)){i.newPointSize(s,r[n]);var c=r[n].getAttribute("cx"),d=r[n].getAttribute("cy");i.tooltipPosition.moveXCrosshairs(c),a.fixedTooltip||i.tooltipPosition.moveTooltip(c,d,o);}else i.oldPointSize(r[n]);}}},{key:"newPointSize",value:function(t,e){var i=this.w,a=i.config.markers.hover.size,s=0===t?e.parentNode.firstChild:e.parentNode.lastChild;if("0"!==s.getAttribute("default-marker-size")){var r=parseInt(s.getAttribute("index"),10);void 0===a&&(a=i.globals.markers.size[r]+i.config.markers.hover.sizeOffset),a<0&&(a=0),s.setAttribute("r",a);}}},{key:"oldPointSize",value:function(t){var e=parseFloat(t.getAttribute("default-marker-size"));t.setAttribute("r",e);}},{key:"resetPointsSize",value:function(){for(var t=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series:not(.apexcharts-series-collapsed) .apexcharts-marker"),e=0;e<t.length;e++){var i=parseFloat(t[e].getAttribute("default-marker-size"));x.isNumber(i)&&i>=0?t[e].setAttribute("r",i):t[e].setAttribute("r",0);}}}]),t}(),ft=function(){function t(e){a(this,t),this.w=e.w;var i=this.w;this.ttCtx=e,this.isVerticalGroupedRangeBar=!i.globals.isBarHorizontal&&"rangeBar"===i.config.chart.type&&i.config.plotOptions.bar.rangeBarGroupRows;}return r(t,[{key:"getAttr",value:function(t,e){return parseFloat(t.target.getAttribute(e))}},{key:"handleHeatTreeTooltip",value:function(t){var e=t.e,i=t.opt,a=t.x,s=t.y,r=t.type,o=this.ttCtx,n=this.w;if(e.target.classList.contains("apexcharts-".concat(r,"-rect"))){var l=this.getAttr(e,"i"),h=this.getAttr(e,"j"),c=this.getAttr(e,"cx"),d=this.getAttr(e,"cy"),g=this.getAttr(e,"width"),u=this.getAttr(e,"height");if(o.tooltipLabels.drawSeriesTexts({ttItems:i.ttItems,i:l,j:h,shared:!1,e:e}),n.globals.capturedSeriesIndex=l,n.globals.capturedDataPointIndex=h,a=c+o.tooltipRect.ttWidth/2+g,s=d+o.tooltipRect.ttHeight/2-u/2,o.tooltipPosition.moveXCrosshairs(c+g/2),a>n.globals.gridWidth/2&&(a=c-o.tooltipRect.ttWidth/2+g),o.w.config.tooltip.followCursor){var p=n.globals.dom.elWrap.getBoundingClientRect();a=n.globals.clientX-p.left-(a>n.globals.gridWidth/2?o.tooltipRect.ttWidth:0),s=n.globals.clientY-p.top-(s>n.globals.gridHeight/2?o.tooltipRect.ttHeight:0);}}return {x:a,y:s}}},{key:"handleMarkerTooltip",value:function(t){var e,i,a=t.e,s=t.opt,r=t.x,o=t.y,n=this.w,l=this.ttCtx;if(a.target.classList.contains("apexcharts-marker")){var h=parseInt(s.paths.getAttribute("cx"),10),c=parseInt(s.paths.getAttribute("cy"),10),d=parseFloat(s.paths.getAttribute("val"));if(i=parseInt(s.paths.getAttribute("rel"),10),e=parseInt(s.paths.parentNode.parentNode.parentNode.getAttribute("rel"),10)-1,l.intersect){var g=x.findAncestor(s.paths,"apexcharts-series");g&&(e=parseInt(g.getAttribute("data:realIndex"),10));}if(l.tooltipLabels.drawSeriesTexts({ttItems:s.ttItems,i:e,j:i,shared:!l.showOnIntersect&&n.config.tooltip.shared,e:a}),"mouseup"===a.type&&l.markerClick(a,e,i),n.globals.capturedSeriesIndex=e,n.globals.capturedDataPointIndex=i,r=h,o=c+n.globals.translateY-1.4*l.tooltipRect.ttHeight,l.w.config.tooltip.followCursor){var u=l.getElGrid().getBoundingClientRect();o=l.e.clientY+n.globals.translateY-u.top;}d<0&&(o=c),l.marker.enlargeCurrentPoint(i,s.paths,r,o);}return {x:r,y:o}}},{key:"handleBarTooltip",value:function(t){var e,i,a=t.e,s=t.opt,r=this.w,o=this.ttCtx,n=o.getElTooltip(),l=0,h=0,c=0,d=this.getBarTooltipXY({e:a,opt:s});e=d.i;var g=d.barHeight,u=d.j;r.globals.capturedSeriesIndex=e,r.globals.capturedDataPointIndex=u,r.globals.isBarHorizontal&&o.tooltipUtil.hasBars()||!r.config.tooltip.shared?(h=d.x,c=d.y,i=Array.isArray(r.config.stroke.width)?r.config.stroke.width[e]:r.config.stroke.width,l=h):r.globals.comboCharts||r.config.tooltip.shared||(l/=2),isNaN(c)&&(c=r.globals.svgHeight-o.tooltipRect.ttHeight);var p=parseInt(s.paths.parentNode.getAttribute("data:realIndex"),10),f=r.globals.isMultipleYAxis?r.config.yaxis[p]&&r.config.yaxis[p].reversed:r.config.yaxis[0].reversed;if(h+o.tooltipRect.ttWidth>r.globals.gridWidth&&!f?h-=o.tooltipRect.ttWidth:h<0&&(h=0),o.w.config.tooltip.followCursor){var x=o.getElGrid().getBoundingClientRect();c=o.e.clientY-x.top;}null===o.tooltip&&(o.tooltip=r.globals.dom.baseEl.querySelector(".apexcharts-tooltip")),r.config.tooltip.shared||(r.globals.comboBarCount>0?o.tooltipPosition.moveXCrosshairs(l+i/2):o.tooltipPosition.moveXCrosshairs(l)),!o.fixedTooltip&&(!r.config.tooltip.shared||r.globals.isBarHorizontal&&o.tooltipUtil.hasBars())&&(f&&(h-=o.tooltipRect.ttWidth)<0&&(h=0),!f||r.globals.isBarHorizontal&&o.tooltipUtil.hasBars()||(c=c+g-2*(r.globals.series[e][u]<0?g:0)),c=c+r.globals.translateY-o.tooltipRect.ttHeight/2,n.style.left=h+r.globals.translateX+"px",n.style.top=c+"px");}},{key:"getBarTooltipXY",value:function(t){var e=this,i=t.e,a=t.opt,s=this.w,r=null,o=this.ttCtx,n=0,l=0,h=0,c=0,d=0,g=i.target.classList;if(g.contains("apexcharts-bar-area")||g.contains("apexcharts-candlestick-area")||g.contains("apexcharts-boxPlot-area")||g.contains("apexcharts-rangebar-area")){var u=i.target,p=u.getBoundingClientRect(),f=a.elGrid.getBoundingClientRect(),x=p.height;d=p.height;var b=p.width,v=parseInt(u.getAttribute("cx"),10),m=parseInt(u.getAttribute("cy"),10);c=parseFloat(u.getAttribute("barWidth"));var y="touchmove"===i.type?i.touches[0].clientX:i.clientX;r=parseInt(u.getAttribute("j"),10),n=parseInt(u.parentNode.getAttribute("rel"),10)-1;var w=u.getAttribute("data-range-y1"),k=u.getAttribute("data-range-y2");s.globals.comboCharts&&(n=parseInt(u.parentNode.getAttribute("data:realIndex"),10));var A=function(t){return s.globals.isXNumeric?v-b/2:e.isVerticalGroupedRangeBar?v+b/2:v-o.dataPointsDividedWidth+b/2},S=function(){return m-o.dataPointsDividedHeight+x/2-o.tooltipRect.ttHeight/2};o.tooltipLabels.drawSeriesTexts({ttItems:a.ttItems,i:n,j:r,y1:w?parseInt(w,10):null,y2:k?parseInt(k,10):null,shared:!o.showOnIntersect&&s.config.tooltip.shared,e:i}),s.config.tooltip.followCursor?s.globals.isBarHorizontal?(l=y-f.left+15,h=S()):(l=A(),h=i.clientY-f.top-o.tooltipRect.ttHeight/2-15):s.globals.isBarHorizontal?((l=v)<o.xyRatios.baseLineInvertedY&&(l=v-o.tooltipRect.ttWidth),h=S()):(l=A(),h=m);}return {x:l,y:h,barHeight:d,barWidth:c,i:n,j:r}}}]),t}(),xt=function(){function t(e){a(this,t),this.w=e.w,this.ttCtx=e;}return r(t,[{key:"drawXaxisTooltip",value:function(){var t=this.w,e=this.ttCtx,i="bottom"===t.config.xaxis.position;e.xaxisOffY=i?t.globals.gridHeight+1:-t.globals.xAxisHeight-t.config.xaxis.axisTicks.height+3;var a=i?"apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom":"apexcharts-xaxistooltip apexcharts-xaxistooltip-top",s=t.globals.dom.elWrap;e.isXAxisTooltipEnabled&&(null===t.globals.dom.baseEl.querySelector(".apexcharts-xaxistooltip")&&(e.xaxisTooltip=document.createElement("div"),e.xaxisTooltip.setAttribute("class",a+" apexcharts-theme-"+t.config.tooltip.theme),s.appendChild(e.xaxisTooltip),e.xaxisTooltipText=document.createElement("div"),e.xaxisTooltipText.classList.add("apexcharts-xaxistooltip-text"),e.xaxisTooltipText.style.fontFamily=t.config.xaxis.tooltip.style.fontFamily||t.config.chart.fontFamily,e.xaxisTooltipText.style.fontSize=t.config.xaxis.tooltip.style.fontSize,e.xaxisTooltip.appendChild(e.xaxisTooltipText)));}},{key:"drawYaxisTooltip",value:function(){for(var t=this.w,e=this.ttCtx,i=function(i){var a=t.config.yaxis[i].opposite||t.config.yaxis[i].crosshairs.opposite;e.yaxisOffX=a?t.globals.gridWidth+1:1;var s="apexcharts-yaxistooltip apexcharts-yaxistooltip-".concat(i,a?" apexcharts-yaxistooltip-right":" apexcharts-yaxistooltip-left");t.globals.yAxisSameScaleIndices.map((function(e,a){e.map((function(e,a){a===i&&(s+=t.config.yaxis[a].show?" ":" apexcharts-yaxistooltip-hidden");}));}));var r=t.globals.dom.elWrap;null===t.globals.dom.baseEl.querySelector(".apexcharts-yaxistooltip apexcharts-yaxistooltip-".concat(i))&&(e.yaxisTooltip=document.createElement("div"),e.yaxisTooltip.setAttribute("class",s+" apexcharts-theme-"+t.config.tooltip.theme),r.appendChild(e.yaxisTooltip),0===i&&(e.yaxisTooltipText=[]),e.yaxisTooltipText[i]=document.createElement("div"),e.yaxisTooltipText[i].classList.add("apexcharts-yaxistooltip-text"),e.yaxisTooltip.appendChild(e.yaxisTooltipText[i]));},a=0;a<t.config.yaxis.length;a++)i(a);}},{key:"setXCrosshairWidth",value:function(){var t=this.w,e=this.ttCtx,i=e.getElXCrosshairs();if(e.xcrosshairsWidth=parseInt(t.config.xaxis.crosshairs.width,10),t.globals.comboCharts){var a=t.globals.dom.baseEl.querySelector(".apexcharts-bar-area");if(null!==a&&"barWidth"===t.config.xaxis.crosshairs.width){var s=parseFloat(a.getAttribute("barWidth"));e.xcrosshairsWidth=s;}else if("tickWidth"===t.config.xaxis.crosshairs.width){var r=t.globals.labels.length;e.xcrosshairsWidth=t.globals.gridWidth/r;}}else if("tickWidth"===t.config.xaxis.crosshairs.width){var o=t.globals.labels.length;e.xcrosshairsWidth=t.globals.gridWidth/o;}else if("barWidth"===t.config.xaxis.crosshairs.width){var n=t.globals.dom.baseEl.querySelector(".apexcharts-bar-area");if(null!==n){var l=parseFloat(n.getAttribute("barWidth"));e.xcrosshairsWidth=l;}else e.xcrosshairsWidth=1;}t.globals.isBarHorizontal&&(e.xcrosshairsWidth=0),null!==i&&e.xcrosshairsWidth>0&&i.setAttribute("width",e.xcrosshairsWidth);}},{key:"handleYCrosshair",value:function(){var t=this.w,e=this.ttCtx;e.ycrosshairs=t.globals.dom.baseEl.querySelector(".apexcharts-ycrosshairs"),e.ycrosshairsHidden=t.globals.dom.baseEl.querySelector(".apexcharts-ycrosshairs-hidden");}},{key:"drawYaxisTooltipText",value:function(t,e,i){var a=this.ttCtx,s=this.w,r=s.globals.yLabelFormatters[t];if(a.yaxisTooltips[t]){var o=a.getElGrid().getBoundingClientRect(),n=(e-o.top)*i.yRatio[t],l=s.globals.maxYArr[t]-s.globals.minYArr[t],h=s.globals.minYArr[t]+(l-n);a.tooltipPosition.moveYCrosshairs(e-o.top),a.yaxisTooltipText[t].innerHTML=r(h),a.tooltipPosition.moveYAxisTooltip(t);}}}]),t}(),bt=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;var i=this.w;this.tConfig=i.config.tooltip,this.tooltipUtil=new dt(this),this.tooltipLabels=new gt(this),this.tooltipPosition=new ut(this),this.marker=new pt(this),this.intersect=new ft(this),this.axesTooltip=new xt(this),this.showOnIntersect=this.tConfig.intersect,this.showTooltipTitle=this.tConfig.x.show,this.fixedTooltip=this.tConfig.fixed.enabled,this.xaxisTooltip=null,this.yaxisTTEls=null,this.isBarShared=!i.globals.isBarHorizontal&&this.tConfig.shared,this.lastHoverTime=Date.now();}return r(t,[{key:"getElTooltip",value:function(t){return t||(t=this),t.w.globals.dom.baseEl?t.w.globals.dom.baseEl.querySelector(".apexcharts-tooltip"):null}},{key:"getElXCrosshairs",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-xcrosshairs")}},{key:"getElGrid",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-grid")}},{key:"drawTooltip",value:function(t){var e=this.w;this.xyRatios=t,this.isXAxisTooltipEnabled=e.config.xaxis.tooltip.enabled&&e.globals.axisCharts,this.yaxisTooltips=e.config.yaxis.map((function(t,i){return !!(t.show&&t.tooltip.enabled&&e.globals.axisCharts)})),this.allTooltipSeriesGroups=[],e.globals.axisCharts||(this.showTooltipTitle=!1);var i=document.createElement("div");if(i.classList.add("apexcharts-tooltip"),e.config.tooltip.cssClass&&i.classList.add(e.config.tooltip.cssClass),i.classList.add("apexcharts-theme-".concat(this.tConfig.theme)),e.globals.dom.elWrap.appendChild(i),e.globals.axisCharts){this.axesTooltip.drawXaxisTooltip(),this.axesTooltip.drawYaxisTooltip(),this.axesTooltip.setXCrosshairWidth(),this.axesTooltip.handleYCrosshair();var a=new V(this.ctx);this.xAxisTicksPositions=a.getXAxisTicksPositions();}if(!e.globals.comboCharts&&!this.tConfig.intersect&&"rangeBar"!==e.config.chart.type||this.tConfig.shared||(this.showOnIntersect=!0),0!==e.config.markers.size&&0!==e.globals.markers.largestSize||this.marker.drawDynamicPoints(this),e.globals.collapsedSeries.length!==e.globals.series.length){this.dataPointsDividedHeight=e.globals.gridHeight/e.globals.dataPoints,this.dataPointsDividedWidth=e.globals.gridWidth/e.globals.dataPoints,this.showTooltipTitle&&(this.tooltipTitle=document.createElement("div"),this.tooltipTitle.classList.add("apexcharts-tooltip-title"),this.tooltipTitle.style.fontFamily=this.tConfig.style.fontFamily||e.config.chart.fontFamily,this.tooltipTitle.style.fontSize=this.tConfig.style.fontSize,i.appendChild(this.tooltipTitle));var s=e.globals.series.length;(e.globals.xyCharts||e.globals.comboCharts)&&this.tConfig.shared&&(s=this.showOnIntersect?1:e.globals.series.length),this.legendLabels=e.globals.dom.baseEl.querySelectorAll(".apexcharts-legend-text"),this.ttItems=this.createTTElements(s),this.addSVGEvents();}}},{key:"createTTElements",value:function(t){for(var e=this,i=this.w,a=[],s=this.getElTooltip(),r=function(r){var o=document.createElement("div");o.classList.add("apexcharts-tooltip-series-group"),o.style.order=i.config.tooltip.inverseOrder?t-r:r+1,e.tConfig.shared&&e.tConfig.enabledOnSeries&&Array.isArray(e.tConfig.enabledOnSeries)&&e.tConfig.enabledOnSeries.indexOf(r)<0&&o.classList.add("apexcharts-tooltip-series-group-hidden");var n=document.createElement("span");n.classList.add("apexcharts-tooltip-marker"),n.style.backgroundColor=i.globals.colors[r],o.appendChild(n);var l=document.createElement("div");l.classList.add("apexcharts-tooltip-text"),l.style.fontFamily=e.tConfig.style.fontFamily||i.config.chart.fontFamily,l.style.fontSize=e.tConfig.style.fontSize,["y","goals","z"].forEach((function(t){var e=document.createElement("div");e.classList.add("apexcharts-tooltip-".concat(t,"-group"));var i=document.createElement("span");i.classList.add("apexcharts-tooltip-text-".concat(t,"-label")),e.appendChild(i);var a=document.createElement("span");a.classList.add("apexcharts-tooltip-text-".concat(t,"-value")),e.appendChild(a),l.appendChild(e);})),o.appendChild(l),s.appendChild(o),a.push(o);},o=0;o<t;o++)r(o);return a}},{key:"addSVGEvents",value:function(){var t=this.w,e=t.config.chart.type,i=this.getElTooltip(),a=!("bar"!==e&&"candlestick"!==e&&"boxPlot"!==e&&"rangeBar"!==e),s="area"===e||"line"===e||"scatter"===e||"bubble"===e||"radar"===e,r=t.globals.dom.Paper.node,o=this.getElGrid();o&&(this.seriesBound=o.getBoundingClientRect());var n,l=[],h=[],c={hoverArea:r,elGrid:o,tooltipEl:i,tooltipY:l,tooltipX:h,ttItems:this.ttItems};if(t.globals.axisCharts&&(s?n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series[data\\:longestSeries='true'] .apexcharts-marker"):a?n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series .apexcharts-bar-area, .apexcharts-series .apexcharts-candlestick-area, .apexcharts-series .apexcharts-boxPlot-area, .apexcharts-series .apexcharts-rangebar-area"):"heatmap"!==e&&"treemap"!==e||(n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series .apexcharts-heatmap, .apexcharts-series .apexcharts-treemap")),n&&n.length))for(var d=0;d<n.length;d++)l.push(n[d].getAttribute("cy")),h.push(n[d].getAttribute("cx"));if(t.globals.xyCharts&&!this.showOnIntersect||t.globals.comboCharts&&!this.showOnIntersect||a&&this.tooltipUtil.hasBars()&&this.tConfig.shared)this.addPathsEventListeners([r],c);else if(a&&!t.globals.comboCharts||s&&this.showOnIntersect)this.addDatapointEventsListeners(c);else if(!t.globals.axisCharts||"heatmap"===e||"treemap"===e){var g=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series");this.addPathsEventListeners(g,c);}if(this.showOnIntersect){var u=t.globals.dom.baseEl.querySelectorAll(".apexcharts-line-series .apexcharts-marker, .apexcharts-area-series .apexcharts-marker");u.length>0&&this.addPathsEventListeners(u,c),this.tooltipUtil.hasBars()&&!this.tConfig.shared&&this.addDatapointEventsListeners(c);}}},{key:"drawFixedTooltipRect",value:function(){var t=this.w,e=this.getElTooltip(),i=e.getBoundingClientRect(),a=i.width+10,s=i.height+10,r=this.tConfig.fixed.offsetX,o=this.tConfig.fixed.offsetY,n=this.tConfig.fixed.position.toLowerCase();return n.indexOf("right")>-1&&(r=r+t.globals.svgWidth-a+10),n.indexOf("bottom")>-1&&(o=o+t.globals.svgHeight-s-10),e.style.left=r+"px",e.style.top=o+"px",{x:r,y:o,ttWidth:a,ttHeight:s}}},{key:"addDatapointEventsListeners",value:function(t){var e=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers .apexcharts-marker, .apexcharts-bar-area, .apexcharts-candlestick-area, .apexcharts-boxPlot-area, .apexcharts-rangebar-area");this.addPathsEventListeners(e,t);}},{key:"addPathsEventListeners",value:function(t,e){for(var i=this,a=function(a){var s={paths:t[a],tooltipEl:e.tooltipEl,tooltipY:e.tooltipY,tooltipX:e.tooltipX,elGrid:e.elGrid,hoverArea:e.hoverArea,ttItems:e.ttItems};["mousemove","mouseup","touchmove","mouseout","touchend"].map((function(e){return t[a].addEventListener(e,i.onSeriesHover.bind(i,s),{capture:!1,passive:!0})}));},s=0;s<t.length;s++)a(s);}},{key:"onSeriesHover",value:function(t,e){var i=this,a=Date.now()-this.lastHoverTime;a>=100?this.seriesHover(t,e):(clearTimeout(this.seriesHoverTimeout),this.seriesHoverTimeout=setTimeout((function(){i.seriesHover(t,e);}),100-a));}},{key:"seriesHover",value:function(t,e){var i=this;this.lastHoverTime=Date.now();var a=[],s=this.w;s.config.chart.group&&(a=this.ctx.getGroupedCharts()),s.globals.axisCharts&&(s.globals.minX===-1/0&&s.globals.maxX===1/0||0===s.globals.dataPoints)||(a.length?a.forEach((function(a){var s=i.getElTooltip(a),r={paths:t.paths,tooltipEl:s,tooltipY:t.tooltipY,tooltipX:t.tooltipX,elGrid:t.elGrid,hoverArea:t.hoverArea,ttItems:a.w.globals.tooltip.ttItems};a.w.globals.minX===i.w.globals.minX&&a.w.globals.maxX===i.w.globals.maxX&&a.w.globals.tooltip.seriesHoverByContext({chartCtx:a,ttCtx:a.w.globals.tooltip,opt:r,e:e});})):this.seriesHoverByContext({chartCtx:this.ctx,ttCtx:this.w.globals.tooltip,opt:t,e:e}));}},{key:"seriesHoverByContext",value:function(t){var e=t.chartCtx,i=t.ttCtx,a=t.opt,s=t.e,r=e.w,o=this.getElTooltip();if(o){if(i.tooltipRect={x:0,y:0,ttWidth:o.getBoundingClientRect().width,ttHeight:o.getBoundingClientRect().height},i.e=s,i.tooltipUtil.hasBars()&&!r.globals.comboCharts&&!i.isBarShared)if(this.tConfig.onDatasetHover.highlightDataSeries)new N(e).toggleSeriesOnHover(s,s.target.parentNode);i.fixedTooltip&&i.drawFixedTooltipRect(),r.globals.axisCharts?i.axisChartsTooltips({e:s,opt:a,tooltipRect:i.tooltipRect}):i.nonAxisChartsTooltips({e:s,opt:a,tooltipRect:i.tooltipRect});}}},{key:"axisChartsTooltips",value:function(t){var e,i,a=t.e,s=t.opt,r=this.w,o=s.elGrid.getBoundingClientRect(),n="touchmove"===a.type?a.touches[0].clientX:a.clientX,l="touchmove"===a.type?a.touches[0].clientY:a.clientY;if(this.clientY=l,this.clientX=n,r.globals.capturedSeriesIndex=-1,r.globals.capturedDataPointIndex=-1,l<o.top||l>o.top+o.height)this.handleMouseOut(s);else {if(Array.isArray(this.tConfig.enabledOnSeries)&&!r.config.tooltip.shared){var h=parseInt(s.paths.getAttribute("index"),10);if(this.tConfig.enabledOnSeries.indexOf(h)<0)return void this.handleMouseOut(s)}var c=this.getElTooltip(),d=this.getElXCrosshairs(),g=r.globals.xyCharts||"bar"===r.config.chart.type&&!r.globals.isBarHorizontal&&this.tooltipUtil.hasBars()&&this.tConfig.shared||r.globals.comboCharts&&this.tooltipUtil.hasBars();if("mousemove"===a.type||"touchmove"===a.type||"mouseup"===a.type){if(r.globals.collapsedSeries.length+r.globals.ancillaryCollapsedSeries.length===r.globals.series.length)return;null!==d&&d.classList.add("apexcharts-active");var u=this.yaxisTooltips.filter((function(t){return !0===t}));if(null!==this.ycrosshairs&&u.length&&this.ycrosshairs.classList.add("apexcharts-active"),g&&!this.showOnIntersect)this.handleStickyTooltip(a,n,l,s);else if("heatmap"===r.config.chart.type||"treemap"===r.config.chart.type){var p=this.intersect.handleHeatTreeTooltip({e:a,opt:s,x:e,y:i,type:r.config.chart.type});e=p.x,i=p.y,c.style.left=e+"px",c.style.top=i+"px";}else this.tooltipUtil.hasBars()&&this.intersect.handleBarTooltip({e:a,opt:s}),this.tooltipUtil.hasMarkers()&&this.intersect.handleMarkerTooltip({e:a,opt:s,x:e,y:i});if(this.yaxisTooltips.length)for(var f=0;f<r.config.yaxis.length;f++)this.axesTooltip.drawYaxisTooltipText(f,l,this.xyRatios);s.tooltipEl.classList.add("apexcharts-active");}else "mouseout"!==a.type&&"touchend"!==a.type||this.handleMouseOut(s);}}},{key:"nonAxisChartsTooltips",value:function(t){var e=t.e,i=t.opt,a=t.tooltipRect,s=this.w,r=i.paths.getAttribute("rel"),o=this.getElTooltip(),n=s.globals.dom.elWrap.getBoundingClientRect();if("mousemove"===e.type||"touchmove"===e.type){o.classList.add("apexcharts-active"),this.tooltipLabels.drawSeriesTexts({ttItems:i.ttItems,i:parseInt(r,10)-1,shared:!1});var l=s.globals.clientX-n.left-a.ttWidth/2,h=s.globals.clientY-n.top-a.ttHeight-10;if(o.style.left=l+"px",o.style.top=h+"px",s.config.legend.tooltipHoverFormatter){var c=r-1,d=(0, s.config.legend.tooltipHoverFormatter)(this.legendLabels[c].getAttribute("data:default-text"),{seriesIndex:c,dataPointIndex:c,w:s});this.legendLabels[c].innerHTML=d;}}else "mouseout"!==e.type&&"touchend"!==e.type||(o.classList.remove("apexcharts-active"),s.config.legend.tooltipHoverFormatter&&this.legendLabels.forEach((function(t){var e=t.getAttribute("data:default-text");t.innerHTML=decodeURIComponent(e);})));}},{key:"handleStickyTooltip",value:function(t,e,i,a){var s=this.w,r=this.tooltipUtil.getNearestValues({context:this,hoverArea:a.hoverArea,elGrid:a.elGrid,clientX:e,clientY:i}),o=r.j,n=r.capturedSeries;s.globals.collapsedSeriesIndices.includes(n)&&(n=null);var l=a.elGrid.getBoundingClientRect();if(r.hoverX<0||r.hoverX>l.width)this.handleMouseOut(a);else if(null!==n)this.handleStickyCapturedSeries(t,n,a,o);else if(this.tooltipUtil.isXoverlap(o)||s.globals.isBarHorizontal){var h=s.globals.series.findIndex((function(t,e){return !s.globals.collapsedSeriesIndices.includes(e)}));this.create(t,this,h,o,a.ttItems);}}},{key:"handleStickyCapturedSeries",value:function(t,e,i,a){var s=this.w;if(!this.tConfig.shared&&null===s.globals.series[e][a])return void this.handleMouseOut(i);if(void 0!==s.globals.series[e][a])this.tConfig.shared&&this.tooltipUtil.isXoverlap(a)&&this.tooltipUtil.isInitialSeriesSameLen()?this.create(t,this,e,a,i.ttItems):this.create(t,this,e,a,i.ttItems,!1);else if(this.tooltipUtil.isXoverlap(a)){var r=s.globals.series.findIndex((function(t,e){return !s.globals.collapsedSeriesIndices.includes(e)}));this.create(t,this,r,a,i.ttItems);}}},{key:"deactivateHoverFilter",value:function(){for(var t=this.w,e=new m(this.ctx),i=t.globals.dom.Paper.select(".apexcharts-bar-area"),a=0;a<i.length;a++)e.pathMouseLeave(i[a]);}},{key:"handleMouseOut",value:function(t){var e=this.w,i=this.getElXCrosshairs();if(t.tooltipEl.classList.remove("apexcharts-active"),this.deactivateHoverFilter(),"bubble"!==e.config.chart.type&&this.marker.resetPointsSize(),null!==i&&i.classList.remove("apexcharts-active"),null!==this.ycrosshairs&&this.ycrosshairs.classList.remove("apexcharts-active"),this.isXAxisTooltipEnabled&&this.xaxisTooltip.classList.remove("apexcharts-active"),this.yaxisTooltips.length){null===this.yaxisTTEls&&(this.yaxisTTEls=e.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxistooltip"));for(var a=0;a<this.yaxisTTEls.length;a++)this.yaxisTTEls[a].classList.remove("apexcharts-active");}e.config.legend.tooltipHoverFormatter&&this.legendLabels.forEach((function(t){var e=t.getAttribute("data:default-text");t.innerHTML=decodeURIComponent(e);}));}},{key:"markerClick",value:function(t,e,i){var a=this.w;"function"==typeof a.config.chart.events.markerClick&&a.config.chart.events.markerClick(t,this.ctx,{seriesIndex:e,dataPointIndex:i,w:a}),this.ctx.events.fireEvent("markerClick",[t,this.ctx,{seriesIndex:e,dataPointIndex:i,w:a}]);}},{key:"create",value:function(t,i,a,s,r){var o,n,l,h,c,d,g,u,p,f,x,b,v,y,w,k,A=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,S=this.w,C=i;"mouseup"===t.type&&this.markerClick(t,a,s),null===A&&(A=this.tConfig.shared);var L=this.tooltipUtil.hasMarkers(a),P=this.tooltipUtil.getElBars();if(S.config.legend.tooltipHoverFormatter){var I=S.config.legend.tooltipHoverFormatter,M=Array.from(this.legendLabels);M.forEach((function(t){var e=t.getAttribute("data:default-text");t.innerHTML=decodeURIComponent(e);}));for(var T=0;T<M.length;T++){var z=M[T],X=parseInt(z.getAttribute("i"),10),E=decodeURIComponent(z.getAttribute("data:default-text")),Y=I(E,{seriesIndex:A?X:a,dataPointIndex:s,w:S});if(A)z.innerHTML=S.globals.collapsedSeriesIndices.indexOf(X)<0?Y:E;else if(z.innerHTML=X===a?Y:E,a===X)break}}var F=e(e({ttItems:r,i:a,j:s},void 0!==(null===(o=S.globals.seriesRange)||void 0===o||null===(n=o[a])||void 0===n||null===(l=n[s])||void 0===l||null===(h=l.y[0])||void 0===h?void 0:h.y1)&&{y1:null===(c=S.globals.seriesRange)||void 0===c||null===(d=c[a])||void 0===d||null===(g=d[s])||void 0===g||null===(u=g.y[0])||void 0===u?void 0:u.y1}),void 0!==(null===(p=S.globals.seriesRange)||void 0===p||null===(f=p[a])||void 0===f||null===(x=f[s])||void 0===x||null===(b=x.y[0])||void 0===b?void 0:b.y2)&&{y2:null===(v=S.globals.seriesRange)||void 0===v||null===(y=v[a])||void 0===y||null===(w=y[s])||void 0===w||null===(k=w.y[0])||void 0===k?void 0:k.y2});if(A){if(C.tooltipLabels.drawSeriesTexts(e(e({},F),{},{shared:!this.showOnIntersect&&this.tConfig.shared})),L)S.globals.markers.largestSize>0?C.marker.enlargePoints(s):C.tooltipPosition.moveDynamicPointsOnHover(s);else if(this.tooltipUtil.hasBars()&&(this.barSeriesHeight=this.tooltipUtil.getBarsHeight(P),this.barSeriesHeight>0)){var R=new m(this.ctx),H=S.globals.dom.Paper.select(".apexcharts-bar-area[j='".concat(s,"']"));this.deactivateHoverFilter(),this.tooltipPosition.moveStickyTooltipOverBars(s,a);for(var D=0;D<H.length;D++)R.pathMouseEnter(H[D]);}}else C.tooltipLabels.drawSeriesTexts(e({shared:!1},F)),this.tooltipUtil.hasBars()&&C.tooltipPosition.moveStickyTooltipOverBars(s,a),L&&C.tooltipPosition.moveMarkers(a,s);}}]),t}(),vt=function(){function t(e){a(this,t),this.w=e.w,this.barCtx=e,this.totalFormatter=this.w.config.plotOptions.bar.dataLabels.total.formatter,this.totalFormatter||(this.totalFormatter=this.w.config.dataLabels.formatter);}return r(t,[{key:"handleBarDataLabels",value:function(t){var e=t.x,i=t.y,a=t.y1,s=t.y2,r=t.i,o=t.j,n=t.realIndex,l=t.groupIndex,h=t.series,c=t.barHeight,d=t.barWidth,g=t.barXPosition,u=t.barYPosition,p=t.visibleSeries,f=t.renderedPath,x=this.w,b=new m(this.barCtx.ctx),v=Array.isArray(this.barCtx.strokeWidth)?this.barCtx.strokeWidth[n]:this.barCtx.strokeWidth,y=e+parseFloat(d*p),w=i+parseFloat(c*p);x.globals.isXNumeric&&!x.globals.isBarHorizontal&&(y=e+parseFloat(d*(p+1)),w=i+parseFloat(c*(p+1))-v);var k,A=null,S=e,C=i,L={},P=x.config.dataLabels,I=this.barCtx.barOptions.dataLabels,M=this.barCtx.barOptions.dataLabels.total;void 0!==u&&this.barCtx.isRangeBar&&(w=u,C=u),void 0!==g&&this.barCtx.isVerticalGroupedRangeBar&&(y=g,S=g);var T=P.offsetX,z=P.offsetY,X={width:0,height:0};if(x.config.dataLabels.enabled){var E=this.barCtx.series[r][o];X=b.getTextRects(x.globals.yLabelFormatters[0](E),parseFloat(P.style.fontSize));}var Y={x:e,y:i,i:r,j:o,realIndex:n,groupIndex:l||-1,renderedPath:f,bcx:y,bcy:w,barHeight:c,barWidth:d,textRects:X,strokeWidth:v,dataLabelsX:S,dataLabelsY:C,dataLabelsConfig:P,barDataLabelsConfig:I,barTotalDataLabelsConfig:M,offX:T,offY:z};return L=this.barCtx.isHorizontal?this.calculateBarsDataLabelsPosition(Y):this.calculateColumnsDataLabelsPosition(Y),f.attr({cy:L.bcy,cx:L.bcx,j:o,val:h[r][o],barHeight:c,barWidth:d}),k=this.drawCalculatedDataLabels({x:L.dataLabelsX,y:L.dataLabelsY,val:this.barCtx.isRangeBar?[a,s]:h[r][o],i:n,j:o,barWidth:d,barHeight:c,textRects:X,dataLabelsConfig:P}),x.config.chart.stacked&&M.enabled&&(A=this.drawTotalDataLabels({x:L.totalDataLabelsX,y:L.totalDataLabelsY,realIndex:n,textAnchor:L.totalDataLabelsAnchor,val:this.getStackedTotalDataLabel({realIndex:n,j:o}),dataLabelsConfig:P,barTotalDataLabelsConfig:M})),{dataLabels:k,totalDataLabels:A}}},{key:"getStackedTotalDataLabel",value:function(t){var i=t.realIndex,a=t.j,s=this.w,r=this.barCtx.stackedSeriesTotals[a];return this.totalFormatter&&(r=this.totalFormatter(r,e(e({},s),{},{seriesIndex:i,dataPointIndex:a,w:s}))),r}},{key:"calculateColumnsDataLabelsPosition",value:function(t){var e,i,a=this.w,s=t.i,r=t.j,o=t.realIndex,n=t.groupIndex,l=t.y,h=t.bcx,c=t.barWidth,d=t.barHeight,g=t.textRects,u=t.dataLabelsX,p=t.dataLabelsY,f=t.dataLabelsConfig,x=t.barDataLabelsConfig,b=t.barTotalDataLabelsConfig,v=t.strokeWidth,y=t.offX,w=t.offY;d=Math.abs(d);var k="vertical"===a.config.plotOptions.bar.dataLabels.orientation,A=this.barCtx.barHelpers.getZeroValueEncounters({i:s,j:r}).zeroEncounters;h=h-v/2+(-1!==n?n*c:0);var S=a.globals.gridWidth/a.globals.dataPoints;if(this.barCtx.isVerticalGroupedRangeBar?u+=c/2:(u=a.globals.isXNumeric?h-c/2+y:h-S+c/2+y,A>0&&a.config.plotOptions.bar.hideZeroBarsWhenGrouped&&(u-=c*A)),k){u=u+g.height/2-v/2-2;}var C=this.barCtx.series[s][r]<0,L=l;switch(this.barCtx.isReversed&&(L=l-d+(C?2*d:0),l-=d),x.position){case"center":p=k?C?L-d/2+w:L+d/2-w:C?L-d/2+g.height/2+w:L+d/2+g.height/2-w;break;case"bottom":p=k?C?L-d+w:L+d-w:C?L-d+g.height+v+w:L+d-g.height/2+v-w;break;case"top":p=k?C?L+w:L-w:C?L-g.height/2-w:L+g.height+w;}if(this.barCtx.lastActiveBarSerieIndex===o&&b.enabled){var P=new m(this.barCtx.ctx).getTextRects(this.getStackedTotalDataLabel({realIndex:o,j:r}),f.fontSize);e=C?L-P.height/2-w-b.offsetY+18:L+P.height+w+b.offsetY-18,i=u+b.offsetX;}return a.config.chart.stacked||(p<0?p=0+v:p+g.height/3>a.globals.gridHeight&&(p=a.globals.gridHeight-v)),{bcx:h,bcy:l,dataLabelsX:u,dataLabelsY:p,totalDataLabelsX:i,totalDataLabelsY:e,totalDataLabelsAnchor:"middle"}}},{key:"calculateBarsDataLabelsPosition",value:function(t){var e=this.w,i=t.x,a=t.i,s=t.j,r=t.realIndex,o=t.groupIndex,n=t.bcy,l=t.barHeight,h=t.barWidth,c=t.textRects,d=t.dataLabelsX,g=t.strokeWidth,u=t.dataLabelsConfig,p=t.barDataLabelsConfig,f=t.barTotalDataLabelsConfig,x=t.offX,b=t.offY,v=e.globals.gridHeight/e.globals.dataPoints;h=Math.abs(h);var y,w,k=(n+=-1!==o?o*l:0)-(this.barCtx.isRangeBar?0:v)+l/2+c.height/2+b-3,A="start",S=this.barCtx.series[a][s]<0,C=i;switch(this.barCtx.isReversed&&(C=i+h-(S?2*h:0),i=e.globals.gridWidth-h),p.position){case"center":d=S?C+h/2-x:Math.max(c.width/2,C-h/2)+x;break;case"bottom":d=S?C+h-g-Math.round(c.width/2)-x:C-h+g+Math.round(c.width/2)+x;break;case"top":d=S?C-g+Math.round(c.width/2)-x:C-g-Math.round(c.width/2)+x;}if(this.barCtx.lastActiveBarSerieIndex===r&&f.enabled){var L=new m(this.barCtx.ctx).getTextRects(this.getStackedTotalDataLabel({realIndex:r,j:s}),u.fontSize);S?(y=C-g+Math.round(L.width/2)-x-f.offsetX-15,A="end"):y=C-g-Math.round(L.width/2)+x+f.offsetX+15,w=k+f.offsetY;}return e.config.chart.stacked||(d<0?d=d+c.width+g:d+c.width/2>e.globals.gridWidth&&(d=e.globals.gridWidth-c.width-g)),{bcx:i,bcy:n,dataLabelsX:d,dataLabelsY:k,totalDataLabelsX:y,totalDataLabelsY:w,totalDataLabelsAnchor:A}}},{key:"drawCalculatedDataLabels",value:function(t){var i=t.x,a=t.y,s=t.val,r=t.i,o=t.j,n=t.textRects,l=t.barHeight,h=t.barWidth,c=t.dataLabelsConfig,d=this.w,g="rotate(0)";"vertical"===d.config.plotOptions.bar.dataLabels.orientation&&(g="rotate(-90, ".concat(i,", ").concat(a,")"));var u=new O(this.barCtx.ctx),p=new m(this.barCtx.ctx),f=c.formatter,x=null,b=d.globals.collapsedSeriesIndices.indexOf(r)>-1;if(c.enabled&&!b){x=p.group({class:"apexcharts-data-labels",transform:g});var v="";void 0!==s&&(v=f(s,e(e({},d),{},{seriesIndex:r,dataPointIndex:o,w:d}))),!s&&d.config.plotOptions.bar.hideZeroBarsWhenGrouped&&(v="");var y=d.globals.series[r][o]<0,w=d.config.plotOptions.bar.dataLabels.position;if("vertical"===d.config.plotOptions.bar.dataLabels.orientation&&("top"===w&&(c.textAnchor=y?"end":"start"),"center"===w&&(c.textAnchor="middle"),"bottom"===w&&(c.textAnchor=y?"end":"start")),this.barCtx.isRangeBar&&this.barCtx.barOptions.dataLabels.hideOverflowingLabels)h<p.getTextRects(v,parseFloat(c.style.fontSize)).width&&(v="");d.config.chart.stacked&&this.barCtx.barOptions.dataLabels.hideOverflowingLabels&&(this.barCtx.isHorizontal?n.width/1.6>Math.abs(h)&&(v=""):n.height/1.6>Math.abs(l)&&(v=""));var k=e({},c);this.barCtx.isHorizontal&&s<0&&("start"===c.textAnchor?k.textAnchor="end":"end"===c.textAnchor&&(k.textAnchor="start")),u.plotDataLabelsText({x:i,y:a,text:v,i:r,j:o,parent:x,dataLabelsConfig:k,alwaysDrawDataLabel:!0,offsetCorrection:!0});}return x}},{key:"drawTotalDataLabels",value:function(t){var e,i=t.x,a=t.y,s=t.val,r=t.realIndex,o=t.textAnchor,n=t.barTotalDataLabelsConfig,l=new m(this.barCtx.ctx);return n.enabled&&void 0!==i&&void 0!==a&&this.barCtx.lastActiveBarSerieIndex===r&&(e=l.drawText({x:i,y:a,foreColor:n.style.color,text:s,textAnchor:o,fontFamily:n.style.fontFamily,fontSize:n.style.fontSize,fontWeight:n.style.fontWeight})),e}}]),t}(),mt=function(){function t(e){a(this,t),this.w=e.w,this.barCtx=e;}return r(t,[{key:"initVariables",value:function(t){var e=this.w;this.barCtx.series=t,this.barCtx.totalItems=0,this.barCtx.seriesLen=0,this.barCtx.visibleI=-1,this.barCtx.visibleItems=1;for(var i=0;i<t.length;i++)if(t[i].length>0&&(this.barCtx.seriesLen=this.barCtx.seriesLen+1,this.barCtx.totalItems+=t[i].length),e.globals.isXNumeric)for(var a=0;a<t[i].length;a++)e.globals.seriesX[i][a]>e.globals.minX&&e.globals.seriesX[i][a]<e.globals.maxX&&this.barCtx.visibleItems++;else this.barCtx.visibleItems=e.globals.dataPoints;0===this.barCtx.seriesLen&&(this.barCtx.seriesLen=1),this.barCtx.zeroSerieses=[],e.globals.comboCharts||this.checkZeroSeries({series:t});}},{key:"initialPositions",value:function(){var t,e,i,a,s,r,o,n,l=this.w,h=l.globals.dataPoints;this.barCtx.isRangeBar&&(h=l.globals.labels.length);var c=this.barCtx.seriesLen;if(l.config.plotOptions.bar.rangeBarGroupRows&&(c=1),this.barCtx.isHorizontal)s=(i=l.globals.gridHeight/h)/c,l.globals.isXNumeric&&(s=(i=l.globals.gridHeight/this.barCtx.totalItems)/this.barCtx.seriesLen),s=s*parseInt(this.barCtx.barOptions.barHeight,10)/100,-1===String(this.barCtx.barOptions.barHeight).indexOf("%")&&(s=parseInt(this.barCtx.barOptions.barHeight,10)),n=this.barCtx.baseLineInvertedY+l.globals.padHorizontal+(this.barCtx.isReversed?l.globals.gridWidth:0)-(this.barCtx.isReversed?2*this.barCtx.baseLineInvertedY:0),this.barCtx.isFunnel&&(n=l.globals.gridWidth/2),e=(i-s*this.barCtx.seriesLen)/2;else {if(a=l.globals.gridWidth/this.barCtx.visibleItems,l.config.xaxis.convertedCatToNumeric&&(a=l.globals.gridWidth/l.globals.dataPoints),r=a/c*parseInt(this.barCtx.barOptions.columnWidth,10)/100,l.globals.isXNumeric){var d=this.barCtx.xRatio;l.config.xaxis.convertedCatToNumeric&&(d=this.barCtx.initialXRatio),l.globals.minXDiff&&.5!==l.globals.minXDiff&&l.globals.minXDiff/d>0&&(a=l.globals.minXDiff/d),(r=a/c*parseInt(this.barCtx.barOptions.columnWidth,10)/100)<1&&(r=1);}-1===String(this.barCtx.barOptions.columnWidth).indexOf("%")&&(r=parseInt(this.barCtx.barOptions.columnWidth,10)),o=l.globals.gridHeight-this.barCtx.baseLineY[this.barCtx.yaxisIndex]-(this.barCtx.isReversed?l.globals.gridHeight:0)+(this.barCtx.isReversed?2*this.barCtx.baseLineY[this.barCtx.yaxisIndex]:0),t=l.globals.padHorizontal+(a-r*this.barCtx.seriesLen)/2;}return {x:t,y:e,yDivision:i,xDivision:a,barHeight:s,barWidth:r,zeroH:o,zeroW:n}}},{key:"initializeStackedPrevVars",value:function(t){var e=t.w;e.globals.hasSeriesGroups?e.globals.seriesGroups.forEach((function(e){t[e]||(t[e]={}),t[e].prevY=[],t[e].prevX=[],t[e].prevYF=[],t[e].prevXF=[],t[e].prevYVal=[],t[e].prevXVal=[];})):(t.prevY=[],t.prevX=[],t.prevYF=[],t.prevXF=[],t.prevYVal=[],t.prevXVal=[]);}},{key:"initializeStackedXYVars",value:function(t){var e=t.w;e.globals.hasSeriesGroups?e.globals.seriesGroups.forEach((function(e){t[e]||(t[e]={}),t[e].xArrj=[],t[e].xArrjF=[],t[e].xArrjVal=[],t[e].yArrj=[],t[e].yArrjF=[],t[e].yArrjVal=[];})):(t.xArrj=[],t.xArrjF=[],t.xArrjVal=[],t.yArrj=[],t.yArrjF=[],t.yArrjVal=[]);}},{key:"getPathFillColor",value:function(t,e,i,a){var s,r,o,n,l=this.w,h=new R(this.barCtx.ctx),c=null,d=this.barCtx.barOptions.distributed?i:e;this.barCtx.barOptions.colors.ranges.length>0&&this.barCtx.barOptions.colors.ranges.map((function(a){t[e][i]>=a.from&&t[e][i]<=a.to&&(c=a.color);}));return l.config.series[e].data[i]&&l.config.series[e].data[i].fillColor&&(c=l.config.series[e].data[i].fillColor),h.fillPath({seriesNumber:this.barCtx.barOptions.distributed?d:a,dataPointIndex:i,color:c,value:t[e][i],fillConfig:null===(s=l.config.series[e].data[i])||void 0===s?void 0:s.fill,fillType:null!==(r=l.config.series[e].data[i])&&void 0!==r&&null!==(o=r.fill)&&void 0!==o&&o.type?null===(n=l.config.series[e].data[i])||void 0===n?void 0:n.fill.type:l.config.fill.type})}},{key:"getStrokeWidth",value:function(t,e,i){var a=0,s=this.w;return this.barCtx.series[t][e]?this.barCtx.isNullValue=!1:this.barCtx.isNullValue=!0,s.config.stroke.show&&(this.barCtx.isNullValue||(a=Array.isArray(this.barCtx.strokeWidth)?this.barCtx.strokeWidth[i]:this.barCtx.strokeWidth)),a}},{key:"shouldApplyRadius",value:function(t){var e=this.w,i=!1;return e.config.plotOptions.bar.borderRadius>0&&(e.config.chart.stacked&&"last"===e.config.plotOptions.bar.borderRadiusWhenStacked?this.barCtx.lastActiveBarSerieIndex===t&&(i=!0):i=!0),i}},{key:"barBackground",value:function(t){var e=t.j,i=t.i,a=t.x1,s=t.x2,r=t.y1,o=t.y2,n=t.elSeries,l=this.w,h=new m(this.barCtx.ctx),c=new N(this.barCtx.ctx).getActiveConfigSeriesIndex();if(this.barCtx.barOptions.colors.backgroundBarColors.length>0&&c===i){e>=this.barCtx.barOptions.colors.backgroundBarColors.length&&(e%=this.barCtx.barOptions.colors.backgroundBarColors.length);var d=this.barCtx.barOptions.colors.backgroundBarColors[e],g=h.drawRect(void 0!==a?a:0,void 0!==r?r:0,void 0!==s?s:l.globals.gridWidth,void 0!==o?o:l.globals.gridHeight,this.barCtx.barOptions.colors.backgroundBarRadius,d,this.barCtx.barOptions.colors.backgroundBarOpacity);n.add(g),g.node.classList.add("apexcharts-backgroundBar");}}},{key:"getColumnPaths",value:function(t){var e,i=t.barWidth,a=t.barXPosition,s=t.y1,r=t.y2,o=t.strokeWidth,n=t.seriesGroup,l=t.realIndex,h=t.i,c=t.j,d=t.w,g=new m(this.barCtx.ctx);(o=Array.isArray(o)?o[l]:o)||(o=0);var u=i,p=a;null!==(e=d.config.series[l].data[c])&&void 0!==e&&e.columnWidthOffset&&(p=a-d.config.series[l].data[c].columnWidthOffset/2,u=i+d.config.series[l].data[c].columnWidthOffset);var f=p,x=p+u;s+=.001,r+=.001;var b=g.move(f,s),v=g.move(f,s),y=g.line(x-o,s);if(d.globals.previousPaths.length>0&&(v=this.barCtx.getPreviousPath(l,c,!1)),b=b+g.line(f,r)+g.line(x-o,r)+g.line(x-o,s)+("around"===d.config.plotOptions.bar.borderRadiusApplication?" Z":" z"),v=v+g.line(f,s)+y+y+y+y+y+g.line(f,s)+("around"===d.config.plotOptions.bar.borderRadiusApplication?" Z":" z"),this.shouldApplyRadius(l)&&(b=g.roundPathCorners(b,d.config.plotOptions.bar.borderRadius)),d.config.chart.stacked){var w=this.barCtx;d.globals.hasSeriesGroups&&n&&(w=this.barCtx[n]),w.yArrj.push(r),w.yArrjF.push(Math.abs(s-r)),w.yArrjVal.push(this.barCtx.series[h][c]);}return {pathTo:b,pathFrom:v}}},{key:"getBarpaths",value:function(t){var e,i=t.barYPosition,a=t.barHeight,s=t.x1,r=t.x2,o=t.strokeWidth,n=t.seriesGroup,l=t.realIndex,h=t.i,c=t.j,d=t.w,g=new m(this.barCtx.ctx);(o=Array.isArray(o)?o[l]:o)||(o=0);var u=i,p=a;null!==(e=d.config.series[l].data[c])&&void 0!==e&&e.barHeightOffset&&(u=i-d.config.series[l].data[c].barHeightOffset/2,p=a+d.config.series[l].data[c].barHeightOffset);var f=u,x=u+p;s+=.001,r+=.001;var b=g.move(s,f),v=g.move(s,f);d.globals.previousPaths.length>0&&(v=this.barCtx.getPreviousPath(l,c,!1));var y=g.line(s,x-o);if(b=b+g.line(r,f)+g.line(r,x-o)+y+("around"===d.config.plotOptions.bar.borderRadiusApplication?" Z":" z"),v=v+g.line(s,f)+y+y+y+y+y+g.line(s,f)+("around"===d.config.plotOptions.bar.borderRadiusApplication?" Z":" z"),this.shouldApplyRadius(l)&&(b=g.roundPathCorners(b,d.config.plotOptions.bar.borderRadius)),d.config.chart.stacked){var w=this.barCtx;d.globals.hasSeriesGroups&&n&&(w=this.barCtx[n]),w.xArrj.push(r),w.xArrjF.push(Math.abs(s-r)),w.xArrjVal.push(this.barCtx.series[h][c]);}return {pathTo:b,pathFrom:v}}},{key:"checkZeroSeries",value:function(t){for(var e=t.series,i=this.w,a=0;a<e.length;a++){for(var s=0,r=0;r<e[i.globals.maxValsInArrayIndex].length;r++)s+=e[a][r];0===s&&this.barCtx.zeroSerieses.push(a);}}},{key:"getXForValue",value:function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]?e:null;return null!=t&&(i=e+t/this.barCtx.invertedYRatio-2*(this.barCtx.isReversed?t/this.barCtx.invertedYRatio:0)),i}},{key:"getYForValue",value:function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]?e:null;return null!=t&&(i=e-t/this.barCtx.yRatio[this.barCtx.yaxisIndex]+2*(this.barCtx.isReversed?t/this.barCtx.yRatio[this.barCtx.yaxisIndex]:0)),i}},{key:"getGoalValues",value:function(t,i,a,s,r){var n=this,l=this.w,h=[],c=function(e,s){var r;h.push((o(r={},t,"x"===t?n.getXForValue(e,i,!1):n.getYForValue(e,a,!1)),o(r,"attrs",s),r));};if(l.globals.seriesGoals[s]&&l.globals.seriesGoals[s][r]&&Array.isArray(l.globals.seriesGoals[s][r])&&l.globals.seriesGoals[s][r].forEach((function(t){c(t.value,t);})),this.barCtx.barOptions.isDumbbell&&l.globals.seriesRange.length){var d=this.barCtx.barOptions.dumbbellColors?this.barCtx.barOptions.dumbbellColors:l.globals.colors,g={strokeHeight:"x"===t?0:l.globals.markers.size[s],strokeWidth:"x"===t?l.globals.markers.size[s]:0,strokeDashArray:0,strokeLineCap:"round",strokeColor:Array.isArray(d[s])?d[s][0]:d[s]};c(l.globals.seriesRangeStart[s][r],g),c(l.globals.seriesRangeEnd[s][r],e(e({},g),{},{strokeColor:Array.isArray(d[s])?d[s][1]:d[s]}));}return h}},{key:"drawGoalLine",value:function(t){var e=t.barXPosition,i=t.barYPosition,a=t.goalX,s=t.goalY,r=t.barWidth,o=t.barHeight,n=new m(this.barCtx.ctx),l=n.group({className:"apexcharts-bar-goals-groups"});l.node.classList.add("apexcharts-element-hidden"),this.barCtx.w.globals.delayedElements.push({el:l.node}),l.attr("clip-path","url(#gridRectMarkerMask".concat(this.barCtx.w.globals.cuid,")"));var h=null;return this.barCtx.isHorizontal?Array.isArray(a)&&a.forEach((function(t){var e=void 0!==t.attrs.strokeHeight?t.attrs.strokeHeight:o/2,a=i+e+o/2;h=n.drawLine(t.x,a-2*e,t.x,a,t.attrs.strokeColor?t.attrs.strokeColor:void 0,t.attrs.strokeDashArray,t.attrs.strokeWidth?t.attrs.strokeWidth:2,t.attrs.strokeLineCap),l.add(h);})):Array.isArray(s)&&s.forEach((function(t){var i=void 0!==t.attrs.strokeWidth?t.attrs.strokeWidth:r/2,a=e+i+r/2;h=n.drawLine(a-2*i,t.y,a,t.y,t.attrs.strokeColor?t.attrs.strokeColor:void 0,t.attrs.strokeDashArray,t.attrs.strokeHeight?t.attrs.strokeHeight:2,t.attrs.strokeLineCap),l.add(h);})),l}},{key:"drawBarShadow",value:function(t){var e=t.prevPaths,i=t.currPaths,a=t.color,s=this.w,r=e.x,o=e.x1,n=e.barYPosition,l=i.x,h=i.x1,c=i.barYPosition,d=n+i.barHeight,g=new m(this.barCtx.ctx),u=new x,p=g.move(o,d)+g.line(r,d)+g.line(l,c)+g.line(h,c)+g.line(o,d)+("around"===s.config.plotOptions.bar.borderRadiusApplication?" Z":" z");return g.drawPath({d:p,fill:u.shadeColor(.5,x.rgb2hex(a)),stroke:"none",strokeWidth:0,fillOpacity:1,classes:"apexcharts-bar-shadows"})}},{key:"getZeroValueEncounters",value:function(t){var e=t.i,i=t.j,a=this.w,s=0,r=0;return a.globals.seriesPercent.forEach((function(t,a){t[i]&&s++,a<e&&0===t[i]&&r++;})),{nonZeroColumns:s,zeroEncounters:r}}}]),t}(),yt=function(){function t(e,i){a(this,t),this.ctx=e,this.w=e.w;var s=this.w;this.barOptions=s.config.plotOptions.bar,this.isHorizontal=this.barOptions.horizontal,this.strokeWidth=s.config.stroke.width,this.isNullValue=!1,this.isRangeBar=s.globals.seriesRange.length&&this.isHorizontal,this.isVerticalGroupedRangeBar=!s.globals.isBarHorizontal&&s.globals.seriesRange.length&&s.config.plotOptions.bar.rangeBarGroupRows,this.isFunnel=this.barOptions.isFunnel,this.xyRatios=i,null!==this.xyRatios&&(this.xRatio=i.xRatio,this.initialXRatio=i.initialXRatio,this.yRatio=i.yRatio,this.invertedXRatio=i.invertedXRatio,this.invertedYRatio=i.invertedYRatio,this.baseLineY=i.baseLineY,this.baseLineInvertedY=i.baseLineInvertedY),this.yaxisIndex=0,this.seriesLen=0,this.pathArr=[];var r=new N(this.ctx);this.lastActiveBarSerieIndex=r.getActiveConfigSeriesIndex("desc",["bar","column"]);var o=r.getBarSeriesIndices(),n=new y(this.ctx);this.stackedSeriesTotals=n.getStackedSeriesTotals(this.w.config.series.map((function(t,e){return -1===o.indexOf(e)?e:-1})).filter((function(t){return -1!==t}))),this.barHelpers=new mt(this);}return r(t,[{key:"draw",value:function(t,i){var a=this.w,s=new m(this.ctx),r=new y(this.ctx,a);t=r.getLogSeries(t),this.series=t,this.yRatio=r.getLogYRatios(this.yRatio),this.barHelpers.initVariables(t);var o=s.group({class:"apexcharts-bar-series apexcharts-plot-series"});a.config.dataLabels.enabled&&this.totalItems>this.barOptions.dataLabels.maxItems&&console.warn("WARNING: DataLabels are enabled but there are too many to display. This may cause performance issue when rendering - ApexCharts");for(var n=0,l=0;n<t.length;n++,l++){var h,c,d,g,u=void 0,p=void 0,f=[],b=[],v=a.globals.comboCharts?i[n]:n,w=s.group({class:"apexcharts-series",rel:n+1,seriesName:x.escapeString(a.globals.seriesNames[v]),"data:realIndex":v});this.ctx.series.addCollapsedClassToSeries(w,v),t[n].length>0&&(this.visibleI=this.visibleI+1);var k=0,A=0;this.yRatio.length>1&&(this.yaxisIndex=v),this.isReversed=a.config.yaxis[this.yaxisIndex]&&a.config.yaxis[this.yaxisIndex].reversed;var S=this.barHelpers.initialPositions();p=S.y,k=S.barHeight,c=S.yDivision,g=S.zeroW,u=S.x,A=S.barWidth,h=S.xDivision,d=S.zeroH,this.horizontal||b.push(u+A/2);var C=s.group({class:"apexcharts-datalabels","data:realIndex":v});a.globals.delayedElements.push({el:C.node}),C.node.classList.add("apexcharts-element-hidden");var L=s.group({class:"apexcharts-bar-goals-markers"}),P=s.group({class:"apexcharts-bar-shadows"});a.globals.delayedElements.push({el:P.node}),P.node.classList.add("apexcharts-element-hidden");for(var I=0;I<a.globals.dataPoints;I++){var M=this.barHelpers.getStrokeWidth(n,I,v),T=null,z={indexes:{i:n,j:I,realIndex:v,bc:l},x:u,y:p,strokeWidth:M,elSeries:w};this.isHorizontal?(T=this.drawBarPaths(e(e({},z),{},{barHeight:k,zeroW:g,yDivision:c})),A=this.series[n][I]/this.invertedYRatio):(T=this.drawColumnPaths(e(e({},z),{},{xDivision:h,barWidth:A,zeroH:d})),k=this.series[n][I]/this.yRatio[this.yaxisIndex]);var X=this.barHelpers.getPathFillColor(t,n,I,v);if(this.isFunnel&&this.barOptions.isFunnel3d&&this.pathArr.length&&I>0){var E=this.barHelpers.drawBarShadow({color:"string"==typeof X&&-1===(null==X?void 0:X.indexOf("url"))?X:x.hexToRgba(a.globals.colors[n]),prevPaths:this.pathArr[this.pathArr.length-1],currPaths:T});E&&P.add(E);}this.pathArr.push(T);var Y=this.barHelpers.drawGoalLine({barXPosition:T.barXPosition,barYPosition:T.barYPosition,goalX:T.goalX,goalY:T.goalY,barHeight:k,barWidth:A});Y&&L.add(Y),p=T.y,u=T.x,I>0&&b.push(u+A/2),f.push(p),this.renderSeries({realIndex:v,pathFill:X,j:I,i:n,pathFrom:T.pathFrom,pathTo:T.pathTo,strokeWidth:M,elSeries:w,x:u,y:p,series:t,barHeight:T.barHeight?T.barHeight:k,barWidth:T.barWidth?T.barWidth:A,elDataLabelsWrap:C,elGoalsMarkers:L,elBarShadows:P,visibleSeries:this.visibleI,type:"bar"});}a.globals.seriesXvalues[v]=b,a.globals.seriesYvalues[v]=f,o.add(w);}return o}},{key:"renderSeries",value:function(t){var e=t.realIndex,i=t.pathFill,a=t.lineFill,s=t.j,r=t.i,o=t.groupIndex,n=t.pathFrom,l=t.pathTo,h=t.strokeWidth,c=t.elSeries,d=t.x,g=t.y,u=t.y1,p=t.y2,f=t.series,x=t.barHeight,b=t.barWidth,y=t.barXPosition,w=t.barYPosition,k=t.elDataLabelsWrap,A=t.elGoalsMarkers,S=t.elBarShadows,C=t.visibleSeries,L=t.type,P=this.w,I=new m(this.ctx);a||(a=this.barOptions.distributed?P.globals.stroke.colors[s]:P.globals.stroke.colors[e]),P.config.series[r].data[s]&&P.config.series[r].data[s].strokeColor&&(a=P.config.series[r].data[s].strokeColor),this.isNullValue&&(i="none");var M=s/P.config.chart.animations.animateGradually.delay*(P.config.chart.animations.speed/P.globals.dataPoints)/2.4,T=I.renderPaths({i:r,j:s,realIndex:e,pathFrom:n,pathTo:l,stroke:a,strokeWidth:h,strokeLineCap:P.config.stroke.lineCap,fill:i,animationDelay:M,initialSpeed:P.config.chart.animations.speed,dataChangeSpeed:P.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-".concat(L,"-area")});T.attr("clip-path","url(#gridRectMask".concat(P.globals.cuid,")"));var z=P.config.forecastDataPoints;z.count>0&&s>=P.globals.dataPoints-z.count&&(T.node.setAttribute("stroke-dasharray",z.dashArray),T.node.setAttribute("stroke-width",z.strokeWidth),T.node.setAttribute("fill-opacity",z.fillOpacity)),void 0!==u&&void 0!==p&&(T.attr("data-range-y1",u),T.attr("data-range-y2",p)),new v(this.ctx).setSelectionFilter(T,e,s),c.add(T);var X=new vt(this).handleBarDataLabels({x:d,y:g,y1:u,y2:p,i:r,j:s,series:f,realIndex:e,groupIndex:o,barHeight:x,barWidth:b,barXPosition:y,barYPosition:w,renderedPath:T,visibleSeries:C});return null!==X.dataLabels&&k.add(X.dataLabels),X.totalDataLabels&&k.add(X.totalDataLabels),c.add(k),A&&c.add(A),S&&c.add(S),c}},{key:"drawBarPaths",value:function(t){var e,i=t.indexes,a=t.barHeight,s=t.strokeWidth,r=t.zeroW,o=t.x,n=t.y,l=t.yDivision,h=t.elSeries,c=this.w,d=i.i,g=i.j;if(c.globals.isXNumeric)e=(n=(c.globals.seriesX[d][g]-c.globals.minX)/this.invertedXRatio-a)+a*this.visibleI;else if(c.config.plotOptions.bar.hideZeroBarsWhenGrouped){var u=0,p=0;c.globals.seriesPercent.forEach((function(t,e){t[g]&&u++,e<d&&0===t[g]&&p++;})),u>0&&(a=this.seriesLen*a/u),e=n+a*this.visibleI,e-=a*p;}else e=n+a*this.visibleI;this.isFunnel&&(r-=(this.barHelpers.getXForValue(this.series[d][g],r)-r)/2),o=this.barHelpers.getXForValue(this.series[d][g],r);var f=this.barHelpers.getBarpaths({barYPosition:e,barHeight:a,x1:r,x2:o,strokeWidth:s,series:this.series,realIndex:i.realIndex,i:d,j:g,w:c});return c.globals.isXNumeric||(n+=l),this.barHelpers.barBackground({j:g,i:d,y1:e-a*this.visibleI,y2:a*this.seriesLen,elSeries:h}),{pathTo:f.pathTo,pathFrom:f.pathFrom,x1:r,x:o,y:n,goalX:this.barHelpers.getGoalValues("x",r,null,d,g),barYPosition:e,barHeight:a}}},{key:"drawColumnPaths",value:function(t){var e,i=t.indexes,a=t.x,s=t.y,r=t.xDivision,o=t.barWidth,n=t.zeroH,l=t.strokeWidth,h=t.elSeries,c=this.w,d=i.realIndex,g=i.i,u=i.j,p=i.bc;if(c.globals.isXNumeric){var f=this.getBarXForNumericXAxis({x:a,j:u,realIndex:d,barWidth:o});a=f.x,e=f.barXPosition;}else if(c.config.plotOptions.bar.hideZeroBarsWhenGrouped){var x=this.barHelpers.getZeroValueEncounters({i:g,j:u}),b=x.nonZeroColumns,v=x.zeroEncounters;b>0&&(o=this.seriesLen*o/b),e=a+o*this.visibleI,e-=o*v;}else e=a+o*this.visibleI;s=this.barHelpers.getYForValue(this.series[g][u],n);var m=this.barHelpers.getColumnPaths({barXPosition:e,barWidth:o,y1:n,y2:s,strokeWidth:l,series:this.series,realIndex:i.realIndex,i:g,j:u,w:c});return c.globals.isXNumeric||(a+=r),this.barHelpers.barBackground({bc:p,j:u,i:g,x1:e-l/2-o*this.visibleI,x2:o*this.seriesLen+l/2,elSeries:h}),{pathTo:m.pathTo,pathFrom:m.pathFrom,x:a,y:s,goalY:this.barHelpers.getGoalValues("y",null,n,g,u),barXPosition:e,barWidth:o}}},{key:"getBarXForNumericXAxis",value:function(t){var e=t.x,i=t.barWidth,a=t.realIndex,s=t.j,r=this.w,o=a;return r.globals.seriesX[a].length||(o=r.globals.maxValsInArrayIndex),r.globals.seriesX[o][s]&&(e=(r.globals.seriesX[o][s]-r.globals.minX)/this.xRatio-i*this.seriesLen/2),{barXPosition:e+i*this.visibleI,x:e}}},{key:"getPreviousPath",value:function(t,e){for(var i,a=this.w,s=0;s<a.globals.previousPaths.length;s++){var r=a.globals.previousPaths[s];r.paths&&r.paths.length>0&&parseInt(r.realIndex,10)===parseInt(t,10)&&void 0!==a.globals.previousPaths[s].paths[e]&&(i=a.globals.previousPaths[s].paths[e].d);}return i}}]),t}(),wt=function(t){n(s,yt);var i=d(s);function s(){return a(this,s),i.apply(this,arguments)}return r(s,[{key:"draw",value:function(t,i){var a=this,s=this.w;this.graphics=new m(this.ctx),this.bar=new yt(this.ctx,this.xyRatios);var r=new y(this.ctx,s);t=r.getLogSeries(t),this.yRatio=r.getLogYRatios(this.yRatio),this.barHelpers.initVariables(t),"100%"===s.config.chart.stackType&&(t=s.globals.seriesPercent.slice()),this.series=t,this.barHelpers.initializeStackedPrevVars(this);for(var o=this.graphics.group({class:"apexcharts-bar-series apexcharts-plot-series"}),n=0,l=0,h=function(r,h){var c=void 0,d=void 0,g=void 0,u=void 0,p=-1;a.groupCtx=a,s.globals.seriesGroups.forEach((function(t,e){t.indexOf(s.config.series[r].name)>-1&&(p=e);})),-1!==p&&(a.groupCtx=a[s.globals.seriesGroups[p]]);var f=[],b=[],v=s.globals.comboCharts?i[r]:r;a.yRatio.length>1&&(a.yaxisIndex=v),a.isReversed=s.config.yaxis[a.yaxisIndex]&&s.config.yaxis[a.yaxisIndex].reversed;var m=a.graphics.group({class:"apexcharts-series",seriesName:x.escapeString(s.globals.seriesNames[v]),rel:r+1,"data:realIndex":v});a.ctx.series.addCollapsedClassToSeries(m,v);var y=a.graphics.group({class:"apexcharts-datalabels","data:realIndex":v}),w=a.graphics.group({class:"apexcharts-bar-goals-markers"}),k=0,A=0,S=a.initialPositions(n,l,c,d,g,u);l=S.y,k=S.barHeight,d=S.yDivision,u=S.zeroW,n=S.x,A=S.barWidth,c=S.xDivision,g=S.zeroH,a.barHelpers.initializeStackedXYVars(a),1===a.groupCtx.prevY.length&&a.groupCtx.prevY[0].every((function(t){return isNaN(t)}))&&(a.groupCtx.prevY[0]=a.groupCtx.prevY[0].map((function(t){return g})),a.groupCtx.prevYF[0]=a.groupCtx.prevYF[0].map((function(t){return 0})));for(var C=0;C<s.globals.dataPoints;C++){var L=a.barHelpers.getStrokeWidth(r,C,v),P={indexes:{i:r,j:C,realIndex:v,bc:h},strokeWidth:L,x:n,y:l,elSeries:m,groupIndex:p,seriesGroup:s.globals.seriesGroups[p]},I=null;a.isHorizontal?(I=a.drawStackedBarPaths(e(e({},P),{},{zeroW:u,barHeight:k,yDivision:d})),A=a.series[r][C]/a.invertedYRatio):(I=a.drawStackedColumnPaths(e(e({},P),{},{xDivision:c,barWidth:A,zeroH:g})),k=a.series[r][C]/a.yRatio[a.yaxisIndex]);var M=a.barHelpers.drawGoalLine({barXPosition:I.barXPosition,barYPosition:I.barYPosition,goalX:I.goalX,goalY:I.goalY,barHeight:k,barWidth:A});M&&w.add(M),l=I.y,n=I.x,f.push(n),b.push(l);var T=a.barHelpers.getPathFillColor(t,r,C,v);m=a.renderSeries({realIndex:v,pathFill:T,j:C,i:r,groupIndex:p,pathFrom:I.pathFrom,pathTo:I.pathTo,strokeWidth:L,elSeries:m,x:n,y:l,series:t,barHeight:k,barWidth:A,elDataLabelsWrap:y,elGoalsMarkers:w,type:"bar",visibleSeries:0});}s.globals.seriesXvalues[v]=f,s.globals.seriesYvalues[v]=b,a.groupCtx.prevY.push(a.groupCtx.yArrj),a.groupCtx.prevYF.push(a.groupCtx.yArrjF),a.groupCtx.prevYVal.push(a.groupCtx.yArrjVal),a.groupCtx.prevX.push(a.groupCtx.xArrj),a.groupCtx.prevXF.push(a.groupCtx.xArrjF),a.groupCtx.prevXVal.push(a.groupCtx.xArrjVal),o.add(m);},c=0,d=0;c<t.length;c++,d++)h(c,d);return o}},{key:"initialPositions",value:function(t,e,i,a,s,r){var o,n,l,h,c=this.w;return this.isHorizontal?(l=(l=a=c.globals.gridHeight/c.globals.dataPoints)*parseInt(c.config.plotOptions.bar.barHeight,10)/100,-1===String(c.config.plotOptions.bar.barHeight).indexOf("%")&&(l=parseInt(c.config.plotOptions.bar.barHeight,10)),r=this.baseLineInvertedY+c.globals.padHorizontal+(this.isReversed?c.globals.gridWidth:0)-(this.isReversed?2*this.baseLineInvertedY:0),e=(a-l)/2):(h=i=c.globals.gridWidth/c.globals.dataPoints,h=c.globals.isXNumeric&&c.globals.dataPoints>1?(i=c.globals.minXDiff/this.xRatio)*parseInt(this.barOptions.columnWidth,10)/100:h*parseInt(c.config.plotOptions.bar.columnWidth,10)/100,-1===String(c.config.plotOptions.bar.columnWidth).indexOf("%")&&(h=parseInt(c.config.plotOptions.bar.columnWidth,10)),s=c.globals.gridHeight-this.baseLineY[this.yaxisIndex]-(this.isReversed?c.globals.gridHeight:0)+(this.isReversed?2*this.baseLineY[this.yaxisIndex]:0),t=c.globals.padHorizontal+(i-h)/2),{x:t,y:e,yDivision:a,xDivision:i,barHeight:null!==(o=c.globals.seriesGroups)&&void 0!==o&&o.length?l/c.globals.seriesGroups.length:l,barWidth:null!==(n=c.globals.seriesGroups)&&void 0!==n&&n.length?h/c.globals.seriesGroups.length:h,zeroH:s,zeroW:r}}},{key:"drawStackedBarPaths",value:function(t){for(var e,i=t.indexes,a=t.barHeight,s=t.strokeWidth,r=t.zeroW,o=t.x,n=t.y,l=t.groupIndex,h=t.seriesGroup,c=t.yDivision,d=t.elSeries,g=this.w,u=n+(-1!==l?l*a:0),p=i.i,f=i.j,x=0,b=0;b<this.groupCtx.prevXF.length;b++)x+=this.groupCtx.prevXF[b][f];var v=p;if(h&&(v=h.indexOf(g.config.series[p].name)),v>0){var m=r;this.groupCtx.prevXVal[v-1][f]<0?m=this.series[p][f]>=0?this.groupCtx.prevX[v-1][f]+x-2*(this.isReversed?x:0):this.groupCtx.prevX[v-1][f]:this.groupCtx.prevXVal[v-1][f]>=0&&(m=this.series[p][f]>=0?this.groupCtx.prevX[v-1][f]:this.groupCtx.prevX[v-1][f]-x+2*(this.isReversed?x:0)),e=m;}else e=r;o=null===this.series[p][f]?e:e+this.series[p][f]/this.invertedYRatio-2*(this.isReversed?this.series[p][f]/this.invertedYRatio:0);var y=this.barHelpers.getBarpaths({barYPosition:u,barHeight:a,x1:e,x2:o,strokeWidth:s,series:this.series,realIndex:i.realIndex,seriesGroup:h,i:p,j:f,w:g});return this.barHelpers.barBackground({j:f,i:p,y1:u,y2:a,elSeries:d}),n+=c,{pathTo:y.pathTo,pathFrom:y.pathFrom,goalX:this.barHelpers.getGoalValues("x",r,null,p,f),barYPosition:u,x:o,y:n}}},{key:"drawStackedColumnPaths",value:function(t){var e=t.indexes,i=t.x,a=t.y,s=t.xDivision,r=t.barWidth,o=t.zeroH,n=t.groupIndex,l=t.seriesGroup,h=t.elSeries,c=this.w,d=e.i,g=e.j,u=e.bc;if(c.globals.isXNumeric){var p=c.globals.seriesX[d][g];p||(p=0),i=(p-c.globals.minX)/this.xRatio-r/2,c.globals.seriesGroups.length&&(i=(p-c.globals.minX)/this.xRatio-r/2*c.globals.seriesGroups.length);}for(var f,x=i+(-1!==n?n*r:0),b=0,v=0;v<this.groupCtx.prevYF.length;v++)b+=isNaN(this.groupCtx.prevYF[v][g])?0:this.groupCtx.prevYF[v][g];var m=d;if(l&&(m=l.indexOf(c.config.series[d].name)),m>0&&!c.globals.isXNumeric||m>0&&c.globals.isXNumeric&&c.globals.seriesX[d-1][g]===c.globals.seriesX[d][g]){var y,w,k,A=Math.min(this.yRatio.length+1,d+1);if(void 0!==this.groupCtx.prevY[m-1]&&this.groupCtx.prevY[m-1].length)for(var S=1;S<A;S++){var C;if(!isNaN(null===(C=this.groupCtx.prevY[m-S])||void 0===C?void 0:C[g])){k=this.groupCtx.prevY[m-S][g];break}}for(var L=1;L<A;L++){var P,I;if((null===(P=this.groupCtx.prevYVal[m-L])||void 0===P?void 0:P[g])<0){w=this.series[d][g]>=0?k-b+2*(this.isReversed?b:0):k;break}if((null===(I=this.groupCtx.prevYVal[m-L])||void 0===I?void 0:I[g])>=0){w=this.series[d][g]>=0?k:k+b-2*(this.isReversed?b:0);break}}void 0===w&&(w=c.globals.gridHeight),f=null!==(y=this.groupCtx.prevYF[0])&&void 0!==y&&y.every((function(t){return 0===t}))&&this.groupCtx.prevYF.slice(1,m).every((function(t){return t.every((function(t){return isNaN(t)}))}))?o:w;}else f=o;a=this.series[d][g]?f-this.series[d][g]/this.yRatio[this.yaxisIndex]+2*(this.isReversed?this.series[d][g]/this.yRatio[this.yaxisIndex]:0):f;var M=this.barHelpers.getColumnPaths({barXPosition:x,barWidth:r,y1:f,y2:a,yRatio:this.yRatio[this.yaxisIndex],strokeWidth:this.strokeWidth,series:this.series,seriesGroup:l,realIndex:e.realIndex,i:d,j:g,w:c});return this.barHelpers.barBackground({bc:u,j:g,i:d,x1:x,x2:r,elSeries:h}),i+=s,{pathTo:M.pathTo,pathFrom:M.pathFrom,goalY:this.barHelpers.getGoalValues("y",null,o,d,g),barXPosition:x,x:c.globals.isXNumeric?i-s:i,y:a}}}]),s}(),kt=function(t){n(s,yt);var i=d(s);function s(){return a(this,s),i.apply(this,arguments)}return r(s,[{key:"draw",value:function(t,i,a){var s=this,r=this.w,o=new m(this.ctx),n=r.globals.comboCharts?i:r.config.chart.type,l=new R(this.ctx);this.candlestickOptions=this.w.config.plotOptions.candlestick,this.boxOptions=this.w.config.plotOptions.boxPlot,this.isHorizontal=r.config.plotOptions.bar.horizontal;var h=new y(this.ctx,r);t=h.getLogSeries(t),this.series=t,this.yRatio=h.getLogYRatios(this.yRatio),this.barHelpers.initVariables(t);for(var c=o.group({class:"apexcharts-".concat(n,"-series apexcharts-plot-series")}),d=function(i){s.isBoxPlot="boxPlot"===r.config.chart.type||"boxPlot"===r.config.series[i].type;var n,h,d,g,u=void 0,p=void 0,f=[],b=[],v=r.globals.comboCharts?a[i]:i,m=o.group({class:"apexcharts-series",seriesName:x.escapeString(r.globals.seriesNames[v]),rel:i+1,"data:realIndex":v});s.ctx.series.addCollapsedClassToSeries(m,v),t[i].length>0&&(s.visibleI=s.visibleI+1);var y,w;s.yRatio.length>1&&(s.yaxisIndex=v);var k=s.barHelpers.initialPositions();p=k.y,y=k.barHeight,h=k.yDivision,g=k.zeroW,u=k.x,w=k.barWidth,n=k.xDivision,d=k.zeroH,b.push(u+w/2);for(var A=o.group({class:"apexcharts-datalabels","data:realIndex":v}),S=function(a){var o=s.barHelpers.getStrokeWidth(i,a,v),c=null,x={indexes:{i:i,j:a,realIndex:v},x:u,y:p,strokeWidth:o,elSeries:m};c=s.isHorizontal?s.drawHorizontalBoxPaths(e(e({},x),{},{yDivision:h,barHeight:y,zeroW:g})):s.drawVerticalBoxPaths(e(e({},x),{},{xDivision:n,barWidth:w,zeroH:d})),p=c.y,u=c.x,a>0&&b.push(u+w/2),f.push(p),c.pathTo.forEach((function(e,n){var h=!s.isBoxPlot&&s.candlestickOptions.wick.useFillColor?c.color[n]:r.globals.stroke.colors[i],d=l.fillPath({seriesNumber:v,dataPointIndex:a,color:c.color[n],value:t[i][a]});s.renderSeries({realIndex:v,pathFill:d,lineFill:h,j:a,i:i,pathFrom:c.pathFrom,pathTo:e,strokeWidth:o,elSeries:m,x:u,y:p,series:t,barHeight:y,barWidth:w,elDataLabelsWrap:A,visibleSeries:s.visibleI,type:r.config.chart.type});}));},C=0;C<r.globals.dataPoints;C++)S(C);r.globals.seriesXvalues[v]=b,r.globals.seriesYvalues[v]=f,c.add(m);},g=0;g<t.length;g++)d(g);return c}},{key:"drawVerticalBoxPaths",value:function(t){var e=t.indexes,i=t.x;t.y;var a=t.xDivision,s=t.barWidth,r=t.zeroH,o=t.strokeWidth,n=this.w,l=new m(this.ctx),h=e.i,c=e.j,d=!0,g=n.config.plotOptions.candlestick.colors.upward,u=n.config.plotOptions.candlestick.colors.downward,p="";this.isBoxPlot&&(p=[this.boxOptions.colors.lower,this.boxOptions.colors.upper]);var f=this.yRatio[this.yaxisIndex],x=e.realIndex,b=this.getOHLCValue(x,c),v=r,y=r;b.o>b.c&&(d=!1);var w=Math.min(b.o,b.c),k=Math.max(b.o,b.c),A=b.m;n.globals.isXNumeric&&(i=(n.globals.seriesX[x][c]-n.globals.minX)/this.xRatio-s/2);var S=i+s*this.visibleI;void 0===this.series[h][c]||null===this.series[h][c]?(w=r,k=r):(w=r-w/f,k=r-k/f,v=r-b.h/f,y=r-b.l/f,A=r-b.m/f);var C=l.move(S,r),L=l.move(S+s/2,w);return n.globals.previousPaths.length>0&&(L=this.getPreviousPath(x,c,!0)),C=this.isBoxPlot?[l.move(S,w)+l.line(S+s/2,w)+l.line(S+s/2,v)+l.line(S+s/4,v)+l.line(S+s-s/4,v)+l.line(S+s/2,v)+l.line(S+s/2,w)+l.line(S+s,w)+l.line(S+s,A)+l.line(S,A)+l.line(S,w+o/2),l.move(S,A)+l.line(S+s,A)+l.line(S+s,k)+l.line(S+s/2,k)+l.line(S+s/2,y)+l.line(S+s-s/4,y)+l.line(S+s/4,y)+l.line(S+s/2,y)+l.line(S+s/2,k)+l.line(S,k)+l.line(S,A)+"z"]:[l.move(S,k)+l.line(S+s/2,k)+l.line(S+s/2,v)+l.line(S+s/2,k)+l.line(S+s,k)+l.line(S+s,w)+l.line(S+s/2,w)+l.line(S+s/2,y)+l.line(S+s/2,w)+l.line(S,w)+l.line(S,k-o/2)],L+=l.move(S,w),n.globals.isXNumeric||(i+=a),{pathTo:C,pathFrom:L,x:i,y:k,barXPosition:S,color:this.isBoxPlot?p:d?[g]:[u]}}},{key:"drawHorizontalBoxPaths",value:function(t){var e=t.indexes;t.x;var i=t.y,a=t.yDivision,s=t.barHeight,r=t.zeroW,o=t.strokeWidth,n=this.w,l=new m(this.ctx),h=e.i,c=e.j,d=this.boxOptions.colors.lower;this.isBoxPlot&&(d=[this.boxOptions.colors.lower,this.boxOptions.colors.upper]);var g=this.invertedYRatio,u=e.realIndex,p=this.getOHLCValue(u,c),f=r,x=r,b=Math.min(p.o,p.c),v=Math.max(p.o,p.c),y=p.m;n.globals.isXNumeric&&(i=(n.globals.seriesX[u][c]-n.globals.minX)/this.invertedXRatio-s/2);var w=i+s*this.visibleI;void 0===this.series[h][c]||null===this.series[h][c]?(b=r,v=r):(b=r+b/g,v=r+v/g,f=r+p.h/g,x=r+p.l/g,y=r+p.m/g);var k=l.move(r,w),A=l.move(b,w+s/2);return n.globals.previousPaths.length>0&&(A=this.getPreviousPath(u,c,!0)),k=[l.move(b,w)+l.line(b,w+s/2)+l.line(f,w+s/2)+l.line(f,w+s/2-s/4)+l.line(f,w+s/2+s/4)+l.line(f,w+s/2)+l.line(b,w+s/2)+l.line(b,w+s)+l.line(y,w+s)+l.line(y,w)+l.line(b+o/2,w),l.move(y,w)+l.line(y,w+s)+l.line(v,w+s)+l.line(v,w+s/2)+l.line(x,w+s/2)+l.line(x,w+s-s/4)+l.line(x,w+s/4)+l.line(x,w+s/2)+l.line(v,w+s/2)+l.line(v,w)+l.line(y,w)+"z"],A+=l.move(b,w),n.globals.isXNumeric||(i+=a),{pathTo:k,pathFrom:A,x:v,y:i,barYPosition:w,color:d}}},{key:"getOHLCValue",value:function(t,e){var i=this.w;return {o:this.isBoxPlot?i.globals.seriesCandleH[t][e]:i.globals.seriesCandleO[t][e],h:this.isBoxPlot?i.globals.seriesCandleO[t][e]:i.globals.seriesCandleH[t][e],m:i.globals.seriesCandleM[t][e],l:this.isBoxPlot?i.globals.seriesCandleC[t][e]:i.globals.seriesCandleL[t][e],c:this.isBoxPlot?i.globals.seriesCandleL[t][e]:i.globals.seriesCandleC[t][e]}}}]),s}(),At=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"checkColorRange",value:function(){var t=this.w,e=!1,i=t.config.plotOptions[t.config.chart.type];return i.colorScale.ranges.length>0&&i.colorScale.ranges.map((function(t,i){t.from<=0&&(e=!0);})),e}},{key:"getShadeColor",value:function(t,e,i,a){var s=this.w,r=1,o=s.config.plotOptions[t].shadeIntensity,n=this.determineColor(t,e,i);s.globals.hasNegs||a?r=s.config.plotOptions[t].reverseNegativeShade?n.percent<0?n.percent/100*(1.25*o):(1-n.percent/100)*(1.25*o):n.percent<=0?1-(1+n.percent/100)*o:(1-n.percent/100)*o:(r=1-n.percent/100,"treemap"===t&&(r=(1-n.percent/100)*(1.25*o)));var l=n.color,h=new x;return s.config.plotOptions[t].enableShades&&(l="dark"===this.w.config.theme.mode?x.hexToRgba(h.shadeColor(-1*r,n.color),s.config.fill.opacity):x.hexToRgba(h.shadeColor(r,n.color),s.config.fill.opacity)),{color:l,colorProps:n}}},{key:"determineColor",value:function(t,e,i){var a=this.w,s=a.globals.series[e][i],r=a.config.plotOptions[t],o=r.colorScale.inverse?i:e;r.distributed&&"treemap"===a.config.chart.type&&(o=i);var n=a.globals.colors[o],l=null,h=Math.min.apply(Math,u(a.globals.series[e])),c=Math.max.apply(Math,u(a.globals.series[e]));r.distributed||"heatmap"!==t||(h=a.globals.minY,c=a.globals.maxY),void 0!==r.colorScale.min&&(h=r.colorScale.min<a.globals.minY?r.colorScale.min:a.globals.minY,c=r.colorScale.max>a.globals.maxY?r.colorScale.max:a.globals.maxY);var d=Math.abs(c)+Math.abs(h),g=100*s/(0===d?d-1e-6:d);r.colorScale.ranges.length>0&&r.colorScale.ranges.map((function(t,e){if(s>=t.from&&s<=t.to){n=t.color,l=t.foreColor?t.foreColor:null,h=t.from,c=t.to;var i=Math.abs(c)+Math.abs(h);g=100*s/(0===i?i-1e-6:i);}}));return {color:n,foreColor:l,percent:g}}},{key:"calculateDataLabels",value:function(t){var e=t.text,i=t.x,a=t.y,s=t.i,r=t.j,o=t.colorProps,n=t.fontSize,l=this.w.config.dataLabels,h=new m(this.ctx),c=new O(this.ctx),d=null;if(l.enabled){d=h.group({class:"apexcharts-data-labels"});var g=l.offsetX,u=l.offsetY,p=i+g,f=a+parseFloat(l.style.fontSize)/3+u;c.plotDataLabelsText({x:p,y:f,text:e,i:s,j:r,color:o.foreColor,parent:d,fontSize:n,dataLabelsConfig:l});}return d}},{key:"addListeners",value:function(t){var e=new m(this.ctx);t.node.addEventListener("mouseenter",e.pathMouseEnter.bind(this,t)),t.node.addEventListener("mouseleave",e.pathMouseLeave.bind(this,t)),t.node.addEventListener("mousedown",e.pathMouseDown.bind(this,t));}}]),t}(),St=function(){function t(e,i){a(this,t),this.ctx=e,this.w=e.w,this.xRatio=i.xRatio,this.yRatio=i.yRatio,this.dynamicAnim=this.w.config.chart.animations.dynamicAnimation,this.helpers=new At(e),this.rectRadius=this.w.config.plotOptions.heatmap.radius,this.strokeWidth=this.w.config.stroke.show?this.w.config.stroke.width:0;}return r(t,[{key:"draw",value:function(t){var e=this.w,i=new m(this.ctx),a=i.group({class:"apexcharts-heatmap"});a.attr("clip-path","url(#gridRectMask".concat(e.globals.cuid,")"));var s=e.globals.gridWidth/e.globals.dataPoints,r=e.globals.gridHeight/e.globals.series.length,o=0,n=!1;this.negRange=this.helpers.checkColorRange();var l=t.slice();e.config.yaxis[0].reversed&&(n=!0,l.reverse());for(var h=n?0:l.length-1;n?h<l.length:h>=0;n?h++:h--){var c=i.group({class:"apexcharts-series apexcharts-heatmap-series",seriesName:x.escapeString(e.globals.seriesNames[h]),rel:h+1,"data:realIndex":h});if(this.ctx.series.addCollapsedClassToSeries(c,h),e.config.chart.dropShadow.enabled){var d=e.config.chart.dropShadow;new v(this.ctx).dropShadow(c,d,h);}for(var g=0,u=e.config.plotOptions.heatmap.shadeIntensity,p=0;p<l[h].length;p++){var f=this.helpers.getShadeColor(e.config.chart.type,h,p,this.negRange),b=f.color,y=f.colorProps;if("image"===e.config.fill.type)b=new R(this.ctx).fillPath({seriesNumber:h,dataPointIndex:p,opacity:e.globals.hasNegs?y.percent<0?1-(1+y.percent/100):u+y.percent/100:y.percent/100,patternID:x.randomId(),width:e.config.fill.image.width?e.config.fill.image.width:s,height:e.config.fill.image.height?e.config.fill.image.height:r});var w=this.rectRadius,k=i.drawRect(g,o,s,r,w);if(k.attr({cx:g,cy:o}),k.node.classList.add("apexcharts-heatmap-rect"),c.add(k),k.attr({fill:b,i:h,index:h,j:p,val:l[h][p],"stroke-width":this.strokeWidth,stroke:e.config.plotOptions.heatmap.useFillColorAsStroke?b:e.globals.stroke.colors[0],color:b}),this.helpers.addListeners(k),e.config.chart.animations.enabled&&!e.globals.dataChanged){var A=1;e.globals.resized||(A=e.config.chart.animations.speed),this.animateHeatMap(k,g,o,s,r,A);}if(e.globals.dataChanged){var S=1;if(this.dynamicAnim.enabled&&e.globals.shouldAnimate){S=this.dynamicAnim.speed;var C=e.globals.previousPaths[h]&&e.globals.previousPaths[h][p]&&e.globals.previousPaths[h][p].color;C||(C="rgba(255, 255, 255, 0)"),this.animateHeatColor(k,x.isColorHex(C)?C:x.rgb2hex(C),x.isColorHex(b)?b:x.rgb2hex(b),S);}}var L=(0, e.config.dataLabels.formatter)(e.globals.series[h][p],{value:e.globals.series[h][p],seriesIndex:h,dataPointIndex:p,w:e}),P=this.helpers.calculateDataLabels({text:L,x:g+s/2,y:o+r/2,i:h,j:p,colorProps:y,series:l});null!==P&&c.add(P),g+=s;}o+=r,a.add(c);}var I=e.globals.yAxisScale[0].result.slice();return e.config.yaxis[0].reversed?I.unshift(""):I.push(""),e.globals.yAxisScale[0].result=I,a}},{key:"animateHeatMap",value:function(t,e,i,a,s,r){var o=new b(this.ctx);o.animateRect(t,{x:e+a/2,y:i+s/2,width:0,height:0},{x:e,y:i,width:a,height:s},r,(function(){o.animationCompleted(t);}));}},{key:"animateHeatColor",value:function(t,e,i,a){t.attr({fill:e}).animate(a).attr({fill:i});}}]),t}(),Ct=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"drawYAxisTexts",value:function(t,e,i,a){var s=this.w,r=s.config.yaxis[0],o=s.globals.yLabelFormatters[0];return new m(this.ctx).drawText({x:t+r.labels.offsetX,y:e+r.labels.offsetY,text:o(a,i),textAnchor:"middle",fontSize:r.labels.style.fontSize,fontFamily:r.labels.style.fontFamily,foreColor:Array.isArray(r.labels.style.colors)?r.labels.style.colors[i]:r.labels.style.colors})}}]),t}(),Lt=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;var i=this.w;this.chartType=this.w.config.chart.type,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled,this.animBeginArr=[0],this.animDur=0,this.donutDataLabels=this.w.config.plotOptions.pie.donut.labels,this.lineColorArr=void 0!==i.globals.stroke.colors?i.globals.stroke.colors:i.globals.colors,this.defaultSize=Math.min(i.globals.gridWidth,i.globals.gridHeight),this.centerY=this.defaultSize/2,this.centerX=i.globals.gridWidth/2,"radialBar"===i.config.chart.type?this.fullAngle=360:this.fullAngle=Math.abs(i.config.plotOptions.pie.endAngle-i.config.plotOptions.pie.startAngle),this.initialAngle=i.config.plotOptions.pie.startAngle%this.fullAngle,i.globals.radialSize=this.defaultSize/2.05-i.config.stroke.width-(i.config.chart.sparkline.enabled?0:i.config.chart.dropShadow.blur),this.donutSize=i.globals.radialSize*parseInt(i.config.plotOptions.pie.donut.size,10)/100,this.maxY=0,this.sliceLabels=[],this.sliceSizes=[],this.prevSectorAngleArr=[];}return r(t,[{key:"draw",value:function(t){var e=this,i=this.w,a=new m(this.ctx);if(this.ret=a.group({class:"apexcharts-pie"}),i.globals.noData)return this.ret;for(var s=0,r=0;r<t.length;r++)s+=x.negToZero(t[r]);var o=[],n=a.group();0===s&&(s=1e-5),t.forEach((function(t){e.maxY=Math.max(e.maxY,t);})),i.config.yaxis[0].max&&(this.maxY=i.config.yaxis[0].max),"back"===i.config.grid.position&&"polarArea"===this.chartType&&this.drawPolarElements(this.ret);for(var l=0;l<t.length;l++){var h=this.fullAngle*x.negToZero(t[l])/s;o.push(h),"polarArea"===this.chartType?(o[l]=this.fullAngle/t.length,this.sliceSizes.push(i.globals.radialSize*t[l]/this.maxY)):this.sliceSizes.push(i.globals.radialSize);}if(i.globals.dataChanged){for(var c,d=0,g=0;g<i.globals.previousPaths.length;g++)d+=x.negToZero(i.globals.previousPaths[g]);for(var u=0;u<i.globals.previousPaths.length;u++)c=this.fullAngle*x.negToZero(i.globals.previousPaths[u])/d,this.prevSectorAngleArr.push(c);}this.donutSize<0&&(this.donutSize=0);var p=i.config.plotOptions.pie.customScale,f=i.globals.gridWidth/2,b=i.globals.gridHeight/2,v=f-i.globals.gridWidth/2*p,y=b-i.globals.gridHeight/2*p;if("donut"===this.chartType){var w=a.drawCircle(this.donutSize);w.attr({cx:this.centerX,cy:this.centerY,fill:i.config.plotOptions.pie.donut.background?i.config.plotOptions.pie.donut.background:"transparent"}),n.add(w);}var k=this.drawArcs(o,t);if(this.sliceLabels.forEach((function(t){k.add(t);})),n.attr({transform:"translate(".concat(v,", ").concat(y,") scale(").concat(p,")")}),n.add(k),this.ret.add(n),this.donutDataLabels.show){var A=this.renderInnerDataLabels(this.donutDataLabels,{hollowSize:this.donutSize,centerX:this.centerX,centerY:this.centerY,opacity:this.donutDataLabels.show,translateX:v,translateY:y});this.ret.add(A);}return "front"===i.config.grid.position&&"polarArea"===this.chartType&&this.drawPolarElements(this.ret),this.ret}},{key:"drawArcs",value:function(t,e){var i=this.w,a=new v(this.ctx),s=new m(this.ctx),r=new R(this.ctx),o=s.group({class:"apexcharts-slices"}),n=this.initialAngle,l=this.initialAngle,h=this.initialAngle,c=this.initialAngle;this.strokeWidth=i.config.stroke.show?i.config.stroke.width:0;for(var d=0;d<t.length;d++){var g=s.group({class:"apexcharts-series apexcharts-pie-series",seriesName:x.escapeString(i.globals.seriesNames[d]),rel:d+1,"data:realIndex":d});o.add(g),l=c,h=(n=h)+t[d],c=l+this.prevSectorAngleArr[d];var u=h<n?this.fullAngle+h-n:h-n,p=r.fillPath({seriesNumber:d,size:this.sliceSizes[d],value:e[d]}),f=this.getChangedPath(l,c),b=s.drawPath({d:f,stroke:Array.isArray(this.lineColorArr)?this.lineColorArr[d]:this.lineColorArr,strokeWidth:0,fill:p,fillOpacity:i.config.fill.opacity,classes:"apexcharts-pie-area apexcharts-".concat(this.chartType.toLowerCase(),"-slice-").concat(d)});if(b.attr({index:0,j:d}),a.setSelectionFilter(b,0,d),i.config.chart.dropShadow.enabled){var y=i.config.chart.dropShadow;a.dropShadow(b,y,d);}this.addListeners(b,this.donutDataLabels),m.setAttrs(b.node,{"data:angle":u,"data:startAngle":n,"data:strokeWidth":this.strokeWidth,"data:value":e[d]});var w={x:0,y:0};"pie"===this.chartType||"polarArea"===this.chartType?w=x.polarToCartesian(this.centerX,this.centerY,i.globals.radialSize/1.25+i.config.plotOptions.pie.dataLabels.offset,(n+u/2)%this.fullAngle):"donut"===this.chartType&&(w=x.polarToCartesian(this.centerX,this.centerY,(i.globals.radialSize+this.donutSize)/2+i.config.plotOptions.pie.dataLabels.offset,(n+u/2)%this.fullAngle)),g.add(b);var k=0;if(!this.initialAnim||i.globals.resized||i.globals.dataChanged?this.animBeginArr.push(0):(0===(k=u/this.fullAngle*i.config.chart.animations.speed)&&(k=1),this.animDur=k+this.animDur,this.animBeginArr.push(this.animDur)),this.dynamicAnim&&i.globals.dataChanged?this.animatePaths(b,{size:this.sliceSizes[d],endAngle:h,startAngle:n,prevStartAngle:l,prevEndAngle:c,animateStartingPos:!0,i:d,animBeginArr:this.animBeginArr,shouldSetPrevPaths:!0,dur:i.config.chart.animations.dynamicAnimation.speed}):this.animatePaths(b,{size:this.sliceSizes[d],endAngle:h,startAngle:n,i:d,totalItems:t.length-1,animBeginArr:this.animBeginArr,dur:k}),i.config.plotOptions.pie.expandOnClick&&"polarArea"!==this.chartType&&b.click(this.pieClicked.bind(this,d)),void 0!==i.globals.selectedDataPoints[0]&&i.globals.selectedDataPoints[0].indexOf(d)>-1&&this.pieClicked(d),i.config.dataLabels.enabled){var A=w.x,S=w.y,C=100*u/this.fullAngle+"%";if(0!==u&&i.config.plotOptions.pie.dataLabels.minAngleToShowLabel<t[d]){var L=i.config.dataLabels.formatter;void 0!==L&&(C=L(i.globals.seriesPercent[d][0],{seriesIndex:d,w:i}));var P=i.globals.dataLabels.style.colors[d],I=s.group({class:"apexcharts-datalabels"}),M=s.drawText({x:A,y:S,text:C,textAnchor:"middle",fontSize:i.config.dataLabels.style.fontSize,fontFamily:i.config.dataLabels.style.fontFamily,fontWeight:i.config.dataLabels.style.fontWeight,foreColor:P});if(I.add(M),i.config.dataLabels.dropShadow.enabled){var T=i.config.dataLabels.dropShadow;a.dropShadow(M,T);}M.node.classList.add("apexcharts-pie-label"),i.config.chart.animations.animate&&!1===i.globals.resized&&(M.node.classList.add("apexcharts-pie-label-delay"),M.node.style.animationDelay=i.config.chart.animations.speed/940+"s"),this.sliceLabels.push(I);}}}return o}},{key:"addListeners",value:function(t,e){var i=new m(this.ctx);t.node.addEventListener("mouseenter",i.pathMouseEnter.bind(this,t)),t.node.addEventListener("mouseleave",i.pathMouseLeave.bind(this,t)),t.node.addEventListener("mouseleave",this.revertDataLabelsInner.bind(this,t.node,e)),t.node.addEventListener("mousedown",i.pathMouseDown.bind(this,t)),this.donutDataLabels.total.showAlways||(t.node.addEventListener("mouseenter",this.printDataLabelsInner.bind(this,t.node,e)),t.node.addEventListener("mousedown",this.printDataLabelsInner.bind(this,t.node,e)));}},{key:"animatePaths",value:function(t,e){var i=this.w,a=e.endAngle<e.startAngle?this.fullAngle+e.endAngle-e.startAngle:e.endAngle-e.startAngle,s=a,r=e.startAngle,o=e.startAngle;void 0!==e.prevStartAngle&&void 0!==e.prevEndAngle&&(r=e.prevEndAngle,s=e.prevEndAngle<e.prevStartAngle?this.fullAngle+e.prevEndAngle-e.prevStartAngle:e.prevEndAngle-e.prevStartAngle),e.i===i.config.series.length-1&&(a+o>this.fullAngle?e.endAngle=e.endAngle-(a+o):a+o<this.fullAngle&&(e.endAngle=e.endAngle+(this.fullAngle-(a+o)))),a===this.fullAngle&&(a=this.fullAngle-.01),this.animateArc(t,r,o,a,s,e);}},{key:"animateArc",value:function(t,e,i,a,s,r){var o,n=this,l=this.w,h=new b(this.ctx),c=r.size;(isNaN(e)||isNaN(s))&&(e=i,s=a,r.dur=0);var d=a,g=i,u=e<i?this.fullAngle+e-i:e-i;l.globals.dataChanged&&r.shouldSetPrevPaths&&r.prevEndAngle&&(o=n.getPiePath({me:n,startAngle:r.prevStartAngle,angle:r.prevEndAngle<r.prevStartAngle?this.fullAngle+r.prevEndAngle-r.prevStartAngle:r.prevEndAngle-r.prevStartAngle,size:c}),t.attr({d:o})),0!==r.dur?t.animate(r.dur,l.globals.easing,r.animBeginArr[r.i]).afterAll((function(){"pie"!==n.chartType&&"donut"!==n.chartType&&"polarArea"!==n.chartType||this.animate(l.config.chart.animations.dynamicAnimation.speed).attr({"stroke-width":n.strokeWidth}),r.i===l.config.series.length-1&&h.animationCompleted(t);})).during((function(l){d=u+(a-u)*l,r.animateStartingPos&&(d=s+(a-s)*l,g=e-s+(i-(e-s))*l),o=n.getPiePath({me:n,startAngle:g,angle:d,size:c}),t.node.setAttribute("data:pathOrig",o),t.attr({d:o});})):(o=n.getPiePath({me:n,startAngle:g,angle:a,size:c}),r.isTrack||(l.globals.animationEnded=!0),t.node.setAttribute("data:pathOrig",o),t.attr({d:o,"stroke-width":n.strokeWidth}));}},{key:"pieClicked",value:function(t){var e,i=this.w,a=this,s=a.sliceSizes[t]+(i.config.plotOptions.pie.expandOnClick?4:0),r=i.globals.dom.Paper.select(".apexcharts-".concat(a.chartType.toLowerCase(),"-slice-").concat(t)).members[0];if("true"!==r.attr("data:pieClicked")){var o=i.globals.dom.baseEl.getElementsByClassName("apexcharts-pie-area");Array.prototype.forEach.call(o,(function(t){t.setAttribute("data:pieClicked","false");var e=t.getAttribute("data:pathOrig");e&&t.setAttribute("d",e);})),r.attr("data:pieClicked","true");var n=parseInt(r.attr("data:startAngle"),10),l=parseInt(r.attr("data:angle"),10);e=a.getPiePath({me:a,startAngle:n,angle:l,size:s}),360!==l&&r.plot(e);}else {r.attr({"data:pieClicked":"false"}),this.revertDataLabelsInner(r.node,this.donutDataLabels);var h=r.attr("data:pathOrig");r.attr({d:h});}}},{key:"getChangedPath",value:function(t,e){var i="";return this.dynamicAnim&&this.w.globals.dataChanged&&(i=this.getPiePath({me:this,startAngle:t,angle:e-t,size:this.size})),i}},{key:"getPiePath",value:function(t){var e=t.me,i=t.startAngle,a=t.angle,s=t.size,r=i,o=Math.PI*(r-90)/180,n=a+i;Math.ceil(n)>=this.fullAngle+this.w.config.plotOptions.pie.startAngle%this.fullAngle&&(n=this.fullAngle+this.w.config.plotOptions.pie.startAngle%this.fullAngle-.01),Math.ceil(n)>this.fullAngle&&(n-=this.fullAngle);var l=Math.PI*(n-90)/180,h=e.centerX+s*Math.cos(o),c=e.centerY+s*Math.sin(o),d=e.centerX+s*Math.cos(l),g=e.centerY+s*Math.sin(l),u=x.polarToCartesian(e.centerX,e.centerY,e.donutSize,n),p=x.polarToCartesian(e.centerX,e.centerY,e.donutSize,r),f=a>180?1:0,b=["M",h,c,"A",s,s,0,f,1,d,g];return "donut"===e.chartType?[].concat(b,["L",u.x,u.y,"A",e.donutSize,e.donutSize,0,f,0,p.x,p.y,"L",h,c,"z"]).join(" "):"pie"===e.chartType||"polarArea"===e.chartType?[].concat(b,["L",e.centerX,e.centerY,"L",h,c]).join(" "):[].concat(b).join(" ")}},{key:"drawPolarElements",value:function(t){var e=this.w,i=new _(this.ctx),a=new m(this.ctx),s=new Ct(this.ctx),r=a.group(),o=a.group(),n=i.niceScale(0,Math.ceil(this.maxY),e.config.yaxis[0].tickAmount,0,!0),l=n.result.reverse(),h=n.result.length;this.maxY=n.niceMax;for(var c=e.globals.radialSize,d=c/(h-1),g=0;g<h-1;g++){var u=a.drawCircle(c);if(u.attr({cx:this.centerX,cy:this.centerY,fill:"none","stroke-width":e.config.plotOptions.polarArea.rings.strokeWidth,stroke:e.config.plotOptions.polarArea.rings.strokeColor}),e.config.yaxis[0].show){var p=s.drawYAxisTexts(this.centerX,this.centerY-c+parseInt(e.config.yaxis[0].labels.style.fontSize,10)/2,g,l[g]);o.add(p);}r.add(u),c-=d;}this.drawSpokes(t),t.add(r),t.add(o);}},{key:"renderInnerDataLabels",value:function(t,e){var i=this.w,a=new m(this.ctx),s=a.group({class:"apexcharts-datalabels-group",transform:"translate(".concat(e.translateX?e.translateX:0,", ").concat(e.translateY?e.translateY:0,") scale(").concat(i.config.plotOptions.pie.customScale,")")}),r=t.total.show;s.node.style.opacity=e.opacity;var o,n,l=e.centerX,h=e.centerY;o=void 0===t.name.color?i.globals.colors[0]:t.name.color;var c=t.name.fontSize,d=t.name.fontFamily,g=t.name.fontWeight;n=void 0===t.value.color?i.config.chart.foreColor:t.value.color;var u=t.value.formatter,p="",f="";if(r?(o=t.total.color,c=t.total.fontSize,d=t.total.fontFamily,g=t.total.fontWeight,f=t.total.label,p=t.total.formatter(i)):1===i.globals.series.length&&(p=u(i.globals.series[0],i),f=i.globals.seriesNames[0]),f&&(f=t.name.formatter(f,t.total.show,i)),t.name.show){var x=a.drawText({x:l,y:h+parseFloat(t.name.offsetY),text:f,textAnchor:"middle",foreColor:o,fontSize:c,fontWeight:g,fontFamily:d});x.node.classList.add("apexcharts-datalabel-label"),s.add(x);}if(t.value.show){var b=t.name.show?parseFloat(t.value.offsetY)+16:t.value.offsetY,v=a.drawText({x:l,y:h+b,text:p,textAnchor:"middle",foreColor:n,fontWeight:t.value.fontWeight,fontSize:t.value.fontSize,fontFamily:t.value.fontFamily});v.node.classList.add("apexcharts-datalabel-value"),s.add(v);}return s}},{key:"printInnerLabels",value:function(t,e,i,a){var s,r=this.w;a?s=void 0===t.name.color?r.globals.colors[parseInt(a.parentNode.getAttribute("rel"),10)-1]:t.name.color:r.globals.series.length>1&&t.total.show&&(s=t.total.color);var o=r.globals.dom.baseEl.querySelector(".apexcharts-datalabel-label"),n=r.globals.dom.baseEl.querySelector(".apexcharts-datalabel-value");i=(0, t.value.formatter)(i,r),a||"function"!=typeof t.total.formatter||(i=t.total.formatter(r));var l=e===t.total.label;e=t.name.formatter(e,l,r),null!==o&&(o.textContent=e),null!==n&&(n.textContent=i),null!==o&&(o.style.fill=s);}},{key:"printDataLabelsInner",value:function(t,e){var i=this.w,a=t.getAttribute("data:value"),s=i.globals.seriesNames[parseInt(t.parentNode.getAttribute("rel"),10)-1];i.globals.series.length>1&&this.printInnerLabels(e,s,a,t);var r=i.globals.dom.baseEl.querySelector(".apexcharts-datalabels-group");null!==r&&(r.style.opacity=1);}},{key:"drawSpokes",value:function(t){var e=this,i=this.w,a=new m(this.ctx),s=i.config.plotOptions.polarArea.spokes;if(0!==s.strokeWidth){for(var r=[],o=360/i.globals.series.length,n=0;n<i.globals.series.length;n++)r.push(x.polarToCartesian(this.centerX,this.centerY,i.globals.radialSize,i.config.plotOptions.pie.startAngle+o*n));r.forEach((function(i,r){var o=a.drawLine(i.x,i.y,e.centerX,e.centerY,Array.isArray(s.connectorColors)?s.connectorColors[r]:s.connectorColors);t.add(o);}));}}},{key:"revertDataLabelsInner",value:function(t,e,i){var a=this,s=this.w,r=s.globals.dom.baseEl.querySelector(".apexcharts-datalabels-group"),o=!1,n=s.globals.dom.baseEl.getElementsByClassName("apexcharts-pie-area"),l=function(t){var i=t.makeSliceOut,s=t.printLabel;Array.prototype.forEach.call(n,(function(t){"true"===t.getAttribute("data:pieClicked")&&(i&&(o=!0),s&&a.printDataLabelsInner(t,e));}));};if(l({makeSliceOut:!0,printLabel:!1}),e.total.show&&s.globals.series.length>1)o&&!e.total.showAlways?l({makeSliceOut:!1,printLabel:!0}):this.printInnerLabels(e,e.total.label,e.total.formatter(s));else if(l({makeSliceOut:!1,printLabel:!0}),!o)if(s.globals.selectedDataPoints.length&&s.globals.series.length>1)if(s.globals.selectedDataPoints[0].length>0){var h=s.globals.selectedDataPoints[0],c=s.globals.dom.baseEl.querySelector(".apexcharts-".concat(this.chartType.toLowerCase(),"-slice-").concat(h));this.printDataLabelsInner(c,e);}else r&&s.globals.selectedDataPoints.length&&0===s.globals.selectedDataPoints[0].length&&(r.style.opacity=0);else r&&s.globals.series.length>1&&(r.style.opacity=0);}}]),t}(),Pt=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.chartType=this.w.config.chart.type,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled,this.animDur=0;var i=this.w;this.graphics=new m(this.ctx),this.lineColorArr=void 0!==i.globals.stroke.colors?i.globals.stroke.colors:i.globals.colors,this.defaultSize=i.globals.svgHeight<i.globals.svgWidth?i.globals.gridHeight+1.5*i.globals.goldenPadding:i.globals.gridWidth,this.isLog=i.config.yaxis[0].logarithmic,this.coreUtils=new y(this.ctx),this.maxValue=this.isLog?this.coreUtils.getLogVal(i.globals.maxY,0):i.globals.maxY,this.minValue=this.isLog?this.coreUtils.getLogVal(this.w.globals.minY,0):i.globals.minY,this.polygons=i.config.plotOptions.radar.polygons,this.strokeWidth=i.config.stroke.show?i.config.stroke.width:0,this.size=this.defaultSize/2.1-this.strokeWidth-i.config.chart.dropShadow.blur,i.config.xaxis.labels.show&&(this.size=this.size-i.globals.xAxisLabelsWidth/1.75),void 0!==i.config.plotOptions.radar.size&&(this.size=i.config.plotOptions.radar.size),this.dataRadiusOfPercent=[],this.dataRadius=[],this.angleArr=[],this.yaxisLabelsTextsPos=[];}return r(t,[{key:"draw",value:function(t){var i=this,a=this.w,s=new R(this.ctx),r=[],o=new O(this.ctx);t.length&&(this.dataPointsLen=t[a.globals.maxValsInArrayIndex].length),this.disAngle=2*Math.PI/this.dataPointsLen;var n=a.globals.gridWidth/2,l=a.globals.gridHeight/2,h=n+a.config.plotOptions.radar.offsetX,c=l+a.config.plotOptions.radar.offsetY,d=this.graphics.group({class:"apexcharts-radar-series apexcharts-plot-series",transform:"translate(".concat(h||0,", ").concat(c||0,")")}),g=[],u=null,p=null;if(this.yaxisLabels=this.graphics.group({class:"apexcharts-yaxis"}),t.forEach((function(t,n){var l=t.length===a.globals.dataPoints,h=i.graphics.group().attr({class:"apexcharts-series","data:longestSeries":l,seriesName:x.escapeString(a.globals.seriesNames[n]),rel:n+1,"data:realIndex":n});i.dataRadiusOfPercent[n]=[],i.dataRadius[n]=[],i.angleArr[n]=[],t.forEach((function(t,e){var a=Math.abs(i.maxValue-i.minValue);t+=Math.abs(i.minValue),i.isLog&&(t=i.coreUtils.getLogVal(t,0)),i.dataRadiusOfPercent[n][e]=t/a,i.dataRadius[n][e]=i.dataRadiusOfPercent[n][e]*i.size,i.angleArr[n][e]=e*i.disAngle;})),g=i.getDataPointsPos(i.dataRadius[n],i.angleArr[n]);var c=i.createPaths(g,{x:0,y:0});u=i.graphics.group({class:"apexcharts-series-markers-wrap apexcharts-element-hidden"}),p=i.graphics.group({class:"apexcharts-datalabels","data:realIndex":n}),a.globals.delayedElements.push({el:u.node,index:n});var d={i:n,realIndex:n,animationDelay:n,initialSpeed:a.config.chart.animations.speed,dataChangeSpeed:a.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-radar",shouldClipToGrid:!1,bindEventsOnPaths:!1,stroke:a.globals.stroke.colors[n],strokeLineCap:a.config.stroke.lineCap},f=null;a.globals.previousPaths.length>0&&(f=i.getPreviousPath(n));for(var b=0;b<c.linePathsTo.length;b++){var m=i.graphics.renderPaths(e(e({},d),{},{pathFrom:null===f?c.linePathsFrom[b]:f,pathTo:c.linePathsTo[b],strokeWidth:Array.isArray(i.strokeWidth)?i.strokeWidth[n]:i.strokeWidth,fill:"none",drawShadow:!1}));h.add(m);var y=s.fillPath({seriesNumber:n}),w=i.graphics.renderPaths(e(e({},d),{},{pathFrom:null===f?c.areaPathsFrom[b]:f,pathTo:c.areaPathsTo[b],strokeWidth:0,fill:y,drawShadow:!1}));if(a.config.chart.dropShadow.enabled){var k=new v(i.ctx),A=a.config.chart.dropShadow;k.dropShadow(w,Object.assign({},A,{noUserSpaceOnUse:!0}),n);}h.add(w);}t.forEach((function(t,s){var r=new H(i.ctx).getMarkerConfig({cssClass:"apexcharts-marker",seriesIndex:n,dataPointIndex:s}),l=i.graphics.drawMarker(g[s].x,g[s].y,r);l.attr("rel",s),l.attr("j",s),l.attr("index",n),l.node.setAttribute("default-marker-size",r.pSize);var c=i.graphics.group({class:"apexcharts-series-markers"});c&&c.add(l),u.add(c),h.add(u);var d=a.config.dataLabels;if(d.enabled){var f=d.formatter(a.globals.series[n][s],{seriesIndex:n,dataPointIndex:s,w:a});o.plotDataLabelsText({x:g[s].x,y:g[s].y,text:f,textAnchor:"middle",i:n,j:n,parent:p,offsetCorrection:!1,dataLabelsConfig:e({},d)});}h.add(p);})),r.push(h);})),this.drawPolygons({parent:d}),a.config.xaxis.labels.show){var f=this.drawXAxisTexts();d.add(f);}return r.forEach((function(t){d.add(t);})),d.add(this.yaxisLabels),d}},{key:"drawPolygons",value:function(t){for(var e=this,i=this.w,a=t.parent,s=new Ct(this.ctx),r=i.globals.yAxisScale[0].result.reverse(),o=r.length,n=[],l=this.size/(o-1),h=0;h<o;h++)n[h]=l*h;n.reverse();var c=[],d=[];n.forEach((function(t,i){var a=x.getPolygonPos(t,e.dataPointsLen),s="";a.forEach((function(t,a){if(0===i){var r=e.graphics.drawLine(t.x,t.y,0,0,Array.isArray(e.polygons.connectorColors)?e.polygons.connectorColors[a]:e.polygons.connectorColors);d.push(r);}0===a&&e.yaxisLabelsTextsPos.push({x:t.x,y:t.y}),s+=t.x+","+t.y+" ";})),c.push(s);})),c.forEach((function(t,s){var r=e.polygons.strokeColors,o=e.polygons.strokeWidth,n=e.graphics.drawPolygon(t,Array.isArray(r)?r[s]:r,Array.isArray(o)?o[s]:o,i.globals.radarPolygons.fill.colors[s]);a.add(n);})),d.forEach((function(t){a.add(t);})),i.config.yaxis[0].show&&this.yaxisLabelsTextsPos.forEach((function(t,i){var a=s.drawYAxisTexts(t.x,t.y,i,r[i]);e.yaxisLabels.add(a);}));}},{key:"drawXAxisTexts",value:function(){var t=this,i=this.w,a=i.config.xaxis.labels,s=this.graphics.group({class:"apexcharts-xaxis"}),r=x.getPolygonPos(this.size,this.dataPointsLen);return i.globals.labels.forEach((function(o,n){var l=i.config.xaxis.labels.formatter,h=new O(t.ctx);if(r[n]){var c=t.getTextPos(r[n],t.size),d=l(o,{seriesIndex:-1,dataPointIndex:n,w:i});h.plotDataLabelsText({x:c.newX,y:c.newY,text:d,textAnchor:c.textAnchor,i:n,j:n,parent:s,color:Array.isArray(a.style.colors)&&a.style.colors[n]?a.style.colors[n]:"#a8a8a8",dataLabelsConfig:e({textAnchor:c.textAnchor,dropShadow:{enabled:!1}},a),offsetCorrection:!1});}})),s}},{key:"createPaths",value:function(t,e){var i=this,a=[],s=[],r=[],o=[];if(t.length){s=[this.graphics.move(e.x,e.y)],o=[this.graphics.move(e.x,e.y)];var n=this.graphics.move(t[0].x,t[0].y),l=this.graphics.move(t[0].x,t[0].y);t.forEach((function(e,a){n+=i.graphics.line(e.x,e.y),l+=i.graphics.line(e.x,e.y),a===t.length-1&&(n+="Z",l+="Z");})),a.push(n),r.push(l);}return {linePathsFrom:s,linePathsTo:a,areaPathsFrom:o,areaPathsTo:r}}},{key:"getTextPos",value:function(t,e){var i="middle",a=t.x,s=t.y;return Math.abs(t.x)>=10?t.x>0?(i="start",a+=10):t.x<0&&(i="end",a-=10):i="middle",Math.abs(t.y)>=e-10&&(t.y<0?s-=10:t.y>0&&(s+=10)),{textAnchor:i,newX:a,newY:s}}},{key:"getPreviousPath",value:function(t){for(var e=this.w,i=null,a=0;a<e.globals.previousPaths.length;a++){var s=e.globals.previousPaths[a];s.paths.length>0&&parseInt(s.realIndex,10)===parseInt(t,10)&&void 0!==e.globals.previousPaths[a].paths[0]&&(i=e.globals.previousPaths[a].paths[0].d);}return i}},{key:"getDataPointsPos",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.dataPointsLen;t=t||[],e=e||[];for(var a=[],s=0;s<i;s++){var r={};r.x=t[s]*Math.sin(e[s]),r.y=-t[s]*Math.cos(e[s]),a.push(r);}return a}}]),t}(),It=function(t){n(i,Lt);var e=d(i);function i(t){var s;a(this,i),(s=e.call(this,t)).ctx=t,s.w=t.w,s.animBeginArr=[0],s.animDur=0;var r=s.w;return s.startAngle=r.config.plotOptions.radialBar.startAngle,s.endAngle=r.config.plotOptions.radialBar.endAngle,s.totalAngle=Math.abs(r.config.plotOptions.radialBar.endAngle-r.config.plotOptions.radialBar.startAngle),s.trackStartAngle=r.config.plotOptions.radialBar.track.startAngle,s.trackEndAngle=r.config.plotOptions.radialBar.track.endAngle,s.donutDataLabels=s.w.config.plotOptions.radialBar.dataLabels,s.radialDataLabels=s.donutDataLabels,s.trackStartAngle||(s.trackStartAngle=s.startAngle),s.trackEndAngle||(s.trackEndAngle=s.endAngle),360===s.endAngle&&(s.endAngle=359.99),s.margin=parseInt(r.config.plotOptions.radialBar.track.margin,10),s}return r(i,[{key:"draw",value:function(t){var e=this.w,i=new m(this.ctx),a=i.group({class:"apexcharts-radialbar"});if(e.globals.noData)return a;var s=i.group(),r=this.defaultSize/2,o=e.globals.gridWidth/2,n=this.defaultSize/2.05;e.config.chart.sparkline.enabled||(n=n-e.config.stroke.width-e.config.chart.dropShadow.blur);var l=e.globals.fill.colors;if(e.config.plotOptions.radialBar.track.show){var h=this.drawTracks({size:n,centerX:o,centerY:r,colorArr:l,series:t});s.add(h);}var c=this.drawArcs({size:n,centerX:o,centerY:r,colorArr:l,series:t}),d=360;e.config.plotOptions.radialBar.startAngle<0&&(d=this.totalAngle);var g=(360-d)/360;if(e.globals.radialSize=n-n*g,this.radialDataLabels.value.show){var u=Math.max(this.radialDataLabels.value.offsetY,this.radialDataLabels.name.offsetY);e.globals.radialSize+=u*g;}return s.add(c.g),"front"===e.config.plotOptions.radialBar.hollow.position&&(c.g.add(c.elHollow),c.dataLabels&&c.g.add(c.dataLabels)),a.add(s),a}},{key:"drawTracks",value:function(t){var e=this.w,i=new m(this.ctx),a=i.group({class:"apexcharts-tracks"}),s=new v(this.ctx),r=new R(this.ctx),o=this.getStrokeWidth(t);t.size=t.size-o/2;for(var n=0;n<t.series.length;n++){var l=i.group({class:"apexcharts-radialbar-track apexcharts-track"});a.add(l),l.attr({rel:n+1}),t.size=t.size-o-this.margin;var h=e.config.plotOptions.radialBar.track,c=r.fillPath({seriesNumber:0,size:t.size,fillColors:Array.isArray(h.background)?h.background[n]:h.background,solid:!0}),d=this.trackStartAngle,g=this.trackEndAngle;Math.abs(g)+Math.abs(d)>=360&&(g=360-Math.abs(this.startAngle)-.1);var u=i.drawPath({d:"",stroke:c,strokeWidth:o*parseInt(h.strokeWidth,10)/100,fill:"none",strokeOpacity:h.opacity,classes:"apexcharts-radialbar-area"});if(h.dropShadow.enabled){var p=h.dropShadow;s.dropShadow(u,p);}l.add(u),u.attr("id","apexcharts-radialbarTrack-"+n),this.animatePaths(u,{centerX:t.centerX,centerY:t.centerY,endAngle:g,startAngle:d,size:t.size,i:n,totalItems:2,animBeginArr:0,dur:0,isTrack:!0,easing:e.globals.easing});}return a}},{key:"drawArcs",value:function(t){var e=this.w,i=new m(this.ctx),a=new R(this.ctx),s=new v(this.ctx),r=i.group(),o=this.getStrokeWidth(t);t.size=t.size-o/2;var n=e.config.plotOptions.radialBar.hollow.background,l=t.size-o*t.series.length-this.margin*t.series.length-o*parseInt(e.config.plotOptions.radialBar.track.strokeWidth,10)/100/2,h=l-e.config.plotOptions.radialBar.hollow.margin;void 0!==e.config.plotOptions.radialBar.hollow.image&&(n=this.drawHollowImage(t,r,l,n));var c=this.drawHollow({size:h,centerX:t.centerX,centerY:t.centerY,fill:n||"transparent"});if(e.config.plotOptions.radialBar.hollow.dropShadow.enabled){var d=e.config.plotOptions.radialBar.hollow.dropShadow;s.dropShadow(c,d);}var g=1;!this.radialDataLabels.total.show&&e.globals.series.length>1&&(g=0);var u=null;this.radialDataLabels.show&&(u=this.renderInnerDataLabels(this.radialDataLabels,{hollowSize:l,centerX:t.centerX,centerY:t.centerY,opacity:g})),"back"===e.config.plotOptions.radialBar.hollow.position&&(r.add(c),u&&r.add(u));var p=!1;e.config.plotOptions.radialBar.inverseOrder&&(p=!0);for(var f=p?t.series.length-1:0;p?f>=0:f<t.series.length;p?f--:f++){var b=i.group({class:"apexcharts-series apexcharts-radial-series",seriesName:x.escapeString(e.globals.seriesNames[f])});r.add(b),b.attr({rel:f+1,"data:realIndex":f}),this.ctx.series.addCollapsedClassToSeries(b,f),t.size=t.size-o-this.margin;var y=a.fillPath({seriesNumber:f,size:t.size,value:t.series[f]}),w=this.startAngle,k=void 0,A=x.negToZero(t.series[f]>100?100:t.series[f])/100,S=Math.round(this.totalAngle*A)+this.startAngle,C=void 0;e.globals.dataChanged&&(k=this.startAngle,C=Math.round(this.totalAngle*x.negToZero(e.globals.previousPaths[f])/100)+k),Math.abs(S)+Math.abs(w)>=360&&(S-=.01),Math.abs(C)+Math.abs(k)>=360&&(C-=.01);var L=S-w,P=Array.isArray(e.config.stroke.dashArray)?e.config.stroke.dashArray[f]:e.config.stroke.dashArray,I=i.drawPath({d:"",stroke:y,strokeWidth:o,fill:"none",fillOpacity:e.config.fill.opacity,classes:"apexcharts-radialbar-area apexcharts-radialbar-slice-"+f,strokeDashArray:P});if(m.setAttrs(I.node,{"data:angle":L,"data:value":t.series[f]}),e.config.chart.dropShadow.enabled){var M=e.config.chart.dropShadow;s.dropShadow(I,M,f);}s.setSelectionFilter(I,0,f),this.addListeners(I,this.radialDataLabels),b.add(I),I.attr({index:0,j:f});var T=0;!this.initialAnim||e.globals.resized||e.globals.dataChanged||(T=e.config.chart.animations.speed),e.globals.dataChanged&&(T=e.config.chart.animations.dynamicAnimation.speed),this.animDur=T/(1.2*t.series.length)+this.animDur,this.animBeginArr.push(this.animDur),this.animatePaths(I,{centerX:t.centerX,centerY:t.centerY,endAngle:S,startAngle:w,prevEndAngle:C,prevStartAngle:k,size:t.size,i:f,totalItems:2,animBeginArr:this.animBeginArr,dur:T,shouldSetPrevPaths:!0,easing:e.globals.easing});}return {g:r,elHollow:c,dataLabels:u}}},{key:"drawHollow",value:function(t){var e=new m(this.ctx).drawCircle(2*t.size);return e.attr({class:"apexcharts-radialbar-hollow",cx:t.centerX,cy:t.centerY,r:t.size,fill:t.fill}),e}},{key:"drawHollowImage",value:function(t,e,i,a){var s=this.w,r=new R(this.ctx),o=x.randomId(),n=s.config.plotOptions.radialBar.hollow.image;if(s.config.plotOptions.radialBar.hollow.imageClipped)r.clippedImgArea({width:i,height:i,image:n,patternID:"pattern".concat(s.globals.cuid).concat(o)}),a="url(#pattern".concat(s.globals.cuid).concat(o,")");else {var l=s.config.plotOptions.radialBar.hollow.imageWidth,h=s.config.plotOptions.radialBar.hollow.imageHeight;if(void 0===l&&void 0===h){var c=s.globals.dom.Paper.image(n).loaded((function(e){this.move(t.centerX-e.width/2+s.config.plotOptions.radialBar.hollow.imageOffsetX,t.centerY-e.height/2+s.config.plotOptions.radialBar.hollow.imageOffsetY);}));e.add(c);}else {var d=s.globals.dom.Paper.image(n).loaded((function(e){this.move(t.centerX-l/2+s.config.plotOptions.radialBar.hollow.imageOffsetX,t.centerY-h/2+s.config.plotOptions.radialBar.hollow.imageOffsetY),this.size(l,h);}));e.add(d);}}return a}},{key:"getStrokeWidth",value:function(t){var e=this.w;return t.size*(100-parseInt(e.config.plotOptions.radialBar.hollow.size,10))/100/(t.series.length+1)-this.margin}}]),i}(),Mt=function(t){n(s,yt);var i=d(s);function s(){return a(this,s),i.apply(this,arguments)}return r(s,[{key:"draw",value:function(t,i){var a=this.w,s=new m(this.ctx);this.rangeBarOptions=this.w.config.plotOptions.rangeBar,this.series=t,this.seriesRangeStart=a.globals.seriesRangeStart,this.seriesRangeEnd=a.globals.seriesRangeEnd,this.barHelpers.initVariables(t);for(var r=s.group({class:"apexcharts-rangebar-series apexcharts-plot-series"}),n=0;n<t.length;n++){var l,h,c,d,g=void 0,u=void 0,p=a.globals.comboCharts?i[n]:n,f=s.group({class:"apexcharts-series",seriesName:x.escapeString(a.globals.seriesNames[p]),rel:n+1,"data:realIndex":p});this.ctx.series.addCollapsedClassToSeries(f,p),t[n].length>0&&(this.visibleI=this.visibleI+1);var b=0,v=0;this.yRatio.length>1&&(this.yaxisIndex=p);var y=this.barHelpers.initialPositions();u=y.y,d=y.zeroW,g=y.x,v=y.barWidth,b=y.barHeight,l=y.xDivision,h=y.yDivision,c=y.zeroH;for(var w=s.group({class:"apexcharts-datalabels","data:realIndex":p}),k=s.group({class:"apexcharts-rangebar-goals-markers"}),A=0;A<a.globals.dataPoints;A++){var S,C=this.barHelpers.getStrokeWidth(n,A,p),L=this.seriesRangeStart[n][A],P=this.seriesRangeEnd[n][A],I=null,M=null,T=null,z={x:g,y:u,strokeWidth:C,elSeries:f},X=this.seriesLen;if(a.config.plotOptions.bar.rangeBarGroupRows&&(X=1),void 0===a.config.series[n].data[A])break;if(this.isHorizontal){T=u+b*this.visibleI;var E=(h-b*X)/2;if(a.config.series[n].data[A].x){var Y=this.detectOverlappingBars({i:n,j:A,barYPosition:T,srty:E,barHeight:b,yDivision:h,initPositions:y});b=Y.barHeight,T=Y.barYPosition;}v=(I=this.drawRangeBarPaths(e({indexes:{i:n,j:A,realIndex:p},barHeight:b,barYPosition:T,zeroW:d,yDivision:h,y1:L,y2:P},z))).barWidth;}else {a.globals.isXNumeric&&(g=(a.globals.seriesX[n][A]-a.globals.minX)/this.xRatio-v/2),M=g+v*this.visibleI;var F=(l-v*X)/2;if(a.config.series[n].data[A].x){var R=this.detectOverlappingBars({i:n,j:A,barXPosition:M,srtx:F,barWidth:v,xDivision:l,initPositions:y});v=R.barWidth,M=R.barXPosition;}b=(I=this.drawRangeColumnPaths(e({indexes:{i:n,j:A,realIndex:p},barWidth:v,barXPosition:M,zeroH:c,xDivision:l},z))).barHeight;}var H=this.barHelpers.drawGoalLine({barXPosition:I.barXPosition,barYPosition:T,goalX:I.goalX,goalY:I.goalY,barHeight:b,barWidth:v});H&&k.add(H),u=I.y,g=I.x;var D=this.barHelpers.getPathFillColor(t,n,A,p),O=a.globals.stroke.colors[p];this.renderSeries((o(S={realIndex:p,pathFill:D,lineFill:O,j:A,i:n,x:g,y:u,y1:L,y2:P,pathFrom:I.pathFrom,pathTo:I.pathTo,strokeWidth:C,elSeries:f,series:t,barHeight:b,barWidth:v,barXPosition:M,barYPosition:T},"barWidth",v),o(S,"elDataLabelsWrap",w),o(S,"elGoalsMarkers",k),o(S,"visibleSeries",this.visibleI),o(S,"type","rangebar"),S));}r.add(f);}return r}},{key:"detectOverlappingBars",value:function(t){var e=t.i,i=t.j,a=t.barYPosition,s=t.barXPosition,r=t.srty,o=t.srtx,n=t.barHeight,l=t.barWidth,h=t.yDivision,c=t.xDivision,d=t.initPositions,g=this.w,u=[],p=g.config.series[e].data[i].rangeName,f=g.config.series[e].data[i].x,x=Array.isArray(f)?f.join(" "):f,b=g.globals.labels.map((function(t){return Array.isArray(t)?t.join(" "):t})).indexOf(x),v=g.globals.seriesRange[e].findIndex((function(t){return t.x===x&&t.overlaps.length>0}));return this.isHorizontal?(a=g.config.plotOptions.bar.rangeBarGroupRows?r+h*b:r+n*this.visibleI+h*b,v>-1&&!g.config.plotOptions.bar.rangeBarOverlap&&(u=g.globals.seriesRange[e][v].overlaps).indexOf(p)>-1&&(a=(n=d.barHeight/u.length)*this.visibleI+h*(100-parseInt(this.barOptions.barHeight,10))/100/2+n*(this.visibleI+u.indexOf(p))+h*b)):(b>-1&&(s=g.config.plotOptions.bar.rangeBarGroupRows?o+c*b:o+l*this.visibleI+c*b),v>-1&&!g.config.plotOptions.bar.rangeBarOverlap&&(u=g.globals.seriesRange[e][v].overlaps).indexOf(p)>-1&&(s=(l=d.barWidth/u.length)*this.visibleI+c*(100-parseInt(this.barOptions.barWidth,10))/100/2+l*(this.visibleI+u.indexOf(p))+c*b)),{barYPosition:a,barXPosition:s,barHeight:n,barWidth:l}}},{key:"drawRangeColumnPaths",value:function(t){var e=t.indexes,i=t.x,a=t.xDivision,s=t.barWidth,r=t.barXPosition,o=t.zeroH,n=this.w,l=e.i,h=e.j,c=this.yRatio[this.yaxisIndex],d=e.realIndex,g=this.getRangeValue(d,h),u=Math.min(g.start,g.end),p=Math.max(g.start,g.end);void 0===this.series[l][h]||null===this.series[l][h]?u=o:(u=o-u/c,p=o-p/c);var f=Math.abs(p-u),x=this.barHelpers.getColumnPaths({barXPosition:r,barWidth:s,y1:u,y2:p,strokeWidth:this.strokeWidth,series:this.seriesRangeEnd,realIndex:e.realIndex,i:d,j:h,w:n});if(n.globals.isXNumeric){var b=this.getBarXForNumericXAxis({x:i,j:h,realIndex:d,barWidth:s});i=b.x,r=b.barXPosition;}else i+=a;return {pathTo:x.pathTo,pathFrom:x.pathFrom,barHeight:f,x:i,y:p,goalY:this.barHelpers.getGoalValues("y",null,o,l,h),barXPosition:r}}},{key:"drawRangeBarPaths",value:function(t){var e=t.indexes,i=t.y,a=t.y1,s=t.y2,r=t.yDivision,o=t.barHeight,n=t.barYPosition,l=t.zeroW,h=this.w,c=l+a/this.invertedYRatio,d=l+s/this.invertedYRatio,g=Math.abs(d-c),u=this.barHelpers.getBarpaths({barYPosition:n,barHeight:o,x1:c,x2:d,strokeWidth:this.strokeWidth,series:this.seriesRangeEnd,i:e.realIndex,realIndex:e.realIndex,j:e.j,w:h});return h.globals.isXNumeric||(i+=r),{pathTo:u.pathTo,pathFrom:u.pathFrom,barWidth:g,x:d,goalX:this.barHelpers.getGoalValues("x",l,null,e.realIndex,e.j),y:i}}},{key:"getRangeValue",value:function(t,e){var i=this.w;return {start:i.globals.seriesRangeStart[t][e],end:i.globals.seriesRangeEnd[t][e]}}}]),s}(),Tt=function(){function t(e){a(this,t),this.w=e.w,this.lineCtx=e;}return r(t,[{key:"sameValueSeriesFix",value:function(t,e){var i=this.w;if(("gradient"===i.config.fill.type||"gradient"===i.config.fill.type[t])&&new y(this.lineCtx.ctx,i).seriesHaveSameValues(t)){var a=e[t].slice();a[a.length-1]=a[a.length-1]+1e-6,e[t]=a;}return e}},{key:"calculatePoints",value:function(t){var e=t.series,i=t.realIndex,a=t.x,s=t.y,r=t.i,o=t.j,n=t.prevY,l=this.w,h=[],c=[];if(0===o){var d=this.lineCtx.categoryAxisCorrection+l.config.markers.offsetX;l.globals.isXNumeric&&(d=(l.globals.seriesX[i][0]-l.globals.minX)/this.lineCtx.xRatio+l.config.markers.offsetX),h.push(d),c.push(x.isNumber(e[r][0])?n+l.config.markers.offsetY:null),h.push(a+l.config.markers.offsetX),c.push(x.isNumber(e[r][o+1])?s+l.config.markers.offsetY:null);}else h.push(a+l.config.markers.offsetX),c.push(x.isNumber(e[r][o+1])?s+l.config.markers.offsetY:null);return {x:h,y:c}}},{key:"checkPreviousPaths",value:function(t){for(var e=t.pathFromLine,i=t.pathFromArea,a=t.realIndex,s=this.w,r=0;r<s.globals.previousPaths.length;r++){var o=s.globals.previousPaths[r];("line"===o.type||"area"===o.type)&&o.paths.length>0&&parseInt(o.realIndex,10)===parseInt(a,10)&&("line"===o.type?(this.lineCtx.appendPathFrom=!1,e=s.globals.previousPaths[r].paths[0].d):"area"===o.type&&(this.lineCtx.appendPathFrom=!1,i=s.globals.previousPaths[r].paths[0].d,s.config.stroke.show&&s.globals.previousPaths[r].paths[1]&&(e=s.globals.previousPaths[r].paths[1].d)));}return {pathFromLine:e,pathFromArea:i}}},{key:"determineFirstPrevY",value:function(t){var e,i=t.i,a=t.series,s=t.prevY,r=t.lineYPosition,o=this.w;if(void 0!==(null===(e=a[i])||void 0===e?void 0:e[0]))s=(r=o.config.chart.stacked&&i>0?this.lineCtx.prevSeriesY[i-1][0]:this.lineCtx.zeroY)-a[i][0]/this.lineCtx.yRatio[this.lineCtx.yaxisIndex]+2*(this.lineCtx.isReversed?a[i][0]/this.lineCtx.yRatio[this.lineCtx.yaxisIndex]:0);else if(o.config.chart.stacked&&i>0&&void 0===a[i][0])for(var n=i-1;n>=0;n--)if(null!==a[n][0]&&void 0!==a[n][0]){s=r=this.lineCtx.prevSeriesY[n][0];break}return {prevY:s,lineYPosition:r}}}]),t}(),zt=function(t){for(var e,i,a,s,r=function(t){for(var e=[],i=t[0],a=t[1],s=e[0]=Yt(i,a),r=1,o=t.length-1;r<o;r++)i=a,a=t[r+1],e[r]=.5*(s+(s=Yt(i,a)));return e[r]=s,e}(t),o=t.length-1,n=[],l=0;l<o;l++)a=Yt(t[l],t[l+1]),Math.abs(a)<1e-6?r[l]=r[l+1]=0:(s=(e=r[l]/a)*e+(i=r[l+1]/a)*i)>9&&(s=3*a/Math.sqrt(s),r[l]=s*e,r[l+1]=s*i);for(var h=0;h<=o;h++)s=(t[Math.min(o,h+1)][0]-t[Math.max(0,h-1)][0])/(6*(1+r[h]*r[h])),n.push([s||0,r[h]*s||0]);return n},Xt=function(t){for(var e="",i=0;i<t.length;i++){var a=t[i],s=t[i-1],r=a.length,o=null==s?void 0:s.length;i>1&&Math.abs(a[r-2]-s[o-2])<30?(e+="Q".concat(a[0],", ").concat(a[1]),e+=", ".concat(a[2],", ").concat(a[3])):r>4?(e+="C".concat(a[0],", ").concat(a[1]),e+=", ".concat(a[2],", ").concat(a[3]),e+=", ".concat(a[4],", ").concat(a[5])):r>2&&(e+="S".concat(a[0],", ").concat(a[1]),e+=", ".concat(a[2],", ").concat(a[3]));}return e},Et=function(t){var e=zt(t),i=t[1],a=t[0],s=[],r=e[1],o=e[0];s.push(a,[a[0]+o[0],a[1]+o[1],i[0]-r[0],i[1]-r[1],i[0],i[1]]);for(var n=2,l=e.length;n<l;n++){var h=t[n],c=e[n];s.push([h[0]-c[0],h[1]-c[1],h[0],h[1]]);}return s};function Yt(t,e){return (e[1]-t[1])/(e[0]-t[0])}var Ft=function(){function t(e,i,s){a(this,t),this.ctx=e,this.w=e.w,this.xyRatios=i,this.pointsChart=!("bubble"!==this.w.config.chart.type&&"scatter"!==this.w.config.chart.type)||s,this.scatter=new D(this.ctx),this.noNegatives=this.w.globals.minX===Number.MAX_VALUE,this.lineHelpers=new Tt(this),this.markers=new H(this.ctx),this.prevSeriesY=[],this.categoryAxisCorrection=0,this.yaxisIndex=0;}return r(t,[{key:"draw",value:function(t,i,a,s){var r,o=this.w,n=new m(this.ctx),l=o.globals.comboCharts?i:o.config.chart.type,h=n.group({class:"apexcharts-".concat(l,"-series apexcharts-plot-series")}),c=new y(this.ctx,o);this.yRatio=this.xyRatios.yRatio,this.zRatio=this.xyRatios.zRatio,this.xRatio=this.xyRatios.xRatio,this.baseLineY=this.xyRatios.baseLineY,t=c.getLogSeries(t),this.yRatio=c.getLogYRatios(this.yRatio);for(var d=[],g=0;g<t.length;g++){t=this.lineHelpers.sameValueSeriesFix(g,t);var u=o.globals.comboCharts?a[g]:g;this._initSerieVariables(t,g,u);var p=[],f=[],x=[],b=o.globals.padHorizontal+this.categoryAxisCorrection;this.ctx.series.addCollapsedClassToSeries(this.elSeries,u),o.globals.isXNumeric&&o.globals.seriesX.length>0&&(b=(o.globals.seriesX[u][0]-o.globals.minX)/this.xRatio),x.push(b);var v=b,w=this.zeroY,k=this.zeroY;w=this.lineHelpers.determineFirstPrevY({i:g,series:t,prevY:w,lineYPosition:0}).prevY,"smooth"===o.config.stroke.curve&&null===t[g][0]?p.push(null):p.push(w);"rangeArea"===l&&(k=this.lineHelpers.determineFirstPrevY({i:g,series:s,prevY:k,lineYPosition:0}).prevY,f.push(k));var A={type:l,series:t,realIndex:u,i:g,x:b,y:1,pathsFrom:this._calculatePathsFrom({type:l,series:t,i:g,realIndex:u,prevX:v,prevY:w,prevY2:k}),linePaths:[],areaPaths:[],seriesIndex:a,lineYPosition:0,xArrj:x,yArrj:p,y2Arrj:f,seriesRangeEnd:s},S=this._iterateOverDataPoints(e(e({},A),{},{iterations:"rangeArea"===l?t[g].length-1:void 0,isRangeStart:!0}));if("rangeArea"===l){var C=this._calculatePathsFrom({series:s,i:g,realIndex:u,prevX:v,prevY:k}),L=this._iterateOverDataPoints(e(e({},A),{},{series:s,pathsFrom:C,iterations:s[g].length-1,isRangeStart:!1}));S.linePaths[0]=L.linePath+S.linePath,S.pathFromLine=L.pathFromLine+S.pathFromLine;}this._handlePaths({type:l,realIndex:u,i:g,paths:S}),this.elSeries.add(this.elPointsMain),this.elSeries.add(this.elDataLabelsWrap),d.push(this.elSeries);}if(void 0!==(null===(r=o.config.series[0])||void 0===r?void 0:r.zIndex)&&d.sort((function(t,e){return Number(t.node.getAttribute("zIndex"))-Number(e.node.getAttribute("zIndex"))})),o.config.chart.stacked)for(var P=d.length;P>0;P--)h.add(d[P-1]);else for(var I=0;I<d.length;I++)h.add(d[I]);return h}},{key:"_initSerieVariables",value:function(t,e,i){var a=this.w,s=new m(this.ctx);this.xDivision=a.globals.gridWidth/(a.globals.dataPoints-("on"===a.config.xaxis.tickPlacement?1:0)),this.strokeWidth=Array.isArray(a.config.stroke.width)?a.config.stroke.width[i]:a.config.stroke.width,this.yRatio.length>1&&(this.yaxisIndex=i),this.isReversed=a.config.yaxis[this.yaxisIndex]&&a.config.yaxis[this.yaxisIndex].reversed,this.zeroY=a.globals.gridHeight-this.baseLineY[this.yaxisIndex]-(this.isReversed?a.globals.gridHeight:0)+(this.isReversed?2*this.baseLineY[this.yaxisIndex]:0),this.areaBottomY=this.zeroY,(this.zeroY>a.globals.gridHeight||"end"===a.config.plotOptions.area.fillTo)&&(this.areaBottomY=a.globals.gridHeight),this.categoryAxisCorrection=this.xDivision/2,this.elSeries=s.group({class:"apexcharts-series",zIndex:void 0!==a.config.series[i].zIndex?a.config.series[i].zIndex:i,seriesName:x.escapeString(a.globals.seriesNames[i])}),this.elPointsMain=s.group({class:"apexcharts-series-markers-wrap","data:realIndex":i}),this.elDataLabelsWrap=s.group({class:"apexcharts-datalabels","data:realIndex":i});var r=t[e].length===a.globals.dataPoints;this.elSeries.attr({"data:longestSeries":r,rel:e+1,"data:realIndex":i}),this.appendPathFrom=!0;}},{key:"_calculatePathsFrom",value:function(t){var e,i,a,s,r=t.type,o=t.series,n=t.i,l=t.realIndex,h=t.prevX,c=t.prevY,d=t.prevY2,g=this.w,u=new m(this.ctx);if(null===o[n][0]){for(var p=0;p<o[n].length;p++)if(null!==o[n][p]){h=this.xDivision*p,c=this.zeroY-o[n][p]/this.yRatio[this.yaxisIndex],e=u.move(h,c),i=u.move(h,this.areaBottomY);break}}else e=u.move(h,c),"rangeArea"===r&&(e=u.move(h,d)+u.line(h,c)),i=u.move(h,this.areaBottomY)+u.line(h,c);if(a=u.move(-1,this.zeroY)+u.line(-1,this.zeroY),s=u.move(-1,this.zeroY)+u.line(-1,this.zeroY),g.globals.previousPaths.length>0){var f=this.lineHelpers.checkPreviousPaths({pathFromLine:a,pathFromArea:s,realIndex:l});a=f.pathFromLine,s=f.pathFromArea;}return {prevX:h,prevY:c,linePath:e,areaPath:i,pathFromLine:a,pathFromArea:s}}},{key:"_handlePaths",value:function(t){var i=t.type,a=t.realIndex,s=t.i,r=t.paths,o=this.w,n=new m(this.ctx),l=new R(this.ctx);this.prevSeriesY.push(r.yArrj),o.globals.seriesXvalues[a]=r.xArrj,o.globals.seriesYvalues[a]=r.yArrj;var h=o.config.forecastDataPoints;if(h.count>0&&"rangeArea"!==i){var c=o.globals.seriesXvalues[a][o.globals.seriesXvalues[a].length-h.count-1],d=n.drawRect(c,0,o.globals.gridWidth,o.globals.gridHeight,0);o.globals.dom.elForecastMask.appendChild(d.node);var g=n.drawRect(0,0,c,o.globals.gridHeight,0);o.globals.dom.elNonForecastMask.appendChild(g.node);}this.pointsChart||o.globals.delayedElements.push({el:this.elPointsMain.node,index:a});var u={i:s,realIndex:a,animationDelay:s,initialSpeed:o.config.chart.animations.speed,dataChangeSpeed:o.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-".concat(i)};if("area"===i)for(var p=l.fillPath({seriesNumber:a}),f=0;f<r.areaPaths.length;f++){var x=n.renderPaths(e(e({},u),{},{pathFrom:r.pathFromArea,pathTo:r.areaPaths[f],stroke:"none",strokeWidth:0,strokeLineCap:null,fill:p}));this.elSeries.add(x);}if(o.config.stroke.show&&!this.pointsChart){var b=null;if("line"===i)b=l.fillPath({seriesNumber:a,i:s});else if("solid"===o.config.stroke.fill.type)b=o.globals.stroke.colors[a];else {var v=o.config.fill;o.config.fill=o.config.stroke.fill,b=l.fillPath({seriesNumber:a,i:s}),o.config.fill=v;}for(var y=0;y<r.linePaths.length;y++){var w=b;"rangeArea"===i&&(w=l.fillPath({seriesNumber:a}));var k=e(e({},u),{},{pathFrom:r.pathFromLine,pathTo:r.linePaths[y],stroke:b,strokeWidth:this.strokeWidth,strokeLineCap:o.config.stroke.lineCap,fill:"rangeArea"===i?w:"none"}),A=n.renderPaths(k);if(this.elSeries.add(A),A.attr("fill-rule","evenodd"),h.count>0&&"rangeArea"!==i){var S=n.renderPaths(k);S.node.setAttribute("stroke-dasharray",h.dashArray),h.strokeWidth&&S.node.setAttribute("stroke-width",h.strokeWidth),this.elSeries.add(S),S.attr("clip-path","url(#forecastMask".concat(o.globals.cuid,")")),A.attr("clip-path","url(#nonForecastMask".concat(o.globals.cuid,")"));}}}}},{key:"_iterateOverDataPoints",value:function(t){var e=this,i=t.type,a=t.series,s=t.iterations,r=t.realIndex,o=t.i,n=t.x,l=t.y,h=t.pathsFrom,c=t.linePaths,d=t.areaPaths,g=t.seriesIndex,u=t.lineYPosition,p=t.xArrj,f=t.yArrj,b=t.y2Arrj,v=t.isRangeStart,y=t.seriesRangeEnd,w=this.w,k=new m(this.ctx),A=this.yRatio,S=h.prevY,C=h.linePath,L=h.areaPath,P=h.pathFromLine,I=h.pathFromArea,M=x.isNumber(w.globals.minYArr[r])?w.globals.minYArr[r]:w.globals.minY;s||(s=w.globals.dataPoints>1?w.globals.dataPoints-1:w.globals.dataPoints);for(var T=function(t,i){return i-t/A[e.yaxisIndex]+2*(e.isReversed?t/A[e.yaxisIndex]:0)},z=l,X=0;X<s;X++){var E=void 0===a[o][X+1]||null===a[o][X+1];if(w.globals.isXNumeric){var Y=w.globals.seriesX[r][X+1];void 0===w.globals.seriesX[r][X+1]&&(Y=w.globals.seriesX[r][s-1]),n=(Y-w.globals.minX)/this.xRatio;}else n+=this.xDivision;if(w.config.chart.stacked)if(o>0&&w.globals.collapsedSeries.length<w.config.series.length-1){u=this.prevSeriesY[function(t){for(var e=t,i=0;i<w.globals.series.length;i++)if(w.globals.collapsedSeriesIndices.indexOf(t)>-1){e--;break}return e>=0?e:0}(o-1)][X+1];}else u=this.zeroY;else u=this.zeroY;E?l=T(M,u):(l=T(a[o][X+1],u),"rangeArea"===i&&(z=T(y[o][X+1],u))),p.push(n),E&&"smooth"===w.config.stroke.curve?f.push(null):f.push(l),b.push(z);var F=this.lineHelpers.calculatePoints({series:a,x:n,y:l,realIndex:r,i:o,j:X,prevY:S}),R=this._createPaths({type:i,series:a,i:o,realIndex:r,j:X,x:n,y:l,y2:z,xArrj:p,yArrj:f,y2Arrj:b,linePath:C,areaPath:L,linePaths:c,areaPaths:d,seriesIndex:g,isRangeStart:v});d=R.areaPaths,c=R.linePaths,L=R.areaPath,C=R.linePath,!this.appendPathFrom||"smooth"===w.config.stroke.curve&&"rangeArea"===i||(P+=k.line(n,this.zeroY),I+=k.line(n,this.zeroY)),this.handleNullDataPoints(a,F,o,X,r),this._handleMarkersAndLabels({type:i,pointsPos:F,i:o,j:X,realIndex:r,isRangeStart:v});}return {yArrj:f,xArrj:p,pathFromArea:I,areaPaths:d,pathFromLine:P,linePaths:c,linePath:C,areaPath:L}}},{key:"_handleMarkersAndLabels",value:function(t){var e=t.type,i=t.pointsPos,a=t.isRangeStart,s=t.i,r=t.j,o=t.realIndex,n=this.w,l=new O(this.ctx);if(this.pointsChart)this.scatter.draw(this.elSeries,r,{realIndex:o,pointsPos:i,zRatio:this.zRatio,elParent:this.elPointsMain});else {n.globals.series[s].length>1&&this.elPointsMain.node.classList.add("apexcharts-element-hidden");var h=this.markers.plotChartMarkers(i,o,r+1);null!==h&&this.elPointsMain.add(h);}var c=l.drawDataLabel({type:e,isRangeStart:a,pos:i,i:o,j:r+1});null!==c&&this.elDataLabelsWrap.add(c);}},{key:"_createPaths",value:function(t){var e=t.type,i=t.series,a=t.i,s=t.realIndex,r=t.j,o=t.x,n=t.y,l=t.xArrj,h=t.yArrj,c=t.y2,d=t.y2Arrj,g=t.linePath,u=t.areaPath,p=t.linePaths,f=t.areaPaths,x=t.seriesIndex,b=t.isRangeStart,v=this.w,y=new m(this.ctx),w=v.config.stroke.curve,k=this.areaBottomY;if(Array.isArray(v.config.stroke.curve)&&(w=Array.isArray(x)?v.config.stroke.curve[x[a]]:v.config.stroke.curve[a]),"rangeArea"===e&&(v.globals.hasNullValues||v.config.forecastDataPoints.count>0)&&"smooth"===w&&(w="straight"),"smooth"===w){var A="rangeArea"===e?l.length===v.globals.dataPoints:r===i[a].length-2,S=l.map((function(t,e){return [l[e],h[e]]})).filter((function(t){return null!==t[1]}));if(A&&S.length>1){var C=Et(S);if(g+=Xt(C),null===i[a][0]?u=g:u+=Xt(C),"rangeArea"===e&&b){g+=y.line(l[l.length-1],d[d.length-1]);var L=l.slice().reverse(),P=d.slice().reverse(),I=L.map((function(t,e){return [L[e],P[e]]})),M=Et(I);u=g+=Xt(M);}else u+=y.line(S[S.length-1][0],k)+y.line(S[0][0],k)+y.move(S[0][0],S[0][1])+"z";p.push(g),f.push(u);}}else {if(null===i[a][r+1]){g+=y.move(o,n);var T=v.globals.isXNumeric?(v.globals.seriesX[s][r]-v.globals.minX)/this.xRatio:o-this.xDivision;u=u+y.line(T,k)+y.move(o,n)+"z";}null===i[a][r]&&(g+=y.move(o,n),u+=y.move(o,k)),"stepline"===w?(g=g+y.line(o,null,"H")+y.line(null,n,"V"),u=u+y.line(o,null,"H")+y.line(null,n,"V")):"straight"===w&&(g+=y.line(o,n),u+=y.line(o,n)),r===i[a].length-2&&(u=u+y.line(o,k)+y.move(o,n)+"z","rangeArea"===e&&b?g=g+y.line(o,c)+y.move(o,c)+"z":(p.push(g),f.push(u)));}return {linePaths:p,areaPaths:f,linePath:g,areaPath:u}}},{key:"handleNullDataPoints",value:function(t,e,i,a,s){var r=this.w;if(null===t[i][a]&&r.config.markers.showNullDataPoints||1===t[i].length){var o=this.markers.plotChartMarkers(e,s,a+1,this.strokeWidth-r.config.markers.strokeWidth/2,!0);null!==o&&this.elPointsMain.add(o);}}}]),t}();window.TreemapSquared={},window.TreemapSquared.generate=function(){function t(e,i,a,s){this.xoffset=e,this.yoffset=i,this.height=s,this.width=a,this.shortestEdge=function(){return Math.min(this.height,this.width)},this.getCoordinates=function(t){var e,i=[],a=this.xoffset,s=this.yoffset,o=r(t)/this.height,n=r(t)/this.width;if(this.width>=this.height)for(e=0;e<t.length;e++)i.push([a,s,a+o,s+t[e]/o]),s+=t[e]/o;else for(e=0;e<t.length;e++)i.push([a,s,a+t[e]/n,s+n]),a+=t[e]/n;return i},this.cutArea=function(e){var i;if(this.width>=this.height){var a=e/this.height,s=this.width-a;i=new t(this.xoffset+a,this.yoffset,s,this.height);}else {var r=e/this.width,o=this.height-r;i=new t(this.xoffset,this.yoffset+r,this.width,o);}return i};}function e(e,a,s,o,n){o=void 0===o?0:o,n=void 0===n?0:n;var l=i(function(t,e){var i,a=[],s=e/r(t);for(i=0;i<t.length;i++)a[i]=t[i]*s;return a}(e,a*s),[],new t(o,n,a,s),[]);return function(t){var e,i,a=[];for(e=0;e<t.length;e++)for(i=0;i<t[e].length;i++)a.push(t[e][i]);return a}(l)}function i(t,e,s,o){var n,l,h;if(0!==t.length)return n=s.shortestEdge(),function(t,e,i){var s;if(0===t.length)return !0;(s=t.slice()).push(e);var r=a(t,i),o=a(s,i);return r>=o}(e,l=t[0],n)?(e.push(l),i(t.slice(1),e,s,o)):(h=s.cutArea(r(e),o),o.push(s.getCoordinates(e)),i(t,[],h,o)),o;o.push(s.getCoordinates(e));}function a(t,e){var i=Math.min.apply(Math,t),a=Math.max.apply(Math,t),s=r(t);return Math.max(Math.pow(e,2)*a/Math.pow(s,2),Math.pow(s,2)/(Math.pow(e,2)*i))}function s(t){return t&&t.constructor===Array}function r(t){var e,i=0;for(e=0;e<t.length;e++)i+=t[e];return i}function o(t){var e,i=0;if(s(t[0]))for(e=0;e<t.length;e++)i+=o(t[e]);else i=r(t);return i}return function t(i,a,r,n,l){n=void 0===n?0:n,l=void 0===l?0:l;var h,c,d=[],g=[];if(s(i[0])){for(c=0;c<i.length;c++)d[c]=o(i[c]);for(h=e(d,a,r,n,l),c=0;c<i.length;c++)g.push(t(i[c],h[c][2]-h[c][0],h[c][3]-h[c][1],h[c][0],h[c][1]));}else g=e(i,a,r,n,l);return g}}();var Rt,Ht,Dt=function(){function t(e,i){a(this,t),this.ctx=e,this.w=e.w,this.strokeWidth=this.w.config.stroke.width,this.helpers=new At(e),this.dynamicAnim=this.w.config.chart.animations.dynamicAnimation,this.labels=[];}return r(t,[{key:"draw",value:function(t){var e=this,i=this.w,a=new m(this.ctx),s=new R(this.ctx),r=a.group({class:"apexcharts-treemap"});if(i.globals.noData)return r;var o=[];return t.forEach((function(t){var e=t.map((function(t){return Math.abs(t)}));o.push(e);})),this.negRange=this.helpers.checkColorRange(),i.config.series.forEach((function(t,i){t.data.forEach((function(t){Array.isArray(e.labels[i])||(e.labels[i]=[]),e.labels[i].push(t.x);}));})),window.TreemapSquared.generate(o,i.globals.gridWidth,i.globals.gridHeight).forEach((function(o,n){var l=a.group({class:"apexcharts-series apexcharts-treemap-series",seriesName:x.escapeString(i.globals.seriesNames[n]),rel:n+1,"data:realIndex":n});if(i.config.chart.dropShadow.enabled){var h=i.config.chart.dropShadow;new v(e.ctx).dropShadow(r,h,n);}var c=a.group({class:"apexcharts-data-labels"});o.forEach((function(r,o){var h=r[0],c=r[1],d=r[2],g=r[3],u=a.drawRect(h,c,d-h,g-c,0,"#fff",1,e.strokeWidth,i.config.plotOptions.treemap.useFillColorAsStroke?f:i.globals.stroke.colors[n]);u.attr({cx:h,cy:c,index:n,i:n,j:o,width:d-h,height:g-c});var p=e.helpers.getShadeColor(i.config.chart.type,n,o,e.negRange),f=p.color;void 0!==i.config.series[n].data[o]&&i.config.series[n].data[o].fillColor&&(f=i.config.series[n].data[o].fillColor);var x=s.fillPath({color:f,seriesNumber:n,dataPointIndex:o});u.node.classList.add("apexcharts-treemap-rect"),u.attr({fill:x}),e.helpers.addListeners(u);var b={x:h+(d-h)/2,y:c+(g-c)/2,width:0,height:0},v={x:h,y:c,width:d-h,height:g-c};if(i.config.chart.animations.enabled&&!i.globals.dataChanged){var m=1;i.globals.resized||(m=i.config.chart.animations.speed),e.animateTreemap(u,b,v,m);}if(i.globals.dataChanged){var y=1;e.dynamicAnim.enabled&&i.globals.shouldAnimate&&(y=e.dynamicAnim.speed,i.globals.previousPaths[n]&&i.globals.previousPaths[n][o]&&i.globals.previousPaths[n][o].rect&&(b=i.globals.previousPaths[n][o].rect),e.animateTreemap(u,b,v,y));}var w=e.getFontSize(r),k=i.config.dataLabels.formatter(e.labels[n][o],{value:i.globals.series[n][o],seriesIndex:n,dataPointIndex:o,w:i});"truncate"===i.config.plotOptions.treemap.dataLabels.format&&(w=parseInt(i.config.dataLabels.style.fontSize,10),k=e.truncateLabels(k,w,h,c,d,g));var A=e.helpers.calculateDataLabels({text:k,x:(h+d)/2,y:(c+g)/2+e.strokeWidth/2+w/3,i:n,j:o,colorProps:p,fontSize:w,series:t});i.config.dataLabels.enabled&&A&&e.rotateToFitLabel(A,w,k,h,c,d,g),l.add(u),null!==A&&l.add(A);})),l.add(c),r.add(l);})),r}},{key:"getFontSize",value:function(t){var e=this.w;var i,a,s,r,o=function t(e){var i,a=0;if(Array.isArray(e[0]))for(i=0;i<e.length;i++)a+=t(e[i]);else for(i=0;i<e.length;i++)a+=e[i].length;return a}(this.labels)/function t(e){var i,a=0;if(Array.isArray(e[0]))for(i=0;i<e.length;i++)a+=t(e[i]);else for(i=0;i<e.length;i++)a+=1;return a}(this.labels);return i=t[2]-t[0],a=t[3]-t[1],s=i*a,r=Math.pow(s,.5),Math.min(r/o,parseInt(e.config.dataLabels.style.fontSize,10))}},{key:"rotateToFitLabel",value:function(t,e,i,a,s,r,o){var n=new m(this.ctx),l=n.getTextRects(i,e);if(l.width+this.w.config.stroke.width+5>r-a&&l.width<=o-s){var h=n.rotateAroundCenter(t.node);t.node.setAttribute("transform","rotate(-90 ".concat(h.x," ").concat(h.y,") translate(").concat(l.height/3,")"));}}},{key:"truncateLabels",value:function(t,e,i,a,s,r){var o=new m(this.ctx),n=o.getTextRects(t,e).width+this.w.config.stroke.width+5>s-i&&r-a>s-i?r-a:s-i,l=o.getTextBasedOnMaxWidth({text:t,maxWidth:n,fontSize:e});return t.length!==l.length&&n/e<5?"":l}},{key:"animateTreemap",value:function(t,e,i,a){var s=new b(this.ctx);s.animateRect(t,{x:e.x,y:e.y,width:e.width,height:e.height},{x:i.x,y:i.y,width:i.width,height:i.height},a,(function(){s.animationCompleted(t);}));}}]),t}(),Ot=86400,Nt=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w,this.timeScaleArray=[],this.utc=this.w.config.xaxis.labels.datetimeUTC;}return r(t,[{key:"calculateTimeScaleTicks",value:function(t,i){var a=this,s=this.w;if(s.globals.allSeriesCollapsed)return s.globals.labels=[],s.globals.timescaleLabels=[],[];var r=new I(this.ctx),o=(i-t)/864e5;this.determineInterval(o),s.globals.disableZoomIn=!1,s.globals.disableZoomOut=!1,o<.00011574074074074075?s.globals.disableZoomIn=!0:o>5e4&&(s.globals.disableZoomOut=!0);var n=r.getTimeUnitsfromTimestamp(t,i,this.utc),l=s.globals.gridWidth/o,h=l/24,c=h/60,d=c/60,g=Math.floor(24*o),u=Math.floor(1440*o),p=Math.floor(o*Ot),f=Math.floor(o),x=Math.floor(o/30),b=Math.floor(o/365),v={minMillisecond:n.minMillisecond,minSecond:n.minSecond,minMinute:n.minMinute,minHour:n.minHour,minDate:n.minDate,minMonth:n.minMonth,minYear:n.minYear},m={firstVal:v,currentMillisecond:v.minMillisecond,currentSecond:v.minSecond,currentMinute:v.minMinute,currentHour:v.minHour,currentMonthDate:v.minDate,currentDate:v.minDate,currentMonth:v.minMonth,currentYear:v.minYear,daysWidthOnXAxis:l,hoursWidthOnXAxis:h,minutesWidthOnXAxis:c,secondsWidthOnXAxis:d,numberOfSeconds:p,numberOfMinutes:u,numberOfHours:g,numberOfDays:f,numberOfMonths:x,numberOfYears:b};switch(this.tickInterval){case"years":this.generateYearScale(m);break;case"months":case"half_year":this.generateMonthScale(m);break;case"months_days":case"months_fortnight":case"days":case"week_days":this.generateDayScale(m);break;case"hours":this.generateHourScale(m);break;case"minutes_fives":case"minutes":this.generateMinuteScale(m);break;case"seconds_tens":case"seconds_fives":case"seconds":this.generateSecondScale(m);}var y=this.timeScaleArray.map((function(t){var i={position:t.position,unit:t.unit,year:t.year,day:t.day?t.day:1,hour:t.hour?t.hour:0,month:t.month+1};return "month"===t.unit?e(e({},i),{},{day:1,value:t.value+1}):"day"===t.unit||"hour"===t.unit?e(e({},i),{},{value:t.value}):"minute"===t.unit?e(e({},i),{},{value:t.value,minute:t.value}):"second"===t.unit?e(e({},i),{},{value:t.value,minute:t.minute,second:t.second}):t}));return y.filter((function(t){var e=1,i=Math.ceil(s.globals.gridWidth/120),r=t.value;void 0!==s.config.xaxis.tickAmount&&(i=s.config.xaxis.tickAmount),y.length>i&&(e=Math.floor(y.length/i));var o=!1,n=!1;switch(a.tickInterval){case"years":"year"===t.unit&&(o=!0);break;case"half_year":e=7,"year"===t.unit&&(o=!0);break;case"months":e=1,"year"===t.unit&&(o=!0);break;case"months_fortnight":e=15,"year"!==t.unit&&"month"!==t.unit||(o=!0),30===r&&(n=!0);break;case"months_days":e=10,"month"===t.unit&&(o=!0),30===r&&(n=!0);break;case"week_days":e=8,"month"===t.unit&&(o=!0);break;case"days":e=1,"month"===t.unit&&(o=!0);break;case"hours":"day"===t.unit&&(o=!0);break;case"minutes_fives":case"seconds_fives":r%5!=0&&(n=!0);break;case"seconds_tens":r%10!=0&&(n=!0);}if("hours"===a.tickInterval||"minutes_fives"===a.tickInterval||"seconds_tens"===a.tickInterval||"seconds_fives"===a.tickInterval){if(!n)return !0}else if((r%e==0||o)&&!n)return !0}))}},{key:"recalcDimensionsBasedOnFormat",value:function(t,e){var i=this.w,a=this.formatDates(t),s=this.removeOverlappingTS(a);i.globals.timescaleLabels=s.slice(),new ot(this.ctx).plotCoords();}},{key:"determineInterval",value:function(t){var e=24*t,i=60*e;switch(!0){case t/365>5:this.tickInterval="years";break;case t>800:this.tickInterval="half_year";break;case t>180:this.tickInterval="months";break;case t>90:this.tickInterval="months_fortnight";break;case t>60:this.tickInterval="months_days";break;case t>30:this.tickInterval="week_days";break;case t>2:this.tickInterval="days";break;case e>2.4:this.tickInterval="hours";break;case i>15:this.tickInterval="minutes_fives";break;case i>5:this.tickInterval="minutes";break;case i>1:this.tickInterval="seconds_tens";break;case 60*i>20:this.tickInterval="seconds_fives";break;default:this.tickInterval="seconds";}}},{key:"generateYearScale",value:function(t){var e=t.firstVal,i=t.currentMonth,a=t.currentYear,s=t.daysWidthOnXAxis,r=t.numberOfYears,o=e.minYear,n=0,l=new I(this.ctx),h="year";if(e.minDate>1||e.minMonth>0){var c=l.determineRemainingDaysOfYear(e.minYear,e.minMonth,e.minDate);n=(l.determineDaysOfYear(e.minYear)-c+1)*s,o=e.minYear+1,this.timeScaleArray.push({position:n,value:o,unit:h,year:o,month:x.monthMod(i+1)});}else 1===e.minDate&&0===e.minMonth&&this.timeScaleArray.push({position:n,value:o,unit:h,year:a,month:x.monthMod(i+1)});for(var d=o,g=n,u=0;u<r;u++)d++,g=l.determineDaysOfYear(d-1)*s+g,this.timeScaleArray.push({position:g,value:d,unit:h,year:d,month:1});}},{key:"generateMonthScale",value:function(t){var e=t.firstVal,i=t.currentMonthDate,a=t.currentMonth,s=t.currentYear,r=t.daysWidthOnXAxis,o=t.numberOfMonths,n=a,l=0,h=new I(this.ctx),c="month",d=0;if(e.minDate>1){l=(h.determineDaysOfMonths(a+1,e.minYear)-i+1)*r,n=x.monthMod(a+1);var g=s+d,u=x.monthMod(n),p=n;0===n&&(c="year",p=g,u=1,g+=d+=1),this.timeScaleArray.push({position:l,value:p,unit:c,year:g,month:u});}else this.timeScaleArray.push({position:l,value:n,unit:c,year:s,month:x.monthMod(a)});for(var f=n+1,b=l,v=0,m=1;v<o;v++,m++){0===(f=x.monthMod(f))?(c="year",d+=1):c="month";var y=this._getYear(s,f,d);b=h.determineDaysOfMonths(f,y)*r+b;var w=0===f?y:f;this.timeScaleArray.push({position:b,value:w,unit:c,year:y,month:0===f?1:f}),f++;}}},{key:"generateDayScale",value:function(t){var e=t.firstVal,i=t.currentMonth,a=t.currentYear,s=t.hoursWidthOnXAxis,r=t.numberOfDays,o=new I(this.ctx),n="day",l=e.minDate+1,h=l,c=function(t,e,i){return t>o.determineDaysOfMonths(e+1,i)?(h=1,n="month",g=e+=1,e):e},d=(24-e.minHour)*s,g=l,u=c(h,i,a);0===e.minHour&&1===e.minDate?(d=0,g=x.monthMod(e.minMonth),n="month",h=e.minDate):1!==e.minDate&&0===e.minHour&&0===e.minMinute&&(d=0,l=e.minDate,g=l,u=c(h=l,i,a)),this.timeScaleArray.push({position:d,value:g,unit:n,year:this._getYear(a,u,0),month:x.monthMod(u),day:h});for(var p=d,f=0;f<r;f++){n="day",u=c(h+=1,u,this._getYear(a,u,0));var b=this._getYear(a,u,0);p=24*s+p;var v=1===h?x.monthMod(u):h;this.timeScaleArray.push({position:p,value:v,unit:n,year:b,month:x.monthMod(u),day:v});}}},{key:"generateHourScale",value:function(t){var e=t.firstVal,i=t.currentDate,a=t.currentMonth,s=t.currentYear,r=t.minutesWidthOnXAxis,o=t.numberOfHours,n=new I(this.ctx),l="hour",h=function(t,e){return t>n.determineDaysOfMonths(e+1,s)&&(f=1,e+=1),{month:e,date:f}},c=function(t,e){return t>n.determineDaysOfMonths(e+1,s)?e+=1:e},d=60-(e.minMinute+e.minSecond/60),g=d*r,u=e.minHour+1,p=u;60===d&&(g=0,p=(u=e.minHour)+1);var f=i;p>=24&&(p=0,f+=1,l="day");var b=h(f,a).month;b=c(f,b),this.timeScaleArray.push({position:g,value:u,unit:l,day:f,hour:p,year:s,month:x.monthMod(b)}),p++;for(var v=g,m=0;m<o;m++){if(l="hour",p>=24)p=0,l="day",b=h(f+=1,b).month,b=c(f,b);var y=this._getYear(s,b,0);v=60*r+v;var w=0===p?f:p;this.timeScaleArray.push({position:v,value:w,unit:l,hour:p,day:f,year:y,month:x.monthMod(b)}),p++;}}},{key:"generateMinuteScale",value:function(t){for(var e=t.currentMillisecond,i=t.currentSecond,a=t.currentMinute,s=t.currentHour,r=t.currentDate,o=t.currentMonth,n=t.currentYear,l=t.minutesWidthOnXAxis,h=t.secondsWidthOnXAxis,c=t.numberOfMinutes,d=a+1,g=r,u=o,p=n,f=s,b=(60-i-e/1e3)*h,v=0;v<c;v++)d>=60&&(d=0,24===(f+=1)&&(f=0)),this.timeScaleArray.push({position:b,value:d,unit:"minute",hour:f,minute:d,day:g,year:this._getYear(p,u,0),month:x.monthMod(u)}),b+=l,d++;}},{key:"generateSecondScale",value:function(t){for(var e=t.currentMillisecond,i=t.currentSecond,a=t.currentMinute,s=t.currentHour,r=t.currentDate,o=t.currentMonth,n=t.currentYear,l=t.secondsWidthOnXAxis,h=t.numberOfSeconds,c=i+1,d=a,g=r,u=o,p=n,f=s,b=(1e3-e)/1e3*l,v=0;v<h;v++)c>=60&&(c=0,++d>=60&&(d=0,24===++f&&(f=0))),this.timeScaleArray.push({position:b,value:c,unit:"second",hour:f,minute:d,second:c,day:g,year:this._getYear(p,u,0),month:x.monthMod(u)}),b+=l,c++;}},{key:"createRawDateString",value:function(t,e){var i=t.year;return 0===t.month&&(t.month=1),i+="-"+("0"+t.month.toString()).slice(-2),"day"===t.unit?i+="day"===t.unit?"-"+("0"+e).slice(-2):"-01":i+="-"+("0"+(t.day?t.day:"1")).slice(-2),"hour"===t.unit?i+="hour"===t.unit?"T"+("0"+e).slice(-2):"T00":i+="T"+("0"+(t.hour?t.hour:"0")).slice(-2),"minute"===t.unit?i+=":"+("0"+e).slice(-2):i+=":"+(t.minute?("0"+t.minute).slice(-2):"00"),"second"===t.unit?i+=":"+("0"+e).slice(-2):i+=":00",this.utc&&(i+=".000Z"),i}},{key:"formatDates",value:function(t){var e=this,i=this.w;return t.map((function(t){var a=t.value.toString(),s=new I(e.ctx),r=e.createRawDateString(t,a),o=s.getDate(s.parseDate(r));if(e.utc||(o=s.getDate(s.parseDateWithTimezone(r))),void 0===i.config.xaxis.labels.format){var n="dd MMM",l=i.config.xaxis.labels.datetimeFormatter;"year"===t.unit&&(n=l.year),"month"===t.unit&&(n=l.month),"day"===t.unit&&(n=l.day),"hour"===t.unit&&(n=l.hour),"minute"===t.unit&&(n=l.minute),"second"===t.unit&&(n=l.second),a=s.formatDate(o,n);}else a=s.formatDate(o,i.config.xaxis.labels.format);return {dateString:r,position:t.position,value:a,unit:t.unit,year:t.year,month:t.month}}))}},{key:"removeOverlappingTS",value:function(t){var e,i=this,a=new m(this.ctx),s=!1;t.length>0&&t[0].value&&t.every((function(e){return e.value.length===t[0].value.length}))&&(s=!0,e=a.getTextRects(t[0].value).width);var r=0,o=t.map((function(o,n){if(n>0&&i.w.config.xaxis.labels.hideOverlappingLabels){var l=s?e:a.getTextRects(t[r].value).width,h=t[r].position;return o.position>h+l+10?(r=n,o):null}return o}));return o=o.filter((function(t){return null!==t}))}},{key:"_getYear",value:function(t,e,i){return t+Math.floor(e/12)+i}}]),t}(),Wt=function(){function t(e,i){a(this,t),this.ctx=i,this.w=i.w,this.el=e;}return r(t,[{key:"setupElements",value:function(){var t=this.w.globals,e=this.w.config,i=e.chart.type;t.axisCharts=["line","area","bar","rangeBar","rangeArea","candlestick","boxPlot","scatter","bubble","radar","heatmap","treemap"].indexOf(i)>-1,t.xyCharts=["line","area","bar","rangeBar","rangeArea","candlestick","boxPlot","scatter","bubble"].indexOf(i)>-1,t.isBarHorizontal=("bar"===e.chart.type||"rangeBar"===e.chart.type||"boxPlot"===e.chart.type)&&e.plotOptions.bar.horizontal,t.chartClass=".apexcharts"+t.chartID,t.dom.baseEl=this.el,t.dom.elWrap=document.createElement("div"),m.setAttrs(t.dom.elWrap,{id:t.chartClass.substring(1),class:"apexcharts-canvas "+t.chartClass.substring(1)}),this.el.appendChild(t.dom.elWrap),t.dom.Paper=new window.SVG.Doc(t.dom.elWrap),t.dom.Paper.attr({class:"apexcharts-svg","xmlns:data":"ApexChartsNS",transform:"translate(".concat(e.chart.offsetX,", ").concat(e.chart.offsetY,")")}),t.dom.Paper.node.style.background="dark"!==e.theme.mode||e.chart.background?e.chart.background:"rgba(0, 0, 0, 0.8)",this.setSVGDimensions(),t.dom.elLegendForeign=document.createElementNS(t.SVGNS,"foreignObject"),m.setAttrs(t.dom.elLegendForeign,{x:0,y:0,width:t.svgWidth,height:t.svgHeight}),t.dom.elLegendWrap=document.createElement("div"),t.dom.elLegendWrap.classList.add("apexcharts-legend"),t.dom.elLegendWrap.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),t.dom.elLegendForeign.appendChild(t.dom.elLegendWrap),t.dom.Paper.node.appendChild(t.dom.elLegendForeign),t.dom.elGraphical=t.dom.Paper.group().attr({class:"apexcharts-inner apexcharts-graphical"}),t.dom.elDefs=t.dom.Paper.defs(),t.dom.Paper.add(t.dom.elGraphical),t.dom.elGraphical.add(t.dom.elDefs);}},{key:"plotChartType",value:function(t,e){var i=this.w,a=i.config,s=i.globals,r={series:[],i:[]},o={series:[],i:[]},n={series:[],i:[]},l={series:[],i:[]},h={series:[],i:[]},c={series:[],i:[]},d={series:[],i:[]},g={series:[],i:[]},u={series:[],seriesRangeEnd:[],i:[]};s.series.map((function(e,p){var f=0;void 0!==t[p].type?("column"===t[p].type||"bar"===t[p].type?(s.series.length>1&&a.plotOptions.bar.horizontal&&console.warn("Horizontal bars are not supported in a mixed/combo chart. Please turn off `plotOptions.bar.horizontal`"),h.series.push(e),h.i.push(p),f++,i.globals.columnSeries=h.series):"area"===t[p].type?(o.series.push(e),o.i.push(p),f++):"line"===t[p].type?(r.series.push(e),r.i.push(p),f++):"scatter"===t[p].type?(n.series.push(e),n.i.push(p)):"bubble"===t[p].type?(l.series.push(e),l.i.push(p),f++):"candlestick"===t[p].type?(c.series.push(e),c.i.push(p),f++):"boxPlot"===t[p].type?(d.series.push(e),d.i.push(p),f++):"rangeBar"===t[p].type?(g.series.push(e),g.i.push(p),f++):"rangeArea"===t[p].type?(u.series.push(s.seriesRangeStart[p]),u.seriesRangeEnd.push(s.seriesRangeEnd[p]),u.i.push(p),f++):console.warn("You have specified an unrecognized chart type. Available types for this property are line/area/column/bar/scatter/bubble/candlestick/boxPlot/rangeBar/rangeArea"),f>1&&(s.comboCharts=!0)):(r.series.push(e),r.i.push(p));}));var p=new Ft(this.ctx,e),f=new kt(this.ctx,e);this.ctx.pie=new Lt(this.ctx);var x=new It(this.ctx);this.ctx.rangeBar=new Mt(this.ctx,e);var b=new Pt(this.ctx),v=[];if(s.comboCharts){if(o.series.length>0&&v.push(p.draw(o.series,"area",o.i)),h.series.length>0)if(i.config.chart.stacked){var m=new wt(this.ctx,e);v.push(m.draw(h.series,h.i));}else this.ctx.bar=new yt(this.ctx,e),v.push(this.ctx.bar.draw(h.series,h.i));if(u.series.length>0&&v.push(p.draw(u.series,"rangeArea",u.i,u.seriesRangeEnd)),r.series.length>0&&v.push(p.draw(r.series,"line",r.i)),c.series.length>0&&v.push(f.draw(c.series,"candlestick",c.i)),d.series.length>0&&v.push(f.draw(d.series,"boxPlot",d.i)),g.series.length>0&&v.push(this.ctx.rangeBar.draw(g.series,g.i)),n.series.length>0){var y=new Ft(this.ctx,e,!0);v.push(y.draw(n.series,"scatter",n.i));}if(l.series.length>0){var w=new Ft(this.ctx,e,!0);v.push(w.draw(l.series,"bubble",l.i));}}else switch(a.chart.type){case"line":v=p.draw(s.series,"line");break;case"area":v=p.draw(s.series,"area");break;case"bar":if(a.chart.stacked)v=new wt(this.ctx,e).draw(s.series);else this.ctx.bar=new yt(this.ctx,e),v=this.ctx.bar.draw(s.series);break;case"candlestick":v=new kt(this.ctx,e).draw(s.series,"candlestick");break;case"boxPlot":v=new kt(this.ctx,e).draw(s.series,a.chart.type);break;case"rangeBar":v=this.ctx.rangeBar.draw(s.series);break;case"rangeArea":v=p.draw(s.seriesRangeStart,"rangeArea",void 0,s.seriesRangeEnd);break;case"heatmap":v=new St(this.ctx,e).draw(s.series);break;case"treemap":v=new Dt(this.ctx,e).draw(s.series);break;case"pie":case"donut":case"polarArea":v=this.ctx.pie.draw(s.series);break;case"radialBar":v=x.draw(s.series);break;case"radar":v=b.draw(s.series);break;default:v=p.draw(s.series);}return v}},{key:"setSVGDimensions",value:function(){var t=this.w.globals,e=this.w.config;t.svgWidth=e.chart.width,t.svgHeight=e.chart.height;var i=x.getDimensions(this.el),a=e.chart.width.toString().split(/[0-9]+/g).pop();"%"===a?x.isNumber(i[0])&&(0===i[0].width&&(i=x.getDimensions(this.el.parentNode)),t.svgWidth=i[0]*parseInt(e.chart.width,10)/100):"px"!==a&&""!==a||(t.svgWidth=parseInt(e.chart.width,10));var s=e.chart.height.toString().split(/[0-9]+/g).pop();if("auto"!==t.svgHeight&&""!==t.svgHeight)if("%"===s){var r=x.getDimensions(this.el.parentNode);t.svgHeight=r[1]*parseInt(e.chart.height,10)/100;}else t.svgHeight=parseInt(e.chart.height,10);else t.axisCharts?t.svgHeight=t.svgWidth/1.61:t.svgHeight=t.svgWidth/1.2;if(t.svgWidth<0&&(t.svgWidth=0),t.svgHeight<0&&(t.svgHeight=0),m.setAttrs(t.dom.Paper.node,{width:t.svgWidth,height:t.svgHeight}),"%"!==s){var o=e.chart.sparkline.enabled?0:t.axisCharts?e.chart.parentHeightOffset:0;t.dom.Paper.node.parentNode.parentNode.style.minHeight=t.svgHeight+o+"px";}t.dom.elWrap.style.width=t.svgWidth+"px",t.dom.elWrap.style.height=t.svgHeight+"px";}},{key:"shiftGraphPosition",value:function(){var t=this.w.globals,e=t.translateY,i={transform:"translate("+t.translateX+", "+e+")"};m.setAttrs(t.dom.elGraphical.node,i);}},{key:"resizeNonAxisCharts",value:function(){var t=this.w,e=t.globals,i=0,a=t.config.chart.sparkline.enabled?1:15;a+=t.config.grid.padding.bottom,"top"!==t.config.legend.position&&"bottom"!==t.config.legend.position||!t.config.legend.show||t.config.legend.floating||(i=new lt(this.ctx).legendHelpers.getLegendBBox().clwh+10);var s=t.globals.dom.baseEl.querySelector(".apexcharts-radialbar, .apexcharts-pie"),r=2.05*t.globals.radialSize;if(s&&!t.config.chart.sparkline.enabled&&0!==t.config.plotOptions.radialBar.startAngle){var o=x.getBoundingClientRect(s);r=o.bottom;var n=o.bottom-o.top;r=Math.max(2.05*t.globals.radialSize,n);}var l=r+e.translateY+i+a;e.dom.elLegendForeign&&e.dom.elLegendForeign.setAttribute("height",l),t.config.chart.height&&String(t.config.chart.height).indexOf("%")>0||(e.dom.elWrap.style.height=l+"px",m.setAttrs(e.dom.Paper.node,{height:l}),e.dom.Paper.node.parentNode.parentNode.style.minHeight=l+"px");}},{key:"coreCalculations",value:function(){new U(this.ctx).init();}},{key:"resetGlobals",value:function(){var t=this,e=function(){return t.w.config.series.map((function(t){return []}))},i=new Y,a=this.w.globals;i.initGlobalVars(a),a.seriesXvalues=e(),a.seriesYvalues=e();}},{key:"isMultipleY",value:function(){if(this.w.config.yaxis.constructor===Array&&this.w.config.yaxis.length>1)return this.w.globals.isMultipleYAxis=!0,!0}},{key:"xySettings",value:function(){var t=null,e=this.w;if(e.globals.axisCharts){if("back"===e.config.xaxis.crosshairs.position)new Q(this.ctx).drawXCrosshairs();if("back"===e.config.yaxis[0].crosshairs.position)new Q(this.ctx).drawYCrosshairs();if("datetime"===e.config.xaxis.type&&void 0===e.config.xaxis.labels.formatter){this.ctx.timeScale=new Nt(this.ctx);var i=[];isFinite(e.globals.minX)&&isFinite(e.globals.maxX)&&!e.globals.isBarHorizontal?i=this.ctx.timeScale.calculateTimeScaleTicks(e.globals.minX,e.globals.maxX):e.globals.isBarHorizontal&&(i=this.ctx.timeScale.calculateTimeScaleTicks(e.globals.minY,e.globals.maxY)),this.ctx.timeScale.recalcDimensionsBasedOnFormat(i);}t=new y(this.ctx).getCalculatedRatios();}return t}},{key:"updateSourceChart",value:function(t){this.ctx.w.globals.selection=void 0,this.ctx.updateHelpers._updateOptions({chart:{selection:{xaxis:{min:t.w.globals.minX,max:t.w.globals.maxX}}}},!1,!1);}},{key:"setupBrushHandler",value:function(){var t=this,i=this.w;if(i.config.chart.brush.enabled&&"function"!=typeof i.config.chart.events.selection){var a=Array.isArray(i.config.chart.brush.targets)||[i.config.chart.brush.target];a.forEach((function(e){var i=ApexCharts.getChartByID(e);i.w.globals.brushSource=t.ctx,"function"!=typeof i.w.config.chart.events.zoomed&&(i.w.config.chart.events.zoomed=function(){t.updateSourceChart(i);}),"function"!=typeof i.w.config.chart.events.scrolled&&(i.w.config.chart.events.scrolled=function(){t.updateSourceChart(i);});})),i.config.chart.events.selection=function(t,s){a.forEach((function(t){var a=ApexCharts.getChartByID(t),r=x.clone(i.config.yaxis);if(i.config.chart.brush.autoScaleYaxis&&1===a.w.globals.series.length){var o=new _(a);r=o.autoScaleY(a,r,s);}var n=a.w.config.yaxis.reduce((function(t,i,s){return [].concat(u(t),[e(e({},a.w.config.yaxis[s]),{},{min:r[0].min,max:r[0].max})])}),[]);a.ctx.updateHelpers._updateOptions({xaxis:{min:s.xaxis.min,max:s.xaxis.max},yaxis:n},!1,!1,!1,!1);}));};}}}]),t}(),Bt=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"_updateOptions",value:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return new Promise((function(n){var l=[e.ctx];r&&(l=e.ctx.getSyncedCharts()),e.ctx.w.globals.isExecCalled&&(l=[e.ctx],e.ctx.w.globals.isExecCalled=!1),l.forEach((function(r,h){var c=r.w;if(c.globals.shouldAnimate=s,a||(c.globals.resized=!0,c.globals.dataChanged=!0,s&&r.series.getPreviousPaths()),t&&"object"===i(t)&&(r.config=new E(t),t=y.extendArrayProps(r.config,t,c),r.w.globals.chartID!==e.ctx.w.globals.chartID&&delete t.series,c.config=x.extend(c.config,t),o&&(c.globals.lastXAxis=t.xaxis?x.clone(t.xaxis):[],c.globals.lastYAxis=t.yaxis?x.clone(t.yaxis):[],c.globals.initialConfig=x.extend({},c.config),c.globals.initialSeries=x.clone(c.config.series),t.series))){for(var d=0;d<c.globals.collapsedSeriesIndices.length;d++){var g=c.config.series[c.globals.collapsedSeriesIndices[d]];c.globals.collapsedSeries[d].data=c.globals.axisCharts?g.data.slice():g;}for(var u=0;u<c.globals.ancillaryCollapsedSeriesIndices.length;u++){var p=c.config.series[c.globals.ancillaryCollapsedSeriesIndices[u]];c.globals.ancillaryCollapsedSeries[u].data=c.globals.axisCharts?p.data.slice():p;}r.series.emptyCollapsedSeries(c.config.series);}return r.update(t).then((function(){h===l.length-1&&n(r);}))}));}))}},{key:"_updateSeries",value:function(t,e){var i=this,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return new Promise((function(s){var r,o=i.w;return o.globals.shouldAnimate=e,o.globals.dataChanged=!0,e&&i.ctx.series.getPreviousPaths(),o.globals.axisCharts?(0===(r=t.map((function(t,e){return i._extendSeries(t,e)}))).length&&(r=[{data:[]}]),o.config.series=r):o.config.series=t.slice(),a&&(o.globals.initialConfig.series=x.clone(o.config.series),o.globals.initialSeries=x.clone(o.config.series)),i.ctx.update().then((function(){s(i.ctx);}))}))}},{key:"_extendSeries",value:function(t,i){var a=this.w,s=a.config.series[i];return e(e({},a.config.series[i]),{},{name:t.name?t.name:null==s?void 0:s.name,color:t.color?t.color:null==s?void 0:s.color,type:t.type?t.type:null==s?void 0:s.type,group:t.group?t.group:null==s?void 0:s.group,data:t.data?t.data:null==s?void 0:s.data,zIndex:void 0!==t.zIndex?t.zIndex:i})}},{key:"toggleDataPointSelection",value:function(t,e){var i=this.w,a=null,s=".apexcharts-series[data\\:realIndex='".concat(t,"']");return i.globals.axisCharts?a=i.globals.dom.Paper.select("".concat(s," path[j='").concat(e,"'], ").concat(s," circle[j='").concat(e,"'], ").concat(s," rect[j='").concat(e,"']")).members[0]:void 0===e&&(a=i.globals.dom.Paper.select("".concat(s," path[j='").concat(t,"']")).members[0],"pie"!==i.config.chart.type&&"polarArea"!==i.config.chart.type&&"donut"!==i.config.chart.type||this.ctx.pie.pieClicked(t)),a?(new m(this.ctx).pathMouseDown(a,null),a.node?a.node:null):(console.warn("toggleDataPointSelection: Element not found"),null)}},{key:"forceXAxisUpdate",value:function(t){var e=this.w;if(["min","max"].forEach((function(i){void 0!==t.xaxis[i]&&(e.config.xaxis[i]=t.xaxis[i],e.globals.lastXAxis[i]=t.xaxis[i]);})),t.xaxis.categories&&t.xaxis.categories.length&&(e.config.xaxis.categories=t.xaxis.categories),e.config.xaxis.convertedCatToNumeric){var i=new X(t);t=i.convertCatToNumericXaxis(t,this.ctx);}return t}},{key:"forceYAxisUpdate",value:function(t){return t.chart&&t.chart.stacked&&"100%"===t.chart.stackType&&(Array.isArray(t.yaxis)?t.yaxis.forEach((function(e,i){t.yaxis[i].min=0,t.yaxis[i].max=100;})):(t.yaxis.min=0,t.yaxis.max=100)),t}},{key:"revertDefaultAxisMinMax",value:function(t){var e=this,i=this.w,a=i.globals.lastXAxis,s=i.globals.lastYAxis;t&&t.xaxis&&(a=t.xaxis),t&&t.yaxis&&(s=t.yaxis),i.config.xaxis.min=a.min,i.config.xaxis.max=a.max;var r=function(t){void 0!==s[t]&&(i.config.yaxis[t].min=s[t].min,i.config.yaxis[t].max=s[t].max);};i.config.yaxis.map((function(t,a){i.globals.zoomed||void 0!==s[a]?r(a):void 0!==e.ctx.opts.yaxis[a]&&(t.min=e.ctx.opts.yaxis[a].min,t.max=e.ctx.opts.yaxis[a].max);}));}}]),t}();Rt="undefined"!=typeof window?window:void 0,Ht=function(t,e){var a=(void 0!==this?this:t).SVG=function(t){if(a.supported)return t=new a.Doc(t),a.parser.draw||a.prepare(),t};if(a.ns="http://www.w3.org/2000/svg",a.xmlns="http://www.w3.org/2000/xmlns/",a.xlink="http://www.w3.org/1999/xlink",a.svgjs="http://svgjs.dev",a.supported=!0,!a.supported)return !1;a.did=1e3,a.eid=function(t){return "Svgjs"+d(t)+a.did++},a.create=function(t){var i=e.createElementNS(this.ns,t);return i.setAttribute("id",this.eid(t)),i},a.extend=function(){var t,e;e=(t=[].slice.call(arguments)).pop();for(var i=t.length-1;i>=0;i--)if(t[i])for(var s in e)t[i].prototype[s]=e[s];a.Set&&a.Set.inherit&&a.Set.inherit();},a.invent=function(t){var e="function"==typeof t.create?t.create:function(){this.constructor.call(this,a.create(t.create));};return t.inherit&&(e.prototype=new t.inherit),t.extend&&a.extend(e,t.extend),t.construct&&a.extend(t.parent||a.Container,t.construct),e},a.adopt=function(e){return e?e.instance?e.instance:((i="svg"==e.nodeName?e.parentNode instanceof t.SVGElement?new a.Nested:new a.Doc:"linearGradient"==e.nodeName?new a.Gradient("linear"):"radialGradient"==e.nodeName?new a.Gradient("radial"):a[d(e.nodeName)]?new(a[d(e.nodeName)]):new a.Element(e)).type=e.nodeName,i.node=e,e.instance=i,i instanceof a.Doc&&i.namespace().defs(),i.setData(JSON.parse(e.getAttribute("svgjs:data"))||{}),i):null;var i;},a.prepare=function(){var t=e.getElementsByTagName("body")[0],i=(t?new a.Doc(t):a.adopt(e.documentElement).nested()).size(2,0);a.parser={body:t||e.documentElement,draw:i.style("opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden").node,poly:i.polyline().node,path:i.path().node,native:a.create("svg")};},a.parser={native:a.create("svg")},e.addEventListener("DOMContentLoaded",(function(){a.parser.draw||a.prepare();}),!1),a.regex={numberAndUnit:/^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i,hex:/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgb:/rgb\((\d+),(\d+),(\d+)\)/,reference:/#([a-z0-9\-_]+)/i,transforms:/\)\s*,?\s*/,whitespace:/\s/g,isHex:/^#[a-f0-9]{3,6}$/i,isRgb:/^rgb\(/,isCss:/[^:]+:[^;]+;?/,isBlank:/^(\s+)?$/,isNumber:/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,isPercent:/^-?[\d\.]+%$/,isImage:/\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i,delimiter:/[\s,]+/,hyphen:/([^e])\-/gi,pathLetters:/[MLHVCSQTAZ]/gi,isPathLetter:/[MLHVCSQTAZ]/i,numbersWithDots:/((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi,dots:/\./g},a.utils={map:function(t,e){for(var i=t.length,a=[],s=0;s<i;s++)a.push(e(t[s]));return a},filter:function(t,e){for(var i=t.length,a=[],s=0;s<i;s++)e(t[s])&&a.push(t[s]);return a},filterSVGElements:function(e){return this.filter(e,(function(e){return e instanceof t.SVGElement}))}},a.defaults={attrs:{"fill-opacity":1,"stroke-opacity":1,"stroke-width":0,"stroke-linejoin":"miter","stroke-linecap":"butt",fill:"#000000",stroke:"#000000",opacity:1,x:0,y:0,cx:0,cy:0,width:0,height:0,r:0,rx:0,ry:0,offset:0,"stop-opacity":1,"stop-color":"#000000","font-size":16,"font-family":"Helvetica, Arial, sans-serif","text-anchor":"start"}},a.Color=function(t){var e,s;this.r=0,this.g=0,this.b=0,t&&("string"==typeof t?a.regex.isRgb.test(t)?(e=a.regex.rgb.exec(t.replace(a.regex.whitespace,"")),this.r=parseInt(e[1]),this.g=parseInt(e[2]),this.b=parseInt(e[3])):a.regex.isHex.test(t)&&(e=a.regex.hex.exec(4==(s=t).length?["#",s.substring(1,2),s.substring(1,2),s.substring(2,3),s.substring(2,3),s.substring(3,4),s.substring(3,4)].join(""):s),this.r=parseInt(e[1],16),this.g=parseInt(e[2],16),this.b=parseInt(e[3],16)):"object"===i(t)&&(this.r=t.r,this.g=t.g,this.b=t.b));},a.extend(a.Color,{toString:function(){return this.toHex()},toHex:function(){return "#"+g(this.r)+g(this.g)+g(this.b)},toRgb:function(){return "rgb("+[this.r,this.g,this.b].join()+")"},brightness:function(){return this.r/255*.3+this.g/255*.59+this.b/255*.11},morph:function(t){return this.destination=new a.Color(t),this},at:function(t){return this.destination?(t=t<0?0:t>1?1:t,new a.Color({r:~~(this.r+(this.destination.r-this.r)*t),g:~~(this.g+(this.destination.g-this.g)*t),b:~~(this.b+(this.destination.b-this.b)*t)})):this}}),a.Color.test=function(t){return t+="",a.regex.isHex.test(t)||a.regex.isRgb.test(t)},a.Color.isRgb=function(t){return t&&"number"==typeof t.r&&"number"==typeof t.g&&"number"==typeof t.b},a.Color.isColor=function(t){return a.Color.isRgb(t)||a.Color.test(t)},a.Array=function(t,e){0==(t=(t||[]).valueOf()).length&&e&&(t=e.valueOf()),this.value=this.parse(t);},a.extend(a.Array,{toString:function(){return this.value.join(" ")},valueOf:function(){return this.value},parse:function(t){return t=t.valueOf(),Array.isArray(t)?t:this.split(t)}}),a.PointArray=function(t,e){a.Array.call(this,t,e||[[0,0]]);},a.PointArray.prototype=new a.Array,a.PointArray.prototype.constructor=a.PointArray;for(var s={M:function(t,e,i){return e.x=i.x=t[0],e.y=i.y=t[1],["M",e.x,e.y]},L:function(t,e){return e.x=t[0],e.y=t[1],["L",t[0],t[1]]},H:function(t,e){return e.x=t[0],["H",t[0]]},V:function(t,e){return e.y=t[0],["V",t[0]]},C:function(t,e){return e.x=t[4],e.y=t[5],["C",t[0],t[1],t[2],t[3],t[4],t[5]]},Q:function(t,e){return e.x=t[2],e.y=t[3],["Q",t[0],t[1],t[2],t[3]]},S:function(t,e){return e.x=t[2],e.y=t[3],["S",t[0],t[1],t[2],t[3]]},Z:function(t,e,i){return e.x=i.x,e.y=i.y,["Z"]}},r="mlhvqtcsaz".split(""),o=0,n=r.length;o<n;++o)s[r[o]]=function(t){return function(e,i,a){if("H"==t)e[0]=e[0]+i.x;else if("V"==t)e[0]=e[0]+i.y;else if("A"==t)e[5]=e[5]+i.x,e[6]=e[6]+i.y;else for(var r=0,o=e.length;r<o;++r)e[r]=e[r]+(r%2?i.y:i.x);if(s&&"function"==typeof s[t])return s[t](e,i,a)}}(r[o].toUpperCase());a.PathArray=function(t,e){a.Array.call(this,t,e||[["M",0,0]]);},a.PathArray.prototype=new a.Array,a.PathArray.prototype.constructor=a.PathArray,a.extend(a.PathArray,{toString:function(){return function(t){for(var e=0,i=t.length,a="";e<i;e++)a+=t[e][0],null!=t[e][1]&&(a+=t[e][1],null!=t[e][2]&&(a+=" ",a+=t[e][2],null!=t[e][3]&&(a+=" ",a+=t[e][3],a+=" ",a+=t[e][4],null!=t[e][5]&&(a+=" ",a+=t[e][5],a+=" ",a+=t[e][6],null!=t[e][7]&&(a+=" ",a+=t[e][7])))));return a+" "}(this.value)},move:function(t,e){var i=this.bbox();return i.x,i.y,this},at:function(t){if(!this.destination)return this;for(var e=this.value,i=this.destination.value,s=[],r=new a.PathArray,o=0,n=e.length;o<n;o++){s[o]=[e[o][0]];for(var l=1,h=e[o].length;l<h;l++)s[o][l]=e[o][l]+(i[o][l]-e[o][l])*t;"A"===s[o][0]&&(s[o][4]=+(0!=s[o][4]),s[o][5]=+(0!=s[o][5]));}return r.value=s,r},parse:function(t){if(t instanceof a.PathArray)return t.valueOf();var e,i={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7,Z:0};t="string"==typeof t?t.replace(a.regex.numbersWithDots,h).replace(a.regex.pathLetters," $& ").replace(a.regex.hyphen,"$1 -").trim().split(a.regex.delimiter):t.reduce((function(t,e){return [].concat.call(t,e)}),[]);var r=[],o=new a.Point,n=new a.Point,l=0,c=t.length;do{a.regex.isPathLetter.test(t[l])?(e=t[l],++l):"M"==e?e="L":"m"==e&&(e="l"),r.push(s[e].call(null,t.slice(l,l+=i[e.toUpperCase()]).map(parseFloat),o,n));}while(c>l);return r},bbox:function(){return a.parser.draw||a.prepare(),a.parser.path.setAttribute("d",this.toString()),a.parser.path.getBBox()}}),a.Number=a.invent({create:function(t,e){this.value=0,this.unit=e||"","number"==typeof t?this.value=isNaN(t)?0:isFinite(t)?t:t<0?-34e37:34e37:"string"==typeof t?(e=t.match(a.regex.numberAndUnit))&&(this.value=parseFloat(e[1]),"%"==e[5]?this.value/=100:"s"==e[5]&&(this.value*=1e3),this.unit=e[5]):t instanceof a.Number&&(this.value=t.valueOf(),this.unit=t.unit);},extend:{toString:function(){return ("%"==this.unit?~~(1e8*this.value)/1e6:"s"==this.unit?this.value/1e3:this.value)+this.unit},toJSON:function(){return this.toString()},valueOf:function(){return this.value},plus:function(t){return t=new a.Number(t),new a.Number(this+t,this.unit||t.unit)},minus:function(t){return t=new a.Number(t),new a.Number(this-t,this.unit||t.unit)},times:function(t){return t=new a.Number(t),new a.Number(this*t,this.unit||t.unit)},divide:function(t){return t=new a.Number(t),new a.Number(this/t,this.unit||t.unit)},to:function(t){var e=new a.Number(this);return "string"==typeof t&&(e.unit=t),e},morph:function(t){return this.destination=new a.Number(t),t.relative&&(this.destination.value+=this.value),this},at:function(t){return this.destination?new a.Number(this.destination).minus(this).times(t).plus(this):this}}}),a.Element=a.invent({create:function(t){this._stroke=a.defaults.attrs.stroke,this._event=null,this.dom={},(this.node=t)&&(this.type=t.nodeName,this.node.instance=this,this._stroke=t.getAttribute("stroke")||this._stroke);},extend:{x:function(t){return this.attr("x",t)},y:function(t){return this.attr("y",t)},cx:function(t){return null==t?this.x()+this.width()/2:this.x(t-this.width()/2)},cy:function(t){return null==t?this.y()+this.height()/2:this.y(t-this.height()/2)},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},width:function(t){return this.attr("width",t)},height:function(t){return this.attr("height",t)},size:function(t,e){var i=u(this,t,e);return this.width(new a.Number(i.width)).height(new a.Number(i.height))},clone:function(t){this.writeDataToDom();var e=x(this.node.cloneNode(!0));return t?t.add(e):this.after(e),e},remove:function(){return this.parent()&&this.parent().removeElement(this),this},replace:function(t){return this.after(t).remove(),t},addTo:function(t){return t.put(this)},putIn:function(t){return t.add(this)},id:function(t){return this.attr("id",t)},show:function(){return this.style("display","")},hide:function(){return this.style("display","none")},visible:function(){return "none"!=this.style("display")},toString:function(){return this.attr("id")},classes:function(){var t=this.attr("class");return null==t?[]:t.trim().split(a.regex.delimiter)},hasClass:function(t){return -1!=this.classes().indexOf(t)},addClass:function(t){if(!this.hasClass(t)){var e=this.classes();e.push(t),this.attr("class",e.join(" "));}return this},removeClass:function(t){return this.hasClass(t)&&this.attr("class",this.classes().filter((function(e){return e!=t})).join(" ")),this},toggleClass:function(t){return this.hasClass(t)?this.removeClass(t):this.addClass(t)},reference:function(t){return a.get(this.attr(t))},parent:function(e){var i=this;if(!i.node.parentNode)return null;if(i=a.adopt(i.node.parentNode),!e)return i;for(;i&&i.node instanceof t.SVGElement;){if("string"==typeof e?i.matches(e):i instanceof e)return i;if(!i.node.parentNode||"#document"==i.node.parentNode.nodeName)return null;i=a.adopt(i.node.parentNode);}},doc:function(){return this instanceof a.Doc?this:this.parent(a.Doc)},parents:function(t){var e=[],i=this;do{if(!(i=i.parent(t))||!i.node)break;e.push(i);}while(i.parent);return e},matches:function(t){return function(t,e){return (t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||t.oMatchesSelector).call(t,e)}(this.node,t)},native:function(){return this.node},svg:function(t){var i=e.createElement("svg");if(!(t&&this instanceof a.Parent))return i.appendChild(t=e.createElement("svg")),this.writeDataToDom(),t.appendChild(this.node.cloneNode(!0)),i.innerHTML.replace(/^<svg>/,"").replace(/<\/svg>$/,"");i.innerHTML="<svg>"+t.replace(/\n/,"").replace(/<([\w:-]+)([^<]+?)\/>/g,"<$1$2></$1>")+"</svg>";for(var s=0,r=i.firstChild.childNodes.length;s<r;s++)this.node.appendChild(i.firstChild.firstChild);return this},writeDataToDom:function(){return (this.each||this.lines)&&(this.each?this:this.lines()).each((function(){this.writeDataToDom();})),this.node.removeAttribute("svgjs:data"),Object.keys(this.dom).length&&this.node.setAttribute("svgjs:data",JSON.stringify(this.dom)),this},setData:function(t){return this.dom=t,this},is:function(t){return function(t,e){return t instanceof e}(this,t)}}}),a.easing={"-":function(t){return t},"<>":function(t){return -Math.cos(t*Math.PI)/2+.5},">":function(t){return Math.sin(t*Math.PI/2)},"<":function(t){return 1-Math.cos(t*Math.PI/2)}},a.morph=function(t){return function(e,i){return new a.MorphObj(e,i).at(t)}},a.Situation=a.invent({create:function(t){this.init=!1,this.reversed=!1,this.reversing=!1,this.duration=new a.Number(t.duration).valueOf(),this.delay=new a.Number(t.delay).valueOf(),this.start=+new Date+this.delay,this.finish=this.start+this.duration,this.ease=t.ease,this.loop=0,this.loops=!1,this.animations={},this.attrs={},this.styles={},this.transforms=[],this.once={};}}),a.FX=a.invent({create:function(t){this._target=t,this.situations=[],this.active=!1,this.situation=null,this.paused=!1,this.lastPos=0,this.pos=0,this.absPos=0,this._speed=1;},extend:{animate:function(t,e,s){"object"===i(t)&&(e=t.ease,s=t.delay,t=t.duration);var r=new a.Situation({duration:t||1e3,delay:s||0,ease:a.easing[e||"-"]||e});return this.queue(r),this},target:function(t){return t&&t instanceof a.Element?(this._target=t,this):this._target},timeToAbsPos:function(t){return (t-this.situation.start)/(this.situation.duration/this._speed)},absPosToTime:function(t){return this.situation.duration/this._speed*t+this.situation.start},startAnimFrame:function(){this.stopAnimFrame(),this.animationFrame=t.requestAnimationFrame(function(){this.step();}.bind(this));},stopAnimFrame:function(){t.cancelAnimationFrame(this.animationFrame);},start:function(){return !this.active&&this.situation&&(this.active=!0,this.startCurrent()),this},startCurrent:function(){return this.situation.start=+new Date+this.situation.delay/this._speed,this.situation.finish=this.situation.start+this.situation.duration/this._speed,this.initAnimations().step()},queue:function(t){return ("function"==typeof t||t instanceof a.Situation)&&this.situations.push(t),this.situation||(this.situation=this.situations.shift()),this},dequeue:function(){return this.stop(),this.situation=this.situations.shift(),this.situation&&(this.situation instanceof a.Situation?this.start():this.situation.call(this)),this},initAnimations:function(){var t,e=this.situation;if(e.init)return this;for(var i in e.animations){t=this.target()[i](),Array.isArray(t)||(t=[t]),Array.isArray(e.animations[i])||(e.animations[i]=[e.animations[i]]);for(var s=t.length;s--;)e.animations[i][s]instanceof a.Number&&(t[s]=new a.Number(t[s])),e.animations[i][s]=t[s].morph(e.animations[i][s]);}for(var i in e.attrs)e.attrs[i]=new a.MorphObj(this.target().attr(i),e.attrs[i]);for(var i in e.styles)e.styles[i]=new a.MorphObj(this.target().style(i),e.styles[i]);return e.initialTransformation=this.target().matrixify(),e.init=!0,this},clearQueue:function(){return this.situations=[],this},clearCurrent:function(){return this.situation=null,this},stop:function(t,e){var i=this.active;return this.active=!1,e&&this.clearQueue(),t&&this.situation&&(!i&&this.startCurrent(),this.atEnd()),this.stopAnimFrame(),this.clearCurrent()},after:function(t){var e=this.last();return this.target().on("finished.fx",(function i(a){a.detail.situation==e&&(t.call(this,e),this.off("finished.fx",i));})),this._callStart()},during:function(t){var e=this.last(),i=function(i){i.detail.situation==e&&t.call(this,i.detail.pos,a.morph(i.detail.pos),i.detail.eased,e);};return this.target().off("during.fx",i).on("during.fx",i),this.after((function(){this.off("during.fx",i);})),this._callStart()},afterAll:function(t){var e=function e(i){t.call(this),this.off("allfinished.fx",e);};return this.target().off("allfinished.fx",e).on("allfinished.fx",e),this._callStart()},last:function(){return this.situations.length?this.situations[this.situations.length-1]:this.situation},add:function(t,e,i){return this.last()[i||"animations"][t]=e,this._callStart()},step:function(t){var e,i,a;t||(this.absPos=this.timeToAbsPos(+new Date)),!1!==this.situation.loops?(e=Math.max(this.absPos,0),i=Math.floor(e),!0===this.situation.loops||i<this.situation.loops?(this.pos=e-i,a=this.situation.loop,this.situation.loop=i):(this.absPos=this.situation.loops,this.pos=1,a=this.situation.loop-1,this.situation.loop=this.situation.loops),this.situation.reversing&&(this.situation.reversed=this.situation.reversed!=Boolean((this.situation.loop-a)%2))):(this.absPos=Math.min(this.absPos,1),this.pos=this.absPos),this.pos<0&&(this.pos=0),this.situation.reversed&&(this.pos=1-this.pos);var s=this.situation.ease(this.pos);for(var r in this.situation.once)r>this.lastPos&&r<=s&&(this.situation.once[r].call(this.target(),this.pos,s),delete this.situation.once[r]);return this.active&&this.target().fire("during",{pos:this.pos,eased:s,fx:this,situation:this.situation}),this.situation?(this.eachAt(),1==this.pos&&!this.situation.reversed||this.situation.reversed&&0==this.pos?(this.stopAnimFrame(),this.target().fire("finished",{fx:this,situation:this.situation}),this.situations.length||(this.target().fire("allfinished"),this.situations.length||(this.target().off(".fx"),this.active=!1)),this.active?this.dequeue():this.clearCurrent()):!this.paused&&this.active&&this.startAnimFrame(),this.lastPos=s,this):this},eachAt:function(){var t,e=this,i=this.target(),s=this.situation;for(var r in s.animations)t=[].concat(s.animations[r]).map((function(t){return "string"!=typeof t&&t.at?t.at(s.ease(e.pos),e.pos):t})),i[r].apply(i,t);for(var r in s.attrs)t=[r].concat(s.attrs[r]).map((function(t){return "string"!=typeof t&&t.at?t.at(s.ease(e.pos),e.pos):t})),i.attr.apply(i,t);for(var r in s.styles)t=[r].concat(s.styles[r]).map((function(t){return "string"!=typeof t&&t.at?t.at(s.ease(e.pos),e.pos):t})),i.style.apply(i,t);if(s.transforms.length){t=s.initialTransformation,r=0;for(var o=s.transforms.length;r<o;r++){var n=s.transforms[r];n instanceof a.Matrix?t=n.relative?t.multiply((new a.Matrix).morph(n).at(s.ease(this.pos))):t.morph(n).at(s.ease(this.pos)):(n.relative||n.undo(t.extract()),t=t.multiply(n.at(s.ease(this.pos))));}i.matrix(t);}return this},once:function(t,e,i){var a=this.last();return i||(t=a.ease(t)),a.once[t]=e,this},_callStart:function(){return setTimeout(function(){this.start();}.bind(this),0),this}},parent:a.Element,construct:{animate:function(t,e,i){return (this.fx||(this.fx=new a.FX(this))).animate(t,e,i)},delay:function(t){return (this.fx||(this.fx=new a.FX(this))).delay(t)},stop:function(t,e){return this.fx&&this.fx.stop(t,e),this},finish:function(){return this.fx&&this.fx.finish(),this}}}),a.MorphObj=a.invent({create:function(t,e){return a.Color.isColor(e)?new a.Color(t).morph(e):a.regex.delimiter.test(t)?a.regex.pathLetters.test(t)?new a.PathArray(t).morph(e):new a.Array(t).morph(e):a.regex.numberAndUnit.test(e)?new a.Number(t).morph(e):(this.value=t,void(this.destination=e))},extend:{at:function(t,e){return e<1?this.value:this.destination},valueOf:function(){return this.value}}}),a.extend(a.FX,{attr:function(t,e,a){if("object"===i(t))for(var s in t)this.attr(s,t[s]);else this.add(t,e,"attrs");return this},plot:function(t,e,i,a){return 4==arguments.length?this.plot([t,e,i,a]):this.add("plot",new(this.target().morphArray)(t))}}),a.Box=a.invent({create:function(t,e,s,r){if(!("object"!==i(t)||t instanceof a.Element))return a.Box.call(this,null!=t.left?t.left:t.x,null!=t.top?t.top:t.y,t.width,t.height);var o;4==arguments.length&&(this.x=t,this.y=e,this.width=s,this.height=r),null==(o=this).x&&(o.x=0,o.y=0,o.width=0,o.height=0),o.w=o.width,o.h=o.height,o.x2=o.x+o.width,o.y2=o.y+o.height,o.cx=o.x+o.width/2,o.cy=o.y+o.height/2;}}),a.BBox=a.invent({create:function(t){if(a.Box.apply(this,[].slice.call(arguments)),t instanceof a.Element){var i;try{if(!e.documentElement.contains){for(var s=t.node;s.parentNode;)s=s.parentNode;if(s!=e)throw new Error("Element not in the dom")}i=t.node.getBBox();}catch(e){if(t instanceof a.Shape){a.parser.draw||a.prepare();var r=t.clone(a.parser.draw.instance).show();r&&r.node&&"function"==typeof r.node.getBBox&&(i=r.node.getBBox()),r&&"function"==typeof r.remove&&r.remove();}else i={x:t.node.clientLeft,y:t.node.clientTop,width:t.node.clientWidth,height:t.node.clientHeight};}a.Box.call(this,i);}},inherit:a.Box,parent:a.Element,construct:{bbox:function(){return new a.BBox(this)}}}),a.BBox.prototype.constructor=a.BBox,a.Matrix=a.invent({create:function(t){var e=f([1,0,0,1,0,0]);t=null===t?e:t instanceof a.Element?t.matrixify():"string"==typeof t?f(t.split(a.regex.delimiter).map(parseFloat)):6==arguments.length?f([].slice.call(arguments)):Array.isArray(t)?f(t):t&&"object"===i(t)?t:e;for(var s=v.length-1;s>=0;--s)this[v[s]]=null!=t[v[s]]?t[v[s]]:e[v[s]];},extend:{extract:function(){var t=p(this,0,1);p(this,1,0);var e=180/Math.PI*Math.atan2(t.y,t.x)-90;return {x:this.e,y:this.f,transformedX:(this.e*Math.cos(e*Math.PI/180)+this.f*Math.sin(e*Math.PI/180))/Math.sqrt(this.a*this.a+this.b*this.b),transformedY:(this.f*Math.cos(e*Math.PI/180)+this.e*Math.sin(-e*Math.PI/180))/Math.sqrt(this.c*this.c+this.d*this.d),rotation:e,a:this.a,b:this.b,c:this.c,d:this.d,e:this.e,f:this.f,matrix:new a.Matrix(this)}},clone:function(){return new a.Matrix(this)},morph:function(t){return this.destination=new a.Matrix(t),this},multiply:function(t){return new a.Matrix(this.native().multiply(function(t){return t instanceof a.Matrix||(t=new a.Matrix(t)),t}(t).native()))},inverse:function(){return new a.Matrix(this.native().inverse())},translate:function(t,e){return new a.Matrix(this.native().translate(t||0,e||0))},native:function(){for(var t=a.parser.native.createSVGMatrix(),e=v.length-1;e>=0;e--)t[v[e]]=this[v[e]];return t},toString:function(){return "matrix("+b(this.a)+","+b(this.b)+","+b(this.c)+","+b(this.d)+","+b(this.e)+","+b(this.f)+")"}},parent:a.Element,construct:{ctm:function(){return new a.Matrix(this.node.getCTM())},screenCTM:function(){if(this instanceof a.Nested){var t=this.rect(1,1),e=t.node.getScreenCTM();return t.remove(),new a.Matrix(e)}return new a.Matrix(this.node.getScreenCTM())}}}),a.Point=a.invent({create:function(t,e){var a;a=Array.isArray(t)?{x:t[0],y:t[1]}:"object"===i(t)?{x:t.x,y:t.y}:null!=t?{x:t,y:null!=e?e:t}:{x:0,y:0},this.x=a.x,this.y=a.y;},extend:{clone:function(){return new a.Point(this)},morph:function(t,e){return this.destination=new a.Point(t,e),this}}}),a.extend(a.Element,{point:function(t,e){return new a.Point(t,e).transform(this.screenCTM().inverse())}}),a.extend(a.Element,{attr:function(t,e,s){if(null==t){for(t={},s=(e=this.node.attributes).length-1;s>=0;s--)t[e[s].nodeName]=a.regex.isNumber.test(e[s].nodeValue)?parseFloat(e[s].nodeValue):e[s].nodeValue;return t}if("object"===i(t))for(var r in t)this.attr(r,t[r]);else if(null===e)this.node.removeAttribute(t);else {if(null==e)return null==(e=this.node.getAttribute(t))?a.defaults.attrs[t]:a.regex.isNumber.test(e)?parseFloat(e):e;"stroke-width"==t?this.attr("stroke",parseFloat(e)>0?this._stroke:null):"stroke"==t&&(this._stroke=e),"fill"!=t&&"stroke"!=t||(a.regex.isImage.test(e)&&(e=this.doc().defs().image(e,0,0)),e instanceof a.Image&&(e=this.doc().defs().pattern(0,0,(function(){this.add(e);})))),"number"==typeof e?e=new a.Number(e):a.Color.isColor(e)?e=new a.Color(e):Array.isArray(e)&&(e=new a.Array(e)),"leading"==t?this.leading&&this.leading(e):"string"==typeof s?this.node.setAttributeNS(s,t,e.toString()):this.node.setAttribute(t,e.toString()),!this.rebuild||"font-size"!=t&&"x"!=t||this.rebuild(t,e);}return this}}),a.extend(a.Element,{transform:function(t,e){var s;return "object"!==i(t)?(s=new a.Matrix(this).extract(),"string"==typeof t?s[t]:s):(s=new a.Matrix(this),e=!!e||!!t.relative,null!=t.a&&(s=e?s.multiply(new a.Matrix(t)):new a.Matrix(t)),this.attr("transform",s))}}),a.extend(a.Element,{untransform:function(){return this.attr("transform",null)},matrixify:function(){return (this.attr("transform")||"").split(a.regex.transforms).slice(0,-1).map((function(t){var e=t.trim().split("(");return [e[0],e[1].split(a.regex.delimiter).map((function(t){return parseFloat(t)}))]})).reduce((function(t,e){return "matrix"==e[0]?t.multiply(f(e[1])):t[e[0]].apply(t,e[1])}),new a.Matrix)},toParent:function(t){if(this==t)return this;var e=this.screenCTM(),i=t.screenCTM().inverse();return this.addTo(t).untransform().transform(i.multiply(e)),this},toDoc:function(){return this.toParent(this.doc())}}),a.Transformation=a.invent({create:function(t,e){if(arguments.length>1&&"boolean"!=typeof e)return this.constructor.call(this,[].slice.call(arguments));if(Array.isArray(t))for(var a=0,s=this.arguments.length;a<s;++a)this[this.arguments[a]]=t[a];else if(t&&"object"===i(t))for(a=0,s=this.arguments.length;a<s;++a)this[this.arguments[a]]=t[this.arguments[a]];this.inversed=!1,!0===e&&(this.inversed=!0);}}),a.Translate=a.invent({parent:a.Matrix,inherit:a.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments));},extend:{arguments:["transformedX","transformedY"],method:"translate"}}),a.extend(a.Element,{style:function(t,e){if(0==arguments.length)return this.node.style.cssText||"";if(arguments.length<2)if("object"===i(t))for(var s in t)this.style(s,t[s]);else {if(!a.regex.isCss.test(t))return this.node.style[c(t)];for(t=t.split(/\s*;\s*/).filter((function(t){return !!t})).map((function(t){return t.split(/\s*:\s*/)}));e=t.pop();)this.style(e[0],e[1]);}else this.node.style[c(t)]=null===e||a.regex.isBlank.test(e)?"":e;return this}}),a.Parent=a.invent({create:function(t){this.constructor.call(this,t);},inherit:a.Element,extend:{children:function(){return a.utils.map(a.utils.filterSVGElements(this.node.childNodes),(function(t){return a.adopt(t)}))},add:function(t,e){return null==e?this.node.appendChild(t.node):t.node!=this.node.childNodes[e]&&this.node.insertBefore(t.node,this.node.childNodes[e]),this},put:function(t,e){return this.add(t,e),t},has:function(t){return this.index(t)>=0},index:function(t){return [].slice.call(this.node.childNodes).indexOf(t.node)},get:function(t){return a.adopt(this.node.childNodes[t])},first:function(){return this.get(0)},last:function(){return this.get(this.node.childNodes.length-1)},each:function(t,e){for(var i=this.children(),s=0,r=i.length;s<r;s++)i[s]instanceof a.Element&&t.apply(i[s],[s,i]),e&&i[s]instanceof a.Container&&i[s].each(t,e);return this},removeElement:function(t){return this.node.removeChild(t.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,this},defs:function(){return this.doc().defs()}}}),a.extend(a.Parent,{ungroup:function(t,e){return 0===e||this instanceof a.Defs||this.node==a.parser.draw||(t=t||(this instanceof a.Doc?this:this.parent(a.Parent)),e=e||1/0,this.each((function(){return this instanceof a.Defs?this:this instanceof a.Parent?this.ungroup(t,e-1):this.toParent(t)})),this.node.firstChild||this.remove()),this},flatten:function(t,e){return this.ungroup(t,e)}}),a.Container=a.invent({create:function(t){this.constructor.call(this,t);},inherit:a.Parent}),a.ViewBox=a.invent({parent:a.Container,construct:{}}),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchmove","touchleave","touchend","touchcancel"].forEach((function(t){a.Element.prototype[t]=function(e){return a.on(this.node,t,e),this};})),a.listeners=[],a.handlerMap=[],a.listenerId=0,a.on=function(t,e,i,s,r){var o=i.bind(s||t.instance||t),n=(a.handlerMap.indexOf(t)+1||a.handlerMap.push(t))-1,l=e.split(".")[0],h=e.split(".")[1]||"*";a.listeners[n]=a.listeners[n]||{},a.listeners[n][l]=a.listeners[n][l]||{},a.listeners[n][l][h]=a.listeners[n][l][h]||{},i._svgjsListenerId||(i._svgjsListenerId=++a.listenerId),a.listeners[n][l][h][i._svgjsListenerId]=o,t.addEventListener(l,o,r||{passive:!0});},a.off=function(t,e,i){var s=a.handlerMap.indexOf(t),r=e&&e.split(".")[0],o=e&&e.split(".")[1],n="";if(-1!=s)if(i){if("function"==typeof i&&(i=i._svgjsListenerId),!i)return;a.listeners[s][r]&&a.listeners[s][r][o||"*"]&&(t.removeEventListener(r,a.listeners[s][r][o||"*"][i],!1),delete a.listeners[s][r][o||"*"][i]);}else if(o&&r){if(a.listeners[s][r]&&a.listeners[s][r][o]){for(var l in a.listeners[s][r][o])a.off(t,[r,o].join("."),l);delete a.listeners[s][r][o];}}else if(o)for(var h in a.listeners[s])for(var n in a.listeners[s][h])o===n&&a.off(t,[h,o].join("."));else if(r){if(a.listeners[s][r]){for(var n in a.listeners[s][r])a.off(t,[r,n].join("."));delete a.listeners[s][r];}}else {for(var h in a.listeners[s])a.off(t,h);delete a.listeners[s],delete a.handlerMap[s];}},a.extend(a.Element,{on:function(t,e,i,s){return a.on(this.node,t,e,i,s),this},off:function(t,e){return a.off(this.node,t,e),this},fire:function(e,i){return e instanceof t.Event?this.node.dispatchEvent(e):this.node.dispatchEvent(e=new a.CustomEvent(e,{detail:i,cancelable:!0})),this._event=e,this},event:function(){return this._event}}),a.Defs=a.invent({create:"defs",inherit:a.Container}),a.G=a.invent({create:"g",inherit:a.Container,extend:{x:function(t){return null==t?this.transform("x"):this.transform({x:t-this.x()},!0)}},construct:{group:function(){return this.put(new a.G)}}}),a.Doc=a.invent({create:function(t){t&&("svg"==(t="string"==typeof t?e.getElementById(t):t).nodeName?this.constructor.call(this,t):(this.constructor.call(this,a.create("svg")),t.appendChild(this.node),this.size("100%","100%")),this.namespace().defs());},inherit:a.Container,extend:{namespace:function(){return this.attr({xmlns:a.ns,version:"1.1"}).attr("xmlns:xlink",a.xlink,a.xmlns).attr("xmlns:svgjs",a.svgjs,a.xmlns)},defs:function(){var t;return this._defs||((t=this.node.getElementsByTagName("defs")[0])?this._defs=a.adopt(t):this._defs=new a.Defs,this.node.appendChild(this._defs.node)),this._defs},parent:function(){return this.node.parentNode&&"#document"!=this.node.parentNode.nodeName?this.node.parentNode:null},remove:function(){return this.parent()&&this.parent().removeChild(this.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,a.parser.draw&&!a.parser.draw.parentNode&&this.node.appendChild(a.parser.draw),this},clone:function(t){this.writeDataToDom();var e=this.node,i=x(e.cloneNode(!0));return t?(t.node||t).appendChild(i.node):e.parentNode.insertBefore(i.node,e.nextSibling),i}}}),a.extend(a.Element,{}),a.Gradient=a.invent({create:function(t){this.constructor.call(this,a.create(t+"Gradient")),this.type=t;},inherit:a.Container,extend:{at:function(t,e,i){return this.put(new a.Stop).update(t,e,i)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},fill:function(){return "url(#"+this.id()+")"},toString:function(){return this.fill()},attr:function(t,e,i){return "transform"==t&&(t="gradientTransform"),a.Container.prototype.attr.call(this,t,e,i)}},construct:{gradient:function(t,e){return this.defs().gradient(t,e)}}}),a.extend(a.Gradient,a.FX,{from:function(t,e){return "radial"==(this._target||this).type?this.attr({fx:new a.Number(t),fy:new a.Number(e)}):this.attr({x1:new a.Number(t),y1:new a.Number(e)})},to:function(t,e){return "radial"==(this._target||this).type?this.attr({cx:new a.Number(t),cy:new a.Number(e)}):this.attr({x2:new a.Number(t),y2:new a.Number(e)})}}),a.extend(a.Defs,{gradient:function(t,e){return this.put(new a.Gradient(t)).update(e)}}),a.Stop=a.invent({create:"stop",inherit:a.Element,extend:{update:function(t){return ("number"==typeof t||t instanceof a.Number)&&(t={offset:arguments[0],color:arguments[1],opacity:arguments[2]}),null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new a.Number(t.offset)),this}}}),a.Pattern=a.invent({create:"pattern",inherit:a.Container,extend:{fill:function(){return "url(#"+this.id()+")"},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return this.fill()},attr:function(t,e,i){return "transform"==t&&(t="patternTransform"),a.Container.prototype.attr.call(this,t,e,i)}},construct:{pattern:function(t,e,i){return this.defs().pattern(t,e,i)}}}),a.extend(a.Defs,{pattern:function(t,e,i){return this.put(new a.Pattern).update(i).attr({x:0,y:0,width:t,height:e,patternUnits:"userSpaceOnUse"})}}),a.Shape=a.invent({create:function(t){this.constructor.call(this,t);},inherit:a.Element}),a.Symbol=a.invent({create:"symbol",inherit:a.Container,construct:{symbol:function(){return this.put(new a.Symbol)}}}),a.Use=a.invent({create:"use",inherit:a.Shape,extend:{element:function(t,e){return this.attr("href",(e||"")+"#"+t,a.xlink)}},construct:{use:function(t,e){return this.put(new a.Use).element(t,e)}}}),a.Rect=a.invent({create:"rect",inherit:a.Shape,construct:{rect:function(t,e){return this.put(new a.Rect).size(t,e)}}}),a.Circle=a.invent({create:"circle",inherit:a.Shape,construct:{circle:function(t){return this.put(new a.Circle).rx(new a.Number(t).divide(2)).move(0,0)}}}),a.extend(a.Circle,a.FX,{rx:function(t){return this.attr("r",t)},ry:function(t){return this.rx(t)}}),a.Ellipse=a.invent({create:"ellipse",inherit:a.Shape,construct:{ellipse:function(t,e){return this.put(new a.Ellipse).size(t,e).move(0,0)}}}),a.extend(a.Ellipse,a.Rect,a.FX,{rx:function(t){return this.attr("rx",t)},ry:function(t){return this.attr("ry",t)}}),a.extend(a.Circle,a.Ellipse,{x:function(t){return null==t?this.cx()-this.rx():this.cx(t+this.rx())},y:function(t){return null==t?this.cy()-this.ry():this.cy(t+this.ry())},cx:function(t){return null==t?this.attr("cx"):this.attr("cx",t)},cy:function(t){return null==t?this.attr("cy"):this.attr("cy",t)},width:function(t){return null==t?2*this.rx():this.rx(new a.Number(t).divide(2))},height:function(t){return null==t?2*this.ry():this.ry(new a.Number(t).divide(2))},size:function(t,e){var i=u(this,t,e);return this.rx(new a.Number(i.width).divide(2)).ry(new a.Number(i.height).divide(2))}}),a.Line=a.invent({create:"line",inherit:a.Shape,extend:{array:function(){return new a.PointArray([[this.attr("x1"),this.attr("y1")],[this.attr("x2"),this.attr("y2")]])},plot:function(t,e,i,s){return null==t?this.array():(t=void 0!==e?{x1:t,y1:e,x2:i,y2:s}:new a.PointArray(t).toLine(),this.attr(t))},move:function(t,e){return this.attr(this.array().move(t,e).toLine())},size:function(t,e){var i=u(this,t,e);return this.attr(this.array().size(i.width,i.height).toLine())}},construct:{line:function(t,e,i,s){return a.Line.prototype.plot.apply(this.put(new a.Line),null!=t?[t,e,i,s]:[0,0,0,0])}}}),a.Polyline=a.invent({create:"polyline",inherit:a.Shape,construct:{polyline:function(t){return this.put(new a.Polyline).plot(t||new a.PointArray)}}}),a.Polygon=a.invent({create:"polygon",inherit:a.Shape,construct:{polygon:function(t){return this.put(new a.Polygon).plot(t||new a.PointArray)}}}),a.extend(a.Polyline,a.Polygon,{array:function(){return this._array||(this._array=new a.PointArray(this.attr("points")))},plot:function(t){return null==t?this.array():this.clear().attr("points","string"==typeof t?t:this._array=new a.PointArray(t))},clear:function(){return delete this._array,this},move:function(t,e){return this.attr("points",this.array().move(t,e))},size:function(t,e){var i=u(this,t,e);return this.attr("points",this.array().size(i.width,i.height))}}),a.extend(a.Line,a.Polyline,a.Polygon,{morphArray:a.PointArray,x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},width:function(t){var e=this.bbox();return null==t?e.width:this.size(t,e.height)},height:function(t){var e=this.bbox();return null==t?e.height:this.size(e.width,t)}}),a.Path=a.invent({create:"path",inherit:a.Shape,extend:{morphArray:a.PathArray,array:function(){return this._array||(this._array=new a.PathArray(this.attr("d")))},plot:function(t){return null==t?this.array():this.clear().attr("d","string"==typeof t?t:this._array=new a.PathArray(t))},clear:function(){return delete this._array,this}},construct:{path:function(t){return this.put(new a.Path).plot(t||new a.PathArray)}}}),a.Image=a.invent({create:"image",inherit:a.Shape,extend:{load:function(e){if(!e)return this;var i=this,s=new t.Image;return a.on(s,"load",(function(){a.off(s);var t=i.parent(a.Pattern);null!==t&&(0==i.width()&&0==i.height()&&i.size(s.width,s.height),t&&0==t.width()&&0==t.height()&&t.size(i.width(),i.height()),"function"==typeof i._loaded&&i._loaded.call(i,{width:s.width,height:s.height,ratio:s.width/s.height,url:e}));})),a.on(s,"error",(function(t){a.off(s),"function"==typeof i._error&&i._error.call(i,t);})),this.attr("href",s.src=this.src=e,a.xlink)},loaded:function(t){return this._loaded=t,this},error:function(t){return this._error=t,this}},construct:{image:function(t,e,i){return this.put(new a.Image).load(t).size(e||0,i||e||0)}}}),a.Text=a.invent({create:function(){this.constructor.call(this,a.create("text")),this.dom.leading=new a.Number(1.3),this._rebuild=!0,this._build=!1,this.attr("font-family",a.defaults.attrs["font-family"]);},inherit:a.Shape,extend:{x:function(t){return null==t?this.attr("x"):this.attr("x",t)},text:function(t){if(void 0===t){t="";for(var e=this.node.childNodes,i=0,s=e.length;i<s;++i)0!=i&&3!=e[i].nodeType&&1==a.adopt(e[i]).dom.newLined&&(t+="\n"),t+=e[i].textContent;return t}if(this.clear().build(!0),"function"==typeof t)t.call(this,this);else {i=0;for(var r=(t=t.split("\n")).length;i<r;i++)this.tspan(t[i]).newLine();}return this.build(!1).rebuild()},size:function(t){return this.attr("font-size",t).rebuild()},leading:function(t){return null==t?this.dom.leading:(this.dom.leading=new a.Number(t),this.rebuild())},lines:function(){var t=(this.textPath&&this.textPath()||this).node,e=a.utils.map(a.utils.filterSVGElements(t.childNodes),(function(t){return a.adopt(t)}));return new a.Set(e)},rebuild:function(t){if("boolean"==typeof t&&(this._rebuild=t),this._rebuild){var e=this,i=0,s=this.dom.leading*new a.Number(this.attr("font-size"));this.lines().each((function(){this.dom.newLined&&(e.textPath()||this.attr("x",e.attr("x")),"\n"==this.text()?i+=s:(this.attr("dy",s+i),i=0));})),this.fire("rebuild");}return this},build:function(t){return this._build=!!t,this},setData:function(t){return this.dom=t,this.dom.leading=new a.Number(t.leading||1.3),this}},construct:{text:function(t){return this.put(new a.Text).text(t)},plain:function(t){return this.put(new a.Text).plain(t)}}}),a.Tspan=a.invent({create:"tspan",inherit:a.Shape,extend:{text:function(t){return null==t?this.node.textContent+(this.dom.newLined?"\n":""):("function"==typeof t?t.call(this,this):this.plain(t),this)},dx:function(t){return this.attr("dx",t)},dy:function(t){return this.attr("dy",t)},newLine:function(){var t=this.parent(a.Text);return this.dom.newLined=!0,this.dy(t.dom.leading*t.attr("font-size")).attr("x",t.x())}}}),a.extend(a.Text,a.Tspan,{plain:function(t){return !1===this._build&&this.clear(),this.node.appendChild(e.createTextNode(t)),this},tspan:function(t){var e=(this.textPath&&this.textPath()||this).node,i=new a.Tspan;return !1===this._build&&this.clear(),e.appendChild(i.node),i.text(t)},clear:function(){for(var t=(this.textPath&&this.textPath()||this).node;t.hasChildNodes();)t.removeChild(t.lastChild);return this},length:function(){return this.node.getComputedTextLength()}}),a.TextPath=a.invent({create:"textPath",inherit:a.Parent,parent:a.Text,construct:{morphArray:a.PathArray,array:function(){var t=this.track();return t?t.array():null},plot:function(t){var e=this.track(),i=null;return e&&(i=e.plot(t)),null==t?i:this},track:function(){var t=this.textPath();if(t)return t.reference("href")},textPath:function(){if(this.node.firstChild&&"textPath"==this.node.firstChild.nodeName)return a.adopt(this.node.firstChild)}}}),a.Nested=a.invent({create:function(){this.constructor.call(this,a.create("svg")),this.style("overflow","visible");},inherit:a.Container,construct:{nested:function(){return this.put(new a.Nested)}}});var l={stroke:["color","width","opacity","linecap","linejoin","miterlimit","dasharray","dashoffset"],fill:["color","opacity","rule"],prefix:function(t,e){return "color"==e?t:t+"-"+e}};function h(t,e,i,s){return i+s.replace(a.regex.dots," .")}function c(t){return t.toLowerCase().replace(/-(.)/g,(function(t,e){return e.toUpperCase()}))}function d(t){return t.charAt(0).toUpperCase()+t.slice(1)}function g(t){var e=t.toString(16);return 1==e.length?"0"+e:e}function u(t,e,i){if(null==e||null==i){var a=t.bbox();null==e?e=a.width/a.height*i:null==i&&(i=a.height/a.width*e);}return {width:e,height:i}}function p(t,e,i){return {x:e*t.a+i*t.c+0,y:e*t.b+i*t.d+0}}function f(t){return {a:t[0],b:t[1],c:t[2],d:t[3],e:t[4],f:t[5]}}function x(e){for(var i=e.childNodes.length-1;i>=0;i--)e.childNodes[i]instanceof t.SVGElement&&x(e.childNodes[i]);return a.adopt(e).id(a.eid(e.nodeName))}function b(t){return Math.abs(t)>1e-37?t:0}["fill","stroke"].forEach((function(t){var e={};e[t]=function(e){if(void 0===e)return this;if("string"==typeof e||a.Color.isRgb(e)||e&&"function"==typeof e.fill)this.attr(t,e);else for(var i=l[t].length-1;i>=0;i--)null!=e[l[t][i]]&&this.attr(l.prefix(t,l[t][i]),e[l[t][i]]);return this},a.extend(a.Element,a.FX,e);})),a.extend(a.Element,a.FX,{translate:function(t,e){return this.transform({x:t,y:e})},matrix:function(t){return this.attr("transform",new a.Matrix(6==arguments.length?[].slice.call(arguments):t))},opacity:function(t){return this.attr("opacity",t)},dx:function(t){return this.x(new a.Number(t).plus(this instanceof a.FX?0:this.x()),!0)},dy:function(t){return this.y(new a.Number(t).plus(this instanceof a.FX?0:this.y()),!0)}}),a.extend(a.Path,{length:function(){return this.node.getTotalLength()},pointAt:function(t){return this.node.getPointAtLength(t)}}),a.Set=a.invent({create:function(t){Array.isArray(t)?this.members=t:this.clear();},extend:{add:function(){for(var t=[].slice.call(arguments),e=0,i=t.length;e<i;e++)this.members.push(t[e]);return this},remove:function(t){var e=this.index(t);return e>-1&&this.members.splice(e,1),this},each:function(t){for(var e=0,i=this.members.length;e<i;e++)t.apply(this.members[e],[e,this.members]);return this},clear:function(){return this.members=[],this},length:function(){return this.members.length},has:function(t){return this.index(t)>=0},index:function(t){return this.members.indexOf(t)},get:function(t){return this.members[t]},first:function(){return this.get(0)},last:function(){return this.get(this.members.length-1)},valueOf:function(){return this.members}},construct:{set:function(t){return new a.Set(t)}}}),a.FX.Set=a.invent({create:function(t){this.set=t;}}),a.Set.inherit=function(){var t=[];for(var e in a.Shape.prototype)"function"==typeof a.Shape.prototype[e]&&"function"!=typeof a.Set.prototype[e]&&t.push(e);for(var e in t.forEach((function(t){a.Set.prototype[t]=function(){for(var e=0,i=this.members.length;e<i;e++)this.members[e]&&"function"==typeof this.members[e][t]&&this.members[e][t].apply(this.members[e],arguments);return "animate"==t?this.fx||(this.fx=new a.FX.Set(this)):this};})),t=[],a.FX.prototype)"function"==typeof a.FX.prototype[e]&&"function"!=typeof a.FX.Set.prototype[e]&&t.push(e);t.forEach((function(t){a.FX.Set.prototype[t]=function(){for(var e=0,i=this.set.members.length;e<i;e++)this.set.members[e].fx[t].apply(this.set.members[e].fx,arguments);return this};}));},a.extend(a.Element,{}),a.extend(a.Element,{remember:function(t,e){if("object"===i(arguments[0]))for(var a in t)this.remember(a,t[a]);else {if(1==arguments.length)return this.memory()[t];this.memory()[t]=e;}return this},forget:function(){if(0==arguments.length)this._memory={};else for(var t=arguments.length-1;t>=0;t--)delete this.memory()[arguments[t]];return this},memory:function(){return this._memory||(this._memory={})}}),a.get=function(t){var i=e.getElementById(function(t){var e=(t||"").toString().match(a.regex.reference);if(e)return e[1]}(t)||t);return a.adopt(i)},a.select=function(t,i){return new a.Set(a.utils.map((i||e).querySelectorAll(t),(function(t){return a.adopt(t)})))},a.extend(a.Parent,{select:function(t){return a.select(t,this.node)}});var v="abcdef".split("");if("function"!=typeof t.CustomEvent){var m=function(t,i){i=i||{bubbles:!1,cancelable:!1,detail:void 0};var a=e.createEvent("CustomEvent");return a.initCustomEvent(t,i.bubbles,i.cancelable,i.detail),a};m.prototype=t.Event.prototype,a.CustomEvent=m;}else a.CustomEvent=t.CustomEvent;return a},"object"===(i(exports))&&"undefined"!='object'?module.exports=Rt.document?Ht(Rt,Rt.document):function(t){return Ht(t,t.document)}:Rt.SVG=Ht(Rt,Rt.document),
  	/*! svg.filter.js - v2.0.2 - 2016-02-24
  	* https://github.com/wout/svg.filter.js
  	* Copyright (c) 2016 Wout Fierens; Licensed MIT */
  	function(){SVG.Filter=SVG.invent({create:"filter",inherit:SVG.Parent,extend:{source:"SourceGraphic",sourceAlpha:"SourceAlpha",background:"BackgroundImage",backgroundAlpha:"BackgroundAlpha",fill:"FillPaint",stroke:"StrokePaint",autoSetIn:!0,put:function(t,e){return this.add(t,e),!t.attr("in")&&this.autoSetIn&&t.attr("in",this.source),t.attr("result")||t.attr("result",t),t},blend:function(t,e,i){return this.put(new SVG.BlendEffect(t,e,i))},colorMatrix:function(t,e){return this.put(new SVG.ColorMatrixEffect(t,e))},convolveMatrix:function(t){return this.put(new SVG.ConvolveMatrixEffect(t))},componentTransfer:function(t){return this.put(new SVG.ComponentTransferEffect(t))},composite:function(t,e,i){return this.put(new SVG.CompositeEffect(t,e,i))},flood:function(t,e){return this.put(new SVG.FloodEffect(t,e))},offset:function(t,e){return this.put(new SVG.OffsetEffect(t,e))},image:function(t){return this.put(new SVG.ImageEffect(t))},merge:function(){var t=[void 0];for(var e in arguments)t.push(arguments[e]);return this.put(new(SVG.MergeEffect.bind.apply(SVG.MergeEffect,t)))},gaussianBlur:function(t,e){return this.put(new SVG.GaussianBlurEffect(t,e))},morphology:function(t,e){return this.put(new SVG.MorphologyEffect(t,e))},diffuseLighting:function(t,e,i){return this.put(new SVG.DiffuseLightingEffect(t,e,i))},displacementMap:function(t,e,i,a,s){return this.put(new SVG.DisplacementMapEffect(t,e,i,a,s))},specularLighting:function(t,e,i,a){return this.put(new SVG.SpecularLightingEffect(t,e,i,a))},tile:function(){return this.put(new SVG.TileEffect)},turbulence:function(t,e,i,a,s){return this.put(new SVG.TurbulenceEffect(t,e,i,a,s))},toString:function(){return "url(#"+this.attr("id")+")"}}}),SVG.extend(SVG.Defs,{filter:function(t){var e=this.put(new SVG.Filter);return "function"==typeof t&&t.call(e,e),e}}),SVG.extend(SVG.Container,{filter:function(t){return this.defs().filter(t)}}),SVG.extend(SVG.Element,SVG.G,SVG.Nested,{filter:function(t){return this.filterer=t instanceof SVG.Element?t:this.doc().filter(t),this.doc()&&this.filterer.doc()!==this.doc()&&this.doc().defs().add(this.filterer),this.attr("filter",this.filterer),this.filterer},unfilter:function(t){return this.filterer&&!0===t&&this.filterer.remove(),delete this.filterer,this.attr("filter",null)}}),SVG.Effect=SVG.invent({create:function(){this.constructor.call(this);},inherit:SVG.Element,extend:{in:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in")+'"]').get(0)||this.attr("in"):this.attr("in",t)},result:function(t){return null==t?this.attr("result"):this.attr("result",t)},toString:function(){return this.result()}}}),SVG.ParentEffect=SVG.invent({create:function(){this.constructor.call(this);},inherit:SVG.Parent,extend:{in:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in")+'"]').get(0)||this.attr("in"):this.attr("in",t)},result:function(t){return null==t?this.attr("result"):this.attr("result",t)},toString:function(){return this.result()}}});var t={blend:function(t,e){return this.parent()&&this.parent().blend(this,t,e)},colorMatrix:function(t,e){return this.parent()&&this.parent().colorMatrix(t,e).in(this)},convolveMatrix:function(t){return this.parent()&&this.parent().convolveMatrix(t).in(this)},componentTransfer:function(t){return this.parent()&&this.parent().componentTransfer(t).in(this)},composite:function(t,e){return this.parent()&&this.parent().composite(this,t,e)},flood:function(t,e){return this.parent()&&this.parent().flood(t,e)},offset:function(t,e){return this.parent()&&this.parent().offset(t,e).in(this)},image:function(t){return this.parent()&&this.parent().image(t)},merge:function(){return this.parent()&&this.parent().merge.apply(this.parent(),[this].concat(arguments))},gaussianBlur:function(t,e){return this.parent()&&this.parent().gaussianBlur(t,e).in(this)},morphology:function(t,e){return this.parent()&&this.parent().morphology(t,e).in(this)},diffuseLighting:function(t,e,i){return this.parent()&&this.parent().diffuseLighting(t,e,i).in(this)},displacementMap:function(t,e,i,a){return this.parent()&&this.parent().displacementMap(this,t,e,i,a)},specularLighting:function(t,e,i,a){return this.parent()&&this.parent().specularLighting(t,e,i,a).in(this)},tile:function(){return this.parent()&&this.parent().tile().in(this)},turbulence:function(t,e,i,a,s){return this.parent()&&this.parent().turbulence(t,e,i,a,s).in(this)}};SVG.extend(SVG.Effect,t),SVG.extend(SVG.ParentEffect,t),SVG.ChildEffect=SVG.invent({create:function(){this.constructor.call(this);},inherit:SVG.Element,extend:{in:function(t){this.attr("in",t);}}});var e={blend:function(t,e,i){this.attr({in:t,in2:e,mode:i||"normal"});},colorMatrix:function(t,e){"matrix"==t&&(e=s(e)),this.attr({type:t,values:void 0===e?null:e});},convolveMatrix:function(t){t=s(t),this.attr({order:Math.sqrt(t.split(" ").length),kernelMatrix:t});},composite:function(t,e,i){this.attr({in:t,in2:e,operator:i});},flood:function(t,e){this.attr("flood-color",t),null!=e&&this.attr("flood-opacity",e);},offset:function(t,e){this.attr({dx:t,dy:e});},image:function(t){this.attr("href",t,SVG.xlink);},displacementMap:function(t,e,i,a,s){this.attr({in:t,in2:e,scale:i,xChannelSelector:a,yChannelSelector:s});},gaussianBlur:function(t,e){null!=t||null!=e?this.attr("stdDeviation",function(t){if(!Array.isArray(t))return t;for(var e=0,i=t.length,a=[];e<i;e++)a.push(t[e]);return a.join(" ")}(Array.prototype.slice.call(arguments))):this.attr("stdDeviation","0 0");},morphology:function(t,e){this.attr({operator:t,radius:e});},tile:function(){},turbulence:function(t,e,i,a,s){this.attr({numOctaves:e,seed:i,stitchTiles:a,baseFrequency:t,type:s});}},i={merge:function(){var t;if(arguments[0]instanceof SVG.Set){var e=this;arguments[0].each((function(t){this instanceof SVG.MergeNode?e.put(this):(this instanceof SVG.Effect||this instanceof SVG.ParentEffect)&&e.put(new SVG.MergeNode(this));}));}else {t=Array.isArray(arguments[0])?arguments[0]:arguments;for(var i=0;i<t.length;i++)t[i]instanceof SVG.MergeNode?this.put(t[i]):this.put(new SVG.MergeNode(t[i]));}},componentTransfer:function(t){if(this.rgb=new SVG.Set,["r","g","b","a"].forEach(function(t){this[t]=new(SVG["Func"+t.toUpperCase()])("identity"),this.rgb.add(this[t]),this.node.appendChild(this[t].node);}.bind(this)),t)for(var e in t.rgb&&(["r","g","b"].forEach(function(e){this[e].attr(t.rgb);}.bind(this)),delete t.rgb),t)this[e].attr(t[e]);},diffuseLighting:function(t,e,i){this.attr({surfaceScale:t,diffuseConstant:e,kernelUnitLength:i});},specularLighting:function(t,e,i,a){this.attr({surfaceScale:t,diffuseConstant:e,specularExponent:i,kernelUnitLength:a});}},a={distantLight:function(t,e){this.attr({azimuth:t,elevation:e});},pointLight:function(t,e,i){this.attr({x:t,y:e,z:i});},spotLight:function(t,e,i,a,s,r){this.attr({x:t,y:e,z:i,pointsAtX:a,pointsAtY:s,pointsAtZ:r});},mergeNode:function(t){this.attr("in",t);}};function s(t){return Array.isArray(t)&&(t=new SVG.Array(t)),t.toString().replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s+/g," ")}function r(){var t=function(){};for(var e in "function"==typeof arguments[arguments.length-1]&&(t=arguments[arguments.length-1],Array.prototype.splice.call(arguments,arguments.length-1,1)),arguments)for(var i in arguments[e])t(arguments[e][i],i,arguments[e]);}["r","g","b","a"].forEach((function(t){a["Func"+t.toUpperCase()]=function(t){switch(this.attr("type",t),t){case"table":this.attr("tableValues",arguments[1]);break;case"linear":this.attr("slope",arguments[1]),this.attr("intercept",arguments[2]);break;case"gamma":this.attr("amplitude",arguments[1]),this.attr("exponent",arguments[2]),this.attr("offset",arguments[2]);}};})),r(e,(function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i+"Effect"]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments),this.result(this.attr("id")+"Out");},inherit:SVG.Effect,extend:{}});})),r(i,(function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i+"Effect"]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments),this.result(this.attr("id")+"Out");},inherit:SVG.ParentEffect,extend:{}});})),r(a,(function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments);},inherit:SVG.ChildEffect,extend:{}});})),SVG.extend(SVG.MergeEffect,{in:function(t){return t instanceof SVG.MergeNode?this.add(t,0):this.add(new SVG.MergeNode(t),0),this}}),SVG.extend(SVG.CompositeEffect,SVG.BlendEffect,SVG.DisplacementMapEffect,{in2:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in2")+'"]').get(0)||this.attr("in2"):this.attr("in2",t)}}),SVG.filter={sepiatone:[.343,.669,.119,0,0,.249,.626,.13,0,0,.172,.334,.111,0,0,0,0,0,1,0]};}.call(void 0),function(){function t(t,s,r,o,n,l,h){for(var c=t.slice(s,r||h),d=o.slice(n,l||h),g=0,u={pos:[0,0],start:[0,0]},p={pos:[0,0],start:[0,0]};;){if(c[g]=e.call(u,c[g]),d[g]=e.call(p,d[g]),c[g][0]!=d[g][0]||"M"==c[g][0]||"A"==c[g][0]&&(c[g][4]!=d[g][4]||c[g][5]!=d[g][5])?(Array.prototype.splice.apply(c,[g,1].concat(a.call(u,c[g]))),Array.prototype.splice.apply(d,[g,1].concat(a.call(p,d[g])))):(c[g]=i.call(u,c[g]),d[g]=i.call(p,d[g])),++g==c.length&&g==d.length)break;g==c.length&&c.push(["C",u.pos[0],u.pos[1],u.pos[0],u.pos[1],u.pos[0],u.pos[1]]),g==d.length&&d.push(["C",p.pos[0],p.pos[1],p.pos[0],p.pos[1],p.pos[0],p.pos[1]]);}return {start:c,dest:d}}function e(t){switch(t[0]){case"z":case"Z":t[0]="L",t[1]=this.start[0],t[2]=this.start[1];break;case"H":t[0]="L",t[2]=this.pos[1];break;case"V":t[0]="L",t[2]=t[1],t[1]=this.pos[0];break;case"T":t[0]="Q",t[3]=t[1],t[4]=t[2],t[1]=this.reflection[1],t[2]=this.reflection[0];break;case"S":t[0]="C",t[6]=t[4],t[5]=t[3],t[4]=t[2],t[3]=t[1],t[2]=this.reflection[1],t[1]=this.reflection[0];}return t}function i(t){var e=t.length;return this.pos=[t[e-2],t[e-1]],-1!="SCQT".indexOf(t[0])&&(this.reflection=[2*this.pos[0]-t[e-4],2*this.pos[1]-t[e-3]]),t}function a(t){var e=[t];switch(t[0]){case"M":return this.pos=this.start=[t[1],t[2]],e;case"L":t[5]=t[3]=t[1],t[6]=t[4]=t[2],t[1]=this.pos[0],t[2]=this.pos[1];break;case"Q":t[6]=t[4],t[5]=t[3],t[4]=1*t[4]/3+2*t[2]/3,t[3]=1*t[3]/3+2*t[1]/3,t[2]=1*this.pos[1]/3+2*t[2]/3,t[1]=1*this.pos[0]/3+2*t[1]/3;break;case"A":e=function(t,e){var i,a,s,r,o,n,l,h,c,d,g,u,p,f,x,b,v,m,y,w,k,A,S,C,L,P,I=Math.abs(e[1]),M=Math.abs(e[2]),T=e[3]%360,z=e[4],X=e[5],E=e[6],Y=e[7],F=new SVG.Point(t),R=new SVG.Point(E,Y),H=[];if(0===I||0===M||F.x===R.x&&F.y===R.y)return [["C",F.x,F.y,R.x,R.y,R.x,R.y]];i=new SVG.Point((F.x-R.x)/2,(F.y-R.y)/2).transform((new SVG.Matrix).rotate(T)),(a=i.x*i.x/(I*I)+i.y*i.y/(M*M))>1&&(I*=a=Math.sqrt(a),M*=a);s=(new SVG.Matrix).rotate(T).scale(1/I,1/M).rotate(-T),F=F.transform(s),R=R.transform(s),r=[R.x-F.x,R.y-F.y],n=r[0]*r[0]+r[1]*r[1],o=Math.sqrt(n),r[0]/=o,r[1]/=o,l=n<4?Math.sqrt(1-n/4):0,z===X&&(l*=-1);h=new SVG.Point((R.x+F.x)/2+l*-r[1],(R.y+F.y)/2+l*r[0]),c=new SVG.Point(F.x-h.x,F.y-h.y),d=new SVG.Point(R.x-h.x,R.y-h.y),g=Math.acos(c.x/Math.sqrt(c.x*c.x+c.y*c.y)),c.y<0&&(g*=-1);u=Math.acos(d.x/Math.sqrt(d.x*d.x+d.y*d.y)),d.y<0&&(u*=-1);X&&g>u&&(u+=2*Math.PI);!X&&g<u&&(u-=2*Math.PI);for(f=Math.ceil(2*Math.abs(g-u)/Math.PI),b=[],v=g,p=(u-g)/f,x=4*Math.tan(p/4)/3,k=0;k<=f;k++)y=Math.cos(v),m=Math.sin(v),w=new SVG.Point(h.x+y,h.y+m),b[k]=[new SVG.Point(w.x+x*m,w.y-x*y),w,new SVG.Point(w.x-x*m,w.y+x*y)],v+=p;for(b[0][0]=b[0][1].clone(),b[b.length-1][2]=b[b.length-1][1].clone(),s=(new SVG.Matrix).rotate(T).scale(I,M).rotate(-T),k=0,A=b.length;k<A;k++)b[k][0]=b[k][0].transform(s),b[k][1]=b[k][1].transform(s),b[k][2]=b[k][2].transform(s);for(k=1,A=b.length;k<A;k++)S=(w=b[k-1][2]).x,C=w.y,L=(w=b[k][0]).x,P=w.y,E=(w=b[k][1]).x,Y=w.y,H.push(["C",S,C,L,P,E,Y]);return H}(this.pos,t),t=e[0];}return t[0]="C",this.pos=[t[5],t[6]],this.reflection=[2*t[5]-t[3],2*t[6]-t[4]],e}function s(t,e){if(!1===e)return !1;for(var i=e,a=t.length;i<a;++i)if("M"==t[i][0])return i;return !1}SVG.extend(SVG.PathArray,{morph:function(e){for(var i=this.value,a=this.parse(e),r=0,o=0,n=!1,l=!1;!1!==r||!1!==o;){var h;n=s(i,!1!==r&&r+1),l=s(a,!1!==o&&o+1),!1===r&&(r=0==(h=new SVG.PathArray(c.start).bbox()).height||0==h.width?i.push(i[0])-1:i.push(["M",h.x+h.width/2,h.y+h.height/2])-1),!1===o&&(o=0==(h=new SVG.PathArray(c.dest).bbox()).height||0==h.width?a.push(a[0])-1:a.push(["M",h.x+h.width/2,h.y+h.height/2])-1);var c=t(i,r,n,a,o,l);i=i.slice(0,r).concat(c.start,!1===n?[]:i.slice(n)),a=a.slice(0,o).concat(c.dest,!1===l?[]:a.slice(l)),r=!1!==n&&r+c.start.length,o=!1!==l&&o+c.dest.length;}return this.value=i,this.destination=new SVG.PathArray,this.destination.value=a,this}});}(),
  	/*! svg.draggable.js - v2.2.2 - 2019-01-08
  	* https://github.com/svgdotjs/svg.draggable.js
  	* Copyright (c) 2019 Wout Fierens; Licensed MIT */
  	function(){function t(t){t.remember("_draggable",this),this.el=t;}t.prototype.init=function(t,e){var i=this;this.constraint=t,this.value=e,this.el.on("mousedown.drag",(function(t){i.start(t);})),this.el.on("touchstart.drag",(function(t){i.start(t);}));},t.prototype.transformPoint=function(t,e){var i=(t=t||window.event).changedTouches&&t.changedTouches[0]||t;return this.p.x=i.clientX-(e||0),this.p.y=i.clientY,this.p.matrixTransform(this.m)},t.prototype.getBBox=function(){var t=this.el.bbox();return this.el instanceof SVG.Nested&&(t=this.el.rbox()),(this.el instanceof SVG.G||this.el instanceof SVG.Use||this.el instanceof SVG.Nested)&&(t.x=this.el.x(),t.y=this.el.y()),t},t.prototype.start=function(t){if("click"!=t.type&&"mousedown"!=t.type&&"mousemove"!=t.type||1==(t.which||t.buttons)){var e=this;if(this.el.fire("beforedrag",{event:t,handler:this}),!this.el.event().defaultPrevented){t.preventDefault(),t.stopPropagation(),this.parent=this.parent||this.el.parent(SVG.Nested)||this.el.parent(SVG.Doc),this.p=this.parent.node.createSVGPoint(),this.m=this.el.node.getScreenCTM().inverse();var i,a=this.getBBox();if(this.el instanceof SVG.Text)switch(i=this.el.node.getComputedTextLength(),this.el.attr("text-anchor")){case"middle":i/=2;break;case"start":i=0;}this.startPoints={point:this.transformPoint(t,i),box:a,transform:this.el.transform()},SVG.on(window,"mousemove.drag",(function(t){e.drag(t);})),SVG.on(window,"touchmove.drag",(function(t){e.drag(t);})),SVG.on(window,"mouseup.drag",(function(t){e.end(t);})),SVG.on(window,"touchend.drag",(function(t){e.end(t);})),this.el.fire("dragstart",{event:t,p:this.startPoints.point,m:this.m,handler:this});}}},t.prototype.drag=function(t){var e=this.getBBox(),i=this.transformPoint(t),a=this.startPoints.box.x+i.x-this.startPoints.point.x,s=this.startPoints.box.y+i.y-this.startPoints.point.y,r=this.constraint,o=i.x-this.startPoints.point.x,n=i.y-this.startPoints.point.y;if(this.el.fire("dragmove",{event:t,p:i,m:this.m,handler:this}),this.el.event().defaultPrevented)return i;if("function"==typeof r){var l=r.call(this.el,a,s,this.m);"boolean"==typeof l&&(l={x:l,y:l}),!0===l.x?this.el.x(a):!1!==l.x&&this.el.x(l.x),!0===l.y?this.el.y(s):!1!==l.y&&this.el.y(l.y);}else "object"==typeof r&&(null!=r.minX&&a<r.minX?o=(a=r.minX)-this.startPoints.box.x:null!=r.maxX&&a>r.maxX-e.width&&(o=(a=r.maxX-e.width)-this.startPoints.box.x),null!=r.minY&&s<r.minY?n=(s=r.minY)-this.startPoints.box.y:null!=r.maxY&&s>r.maxY-e.height&&(n=(s=r.maxY-e.height)-this.startPoints.box.y),null!=r.snapToGrid&&(a-=a%r.snapToGrid,s-=s%r.snapToGrid,o-=o%r.snapToGrid,n-=n%r.snapToGrid),this.el instanceof SVG.G?this.el.matrix(this.startPoints.transform).transform({x:o,y:n},!0):this.el.move(a,s));return i},t.prototype.end=function(t){var e=this.drag(t);this.el.fire("dragend",{event:t,p:e,m:this.m,handler:this}),SVG.off(window,"mousemove.drag"),SVG.off(window,"touchmove.drag"),SVG.off(window,"mouseup.drag"),SVG.off(window,"touchend.drag");},SVG.extend(SVG.Element,{draggable:function(e,i){"function"!=typeof e&&"object"!=typeof e||(i=e,e=!0);var a=this.remember("_draggable")||new t(this);return (e=void 0===e||e)?a.init(i||{},e):(this.off("mousedown.drag"),this.off("touchstart.drag")),this}});}.call(void 0),function(){function t(t){this.el=t,t.remember("_selectHandler",this),this.pointSelection={isSelected:!1},this.rectSelection={isSelected:!1},this.pointsList={lt:[0,0],rt:["width",0],rb:["width","height"],lb:[0,"height"],t:["width",0],r:["width","height"],b:["width","height"],l:[0,"height"]},this.pointCoord=function(t,e,i){var a="string"!=typeof t?t:e[t];return i?a/2:a},this.pointCoords=function(t,e){var i=this.pointsList[t];return {x:this.pointCoord(i[0],e,"t"===t||"b"===t),y:this.pointCoord(i[1],e,"r"===t||"l"===t)}};}t.prototype.init=function(t,e){var i=this.el.bbox();this.options={};var a=this.el.selectize.defaults.points;for(var s in this.el.selectize.defaults)this.options[s]=this.el.selectize.defaults[s],void 0!==e[s]&&(this.options[s]=e[s]);var r=["points","pointsExclude"];for(var s in r){var o=this.options[r[s]];"string"==typeof o?o=o.length>0?o.split(/\s*,\s*/i):[]:"boolean"==typeof o&&"points"===r[s]&&(o=o?a:[]),this.options[r[s]]=o;}this.options.points=[a,this.options.points].reduce((function(t,e){return t.filter((function(t){return e.indexOf(t)>-1}))})),this.options.points=[this.options.points,this.options.pointsExclude].reduce((function(t,e){return t.filter((function(t){return e.indexOf(t)<0}))})),this.parent=this.el.parent(),this.nested=this.nested||this.parent.group(),this.nested.matrix(new SVG.Matrix(this.el).translate(i.x,i.y)),this.options.deepSelect&&-1!==["line","polyline","polygon"].indexOf(this.el.type)?this.selectPoints(t):this.selectRect(t),this.observe(),this.cleanup();},t.prototype.selectPoints=function(t){return this.pointSelection.isSelected=t,this.pointSelection.set||(this.pointSelection.set=this.parent.set(),this.drawPoints()),this},t.prototype.getPointArray=function(){var t=this.el.bbox();return this.el.array().valueOf().map((function(e){return [e[0]-t.x,e[1]-t.y]}))},t.prototype.drawPoints=function(){for(var t=this,e=this.getPointArray(),i=0,a=e.length;i<a;++i){var s=function(e){return function(i){(i=i||window.event).preventDefault?i.preventDefault():i.returnValue=!1,i.stopPropagation();var a=i.pageX||i.touches[0].pageX,s=i.pageY||i.touches[0].pageY;t.el.fire("point",{x:a,y:s,i:e,event:i});}}(i),r=this.drawPoint(e[i][0],e[i][1]).addClass(this.options.classPoints).addClass(this.options.classPoints+"_point").on("touchstart",s).on("mousedown",s);this.pointSelection.set.add(r);}},t.prototype.drawPoint=function(t,e){var i=this.options.pointType;switch(i){case"circle":return this.drawCircle(t,e);case"rect":return this.drawRect(t,e);default:if("function"==typeof i)return i.call(this,t,e);throw new Error("Unknown "+i+" point type!")}},t.prototype.drawCircle=function(t,e){return this.nested.circle(this.options.pointSize).center(t,e)},t.prototype.drawRect=function(t,e){return this.nested.rect(this.options.pointSize,this.options.pointSize).center(t,e)},t.prototype.updatePointSelection=function(){var t=this.getPointArray();this.pointSelection.set.each((function(e){this.cx()===t[e][0]&&this.cy()===t[e][1]||this.center(t[e][0],t[e][1]);}));},t.prototype.updateRectSelection=function(){var t=this,e=this.el.bbox();if(this.rectSelection.set.get(0).attr({width:e.width,height:e.height}),this.options.points.length&&this.options.points.map((function(i,a){var s=t.pointCoords(i,e);t.rectSelection.set.get(a+1).center(s.x,s.y);})),this.options.rotationPoint){var i=this.rectSelection.set.length();this.rectSelection.set.get(i-1).center(e.width/2,20);}},t.prototype.selectRect=function(t){var e=this,i=this.el.bbox();function a(t){return function(i){(i=i||window.event).preventDefault?i.preventDefault():i.returnValue=!1,i.stopPropagation();var a=i.pageX||i.touches[0].pageX,s=i.pageY||i.touches[0].pageY;e.el.fire(t,{x:a,y:s,event:i});}}if(this.rectSelection.isSelected=t,this.rectSelection.set=this.rectSelection.set||this.parent.set(),this.rectSelection.set.get(0)||this.rectSelection.set.add(this.nested.rect(i.width,i.height).addClass(this.options.classRect)),this.options.points.length&&this.rectSelection.set.length()<2){this.options.points.map((function(t,s){var r=e.pointCoords(t,i),o=e.drawPoint(r.x,r.y).attr("class",e.options.classPoints+"_"+t).on("mousedown",a(t)).on("touchstart",a(t));e.rectSelection.set.add(o);})),this.rectSelection.set.each((function(){this.addClass(e.options.classPoints);}));}if(this.options.rotationPoint&&(this.options.points&&!this.rectSelection.set.get(9)||!this.options.points&&!this.rectSelection.set.get(1))){var s=function(t){(t=t||window.event).preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation();var i=t.pageX||t.touches[0].pageX,a=t.pageY||t.touches[0].pageY;e.el.fire("rot",{x:i,y:a,event:t});},r=this.drawPoint(i.width/2,20).attr("class",this.options.classPoints+"_rot").on("touchstart",s).on("mousedown",s);this.rectSelection.set.add(r);}},t.prototype.handler=function(){var t=this.el.bbox();this.nested.matrix(new SVG.Matrix(this.el).translate(t.x,t.y)),this.rectSelection.isSelected&&this.updateRectSelection(),this.pointSelection.isSelected&&this.updatePointSelection();},t.prototype.observe=function(){var t=this;if(MutationObserver)if(this.rectSelection.isSelected||this.pointSelection.isSelected)this.observerInst=this.observerInst||new MutationObserver((function(){t.handler();})),this.observerInst.observe(this.el.node,{attributes:!0});else try{this.observerInst.disconnect(),delete this.observerInst;}catch(t){}else this.el.off("DOMAttrModified.select"),(this.rectSelection.isSelected||this.pointSelection.isSelected)&&this.el.on("DOMAttrModified.select",(function(){t.handler();}));},t.prototype.cleanup=function(){!this.rectSelection.isSelected&&this.rectSelection.set&&(this.rectSelection.set.each((function(){this.remove();})),this.rectSelection.set.clear(),delete this.rectSelection.set),!this.pointSelection.isSelected&&this.pointSelection.set&&(this.pointSelection.set.each((function(){this.remove();})),this.pointSelection.set.clear(),delete this.pointSelection.set),this.pointSelection.isSelected||this.rectSelection.isSelected||(this.nested.remove(),delete this.nested);},SVG.extend(SVG.Element,{selectize:function(e,i){return "object"==typeof e&&(i=e,e=!0),(this.remember("_selectHandler")||new t(this)).init(void 0===e||e,i||{}),this}}),SVG.Element.prototype.selectize.defaults={points:["lt","rt","rb","lb","t","r","b","l"],pointsExclude:[],classRect:"svg_select_boundingRect",classPoints:"svg_select_points",pointSize:7,rotationPoint:!0,deepSelect:!1,pointType:"circle"};}(),function(){(function(){function t(t){t.remember("_resizeHandler",this),this.el=t,this.parameters={},this.lastUpdateCall=null,this.p=t.doc().node.createSVGPoint();}t.prototype.transformPoint=function(t,e,i){return this.p.x=t-(this.offset.x-window.pageXOffset),this.p.y=e-(this.offset.y-window.pageYOffset),this.p.matrixTransform(i||this.m)},t.prototype._extractPosition=function(t){return {x:null!=t.clientX?t.clientX:t.touches[0].clientX,y:null!=t.clientY?t.clientY:t.touches[0].clientY}},t.prototype.init=function(t){var e=this;if(this.stop(),"stop"!==t){for(var i in this.options={},this.el.resize.defaults)this.options[i]=this.el.resize.defaults[i],void 0!==t[i]&&(this.options[i]=t[i]);this.el.on("lt.resize",(function(t){e.resize(t||window.event);})),this.el.on("rt.resize",(function(t){e.resize(t||window.event);})),this.el.on("rb.resize",(function(t){e.resize(t||window.event);})),this.el.on("lb.resize",(function(t){e.resize(t||window.event);})),this.el.on("t.resize",(function(t){e.resize(t||window.event);})),this.el.on("r.resize",(function(t){e.resize(t||window.event);})),this.el.on("b.resize",(function(t){e.resize(t||window.event);})),this.el.on("l.resize",(function(t){e.resize(t||window.event);})),this.el.on("rot.resize",(function(t){e.resize(t||window.event);})),this.el.on("point.resize",(function(t){e.resize(t||window.event);})),this.update();}},t.prototype.stop=function(){return this.el.off("lt.resize"),this.el.off("rt.resize"),this.el.off("rb.resize"),this.el.off("lb.resize"),this.el.off("t.resize"),this.el.off("r.resize"),this.el.off("b.resize"),this.el.off("l.resize"),this.el.off("rot.resize"),this.el.off("point.resize"),this},t.prototype.resize=function(t){var e=this;this.m=this.el.node.getScreenCTM().inverse(),this.offset={x:window.pageXOffset,y:window.pageYOffset};var i=this._extractPosition(t.detail.event);if(this.parameters={type:this.el.type,p:this.transformPoint(i.x,i.y),x:t.detail.x,y:t.detail.y,box:this.el.bbox(),rotation:this.el.transform().rotation},"text"===this.el.type&&(this.parameters.fontSize=this.el.attr()["font-size"]),void 0!==t.detail.i){var a=this.el.array().valueOf();this.parameters.i=t.detail.i,this.parameters.pointCoords=[a[t.detail.i][0],a[t.detail.i][1]];}switch(t.type){case"lt":this.calc=function(t,e){var i=this.snapToGrid(t,e);if(this.parameters.box.width-i[0]>0&&this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x+i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize-i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x+i[0],this.parameters.box.y+i[1]).size(this.parameters.box.width-i[0],this.parameters.box.height-i[1]);}};break;case"rt":this.calc=function(t,e){var i=this.snapToGrid(t,e,2);if(this.parameters.box.width+i[0]>0&&this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x-i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize+i[0]);i=this.checkAspectRatio(i,!0),this.el.move(this.parameters.box.x,this.parameters.box.y+i[1]).size(this.parameters.box.width+i[0],this.parameters.box.height-i[1]);}};break;case"rb":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.width+i[0]>0&&this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x-i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize+i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x,this.parameters.box.y).size(this.parameters.box.width+i[0],this.parameters.box.height+i[1]);}};break;case"lb":this.calc=function(t,e){var i=this.snapToGrid(t,e,1);if(this.parameters.box.width-i[0]>0&&this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x+i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize-i[0]);i=this.checkAspectRatio(i,!0),this.el.move(this.parameters.box.x+i[0],this.parameters.box.y).size(this.parameters.box.width-i[0],this.parameters.box.height+i[1]);}};break;case"t":this.calc=function(t,e){var i=this.snapToGrid(t,e,2);if(this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y+i[1]).height(this.parameters.box.height-i[1]);}};break;case"r":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.width+i[0]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y).width(this.parameters.box.width+i[0]);}};break;case"b":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y).height(this.parameters.box.height+i[1]);}};break;case"l":this.calc=function(t,e){var i=this.snapToGrid(t,e,1);if(this.parameters.box.width-i[0]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x+i[0],this.parameters.box.y).width(this.parameters.box.width-i[0]);}};break;case"rot":this.calc=function(t,e){var i=t+this.parameters.p.x,a=e+this.parameters.p.y,s=Math.atan2(this.parameters.p.y-this.parameters.box.y-this.parameters.box.height/2,this.parameters.p.x-this.parameters.box.x-this.parameters.box.width/2),r=Math.atan2(a-this.parameters.box.y-this.parameters.box.height/2,i-this.parameters.box.x-this.parameters.box.width/2),o=this.parameters.rotation+180*(r-s)/Math.PI+this.options.snapToAngle/2;this.el.center(this.parameters.box.cx,this.parameters.box.cy).rotate(o-o%this.options.snapToAngle,this.parameters.box.cx,this.parameters.box.cy);};break;case"point":this.calc=function(t,e){var i=this.snapToGrid(t,e,this.parameters.pointCoords[0],this.parameters.pointCoords[1]),a=this.el.array().valueOf();a[this.parameters.i][0]=this.parameters.pointCoords[0]+i[0],a[this.parameters.i][1]=this.parameters.pointCoords[1]+i[1],this.el.plot(a);};}this.el.fire("resizestart",{dx:this.parameters.x,dy:this.parameters.y,event:t}),SVG.on(window,"touchmove.resize",(function(t){e.update(t||window.event);})),SVG.on(window,"touchend.resize",(function(){e.done();})),SVG.on(window,"mousemove.resize",(function(t){e.update(t||window.event);})),SVG.on(window,"mouseup.resize",(function(){e.done();}));},t.prototype.update=function(t){if(t){var e=this._extractPosition(t),i=this.transformPoint(e.x,e.y),a=i.x-this.parameters.p.x,s=i.y-this.parameters.p.y;this.lastUpdateCall=[a,s],this.calc(a,s),this.el.fire("resizing",{dx:a,dy:s,event:t});}else this.lastUpdateCall&&this.calc(this.lastUpdateCall[0],this.lastUpdateCall[1]);},t.prototype.done=function(){this.lastUpdateCall=null,SVG.off(window,"mousemove.resize"),SVG.off(window,"mouseup.resize"),SVG.off(window,"touchmove.resize"),SVG.off(window,"touchend.resize"),this.el.fire("resizedone");},t.prototype.snapToGrid=function(t,e,i,a){var s;return void 0!==a?s=[(i+t)%this.options.snapToGrid,(a+e)%this.options.snapToGrid]:(i=null==i?3:i,s=[(this.parameters.box.x+t+(1&i?0:this.parameters.box.width))%this.options.snapToGrid,(this.parameters.box.y+e+(2&i?0:this.parameters.box.height))%this.options.snapToGrid]),t<0&&(s[0]-=this.options.snapToGrid),e<0&&(s[1]-=this.options.snapToGrid),t-=Math.abs(s[0])<this.options.snapToGrid/2?s[0]:s[0]-(t<0?-this.options.snapToGrid:this.options.snapToGrid),e-=Math.abs(s[1])<this.options.snapToGrid/2?s[1]:s[1]-(e<0?-this.options.snapToGrid:this.options.snapToGrid),this.constraintToBox(t,e,i,a)},t.prototype.constraintToBox=function(t,e,i,a){var s,r,o=this.options.constraint||{};return void 0!==a?(s=i,r=a):(s=this.parameters.box.x+(1&i?0:this.parameters.box.width),r=this.parameters.box.y+(2&i?0:this.parameters.box.height)),void 0!==o.minX&&s+t<o.minX&&(t=o.minX-s),void 0!==o.maxX&&s+t>o.maxX&&(t=o.maxX-s),void 0!==o.minY&&r+e<o.minY&&(e=o.minY-r),void 0!==o.maxY&&r+e>o.maxY&&(e=o.maxY-r),[t,e]},t.prototype.checkAspectRatio=function(t,e){if(!this.options.saveAspectRatio)return t;var i=t.slice(),a=this.parameters.box.width/this.parameters.box.height,s=this.parameters.box.width+t[0],r=this.parameters.box.height-t[1],o=s/r;return o<a?(i[1]=s/a-this.parameters.box.height,e&&(i[1]=-i[1])):o>a&&(i[0]=this.parameters.box.width-r*a,e&&(i[0]=-i[0])),i},SVG.extend(SVG.Element,{resize:function(e){return (this.remember("_resizeHandler")||new t(this)).init(e||{}),this}}),SVG.Element.prototype.resize.defaults={snapToAngle:.1,snapToGrid:1,constraint:{},saveAspectRatio:!1};}).call(this);}(),void 0===window.Apex&&(window.Apex={});var Gt=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"initModules",value:function(){this.ctx.publicMethods=["updateOptions","updateSeries","appendData","appendSeries","isSeriesHidden","toggleSeries","showSeries","hideSeries","setLocale","resetSeries","zoomX","toggleDataPointSelection","dataURI","exportToCSV","addXaxisAnnotation","addYaxisAnnotation","addPointAnnotation","clearAnnotations","removeAnnotation","paper","destroy"],this.ctx.eventList=["click","mousedown","mousemove","mouseleave","touchstart","touchmove","touchleave","mouseup","touchend"],this.ctx.animations=new b(this.ctx),this.ctx.axes=new J(this.ctx),this.ctx.core=new Wt(this.ctx.el,this.ctx),this.ctx.config=new E({}),this.ctx.data=new W(this.ctx),this.ctx.grid=new j(this.ctx),this.ctx.graphics=new m(this.ctx),this.ctx.coreUtils=new y(this.ctx),this.ctx.crosshairs=new Q(this.ctx),this.ctx.events=new Z(this.ctx),this.ctx.exports=new G(this.ctx),this.ctx.localization=new $(this.ctx),this.ctx.options=new L,this.ctx.responsive=new K(this.ctx),this.ctx.series=new N(this.ctx),this.ctx.theme=new tt(this.ctx),this.ctx.formatters=new M(this.ctx),this.ctx.titleSubtitle=new et(this.ctx),this.ctx.legend=new lt(this.ctx),this.ctx.toolbar=new ht(this.ctx),this.ctx.tooltip=new bt(this.ctx),this.ctx.dimensions=new ot(this.ctx),this.ctx.updateHelpers=new Bt(this.ctx),this.ctx.zoomPanSelection=new ct(this.ctx),this.ctx.w.globals.tooltip=new bt(this.ctx);}}]),t}(),Vt=function(){function t(e){a(this,t),this.ctx=e,this.w=e.w;}return r(t,[{key:"clear",value:function(t){var e=t.isUpdating;this.ctx.zoomPanSelection&&this.ctx.zoomPanSelection.destroy(),this.ctx.toolbar&&this.ctx.toolbar.destroy(),this.ctx.animations=null,this.ctx.axes=null,this.ctx.annotations=null,this.ctx.core=null,this.ctx.data=null,this.ctx.grid=null,this.ctx.series=null,this.ctx.responsive=null,this.ctx.theme=null,this.ctx.formatters=null,this.ctx.titleSubtitle=null,this.ctx.legend=null,this.ctx.dimensions=null,this.ctx.options=null,this.ctx.crosshairs=null,this.ctx.zoomPanSelection=null,this.ctx.updateHelpers=null,this.ctx.toolbar=null,this.ctx.localization=null,this.ctx.w.globals.tooltip=null,this.clearDomElements({isUpdating:e});}},{key:"killSVG",value:function(t){t.each((function(t,e){this.removeClass("*"),this.off(),this.stop();}),!0),t.ungroup(),t.clear();}},{key:"clearDomElements",value:function(t){var e=this,i=t.isUpdating,a=this.w.globals.dom.Paper.node;a.parentNode&&a.parentNode.parentNode&&!i&&(a.parentNode.parentNode.style.minHeight="unset");var s=this.w.globals.dom.baseEl;s&&this.ctx.eventList.forEach((function(t){s.removeEventListener(t,e.ctx.events.documentEvent);}));var r=this.w.globals.dom;if(null!==this.ctx.el)for(;this.ctx.el.firstChild;)this.ctx.el.removeChild(this.ctx.el.firstChild);this.killSVG(r.Paper),r.Paper.remove(),r.elWrap=null,r.elGraphical=null,r.elLegendWrap=null,r.elLegendForeign=null,r.baseEl=null,r.elGridRect=null,r.elGridRectMask=null,r.elGridRectMarkerMask=null,r.elForecastMask=null,r.elNonForecastMask=null,r.elDefs=null;}}]),t}(),jt=new WeakMap;var _t=function(){function t(e,i){a(this,t),this.opts=i,this.ctx=this,this.w=new F(i).init(),this.el=e,this.w.globals.cuid=x.randomId(),this.w.globals.chartID=this.w.config.chart.id?x.escapeString(this.w.config.chart.id):this.w.globals.cuid,new Gt(this).initModules(),this.create=x.bind(this.create,this),this.windowResizeHandler=this._windowResizeHandler.bind(this),this.parentResizeHandler=this._parentResizeCallback.bind(this);}return r(t,[{key:"render",value:function(){var t=this;return new Promise((function(e,i){if(null!==t.el){void 0===Apex._chartInstances&&(Apex._chartInstances=[]),t.w.config.chart.id&&Apex._chartInstances.push({id:t.w.globals.chartID,group:t.w.config.chart.group,chart:t}),t.setLocale(t.w.config.chart.defaultLocale);var a=t.w.config.chart.events.beforeMount;if("function"==typeof a&&a(t,t.w),t.events.fireEvent("beforeMount",[t,t.w]),window.addEventListener("resize",t.windowResizeHandler),function(t,e){var i=!1;if(t.nodeType!==Node.DOCUMENT_FRAGMENT_NODE){var a=t.getBoundingClientRect();"none"!==t.style.display&&0!==a.width||(i=!0);}var s=new ResizeObserver((function(a){i&&e.call(t,a),i=!0;}));t.nodeType===Node.DOCUMENT_FRAGMENT_NODE?Array.from(t.children).forEach((function(t){return s.observe(t)})):s.observe(t),jt.set(e,s);}(t.el.parentNode,t.parentResizeHandler),!t.css){var s=t.el.getRootNode&&t.el.getRootNode(),r=x.is("ShadowRoot",s),o=t.el.ownerDocument,n=o.getElementById("apexcharts-css");!r&&n||(t.css=document.createElement("style"),t.css.id="apexcharts-css",t.css.textContent='@keyframes opaque {\n  0% {\n      opacity: 0\n  }\n\n  to {\n      opacity: 1\n  }\n}\n\n@keyframes resizeanim {\n  0%,to {\n      opacity: 0\n  }\n}\n\n.apexcharts-canvas {\n  position: relative;\n  user-select: none\n}\n\n.apexcharts-canvas ::-webkit-scrollbar {\n  -webkit-appearance: none;\n  width: 6px\n}\n\n.apexcharts-canvas ::-webkit-scrollbar-thumb {\n  border-radius: 4px;\n  background-color: rgba(0,0,0,.5);\n  box-shadow: 0 0 1px rgba(255,255,255,.5);\n  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5)\n}\n\n.apexcharts-inner {\n  position: relative\n}\n\n.apexcharts-text tspan {\n  font-family: inherit\n}\n\n.legend-mouseover-inactive {\n  transition: .15s ease all;\n  opacity: .2\n}\n\n.apexcharts-legend-text {\n  padding-left: 15px;\n  margin-left: -15px;\n}\n\n.apexcharts-series-collapsed {\n  opacity: 0\n}\n\n.apexcharts-tooltip {\n  border-radius: 5px;\n  box-shadow: 2px 2px 6px -4px #999;\n  cursor: default;\n  font-size: 14px;\n  left: 62px;\n  opacity: 0;\n  pointer-events: none;\n  position: absolute;\n  top: 20px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  white-space: nowrap;\n  z-index: 12;\n  transition: .15s ease all\n}\n\n.apexcharts-tooltip.apexcharts-active {\n  opacity: 1;\n  transition: .15s ease all\n}\n\n.apexcharts-tooltip.apexcharts-theme-light {\n  border: 1px solid #e3e3e3;\n  background: rgba(255,255,255,.96)\n}\n\n.apexcharts-tooltip.apexcharts-theme-dark {\n  color: #fff;\n  background: rgba(30,30,30,.8)\n}\n\n.apexcharts-tooltip * {\n  font-family: inherit\n}\n\n.apexcharts-tooltip-title {\n  padding: 6px;\n  font-size: 15px;\n  margin-bottom: 4px\n}\n\n.apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {\n  background: #eceff1;\n  border-bottom: 1px solid #ddd\n}\n\n.apexcharts-tooltip.apexcharts-theme-dark .apexcharts-tooltip-title {\n  background: rgba(0,0,0,.7);\n  border-bottom: 1px solid #333\n}\n\n.apexcharts-tooltip-text-goals-value,.apexcharts-tooltip-text-y-value,.apexcharts-tooltip-text-z-value {\n  display: inline-block;\n  margin-left: 5px;\n  font-weight: 600\n}\n\n.apexcharts-tooltip-text-goals-label:empty,.apexcharts-tooltip-text-goals-value:empty,.apexcharts-tooltip-text-y-label:empty,.apexcharts-tooltip-text-y-value:empty,.apexcharts-tooltip-text-z-value:empty,.apexcharts-tooltip-title:empty {\n  display: none\n}\n\n.apexcharts-tooltip-text-goals-label,.apexcharts-tooltip-text-goals-value {\n  padding: 6px 0 5px\n}\n\n.apexcharts-tooltip-goals-group,.apexcharts-tooltip-text-goals-label,.apexcharts-tooltip-text-goals-value {\n  display: flex\n}\n\n.apexcharts-tooltip-text-goals-label:not(:empty),.apexcharts-tooltip-text-goals-value:not(:empty) {\n  margin-top: -6px\n}\n\n.apexcharts-tooltip-marker {\n  width: 12px;\n  height: 12px;\n  position: relative;\n  top: 0;\n  margin-right: 10px;\n  border-radius: 50%\n}\n\n.apexcharts-tooltip-series-group {\n  padding: 0 10px;\n  display: none;\n  text-align: left;\n  justify-content: left;\n  align-items: center\n}\n\n.apexcharts-tooltip-series-group.apexcharts-active .apexcharts-tooltip-marker {\n  opacity: 1\n}\n\n.apexcharts-tooltip-series-group.apexcharts-active,.apexcharts-tooltip-series-group:last-child {\n  padding-bottom: 4px\n}\n\n.apexcharts-tooltip-series-group-hidden {\n  opacity: 0;\n  height: 0;\n  line-height: 0;\n  padding: 0!important\n}\n\n.apexcharts-tooltip-y-group {\n  padding: 6px 0 5px\n}\n\n.apexcharts-custom-tooltip,.apexcharts-tooltip-box {\n  padding: 4px 8px\n}\n\n.apexcharts-tooltip-boxPlot {\n  display: flex;\n  flex-direction: column-reverse\n}\n\n.apexcharts-tooltip-box>div {\n  margin: 4px 0\n}\n\n.apexcharts-tooltip-box span.value {\n  font-weight: 700\n}\n\n.apexcharts-tooltip-rangebar {\n  padding: 5px 8px\n}\n\n.apexcharts-tooltip-rangebar .category {\n  font-weight: 600;\n  color: #777\n}\n\n.apexcharts-tooltip-rangebar .series-name {\n  font-weight: 700;\n  display: block;\n  margin-bottom: 5px\n}\n\n.apexcharts-xaxistooltip,.apexcharts-yaxistooltip {\n  opacity: 0;\n  pointer-events: none;\n  color: #373d3f;\n  font-size: 13px;\n  text-align: center;\n  border-radius: 2px;\n  position: absolute;\n  z-index: 10;\n  background: #eceff1;\n  border: 1px solid #90a4ae\n}\n\n.apexcharts-xaxistooltip {\n  padding: 9px 10px;\n  transition: .15s ease all\n}\n\n.apexcharts-xaxistooltip.apexcharts-theme-dark {\n  background: rgba(0,0,0,.7);\n  border: 1px solid rgba(0,0,0,.5);\n  color: #fff\n}\n\n.apexcharts-xaxistooltip:after,.apexcharts-xaxistooltip:before {\n  left: 50%;\n  border: solid transparent;\n  content: " ";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none\n}\n\n.apexcharts-xaxistooltip:after {\n  border-color: transparent;\n  border-width: 6px;\n  margin-left: -6px\n}\n\n.apexcharts-xaxistooltip:before {\n  border-color: transparent;\n  border-width: 7px;\n  margin-left: -7px\n}\n\n.apexcharts-xaxistooltip-bottom:after,.apexcharts-xaxistooltip-bottom:before {\n  bottom: 100%\n}\n\n.apexcharts-xaxistooltip-top:after,.apexcharts-xaxistooltip-top:before {\n  top: 100%\n}\n\n.apexcharts-xaxistooltip-bottom:after {\n  border-bottom-color: #eceff1\n}\n\n.apexcharts-xaxistooltip-bottom:before {\n  border-bottom-color: #90a4ae\n}\n\n.apexcharts-xaxistooltip-bottom.apexcharts-theme-dark:after,.apexcharts-xaxistooltip-bottom.apexcharts-theme-dark:before {\n  border-bottom-color: rgba(0,0,0,.5)\n}\n\n.apexcharts-xaxistooltip-top:after {\n  border-top-color: #eceff1\n}\n\n.apexcharts-xaxistooltip-top:before {\n  border-top-color: #90a4ae\n}\n\n.apexcharts-xaxistooltip-top.apexcharts-theme-dark:after,.apexcharts-xaxistooltip-top.apexcharts-theme-dark:before {\n  border-top-color: rgba(0,0,0,.5)\n}\n\n.apexcharts-xaxistooltip.apexcharts-active {\n  opacity: 1;\n  transition: .15s ease all\n}\n\n.apexcharts-yaxistooltip {\n  padding: 4px 10px\n}\n\n.apexcharts-yaxistooltip.apexcharts-theme-dark {\n  background: rgba(0,0,0,.7);\n  border: 1px solid rgba(0,0,0,.5);\n  color: #fff\n}\n\n.apexcharts-yaxistooltip:after,.apexcharts-yaxistooltip:before {\n  top: 50%;\n  border: solid transparent;\n  content: " ";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none\n}\n\n.apexcharts-yaxistooltip:after {\n  border-color: transparent;\n  border-width: 6px;\n  margin-top: -6px\n}\n\n.apexcharts-yaxistooltip:before {\n  border-color: transparent;\n  border-width: 7px;\n  margin-top: -7px\n}\n\n.apexcharts-yaxistooltip-left:after,.apexcharts-yaxistooltip-left:before {\n  left: 100%\n}\n\n.apexcharts-yaxistooltip-right:after,.apexcharts-yaxistooltip-right:before {\n  right: 100%\n}\n\n.apexcharts-yaxistooltip-left:after {\n  border-left-color: #eceff1\n}\n\n.apexcharts-yaxistooltip-left:before {\n  border-left-color: #90a4ae\n}\n\n.apexcharts-yaxistooltip-left.apexcharts-theme-dark:after,.apexcharts-yaxistooltip-left.apexcharts-theme-dark:before {\n  border-left-color: rgba(0,0,0,.5)\n}\n\n.apexcharts-yaxistooltip-right:after {\n  border-right-color: #eceff1\n}\n\n.apexcharts-yaxistooltip-right:before {\n  border-right-color: #90a4ae\n}\n\n.apexcharts-yaxistooltip-right.apexcharts-theme-dark:after,.apexcharts-yaxistooltip-right.apexcharts-theme-dark:before {\n  border-right-color: rgba(0,0,0,.5)\n}\n\n.apexcharts-yaxistooltip.apexcharts-active {\n  opacity: 1\n}\n\n.apexcharts-yaxistooltip-hidden {\n  display: none\n}\n\n.apexcharts-xcrosshairs,.apexcharts-ycrosshairs {\n  pointer-events: none;\n  opacity: 0;\n  transition: .15s ease all\n}\n\n.apexcharts-xcrosshairs.apexcharts-active,.apexcharts-ycrosshairs.apexcharts-active {\n  opacity: 1;\n  transition: .15s ease all\n}\n\n.apexcharts-ycrosshairs-hidden {\n  opacity: 0\n}\n\n.apexcharts-selection-rect {\n  cursor: move\n}\n\n.svg_select_boundingRect,.svg_select_points_rot {\n  pointer-events: none;\n  opacity: 0;\n  visibility: hidden\n}\n\n.apexcharts-selection-rect+g .svg_select_boundingRect,.apexcharts-selection-rect+g .svg_select_points_rot {\n  opacity: 0;\n  visibility: hidden\n}\n\n.apexcharts-selection-rect+g .svg_select_points_l,.apexcharts-selection-rect+g .svg_select_points_r {\n  cursor: ew-resize;\n  opacity: 1;\n  visibility: visible\n}\n\n.svg_select_points {\n  fill: #efefef;\n  stroke: #333;\n  rx: 2\n}\n\n.apexcharts-svg.apexcharts-zoomable.hovering-zoom {\n  cursor: crosshair\n}\n\n.apexcharts-svg.apexcharts-zoomable.hovering-pan {\n  cursor: move\n}\n\n.apexcharts-menu-icon,.apexcharts-pan-icon,.apexcharts-reset-icon,.apexcharts-selection-icon,.apexcharts-toolbar-custom-icon,.apexcharts-zoom-icon,.apexcharts-zoomin-icon,.apexcharts-zoomout-icon {\n  cursor: pointer;\n  width: 20px;\n  height: 20px;\n  line-height: 24px;\n  color: #6e8192;\n  text-align: center\n}\n\n.apexcharts-menu-icon svg,.apexcharts-reset-icon svg,.apexcharts-zoom-icon svg,.apexcharts-zoomin-icon svg,.apexcharts-zoomout-icon svg {\n  fill: #6e8192\n}\n\n.apexcharts-selection-icon svg {\n  fill: #444;\n  transform: scale(.76)\n}\n\n.apexcharts-theme-dark .apexcharts-menu-icon svg,.apexcharts-theme-dark .apexcharts-pan-icon svg,.apexcharts-theme-dark .apexcharts-reset-icon svg,.apexcharts-theme-dark .apexcharts-selection-icon svg,.apexcharts-theme-dark .apexcharts-toolbar-custom-icon svg,.apexcharts-theme-dark .apexcharts-zoom-icon svg,.apexcharts-theme-dark .apexcharts-zoomin-icon svg,.apexcharts-theme-dark .apexcharts-zoomout-icon svg {\n  fill: #f3f4f5\n}\n\n.apexcharts-canvas .apexcharts-reset-zoom-icon.apexcharts-selected svg,.apexcharts-canvas .apexcharts-selection-icon.apexcharts-selected svg,.apexcharts-canvas .apexcharts-zoom-icon.apexcharts-selected svg {\n  fill: #008ffb\n}\n\n.apexcharts-theme-light .apexcharts-menu-icon:hover svg,.apexcharts-theme-light .apexcharts-reset-icon:hover svg,.apexcharts-theme-light .apexcharts-selection-icon:not(.apexcharts-selected):hover svg,.apexcharts-theme-light .apexcharts-zoom-icon:not(.apexcharts-selected):hover svg,.apexcharts-theme-light .apexcharts-zoomin-icon:hover svg,.apexcharts-theme-light .apexcharts-zoomout-icon:hover svg {\n  fill: #333\n}\n\n.apexcharts-menu-icon,.apexcharts-selection-icon {\n  position: relative\n}\n\n.apexcharts-reset-icon {\n  margin-left: 5px\n}\n\n.apexcharts-menu-icon,.apexcharts-reset-icon,.apexcharts-zoom-icon {\n  transform: scale(.85)\n}\n\n.apexcharts-zoomin-icon,.apexcharts-zoomout-icon {\n  transform: scale(.7)\n}\n\n.apexcharts-zoomout-icon {\n  margin-right: 3px\n}\n\n.apexcharts-pan-icon {\n  transform: scale(.62);\n  position: relative;\n  left: 1px;\n  top: 0\n}\n\n.apexcharts-pan-icon svg {\n  fill: #fff;\n  stroke: #6e8192;\n  stroke-width: 2\n}\n\n.apexcharts-pan-icon.apexcharts-selected svg {\n  stroke: #008ffb\n}\n\n.apexcharts-pan-icon:not(.apexcharts-selected):hover svg {\n  stroke: #333\n}\n\n.apexcharts-toolbar {\n  position: absolute;\n  z-index: 11;\n  max-width: 176px;\n  text-align: right;\n  border-radius: 3px;\n  padding: 0 6px 2px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center\n}\n\n.apexcharts-menu {\n  background: #fff;\n  position: absolute;\n  top: 100%;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  padding: 3px;\n  right: 10px;\n  opacity: 0;\n  min-width: 110px;\n  transition: .15s ease all;\n  pointer-events: none\n}\n\n.apexcharts-menu.apexcharts-menu-open {\n  opacity: 1;\n  pointer-events: all;\n  transition: .15s ease all\n}\n\n.apexcharts-menu-item {\n  padding: 6px 7px;\n  font-size: 12px;\n  cursor: pointer\n}\n\n.apexcharts-theme-light .apexcharts-menu-item:hover {\n  background: #eee\n}\n\n.apexcharts-theme-dark .apexcharts-menu {\n  background: rgba(0,0,0,.7);\n  color: #fff\n}\n\n@media screen and (min-width:768px) {\n  .apexcharts-canvas:hover .apexcharts-toolbar {\n      opacity: 1\n  }\n}\n\n.apexcharts-canvas .apexcharts-element-hidden,.apexcharts-datalabel.apexcharts-element-hidden,.apexcharts-hide .apexcharts-series-points {\n  opacity: 0\n}\n\n.apexcharts-hidden-element-shown {\n  opacity: 1;\n  transition: 0.25s ease all;\n}\n.apexcharts-datalabel,.apexcharts-datalabel-label,.apexcharts-datalabel-value,.apexcharts-datalabels,.apexcharts-pie-label {\n  cursor: default;\n  pointer-events: none\n}\n\n.apexcharts-pie-label-delay {\n  opacity: 0;\n  animation-name: opaque;\n  animation-duration: .3s;\n  animation-fill-mode: forwards;\n  animation-timing-function: ease\n}\n\n.apexcharts-annotation-rect,.apexcharts-area-series .apexcharts-area,.apexcharts-area-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events,.apexcharts-gridline,.apexcharts-line,.apexcharts-line-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events,.apexcharts-point-annotation-label,.apexcharts-radar-series path,.apexcharts-radar-series polygon,.apexcharts-toolbar svg,.apexcharts-tooltip .apexcharts-marker,.apexcharts-xaxis-annotation-label,.apexcharts-yaxis-annotation-label,.apexcharts-zoom-rect {\n  pointer-events: none\n}\n\n.apexcharts-marker {\n  transition: .15s ease all\n}\n\n.resize-triggers {\n  animation: 1ms resizeanim;\n  visibility: hidden;\n  opacity: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden\n}\n\n.contract-trigger:before,.resize-triggers,.resize-triggers>div {\n  content: " ";\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0\n}\n\n.resize-triggers>div {\n  height: 100%;\n  width: 100%;\n  background: #eee;\n  overflow: auto\n}\n\n.contract-trigger:before {\n  overflow: hidden;\n  width: 200%;\n  height: 200%\n}\n\n.apexcharts-bar-goals-markers{\n  pointer-events: none\n}\n\n.apexcharts-bar-shadows{\n  pointer-events: none\n}\n\n.apexcharts-rangebar-goals-markers{\n  pointer-events: none\n}',r?s.prepend(t.css):o.head.appendChild(t.css));}var l=t.create(t.w.config.series,{});if(!l)return e(t);t.mount(l).then((function(){"function"==typeof t.w.config.chart.events.mounted&&t.w.config.chart.events.mounted(t,t.w),t.events.fireEvent("mounted",[t,t.w]),e(l);})).catch((function(t){i(t);}));}else i(new Error("Element not found"));}))}},{key:"create",value:function(t,e){var i=this.w;new Gt(this).initModules();var a=this.w.globals;(a.noData=!1,a.animationEnded=!1,this.responsive.checkResponsiveConfig(e),i.config.xaxis.convertedCatToNumeric)&&new X(i.config).convertCatToNumericXaxis(i.config,this.ctx);if(null===this.el)return a.animationEnded=!0,null;if(this.core.setupElements(),"treemap"===i.config.chart.type&&(i.config.grid.show=!1,i.config.yaxis[0].show=!1),0===a.svgWidth)return a.animationEnded=!0,null;var s=y.checkComboSeries(t);a.comboCharts=s.comboCharts,a.comboBarCount=s.comboBarCount;var r=t.every((function(t){return t.data&&0===t.data.length}));(0===t.length||r)&&this.series.handleNoData(),this.events.setupEventHandlers(),this.data.parseData(t),this.theme.init(),new H(this).setGlobalMarkerSize(),this.formatters.setLabelFormatters(),this.titleSubtitle.draw(),a.noData&&a.collapsedSeries.length!==a.series.length&&!i.config.legend.showForSingleSeries||this.legend.init(),this.series.hasAllSeriesEqualX(),a.axisCharts&&(this.core.coreCalculations(),"category"!==i.config.xaxis.type&&this.formatters.setLabelFormatters(),this.ctx.toolbar.minX=i.globals.minX,this.ctx.toolbar.maxX=i.globals.maxX),this.formatters.heatmapLabelFormatters(),new y(this).getLargestMarkerSize(),this.dimensions.plotCoords();var o=this.core.xySettings();this.grid.createGridMask();var n=this.core.plotChartType(t,o),l=new O(this);return l.bringForward(),i.config.dataLabels.background.enabled&&l.dataLabelsBackground(),this.core.shiftGraphPosition(),{elGraph:n,xyRatios:o,dimensions:{plot:{left:i.globals.translateX,top:i.globals.translateY,width:i.globals.gridWidth,height:i.globals.gridHeight}}}}},{key:"mount",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=this,a=i.w;return new Promise((function(s,r){if(null===i.el)return r(new Error("Not enough data to display or target element not found"));(null===e||a.globals.allSeriesCollapsed)&&i.series.handleNoData(),i.grid=new j(i);var o,n,l=i.grid.drawGrid();(i.annotations=new P(i),i.annotations.drawImageAnnos(),i.annotations.drawTextAnnos(),"back"===a.config.grid.position)&&(l&&a.globals.dom.elGraphical.add(l.el),null!=l&&null!==(o=l.elGridBorders)&&void 0!==o&&o.node&&a.globals.dom.elGraphical.add(l.elGridBorders));if(Array.isArray(e.elGraph))for(var h=0;h<e.elGraph.length;h++)a.globals.dom.elGraphical.add(e.elGraph[h]);else a.globals.dom.elGraphical.add(e.elGraph);"front"===a.config.grid.position&&(l&&a.globals.dom.elGraphical.add(l.el),null!=l&&null!==(n=l.elGridBorders)&&void 0!==n&&n.node&&a.globals.dom.elGraphical.add(l.elGridBorders));"front"===a.config.xaxis.crosshairs.position&&i.crosshairs.drawXCrosshairs(),"front"===a.config.yaxis[0].crosshairs.position&&i.crosshairs.drawYCrosshairs(),"treemap"!==a.config.chart.type&&i.axes.drawAxis(a.config.chart.type,l);var c=new V(t.ctx,l),d=new q(t.ctx,l);if(null!==l&&(c.xAxisLabelCorrections(l.xAxisTickWidth),d.setYAxisTextAlignments(),a.config.yaxis.map((function(t,e){-1===a.globals.ignoreYAxisIndexes.indexOf(e)&&d.yAxisTitleRotate(e,t.opposite);}))),i.annotations.drawAxesAnnotations(),!a.globals.noData){if(a.config.tooltip.enabled&&!a.globals.noData&&i.w.globals.tooltip.drawTooltip(e.xyRatios),a.globals.axisCharts&&(a.globals.isXNumeric||a.config.xaxis.convertedCatToNumeric||a.globals.isRangeBar))(a.config.chart.zoom.enabled||a.config.chart.selection&&a.config.chart.selection.enabled||a.config.chart.pan&&a.config.chart.pan.enabled)&&i.zoomPanSelection.init({xyRatios:e.xyRatios});else {var g=a.config.chart.toolbar.tools;["zoom","zoomin","zoomout","selection","pan","reset"].forEach((function(t){g[t]=!1;}));}a.config.chart.toolbar.show&&!a.globals.allSeriesCollapsed&&i.toolbar.createToolbar();}a.globals.memory.methodsToExec.length>0&&a.globals.memory.methodsToExec.forEach((function(t){t.method(t.params,!1,t.context);})),a.globals.axisCharts||a.globals.noData||i.core.resizeNonAxisCharts(),s(i);}))}},{key:"destroy",value:function(){var t,e;window.removeEventListener("resize",this.windowResizeHandler),this.el.parentNode,t=this.parentResizeHandler,(e=jt.get(t))&&(e.disconnect(),jt.delete(t));var i=this.w.config.chart.id;i&&Apex._chartInstances.forEach((function(t,e){t.id===x.escapeString(i)&&Apex._chartInstances.splice(e,1);})),new Vt(this.ctx).clear({isUpdating:!1});}},{key:"updateOptions",value:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],o=this.w;return o.globals.selection=void 0,t.series&&(this.series.resetSeries(!1,!0,!1),t.series.length&&t.series[0].data&&(t.series=t.series.map((function(t,i){return e.updateHelpers._extendSeries(t,i)}))),this.updateHelpers.revertDefaultAxisMinMax()),t.xaxis&&(t=this.updateHelpers.forceXAxisUpdate(t)),t.yaxis&&(t=this.updateHelpers.forceYAxisUpdate(t)),o.globals.collapsedSeriesIndices.length>0&&this.series.clearPreviousPaths(),t.theme&&(t=this.theme.updateThemeOptions(t)),this.updateHelpers._updateOptions(t,i,a,s,r)}},{key:"updateSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return this.series.resetSeries(!1),this.updateHelpers.revertDefaultAxisMinMax(),this.updateHelpers._updateSeries(t,e,i)}},{key:"appendSeries",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=this.w.config.series.slice();return a.push(t),this.series.resetSeries(!1),this.updateHelpers.revertDefaultAxisMinMax(),this.updateHelpers._updateSeries(a,e,i)}},{key:"appendData",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=this;i.w.globals.dataChanged=!0,i.series.getPreviousPaths();for(var a=i.w.config.series.slice(),s=0;s<a.length;s++)if(null!==t[s]&&void 0!==t[s])for(var r=0;r<t[s].data.length;r++)a[s].data.push(t[s].data[r]);return i.w.config.series=a,e&&(i.w.globals.initialSeries=x.clone(i.w.config.series)),this.update()}},{key:"update",value:function(t){var e=this;return new Promise((function(i,a){new Vt(e.ctx).clear({isUpdating:!0});var s=e.create(e.w.config.series,t);if(!s)return i(e);e.mount(s).then((function(){"function"==typeof e.w.config.chart.events.updated&&e.w.config.chart.events.updated(e,e.w),e.events.fireEvent("updated",[e,e.w]),e.w.globals.isDirty=!0,i(e);})).catch((function(t){a(t);}));}))}},{key:"getSyncedCharts",value:function(){var t=this.getGroupedCharts(),e=[this];return t.length&&(e=[],t.forEach((function(t){e.push(t);}))),e}},{key:"getGroupedCharts",value:function(){var t=this;return Apex._chartInstances.filter((function(t){if(t.group)return !0})).map((function(e){return t.w.config.chart.group===e.group?e.chart:t}))}},{key:"toggleSeries",value:function(t){return this.series.toggleSeries(t)}},{key:"highlightSeriesOnLegendHover",value:function(t,e){return this.series.toggleSeriesOnHover(t,e)}},{key:"showSeries",value:function(t){this.series.showSeries(t);}},{key:"hideSeries",value:function(t){this.series.hideSeries(t);}},{key:"isSeriesHidden",value:function(t){this.series.isSeriesHidden(t);}},{key:"resetSeries",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.series.resetSeries(t,e);}},{key:"addEventListener",value:function(t,e){this.events.addEventListener(t,e);}},{key:"removeEventListener",value:function(t,e){this.events.removeEventListener(t,e);}},{key:"addXaxisAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,a=this;i&&(a=i),a.annotations.addXaxisAnnotationExternal(t,e,a);}},{key:"addYaxisAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,a=this;i&&(a=i),a.annotations.addYaxisAnnotationExternal(t,e,a);}},{key:"addPointAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,a=this;i&&(a=i),a.annotations.addPointAnnotationExternal(t,e,a);}},{key:"clearAnnotations",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,e=this;t&&(e=t),e.annotations.clearAnnotations(e);}},{key:"removeAnnotation",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,i=this;e&&(i=e),i.annotations.removeAnnotation(i,t);}},{key:"getChartArea",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-inner")}},{key:"getSeriesTotalXRange",value:function(t,e){return this.coreUtils.getSeriesTotalsXRange(t,e)}},{key:"getHighestValueInSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new U(this.ctx).getMinYMaxY(t).highestY}},{key:"getLowestValueInSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new U(this.ctx).getMinYMaxY(t).lowestY}},{key:"getSeriesTotal",value:function(){return this.w.globals.seriesTotals}},{key:"toggleDataPointSelection",value:function(t,e){return this.updateHelpers.toggleDataPointSelection(t,e)}},{key:"zoomX",value:function(t,e){this.ctx.toolbar.zoomUpdateOptions(t,e);}},{key:"setLocale",value:function(t){this.localization.setCurrentLocaleValues(t);}},{key:"dataURI",value:function(t){return new G(this.ctx).dataURI(t)}},{key:"exportToCSV",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new G(this.ctx).exportToCSV(t)}},{key:"paper",value:function(){return this.w.globals.dom.Paper}},{key:"_parentResizeCallback",value:function(){this.w.globals.animationEnded&&this.w.config.chart.redrawOnParentResize&&this._windowResize();}},{key:"_windowResize",value:function(){var t=this;clearTimeout(this.w.globals.resizeTimer),this.w.globals.resizeTimer=window.setTimeout((function(){t.w.globals.resized=!0,t.w.globals.dataChanged=!1,t.ctx.update();}),150);}},{key:"_windowResizeHandler",value:function(){var t=this.w.config.chart.redrawOnWindowResize;"function"==typeof t&&(t=t()),t&&this._windowResize();}}],[{key:"getChartByID",value:function(t){var e=x.escapeString(t);if(Apex._chartInstances){var i=Apex._chartInstances.filter((function(t){return t.id===e}))[0];return i&&i.chart}}},{key:"initOnLoad",value:function(){for(var e=document.querySelectorAll("[data-apexcharts]"),i=0;i<e.length;i++){new t(e[i],JSON.parse(e[i].getAttribute("data-options"))).render();}}},{key:"exec",value:function(t,e){var i=this.getChartByID(t);if(i){i.w.globals.isExecCalled=!0;var a=null;if(-1!==i.publicMethods.indexOf(e)){for(var s=arguments.length,r=new Array(s>2?s-2:0),o=2;o<s;o++)r[o-2]=arguments[o];a=i[e].apply(i,r);}return a}}},{key:"merge",value:function(t,e){return x.extend(t,e)}}]),t}();module.exports=_t; 
  } (apexcharts_common, apexcharts_common.exports));

  var apexcharts_commonExports = apexcharts_common.exports;
  var ApexCharts$1 = /*@__PURE__*/getDefaultExportFromCjs(apexcharts_commonExports);

  var chart = {
    props: {},
    data: {
      targets: '> .list',
      active: false,
      animation: [true],
      openSize: null,
      closeSize: null,
      openText: "열기",
      closeText: "닫기",
      clsOpen: 'mui_active',
      toggle: ' .ctrl',
      transition: 'ease',
      duration: 300,
      offset: 0
    },
    connected: function connected() {},
    methods: {
      render: function render() {
        var $el = this.$el;
        var options = {
          chart: {
            type: 'line'
          },
          series: [{
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
          }],
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        };
        new ApexCharts$1($el, options).render();
      }
    }
  };

  var worklists = {
    mixins: [Class, Togglable],
    props: {
      selector: String
    },
    data: {
      mainPath: '/pages/index.html',
      sidePath: '#pageLists',
      selector: " .tree-title",
      topNav: '#topNav a',
      sideTabLists: '#pages > div',
      clsOpen: "tree-open",
      clsClose: "tree-close",
      treeLists: ".lists button",
      contentframe: "#content_frame"
    },
    computed: {
      contentframe: function contentframe(_ref) {
        var contentframe = _ref.contentframe;
        return $$1(contentframe);
      },
      mainPath: function mainPath(_ref2) {
        var mainPath = _ref2.mainPath;
        return !!localStorage.getItem('url') ? localStorage.getItem('url') : mainPath;
      },
      sidePath: function sidePath(_ref3) {
        var sidePath = _ref3.sidePath;
        return !!localStorage.getItem('sideNav') ? localStorage.getItem('sideNav') : sidePath;
      }
    },
    events: [{
      name: "readystatechange load hashchange popstate",
      el: inBrowser && window,
      handler: function handler(e) {
        this.viewMainFrame(this.mainPath);
        this.viewsideNavigation(this.sidePath);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.selector);
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log(this.path);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.topNav);
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log(e.current.hash);
        this.viewsideNavigation(e.current.hash);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.treeLists);
      },
      handler: function handler(e) {
        e.preventDefault();
        var path = attr(e.current, 'data-href');
        this.viewMainFrame(path);
      }
    }, {
      name: "scroll",
      el: window,
      handler: function handler() {
        // this.$emit('resize');
      }
    }],
    methods: {
      test: function test() {
        alert("dddddd");
      },
      setMainContent: function setMainContent() {
        console.log('sdfsdf');
      },
      viewMainFrame: function viewMainFrame(path) {
        localStorage.setItem('url', path);
        attr(this.contentframe, 'src', path);
      },
      viewsideNavigation: function viewsideNavigation(id) {
        localStorage.setItem('sideNav', id);
        $$(this.sideTabLists).forEach(function (el) {
          return css(el, 'display', "#".concat(el.id) === id ? 'block' : 'none');
        });
      }
    }
  };

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Accordion: accordion,
    Tab: tab,
    Toggle: toggle,
    Tooltip: tooltip,
    Formatter: formatter,
    Modal: modal,
    Slider: slider,
    Tree: tree,
    Addimage: addimage,
    Acclist: acclist,
    Scrollbar: scrollbar,
    Datepicker: datepicker,
    Sticky: sticky,
    Sortable: sortable,
    Chart: chart,
    Worklists: worklists
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

  var GCui = function GCui(options) {
    this._init(options);
  };
  GCui.util = util;
  GCui.data = 'uiComponents';
  GCui.prefixName = jsPrefix;
  GCui.prefix = "".concat(jsPrefix, "-");
  GCui.options = {};
  GCui.version = 1.0;

  // globalAPI Start
  globalApi(GCui);
  // globalAPI End

  // hooksAPI, stateAPI Start
  initializeApi(GCui);
  // hooksAPI End

  // componentAPI Start
  componentCore(GCui);
  // componentAPI End

  // instanceAPI Start
  instanceApi(GCui);
  // instanceAPI End

  // boot Start
  setFramewrok(GCui);
  // boot End

  each(components, function (component, name) {
    return GCui.component(name, component);
  });
  GCui.use(function (GCui) {
    inBrowser && ready(function () {
      GCui.update();
      // on(window, 'load resize', () => GCui.update(null, 'resize'))

      var pending;
      on(window, 'scroll', function (e) {
        if (pending) {
          return;
        }
        pending = true;
        fastdom.write(function () {
          return pending = false;
        });
        GCui.update(null, e.type);
      }, {
        passive: true,
        capture: true
      });
    });
  });

  return GCui;

}));
//# sourceMappingURL=index.js.map
