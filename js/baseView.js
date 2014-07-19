define([
	'backbone',
	'underscore',
	'jquery'
], function (Backbone, _, $) {

	return Backbone.View.extend({

		initialize: function () {
			Backbone.View.prototype.initialize.apply(this, arguments);
			
			_.bindAll(this, 'render', 'afterRender', 'serialize', 'cacheUiElements', '_handleWindowResize', '_setCurrentBreakpoint');

			this._uiSelectors = {};
			this.ui || (this.ui = {});
			_.extend(this._uiSelectors, this.ui);
			this.on('render:after', this.cacheUiElements, this);

			this.breakpoints || (this.breakpoints = {});
			this.$window = $(window);
			this.$window.on('resize', _.throttle(this._handleWindowResize, 300));
			this._handleWindowResize();
		},

		afterRender: function () { },

		serialize: function () {
			return { };
		},

		render: function () {

			this.trigger('render:before');
			var data = this.serialize();
			var markup = this.template(data);
			this.$el.html(markup);
			this.trigger('render render:after');
			this.afterRender();

			return this;
		},

		cacheUiElements: function () {
			this.ui = { };
			_.each(this._uiSelectors, function (selector, key) {
				var elements = this.$(selector);
				this.ui[key] = elements;
			}, this);
		},

		windowWidth: 0,

		_currentBreakpoint: '',

		_lastCurrentBreakpoint: '',

		_setCurrentBreakpoint: function () {
			if(this.windowWidth <= 320) this._currentBreakpoint = 'phone';
			else if(this.windowWidth <= 768) this._currentBreakpoint = 'tablet';
			else this._currentBreakpoint = 'desktop';
		},

		_handleWindowResize: function () {
			this.windowWidth = this.$window.width();
			this._setCurrentBreakpoint();
			if(this._lastCurrentBreakpoint === this._currentBreakpoint) return;
			if(this.breakpoints[this._currentBreakpoint]) {
				this.breakpoints[this._currentBreakpoint].call(this);
			}
			if(this.breakpoints.all) this.breakpoints.all.call(this);
			this._lastCurrentBreakpoint = this._currentBreakpoint;
		}
	});
});