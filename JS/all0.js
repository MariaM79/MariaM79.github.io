
'use strict';
// async-each MIT license (by Paul Miller from http://paulmillr.com).
(function(globals) {
	'use strict';
	var each = function(items, next, callback) {
		if (!Array.isArray(items)) throw new TypeError('each() expects array as first argument');
		if (typeof next !== 'function') throw new TypeError('each() expects function as second argument');
		if (typeof callback !== 'function') callback = Function.prototype; // no-op
		if (items.length === 0) return callback(undefined, items);

		var transformed = new Array(items.length);
		var count = 0;
		var returned = false;

		items.forEach(function(item, index) {
			next(item, function(error, transformedItem) {
				if (returned) return;
				if (error) {
					returned = true;
					return callback(error);
				}
				transformed[index] = transformedItem;
				count += 1;
				if (count === items.length) return callback(undefined, transformed);
			});
		});
	};

	if (typeof define !== 'undefined' && define.amd) {
		define([], function() {
			return each;
		}); // RequireJS
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = each; // CommonJS
	} else {
		globals.asyncEach = each; // <script>
	}
	})(this);

/* Swiper 3.4.2 Released on: March 10, 2017 maps/swiper.min.js.map */
/* fullPage 2.9.5  https://github.com/alvarotrigo/fullPage.js jquery.fullpage.min.js.map */
/* jQuery Validation Plugin - v1.15.0 - 2/24/2016  http://jqueryvalidation.org/ */
/* okvideo by okfocus ~ v2.3.2 ~ https://github.com/okfocus/okvideo */
/* Vegas Image slideshow vegas.min.js.map */
/* MaxImage 2.0 (Fullscreen Slideshow for use with jQuery Cycle Plugin)
Copyright (c) 2007-2012 Aaron Vanderzwan Maximage Version: 2.0.8 (16-Jan-2012) - http://www.aaronvanderzwan.com/maximage/2.0/ */