define([
	'backbone',
	'corgiCollection',
	'corgiCollectionView'
], function (Backbone, CorgiCollection, CorgiCollectionView) {

	var corgiCollection = new CorgiCollection();

	var view = new CorgiCollectionView({ collection: corgiCollection });
	Backbone.$('main').html(view.render().el);
	
	document.ontouchstart = function (ev) {
		ev.preventDefault();
	};

	document.ontouchmove = function (ev) {
		ev.preventDefault();
	};

	window.ondeviceorientation = function () {
		window.scrollTo(0, 0);
	};

	corgiCollection.fetch();
});