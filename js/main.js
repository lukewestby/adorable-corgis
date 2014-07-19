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

		document.ontouchstart = function (ev) {
			ev.preventDefault();
		};

		document.ontouchmove = function (ev) {
			ev.preventDefault();
		};

		window.ondeviceorientation = function () {
			window.scrollTo(0, 0);
		};
	}

	corgiCollection.fetch();
});