define([
	'backbone',
	'jquery',
	'baseView',
	'templates'
], function (Backbone, $, BaseView, Templates) {

	return BaseView.extend({

		template: Templates.corgiModelView,
		
		className: 'corgi-model-view',

		attributes: function () {
			return {
				'data-id': this.model.id
			}
		},

		ui: {
			imageContainer: '.image-container',
			progressIndicator: '.progress-indicator',
			failureIndicator: '.failure-indicator'
		},

		afterRender: function () {
			var self = this;

			var deferred = $.Deferred()
			$.ajax({
				url: this.model.get('link'),
				xhr: function () {
					var xhr = new XMLHttpRequest();
					xhr.addEventListener('progress', function (ev) {
						self.ui.progressIndicator.updateProgress(ev.loaded / ev.totalSize);
					}, false);
					return xhr;
				}
			}).done(function () {
				self.ui.imageContainer.css('background-image', 'url(' + self.model.get('link') + ')');
				self.ui.progressIndicator.remove();
			}).fail(function () {
				self.ui.failureIndicator.removeClass('hidden');
				self.ui.progressIndicator.remove();
			});
		}
	});
});