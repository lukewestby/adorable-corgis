define([
	'backbone',
	'underscore',
	'corgi-model'
], function (Backbone, _, CorgiModel) {

	return Backbone.Collection.extend({
		model: CorgiModel,

		currentPage: 0,

		url: function () {
			return 'https://api.imgur.com/3/gallery/search/viral/' + this.currentPage;
		},

		fetchOptions: { q: 'corgi' },

		fetch: function (options) {
			options || (options = {});
			var self = this;
			return $.get(this.url(), this.fetchOptions).done(function (response) {
				var data = self.parse(response);
				self.add(data);
				if(options.reset) self.trigger('reset');
			});
		},

		next: function () {
			this.currentPage ++;
			return this.fetch();
		},

		parse: function (response) {
			return _.where(response.data, { is_album: false, nsfw: false });
		}
	});
});