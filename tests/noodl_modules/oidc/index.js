/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@noodl/noodl-sdk/index.js":
/*!************************************************!*\
  !*** ./node_modules/@noodl/noodl-sdk/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _colors = {
  "purple": "component",
  "green": "data",
  "default": "default",
  "grey": "default"
};
Noodl.defineNode = function (def) {
  var _def = {};
  _def.name = def.name;
  _def.displayNodeName = def.displayName;
  _def.usePortAsLabel = def.useInputAsLabel;
  _def.color = _colors[def.color || 'default'];
  _def.category = def.category || 'Modules';
  _def.getInspectInfo = def.getInspectInfo;
  _def.docs = def.docs;
  _def.initialize = function () {
    this.inputs = {};
    var _outputs = this.outputs = {};
    var _this = this;

    // Function for quickly setting outputs
    this.setOutputs = function (o) {
      for (var key in o) {
        _outputs[key] = o[key];
        _this.flagOutputDirty(key);
      }
    };

    // Sending warnings
    this.clearWarnings = function () {
      if (this.context.editorConnection && this.nodeScope && this.nodeScope.componentOwner) this.context.editorConnection.clearWarnings(this.nodeScope.componentOwner.name, this.id);
    }.bind(this);
    this.sendWarning = function (name, message) {
      if (this.context.editorConnection && this.nodeScope && this.nodeScope.componentOwner) this.context.editorConnection.sendWarning(this.nodeScope.componentOwner.name, this.id, name, {
        message: message
      });
    }.bind(this);
    if (typeof def.initialize === 'function') def.initialize.apply(this);
  };
  _def.inputs = {};
  _def.outputs = {};
  for (var key in def.inputs) {
    _def.inputs[key] = {
      type: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].type : def.inputs[key],
      displayName: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].displayName : undefined,
      group: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].group : undefined,
      "default": _typeof(def.inputs[key]) === 'object' ? def.inputs[key]["default"] : undefined,
      set: function () {
        var _key = key;
        return function (value) {
          this.inputs[_key] = value;
          if (def.changed && typeof def.changed[_key] === 'function') {
            def.changed[_key].apply(this, [value]);
          }
        };
      }()
    };
  }
  for (var key in def.signals) {
    _def.inputs[key] = {
      type: 'signal',
      displayName: _typeof(def.signals[key]) === 'object' ? def.signals[key].displayName : undefined,
      group: _typeof(def.signals[key]) === 'object' ? def.signals[key].group : undefined,
      valueChangedToTrue: function () {
        var _key = key;
        return function () {
          var _this2 = this;
          var _fn = _typeof(def.signals[_key]) === 'object' ? def.signals[_key].signal : def.signals[_key];
          if (typeof _fn === 'function') {
            this.scheduleAfterInputsHaveUpdated(function () {
              _fn.apply(_this2);
            });
          }
        };
      }()
    };
  }
  for (var key in def.outputs) {
    if (def.outputs[key] === 'signal') {
      _def.outputs[key] = {
        type: 'signal'
      };
    } else {
      _def.outputs[key] = {
        type: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].type : def.outputs[key],
        displayName: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].displayName : undefined,
        group: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].group : undefined,
        getter: function () {
          var _key = key;
          return function () {
            return this.outputs[_key];
          };
        }()
      };
    }
  }
  _def.methods = _def.prototypeExtensions = {};
  for (var key in def.methods) {
    _def.prototypeExtensions[key] = def.methods[key];
  }
  if (_def.methods.onNodeDeleted) {
    // Override the onNodeDeleted if required
    _def.methods._onNodeDeleted = function () {
      this.__proto__.__proto__._onNodeDeleted.call(this);
      _def.methods.onNodeDeleted.value.call(this);
    };
  }
  return {
    node: _def,
    setup: def.setup
  };
};
Noodl.defineCollectionNode = function (def) {
  var _def = {
    name: def.name,
    category: def.category,
    color: 'data',
    inputs: def.inputs,
    outputs: Object.assign({
      Items: 'array',
      'Fetch Started': 'signal',
      'Fetch Completed': 'signal'
    }, def.outputs || {}),
    signals: Object.assign({
      Fetch: function Fetch() {
        var _this = this;
        this.sendSignalOnOutput('Fetch Started');
        var a = def.fetch.call(this, function () {
          _this.sendSignalOnOutput('Fetch Completed');
        });
        this.setOutputs({
          Items: a
        });
      }
    }, def.signals || {})
  };
  return Noodl.defineNode(_def);
};
Noodl.defineModelNode = function (def) {
  var _def = {
    name: def.name,
    category: def.category,
    color: 'data',
    inputs: {
      Id: 'string'
    },
    outputs: {
      Fetched: 'signal'
    },
    changed: {
      Id: function Id(value) {
        var _this3 = this;
        if (this._object && this._changeListener) this._object.off('change', this._changeListener);
        this._object = Noodl.Object.get(value);
        this._changeListener = function (name, value) {
          var _o = {};
          _o[name] = value;
          _this3.setOutputs(_o);
        };
        this._object.on('change', this._changeListener);
        this.setOutputs(this._object.data);
        this.sendSignalOnOutput('Fetched');
      }
    },
    initialize: function initialize() {}
  };
  for (var key in def.properties) {
    _def.inputs[key] = def.properties[key];
    _def.outputs[key] = def.properties[key];
    _def.changed[key] = function () {
      var _key = key;
      return function (value) {
        if (!this._object) return;
        this._object.set(_key, value);
      };
    }();
  }
  return Noodl.defineNode(_def);
};
Noodl.defineReactNode = function (def) {
  var _def = Noodl.defineNode(def);
  _def.node.getReactComponent = def.getReactComponent;
  _def.node.inputProps = def.inputProps;
  _def.node.inputCss = def.inputCss;
  _def.node.outputProps = def.outputProps;
  _def.node.setup = def.setup;
  _def.node.frame = def.frame;
  return _def.node;
};
module.exports = Noodl;

/***/ }),

/***/ "./node_modules/jsonpath/jsonpath.js":
/*!*******************************************!*\
  !*** ./node_modules/jsonpath/jsonpath.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*! jsonpath 1.1.1 */

(function (f) {
  if (( false ? undefined : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var g; }
})(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return require(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }({
    "./aesprim": [function (require, module, exports) {
      /*
        Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
        Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
        Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
        Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
        Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
        Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
        Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
        Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
        Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
        Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
      
        Redistribution and use in source and binary forms, with or without
        modification, are permitted provided that the following conditions are met:
      
          * Redistributions of source code must retain the above copyright
            notice, this list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright
            notice, this list of conditions and the following disclaimer in the
            documentation and/or other materials provided with the distribution.
      
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
        AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
        IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
        ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
        DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
        ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
        THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      */

      /*jslint bitwise:true plusplus:true */
      /*global esprima:true, define:true, exports:true, window: true,
      throwErrorTolerant: true,
      throwError: true, generateStatement: true, peek: true,
      parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
      parseFunctionDeclaration: true, parseFunctionExpression: true,
      parseFunctionSourceElements: true, parseVariableIdentifier: true,
      parseLeftHandSideExpression: true,
      parseUnaryExpression: true,
      parseStatement: true, parseSourceElement: true */

      (function (root, factory) {
        'use strict';

        // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
        // Rhino, and plain browser loading.

        /* istanbul ignore next */
        if (typeof define === 'function' && define.amd) {
          define(['exports'], factory);
        } else if (typeof exports !== 'undefined') {
          factory(exports);
        } else {
          factory(root.esprima = {});
        }
      })(this, function (exports) {
        'use strict';

        var Token, TokenName, FnExprTokens, Syntax, PropertyKind, Messages, Regex, SyntaxTreeDelegate, source, strict, index, lineNumber, lineStart, length, delegate, lookahead, state, extra;
        Token = {
          BooleanLiteral: 1,
          EOF: 2,
          Identifier: 3,
          Keyword: 4,
          NullLiteral: 5,
          NumericLiteral: 6,
          Punctuator: 7,
          StringLiteral: 8,
          RegularExpression: 9
        };
        TokenName = {};
        TokenName[Token.BooleanLiteral] = 'Boolean';
        TokenName[Token.EOF] = '<end>';
        TokenName[Token.Identifier] = 'Identifier';
        TokenName[Token.Keyword] = 'Keyword';
        TokenName[Token.NullLiteral] = 'Null';
        TokenName[Token.NumericLiteral] = 'Numeric';
        TokenName[Token.Punctuator] = 'Punctuator';
        TokenName[Token.StringLiteral] = 'String';
        TokenName[Token.RegularExpression] = 'RegularExpression';

        // A function following one of those tokens is an expression.
        FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new', 'return', 'case', 'delete', 'throw', 'void',
        // assignment operators
        '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', ',',
        // binary/unary operators
        '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=', '<=', '<', '>', '!=', '!=='];
        Syntax = {
          AssignmentExpression: 'AssignmentExpression',
          ArrayExpression: 'ArrayExpression',
          BlockStatement: 'BlockStatement',
          BinaryExpression: 'BinaryExpression',
          BreakStatement: 'BreakStatement',
          CallExpression: 'CallExpression',
          CatchClause: 'CatchClause',
          ConditionalExpression: 'ConditionalExpression',
          ContinueStatement: 'ContinueStatement',
          DoWhileStatement: 'DoWhileStatement',
          DebuggerStatement: 'DebuggerStatement',
          EmptyStatement: 'EmptyStatement',
          ExpressionStatement: 'ExpressionStatement',
          ForStatement: 'ForStatement',
          ForInStatement: 'ForInStatement',
          FunctionDeclaration: 'FunctionDeclaration',
          FunctionExpression: 'FunctionExpression',
          Identifier: 'Identifier',
          IfStatement: 'IfStatement',
          Literal: 'Literal',
          LabeledStatement: 'LabeledStatement',
          LogicalExpression: 'LogicalExpression',
          MemberExpression: 'MemberExpression',
          NewExpression: 'NewExpression',
          ObjectExpression: 'ObjectExpression',
          Program: 'Program',
          Property: 'Property',
          ReturnStatement: 'ReturnStatement',
          SequenceExpression: 'SequenceExpression',
          SwitchStatement: 'SwitchStatement',
          SwitchCase: 'SwitchCase',
          ThisExpression: 'ThisExpression',
          ThrowStatement: 'ThrowStatement',
          TryStatement: 'TryStatement',
          UnaryExpression: 'UnaryExpression',
          UpdateExpression: 'UpdateExpression',
          VariableDeclaration: 'VariableDeclaration',
          VariableDeclarator: 'VariableDeclarator',
          WhileStatement: 'WhileStatement',
          WithStatement: 'WithStatement'
        };
        PropertyKind = {
          Data: 1,
          Get: 2,
          Set: 4
        };

        // Error messages should be identical to V8.
        Messages = {
          UnexpectedToken: 'Unexpected token %0',
          UnexpectedNumber: 'Unexpected number',
          UnexpectedString: 'Unexpected string',
          UnexpectedIdentifier: 'Unexpected identifier',
          UnexpectedReserved: 'Unexpected reserved word',
          UnexpectedEOS: 'Unexpected end of input',
          NewlineAfterThrow: 'Illegal newline after throw',
          InvalidRegExp: 'Invalid regular expression',
          UnterminatedRegExp: 'Invalid regular expression: missing /',
          InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
          InvalidLHSInForIn: 'Invalid left-hand side in for-in',
          MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
          NoCatchOrFinally: 'Missing catch or finally after try',
          UnknownLabel: 'Undefined label \'%0\'',
          Redeclaration: '%0 \'%1\' has already been declared',
          IllegalContinue: 'Illegal continue statement',
          IllegalBreak: 'Illegal break statement',
          IllegalReturn: 'Illegal return statement',
          StrictModeWith: 'Strict mode code may not include a with statement',
          StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
          StrictVarName: 'Variable name may not be eval or arguments in strict mode',
          StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
          StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
          StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
          StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
          StrictDelete: 'Delete of an unqualified identifier in strict mode.',
          StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
          AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
          AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
          StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
          StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
          StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
          StrictReservedWord: 'Use of future reserved word in strict mode'
        };

        // See also tools/generate-unicode-regex.py.
        Regex = {
          NonAsciiIdentifierStart: new RegExp("[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]"),
          NonAsciiIdentifierPart: new RegExp("[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]")
        };

        // Ensure the condition is true, otherwise throw an error.
        // This is only to have a better contract semantic, i.e. another safety net
        // to catch a logic error. The condition shall be fulfilled in normal case.
        // Do NOT use this to enforce a certain condition on any user input.

        function assert(condition, message) {
          /* istanbul ignore if */
          if (!condition) {
            throw new Error('ASSERT: ' + message);
          }
        }
        function isDecimalDigit(ch) {
          return ch >= 48 && ch <= 57; // 0..9
        }
        function isHexDigit(ch) {
          return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
        }
        function isOctalDigit(ch) {
          return '01234567'.indexOf(ch) >= 0;
        }

        // 7.2 White Space

        function isWhiteSpace(ch) {
          return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 || ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0;
        }

        // 7.3 Line Terminators

        function isLineTerminator(ch) {
          return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
        }

        // 7.6 Identifier Names and Identifiers

        function isIdentifierStart(ch) {
          return ch == 0x40 || ch === 0x24 || ch === 0x5F ||
          // $ (dollar) and _ (underscore)
          ch >= 0x41 && ch <= 0x5A ||
          // A..Z
          ch >= 0x61 && ch <= 0x7A ||
          // a..z
          ch === 0x5C ||
          // \ (backslash)
          ch >= 0x80 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
        }
        function isIdentifierPart(ch) {
          return ch === 0x24 || ch === 0x5F ||
          // $ (dollar) and _ (underscore)
          ch >= 0x41 && ch <= 0x5A ||
          // A..Z
          ch >= 0x61 && ch <= 0x7A ||
          // a..z
          ch >= 0x30 && ch <= 0x39 ||
          // 0..9
          ch === 0x5C ||
          // \ (backslash)
          ch >= 0x80 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
        }

        // 7.6.1.2 Future Reserved Words

        function isFutureReservedWord(id) {
          switch (id) {
            case 'class':
            case 'enum':
            case 'export':
            case 'extends':
            case 'import':
            case 'super':
              return true;
            default:
              return false;
          }
        }
        function isStrictModeReservedWord(id) {
          switch (id) {
            case 'implements':
            case 'interface':
            case 'package':
            case 'private':
            case 'protected':
            case 'public':
            case 'static':
            case 'yield':
            case 'let':
              return true;
            default:
              return false;
          }
        }
        function isRestrictedWord(id) {
          return id === 'eval' || id === 'arguments';
        }

        // 7.6.1.1 Keywords

        function isKeyword(id) {
          if (strict && isStrictModeReservedWord(id)) {
            return true;
          }

          // 'const' is specialized as Keyword in V8.
          // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
          // Some others are from future reserved words.

          switch (id.length) {
            case 2:
              return id === 'if' || id === 'in' || id === 'do';
            case 3:
              return id === 'var' || id === 'for' || id === 'new' || id === 'try' || id === 'let';
            case 4:
              return id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';
            case 5:
              return id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';
            case 6:
              return id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';
            case 7:
              return id === 'default' || id === 'finally' || id === 'extends';
            case 8:
              return id === 'function' || id === 'continue' || id === 'debugger';
            case 10:
              return id === 'instanceof';
            default:
              return false;
          }
        }

        // 7.4 Comments

        function addComment(type, value, start, end, loc) {
          var comment, attacher;
          assert(typeof start === 'number', 'Comment must have valid position');

          // Because the way the actual token is scanned, often the comments
          // (if any) are skipped twice during the lexical analysis.
          // Thus, we need to skip adding a comment if the comment array already
          // handled it.
          if (state.lastCommentStart >= start) {
            return;
          }
          state.lastCommentStart = start;
          comment = {
            type: type,
            value: value
          };
          if (extra.range) {
            comment.range = [start, end];
          }
          if (extra.loc) {
            comment.loc = loc;
          }
          extra.comments.push(comment);
          if (extra.attachComment) {
            extra.leadingComments.push(comment);
            extra.trailingComments.push(comment);
          }
        }
        function skipSingleLineComment(offset) {
          var start, loc, ch, comment;
          start = index - offset;
          loc = {
            start: {
              line: lineNumber,
              column: index - lineStart - offset
            }
          };
          while (index < length) {
            ch = source.charCodeAt(index);
            ++index;
            if (isLineTerminator(ch)) {
              if (extra.comments) {
                comment = source.slice(start + offset, index - 1);
                loc.end = {
                  line: lineNumber,
                  column: index - lineStart - 1
                };
                addComment('Line', comment, start, index - 1, loc);
              }
              if (ch === 13 && source.charCodeAt(index) === 10) {
                ++index;
              }
              ++lineNumber;
              lineStart = index;
              return;
            }
          }
          if (extra.comments) {
            comment = source.slice(start + offset, index);
            loc.end = {
              line: lineNumber,
              column: index - lineStart
            };
            addComment('Line', comment, start, index, loc);
          }
        }
        function skipMultiLineComment() {
          var start, loc, ch, comment;
          if (extra.comments) {
            start = index - 2;
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart - 2
              }
            };
          }
          while (index < length) {
            ch = source.charCodeAt(index);
            if (isLineTerminator(ch)) {
              if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
                ++index;
              }
              ++lineNumber;
              ++index;
              lineStart = index;
              if (index >= length) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            } else if (ch === 0x2A) {
              // Block comment ends with '*/'.
              if (source.charCodeAt(index + 1) === 0x2F) {
                ++index;
                ++index;
                if (extra.comments) {
                  comment = source.slice(start + 2, index - 2);
                  loc.end = {
                    line: lineNumber,
                    column: index - lineStart
                  };
                  addComment('Block', comment, start, index, loc);
                }
                return;
              }
              ++index;
            } else {
              ++index;
            }
          }
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }
        function skipComment() {
          var ch, start;
          start = index === 0;
          while (index < length) {
            ch = source.charCodeAt(index);
            if (isWhiteSpace(ch)) {
              ++index;
            } else if (isLineTerminator(ch)) {
              ++index;
              if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
                ++index;
              }
              ++lineNumber;
              lineStart = index;
              start = true;
            } else if (ch === 0x2F) {
              // U+002F is '/'
              ch = source.charCodeAt(index + 1);
              if (ch === 0x2F) {
                ++index;
                ++index;
                skipSingleLineComment(2);
                start = true;
              } else if (ch === 0x2A) {
                // U+002A is '*'
                ++index;
                ++index;
                skipMultiLineComment();
              } else {
                break;
              }
            } else if (start && ch === 0x2D) {
              // U+002D is '-'
              // U+003E is '>'
              if (source.charCodeAt(index + 1) === 0x2D && source.charCodeAt(index + 2) === 0x3E) {
                // '-->' is a single-line comment
                index += 3;
                skipSingleLineComment(3);
              } else {
                break;
              }
            } else if (ch === 0x3C) {
              // U+003C is '<'
              if (source.slice(index + 1, index + 4) === '!--') {
                ++index; // `<`
                ++index; // `!`
                ++index; // `-`
                ++index; // `-`
                skipSingleLineComment(4);
              } else {
                break;
              }
            } else {
              break;
            }
          }
        }
        function scanHexEscape(prefix) {
          var i,
            len,
            ch,
            code = 0;
          len = prefix === 'u' ? 4 : 2;
          for (i = 0; i < len; ++i) {
            if (index < length && isHexDigit(source[index])) {
              ch = source[index++];
              code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
              return '';
            }
          }
          return String.fromCharCode(code);
        }
        function getEscapedIdentifier() {
          var ch, id;
          ch = source.charCodeAt(index++);
          id = String.fromCharCode(ch);

          // '\u' (U+005C, U+0075) denotes an escaped character.
          if (ch === 0x5C) {
            if (source.charCodeAt(index) !== 0x75) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            ++index;
            ch = scanHexEscape('u');
            if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            id = ch;
          }
          while (index < length) {
            ch = source.charCodeAt(index);
            if (!isIdentifierPart(ch)) {
              break;
            }
            ++index;
            id += String.fromCharCode(ch);

            // '\u' (U+005C, U+0075) denotes an escaped character.
            if (ch === 0x5C) {
              id = id.substr(0, id.length - 1);
              if (source.charCodeAt(index) !== 0x75) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
              ++index;
              ch = scanHexEscape('u');
              if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
              id += ch;
            }
          }
          return id;
        }
        function getIdentifier() {
          var start, ch;
          start = index++;
          while (index < length) {
            ch = source.charCodeAt(index);
            if (ch === 0x5C) {
              // Blackslash (U+005C) marks Unicode escape sequence.
              index = start;
              return getEscapedIdentifier();
            }
            if (isIdentifierPart(ch)) {
              ++index;
            } else {
              break;
            }
          }
          return source.slice(start, index);
        }
        function scanIdentifier() {
          var start, id, type;
          start = index;

          // Backslash (U+005C) starts an escaped character.
          id = source.charCodeAt(index) === 0x5C ? getEscapedIdentifier() : getIdentifier();

          // There is no keyword or literal with only one character.
          // Thus, it must be an identifier.
          if (id.length === 1) {
            type = Token.Identifier;
          } else if (isKeyword(id)) {
            type = Token.Keyword;
          } else if (id === 'null') {
            type = Token.NullLiteral;
          } else if (id === 'true' || id === 'false') {
            type = Token.BooleanLiteral;
          } else {
            type = Token.Identifier;
          }
          return {
            type: type,
            value: id,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
          };
        }

        // 7.7 Punctuators

        function scanPunctuator() {
          var start = index,
            code = source.charCodeAt(index),
            code2,
            ch1 = source[index],
            ch2,
            ch3,
            ch4;
          switch (code) {
            // Check for most common single-character punctuators.
            case 0x2E: // . dot
            case 0x28: // ( open bracket
            case 0x29: // ) close bracket
            case 0x3B: // ; semicolon
            case 0x2C: // , comma
            case 0x7B: // { open curly brace
            case 0x7D: // } close curly brace
            case 0x5B: // [
            case 0x5D: // ]
            case 0x3A: // :
            case 0x3F: // ?
            case 0x7E:
              // ~
              ++index;
              if (extra.tokenize) {
                if (code === 0x28) {
                  extra.openParenToken = extra.tokens.length;
                } else if (code === 0x7B) {
                  extra.openCurlyToken = extra.tokens.length;
                }
              }
              return {
                type: Token.Punctuator,
                value: String.fromCharCode(code),
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            default:
              code2 = source.charCodeAt(index + 1);

              // '=' (U+003D) marks an assignment or comparison operator.
              if (code2 === 0x3D) {
                switch (code) {
                  case 0x2B: // +
                  case 0x2D: // -
                  case 0x2F: // /
                  case 0x3C: // <
                  case 0x3E: // >
                  case 0x5E: // ^
                  case 0x7C: // |
                  case 0x25: // %
                  case 0x26: // &
                  case 0x2A:
                    // *
                    index += 2;
                    return {
                      type: Token.Punctuator,
                      value: String.fromCharCode(code) + String.fromCharCode(code2),
                      lineNumber: lineNumber,
                      lineStart: lineStart,
                      start: start,
                      end: index
                    };
                  case 0x21: // !
                  case 0x3D:
                    // =
                    index += 2;

                    // !== and ===
                    if (source.charCodeAt(index) === 0x3D) {
                      ++index;
                    }
                    return {
                      type: Token.Punctuator,
                      value: source.slice(start, index),
                      lineNumber: lineNumber,
                      lineStart: lineStart,
                      start: start,
                      end: index
                    };
                }
              }
          }

          // 4-character punctuator: >>>=

          ch4 = source.substr(index, 4);
          if (ch4 === '>>>=') {
            index += 4;
            return {
              type: Token.Punctuator,
              value: ch4,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }

          // 3-character punctuators: === !== >>> <<= >>=

          ch3 = ch4.substr(0, 3);
          if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
            index += 3;
            return {
              type: Token.Punctuator,
              value: ch3,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }

          // Other 2-character punctuators: ++ -- << >> && ||
          ch2 = ch3.substr(0, 2);
          if (ch1 === ch2[1] && '+-<>&|'.indexOf(ch1) >= 0 || ch2 === '=>') {
            index += 2;
            return {
              type: Token.Punctuator,
              value: ch2,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }

          // 1-character punctuators: < > = ! + - * % & | ^ /
          if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
            ++index;
            return {
              type: Token.Punctuator,
              value: ch1,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        // 7.8.3 Numeric Literals

        function scanHexLiteral(start) {
          var number = '';
          while (index < length) {
            if (!isHexDigit(source[index])) {
              break;
            }
            number += source[index++];
          }
          if (number.length === 0) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          return {
            type: Token.NumericLiteral,
            value: parseInt('0x' + number, 16),
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
          };
        }
        function scanOctalLiteral(start) {
          var number = '0' + source[index++];
          while (index < length) {
            if (!isOctalDigit(source[index])) {
              break;
            }
            number += source[index++];
          }
          if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          return {
            type: Token.NumericLiteral,
            value: parseInt(number, 8),
            octal: true,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
          };
        }
        function scanNumericLiteral() {
          var number, start, ch;
          ch = source[index];
          assert(isDecimalDigit(ch.charCodeAt(0)) || ch === '.', 'Numeric literal must start with a decimal digit or a decimal point');
          start = index;
          number = '';
          if (ch !== '.') {
            number = source[index++];
            ch = source[index];

            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            if (number === '0') {
              if (ch === 'x' || ch === 'X') {
                ++index;
                return scanHexLiteral(start);
              }
              if (isOctalDigit(ch)) {
                return scanOctalLiteral(start);
              }

              // decimal number starts with '0' such as '09' is illegal.
              if (ch && isDecimalDigit(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            }
            while (isDecimalDigit(source.charCodeAt(index))) {
              number += source[index++];
            }
            ch = source[index];
          }
          if (ch === '.') {
            number += source[index++];
            while (isDecimalDigit(source.charCodeAt(index))) {
              number += source[index++];
            }
            ch = source[index];
          }
          if (ch === 'e' || ch === 'E') {
            number += source[index++];
            ch = source[index];
            if (ch === '+' || ch === '-') {
              number += source[index++];
            }
            if (isDecimalDigit(source.charCodeAt(index))) {
              while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
              }
            } else {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          }
          if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          return {
            type: Token.NumericLiteral,
            value: parseFloat(number),
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
          };
        }

        // 7.8.4 String Literals

        function scanStringLiteral() {
          var str = '',
            quote,
            start,
            ch,
            code,
            unescaped,
            restore,
            octal = false,
            startLineNumber,
            startLineStart;
          startLineNumber = lineNumber;
          startLineStart = lineStart;
          quote = source[index];
          assert(quote === '\'' || quote === '"', 'String literal must starts with a quote');
          start = index;
          ++index;
          while (index < length) {
            ch = source[index++];
            if (ch === quote) {
              quote = '';
              break;
            } else if (ch === '\\') {
              ch = source[index++];
              if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
                switch (ch) {
                  case 'u':
                  case 'x':
                    restore = index;
                    unescaped = scanHexEscape(ch);
                    if (unescaped) {
                      str += unescaped;
                    } else {
                      index = restore;
                      str += ch;
                    }
                    break;
                  case 'n':
                    str += '\n';
                    break;
                  case 'r':
                    str += '\r';
                    break;
                  case 't':
                    str += '\t';
                    break;
                  case 'b':
                    str += '\b';
                    break;
                  case 'f':
                    str += '\f';
                    break;
                  case 'v':
                    str += '\x0B';
                    break;
                  default:
                    if (isOctalDigit(ch)) {
                      code = '01234567'.indexOf(ch);

                      // \0 is not octal escape sequence
                      if (code !== 0) {
                        octal = true;
                      }
                      if (index < length && isOctalDigit(source[index])) {
                        octal = true;
                        code = code * 8 + '01234567'.indexOf(source[index++]);

                        // 3 digits are only allowed when string starts
                        // with 0, 1, 2, 3
                        if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
                          code = code * 8 + '01234567'.indexOf(source[index++]);
                        }
                      }
                      str += String.fromCharCode(code);
                    } else {
                      str += ch;
                    }
                    break;
                }
              } else {
                ++lineNumber;
                if (ch === '\r' && source[index] === '\n') {
                  ++index;
                }
                lineStart = index;
              }
            } else if (isLineTerminator(ch.charCodeAt(0))) {
              break;
            } else {
              str += ch;
            }
          }
          if (quote !== '') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          return {
            type: Token.StringLiteral,
            value: str,
            octal: octal,
            startLineNumber: startLineNumber,
            startLineStart: startLineStart,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
          };
        }
        function testRegExp(pattern, flags) {
          var value;
          try {
            value = new RegExp(pattern, flags);
          } catch (e) {
            throwError({}, Messages.InvalidRegExp);
          }
          return value;
        }
        function scanRegExpBody() {
          var ch, str, classMarker, terminated, body;
          ch = source[index];
          assert(ch === '/', 'Regular expression literal must start with a slash');
          str = source[index++];
          classMarker = false;
          terminated = false;
          while (index < length) {
            ch = source[index++];
            str += ch;
            if (ch === '\\') {
              ch = source[index++];
              // ECMA-262 7.8.5
              if (isLineTerminator(ch.charCodeAt(0))) {
                throwError({}, Messages.UnterminatedRegExp);
              }
              str += ch;
            } else if (isLineTerminator(ch.charCodeAt(0))) {
              throwError({}, Messages.UnterminatedRegExp);
            } else if (classMarker) {
              if (ch === ']') {
                classMarker = false;
              }
            } else {
              if (ch === '/') {
                terminated = true;
                break;
              } else if (ch === '[') {
                classMarker = true;
              }
            }
          }
          if (!terminated) {
            throwError({}, Messages.UnterminatedRegExp);
          }

          // Exclude leading and trailing slash.
          body = str.substr(1, str.length - 2);
          return {
            value: body,
            literal: str
          };
        }
        function scanRegExpFlags() {
          var ch, str, flags, restore;
          str = '';
          flags = '';
          while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch.charCodeAt(0))) {
              break;
            }
            ++index;
            if (ch === '\\' && index < length) {
              ch = source[index];
              if (ch === 'u') {
                ++index;
                restore = index;
                ch = scanHexEscape('u');
                if (ch) {
                  flags += ch;
                  for (str += "\\u"; restore < index; ++restore) {
                    str += source[restore];
                  }
                } else {
                  index = restore;
                  flags += 'u';
                  str += "\\u";
                }
                throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
              } else {
                str += '\\';
                throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            } else {
              flags += ch;
              str += ch;
            }
          }
          return {
            value: flags,
            literal: str
          };
        }
        function scanRegExp() {
          var start, body, flags, pattern, value;
          lookahead = null;
          skipComment();
          start = index;
          body = scanRegExpBody();
          flags = scanRegExpFlags();
          value = testRegExp(body.value, flags.value);
          if (extra.tokenize) {
            return {
              type: Token.RegularExpression,
              value: value,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }
          return {
            literal: body.literal + flags.literal,
            value: value,
            start: start,
            end: index
          };
        }
        function collectRegex() {
          var pos, loc, regex, token;
          skipComment();
          pos = index;
          loc = {
            start: {
              line: lineNumber,
              column: index - lineStart
            }
          };
          regex = scanRegExp();
          loc.end = {
            line: lineNumber,
            column: index - lineStart
          };

          /* istanbul ignore next */
          if (!extra.tokenize) {
            // Pop the previous token, which is likely '/' or '/='
            if (extra.tokens.length > 0) {
              token = extra.tokens[extra.tokens.length - 1];
              if (token.range[0] === pos && token.type === 'Punctuator') {
                if (token.value === '/' || token.value === '/=') {
                  extra.tokens.pop();
                }
              }
            }
            extra.tokens.push({
              type: 'RegularExpression',
              value: regex.literal,
              range: [pos, index],
              loc: loc
            });
          }
          return regex;
        }
        function isIdentifierName(token) {
          return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
        }
        function advanceSlash() {
          var prevToken, checkToken;
          // Using the following algorithm:
          // https://github.com/mozilla/sweet.js/wiki/design
          prevToken = extra.tokens[extra.tokens.length - 1];
          if (!prevToken) {
            // Nothing before that: it cannot be a division.
            return collectRegex();
          }
          if (prevToken.type === 'Punctuator') {
            if (prevToken.value === ']') {
              return scanPunctuator();
            }
            if (prevToken.value === ')') {
              checkToken = extra.tokens[extra.openParenToken - 1];
              if (checkToken && checkToken.type === 'Keyword' && (checkToken.value === 'if' || checkToken.value === 'while' || checkToken.value === 'for' || checkToken.value === 'with')) {
                return collectRegex();
              }
              return scanPunctuator();
            }
            if (prevToken.value === '}') {
              // Dividing a function by anything makes little sense,
              // but we have to check for that.
              if (extra.tokens[extra.openCurlyToken - 3] && extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
                // Anonymous function.
                checkToken = extra.tokens[extra.openCurlyToken - 4];
                if (!checkToken) {
                  return scanPunctuator();
                }
              } else if (extra.tokens[extra.openCurlyToken - 4] && extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
                // Named function.
                checkToken = extra.tokens[extra.openCurlyToken - 5];
                if (!checkToken) {
                  return collectRegex();
                }
              } else {
                return scanPunctuator();
              }
              // checkToken determines whether the function is
              // a declaration or an expression.
              if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                // It is an expression.
                return scanPunctuator();
              }
              // It is a declaration.
              return collectRegex();
            }
            return collectRegex();
          }
          if (prevToken.type === 'Keyword') {
            return collectRegex();
          }
          return scanPunctuator();
        }
        function advance() {
          var ch;
          skipComment();
          if (index >= length) {
            return {
              type: Token.EOF,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: index,
              end: index
            };
          }
          ch = source.charCodeAt(index);
          if (isIdentifierStart(ch)) {
            return scanIdentifier();
          }

          // Very common: ( and ) and ;
          if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
            return scanPunctuator();
          }

          // String literal starts with single quote (U+0027) or double quote (U+0022).
          if (ch === 0x27 || ch === 0x22) {
            return scanStringLiteral();
          }

          // Dot (.) U+002E can also start a floating-point number, hence the need
          // to check the next character.
          if (ch === 0x2E) {
            if (isDecimalDigit(source.charCodeAt(index + 1))) {
              return scanNumericLiteral();
            }
            return scanPunctuator();
          }
          if (isDecimalDigit(ch)) {
            return scanNumericLiteral();
          }

          // Slash (/) U+002F can also start a regex.
          if (extra.tokenize && ch === 0x2F) {
            return advanceSlash();
          }
          return scanPunctuator();
        }
        function collectToken() {
          var loc, token, range, value;
          skipComment();
          loc = {
            start: {
              line: lineNumber,
              column: index - lineStart
            }
          };
          token = advance();
          loc.end = {
            line: lineNumber,
            column: index - lineStart
          };
          if (token.type !== Token.EOF) {
            value = source.slice(token.start, token.end);
            extra.tokens.push({
              type: TokenName[token.type],
              value: value,
              range: [token.start, token.end],
              loc: loc
            });
          }
          return token;
        }
        function lex() {
          var token;
          token = lookahead;
          index = token.end;
          lineNumber = token.lineNumber;
          lineStart = token.lineStart;
          lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
          index = token.end;
          lineNumber = token.lineNumber;
          lineStart = token.lineStart;
          return token;
        }
        function peek() {
          var pos, line, start;
          pos = index;
          line = lineNumber;
          start = lineStart;
          lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
          index = pos;
          lineNumber = line;
          lineStart = start;
        }
        function Position(line, column) {
          this.line = line;
          this.column = column;
        }
        function SourceLocation(startLine, startColumn, line, column) {
          this.start = new Position(startLine, startColumn);
          this.end = new Position(line, column);
        }
        SyntaxTreeDelegate = {
          name: 'SyntaxTree',
          processComment: function processComment(node) {
            var lastChild, trailingComments;
            if (node.type === Syntax.Program) {
              if (node.body.length > 0) {
                return;
              }
            }
            if (extra.trailingComments.length > 0) {
              if (extra.trailingComments[0].range[0] >= node.range[1]) {
                trailingComments = extra.trailingComments;
                extra.trailingComments = [];
              } else {
                extra.trailingComments.length = 0;
              }
            } else {
              if (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
                trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
              }
            }

            // Eating the stack.
            while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
              lastChild = extra.bottomRightStack.pop();
            }
            if (lastChild) {
              if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
                node.leadingComments = lastChild.leadingComments;
                delete lastChild.leadingComments;
              }
            } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
              node.leadingComments = extra.leadingComments;
              extra.leadingComments = [];
            }
            if (trailingComments) {
              node.trailingComments = trailingComments;
            }
            extra.bottomRightStack.push(node);
          },
          markEnd: function markEnd(node, startToken) {
            if (extra.range) {
              node.range = [startToken.start, index];
            }
            if (extra.loc) {
              node.loc = new SourceLocation(startToken.startLineNumber === undefined ? startToken.lineNumber : startToken.startLineNumber, startToken.start - (startToken.startLineStart === undefined ? startToken.lineStart : startToken.startLineStart), lineNumber, index - lineStart);
              this.postProcess(node);
            }
            if (extra.attachComment) {
              this.processComment(node);
            }
            return node;
          },
          postProcess: function postProcess(node) {
            if (extra.source) {
              node.loc.source = extra.source;
            }
            return node;
          },
          createArrayExpression: function createArrayExpression(elements) {
            return {
              type: Syntax.ArrayExpression,
              elements: elements
            };
          },
          createAssignmentExpression: function createAssignmentExpression(operator, left, right) {
            return {
              type: Syntax.AssignmentExpression,
              operator: operator,
              left: left,
              right: right
            };
          },
          createBinaryExpression: function createBinaryExpression(operator, left, right) {
            var type = operator === '||' || operator === '&&' ? Syntax.LogicalExpression : Syntax.BinaryExpression;
            return {
              type: type,
              operator: operator,
              left: left,
              right: right
            };
          },
          createBlockStatement: function createBlockStatement(body) {
            return {
              type: Syntax.BlockStatement,
              body: body
            };
          },
          createBreakStatement: function createBreakStatement(label) {
            return {
              type: Syntax.BreakStatement,
              label: label
            };
          },
          createCallExpression: function createCallExpression(callee, args) {
            return {
              type: Syntax.CallExpression,
              callee: callee,
              'arguments': args
            };
          },
          createCatchClause: function createCatchClause(param, body) {
            return {
              type: Syntax.CatchClause,
              param: param,
              body: body
            };
          },
          createConditionalExpression: function createConditionalExpression(test, consequent, alternate) {
            return {
              type: Syntax.ConditionalExpression,
              test: test,
              consequent: consequent,
              alternate: alternate
            };
          },
          createContinueStatement: function createContinueStatement(label) {
            return {
              type: Syntax.ContinueStatement,
              label: label
            };
          },
          createDebuggerStatement: function createDebuggerStatement() {
            return {
              type: Syntax.DebuggerStatement
            };
          },
          createDoWhileStatement: function createDoWhileStatement(body, test) {
            return {
              type: Syntax.DoWhileStatement,
              body: body,
              test: test
            };
          },
          createEmptyStatement: function createEmptyStatement() {
            return {
              type: Syntax.EmptyStatement
            };
          },
          createExpressionStatement: function createExpressionStatement(expression) {
            return {
              type: Syntax.ExpressionStatement,
              expression: expression
            };
          },
          createForStatement: function createForStatement(init, test, update, body) {
            return {
              type: Syntax.ForStatement,
              init: init,
              test: test,
              update: update,
              body: body
            };
          },
          createForInStatement: function createForInStatement(left, right, body) {
            return {
              type: Syntax.ForInStatement,
              left: left,
              right: right,
              body: body,
              each: false
            };
          },
          createFunctionDeclaration: function createFunctionDeclaration(id, params, defaults, body) {
            return {
              type: Syntax.FunctionDeclaration,
              id: id,
              params: params,
              defaults: defaults,
              body: body,
              rest: null,
              generator: false,
              expression: false
            };
          },
          createFunctionExpression: function createFunctionExpression(id, params, defaults, body) {
            return {
              type: Syntax.FunctionExpression,
              id: id,
              params: params,
              defaults: defaults,
              body: body,
              rest: null,
              generator: false,
              expression: false
            };
          },
          createIdentifier: function createIdentifier(name) {
            return {
              type: Syntax.Identifier,
              name: name
            };
          },
          createIfStatement: function createIfStatement(test, consequent, alternate) {
            return {
              type: Syntax.IfStatement,
              test: test,
              consequent: consequent,
              alternate: alternate
            };
          },
          createLabeledStatement: function createLabeledStatement(label, body) {
            return {
              type: Syntax.LabeledStatement,
              label: label,
              body: body
            };
          },
          createLiteral: function createLiteral(token) {
            return {
              type: Syntax.Literal,
              value: token.value,
              raw: source.slice(token.start, token.end)
            };
          },
          createMemberExpression: function createMemberExpression(accessor, object, property) {
            return {
              type: Syntax.MemberExpression,
              computed: accessor === '[',
              object: object,
              property: property
            };
          },
          createNewExpression: function createNewExpression(callee, args) {
            return {
              type: Syntax.NewExpression,
              callee: callee,
              'arguments': args
            };
          },
          createObjectExpression: function createObjectExpression(properties) {
            return {
              type: Syntax.ObjectExpression,
              properties: properties
            };
          },
          createPostfixExpression: function createPostfixExpression(operator, argument) {
            return {
              type: Syntax.UpdateExpression,
              operator: operator,
              argument: argument,
              prefix: false
            };
          },
          createProgram: function createProgram(body) {
            return {
              type: Syntax.Program,
              body: body
            };
          },
          createProperty: function createProperty(kind, key, value) {
            return {
              type: Syntax.Property,
              key: key,
              value: value,
              kind: kind
            };
          },
          createReturnStatement: function createReturnStatement(argument) {
            return {
              type: Syntax.ReturnStatement,
              argument: argument
            };
          },
          createSequenceExpression: function createSequenceExpression(expressions) {
            return {
              type: Syntax.SequenceExpression,
              expressions: expressions
            };
          },
          createSwitchCase: function createSwitchCase(test, consequent) {
            return {
              type: Syntax.SwitchCase,
              test: test,
              consequent: consequent
            };
          },
          createSwitchStatement: function createSwitchStatement(discriminant, cases) {
            return {
              type: Syntax.SwitchStatement,
              discriminant: discriminant,
              cases: cases
            };
          },
          createThisExpression: function createThisExpression() {
            return {
              type: Syntax.ThisExpression
            };
          },
          createThrowStatement: function createThrowStatement(argument) {
            return {
              type: Syntax.ThrowStatement,
              argument: argument
            };
          },
          createTryStatement: function createTryStatement(block, guardedHandlers, handlers, finalizer) {
            return {
              type: Syntax.TryStatement,
              block: block,
              guardedHandlers: guardedHandlers,
              handlers: handlers,
              finalizer: finalizer
            };
          },
          createUnaryExpression: function createUnaryExpression(operator, argument) {
            if (operator === '++' || operator === '--') {
              return {
                type: Syntax.UpdateExpression,
                operator: operator,
                argument: argument,
                prefix: true
              };
            }
            return {
              type: Syntax.UnaryExpression,
              operator: operator,
              argument: argument,
              prefix: true
            };
          },
          createVariableDeclaration: function createVariableDeclaration(declarations, kind) {
            return {
              type: Syntax.VariableDeclaration,
              declarations: declarations,
              kind: kind
            };
          },
          createVariableDeclarator: function createVariableDeclarator(id, init) {
            return {
              type: Syntax.VariableDeclarator,
              id: id,
              init: init
            };
          },
          createWhileStatement: function createWhileStatement(test, body) {
            return {
              type: Syntax.WhileStatement,
              test: test,
              body: body
            };
          },
          createWithStatement: function createWithStatement(object, body) {
            return {
              type: Syntax.WithStatement,
              object: object,
              body: body
            };
          }
        };

        // Return true if there is a line terminator before the next token.

        function peekLineTerminator() {
          var pos, line, start, found;
          pos = index;
          line = lineNumber;
          start = lineStart;
          skipComment();
          found = lineNumber !== line;
          index = pos;
          lineNumber = line;
          lineStart = start;
          return found;
        }

        // Throw an exception

        function throwError(token, messageFormat) {
          var error,
            args = Array.prototype.slice.call(arguments, 2),
            msg = messageFormat.replace(/%(\d)/g, function (whole, index) {
              assert(index < args.length, 'Message reference must be in range');
              return args[index];
            });
          if (typeof token.lineNumber === 'number') {
            error = new Error('Line ' + token.lineNumber + ': ' + msg);
            error.index = token.start;
            error.lineNumber = token.lineNumber;
            error.column = token.start - lineStart + 1;
          } else {
            error = new Error('Line ' + lineNumber + ': ' + msg);
            error.index = index;
            error.lineNumber = lineNumber;
            error.column = index - lineStart + 1;
          }
          error.description = msg;
          throw error;
        }
        function throwErrorTolerant() {
          try {
            throwError.apply(null, arguments);
          } catch (e) {
            if (extra.errors) {
              extra.errors.push(e);
            } else {
              throw e;
            }
          }
        }

        // Throw an exception because of the token.

        function throwUnexpected(token) {
          if (token.type === Token.EOF) {
            throwError(token, Messages.UnexpectedEOS);
          }
          if (token.type === Token.NumericLiteral) {
            throwError(token, Messages.UnexpectedNumber);
          }
          if (token.type === Token.StringLiteral) {
            throwError(token, Messages.UnexpectedString);
          }
          if (token.type === Token.Identifier) {
            throwError(token, Messages.UnexpectedIdentifier);
          }
          if (token.type === Token.Keyword) {
            if (isFutureReservedWord(token.value)) {
              throwError(token, Messages.UnexpectedReserved);
            } else if (strict && isStrictModeReservedWord(token.value)) {
              throwErrorTolerant(token, Messages.StrictReservedWord);
              return;
            }
            throwError(token, Messages.UnexpectedToken, token.value);
          }

          // BooleanLiteral, NullLiteral, or Punctuator.
          throwError(token, Messages.UnexpectedToken, token.value);
        }

        // Expect the next token to match the specified punctuator.
        // If not, an exception will be thrown.

        function expect(value) {
          var token = lex();
          if (token.type !== Token.Punctuator || token.value !== value) {
            throwUnexpected(token);
          }
        }

        // Expect the next token to match the specified keyword.
        // If not, an exception will be thrown.

        function expectKeyword(keyword) {
          var token = lex();
          if (token.type !== Token.Keyword || token.value !== keyword) {
            throwUnexpected(token);
          }
        }

        // Return true if the next token matches the specified punctuator.

        function match(value) {
          return lookahead.type === Token.Punctuator && lookahead.value === value;
        }

        // Return true if the next token matches the specified keyword

        function matchKeyword(keyword) {
          return lookahead.type === Token.Keyword && lookahead.value === keyword;
        }

        // Return true if the next token is an assignment operator

        function matchAssign() {
          var op;
          if (lookahead.type !== Token.Punctuator) {
            return false;
          }
          op = lookahead.value;
          return op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
        }
        function consumeSemicolon() {
          var line;

          // Catch the very common case first: immediately a semicolon (U+003B).
          if (source.charCodeAt(index) === 0x3B || match(';')) {
            lex();
            return;
          }
          line = lineNumber;
          skipComment();
          if (lineNumber !== line) {
            return;
          }
          if (lookahead.type !== Token.EOF && !match('}')) {
            throwUnexpected(lookahead);
          }
        }

        // Return true if provided expression is LeftHandSideExpression

        function isLeftHandSide(expr) {
          return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
        }

        // 11.1.4 Array Initialiser

        function parseArrayInitialiser() {
          var elements = [],
            startToken;
          startToken = lookahead;
          expect('[');
          while (!match(']')) {
            if (match(',')) {
              lex();
              elements.push(null);
            } else {
              elements.push(parseAssignmentExpression());
              if (!match(']')) {
                expect(',');
              }
            }
          }
          lex();
          return delegate.markEnd(delegate.createArrayExpression(elements), startToken);
        }

        // 11.1.5 Object Initialiser

        function parsePropertyFunction(param, first) {
          var previousStrict, body, startToken;
          previousStrict = strict;
          startToken = lookahead;
          body = parseFunctionSourceElements();
          if (first && strict && isRestrictedWord(param[0].name)) {
            throwErrorTolerant(first, Messages.StrictParamName);
          }
          strict = previousStrict;
          return delegate.markEnd(delegate.createFunctionExpression(null, param, [], body), startToken);
        }
        function parseObjectPropertyKey() {
          var token, startToken;
          startToken = lookahead;
          token = lex();

          // Note: This function is called only from parseObjectProperty(), where
          // EOF and Punctuator tokens are already filtered out.

          if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
            if (strict && token.octal) {
              throwErrorTolerant(token, Messages.StrictOctalLiteral);
            }
            return delegate.markEnd(delegate.createLiteral(token), startToken);
          }
          return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
        }
        function parseObjectProperty() {
          var token, key, id, value, param, startToken;
          token = lookahead;
          startToken = lookahead;
          if (token.type === Token.Identifier) {
            id = parseObjectPropertyKey();

            // Property Assignment: Getter and Setter.

            if (token.value === 'get' && !match(':')) {
              key = parseObjectPropertyKey();
              expect('(');
              expect(')');
              value = parsePropertyFunction([]);
              return delegate.markEnd(delegate.createProperty('get', key, value), startToken);
            }
            if (token.value === 'set' && !match(':')) {
              key = parseObjectPropertyKey();
              expect('(');
              token = lookahead;
              if (token.type !== Token.Identifier) {
                expect(')');
                throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
                value = parsePropertyFunction([]);
              } else {
                param = [parseVariableIdentifier()];
                expect(')');
                value = parsePropertyFunction(param, token);
              }
              return delegate.markEnd(delegate.createProperty('set', key, value), startToken);
            }
            expect(':');
            value = parseAssignmentExpression();
            return delegate.markEnd(delegate.createProperty('init', id, value), startToken);
          }
          if (token.type === Token.EOF || token.type === Token.Punctuator) {
            throwUnexpected(token);
          } else {
            key = parseObjectPropertyKey();
            expect(':');
            value = parseAssignmentExpression();
            return delegate.markEnd(delegate.createProperty('init', key, value), startToken);
          }
        }
        function parseObjectInitialiser() {
          var properties = [],
            property,
            name,
            key,
            kind,
            map = {},
            toString = String,
            startToken;
          startToken = lookahead;
          expect('{');
          while (!match('}')) {
            property = parseObjectProperty();
            if (property.key.type === Syntax.Identifier) {
              name = property.key.name;
            } else {
              name = toString(property.key.value);
            }
            kind = property.kind === 'init' ? PropertyKind.Data : property.kind === 'get' ? PropertyKind.Get : PropertyKind.Set;
            key = '$' + name;
            if (Object.prototype.hasOwnProperty.call(map, key)) {
              if (map[key] === PropertyKind.Data) {
                if (strict && kind === PropertyKind.Data) {
                  throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                } else if (kind !== PropertyKind.Data) {
                  throwErrorTolerant({}, Messages.AccessorDataProperty);
                }
              } else {
                if (kind === PropertyKind.Data) {
                  throwErrorTolerant({}, Messages.AccessorDataProperty);
                } else if (map[key] & kind) {
                  throwErrorTolerant({}, Messages.AccessorGetSet);
                }
              }
              map[key] |= kind;
            } else {
              map[key] = kind;
            }
            properties.push(property);
            if (!match('}')) {
              expect(',');
            }
          }
          expect('}');
          return delegate.markEnd(delegate.createObjectExpression(properties), startToken);
        }

        // 11.1.6 The Grouping Operator

        function parseGroupExpression() {
          var expr;
          expect('(');
          expr = parseExpression();
          expect(')');
          return expr;
        }

        // 11.1 Primary Expressions

        function parsePrimaryExpression() {
          var type, token, expr, startToken;
          if (match('(')) {
            return parseGroupExpression();
          }
          if (match('[')) {
            return parseArrayInitialiser();
          }
          if (match('{')) {
            return parseObjectInitialiser();
          }
          type = lookahead.type;
          startToken = lookahead;
          if (type === Token.Identifier) {
            expr = delegate.createIdentifier(lex().value);
          } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
            if (strict && lookahead.octal) {
              throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
            }
            expr = delegate.createLiteral(lex());
          } else if (type === Token.Keyword) {
            if (matchKeyword('function')) {
              return parseFunctionExpression();
            }
            if (matchKeyword('this')) {
              lex();
              expr = delegate.createThisExpression();
            } else {
              throwUnexpected(lex());
            }
          } else if (type === Token.BooleanLiteral) {
            token = lex();
            token.value = token.value === 'true';
            expr = delegate.createLiteral(token);
          } else if (type === Token.NullLiteral) {
            token = lex();
            token.value = null;
            expr = delegate.createLiteral(token);
          } else if (match('/') || match('/=')) {
            if (typeof extra.tokens !== 'undefined') {
              expr = delegate.createLiteral(collectRegex());
            } else {
              expr = delegate.createLiteral(scanRegExp());
            }
            peek();
          } else {
            throwUnexpected(lex());
          }
          return delegate.markEnd(expr, startToken);
        }

        // 11.2 Left-Hand-Side Expressions

        function parseArguments() {
          var args = [];
          expect('(');
          if (!match(')')) {
            while (index < length) {
              args.push(parseAssignmentExpression());
              if (match(')')) {
                break;
              }
              expect(',');
            }
          }
          expect(')');
          return args;
        }
        function parseNonComputedProperty() {
          var token, startToken;
          startToken = lookahead;
          token = lex();
          if (!isIdentifierName(token)) {
            throwUnexpected(token);
          }
          return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
        }
        function parseNonComputedMember() {
          expect('.');
          return parseNonComputedProperty();
        }
        function parseComputedMember() {
          var expr;
          expect('[');
          expr = parseExpression();
          expect(']');
          return expr;
        }
        function parseNewExpression() {
          var callee, args, startToken;
          startToken = lookahead;
          expectKeyword('new');
          callee = parseLeftHandSideExpression();
          args = match('(') ? parseArguments() : [];
          return delegate.markEnd(delegate.createNewExpression(callee, args), startToken);
        }
        function parseLeftHandSideExpressionAllowCall() {
          var previousAllowIn, expr, args, property, startToken;
          startToken = lookahead;
          previousAllowIn = state.allowIn;
          state.allowIn = true;
          expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
          state.allowIn = previousAllowIn;
          for (;;) {
            if (match('.')) {
              property = parseNonComputedMember();
              expr = delegate.createMemberExpression('.', expr, property);
            } else if (match('(')) {
              args = parseArguments();
              expr = delegate.createCallExpression(expr, args);
            } else if (match('[')) {
              property = parseComputedMember();
              expr = delegate.createMemberExpression('[', expr, property);
            } else {
              break;
            }
            delegate.markEnd(expr, startToken);
          }
          return expr;
        }
        function parseLeftHandSideExpression() {
          var previousAllowIn, expr, property, startToken;
          startToken = lookahead;
          previousAllowIn = state.allowIn;
          expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
          state.allowIn = previousAllowIn;
          while (match('.') || match('[')) {
            if (match('[')) {
              property = parseComputedMember();
              expr = delegate.createMemberExpression('[', expr, property);
            } else {
              property = parseNonComputedMember();
              expr = delegate.createMemberExpression('.', expr, property);
            }
            delegate.markEnd(expr, startToken);
          }
          return expr;
        }

        // 11.3 Postfix Expressions

        function parsePostfixExpression() {
          var expr,
            token,
            startToken = lookahead;
          expr = parseLeftHandSideExpressionAllowCall();
          if (lookahead.type === Token.Punctuator) {
            if ((match('++') || match('--')) && !peekLineTerminator()) {
              // 11.3.1, 11.3.2
              if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPostfix);
              }
              if (!isLeftHandSide(expr)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
              }
              token = lex();
              expr = delegate.markEnd(delegate.createPostfixExpression(token.value, expr), startToken);
            }
          }
          return expr;
        }

        // 11.4 Unary Operators

        function parseUnaryExpression() {
          var token, expr, startToken;
          if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
            expr = parsePostfixExpression();
          } else if (match('++') || match('--')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            // 11.4.4, 11.4.5
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
              throwErrorTolerant({}, Messages.StrictLHSPrefix);
            }
            if (!isLeftHandSide(expr)) {
              throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
          } else if (match('+') || match('-') || match('~') || match('!')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
          } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
              throwErrorTolerant({}, Messages.StrictDelete);
            }
          } else {
            expr = parsePostfixExpression();
          }
          return expr;
        }
        function binaryPrecedence(token, allowIn) {
          var prec = 0;
          if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
            return 0;
          }
          switch (token.value) {
            case '||':
              prec = 1;
              break;
            case '&&':
              prec = 2;
              break;
            case '|':
              prec = 3;
              break;
            case '^':
              prec = 4;
              break;
            case '&':
              prec = 5;
              break;
            case '==':
            case '!=':
            case '===':
            case '!==':
              prec = 6;
              break;
            case '<':
            case '>':
            case '<=':
            case '>=':
            case 'instanceof':
              prec = 7;
              break;
            case 'in':
              prec = allowIn ? 7 : 0;
              break;
            case '<<':
            case '>>':
            case '>>>':
              prec = 8;
              break;
            case '+':
            case '-':
              prec = 9;
              break;
            case '*':
            case '/':
            case '%':
              prec = 11;
              break;
            default:
              break;
          }
          return prec;
        }

        // 11.5 Multiplicative Operators
        // 11.6 Additive Operators
        // 11.7 Bitwise Shift Operators
        // 11.8 Relational Operators
        // 11.9 Equality Operators
        // 11.10 Binary Bitwise Operators
        // 11.11 Binary Logical Operators

        function parseBinaryExpression() {
          var marker, markers, expr, token, prec, stack, right, operator, left, i;
          marker = lookahead;
          left = parseUnaryExpression();
          token = lookahead;
          prec = binaryPrecedence(token, state.allowIn);
          if (prec === 0) {
            return left;
          }
          token.prec = prec;
          lex();
          markers = [marker, lookahead];
          right = parseUnaryExpression();
          stack = [left, token, right];
          while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {
            // Reduce: make a binary expression from the three topmost entries.
            while (stack.length > 2 && prec <= stack[stack.length - 2].prec) {
              right = stack.pop();
              operator = stack.pop().value;
              left = stack.pop();
              expr = delegate.createBinaryExpression(operator, left, right);
              markers.pop();
              marker = markers[markers.length - 1];
              delegate.markEnd(expr, marker);
              stack.push(expr);
            }

            // Shift.
            token = lex();
            token.prec = prec;
            stack.push(token);
            markers.push(lookahead);
            expr = parseUnaryExpression();
            stack.push(expr);
          }

          // Final reduce to clean-up the stack.
          i = stack.length - 1;
          expr = stack[i];
          markers.pop();
          while (i > 1) {
            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
            i -= 2;
            marker = markers.pop();
            delegate.markEnd(expr, marker);
          }
          return expr;
        }

        // 11.12 Conditional Operator

        function parseConditionalExpression() {
          var expr, previousAllowIn, consequent, alternate, startToken;
          startToken = lookahead;
          expr = parseBinaryExpression();
          if (match('?')) {
            lex();
            previousAllowIn = state.allowIn;
            state.allowIn = true;
            consequent = parseAssignmentExpression();
            state.allowIn = previousAllowIn;
            expect(':');
            alternate = parseAssignmentExpression();
            expr = delegate.createConditionalExpression(expr, consequent, alternate);
            delegate.markEnd(expr, startToken);
          }
          return expr;
        }

        // 11.13 Assignment Operators

        function parseAssignmentExpression() {
          var token, left, right, node, startToken;
          token = lookahead;
          startToken = lookahead;
          node = left = parseConditionalExpression();
          if (matchAssign()) {
            // LeftHandSideExpression
            if (!isLeftHandSide(left)) {
              throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }

            // 11.13.1
            if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
              throwErrorTolerant(token, Messages.StrictLHSAssignment);
            }
            token = lex();
            right = parseAssignmentExpression();
            node = delegate.markEnd(delegate.createAssignmentExpression(token.value, left, right), startToken);
          }
          return node;
        }

        // 11.14 Comma Operator

        function parseExpression() {
          var expr,
            startToken = lookahead;
          expr = parseAssignmentExpression();
          if (match(',')) {
            expr = delegate.createSequenceExpression([expr]);
            while (index < length) {
              if (!match(',')) {
                break;
              }
              lex();
              expr.expressions.push(parseAssignmentExpression());
            }
            delegate.markEnd(expr, startToken);
          }
          return expr;
        }

        // 12.1 Block

        function parseStatementList() {
          var list = [],
            statement;
          while (index < length) {
            if (match('}')) {
              break;
            }
            statement = parseSourceElement();
            if (typeof statement === 'undefined') {
              break;
            }
            list.push(statement);
          }
          return list;
        }
        function parseBlock() {
          var block, startToken;
          startToken = lookahead;
          expect('{');
          block = parseStatementList();
          expect('}');
          return delegate.markEnd(delegate.createBlockStatement(block), startToken);
        }

        // 12.2 Variable Statement

        function parseVariableIdentifier() {
          var token, startToken;
          startToken = lookahead;
          token = lex();
          if (token.type !== Token.Identifier) {
            throwUnexpected(token);
          }
          return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
        }
        function parseVariableDeclaration(kind) {
          var init = null,
            id,
            startToken;
          startToken = lookahead;
          id = parseVariableIdentifier();

          // 12.2.1
          if (strict && isRestrictedWord(id.name)) {
            throwErrorTolerant({}, Messages.StrictVarName);
          }
          if (kind === 'const') {
            expect('=');
            init = parseAssignmentExpression();
          } else if (match('=')) {
            lex();
            init = parseAssignmentExpression();
          }
          return delegate.markEnd(delegate.createVariableDeclarator(id, init), startToken);
        }
        function parseVariableDeclarationList(kind) {
          var list = [];
          do {
            list.push(parseVariableDeclaration(kind));
            if (!match(',')) {
              break;
            }
            lex();
          } while (index < length);
          return list;
        }
        function parseVariableStatement() {
          var declarations;
          expectKeyword('var');
          declarations = parseVariableDeclarationList();
          consumeSemicolon();
          return delegate.createVariableDeclaration(declarations, 'var');
        }

        // kind may be `const` or `let`
        // Both are experimental and not in the specification yet.
        // see http://wiki.ecmascript.org/doku.php?id=harmony:const
        // and http://wiki.ecmascript.org/doku.php?id=harmony:let
        function parseConstLetDeclaration(kind) {
          var declarations, startToken;
          startToken = lookahead;
          expectKeyword(kind);
          declarations = parseVariableDeclarationList(kind);
          consumeSemicolon();
          return delegate.markEnd(delegate.createVariableDeclaration(declarations, kind), startToken);
        }

        // 12.3 Empty Statement

        function parseEmptyStatement() {
          expect(';');
          return delegate.createEmptyStatement();
        }

        // 12.4 Expression Statement

        function parseExpressionStatement() {
          var expr = parseExpression();
          consumeSemicolon();
          return delegate.createExpressionStatement(expr);
        }

        // 12.5 If statement

        function parseIfStatement() {
          var test, consequent, alternate;
          expectKeyword('if');
          expect('(');
          test = parseExpression();
          expect(')');
          consequent = parseStatement();
          if (matchKeyword('else')) {
            lex();
            alternate = parseStatement();
          } else {
            alternate = null;
          }
          return delegate.createIfStatement(test, consequent, alternate);
        }

        // 12.6 Iteration Statements

        function parseDoWhileStatement() {
          var body, test, oldInIteration;
          expectKeyword('do');
          oldInIteration = state.inIteration;
          state.inIteration = true;
          body = parseStatement();
          state.inIteration = oldInIteration;
          expectKeyword('while');
          expect('(');
          test = parseExpression();
          expect(')');
          if (match(';')) {
            lex();
          }
          return delegate.createDoWhileStatement(body, test);
        }
        function parseWhileStatement() {
          var test, body, oldInIteration;
          expectKeyword('while');
          expect('(');
          test = parseExpression();
          expect(')');
          oldInIteration = state.inIteration;
          state.inIteration = true;
          body = parseStatement();
          state.inIteration = oldInIteration;
          return delegate.createWhileStatement(test, body);
        }
        function parseForVariableDeclaration() {
          var token, declarations, startToken;
          startToken = lookahead;
          token = lex();
          declarations = parseVariableDeclarationList();
          return delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value), startToken);
        }
        function parseForStatement() {
          var init, test, update, left, right, body, oldInIteration;
          init = test = update = null;
          expectKeyword('for');
          expect('(');
          if (match(';')) {
            lex();
          } else {
            if (matchKeyword('var') || matchKeyword('let')) {
              state.allowIn = false;
              init = parseForVariableDeclaration();
              state.allowIn = true;
              if (init.declarations.length === 1 && matchKeyword('in')) {
                lex();
                left = init;
                right = parseExpression();
                init = null;
              }
            } else {
              state.allowIn = false;
              init = parseExpression();
              state.allowIn = true;
              if (matchKeyword('in')) {
                // LeftHandSideExpression
                if (!isLeftHandSide(init)) {
                  throwErrorTolerant({}, Messages.InvalidLHSInForIn);
                }
                lex();
                left = init;
                right = parseExpression();
                init = null;
              }
            }
            if (typeof left === 'undefined') {
              expect(';');
            }
          }
          if (typeof left === 'undefined') {
            if (!match(';')) {
              test = parseExpression();
            }
            expect(';');
            if (!match(')')) {
              update = parseExpression();
            }
          }
          expect(')');
          oldInIteration = state.inIteration;
          state.inIteration = true;
          body = parseStatement();
          state.inIteration = oldInIteration;
          return typeof left === 'undefined' ? delegate.createForStatement(init, test, update, body) : delegate.createForInStatement(left, right, body);
        }

        // 12.7 The continue statement

        function parseContinueStatement() {
          var label = null,
            key;
          expectKeyword('continue');

          // Optimize the most common form: 'continue;'.
          if (source.charCodeAt(index) === 0x3B) {
            lex();
            if (!state.inIteration) {
              throwError({}, Messages.IllegalContinue);
            }
            return delegate.createContinueStatement(null);
          }
          if (peekLineTerminator()) {
            if (!state.inIteration) {
              throwError({}, Messages.IllegalContinue);
            }
            return delegate.createContinueStatement(null);
          }
          if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();
            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
              throwError({}, Messages.UnknownLabel, label.name);
            }
          }
          consumeSemicolon();
          if (label === null && !state.inIteration) {
            throwError({}, Messages.IllegalContinue);
          }
          return delegate.createContinueStatement(label);
        }

        // 12.8 The break statement

        function parseBreakStatement() {
          var label = null,
            key;
          expectKeyword('break');

          // Catch the very common case first: immediately a semicolon (U+003B).
          if (source.charCodeAt(index) === 0x3B) {
            lex();
            if (!(state.inIteration || state.inSwitch)) {
              throwError({}, Messages.IllegalBreak);
            }
            return delegate.createBreakStatement(null);
          }
          if (peekLineTerminator()) {
            if (!(state.inIteration || state.inSwitch)) {
              throwError({}, Messages.IllegalBreak);
            }
            return delegate.createBreakStatement(null);
          }
          if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();
            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
              throwError({}, Messages.UnknownLabel, label.name);
            }
          }
          consumeSemicolon();
          if (label === null && !(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
          }
          return delegate.createBreakStatement(label);
        }

        // 12.9 The return statement

        function parseReturnStatement() {
          var argument = null;
          expectKeyword('return');
          if (!state.inFunctionBody) {
            throwErrorTolerant({}, Messages.IllegalReturn);
          }

          // 'return' followed by a space and an identifier is very common.
          if (source.charCodeAt(index) === 0x20) {
            if (isIdentifierStart(source.charCodeAt(index + 1))) {
              argument = parseExpression();
              consumeSemicolon();
              return delegate.createReturnStatement(argument);
            }
          }
          if (peekLineTerminator()) {
            return delegate.createReturnStatement(null);
          }
          if (!match(';')) {
            if (!match('}') && lookahead.type !== Token.EOF) {
              argument = parseExpression();
            }
          }
          consumeSemicolon();
          return delegate.createReturnStatement(argument);
        }

        // 12.10 The with statement

        function parseWithStatement() {
          var object, body;
          if (strict) {
            // TODO(ikarienator): Should we update the test cases instead?
            skipComment();
            throwErrorTolerant({}, Messages.StrictModeWith);
          }
          expectKeyword('with');
          expect('(');
          object = parseExpression();
          expect(')');
          body = parseStatement();
          return delegate.createWithStatement(object, body);
        }

        // 12.10 The swith statement

        function parseSwitchCase() {
          var test,
            consequent = [],
            statement,
            startToken;
          startToken = lookahead;
          if (matchKeyword('default')) {
            lex();
            test = null;
          } else {
            expectKeyword('case');
            test = parseExpression();
          }
          expect(':');
          while (index < length) {
            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
              break;
            }
            statement = parseStatement();
            consequent.push(statement);
          }
          return delegate.markEnd(delegate.createSwitchCase(test, consequent), startToken);
        }
        function parseSwitchStatement() {
          var discriminant, cases, clause, oldInSwitch, defaultFound;
          expectKeyword('switch');
          expect('(');
          discriminant = parseExpression();
          expect(')');
          expect('{');
          cases = [];
          if (match('}')) {
            lex();
            return delegate.createSwitchStatement(discriminant, cases);
          }
          oldInSwitch = state.inSwitch;
          state.inSwitch = true;
          defaultFound = false;
          while (index < length) {
            if (match('}')) {
              break;
            }
            clause = parseSwitchCase();
            if (clause.test === null) {
              if (defaultFound) {
                throwError({}, Messages.MultipleDefaultsInSwitch);
              }
              defaultFound = true;
            }
            cases.push(clause);
          }
          state.inSwitch = oldInSwitch;
          expect('}');
          return delegate.createSwitchStatement(discriminant, cases);
        }

        // 12.13 The throw statement

        function parseThrowStatement() {
          var argument;
          expectKeyword('throw');
          if (peekLineTerminator()) {
            throwError({}, Messages.NewlineAfterThrow);
          }
          argument = parseExpression();
          consumeSemicolon();
          return delegate.createThrowStatement(argument);
        }

        // 12.14 The try statement

        function parseCatchClause() {
          var param, body, startToken;
          startToken = lookahead;
          expectKeyword('catch');
          expect('(');
          if (match(')')) {
            throwUnexpected(lookahead);
          }
          param = parseVariableIdentifier();
          // 12.14.1
          if (strict && isRestrictedWord(param.name)) {
            throwErrorTolerant({}, Messages.StrictCatchVariable);
          }
          expect(')');
          body = parseBlock();
          return delegate.markEnd(delegate.createCatchClause(param, body), startToken);
        }
        function parseTryStatement() {
          var block,
            handlers = [],
            finalizer = null;
          expectKeyword('try');
          block = parseBlock();
          if (matchKeyword('catch')) {
            handlers.push(parseCatchClause());
          }
          if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
          }
          if (handlers.length === 0 && !finalizer) {
            throwError({}, Messages.NoCatchOrFinally);
          }
          return delegate.createTryStatement(block, [], handlers, finalizer);
        }

        // 12.15 The debugger statement

        function parseDebuggerStatement() {
          expectKeyword('debugger');
          consumeSemicolon();
          return delegate.createDebuggerStatement();
        }

        // 12 Statements

        function parseStatement() {
          var type = lookahead.type,
            expr,
            labeledBody,
            key,
            startToken;
          if (type === Token.EOF) {
            throwUnexpected(lookahead);
          }
          if (type === Token.Punctuator && lookahead.value === '{') {
            return parseBlock();
          }
          startToken = lookahead;
          if (type === Token.Punctuator) {
            switch (lookahead.value) {
              case ';':
                return delegate.markEnd(parseEmptyStatement(), startToken);
              case '(':
                return delegate.markEnd(parseExpressionStatement(), startToken);
              default:
                break;
            }
          }
          if (type === Token.Keyword) {
            switch (lookahead.value) {
              case 'break':
                return delegate.markEnd(parseBreakStatement(), startToken);
              case 'continue':
                return delegate.markEnd(parseContinueStatement(), startToken);
              case 'debugger':
                return delegate.markEnd(parseDebuggerStatement(), startToken);
              case 'do':
                return delegate.markEnd(parseDoWhileStatement(), startToken);
              case 'for':
                return delegate.markEnd(parseForStatement(), startToken);
              case 'function':
                return delegate.markEnd(parseFunctionDeclaration(), startToken);
              case 'if':
                return delegate.markEnd(parseIfStatement(), startToken);
              case 'return':
                return delegate.markEnd(parseReturnStatement(), startToken);
              case 'switch':
                return delegate.markEnd(parseSwitchStatement(), startToken);
              case 'throw':
                return delegate.markEnd(parseThrowStatement(), startToken);
              case 'try':
                return delegate.markEnd(parseTryStatement(), startToken);
              case 'var':
                return delegate.markEnd(parseVariableStatement(), startToken);
              case 'while':
                return delegate.markEnd(parseWhileStatement(), startToken);
              case 'with':
                return delegate.markEnd(parseWithStatement(), startToken);
              default:
                break;
            }
          }
          expr = parseExpression();

          // 12.12 Labelled Statements
          if (expr.type === Syntax.Identifier && match(':')) {
            lex();
            key = '$' + expr.name;
            if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
              throwError({}, Messages.Redeclaration, 'Label', expr.name);
            }
            state.labelSet[key] = true;
            labeledBody = parseStatement();
            delete state.labelSet[key];
            return delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody), startToken);
          }
          consumeSemicolon();
          return delegate.markEnd(delegate.createExpressionStatement(expr), startToken);
        }

        // 13 Function Definition

        function parseFunctionSourceElements() {
          var sourceElement,
            sourceElements = [],
            token,
            directive,
            firstRestricted,
            oldLabelSet,
            oldInIteration,
            oldInSwitch,
            oldInFunctionBody,
            startToken;
          startToken = lookahead;
          expect('{');
          while (index < length) {
            if (lookahead.type !== Token.StringLiteral) {
              break;
            }
            token = lookahead;
            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
              // this is not directive
              break;
            }
            directive = source.slice(token.start + 1, token.end - 1);
            if (directive === 'use strict') {
              strict = true;
              if (firstRestricted) {
                throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
              }
            } else {
              if (!firstRestricted && token.octal) {
                firstRestricted = token;
              }
            }
          }
          oldLabelSet = state.labelSet;
          oldInIteration = state.inIteration;
          oldInSwitch = state.inSwitch;
          oldInFunctionBody = state.inFunctionBody;
          state.labelSet = {};
          state.inIteration = false;
          state.inSwitch = false;
          state.inFunctionBody = true;
          while (index < length) {
            if (match('}')) {
              break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
              break;
            }
            sourceElements.push(sourceElement);
          }
          expect('}');
          state.labelSet = oldLabelSet;
          state.inIteration = oldInIteration;
          state.inSwitch = oldInSwitch;
          state.inFunctionBody = oldInFunctionBody;
          return delegate.markEnd(delegate.createBlockStatement(sourceElements), startToken);
        }
        function parseParams(firstRestricted) {
          var param,
            params = [],
            token,
            stricted,
            paramSet,
            key,
            message;
          expect('(');
          if (!match(')')) {
            paramSet = {};
            while (index < length) {
              token = lookahead;
              param = parseVariableIdentifier();
              key = '$' + token.value;
              if (strict) {
                if (isRestrictedWord(token.value)) {
                  stricted = token;
                  message = Messages.StrictParamName;
                }
                if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                  stricted = token;
                  message = Messages.StrictParamDupe;
                }
              } else if (!firstRestricted) {
                if (isRestrictedWord(token.value)) {
                  firstRestricted = token;
                  message = Messages.StrictParamName;
                } else if (isStrictModeReservedWord(token.value)) {
                  firstRestricted = token;
                  message = Messages.StrictReservedWord;
                } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                  firstRestricted = token;
                  message = Messages.StrictParamDupe;
                }
              }
              params.push(param);
              paramSet[key] = true;
              if (match(')')) {
                break;
              }
              expect(',');
            }
          }
          expect(')');
          return {
            params: params,
            stricted: stricted,
            firstRestricted: firstRestricted,
            message: message
          };
        }
        function parseFunctionDeclaration() {
          var id,
            params = [],
            body,
            token,
            stricted,
            tmp,
            firstRestricted,
            message,
            previousStrict,
            startToken;
          startToken = lookahead;
          expectKeyword('function');
          token = lookahead;
          id = parseVariableIdentifier();
          if (strict) {
            if (isRestrictedWord(token.value)) {
              throwErrorTolerant(token, Messages.StrictFunctionName);
            }
          } else {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            }
          }
          tmp = parseParams(firstRestricted);
          params = tmp.params;
          stricted = tmp.stricted;
          firstRestricted = tmp.firstRestricted;
          if (tmp.message) {
            message = tmp.message;
          }
          previousStrict = strict;
          body = parseFunctionSourceElements();
          if (strict && firstRestricted) {
            throwError(firstRestricted, message);
          }
          if (strict && stricted) {
            throwErrorTolerant(stricted, message);
          }
          strict = previousStrict;
          return delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body), startToken);
        }
        function parseFunctionExpression() {
          var token,
            id = null,
            stricted,
            firstRestricted,
            message,
            tmp,
            params = [],
            body,
            previousStrict,
            startToken;
          startToken = lookahead;
          expectKeyword('function');
          if (!match('(')) {
            token = lookahead;
            id = parseVariableIdentifier();
            if (strict) {
              if (isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
              }
            } else {
              if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
              } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
              }
            }
          }
          tmp = parseParams(firstRestricted);
          params = tmp.params;
          stricted = tmp.stricted;
          firstRestricted = tmp.firstRestricted;
          if (tmp.message) {
            message = tmp.message;
          }
          previousStrict = strict;
          body = parseFunctionSourceElements();
          if (strict && firstRestricted) {
            throwError(firstRestricted, message);
          }
          if (strict && stricted) {
            throwErrorTolerant(stricted, message);
          }
          strict = previousStrict;
          return delegate.markEnd(delegate.createFunctionExpression(id, params, [], body), startToken);
        }

        // 14 Program

        function parseSourceElement() {
          if (lookahead.type === Token.Keyword) {
            switch (lookahead.value) {
              case 'const':
              case 'let':
                return parseConstLetDeclaration(lookahead.value);
              case 'function':
                return parseFunctionDeclaration();
              default:
                return parseStatement();
            }
          }
          if (lookahead.type !== Token.EOF) {
            return parseStatement();
          }
        }
        function parseSourceElements() {
          var sourceElement,
            sourceElements = [],
            token,
            directive,
            firstRestricted;
          while (index < length) {
            token = lookahead;
            if (token.type !== Token.StringLiteral) {
              break;
            }
            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
              // this is not directive
              break;
            }
            directive = source.slice(token.start + 1, token.end - 1);
            if (directive === 'use strict') {
              strict = true;
              if (firstRestricted) {
                throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
              }
            } else {
              if (!firstRestricted && token.octal) {
                firstRestricted = token;
              }
            }
          }
          while (index < length) {
            sourceElement = parseSourceElement();
            /* istanbul ignore if */
            if (typeof sourceElement === 'undefined') {
              break;
            }
            sourceElements.push(sourceElement);
          }
          return sourceElements;
        }
        function parseProgram() {
          var body, startToken;
          skipComment();
          peek();
          startToken = lookahead;
          strict = false;
          body = parseSourceElements();
          return delegate.markEnd(delegate.createProgram(body), startToken);
        }
        function filterTokenLocation() {
          var i,
            entry,
            token,
            tokens = [];
          for (i = 0; i < extra.tokens.length; ++i) {
            entry = extra.tokens[i];
            token = {
              type: entry.type,
              value: entry.value
            };
            if (extra.range) {
              token.range = entry.range;
            }
            if (extra.loc) {
              token.loc = entry.loc;
            }
            tokens.push(token);
          }
          extra.tokens = tokens;
        }
        function tokenize(code, options) {
          var toString, token, tokens;
          toString = String;
          if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
          }
          delegate = SyntaxTreeDelegate;
          source = code;
          index = 0;
          lineNumber = source.length > 0 ? 1 : 0;
          lineStart = 0;
          length = source.length;
          lookahead = null;
          state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
          };
          extra = {};

          // Options matching.
          options = options || {};

          // Of course we collect tokens here.
          options.tokens = true;
          extra.tokens = [];
          extra.tokenize = true;
          // The following two fields are necessary to compute the Regex tokens.
          extra.openParenToken = -1;
          extra.openCurlyToken = -1;
          extra.range = typeof options.range === 'boolean' && options.range;
          extra.loc = typeof options.loc === 'boolean' && options.loc;
          if (typeof options.comment === 'boolean' && options.comment) {
            extra.comments = [];
          }
          if (typeof options.tolerant === 'boolean' && options.tolerant) {
            extra.errors = [];
          }
          try {
            peek();
            if (lookahead.type === Token.EOF) {
              return extra.tokens;
            }
            token = lex();
            while (lookahead.type !== Token.EOF) {
              try {
                token = lex();
              } catch (lexError) {
                token = lookahead;
                if (extra.errors) {
                  extra.errors.push(lexError);
                  // We have to break on the first error
                  // to avoid infinite loops.
                  break;
                } else {
                  throw lexError;
                }
              }
            }
            filterTokenLocation();
            tokens = extra.tokens;
            if (typeof extra.comments !== 'undefined') {
              tokens.comments = extra.comments;
            }
            if (typeof extra.errors !== 'undefined') {
              tokens.errors = extra.errors;
            }
          } catch (e) {
            throw e;
          } finally {
            extra = {};
          }
          return tokens;
        }
        function parse(code, options) {
          var program, toString;
          toString = String;
          if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
          }
          delegate = SyntaxTreeDelegate;
          source = code;
          index = 0;
          lineNumber = source.length > 0 ? 1 : 0;
          lineStart = 0;
          length = source.length;
          lookahead = null;
          state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
          };
          extra = {};
          if (typeof options !== 'undefined') {
            extra.range = typeof options.range === 'boolean' && options.range;
            extra.loc = typeof options.loc === 'boolean' && options.loc;
            extra.attachComment = typeof options.attachComment === 'boolean' && options.attachComment;
            if (extra.loc && options.source !== null && options.source !== undefined) {
              extra.source = toString(options.source);
            }
            if (typeof options.tokens === 'boolean' && options.tokens) {
              extra.tokens = [];
            }
            if (typeof options.comment === 'boolean' && options.comment) {
              extra.comments = [];
            }
            if (typeof options.tolerant === 'boolean' && options.tolerant) {
              extra.errors = [];
            }
            if (extra.attachComment) {
              extra.range = true;
              extra.comments = [];
              extra.bottomRightStack = [];
              extra.trailingComments = [];
              extra.leadingComments = [];
            }
          }
          try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
              program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
              filterTokenLocation();
              program.tokens = extra.tokens;
            }
            if (typeof extra.errors !== 'undefined') {
              program.errors = extra.errors;
            }
          } catch (e) {
            throw e;
          } finally {
            extra = {};
          }
          return program;
        }

        // Sync with *.json manifests.
        exports.version = '1.2.2';
        exports.tokenize = tokenize;
        exports.parse = parse;

        // Deep copy.
        /* istanbul ignore next */
        exports.Syntax = function () {
          var name,
            types = {};
          if (typeof Object.create === 'function') {
            types = Object.create(null);
          }
          for (name in Syntax) {
            if (Syntax.hasOwnProperty(name)) {
              types[name] = Syntax[name];
            }
          }
          if (typeof Object.freeze === 'function') {
            Object.freeze(types);
          }
          return types;
        }();
      });
      /* vim: set sw=4 ts=4 et tw=80 : */
    }, {}],
    1: [function (require, module, exports) {
      (function (process) {
        /* parser generated by jison 0.4.13 */
        /*
          Returns a Parser object of the following structure:
        
          Parser: {
            yy: {}
          }
        
          Parser.prototype: {
            yy: {},
            trace: function(),
            symbols_: {associative list: name ==> number},
            terminals_: {associative list: number ==> name},
            productions_: [...],
            performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
            table: [...],
            defaultActions: {...},
            parseError: function(str, hash),
            parse: function(input),
        
            lexer: {
                EOF: 1,
                parseError: function(str, hash),
                setInput: function(input),
                input: function(),
                unput: function(str),
                more: function(),
                less: function(n),
                pastInput: function(),
                upcomingInput: function(),
                showPosition: function(),
                test_match: function(regex_match_array, rule_index),
                next: function(),
                lex: function(),
                begin: function(condition),
                popState: function(),
                _currentRules: function(),
                topState: function(),
                pushState: function(condition),
        
                options: {
                    ranges: boolean           (optional: true ==> token location info will include a .range[] member)
                    flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
                    backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
                },
        
                performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
                rules: [...],
                conditions: {associative list: name ==> set},
            }
          }
        
        
          token location info (@$, _$, etc.): {
            first_line: n,
            last_line: n,
            first_column: n,
            last_column: n,
            range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
          }
        
        
          the parseError function receives a 'hash' object with these members for lexer and parser errors: {
            text:        (matched text)
            token:       (the produced terminal token, if any)
            line:        (yylineno)
          }
          while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
            loc:         (yylloc)
            expected:    (string describing the set of expected tokens)
            recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
          }
        */
        var parser = function () {
          var parser = {
            trace: function trace() {},
            yy: {},
            symbols_: {
              "error": 2,
              "JSON_PATH": 3,
              "DOLLAR": 4,
              "PATH_COMPONENTS": 5,
              "LEADING_CHILD_MEMBER_EXPRESSION": 6,
              "PATH_COMPONENT": 7,
              "MEMBER_COMPONENT": 8,
              "SUBSCRIPT_COMPONENT": 9,
              "CHILD_MEMBER_COMPONENT": 10,
              "DESCENDANT_MEMBER_COMPONENT": 11,
              "DOT": 12,
              "MEMBER_EXPRESSION": 13,
              "DOT_DOT": 14,
              "STAR": 15,
              "IDENTIFIER": 16,
              "SCRIPT_EXPRESSION": 17,
              "INTEGER": 18,
              "END": 19,
              "CHILD_SUBSCRIPT_COMPONENT": 20,
              "DESCENDANT_SUBSCRIPT_COMPONENT": 21,
              "[": 22,
              "SUBSCRIPT": 23,
              "]": 24,
              "SUBSCRIPT_EXPRESSION": 25,
              "SUBSCRIPT_EXPRESSION_LIST": 26,
              "SUBSCRIPT_EXPRESSION_LISTABLE": 27,
              ",": 28,
              "STRING_LITERAL": 29,
              "ARRAY_SLICE": 30,
              "FILTER_EXPRESSION": 31,
              "QQ_STRING": 32,
              "Q_STRING": 33,
              "$accept": 0,
              "$end": 1
            },
            terminals_: {
              2: "error",
              4: "DOLLAR",
              12: "DOT",
              14: "DOT_DOT",
              15: "STAR",
              16: "IDENTIFIER",
              17: "SCRIPT_EXPRESSION",
              18: "INTEGER",
              19: "END",
              22: "[",
              24: "]",
              28: ",",
              30: "ARRAY_SLICE",
              31: "FILTER_EXPRESSION",
              32: "QQ_STRING",
              33: "Q_STRING"
            },
            productions_: [0, [3, 1], [3, 2], [3, 1], [3, 2], [5, 1], [5, 2], [7, 1], [7, 1], [8, 1], [8, 1], [10, 2], [6, 1], [11, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [9, 1], [9, 1], [20, 3], [21, 4], [23, 1], [23, 1], [26, 1], [26, 3], [27, 1], [27, 1], [27, 1], [25, 1], [25, 1], [25, 1], [29, 1], [29, 1]],
            performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */
            /**/) {
              /* this == yyval */
              if (!yy.ast) {
                yy.ast = _ast;
                _ast.initialize();
              }
              var $0 = $$.length - 1;
              switch (yystate) {
                case 1:
                  yy.ast.set({
                    expression: {
                      type: "root",
                      value: $$[$0]
                    }
                  });
                  yy.ast.unshift();
                  return yy.ast["yield"]();
                  break;
                case 2:
                  yy.ast.set({
                    expression: {
                      type: "root",
                      value: $$[$0 - 1]
                    }
                  });
                  yy.ast.unshift();
                  return yy.ast["yield"]();
                  break;
                case 3:
                  yy.ast.unshift();
                  return yy.ast["yield"]();
                  break;
                case 4:
                  yy.ast.set({
                    operation: "member",
                    scope: "child",
                    expression: {
                      type: "identifier",
                      value: $$[$0 - 1]
                    }
                  });
                  yy.ast.unshift();
                  return yy.ast["yield"]();
                  break;
                case 5:
                  break;
                case 6:
                  break;
                case 7:
                  yy.ast.set({
                    operation: "member"
                  });
                  yy.ast.push();
                  break;
                case 8:
                  yy.ast.set({
                    operation: "subscript"
                  });
                  yy.ast.push();
                  break;
                case 9:
                  yy.ast.set({
                    scope: "child"
                  });
                  break;
                case 10:
                  yy.ast.set({
                    scope: "descendant"
                  });
                  break;
                case 11:
                  break;
                case 12:
                  yy.ast.set({
                    scope: "child",
                    operation: "member"
                  });
                  break;
                case 13:
                  break;
                case 14:
                  yy.ast.set({
                    expression: {
                      type: "wildcard",
                      value: $$[$0]
                    }
                  });
                  break;
                case 15:
                  yy.ast.set({
                    expression: {
                      type: "identifier",
                      value: $$[$0]
                    }
                  });
                  break;
                case 16:
                  yy.ast.set({
                    expression: {
                      type: "script_expression",
                      value: $$[$0]
                    }
                  });
                  break;
                case 17:
                  yy.ast.set({
                    expression: {
                      type: "numeric_literal",
                      value: parseInt($$[$0])
                    }
                  });
                  break;
                case 18:
                  break;
                case 19:
                  yy.ast.set({
                    scope: "child"
                  });
                  break;
                case 20:
                  yy.ast.set({
                    scope: "descendant"
                  });
                  break;
                case 21:
                  break;
                case 22:
                  break;
                case 23:
                  break;
                case 24:
                  $$[$0].length > 1 ? yy.ast.set({
                    expression: {
                      type: "union",
                      value: $$[$0]
                    }
                  }) : this.$ = $$[$0];
                  break;
                case 25:
                  this.$ = [$$[$0]];
                  break;
                case 26:
                  this.$ = $$[$0 - 2].concat($$[$0]);
                  break;
                case 27:
                  this.$ = {
                    expression: {
                      type: "numeric_literal",
                      value: parseInt($$[$0])
                    }
                  };
                  yy.ast.set(this.$);
                  break;
                case 28:
                  this.$ = {
                    expression: {
                      type: "string_literal",
                      value: $$[$0]
                    }
                  };
                  yy.ast.set(this.$);
                  break;
                case 29:
                  this.$ = {
                    expression: {
                      type: "slice",
                      value: $$[$0]
                    }
                  };
                  yy.ast.set(this.$);
                  break;
                case 30:
                  this.$ = {
                    expression: {
                      type: "wildcard",
                      value: $$[$0]
                    }
                  };
                  yy.ast.set(this.$);
                  break;
                case 31:
                  this.$ = {
                    expression: {
                      type: "script_expression",
                      value: $$[$0]
                    }
                  };
                  yy.ast.set(this.$);
                  break;
                case 32:
                  this.$ = {
                    expression: {
                      type: "filter_expression",
                      value: $$[$0]
                    }
                  };
                  yy.ast.set(this.$);
                  break;
                case 33:
                  this.$ = $$[$0];
                  break;
                case 34:
                  this.$ = $$[$0];
                  break;
              }
            },
            table: [{
              3: 1,
              4: [1, 2],
              6: 3,
              13: 4,
              15: [1, 5],
              16: [1, 6],
              17: [1, 7],
              18: [1, 8],
              19: [1, 9]
            }, {
              1: [3]
            }, {
              1: [2, 1],
              5: 10,
              7: 11,
              8: 12,
              9: 13,
              10: 14,
              11: 15,
              12: [1, 18],
              14: [1, 19],
              20: 16,
              21: 17,
              22: [1, 20]
            }, {
              1: [2, 3],
              5: 21,
              7: 11,
              8: 12,
              9: 13,
              10: 14,
              11: 15,
              12: [1, 18],
              14: [1, 19],
              20: 16,
              21: 17,
              22: [1, 20]
            }, {
              1: [2, 12],
              12: [2, 12],
              14: [2, 12],
              22: [2, 12]
            }, {
              1: [2, 14],
              12: [2, 14],
              14: [2, 14],
              22: [2, 14]
            }, {
              1: [2, 15],
              12: [2, 15],
              14: [2, 15],
              22: [2, 15]
            }, {
              1: [2, 16],
              12: [2, 16],
              14: [2, 16],
              22: [2, 16]
            }, {
              1: [2, 17],
              12: [2, 17],
              14: [2, 17],
              22: [2, 17]
            }, {
              1: [2, 18],
              12: [2, 18],
              14: [2, 18],
              22: [2, 18]
            }, {
              1: [2, 2],
              7: 22,
              8: 12,
              9: 13,
              10: 14,
              11: 15,
              12: [1, 18],
              14: [1, 19],
              20: 16,
              21: 17,
              22: [1, 20]
            }, {
              1: [2, 5],
              12: [2, 5],
              14: [2, 5],
              22: [2, 5]
            }, {
              1: [2, 7],
              12: [2, 7],
              14: [2, 7],
              22: [2, 7]
            }, {
              1: [2, 8],
              12: [2, 8],
              14: [2, 8],
              22: [2, 8]
            }, {
              1: [2, 9],
              12: [2, 9],
              14: [2, 9],
              22: [2, 9]
            }, {
              1: [2, 10],
              12: [2, 10],
              14: [2, 10],
              22: [2, 10]
            }, {
              1: [2, 19],
              12: [2, 19],
              14: [2, 19],
              22: [2, 19]
            }, {
              1: [2, 20],
              12: [2, 20],
              14: [2, 20],
              22: [2, 20]
            }, {
              13: 23,
              15: [1, 5],
              16: [1, 6],
              17: [1, 7],
              18: [1, 8],
              19: [1, 9]
            }, {
              13: 24,
              15: [1, 5],
              16: [1, 6],
              17: [1, 7],
              18: [1, 8],
              19: [1, 9],
              22: [1, 25]
            }, {
              15: [1, 29],
              17: [1, 30],
              18: [1, 33],
              23: 26,
              25: 27,
              26: 28,
              27: 32,
              29: 34,
              30: [1, 35],
              31: [1, 31],
              32: [1, 36],
              33: [1, 37]
            }, {
              1: [2, 4],
              7: 22,
              8: 12,
              9: 13,
              10: 14,
              11: 15,
              12: [1, 18],
              14: [1, 19],
              20: 16,
              21: 17,
              22: [1, 20]
            }, {
              1: [2, 6],
              12: [2, 6],
              14: [2, 6],
              22: [2, 6]
            }, {
              1: [2, 11],
              12: [2, 11],
              14: [2, 11],
              22: [2, 11]
            }, {
              1: [2, 13],
              12: [2, 13],
              14: [2, 13],
              22: [2, 13]
            }, {
              15: [1, 29],
              17: [1, 30],
              18: [1, 33],
              23: 38,
              25: 27,
              26: 28,
              27: 32,
              29: 34,
              30: [1, 35],
              31: [1, 31],
              32: [1, 36],
              33: [1, 37]
            }, {
              24: [1, 39]
            }, {
              24: [2, 23]
            }, {
              24: [2, 24],
              28: [1, 40]
            }, {
              24: [2, 30]
            }, {
              24: [2, 31]
            }, {
              24: [2, 32]
            }, {
              24: [2, 25],
              28: [2, 25]
            }, {
              24: [2, 27],
              28: [2, 27]
            }, {
              24: [2, 28],
              28: [2, 28]
            }, {
              24: [2, 29],
              28: [2, 29]
            }, {
              24: [2, 33],
              28: [2, 33]
            }, {
              24: [2, 34],
              28: [2, 34]
            }, {
              24: [1, 41]
            }, {
              1: [2, 21],
              12: [2, 21],
              14: [2, 21],
              22: [2, 21]
            }, {
              18: [1, 33],
              27: 42,
              29: 34,
              30: [1, 35],
              32: [1, 36],
              33: [1, 37]
            }, {
              1: [2, 22],
              12: [2, 22],
              14: [2, 22],
              22: [2, 22]
            }, {
              24: [2, 26],
              28: [2, 26]
            }],
            defaultActions: {
              27: [2, 23],
              29: [2, 30],
              30: [2, 31],
              31: [2, 32]
            },
            parseError: function parseError(str, hash) {
              if (hash.recoverable) {
                this.trace(str);
              } else {
                throw new Error(str);
              }
            },
            parse: function parse(input) {
              var self = this,
                stack = [0],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
              var args = lstack.slice.call(arguments, 1);
              this.lexer.setInput(input);
              this.lexer.yy = this.yy;
              this.yy.lexer = this.lexer;
              this.yy.parser = this;
              if (typeof this.lexer.yylloc == 'undefined') {
                this.lexer.yylloc = {};
              }
              var yyloc = this.lexer.yylloc;
              lstack.push(yyloc);
              var ranges = this.lexer.options && this.lexer.options.ranges;
              if (typeof this.yy.parseError === 'function') {
                this.parseError = this.yy.parseError;
              } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
              }
              function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
              }
              function lex() {
                var token;
                token = self.lexer.lex() || EOF;
                if (typeof token !== 'number') {
                  token = self.symbols_[token] || token;
                }
                return token;
              }
              var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
              while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                  action = this.defaultActions[state];
                } else {
                  if (symbol === null || typeof symbol == 'undefined') {
                    symbol = lex();
                  }
                  action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                  var errStr = '';
                  expected = [];
                  for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                      expected.push('\'' + this.terminals_[p] + '\'');
                    }
                  }
                  if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                  } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                  }
                  this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                  });
                }
                if (action[0] instanceof Array && action.length > 1) {
                  throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                  case 1:
                    stack.push(symbol);
                    vstack.push(this.lexer.yytext);
                    lstack.push(this.lexer.yylloc);
                    stack.push(action[1]);
                    symbol = null;
                    if (!preErrorSymbol) {
                      yyleng = this.lexer.yyleng;
                      yytext = this.lexer.yytext;
                      yylineno = this.lexer.yylineno;
                      yyloc = this.lexer.yylloc;
                      if (recovering > 0) {
                        recovering--;
                      }
                    } else {
                      symbol = preErrorSymbol;
                      preErrorSymbol = null;
                    }
                    break;
                  case 2:
                    len = this.productions_[action[1]][1];
                    yyval.$ = vstack[vstack.length - len];
                    yyval._$ = {
                      first_line: lstack[lstack.length - (len || 1)].first_line,
                      last_line: lstack[lstack.length - 1].last_line,
                      first_column: lstack[lstack.length - (len || 1)].first_column,
                      last_column: lstack[lstack.length - 1].last_column
                    };
                    if (ranges) {
                      yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                    }
                    r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack].concat(args));
                    if (typeof r !== 'undefined') {
                      return r;
                    }
                    if (len) {
                      stack = stack.slice(0, -1 * len * 2);
                      vstack = vstack.slice(0, -1 * len);
                      lstack = lstack.slice(0, -1 * len);
                    }
                    stack.push(this.productions_[action[1]][0]);
                    vstack.push(yyval.$);
                    lstack.push(yyval._$);
                    newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                    stack.push(newState);
                    break;
                  case 3:
                    return true;
                }
              }
              return true;
            }
          };
          var _ast = {
            initialize: function initialize() {
              this._nodes = [];
              this._node = {};
              this._stash = [];
            },
            set: function set(props) {
              for (var k in props) this._node[k] = props[k];
              return this._node;
            },
            node: function node(obj) {
              if (arguments.length) this._node = obj;
              return this._node;
            },
            push: function push() {
              this._nodes.push(this._node);
              this._node = {};
            },
            unshift: function unshift() {
              this._nodes.unshift(this._node);
              this._node = {};
            },
            "yield": function _yield() {
              var _nodes = this._nodes;
              this.initialize();
              return _nodes;
            }
          };
          /* generated by jison-lex 0.2.1 */
          var lexer = function () {
            var lexer = {
              EOF: 1,
              parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                  this.yy.parser.parseError(str, hash);
                } else {
                  throw new Error(str);
                }
              },
              // resets the lexer, sets new input
              setInput: function setInput(input) {
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                  first_line: 1,
                  first_column: 0,
                  last_line: 1,
                  last_column: 0
                };
                if (this.options.ranges) {
                  this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
              },
              // consumes and returns one char from the input
              input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                  this.yylineno++;
                  this.yylloc.last_line++;
                } else {
                  this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                  this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
              },
              // unshifts one char (or a string) into the input
              unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                  this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                  first_line: this.yylloc.first_line,
                  last_line: this.yylineno + 1,
                  first_column: this.yylloc.first_column,
                  last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                  this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
              },
              // When called from action, caches matched text and appends it on next action
              more: function more() {
                this._more = true;
                return this;
              },
              // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
              reject: function reject() {
                if (this.options.backtrack_lexer) {
                  this._backtrack = true;
                } else {
                  return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                  });
                }
                return this;
              },
              // retain first n characters of the match
              less: function less(n) {
                this.unput(this.match.slice(n));
              },
              // displays already matched input, i.e. for error messages
              pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
              },
              // displays upcoming input, i.e. for error messages
              upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                  next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
              },
              // displays the character position where the lexing error occurred, i.e. for error messages
              showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
              },
              // test the lexed token: return FALSE when not a match, otherwise return token
              test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                  // save context
                  backup = {
                    yylineno: this.yylineno,
                    yylloc: {
                      first_line: this.yylloc.first_line,
                      last_line: this.last_line,
                      first_column: this.yylloc.first_column,
                      last_column: this.yylloc.last_column
                    },
                    yytext: this.yytext,
                    match: this.match,
                    matches: this.matches,
                    matched: this.matched,
                    yyleng: this.yyleng,
                    offset: this.offset,
                    _more: this._more,
                    _input: this._input,
                    yy: this.yy,
                    conditionStack: this.conditionStack.slice(0),
                    done: this.done
                  };
                  if (this.options.ranges) {
                    backup.yylloc.range = this.yylloc.range.slice(0);
                  }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                  this.yylineno += lines.length;
                }
                this.yylloc = {
                  first_line: this.yylloc.last_line,
                  last_line: this.yylineno + 1,
                  first_column: this.yylloc.last_column,
                  last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                  this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                  this.done = false;
                }
                if (token) {
                  return token;
                } else if (this._backtrack) {
                  // recover context
                  for (var k in backup) {
                    this[k] = backup[k];
                  }
                  return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
              },
              // return next match in input
              next: function next() {
                if (this.done) {
                  return this.EOF;
                }
                if (!this._input) {
                  this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                  this.yytext = '';
                  this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                  tempMatch = this._input.match(this.rules[rules[i]]);
                  if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                    match = tempMatch;
                    index = i;
                    if (this.options.backtrack_lexer) {
                      token = this.test_match(tempMatch, rules[i]);
                      if (token !== false) {
                        return token;
                      } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                      } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                      }
                    } else if (!this.options.flex) {
                      break;
                    }
                  }
                }
                if (match) {
                  token = this.test_match(match, rules[index]);
                  if (token !== false) {
                    return token;
                  }
                  // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                  return false;
                }
                if (this._input === "") {
                  return this.EOF;
                } else {
                  return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                  });
                }
              },
              // return next match that has a token
              lex: function lex() {
                var r = this.next();
                if (r) {
                  return r;
                } else {
                  return this.lex();
                }
              },
              // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
              begin: function begin(condition) {
                this.conditionStack.push(condition);
              },
              // pop the previously active lexer condition state off the condition stack
              popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                  return this.conditionStack.pop();
                } else {
                  return this.conditionStack[0];
                }
              },
              // produce the lexer rule set which is active for the currently active lexer condition state
              _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                  return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                  return this.conditions["INITIAL"].rules;
                }
              },
              // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
              topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                  return this.conditionStack[n];
                } else {
                  return "INITIAL";
                }
              },
              // alias for begin(condition)
              pushState: function pushState(condition) {
                this.begin(condition);
              },
              // return the number of states currently on the stack
              stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
              },
              options: {},
              performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START
              /**/) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                  case 0:
                    return 4;
                    break;
                  case 1:
                    return 14;
                    break;
                  case 2:
                    return 12;
                    break;
                  case 3:
                    return 15;
                    break;
                  case 4:
                    return 16;
                    break;
                  case 5:
                    return 22;
                    break;
                  case 6:
                    return 24;
                    break;
                  case 7:
                    return 28;
                    break;
                  case 8:
                    return 30;
                    break;
                  case 9:
                    return 18;
                    break;
                  case 10:
                    yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                    return 32;
                    break;
                  case 11:
                    yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                    return 33;
                    break;
                  case 12:
                    return 17;
                    break;
                  case 13:
                    return 31;
                    break;
                }
              },
              rules: [/^(?:\$)/, /^(?:\.\.)/, /^(?:\.)/, /^(?:\*)/, /^(?:[a-zA-Z_]+[a-zA-Z0-9_]*)/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?:((-?(?:0|[1-9][0-9]*)))?\:((-?(?:0|[1-9][0-9]*)))?(\:((-?(?:0|[1-9][0-9]*)))?)?)/, /^(?:(-?(?:0|[1-9][0-9]*)))/, /^(?:"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*")/, /^(?:'(?:\\['bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*')/, /^(?:\(.+?\)(?=\]))/, /^(?:\?\(.+?\)(?=\]))/],
              conditions: {
                "INITIAL": {
                  "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                  "inclusive": true
                }
              }
            };
            return lexer;
          }();
          parser.lexer = lexer;
          function Parser() {
            this.yy = {};
          }
          Parser.prototype = parser;
          parser.Parser = Parser;
          return new Parser();
        }();
        if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
          exports.parser = parser;
          exports.Parser = parser.Parser;
          exports.parse = function () {
            return parser.parse.apply(parser, arguments);
          };
          exports.main = function commonjsMain(args) {
            if (!args[1]) {
              console.log('Usage: ' + args[0] + ' FILE');
              process.exit(1);
            }
            var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
            return exports.parser.parse(source);
          };
          if (typeof module !== 'undefined' && require.main === module) {
            exports.main(process.argv.slice(1));
          }
        }
      }).call(this, require('_process'));
    }, {
      "_process": 14,
      "fs": 12,
      "path": 13
    }],
    2: [function (require, module, exports) {
      module.exports = {
        identifier: "[a-zA-Z_]+[a-zA-Z0-9_]*",
        integer: "-?(?:0|[1-9][0-9]*)",
        qq_string: "\"(?:\\\\[\"bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\"\\\\])*\"",
        q_string: "'(?:\\\\['bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^'\\\\])*'"
      };
    }, {}],
    3: [function (require, module, exports) {
      var dict = require('./dict');
      var fs = require('fs');
      var grammar = {
        lex: {
          macros: {
            esc: "\\\\",
            "int": dict.integer
          },
          rules: [["\\$", "return 'DOLLAR'"], ["\\.\\.", "return 'DOT_DOT'"], ["\\.", "return 'DOT'"], ["\\*", "return 'STAR'"], [dict.identifier, "return 'IDENTIFIER'"], ["\\[", "return '['"], ["\\]", "return ']'"], [",", "return ','"], ["({int})?\\:({int})?(\\:({int})?)?", "return 'ARRAY_SLICE'"], ["{int}", "return 'INTEGER'"], [dict.qq_string, "yytext = yytext.substr(1,yyleng-2); return 'QQ_STRING';"], [dict.q_string, "yytext = yytext.substr(1,yyleng-2); return 'Q_STRING';"], ["\\(.+?\\)(?=\\])", "return 'SCRIPT_EXPRESSION'"], ["\\?\\(.+?\\)(?=\\])", "return 'FILTER_EXPRESSION'"]]
        },
        start: "JSON_PATH",
        bnf: {
          JSON_PATH: [['DOLLAR', 'yy.ast.set({ expression: { type: "root", value: $1 } }); yy.ast.unshift(); return yy.ast.yield()'], ['DOLLAR PATH_COMPONENTS', 'yy.ast.set({ expression: { type: "root", value: $1 } }); yy.ast.unshift(); return yy.ast.yield()'], ['LEADING_CHILD_MEMBER_EXPRESSION', 'yy.ast.unshift(); return yy.ast.yield()'], ['LEADING_CHILD_MEMBER_EXPRESSION PATH_COMPONENTS', 'yy.ast.set({ operation: "member", scope: "child", expression: { type: "identifier", value: $1 }}); yy.ast.unshift(); return yy.ast.yield()']],
          PATH_COMPONENTS: [['PATH_COMPONENT', ''], ['PATH_COMPONENTS PATH_COMPONENT', '']],
          PATH_COMPONENT: [['MEMBER_COMPONENT', 'yy.ast.set({ operation: "member" }); yy.ast.push()'], ['SUBSCRIPT_COMPONENT', 'yy.ast.set({ operation: "subscript" }); yy.ast.push() ']],
          MEMBER_COMPONENT: [['CHILD_MEMBER_COMPONENT', 'yy.ast.set({ scope: "child" })'], ['DESCENDANT_MEMBER_COMPONENT', 'yy.ast.set({ scope: "descendant" })']],
          CHILD_MEMBER_COMPONENT: [['DOT MEMBER_EXPRESSION', '']],
          LEADING_CHILD_MEMBER_EXPRESSION: [['MEMBER_EXPRESSION', 'yy.ast.set({ scope: "child", operation: "member" })']],
          DESCENDANT_MEMBER_COMPONENT: [['DOT_DOT MEMBER_EXPRESSION', '']],
          MEMBER_EXPRESSION: [['STAR', 'yy.ast.set({ expression: { type: "wildcard", value: $1 } })'], ['IDENTIFIER', 'yy.ast.set({ expression: { type: "identifier", value: $1 } })'], ['SCRIPT_EXPRESSION', 'yy.ast.set({ expression: { type: "script_expression", value: $1 } })'], ['INTEGER', 'yy.ast.set({ expression: { type: "numeric_literal", value: parseInt($1) } })'], ['END', '']],
          SUBSCRIPT_COMPONENT: [['CHILD_SUBSCRIPT_COMPONENT', 'yy.ast.set({ scope: "child" })'], ['DESCENDANT_SUBSCRIPT_COMPONENT', 'yy.ast.set({ scope: "descendant" })']],
          CHILD_SUBSCRIPT_COMPONENT: [['[ SUBSCRIPT ]', '']],
          DESCENDANT_SUBSCRIPT_COMPONENT: [['DOT_DOT [ SUBSCRIPT ]', '']],
          SUBSCRIPT: [['SUBSCRIPT_EXPRESSION', ''], ['SUBSCRIPT_EXPRESSION_LIST', '$1.length > 1? yy.ast.set({ expression: { type: "union", value: $1 } }) : $$ = $1']],
          SUBSCRIPT_EXPRESSION_LIST: [['SUBSCRIPT_EXPRESSION_LISTABLE', '$$ = [$1]'], ['SUBSCRIPT_EXPRESSION_LIST , SUBSCRIPT_EXPRESSION_LISTABLE', '$$ = $1.concat($3)']],
          SUBSCRIPT_EXPRESSION_LISTABLE: [['INTEGER', '$$ = { expression: { type: "numeric_literal", value: parseInt($1) } }; yy.ast.set($$)'], ['STRING_LITERAL', '$$ = { expression: { type: "string_literal", value: $1 } }; yy.ast.set($$)'], ['ARRAY_SLICE', '$$ = { expression: { type: "slice", value: $1 } }; yy.ast.set($$)']],
          SUBSCRIPT_EXPRESSION: [['STAR', '$$ = { expression: { type: "wildcard", value: $1 } }; yy.ast.set($$)'], ['SCRIPT_EXPRESSION', '$$ = { expression: { type: "script_expression", value: $1 } }; yy.ast.set($$)'], ['FILTER_EXPRESSION', '$$ = { expression: { type: "filter_expression", value: $1 } }; yy.ast.set($$)']],
          STRING_LITERAL: [['QQ_STRING', "$$ = $1"], ['Q_STRING', "$$ = $1"]]
        }
      };
      if (fs.readFileSync) {
        grammar.moduleInclude = fs.readFileSync(require.resolve("../include/module.js"));
        grammar.actionInclude = fs.readFileSync(require.resolve("../include/action.js"));
      }
      module.exports = grammar;
    }, {
      "./dict": 2,
      "fs": 12
    }],
    4: [function (require, module, exports) {
      var aesprim = require('./aesprim');
      var slice = require('./slice');
      var _evaluate = require('static-eval');
      var _uniq = require('underscore').uniq;
      var Handlers = function Handlers() {
        return this.initialize.apply(this, arguments);
      };
      Handlers.prototype.initialize = function () {
        this.traverse = traverser(true);
        this.descend = traverser();
      };
      Handlers.prototype.keys = Object.keys;
      Handlers.prototype.resolve = function (component) {
        var key = [component.operation, component.scope, component.expression.type].join('-');
        var method = this._fns[key];
        if (!method) throw new Error("couldn't resolve key: " + key);
        return method.bind(this);
      };
      Handlers.prototype.register = function (key, handler) {
        if (!handler instanceof Function) {
          throw new Error("handler must be a function");
        }
        this._fns[key] = handler;
      };
      Handlers.prototype._fns = {
        'member-child-identifier': function memberChildIdentifier(component, partial) {
          var key = component.expression.value;
          var value = partial.value;
          if (value instanceof Object && key in value) {
            return [{
              value: value[key],
              path: partial.path.concat(key)
            }];
          }
        },
        'member-descendant-identifier': _traverse(function (key, value, ref) {
          return key == ref;
        }),
        'subscript-child-numeric_literal': _descend(function (key, value, ref) {
          return key === ref;
        }),
        'member-child-numeric_literal': _descend(function (key, value, ref) {
          return String(key) === String(ref);
        }),
        'subscript-descendant-numeric_literal': _traverse(function (key, value, ref) {
          return key === ref;
        }),
        'member-child-wildcard': _descend(function () {
          return true;
        }),
        'member-descendant-wildcard': _traverse(function () {
          return true;
        }),
        'subscript-descendant-wildcard': _traverse(function () {
          return true;
        }),
        'subscript-child-wildcard': _descend(function () {
          return true;
        }),
        'subscript-child-slice': function subscriptChildSlice(component, partial) {
          if (is_array(partial.value)) {
            var args = component.expression.value.split(':').map(_parse_nullable_int);
            var values = partial.value.map(function (v, i) {
              return {
                value: v,
                path: partial.path.concat(i)
              };
            });
            return slice.apply(null, [values].concat(args));
          }
        },
        'subscript-child-union': function subscriptChildUnion(component, partial) {
          var results = [];
          component.expression.value.forEach(function (component) {
            var _component = {
              operation: 'subscript',
              scope: 'child',
              expression: component.expression
            };
            var handler = this.resolve(_component);
            var _results = handler(_component, partial);
            if (_results) {
              results = results.concat(_results);
            }
          }, this);
          return unique(results);
        },
        'subscript-descendant-union': function subscriptDescendantUnion(component, partial, count) {
          var jp = require('..');
          var self = this;
          var results = [];
          var nodes = jp.nodes(partial, '$..*').slice(1);
          nodes.forEach(function (node) {
            if (results.length >= count) return;
            component.expression.value.forEach(function (component) {
              var _component = {
                operation: 'subscript',
                scope: 'child',
                expression: component.expression
              };
              var handler = self.resolve(_component);
              var _results = handler(_component, node);
              results = results.concat(_results);
            });
          });
          return unique(results);
        },
        'subscript-child-filter_expression': function subscriptChildFilter_expression(component, partial, count) {
          // slice out the expression from ?(expression)
          var src = component.expression.value.slice(2, -1);
          var ast = aesprim.parse(src).body[0].expression;
          var passable = function passable(key, value) {
            return evaluate(ast, {
              '@': value
            });
          };
          return this.descend(partial, null, passable, count);
        },
        'subscript-descendant-filter_expression': function subscriptDescendantFilter_expression(component, partial, count) {
          // slice out the expression from ?(expression)
          var src = component.expression.value.slice(2, -1);
          var ast = aesprim.parse(src).body[0].expression;
          var passable = function passable(key, value) {
            return evaluate(ast, {
              '@': value
            });
          };
          return this.traverse(partial, null, passable, count);
        },
        'subscript-child-script_expression': function subscriptChildScript_expression(component, partial) {
          var exp = component.expression.value.slice(1, -1);
          return eval_recurse(partial, exp, '$[{{value}}]');
        },
        'member-child-script_expression': function memberChildScript_expression(component, partial) {
          var exp = component.expression.value.slice(1, -1);
          return eval_recurse(partial, exp, '$.{{value}}');
        },
        'member-descendant-script_expression': function memberDescendantScript_expression(component, partial) {
          var exp = component.expression.value.slice(1, -1);
          return eval_recurse(partial, exp, '$..value');
        }
      };
      Handlers.prototype._fns['subscript-child-string_literal'] = Handlers.prototype._fns['member-child-identifier'];
      Handlers.prototype._fns['member-descendant-numeric_literal'] = Handlers.prototype._fns['subscript-descendant-string_literal'] = Handlers.prototype._fns['member-descendant-identifier'];
      function eval_recurse(partial, src, template) {
        var jp = require('./index');
        var ast = aesprim.parse(src).body[0].expression;
        var value = evaluate(ast, {
          '@': partial.value
        });
        var path = template.replace(/\{\{\s*value\s*\}\}/g, value);
        var results = jp.nodes(partial.value, path);
        results.forEach(function (r) {
          r.path = partial.path.concat(r.path.slice(1));
        });
        return results;
      }
      function is_array(val) {
        return Array.isArray(val);
      }
      function is_object(val) {
        // is this a non-array, non-null object?
        return val && !(val instanceof Array) && val instanceof Object;
      }
      function traverser(recurse) {
        return function (partial, ref, passable, count) {
          var value = partial.value;
          var path = partial.path;
          var results = [];
          var descend = function (value, path) {
            if (is_array(value)) {
              value.forEach(function (element, index) {
                if (results.length >= count) {
                  return;
                }
                if (passable(index, element, ref)) {
                  results.push({
                    path: path.concat(index),
                    value: element
                  });
                }
              });
              value.forEach(function (element, index) {
                if (results.length >= count) {
                  return;
                }
                if (recurse) {
                  descend(element, path.concat(index));
                }
              });
            } else if (is_object(value)) {
              this.keys(value).forEach(function (k) {
                if (results.length >= count) {
                  return;
                }
                if (passable(k, value[k], ref)) {
                  results.push({
                    path: path.concat(k),
                    value: value[k]
                  });
                }
              });
              this.keys(value).forEach(function (k) {
                if (results.length >= count) {
                  return;
                }
                if (recurse) {
                  descend(value[k], path.concat(k));
                }
              });
            }
          }.bind(this);
          descend(value, path);
          return results;
        };
      }
      function _descend(passable) {
        return function (component, partial, count) {
          return this.descend(partial, component.expression.value, passable, count);
        };
      }
      function _traverse(passable) {
        return function (component, partial, count) {
          return this.traverse(partial, component.expression.value, passable, count);
        };
      }
      function evaluate() {
        try {
          return _evaluate.apply(this, arguments);
        } catch (e) {}
      }
      function unique(results) {
        results = results.filter(function (d) {
          return d;
        });
        return _uniq(results, function (r) {
          return r.path.map(function (c) {
            return String(c).replace('-', '--');
          }).join('-');
        });
      }
      function _parse_nullable_int(val) {
        var sval = String(val);
        return sval.match(/^-?[0-9]+$/) ? parseInt(sval) : null;
      }
      module.exports = Handlers;
    }, {
      "..": "jsonpath",
      "./aesprim": "./aesprim",
      "./index": 5,
      "./slice": 7,
      "static-eval": 15,
      "underscore": 12
    }],
    5: [function (require, module, exports) {
      var assert = require('assert');
      var dict = require('./dict');
      var Parser = require('./parser');
      var Handlers = require('./handlers');
      var JSONPath = function JSONPath() {
        this.initialize.apply(this, arguments);
      };
      JSONPath.prototype.initialize = function () {
        this.parser = new Parser();
        this.handlers = new Handlers();
      };
      JSONPath.prototype.parse = function (string) {
        assert.ok(_is_string(string), "we need a path");
        return this.parser.parse(string);
      };
      JSONPath.prototype.parent = function (obj, string) {
        assert.ok(obj instanceof Object, "obj needs to be an object");
        assert.ok(string, "we need a path");
        var node = this.nodes(obj, string)[0];
        var key = node.path.pop(); /* jshint unused:false */
        return this.value(obj, node.path);
      };
      JSONPath.prototype.apply = function (obj, string, fn) {
        assert.ok(obj instanceof Object, "obj needs to be an object");
        assert.ok(string, "we need a path");
        assert.equal(_typeof(fn), "function", "fn needs to be function");
        var nodes = this.nodes(obj, string).sort(function (a, b) {
          // sort nodes so we apply from the bottom up
          return b.path.length - a.path.length;
        });
        nodes.forEach(function (node) {
          var key = node.path.pop();
          var parent = this.value(obj, this.stringify(node.path));
          var val = node.value = fn.call(obj, parent[key]);
          parent[key] = val;
        }, this);
        return nodes;
      };
      JSONPath.prototype.value = function (obj, path, value) {
        assert.ok(obj instanceof Object, "obj needs to be an object");
        assert.ok(path, "we need a path");
        if (arguments.length >= 3) {
          var node = this.nodes(obj, path).shift();
          if (!node) return this._vivify(obj, path, value);
          var key = node.path.slice(-1).shift();
          var parent = this.parent(obj, this.stringify(node.path));
          parent[key] = value;
        }
        return this.query(obj, this.stringify(path), 1).shift();
      };
      JSONPath.prototype._vivify = function (obj, string, value) {
        var self = this;
        assert.ok(obj instanceof Object, "obj needs to be an object");
        assert.ok(string, "we need a path");
        var path = this.parser.parse(string).map(function (component) {
          return component.expression.value;
        });
        var setValue = function setValue(path, value) {
          var key = path.pop();
          var node = self.value(obj, path);
          if (!node) {
            setValue(path.concat(), typeof key === 'string' ? {} : []);
            node = self.value(obj, path);
          }
          node[key] = value;
        };
        setValue(path, value);
        return this.query(obj, string)[0];
      };
      JSONPath.prototype.query = function (obj, string, count) {
        assert.ok(obj instanceof Object, "obj needs to be an object");
        assert.ok(_is_string(string), "we need a path");
        var results = this.nodes(obj, string, count).map(function (r) {
          return r.value;
        });
        return results;
      };
      JSONPath.prototype.paths = function (obj, string, count) {
        assert.ok(obj instanceof Object, "obj needs to be an object");
        assert.ok(string, "we need a path");
        var results = this.nodes(obj, string, count).map(function (r) {
          return r.path;
        });
        return results;
      };
      JSONPath.prototype.nodes = function (obj, string, count) {
        assert.ok(obj instanceof Object, "obj needs to be an object");
        assert.ok(string, "we need a path");
        if (count === 0) return [];
        var path = this.parser.parse(string);
        var handlers = this.handlers;
        var partials = [{
          path: ['$'],
          value: obj
        }];
        var matches = [];
        if (path.length && path[0].expression.type == 'root') path.shift();
        if (!path.length) return partials;
        path.forEach(function (component, index) {
          if (matches.length >= count) return;
          var handler = handlers.resolve(component);
          var _partials = [];
          partials.forEach(function (p) {
            if (matches.length >= count) return;
            var results = handler(component, p, count);
            if (index == path.length - 1) {
              // if we're through the components we're done
              matches = matches.concat(results || []);
            } else {
              // otherwise accumulate and carry on through
              _partials = _partials.concat(results || []);
            }
          });
          partials = _partials;
        });
        return count ? matches.slice(0, count) : matches;
      };
      JSONPath.prototype.stringify = function (path) {
        assert.ok(path, "we need a path");
        var string = '$';
        var templates = {
          'descendant-member': '..{{value}}',
          'child-member': '.{{value}}',
          'descendant-subscript': '..[{{value}}]',
          'child-subscript': '[{{value}}]'
        };
        path = this._normalize(path);
        path.forEach(function (component) {
          if (component.expression.type == 'root') return;
          var key = [component.scope, component.operation].join('-');
          var template = templates[key];
          var value;
          if (component.expression.type == 'string_literal') {
            value = JSON.stringify(component.expression.value);
          } else {
            value = component.expression.value;
          }
          if (!template) throw new Error("couldn't find template " + key);
          string += template.replace(/{{value}}/, value);
        });
        return string;
      };
      JSONPath.prototype._normalize = function (path) {
        assert.ok(path, "we need a path");
        if (typeof path == "string") {
          return this.parser.parse(path);
        } else if (Array.isArray(path) && typeof path[0] == "string") {
          var _path = [{
            expression: {
              type: "root",
              value: "$"
            }
          }];
          path.forEach(function (component, index) {
            if (component == '$' && index === 0) return;
            if (typeof component == "string" && component.match("^" + dict.identifier + "$")) {
              _path.push({
                operation: 'member',
                scope: 'child',
                expression: {
                  value: component,
                  type: 'identifier'
                }
              });
            } else {
              var type = typeof component == "number" ? 'numeric_literal' : 'string_literal';
              _path.push({
                operation: 'subscript',
                scope: 'child',
                expression: {
                  value: component,
                  type: type
                }
              });
            }
          });
          return _path;
        } else if (Array.isArray(path) && _typeof(path[0]) == "object") {
          return path;
        }
        throw new Error("couldn't understand path " + path);
      };
      function _is_string(obj) {
        return Object.prototype.toString.call(obj) == '[object String]';
      }
      JSONPath.Handlers = Handlers;
      JSONPath.Parser = Parser;
      var instance = new JSONPath();
      instance.JSONPath = JSONPath;
      module.exports = instance;
    }, {
      "./dict": 2,
      "./handlers": 4,
      "./parser": 6,
      "assert": 8
    }],
    6: [function (require, module, exports) {
      var grammar = require('./grammar');
      var gparser = require('../generated/parser');
      var Parser = function Parser() {
        var parser = new gparser.Parser();
        var _parseError = parser.parseError;
        parser.yy.parseError = function () {
          if (parser.yy.ast) {
            parser.yy.ast.initialize();
          }
          _parseError.apply(parser, arguments);
        };
        return parser;
      };
      Parser.grammar = grammar;
      module.exports = Parser;
    }, {
      "../generated/parser": 1,
      "./grammar": 3
    }],
    7: [function (require, module, exports) {
      module.exports = function (arr, start, end, step) {
        if (typeof start == 'string') throw new Error("start cannot be a string");
        if (typeof end == 'string') throw new Error("end cannot be a string");
        if (typeof step == 'string') throw new Error("step cannot be a string");
        var len = arr.length;
        if (step === 0) throw new Error("step cannot be zero");
        step = step ? integer(step) : 1;

        // normalize negative values
        start = start < 0 ? len + start : start;
        end = end < 0 ? len + end : end;

        // default extents to extents
        start = integer(start === 0 ? 0 : !start ? step > 0 ? 0 : len - 1 : start);
        end = integer(end === 0 ? 0 : !end ? step > 0 ? len : -1 : end);

        // clamp extents
        start = step > 0 ? Math.max(0, start) : Math.min(len, start);
        end = step > 0 ? Math.min(end, len) : Math.max(-1, end);

        // return empty if extents are backwards
        if (step > 0 && end <= start) return [];
        if (step < 0 && start <= end) return [];
        var result = [];
        for (var i = start; i != end; i += step) {
          if (step < 0 && i <= end || step > 0 && i >= end) break;
          result.push(arr[i]);
        }
        return result;
      };
      function integer(val) {
        return String(val).match(/^[0-9]+$/) ? parseInt(val) : Number.isFinite(val) ? parseInt(val, 10) : 0;
      }
    }, {}],
    8: [function (require, module, exports) {
      // http://wiki.commonjs.org/wiki/Unit_Testing/1.0
      //
      // THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
      //
      // Originally from narwhal.js (http://narwhaljs.org)
      // Copyright (c) 2009 Thomas Robinson <280north.com>
      //
      // Permission is hereby granted, free of charge, to any person obtaining a copy
      // of this software and associated documentation files (the 'Software'), to
      // deal in the Software without restriction, including without limitation the
      // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
      // sell copies of the Software, and to permit persons to whom the Software is
      // furnished to do so, subject to the following conditions:
      //
      // The above copyright notice and this permission notice shall be included in
      // all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
      // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

      // when used in node, this will actually load the util module we depend on
      // versus loading the builtin util module as happens otherwise
      // this is a bug in node module loading as far as I am concerned
      var util = require('util/');
      var pSlice = Array.prototype.slice;
      var hasOwn = Object.prototype.hasOwnProperty;

      // 1. The assert module provides functions that throw
      // AssertionError's when particular conditions are not met. The
      // assert module must conform to the following interface.

      var assert = module.exports = ok;

      // 2. The AssertionError is defined in assert.
      // new assert.AssertionError({ message: message,
      //                             actual: actual,
      //                             expected: expected })

      assert.AssertionError = function AssertionError(options) {
        this.name = 'AssertionError';
        this.actual = options.actual;
        this.expected = options.expected;
        this.operator = options.operator;
        if (options.message) {
          this.message = options.message;
          this.generatedMessage = false;
        } else {
          this.message = getMessage(this);
          this.generatedMessage = true;
        }
        var stackStartFunction = options.stackStartFunction || fail;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, stackStartFunction);
        } else {
          // non v8 browsers so we can have a stacktrace
          var err = new Error();
          if (err.stack) {
            var out = err.stack;

            // try to strip useless frames
            var fn_name = stackStartFunction.name;
            var idx = out.indexOf('\n' + fn_name);
            if (idx >= 0) {
              // once we have located the function frame
              // we need to strip out everything before it (and its line)
              var next_line = out.indexOf('\n', idx + 1);
              out = out.substring(next_line + 1);
            }
            this.stack = out;
          }
        }
      };

      // assert.AssertionError instanceof Error
      util.inherits(assert.AssertionError, Error);
      function replacer(key, value) {
        if (util.isUndefined(value)) {
          return '' + value;
        }
        if (util.isNumber(value) && !isFinite(value)) {
          return value.toString();
        }
        if (util.isFunction(value) || util.isRegExp(value)) {
          return value.toString();
        }
        return value;
      }
      function truncate(s, n) {
        if (util.isString(s)) {
          return s.length < n ? s : s.slice(0, n);
        } else {
          return s;
        }
      }
      function getMessage(self) {
        return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' + self.operator + ' ' + truncate(JSON.stringify(self.expected, replacer), 128);
      }

      // At present only the three keys mentioned above are used and
      // understood by the spec. Implementations or sub modules can pass
      // other keys to the AssertionError's constructor - they will be
      // ignored.

      // 3. All of the following functions must throw an AssertionError
      // when a corresponding condition is not met, with a message that
      // may be undefined if not provided.  All assertion methods provide
      // both the actual and expected values to the assertion error for
      // display purposes.

      function fail(actual, expected, message, operator, stackStartFunction) {
        throw new assert.AssertionError({
          message: message,
          actual: actual,
          expected: expected,
          operator: operator,
          stackStartFunction: stackStartFunction
        });
      }

      // EXTENSION! allows for well behaved errors defined elsewhere.
      assert.fail = fail;

      // 4. Pure assertion tests whether a value is truthy, as determined
      // by !!guard.
      // assert.ok(guard, message_opt);
      // This statement is equivalent to assert.equal(true, !!guard,
      // message_opt);. To test strictly for the value true, use
      // assert.strictEqual(true, guard, message_opt);.

      function ok(value, message) {
        if (!value) fail(value, true, message, '==', assert.ok);
      }
      assert.ok = ok;

      // 5. The equality assertion tests shallow, coercive equality with
      // ==.
      // assert.equal(actual, expected, message_opt);

      assert.equal = function equal(actual, expected, message) {
        if (actual != expected) fail(actual, expected, message, '==', assert.equal);
      };

      // 6. The non-equality assertion tests for whether two objects are not equal
      // with != assert.notEqual(actual, expected, message_opt);

      assert.notEqual = function notEqual(actual, expected, message) {
        if (actual == expected) {
          fail(actual, expected, message, '!=', assert.notEqual);
        }
      };

      // 7. The equivalence assertion tests a deep equality relation.
      // assert.deepEqual(actual, expected, message_opt);

      assert.deepEqual = function deepEqual(actual, expected, message) {
        if (!_deepEqual(actual, expected)) {
          fail(actual, expected, message, 'deepEqual', assert.deepEqual);
        }
      };
      function _deepEqual(actual, expected) {
        // 7.1. All identical values are equivalent, as determined by ===.
        if (actual === expected) {
          return true;
        } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
          if (actual.length != expected.length) return false;
          for (var i = 0; i < actual.length; i++) {
            if (actual[i] !== expected[i]) return false;
          }
          return true;

          // 7.2. If the expected value is a Date object, the actual value is
          // equivalent if it is also a Date object that refers to the same time.
        } else if (util.isDate(actual) && util.isDate(expected)) {
          return actual.getTime() === expected.getTime();

          // 7.3 If the expected value is a RegExp object, the actual value is
          // equivalent if it is also a RegExp object with the same source and
          // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
        } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
          return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

          // 7.4. Other pairs that do not both pass typeof value == 'object',
          // equivalence is determined by ==.
        } else if (!util.isObject(actual) && !util.isObject(expected)) {
          return actual == expected;

          // 7.5 For all other Object pairs, including Array objects, equivalence is
          // determined by having the same number of owned properties (as verified
          // with Object.prototype.hasOwnProperty.call), the same set of keys
          // (although not necessarily the same order), equivalent values for every
          // corresponding key, and an identical 'prototype' property. Note: this
          // accounts for both named and indexed properties on Arrays.
        } else {
          return objEquiv(actual, expected);
        }
      }
      function isArguments(object) {
        return Object.prototype.toString.call(object) == '[object Arguments]';
      }
      function objEquiv(a, b) {
        if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b)) return false;
        // an identical 'prototype' property.
        if (a.prototype !== b.prototype) return false;
        // if one is a primitive, the other must be same
        if (util.isPrimitive(a) || util.isPrimitive(b)) {
          return a === b;
        }
        var aIsArgs = isArguments(a),
          bIsArgs = isArguments(b);
        if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
        if (aIsArgs) {
          a = pSlice.call(a);
          b = pSlice.call(b);
          return _deepEqual(a, b);
        }
        var ka = objectKeys(a),
          kb = objectKeys(b),
          key,
          i;
        // having the same number of owned properties (keys incorporates
        // hasOwnProperty)
        if (ka.length != kb.length) return false;
        //the same set of keys (although not necessarily the same order),
        ka.sort();
        kb.sort();
        //~~~cheap key test
        for (i = ka.length - 1; i >= 0; i--) {
          if (ka[i] != kb[i]) return false;
        }
        //equivalent values for every corresponding key, and
        //~~~possibly expensive deep test
        for (i = ka.length - 1; i >= 0; i--) {
          key = ka[i];
          if (!_deepEqual(a[key], b[key])) return false;
        }
        return true;
      }

      // 8. The non-equivalence assertion tests for any deep inequality.
      // assert.notDeepEqual(actual, expected, message_opt);

      assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
        if (_deepEqual(actual, expected)) {
          fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
        }
      };

      // 9. The strict equality assertion tests strict equality, as determined by ===.
      // assert.strictEqual(actual, expected, message_opt);

      assert.strictEqual = function strictEqual(actual, expected, message) {
        if (actual !== expected) {
          fail(actual, expected, message, '===', assert.strictEqual);
        }
      };

      // 10. The strict non-equality assertion tests for strict inequality, as
      // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

      assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
        if (actual === expected) {
          fail(actual, expected, message, '!==', assert.notStrictEqual);
        }
      };
      function expectedException(actual, expected) {
        if (!actual || !expected) {
          return false;
        }
        if (Object.prototype.toString.call(expected) == '[object RegExp]') {
          return expected.test(actual);
        } else if (actual instanceof expected) {
          return true;
        } else if (expected.call({}, actual) === true) {
          return true;
        }
        return false;
      }
      function _throws(shouldThrow, block, expected, message) {
        var actual;
        if (util.isString(expected)) {
          message = expected;
          expected = null;
        }
        try {
          block();
        } catch (e) {
          actual = e;
        }
        message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
        if (shouldThrow && !actual) {
          fail(actual, expected, 'Missing expected exception' + message);
        }
        if (!shouldThrow && expectedException(actual, expected)) {
          fail(actual, expected, 'Got unwanted exception' + message);
        }
        if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
          throw actual;
        }
      }

      // 11. Expected to throw an error:
      // assert.throws(block, Error_opt, message_opt);

      assert["throws"] = function (block, /*optional*/error, /*optional*/message) {
        _throws.apply(this, [true].concat(pSlice.call(arguments)));
      };

      // EXTENSION! This is annoying to write outside this module.
      assert.doesNotThrow = function (block, /*optional*/message) {
        _throws.apply(this, [false].concat(pSlice.call(arguments)));
      };
      assert.ifError = function (err) {
        if (err) {
          throw err;
        }
      };
      var objectKeys = Object.keys || function (obj) {
        var keys = [];
        for (var key in obj) {
          if (hasOwn.call(obj, key)) keys.push(key);
        }
        return keys;
      };
    }, {
      "util/": 11
    }],
    9: [function (require, module, exports) {
      if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' module
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        // old school shim for old browsers
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function TempCtor() {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
    }, {}],
    10: [function (require, module, exports) {
      module.exports = function isBuffer(arg) {
        return arg && _typeof(arg) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
      };
    }, {}],
    11: [function (require, module, exports) {
      (function (process, global) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        var formatRegExp = /%[sdj%]/g;
        exports.format = function (f) {
          if (!isString(f)) {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
              objects.push(inspect(arguments[i]));
            }
            return objects.join(' ');
          }
          var i = 1;
          var args = arguments;
          var len = args.length;
          var str = String(f).replace(formatRegExp, function (x) {
            if (x === '%%') return '%';
            if (i >= len) return x;
            switch (x) {
              case '%s':
                return String(args[i++]);
              case '%d':
                return Number(args[i++]);
              case '%j':
                try {
                  return JSON.stringify(args[i++]);
                } catch (_) {
                  return '[Circular]';
                }
              default:
                return x;
            }
          });
          for (var x = args[i]; i < len; x = args[++i]) {
            if (isNull(x) || !isObject(x)) {
              str += ' ' + x;
            } else {
              str += ' ' + inspect(x);
            }
          }
          return str;
        };

        // Mark that a method should not be used.
        // Returns a modified function which warns once by default.
        // If --no-deprecation is set, then it is a no-op.
        exports.deprecate = function (fn, msg) {
          // Allow for deprecating things in the process of starting up.
          if (isUndefined(global.process)) {
            return function () {
              return exports.deprecate(fn, msg).apply(this, arguments);
            };
          }
          if (process.noDeprecation === true) {
            return fn;
          }
          var warned = false;
          function deprecated() {
            if (!warned) {
              if (process.throwDeprecation) {
                throw new Error(msg);
              } else if (process.traceDeprecation) {
                console.trace(msg);
              } else {
                console.error(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }
          return deprecated;
        };
        var debugs = {};
        var debugEnviron;
        exports.debuglog = function (set) {
          if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
          set = set.toUpperCase();
          if (!debugs[set]) {
            if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
              var pid = process.pid;
              debugs[set] = function () {
                var msg = exports.format.apply(exports, arguments);
                console.error('%s %d: %s', set, pid, msg);
              };
            } else {
              debugs[set] = function () {};
            }
          }
          return debugs[set];
        };

        /**
         * Echos the value of a value. Trys to print the value out
         * in the best way possible given the different types.
         *
         * @param {Object} obj The object to print out.
         * @param {Object} opts Optional options object that alters the output.
         */
        /* legacy: obj, showHidden, depth, colors*/
        function inspect(obj, opts) {
          // default options
          var ctx = {
            seen: [],
            stylize: stylizeNoColor
          };
          // legacy...
          if (arguments.length >= 3) ctx.depth = arguments[2];
          if (arguments.length >= 4) ctx.colors = arguments[3];
          if (isBoolean(opts)) {
            // legacy...
            ctx.showHidden = opts;
          } else if (opts) {
            // got an "options" object
            exports._extend(ctx, opts);
          }
          // set default options
          if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
          if (isUndefined(ctx.depth)) ctx.depth = 2;
          if (isUndefined(ctx.colors)) ctx.colors = false;
          if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
          if (ctx.colors) ctx.stylize = stylizeWithColor;
          return formatValue(ctx, obj, ctx.depth);
        }
        exports.inspect = inspect;

        // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
        inspect.colors = {
          'bold': [1, 22],
          'italic': [3, 23],
          'underline': [4, 24],
          'inverse': [7, 27],
          'white': [37, 39],
          'grey': [90, 39],
          'black': [30, 39],
          'blue': [34, 39],
          'cyan': [36, 39],
          'green': [32, 39],
          'magenta': [35, 39],
          'red': [31, 39],
          'yellow': [33, 39]
        };

        // Don't use 'blue' not visible on cmd.exe
        inspect.styles = {
          'special': 'cyan',
          'number': 'yellow',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red'
        };
        function stylizeWithColor(str, styleType) {
          var style = inspect.styles[styleType];
          if (style) {
            return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
          } else {
            return str;
          }
        }
        function stylizeNoColor(str, styleType) {
          return str;
        }
        function arrayToHash(array) {
          var hash = {};
          array.forEach(function (val, idx) {
            hash[val] = true;
          });
          return hash;
        }
        function formatValue(ctx, value, recurseTimes) {
          // Provide a hook for user-specified inspect functions.
          // Check that value is an object with an inspect function on it
          if (ctx.customInspect && value && isFunction(value.inspect) &&
          // Filter out the util module, it's inspect function is special
          value.inspect !== exports.inspect &&
          // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes, ctx);
            if (!isString(ret)) {
              ret = formatValue(ctx, ret, recurseTimes);
            }
            return ret;
          }

          // Primitive types cannot have properties
          var primitive = formatPrimitive(ctx, value);
          if (primitive) {
            return primitive;
          }

          // Look up the keys of the object.
          var keys = Object.keys(value);
          var visibleKeys = arrayToHash(keys);
          if (ctx.showHidden) {
            keys = Object.getOwnPropertyNames(value);
          }

          // IE doesn't make error fields non-enumerable
          // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
          if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
            return formatError(value);
          }

          // Some type of object without properties can be shortcutted.
          if (keys.length === 0) {
            if (isFunction(value)) {
              var name = value.name ? ': ' + value.name : '';
              return ctx.stylize('[Function' + name + ']', 'special');
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toString.call(value), 'date');
            }
            if (isError(value)) {
              return formatError(value);
            }
          }
          var base = '',
            array = false,
            braces = ['{', '}'];

          // Make Array say that they are Array
          if (isArray(value)) {
            array = true;
            braces = ['[', ']'];
          }

          // Make functions say that they are functions
          if (isFunction(value)) {
            var n = value.name ? ': ' + value.name : '';
            base = ' [Function' + n + ']';
          }

          // Make RegExps say that they are RegExps
          if (isRegExp(value)) {
            base = ' ' + RegExp.prototype.toString.call(value);
          }

          // Make dates with properties first say the date
          if (isDate(value)) {
            base = ' ' + Date.prototype.toUTCString.call(value);
          }

          // Make error with message first say the error
          if (isError(value)) {
            base = ' ' + formatError(value);
          }
          if (keys.length === 0 && (!array || value.length == 0)) {
            return braces[0] + base + braces[1];
          }
          if (recurseTimes < 0) {
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            } else {
              return ctx.stylize('[Object]', 'special');
            }
          }
          ctx.seen.push(value);
          var output;
          if (array) {
            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
          } else {
            output = keys.map(function (key) {
              return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            });
          }
          ctx.seen.pop();
          return reduceToSingleString(output, base, braces);
        }
        function formatPrimitive(ctx, value) {
          if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
          if (isString(value)) {
            var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
            return ctx.stylize(simple, 'string');
          }
          if (isNumber(value)) return ctx.stylize('' + value, 'number');
          if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
          // For some reason typeof null is "object", so special case here.
          if (isNull(value)) return ctx.stylize('null', 'null');
        }
        function formatError(value) {
          return '[' + Error.prototype.toString.call(value) + ']';
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
          var output = [];
          for (var i = 0, l = value.length; i < l; ++i) {
            if (hasOwnProperty(value, String(i))) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
            } else {
              output.push('');
            }
          }
          keys.forEach(function (key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
            }
          });
          return output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
          var name, str, desc;
          desc = Object.getOwnPropertyDescriptor(value, key) || {
            value: value[key]
          };
          if (desc.get) {
            if (desc.set) {
              str = ctx.stylize('[Getter/Setter]', 'special');
            } else {
              str = ctx.stylize('[Getter]', 'special');
            }
          } else {
            if (desc.set) {
              str = ctx.stylize('[Setter]', 'special');
            }
          }
          if (!hasOwnProperty(visibleKeys, key)) {
            name = '[' + key + ']';
          }
          if (!str) {
            if (ctx.seen.indexOf(desc.value) < 0) {
              if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
              } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
              }
              if (str.indexOf('\n') > -1) {
                if (array) {
                  str = str.split('\n').map(function (line) {
                    return '  ' + line;
                  }).join('\n').substr(2);
                } else {
                  str = '\n' + str.split('\n').map(function (line) {
                    return '   ' + line;
                  }).join('\n');
                }
              }
            } else {
              str = ctx.stylize('[Circular]', 'special');
            }
          }
          if (isUndefined(name)) {
            if (array && key.match(/^\d+$/)) {
              return str;
            }
            name = JSON.stringify('' + key);
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.substr(1, name.length - 2);
              name = ctx.stylize(name, 'name');
            } else {
              name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
              name = ctx.stylize(name, 'string');
            }
          }
          return name + ': ' + str;
        }
        function reduceToSingleString(output, base, braces) {
          var numLinesEst = 0;
          var length = output.reduce(function (prev, cur) {
            numLinesEst++;
            if (cur.indexOf('\n') >= 0) numLinesEst++;
            return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
          }, 0);
          if (length > 60) {
            return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
          }
          return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
        }

        // NOTE: These type checking functions intentionally don't use `instanceof`
        // because it is fragile and can be easily faked with `Object.create()`.
        function isArray(ar) {
          return Array.isArray(ar);
        }
        exports.isArray = isArray;
        function isBoolean(arg) {
          return typeof arg === 'boolean';
        }
        exports.isBoolean = isBoolean;
        function isNull(arg) {
          return arg === null;
        }
        exports.isNull = isNull;
        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exports.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
          return typeof arg === 'number';
        }
        exports.isNumber = isNumber;
        function isString(arg) {
          return typeof arg === 'string';
        }
        exports.isString = isString;
        function isSymbol(arg) {
          return _typeof(arg) === 'symbol';
        }
        exports.isSymbol = isSymbol;
        function isUndefined(arg) {
          return arg === void 0;
        }
        exports.isUndefined = isUndefined;
        function isRegExp(re) {
          return isObject(re) && objectToString(re) === '[object RegExp]';
        }
        exports.isRegExp = isRegExp;
        function isObject(arg) {
          return _typeof(arg) === 'object' && arg !== null;
        }
        exports.isObject = isObject;
        function isDate(d) {
          return isObject(d) && objectToString(d) === '[object Date]';
        }
        exports.isDate = isDate;
        function isError(e) {
          return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
        }
        exports.isError = isError;
        function isFunction(arg) {
          return typeof arg === 'function';
        }
        exports.isFunction = isFunction;
        function isPrimitive(arg) {
          return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' ||
          // ES6 symbol
          typeof arg === 'undefined';
        }
        exports.isPrimitive = isPrimitive;
        exports.isBuffer = require('./support/isBuffer');
        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }
        function pad(n) {
          return n < 10 ? '0' + n.toString(10) : n.toString(10);
        }
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // 26 Feb 16:19:34
        function timestamp() {
          var d = new Date();
          var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
          return [d.getDate(), months[d.getMonth()], time].join(' ');
        }

        // log is just a thin wrapper to console.log that prepends a timestamp
        exports.log = function () {
          console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
        };

        /**
         * Inherit the prototype methods from one constructor into another.
         *
         * The Function.prototype.inherits from lang.js rewritten as a standalone
         * function (not on Function.prototype). NOTE: If this file is to be loaded
         * during bootstrapping this function needs to be rewritten using some native
         * functions as prototype setup using normal JavaScript does not work as
         * expected during bootstrapping (see mirror.js in r114903).
         *
         * @param {function} ctor Constructor function which needs to inherit the
         *     prototype.
         * @param {function} superCtor Constructor function to inherit prototype from.
         */
        exports.inherits = require('inherits');
        exports._extend = function (origin, add) {
          // Don't do anything if add isn't an object
          if (!add || !isObject(add)) return origin;
          var keys = Object.keys(add);
          var i = keys.length;
          while (i--) {
            origin[keys[i]] = add[keys[i]];
          }
          return origin;
        };
        function hasOwnProperty(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./support/isBuffer": 10,
      "_process": 14,
      "inherits": 9
    }],
    12: [function (require, module, exports) {}, {}],
    13: [function (require, module, exports) {
      (function (process) {
        // .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
        // backported and transplited with Babel, with backwards-compat fixes

        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        // resolves . and .. elements in a path array with directory names there
        // must be no slashes, empty elements, or device names (c:\) in the array
        // (so also no leading and trailing slashes - it does not distinguish
        // relative and absolute paths)
        function normalizeArray(parts, allowAboveRoot) {
          // if the path tries to go above the root, `up` ends up > 0
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === '.') {
              parts.splice(i, 1);
            } else if (last === '..') {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }

          // if the path is allowed to go above the root, restore leading ..s
          if (allowAboveRoot) {
            for (; up--; up) {
              parts.unshift('..');
            }
          }
          return parts;
        }

        // path.resolve([from ...], to)
        // posix version
        exports.resolve = function () {
          var resolvedPath = '',
            resolvedAbsolute = false;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? arguments[i] : process.cwd();

            // Skip empty and invalid entries
            if (typeof path !== 'string') {
              throw new TypeError('Arguments to path.resolve must be strings');
            } else if (!path) {
              continue;
            }
            resolvedPath = path + '/' + resolvedPath;
            resolvedAbsolute = path.charAt(0) === '/';
          }

          // At this point the path should be resolved to a full absolute path, but
          // handle relative paths to be safe (might happen when process.cwd() fails)

          // Normalize the path
          resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
            return !!p;
          }), !resolvedAbsolute).join('/');
          return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
        };

        // path.normalize(path)
        // posix version
        exports.normalize = function (path) {
          var isAbsolute = exports.isAbsolute(path),
            trailingSlash = substr(path, -1) === '/';

          // Normalize the path
          path = normalizeArray(filter(path.split('/'), function (p) {
            return !!p;
          }), !isAbsolute).join('/');
          if (!path && !isAbsolute) {
            path = '.';
          }
          if (path && trailingSlash) {
            path += '/';
          }
          return (isAbsolute ? '/' : '') + path;
        };

        // posix version
        exports.isAbsolute = function (path) {
          return path.charAt(0) === '/';
        };

        // posix version
        exports.join = function () {
          var paths = Array.prototype.slice.call(arguments, 0);
          return exports.normalize(filter(paths, function (p, index) {
            if (typeof p !== 'string') {
              throw new TypeError('Arguments to path.join must be strings');
            }
            return p;
          }).join('/'));
        };

        // path.relative(from, to)
        // posix version
        exports.relative = function (from, to) {
          from = exports.resolve(from).substr(1);
          to = exports.resolve(to).substr(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== '') break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== '') break;
            }
            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split('/'));
          var toParts = trim(to.split('/'));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push('..');
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join('/');
        };
        exports.sep = '/';
        exports.delimiter = ':';
        exports.dirname = function (path) {
          if (typeof path !== 'string') path = path + '';
          if (path.length === 0) return '.';
          var code = path.charCodeAt(0);
          var hasRoot = code === 47 /*/*/;
          var end = -1;
          var matchedSlash = true;
          for (var i = path.length - 1; i >= 1; --i) {
            code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
              if (!matchedSlash) {
                end = i;
                break;
              }
            } else {
              // We saw the first non-path separator
              matchedSlash = false;
            }
          }
          if (end === -1) return hasRoot ? '/' : '.';
          if (hasRoot && end === 1) {
            // return '//';
            // Backwards-compat fix:
            return '/';
          }
          return path.slice(0, end);
        };
        function basename(path) {
          if (typeof path !== 'string') path = path + '';
          var start = 0;
          var end = -1;
          var matchedSlash = true;
          var i;
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47 /*/*/) {
              // If we reached a path separator that was not part of a set of path
              // separators at the end of the string, stop now
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              // We saw the first non-path separator, mark this as the end of our
              // path component
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1) return '';
          return path.slice(start, end);
        }

        // Uses a mixed approach for backwards-compatibility, as ext behavior changed
        // in new Node.js versions, so only basename() above is backported here
        exports.basename = function (path, ext) {
          var f = basename(path);
          if (ext && f.substr(-1 * ext.length) === ext) {
            f = f.substr(0, f.length - ext.length);
          }
          return f;
        };
        exports.extname = function (path) {
          if (typeof path !== 'string') path = path + '';
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          // Track the state of characters (if any) we see before our first dot and
          // after any path separator we find
          var preDotState = 0;
          for (var i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
              // If we reached a path separator that was not part of a set of path
              // separators at the end of the string, stop now
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              // We saw the first non-path separator, mark this as the end of our
              // extension
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46 /*.*/) {
              // If this is our first dot, mark it as the start of our extension
              if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) {
              // We saw a non-dot and non-path separator before our dot, so we should
              // have a good chance at having a non-empty extension
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 ||
          // We saw a non-dot character immediately before the dot
          preDotState === 0 ||
          // The (right-most) trimmed path component is exactly '..'
          preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return '';
          }
          return path.slice(startDot, end);
        };
        function filter(xs, f) {
          if (xs.filter) return xs.filter(f);
          var res = [];
          for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs)) res.push(xs[i]);
          }
          return res;
        }

        // String.prototype.substr - negative index don't work in IE8
        var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
          return str.substr(start, len);
        } : function (str, start, len) {
          if (start < 0) start = str.length + start;
          return str.substr(start, len);
        };
      }).call(this, require('_process'));
    }, {
      "_process": 14
    }],
    14: [function (require, module, exports) {
      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};
      function noop() {}
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;
      process.listeners = function (name) {
        return [];
      };
      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };
      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };
    }, {}],
    15: [function (require, module, exports) {
      var unparse = require('escodegen').generate;
      module.exports = function (ast, vars) {
        if (!vars) vars = {};
        var FAIL = {};
        var result = function walk(node, scopeVars) {
          if (node.type === 'Literal') {
            return node.value;
          } else if (node.type === 'UnaryExpression') {
            var val = walk(node.argument);
            if (node.operator === '+') return +val;
            if (node.operator === '-') return -val;
            if (node.operator === '~') return ~val;
            if (node.operator === '!') return !val;
            return FAIL;
          } else if (node.type === 'ArrayExpression') {
            var xs = [];
            for (var i = 0, l = node.elements.length; i < l; i++) {
              var x = walk(node.elements[i]);
              if (x === FAIL) return FAIL;
              xs.push(x);
            }
            return xs;
          } else if (node.type === 'ObjectExpression') {
            var obj = {};
            for (var i = 0; i < node.properties.length; i++) {
              var prop = node.properties[i];
              var value = prop.value === null ? prop.value : walk(prop.value);
              if (value === FAIL) return FAIL;
              obj[prop.key.value || prop.key.name] = value;
            }
            return obj;
          } else if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
            var l = walk(node.left);
            if (l === FAIL) return FAIL;
            var r = walk(node.right);
            if (r === FAIL) return FAIL;
            var op = node.operator;
            if (op === '==') return l == r;
            if (op === '===') return l === r;
            if (op === '!=') return l != r;
            if (op === '!==') return l !== r;
            if (op === '+') return l + r;
            if (op === '-') return l - r;
            if (op === '*') return l * r;
            if (op === '/') return l / r;
            if (op === '%') return l % r;
            if (op === '<') return l < r;
            if (op === '<=') return l <= r;
            if (op === '>') return l > r;
            if (op === '>=') return l >= r;
            if (op === '|') return l | r;
            if (op === '&') return l & r;
            if (op === '^') return l ^ r;
            if (op === '&&') return l && r;
            if (op === '||') return l || r;
            return FAIL;
          } else if (node.type === 'Identifier') {
            if ({}.hasOwnProperty.call(vars, node.name)) {
              return vars[node.name];
            } else return FAIL;
          } else if (node.type === 'ThisExpression') {
            if ({}.hasOwnProperty.call(vars, 'this')) {
              return vars['this'];
            } else return FAIL;
          } else if (node.type === 'CallExpression') {
            var callee = walk(node.callee);
            if (callee === FAIL) return FAIL;
            if (typeof callee !== 'function') return FAIL;
            var ctx = node.callee.object ? walk(node.callee.object) : FAIL;
            if (ctx === FAIL) ctx = null;
            var args = [];
            for (var i = 0, l = node.arguments.length; i < l; i++) {
              var x = walk(node.arguments[i]);
              if (x === FAIL) return FAIL;
              args.push(x);
            }
            return callee.apply(ctx, args);
          } else if (node.type === 'MemberExpression') {
            var obj = walk(node.object);
            // do not allow access to methods on Function 
            if (obj === FAIL || typeof obj == 'function') {
              return FAIL;
            }
            if (node.property.type === 'Identifier') {
              return obj[node.property.name];
            }
            var prop = walk(node.property);
            if (prop === FAIL) return FAIL;
            return obj[prop];
          } else if (node.type === 'ConditionalExpression') {
            var val = walk(node.test);
            if (val === FAIL) return FAIL;
            return val ? walk(node.consequent) : walk(node.alternate);
          } else if (node.type === 'ExpressionStatement') {
            var val = walk(node.expression);
            if (val === FAIL) return FAIL;
            return val;
          } else if (node.type === 'ReturnStatement') {
            return walk(node.argument);
          } else if (node.type === 'FunctionExpression') {
            var bodies = node.body.body;

            // Create a "scope" for our arguments
            var oldVars = {};
            Object.keys(vars).forEach(function (element) {
              oldVars[element] = vars[element];
            });
            for (var i = 0; i < node.params.length; i++) {
              var key = node.params[i];
              if (key.type == 'Identifier') {
                vars[key.name] = null;
              } else return FAIL;
            }
            for (var i in bodies) {
              if (walk(bodies[i]) === FAIL) {
                return FAIL;
              }
            }
            // restore the vars and scope after we walk
            vars = oldVars;
            var keys = Object.keys(vars);
            var vals = keys.map(function (key) {
              return vars[key];
            });
            return Function(keys.join(', '), 'return ' + unparse(node)).apply(null, vals);
          } else if (node.type === 'TemplateLiteral') {
            var str = '';
            for (var i = 0; i < node.expressions.length; i++) {
              str += walk(node.quasis[i]);
              str += walk(node.expressions[i]);
            }
            str += walk(node.quasis[i]);
            return str;
          } else if (node.type === 'TaggedTemplateExpression') {
            var tag = walk(node.tag);
            var quasi = node.quasi;
            var strings = quasi.quasis.map(walk);
            var values = quasi.expressions.map(walk);
            return tag.apply(null, [strings].concat(values));
          } else if (node.type === 'TemplateElement') {
            return node.value.cooked;
          } else return FAIL;
        }(ast);
        return result === FAIL ? undefined : result;
      };
    }, {
      "escodegen": 12
    }],
    "jsonpath": [function (require, module, exports) {
      module.exports = require('./lib/index');
    }, {
      "./lib/index": 5
    }]
  }, {}, ["jsonpath"])("jsonpath");
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/jwt-decode/build/esm/index.js":
/*!****************************************************!*\
  !*** ./node_modules/jwt-decode/build/esm/index.js ***!
  \****************************************************/
/*! exports provided: InvalidTokenError, jwtDecode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidTokenError", function() { return InvalidTokenError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jwtDecode", function() { return jwtDecode; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var InvalidTokenError = /*#__PURE__*/function (_Error) {
  function InvalidTokenError() {
    _classCallCheck(this, InvalidTokenError);
    return _callSuper(this, InvalidTokenError, arguments);
  }
  _inherits(InvalidTokenError, _Error);
  return _createClass(InvalidTokenError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64UrlDecode(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}
function jwtDecode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }
  options || (options = {});
  var pos = options.header === true ? 0 : 1;
  var part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError("Invalid token specified: missing part #".concat(pos + 1));
  }
  var decoded;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError("Invalid token specified: invalid base64 for part #".concat(pos + 1, " (").concat(e.message, ")"));
  }
  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError("Invalid token specified: invalid json for part #".concat(pos + 1, " (").concat(e.message, ")"));
  }
}

/***/ }),

/***/ "./node_modules/oidc-client-ts/dist/umd/oidc-client-ts.js":
/*!****************************************************************!*\
  !*** ./node_modules/oidc-client-ts/dist/umd/oidc-client-ts.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _excluded = ["timeoutInSeconds"],
  _excluded2 = ["grant_type", "redirect_uri", "client_id", "client_secret"],
  _excluded3 = ["grant_type", "client_id", "client_secret", "scope"],
  _excluded4 = ["grant_type", "client_id", "client_secret", "timeoutInSeconds"],
  _excluded5 = ["url", "authority", "client_id", "redirect_uri", "response_type", "scope", "state_data", "response_mode", "request_type", "client_secret", "nonce", "url_state", "resource", "skipUserInfo", "extraQueryParams", "extraTokenParams", "disablePKCE"],
  _excluded6 = ["redirectMethod"],
  _excluded7 = ["popupWindowFeatures", "popupWindowTarget"],
  _excluded8 = ["silentRequestTimeoutInSeconds"],
  _excluded9 = ["silentRequestTimeoutInSeconds"],
  _excluded10 = ["redirectMethod"],
  _excluded11 = ["popupWindowFeatures", "popupWindowTarget"],
  _excluded12 = ["silentRequestTimeoutInSeconds"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function __export(target, all) {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = function __copyProps(to, from, except, desc) {
  if (from && _typeof(from) === "object" || typeof from === "function") {
    var _iterator = _createForOfIteratorHelper(__getOwnPropNames(from)),
      _step;
    try {
      var _loop = function _loop() {
        var key = _step.value;
        if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: function get() {
            return from[key];
          },
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return to;
};
var __toCommonJS = function __toCommonJS(mod) {
  return __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AccessTokenEvents: function AccessTokenEvents() {
    return _AccessTokenEvents;
  },
  CheckSessionIFrame: function CheckSessionIFrame() {
    return _CheckSessionIFrame;
  },
  ErrorResponse: function ErrorResponse() {
    return _ErrorResponse;
  },
  ErrorTimeout: function ErrorTimeout() {
    return _ErrorTimeout;
  },
  InMemoryWebStorage: function InMemoryWebStorage() {
    return _InMemoryWebStorage;
  },
  Log: function Log() {
    return _Log;
  },
  Logger: function Logger() {
    return _Logger2;
  },
  MetadataService: function MetadataService() {
    return _MetadataService;
  },
  OidcClient: function OidcClient() {
    return _OidcClient;
  },
  OidcClientSettingsStore: function OidcClientSettingsStore() {
    return _OidcClientSettingsStore;
  },
  SessionMonitor: function SessionMonitor() {
    return _SessionMonitor;
  },
  SigninResponse: function SigninResponse() {
    return _SigninResponse;
  },
  SigninState: function SigninState() {
    return _SigninState2;
  },
  SignoutResponse: function SignoutResponse() {
    return _SignoutResponse;
  },
  State: function State() {
    return _State2;
  },
  User: function User() {
    return _User2;
  },
  UserManager: function UserManager() {
    return _UserManager;
  },
  UserManagerSettingsStore: function UserManagerSettingsStore() {
    return _UserManagerSettingsStore;
  },
  Version: function Version() {
    return _Version;
  },
  WebStorageStateStore: function WebStorageStateStore() {
    return _WebStorageStateStore;
  }
});
module.exports = __toCommonJS(src_exports);

// src/utils/Logger.ts
var nopLogger = {
  debug: function debug() {
    return void 0;
  },
  info: function info() {
    return void 0;
  },
  warn: function warn() {
    return void 0;
  },
  error: function error() {
    return void 0;
  }
};
var level;
var logger;
var _Log = /* @__PURE__ */function (Log2) {
  Log2[Log2["NONE"] = 0] = "NONE";
  Log2[Log2["ERROR"] = 1] = "ERROR";
  Log2[Log2["WARN"] = 2] = "WARN";
  Log2[Log2["INFO"] = 3] = "INFO";
  Log2[Log2["DEBUG"] = 4] = "DEBUG";
  return Log2;
}(_Log || {});
(function (Log2) {
  function reset() {
    level = 3 /* INFO */;
    logger = nopLogger;
  }
  Log2.reset = reset;
  function setLevel(value) {
    if (!(0 /* NONE */ <= value && value <= 4 /* DEBUG */)) {
      throw new Error("Invalid log level");
    }
    level = value;
  }
  Log2.setLevel = setLevel;
  function setLogger(value) {
    logger = value;
  }
  Log2.setLogger = setLogger;
})(_Log || (_Log = {}));
var _Logger2 = /*#__PURE__*/function () {
  function _Logger(_name) {
    _classCallCheck(this, _Logger);
    this._name = _name;
  }
  /* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
  return _createClass(_Logger, [{
    key: "debug",
    value: function debug() {
      if (level >= 4 /* DEBUG */) {
        var _logger;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        (_logger = logger).debug.apply(_logger, [_Logger._format(this._name, this._method)].concat(args));
      }
    }
  }, {
    key: "info",
    value: function info() {
      if (level >= 3 /* INFO */) {
        var _logger2;
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        (_logger2 = logger).info.apply(_logger2, [_Logger._format(this._name, this._method)].concat(args));
      }
    }
  }, {
    key: "warn",
    value: function warn() {
      if (level >= 2 /* WARN */) {
        var _logger3;
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        (_logger3 = logger).warn.apply(_logger3, [_Logger._format(this._name, this._method)].concat(args));
      }
    }
  }, {
    key: "error",
    value: function error() {
      if (level >= 1 /* ERROR */) {
        var _logger4;
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        (_logger4 = logger).error.apply(_logger4, [_Logger._format(this._name, this._method)].concat(args));
      }
    }
    /* eslint-enable @typescript-eslint/no-unsafe-enum-comparison */
  }, {
    key: "throw",
    value: function _throw(err) {
      this.error(err);
      throw err;
    }
  }, {
    key: "create",
    value: function create(method) {
      var methodLogger = Object.create(this);
      methodLogger._method = method;
      methodLogger.debug("begin");
      return methodLogger;
    }
  }], [{
    key: "createStatic",
    value: function createStatic(name, staticMethod) {
      var staticLogger = new _Logger("".concat(name, ".").concat(staticMethod));
      staticLogger.debug("begin");
      return staticLogger;
    }
  }, {
    key: "_format",
    value: function _format(name, method) {
      var prefix = "[".concat(name, "]");
      return method ? "".concat(prefix, " ").concat(method, ":") : prefix;
    }
    /* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
    // helpers for static class methods
  }, {
    key: "debug",
    value: function debug(name) {
      if (level >= 4 /* DEBUG */) {
        var _logger5;
        for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }
        (_logger5 = logger).debug.apply(_logger5, [_Logger._format(name)].concat(args));
      }
    }
  }, {
    key: "info",
    value: function info(name) {
      if (level >= 3 /* INFO */) {
        var _logger6;
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        (_logger6 = logger).info.apply(_logger6, [_Logger._format(name)].concat(args));
      }
    }
  }, {
    key: "warn",
    value: function warn(name) {
      if (level >= 2 /* WARN */) {
        var _logger7;
        for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          args[_key7 - 1] = arguments[_key7];
        }
        (_logger7 = logger).warn.apply(_logger7, [_Logger._format(name)].concat(args));
      }
    }
  }, {
    key: "error",
    value: function error(name) {
      if (level >= 1 /* ERROR */) {
        var _logger8;
        for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
          args[_key8 - 1] = arguments[_key8];
        }
        (_logger8 = logger).error.apply(_logger8, [_Logger._format(name)].concat(args));
      }
    }
    /* eslint-enable @typescript-eslint/no-unsafe-enum-comparison */
  }]);
}();
_Log.reset();

// src/utils/CryptoUtils.ts
var UUID_V4_TEMPLATE = "10000000-1000-4000-8000-100000000000";
var toBase64 = function toBase64(val) {
  return btoa(_toConsumableArray(new Uint8Array(val)).map(function (chr) {
    return String.fromCharCode(chr);
  }).join(""));
};
var CryptoUtils = /*#__PURE__*/function () {
  function _CryptoUtils() {
    _classCallCheck(this, _CryptoUtils);
  }
  return _createClass(_CryptoUtils, null, [{
    key: "_randomWord",
    value: function _randomWord() {
      var arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0];
    }
    /**
     * Generates RFC4122 version 4 guid
     */
  }, {
    key: "generateUUIDv4",
    value: function generateUUIDv4() {
      var uuid = UUID_V4_TEMPLATE.replace(/[018]/g, function (c) {
        return (+c ^ _CryptoUtils._randomWord() & 15 >> +c / 4).toString(16);
      });
      return uuid.replace(/-/g, "");
    }
    /**
     * PKCE: Generate a code verifier
     */
  }, {
    key: "generateCodeVerifier",
    value: function generateCodeVerifier() {
      return _CryptoUtils.generateUUIDv4() + _CryptoUtils.generateUUIDv4() + _CryptoUtils.generateUUIDv4();
    }
    /**
     * PKCE: Generate a code challenge
     */
  }, {
    key: "generateCodeChallenge",
    value: (function () {
      var _generateCodeChallenge = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(code_verifier) {
        var encoder, data, hashed;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (crypto.subtle) {
                _context.next = 2;
                break;
              }
              throw new Error("Crypto.subtle is available only in secure contexts (HTTPS).");
            case 2:
              _context.prev = 2;
              encoder = new TextEncoder();
              data = encoder.encode(code_verifier);
              _context.next = 7;
              return crypto.subtle.digest("SHA-256", data);
            case 7:
              hashed = _context.sent;
              return _context.abrupt("return", toBase64(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""));
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              _Logger2.error("CryptoUtils.generateCodeChallenge", _context.t0);
              throw _context.t0;
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 11]]);
      }));
      function generateCodeChallenge(_x) {
        return _generateCodeChallenge.apply(this, arguments);
      }
      return generateCodeChallenge;
    }()
    /**
     * Generates a base64-encoded string for a basic auth header
     */
    )
  }, {
    key: "generateBasicAuth",
    value: function generateBasicAuth(client_id, client_secret) {
      var encoder = new TextEncoder();
      var data = encoder.encode([client_id, client_secret].join(":"));
      return toBase64(data);
    }
  }]);
}();

// src/utils/Event.ts
var Event = /*#__PURE__*/function () {
  function Event(_name) {
    _classCallCheck(this, Event);
    this._name = _name;
    this._logger = new _Logger2("Event('".concat(this._name, "')"));
    this._callbacks = [];
  }
  return _createClass(Event, [{
    key: "addHandler",
    value: function addHandler(cb) {
      var _this = this;
      this._callbacks.push(cb);
      return function () {
        return _this.removeHandler(cb);
      };
    }
  }, {
    key: "removeHandler",
    value: function removeHandler(cb) {
      var idx = this._callbacks.lastIndexOf(cb);
      if (idx >= 0) {
        this._callbacks.splice(idx, 1);
      }
    }
  }, {
    key: "raise",
    value: function () {
      var _raise = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this$_logger;
        var _len9,
          ev,
          _key9,
          _iterator2,
          _step2,
          cb,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              for (_len9 = _args2.length, ev = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                ev[_key9] = _args2[_key9];
              }
              (_this$_logger = this._logger).debug.apply(_this$_logger, ["raise:"].concat(ev));
              _iterator2 = _createForOfIteratorHelper(this._callbacks);
              _context2.prev = 3;
              _iterator2.s();
            case 5:
              if ((_step2 = _iterator2.n()).done) {
                _context2.next = 11;
                break;
              }
              cb = _step2.value;
              _context2.next = 9;
              return cb.apply(void 0, ev);
            case 9:
              _context2.next = 5;
              break;
            case 11:
              _context2.next = 16;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](3);
              _iterator2.e(_context2.t0);
            case 16:
              _context2.prev = 16;
              _iterator2.f();
              return _context2.finish(16);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[3, 13, 16, 19]]);
      }));
      function raise() {
        return _raise.apply(this, arguments);
      }
      return raise;
    }()
  }]);
}();

// src/utils/JwtUtils.ts
var import_jwt_decode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/build/esm/index.js");
var JwtUtils = /*#__PURE__*/function () {
  function JwtUtils() {
    _classCallCheck(this, JwtUtils);
  }
  return _createClass(JwtUtils, null, [{
    key: "decode",
    value:
    // IMPORTANT: doesn't validate the token
    function decode(token) {
      try {
        return (0, import_jwt_decode.jwtDecode)(token);
      } catch (err) {
        _Logger2.error("JwtUtils.decode", err);
        throw err;
      }
    }
  }]);
}();

// src/utils/PopupUtils.ts
var PopupUtils = /*#__PURE__*/function () {
  function PopupUtils() {
    _classCallCheck(this, PopupUtils);
  }
  return _createClass(PopupUtils, null, [{
    key: "center",
    value:
    /**
     * Populates a map of window features with a placement centered in front of
     * the current window. If no explicit width is given, a default value is
     * binned into [800, 720, 600, 480, 360] based on the current window's width.
     */
    function center(_ref) {
      var features = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
      var _a, _b, _c;
      if (features.width == null) features.width = (_a = [800, 720, 600, 480].find(function (width) {
        return width <= window.outerWidth / 1.618;
      })) != null ? _a : 360;
      (_b = features.left) != null ? _b : features.left = Math.max(0, Math.round(window.screenX + (window.outerWidth - features.width) / 2));
      if (features.height != null) (_c = features.top) != null ? _c : features.top = Math.max(0, Math.round(window.screenY + (window.outerHeight - features.height) / 2));
      return features;
    }
  }, {
    key: "serialize",
    value: function serialize(features) {
      return Object.entries(features).filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          value = _ref3[1];
        return value != null;
      }).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];
        return "".concat(key, "=").concat(typeof value !== "boolean" ? value : value ? "yes" : "no");
      }).join(",");
    }
  }]);
}();

// src/utils/Timer.ts
var Timer = /*#__PURE__*/function (_Event) {
  function _Timer() {
    var _this2;
    _classCallCheck(this, _Timer);
    _this2 = _callSuper(this, _Timer, arguments);
    _this2._logger = new _Logger2("Timer('".concat(_this2._name, "')"));
    _this2._timerHandle = null;
    _this2._expiration = 0;
    _this2._callback = function () {
      var diff = _this2._expiration - _Timer.getEpochTime();
      _this2._logger.debug("timer completes in", diff);
      if (_this2._expiration <= _Timer.getEpochTime()) {
        _this2.cancel();
        void _get((_this2, _getPrototypeOf(_Timer.prototype)), "raise", _this2).call(_this2);
      }
    };
    return _this2;
  }
  // get the time
  _inherits(_Timer, _Event);
  return _createClass(_Timer, [{
    key: "init",
    value: function init(durationInSeconds) {
      var logger2 = this._logger.create("init");
      durationInSeconds = Math.max(Math.floor(durationInSeconds), 1);
      var expiration = _Timer.getEpochTime() + durationInSeconds;
      if (this.expiration === expiration && this._timerHandle) {
        logger2.debug("skipping since already initialized for expiration at", this.expiration);
        return;
      }
      this.cancel();
      logger2.debug("using duration", durationInSeconds);
      this._expiration = expiration;
      var timerDurationInSeconds = Math.min(durationInSeconds, 5);
      this._timerHandle = setInterval(this._callback, timerDurationInSeconds * 1e3);
    }
  }, {
    key: "expiration",
    get: function get() {
      return this._expiration;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._logger.create("cancel");
      if (this._timerHandle) {
        clearInterval(this._timerHandle);
        this._timerHandle = null;
      }
    }
  }], [{
    key: "getEpochTime",
    value: function getEpochTime() {
      return Math.floor(Date.now() / 1e3);
    }
  }]);
}(Event);

// src/utils/UrlUtils.ts
var UrlUtils = /*#__PURE__*/function () {
  function UrlUtils() {
    _classCallCheck(this, UrlUtils);
  }
  return _createClass(UrlUtils, null, [{
    key: "readParams",
    value: function readParams(url) {
      var responseMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "query";
      if (!url) throw new TypeError("Invalid URL");
      var parsedUrl = new URL(url, "http://127.0.0.1");
      var params = parsedUrl[responseMode === "fragment" ? "hash" : "search"];
      return new URLSearchParams(params.slice(1));
    }
  }]);
}();
var URL_STATE_DELIMITER = ";";

// src/errors/ErrorResponse.ts
var _ErrorResponse = /*#__PURE__*/function (_Error) {
  function _ErrorResponse(args, form) {
    var _this3;
    _classCallCheck(this, _ErrorResponse);
    var _a, _b, _c;
    _this3 = _callSuper(this, _ErrorResponse, [args.error_description || args.error || ""]);
    _this3.form = form;
    /** Marker to detect class: "ErrorResponse" */
    _this3.name = "ErrorResponse";
    if (!args.error) {
      _Logger2.error("ErrorResponse", "No error passed");
      throw new Error("No error passed");
    }
    _this3.error = args.error;
    _this3.error_description = (_a = args.error_description) != null ? _a : null;
    _this3.error_uri = (_b = args.error_uri) != null ? _b : null;
    _this3.state = args.userState;
    _this3.session_state = (_c = args.session_state) != null ? _c : null;
    _this3.url_state = args.url_state;
    return _this3;
  }
  _inherits(_ErrorResponse, _Error);
  return _createClass(_ErrorResponse);
}( /*#__PURE__*/_wrapNativeSuper(Error));

// src/errors/ErrorTimeout.ts
var _ErrorTimeout = /*#__PURE__*/function (_Error2) {
  function _ErrorTimeout(message) {
    var _this4;
    _classCallCheck(this, _ErrorTimeout);
    _this4 = _callSuper(this, _ErrorTimeout, [message]);
    /** Marker to detect class: "ErrorTimeout" */
    _this4.name = "ErrorTimeout";
    return _this4;
  }
  _inherits(_ErrorTimeout, _Error2);
  return _createClass(_ErrorTimeout);
}( /*#__PURE__*/_wrapNativeSuper(Error));

// src/AccessTokenEvents.ts
var _AccessTokenEvents = /*#__PURE__*/function () {
  function _AccessTokenEvents(args) {
    _classCallCheck(this, _AccessTokenEvents);
    this._logger = new _Logger2("AccessTokenEvents");
    this._expiringTimer = new Timer("Access token expiring");
    this._expiredTimer = new Timer("Access token expired");
    this._expiringNotificationTimeInSeconds = args.expiringNotificationTimeInSeconds;
  }
  return _createClass(_AccessTokenEvents, [{
    key: "load",
    value: function load(container) {
      var logger2 = this._logger.create("load");
      if (container.access_token && container.expires_in !== void 0) {
        var duration = container.expires_in;
        logger2.debug("access token present, remaining duration:", duration);
        if (duration > 0) {
          var expiring = duration - this._expiringNotificationTimeInSeconds;
          if (expiring <= 0) {
            expiring = 1;
          }
          logger2.debug("registering expiring timer, raising in", expiring, "seconds");
          this._expiringTimer.init(expiring);
        } else {
          logger2.debug("canceling existing expiring timer because we're past expiration.");
          this._expiringTimer.cancel();
        }
        var expired = duration + 1;
        logger2.debug("registering expired timer, raising in", expired, "seconds");
        this._expiredTimer.init(expired);
      } else {
        this._expiringTimer.cancel();
        this._expiredTimer.cancel();
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      this._logger.debug("unload: canceling existing access token timers");
      this._expiringTimer.cancel();
      this._expiredTimer.cancel();
    }
    /**
     * Add callback: Raised prior to the access token expiring.
     */
  }, {
    key: "addAccessTokenExpiring",
    value: function addAccessTokenExpiring(cb) {
      return this._expiringTimer.addHandler(cb);
    }
    /**
     * Remove callback: Raised prior to the access token expiring.
     */
  }, {
    key: "removeAccessTokenExpiring",
    value: function removeAccessTokenExpiring(cb) {
      this._expiringTimer.removeHandler(cb);
    }
    /**
     * Add callback: Raised after the access token has expired.
     */
  }, {
    key: "addAccessTokenExpired",
    value: function addAccessTokenExpired(cb) {
      return this._expiredTimer.addHandler(cb);
    }
    /**
     * Remove callback: Raised after the access token has expired.
     */
  }, {
    key: "removeAccessTokenExpired",
    value: function removeAccessTokenExpired(cb) {
      this._expiredTimer.removeHandler(cb);
    }
  }]);
}();

// src/CheckSessionIFrame.ts
var _CheckSessionIFrame = /*#__PURE__*/function () {
  function _CheckSessionIFrame(_callback, _client_id, url, _intervalInSeconds, _stopOnError) {
    var _this5 = this;
    _classCallCheck(this, _CheckSessionIFrame);
    this._callback = _callback;
    this._client_id = _client_id;
    this._intervalInSeconds = _intervalInSeconds;
    this._stopOnError = _stopOnError;
    this._logger = new _Logger2("CheckSessionIFrame");
    this._timer = null;
    this._session_state = null;
    this._message = function (e) {
      if (e.origin === _this5._frame_origin && e.source === _this5._frame.contentWindow) {
        if (e.data === "error") {
          _this5._logger.error("error message from check session op iframe");
          if (_this5._stopOnError) {
            _this5.stop();
          }
        } else if (e.data === "changed") {
          _this5._logger.debug("changed message from check session op iframe");
          _this5.stop();
          void _this5._callback();
        } else {
          _this5._logger.debug(e.data + " message from check session op iframe");
        }
      }
    };
    var parsedUrl = new URL(url);
    this._frame_origin = parsedUrl.origin;
    this._frame = window.document.createElement("iframe");
    this._frame.style.visibility = "hidden";
    this._frame.style.position = "fixed";
    this._frame.style.left = "-1000px";
    this._frame.style.top = "0";
    this._frame.width = "0";
    this._frame.height = "0";
    this._frame.src = parsedUrl.href;
  }
  return _createClass(_CheckSessionIFrame, [{
    key: "load",
    value: function load() {
      var _this6 = this;
      return new Promise(function (resolve) {
        _this6._frame.onload = function () {
          resolve();
        };
        window.document.body.appendChild(_this6._frame);
        window.addEventListener("message", _this6._message, false);
      });
    }
  }, {
    key: "start",
    value: function start(session_state) {
      var _this7 = this;
      if (this._session_state === session_state) {
        return;
      }
      this._logger.create("start");
      this.stop();
      this._session_state = session_state;
      var send = function send() {
        if (!_this7._frame.contentWindow || !_this7._session_state) {
          return;
        }
        _this7._frame.contentWindow.postMessage(_this7._client_id + " " + _this7._session_state, _this7._frame_origin);
      };
      send();
      this._timer = setInterval(send, this._intervalInSeconds * 1e3);
    }
  }, {
    key: "stop",
    value: function stop() {
      this._logger.create("stop");
      this._session_state = null;
      if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
      }
    }
  }]);
}();

// src/InMemoryWebStorage.ts
var _InMemoryWebStorage = /*#__PURE__*/function () {
  function _InMemoryWebStorage() {
    _classCallCheck(this, _InMemoryWebStorage);
    this._logger = new _Logger2("InMemoryWebStorage");
    this._data = {};
  }
  return _createClass(_InMemoryWebStorage, [{
    key: "clear",
    value: function clear() {
      this._logger.create("clear");
      this._data = {};
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      this._logger.create("getItem('".concat(key, "')"));
      return this._data[key];
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this._logger.create("setItem('".concat(key, "')"));
      this._data[key] = value;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this._logger.create("removeItem('".concat(key, "')"));
      delete this._data[key];
    }
  }, {
    key: "length",
    get: function get() {
      return Object.getOwnPropertyNames(this._data).length;
    }
  }, {
    key: "key",
    value: function key(index) {
      return Object.getOwnPropertyNames(this._data)[index];
    }
  }]);
}();

// src/JsonService.ts
var JsonService = /*#__PURE__*/function () {
  function JsonService() {
    var _this$_contentTypes;
    var additionalContentTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _jwtHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var _extraHeaders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, JsonService);
    this._jwtHandler = _jwtHandler;
    this._extraHeaders = _extraHeaders;
    this._logger = new _Logger2("JsonService");
    this._contentTypes = [];
    (_this$_contentTypes = this._contentTypes).push.apply(_this$_contentTypes, _toConsumableArray(additionalContentTypes).concat(["application/json"]));
    if (_jwtHandler) {
      this._contentTypes.push("application/jwt");
    }
  }
  return _createClass(JsonService, [{
    key: "fetchWithTimeout",
    value: function () {
      var _fetchWithTimeout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(input) {
        var init,
          timeoutInSeconds,
          initFetch,
          controller,
          timeoutId,
          response,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              init = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              timeoutInSeconds = init.timeoutInSeconds, initFetch = _objectWithoutProperties(init, _excluded);
              if (timeoutInSeconds) {
                _context3.next = 6;
                break;
              }
              _context3.next = 5;
              return fetch(input, initFetch);
            case 5:
              return _context3.abrupt("return", _context3.sent);
            case 6:
              controller = new AbortController();
              timeoutId = setTimeout(function () {
                return controller.abort();
              }, timeoutInSeconds * 1e3);
              _context3.prev = 8;
              _context3.next = 11;
              return fetch(input, _objectSpread(_objectSpread({}, init), {}, {
                signal: controller.signal
              }));
            case 11:
              response = _context3.sent;
              return _context3.abrupt("return", response);
            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](8);
              if (!(_context3.t0 instanceof DOMException && _context3.t0.name === "AbortError")) {
                _context3.next = 19;
                break;
              }
              throw new _ErrorTimeout("Network timed out");
            case 19:
              throw _context3.t0;
            case 20:
              _context3.prev = 20;
              clearTimeout(timeoutId);
              return _context3.finish(20);
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[8, 15, 20, 23]]);
      }));
      function fetchWithTimeout(_x2) {
        return _fetchWithTimeout.apply(this, arguments);
      }
      return fetchWithTimeout;
    }()
  }, {
    key: "getJson",
    value: function () {
      var _getJson = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url) {
        var _ref6,
          token,
          credentials,
          logger2,
          headers,
          response,
          contentType,
          json,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _ref6 = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {}, token = _ref6.token, credentials = _ref6.credentials;
              logger2 = this._logger.create("getJson");
              headers = {
                "Accept": this._contentTypes.join(", ")
              };
              if (token) {
                logger2.debug("token passed, setting Authorization header");
                headers["Authorization"] = "Bearer " + token;
              }
              this.appendExtraHeaders(headers);
              _context4.prev = 5;
              logger2.debug("url:", url);
              _context4.next = 9;
              return this.fetchWithTimeout(url, {
                method: "GET",
                headers: headers,
                credentials: credentials
              });
            case 9:
              response = _context4.sent;
              _context4.next = 16;
              break;
            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](5);
              logger2.error("Network Error");
              throw _context4.t0;
            case 16:
              logger2.debug("HTTP response received, status", response.status);
              contentType = response.headers.get("Content-Type");
              if (contentType && !this._contentTypes.find(function (item) {
                return contentType.startsWith(item);
              })) {
                logger2["throw"](new Error("Invalid response Content-Type: ".concat(contentType != null ? contentType : "undefined", ", from URL: ").concat(url)));
              }
              if (!(response.ok && this._jwtHandler && (contentType == null ? void 0 : contentType.startsWith("application/jwt")))) {
                _context4.next = 27;
                break;
              }
              _context4.t1 = this;
              _context4.next = 23;
              return response.text();
            case 23:
              _context4.t2 = _context4.sent;
              _context4.next = 26;
              return _context4.t1._jwtHandler.call(_context4.t1, _context4.t2);
            case 26:
              return _context4.abrupt("return", _context4.sent);
            case 27:
              _context4.prev = 27;
              _context4.next = 30;
              return response.json();
            case 30:
              json = _context4.sent;
              _context4.next = 39;
              break;
            case 33:
              _context4.prev = 33;
              _context4.t3 = _context4["catch"](27);
              logger2.error("Error parsing JSON response", _context4.t3);
              if (!response.ok) {
                _context4.next = 38;
                break;
              }
              throw _context4.t3;
            case 38:
              throw new Error("".concat(response.statusText, " (").concat(response.status, ")"));
            case 39:
              if (response.ok) {
                _context4.next = 44;
                break;
              }
              logger2.error("Error from server:", json);
              if (!json.error) {
                _context4.next = 43;
                break;
              }
              throw new _ErrorResponse(json);
            case 43:
              throw new Error("".concat(response.statusText, " (").concat(response.status, "): ").concat(JSON.stringify(json)));
            case 44:
              return _context4.abrupt("return", json);
            case 45:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[5, 12], [27, 33]]);
      }));
      function getJson(_x3) {
        return _getJson.apply(this, arguments);
      }
      return getJson;
    }()
  }, {
    key: "postForm",
    value: function () {
      var _postForm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(url, _ref7) {
        var body, basicAuth, timeoutInSeconds, initCredentials, logger2, headers, response, contentType, responseText, json;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              body = _ref7.body, basicAuth = _ref7.basicAuth, timeoutInSeconds = _ref7.timeoutInSeconds, initCredentials = _ref7.initCredentials;
              logger2 = this._logger.create("postForm");
              headers = {
                "Accept": this._contentTypes.join(", "),
                "Content-Type": "application/x-www-form-urlencoded"
              };
              if (basicAuth !== void 0) {
                headers["Authorization"] = "Basic " + basicAuth;
              }
              this.appendExtraHeaders(headers);
              _context5.prev = 5;
              logger2.debug("url:", url);
              _context5.next = 9;
              return this.fetchWithTimeout(url, {
                method: "POST",
                headers: headers,
                body: body,
                timeoutInSeconds: timeoutInSeconds,
                credentials: initCredentials
              });
            case 9:
              response = _context5.sent;
              _context5.next = 16;
              break;
            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](5);
              logger2.error("Network error");
              throw _context5.t0;
            case 16:
              logger2.debug("HTTP response received, status", response.status);
              contentType = response.headers.get("Content-Type");
              if (!(contentType && !this._contentTypes.find(function (item) {
                return contentType.startsWith(item);
              }))) {
                _context5.next = 20;
                break;
              }
              throw new Error("Invalid response Content-Type: ".concat(contentType != null ? contentType : "undefined", ", from URL: ").concat(url));
            case 20:
              _context5.next = 22;
              return response.text();
            case 22:
              responseText = _context5.sent;
              json = {};
              if (!responseText) {
                _context5.next = 35;
                break;
              }
              _context5.prev = 25;
              json = JSON.parse(responseText);
              _context5.next = 35;
              break;
            case 29:
              _context5.prev = 29;
              _context5.t1 = _context5["catch"](25);
              logger2.error("Error parsing JSON response", _context5.t1);
              if (!response.ok) {
                _context5.next = 34;
                break;
              }
              throw _context5.t1;
            case 34:
              throw new Error("".concat(response.statusText, " (").concat(response.status, ")"));
            case 35:
              if (response.ok) {
                _context5.next = 40;
                break;
              }
              logger2.error("Error from server:", json);
              if (!json.error) {
                _context5.next = 39;
                break;
              }
              throw new _ErrorResponse(json, body);
            case 39:
              throw new Error("".concat(response.statusText, " (").concat(response.status, "): ").concat(JSON.stringify(json)));
            case 40:
              return _context5.abrupt("return", json);
            case 41:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[5, 12], [25, 29]]);
      }));
      function postForm(_x4, _x5) {
        return _postForm.apply(this, arguments);
      }
      return postForm;
    }()
  }, {
    key: "appendExtraHeaders",
    value: function appendExtraHeaders(headers) {
      var _this8 = this;
      var logger2 = this._logger.create("appendExtraHeaders");
      var customKeys = Object.keys(this._extraHeaders);
      var protectedHeaders = ["authorization", "accept", "content-type"];
      if (customKeys.length === 0) {
        return;
      }
      customKeys.forEach(function (headerName) {
        if (protectedHeaders.includes(headerName.toLocaleLowerCase())) {
          logger2.warn("Protected header could not be overridden", headerName, protectedHeaders);
          return;
        }
        var content = typeof _this8._extraHeaders[headerName] === "function" ? _this8._extraHeaders[headerName]() : _this8._extraHeaders[headerName];
        if (content && content !== "") {
          headers[headerName] = content;
        }
      });
    }
  }]);
}();

// src/MetadataService.ts
var _MetadataService = /*#__PURE__*/function () {
  function _MetadataService(_settings) {
    _classCallCheck(this, _MetadataService);
    this._settings = _settings;
    this._logger = new _Logger2("MetadataService");
    this._signingKeys = null;
    this._metadata = null;
    this._metadataUrl = this._settings.metadataUrl;
    this._jsonService = new JsonService(["application/jwk-set+json"], null, this._settings.extraHeaders);
    if (this._settings.signingKeys) {
      this._logger.debug("using signingKeys from settings");
      this._signingKeys = this._settings.signingKeys;
    }
    if (this._settings.metadata) {
      this._logger.debug("using metadata from settings");
      this._metadata = this._settings.metadata;
    }
    if (this._settings.fetchRequestCredentials) {
      this._logger.debug("using fetchRequestCredentials from settings");
      this._fetchRequestCredentials = this._settings.fetchRequestCredentials;
    }
  }
  return _createClass(_MetadataService, [{
    key: "resetSigningKeys",
    value: function resetSigningKeys() {
      this._signingKeys = null;
    }
  }, {
    key: "getMetadata",
    value: function () {
      var _getMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var logger2, metadata;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              logger2 = this._logger.create("getMetadata");
              if (!this._metadata) {
                _context6.next = 4;
                break;
              }
              logger2.debug("using cached values");
              return _context6.abrupt("return", this._metadata);
            case 4:
              if (this._metadataUrl) {
                _context6.next = 7;
                break;
              }
              logger2["throw"](new Error("No authority or metadataUrl configured on settings"));
              throw null;
            case 7:
              logger2.debug("getting metadata from", this._metadataUrl);
              _context6.next = 10;
              return this._jsonService.getJson(this._metadataUrl, {
                credentials: this._fetchRequestCredentials
              });
            case 10:
              metadata = _context6.sent;
              logger2.debug("merging remote JSON with seed metadata");
              this._metadata = Object.assign({}, this._settings.metadataSeed, metadata);
              return _context6.abrupt("return", this._metadata);
            case 14:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getMetadata() {
        return _getMetadata.apply(this, arguments);
      }
      return getMetadata;
    }()
  }, {
    key: "getIssuer",
    value: function getIssuer() {
      return this._getMetadataProperty("issuer");
    }
  }, {
    key: "getAuthorizationEndpoint",
    value: function getAuthorizationEndpoint() {
      return this._getMetadataProperty("authorization_endpoint");
    }
  }, {
    key: "getUserInfoEndpoint",
    value: function getUserInfoEndpoint() {
      return this._getMetadataProperty("userinfo_endpoint");
    }
  }, {
    key: "getTokenEndpoint",
    value: function getTokenEndpoint() {
      var optional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this._getMetadataProperty("token_endpoint", optional);
    }
  }, {
    key: "getCheckSessionIframe",
    value: function getCheckSessionIframe() {
      return this._getMetadataProperty("check_session_iframe", true);
    }
  }, {
    key: "getEndSessionEndpoint",
    value: function getEndSessionEndpoint() {
      return this._getMetadataProperty("end_session_endpoint", true);
    }
  }, {
    key: "getRevocationEndpoint",
    value: function getRevocationEndpoint() {
      var optional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this._getMetadataProperty("revocation_endpoint", optional);
    }
  }, {
    key: "getKeysEndpoint",
    value: function getKeysEndpoint() {
      var optional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this._getMetadataProperty("jwks_uri", optional);
    }
  }, {
    key: "_getMetadataProperty",
    value: function () {
      var _getMetadataProperty2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(name) {
        var optional,
          logger2,
          metadata,
          _args7 = arguments;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              optional = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : false;
              logger2 = this._logger.create("_getMetadataProperty('".concat(name, "')"));
              _context7.next = 4;
              return this.getMetadata();
            case 4:
              metadata = _context7.sent;
              logger2.debug("resolved");
              if (!(metadata[name] === void 0)) {
                _context7.next = 11;
                break;
              }
              if (!(optional === true)) {
                _context7.next = 10;
                break;
              }
              logger2.warn("Metadata does not contain optional property");
              return _context7.abrupt("return", void 0);
            case 10:
              logger2["throw"](new Error("Metadata does not contain property " + name));
            case 11:
              return _context7.abrupt("return", metadata[name]);
            case 12:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function _getMetadataProperty(_x6) {
        return _getMetadataProperty2.apply(this, arguments);
      }
      return _getMetadataProperty;
    }()
  }, {
    key: "getSigningKeys",
    value: function () {
      var _getSigningKeys = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var logger2, jwks_uri, keySet;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              logger2 = this._logger.create("getSigningKeys");
              if (!this._signingKeys) {
                _context8.next = 4;
                break;
              }
              logger2.debug("returning signingKeys from cache");
              return _context8.abrupt("return", this._signingKeys);
            case 4:
              _context8.next = 6;
              return this.getKeysEndpoint(false);
            case 6:
              jwks_uri = _context8.sent;
              logger2.debug("got jwks_uri", jwks_uri);
              _context8.next = 10;
              return this._jsonService.getJson(jwks_uri);
            case 10:
              keySet = _context8.sent;
              logger2.debug("got key set", keySet);
              if (Array.isArray(keySet.keys)) {
                _context8.next = 15;
                break;
              }
              logger2["throw"](new Error("Missing keys on keyset"));
              throw null;
            case 15:
              this._signingKeys = keySet.keys;
              return _context8.abrupt("return", this._signingKeys);
            case 17:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getSigningKeys() {
        return _getSigningKeys.apply(this, arguments);
      }
      return getSigningKeys;
    }()
  }]);
}();

// src/WebStorageStateStore.ts
var _WebStorageStateStore = /*#__PURE__*/function () {
  function _WebStorageStateStore() {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref8$prefix = _ref8.prefix,
      prefix = _ref8$prefix === void 0 ? "oidc." : _ref8$prefix,
      _ref8$store = _ref8.store,
      store = _ref8$store === void 0 ? localStorage : _ref8$store;
    _classCallCheck(this, _WebStorageStateStore);
    this._logger = new _Logger2("WebStorageStateStore");
    this._store = store;
    this._prefix = prefix;
  }
  return _createClass(_WebStorageStateStore, [{
    key: "set",
    value: function () {
      var _set = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(key, value) {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              this._logger.create("set('".concat(key, "')"));
              key = this._prefix + key;
              _context9.next = 4;
              return this._store.setItem(key, value);
            case 4:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function set(_x7, _x8) {
        return _set.apply(this, arguments);
      }
      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(key) {
        var item;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              this._logger.create("get('".concat(key, "')"));
              key = this._prefix + key;
              _context10.next = 4;
              return this._store.getItem(key);
            case 4:
              item = _context10.sent;
              return _context10.abrupt("return", item);
            case 6:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function get(_x9) {
        return _get2.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(key) {
        var item;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              this._logger.create("remove('".concat(key, "')"));
              key = this._prefix + key;
              _context11.next = 4;
              return this._store.getItem(key);
            case 4:
              item = _context11.sent;
              _context11.next = 7;
              return this._store.removeItem(key);
            case 7:
              return _context11.abrupt("return", item);
            case 8:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function remove(_x10) {
        return _remove.apply(this, arguments);
      }
      return remove;
    }()
  }, {
    key: "getAllKeys",
    value: function () {
      var _getAllKeys = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var len, keys, index, key;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              this._logger.create("getAllKeys");
              _context12.next = 3;
              return this._store.length;
            case 3:
              len = _context12.sent;
              keys = [];
              index = 0;
            case 6:
              if (!(index < len)) {
                _context12.next = 14;
                break;
              }
              _context12.next = 9;
              return this._store.key(index);
            case 9:
              key = _context12.sent;
              if (key && key.indexOf(this._prefix) === 0) {
                keys.push(key.substr(this._prefix.length));
              }
            case 11:
              index++;
              _context12.next = 6;
              break;
            case 14:
              return _context12.abrupt("return", keys);
            case 15:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function getAllKeys() {
        return _getAllKeys.apply(this, arguments);
      }
      return getAllKeys;
    }()
  }]);
}();

// src/OidcClientSettings.ts
var DefaultResponseType = "code";
var DefaultScope = "openid";
var DefaultClientAuthentication = "client_secret_post";
var DefaultStaleStateAgeInSeconds = 60 * 15;
var _OidcClientSettingsStore = /*#__PURE__*/_createClass(function _OidcClientSettingsStore(_ref9) {
  var authority = _ref9.authority,
    metadataUrl = _ref9.metadataUrl,
    metadata = _ref9.metadata,
    signingKeys = _ref9.signingKeys,
    metadataSeed = _ref9.metadataSeed,
    client_id = _ref9.client_id,
    client_secret = _ref9.client_secret,
    _ref9$response_type = _ref9.response_type,
    response_type = _ref9$response_type === void 0 ? DefaultResponseType : _ref9$response_type,
    _ref9$scope = _ref9.scope,
    scope = _ref9$scope === void 0 ? DefaultScope : _ref9$scope,
    redirect_uri = _ref9.redirect_uri,
    post_logout_redirect_uri = _ref9.post_logout_redirect_uri,
    _ref9$client_authenti = _ref9.client_authentication,
    client_authentication = _ref9$client_authenti === void 0 ? DefaultClientAuthentication : _ref9$client_authenti,
    prompt = _ref9.prompt,
    display = _ref9.display,
    max_age = _ref9.max_age,
    ui_locales = _ref9.ui_locales,
    acr_values = _ref9.acr_values,
    resource = _ref9.resource,
    response_mode = _ref9.response_mode,
    _ref9$filterProtocolC = _ref9.filterProtocolClaims,
    filterProtocolClaims = _ref9$filterProtocolC === void 0 ? true : _ref9$filterProtocolC,
    _ref9$loadUserInfo = _ref9.loadUserInfo,
    loadUserInfo = _ref9$loadUserInfo === void 0 ? false : _ref9$loadUserInfo,
    _ref9$staleStateAgeIn = _ref9.staleStateAgeInSeconds,
    staleStateAgeInSeconds = _ref9$staleStateAgeIn === void 0 ? DefaultStaleStateAgeInSeconds : _ref9$staleStateAgeIn,
    _ref9$mergeClaimsStra = _ref9.mergeClaimsStrategy,
    mergeClaimsStrategy = _ref9$mergeClaimsStra === void 0 ? {
      array: "replace"
    } : _ref9$mergeClaimsStra,
    _ref9$disablePKCE = _ref9.disablePKCE,
    disablePKCE = _ref9$disablePKCE === void 0 ? false : _ref9$disablePKCE,
    stateStore = _ref9.stateStore,
    revokeTokenAdditionalContentTypes = _ref9.revokeTokenAdditionalContentTypes,
    fetchRequestCredentials = _ref9.fetchRequestCredentials,
    refreshTokenAllowedScope = _ref9.refreshTokenAllowedScope,
    _ref9$extraQueryParam = _ref9.extraQueryParams,
    extraQueryParams = _ref9$extraQueryParam === void 0 ? {} : _ref9$extraQueryParam,
    _ref9$extraTokenParam = _ref9.extraTokenParams,
    extraTokenParams = _ref9$extraTokenParam === void 0 ? {} : _ref9$extraTokenParam,
    _ref9$extraHeaders = _ref9.extraHeaders,
    extraHeaders = _ref9$extraHeaders === void 0 ? {} : _ref9$extraHeaders;
  _classCallCheck(this, _OidcClientSettingsStore);
  this.authority = authority;
  if (metadataUrl) {
    this.metadataUrl = metadataUrl;
  } else {
    this.metadataUrl = authority;
    if (authority) {
      if (!this.metadataUrl.endsWith("/")) {
        this.metadataUrl += "/";
      }
      this.metadataUrl += ".well-known/openid-configuration";
    }
  }
  this.metadata = metadata;
  this.metadataSeed = metadataSeed;
  this.signingKeys = signingKeys;
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.response_type = response_type;
  this.scope = scope;
  this.redirect_uri = redirect_uri;
  this.post_logout_redirect_uri = post_logout_redirect_uri;
  this.client_authentication = client_authentication;
  this.prompt = prompt;
  this.display = display;
  this.max_age = max_age;
  this.ui_locales = ui_locales;
  this.acr_values = acr_values;
  this.resource = resource;
  this.response_mode = response_mode;
  this.filterProtocolClaims = filterProtocolClaims != null ? filterProtocolClaims : true;
  this.loadUserInfo = !!loadUserInfo;
  this.staleStateAgeInSeconds = staleStateAgeInSeconds;
  this.mergeClaimsStrategy = mergeClaimsStrategy;
  this.disablePKCE = !!disablePKCE;
  this.revokeTokenAdditionalContentTypes = revokeTokenAdditionalContentTypes;
  this.fetchRequestCredentials = fetchRequestCredentials ? fetchRequestCredentials : "same-origin";
  if (stateStore) {
    this.stateStore = stateStore;
  } else {
    var store = typeof window !== "undefined" ? window.localStorage : new _InMemoryWebStorage();
    this.stateStore = new _WebStorageStateStore({
      store: store
    });
  }
  this.refreshTokenAllowedScope = refreshTokenAllowedScope;
  this.extraQueryParams = extraQueryParams;
  this.extraTokenParams = extraTokenParams;
  this.extraHeaders = extraHeaders;
});

// src/UserInfoService.ts
var UserInfoService = /*#__PURE__*/function () {
  function UserInfoService(_settings, _metadataService) {
    var _this9 = this;
    _classCallCheck(this, UserInfoService);
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._logger = new _Logger2("UserInfoService");
    this._getClaimsFromJwt = /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(responseText) {
        var logger2, payload;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              logger2 = _this9._logger.create("_getClaimsFromJwt");
              _context13.prev = 1;
              payload = JwtUtils.decode(responseText);
              logger2.debug("JWT decoding successful");
              return _context13.abrupt("return", payload);
            case 7:
              _context13.prev = 7;
              _context13.t0 = _context13["catch"](1);
              logger2.error("Error parsing JWT response");
              throw _context13.t0;
            case 11:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[1, 7]]);
      }));
      return function (_x11) {
        return _ref10.apply(this, arguments);
      };
    }();
    this._jsonService = new JsonService(void 0, this._getClaimsFromJwt, this._settings.extraHeaders);
  }
  return _createClass(UserInfoService, [{
    key: "getClaims",
    value: function () {
      var _getClaims = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(token) {
        var logger2, url, claims;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              logger2 = this._logger.create("getClaims");
              if (!token) {
                this._logger["throw"](new Error("No token passed"));
              }
              _context14.next = 4;
              return this._metadataService.getUserInfoEndpoint();
            case 4:
              url = _context14.sent;
              logger2.debug("got userinfo url", url);
              _context14.next = 8;
              return this._jsonService.getJson(url, {
                token: token,
                credentials: this._settings.fetchRequestCredentials
              });
            case 8:
              claims = _context14.sent;
              logger2.debug("got claims", claims);
              return _context14.abrupt("return", claims);
            case 11:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function getClaims(_x12) {
        return _getClaims.apply(this, arguments);
      }
      return getClaims;
    }()
  }]);
}();

// src/TokenClient.ts
var TokenClient = /*#__PURE__*/function () {
  function TokenClient(_settings, _metadataService) {
    _classCallCheck(this, TokenClient);
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._logger = new _Logger2("TokenClient");
    this._jsonService = new JsonService(this._settings.revokeTokenAdditionalContentTypes, null, this._settings.extraHeaders);
  }
  /**
   * Exchange code.
   *
   * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.1.3
   */
  return _createClass(TokenClient, [{
    key: "exchangeCode",
    value: (function () {
      var _exchangeCode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(_ref11) {
        var _ref11$grant_type, grant_type, _ref11$redirect_uri, redirect_uri, _ref11$client_id, client_id, _ref11$client_secret, client_secret, args, logger2, params, _i, _Object$entries, _Object$entries$_i, key, value, basicAuth, url, response;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _ref11$grant_type = _ref11.grant_type, grant_type = _ref11$grant_type === void 0 ? "authorization_code" : _ref11$grant_type, _ref11$redirect_uri = _ref11.redirect_uri, redirect_uri = _ref11$redirect_uri === void 0 ? this._settings.redirect_uri : _ref11$redirect_uri, _ref11$client_id = _ref11.client_id, client_id = _ref11$client_id === void 0 ? this._settings.client_id : _ref11$client_id, _ref11$client_secret = _ref11.client_secret, client_secret = _ref11$client_secret === void 0 ? this._settings.client_secret : _ref11$client_secret, args = _objectWithoutProperties(_ref11, _excluded2);
              logger2 = this._logger.create("exchangeCode");
              if (!client_id) {
                logger2["throw"](new Error("A client_id is required"));
              }
              if (!redirect_uri) {
                logger2["throw"](new Error("A redirect_uri is required"));
              }
              if (!args.code) {
                logger2["throw"](new Error("A code is required"));
              }
              params = new URLSearchParams({
                grant_type: grant_type,
                redirect_uri: redirect_uri
              });
              for (_i = 0, _Object$entries = Object.entries(args); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                if (value != null) {
                  params.set(key, value);
                }
              }
              _context15.t0 = this._settings.client_authentication;
              _context15.next = _context15.t0 === "client_secret_basic" ? 10 : _context15.t0 === "client_secret_post" ? 15 : 18;
              break;
            case 10:
              if (client_secret) {
                _context15.next = 13;
                break;
              }
              logger2["throw"](new Error("A client_secret is required"));
              throw null;
            case 13:
              basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
              return _context15.abrupt("break", 18);
            case 15:
              params.append("client_id", client_id);
              if (client_secret) {
                params.append("client_secret", client_secret);
              }
              return _context15.abrupt("break", 18);
            case 18:
              _context15.next = 20;
              return this._metadataService.getTokenEndpoint(false);
            case 20:
              url = _context15.sent;
              logger2.debug("got token endpoint");
              _context15.next = 24;
              return this._jsonService.postForm(url, {
                body: params,
                basicAuth: basicAuth,
                initCredentials: this._settings.fetchRequestCredentials
              });
            case 24:
              response = _context15.sent;
              logger2.debug("got response");
              return _context15.abrupt("return", response);
            case 27:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function exchangeCode(_x13) {
        return _exchangeCode.apply(this, arguments);
      }
      return exchangeCode;
    }()
    /**
     * Exchange credentials.
     *
     * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.3.2
     */
    )
  }, {
    key: "exchangeCredentials",
    value: (function () {
      var _exchangeCredentials = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(_ref12) {
        var _ref12$grant_type, grant_type, _ref12$client_id, client_id, _ref12$client_secret, client_secret, _ref12$scope, scope, args, logger2, params, _i2, _Object$entries2, _Object$entries2$_i, key, value, basicAuth, url, response;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _ref12$grant_type = _ref12.grant_type, grant_type = _ref12$grant_type === void 0 ? "password" : _ref12$grant_type, _ref12$client_id = _ref12.client_id, client_id = _ref12$client_id === void 0 ? this._settings.client_id : _ref12$client_id, _ref12$client_secret = _ref12.client_secret, client_secret = _ref12$client_secret === void 0 ? this._settings.client_secret : _ref12$client_secret, _ref12$scope = _ref12.scope, scope = _ref12$scope === void 0 ? this._settings.scope : _ref12$scope, args = _objectWithoutProperties(_ref12, _excluded3);
              logger2 = this._logger.create("exchangeCredentials");
              if (!client_id) {
                logger2["throw"](new Error("A client_id is required"));
              }
              params = new URLSearchParams({
                grant_type: grant_type,
                scope: scope
              });
              for (_i2 = 0, _Object$entries2 = Object.entries(args); _i2 < _Object$entries2.length; _i2++) {
                _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), key = _Object$entries2$_i[0], value = _Object$entries2$_i[1];
                if (value != null) {
                  params.set(key, value);
                }
              }
              _context16.t0 = this._settings.client_authentication;
              _context16.next = _context16.t0 === "client_secret_basic" ? 8 : _context16.t0 === "client_secret_post" ? 13 : 16;
              break;
            case 8:
              if (client_secret) {
                _context16.next = 11;
                break;
              }
              logger2["throw"](new Error("A client_secret is required"));
              throw null;
            case 11:
              basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
              return _context16.abrupt("break", 16);
            case 13:
              params.append("client_id", client_id);
              if (client_secret) {
                params.append("client_secret", client_secret);
              }
              return _context16.abrupt("break", 16);
            case 16:
              _context16.next = 18;
              return this._metadataService.getTokenEndpoint(false);
            case 18:
              url = _context16.sent;
              logger2.debug("got token endpoint");
              _context16.next = 22;
              return this._jsonService.postForm(url, {
                body: params,
                basicAuth: basicAuth,
                initCredentials: this._settings.fetchRequestCredentials
              });
            case 22:
              response = _context16.sent;
              logger2.debug("got response");
              return _context16.abrupt("return", response);
            case 25:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function exchangeCredentials(_x14) {
        return _exchangeCredentials.apply(this, arguments);
      }
      return exchangeCredentials;
    }()
    /**
     * Exchange a refresh token.
     *
     * @see https://www.rfc-editor.org/rfc/rfc6749#section-6
     */
    )
  }, {
    key: "exchangeRefreshToken",
    value: (function () {
      var _exchangeRefreshToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(_ref13) {
        var _ref13$grant_type, grant_type, _ref13$client_id, client_id, _ref13$client_secret, client_secret, timeoutInSeconds, args, logger2, params, _loop2, _i3, _Object$entries3, basicAuth, url, response;
        return _regeneratorRuntime().wrap(function _callee17$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _ref13$grant_type = _ref13.grant_type, grant_type = _ref13$grant_type === void 0 ? "refresh_token" : _ref13$grant_type, _ref13$client_id = _ref13.client_id, client_id = _ref13$client_id === void 0 ? this._settings.client_id : _ref13$client_id, _ref13$client_secret = _ref13.client_secret, client_secret = _ref13$client_secret === void 0 ? this._settings.client_secret : _ref13$client_secret, timeoutInSeconds = _ref13.timeoutInSeconds, args = _objectWithoutProperties(_ref13, _excluded4);
              logger2 = this._logger.create("exchangeRefreshToken");
              if (!client_id) {
                logger2["throw"](new Error("A client_id is required"));
              }
              if (!args.refresh_token) {
                logger2["throw"](new Error("A refresh_token is required"));
              }
              params = new URLSearchParams({
                grant_type: grant_type
              });
              _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
                var _Object$entries3$_i, key, value;
                return _regeneratorRuntime().wrap(function _loop2$(_context17) {
                  while (1) switch (_context17.prev = _context17.next) {
                    case 0:
                      _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2), key = _Object$entries3$_i[0], value = _Object$entries3$_i[1];
                      if (Array.isArray(value)) {
                        value.forEach(function (param) {
                          return params.append(key, param);
                        });
                      } else if (value != null) {
                        params.set(key, value);
                      }
                    case 2:
                    case "end":
                      return _context17.stop();
                  }
                }, _loop2);
              });
              _i3 = 0, _Object$entries3 = Object.entries(args);
            case 7:
              if (!(_i3 < _Object$entries3.length)) {
                _context18.next = 12;
                break;
              }
              return _context18.delegateYield(_loop2(), "t0", 9);
            case 9:
              _i3++;
              _context18.next = 7;
              break;
            case 12:
              _context18.t1 = this._settings.client_authentication;
              _context18.next = _context18.t1 === "client_secret_basic" ? 15 : _context18.t1 === "client_secret_post" ? 20 : 23;
              break;
            case 15:
              if (client_secret) {
                _context18.next = 18;
                break;
              }
              logger2["throw"](new Error("A client_secret is required"));
              throw null;
            case 18:
              basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
              return _context18.abrupt("break", 23);
            case 20:
              params.append("client_id", client_id);
              if (client_secret) {
                params.append("client_secret", client_secret);
              }
              return _context18.abrupt("break", 23);
            case 23:
              _context18.next = 25;
              return this._metadataService.getTokenEndpoint(false);
            case 25:
              url = _context18.sent;
              logger2.debug("got token endpoint");
              _context18.next = 29;
              return this._jsonService.postForm(url, {
                body: params,
                basicAuth: basicAuth,
                timeoutInSeconds: timeoutInSeconds,
                initCredentials: this._settings.fetchRequestCredentials
              });
            case 29:
              response = _context18.sent;
              logger2.debug("got response");
              return _context18.abrupt("return", response);
            case 32:
            case "end":
              return _context18.stop();
          }
        }, _callee17, this);
      }));
      function exchangeRefreshToken(_x15) {
        return _exchangeRefreshToken.apply(this, arguments);
      }
      return exchangeRefreshToken;
    }()
    /**
     * Revoke an access or refresh token.
     *
     * @see https://datatracker.ietf.org/doc/html/rfc7009#section-2.1
     */
    )
  }, {
    key: "revoke",
    value: (function () {
      var _revoke = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(args) {
        var _a, logger2, url, params, _i4, _Object$entries4, _Object$entries4$_i, key, value;
        return _regeneratorRuntime().wrap(function _callee18$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              logger2 = this._logger.create("revoke");
              if (!args.token) {
                logger2["throw"](new Error("A token is required"));
              }
              _context19.next = 4;
              return this._metadataService.getRevocationEndpoint(false);
            case 4:
              url = _context19.sent;
              logger2.debug("got revocation endpoint, revoking ".concat((_a = args.token_type_hint) != null ? _a : "default token type"));
              params = new URLSearchParams();
              for (_i4 = 0, _Object$entries4 = Object.entries(args); _i4 < _Object$entries4.length; _i4++) {
                _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2), key = _Object$entries4$_i[0], value = _Object$entries4$_i[1];
                if (value != null) {
                  params.set(key, value);
                }
              }
              params.set("client_id", this._settings.client_id);
              if (this._settings.client_secret) {
                params.set("client_secret", this._settings.client_secret);
              }
              _context19.next = 12;
              return this._jsonService.postForm(url, {
                body: params
              });
            case 12:
              logger2.debug("got response");
            case 13:
            case "end":
              return _context19.stop();
          }
        }, _callee18, this);
      }));
      function revoke(_x16) {
        return _revoke.apply(this, arguments);
      }
      return revoke;
    }())
  }]);
}();

// src/ResponseValidator.ts
var ResponseValidator = /*#__PURE__*/function () {
  function ResponseValidator(_settings, _metadataService, _claimsService) {
    _classCallCheck(this, ResponseValidator);
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._claimsService = _claimsService;
    this._logger = new _Logger2("ResponseValidator");
    this._userInfoService = new UserInfoService(this._settings, this._metadataService);
    this._tokenClient = new TokenClient(this._settings, this._metadataService);
  }
  return _createClass(ResponseValidator, [{
    key: "validateSigninResponse",
    value: function () {
      var _validateSigninResponse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(response, state) {
        var logger2;
        return _regeneratorRuntime().wrap(function _callee19$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              logger2 = this._logger.create("validateSigninResponse");
              this._processSigninState(response, state);
              logger2.debug("state processed");
              _context20.next = 5;
              return this._processCode(response, state);
            case 5:
              logger2.debug("code processed");
              if (response.isOpenId) {
                this._validateIdTokenAttributes(response);
              }
              logger2.debug("tokens validated");
              _context20.next = 10;
              return this._processClaims(response, state == null ? void 0 : state.skipUserInfo, response.isOpenId);
            case 10:
              logger2.debug("claims processed");
            case 11:
            case "end":
              return _context20.stop();
          }
        }, _callee19, this);
      }));
      function validateSigninResponse(_x17, _x18) {
        return _validateSigninResponse.apply(this, arguments);
      }
      return validateSigninResponse;
    }()
  }, {
    key: "validateCredentialsResponse",
    value: function () {
      var _validateCredentialsResponse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(response, skipUserInfo) {
        var logger2;
        return _regeneratorRuntime().wrap(function _callee20$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              logger2 = this._logger.create("validateCredentialsResponse");
              if (response.isOpenId && !!response.id_token) {
                this._validateIdTokenAttributes(response);
              }
              logger2.debug("tokens validated");
              _context21.next = 5;
              return this._processClaims(response, skipUserInfo, response.isOpenId);
            case 5:
              logger2.debug("claims processed");
            case 6:
            case "end":
              return _context21.stop();
          }
        }, _callee20, this);
      }));
      function validateCredentialsResponse(_x19, _x20) {
        return _validateCredentialsResponse.apply(this, arguments);
      }
      return validateCredentialsResponse;
    }()
  }, {
    key: "validateRefreshResponse",
    value: function () {
      var _validateRefreshResponse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(response, state) {
        var _a, _b, logger2, hasIdToken;
        return _regeneratorRuntime().wrap(function _callee21$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              logger2 = this._logger.create("validateRefreshResponse");
              response.userState = state.data;
              (_a = response.session_state) != null ? _a : response.session_state = state.session_state;
              (_b = response.scope) != null ? _b : response.scope = state.scope;
              if (response.isOpenId && !!response.id_token) {
                this._validateIdTokenAttributes(response, state.id_token);
                logger2.debug("ID Token validated");
              }
              if (!response.id_token) {
                response.id_token = state.id_token;
                response.profile = state.profile;
              }
              hasIdToken = response.isOpenId && !!response.id_token;
              _context22.next = 9;
              return this._processClaims(response, false, hasIdToken);
            case 9:
              logger2.debug("claims processed");
            case 10:
            case "end":
              return _context22.stop();
          }
        }, _callee21, this);
      }));
      function validateRefreshResponse(_x21, _x22) {
        return _validateRefreshResponse.apply(this, arguments);
      }
      return validateRefreshResponse;
    }()
  }, {
    key: "validateSignoutResponse",
    value: function validateSignoutResponse(response, state) {
      var logger2 = this._logger.create("validateSignoutResponse");
      if (state.id !== response.state) {
        logger2["throw"](new Error("State does not match"));
      }
      logger2.debug("state validated");
      response.userState = state.data;
      if (response.error) {
        logger2.warn("Response was error", response.error);
        throw new _ErrorResponse(response);
      }
    }
  }, {
    key: "_processSigninState",
    value: function _processSigninState(response, state) {
      var _a;
      var logger2 = this._logger.create("_processSigninState");
      if (state.id !== response.state) {
        logger2["throw"](new Error("State does not match"));
      }
      if (!state.client_id) {
        logger2["throw"](new Error("No client_id on state"));
      }
      if (!state.authority) {
        logger2["throw"](new Error("No authority on state"));
      }
      if (this._settings.authority !== state.authority) {
        logger2["throw"](new Error("authority mismatch on settings vs. signin state"));
      }
      if (this._settings.client_id && this._settings.client_id !== state.client_id) {
        logger2["throw"](new Error("client_id mismatch on settings vs. signin state"));
      }
      logger2.debug("state validated");
      response.userState = state.data;
      response.url_state = state.url_state;
      (_a = response.scope) != null ? _a : response.scope = state.scope;
      if (response.error) {
        logger2.warn("Response was error", response.error);
        throw new _ErrorResponse(response);
      }
      if (state.code_verifier && !response.code) {
        logger2["throw"](new Error("Expected code in response"));
      }
    }
  }, {
    key: "_processClaims",
    value: function () {
      var _processClaims2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(response) {
        var skipUserInfo,
          validateSub,
          logger2,
          claims,
          _args23 = arguments;
        return _regeneratorRuntime().wrap(function _callee22$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              skipUserInfo = _args23.length > 1 && _args23[1] !== undefined ? _args23[1] : false;
              validateSub = _args23.length > 2 && _args23[2] !== undefined ? _args23[2] : true;
              logger2 = this._logger.create("_processClaims");
              response.profile = this._claimsService.filterProtocolClaims(response.profile);
              if (!(skipUserInfo || !this._settings.loadUserInfo || !response.access_token)) {
                _context23.next = 7;
                break;
              }
              logger2.debug("not loading user info");
              return _context23.abrupt("return");
            case 7:
              logger2.debug("loading user info");
              _context23.next = 10;
              return this._userInfoService.getClaims(response.access_token);
            case 10:
              claims = _context23.sent;
              logger2.debug("user info claims received from user info endpoint");
              if (validateSub && claims.sub !== response.profile.sub) {
                logger2["throw"](new Error("subject from UserInfo response does not match subject in ID Token"));
              }
              response.profile = this._claimsService.mergeClaims(response.profile, this._claimsService.filterProtocolClaims(claims));
              logger2.debug("user info claims received, updated profile:", response.profile);
            case 15:
            case "end":
              return _context23.stop();
          }
        }, _callee22, this);
      }));
      function _processClaims(_x23) {
        return _processClaims2.apply(this, arguments);
      }
      return _processClaims;
    }()
  }, {
    key: "_processCode",
    value: function () {
      var _processCode2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(response, state) {
        var logger2, tokenResponse;
        return _regeneratorRuntime().wrap(function _callee23$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              logger2 = this._logger.create("_processCode");
              if (!response.code) {
                _context24.next = 9;
                break;
              }
              logger2.debug("Validating code");
              _context24.next = 5;
              return this._tokenClient.exchangeCode(_objectSpread({
                client_id: state.client_id,
                client_secret: state.client_secret,
                code: response.code,
                redirect_uri: state.redirect_uri,
                code_verifier: state.code_verifier
              }, state.extraTokenParams));
            case 5:
              tokenResponse = _context24.sent;
              Object.assign(response, tokenResponse);
              _context24.next = 10;
              break;
            case 9:
              logger2.debug("No code to process");
            case 10:
            case "end":
              return _context24.stop();
          }
        }, _callee23, this);
      }));
      function _processCode(_x24, _x25) {
        return _processCode2.apply(this, arguments);
      }
      return _processCode;
    }()
  }, {
    key: "_validateIdTokenAttributes",
    value: function _validateIdTokenAttributes(response, existingToken) {
      var _a;
      var logger2 = this._logger.create("_validateIdTokenAttributes");
      logger2.debug("decoding ID Token JWT");
      var incoming = JwtUtils.decode((_a = response.id_token) != null ? _a : "");
      if (!incoming.sub) {
        logger2["throw"](new Error("ID Token is missing a subject claim"));
      }
      if (existingToken) {
        var existing = JwtUtils.decode(existingToken);
        if (incoming.sub !== existing.sub) {
          logger2["throw"](new Error("sub in id_token does not match current sub"));
        }
        if (incoming.auth_time && incoming.auth_time !== existing.auth_time) {
          logger2["throw"](new Error("auth_time in id_token does not match original auth_time"));
        }
        if (incoming.azp && incoming.azp !== existing.azp) {
          logger2["throw"](new Error("azp in id_token does not match original azp"));
        }
        if (!incoming.azp && existing.azp) {
          logger2["throw"](new Error("azp not in id_token, but present in original id_token"));
        }
      }
      response.profile = incoming;
    }
  }]);
}();

// src/State.ts
var _State2 = /*#__PURE__*/function () {
  function _State(args) {
    _classCallCheck(this, _State);
    this.id = args.id || CryptoUtils.generateUUIDv4();
    this.data = args.data;
    if (args.created && args.created > 0) {
      this.created = args.created;
    } else {
      this.created = Timer.getEpochTime();
    }
    this.request_type = args.request_type;
    this.url_state = args.url_state;
  }
  return _createClass(_State, [{
    key: "toStorageString",
    value: function toStorageString() {
      new _Logger2("State").create("toStorageString");
      return JSON.stringify({
        id: this.id,
        data: this.data,
        created: this.created,
        request_type: this.request_type,
        url_state: this.url_state
      });
    }
  }], [{
    key: "fromStorageString",
    value: function fromStorageString(storageString) {
      _Logger2.createStatic("State", "fromStorageString");
      return Promise.resolve(new _State(JSON.parse(storageString)));
    }
  }, {
    key: "clearStaleState",
    value: function () {
      var _clearStaleState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(storage, age) {
        var logger2, cutoff, keys, i, key, item, remove, state;
        return _regeneratorRuntime().wrap(function _callee24$(_context25) {
          while (1) switch (_context25.prev = _context25.next) {
            case 0:
              logger2 = _Logger2.createStatic("State", "clearStaleState");
              cutoff = Timer.getEpochTime() - age;
              _context25.next = 4;
              return storage.getAllKeys();
            case 4:
              keys = _context25.sent;
              logger2.debug("got keys", keys);
              i = 0;
            case 7:
              if (!(i < keys.length)) {
                _context25.next = 34;
                break;
              }
              key = keys[i];
              _context25.next = 11;
              return storage.get(key);
            case 11:
              item = _context25.sent;
              remove = false;
              if (!item) {
                _context25.next = 28;
                break;
              }
              _context25.prev = 14;
              _context25.next = 17;
              return _State.fromStorageString(item);
            case 17:
              state = _context25.sent;
              logger2.debug("got item from key:", key, state.created);
              if (state.created <= cutoff) {
                remove = true;
              }
              _context25.next = 26;
              break;
            case 22:
              _context25.prev = 22;
              _context25.t0 = _context25["catch"](14);
              logger2.error("Error parsing state for key:", key, _context25.t0);
              remove = true;
            case 26:
              _context25.next = 30;
              break;
            case 28:
              logger2.debug("no item in storage for key:", key);
              remove = true;
            case 30:
              if (remove) {
                logger2.debug("removed item for key:", key);
                void storage.remove(key);
              }
            case 31:
              i++;
              _context25.next = 7;
              break;
            case 34:
            case "end":
              return _context25.stop();
          }
        }, _callee24, null, [[14, 22]]);
      }));
      function clearStaleState(_x26, _x27) {
        return _clearStaleState.apply(this, arguments);
      }
      return clearStaleState;
    }()
  }]);
}();

// src/SigninState.ts
var _SigninState2 = /*#__PURE__*/function (_State3) {
  function _SigninState(args) {
    var _this10;
    _classCallCheck(this, _SigninState);
    _this10 = _callSuper(this, _SigninState, [args]);
    _this10.code_verifier = args.code_verifier;
    _this10.code_challenge = args.code_challenge;
    _this10.authority = args.authority;
    _this10.client_id = args.client_id;
    _this10.redirect_uri = args.redirect_uri;
    _this10.scope = args.scope;
    _this10.client_secret = args.client_secret;
    _this10.extraTokenParams = args.extraTokenParams;
    _this10.response_mode = args.response_mode;
    _this10.skipUserInfo = args.skipUserInfo;
    return _this10;
  }
  _inherits(_SigninState, _State3);
  return _createClass(_SigninState, [{
    key: "toStorageString",
    value: function toStorageString() {
      new _Logger2("SigninState").create("toStorageString");
      return JSON.stringify({
        id: this.id,
        data: this.data,
        created: this.created,
        request_type: this.request_type,
        url_state: this.url_state,
        code_verifier: this.code_verifier,
        authority: this.authority,
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        scope: this.scope,
        client_secret: this.client_secret,
        extraTokenParams: this.extraTokenParams,
        response_mode: this.response_mode,
        skipUserInfo: this.skipUserInfo
      });
    }
  }], [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(args) {
        var code_verifier, code_challenge;
        return _regeneratorRuntime().wrap(function _callee25$(_context26) {
          while (1) switch (_context26.prev = _context26.next) {
            case 0:
              code_verifier = args.code_verifier === true ? CryptoUtils.generateCodeVerifier() : args.code_verifier || void 0;
              if (!code_verifier) {
                _context26.next = 7;
                break;
              }
              _context26.next = 4;
              return CryptoUtils.generateCodeChallenge(code_verifier);
            case 4:
              _context26.t0 = _context26.sent;
              _context26.next = 8;
              break;
            case 7:
              _context26.t0 = void 0;
            case 8:
              code_challenge = _context26.t0;
              return _context26.abrupt("return", new _SigninState(_objectSpread(_objectSpread({}, args), {}, {
                code_verifier: code_verifier,
                code_challenge: code_challenge
              })));
            case 10:
            case "end":
              return _context26.stop();
          }
        }, _callee25);
      }));
      function create(_x28) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "fromStorageString",
    value: function fromStorageString(storageString) {
      _Logger2.createStatic("SigninState", "fromStorageString");
      var data = JSON.parse(storageString);
      return _SigninState.create(data);
    }
  }]);
}(_State2);

// src/SigninRequest.ts
var _SigninRequest = /*#__PURE__*/function () {
  function _SigninRequest(args) {
    _classCallCheck(this, _SigninRequest);
    this.url = args.url;
    this.state = args.state;
  }
  return _createClass(_SigninRequest, null, [{
    key: "create",
    value: function () {
      var _create2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(_ref14) {
        var url, authority, client_id, redirect_uri, response_type, scope, state_data, response_mode, request_type, client_secret, nonce, url_state, resource, skipUserInfo, extraQueryParams, extraTokenParams, disablePKCE, optionalParams, state, parsedUrl, stateParam, resources, _i5, _Object$entries5, _Object$entries5$_i, key, value;
        return _regeneratorRuntime().wrap(function _callee26$(_context27) {
          while (1) switch (_context27.prev = _context27.next) {
            case 0:
              url = _ref14.url, authority = _ref14.authority, client_id = _ref14.client_id, redirect_uri = _ref14.redirect_uri, response_type = _ref14.response_type, scope = _ref14.scope, state_data = _ref14.state_data, response_mode = _ref14.response_mode, request_type = _ref14.request_type, client_secret = _ref14.client_secret, nonce = _ref14.nonce, url_state = _ref14.url_state, resource = _ref14.resource, skipUserInfo = _ref14.skipUserInfo, extraQueryParams = _ref14.extraQueryParams, extraTokenParams = _ref14.extraTokenParams, disablePKCE = _ref14.disablePKCE, optionalParams = _objectWithoutProperties(_ref14, _excluded5);
              if (url) {
                _context27.next = 4;
                break;
              }
              this._logger.error("create: No url passed");
              throw new Error("url");
            case 4:
              if (client_id) {
                _context27.next = 7;
                break;
              }
              this._logger.error("create: No client_id passed");
              throw new Error("client_id");
            case 7:
              if (redirect_uri) {
                _context27.next = 10;
                break;
              }
              this._logger.error("create: No redirect_uri passed");
              throw new Error("redirect_uri");
            case 10:
              if (response_type) {
                _context27.next = 13;
                break;
              }
              this._logger.error("create: No response_type passed");
              throw new Error("response_type");
            case 13:
              if (scope) {
                _context27.next = 16;
                break;
              }
              this._logger.error("create: No scope passed");
              throw new Error("scope");
            case 16:
              if (authority) {
                _context27.next = 19;
                break;
              }
              this._logger.error("create: No authority passed");
              throw new Error("authority");
            case 19:
              _context27.next = 21;
              return _SigninState2.create({
                data: state_data,
                request_type: request_type,
                url_state: url_state,
                code_verifier: !disablePKCE,
                client_id: client_id,
                authority: authority,
                redirect_uri: redirect_uri,
                response_mode: response_mode,
                client_secret: client_secret,
                scope: scope,
                extraTokenParams: extraTokenParams,
                skipUserInfo: skipUserInfo
              });
            case 21:
              state = _context27.sent;
              parsedUrl = new URL(url);
              parsedUrl.searchParams.append("client_id", client_id);
              parsedUrl.searchParams.append("redirect_uri", redirect_uri);
              parsedUrl.searchParams.append("response_type", response_type);
              parsedUrl.searchParams.append("scope", scope);
              if (nonce) {
                parsedUrl.searchParams.append("nonce", nonce);
              }
              stateParam = state.id;
              if (url_state) {
                stateParam = "".concat(stateParam).concat(URL_STATE_DELIMITER).concat(url_state);
              }
              parsedUrl.searchParams.append("state", stateParam);
              if (state.code_challenge) {
                parsedUrl.searchParams.append("code_challenge", state.code_challenge);
                parsedUrl.searchParams.append("code_challenge_method", "S256");
              }
              if (resource) {
                resources = Array.isArray(resource) ? resource : [resource];
                resources.forEach(function (r) {
                  return parsedUrl.searchParams.append("resource", r);
                });
              }
              for (_i5 = 0, _Object$entries5 = Object.entries(_objectSpread(_objectSpread({
                response_mode: response_mode
              }, optionalParams), extraQueryParams)); _i5 < _Object$entries5.length; _i5++) {
                _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2), key = _Object$entries5$_i[0], value = _Object$entries5$_i[1];
                if (value != null) {
                  parsedUrl.searchParams.append(key, value.toString());
                }
              }
              return _context27.abrupt("return", new _SigninRequest({
                url: parsedUrl.href,
                state: state
              }));
            case 35:
            case "end":
              return _context27.stop();
          }
        }, _callee26, this);
      }));
      function create(_x29) {
        return _create2.apply(this, arguments);
      }
      return create;
    }()
  }]);
}();
_SigninRequest._logger = new _Logger2("SigninRequest");
var SigninRequest = _SigninRequest;

// src/SigninResponse.ts
var OidcScope = "openid";
var _SigninResponse = /*#__PURE__*/function () {
  function _SigninResponse(params) {
    _classCallCheck(this, _SigninResponse);
    /** @see {@link User.access_token} */
    this.access_token = "";
    /** @see {@link User.token_type} */
    this.token_type = "";
    /** @see {@link User.profile} */
    this.profile = {};
    this.state = params.get("state");
    this.session_state = params.get("session_state");
    if (this.state) {
      var splitState = decodeURIComponent(this.state).split(URL_STATE_DELIMITER);
      this.state = splitState[0];
      if (splitState.length > 1) {
        this.url_state = splitState.slice(1).join(URL_STATE_DELIMITER);
      }
    }
    this.error = params.get("error");
    this.error_description = params.get("error_description");
    this.error_uri = params.get("error_uri");
    this.code = params.get("code");
  }
  return _createClass(_SigninResponse, [{
    key: "expires_in",
    get: function get() {
      if (this.expires_at === void 0) {
        return void 0;
      }
      return this.expires_at - Timer.getEpochTime();
    },
    set: function set(value) {
      if (typeof value === "string") value = Number(value);
      if (value !== void 0 && value >= 0) {
        this.expires_at = Math.floor(value) + Timer.getEpochTime();
      }
    }
  }, {
    key: "isOpenId",
    get: function get() {
      var _a;
      return ((_a = this.scope) == null ? void 0 : _a.split(" ").includes(OidcScope)) || !!this.id_token;
    }
  }]);
}();

// src/SignoutRequest.ts
var SignoutRequest = /*#__PURE__*/_createClass(function SignoutRequest(_ref15) {
  var url = _ref15.url,
    state_data = _ref15.state_data,
    id_token_hint = _ref15.id_token_hint,
    post_logout_redirect_uri = _ref15.post_logout_redirect_uri,
    extraQueryParams = _ref15.extraQueryParams,
    request_type = _ref15.request_type,
    client_id = _ref15.client_id;
  _classCallCheck(this, SignoutRequest);
  this._logger = new _Logger2("SignoutRequest");
  if (!url) {
    this._logger.error("ctor: No url passed");
    throw new Error("url");
  }
  var parsedUrl = new URL(url);
  if (id_token_hint) {
    parsedUrl.searchParams.append("id_token_hint", id_token_hint);
  }
  if (client_id) {
    parsedUrl.searchParams.append("client_id", client_id);
  }
  if (post_logout_redirect_uri) {
    parsedUrl.searchParams.append("post_logout_redirect_uri", post_logout_redirect_uri);
    if (state_data) {
      this.state = new _State2({
        data: state_data,
        request_type: request_type
      });
      parsedUrl.searchParams.append("state", this.state.id);
    }
  }
  for (var _i6 = 0, _Object$entries6 = Object.entries(_objectSpread({}, extraQueryParams)); _i6 < _Object$entries6.length; _i6++) {
    var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i6], 2),
      key = _Object$entries6$_i[0],
      value = _Object$entries6$_i[1];
    if (value != null) {
      parsedUrl.searchParams.append(key, value.toString());
    }
  }
  this.url = parsedUrl.href;
});

// src/SignoutResponse.ts
var _SignoutResponse = /*#__PURE__*/_createClass(function _SignoutResponse(params) {
  _classCallCheck(this, _SignoutResponse);
  this.state = params.get("state");
  this.error = params.get("error");
  this.error_description = params.get("error_description");
  this.error_uri = params.get("error_uri");
});

// src/ClaimsService.ts
var DefaultProtocolClaims = ["nbf", "jti", "auth_time", "nonce", "acr", "amr", "azp", "at_hash"
// https://openid.net/specs/openid-connect-core-1_0.html#CodeIDToken
];
var InternalRequiredProtocolClaims = ["sub", "iss", "aud", "exp", "iat"];
var ClaimsService = /*#__PURE__*/function () {
  function ClaimsService(_settings) {
    _classCallCheck(this, ClaimsService);
    this._settings = _settings;
    this._logger = new _Logger2("ClaimsService");
  }
  return _createClass(ClaimsService, [{
    key: "filterProtocolClaims",
    value: function filterProtocolClaims(claims) {
      var result = _objectSpread({}, claims);
      if (this._settings.filterProtocolClaims) {
        var protocolClaims;
        if (Array.isArray(this._settings.filterProtocolClaims)) {
          protocolClaims = this._settings.filterProtocolClaims;
        } else {
          protocolClaims = DefaultProtocolClaims;
        }
        var _iterator3 = _createForOfIteratorHelper(protocolClaims),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var claim = _step3.value;
            if (!InternalRequiredProtocolClaims.includes(claim)) {
              delete result[claim];
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return result;
    }
  }, {
    key: "mergeClaims",
    value: function mergeClaims(claims1, claims2) {
      var result = _objectSpread({}, claims1);
      for (var _i7 = 0, _Object$entries7 = Object.entries(claims2); _i7 < _Object$entries7.length; _i7++) {
        var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i7], 2),
          claim = _Object$entries7$_i[0],
          values = _Object$entries7$_i[1];
        if (result[claim] !== values) {
          if (Array.isArray(result[claim]) || Array.isArray(values)) {
            if (this._settings.mergeClaimsStrategy.array == "replace") {
              result[claim] = values;
            } else {
              var mergedValues = Array.isArray(result[claim]) ? result[claim] : [result[claim]];
              var _iterator4 = _createForOfIteratorHelper(Array.isArray(values) ? values : [values]),
                _step4;
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var value = _step4.value;
                  if (!mergedValues.includes(value)) {
                    mergedValues.push(value);
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
              result[claim] = mergedValues;
            }
          } else if (_typeof(result[claim]) === "object" && _typeof(values) === "object") {
            result[claim] = this.mergeClaims(result[claim], values);
          } else {
            result[claim] = values;
          }
        }
      }
      return result;
    }
  }]);
}();

// src/OidcClient.ts
var _OidcClient = /*#__PURE__*/function () {
  function _OidcClient(settings, metadataService) {
    _classCallCheck(this, _OidcClient);
    this._logger = new _Logger2("OidcClient");
    this.settings = settings instanceof _OidcClientSettingsStore ? settings : new _OidcClientSettingsStore(settings);
    this.metadataService = metadataService != null ? metadataService : new _MetadataService(this.settings);
    this._claimsService = new ClaimsService(this.settings);
    this._validator = new ResponseValidator(this.settings, this.metadataService, this._claimsService);
    this._tokenClient = new TokenClient(this.settings, this.metadataService);
  }
  return _createClass(_OidcClient, [{
    key: "createSigninRequest",
    value: function () {
      var _createSigninRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(_ref16) {
        var state, request, request_uri, request_type, id_token_hint, login_hint, skipUserInfo, nonce, url_state, _ref16$response_type, response_type, _ref16$scope, scope, _ref16$redirect_uri, redirect_uri, _ref16$prompt, prompt, _ref16$display, display, _ref16$max_age, max_age, _ref16$ui_locales, ui_locales, _ref16$acr_values, acr_values, _ref16$resource, resource, _ref16$response_mode, response_mode, _ref16$extraQueryPara, extraQueryParams, _ref16$extraTokenPara, extraTokenParams, logger2, url, signinRequest, signinState;
        return _regeneratorRuntime().wrap(function _callee27$(_context28) {
          while (1) switch (_context28.prev = _context28.next) {
            case 0:
              state = _ref16.state, request = _ref16.request, request_uri = _ref16.request_uri, request_type = _ref16.request_type, id_token_hint = _ref16.id_token_hint, login_hint = _ref16.login_hint, skipUserInfo = _ref16.skipUserInfo, nonce = _ref16.nonce, url_state = _ref16.url_state, _ref16$response_type = _ref16.response_type, response_type = _ref16$response_type === void 0 ? this.settings.response_type : _ref16$response_type, _ref16$scope = _ref16.scope, scope = _ref16$scope === void 0 ? this.settings.scope : _ref16$scope, _ref16$redirect_uri = _ref16.redirect_uri, redirect_uri = _ref16$redirect_uri === void 0 ? this.settings.redirect_uri : _ref16$redirect_uri, _ref16$prompt = _ref16.prompt, prompt = _ref16$prompt === void 0 ? this.settings.prompt : _ref16$prompt, _ref16$display = _ref16.display, display = _ref16$display === void 0 ? this.settings.display : _ref16$display, _ref16$max_age = _ref16.max_age, max_age = _ref16$max_age === void 0 ? this.settings.max_age : _ref16$max_age, _ref16$ui_locales = _ref16.ui_locales, ui_locales = _ref16$ui_locales === void 0 ? this.settings.ui_locales : _ref16$ui_locales, _ref16$acr_values = _ref16.acr_values, acr_values = _ref16$acr_values === void 0 ? this.settings.acr_values : _ref16$acr_values, _ref16$resource = _ref16.resource, resource = _ref16$resource === void 0 ? this.settings.resource : _ref16$resource, _ref16$response_mode = _ref16.response_mode, response_mode = _ref16$response_mode === void 0 ? this.settings.response_mode : _ref16$response_mode, _ref16$extraQueryPara = _ref16.extraQueryParams, extraQueryParams = _ref16$extraQueryPara === void 0 ? this.settings.extraQueryParams : _ref16$extraQueryPara, _ref16$extraTokenPara = _ref16.extraTokenParams, extraTokenParams = _ref16$extraTokenPara === void 0 ? this.settings.extraTokenParams : _ref16$extraTokenPara;
              logger2 = this._logger.create("createSigninRequest");
              if (!(response_type !== "code")) {
                _context28.next = 4;
                break;
              }
              throw new Error("Only the Authorization Code flow (with PKCE) is supported");
            case 4:
              _context28.next = 6;
              return this.metadataService.getAuthorizationEndpoint();
            case 6:
              url = _context28.sent;
              logger2.debug("Received authorization endpoint", url);
              _context28.next = 10;
              return SigninRequest.create({
                url: url,
                authority: this.settings.authority,
                client_id: this.settings.client_id,
                redirect_uri: redirect_uri,
                response_type: response_type,
                scope: scope,
                state_data: state,
                url_state: url_state,
                prompt: prompt,
                display: display,
                max_age: max_age,
                ui_locales: ui_locales,
                id_token_hint: id_token_hint,
                login_hint: login_hint,
                acr_values: acr_values,
                resource: resource,
                request: request,
                request_uri: request_uri,
                extraQueryParams: extraQueryParams,
                extraTokenParams: extraTokenParams,
                request_type: request_type,
                response_mode: response_mode,
                client_secret: this.settings.client_secret,
                skipUserInfo: skipUserInfo,
                nonce: nonce,
                disablePKCE: this.settings.disablePKCE
              });
            case 10:
              signinRequest = _context28.sent;
              _context28.next = 13;
              return this.clearStaleState();
            case 13:
              signinState = signinRequest.state;
              _context28.next = 16;
              return this.settings.stateStore.set(signinState.id, signinState.toStorageString());
            case 16:
              return _context28.abrupt("return", signinRequest);
            case 17:
            case "end":
              return _context28.stop();
          }
        }, _callee27, this);
      }));
      function createSigninRequest(_x30) {
        return _createSigninRequest.apply(this, arguments);
      }
      return createSigninRequest;
    }()
  }, {
    key: "readSigninResponseState",
    value: function () {
      var _readSigninResponseState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(url) {
        var removeState,
          logger2,
          response,
          storedStateString,
          state,
          _args29 = arguments;
        return _regeneratorRuntime().wrap(function _callee28$(_context29) {
          while (1) switch (_context29.prev = _context29.next) {
            case 0:
              removeState = _args29.length > 1 && _args29[1] !== undefined ? _args29[1] : false;
              logger2 = this._logger.create("readSigninResponseState");
              response = new _SigninResponse(UrlUtils.readParams(url, this.settings.response_mode));
              if (response.state) {
                _context29.next = 6;
                break;
              }
              logger2["throw"](new Error("No state in response"));
              throw null;
            case 6:
              _context29.next = 8;
              return this.settings.stateStore[removeState ? "remove" : "get"](response.state);
            case 8:
              storedStateString = _context29.sent;
              if (storedStateString) {
                _context29.next = 12;
                break;
              }
              logger2["throw"](new Error("No matching state found in storage"));
              throw null;
            case 12:
              _context29.next = 14;
              return _SigninState2.fromStorageString(storedStateString);
            case 14:
              state = _context29.sent;
              return _context29.abrupt("return", {
                state: state,
                response: response
              });
            case 16:
            case "end":
              return _context29.stop();
          }
        }, _callee28, this);
      }));
      function readSigninResponseState(_x31) {
        return _readSigninResponseState.apply(this, arguments);
      }
      return readSigninResponseState;
    }()
  }, {
    key: "processSigninResponse",
    value: function () {
      var _processSigninResponse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(url) {
        var logger2, _yield$this$readSigni, state, response;
        return _regeneratorRuntime().wrap(function _callee29$(_context30) {
          while (1) switch (_context30.prev = _context30.next) {
            case 0:
              logger2 = this._logger.create("processSigninResponse");
              _context30.next = 3;
              return this.readSigninResponseState(url, true);
            case 3:
              _yield$this$readSigni = _context30.sent;
              state = _yield$this$readSigni.state;
              response = _yield$this$readSigni.response;
              logger2.debug("received state from storage; validating response");
              _context30.next = 9;
              return this._validator.validateSigninResponse(response, state);
            case 9:
              return _context30.abrupt("return", response);
            case 10:
            case "end":
              return _context30.stop();
          }
        }, _callee29, this);
      }));
      function processSigninResponse(_x32) {
        return _processSigninResponse.apply(this, arguments);
      }
      return processSigninResponse;
    }()
  }, {
    key: "processResourceOwnerPasswordCredentials",
    value: function () {
      var _processResourceOwnerPasswordCredentials = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(_ref17) {
        var username, password, _ref17$skipUserInfo, skipUserInfo, _ref17$extraTokenPara, extraTokenParams, tokenResponse, signinResponse;
        return _regeneratorRuntime().wrap(function _callee30$(_context31) {
          while (1) switch (_context31.prev = _context31.next) {
            case 0:
              username = _ref17.username, password = _ref17.password, _ref17$skipUserInfo = _ref17.skipUserInfo, skipUserInfo = _ref17$skipUserInfo === void 0 ? false : _ref17$skipUserInfo, _ref17$extraTokenPara = _ref17.extraTokenParams, extraTokenParams = _ref17$extraTokenPara === void 0 ? {} : _ref17$extraTokenPara;
              _context31.next = 3;
              return this._tokenClient.exchangeCredentials(_objectSpread({
                username: username,
                password: password
              }, extraTokenParams));
            case 3:
              tokenResponse = _context31.sent;
              signinResponse = new _SigninResponse(new URLSearchParams());
              Object.assign(signinResponse, tokenResponse);
              _context31.next = 8;
              return this._validator.validateCredentialsResponse(signinResponse, skipUserInfo);
            case 8:
              return _context31.abrupt("return", signinResponse);
            case 9:
            case "end":
              return _context31.stop();
          }
        }, _callee30, this);
      }));
      function processResourceOwnerPasswordCredentials(_x33) {
        return _processResourceOwnerPasswordCredentials.apply(this, arguments);
      }
      return processResourceOwnerPasswordCredentials;
    }()
  }, {
    key: "useRefreshToken",
    value: function () {
      var _useRefreshToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(_ref18) {
        var state, redirect_uri, resource, timeoutInSeconds, extraTokenParams, _a, logger2, scope, allowableScopes, providedScopes, result, response;
        return _regeneratorRuntime().wrap(function _callee31$(_context32) {
          while (1) switch (_context32.prev = _context32.next) {
            case 0:
              state = _ref18.state, redirect_uri = _ref18.redirect_uri, resource = _ref18.resource, timeoutInSeconds = _ref18.timeoutInSeconds, extraTokenParams = _ref18.extraTokenParams;
              logger2 = this._logger.create("useRefreshToken");
              if (this.settings.refreshTokenAllowedScope === void 0) {
                scope = state.scope;
              } else {
                allowableScopes = this.settings.refreshTokenAllowedScope.split(" ");
                providedScopes = ((_a = state.scope) == null ? void 0 : _a.split(" ")) || [];
                scope = providedScopes.filter(function (s) {
                  return allowableScopes.includes(s);
                }).join(" ");
              }
              _context32.next = 5;
              return this._tokenClient.exchangeRefreshToken(_objectSpread({
                refresh_token: state.refresh_token,
                // provide the (possible filtered) scope list
                scope: scope,
                redirect_uri: redirect_uri,
                resource: resource,
                timeoutInSeconds: timeoutInSeconds
              }, extraTokenParams));
            case 5:
              result = _context32.sent;
              response = new _SigninResponse(new URLSearchParams());
              Object.assign(response, result);
              logger2.debug("validating response", response);
              _context32.next = 11;
              return this._validator.validateRefreshResponse(response, _objectSpread(_objectSpread({}, state), {}, {
                // override the scope in the state handed over to the validator
                // so it can set the granted scope to the requested scope in case none is included in the response
                scope: scope
              }));
            case 11:
              return _context32.abrupt("return", response);
            case 12:
            case "end":
              return _context32.stop();
          }
        }, _callee31, this);
      }));
      function useRefreshToken(_x34) {
        return _useRefreshToken.apply(this, arguments);
      }
      return useRefreshToken;
    }()
  }, {
    key: "createSignoutRequest",
    value: function () {
      var _createSignoutRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32() {
        var _ref19,
          state,
          id_token_hint,
          client_id,
          request_type,
          _ref19$post_logout_re,
          post_logout_redirect_uri,
          _ref19$extraQueryPara,
          extraQueryParams,
          logger2,
          url,
          request,
          signoutState,
          _args33 = arguments;
        return _regeneratorRuntime().wrap(function _callee32$(_context33) {
          while (1) switch (_context33.prev = _context33.next) {
            case 0:
              _ref19 = _args33.length > 0 && _args33[0] !== undefined ? _args33[0] : {}, state = _ref19.state, id_token_hint = _ref19.id_token_hint, client_id = _ref19.client_id, request_type = _ref19.request_type, _ref19$post_logout_re = _ref19.post_logout_redirect_uri, post_logout_redirect_uri = _ref19$post_logout_re === void 0 ? this.settings.post_logout_redirect_uri : _ref19$post_logout_re, _ref19$extraQueryPara = _ref19.extraQueryParams, extraQueryParams = _ref19$extraQueryPara === void 0 ? this.settings.extraQueryParams : _ref19$extraQueryPara;
              logger2 = this._logger.create("createSignoutRequest");
              _context33.next = 4;
              return this.metadataService.getEndSessionEndpoint();
            case 4:
              url = _context33.sent;
              if (url) {
                _context33.next = 8;
                break;
              }
              logger2["throw"](new Error("No end session endpoint"));
              throw null;
            case 8:
              logger2.debug("Received end session endpoint", url);
              if (!client_id && post_logout_redirect_uri && !id_token_hint) {
                client_id = this.settings.client_id;
              }
              request = new SignoutRequest({
                url: url,
                id_token_hint: id_token_hint,
                client_id: client_id,
                post_logout_redirect_uri: post_logout_redirect_uri,
                state_data: state,
                extraQueryParams: extraQueryParams,
                request_type: request_type
              });
              _context33.next = 13;
              return this.clearStaleState();
            case 13:
              signoutState = request.state;
              if (!signoutState) {
                _context33.next = 18;
                break;
              }
              logger2.debug("Signout request has state to persist");
              _context33.next = 18;
              return this.settings.stateStore.set(signoutState.id, signoutState.toStorageString());
            case 18:
              return _context33.abrupt("return", request);
            case 19:
            case "end":
              return _context33.stop();
          }
        }, _callee32, this);
      }));
      function createSignoutRequest() {
        return _createSignoutRequest.apply(this, arguments);
      }
      return createSignoutRequest;
    }()
  }, {
    key: "readSignoutResponseState",
    value: function () {
      var _readSignoutResponseState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(url) {
        var removeState,
          logger2,
          response,
          storedStateString,
          state,
          _args34 = arguments;
        return _regeneratorRuntime().wrap(function _callee33$(_context34) {
          while (1) switch (_context34.prev = _context34.next) {
            case 0:
              removeState = _args34.length > 1 && _args34[1] !== undefined ? _args34[1] : false;
              logger2 = this._logger.create("readSignoutResponseState");
              response = new _SignoutResponse(UrlUtils.readParams(url, this.settings.response_mode));
              if (response.state) {
                _context34.next = 9;
                break;
              }
              logger2.debug("No state in response");
              if (!response.error) {
                _context34.next = 8;
                break;
              }
              logger2.warn("Response was error:", response.error);
              throw new _ErrorResponse(response);
            case 8:
              return _context34.abrupt("return", {
                state: void 0,
                response: response
              });
            case 9:
              _context34.next = 11;
              return this.settings.stateStore[removeState ? "remove" : "get"](response.state);
            case 11:
              storedStateString = _context34.sent;
              if (storedStateString) {
                _context34.next = 15;
                break;
              }
              logger2["throw"](new Error("No matching state found in storage"));
              throw null;
            case 15:
              _context34.next = 17;
              return _State2.fromStorageString(storedStateString);
            case 17:
              state = _context34.sent;
              return _context34.abrupt("return", {
                state: state,
                response: response
              });
            case 19:
            case "end":
              return _context34.stop();
          }
        }, _callee33, this);
      }));
      function readSignoutResponseState(_x35) {
        return _readSignoutResponseState.apply(this, arguments);
      }
      return readSignoutResponseState;
    }()
  }, {
    key: "processSignoutResponse",
    value: function () {
      var _processSignoutResponse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(url) {
        var logger2, _yield$this$readSigno, state, response;
        return _regeneratorRuntime().wrap(function _callee34$(_context35) {
          while (1) switch (_context35.prev = _context35.next) {
            case 0:
              logger2 = this._logger.create("processSignoutResponse");
              _context35.next = 3;
              return this.readSignoutResponseState(url, true);
            case 3:
              _yield$this$readSigno = _context35.sent;
              state = _yield$this$readSigno.state;
              response = _yield$this$readSigno.response;
              if (state) {
                logger2.debug("Received state from storage; validating response");
                this._validator.validateSignoutResponse(response, state);
              } else {
                logger2.debug("No state from storage; skipping response validation");
              }
              return _context35.abrupt("return", response);
            case 8:
            case "end":
              return _context35.stop();
          }
        }, _callee34, this);
      }));
      function processSignoutResponse(_x36) {
        return _processSignoutResponse.apply(this, arguments);
      }
      return processSignoutResponse;
    }()
  }, {
    key: "clearStaleState",
    value: function clearStaleState() {
      this._logger.create("clearStaleState");
      return _State2.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
    }
  }, {
    key: "revokeToken",
    value: function () {
      var _revokeToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35(token, type) {
        return _regeneratorRuntime().wrap(function _callee35$(_context36) {
          while (1) switch (_context36.prev = _context36.next) {
            case 0:
              this._logger.create("revokeToken");
              _context36.next = 3;
              return this._tokenClient.revoke({
                token: token,
                token_type_hint: type
              });
            case 3:
              return _context36.abrupt("return", _context36.sent);
            case 4:
            case "end":
              return _context36.stop();
          }
        }, _callee35, this);
      }));
      function revokeToken(_x37, _x38) {
        return _revokeToken.apply(this, arguments);
      }
      return revokeToken;
    }()
  }]);
}();

// src/SessionMonitor.ts
var _SessionMonitor = /*#__PURE__*/function () {
  function _SessionMonitor(_userManager) {
    var _this11 = this;
    _classCallCheck(this, _SessionMonitor);
    this._userManager = _userManager;
    this._logger = new _Logger2("SessionMonitor");
    this._start = /*#__PURE__*/function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(user) {
        var session_state, logger2, url, client_id, intervalInSeconds, stopOnError, checkSessionIFrame;
        return _regeneratorRuntime().wrap(function _callee36$(_context37) {
          while (1) switch (_context37.prev = _context37.next) {
            case 0:
              session_state = user.session_state;
              if (session_state) {
                _context37.next = 3;
                break;
              }
              return _context37.abrupt("return");
            case 3:
              logger2 = _this11._logger.create("_start");
              if (user.profile) {
                _this11._sub = user.profile.sub;
                logger2.debug("session_state", session_state, ", sub", _this11._sub);
              } else {
                _this11._sub = void 0;
                logger2.debug("session_state", session_state, ", anonymous user");
              }
              if (!_this11._checkSessionIFrame) {
                _context37.next = 8;
                break;
              }
              _this11._checkSessionIFrame.start(session_state);
              return _context37.abrupt("return");
            case 8:
              _context37.prev = 8;
              _context37.next = 11;
              return _this11._userManager.metadataService.getCheckSessionIframe();
            case 11:
              url = _context37.sent;
              if (!url) {
                _context37.next = 24;
                break;
              }
              logger2.debug("initializing check session iframe");
              client_id = _this11._userManager.settings.client_id;
              intervalInSeconds = _this11._userManager.settings.checkSessionIntervalInSeconds;
              stopOnError = _this11._userManager.settings.stopCheckSessionOnError;
              checkSessionIFrame = new _CheckSessionIFrame(_this11._callback, client_id, url, intervalInSeconds, stopOnError);
              _context37.next = 20;
              return checkSessionIFrame.load();
            case 20:
              _this11._checkSessionIFrame = checkSessionIFrame;
              checkSessionIFrame.start(session_state);
              _context37.next = 25;
              break;
            case 24:
              logger2.warn("no check session iframe found in the metadata");
            case 25:
              _context37.next = 30;
              break;
            case 27:
              _context37.prev = 27;
              _context37.t0 = _context37["catch"](8);
              logger2.error("Error from getCheckSessionIframe:", _context37.t0 instanceof Error ? _context37.t0.message : _context37.t0);
            case 30:
            case "end":
              return _context37.stop();
          }
        }, _callee36, null, [[8, 27]]);
      }));
      return function (_x39) {
        return _ref20.apply(this, arguments);
      };
    }();
    this._stop = function () {
      var logger2 = _this11._logger.create("_stop");
      _this11._sub = void 0;
      if (_this11._checkSessionIFrame) {
        _this11._checkSessionIFrame.stop();
      }
      if (_this11._userManager.settings.monitorAnonymousSession) {
        var timerHandle = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37() {
          var session, tmpUser;
          return _regeneratorRuntime().wrap(function _callee37$(_context38) {
            while (1) switch (_context38.prev = _context38.next) {
              case 0:
                clearInterval(timerHandle);
                _context38.prev = 1;
                _context38.next = 4;
                return _this11._userManager.querySessionStatus();
              case 4:
                session = _context38.sent;
                if (session) {
                  tmpUser = {
                    session_state: session.session_state,
                    profile: session.sub ? {
                      sub: session.sub
                    } : null
                  };
                  void _this11._start(tmpUser);
                }
                _context38.next = 11;
                break;
              case 8:
                _context38.prev = 8;
                _context38.t0 = _context38["catch"](1);
                logger2.error("error from querySessionStatus", _context38.t0 instanceof Error ? _context38.t0.message : _context38.t0);
              case 11:
              case "end":
                return _context38.stop();
            }
          }, _callee37, null, [[1, 8]]);
        })), 1e3);
      }
    };
    this._callback = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38() {
      var logger2, session, raiseEvent;
      return _regeneratorRuntime().wrap(function _callee38$(_context39) {
        while (1) switch (_context39.prev = _context39.next) {
          case 0:
            logger2 = _this11._logger.create("_callback");
            _context39.prev = 1;
            _context39.next = 4;
            return _this11._userManager.querySessionStatus();
          case 4:
            session = _context39.sent;
            raiseEvent = true;
            if (!(session && _this11._checkSessionIFrame)) {
              _context39.next = 18;
              break;
            }
            if (!(session.sub === _this11._sub)) {
              _context39.next = 15;
              break;
            }
            raiseEvent = false;
            _this11._checkSessionIFrame.start(session.session_state);
            logger2.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state", session.session_state);
            _context39.next = 13;
            return _this11._userManager.events._raiseUserSessionChanged();
          case 13:
            _context39.next = 16;
            break;
          case 15:
            logger2.debug("different subject signed into OP", session.sub);
          case 16:
            _context39.next = 19;
            break;
          case 18:
            logger2.debug("subject no longer signed into OP");
          case 19:
            if (!raiseEvent) {
              _context39.next = 29;
              break;
            }
            if (!_this11._sub) {
              _context39.next = 25;
              break;
            }
            _context39.next = 23;
            return _this11._userManager.events._raiseUserSignedOut();
          case 23:
            _context39.next = 27;
            break;
          case 25:
            _context39.next = 27;
            return _this11._userManager.events._raiseUserSignedIn();
          case 27:
            _context39.next = 30;
            break;
          case 29:
            logger2.debug("no change in session detected, no event to raise");
          case 30:
            _context39.next = 38;
            break;
          case 32:
            _context39.prev = 32;
            _context39.t0 = _context39["catch"](1);
            if (!_this11._sub) {
              _context39.next = 38;
              break;
            }
            logger2.debug("Error calling queryCurrentSigninSession; raising signed out event", _context39.t0);
            _context39.next = 38;
            return _this11._userManager.events._raiseUserSignedOut();
          case 38:
          case "end":
            return _context39.stop();
        }
      }, _callee38, null, [[1, 32]]);
    }));
    if (!_userManager) {
      this._logger["throw"](new Error("No user manager passed"));
    }
    this._userManager.events.addUserLoaded(this._start);
    this._userManager.events.addUserUnloaded(this._stop);
    this._init()["catch"](function (err) {
      _this11._logger.error(err);
    });
  }
  return _createClass(_SessionMonitor, [{
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39() {
        var user, session, tmpUser;
        return _regeneratorRuntime().wrap(function _callee39$(_context40) {
          while (1) switch (_context40.prev = _context40.next) {
            case 0:
              this._logger.create("_init");
              _context40.next = 3;
              return this._userManager.getUser();
            case 3:
              user = _context40.sent;
              if (!user) {
                _context40.next = 8;
                break;
              }
              void this._start(user);
              _context40.next = 13;
              break;
            case 8:
              if (!this._userManager.settings.monitorAnonymousSession) {
                _context40.next = 13;
                break;
              }
              _context40.next = 11;
              return this._userManager.querySessionStatus();
            case 11:
              session = _context40.sent;
              if (session) {
                tmpUser = {
                  session_state: session.session_state,
                  profile: session.sub ? {
                    sub: session.sub
                  } : null
                };
                void this._start(tmpUser);
              }
            case 13:
            case "end":
              return _context40.stop();
          }
        }, _callee39, this);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
  }]);
}();

// src/User.ts
var _User2 = /*#__PURE__*/function () {
  function _User(args) {
    _classCallCheck(this, _User);
    var _a;
    this.id_token = args.id_token;
    this.session_state = (_a = args.session_state) != null ? _a : null;
    this.access_token = args.access_token;
    this.refresh_token = args.refresh_token;
    this.token_type = args.token_type;
    this.scope = args.scope;
    this.profile = args.profile;
    this.expires_at = args.expires_at;
    this.state = args.userState;
    this.url_state = args.url_state;
  }
  /** Computed number of seconds the access token has remaining. */
  return _createClass(_User, [{
    key: "expires_in",
    get: function get() {
      if (this.expires_at === void 0) {
        return void 0;
      }
      return this.expires_at - Timer.getEpochTime();
    },
    set: function set(value) {
      if (value !== void 0) {
        this.expires_at = Math.floor(value) + Timer.getEpochTime();
      }
    }
    /** Computed value indicating if the access token is expired. */
  }, {
    key: "expired",
    get: function get() {
      var expires_in = this.expires_in;
      if (expires_in === void 0) {
        return void 0;
      }
      return expires_in <= 0;
    }
    /** Array representing the parsed values from the `scope`. */
  }, {
    key: "scopes",
    get: function get() {
      var _a, _b;
      return (_b = (_a = this.scope) == null ? void 0 : _a.split(" ")) != null ? _b : [];
    }
  }, {
    key: "toStorageString",
    value: function toStorageString() {
      new _Logger2("User").create("toStorageString");
      return JSON.stringify({
        id_token: this.id_token,
        session_state: this.session_state,
        access_token: this.access_token,
        refresh_token: this.refresh_token,
        token_type: this.token_type,
        scope: this.scope,
        profile: this.profile,
        expires_at: this.expires_at
      });
    }
  }], [{
    key: "fromStorageString",
    value: function fromStorageString(storageString) {
      _Logger2.createStatic("User", "fromStorageString");
      return new _User(JSON.parse(storageString));
    }
  }]);
}();

// src/navigators/AbstractChildWindow.ts
var messageSource = "oidc-client";
var AbstractChildWindow = /*#__PURE__*/function () {
  function AbstractChildWindow() {
    _classCallCheck(this, AbstractChildWindow);
    this._abort = new Event("Window navigation aborted");
    this._disposeHandlers = /* @__PURE__ */new Set();
    this._window = null;
  }
  return _createClass(AbstractChildWindow, [{
    key: "navigate",
    value: function () {
      var _navigate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40(params) {
        var _this12 = this;
        var logger2, _yield$Promise, url, keepOpen;
        return _regeneratorRuntime().wrap(function _callee40$(_context41) {
          while (1) switch (_context41.prev = _context41.next) {
            case 0:
              logger2 = this._logger.create("navigate");
              if (this._window) {
                _context41.next = 3;
                break;
              }
              throw new Error("Attempted to navigate on a disposed window");
            case 3:
              logger2.debug("setting URL in window");
              this._window.location.replace(params.url);
              _context41.next = 7;
              return new Promise(function (resolve, reject) {
                var listener = function listener(e) {
                  var _a;
                  var data = e.data;
                  var origin = (_a = params.scriptOrigin) != null ? _a : window.location.origin;
                  if (e.origin !== origin || (data == null ? void 0 : data.source) !== messageSource) {
                    return;
                  }
                  try {
                    var state = UrlUtils.readParams(data.url, params.response_mode).get("state");
                    if (!state) {
                      logger2.warn("no state found in response url");
                    }
                    if (e.source !== _this12._window && state !== params.state) {
                      return;
                    }
                  } catch (err) {
                    _this12._dispose();
                    reject(new Error("Invalid response from window"));
                  }
                  resolve(data);
                };
                window.addEventListener("message", listener, false);
                _this12._disposeHandlers.add(function () {
                  return window.removeEventListener("message", listener, false);
                });
                _this12._disposeHandlers.add(_this12._abort.addHandler(function (reason) {
                  _this12._dispose();
                  reject(reason);
                }));
              });
            case 7:
              _yield$Promise = _context41.sent;
              url = _yield$Promise.url;
              keepOpen = _yield$Promise.keepOpen;
              logger2.debug("got response from window");
              this._dispose();
              if (!keepOpen) {
                this.close();
              }
              return _context41.abrupt("return", {
                url: url
              });
            case 14:
            case "end":
              return _context41.stop();
          }
        }, _callee40, this);
      }));
      function navigate(_x40) {
        return _navigate.apply(this, arguments);
      }
      return navigate;
    }()
  }, {
    key: "_dispose",
    value: function _dispose() {
      this._logger.create("_dispose");
      var _iterator5 = _createForOfIteratorHelper(this._disposeHandlers),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var dispose = _step5.value;
          dispose();
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      this._disposeHandlers.clear();
    }
  }], [{
    key: "_notifyParent",
    value: function _notifyParent(parent, url) {
      var keepOpen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var targetOrigin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window.location.origin;
      parent.postMessage({
        source: messageSource,
        url: url,
        keepOpen: keepOpen
      }, targetOrigin);
    }
  }]);
}();

// src/UserManagerSettings.ts
var DefaultPopupWindowFeatures = {
  location: false,
  toolbar: false,
  height: 640,
  closePopupWindowAfterInSeconds: -1
};
var DefaultPopupTarget = "_blank";
var DefaultAccessTokenExpiringNotificationTimeInSeconds = 60;
var DefaultCheckSessionIntervalInSeconds = 2;
var DefaultSilentRequestTimeoutInSeconds = 10;
var _UserManagerSettingsStore = /*#__PURE__*/function (_OidcClientSettingsSt) {
  function _UserManagerSettingsStore(args) {
    var _this13;
    _classCallCheck(this, _UserManagerSettingsStore);
    var _args$popup_redirect_ = args.popup_redirect_uri,
      popup_redirect_uri = _args$popup_redirect_ === void 0 ? args.redirect_uri : _args$popup_redirect_,
      _args$popup_post_logo = args.popup_post_logout_redirect_uri,
      popup_post_logout_redirect_uri = _args$popup_post_logo === void 0 ? args.post_logout_redirect_uri : _args$popup_post_logo,
      _args$popupWindowFeat = args.popupWindowFeatures,
      popupWindowFeatures = _args$popupWindowFeat === void 0 ? DefaultPopupWindowFeatures : _args$popupWindowFeat,
      _args$popupWindowTarg = args.popupWindowTarget,
      popupWindowTarget = _args$popupWindowTarg === void 0 ? DefaultPopupTarget : _args$popupWindowTarg,
      _args$redirectMethod = args.redirectMethod,
      redirectMethod = _args$redirectMethod === void 0 ? "assign" : _args$redirectMethod,
      _args$redirectTarget = args.redirectTarget,
      redirectTarget = _args$redirectTarget === void 0 ? "self" : _args$redirectTarget,
      _args$iframeNotifyPar = args.iframeNotifyParentOrigin,
      iframeNotifyParentOrigin = _args$iframeNotifyPar === void 0 ? args.iframeNotifyParentOrigin : _args$iframeNotifyPar,
      _args$iframeScriptOri = args.iframeScriptOrigin,
      iframeScriptOrigin = _args$iframeScriptOri === void 0 ? args.iframeScriptOrigin : _args$iframeScriptOri,
      _args$silent_redirect = args.silent_redirect_uri,
      silent_redirect_uri = _args$silent_redirect === void 0 ? args.redirect_uri : _args$silent_redirect,
      _args$silentRequestTi = args.silentRequestTimeoutInSeconds,
      silentRequestTimeoutInSeconds = _args$silentRequestTi === void 0 ? DefaultSilentRequestTimeoutInSeconds : _args$silentRequestTi,
      _args$automaticSilent = args.automaticSilentRenew,
      automaticSilentRenew = _args$automaticSilent === void 0 ? true : _args$automaticSilent,
      _args$validateSubOnSi = args.validateSubOnSilentRenew,
      validateSubOnSilentRenew = _args$validateSubOnSi === void 0 ? true : _args$validateSubOnSi,
      _args$includeIdTokenI = args.includeIdTokenInSilentRenew,
      includeIdTokenInSilentRenew = _args$includeIdTokenI === void 0 ? false : _args$includeIdTokenI,
      _args$monitorSession = args.monitorSession,
      monitorSession = _args$monitorSession === void 0 ? false : _args$monitorSession,
      _args$monitorAnonymou = args.monitorAnonymousSession,
      monitorAnonymousSession = _args$monitorAnonymou === void 0 ? false : _args$monitorAnonymou,
      _args$checkSessionInt = args.checkSessionIntervalInSeconds,
      checkSessionIntervalInSeconds = _args$checkSessionInt === void 0 ? DefaultCheckSessionIntervalInSeconds : _args$checkSessionInt,
      _args$query_status_re = args.query_status_response_type,
      query_status_response_type = _args$query_status_re === void 0 ? "code" : _args$query_status_re,
      _args$stopCheckSessio = args.stopCheckSessionOnError,
      stopCheckSessionOnError = _args$stopCheckSessio === void 0 ? true : _args$stopCheckSessio,
      _args$revokeTokenType = args.revokeTokenTypes,
      revokeTokenTypes = _args$revokeTokenType === void 0 ? ["access_token", "refresh_token"] : _args$revokeTokenType,
      _args$revokeTokensOnS = args.revokeTokensOnSignout,
      revokeTokensOnSignout = _args$revokeTokensOnS === void 0 ? false : _args$revokeTokensOnS,
      _args$includeIdTokenI2 = args.includeIdTokenInSilentSignout,
      includeIdTokenInSilentSignout = _args$includeIdTokenI2 === void 0 ? false : _args$includeIdTokenI2,
      _args$accessTokenExpi = args.accessTokenExpiringNotificationTimeInSeconds,
      accessTokenExpiringNotificationTimeInSeconds = _args$accessTokenExpi === void 0 ? DefaultAccessTokenExpiringNotificationTimeInSeconds : _args$accessTokenExpi,
      userStore = args.userStore;
    _this13 = _callSuper(this, _UserManagerSettingsStore, [args]);
    _this13.popup_redirect_uri = popup_redirect_uri;
    _this13.popup_post_logout_redirect_uri = popup_post_logout_redirect_uri;
    _this13.popupWindowFeatures = popupWindowFeatures;
    _this13.popupWindowTarget = popupWindowTarget;
    _this13.redirectMethod = redirectMethod;
    _this13.redirectTarget = redirectTarget;
    _this13.iframeNotifyParentOrigin = iframeNotifyParentOrigin;
    _this13.iframeScriptOrigin = iframeScriptOrigin;
    _this13.silent_redirect_uri = silent_redirect_uri;
    _this13.silentRequestTimeoutInSeconds = silentRequestTimeoutInSeconds;
    _this13.automaticSilentRenew = automaticSilentRenew;
    _this13.validateSubOnSilentRenew = validateSubOnSilentRenew;
    _this13.includeIdTokenInSilentRenew = includeIdTokenInSilentRenew;
    _this13.monitorSession = monitorSession;
    _this13.monitorAnonymousSession = monitorAnonymousSession;
    _this13.checkSessionIntervalInSeconds = checkSessionIntervalInSeconds;
    _this13.stopCheckSessionOnError = stopCheckSessionOnError;
    _this13.query_status_response_type = query_status_response_type;
    _this13.revokeTokenTypes = revokeTokenTypes;
    _this13.revokeTokensOnSignout = revokeTokensOnSignout;
    _this13.includeIdTokenInSilentSignout = includeIdTokenInSilentSignout;
    _this13.accessTokenExpiringNotificationTimeInSeconds = accessTokenExpiringNotificationTimeInSeconds;
    if (userStore) {
      _this13.userStore = userStore;
    } else {
      var store = typeof window !== "undefined" ? window.sessionStorage : new _InMemoryWebStorage();
      _this13.userStore = new _WebStorageStateStore({
        store: store
      });
    }
    return _this13;
  }
  _inherits(_UserManagerSettingsStore, _OidcClientSettingsSt);
  return _createClass(_UserManagerSettingsStore);
}(_OidcClientSettingsStore);

// src/navigators/IFrameWindow.ts
var IFrameWindow = /*#__PURE__*/function (_AbstractChildWindow) {
  function _IFrameWindow(_ref23) {
    var _this14;
    var _ref23$silentRequestT = _ref23.silentRequestTimeoutInSeconds,
      silentRequestTimeoutInSeconds = _ref23$silentRequestT === void 0 ? DefaultSilentRequestTimeoutInSeconds : _ref23$silentRequestT;
    _classCallCheck(this, _IFrameWindow);
    _this14 = _callSuper(this, _IFrameWindow);
    _this14._logger = new _Logger2("IFrameWindow");
    _this14._timeoutInSeconds = silentRequestTimeoutInSeconds;
    _this14._frame = _IFrameWindow.createHiddenIframe();
    _this14._window = _this14._frame.contentWindow;
    return _this14;
  }
  _inherits(_IFrameWindow, _AbstractChildWindow);
  return _createClass(_IFrameWindow, [{
    key: "navigate",
    value: function () {
      var _navigate2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee41(params) {
        var _this15 = this;
        var timer;
        return _regeneratorRuntime().wrap(function _callee41$(_context42) {
          while (1) switch (_context42.prev = _context42.next) {
            case 0:
              this._logger.debug("navigate: Using timeout of:", this._timeoutInSeconds);
              timer = setTimeout(function () {
                return void _this15._abort.raise(new _ErrorTimeout("IFrame timed out without a response"));
              }, this._timeoutInSeconds * 1e3);
              this._disposeHandlers.add(function () {
                return clearTimeout(timer);
              });
              _context42.next = 5;
              return _get(_getPrototypeOf(_IFrameWindow.prototype), "navigate", this).call(this, params);
            case 5:
              return _context42.abrupt("return", _context42.sent);
            case 6:
            case "end":
              return _context42.stop();
          }
        }, _callee41, this);
      }));
      function navigate(_x41) {
        return _navigate2.apply(this, arguments);
      }
      return navigate;
    }()
  }, {
    key: "close",
    value: function close() {
      var _this16 = this;
      var _a;
      if (this._frame) {
        if (this._frame.parentNode) {
          this._frame.addEventListener("load", function (ev) {
            var _a2;
            var frame = ev.target;
            (_a2 = frame.parentNode) == null ? void 0 : _a2.removeChild(frame);
            void _this16._abort.raise(new Error("IFrame removed from DOM"));
          }, true);
          (_a = this._frame.contentWindow) == null ? void 0 : _a.location.replace("about:blank");
        }
        this._frame = null;
      }
      this._window = null;
    }
  }], [{
    key: "createHiddenIframe",
    value: function createHiddenIframe() {
      var iframe = window.document.createElement("iframe");
      iframe.style.visibility = "hidden";
      iframe.style.position = "fixed";
      iframe.style.left = "-1000px";
      iframe.style.top = "0";
      iframe.width = "0";
      iframe.height = "0";
      window.document.body.appendChild(iframe);
      return iframe;
    }
  }, {
    key: "notifyParent",
    value: function notifyParent(url, targetOrigin) {
      return _get(_getPrototypeOf(_IFrameWindow), "_notifyParent", this).call(this, window.parent, url, false, targetOrigin);
    }
  }]);
}(AbstractChildWindow);

// src/navigators/IFrameNavigator.ts
var IFrameNavigator = /*#__PURE__*/function () {
  function IFrameNavigator(_settings) {
    _classCallCheck(this, IFrameNavigator);
    this._settings = _settings;
    this._logger = new _Logger2("IFrameNavigator");
  }
  return _createClass(IFrameNavigator, [{
    key: "prepare",
    value: function () {
      var _prepare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee42(_ref24) {
        var _ref24$silentRequestT, silentRequestTimeoutInSeconds;
        return _regeneratorRuntime().wrap(function _callee42$(_context43) {
          while (1) switch (_context43.prev = _context43.next) {
            case 0:
              _ref24$silentRequestT = _ref24.silentRequestTimeoutInSeconds, silentRequestTimeoutInSeconds = _ref24$silentRequestT === void 0 ? this._settings.silentRequestTimeoutInSeconds : _ref24$silentRequestT;
              return _context43.abrupt("return", new IFrameWindow({
                silentRequestTimeoutInSeconds: silentRequestTimeoutInSeconds
              }));
            case 2:
            case "end":
              return _context43.stop();
          }
        }, _callee42, this);
      }));
      function prepare(_x42) {
        return _prepare.apply(this, arguments);
      }
      return prepare;
    }()
  }, {
    key: "callback",
    value: function () {
      var _callback2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee43(url) {
        return _regeneratorRuntime().wrap(function _callee43$(_context44) {
          while (1) switch (_context44.prev = _context44.next) {
            case 0:
              this._logger.create("callback");
              IFrameWindow.notifyParent(url, this._settings.iframeNotifyParentOrigin);
            case 2:
            case "end":
              return _context44.stop();
          }
        }, _callee43, this);
      }));
      function callback(_x43) {
        return _callback2.apply(this, arguments);
      }
      return callback;
    }()
  }]);
}();

// src/navigators/PopupWindow.ts
var checkForPopupClosedInterval = 500;
var second = 1e3;
var PopupWindow = /*#__PURE__*/function (_AbstractChildWindow2) {
  function PopupWindow(_ref25) {
    var _this17;
    var _ref25$popupWindowTar = _ref25.popupWindowTarget,
      popupWindowTarget = _ref25$popupWindowTar === void 0 ? DefaultPopupTarget : _ref25$popupWindowTar,
      _ref25$popupWindowFea = _ref25.popupWindowFeatures,
      popupWindowFeatures = _ref25$popupWindowFea === void 0 ? {} : _ref25$popupWindowFea;
    _classCallCheck(this, PopupWindow);
    _this17 = _callSuper(this, PopupWindow);
    _this17._logger = new _Logger2("PopupWindow");
    var centeredPopup = PopupUtils.center(_objectSpread(_objectSpread({}, DefaultPopupWindowFeatures), popupWindowFeatures));
    _this17._window = window.open(void 0, popupWindowTarget, PopupUtils.serialize(centeredPopup));
    if (popupWindowFeatures.closePopupWindowAfterInSeconds && popupWindowFeatures.closePopupWindowAfterInSeconds > 0) {
      setTimeout(function () {
        if (!_this17._window || typeof _this17._window.closed !== "boolean" || _this17._window.closed) {
          void _this17._abort.raise(new Error("Popup blocked by user"));
          return;
        }
        _this17.close();
      }, popupWindowFeatures.closePopupWindowAfterInSeconds * second);
    }
    return _this17;
  }
  _inherits(PopupWindow, _AbstractChildWindow2);
  return _createClass(PopupWindow, [{
    key: "navigate",
    value: function () {
      var _navigate3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee44(params) {
        var _this18 = this;
        var _a, popupClosedInterval;
        return _regeneratorRuntime().wrap(function _callee44$(_context45) {
          while (1) switch (_context45.prev = _context45.next) {
            case 0:
              (_a = this._window) == null ? void 0 : _a.focus();
              popupClosedInterval = setInterval(function () {
                if (!_this18._window || _this18._window.closed) {
                  void _this18._abort.raise(new Error("Popup closed by user"));
                }
              }, checkForPopupClosedInterval);
              this._disposeHandlers.add(function () {
                return clearInterval(popupClosedInterval);
              });
              _context45.next = 5;
              return _get(_getPrototypeOf(PopupWindow.prototype), "navigate", this).call(this, params);
            case 5:
              return _context45.abrupt("return", _context45.sent);
            case 6:
            case "end":
              return _context45.stop();
          }
        }, _callee44, this);
      }));
      function navigate(_x44) {
        return _navigate3.apply(this, arguments);
      }
      return navigate;
    }()
  }, {
    key: "close",
    value: function close() {
      if (this._window) {
        if (!this._window.closed) {
          this._window.close();
          void this._abort.raise(new Error("Popup closed"));
        }
      }
      this._window = null;
    }
  }], [{
    key: "notifyOpener",
    value: function notifyOpener(url, keepOpen) {
      if (!window.opener) {
        throw new Error("No window.opener. Can't complete notification.");
      }
      return _get(_getPrototypeOf(PopupWindow), "_notifyParent", this).call(this, window.opener, url, keepOpen);
    }
  }]);
}(AbstractChildWindow);

// src/navigators/PopupNavigator.ts
var PopupNavigator = /*#__PURE__*/function () {
  function PopupNavigator(_settings) {
    _classCallCheck(this, PopupNavigator);
    this._settings = _settings;
    this._logger = new _Logger2("PopupNavigator");
  }
  return _createClass(PopupNavigator, [{
    key: "prepare",
    value: function () {
      var _prepare2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee45(_ref26) {
        var _ref26$popupWindowFea, popupWindowFeatures, _ref26$popupWindowTar, popupWindowTarget;
        return _regeneratorRuntime().wrap(function _callee45$(_context46) {
          while (1) switch (_context46.prev = _context46.next) {
            case 0:
              _ref26$popupWindowFea = _ref26.popupWindowFeatures, popupWindowFeatures = _ref26$popupWindowFea === void 0 ? this._settings.popupWindowFeatures : _ref26$popupWindowFea, _ref26$popupWindowTar = _ref26.popupWindowTarget, popupWindowTarget = _ref26$popupWindowTar === void 0 ? this._settings.popupWindowTarget : _ref26$popupWindowTar;
              return _context46.abrupt("return", new PopupWindow({
                popupWindowFeatures: popupWindowFeatures,
                popupWindowTarget: popupWindowTarget
              }));
            case 2:
            case "end":
              return _context46.stop();
          }
        }, _callee45, this);
      }));
      function prepare(_x45) {
        return _prepare2.apply(this, arguments);
      }
      return prepare;
    }()
  }, {
    key: "callback",
    value: function () {
      var _callback3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee46(url, _ref27) {
        var _ref27$keepOpen, keepOpen;
        return _regeneratorRuntime().wrap(function _callee46$(_context47) {
          while (1) switch (_context47.prev = _context47.next) {
            case 0:
              _ref27$keepOpen = _ref27.keepOpen, keepOpen = _ref27$keepOpen === void 0 ? false : _ref27$keepOpen;
              this._logger.create("callback");
              PopupWindow.notifyOpener(url, keepOpen);
            case 3:
            case "end":
              return _context47.stop();
          }
        }, _callee46, this);
      }));
      function callback(_x46, _x47) {
        return _callback3.apply(this, arguments);
      }
      return callback;
    }()
  }]);
}();

// src/navigators/RedirectNavigator.ts
var RedirectNavigator = /*#__PURE__*/function () {
  function RedirectNavigator(_settings) {
    _classCallCheck(this, RedirectNavigator);
    this._settings = _settings;
    this._logger = new _Logger2("RedirectNavigator");
  }
  return _createClass(RedirectNavigator, [{
    key: "prepare",
    value: function () {
      var _prepare3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee48(_ref28) {
        var _this19 = this;
        var _ref28$redirectMethod, redirectMethod, _ref28$redirectTarget, redirectTarget, _a, targetWindow, redirect, abort;
        return _regeneratorRuntime().wrap(function _callee48$(_context49) {
          while (1) switch (_context49.prev = _context49.next) {
            case 0:
              _ref28$redirectMethod = _ref28.redirectMethod, redirectMethod = _ref28$redirectMethod === void 0 ? this._settings.redirectMethod : _ref28$redirectMethod, _ref28$redirectTarget = _ref28.redirectTarget, redirectTarget = _ref28$redirectTarget === void 0 ? this._settings.redirectTarget : _ref28$redirectTarget;
              this._logger.create("prepare");
              targetWindow = window.self;
              if (redirectTarget === "top") {
                targetWindow = (_a = window.top) != null ? _a : window.self;
              }
              redirect = targetWindow.location[redirectMethod].bind(targetWindow.location);
              return _context49.abrupt("return", {
                navigate: function () {
                  var _navigate4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee47(params) {
                    var promise;
                    return _regeneratorRuntime().wrap(function _callee47$(_context48) {
                      while (1) switch (_context48.prev = _context48.next) {
                        case 0:
                          _this19._logger.create("navigate");
                          promise = new Promise(function (resolve, reject) {
                            abort = reject;
                          });
                          redirect(params.url);
                          _context48.next = 5;
                          return promise;
                        case 5:
                          return _context48.abrupt("return", _context48.sent);
                        case 6:
                        case "end":
                          return _context48.stop();
                      }
                    }, _callee47);
                  }));
                  function navigate(_x49) {
                    return _navigate4.apply(this, arguments);
                  }
                  return navigate;
                }(),
                close: function close() {
                  _this19._logger.create("close");
                  abort == null ? void 0 : abort(new Error("Redirect aborted"));
                  targetWindow.stop();
                }
              });
            case 6:
            case "end":
              return _context49.stop();
          }
        }, _callee48, this);
      }));
      function prepare(_x48) {
        return _prepare3.apply(this, arguments);
      }
      return prepare;
    }()
  }, {
    key: "callback",
    value: function () {
      var _callback4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee49() {
        return _regeneratorRuntime().wrap(function _callee49$(_context50) {
          while (1) switch (_context50.prev = _context50.next) {
            case 0:
              return _context50.abrupt("return");
            case 1:
            case "end":
              return _context50.stop();
          }
        }, _callee49);
      }));
      function callback() {
        return _callback4.apply(this, arguments);
      }
      return callback;
    }()
  }]);
}();

// src/UserManagerEvents.ts
var UserManagerEvents = /*#__PURE__*/function (_AccessTokenEvents2) {
  function UserManagerEvents(settings) {
    var _this20;
    _classCallCheck(this, UserManagerEvents);
    _this20 = _callSuper(this, UserManagerEvents, [{
      expiringNotificationTimeInSeconds: settings.accessTokenExpiringNotificationTimeInSeconds
    }]);
    _this20._logger = new _Logger2("UserManagerEvents");
    _this20._userLoaded = new Event("User loaded");
    _this20._userUnloaded = new Event("User unloaded");
    _this20._silentRenewError = new Event("Silent renew error");
    _this20._userSignedIn = new Event("User signed in");
    _this20._userSignedOut = new Event("User signed out");
    _this20._userSessionChanged = new Event("User session changed");
    return _this20;
  }
  _inherits(UserManagerEvents, _AccessTokenEvents2);
  return _createClass(UserManagerEvents, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee50(user) {
        var raiseEvent,
          _args51 = arguments;
        return _regeneratorRuntime().wrap(function _callee50$(_context51) {
          while (1) switch (_context51.prev = _context51.next) {
            case 0:
              raiseEvent = _args51.length > 1 && _args51[1] !== undefined ? _args51[1] : true;
              _get(_getPrototypeOf(UserManagerEvents.prototype), "load", this).call(this, user);
              if (!raiseEvent) {
                _context51.next = 5;
                break;
              }
              _context51.next = 5;
              return this._userLoaded.raise(user);
            case 5:
            case "end":
              return _context51.stop();
          }
        }, _callee50, this);
      }));
      function load(_x50) {
        return _load.apply(this, arguments);
      }
      return load;
    }()
  }, {
    key: "unload",
    value: function () {
      var _unload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee51() {
        return _regeneratorRuntime().wrap(function _callee51$(_context52) {
          while (1) switch (_context52.prev = _context52.next) {
            case 0:
              _get(_getPrototypeOf(UserManagerEvents.prototype), "unload", this).call(this);
              _context52.next = 3;
              return this._userUnloaded.raise();
            case 3:
            case "end":
              return _context52.stop();
          }
        }, _callee51, this);
      }));
      function unload() {
        return _unload.apply(this, arguments);
      }
      return unload;
    }()
    /**
     * Add callback: Raised when a user session has been established (or re-established).
     */
  }, {
    key: "addUserLoaded",
    value: function addUserLoaded(cb) {
      return this._userLoaded.addHandler(cb);
    }
    /**
     * Remove callback: Raised when a user session has been established (or re-established).
     */
  }, {
    key: "removeUserLoaded",
    value: function removeUserLoaded(cb) {
      return this._userLoaded.removeHandler(cb);
    }
    /**
     * Add callback: Raised when a user session has been terminated.
     */
  }, {
    key: "addUserUnloaded",
    value: function addUserUnloaded(cb) {
      return this._userUnloaded.addHandler(cb);
    }
    /**
     * Remove callback: Raised when a user session has been terminated.
     */
  }, {
    key: "removeUserUnloaded",
    value: function removeUserUnloaded(cb) {
      return this._userUnloaded.removeHandler(cb);
    }
    /**
     * Add callback: Raised when the automatic silent renew has failed.
     */
  }, {
    key: "addSilentRenewError",
    value: function addSilentRenewError(cb) {
      return this._silentRenewError.addHandler(cb);
    }
    /**
     * Remove callback: Raised when the automatic silent renew has failed.
     */
  }, {
    key: "removeSilentRenewError",
    value: function removeSilentRenewError(cb) {
      return this._silentRenewError.removeHandler(cb);
    }
    /**
     * @internal
     */
  }, {
    key: "_raiseSilentRenewError",
    value: (function () {
      var _raiseSilentRenewError2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee52(e) {
        return _regeneratorRuntime().wrap(function _callee52$(_context53) {
          while (1) switch (_context53.prev = _context53.next) {
            case 0:
              _context53.next = 2;
              return this._silentRenewError.raise(e);
            case 2:
            case "end":
              return _context53.stop();
          }
        }, _callee52, this);
      }));
      function _raiseSilentRenewError(_x51) {
        return _raiseSilentRenewError2.apply(this, arguments);
      }
      return _raiseSilentRenewError;
    }()
    /**
     * Add callback: Raised when the user is signed in (when `monitorSession` is set).
     * @see {@link UserManagerSettings.monitorSession}
     */
    )
  }, {
    key: "addUserSignedIn",
    value: function addUserSignedIn(cb) {
      return this._userSignedIn.addHandler(cb);
    }
    /**
     * Remove callback: Raised when the user is signed in (when `monitorSession` is set).
     */
  }, {
    key: "removeUserSignedIn",
    value: function removeUserSignedIn(cb) {
      this._userSignedIn.removeHandler(cb);
    }
    /**
     * @internal
     */
  }, {
    key: "_raiseUserSignedIn",
    value: (function () {
      var _raiseUserSignedIn2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee53() {
        return _regeneratorRuntime().wrap(function _callee53$(_context54) {
          while (1) switch (_context54.prev = _context54.next) {
            case 0:
              _context54.next = 2;
              return this._userSignedIn.raise();
            case 2:
            case "end":
              return _context54.stop();
          }
        }, _callee53, this);
      }));
      function _raiseUserSignedIn() {
        return _raiseUserSignedIn2.apply(this, arguments);
      }
      return _raiseUserSignedIn;
    }()
    /**
     * Add callback: Raised when the user's sign-in status at the OP has changed (when `monitorSession` is set).
     * @see {@link UserManagerSettings.monitorSession}
     */
    )
  }, {
    key: "addUserSignedOut",
    value: function addUserSignedOut(cb) {
      return this._userSignedOut.addHandler(cb);
    }
    /**
     * Remove callback: Raised when the user's sign-in status at the OP has changed (when `monitorSession` is set).
     */
  }, {
    key: "removeUserSignedOut",
    value: function removeUserSignedOut(cb) {
      this._userSignedOut.removeHandler(cb);
    }
    /**
     * @internal
     */
  }, {
    key: "_raiseUserSignedOut",
    value: (function () {
      var _raiseUserSignedOut2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee54() {
        return _regeneratorRuntime().wrap(function _callee54$(_context55) {
          while (1) switch (_context55.prev = _context55.next) {
            case 0:
              _context55.next = 2;
              return this._userSignedOut.raise();
            case 2:
            case "end":
              return _context55.stop();
          }
        }, _callee54, this);
      }));
      function _raiseUserSignedOut() {
        return _raiseUserSignedOut2.apply(this, arguments);
      }
      return _raiseUserSignedOut;
    }()
    /**
     * Add callback: Raised when the user session changed (when `monitorSession` is set).
     * @see {@link UserManagerSettings.monitorSession}
     */
    )
  }, {
    key: "addUserSessionChanged",
    value: function addUserSessionChanged(cb) {
      return this._userSessionChanged.addHandler(cb);
    }
    /**
     * Remove callback: Raised when the user session changed (when `monitorSession` is set).
     */
  }, {
    key: "removeUserSessionChanged",
    value: function removeUserSessionChanged(cb) {
      this._userSessionChanged.removeHandler(cb);
    }
    /**
     * @internal
     */
  }, {
    key: "_raiseUserSessionChanged",
    value: (function () {
      var _raiseUserSessionChanged2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee55() {
        return _regeneratorRuntime().wrap(function _callee55$(_context56) {
          while (1) switch (_context56.prev = _context56.next) {
            case 0:
              _context56.next = 2;
              return this._userSessionChanged.raise();
            case 2:
            case "end":
              return _context56.stop();
          }
        }, _callee55, this);
      }));
      function _raiseUserSessionChanged() {
        return _raiseUserSessionChanged2.apply(this, arguments);
      }
      return _raiseUserSessionChanged;
    }())
  }]);
}(_AccessTokenEvents);

// src/SilentRenewService.ts
var SilentRenewService = /*#__PURE__*/function () {
  function SilentRenewService(_userManager) {
    var _this21 = this;
    _classCallCheck(this, SilentRenewService);
    this._userManager = _userManager;
    this._logger = new _Logger2("SilentRenewService");
    this._isStarted = false;
    this._retryTimer = new Timer("Retry Silent Renew");
    this._tokenExpiring = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee56() {
      var logger2;
      return _regeneratorRuntime().wrap(function _callee56$(_context57) {
        while (1) switch (_context57.prev = _context57.next) {
          case 0:
            logger2 = _this21._logger.create("_tokenExpiring");
            _context57.prev = 1;
            _context57.next = 4;
            return _this21._userManager.signinSilent();
          case 4:
            logger2.debug("silent token renewal successful");
            _context57.next = 16;
            break;
          case 7:
            _context57.prev = 7;
            _context57.t0 = _context57["catch"](1);
            if (!(_context57.t0 instanceof _ErrorTimeout)) {
              _context57.next = 13;
              break;
            }
            logger2.warn("ErrorTimeout from signinSilent:", _context57.t0, "retry in 5s");
            _this21._retryTimer.init(5);
            return _context57.abrupt("return");
          case 13:
            logger2.error("Error from signinSilent:", _context57.t0);
            _context57.next = 16;
            return _this21._userManager.events._raiseSilentRenewError(_context57.t0);
          case 16:
          case "end":
            return _context57.stop();
        }
      }, _callee56, null, [[1, 7]]);
    }));
  }
  return _createClass(SilentRenewService, [{
    key: "start",
    value: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee57() {
        var logger2;
        return _regeneratorRuntime().wrap(function _callee57$(_context58) {
          while (1) switch (_context58.prev = _context58.next) {
            case 0:
              logger2 = this._logger.create("start");
              if (this._isStarted) {
                _context58.next = 13;
                break;
              }
              this._isStarted = true;
              this._userManager.events.addAccessTokenExpiring(this._tokenExpiring);
              this._retryTimer.addHandler(this._tokenExpiring);
              _context58.prev = 5;
              _context58.next = 8;
              return this._userManager.getUser();
            case 8:
              _context58.next = 13;
              break;
            case 10:
              _context58.prev = 10;
              _context58.t0 = _context58["catch"](5);
              logger2.error("getUser error", _context58.t0);
            case 13:
            case "end":
              return _context58.stop();
          }
        }, _callee57, this, [[5, 10]]);
      }));
      function start() {
        return _start.apply(this, arguments);
      }
      return start;
    }()
  }, {
    key: "stop",
    value: function stop() {
      if (this._isStarted) {
        this._retryTimer.cancel();
        this._retryTimer.removeHandler(this._tokenExpiring);
        this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring);
        this._isStarted = false;
      }
    }
  }]);
}();

// src/RefreshState.ts
var RefreshState = /*#__PURE__*/_createClass(function RefreshState(args) {
  _classCallCheck(this, RefreshState);
  this.refresh_token = args.refresh_token;
  this.id_token = args.id_token;
  this.session_state = args.session_state;
  this.scope = args.scope;
  this.profile = args.profile;
  this.data = args.state;
});

// src/UserManager.ts
var _UserManager = /*#__PURE__*/function () {
  function _UserManager(settings, redirectNavigator, popupNavigator, iframeNavigator) {
    _classCallCheck(this, _UserManager);
    this._logger = new _Logger2("UserManager");
    this.settings = new _UserManagerSettingsStore(settings);
    this._client = new _OidcClient(settings);
    this._redirectNavigator = redirectNavigator != null ? redirectNavigator : new RedirectNavigator(this.settings);
    this._popupNavigator = popupNavigator != null ? popupNavigator : new PopupNavigator(this.settings);
    this._iframeNavigator = iframeNavigator != null ? iframeNavigator : new IFrameNavigator(this.settings);
    this._events = new UserManagerEvents(this.settings);
    this._silentRenewService = new SilentRenewService(this);
    if (this.settings.automaticSilentRenew) {
      this.startSilentRenew();
    }
    this._sessionMonitor = null;
    if (this.settings.monitorSession) {
      this._sessionMonitor = new _SessionMonitor(this);
    }
  }
  /**
   * Get object used to register for events raised by the `UserManager`.
   */
  return _createClass(_UserManager, [{
    key: "events",
    get: function get() {
      return this._events;
    }
    /**
     * Get object used to access the metadata configuration of the identity provider.
     */
  }, {
    key: "metadataService",
    get: function get() {
      return this._client.metadataService;
    }
    /**
     * Load the `User` object for the currently authenticated user.
     *
     * @returns A promise
     */
  }, {
    key: "getUser",
    value: (function () {
      var _getUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee58() {
        var logger2, user;
        return _regeneratorRuntime().wrap(function _callee58$(_context59) {
          while (1) switch (_context59.prev = _context59.next) {
            case 0:
              logger2 = this._logger.create("getUser");
              _context59.next = 3;
              return this._loadUser();
            case 3:
              user = _context59.sent;
              if (!user) {
                _context59.next = 9;
                break;
              }
              logger2.info("user loaded");
              _context59.next = 8;
              return this._events.load(user, false);
            case 8:
              return _context59.abrupt("return", user);
            case 9:
              logger2.info("user not found in storage");
              return _context59.abrupt("return", null);
            case 11:
            case "end":
              return _context59.stop();
          }
        }, _callee58, this);
      }));
      function getUser() {
        return _getUser.apply(this, arguments);
      }
      return getUser;
    }()
    /**
     * Remove from any storage the currently authenticated user.
     *
     * @returns A promise
     */
    )
  }, {
    key: "removeUser",
    value: (function () {
      var _removeUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee59() {
        var logger2;
        return _regeneratorRuntime().wrap(function _callee59$(_context60) {
          while (1) switch (_context60.prev = _context60.next) {
            case 0:
              logger2 = this._logger.create("removeUser");
              _context60.next = 3;
              return this.storeUser(null);
            case 3:
              logger2.info("user removed from storage");
              _context60.next = 6;
              return this._events.unload();
            case 6:
            case "end":
              return _context60.stop();
          }
        }, _callee59, this);
      }));
      function removeUser() {
        return _removeUser.apply(this, arguments);
      }
      return removeUser;
    }()
    /**
     * Trigger a redirect of the current window to the authorization endpoint.
     *
     * @returns A promise
     *
     * @throws `Error` In cases of wrong authentication.
     */
    )
  }, {
    key: "signinRedirect",
    value: (function () {
      var _signinRedirect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee60() {
        var args,
          redirectMethod,
          requestArgs,
          handle,
          _args61 = arguments;
        return _regeneratorRuntime().wrap(function _callee60$(_context61) {
          while (1) switch (_context61.prev = _context61.next) {
            case 0:
              args = _args61.length > 0 && _args61[0] !== undefined ? _args61[0] : {};
              this._logger.create("signinRedirect");
              redirectMethod = args.redirectMethod, requestArgs = _objectWithoutProperties(args, _excluded6);
              _context61.next = 5;
              return this._redirectNavigator.prepare({
                redirectMethod: redirectMethod
              });
            case 5:
              handle = _context61.sent;
              _context61.next = 8;
              return this._signinStart(_objectSpread({
                request_type: "si:r"
              }, requestArgs), handle);
            case 8:
            case "end":
              return _context61.stop();
          }
        }, _callee60, this);
      }));
      function signinRedirect() {
        return _signinRedirect.apply(this, arguments);
      }
      return signinRedirect;
    }()
    /**
     * Process the response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise containing the authenticated `User`.
     *
     * @see {@link UserManager.signinCallback}
     */
    )
  }, {
    key: "signinRedirectCallback",
    value: (function () {
      var _signinRedirectCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee61() {
        var url,
          logger2,
          user,
          _args62 = arguments;
        return _regeneratorRuntime().wrap(function _callee61$(_context62) {
          while (1) switch (_context62.prev = _context62.next) {
            case 0:
              url = _args62.length > 0 && _args62[0] !== undefined ? _args62[0] : window.location.href;
              logger2 = this._logger.create("signinRedirectCallback");
              _context62.next = 4;
              return this._signinEnd(url);
            case 4:
              user = _context62.sent;
              if (user.profile && user.profile.sub) {
                logger2.info("success, signed in subject", user.profile.sub);
              } else {
                logger2.info("no subject");
              }
              return _context62.abrupt("return", user);
            case 7:
            case "end":
              return _context62.stop();
          }
        }, _callee61, this);
      }));
      function signinRedirectCallback() {
        return _signinRedirectCallback.apply(this, arguments);
      }
      return signinRedirectCallback;
    }()
    /**
     * Trigger the signin with user/password.
     *
     * @returns A promise containing the authenticated `User`.
     * @throws {@link ErrorResponse} In cases of wrong authentication.
     */
    )
  }, {
    key: "signinResourceOwnerCredentials",
    value: (function () {
      var _signinResourceOwnerCredentials = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee62(_ref30) {
        var username, password, _ref30$skipUserInfo, skipUserInfo, logger2, signinResponse, user;
        return _regeneratorRuntime().wrap(function _callee62$(_context63) {
          while (1) switch (_context63.prev = _context63.next) {
            case 0:
              username = _ref30.username, password = _ref30.password, _ref30$skipUserInfo = _ref30.skipUserInfo, skipUserInfo = _ref30$skipUserInfo === void 0 ? false : _ref30$skipUserInfo;
              logger2 = this._logger.create("signinResourceOwnerCredential");
              _context63.next = 4;
              return this._client.processResourceOwnerPasswordCredentials({
                username: username,
                password: password,
                skipUserInfo: skipUserInfo,
                extraTokenParams: this.settings.extraTokenParams
              });
            case 4:
              signinResponse = _context63.sent;
              logger2.debug("got signin response");
              _context63.next = 8;
              return this._buildUser(signinResponse);
            case 8:
              user = _context63.sent;
              if (user.profile && user.profile.sub) {
                logger2.info("success, signed in subject", user.profile.sub);
              } else {
                logger2.info("no subject");
              }
              return _context63.abrupt("return", user);
            case 11:
            case "end":
              return _context63.stop();
          }
        }, _callee62, this);
      }));
      function signinResourceOwnerCredentials(_x52) {
        return _signinResourceOwnerCredentials.apply(this, arguments);
      }
      return signinResourceOwnerCredentials;
    }()
    /**
     * Trigger a request (via a popup window) to the authorization endpoint.
     *
     * @returns A promise containing the authenticated `User`.
     * @throws `Error` In cases of wrong authentication.
     */
    )
  }, {
    key: "signinPopup",
    value: (function () {
      var _signinPopup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee63() {
        var args,
          logger2,
          popupWindowFeatures,
          popupWindowTarget,
          requestArgs,
          url,
          handle,
          user,
          _args64 = arguments;
        return _regeneratorRuntime().wrap(function _callee63$(_context64) {
          while (1) switch (_context64.prev = _context64.next) {
            case 0:
              args = _args64.length > 0 && _args64[0] !== undefined ? _args64[0] : {};
              logger2 = this._logger.create("signinPopup");
              popupWindowFeatures = args.popupWindowFeatures, popupWindowTarget = args.popupWindowTarget, requestArgs = _objectWithoutProperties(args, _excluded7);
              url = this.settings.popup_redirect_uri;
              if (!url) {
                logger2["throw"](new Error("No popup_redirect_uri configured"));
              }
              _context64.next = 7;
              return this._popupNavigator.prepare({
                popupWindowFeatures: popupWindowFeatures,
                popupWindowTarget: popupWindowTarget
              });
            case 7:
              handle = _context64.sent;
              _context64.next = 10;
              return this._signin(_objectSpread({
                request_type: "si:p",
                redirect_uri: url,
                display: "popup"
              }, requestArgs), handle);
            case 10:
              user = _context64.sent;
              if (user) {
                if (user.profile && user.profile.sub) {
                  logger2.info("success, signed in subject", user.profile.sub);
                } else {
                  logger2.info("no subject");
                }
              }
              return _context64.abrupt("return", user);
            case 13:
            case "end":
              return _context64.stop();
          }
        }, _callee63, this);
      }));
      function signinPopup() {
        return _signinPopup.apply(this, arguments);
      }
      return signinPopup;
    }()
    /**
     * Notify the opening window of response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signinCallback}
     */
    )
  }, {
    key: "signinPopupCallback",
    value: (function () {
      var _signinPopupCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee64() {
        var url,
          keepOpen,
          logger2,
          _args65 = arguments;
        return _regeneratorRuntime().wrap(function _callee64$(_context65) {
          while (1) switch (_context65.prev = _context65.next) {
            case 0:
              url = _args65.length > 0 && _args65[0] !== undefined ? _args65[0] : window.location.href;
              keepOpen = _args65.length > 1 && _args65[1] !== undefined ? _args65[1] : false;
              logger2 = this._logger.create("signinPopupCallback");
              _context65.next = 5;
              return this._popupNavigator.callback(url, {
                keepOpen: keepOpen
              });
            case 5:
              logger2.info("success");
            case 6:
            case "end":
              return _context65.stop();
          }
        }, _callee64, this);
      }));
      function signinPopupCallback() {
        return _signinPopupCallback.apply(this, arguments);
      }
      return signinPopupCallback;
    }()
    /**
     * Trigger a silent request (via refresh token or an iframe) to the authorization endpoint.
     *
     * @returns A promise that contains the authenticated `User`.
     */
    )
  }, {
    key: "signinSilent",
    value: (function () {
      var _signinSilent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee65() {
        var args,
          _a,
          logger2,
          silentRequestTimeoutInSeconds,
          requestArgs,
          user,
          state,
          url,
          verifySub,
          handle,
          _args66 = arguments;
        return _regeneratorRuntime().wrap(function _callee65$(_context66) {
          while (1) switch (_context66.prev = _context66.next) {
            case 0:
              args = _args66.length > 0 && _args66[0] !== undefined ? _args66[0] : {};
              logger2 = this._logger.create("signinSilent");
              silentRequestTimeoutInSeconds = args.silentRequestTimeoutInSeconds, requestArgs = _objectWithoutProperties(args, _excluded8);
              _context66.next = 5;
              return this._loadUser();
            case 5:
              user = _context66.sent;
              if (!(user == null ? void 0 : user.refresh_token)) {
                _context66.next = 12;
                break;
              }
              logger2.debug("using refresh token");
              state = new RefreshState(user);
              _context66.next = 11;
              return this._useRefreshToken({
                state: state,
                redirect_uri: requestArgs.redirect_uri,
                resource: requestArgs.resource,
                extraTokenParams: requestArgs.extraTokenParams,
                timeoutInSeconds: silentRequestTimeoutInSeconds
              });
            case 11:
              return _context66.abrupt("return", _context66.sent);
            case 12:
              url = this.settings.silent_redirect_uri;
              if (!url) {
                logger2["throw"](new Error("No silent_redirect_uri configured"));
              }
              if (user && this.settings.validateSubOnSilentRenew) {
                logger2.debug("subject prior to silent renew:", user.profile.sub);
                verifySub = user.profile.sub;
              }
              _context66.next = 17;
              return this._iframeNavigator.prepare({
                silentRequestTimeoutInSeconds: silentRequestTimeoutInSeconds
              });
            case 17:
              handle = _context66.sent;
              _context66.next = 20;
              return this._signin(_objectSpread({
                request_type: "si:s",
                redirect_uri: url,
                prompt: "none",
                id_token_hint: this.settings.includeIdTokenInSilentRenew ? user == null ? void 0 : user.id_token : void 0
              }, requestArgs), handle, verifySub);
            case 20:
              user = _context66.sent;
              if (user) {
                if ((_a = user.profile) == null ? void 0 : _a.sub) {
                  logger2.info("success, signed in subject", user.profile.sub);
                } else {
                  logger2.info("no subject");
                }
              }
              return _context66.abrupt("return", user);
            case 23:
            case "end":
              return _context66.stop();
          }
        }, _callee65, this);
      }));
      function signinSilent() {
        return _signinSilent.apply(this, arguments);
      }
      return signinSilent;
    }())
  }, {
    key: "_useRefreshToken",
    value: function () {
      var _useRefreshToken2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee66(args) {
        var response, user;
        return _regeneratorRuntime().wrap(function _callee66$(_context67) {
          while (1) switch (_context67.prev = _context67.next) {
            case 0:
              _context67.next = 2;
              return this._client.useRefreshToken(_objectSpread(_objectSpread({}, args), {}, {
                timeoutInSeconds: this.settings.silentRequestTimeoutInSeconds
              }));
            case 2:
              response = _context67.sent;
              user = new _User2(_objectSpread(_objectSpread({}, args.state), response));
              _context67.next = 6;
              return this.storeUser(user);
            case 6:
              _context67.next = 8;
              return this._events.load(user);
            case 8:
              return _context67.abrupt("return", user);
            case 9:
            case "end":
              return _context67.stop();
          }
        }, _callee66, this);
      }));
      function _useRefreshToken(_x53) {
        return _useRefreshToken2.apply(this, arguments);
      }
      return _useRefreshToken;
    }()
    /**
     *
     * Notify the parent window of response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signinCallback}
     */
  }, {
    key: "signinSilentCallback",
    value: (function () {
      var _signinSilentCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee67() {
        var url,
          logger2,
          _args68 = arguments;
        return _regeneratorRuntime().wrap(function _callee67$(_context68) {
          while (1) switch (_context68.prev = _context68.next) {
            case 0:
              url = _args68.length > 0 && _args68[0] !== undefined ? _args68[0] : window.location.href;
              logger2 = this._logger.create("signinSilentCallback");
              _context68.next = 4;
              return this._iframeNavigator.callback(url);
            case 4:
              logger2.info("success");
            case 5:
            case "end":
              return _context68.stop();
          }
        }, _callee67, this);
      }));
      function signinSilentCallback() {
        return _signinSilentCallback.apply(this, arguments);
      }
      return signinSilentCallback;
    }()
    /**
     * Process any response (callback) from the authorization endpoint, by dispatching the request_type
     * and executing one of the following functions:
     * - {@link UserManager.signinRedirectCallback}
     * - {@link UserManager.signinPopupCallback}
     * - {@link UserManager.signinSilentCallback}
     *
     * @throws `Error` If request_type is unknown or signout can not processed.
     */
    )
  }, {
    key: "signinCallback",
    value: (function () {
      var _signinCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee68() {
        var url,
          _yield$this$_client$r,
          state,
          _args69 = arguments;
        return _regeneratorRuntime().wrap(function _callee68$(_context69) {
          while (1) switch (_context69.prev = _context69.next) {
            case 0:
              url = _args69.length > 0 && _args69[0] !== undefined ? _args69[0] : window.location.href;
              _context69.next = 3;
              return this._client.readSigninResponseState(url);
            case 3:
              _yield$this$_client$r = _context69.sent;
              state = _yield$this$_client$r.state;
              _context69.t0 = state.request_type;
              _context69.next = _context69.t0 === "si:r" ? 8 : _context69.t0 === "si:p" ? 11 : _context69.t0 === "si:s" ? 14 : 17;
              break;
            case 8:
              _context69.next = 10;
              return this.signinRedirectCallback(url);
            case 10:
              return _context69.abrupt("return", _context69.sent);
            case 11:
              _context69.next = 13;
              return this.signinPopupCallback(url);
            case 13:
              return _context69.abrupt("return", _context69.sent);
            case 14:
              _context69.next = 16;
              return this.signinSilentCallback(url);
            case 16:
              return _context69.abrupt("return", _context69.sent);
            case 17:
              throw new Error("invalid response_type in state");
            case 18:
            case "end":
              return _context69.stop();
          }
        }, _callee68, this);
      }));
      function signinCallback() {
        return _signinCallback.apply(this, arguments);
      }
      return signinCallback;
    }()
    /**
     * Process any response (callback) from the end session endpoint, by dispatching the request_type
     * and executing one of the following functions:
     * - {@link UserManager.signoutRedirectCallback}
     * - {@link UserManager.signoutPopupCallback}
     * - {@link UserManager.signoutSilentCallback}
     *
     * @throws `Error` If request_type is unknown or signout can not processed.
     */
    )
  }, {
    key: "signoutCallback",
    value: (function () {
      var _signoutCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee69() {
        var url,
          keepOpen,
          _yield$this$_client$r2,
          state,
          _args70 = arguments;
        return _regeneratorRuntime().wrap(function _callee69$(_context70) {
          while (1) switch (_context70.prev = _context70.next) {
            case 0:
              url = _args70.length > 0 && _args70[0] !== undefined ? _args70[0] : window.location.href;
              keepOpen = _args70.length > 1 && _args70[1] !== undefined ? _args70[1] : false;
              _context70.next = 4;
              return this._client.readSignoutResponseState(url);
            case 4:
              _yield$this$_client$r2 = _context70.sent;
              state = _yield$this$_client$r2.state;
              if (state) {
                _context70.next = 8;
                break;
              }
              return _context70.abrupt("return");
            case 8:
              _context70.t0 = state.request_type;
              _context70.next = _context70.t0 === "so:r" ? 11 : _context70.t0 === "so:p" ? 14 : _context70.t0 === "so:s" ? 17 : 20;
              break;
            case 11:
              _context70.next = 13;
              return this.signoutRedirectCallback(url);
            case 13:
              return _context70.abrupt("break", 21);
            case 14:
              _context70.next = 16;
              return this.signoutPopupCallback(url, keepOpen);
            case 16:
              return _context70.abrupt("break", 21);
            case 17:
              _context70.next = 19;
              return this.signoutSilentCallback(url);
            case 19:
              return _context70.abrupt("break", 21);
            case 20:
              throw new Error("invalid response_type in state");
            case 21:
            case "end":
              return _context70.stop();
          }
        }, _callee69, this);
      }));
      function signoutCallback() {
        return _signoutCallback.apply(this, arguments);
      }
      return signoutCallback;
    }()
    /**
     * Query OP for user's current signin status.
     *
     * @returns A promise object with session_state and subject identifier.
     */
    )
  }, {
    key: "querySessionStatus",
    value: (function () {
      var _querySessionStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee70() {
        var args,
          logger2,
          silentRequestTimeoutInSeconds,
          requestArgs,
          url,
          user,
          handle,
          navResponse,
          signinResponse,
          _args71 = arguments;
        return _regeneratorRuntime().wrap(function _callee70$(_context71) {
          while (1) switch (_context71.prev = _context71.next) {
            case 0:
              args = _args71.length > 0 && _args71[0] !== undefined ? _args71[0] : {};
              logger2 = this._logger.create("querySessionStatus");
              silentRequestTimeoutInSeconds = args.silentRequestTimeoutInSeconds, requestArgs = _objectWithoutProperties(args, _excluded9);
              url = this.settings.silent_redirect_uri;
              if (!url) {
                logger2["throw"](new Error("No silent_redirect_uri configured"));
              }
              _context71.next = 7;
              return this._loadUser();
            case 7:
              user = _context71.sent;
              _context71.next = 10;
              return this._iframeNavigator.prepare({
                silentRequestTimeoutInSeconds: silentRequestTimeoutInSeconds
              });
            case 10:
              handle = _context71.sent;
              _context71.next = 13;
              return this._signinStart(_objectSpread({
                request_type: "si:s",
                // this acts like a signin silent
                redirect_uri: url,
                prompt: "none",
                id_token_hint: this.settings.includeIdTokenInSilentRenew ? user == null ? void 0 : user.id_token : void 0,
                response_type: this.settings.query_status_response_type,
                scope: "openid",
                skipUserInfo: true
              }, requestArgs), handle);
            case 13:
              navResponse = _context71.sent;
              _context71.prev = 14;
              _context71.next = 17;
              return this._client.processSigninResponse(navResponse.url);
            case 17:
              signinResponse = _context71.sent;
              logger2.debug("got signin response");
              if (!(signinResponse.session_state && signinResponse.profile.sub)) {
                _context71.next = 22;
                break;
              }
              logger2.info("success for subject", signinResponse.profile.sub);
              return _context71.abrupt("return", {
                session_state: signinResponse.session_state,
                sub: signinResponse.profile.sub
              });
            case 22:
              logger2.info("success, user not authenticated");
              return _context71.abrupt("return", null);
            case 26:
              _context71.prev = 26;
              _context71.t0 = _context71["catch"](14);
              if (!(this.settings.monitorAnonymousSession && _context71.t0 instanceof _ErrorResponse)) {
                _context71.next = 34;
                break;
              }
              _context71.t1 = _context71.t0.error;
              _context71.next = _context71.t1 === "login_required" ? 32 : _context71.t1 === "consent_required" ? 32 : _context71.t1 === "interaction_required" ? 32 : _context71.t1 === "account_selection_required" ? 32 : 34;
              break;
            case 32:
              logger2.info("success for anonymous user");
              return _context71.abrupt("return", {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                session_state: _context71.t0.session_state
              });
            case 34:
              throw _context71.t0;
            case 35:
            case "end":
              return _context71.stop();
          }
        }, _callee70, this, [[14, 26]]);
      }));
      function querySessionStatus() {
        return _querySessionStatus.apply(this, arguments);
      }
      return querySessionStatus;
    }())
  }, {
    key: "_signin",
    value: function () {
      var _signin2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee71(args, handle, verifySub) {
        var navResponse;
        return _regeneratorRuntime().wrap(function _callee71$(_context72) {
          while (1) switch (_context72.prev = _context72.next) {
            case 0:
              _context72.next = 2;
              return this._signinStart(args, handle);
            case 2:
              navResponse = _context72.sent;
              _context72.next = 5;
              return this._signinEnd(navResponse.url, verifySub);
            case 5:
              return _context72.abrupt("return", _context72.sent);
            case 6:
            case "end":
              return _context72.stop();
          }
        }, _callee71, this);
      }));
      function _signin(_x54, _x55, _x56) {
        return _signin2.apply(this, arguments);
      }
      return _signin;
    }()
  }, {
    key: "_signinStart",
    value: function () {
      var _signinStart2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee72(args, handle) {
        var logger2, signinRequest;
        return _regeneratorRuntime().wrap(function _callee72$(_context73) {
          while (1) switch (_context73.prev = _context73.next) {
            case 0:
              logger2 = this._logger.create("_signinStart");
              _context73.prev = 1;
              _context73.next = 4;
              return this._client.createSigninRequest(args);
            case 4:
              signinRequest = _context73.sent;
              logger2.debug("got signin request");
              _context73.next = 8;
              return handle.navigate({
                url: signinRequest.url,
                state: signinRequest.state.id,
                response_mode: signinRequest.state.response_mode,
                scriptOrigin: this.settings.iframeScriptOrigin
              });
            case 8:
              return _context73.abrupt("return", _context73.sent);
            case 11:
              _context73.prev = 11;
              _context73.t0 = _context73["catch"](1);
              logger2.debug("error after preparing navigator, closing navigator window");
              handle.close();
              throw _context73.t0;
            case 16:
            case "end":
              return _context73.stop();
          }
        }, _callee72, this, [[1, 11]]);
      }));
      function _signinStart(_x57, _x58) {
        return _signinStart2.apply(this, arguments);
      }
      return _signinStart;
    }()
  }, {
    key: "_signinEnd",
    value: function () {
      var _signinEnd2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee73(url, verifySub) {
        var logger2, signinResponse, user;
        return _regeneratorRuntime().wrap(function _callee73$(_context74) {
          while (1) switch (_context74.prev = _context74.next) {
            case 0:
              logger2 = this._logger.create("_signinEnd");
              _context74.next = 3;
              return this._client.processSigninResponse(url);
            case 3:
              signinResponse = _context74.sent;
              logger2.debug("got signin response");
              _context74.next = 7;
              return this._buildUser(signinResponse, verifySub);
            case 7:
              user = _context74.sent;
              return _context74.abrupt("return", user);
            case 9:
            case "end":
              return _context74.stop();
          }
        }, _callee73, this);
      }));
      function _signinEnd(_x59, _x60) {
        return _signinEnd2.apply(this, arguments);
      }
      return _signinEnd;
    }()
  }, {
    key: "_buildUser",
    value: function () {
      var _buildUser2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee74(signinResponse, verifySub) {
        var logger2, user;
        return _regeneratorRuntime().wrap(function _callee74$(_context75) {
          while (1) switch (_context75.prev = _context75.next) {
            case 0:
              logger2 = this._logger.create("_buildUser");
              user = new _User2(signinResponse);
              if (!verifySub) {
                _context75.next = 7;
                break;
              }
              if (!(verifySub !== user.profile.sub)) {
                _context75.next = 6;
                break;
              }
              logger2.debug("current user does not match user returned from signin. sub from signin:", user.profile.sub);
              throw new _ErrorResponse(_objectSpread(_objectSpread({}, signinResponse), {}, {
                error: "login_required"
              }));
            case 6:
              logger2.debug("current user matches user returned from signin");
            case 7:
              _context75.next = 9;
              return this.storeUser(user);
            case 9:
              logger2.debug("user stored");
              _context75.next = 12;
              return this._events.load(user);
            case 12:
              return _context75.abrupt("return", user);
            case 13:
            case "end":
              return _context75.stop();
          }
        }, _callee74, this);
      }));
      function _buildUser(_x61, _x62) {
        return _buildUser2.apply(this, arguments);
      }
      return _buildUser;
    }()
    /**
     * Trigger a redirect of the current window to the end session endpoint.
     *
     * @returns A promise
     */
  }, {
    key: "signoutRedirect",
    value: (function () {
      var _signoutRedirect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee75() {
        var args,
          logger2,
          redirectMethod,
          requestArgs,
          handle,
          _args76 = arguments;
        return _regeneratorRuntime().wrap(function _callee75$(_context76) {
          while (1) switch (_context76.prev = _context76.next) {
            case 0:
              args = _args76.length > 0 && _args76[0] !== undefined ? _args76[0] : {};
              logger2 = this._logger.create("signoutRedirect");
              redirectMethod = args.redirectMethod, requestArgs = _objectWithoutProperties(args, _excluded10);
              _context76.next = 5;
              return this._redirectNavigator.prepare({
                redirectMethod: redirectMethod
              });
            case 5:
              handle = _context76.sent;
              _context76.next = 8;
              return this._signoutStart(_objectSpread({
                request_type: "so:r",
                post_logout_redirect_uri: this.settings.post_logout_redirect_uri
              }, requestArgs), handle);
            case 8:
              logger2.info("success");
            case 9:
            case "end":
              return _context76.stop();
          }
        }, _callee75, this);
      }));
      function signoutRedirect() {
        return _signoutRedirect.apply(this, arguments);
      }
      return signoutRedirect;
    }()
    /**
     * Process response (callback) from the end session endpoint.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise containing signout response
     *
     * @see {@link UserManager.signoutCallback}
     */
    )
  }, {
    key: "signoutRedirectCallback",
    value: (function () {
      var _signoutRedirectCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee76() {
        var url,
          logger2,
          response,
          _args77 = arguments;
        return _regeneratorRuntime().wrap(function _callee76$(_context77) {
          while (1) switch (_context77.prev = _context77.next) {
            case 0:
              url = _args77.length > 0 && _args77[0] !== undefined ? _args77[0] : window.location.href;
              logger2 = this._logger.create("signoutRedirectCallback");
              _context77.next = 4;
              return this._signoutEnd(url);
            case 4:
              response = _context77.sent;
              logger2.info("success");
              return _context77.abrupt("return", response);
            case 7:
            case "end":
              return _context77.stop();
          }
        }, _callee76, this);
      }));
      function signoutRedirectCallback() {
        return _signoutRedirectCallback.apply(this, arguments);
      }
      return signoutRedirectCallback;
    }()
    /**
     * Trigger a redirect of a popup window window to the end session endpoint.
     *
     * @returns A promise
     */
    )
  }, {
    key: "signoutPopup",
    value: (function () {
      var _signoutPopup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee77() {
        var args,
          logger2,
          popupWindowFeatures,
          popupWindowTarget,
          requestArgs,
          url,
          handle,
          _args78 = arguments;
        return _regeneratorRuntime().wrap(function _callee77$(_context78) {
          while (1) switch (_context78.prev = _context78.next) {
            case 0:
              args = _args78.length > 0 && _args78[0] !== undefined ? _args78[0] : {};
              logger2 = this._logger.create("signoutPopup");
              popupWindowFeatures = args.popupWindowFeatures, popupWindowTarget = args.popupWindowTarget, requestArgs = _objectWithoutProperties(args, _excluded11);
              url = this.settings.popup_post_logout_redirect_uri;
              _context78.next = 6;
              return this._popupNavigator.prepare({
                popupWindowFeatures: popupWindowFeatures,
                popupWindowTarget: popupWindowTarget
              });
            case 6:
              handle = _context78.sent;
              _context78.next = 9;
              return this._signout(_objectSpread({
                request_type: "so:p",
                post_logout_redirect_uri: url,
                // we're putting a dummy entry in here because we
                // need a unique id from the state for notification
                // to the parent window, which is necessary if we
                // plan to return back to the client after signout
                // and so we can close the popup after signout
                state: url == null ? void 0 : {}
              }, requestArgs), handle);
            case 9:
              logger2.info("success");
            case 10:
            case "end":
              return _context78.stop();
          }
        }, _callee77, this);
      }));
      function signoutPopup() {
        return _signoutPopup.apply(this, arguments);
      }
      return signoutPopup;
    }()
    /**
     * Process response (callback) from the end session endpoint from a popup window.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signoutCallback}
     */
    )
  }, {
    key: "signoutPopupCallback",
    value: (function () {
      var _signoutPopupCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee78() {
        var url,
          keepOpen,
          logger2,
          _args79 = arguments;
        return _regeneratorRuntime().wrap(function _callee78$(_context79) {
          while (1) switch (_context79.prev = _context79.next) {
            case 0:
              url = _args79.length > 0 && _args79[0] !== undefined ? _args79[0] : window.location.href;
              keepOpen = _args79.length > 1 && _args79[1] !== undefined ? _args79[1] : false;
              logger2 = this._logger.create("signoutPopupCallback");
              _context79.next = 5;
              return this._popupNavigator.callback(url, {
                keepOpen: keepOpen
              });
            case 5:
              logger2.info("success");
            case 6:
            case "end":
              return _context79.stop();
          }
        }, _callee78, this);
      }));
      function signoutPopupCallback() {
        return _signoutPopupCallback.apply(this, arguments);
      }
      return signoutPopupCallback;
    }())
  }, {
    key: "_signout",
    value: function () {
      var _signout2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee79(args, handle) {
        var navResponse;
        return _regeneratorRuntime().wrap(function _callee79$(_context80) {
          while (1) switch (_context80.prev = _context80.next) {
            case 0:
              _context80.next = 2;
              return this._signoutStart(args, handle);
            case 2:
              navResponse = _context80.sent;
              _context80.next = 5;
              return this._signoutEnd(navResponse.url);
            case 5:
              return _context80.abrupt("return", _context80.sent);
            case 6:
            case "end":
              return _context80.stop();
          }
        }, _callee79, this);
      }));
      function _signout(_x63, _x64) {
        return _signout2.apply(this, arguments);
      }
      return _signout;
    }()
  }, {
    key: "_signoutStart",
    value: function () {
      var _signoutStart2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee80() {
        var args,
          handle,
          _a,
          logger2,
          user,
          id_token,
          signoutRequest,
          _args81 = arguments;
        return _regeneratorRuntime().wrap(function _callee80$(_context81) {
          while (1) switch (_context81.prev = _context81.next) {
            case 0:
              args = _args81.length > 0 && _args81[0] !== undefined ? _args81[0] : {};
              handle = _args81.length > 1 ? _args81[1] : undefined;
              logger2 = this._logger.create("_signoutStart");
              _context81.prev = 3;
              _context81.next = 6;
              return this._loadUser();
            case 6:
              user = _context81.sent;
              logger2.debug("loaded current user from storage");
              if (!this.settings.revokeTokensOnSignout) {
                _context81.next = 11;
                break;
              }
              _context81.next = 11;
              return this._revokeInternal(user);
            case 11:
              id_token = args.id_token_hint || user && user.id_token;
              if (id_token) {
                logger2.debug("setting id_token_hint in signout request");
                args.id_token_hint = id_token;
              }
              _context81.next = 15;
              return this.removeUser();
            case 15:
              logger2.debug("user removed, creating signout request");
              _context81.next = 18;
              return this._client.createSignoutRequest(args);
            case 18:
              signoutRequest = _context81.sent;
              logger2.debug("got signout request");
              _context81.next = 22;
              return handle.navigate({
                url: signoutRequest.url,
                state: (_a = signoutRequest.state) == null ? void 0 : _a.id,
                scriptOrigin: this.settings.iframeScriptOrigin
              });
            case 22:
              return _context81.abrupt("return", _context81.sent);
            case 25:
              _context81.prev = 25;
              _context81.t0 = _context81["catch"](3);
              logger2.debug("error after preparing navigator, closing navigator window");
              handle.close();
              throw _context81.t0;
            case 30:
            case "end":
              return _context81.stop();
          }
        }, _callee80, this, [[3, 25]]);
      }));
      function _signoutStart() {
        return _signoutStart2.apply(this, arguments);
      }
      return _signoutStart;
    }()
  }, {
    key: "_signoutEnd",
    value: function () {
      var _signoutEnd2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee81(url) {
        var logger2, signoutResponse;
        return _regeneratorRuntime().wrap(function _callee81$(_context82) {
          while (1) switch (_context82.prev = _context82.next) {
            case 0:
              logger2 = this._logger.create("_signoutEnd");
              _context82.next = 3;
              return this._client.processSignoutResponse(url);
            case 3:
              signoutResponse = _context82.sent;
              logger2.debug("got signout response");
              return _context82.abrupt("return", signoutResponse);
            case 6:
            case "end":
              return _context82.stop();
          }
        }, _callee81, this);
      }));
      function _signoutEnd(_x65) {
        return _signoutEnd2.apply(this, arguments);
      }
      return _signoutEnd;
    }()
    /**
     * Trigger a silent request (via an iframe) to the end session endpoint.
     *
     * @returns A promise
     */
  }, {
    key: "signoutSilent",
    value: (function () {
      var _signoutSilent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee82() {
        var args,
          _a,
          logger2,
          silentRequestTimeoutInSeconds,
          requestArgs,
          id_token_hint,
          url,
          handle,
          _args83 = arguments;
        return _regeneratorRuntime().wrap(function _callee82$(_context83) {
          while (1) switch (_context83.prev = _context83.next) {
            case 0:
              args = _args83.length > 0 && _args83[0] !== undefined ? _args83[0] : {};
              logger2 = this._logger.create("signoutSilent");
              silentRequestTimeoutInSeconds = args.silentRequestTimeoutInSeconds, requestArgs = _objectWithoutProperties(args, _excluded12);
              if (!this.settings.includeIdTokenInSilentSignout) {
                _context83.next = 15;
                break;
              }
              _context83.next = 6;
              return this._loadUser();
            case 6:
              _context83.t1 = _a = _context83.sent;
              if (!(_context83.t1 == null)) {
                _context83.next = 11;
                break;
              }
              _context83.t2 = void 0;
              _context83.next = 12;
              break;
            case 11:
              _context83.t2 = _a.id_token;
            case 12:
              _context83.t0 = _context83.t2;
              _context83.next = 16;
              break;
            case 15:
              _context83.t0 = void 0;
            case 16:
              id_token_hint = _context83.t0;
              url = this.settings.popup_post_logout_redirect_uri;
              _context83.next = 20;
              return this._iframeNavigator.prepare({
                silentRequestTimeoutInSeconds: silentRequestTimeoutInSeconds
              });
            case 20:
              handle = _context83.sent;
              _context83.next = 23;
              return this._signout(_objectSpread({
                request_type: "so:s",
                post_logout_redirect_uri: url,
                id_token_hint: id_token_hint
              }, requestArgs), handle);
            case 23:
              logger2.info("success");
            case 24:
            case "end":
              return _context83.stop();
          }
        }, _callee82, this);
      }));
      function signoutSilent() {
        return _signoutSilent.apply(this, arguments);
      }
      return signoutSilent;
    }()
    /**
     * Notify the parent window of response (callback) from the end session endpoint.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signoutCallback}
     */
    )
  }, {
    key: "signoutSilentCallback",
    value: (function () {
      var _signoutSilentCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee83() {
        var url,
          logger2,
          _args84 = arguments;
        return _regeneratorRuntime().wrap(function _callee83$(_context84) {
          while (1) switch (_context84.prev = _context84.next) {
            case 0:
              url = _args84.length > 0 && _args84[0] !== undefined ? _args84[0] : window.location.href;
              logger2 = this._logger.create("signoutSilentCallback");
              _context84.next = 4;
              return this._iframeNavigator.callback(url);
            case 4:
              logger2.info("success");
            case 5:
            case "end":
              return _context84.stop();
          }
        }, _callee83, this);
      }));
      function signoutSilentCallback() {
        return _signoutSilentCallback.apply(this, arguments);
      }
      return signoutSilentCallback;
    }())
  }, {
    key: "revokeTokens",
    value: function () {
      var _revokeTokens = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee84(types) {
        var user;
        return _regeneratorRuntime().wrap(function _callee84$(_context85) {
          while (1) switch (_context85.prev = _context85.next) {
            case 0:
              _context85.next = 2;
              return this._loadUser();
            case 2:
              user = _context85.sent;
              _context85.next = 5;
              return this._revokeInternal(user, types);
            case 5:
            case "end":
              return _context85.stop();
          }
        }, _callee84, this);
      }));
      function revokeTokens(_x66) {
        return _revokeTokens.apply(this, arguments);
      }
      return revokeTokens;
    }()
  }, {
    key: "_revokeInternal",
    value: function () {
      var _revokeInternal2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee85(user) {
        var types,
          logger2,
          typesPresent,
          _iterator6,
          _step6,
          type,
          _args86 = arguments;
        return _regeneratorRuntime().wrap(function _callee85$(_context86) {
          while (1) switch (_context86.prev = _context86.next) {
            case 0:
              types = _args86.length > 1 && _args86[1] !== undefined ? _args86[1] : this.settings.revokeTokenTypes;
              logger2 = this._logger.create("_revokeInternal");
              if (user) {
                _context86.next = 4;
                break;
              }
              return _context86.abrupt("return");
            case 4:
              typesPresent = types.filter(function (type) {
                return typeof user[type] === "string";
              });
              if (typesPresent.length) {
                _context86.next = 8;
                break;
              }
              logger2.debug("no need to revoke due to no token(s)");
              return _context86.abrupt("return");
            case 8:
              _iterator6 = _createForOfIteratorHelper(typesPresent);
              _context86.prev = 9;
              _iterator6.s();
            case 11:
              if ((_step6 = _iterator6.n()).done) {
                _context86.next = 19;
                break;
              }
              type = _step6.value;
              _context86.next = 15;
              return this._client.revokeToken(user[type],
              // eslint-disable-line @typescript-eslint/no-non-null-assertion
              type);
            case 15:
              logger2.info("".concat(type, " revoked successfully"));
              if (type !== "access_token") {
                user[type] = null;
              }
            case 17:
              _context86.next = 11;
              break;
            case 19:
              _context86.next = 24;
              break;
            case 21:
              _context86.prev = 21;
              _context86.t0 = _context86["catch"](9);
              _iterator6.e(_context86.t0);
            case 24:
              _context86.prev = 24;
              _iterator6.f();
              return _context86.finish(24);
            case 27:
              _context86.next = 29;
              return this.storeUser(user);
            case 29:
              logger2.debug("user stored");
              _context86.next = 32;
              return this._events.load(user);
            case 32:
            case "end":
              return _context86.stop();
          }
        }, _callee85, this, [[9, 21, 24, 27]]);
      }));
      function _revokeInternal(_x67) {
        return _revokeInternal2.apply(this, arguments);
      }
      return _revokeInternal;
    }()
    /**
     * Enables silent renew for the `UserManager`.
     */
  }, {
    key: "startSilentRenew",
    value: function startSilentRenew() {
      this._logger.create("startSilentRenew");
      void this._silentRenewService.start();
    }
    /**
     * Disables silent renew for the `UserManager`.
     */
  }, {
    key: "stopSilentRenew",
    value: function stopSilentRenew() {
      this._silentRenewService.stop();
    }
  }, {
    key: "_userStoreKey",
    get: function get() {
      return "user:".concat(this.settings.authority, ":").concat(this.settings.client_id);
    }
  }, {
    key: "_loadUser",
    value: function () {
      var _loadUser2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee86() {
        var logger2, storageString;
        return _regeneratorRuntime().wrap(function _callee86$(_context87) {
          while (1) switch (_context87.prev = _context87.next) {
            case 0:
              logger2 = this._logger.create("_loadUser");
              _context87.next = 3;
              return this.settings.userStore.get(this._userStoreKey);
            case 3:
              storageString = _context87.sent;
              if (!storageString) {
                _context87.next = 7;
                break;
              }
              logger2.debug("user storageString loaded");
              return _context87.abrupt("return", _User2.fromStorageString(storageString));
            case 7:
              logger2.debug("no user storageString");
              return _context87.abrupt("return", null);
            case 9:
            case "end":
              return _context87.stop();
          }
        }, _callee86, this);
      }));
      function _loadUser() {
        return _loadUser2.apply(this, arguments);
      }
      return _loadUser;
    }()
  }, {
    key: "storeUser",
    value: function () {
      var _storeUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee87(user) {
        var logger2, storageString;
        return _regeneratorRuntime().wrap(function _callee87$(_context88) {
          while (1) switch (_context88.prev = _context88.next) {
            case 0:
              logger2 = this._logger.create("storeUser");
              if (!user) {
                _context88.next = 8;
                break;
              }
              logger2.debug("storing user");
              storageString = user.toStorageString();
              _context88.next = 6;
              return this.settings.userStore.set(this._userStoreKey, storageString);
            case 6:
              _context88.next = 11;
              break;
            case 8:
              this._logger.debug("removing user");
              _context88.next = 11;
              return this.settings.userStore.remove(this._userStoreKey);
            case 11:
            case "end":
              return _context88.stop();
          }
        }, _callee87, this);
      }));
      function storeUser(_x68) {
        return _storeUser.apply(this, arguments);
      }
      return storeUser;
    }()
    /**
     * Removes stale state entries in storage for incomplete authorize requests.
     */
  }, {
    key: "clearStaleState",
    value: (function () {
      var _clearStaleState2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee88() {
        return _regeneratorRuntime().wrap(function _callee88$(_context89) {
          while (1) switch (_context89.prev = _context89.next) {
            case 0:
              _context89.next = 2;
              return this._client.clearStaleState();
            case 2:
            case "end":
              return _context89.stop();
          }
        }, _callee88, this);
      }));
      function clearStaleState() {
        return _clearStaleState2.apply(this, arguments);
      }
      return clearStaleState;
    }())
  }]);
}();

// package.json
var version = "3.0.1";

// src/Version.ts
var _Version = version;
// Annotate the CommonJS export names for ESM import in node:
0 && (false);

/***/ }),

/***/ "./node_modules/react-oidc-context/dist/umd/react-oidc-context.js":
/*!************************************************************************!*\
  !*** ./node_modules/react-oidc-context/dist/umd/react-oidc-context.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _excluded = ["children", "onSigninCallback", "skipSigninCallback", "matchSignoutCallback", "onSignoutCallback", "onRemoveUser", "userManager"];
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function __export(target, all) {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = function __copyProps(to, from, except, desc) {
  if (from && _typeof(from) === "object" || typeof from === "function") {
    var _iterator = _createForOfIteratorHelper(__getOwnPropNames(from)),
      _step;
    try {
      var _loop = function _loop() {
        var key = _step.value;
        if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: function get() {
            return from[key];
          },
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return to;
};
var __toESM = function __toESM(mod, isNodeMode, target) {
  return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod);
};
var __toCommonJS = function __toCommonJS(mod) {
  return __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AuthContext: function AuthContext() {
    return _AuthContext;
  },
  AuthProvider: function AuthProvider() {
    return _AuthProvider;
  },
  hasAuthParams: function hasAuthParams() {
    return _hasAuthParams;
  },
  useAuth: function useAuth() {
    return _useAuth;
  },
  withAuth: function withAuth() {
    return _withAuth;
  },
  withAuthenticationRequired: function withAuthenticationRequired() {
    return _withAuthenticationRequired;
  }
});
module.exports = __toCommonJS(src_exports);

// src/AuthContext.ts
var import_react = __toESM(__webpack_require__(/*! react */ "react"));
var _AuthContext = import_react["default"].createContext(void 0);
_AuthContext.displayName = "AuthContext";

// src/AuthProvider.tsx
var import_react2 = __toESM(__webpack_require__(/*! react */ "react"));
var import_oidc_client_ts = __webpack_require__(/*! oidc-client-ts */ "./node_modules/oidc-client-ts/dist/umd/oidc-client-ts.js");

// src/AuthState.ts
var initialAuthState = {
  isLoading: true,
  isAuthenticated: false
};

// src/reducer.ts
var reducer = function reducer(state, action) {
  switch (action.type) {
    case "INITIALISED":
    case "USER_LOADED":
      return _objectSpread(_objectSpread({}, state), {}, {
        user: action.user,
        isLoading: false,
        isAuthenticated: action.user ? !action.user.expired : false,
        error: void 0
      });
    case "USER_SIGNED_OUT":
    case "USER_UNLOADED":
      return _objectSpread(_objectSpread({}, state), {}, {
        user: void 0,
        isAuthenticated: false
      });
    case "NAVIGATOR_INIT":
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoading: true,
        activeNavigator: action.method
      });
    case "NAVIGATOR_CLOSE":
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoading: false,
        activeNavigator: void 0
      });
    case "ERROR":
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoading: false,
        error: action.error
      });
    default:
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoading: false,
        error: new Error("unknown type ".concat(action["type"]))
      });
  }
};

// src/utils.ts
var _hasAuthParams = function _hasAuthParams() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location;
  var searchParams = new URLSearchParams(location.search);
  if ((searchParams.get("code") || searchParams.get("error")) && searchParams.get("state")) {
    return true;
  }
  searchParams = new URLSearchParams(location.hash.replace("#", "?"));
  if ((searchParams.get("code") || searchParams.get("error")) && searchParams.get("state")) {
    return true;
  }
  return false;
};
var normalizeErrorFn = function normalizeErrorFn(fallbackMessage) {
  return function (error) {
    if (error instanceof Error) {
      return error;
    }
    return new Error(fallbackMessage);
  };
};
var signinError = normalizeErrorFn("Sign-in failed");
var signoutError = normalizeErrorFn("Sign-out failed");

// src/AuthProvider.tsx
var userManagerContextKeys = ["clearStaleState", "querySessionStatus", "revokeTokens", "startSilentRenew", "stopSilentRenew"];
var navigatorKeys = ["signinPopup", "signinSilent", "signinRedirect", "signinResourceOwnerCredentials", "signoutPopup", "signoutRedirect", "signoutSilent"];
var unsupportedEnvironment = function unsupportedEnvironment(fnName) {
  return function () {
    throw new Error("UserManager#".concat(fnName, " was called from an unsupported context. If this is a server-rendered page, defer this call with useEffect() or pass a custom UserManager implementation."));
  };
};
var UserManagerImpl = typeof window === "undefined" ? null : import_oidc_client_ts.UserManager;
var _AuthProvider = function _AuthProvider(props) {
  var children = props.children,
    onSigninCallback = props.onSigninCallback,
    skipSigninCallback = props.skipSigninCallback,
    matchSignoutCallback = props.matchSignoutCallback,
    onSignoutCallback = props.onSignoutCallback,
    onRemoveUser = props.onRemoveUser,
    _props$userManager = props.userManager,
    userManagerProp = _props$userManager === void 0 ? null : _props$userManager,
    userManagerSettings = _objectWithoutProperties(props, _excluded);
  var _ref = (0, import_react2.useState)(function () {
      return userManagerProp != null ? userManagerProp : UserManagerImpl ? new UserManagerImpl(userManagerSettings) : {
        settings: userManagerSettings
      };
    }),
    _ref2 = _slicedToArray(_ref, 1),
    userManager = _ref2[0];
  var _ref3 = (0, import_react2.useReducer)(reducer, initialAuthState),
    _ref4 = _slicedToArray(_ref3, 2),
    state = _ref4[0],
    dispatch = _ref4[1];
  var userManagerContext = (0, import_react2.useMemo)(function () {
    return Object.assign({
      settings: userManager.settings,
      events: userManager.events
    }, Object.fromEntries(userManagerContextKeys.map(function (key) {
      var _a, _b;
      return [key, (_b = (_a = userManager[key]) == null ? void 0 : _a.bind(userManager)) != null ? _b : unsupportedEnvironment(key)];
    })), Object.fromEntries(navigatorKeys.map(function (key) {
      return [key, userManager[key] ? ( /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(args) {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                dispatch({
                  type: "NAVIGATOR_INIT",
                  method: key
                });
                _context.prev = 1;
                _context.next = 4;
                return userManager[key](args);
              case 4:
                return _context.abrupt("return", _context.sent);
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                dispatch({
                  type: "ERROR",
                  error: _context.t0
                });
                return _context.abrupt("return", null);
              case 11:
                _context.prev = 11;
                dispatch({
                  type: "NAVIGATOR_CLOSE"
                });
                return _context.finish(11);
              case 14:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 7, 11, 14]]);
        }));
        return function (_x) {
          return _ref5.apply(this, arguments);
        };
      }()) : unsupportedEnvironment(key)];
    })));
  }, [userManager]);
  var didInitialize = (0, import_react2.useRef)(false);
  (0, import_react2.useEffect)(function () {
    if (!userManager || didInitialize.current) {
      return;
    }
    didInitialize.current = true;
    void _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var user;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            user = null;
            _context2.prev = 1;
            if (!(_hasAuthParams() && !skipSigninCallback)) {
              _context2.next = 10;
              break;
            }
            _context2.next = 5;
            return userManager.signinCallback();
          case 5:
            user = _context2.sent;
            _context2.t0 = onSigninCallback;
            if (!_context2.t0) {
              _context2.next = 10;
              break;
            }
            _context2.next = 10;
            return onSigninCallback(user);
          case 10:
            if (user) {
              _context2.next = 16;
              break;
            }
            _context2.next = 13;
            return userManager.getUser();
          case 13:
            _context2.t1 = _context2.sent;
            _context2.next = 17;
            break;
          case 16:
            _context2.t1 = user;
          case 17:
            user = _context2.t1;
            dispatch({
              type: "INITIALISED",
              user: user
            });
            _context2.next = 24;
            break;
          case 21:
            _context2.prev = 21;
            _context2.t2 = _context2["catch"](1);
            dispatch({
              type: "ERROR",
              error: signinError(_context2.t2)
            });
          case 24:
            _context2.prev = 24;
            if (!(matchSignoutCallback && matchSignoutCallback(userManager.settings))) {
              _context2.next = 32;
              break;
            }
            _context2.next = 28;
            return userManager.signoutCallback();
          case 28:
            _context2.t3 = onSignoutCallback;
            if (!_context2.t3) {
              _context2.next = 32;
              break;
            }
            _context2.next = 32;
            return onSignoutCallback();
          case 32:
            _context2.next = 37;
            break;
          case 34:
            _context2.prev = 34;
            _context2.t4 = _context2["catch"](24);
            dispatch({
              type: "ERROR",
              error: signoutError(_context2.t4)
            });
          case 37:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 21], [24, 34]]);
    }))();
  }, [userManager, skipSigninCallback, onSigninCallback, onSignoutCallback, matchSignoutCallback]);
  (0, import_react2.useEffect)(function () {
    if (!userManager) return void 0;
    var handleUserLoaded = function handleUserLoaded(user) {
      dispatch({
        type: "USER_LOADED",
        user: user
      });
    };
    userManager.events.addUserLoaded(handleUserLoaded);
    var handleUserUnloaded = function handleUserUnloaded() {
      dispatch({
        type: "USER_UNLOADED"
      });
    };
    userManager.events.addUserUnloaded(handleUserUnloaded);
    var handleUserSignedOut = function handleUserSignedOut() {
      dispatch({
        type: "USER_SIGNED_OUT"
      });
    };
    userManager.events.addUserSignedOut(handleUserSignedOut);
    var handleSilentRenewError = function handleSilentRenewError(error) {
      dispatch({
        type: "ERROR",
        error: error
      });
    };
    userManager.events.addSilentRenewError(handleSilentRenewError);
    return function () {
      userManager.events.removeUserLoaded(handleUserLoaded);
      userManager.events.removeUserUnloaded(handleUserUnloaded);
      userManager.events.removeUserSignedOut(handleUserSignedOut);
      userManager.events.removeSilentRenewError(handleSilentRenewError);
    };
  }, [userManager]);
  var removeUser = (0, import_react2.useCallback)(userManager ? function () {
    return userManager.removeUser().then(onRemoveUser);
  } : unsupportedEnvironment("removeUser"), [userManager, onRemoveUser]);
  return /* @__PURE__ */import_react2["default"].createElement(_AuthContext.Provider, {
    value: _objectSpread(_objectSpread(_objectSpread({}, state), userManagerContext), {}, {
      removeUser: removeUser
    })
  }, children);
};

// src/useAuth.ts
var import_react3 = __toESM(__webpack_require__(/*! react */ "react"));
var _useAuth = function _useAuth() {
  var context = import_react3["default"].useContext(_AuthContext);
  if (!context) {
    console.warn("AuthProvider context is undefined, please verify you are calling useAuth() as child of a <AuthProvider> component.");
  }
  return context;
};

// src/withAuth.tsx
var import_react4 = __toESM(__webpack_require__(/*! react */ "react"));
function _withAuth(Component) {
  var displayName = "withAuth(".concat(Component.displayName || Component.name, ")");
  var C = function C(props) {
    var auth = _useAuth();
    return /* @__PURE__ */import_react4["default"].createElement(Component, _objectSpread(_objectSpread({}, props), {}, {
      auth: auth
    }));
  };
  C.displayName = displayName;
  return C;
}

// src/withAuthenticationRequired.tsx
var import_react5 = __toESM(__webpack_require__(/*! react */ "react"));
var _withAuthenticationRequired = function _withAuthenticationRequired(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$OnRedirectin = options.OnRedirecting,
    OnRedirecting = _options$OnRedirectin === void 0 ? function () {
      return /* @__PURE__ */import_react5["default"].createElement(import_react5["default"].Fragment, null);
    } : _options$OnRedirectin,
    onBeforeSignin = options.onBeforeSignin,
    signinRedirectArgs = options.signinRedirectArgs;
  var displayName = "withAuthenticationRequired(".concat(Component.displayName || Component.name, ")");
  var C = function C(props) {
    var auth = _useAuth();
    import_react5["default"].useEffect(function () {
      if (_hasAuthParams() || auth.isLoading || auth.activeNavigator || auth.isAuthenticated) {
        return;
      }
      void _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = onBeforeSignin;
              if (!_context3.t0) {
                _context3.next = 4;
                break;
              }
              _context3.next = 4;
              return onBeforeSignin();
            case 4:
              _context3.next = 6;
              return auth.signinRedirect(signinRedirectArgs);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    }, [auth.isLoading, auth.isAuthenticated, onBeforeSignin, signinRedirectArgs]);
    return auth.isAuthenticated ? /* @__PURE__ */import_react5["default"].createElement(Component, _objectSpread({}, props)) : OnRedirecting();
  };
  C.displayName = displayName;
  return C;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (false);

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var g;

// This works in non-strict mode
g = function () {
  return this;
}();
try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "./src/components/Authenticated.js":
/*!*****************************************!*\
  !*** ./src/components/Authenticated.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Noodl = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
var _require = __webpack_require__(/*! react */ "react"),
  useEffect = _require.useEffect,
  useState = _require.useState;
var _require2 = __webpack_require__(/*! react-oidc-context */ "./node_modules/react-oidc-context/dist/umd/react-oidc-context.js"),
  AuthProvider = _require2.AuthProvider,
  useAuth = _require2.useAuth;
var jsonpath = __webpack_require__(/*! jsonpath */ "./node_modules/jsonpath/jsonpath.js");
var _require3 = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/build/esm/index.js"),
  jwtDecode = _require3.jwtDecode;
function Authenticated(_ref) {
  var children = _ref.children,
    _ref$role_claim_json_ = _ref.role_claim_json_path,
    role_claim_json_path = _ref$role_claim_json_ === void 0 ? "roles" : _ref$role_claim_json_,
    _ref$required_roles = _ref.required_roles,
    required_roles = _ref$required_roles === void 0 ? "" : _ref$required_roles,
    _ref$currentUser = _ref.currentUser,
    currentUser = _ref$currentUser === void 0 ? function () {} : _ref$currentUser,
    _ref$hasResourceAcces = _ref.hasResourceAccess,
    hasResourceAccess = _ref$hasResourceAcces === void 0 ? function () {} : _ref$hasResourceAcces;
  var auth = useAuth();
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    decoded = _useState2[0],
    setDecoded = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    hasAccess = _useState4[0],
    setHasAccess = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    requiredRoles = _useState6[0],
    setRequiredRoles = _useState6[1];
  useEffect(function () {
    var _auth$user, _auth$user2;
    currentUser(auth.isAuthenticated ? auth === null || auth === void 0 || (_auth$user = auth.user) === null || _auth$user === void 0 || (_auth$user = _auth$user.profile) === null || _auth$user === void 0 ? void 0 : _auth$user.sub : "");
    if (auth !== null && auth !== void 0 && auth.isAuthenticated && (_auth$user2 = auth.user) !== null && _auth$user2 !== void 0 && _auth$user2.access_token) {
      var accessToken = auth.user.access_token;
      setDecoded(jwtDecode(accessToken));
      setRequiredRoles(required_roles.split(",").filter(function (e) {
        return e;
      }));
    }
  }, [auth]);

  // useEffect(() => {
  //     console.log(decoded)
  // }, [decoded])

  // useEffect(() => {
  //     console.log(requiredRoles)
  // }, [requiredRoles])

  useEffect(function () {
    // console.log(`Has Access: ${hasAccess}`)
    hasResourceAccess(hasAccess);
  }, [hasAccess]);
  useEffect(function () {
    if (decoded && (requiredRoles === null || requiredRoles === void 0 ? void 0 : requiredRoles.length) > 0) {
      try {
        var _jsonpath$query;
        var currentRoles = ((_jsonpath$query = jsonpath.query(decoded, role_claim_json_path)) === null || _jsonpath$query === void 0 ? void 0 : _jsonpath$query[0]) || [];
        if (!(currentRoles !== null && currentRoles !== void 0 && currentRoles.length)) {
          return;
        }
        var decodedRolesMap = currentRoles.reduce(function (map, role) {
          map[role] = true;
          return map;
        }, {});
        var _iterator = _createForOfIteratorHelper(requiredRoles),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var role = _step.value;
            if (decodedRolesMap[role]) {
              setHasAccess(true);
              return;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    } else if (decoded && !(requiredRoles !== null && requiredRoles !== void 0 && requiredRoles.length)) {
      setHasAccess(true);
      return;
    }
  }, [requiredRoles, decoded]);
  switch (auth.activeNavigator) {
    case "signinSilent":
      return /*#__PURE__*/React.createElement("div", null, "Signing you in...");
    case "signoutRedirect":
      return /*#__PURE__*/React.createElement("div", null, "Signing you out...");
  }
  if (auth.isLoading) {
    return /*#__PURE__*/React.createElement("div", null, "Loading...");
  }
  if (auth !== null && auth !== void 0 && auth.isAuthenticated) {
    return children;
  } else {
    return auth.signinRedirect();
  }
}
var AuthenticatedProvider = function AuthenticatedProvider(_ref2) {
  var children = _ref2.children,
    _ref2$currentUser = _ref2.currentUser,
    currentUser = _ref2$currentUser === void 0 ? function () {} : _ref2$currentUser,
    _ref2$hasResourceAcce = _ref2.hasResourceAccess,
    hasResourceAccess = _ref2$hasResourceAcce === void 0 ? function () {} : _ref2$hasResourceAcce,
    _ref2$authority = _ref2.authority,
    authority = _ref2$authority === void 0 ? "http://localhost:9000/realms/test" : _ref2$authority,
    _ref2$client_id = _ref2.client_id,
    client_id = _ref2$client_id === void 0 ? "test" : _ref2$client_id,
    _ref2$redirect_uri = _ref2.redirect_uri,
    redirect_uri = _ref2$redirect_uri === void 0 ? "http://localhost:8574/test" : _ref2$redirect_uri,
    _ref2$audience = _ref2.audience,
    audience = _ref2$audience === void 0 ? "test" : _ref2$audience,
    _ref2$role_claim_json = _ref2.role_claim_json_path,
    role_claim_json_path = _ref2$role_claim_json === void 0 ? "roles" : _ref2$role_claim_json,
    _ref2$required_roles = _ref2.required_roles,
    required_roles = _ref2$required_roles === void 0 ? "" : _ref2$required_roles;
  var onSigninCallback = function onSigninCallback(_user) {
    window.history.replaceState({}, document.title, window.location.pathname);
  };
  return /*#__PURE__*/React.createElement(AuthProvider, {
    authority: authority,
    client_id: client_id,
    redirect_uri: redirect_uri,
    onSigninCallback: onSigninCallback
  }, /*#__PURE__*/React.createElement(Authenticated, {
    audience: audience,
    role_claim_json_path: role_claim_json_path,
    required_roles: required_roles,
    currentUser: currentUser,
    hasResourceAccess: hasResourceAccess
  }, children));
};
var AuthenticatedNode = Noodl.defineReactNode({
  name: "Authenticated",
  category: "Tutorial",
  getReactComponent: function getReactComponent() {
    return AuthenticatedProvider;
  },
  inputProps: {
    authority: {
      type: "string",
      "default": "http://localhost:9000/realms/test",
      displayName: "Authority"
    },
    client_id: {
      type: "string",
      "default": "test",
      displayName: "Cliend ID"
    },
    redirect_uri: {
      type: "string",
      "default": "http://localhost:8574/test",
      displayName: "Redirect URI"
    },
    audience: {
      type: "string",
      "default": "test",
      displayName: "Audience"
    },
    role_claim_json_path: {
      type: "string",
      "default": "roles",
      displayName: "Role Claim"
    },
    required_roles: {
      type: "string",
      "default": "",
      displayName: "Required Roles"
    }
  },
  outputProps: {
    currentUser: {
      type: "data",
      displayName: "Current User"
    },
    hasResourceAccess: {
      type: "data",
      displayName: "Has Resource access"
    }
  }
});
module.exports = {
  AuthenticatedNode: AuthenticatedNode
};

/***/ }),

/***/ "./src/components/Logout.js":
/*!**********************************!*\
  !*** ./src/components/Logout.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Noodl = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
var _require = __webpack_require__(/*! react-oidc-context */ "./node_modules/react-oidc-context/dist/umd/react-oidc-context.js"),
  useAuth = _require.useAuth;
var Logout = function Logout(_ref) {
  var children = _ref.children,
    _onClick = _ref.onClick;
  var auth = useAuth();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: 'none'
    },
    onClick: function onClick() {
      auth.revokeTokens();
      void auth.removeUser();
      _onClick();
    }
  }, children);
};
var LogoutNode = Noodl.defineReactNode({
  name: "Logout",
  category: "Tutorial",
  getReactComponent: function getReactComponent() {
    return Logout;
  },
  inputProps: {

    // backgroundColor: { type: "color", default: "white" },
    // marginBottom: {
    //     type: { name: "number", units: ["px"], defaultUnit: "px" },
    //     default: 10,
    // },
  },
  outputProps: {
    onClick: {
      type: "signal",
      displayName: "Click"
    }
  }
});
module.exports = {
  LogoutNode: LogoutNode
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Noodl = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
var _require = __webpack_require__(/*! ./components/Authenticated */ "./src/components/Authenticated.js"),
  AuthenticatedNode = _require.AuthenticatedNode;
var _require2 = __webpack_require__(/*! ./components/Logout */ "./src/components/Logout.js"),
  LogoutNode = _require2.LogoutNode;
Noodl.defineModule({
  reactNodes: [AuthenticatedNode, LogoutNode],
  nodes: [],
  setup: function setup() {
    //this is called once on startup
  }
});

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map