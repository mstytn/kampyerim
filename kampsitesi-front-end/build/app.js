"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var backendOrigin = 'http://localhost:3000';
var myHeaders = new Headers();
myHeaders.append('Accept', '*/*');
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

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
      var _requestLocation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this = this;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (res, rej) {
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
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function requestLocation() {
        return _requestLocation.apply(this, arguments);
      }

      return requestLocation;
    }()
  }, {
    key: "getPlace",
    value: function () {
      var _getPlace = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var userLocation, myHeaders, reqBody, requseOptions, response, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.requestLocation();

              case 2:
                userLocation = _context2.sent;
                myHeaders = new Headers();
                myHeaders.append('Accept', '*/*');
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
                this.userLocation = userLocation;
                reqBody = {
                  loc: userLocation.location
                };
                requseOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  redirect: 'follow',
                  body: JSON.stringify(reqBody)
                };
                _context2.next = 12;
                return fetch(backendOrigin + '/geoloc', requseOptions);

              case 12:
                response = _context2.sent;
                _context2.next = 15;
                return response.json();

              case 15:
                data = _context2.sent;
                return _context2.abrupt("return", data);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPlace() {
        return _getPlace.apply(this, arguments);
      }

      return getPlace;
    }()
  }]);

  return UserLocation;
}();

