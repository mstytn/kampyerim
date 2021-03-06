"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _getId = /*#__PURE__*/new WeakSet();

var _redirect = /*#__PURE__*/new WeakSet();

var Kampi = /*#__PURE__*/function () {
  function Kampi() {
    var backendOrigin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http://localhost:3000';

    _classCallCheck(this, Kampi);

    _classPrivateMethodInitSpec(this, _redirect);

    _classPrivateMethodInitSpec(this, _getId);

    this.backendOrigin = backendOrigin;
    this.id = _classPrivateMethodGet(this, _getId, _getId2).call(this);

    if (!this.id) {
      document.querySelector('.preload-message').innerText = "Kamp bulunamad??";

      _classPrivateMethodGet(this, _redirect, _redirect2).call(this);
    }

    this.camp = undefined;
    this.myHeaders = new Headers();
    this.myHeaders.append('Accept', '*/*');
    this.myHeaders.append('Content-Type', 'application/json');
    this.myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    this.requestOptions = {
      method: 'GET',
      headers: this.myHeaders,
      redirect: 'follow'
    };
  }

  _createClass(Kampi, [{
    key: "fetchGet",
    value: function () {
      var _fetchGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(route) {
        var res, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(this.backendOrigin + route, this.requestOptions);

              case 2:
                res = _context.sent;
                _context.next = 5;
                return res.json();

              case 5:
                data = _context.sent;
                return _context.abrupt("return", data);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchGet(_x) {
        return _fetchGet.apply(this, arguments);
      }

      return fetchGet;
    }()
  }, {
    key: "fetchPost",
    value: function () {
      var _fetchPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(route, requestBody) {
        var res, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(this.backendOrigin + route, this.body(requestBody));

              case 2:
                res = _context2.sent;
                _context2.next = 5;
                return res.json();

              case 5:
                data = _context2.sent;
                return _context2.abrupt("return", data);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchPost(_x2, _x3) {
        return _fetchPost.apply(this, arguments);
      }

      return fetchPost;
    }()
  }, {
    key: "body",
    value: function body(requestBody) {
      return {
        method: 'POST',
        headers: this.myHeaders,
        redirect: 'follow',
        body: JSON.stringify(requestBody)
      };
    }
  }, {
    key: "getCampInfo",
    value: function () {
      var _getCampInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.camp) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this.camp);

              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return this.fetchGet('/camps/camp/' + this.id);

              case 5:
                data = _context3.sent;
                if (!data.success) document.querySelector('.preload-message').innerText = "Kamp bulunamad??";
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                document.querySelector('.preload-message').innerText = "Beklenmeyen Hata";

              case 12:
                if (!data) _classPrivateMethodGet(this, _redirect, _redirect2).call(this);
                if (!data.success) _classPrivateMethodGet(this, _redirect, _redirect2).call(this);
                this.camp = data.data;
                return _context3.abrupt("return", this.camp);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
      }));

      function getCampInfo() {
        return _getCampInfo.apply(this, arguments);
      }

      return getCampInfo;
    }()
  }]);

  return Kampi;
}();

function _getId2() {
  var search = document.location.search.substring(1);
  if (!search || search.length < 1) return undefined;
  var req = search.split('=');
  if (req.length < 2) return undefined;
  if (req[0] !== 'id') return undefined;
  return req[1];
}

function _redirect2() {
  setTimeout(function () {
    document.location.href = 'index.html';
  }, 4000);
}

var UserLocation = /*#__PURE__*/function () {
  function UserLocation() {
    _classCallCheck(this, UserLocation);

    this.userLocation = undefined;
    this.point = [32.866287, 39.925533];
    this.isPointGathered = false;
  }

  _createClass(UserLocation, [{
    key: "requestLocation",
    value: function () {
      var _requestLocation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this = this;

        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (res, rej) {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                      _this.point = [position.coords.longitude, position.coords.latitude];
                      _this.isPointGathered = true;
                      res({
                        type: "Point",
                        location: [position.coords.latitude, position.coords.longitude]
                      });
                    }, function (err) {
                      return rej(err);
                    });
                  }
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function requestLocation() {
        return _requestLocation.apply(this, arguments);
      }

      return requestLocation;
    }()
  }]);

  return UserLocation;
}();

