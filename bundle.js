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

	var _data = __webpack_require__(1);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	    'use strict';

	    var margin = {
	        top: 5,
	        right: 40,
	        bottom: 20,
	        left: 120
	    },
	        width = 900 - margin.left - margin.right,
	        height = 50 - margin.top - margin.bottom;

	    var bulletchart;
	    var bulletsvg;
	    bulletchart();

	    var barchart;
	    barchart();

	    var linechart;
	    linechart();

	    d3.selectAll('button').on('click', function () {

	        bulletsvg.datum(randomize).call(bulletchart.duration(1000));

	        barchart.data(_data2.default.updatebar);

	        linechart.data(_data2.default.updateline);
	    });

	    function bulletchart() {

	        bulletchart = d3.bullet().width(width).height(height);

	        bulletsvg = d3.select('#bulletchart').selectAll('svg').data(_data2.default.bullet).enter().append('svg').attr('class', 'bullet').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	        bulletsvg.call(bulletchart);

	        var title = bulletsvg.append('g').style('text-anchor', 'end').attr('transform', 'translate(-6,' + height / 2 + ')');

	        title.append('text').attr('class', 'title').text(function (d) {
	            return d.title;
	        });

	        title.append('text').attr('class', 'subtitle').attr('dy', '1em').text(function (d) {
	            return d.subtitle;
	        });
	    }

	    function barchart() {

	        margin = {
	            top: 5,
	            right: 40,
	            bottom: 50,
	            left: 120
	        };

	        barchart = d3.barchart().x(function (d) {
	            return d.age;
	        }).y(function (d) {
	            return d.name;
	        }).lowerThreshold(function (d) {
	            return d.min;
	        }).higherThreshold(function (d) {
	            return d.max;
	        }).margin(margin).data(_data2.default.bar);

	        d3.svg('#barchart').attr('height', 200).call(barchart);
	    }

	    function linechart() {

	        var formatDate = d3.timeParse("%b %Y");

	        linechart = d3.linechart().x(function (d) {
	            return formatDate(d.date);
	        }).y(function (d) {
	            return +d.price;
	        }).margin(margin).data(_data2.default.line);

	        d3.svg('#linechart').style('overflow', 'visible').style('height', '250').call(linechart);
	    }

	    function randomize(d) {
	        if (!d.randomizer) d.randomizer = randomizer(d);
	        d.ranges = d.ranges.map(d.randomizer);
	        d.markers = d.markers.map(d.randomizer);
	        d.measures = d.measures.map(d.randomizer);
	        return d;
	    }

	    function randomizer(d) {
	        var k = d3.max(d.ranges) * .2;
	        return function (d) {
	            return Math.max(0, d + k * (Math.random() - .5));
	        };
	    }
	})();

	/* eslint-enable */
	/* eslint-disable */

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
		"bullet": [
			{
				"title": "Profit",
				"subtitle": "%",
				"ranges": [
					20,
					25,
					30
				],
				"measures": [
					21,
					23
				],
				"markers": [
					26
				]
			}
		],
		"bar": [
			{
				"name": "Maria",
				"age": 33,
				"min": 34,
				"max": 38
			},
			{
				"name": "Pan",
				"age": 27,
				"min": 30,
				"max": 35
			},
			{
				"name": "Json",
				"age": 37,
				"min": 39,
				"max": 44
			}
		],
		"updatebar": [
			{
				"name": "Alice",
				"age": 3,
				"min": 5,
				"max": 7
			},
			{
				"name": "Brian",
				"age": 45,
				"min": 54,
				"max": 60
			}
		],
		"line": [
			{
				"date": "Jan 2000",
				"price": 1394.46
			},
			{
				"date": "Feb 2000",
				"price": 102.42
			},
			{
				"date": "Mar 2000",
				"price": 1700.58
			}
		],
		"updateline": [
			{
				"date": "Jun 2010",
				"price": 102.42
			},
			{
				"date": "Jul 2010",
				"price": 500.58
			}
		]
	};

/***/ }
/******/ ]);