var FeaturedCaps = /*#__PURE__*/function () {
  function FeaturedCaps(featuredListQuery) {
    _classCallCheck(this, FeaturedCaps);

    this.featuredList = document.querySelector(featuredListQuery);
    this.fCamps = '';
    this.data = undefined;
  }

  _createClass(FeaturedCaps, [{
    key: "featuredCampGetter",
    value: function () {
      var _featuredCampGetter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var count,
            data,
            response,
            _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                count = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 5;
                this.myHeaders = new Headers();
                this.myHeaders.append('Accept', '*/*');
                this.myHeaders.append('Content-Type', 'application/json');
                this.myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
                this.requestOptions = {
                  method: 'GET',
                  headers: this.myHeaders,
                  redirect: 'follow'
                };

              case 6:
                if (data) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 9;
                return fetch(backendOrigin + '/camps/random', this.requestOptions);

              case 9:
                response = _context3.sent;
                _context3.next = 12;
                return response.json();

              case 12:
                data = _context3.sent;

                if (!data.success) {
                  _context3.next = 16;
                  break;
                }

                this.data = data.data;
                return _context3.abrupt("return", data.data.slice(0, count));

              case 16:
                _context3.next = 6;
                break;

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function featuredCampGetter() {
        return _featuredCampGetter.apply(this, arguments);
      }

      return featuredCampGetter;
    }()
  }, {
    key: "featuredCampCreator",
    value: function () {
      var _featuredCampCreator = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this2 = this;

        var data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.featuredCampGetter();

              case 2:
                data = _context4.sent;
                data.forEach(function (d, i) {
                  if (i < 4) _this2.fCamps += "\n          <div class=\"featured-camp\" data-link=\"".concat(d._id, "\">\n            <div class=\"featured-camp__img\">\n              <img src=\"").concat(d.images[0], "\" alt=\"").concat(d.name.toLowerCase(), "\">\n              </div>\n            <img class=\"dummy\" src=\"imgs/loader.gif\" alt=\"dummy\">\n            <div class=\"featured-camp__info\">\n              <h3>").concat(d.name.toLowerCase(), "</h3>\n              <p><i class=\"bi bi-geo-alt-fill\"></i> ").concat(d.region, "</p>\n            </div>\n          </div>\n        ");
                });
                return _context4.abrupt("return", this);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function featuredCampCreator() {
        return _featuredCampCreator.apply(this, arguments);
      }

      return featuredCampCreator;
    }()
  }, {
    key: "displayFeatured",
    value: function displayFeatured() {
      if (this.fCamps || this.fCamps !== '') {
        this.featuredList.innerHTML = '';
        this.featuredList.insertAdjacentHTML('afterbegin', this.fCamps);
        this.featuredList.addEventListener('mouseover', /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e) {
            var id, res, data, flyer;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    id = e.target.getAttribute('data-link');

                    if (!id) {
                      _context5.next = 9;
                      break;
                    }

                    _context5.next = 4;
                    return fetch(backendOrigin + '/camps/camp/' + id);

                  case 4:
                    res = _context5.sent;
                    _context5.next = 7;
                    return res.json();

                  case 7:
                    data = _context5.sent;
                    if (data) if (data.success) {
                      flyer = data.data.location.coordinates;

                      if (map) {
                        map.flyTo({
                          center: flyer,
                          zoom: 9,
                          essential: true // this animation is considered essential with respect to prefers-reduced-motion

                        });
                      }
                    }

                  case 9:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        this.featuredList.addEventListener('mouseout', function () {
          if (map) {
            map.flyTo({
              center: uloc.point,
              zoom: 4,
              essential: true // this animation is considered essential with respect to prefers-reduced-motion

            });
          }
        });
        this.featuredList.addEventListener('click', /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
            var id;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    id = e.target.getAttribute('data-link');
                    document.location.href = '/camp.html?id=' + id;

                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
    }
  }]);

  return FeaturedCaps;
}();

function showMap() {
  return _showMap.apply(this, arguments);
}

function _showMap() {
  _showMap = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var myHeaders, requestOptions, tokenResponse, mapboxToken, map, response, cluster;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            myHeaders = new Headers();
            myHeaders.append('Accept', '*/*');
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
            requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            _context10.next = 7;
            return fetch(backendOrigin + '/mapboxtoken/e72587d1b2ef43e9b6ec56f693612826', requestOptions);

          case 7:
            tokenResponse = _context10.sent;
            _context10.next = 10;
            return tokenResponse.json();

          case 10:
            mapboxToken = _context10.sent;
            mapboxgl.accessToken = mapboxToken.data;
            _context10.prev = 12;
            _context10.next = 15;
            return uloc.requestLocation();

          case 15:
            _context10.next = 19;
            break;

          case 17:
            _context10.prev = 17;
            _context10.t0 = _context10["catch"](12);

          case 19:
            map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/light-v10',
              center: uloc.point,
              zoom: 4
            });
            _context10.next = 22;
            return fetch(backendOrigin + '/camps/cluster', requestOptions);

          case 22:
            response = _context10.sent;
            _context10.next = 25;
            return response.json();

          case 25:
            cluster = _context10.sent;
            map.on('load', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      map.addSource('kampyerleri', {
                        type: 'geojson',
                        data: cluster.data,
                        cluster: true,
                        clusterMaxZoom: 8,
                        clusterRadius: 50
                      });
                      map.setLayoutProperty('country-label', 'text-field', ['get', "name_tr"]);
                      map.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'kampyerleri',
                        filter: ['has', 'point_count'],
                        paint: {
                          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                          // with three steps to implement three types of circles:
                          //   * Blue, 20px circles when point count is less than 100
                          //   * Yellow, 30px circles when point count is between 100 and 750
                          //   * Pink, 40px circles when point count is greater than or equal to 750
                          'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 25, '#f1f075', 50, '#f28cb1'],
                          'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
                        }
                      });
                      map.addLayer({
                        id: 'cluster-count',
                        type: 'symbol',
                        source: 'kampyerleri',
                        filter: ['has', 'point_count'],
                        layout: {
                          'text-field': '{point_count_abbreviated}',
                          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                          'text-size': 12
                        }
                      });
                      map.addLayer({
                        id: 'unclustered-point',
                        type: 'circle',
                        source: 'kampyerleri',
                        filter: ['!', ['has', 'point_count']],
                        paint: {
                          'circle-color': '#11b4da',
                          'circle-radius': 4,
                          'circle-stroke-width': 1,
                          'circle-stroke-color': '#fff'
                        }
                      });

                    case 5:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            }))); // inspect a cluster on click

            map.on('click', 'clusters', function (e) {
              var features = map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
              });
              var clusterId = features[0].properties.cluster_id;
              map.getSource('kampyerleri').getClusterExpansionZoom(clusterId, function (err, zoom) {
                if (err) return;
                map.easeTo({
                  center: features[0].geometry.coordinates,
                  zoom: zoom
                });
              });
            }); // When a click event occurs on a feature in
            // the unclustered-point layer, open a popup at
            // the location of the feature, with
            // description HTML from its properties.

            map.on('click', 'unclustered-point', /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(e) {
                var coordinates, id, res, data, _data$data, name, _id, place, region, images;

                return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        coordinates = e.features[0].geometry.coordinates.slice();
                        id = e.features[0].properties._id;
                        _context9.next = 4;
                        return fetch(backendOrigin + '/camps/camp/' + id);

                      case 4:
                        res = _context9.sent;
                        _context9.next = 7;
                        return res.json();

                      case 7:
                        data = _context9.sent;
                        _data$data = data.data, name = _data$data.name, _id = _data$data._id, place = _data$data.place, region = _data$data.region, images = _data$data.images; // Ensure that if the map is zoomed out such that
                        // multiple copies of the feature are visible, the
                        // popup appears over the copy being pointed to.

                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        new mapboxgl.Popup().setLngLat(coordinates).setHTML("<h3>".concat(name, "</h3>\n        <img src=\"").concat(images[0], "\" alt=\"").concat(name, "\" width=\"100%\">\n        <p>").concat(place, " / ").concat(region, "</p>\n        <a href=\"camp.html?id=").concat(_id, "\">daha fazla...</a>\n        ")).addTo(map);

                      case 11:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x9) {
                return _ref5.apply(this, arguments);
              };
            }());
            map.on('mouseenter', 'clusters', function () {
              map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', function () {
              map.getCanvas().style.cursor = '';
            });
            return _context10.abrupt("return", map);

          case 32:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[12, 17]]);
  }));
  return _showMap.apply(this, arguments);
}

