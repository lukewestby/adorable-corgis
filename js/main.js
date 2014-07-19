define([
	'backbone',
	'corgiCollection',
	'corgiCollectionView'
], function (Backbone, CorgiCollection, CorgiCollectionView) {

	var corgiCollection = new CorgiCollection();

	var view = new CorgiCollectionView({ collection: corgiCollection });
	Backbone.$('main').html(view.render().el);

	corgiCollection.fetch();
});