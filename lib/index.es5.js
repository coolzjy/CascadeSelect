(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		{ module.exports = factory(); }
	else if(typeof define === 'function' && define.amd)
		{ define([], factory); }
	else if(typeof exports === 'object')
		{ exports["CascadingSelect"] = factory(); }
	else
		{ root["CascadingSelect"] = factory(); }
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			{ return installedModules[moduleId].exports; }

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
/**/   if (typeof module === 'object' && !!module.exports) { return scope(function(name, dependencies, factory) {
/**/     if (typeof name !== 'string') { factory = dependencies, dependencies = name, name = null; }
/**/     if (!(dependencies instanceof Array)) { factory = dependencies, dependencies = []; }
/**/     var args;
/**/     args = [  ];
/**/     module.exports = factory.apply(module.exports, args) || module.exports;
/**/   }); }
/**/
/**/   // AMD, wrap a 'String' to avoid warn of fucking webpack
/**/   if (String("function") === 'function' && !!__webpack_require__(5)) { return scope(__webpack_require__(4)); }
/**/
/**/   // Global
/**/   scope(function(name, dependencies, factory) {
/**/     if (typeof name !== 'string') { factory = dependencies, dependencies = name, name = null; }
/**/     if (!(dependencies instanceof Array)) { factory = dependencies, dependencies = []; }
/**/     var exports = {};
/**/     var args = [];
/**/     for (var i = 0; i < dependencies.length; i++) { args[i] = window[dependencies[i]]; }
/**/     exports = factory.apply(exports, args) || exports;
/**/     if (name) {
/**/       /**/ try { /* Fuck IE8- */
/**/       /**/   if (typeof execScript === 'object') { execScript('var ' + name); }
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
    if (desc) { list.push(desc.get ? desc.get.call(that) : desc.value); }
  }
  list.reverse();
  if (typeof mapping === 'function') { for (var j = 0; j < list.length; j++) { list[j] = mapping(list[j]); } }
  return list;
};
var define = function(base, name, desc) {
  return Object.defineProperty(base, name, Object.create(desc, { configurable: { value: true } }));
};
var getOnce = function(base, name, getter) {
  define(base, name, { get: function() { return define(this, name, { value: getter.call(this) })[name]; } });
};
var callArray = function(array, that) { for (var i = 0; i < array.length; i++) { array[i].call(that); } };

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
    if (attrs = node.attributes) { for (i = 0; attr = attrs[i]; i++) { callee(attr, node); } }
  }(that.element);
  // Change "watches" to accessor properties
  for (var name in watches) { void function(name) {
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
  }(name); }
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
  if (typeof this.beforeParse === 'function') { this.beforeParse(params); } // Expirimental
  extendSpecialFields(this, params);
  parseTemplate(this);
  // Extends each arguments to this
  if (typeof this.beforeExtends === 'function') { this.beforeExtends(); } // Expirimental
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
      if (element.children.length !== 1) { throw new Error('Jinkela: Template require 1 root element'); }
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
      if (typeof Jinkela.cssPreprocessor === 'function') { styleSheet = Jinkela.cssPreprocessor(styleSheet); }
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
  var arguments$1 = arguments;
  var this$1 = this;

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments$1[i];
    if (arg instanceof Object) { for (var j in arg) { this$1[j] = arg[j]; } }
  }
} });
var createRender = function(name, handler) {
  define(Jinkela.prototype, name, { value: function(target) {
    if (!this.hasOwnProperty('parent')) { define(this, 'parent', { value: target }); }
    if (target instanceof Jinkela) { target = target.element; }
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
    var this$1 = this;

    if (raw instanceof Array) {
      var result = [];
      for (var i = 0; i < raw.length; i++) { result.push(new this$1(raw[i])); }
      var to = function(target) {
        for (var i = 0; i < raw.length; i++) { result[i].to(target); }
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
  if (ownerElement.component) { ownerElement = ownerElement.component.element; }
  var not = !!RegExp.$1;
  var replacement = new Comment(' ' + node.name + '="' + node.value + '" ');
  var state = true;
  var name = /^\{(.*)\}$|$/.exec(node.value)[1];
  that['@@didMountHandlers'].push(function() { this[name] = this[name]; });
  return function(value) {
    value = !!value ^ not;
    if (state === value) { return; }
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
  if (!Component) { throw new Error('No component can be matched with ' + node.tagName); }
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
        if (component) { component[nodeName] = value; }
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
  if (ownerElement.component) { ownerElement = ownerElement.component.element; }
  var eventName = node.nodeName.match(/^on-(.*)|$/)[1];
  return function(handler) {
    if (typeof handler !== 'function') { return; }
    ownerElement.addEventListener(eventName, handler.bind(that));
  };
});
Jinkela.register('ref', function(that, node, ownerElement) {
  var fixNode = function(item) {
    if (item == null) { item = new Comment(' ' + item + ' '); } // eslint-disable-line
    if (item instanceof Jinkela) { item = item.element; }
    if (!(item instanceof Node)) { item = new Text(item); }
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
      if (element instanceof HTMLCollection || element instanceof NodeList) { element = [].slice.call(element); }
      if (element instanceof DocumentFragment) { element = [].slice.call(element.childNodes); }
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


var Dropdown = (function (superclass) {
  function Dropdown () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Dropdown.__proto__ = superclass;
  Dropdown.prototype = Object.create( superclass && superclass.prototype );
  Dropdown.prototype.constructor = Dropdown;

  var prototypeAccessors = { template: {},styleSheet: {},types: {} };

  prototypeAccessors.template.get = function () {
    return "\n    <div>\n      <div>{current}</div>\n      <ul ref=\"$list\"></ul>\n    </div>\n    "
  };

  prototypeAccessors.styleSheet.get = function () {
    return ":scope {\n      position: relative;\n      user-select: none;\n      cursor: default;\n      > div {\n        min-width: 100px;\n        border-right: 1px solid #eee;\n        background: #f8f8f8;\n      }\n      &:hover > ul {\n        visibility: visible;\n        transform: scaleY(1);\n      }\n      > ul {\n        visibility: hidden;\n        transform: scaleY(0);\n        transform-origin: top;\n        transition: all .1s ease .1s;\n        position: absolute;\n        left: -1px;\n        top: 25px;\n        width: 100%;\n        border-left: 1px solid #ddd;\n        box-sizing: content-box;\n        li {\n          border-bottom: 1px solid #ddd;\n          border-right: 1px solid #ddd;\n        }\n      }\n    }"
  };

  prototypeAccessors.types.set = function (types) {
    var this$1 = this;

    if (Array.isArray(types)) {
      types.forEach(function (name) {
        new Item({ name: name }).to(this$1.$list)
      })
    }
  };

  Object.defineProperties( Dropdown.prototype, prototypeAccessors );

  return Dropdown;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

var Item = (function (superclass) {
  function Item () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Item.__proto__ = superclass;
  Item.prototype = Object.create( superclass && superclass.prototype );
  Item.prototype.constructor = Item;

  var prototypeAccessors$1 = { template: {} };

  prototypeAccessors$1.template.get = function () {
    return "<li on-click=\"{click}\">{name}</li>"
  };

  Item.prototype.click = function click () {
    this.element.dispatchEvent(new CustomEvent('type-change', {
      bubbles: true,
      detail: this.name
    }))
  };

  Object.defineProperties( Item.prototype, prototypeAccessors$1 );

  return Item;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

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




var Panel = (function (superclass) {
  function Panel () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Panel.__proto__ = superclass;
  Panel.prototype = Object.create( superclass && superclass.prototype );
  Panel.prototype.constructor = Panel;

  var prototypeAccessors = { Tabs: {},Tags: {},template: {},styleSheet: {},tags: {},modal: {} };

  prototypeAccessors.Tabs.get = function () { return __WEBPACK_IMPORTED_MODULE_1__Tabs___default.a };
  prototypeAccessors.Tags.get = function () { return __WEBPACK_IMPORTED_MODULE_2__Tags___default.a };

  prototypeAccessors.template.get = function () {
    return "\n    <div on-item-remove=\"{click}\">\n      <div>\n        <jkl-tabs types=\"{_types}\"></jkl-tabs>\n        <div jinkela-clear on-click=\"{clear}\">清除全部</div>\n      </div>\n      <jkl-tags data=\"{_tags}\"></jkl-tags>\n    </div>"
  };

  prototypeAccessors.styleSheet.get = function () {
    return ":scope {\n      visibility: hidden;\n      > div {\n        display: flex;\n        [jinkela-clear] {\n          visibility: hidden;\n          cursor: pointer;\n          width: 80px;\n          transition: color,opacity .3s;\n          border-bottom: none;\n          border-top-left-radius: 3px;\n          border-top-right-radius: 3px;\n          background: #ef3b2e;\n          color: #fff;\n          opacity: .6;\n          &:hover {\n            opacity: 1;\n          }\n        }\n      }\n      &.edit-mode [jinkela-tag] {\n        animation: shake .2s infinite;\n        position: relative;\n        cursor: pointer;\n        &:after {\n          content: 'x';\n          position: absolute;\n          right: -4px;\n          top: -4px;\n          width: 12px;\n          height: 12px;\n          border-radius: 50%;\n          line-height: 12px;\n          text-align: center;\n          background: #17bf9d;\n        }\n      }\n      &.edit-mode [jinkela-clear] {\n        visibility: visible;\n      }\n    }\n    @keyframes shake {\n      0 { transform: rotate(0) }\n      25% { transform: rotate(-1deg) }\n      50% { transform: rotate(0) }\n      75% { transform: rotate(1deg) }\n      100% { transform: rotate(0) }\n    }"
  };

  prototypeAccessors.tags.set = function (tags) {
    var this$1 = this;

    if (tags) {
      this._tags = tags
      this._types = this.types.map(function (name) {
        return {
          name: name,
          selected: name === this$1.current,
          count: this$1.selected.filter(function (s) { return s.type === name; }).length
        }
      })
      this.element.style.visibility = this.selected && this.selected.length ? 'visible' : 'hidden'
    }
  };

  prototypeAccessors.modal.set = function (modal) {
    this.element.classList.remove('edit-mode')
  };

  Panel.prototype.clear = function clear () {
    this.element.dispatchEvent(new CustomEvent('item-clear', { bubbles: true }))
  };

  Panel.prototype.click = function click (e) {
    if (!this.element.classList.contains('edit-mode')) {
      this.element.classList.add('edit-mode')
      e.stopPropagation()
    }
  };

  Object.defineProperties( Panel.prototype, prototypeAccessors );

  return Panel;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

module.exports = Panel


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


var Search = (function (superclass) {
  function Search () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Search.__proto__ = superclass;
  Search.prototype = Object.create( superclass && superclass.prototype );
  Search.prototype.constructor = Search;

  var prototypeAccessors = { Selects: {},template: {},styleSheet: {},data: {} };

  prototypeAccessors.Selects.get = function () { return __webpack_require__(8) };

  prototypeAccessors.template.get = function () {
    return "\n    <div>\n      <input type=\"search\" on-input=\"{input}\" on-click=\"{click}\" />\n      <jkl-selects data=\"{_data}\" flat=\"{_flat}\" keyword=\"{keyword}\" visible=\"{visible}\" selected=\"{selected}\"></jkl-selects>\n    </div>"
  };

  prototypeAccessors.styleSheet.get = function () {
    return ":scope {\n      > input {\n        border: none;\n        outline: none;\n        padding: 0 5px;\n      } \n    }"
  };

  Search.prototype.input = function input (ref) {
    var target = ref.target;

    this.keyword = target.value.trim()
  };

  Search.prototype.click = function click (e) {
    this.visible = true
    e.stopPropagation()
  };

  prototypeAccessors.data.set = function (data) {
    if (data) {
      this._data = data.data
      this._flat = data.flat
    }
  };

  Object.defineProperties( Search.prototype, prototypeAccessors );

  return Search;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

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


var Tabs = (function (superclass) {
  function Tabs () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Tabs.__proto__ = superclass;
  Tabs.prototype = Object.create( superclass && superclass.prototype );
  Tabs.prototype.constructor = Tabs;

  var prototypeAccessors = { tagName: {},styleSheet: {},types: {} };

  prototypeAccessors.tagName.get = function () { return 'ul' };

  prototypeAccessors.styleSheet.get = function () {
    return ":scope {\n      display: flex;\n      flex: 1;\n      border-left: 1px solid #ddd;\n      > li {\n        padding: 0 10px;\n        border-right: 1px solid #ddd;\n        border-top: 1px solid #ddd;\n        position: relative;\n        background: #eee;\n        white-space: nowrap;\n        &.selected {\n          background: #fff;\n          &::after {\n            content: '';\n            position: absolute;\n            bottom: -1px;\n            width: 100%;\n            height: 1px;\n            background: #fff;\n            left: 0;\n          }\n        }\n        &:hover > i { display: block }\n        > i {\n          display: none;\n          content: 'x';\n          font-style: normal;\n          position: absolute;\n          z-index: 9;\n          right: -4px;\n          top: -4px;\n          width: 12px;\n          height: 12px;\n          text-align: center;\n          line-height: 12px;\n          background: #ccc;\n          color: #eee;\n          border-radius: 50%;\n          cursor: pointer;\n          &:hover {\n            background: #aaa;\n            color: #fff;\n          }\n        }\n        label {\n          display: inline-block;\n          background: #03A9F4;\n          width: 16px;\n          height: 16px;\n          text-align: center;\n          line-height: 18px;\n          color: #fff;\n          border-radius: 50%;\n          transform: scale(.7);\n        }\n      }\n    }"
  };

  prototypeAccessors.types.get = function () { return this._types };
  prototypeAccessors.types.set = function (types) {
    if ( types === void 0 ) types = [];

    this._types = types
    this.render()
  };

  Tabs.prototype.render = function render () {
    this.element.innerHTML = ''
    Tab.from(this.types).to(this)
  };

  Object.defineProperties( Tabs.prototype, prototypeAccessors );

  return Tabs;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

var Tab = (function (superclass) {
  function Tab () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Tab.__proto__ = superclass;
  Tab.prototype = Object.create( superclass && superclass.prototype );
  Tab.prototype.constructor = Tab;

  var prototypeAccessors$1 = { template: {} };

  prototypeAccessors$1.template.get = function () {
    return "\n    <li on-click=\"{click}\">\n      <span>{name}</span>\n      <label>{count}</label>\n      <i on-click=\"{clear}\">x</i>\n    </li>"
  };

  Tab.prototype.init = function init () {
    this.element.className = this.selected ? 'selected' : ''
    this.element.style.display = this.count ? 'block' : 'none'
  };

  Tab.prototype.click = function click () {
    this.element.dispatchEvent(new CustomEvent('type-change', {
      bubbles: true,
      detail: this.name
    }))
  };

  Tab.prototype.clear = function clear () {
    this.element.dispatchEvent(new CustomEvent('tab-clear', {
      bubbles: true,
      detail: this.name
    }))
  };

  Object.defineProperties( Tab.prototype, prototypeAccessors$1 );

  return Tab;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

module.exports = Tabs


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


var Tags = (function (superclass) {
  function Tags () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Tags.__proto__ = superclass;
  Tags.prototype = Object.create( superclass && superclass.prototype );
  Tags.prototype.constructor = Tags;

  var prototypeAccessors = { tagName: {},styleSheet: {},data: {} };

  prototypeAccessors.tagName.get = function () { return 'ul' };

  prototypeAccessors.styleSheet.get = function () {
    return ":scope {\n      border: 1px solid #ddd;\n      text-align: left;\n      max-height: 91px;\n      overflow-y: auto;\n      > li {\n        display: inline-block;\n        height: 20px;\n        background: #eee;\n        padding: 0 10px;\n        margin: 5px;\n        background-color: #19d4ae;\n        border-radius: 2px;\n        color: #fff;\n        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n        transition: all 0.2s ease-out;\n        &:hover {\n          background-color: #19d4ae;\n          box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n        }\n      }\n    }"
  };

  prototypeAccessors.data.set = function (data) {
    if (data) {
      this.element.innerHTML = ''
      Tag.from(data).to(this)
    }
  };

  Object.defineProperties( Tags.prototype, prototypeAccessors );

  return Tags;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

var Tag = (function (superclass) {
  function Tag () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Tag.__proto__ = superclass;
  Tag.prototype = Object.create( superclass && superclass.prototype );
  Tag.prototype.constructor = Tag;

  var prototypeAccessors$1 = { template: {} };

  prototypeAccessors$1.template.get = function () {
    return "<li on-click=\"{click}\" jinkela-tag>{n}</li>"
  };

  Tag.prototype.click = function click (e) {
    e.stopPropagation()
    this.element.dispatchEvent(new CustomEvent('item-remove', {
      bubbles: true,
      detail: {
        n: this.n,
        i: this.i,
        level: this.level
      }
    }))
  };

  Object.defineProperties( Tag.prototype, prototypeAccessors$1 );

  return Tag;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

module.exports = Tags


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


var Selects = (function (superclass) {
  function Selects () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Selects.__proto__ = superclass;
  Selects.prototype = Object.create( superclass && superclass.prototype );
  Selects.prototype.constructor = Selects;

  var prototypeAccessors = { tagName: {},styleSheet: {},visible: {},keyword: {} };

  prototypeAccessors.tagName.get = function () { return 'div' };

  prototypeAccessors.styleSheet.get = function () {
    return ":scope {\n      background: #fff;\n      ul {\n        position: absolute;\n        border: 1px solid #ddd;\n        max-height: 390px;\n        overflow: auto;\n        background: #fff;\n        border-top: none;\n        > li {\n          border-top: 1px solid #ddd;\n          height: 26px;\n          display: flex;\n          > span {\n            color: #999;\n            padding: 0 5px;\n            background: #f8f8f8;\n            border-right: 1px solid #eee;\n          }\n          > strong {\n            flex: 1;\n            padding: 0 15px;\n          }\n          &.selected {\n            color: #19d4ae;\n          }\n        }\n      }\n    }"
  };

  Selects.prototype.init = function init () {
    var this$1 = this;

    this.element.addEventListener('item-enter', function (e) {
      var ref = e.detail;
      var index = ref.index;
      var level = ref.level;
      var i = ref.i;
      var position = e.target.getBoundingClientRect()
      var data = this$1.getModel(level + 1, i)
      if (!data) {
        if (index === 0) {
          this$1.remove(1)
        }
        return
      }
      this$1.show({
        index: index + 1,
        data: data,
        position: {
          top: position.top + window.pageYOffset + 'px',
          left: position.width + position.left + window.pageXOffset + 'px'
        }
      })
    })
  };

  prototypeAccessors.visible.set = function (b) {
    if (!this._ref) { this._ref = [] }
    if (b) {
      this.showDefault()
    } else {
      this.remove()
    }
  };

  prototypeAccessors.keyword.get = function () { return this._keyword };
  prototypeAccessors.keyword.set = function (k) {
    if (k === this._keyword) { return }
    this._keyword = k
    this.showDefault()
  };

  Selects.prototype.getModel = function getModel (level, id) {
    var this$1 = this;

    if (level === 0) {
      if (this.keyword) {
        return this.flat.filter(function (item) { return item.n.indexOf(this$1.keyword) >= 0; })
      }
      return this.flat
    }
    return this.data[level] && this.data[level][id]
  };

  Selects.prototype.showDefault = function showDefault () {
    if (!this.data || !this.flat) { return }
    this.remove(0)
    this._ref[0] = new Select({ data: this.getModel(0), index: 0, selected: this.selected }).to(this)
  };

  Selects.prototype.show = function show (ref) {
    var index = ref.index;
    var data = ref.data;
    var position = ref.position;

    this.remove(index)
    this._ref[index] = new Select({ data: data, index: index, position: position, selected: this.selected }).to(this)
  };

  Selects.prototype.remove = function remove (index) {
    var this$1 = this;

    if (!index) {
      this.element.innerHTML = ''
      this._ref = []
    } else {
      this._ref.forEach(function (ref, i) {
        if (ref && i >= index) {
          ref.element.remove()
          delete this$1._ref[i]
        }
      })
    }
  };

  Object.defineProperties( Selects.prototype, prototypeAccessors );

  return Selects;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

var PAGE_SIZE = 200

var Select = (function (superclass) {
  function Select () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Select.__proto__ = superclass;
  Select.prototype = Object.create( superclass && superclass.prototype );
  Select.prototype.constructor = Select;

  var prototypeAccessors$1 = { tagName: {},position: {} };

  prototypeAccessors$1.tagName.get = function () { return 'ul' };

  Select.prototype.init = function init () {
    var this$1 = this;

    this.element.addEventListener('item-enter', function (e) {
      e.detail.index = this$1.index
    })

    this.page = 0

    if (this.data.length > PAGE_SIZE) {
      this.element.addEventListener('scroll', this.scroll.bind(this))
      this.max = Math.ceil(this.data.length / PAGE_SIZE)
    }

    this.render(this.getPage(0))
  };

  prototypeAccessors$1.position.set = function (pos) {
    Object.assign(this.element.style, pos)
  };

  Select.prototype.scroll = function scroll () {
    if (!this.scrollHeight || !this.offsetHeight) {
      this.scrollHeight = this.element.scrollHeight
      this.offsetHeight = this.element.offsetHeight
    }
    if (this.element.scrollTop + this.offsetHeight * 2 > this.scrollHeight) {
      this.nextPage()
    }
  };

  Select.prototype.nextPage = function nextPage () {
    var this$1 = this;

    if (this.page >= this.max - 1) { return }
    this.render(this.getPage(++this.page))
    setTimeout(function () { this$1.scrollHeight = this$1.element.scrollHeight }, 0)
  };

  Select.prototype.getPage = function getPage (index) {
    return this.data.slice(index * PAGE_SIZE, index * PAGE_SIZE + PAGE_SIZE)
  };

  Select.prototype.render = function render (data) {
    var this$1 = this;

    if (data) {
      data.forEach(function (d) {
        d.selected = this$1.selected && this$1.selected.some(function (s) { return s.i === d.i && s.level === d.level; })
        new Item(d).to(this$1)
      })
    }
  };

  Object.defineProperties( Select.prototype, prototypeAccessors$1 );

  return Select;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

var Item = (function (superclass) {
  function Item () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Item.__proto__ = superclass;
  Item.prototype = Object.create( superclass && superclass.prototype );
  Item.prototype.constructor = Item;

  var prototypeAccessors$2 = { template: {} };

  prototypeAccessors$2.template.get = function () {
    return "<li on-click=\"{click}\" on-mouseenter=\"{mouseenter}\"><span>{title}</span><strong>{n}</strong></li>"
  };

  Item.prototype.init = function init () {
    var ref = this.element;
    var classList = ref.classList;
    if (this.hasChild) { classList.add('has-child') }
    if (this.selected) { classList.add('selected') }
  };

  Item.prototype._dispatch = function _dispatch (action) {
    this.element.dispatchEvent(new CustomEvent(action, {
      bubbles: true,
      detail: {
        n: this.n,
        i: this.i,
        level: this.level
      }
    }))
  };

  Item.prototype.mouseenter = function mouseenter () {
    this._dispatch('item-enter')
  };

  Item.prototype.click = function click (e) {
    e.stopPropagation()
    var ref = this.element;
    var classList = ref.classList;
    if (classList.contains('selected')) {
      classList.remove('selected')
      this._dispatch('item-remove')
    } else {
      classList.add('selected')
      this._dispatch('item-select')
    }
  };

  Object.defineProperties( Item.prototype, prototypeAccessors$2 );

  return Item;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

module.exports = Selects


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jinkela___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jinkela__);


var Component = (function (superclass) {
  function Component () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Component.__proto__ = superclass;
  Component.prototype = Object.create( superclass && superclass.prototype );
  Component.prototype.constructor = Component;

  var prototypeAccessors = { Dropdown: {},Search: {},Panel: {},template: {},styleSheet: {},data: {},types: {},currentType: {} };

  prototypeAccessors.Dropdown.get = function () { return __webpack_require__(1) };
  prototypeAccessors.Search.get = function () { return __webpack_require__(3) };
  prototypeAccessors.Panel.get = function () { return __webpack_require__(2) };

  prototypeAccessors.template.get = function () {
    return "\n    <div>\n      <div jinkela-search>\n        <jkl-dropdown types=\"{_types}\" current=\"{_currentType}\"></jkl-dropdown>\n        <jkl-search data=\"{currentModel}\" visible=\"{modal}\" selected=\"{currentSelected}\"></jkl-search>\n      </div>\n      <div jinkela-panel>\n        <jkl-panel types=\"{_types}\" current=\"{_currentType}\" tags=\"{currentSelected}\" selected=\"{selected}\" modal=\"{modal}\"></jkl-panel>\n      </div>\n    </div>"
  };

  prototypeAccessors.styleSheet.get = function () {
    return ":scope {\n      display: flex;\n      line-height: 24px;\n      font-size: 12px;\n      color: #666;\n      text-align: center;\n      * {\n        box-sizing: border-box;\n      }\n      ul {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n        cursor: default;\n        user-select: none;\n      }\n      li:hover { background: #f8f8f8; }\n      li:active { background: #eee; }\n      [jinkela-search] {\n        display: flex;\n        border: 1px solid #ddd;\n        height: 26px;\n      }\n      [jinkela-panel] {\n        flex: 1;\n        padding-left: 15px;\n        line-height: 20px;\n      }\n      .has-child:after {\n        content: \">\";\n        margin-right: 5px;\n        color: #aaa;\n      }\n      ::-webkit-scrollbar {\n        display: none;\n      }\n    }"
  };

  prototypeAccessors.data.get = function () { return this._data };
  prototypeAccessors.data.set = function (data) {
    if (typeof data !== 'object') {
      throw new Error('invalid data')
    }

    if (!Array.isArray(data)) {
      data = [data]
    }

    // prepare data
    prepare(data)

    this._data = data
    this.types = data.map(function (d) { return d.name; })
  };

  prototypeAccessors.types.get = function () { return this._types };
  prototypeAccessors.types.set = function (types) {
    this._types = types
    this.currentType = types[0]
  };

  prototypeAccessors.currentType.get = function () { return this._currentType };
  prototypeAccessors.currentType.set = function (type) {
    var this$1 = this;

    this._currentType = type
    this.data.forEach(function (d) {
      if (d.name === type) {
        this$1.currentModel = d
      }
    })
  };

  Component.prototype.init = function init () {
    var this$1 = this;

    this.selected = []
    document.body.addEventListener('click', function () { this$1.modal = false })
    this.element.addEventListener('type-change', this.typeChange.bind(this))
    this.element.addEventListener('item-select', this.addSelect.bind(this))
    this.element.addEventListener('item-remove', this.removeSelect.bind(this))
    this.element.addEventListener('item-clear', this.clearSelect.bind(this))
    this.element.addEventListener('tab-clear', this.clearTab.bind(this))
  };

  Component.prototype.typeChange = function typeChange (e) {
    this.currentType = e.detail
    this.refreshCurrentSelected()
  };

  Component.prototype.clearTab = function clearTab (e) {
    this.selected = this.selected.filter(function (s) { return s.type !== e.detail; })
    this.refreshCurrentSelected()
  };

  Component.prototype.addSelect = function addSelect (e) {
    var item = e.detail
    item.type = this.currentType
    if (!this.containsSelect(item)) {
      this.selected.push(item)
      this.refreshCurrentSelected()
    }
  };

  Component.prototype.removeSelect = function removeSelect (e) {
    var item = e.detail
    item.type = this.currentType
    this.selected = this.selected.filter(function (s) { return !isEqual(item, s); })
    this.refreshCurrentSelected()
  };

  Component.prototype.clearSelect = function clearSelect () {
    this.selected = []
    this.currentSelected = []
  };

  Component.prototype.containsSelect = function containsSelect (a) {
    return this.selected.some(function (b) { return isEqual(a, b); })
  };

  Component.prototype.refreshCurrentSelected = function refreshCurrentSelected () {
    var this$1 = this;

    this.currentSelected = this.selected.filter(function (s) { return s.type === this$1.currentType; })
  };

  Object.defineProperties( Component.prototype, prototypeAccessors );

  return Component;
}(__WEBPACK_IMPORTED_MODULE_0_jinkela___default.a));

function isEqual (a, b) {
  return a.i === b.i && a.type === b.type && a.level === b.level
}

function prepare (data) {
  data.forEach(function (raw) {
    raw.flat = []
    raw.struct.forEach(function (title, level) {
      for (var id in raw.data[level]) {
        raw.data[level][id].forEach(function (item) {
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
