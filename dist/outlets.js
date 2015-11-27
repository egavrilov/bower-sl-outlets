/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _outlets = __webpack_require__(1);

	var _outlets2 = _interopRequireDefault(_outlets);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('sl.outlets', []).factory('Outlets', _outlets2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = /*@ngInject*/function ($http, $q) {
	  var factory = {};

	  factory.fetch = function () {
	    return $q.when(factory.all || $http.get('http://api.love.sl/v2/outlets/').then(function (response) {
	      factory.all = response.data;
	      return response.data;
	    }));
	  };

	  factory.byRegion = function (id) {
	    if (!factory._byRegion) {
	      factory._byRegion = {};
	    }

	    if (!factory._byRegion[id]) {
	      factory._byRegion[id] = factory.all.filter(function (outlet) {
	        return outlet.region_id.indexOf(id) !== -1;
	      });
	    }

	    return factory._byRegion[id];
	  };

	  return factory;
	};

/***/ }
/******/ ]);