var _hook = /*#__PURE__*/new WeakSet();

var Menugator = /*#__PURE__*/function () {
  function Menugator(menuselector, displayClass) {
    var _this3 = this;

    _classCallCheck(this, Menugator);

    _classPrivateMethodInitSpec(this, _hook);

    _defineProperty(this, "clickEvent", function (event) {
      _this3.toggle();
    });

    _defineProperty(this, "hoverEvent", function (event) {
      if (event.type === 'mouseover') _this3.isHover = true;else _this3.isHover = false;

      if (_this3.isHover) {
        _this3.iconElement.classList.remove('bi-x', 'bi-list');

        if (_this3.isOpen) _this3.iconElement.classList.add('bi-caret-right');else _this3.iconElement.classList.add('bi-caret-left');
      } else {
        _this3.iconElement.classList.remove('bi-caret-left', 'bi-caret-right');

        if (_this3.isOpen) _this3.iconElement.classList.add('bi-x');else _this3.iconElement.classList.add('bi-list');
      }
    });

    this.menuElement = document.querySelector(menuselector);
    this.buttonElement = document.querySelector(menuselector + ' button');
    this.iconElement = document.querySelector(menuselector + ' button > i');
    this.insideMenuElement = document.querySelector(menuselector + ' .navnav');
    this.isOpen = false;
    this.isHover = false;
    this.displayClass = displayClass;

    _classPrivateMethodGet(this, _hook, _hook2).call(this);
  }

  _createClass(Menugator, [{
    key: "toggle",
    value: function toggle() {
      if (this.isOpen) {
        this.menuElement.classList.remove(this.displayClass);
        this.buttonElement.classList.remove('trans');
        this.iconElement.classList.remove('bi-x');
        this.iconElement.classList.add('bi-list');
        this.insideMenuElement.classList.remove('show');
        this.isOpen = false;
      } else {
        this.menuElement.classList.add(this.displayClass);
        this.buttonElement.classList.add('trans');
        this.iconElement.classList.add('bi-x');
        this.iconElement.classList.remove('bi-list');
        this.insideMenuElement.classList.add('show');
        this.isOpen = true;
      }
    }
  }]);

  return Menugator;
}();

