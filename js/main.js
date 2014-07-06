define([
	'backbone',
	'corgi-collection',
	'corgi-collection-view'
], function (Backbone, CorgiCollection, CorgiCollectionView) {
	
	var app = new Backbone.Marionette.Application();
	app.addRegions({
		mainRegion: 'main'
	});

	var corgiCollection = new CorgiCollection();
	var corgiCollectionView = new CorgiCollectionView({ collection: corgiCollection });
	app.mainRegion.show(corgiCollectionView);
	corgiCollection.fetch();
	console.log(corgiCollectionView.itemViewContainer);
});