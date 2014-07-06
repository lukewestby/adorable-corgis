define([
	'backbone'
], function () {

	return Backbone.Model.extend({
		url: function () {
			return 'https://api.imgur.com/3/gallery/' + this.id;
		}
	});
});