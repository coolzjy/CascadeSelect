(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CascadingSelect"] = factory();
	else
		root["CascadingSelect"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

/**/ void function(scope) {
/**/
/**/   // CommonJS
/**/   if (typeof module === 'object' && !!module.exports) return scope(function(name, dependencies, factory) {
/**/     if (typeof name !== 'string') factory = dependencies, dependencies = name, name = null;
/**/     if (!(dependencies instanceof Array)) factory = dependencies, dependencies = [];
/**/     var args;
/**/     args = [  ];
/**/     module.exports = factory.apply(module.exports, args) || module.exports;
/**/   });
/**/
/**/   // AMD, wrap a 'String' to avoid warn of fucking webpack
/**/   if (String("function") === 'function' && !!__webpack_require__(5)) return scope(__webpack_require__(4));
/**/
/**/   // Global
/**/   scope(function(name, dependencies, factory) {
/**/     if (typeof name !== 'string') factory = dependencies, dependencies = name, name = null;
/**/     if (!(dependencies instanceof Array)) factory = dependencies, dependencies = [];
/**/     var exports = {};
/**/     var args = [];
/**/     for (var i = 0; i < dependencies.length; i++) args[i] = window[dependencies[i]];
/**/     exports = factory.apply(exports, args) || exports;
/**/     if (name) {
/**/       /**/ try { /* Fuck IE8- */
/**/       /**/   if (typeof execScript === 'object') execScript('var ' + name);
/**/       /**/ } catch(error) {}
/**/       window[name] = exports;
/**/     }
/**/   });
/**/
/**/ }(function(define) {

define(function() {
/**/ 'use strict';
/**/ void function() { /**/

var STRICT_TAG = { td: 'tr', 'th': 'tr', tr: 'tbody', tbody: 'table', thead: 'table', tfoot: 'table', caption: 'table' };
var NODE_TYPE_NAME = { 2: 'value', 3: 'data' };
var increment = 1;

// Util Definitions
var getShadedProps = function(that, propName, mapping) {
  var list = [];
  for (var i = that; i; i = Object.getPrototypeOf(i)) {
    var desc = Object.getOwnPropertyDescriptor(i, propName);
    if (desc) list.push(desc.get ? desc.get.call(that) : desc.value);
  }
  list.reverse();
  if (typeof mapping === 'function') for (var j = 0; j < list.length; j++) list[j] = mapping(list[j]);
  return list;
};
var define = function(base, name, desc) {
  return Object.defineProperty(base, name, Object.create(desc, { configurable: { value: true } }));
};
var getOnce = function(base, name, getter) {
  define(base, name, { get: function() { return define(this, name, { value: getter.call(this) })[name]; } });
};
var callArray = function(array, that) { for (var i = 0; i < array.length; i++) array[i].call(that); };

// Walk the tree and change "{xxx}" template to accessor properties.
var parseTemplate = function(that) {
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
    if (attrs = node.attributes) for (i = 0; attr = attrs[i]; i++) callee(attr, node);
  }(that.element);
  // Change "watches" to accessor properties
  for (var name in watches) void function(name) {
    var list = watches[name];
    var value = that[name];
    var cache;
    define(that, name, {
      enumerable: true,
      get: function() { return cache; },
      set: function(value) {
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
};

// Extend special fields to instance before parse
var specialFields = [ 'tagName', 'template', 'styleSheet' ];
var extendSpecialFields = function(that, params) {
  for (var key, i = 0; key = specialFields[i]; i++) {
    if (key in params) {
      Object.defineProperty(that, key, { configurable: true, value: params[key] });
      delete params[key];
    }
  }
};

// Main Constructor
var Jinkela = function() {
  var params = {};
  this.extends.apply(params, arguments);
  if (typeof this.beforeParse === 'function') this.beforeParse(params); // Expirimental
  extendSpecialFields(this, params);
  parseTemplate(this);
  // Extends each arguments to this
  if (typeof this.beforeExtends === 'function') this.beforeExtends(); // Expirimental
  this.extends(params);
  // Find all "init" method list in prototype chain and call they
  var args = [ this, arguments ];
  getShadedProps(this, 'init', function(init) { init.apply.apply(init, args); });
};

// Prototype Properties
getOnce(Jinkela.prototype, 'element', function() {
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
getOnce(Jinkela, 'style', function() {
  return document.head.appendChild(document.createElement('style'));
});
getOnce(Jinkela.prototype, '@@didMountHandlers', function() {
  return [ function() { callArray(getShadedProps(this, 'didMount'), this); }.bind(this) ];
});
define(Jinkela.prototype, 'extends', { value: function() {
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (arg instanceof Object) for (var j in arg) this[j] = arg[j];
  }
} });
var createRender = function(name, handler) {
  define(Jinkela.prototype, name, { value: function(target) {
    if (!this.hasOwnProperty('parent')) define(this, 'parent', { value: target });
    if (target instanceof Jinkela) target = target.element;
    handler.call(this, target);
    callArray(this['@@didMountHandlers'], this);
    return this;
  } });
};
createRender('to', function(target) { target.appendChild(this.element); });
createRender('renderTo', function(target) { target.appendChild(this.element); });
createRender('renderWith', function(target) { target.parentNode.replaceChild(this.element, target); });

// Directive register
var directives = { type: Object.create(null), regexp: [] };
Jinkela.register = function(type, factory) {
  if (type instanceof RegExp) {
    directives.regexp.push({ regexp: type, factory: factory });
  } else {
    directives.type[type] = factory;
  }
};

// Export to global
window.Jinkela = Jinkela;

/**/ }(); /**/
Object.defineProperty(Jinkela, 'from', {
  configurable: true,
  value: function(raw) {
    if (raw instanceof Array) {
      var result = [];
      for (var i = 0; i < raw.length; i++) result.push(new this(raw[i]));
      var to = function(target) {
        for (var i = 0; i < raw.length; i++) result[i].to(target);
        return this;
      };
      Object.defineProperty(result, 'renderTo', { configurable: true, value: to });
      Object.defineProperty(result, 'to', { configurable: true, value: to });
      return result;
    } else {
      return new this(raw);
    }
  }
});
Jinkela.cssPreprocessor = function(styleSheet) {
  // Remove comments
  styleSheet = styleSheet.replace(/\/\*[\s\S]*?\*\//g, '');
  // Store special blocks
  var stringStorage = [];
  var atBlockStorage = [];
  styleSheet = styleSheet.replace(/(["'])([\s\S]*?)(\1)/g, function($0) {
    return '<string>' + stringStorage.push($0) + '<\/string>';
  }).replace(/@[^{}]+\{([^{}]+\{[^{}]*\})*\s*\}/g, function($0) {
    return '<atBlock>' + atBlockStorage.push($0) + '<\/atBlock>';
  });
  // Flatten
  var tmp;
  var engin = /(([^{};]+)\{[^{}]*?)([^{};]+)(\{[^{}]*?\})/;
  while (tmp !== styleSheet) {
    styleSheet = (tmp = styleSheet).replace(engin, function($0, $1, $2, $3, $4) {
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
  styleSheet = styleSheet.replace(/<atBlock>(\d+)<\/atBlock>/g, function($0, $1) {
    return atBlockStorage[$1 - 1];
  }).replace(/<string>(\d+)<\/string>/g, function($0, $1) {
    return stringStorage[$1 - 1];
  });
  return styleSheet;
};
Jinkela.register(/^if(-not)?$/, function(that, node, ownerElement) {
  if (ownerElement.component) ownerElement = ownerElement.component.element;
  var not = !!RegExp.$1;
  var replacement = new Comment(' ' + node.name + '="' + node.value + '" ');
  var state = true;
  var name = /^\{(.*)\}$|$/.exec(node.value)[1];
  that['@@didMountHandlers'].push(function() { this[name] = this[name]; });
  return function(value) {
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
Jinkela.register(/^JKL(?:-[A-Z0-9]+)+$/, function(that, node) {
  // Convert tagName to component name
  var name = node.tagName.slice(4).replace(/(?!^)-?./g, function(str) {
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
      listeners.push(function(nodeName, value) {
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
Jinkela.register(/^on-/, function(that, node, ownerElement) {
  if (ownerElement.component) ownerElement = ownerElement.component.element;
  var eventName = node.nodeName.match(/^on-(.*)|$/)[1];
  return function(handler) {
    if (typeof handler !== 'function') return;
    ownerElement.addEventListener(eventName, handler.bind(that));
  };
});
Jinkela.register('ref', function(that, node, ownerElement) {
  var fixNode = function(item) {
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
    get: function() {
      if (ownerElement instanceof DocumentFragment) {
        return ownerElement.originalList;
      } else {
        return ownerElement.component || ownerElement;
      }
    },
    set: function(element) {
      if (element instanceof HTMLCollection || element instanceof NodeList) element = [].slice.call(element);
      if (element instanceof DocumentFragment) element = [].slice.call(element.childNodes);
      if (element instanceof Array) {
        if (element.length) {
          var fragment = new DocumentFragment();
          element.forEach(function(item) { fragment.appendChild(fixNode(item)); });
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
          ownerElement.originalList.forEach(function(item) { item.remove(); });
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

/**/ });


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


class Dropdown extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get template () {
    return `
    <div>
      <div>{current}</div>
      <ul ref="$list"></ul>
    </div>
    `
  }

  get styleSheet () {
    return `:scope {
      position: relative;
      user-select: none;
      cursor: default;
      > div {
        min-width: 100px;
        border-right: 1px solid #eee;
        background: #f8f8f8;
      }
      &:hover > ul {
        visibility: visible;
        transform: scaleY(1);
      }
      > ul {
        visibility: hidden;
        transform: scaleY(0);
        transform-origin: top;
        transition: all .1s ease .1s;
        position: absolute;
        left: -1px;
        top: 25px;
        width: 100%;
        border-left: 1px solid #ddd;
        box-sizing: content-box;
        li {
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
      }
    }`
  }

  set types (types) {
    if (Array.isArray(types)) {
      types.forEach(name => {
        new Item({ name }).to(this.$list)
      })
    }
  }
}

class Item extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get template () {
    return `<li on-click="{click}">{name}</li>`
  }

  click () {
    this.element.dispatchEvent(new CustomEvent('type-change', {
      bubbles: true,
      detail: this.name
    }))
  }
}

module.exports = Dropdown

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tabs__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Tabs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Tags__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Tags___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Tags__);




class Panel extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get Tabs () { return __WEBPACK_IMPORTED_MODULE_1__Tabs___default.a }
  get Tags () { return __WEBPACK_IMPORTED_MODULE_2__Tags___default.a }

  get template () {
    return `
    <div on-item-remove="{click}">
      <div>
        <jkl-tabs types="{_types}"></jkl-tabs>
        <div jinkela-clear on-click="{clear}">清除全部</div>
      </div>
      <jkl-tags data="{_tags}"></jkl-tags>
    </div>`
  }

  get styleSheet () {
    return `:scope {
      visibility: hidden;
      > div {
        display: flex;
        [jinkela-clear] {
          visibility: hidden;
          cursor: pointer;
          width: 80px;
          transition: color,opacity .3s;
          border-bottom: none;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          background: #ef3b2e;
          color: #fff;
          opacity: .6;
          &:hover {
            opacity: 1;
          }
        }
      }
      &.edit-mode [jinkela-tag] {
        animation: shake .2s infinite;
        position: relative;
        cursor: pointer;
        &:after {
          content: 'x';
          position: absolute;
          right: -4px;
          top: -4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          line-height: 12px;
          text-align: center;
          background: #17bf9d;
        }
      }
      &.edit-mode [jinkela-clear] {
        visibility: visible;
      }
    }
    @keyframes shake {
      0 { transform: rotate(0) }
      25% { transform: rotate(-1deg) }
      50% { transform: rotate(0) }
      75% { transform: rotate(1deg) }
      100% { transform: rotate(0) }
    }`
  }

  set tags (tags) {
    if (tags) {
      this._tags = tags
      this._types = this.types.map(name => {
        return {
          name,
          selected: name === this.current,
          count: this.selected.filter(s => s.type === name).length
        }
      })
      this.element.style.visibility = this.selected && this.selected.length ? 'visible' : 'hidden'
    }
  }

  set modal (modal) {
    this.element.classList.remove('edit-mode')
  }

  clear () {
    this.element.dispatchEvent(new CustomEvent('item-clear', { bubbles: true }))
  }

  click (e) {
    if (!this.element.classList.contains('edit-mode')) {
      this.element.classList.add('edit-mode')
      e.stopPropagation()
    }
  }
}

module.exports = Panel


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


class Search extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get Selects () { return __webpack_require__(8) }

  get template () {
    return `
    <div>
      <input type="search" on-input="{input}" on-click="{click}" />
      <jkl-selects data="{_data}" flat="{_flat}" keyword="{keyword}" visible="{visible}" selected="{selected}"></jkl-selects>
    </div>`
  }

  get styleSheet () {
    return `:scope {
      > input {
        border: none;
        outline: none;
        padding: 0 5px;
      } 
    }`
  }

  input ({ target }) {
    this.keyword = target.value.trim()
  }

  click (e) {
    this.visible = true
    e.stopPropagation()
  }

  set data (data) {
    if (data) {
      this._data = data.data
      this._flat = data.flat
    }
  }
}

module.exports = Search

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 5 */
/***/ function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


class Tabs extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get tagName () { return 'ul' }

  get styleSheet () {
    return `:scope {
      display: flex;
      flex: 1;
      border-left: 1px solid #ddd;
      > li {
        padding: 0 10px;
        border-right: 1px solid #ddd;
        border-top: 1px solid #ddd;
        position: relative;
        background: #eee;
        white-space: nowrap;
        &.selected {
          background: #fff;
          &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            width: 100%;
            height: 1px;
            background: #fff;
            left: 0;
          }
        }
        &:hover > i { display: block }
        > i {
          display: none;
          content: 'x';
          font-style: normal;
          position: absolute;
          z-index: 9;
          right: -4px;
          top: -4px;
          width: 12px;
          height: 12px;
          text-align: center;
          line-height: 12px;
          background: #ccc;
          color: #eee;
          border-radius: 50%;
          cursor: pointer;
          &:hover {
            background: #aaa;
            color: #fff;
          }
        }
        label {
          display: inline-block;
          background: #03A9F4;
          width: 16px;
          height: 16px;
          text-align: center;
          line-height: 18px;
          color: #fff;
          border-radius: 50%;
          transform: scale(.7);
        }
      }
    }`
  }

  get types () { return this._types }
  set types (types = []) {
    this._types = types
    this.render()
  }

  render () {
    this.element.innerHTML = ''
    Tab.from(this.types).to(this)
  }
}

class Tab extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get template () {
    return `
    <li on-click="{click}">
      <span>{name}</span>
      <label>{count}</label>
      <i on-click="{clear}">x</i>
    </li>`
  }

  init () {
    this.element.className = this.selected ? 'selected' : ''
    this.element.style.display = this.count ? 'block' : 'none'
  }

  click () {
    this.element.dispatchEvent(new CustomEvent('type-change', {
      bubbles: true,
      detail: this.name
    }))
  }

  clear () {
    this.element.dispatchEvent(new CustomEvent('tab-clear', {
      bubbles: true,
      detail: this.name
    }))
  }
}

module.exports = Tabs


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


class Tags extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get tagName () { return 'ul' }

  get styleSheet () {
    return `:scope {
      border: 1px solid #ddd;
      text-align: left;
      max-height: 91px;
      overflow-y: auto;
      > li {
        display: inline-block;
        height: 20px;
        background: #eee;
        padding: 0 10px;
        margin: 5px;
        background-color: #19d4ae;
        border-radius: 2px;
        color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        transition: all 0.2s ease-out;
        &:hover {
          background-color: #19d4ae;
          box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
        }
      }
    }`
  }

  set data (data) {
    if (data) {
      this.element.innerHTML = ''
      Tag.from(data).to(this)
    }
  }
}

class Tag extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get template () {
    return `<li on-click="{click}" jinkela-tag>{n}</li>`
  }

  click (e) {
    e.stopPropagation()
    this.element.dispatchEvent(new CustomEvent('item-remove', {
      bubbles: true,
      detail: {
        n: this.n,
        i: this.i,
        level: this.level
      }
    }))
  }
}

module.exports = Tags


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


class Selects extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get tagName () { return 'div' }

  get styleSheet () {
    return `:scope {
      background: #fff;
      ul {
        position: absolute;
        border: 1px solid #ddd;
        max-height: 390px;
        overflow: auto;
        background: #fff;
        border-top: none;
        > li {
          border-top: 1px solid #ddd;
          height: 26px;
          display: flex;
          > span {
            color: #999;
            padding: 0 5px;
            background: #f8f8f8;
            border-right: 1px solid #eee;
          }
          > strong {
            flex: 1;
            padding: 0 15px;
          }
          &.selected {
            color: #19d4ae;
          }
        }
      }
    }`
  }

  init () {
    this.element.addEventListener('item-enter', e => {
      const { index, level, i } = e.detail
      const position = e.target.getBoundingClientRect()
      const data = this.getModel(level + 1, i)
      if (!data) {
        if (index === 0) {
          this.remove(1)
        }
        return
      }
      this.show({
        index: index + 1,
        data,
        position: {
          top: position.top + window.pageYOffset + 'px',
          left: position.width + position.left + window.pageXOffset + 'px'
        }
      })
    })
  }

  set visible (b) {
    if (!this._ref) { this._ref = [] }
    if (b) {
      this.showDefault()
    } else {
      this.remove()
    }
  }

  get keyword () { return this._keyword }
  set keyword (k) {
    if (k === this._keyword) { return }
    this._keyword = k
    this.showDefault()
  }

  getModel (level, id) {
    if (level === 0) {
      if (this.keyword) {
        return this.flat.filter(item => item.n.indexOf(this.keyword) >= 0)
      }
      return this.flat
    }
    return this.data[level] && this.data[level][id]
  }

  showDefault () {
    if (!this.data || !this.flat) { return }
    this.remove(0)
    this._ref[0] = new Select({ data: this.getModel(0), index: 0, selected: this.selected }).to(this)
  }

  show ({ index, data, position }) {
    this.remove(index)
    this._ref[index] = new Select({ data, index, position, selected: this.selected }).to(this)
  }

  remove (index) {
    if (!index) {
      this.element.innerHTML = ''
      this._ref = []
    } else {
      this._ref.forEach((ref, i) => {
        if (ref && i >= index) {
          ref.element.remove()
          delete this._ref[i]
        }
      })
    }
  }
}

const PAGE_SIZE = 200

class Select extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get tagName () { return 'ul' }

  init () {
    this.element.addEventListener('item-enter', e => {
      e.detail.index = this.index
    })

    this.page = 0

    if (this.data.length > PAGE_SIZE) {
      this.element.addEventListener('scroll', this.scroll.bind(this))
      this.max = Math.ceil(this.data.length / PAGE_SIZE)
    }

    this.render(this.getPage(0))
  }

  set position (pos) {
    Object.assign(this.element.style, pos)
  }

  scroll () {
    if (!this.scrollHeight || !this.offsetHeight) {
      this.scrollHeight = this.element.scrollHeight
      this.offsetHeight = this.element.offsetHeight
    }
    if (this.element.scrollTop + this.offsetHeight * 2 > this.scrollHeight) {
      this.nextPage()
    }
  }

  nextPage () {
    if (this.page >= this.max - 1) { return }
    this.render(this.getPage(++this.page))
    setTimeout(() => { this.scrollHeight = this.element.scrollHeight }, 0)
  }

  getPage (index) {
    return this.data.slice(index * PAGE_SIZE, index * PAGE_SIZE + PAGE_SIZE)
  }

  render (data) {
    if (data) {
      data.forEach(d => {
        d.selected = this.selected && this.selected.some(s => s.i === d.i && s.level === d.level)
        new Item(d).to(this)
      })
    }
  }
}

class Item extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  get template () {
    return `<li on-click="{click}" on-mouseenter="{mouseenter}"><span>{title}</span><strong>{n}</strong></li>`
  }

  init () {
    const { classList } = this.element
    if (this.hasChild) { classList.add('has-child') }
    if (this.selected) { classList.add('selected') }
  }

  _dispatch (action) {
    this.element.dispatchEvent(new CustomEvent(action, {
      bubbles: true,
      detail: {
        n: this.n,
        i: this.i,
        level: this.level
      }
    }))
  }

  mouseenter () {
    this._dispatch('item-enter')
  }

  click (e) {
    e.stopPropagation()
    const { classList } = this.element
    if (classList.contains('selected')) {
      classList.remove('selected')
      this._dispatch('item-remove')
    } else {
      classList.add('selected')
      this._dispatch('item-select')
    }
  }
}

module.exports = Selects


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


class Component extends __WEBPACK_IMPORTED_MODULE_0_jinkela___default.a {
  // register components
  get Dropdown () { return __webpack_require__(1) }
  get Search () { return __webpack_require__(3) }
  get Panel () { return __webpack_require__(2) }

  get template () {
    return `
    <div>
      <div jinkela-search>
        <jkl-dropdown types="{_types}" current="{_currentType}"></jkl-dropdown>
        <jkl-search data="{currentModel}" visible="{modal}" selected="{currentSelected}"></jkl-search>
      </div>
      <div jinkela-panel>
        <jkl-panel types="{_types}" current="{_currentType}" tags="{currentSelected}" selected="{selected}" modal="{modal}"></jkl-panel>
      </div>
    </div>`
  }

  get styleSheet () {
    return `:scope {
      display: flex;
      line-height: 24px;
      font-size: 12px;
      color: #666;
      text-align: center;
      * {
        box-sizing: border-box;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        cursor: default;
        user-select: none;
      }
      li:hover { background: #f8f8f8; }
      li:active { background: #eee; }
      [jinkela-search] {
        display: flex;
        border: 1px solid #ddd;
        height: 26px;
      }
      [jinkela-panel] {
        flex: 1;
        padding-left: 15px;
        line-height: 20px;
      }
      .has-child:after {
        content: ">";
        margin-right: 5px;
        color: #aaa;
      }
      ::-webkit-scrollbar {
        display: none;
      }
    }`
  }

  get data () { return this._data }
  set data (data) {
    if (typeof data !== 'object') {
      throw new Error('invalid data')
    }

    if (!Array.isArray(data)) {
      data = [data]
    }

    // prepare data
    prepare(data)

    this._data = data
    this.types = data.map(d => d.name)
  }

  get types () { return this._types }
  set types (types) {
    this._types = types
    this.currentType = types[0]
  }

  get currentType () { return this._currentType }
  set currentType (type) {
    this._currentType = type
    this.data.forEach(d => {
      if (d.name === type) {
        this.currentModel = d
      }
    })
  }

  init () {
    this.selected = []
    document.body.addEventListener('click', () => { this.modal = false })
    this.element.addEventListener('type-change', this.typeChange.bind(this))
    this.element.addEventListener('item-select', this.addSelect.bind(this))
    this.element.addEventListener('item-remove', this.removeSelect.bind(this))
    this.element.addEventListener('item-clear', this.clearSelect.bind(this))
    this.element.addEventListener('tab-clear', this.clearTab.bind(this))
  }

  typeChange (e) {
    this.currentType = e.detail
    this.refreshCurrentSelected()
  }

  clearTab (e) {
    this.selected = this.selected.filter(s => s.type !== e.detail)
    this.refreshCurrentSelected()
  }

  addSelect (e) {
    const item = e.detail
    item.type = this.currentType
    if (!this.containsSelect(item)) {
      this.selected.push(item)
      this.refreshCurrentSelected()
    }
  }

  removeSelect (e) {
    const item = e.detail
    item.type = this.currentType
    this.selected = this.selected.filter(s => !isEqual(item, s))
    this.refreshCurrentSelected()
  }

  clearSelect () {
    this.selected = []
    this.currentSelected = []
    
    this.lastSelectCount = 0
    this.onChange && this.onChange(this.selected)
  }

  containsSelect (a) {
    return this.selected.some(b => isEqual(a, b))
  }

  refreshCurrentSelected () {
    this.currentSelected = this.selected.filter(s => s.type === this.currentType)

    // trigger onChange api when select array change
    if (this.lastSelectCount === undefined) { this.lastSelectCount = 0 }
    if (this.lastSelectCount !== this.selected.length) {
      this.lastSelectCount = this.selected.length
      this.onChange && this.onChange(this.selected)
    }
  }
}

function isEqual (a, b) {
  return a.i === b.i && a.type === b.type && a.level === b.level
}

function prepare (data) {
  data.forEach(raw => {
    raw.flat = []
    raw.struct.forEach((title, level) => {
      for (let id in raw.data[level]) {
        raw.data[level][id].forEach(item => {
          item.level = level
          item.title = title
          item.hasChild = raw.data[level + 1] && raw.data[level + 1][item.i]
          raw.flat.push(item)
        })
      }
    })
  })
}

module.exports = Component


/***/ }
/******/ ]);
});