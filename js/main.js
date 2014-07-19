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
	}

	corgiCollection.fetch();
});