function _hook2() {
  var _this4 = this;

  if (this.menuElement) {
    this.buttonElement.addEventListener('click', this.clickEvent);
    this.buttonElement.addEventListener('mouseover', this.hoverEvent);
    this.buttonElement.addEventListener('mouseout', this.hoverEvent);
    document.querySelectorAll('.navul > li > a').forEach(function (nv) {
      nv.addEventListener('click', function () {
        setTimeout(function () {
          _this4.toggle();
        }, 300);
      });
    });
  }
}

var menu = new Menugator('.navholder', 'shownav');
var uloc = new UserLocation();
var map; // TODO: THIS IS THE MAP
// showMap().then(mp => {map = mp})

var fc = new FeaturedCaps('.featured-campgrid'); //SECTION: Unintentionally created entry point for appjs

fc.featuredCampCreator().then( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(o) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return uloc.requestLocation();

          case 3:
            _context7.next = 7;
            break;

          case 5:
            _context7.prev = 5;
            _context7.t0 = _context7["catch"](0);

          case 7:
            o.displayFeatured();
            randomCamp();
            kamplist();
            addBolgeFilteringSelector();

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 5]]);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

function randomCamp() {
  var _fc$data$ = fc.data[4],
      _id = _fc$data$._id,
      images = _fc$data$.images,
      description = _fc$data$.description,
      name = _fc$data$.name,
      placename = _fc$data$.placename,
      region = _fc$data$.region;
  var rh = document.querySelector('.rh');
  var ra = document.querySelector('.ra');
  var rl = document.querySelector('.rl');
  var rp = document.querySelector('.rp');
  var rf = document.querySelector('.rf');
  var ri = document.querySelector('.ri');
  rh.innerText = name;
  ra.innerText = placename.replace(', Turkey', '');
  rl.innerText = region;
  rp.innerText = description;
  rf.href = 'camp.html?id=' + _id;
  ri.src = images[0];
}

function kamplist() {
  return _kamplist.apply(this, arguments);
}

function _kamplist() {
  _kamplist = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var nearme, nFilt, data;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!uloc.isPointGathered) {
              _context11.next = 8;
              break;
            }

            _context11.next = 3;
            return requestNearMe();

          case 3:
            nearme = _context11.sent;
            nFilt = nearme.data.filter(function (_v, i) {
              return i < 9;
            });
            createKampList(nFilt, "Size en yak\u0131n ".concat(nFilt.length, " kamp alan\u0131 g\xF6r\xFCnt\xFCleniyor"));
            _context11.next = 10;
            break;

          case 8:
            data = fc.data.slice(0, 9);
            createKampList(data, "Lokasyon bilginize ula\u015Famad\u0131\u011F\u0131m\u0131zdan rastgele 9 kamp b\xF6lgesi g\xF6r\xFCn\xFCtleniyor", 'error');

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _kamplist.apply(this, arguments);
}

function createKampList(camps, message) {
  var messageType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'info';
  var additive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var filterResonseElement = document.querySelector('.kamplistesi > p');
  var lister = document.querySelector('#list');
  if (!additive) lister.innerHTML = '';
  camps.forEach(function (v) {
    lister.insertAdjacentHTML('beforeend', campCard(v));
  });
  if (messageType === 'info') filterResonseElement.classList.remove('error');
  if (messageType === 'error') filterResonseElement.classList.add('error');
  filterResonseElement.innerText = message;
}

function requestNearMe() {
  return _requestNearMe.apply(this, arguments);
}

function _requestNearMe() {
  _requestNearMe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var myHeaders, reqBody, requestOptions, response, data;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            myHeaders = new Headers();
            myHeaders.append('Accept', '*/*');
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
            reqBody = {
              distance: 50000,
              lon: uloc.point[0],
              lat: uloc.point[1]
            };
            requestOptions = {
              method: 'POST',
              headers: myHeaders,
              redirect: 'follow',
              body: JSON.stringify(reqBody)
            };
            _context12.next = 8;
            return fetch(backendOrigin + '/camps/nearme', requestOptions);

          case 8:
            response = _context12.sent;
            _context12.next = 11;
            return response.json();

          case 11:
            data = _context12.sent;
            return _context12.abrupt("return", data);

          case 13:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _requestNearMe.apply(this, arguments);
}