var _updatePage = /*#__PURE__*/new WeakSet();

var _hook = /*#__PURE__*/new WeakSet();

var _carouselClick = /*#__PURE__*/new WeakMap();

var _updateFullCarouselElements = /*#__PURE__*/new WeakSet();

var _createFullScreenCarousel = /*#__PURE__*/new WeakSet();

var _toggleFullCarousel = /*#__PURE__*/new WeakMap();

var _fullcarouselSelectorActivate = /*#__PURE__*/new WeakSet();

var _weatherExpand = /*#__PURE__*/new WeakMap();

var Page = /*#__PURE__*/function () {
  function Page() {
    var _this2 = this;

    _classCallCheck(this, Page);

    _classPrivateMethodInitSpec(this, _fullcarouselSelectorActivate);

    _classPrivateMethodInitSpec(this, _createFullScreenCarousel);

    _classPrivateMethodInitSpec(this, _updateFullCarouselElements);

    _classPrivateMethodInitSpec(this, _hook);

    _classPrivateMethodInitSpec(this, _updatePage);

    _classPrivateFieldInitSpec(this, _carouselClick, {
      writable: true,
      value: function value(event) {
        var imgIndex = event.target.getAttribute('data-index');

        _classPrivateFieldGet(_this2, _toggleFullCarousel).call(_this2, imgIndex);
      }
    });

    _classPrivateFieldInitSpec(this, _toggleFullCarousel, {
      writable: true,
      value: function value() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        _this2.fullcarousel.activeIndex = index;

        _classPrivateMethodGet(_this2, _fullcarouselSelectorActivate, _fullcarouselSelectorActivate2).call(_this2);

        if (_this2.fullcarousel.isVisible) {
          _this2.fullcarousel.element.classList.remove('show');

          document.querySelector('body').style.overflow = 'auto';
          _this2.fullcarousel.isVisible = false;
        } else {
          _this2.fullcarousel.element.classList.add('show');

          document.querySelector('body').style.overflow = 'hidden';
          _this2.fullcarousel.isVisible = true;
        }
      }
    });

    _classPrivateFieldInitSpec(this, _weatherExpand, {
      writable: true,
      value: function value(event) {
        if (!_this2.weatherInfoExpanded) {
          _this2.weahterInfo.classList.add('expanded');

          _this2.weatherInfoExpanded = true;
          setTimeout(function () {
            _this2.weatherExpandButtonIcon.classList.remove('bi-chevron-compact-right');

            _this2.weatherExpandButtonIcon.classList.add('bi-chevron-compact-left');
          }, 500);
        } else {
          _this2.weahterInfo.classList.remove('expanded');

          _this2.weatherInfoExpanded = false;
          setTimeout(function () {
            _this2.weatherExpandButtonIcon.classList.remove('bi-chevron-compact-left');

            _this2.weatherExpandButtonIcon.classList.add('bi-chevron-compact-right');
          }, 500);
        }
      }
    });

    this.appPage = document.querySelector('.apppage');
    this.preloader = document.querySelector('.preloader');
    this.appBgImage = document.querySelector('.bg-image');
    this.pageHeader = document.querySelector('.page__header__title');
    this.pageSubtitle = document.querySelector('.page__header__subtitle');
    this.pageLocation = document.querySelector('.page__header__location > span');
    this.campInfoHeader = document.querySelector('.camp__info__header__h');
    this.campInfoParagraph = document.querySelector('.camp__info__header__p');
    this.weatherExpandButton = document.querySelector('.expander');
    this.weatherExpandButtonIcon = document.querySelector('.expander > i.bi');
    this.weahterInfo = document.querySelector('.weather');
    this.weatherInfoExpanded = false;
    this.carousel = document.querySelector('.images__carousel'), this.fullcarousel = {
      element: document.querySelector('.carousel'),
      isVisible: false,
      closeButton: document.querySelector('.carousel > button'),
      imageSelectorElement: document.querySelector('.carousel .img-selector'),
      carouselImages: document.querySelectorAll('.carousel > .img-selector > .img'),
      activeIndex: -1,
      mainImageElement: document.querySelector('.carousel .disimage > img'),
      carouselImageLinks: []
    };
    this.weatherToday = {
      day: document.querySelector('#gun1 > h3'),
      icon: document.querySelector('#gun1 img'),
      min: document.querySelector('#gun1 .min'),
      now: document.querySelector('#gun1 .now'),
      max: document.querySelector('#gun1 .max')
    };
    this.weatherNext = [];

    for (var i = 2; i < 5; i++) {
      var day = document.querySelector("#gun".concat(i, " > h3"));
      var icon = document.querySelector("#gun".concat(i, " img"));
      var min = document.querySelector("#gun".concat(i, " .min"));
      var max = document.querySelector("#gun".concat(i, " .max"));
      this.weatherNext.push({
        day: day,
        icon: icon,
        min: min,
        max: max
      });
    }

    this.distance = document.querySelector('.road span');

    _classPrivateMethodGet(this, _hook, _hook2).call(this);
  }

  _createClass(Page, [{
    key: "removePreloader",
    value: function removePreloader() {
      document.querySelector('body').removeChild(this.preloader);
    }
  }, {
    key: "showAppPage",
    value: function () {
      var _showAppPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _classPrivateMethodGet(this, _updatePage, _updatePage2).call(this, data);

              case 2:
                this.appPage.classList.add('visible');

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function showAppPage(_x4) {
        return _showAppPage.apply(this, arguments);
      }

      return showAppPage;
    }()
  }, {
    key: "updateDistance",
    value: function updateDistance(distanceData) {
      if (distanceData) this.distance.innerText = distanceData + ' km';
    }
  }, {
    key: "createCraousel",
    value: function createCraousel(imageLinks) {
      var _this3 = this;

      this.fullcarousel.carouselImageLinks = imageLinks;
      this.fullcarousel.carouselImageLinks.forEach(function (il, i) {
        _this3.carousel.insertAdjacentHTML('beforeend', "\n        <div class=\"img\" data-index=\"".concat(i, "\">\n          <img src=\"").concat(il, "\" alt=\"").concat(il, "\">\n        </div>\n      "));
      });

      _classPrivateMethodGet(this, _createFullScreenCarousel, _createFullScreenCarousel2).call(this);
    }
  }, {
    key: "updateWeather",
    value: function updateWeather(wData) {
      var _this4 = this;

      var _wData$data$weather$m = wData.data.weather.main,
          temp = _wData$data$weather$m.temp,
          temp_min = _wData$data$weather$m.temp_min,
          temp_max = _wData$data$weather$m.temp_max;
      var icon = wData.data.weather.weather[0].icon;
      this.weatherToday.icon.src = "imgs/".concat(icon, ".png");
      this.weatherToday.min.innerText = Math.round(temp_min);
      this.weatherToday.max.innerText = Math.round(temp_max);
      this.weatherToday.now.innerText = Math.round(temp);

      if (!wData.data.dailyWeather) {
        this.weatherExpandButton.style.display = 'none';
        return;
      }

      wData.data.dailyWeather.forEach(function (data, index) {
        var weekdadays = ["Pzr", "Pzt", "Sal", "??r??", "Pr??", "Cum", "Cts"];
        var dt = new Date(data.dt_txt);
        var theDate = weekdadays[dt.getDay()];
        var min_temp = data.min_temp,
            max_temp = data.max_temp;
        var icon = data.weather[0].icon;
        _this4.weatherNext[index].icon.src = "imgs/".concat(icon, ".png");
        _this4.weatherNext[index].min.innerText = Math.round(min_temp);
        _this4.weatherNext[index].max.innerText = Math.round(max_temp);
        _this4.weatherNext[index].day.innerText = theDate;
      });
    }
  }]);

  return Page;
}();

