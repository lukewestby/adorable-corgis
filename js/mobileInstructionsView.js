define([
	'baseView',
	'templates'
], function (BaseView, Templates) {

	return BaseView.extend({
		template: Templates.mobileInstructionsView,

		className: 'mobile-instructions-view',

		ui: {
			button: 'button'
		},

		events: {
			'click button': 'onButtonTap',
			'tap button': 'onButtonTap'
		},

		onButtonTap: function () {
			window.localStorage.setItem('instructionsSeen', true);
			var _this = this;
			this.$el.fadeOut(function () {
				_this.remove();
			});
		}
	});
});