function campCard(data) {
  var k = data;
  var d = '';

  if (k.distance) {
    d = "\n      <p class=\"distance\">\n        <i class=\"bi bi-signpost\"></i>\n        <span> ".concat(Math.floor(k.distance / 1000), "km</span>\n      </p>\n    ");
  }

  var theImage = k.images.length === 0 ? "imgs/dummy.png" : k.images[0];
  return "\n      <div class=\"card\">\n        <img src=\"".concat(theImage, "\" alt=\"").concat(k.name, "\">\n        <img class=\"loader\" src=\"imgs/loader.gif\" alt=\"preloader\">\n        <div class=\"card-info\">\n          <h4>").concat(k.name, "</h4>\n          <p class=\"location\"><i class=\"bi bi-geo-alt-fill\"></i><span class=\"rl\"></span>").concat(k.region, "</p>\n          <p class=\"description\">").concat(k.description.substring(0, 400), "...</p>\n          <a href=\"camp.html?id=").concat(k._id, "\">daha fazla...</a>\n          ").concat(d, "\n        </div>\n      </div>\n    ");
}

function addBolgeFilteringSelector() {
  return _addBolgeFilteringSelector.apply(this, arguments);
}

function _addBolgeFilteringSelector() {
  _addBolgeFilteringSelector = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
    var response, data, bolgeElement, regionElement, placeElement;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return fetch(backendOrigin + '/provinances', requestOptions);

          case 2:
            response = _context13.sent;
            _context13.next = 5;
            return response.json();

          case 5:
            data = _context13.sent;
            bolgeElement = document.querySelector('#bolge');
            regionElement = document.querySelector('#il');
            placeElement = document.querySelector('#ilce');
            bolgeElement.innerHTML = "<option value=\"\">Se\xE7iniz</option>";
            data.data.forEach(function (d) {
              bolgeElement.insertAdjacentHTML('beforeend', "<option value=\"".concat(d, "\">").concat(d, "</option>"));
            });
            resetFilters();
            bolgeElement.addEventListener('change', function (e) {
              selectorUpdater(e.target);
            });
            regionElement.addEventListener('change', function (e) {
              selectorUpdater(e.target);
            });
            placeElement.addEventListener('change', function (e) {
              selectorUpdater(e.target);
            });

          case 15:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _addBolgeFilteringSelector.apply(this, arguments);
}

document.querySelector('.clean-filters > button').addEventListener('click', function () {
  resetFilters();
});

function resetFilters() {
  var bolgeElement = document.querySelector('#bolge');
  var ilElement = document.querySelector('#il');
  var ilceElement = document.querySelector('#ilce');
  var filterButton = document.querySelector('.clean-filters');
  var filterButtonItself = document.querySelector('.clean-filters > button');
  filterButtonItself.disabled = true;
  filterButton.classList.remove('filtered');
  ilElement.disabled = true;
  ilceElement.disabled = true;
  bolgeElement.value = '';
  ilElement.innerHTML = "<option value=\"\" default>Se\xE7iniz</option>";
  ilceElement.innerHTML = "<option value=\"\" default>Se\xE7iniz</option>";
  kamplist();
}

function selectorUpdater(_x4) {
  return _selectorUpdater.apply(this, arguments);
}

