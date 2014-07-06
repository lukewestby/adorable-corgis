define([
	'backbone'
], function (Backbone) {

	return Backbone.Marionette.ItemView.extend({
		template: 'corgi-view',
		className: 'corgi',

		ui: {
			imageContainer: '.image-container'
		},

		onRender: function () {
			var self = this;

			var image = new Image();
			image.onload = function () {
				self.ui.imageContainer.css('background-image', 'url(' + self.model.get('link') + ')').removeClass('preloading');
			};
			image.src = this.model.get('link');
		}
	});
});