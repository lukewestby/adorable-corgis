requirejs.config({
	paths: {
		'backbone': '../bower_components/backbone/backbone',
		'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
		'backbone.marionette': '../bower_components/marionette/lib/core/backbone.marionette',
		'underscore': '../bower_components/underscore/underscore',
		'jquery': '../bower_components/jquery/dist/jquery',
		'velocity': '../bower_components/velocity/jquery.velocity',
		'handlebars': '../bower_components/handlebars/handlebars.runtime'
	},

	shim: {
		'handlebars': {
			exports: 'Handlebars'
		},
		'velocity': {
			exports: 'jQuery.velocity',
			deps: ['jquery']
		}
	}
});

require([
	'backbone',
	'jquery',
	'templates',
	'handlebars',
	'underscore',
	'backbone.marionette',
	'velocity'
], function (Backbone, $, Templates) {

	Backbone.Marionette.Renderer.render = function (path, data) {
		return Templates[path](data);
	};

	$.ajaxSetup({
		headers: {
			Authorization: 'Client-ID 63d764373a7d186'
		}
	});

	require(['main']);
});