function _selectorUpdater() {
  _selectorUpdater = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(targetElement) {
    var provinanceElement, regionElement, placeElement, data, message;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            provinanceElement = document.querySelector('#bolge');
            regionElement = document.querySelector('#il');
            placeElement = document.querySelector('#ilce');
            selectorDisabler();
            _context14.next = 6;
            return filter(provinanceElement.value, regionElement.value, placeElement.value, targetElement);

          case 6:
            data = _context14.sent;
            selectorEnabler();

            if (data) {
              message = "".concat(provinanceElement.value, " ").concat(regionElement.value, " ").concat(placeElement.value, " i\xE7in ").concat(data.length, " kamp alan\u0131 liteleniyor");
              createKampList(data, message);
            }

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _selectorUpdater.apply(this, arguments);
}

function selectorDisabler() {
  var provinanceElement = document.querySelector('#bolge');
  var regionElement = document.querySelector('#il');
  var placeElement = document.querySelector('#ilce');
  provinanceElement.disabled = true;
  regionElement.disabled = true;
  placeElement.disabled = true;
}

function selectorEnabler() {
  var provinanceElement = document.querySelector('#bolge');
  var regionElement = document.querySelector('#il');
  var placeElement = document.querySelector('#ilce');
  if (provinanceElement.options.length > 1) provinanceElement.disabled = false;
  if (regionElement.options.length > 1) regionElement.disabled = false;
  if (placeElement.options.length > 1) placeElement.disabled = false;
}

function filter(_x5, _x6, _x7, _x8) {
  return _filter.apply(this, arguments);
}

function _filter() {
  _filter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(provinance, region, place, targetElement) {
    var provinanceElement, regionElement, placeElement, filterButton, filterButtonItself, selectMessage, myHeaders, reqBody, requestOptions, response, data, regions, regionsSelectorData, places, placesSelectoData;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            provinanceElement = document.querySelector('#bolge');
            regionElement = document.querySelector('#il');
            placeElement = document.querySelector('#ilce');
            filterButton = document.querySelector('.clean-filters');
            filterButtonItself = document.querySelector('.clean-filters > button');
            selectMessage = "<option value=\"\" default>Se\xE7iniz</option>";

            if (targetElement.id === 'bolge') {
              region = '';
              place = '';
              regionElement.innerHTML = selectMessage;
              placeElement.innerHTML = selectMessage;
              selectorDisabler();
            }

            if (targetElement.id === 'il') {
              place = '';
              placeElement.innerHTML = selectMessage;
              selectorDisabler();
            }

            if (!(provinance === '' && region === '' && place === '')) {
              _context15.next = 12;
              break;
            }

            resetFilters();
            kamplist();
            return _context15.abrupt("return");

          case 12:
            myHeaders = new Headers();
            myHeaders.append('Accept', '*/*');
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
            reqBody = {
              region: region,
              provinance: provinance,
              place: place
            };
            requestOptions = {
              method: 'POST',
              headers: myHeaders,
              redirect: 'follow',
              body: JSON.stringify(reqBody)
            };
            _context15.next = 20;
            return fetch(backendOrigin + '/camps/filter', requestOptions);

          case 20:
            response = _context15.sent;
            _context15.next = 23;
            return response.json();

          case 23:
            data = _context15.sent;

            if (data.success) {
              _context15.next = 30;
              break;
            }

            resetFilters();
            kamplist();
            return _context15.abrupt("return");

          case 30:
            if (provinanceElement.selectedIndex > 0) {
              filterButton.classList.add('filtered');
              filterButtonItself.disabled = false;
            }

            if (provinance !== '' && region === '') {
              regions = data.data.map(function (d) {
                return d.region;
              });
              regionsSelectorData = Array.from(new Set(regions)).sort().filter(function (v) {
                return v != undefined;
              });
              regionElement.innerHTML = selectMessage;
              regionsSelectorData.forEach(function (d) {
                regionElement.insertAdjacentHTML('beforeend', "<option value=\"".concat(d, "\">").concat(d, "</option>"));
              });
            }

            if (region !== '' && place === '') {
              places = data.data.map(function (d) {
                return d.place;
              });
              placesSelectoData = Array.from(new Set(places)).sort().filter(function (v) {
                return v != undefined;
              });
              placeElement.innerHTML = selectMessage;
              placesSelectoData.forEach(function (d) {
                placeElement.insertAdjacentHTML('beforeend', "<option value=\"".concat(d, "\">").concat(d, "</option>"));
              });
            }

          case 33:
            return _context15.abrupt("return", data.data);

          case 34:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _filter.apply(this, arguments);
}