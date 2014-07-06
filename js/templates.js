define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["corgi-collection-view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"corgis\">\r\n	<div class=\"corgis-inner\"></div>\r\n</div>\r\n<div class=\"next\">\r\n	<span class=\"icon ion-chevron-right\"></span>\r\n</div>\r\n<div class=\"previous\">\r\n	<span class=\"icon ion-chevron-left\"></span>\r\n</div>";
  });

this["JST"]["corgi-view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"image-container preloading\"></div>\r\n<div class=\"progress-indicator\"></div>";
  });

return this["JST"];

});