function _updatePage2(_x5) {
  return _updatePage3.apply(this, arguments);
}

function _updatePage3() {
  _updatePage3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data) {
    var bgstyle;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            document.title = 'Kampi | ' + data.name;
            bgstyle = document.querySelector('body').style;
            bgstyle.backgroundImage = "url(".concat(data.images[0], ")");
            bgstyle.backgroundRepeat = 'no-repeat';
            bgstyle.backgroundAttachment = 'fixed';
            bgstyle.backgroundPosition = 'center';
            bgstyle.backgroundSize = 'cover';
            this.pageHeader.innerText = data.name;
            this.pageSubtitle.innerText = data.placename.replace(', Turkey', '').replace(/\d+/g, '');
            this.pageLocation.innerText = "".concat(data.place, " / ").concat(data.region);
            this.campInfoHeader.innerText = data.name;
            this.campInfoParagraph.innerText = data.description;

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));
  return _updatePage3.apply(this, arguments);
}

function _hook2() {
  var _this6 = this;

  this.weatherExpandButton.addEventListener('click', _classPrivateFieldGet(this, _weatherExpand));
  this.carousel.addEventListener('click', _classPrivateFieldGet(this, _carouselClick));
  this.fullcarousel.closeButton.addEventListener('click', function () {
    _classPrivateFieldGet(_this6, _toggleFullCarousel).call(_this6);
  });
}

