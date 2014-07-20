define([
	'backbone',
	'corgiCollection',
	'corgiCollectionView',
	'mobileInstructionsView'
], function (Backbone, CorgiCollection, CorgiCollectionView, MobileInstructionsView) {

	var corgiCollection = new CorgiCollection();

	var view = new CorgiCollectionView({ collection: corgiCollection });
	Backbone.$('main').html(view.render().el);
	
	if(isMobile && !localStorage.getItem('instructionsSeen')) {

		var mobileInstructionsView = new MobileInstructionsView();
		Backbone.$('body').append(mobileInstructionsView.render().el);

	}

	corgiCollection.fetch();
});