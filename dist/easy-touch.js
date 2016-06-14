(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Touch"] = factory();
	else
		root["Touch"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function Touch(dom) {
	  if (dom == null || (typeof dom === 'undefined' ? 'undefined' : _typeof(dom)) !== 'object') throw new Error('dom is invalid');
	  this.dom = dom;
	  this.startX = 0;
	  this.startY = 0;
	  this.endX = 0;
	  this.endY = 0;
	  this.actions = ['pan'];
	  this.effectiveDistance = 10;
	  this.callbacks = {
	    panFn: null
	  };
	}
	
	Touch.prototype = {
	  on: function on(action, cb) {
	    var _this = this;
	
	    if (typeof action !== 'string' || typeof cb !== 'function') throw new Error('"on" method params is invalid');
	    this.verifyAction(action);
	    this.setCallbacks(action, cb);
	    this.dom.addEventListener('touchstart', function (e) {
	      return _this.onTouchstart(e);
	    }, false);
	    this.dom.addEventListener('touchend', function (e) {
	      return _this.onTouchend(e);
	    }, false);
	  },
	
	  onTouchstart: function onTouchstart(e) {
	    this.startY = e.changedTouches[0].pageY;
	    this.startX = e.changedTouches[0].pageX;
	  },
	
	  onTouchend: function onTouchend(e) {
	    this.endX = e.changedTouches[0].pageX;
	    this.endY = e.changedTouches[0].pageY;
	    var distanceY = this.endY - this.startY;
	    var distanceX = this.endX - this.startX;
	    this.handlePanCb(distanceX, distanceY);
	  },
	
	  handlePanCb: function handlePanCb(distanceX, distanceY) {
	    if (this.callbacks.panFn == null) return;
	    // vertical direction
	    if (Math.abs(distanceY) > this.effectiveDistance && Math.abs(distanceY) >= Math.abs(distanceX)) {
	      this.callbacks.panFn({ type: distanceY < 0 ? 'panup' : 'pandown' });
	    } else if (Math.abs(distanceX) > this.effectiveDistance && Math.abs(distanceX) > Math.abs(distanceY)) {
	      // horizontal direction
	      this.callbacks.panFn({ type: distanceX < 0 ? 'panleft' : 'panright' });
	    }
	  },
	  setCallbacks: function setCallbacks(action, cb) {
	    switch (action) {
	      case 'pan':
	        this.callbacks.panFn = cb;
	        break;
	    }
	  },
	
	
	  verifyAction: function verifyAction(action) {
	    if (this.actions.indexOf(action) < 0) throw new Error('not exists "' + action + '" action, only support "' + this.actions.join(',') + '" at present.');
	  }
	
	};
	
	module.exports = Touch;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=easy-touch.js.map