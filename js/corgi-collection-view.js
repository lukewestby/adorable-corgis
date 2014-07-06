define([
	'backbone',
	'corgi-view',
	'jquery',
	'underscore'
], function (Backbone, CorgiView, $, _) {

	return Backbone.Marionette.CompositeView.extend({
		className: 'container',
		template: 'corgi-collection-view',
		childView: CorgiView,
		childViewContainer: '.corgis-inner',

		currentScrollPos: 0,

		totalSlides: function () {
			return Math.ceil(this.ui.corgisInner[0].scrollWidth / this.ui.corgis[0].clientWidth);
		},

		initialize: function () {
			_.bindAll(this, 'togglePreviousButton');
		},

		ui: {
			next: '.next',
			previous: '.previous',
			corgis: '.corgis',
			corgisInner: '.corgis-inner'
		},

		onRender: function () {
			this.togglePreviousButton();
		},

		events: {
			'click @ui.next': 'onNextClick',
			'click @ui.previous': 'onPreviousClick'
		},

		onNextClick: function () {
			this.ui.corgisInner.css('left', (-this.currentScrollPos * 100) + '%');
			this.ui.corgisInner.velocity({ left: '-=100%' }, 500);
			this.currentScrollPos++;
			this.togglePreviousButton();
			if(this.currentScrollPos === this.totalSlides() - 2) this.collection.next();
		},

		onPreviousClick: function () {
			this.ui.corgisInner.css('left', (-this.currentScrollPos * 100) + '%');
			this.ui.corgisInner.velocity({ left: '+=100%' }, 500);
			this.currentScrollPos--;
			this.togglePreviousButton();
		},

		togglePreviousButton: function () {
			if(this.currentScrollPos === 0) this.ui.previous.addClass('hidden');
			else this.ui.previous.removeClass('hidden');
		}


	});
});