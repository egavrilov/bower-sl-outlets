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

	exports.default = /*@ngInject*/function ($http, $q, $timeout, $window) {
	  var factory = {};
	  var fetchInProgress = undefined;
	  var outletsById = {};

	  factory.fetch = function () {
	    return fetchInProgress ? factory.fetching : fetch();
	  };
	  factory.all = angular.fromJson($window.sessionStorage.getItem('sl.outlets'));

	  factory.getOutlets = function () {
	    return $q.when(factory.all || $http.get('http://api.love.sl/v2/outlets/').then(function (response) {
	      factory.all = response.data.filter(function (outlet) {
	        return !outlet.is_franchise;
	      });
	      $window.sessionStorage.setItem('sl.outlets', angular.toJson(factory.all));
	      return factory.all;
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

	  factory.getId = function (id) {
	    if (!outletsById[id]) {
	      factory.getOutlets().then(function (outlets) {
	        return outlets.reduce(reduceById, outletsById);
	      });
	    }

	    return outletsById[id];
	  };

	  function fetch() {
	    fetchInProgress = true;
	    factory.fetching = factory.getOutlets();

	    $timeout(function () {
	      factory.fetching.finally(function () {
	        factory.fetching = null;
	        fetchInProgress = false;
	      });
	    });

	    return factory.fetching;
	  }

	  function reduceById(_outletsById, outlet) {
	    if (outlet.id) {
	      _outletsById[outlet.id] = outlet;
	    }
	    return _outletsById;
	  }

	  return factory;
	};

/***/ }
/******/ ]);