define([
	'backbone',
	'underscore',
	'baseView',
	'corgiModelView',
	'templates'
], function (Backbone, _, BaseView, CorgiModelView, Templates) {

	return BaseView.extend({

		className: 'corgi-collection-view',

		template: Templates.corgiCollectionView,

		currentPage: 0,

		currentCorgiIndex: 0,

		pageSize: isMobile ? 1 : 6,

		isAwaitingRequest: false,

		initialize: function () {
			BaseView.prototype.initialize.apply(this, arguments);
			this.listenTo(this.collection, 'sync', this.onSync);
			this.listenTo(this.collection, 'request', this.onRequest);
		},

		ui: {
			corgisContainer: '.corgis',
			previous: '.previous',
			nextIcon: '.next .icon'
		},

		events: {
			'tap .next': 'nextPage',
			'tap .previous': 'previousPage',
			'swipeleft': 'nextPage',
			'swiperight': 'previousPage'
		},

		_currentPageModelViews: [],
		_previousPageModelViews: [],
		_nextPageModelViews: [],

		onSync: function () {
			this.isAwaitingRequest = false;
			this.render();
			this.ui.nextIcon.removeClass('ion-ios7-reloading');
		},

		onRequest: function () {
			this.isAwaitingRequest = true;
			this.ui.nextIcon.addClass('ion-ios7-reloading');
		},

		releaseModelView: function (modelView) {
			modelView.remove();
			modelView.unbind();
			modelView.stopListening();
		},

		releaseModelViews: function (modelViews) {
			_.each(modelViews, this.releaseModelView);
		},

		renderCurrentPage: function () {
			this._currentPageModelViews = [];
			var begin = this.currentPage * this.pageSize;
			var end = begin + this.pageSize;

			var models = this.collection.models.slice(begin, end);
			var fragment = document.createDocumentFragment();
			_.each(models, function (model) {
				var modelView = new CorgiModelView({ model: model });
				fragment.appendChild(modelView.render().el);
				this._currentPageModelViews.push(modelView);
			}, this);
			var $div = $('<div>').addClass('page');
			$div.html(fragment);
			this.ui.corgisContainer.append($div);
		},

		renderPreviousPage: function () {
			this._previousPageModelViews = [];
			var begin = (this.currentPage - 1) * this.pageSize;
			var end = begin + this.pageSize;

			var models = this.collection.models.slice(begin, end);
			var fragment = document.createDocumentFragment();
			_.each(models, function (model) {
				var modelView = new CorgiModelView({ model: model });
				fragment.appendChild(modelView.render().el);
				this._previousPageModelViews.push(modelView);
			}, this);
			var $div = $('<div>').addClass('page');
			$div.html(fragment);
			this.ui.corgisContainer.prepend($div);
		},

		renderNextPage: function () {
			this._nextPageModelViews = [];
			var begin = (this.currentPage + 1) * this.pageSize;
			var end = begin + this.pageSize;

			var models = this.collection.models.slice(begin, end);
			var fragment = document.createDocumentFragment();
			_.each(models, function (model) {
				var modelView = new CorgiModelView({ model: model });
				fragment.appendChild(modelView.render().el);
				this._nextPageModelViews.push(modelView);
			}, this);
			var $div = $('<div>').addClass('page');
			$div.html(fragment);
			this.ui.corgisContainer.append($div);
		},

		afterRender: function () {
			this.renderPreviousPage();
			this.renderCurrentPage();
			this.renderNextPage();
			this.ui.previous.toggle(this.currentPage !== 0);
		},

		nextPage: function (ev) {
			if(this.isAwaitingRequest) return;
			this.currentPage++;
			this.currentCorgiIndex += this.pageSize;
			if(this.currentCorgiIndex > (3 * this.collection.length) / 4) {
				this.collection.next();
				return;
			}
			this.$('.page:first-child').remove();
			this.releaseModelViews(this._previousPageModelViews);
			this._previousPageModelViews = this._currentPageModelViews;
			this._currentPageModelViews = this._nextPageModelViews;
			this.renderNextPage();
			if(this.currentPage === 1) this.ui.previous.removeClass('hidden');
			ev.preventDefault();
		},

		previousPage: function (ev) {
			if(this.currentPage === 0) return;
			this.currentPage --;
			this.currentCorgiIndex -= this.pageSize;
			if(this.currentPage === 0) this.ui.previous.addClass('hidden');
			this.releaseModelViews(this._nextPageModelViews);
			this.$('.page:last-child').remove();
			this._nextPageModelViews = this._currentPageModelViews;
			this._currentPageModelViews = this._previousPageModelViews;
			this.renderPreviousPage();
			ev.preventDefault();
		}
	});

});