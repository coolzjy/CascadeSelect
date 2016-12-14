'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["CascadingSelect"] = factory();else root["CascadingSelect"] = factory();
})(undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};

      /******/ // The require function
      /******/function __webpack_require__(moduleId) {

        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId])
          /******/return installedModules[moduleId].exports;

        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };

        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        /******/ // Flag the module as loaded
        /******/module.l = true;

        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }

      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;

      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;

      /******/ // identity function for calling harmory imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };

      /******/ // define getter function for harmory exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/Object.defineProperty(exports, name, {
          /******/configurable: false,
          /******/enumerable: true,
          /******/get: getter
          /******/ });
        /******/
      };

      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };

      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };

      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";

      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 9);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      /**/void function (scope) {
        /**/
        /**/ // CommonJS
        /**/if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && !!module.exports) return scope(function (name, dependencies, factory) {
          /**/if (typeof name !== 'string') factory = dependencies, dependencies = name, name = null;
          /**/if (!(dependencies instanceof Array)) factory = dependencies, dependencies = [];
          /**/var args;
          /**/args = [];
          /**/module.exports = factory.apply(module.exports, args) || module.exports;
          /**/
        });
        /**/
        /**/ // AMD, wrap a 'String' to avoid warn of fucking webpack
        /**/if (String("function") === 'function' && !!__webpack_require__(5)) return scope(__webpack_require__(4));
        /**/
        /**/ // Global
        /**/scope(function (name, dependencies, factory) {
          /**/if (typeof name !== 'string') factory = dependencies, dependencies = name, name = null;
          /**/if (!(dependencies instanceof Array)) factory = dependencies, dependencies = [];
          /**/var exports = {};
          /**/var args = [];
          /**/for (var i = 0; i < dependencies.length; i++) {
            args[i] = window[dependencies[i]];
          } /**/exports = factory.apply(exports, args) || exports;
          /**/if (name) {
            /**/ /**/try {
              /* Fuck IE8- */
              /**/ /**/if ((typeof execScript === 'undefined' ? 'undefined' : _typeof(execScript)) === 'object') execScript('var ' + name);
              /**/ /**/
            } catch (error) {}
            /**/window[name] = exports;
            /**/
          }
          /**/
        });
        /**/
        /**/
      }(function (define) {

        define(function () {
          /**/'use strict';
          /**/
          void function () {
            /**/

            var STRICT_TAG = { td: 'tr', 'th': 'tr', tr: 'tbody', tbody: 'table', thead: 'table', tfoot: 'table', caption: 'table' };
            var NODE_TYPE_NAME = { 2: 'value', 3: 'data' };
            var increment = 1;

            // Util Definitions
            var getShadedProps = function getShadedProps(that, propName, mapping) {
              var list = [];
              for (var i = that; i; i = Object.getPrototypeOf(i)) {
                var desc = Object.getOwnPropertyDescriptor(i, propName);
                if (desc) list.push(desc.get ? desc.get.call(that) : desc.value);
              }
              list.reverse();
              if (typeof mapping === 'function') for (var j = 0; j < list.length; j++) {
                list[j] = mapping(list[j]);
              }return list;
            };
            var define = function define(base, name, desc) {
              return Object.defineProperty(base, name, Object.create(desc, { configurable: { value: true } }));
            };
            var getOnce = function getOnce(base, name, getter) {
              define(base, name, { get: function get() {
                  return define(this, name, { value: getter.call(this) })[name];
                } });
            };
            var callArray = function callArray(array, that) {
              for (var i = 0; i < array.length; i++) {
                array[i].call(that);
              }
            };

            // Walk the tree and change "{xxx}" template to accessor properties.
            var parseTemplate = function parseTemplate(that) {
              var watches = Object.create(null);
              define(that, '@@watches', { value: watches });
              // Walking and match special templates into "watches"
              void function callee(node, ownerElement) {
                var attrs, sibling, handler, attr, i;
                var child = node.firstChild;
                if (node.nodeType === 1) {
                  while (child) {
                    sibling = child.nextSibling;
                    callee(child);
                    child = sibling;
                  }
                }
                // Try to match directive
                if (directives.type[node.nodeName]) {
                  handler = directives.type[node.nodeName](that, node, ownerElement);
                } else {
                  for (i = 0; i < directives.regexp.length; i++) {
                    if (directives.regexp[i].regexp.test(node.nodeName)) {
                      handler = directives.regexp[i].factory(that, node, ownerElement);
                      break;
                    }
                  }
                }
                // Try to match binding node (textNode or attrNode) and save if matched
                if (/^\{([$_a-zA-Z][$\w]*)\}$/.test(node[NODE_TYPE_NAME[node.nodeType]])) {
                  (RegExp.$1 in watches ? watches[RegExp.$1] : watches[RegExp.$1] = []).push(handler || node);
                }
                if (attrs = node.attributes) for (i = 0; attr = attrs[i]; i++) {
                  callee(attr, node);
                }
              }(that.element);
              // Change "watches" to accessor properties
              for (var name in watches) {
                void function (name) {
                  var list = watches[name];
                  var value = that[name];
                  var cache;
                  define(that, name, {
                    enumerable: true,
                    get: function get() {
                      return cache;
                    },
                    set: function set(value) {
                      cache = value;
                      for (var i = 0; i < list.length; i++) {
                        if (typeof list[i] === 'function') {
                          list[i].call(that, value);
                        } else {
                          list[i][NODE_TYPE_NAME[list[i].nodeType]] = value;
                        }
                      }
                    }
                  });
                  that[name] = value;
                }(name);
              }
            };

            // Extend special fields to instance before parse
            var specialFields = ['tagName', 'template', 'styleSheet'];
            var extendSpecialFields = function extendSpecialFields(that, params) {
              for (var key, i = 0; key = specialFields[i]; i++) {
                if (key in params) {
                  Object.defineProperty(that, key, { configurable: true, value: params[key] });
                  delete params[key];
                }
              }
            };

            // Main Constructor
            var Jinkela = function Jinkela() {
              var params = {};
              this.extends.apply(params, arguments);
              if (typeof this.beforeParse === 'function') this.beforeParse(params); // Expirimental
              extendSpecialFields(this, params);
              parseTemplate(this);
              // Extends each arguments to this
              if (typeof this.beforeExtends === 'function') this.beforeExtends(); // Expirimental
              this.extends(params);
              // Find all "init" method list in prototype chain and call they
              var args = [this, arguments];
              getShadedProps(this, 'init', function (init) {
                init.apply.apply(init, args);
              });
            };

            // Prototype Properties
            getOnce(Jinkela.prototype, 'element', function () {
              var target = this.constructor;
              var key = '@@domCache';
              if (!target.hasOwnProperty(key)) {
                var element;
                var template = this.template; // Call once getter handler
                if (template) {
                  // Get first tagName from template
                  var tagName = String(template.replace(/<!--[\s\S]*?-->/g, '').match(/<([a-z][\w-]*)|$/i)[1]).toLowerCase();
                  // Build template
                  element = document.createElement(STRICT_TAG[tagName] || 'div');
                  element.innerHTML = template;
                  if (element.children.length !== 1) throw new Error('Jinkela: Template require 1 root element');
                  element = element.firstElementChild;
                } else {
                  element = document.createElement(this.tagName || 'div');
                }
                // Find all shaded "styleSheet" from prototype chain and build
                var styleSheetList = getShadedProps(this, 'styleSheet');
                if (styleSheetList.length) {
                  var classId = increment++;
                  element.setAttribute('jinkela-class', classId);
                  var styleSheet = styleSheetList.join('\n').replace(/:scope\b/g, '[jinkela-class="' + classId + '"]');
                  if (typeof Jinkela.cssPreprocessor === 'function') styleSheet = Jinkela.cssPreprocessor(styleSheet);
                  Jinkela.style.insertAdjacentHTML('beforeend', styleSheet);
                }
                define(target, key, { value: element });
              }
              return target[key].cloneNode(true);
            });
            getOnce(Jinkela, 'style', function () {
              return document.head.appendChild(document.createElement('style'));
            });
            getOnce(Jinkela.prototype, '@@didMountHandlers', function () {
              return [function () {
                callArray(getShadedProps(this, 'didMount'), this);
              }.bind(this)];
            });
            define(Jinkela.prototype, 'extends', { value: function value() {
                for (var i = 0; i < arguments.length; i++) {
                  var arg = arguments[i];
                  if (arg instanceof Object) for (var j in arg) {
                    this[j] = arg[j];
                  }
                }
              } });
            var createRender = function createRender(name, handler) {
              define(Jinkela.prototype, name, { value: function value(target) {
                  if (!this.hasOwnProperty('parent')) define(this, 'parent', { value: target });
                  if (target instanceof Jinkela) target = target.element;
                  handler.call(this, target);
                  callArray(this['@@didMountHandlers'], this);
                  return this;
                } });
            };
            createRender('to', function (target) {
              target.appendChild(this.element);
            });
            createRender('renderTo', function (target) {
              target.appendChild(this.element);
            });
            createRender('renderWith', function (target) {
              target.parentNode.replaceChild(this.element, target);
            });

            // Directive register
            var directives = { type: Object.create(null), regexp: [] };
            Jinkela.register = function (type, factory) {
              if (type instanceof RegExp) {
                directives.regexp.push({ regexp: type, factory: factory });
              } else {
                directives.type[type] = factory;
              }
            };

            // Export to global
            window.Jinkela = Jinkela;

            /**/
          }(); /**/
          Object.defineProperty(Jinkela, 'from', {
            configurable: true,
            value: function value(raw) {
              if (raw instanceof Array) {
                var result = [];
                for (var i = 0; i < raw.length; i++) {
                  result.push(new this(raw[i]));
                }var to = function to(target) {
                  for (var i = 0; i < raw.length; i++) {
                    result[i].to(target);
                  }return this;
                };
                Object.defineProperty(result, 'renderTo', { configurable: true, value: to });
                Object.defineProperty(result, 'to', { configurable: true, value: to });
                return result;
              } else {
                return new this(raw);
              }
            }
          });
          Jinkela.cssPreprocessor = function (styleSheet) {
            // Remove comments
            styleSheet = styleSheet.replace(/\/\*[\s\S]*?\*\//g, '');
            // Store special blocks
            var stringStorage = [];
            var atBlockStorage = [];
            styleSheet = styleSheet.replace(/(["'])([\s\S]*?)(\1)/g, function ($0) {
              return '<string>' + stringStorage.push($0) + '<\/string>';
            }).replace(/@[^{}]+\{([^{}]+\{[^{}]*\})*\s*\}/g, function ($0) {
              return '<atBlock>' + atBlockStorage.push($0) + '<\/atBlock>';
            });
            // Flatten
            var tmp;
            var engin = /(([^{};]+)\{[^{}]*?)([^{};]+)(\{[^{}]*?\})/;
            while (tmp !== styleSheet) {
              styleSheet = (tmp = styleSheet).replace(engin, function ($0, $1, $2, $3, $4) {
                var outer = $2.split(/,/g);
                var inner = $3.split(/,/g);
                var mixed = [];
                for (var i = 0; i < outer.length; i++) {
                  for (var j = 0; j < inner.length; j++) {
                    mixed.push(outer[i] + ' ' + inner[j] + $4);
                  }
                }
                return mixed.join('') + $1;
              });
            }
            styleSheet = styleSheet.replace(/\s+&/g, '');
            // Reset special blocks
            styleSheet = styleSheet.replace(/<atBlock>(\d+)<\/atBlock>/g, function ($0, $1) {
              return atBlockStorage[$1 - 1];
            }).replace(/<string>(\d+)<\/string>/g, function ($0, $1) {
              return stringStorage[$1 - 1];
            });
            return styleSheet;
          };
          Jinkela.register(/^if(-not)?$/, function (that, node, ownerElement) {
            if (ownerElement.component) ownerElement = ownerElement.component.element;
            var not = !!RegExp.$1;
            var replacement = new Comment(' ' + node.name + '="' + node.value + '" ');
            var state = true;
            var name = /^\{(.*)\}$|$/.exec(node.value)[1];
            that['@@didMountHandlers'].push(function () {
              this[name] = this[name];
            });
            return function (value) {
              value = !!value ^ not;
              if (state === value) return;
              if (value) {
                if (replacement.parentNode) {
                  replacement.parentNode.replaceChild(ownerElement, replacement);
                  state = value;
                }
              } else {
                if (ownerElement.parentNode) {
                  ownerElement.parentNode.replaceChild(replacement, ownerElement);
                  state = value;
                }
              }
            };
          });
          Jinkela.register(/^JKL(?:-[A-Z0-9]+)+$/, function (that, node) {
            // Convert tagName to component name
            var name = node.tagName.slice(4).replace(/(?!^)-?./g, function (str) {
              return str.length > 1 ? str[1] : str.toLowerCase();
            });
            // Get component class
            var Component = that[name] || new Function('return typeof ' + name + ' === \'function\' && ' + name + ';')();
            if (!Component) throw new Error('No component can be matched with ' + node.tagName);
            // Prepare constructing args
            var args = {};
            var attrs = node.attributes;
            var watches = that['@@watches'];
            for (var i = 0; i < attrs.length; i++) {
              var nodeName = attrs[i].nodeName;
              var value = attrs[i].value;
              var matches = /^\{([$_a-zA-Z][$\w]*)\}$/.exec(value);
              if (matches) {
                var propName = matches[1];
                var listeners = propName in watches ? watches[propName] : watches[propName] = [];
                listeners.push(function (nodeName, value) {
                  if (component) component[nodeName] = value;
                }.bind(null, nodeName));
                args[nodeName] = that[propName];
              } else {
                args[nodeName] = value;
              }
            }
            // Init component instance
            var component = Component && new Component(args, { children: [].slice.call(node.childNodes, 0) });
            node.component = component;
            component.renderWith(node);
          });
          Jinkela.register(/^on-/, function (that, node, ownerElement) {
            if (ownerElement.component) ownerElement = ownerElement.component.element;
            var eventName = node.nodeName.match(/^on-(.*)|$/)[1];
            return function (handler) {
              if (typeof handler !== 'function') return;
              ownerElement.addEventListener(eventName, handler.bind(that));
            };
          });
          Jinkela.register('ref', function (that, node, ownerElement) {
            var fixNode = function fixNode(item) {
              if (item == null) item = new Comment(' ' + item + ' '); // eslint-disable-line
              if (item instanceof Jinkela) item = item.element;
              if (!(item instanceof Node)) item = new Text(item);
              return item;
            };
            // var desc = Object.getOwnPropertyDescriptor(that, node.value);
            // TODO: Consider shaded props
            Object.defineProperty(that, node.value, {
              configurable: true,
              enumerable: true,
              get: function get() {
                if (ownerElement instanceof DocumentFragment) {
                  return ownerElement.originalList;
                } else {
                  return ownerElement.component || ownerElement;
                }
              },
              set: function set(element) {
                if (element instanceof HTMLCollection || element instanceof NodeList) element = [].slice.call(element);
                if (element instanceof DocumentFragment) element = [].slice.call(element.childNodes);
                if (element instanceof Array) {
                  if (element.length) {
                    var fragment = new DocumentFragment();
                    element.forEach(function (item) {
                      fragment.appendChild(fixNode(item));
                    });
                    fragment.originalList = element;
                    element = fragment;
                  } else {
                    element = new Comment(' empty list ');
                  }
                } else {
                  element = fixNode(element);
                }
                var parent;
                if (ownerElement instanceof DocumentFragment) {
                  var first = ownerElement.originalList[0];
                  if (parent = first.parentNode) {
                    parent.insertBefore(element, first);
                    ownerElement.originalList.forEach(function (item) {
                      item.remove();
                    });
                  }
                  ownerElement = element;
                } else if (element !== ownerElement) {
                  if (parent = ownerElement.parentNode) {
                    parent.insertBefore(element, ownerElement);
                    ownerElement.remove();
                  }
                  ownerElement = element;
                }
              }
            });
          });
          return Jinkela;
        });

        /**/
      });

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);

      var Dropdown = function (_WEBPACK_IMPORTED_MO) {
        _inherits(Dropdown, _WEBPACK_IMPORTED_MO);

        function Dropdown() {
          _classCallCheck(this, Dropdown);

          return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
        }

        _createClass(Dropdown, [{
          key: 'template',
          get: function get() {
            return '\n    <div>\n      <div>{current}</div>\n      <ul ref="$list"></ul>\n    </div>\n    ';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return ':scope {\n      position: relative;\n      user-select: none;\n      cursor: default;\n      > div {\n        min-width: 100px;\n        border-right: 1px solid #eee;\n        background: #f8f8f8;\n      }\n      &:hover > ul {\n        visibility: visible;\n        transform: scaleY(1);\n      }\n      > ul {\n        visibility: hidden;\n        transform: scaleY(0);\n        transform-origin: top;\n        transition: all .1s ease .1s;\n        position: absolute;\n        left: -1px;\n        top: 25px;\n        width: 100%;\n        border-left: 1px solid #ddd;\n        box-sizing: content-box;\n        li {\n          border-bottom: 1px solid #ddd;\n          border-right: 1px solid #ddd;\n        }\n      }\n    }';
          }
        }, {
          key: 'types',
          set: function set(types) {
            var _this2 = this;

            if (Array.isArray(types)) {
              types.forEach(function (name) {
                new Item({ name: name }).to(_this2.$list);
              });
            }
          }
        }]);

        return Dropdown;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      var Item = function (_WEBPACK_IMPORTED_MO2) {
        _inherits(Item, _WEBPACK_IMPORTED_MO2);

        function Item() {
          _classCallCheck(this, Item);

          return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
        }

        _createClass(Item, [{
          key: 'click',
          value: function click() {
            this.element.dispatchEvent(new CustomEvent('type-change', {
              bubbles: true,
              detail: this.name
            }));
          }
        }, {
          key: 'template',
          get: function get() {
            return '<li on-click="{click}">{name}</li>';
          }
        }]);

        return Item;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      module.exports = Dropdown;

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__Tabs__ = __webpack_require__(6);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__Tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Tabs__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__Tags__ = __webpack_require__(7);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__Tags___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Tags__);

      var Panel = function (_WEBPACK_IMPORTED_MO3) {
        _inherits(Panel, _WEBPACK_IMPORTED_MO3);

        function Panel() {
          _classCallCheck(this, Panel);

          return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
        }

        _createClass(Panel, [{
          key: 'clear',
          value: function clear() {
            this.element.dispatchEvent(new CustomEvent('item-clear', { bubbles: true }));
          }
        }, {
          key: 'click',
          value: function click(e) {
            if (!this.element.classList.contains('edit-mode')) {
              this.element.classList.add('edit-mode');
              e.stopPropagation();
            }
          }
        }, {
          key: 'Tabs',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_1__Tabs___default.a;
          }
        }, {
          key: 'Tags',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__Tags___default.a;
          }
        }, {
          key: 'template',
          get: function get() {
            return '\n    <div on-item-remove="{click}">\n      <div>\n        <jkl-tabs types="{_types}"></jkl-tabs>\n        <div jinkela-clear on-click="{clear}">\u6E05\u9664\u5168\u90E8</div>\n      </div>\n      <jkl-tags data="{_tags}"></jkl-tags>\n    </div>';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return ':scope {\n      border: 1px solid #ddd;\n      visibility: hidden;\n      > div {\n        display: flex;\n        [jinkela-clear] {\n          visibility: hidden;\n          cursor: pointer;\n          width: 80px;\n          transition: color .3s;\n          &:hover {\n            color: #03a9f4;\n          }\n        }\n      }\n      &.edit-mode [jinkela-tag] {\n        animation: shake .2s infinite;\n        position: relative;\n        cursor: pointer;\n        &:after {\n          content: \'x\';\n          position: absolute;\n          right: -4px;\n          top: -4px;\n          width: 12px;\n          height: 12px;\n          border-radius: 50%;\n          line-height: 12px;\n          text-align: center;\n          background: #17bf9d;\n        }\n      }\n      &.edit-mode [jinkela-clear] {\n        visibility: visible;\n      } \n    }\n    @keyframes shake {\n      0 { transform: rotate(0) }\n      25% { transform: rotate(-1deg) }\n      50% { transform: rotate(0) }\n      75% { transform: rotate(1deg) }\n      100% { transform: rotate(0) }\n    }';
          }
        }, {
          key: 'tags',
          set: function set(tags) {
            var _this5 = this;

            if (tags) {
              this._tags = tags;
              this._types = this.types.map(function (name) {
                return {
                  name: name,
                  selected: name === _this5.current,
                  count: _this5.selected.filter(function (s) {
                    return s.type === name;
                  }).length
                };
              });
              this.element.style.visibility = this.selected && this.selected.length ? 'visible' : 'hidden';
            }
          }
        }, {
          key: 'modal',
          set: function set(modal) {
            this.element.classList.remove('edit-mode');
          }
        }]);

        return Panel;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      module.exports = Panel;

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);

      var Search = function (_WEBPACK_IMPORTED_MO4) {
        _inherits(Search, _WEBPACK_IMPORTED_MO4);

        function Search() {
          _classCallCheck(this, Search);

          return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));
        }

        _createClass(Search, [{
          key: 'input',
          value: function input(_ref) {
            var target = _ref.target;

            this.keyword = target.value.trim();
          }
        }, {
          key: 'click',
          value: function click(e) {
            this.visible = true;
            e.stopPropagation();
          }
        }, {
          key: 'Selects',
          get: function get() {
            return __webpack_require__(8);
          }
        }, {
          key: 'template',
          get: function get() {
            return '\n    <div>\n      <input type="search" on-input="{input}" on-click="{click}" />\n      <jkl-selects data="{_data}" flat="{_flat}" keyword="{keyword}" visible="{visible}" selected="{selected}"></jkl-selects>\n    </div>';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return ':scope {\n      > input {\n        border: none;\n        outline: none;\n        padding: 0 5px;\n      } \n    }';
          }
        }, {
          key: 'data',
          set: function set(data) {
            if (data) {
              this._data = data.data;
              this._flat = data.flat;
            }
          }
        }]);

        return Search;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      module.exports = Search;

      /***/
    },
    /* 4 */
    /***/function (module, exports) {

      module.exports = function () {
        throw new Error("define cannot be used indirect");
      };

      /***/
    },
    /* 5 */
    /***/function (module, exports) {

      /* WEBPACK VAR INJECTION */(function (__webpack_amd_options__) {
        module.exports = __webpack_amd_options__;

        /* WEBPACK VAR INJECTION */
      }).call(exports, {});

      /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);

      var Tabs = function (_WEBPACK_IMPORTED_MO5) {
        _inherits(Tabs, _WEBPACK_IMPORTED_MO5);

        function Tabs() {
          _classCallCheck(this, Tabs);

          return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
        }

        _createClass(Tabs, [{
          key: 'render',
          value: function render() {
            this.element.innerHTML = '';
            Tab.from(this.types).to(this);
          }
        }, {
          key: 'tagName',
          get: function get() {
            return 'ul';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return ':scope {\n      display: flex;\n      flex: 1;\n      > li {\n        padding: 0 10px;\n        border-right: 1px solid #ddd;\n        &.selected {\n          background: #eee;\n        }\n        label {\n          margin-left: 5px;\n          &:before { content: "[" }\n          &:after { content: "]" }\n        }\n      }\n    }';
          }
        }, {
          key: 'types',
          get: function get() {
            return this._types;
          },
          set: function set() {
            var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this._types = types;
            this.render();
          }
        }]);

        return Tabs;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      var Tab = function (_WEBPACK_IMPORTED_MO6) {
        _inherits(Tab, _WEBPACK_IMPORTED_MO6);

        function Tab() {
          _classCallCheck(this, Tab);

          return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
        }

        _createClass(Tab, [{
          key: 'init',
          value: function init() {
            this.element.className = this.selected ? 'selected' : '';
            this.element.style.display = this.count ? 'block' : 'none';
          }
        }, {
          key: 'click',
          value: function click() {
            this.element.dispatchEvent(new CustomEvent('type-change', {
              bubbles: true,
              detail: this.name
            }));
          }
        }, {
          key: 'template',
          get: function get() {
            return '\n    <li on-click="{click}">\n      <span>{name}</span>\n      <label>{count}</label>\n    </li>';
          }
        }]);

        return Tab;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      module.exports = Tabs;

      /***/
    },
    /* 7 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);

      var Tags = function (_WEBPACK_IMPORTED_MO7) {
        _inherits(Tags, _WEBPACK_IMPORTED_MO7);

        function Tags() {
          _classCallCheck(this, Tags);

          return _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).apply(this, arguments));
        }

        _createClass(Tags, [{
          key: 'tagName',
          get: function get() {
            return 'ul';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return ':scope {\n      border-top: 1px solid #ddd;\n      text-align: left;\n      max-height: 91px;\n      overflow-y: auto;\n      > li {\n        display: inline-block;\n        height: 20px;\n        background: #eee;\n        padding: 0 10px;\n        margin: 5px;\n        background-color: #19d4ae;\n        border-radius: 2px;\n        color: #fff;\n        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n        transition: all 0.2s ease-out;\n        &:hover {\n          background-color: #19d4ae;\n          box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n        }\n      }\n    }';
          }
        }, {
          key: 'data',
          set: function set(data) {
            if (data) {
              this.element.innerHTML = '';
              Tag.from(data).to(this);
            }
          }
        }]);

        return Tags;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      var Tag = function (_WEBPACK_IMPORTED_MO8) {
        _inherits(Tag, _WEBPACK_IMPORTED_MO8);

        function Tag() {
          _classCallCheck(this, Tag);

          return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).apply(this, arguments));
        }

        _createClass(Tag, [{
          key: 'click',
          value: function click(e) {
            e.stopPropagation();
            this.element.dispatchEvent(new CustomEvent('item-remove', {
              bubbles: true,
              detail: {
                n: this.n,
                i: this.i,
                level: this.level
              }
            }));
          }
        }, {
          key: 'template',
          get: function get() {
            return '<li on-click="{click}" jinkela-tag>{n}</li>';
          }
        }]);

        return Tag;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      module.exports = Tags;

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);

      var Selects = function (_WEBPACK_IMPORTED_MO9) {
        _inherits(Selects, _WEBPACK_IMPORTED_MO9);

        function Selects() {
          _classCallCheck(this, Selects);

          return _possibleConstructorReturn(this, (Selects.__proto__ || Object.getPrototypeOf(Selects)).apply(this, arguments));
        }

        _createClass(Selects, [{
          key: 'init',
          value: function init() {
            var _this12 = this;

            this.element.addEventListener('item-enter', function (e) {
              var _e$detail = e.detail,
                  index = _e$detail.index,
                  level = _e$detail.level,
                  i = _e$detail.i;

              var position = e.target.getBoundingClientRect();
              var data = _this12.getModel(level + 1, i);
              if (!data) {
                if (index === 0) {
                  _this12.remove(1);
                }
                return;
              }
              _this12.show({
                index: index + 1,
                data: data,
                position: {
                  top: position.top + window.pageYOffset + 'px',
                  left: position.width + position.left + window.pageXOffset + 'px'
                }
              });
            });
          }
        }, {
          key: 'getModel',
          value: function getModel(level, id) {
            var _this13 = this;

            if (level === 0) {
              if (this.keyword) {
                return this.flat.filter(function (item) {
                  return item.n.indexOf(_this13.keyword) >= 0;
                });
              }
              return this.flat;
            }
            return this.data[level] && this.data[level][id];
          }
        }, {
          key: 'showDefault',
          value: function showDefault() {
            if (!this.data || !this.flat) {
              return;
            }
            this.remove(0);
            this._ref[0] = new Select({ data: this.getModel(0), index: 0, selected: this.selected }).to(this);
          }
        }, {
          key: 'show',
          value: function show(_ref2) {
            var index = _ref2.index,
                data = _ref2.data,
                position = _ref2.position;

            this.remove(index);
            this._ref[index] = new Select({ data: data, index: index, position: position, selected: this.selected }).to(this);
          }
        }, {
          key: 'remove',
          value: function remove(index) {
            if (!index) {
              this.element.innerHTML = '';
              this._ref = [];
            } else {
              for (var i = index; i < this.data.struct.length; i++) {
                if (this._ref[i]) {
                  this._ref[i].element.remove();
                  delete this._ref[i];
                }
              }
            }
          }
        }, {
          key: 'tagName',
          get: function get() {
            return 'div';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return ':scope {\n      background: #fff;\n      ul {\n        position: absolute;\n        border: 1px solid #ddd;\n        max-height: 390px;\n        overflow: auto;\n        background: #fff;\n        border-top: none;\n        > li {\n          border-top: 1px solid #ddd;\n          height: 26px;\n          display: flex;\n          > span {\n            color: #999;\n            padding: 0 5px;\n            background: #f8f8f8;\n            border-right: 1px solid #eee;\n          }\n          > strong {\n            flex: 1;\n            padding: 0 15px;\n          }\n          &.selected {\n            color: #19d4ae;\n          }\n        }\n      }\n    }';
          }
        }, {
          key: 'visible',
          set: function set(b) {
            if (!this._ref) {
              this._ref = [];
            }
            if (b) {
              this.showDefault();
            } else {
              this.remove();
            }
          }
        }, {
          key: 'keyword',
          get: function get() {
            return this._keyword;
          },
          set: function set(k) {
            if (k === this._keyword) {
              return;
            }
            this._keyword = k;
            this.showDefault();
          }
        }]);

        return Selects;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      var PAGE_SIZE = 200;

      var Select = function (_WEBPACK_IMPORTED_MO10) {
        _inherits(Select, _WEBPACK_IMPORTED_MO10);

        function Select() {
          _classCallCheck(this, Select);

          return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
        }

        _createClass(Select, [{
          key: 'init',
          value: function init() {
            var _this15 = this;

            this.element.addEventListener('item-enter', function (e) {
              e.detail.index = _this15.index;
            });

            this.page = 0;

            if (this.data.length > PAGE_SIZE) {
              this.element.addEventListener('scroll', this.scroll.bind(this));
              this.max = Math.ceil(this.data.length / PAGE_SIZE);
            }

            this.render(this.getPage(0));
          }
        }, {
          key: 'scroll',
          value: function scroll() {
            if (!this.scrollHeight || !this.offsetHeight) {
              this.scrollHeight = this.element.scrollHeight;
              this.offsetHeight = this.element.offsetHeight;
            }
            if (this.element.scrollTop + this.offsetHeight * 2 > this.scrollHeight) {
              this.nextPage();
            }
          }
        }, {
          key: 'nextPage',
          value: function nextPage() {
            var _this16 = this;

            if (this.page >= this.max - 1) {
              return;
            }
            this.render(this.getPage(++this.page));
            setTimeout(function () {
              _this16.scrollHeight = _this16.element.scrollHeight;
            }, 0);
          }
        }, {
          key: 'getPage',
          value: function getPage(index) {
            return this.data.slice(index * PAGE_SIZE, index * PAGE_SIZE + PAGE_SIZE);
          }
        }, {
          key: 'render',
          value: function render(data) {
            var _this17 = this;

            if (data) {
              data.forEach(function (d) {
                d.selected = _this17.selected && _this17.selected.some(function (s) {
                  return s.i === d.i && s.level === d.level;
                });
                new Item(d).to(_this17);
              });
            }
          }
        }, {
          key: 'tagName',
          get: function get() {
            return 'ul';
          }
        }, {
          key: 'position',
          set: function set(pos) {
            Object.assign(this.element.style, pos);
          }
        }]);

        return Select;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      var Item = function (_WEBPACK_IMPORTED_MO11) {
        _inherits(Item, _WEBPACK_IMPORTED_MO11);

        function Item() {
          _classCallCheck(this, Item);

          return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
        }

        _createClass(Item, [{
          key: 'init',
          value: function init() {
            var classList = this.element.classList;

            if (this.hasChild) {
              classList.add('has-child');
            }
            if (this.selected) {
              classList.add('selected');
            }
          }
        }, {
          key: '_dispatch',
          value: function _dispatch(action) {
            this.element.dispatchEvent(new CustomEvent(action, {
              bubbles: true,
              detail: {
                n: this.n,
                i: this.i,
                level: this.level
              }
            }));
          }
        }, {
          key: 'mouseenter',
          value: function mouseenter() {
            this._dispatch('item-enter');
          }
        }, {
          key: 'click',
          value: function click(e) {
            e.stopPropagation();
            var classList = this.element.classList;

            if (classList.contains('selected')) {
              classList.remove('selected');
              this._dispatch('item-remove');
            } else {
              classList.add('selected');
              this._dispatch('item-select');
            }
          }
        }, {
          key: 'template',
          get: function get() {
            return '<li on-click="{click}" on-mouseenter="{mouseenter}"><span>{title}</span><strong>{n}</strong></li>';
          }
        }]);

        return Item;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      module.exports = Selects;

      /***/
    },
    /* 9 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);

      var Component = function (_WEBPACK_IMPORTED_MO12) {
        _inherits(Component, _WEBPACK_IMPORTED_MO12);

        function Component() {
          _classCallCheck(this, Component);

          return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
        }

        _createClass(Component, [{
          key: 'init',
          value: function init() {
            var _this20 = this;

            this.selected = [];

            document.body.addEventListener('click', function () {
              _this20.modal = false;
            });

            this.element.addEventListener('type-change', this.typeChange.bind(this));
            this.element.addEventListener('item-select', this.addSelect.bind(this));
            this.element.addEventListener('item-remove', this.removeSelect.bind(this));
            this.element.addEventListener('item-clear', this.clearSelect.bind(this));
          }
        }, {
          key: 'typeChange',
          value: function typeChange(e) {
            this.currentType = e.detail;
            this.refreshCurrentSelected();
          }
        }, {
          key: 'addSelect',
          value: function addSelect(e) {
            var item = e.detail;
            item.type = this.currentType;
            if (!this.containsSelect(item)) {
              this.selected.push(item);
              this.refreshCurrentSelected();
            }
          }
        }, {
          key: 'removeSelect',
          value: function removeSelect(e) {
            var item = e.detail;
            item.type = this.currentType;
            this.selected = this.selected.filter(function (s) {
              return !isEqual(item, s);
            });
            this.refreshCurrentSelected();
          }
        }, {
          key: 'clearSelect',
          value: function clearSelect() {
            this.selected = [];
            this.currentSelected = [];
          }
        }, {
          key: 'containsSelect',
          value: function containsSelect(a) {
            return this.selected.some(function (b) {
              return isEqual(a, b);
            });
          }
        }, {
          key: 'refreshCurrentSelected',
          value: function refreshCurrentSelected() {
            var _this21 = this;

            this.currentSelected = this.selected.filter(function (s) {
              return s.type === _this21.currentType;
            });
          }
        }, {
          key: 'Dropdown',

          // register components
          get: function get() {
            return __webpack_require__(1);
          }
        }, {
          key: 'Search',
          get: function get() {
            return __webpack_require__(3);
          }
        }, {
          key: 'Panel',
          get: function get() {
            return __webpack_require__(2);
          }
        }, {
          key: 'template',
          get: function get() {
            return '\n    <div>\n      <div jinkela-search>\n        <jkl-dropdown types="{_types}" current="{_currentType}"></jkl-dropdown>\n        <jkl-search data="{currentModel}" visible="{modal}" selected="{currentSelected}"></jkl-search>\n      </div>\n      <div jinkela-panel>\n        <jkl-panel types="{_types}" current="{_currentType}" tags="{currentSelected}" selected="{selected}" modal="{modal}"></jkl-panel>\n      </div>\n    </div>';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return ':scope {\n      display: flex;\n      line-height: 24px;\n      font-size: 12px;\n      color: #666;\n      text-align: center;\n      * {\n        box-sizing: border-box;\n      }\n      ul {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n        cursor: default;\n        user-select: none;\n      }\n      li:hover { background: #f8f8f8; }\n      li:active { background: #eee; }\n      [jinkela-search] {\n        display: flex;\n        border: 1px solid #ddd;\n        height: 26px;\n      }\n      [jinkela-panel] {\n        flex: 1;\n        padding-left: 15px;\n        line-height: 20px;\n      }\n      .has-child:after {\n        content: ">";\n        margin-right: 5px;\n        color: #aaa;\n      }\n      ::-webkit-scrollbar {\n        display: none;\n      }\n    }';
          }
        }, {
          key: 'data',
          get: function get() {
            return this._data;
          },
          set: function set(data) {
            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
              throw new Error('invalid data');
            }

            if (!Array.isArray(data)) {
              data = [data];
            }

            // prepare data
            data.forEach(function (raw) {
              raw.flat = [];
              raw.struct.forEach(function (title, level) {
                for (var id in raw.data[level]) {
                  raw.data[level][id].forEach(function (item) {
                    item.level = level;
                    item.title = title;
                    item.hasChild = raw.data[level + 1] && raw.data[level + 1][item.i];
                    raw.flat.push(item);
                  });
                }
              });
            });

            this._data = data;
            this.types = data.map(function (d) {
              return d.name;
            });
          }
        }, {
          key: 'types',
          get: function get() {
            return this._types;
          },
          set: function set(types) {
            this._types = types;
            this.currentType = types[0];
          }
        }, {
          key: 'currentType',
          get: function get() {
            return this._currentType;
          },
          set: function set(type) {
            var _this22 = this;

            this._currentType = type;
            this.data.forEach(function (d) {
              if (d.name === type) {
                _this22.currentModel = d;
              }
            });
          }
        }]);

        return Component;
      }(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a);

      function isEqual(a, b) {
        return a.i === b.i && a.type === b.type && a.level === b.level;
      }

      module.exports = Component;

      /***/
    }
    /******/])
  );
});
