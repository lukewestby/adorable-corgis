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

		Backbone.$('body').on('touchstart', function (ev) {
			ev.preventDefault();
		});

		Backbone.$('body').on('touchmove', function (ev) {
			ev.preventDefault();
		});

		window.ondeviceorientation = function () {
			window.scrollTo(0, 0);
		};
	}

	corgiCollection.fetch();
});