function _updateFullCarouselElements2() {
  var _this7 = this;

  this.fullcarousel.element = document.querySelector('.carousel');
  this.fullcarousel.imageSelectorElement = document.querySelector('.carousel .img-selector');
  this.fullcarousel.carouselImages = document.querySelectorAll('.carousel > .img-selector > .img');
  this.fullcarousel.carouselImages.forEach(function (sel) {
    sel.addEventListener('click', function (event) {
      _this7.fullcarousel.activeIndex = Number(event.target.parentElement.getAttribute('data-index'));

      _classPrivateMethodGet(_this7, _fullcarouselSelectorActivate, _fullcarouselSelectorActivate2).call(_this7);
    });
  });
}

function _createFullScreenCarousel2() {
  var _this8 = this;

  this.fullcarousel.carouselImageLinks.forEach(function (il, i) {
    _this8.fullcarousel.imageSelectorElement.insertAdjacentHTML('beforeend', "\n      <div class=\"img\" data-index=\"".concat(i, "\">\n      <img src=\"").concat(il, "\" alt=\"").concat(il, "\">\n    </div>\n      "));
  });

  _classPrivateMethodGet(this, _updateFullCarouselElements, _updateFullCarouselElements2).call(this);
}

function _fullcarouselSelectorActivate2() {
  if (this.fullcarousel.carouselImageLinks.length < 2) {
    this.fullcarousel.imageSelectorElement.style.display = 'none';
    this.fullcarousel.mainImageElement.src = this.fullcarousel.carouselImages[this.fullcarousel.activeIndex].firstElementChild.src;
    return;
  } else {
    this.fullcarousel.imageSelectorElement.style.display = 'flex';
    this.fullcarousel.carouselImages.forEach(function (i) {
      i.classList.remove('active');
    });
    this.fullcarousel.carouselImages[this.fullcarousel.activeIndex].classList.add('active');
    this.fullcarousel.mainImageElement.src = this.fullcarousel.carouselImages[this.fullcarousel.activeIndex].firstElementChild.src;
  }
}

