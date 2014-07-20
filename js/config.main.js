requirejs.config({

	baseUrl: '/js',

	paths: {
		'backbone': '../bower_components/backbone/backbone',
		'underscore': '../bower_components/underscore/underscore',
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'jquery.mobile.events': '../bower_components/jquery-mobile-events/jquery-mobile-events',
		'jquery.transit': '../bower_components/jquery.transit/jquery.transit',
		'velocity': '../bower_components/velocity/jquery.velocity.min',
		'handlebars': '../bower_components/handlebars/handlebars.runtime.min',
		'mobileDetect': '../bower_components/mobile-detect/mobile-detect.min'
	},

	shim: {
		'handlebars': {
			exports: 'Handlebars'
		},
		'velocity': {
			exports: 'jQuery.velocity',
			deps: ['jquery']
		},
		'mobileDetect': {
			exports: 'MobileDetect'
		},
		'jquery.transit': {
			deps: ['jquery']
		}
	}
});

require([
	'backbone',
	'jquery',
	'templates',
	'mobileDetect',
	'handlebars',
	'underscore',
	'velocity',
	'jquery.mobile.events',
	'jquery.transit'
], function (Backbone, $, Templates, MobileDetect) {

	$.ajaxSetup({
		headers: {
			Authorization: 'Client-ID 63d764373a7d186'
		}
	});

	var mobileDetect = new MobileDetect(navigator.userAgent);
	window.isMobile = mobileDetect.phone();

	if(isMobile) {
		
		document.ontouchstart = function (ev) {
			ev.preventDefault();
		};

		document.ontouchmove = function (ev) {
			ev.preventDefault();
		};

		$(window).on('orientationchange', function () {
			window.scrollTo(0, 0);
		});
	}

	if ( !window.requestAnimationFrame ) {

		window.requestAnimationFrame = (function() {

			return window.webkitRequestAnimationFrame ||
				   window.mozRequestAnimationFrame ||
				   window.oRequestAnimationFrame ||
				   window.msRequestAnimationFrame ||
				   function(callback, element ) { window.setTimeout( callback, 1000 / 60 ); };
		})();
	}

	$.fn.updateProgress = function (fraction) {
		var $rightMask = $(this).find('.right-half .mask');
		var $leftMask = $(this).find('.left-half .mask');
		var diff, leftDegrees, rightDegrees;
		if(fraction > 0.5) {
			rightDegrees = '180deg';
			diff = fraction - 0.5;
			leftDegrees = (180 + diff * 360) + 'deg';
		}
		else {
			rightDegrees = (fraction * 360) + 'deg';
			leftDegrees = '180deg';
		}

		requestAnimationFrame(function () {
			$rightMask.css('rotate', rightDegrees);
			$leftMask.css('rotate', leftDegrees);
		});
	};

	if(isMobile) {
		$('body').addClass('mobile');
	}

	require(['main']);
});