var MyMapbox = /*#__PURE__*/function () {
  function MyMapbox() {
    var _this5 = this;

    _classCallCheck(this, MyMapbox);

    _defineProperty(this, "createMap", function (location) {
      _this5.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: location,
        zoom: 10
      });

      _this5.map.on('load', function () {
        var marker = new mapboxgl.Marker();
        marker.setLngLat(location);
        marker.addTo(this);
      });
    });

    this.map = undefined;
    this.token = 'e72587d1b2ef43e9b6ec56f693612826';
  }

  _createClass(MyMapbox, [{
    key: "getToken",
    value: function () {
      var _getToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return kampi.fetchGet('/mapboxtoken/' + this.token);

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getToken() {
        return _getToken.apply(this, arguments);
      }

      return getToken;
    }()
  }]);

  return MyMapbox;
}();

var Weather = /*#__PURE__*/function () {
  function Weather() {
    _classCallCheck(this, Weather);

    this.coordinates = undefined;
    this.postalcode = undefined;
  }

  _createClass(Weather, [{
    key: "updateCampInfo",
    value: function updateCampInfo(coordinates, postalcode) {
      this.coordinates = coordinates;
      this.postalcode = postalcode;
    }
  }, {
    key: "getTheWeather",
    value: function () {
      var _getTheWeather = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var requester, data;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!this.coordinates || !this.postalcode)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", null);

              case 2:
                requester = {
                  coordinates: this.coordinates,
                  postalcode: this.postalcode
                };
                _context7.next = 5;
                return kampi.fetchPost('/weatherdata', requester);

              case 5:
                data = _context7.sent;
                return _context7.abrupt("return", data.data);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getTheWeather() {
        return _getTheWeather.apply(this, arguments);
      }

      return getTheWeather;
    }()
  }]);

  return Weather;
}();

var Distancer = /*#__PURE__*/function () {
  function Distancer() {
    _classCallCheck(this, Distancer);

    this.locdata = undefined;
    this.camplocation = undefined;
    this.distance = undefined;
  }

  _createClass(Distancer, [{
    key: "updateLocationData",
    value: function updateLocationData(loc, cloc) {
      this.locdata = loc;
      this.camplocation = cloc;
    }
  }, {
    key: "getDistance",
    value: function () {
      var _getDistance = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var requestBody, data;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(!this.locdata || !this.camplocation)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", {
                  data: false
                });

              case 2:
                requestBody = {
                  location: this.locdata,
                  camplocation: this.camplocation
                };
                _context8.next = 5;
                return kampi.fetchPost('/campdistance', requestBody);

              case 5:
                data = _context8.sent;
                return _context8.abrupt("return", data);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getDistance() {
        return _getDistance.apply(this, arguments);
      }

      return getDistance;
    }()
  }]);

  return Distancer;
}();

var page = new Page();
var kampi = new Kampi('https://kampisitesi.herokuapp.com');
var uLoc = new UserLocation();
var myMapBox = new MyMapbox();
var weather = new Weather();
var dist = new Distancer();

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var campInfo, wData, distance;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return uLoc.requestLocation();

          case 3:
            _context9.next = 7;
            break;

          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);

          case 7:
            _context9.next = 9;
            return kampi.getCampInfo();

          case 9:
            campInfo = _context9.sent;
            _context9.next = 12;
            return page.showAppPage(campInfo);

          case 12:
            dist.updateLocationData(uLoc.point, campInfo.location.coordinates);
            page.removePreloader();
            _context9.next = 16;
            return myMapBox.getToken();

          case 16:
            mapboxgl.accessToken = _context9.sent.data;
            myMapBox.createMap(campInfo.location.coordinates);
            weather.updateCampInfo(campInfo.location.coordinates, campInfo.postalcode);
            _context9.next = 21;
            return weather.getTheWeather();

          case 21:
            wData = _context9.sent;

            if (!uLoc.isPointGathered) {
              _context9.next = 27;
              break;
            }

            _context9.next = 25;
            return dist.getDistance();

          case 25:
            distance = _context9.sent;
            page.updateDistance(distance.data);

          case 27:
            page.updateWeather(wData);
            page.createCraousel(campInfo.images);

          case 29:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 5]]);
  }));
  return _main.apply(this, arguments);
}

main();