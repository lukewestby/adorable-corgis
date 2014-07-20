define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["corgiCollectionView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"corgis\">\r\n</div>\r\n\r\n<div class=\"previous\" data-action=\"previousPage\">\r\n	<span class=\"icon ion-chevron-left\"></span>\r\n</div>\r\n\r\n<div class=\"next\" data-action=\"nextPage\">\r\n	<span class=\"icon ion-chevron-right\"></span>\r\n</div>";
  });

this["JST"]["corgiModelView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"image-container preloading\"></div>\r\n<div class=\"progress-indicator\">\r\n	<div class=\"left-half\">\r\n		<div class=\"mask\"></div>\r\n	</div>\r\n	<div class=\"right-half\">\r\n		<div class=\"mask\"></div>\r\n	</div>\r\n</div>\r\n<div class=\"failure-indicator hidden\">\r\n	<div class=\"icon-container\">\r\n		<span class=\"icon ion-minus-circled\"></span>\r\n	</div>\r\n	<div class=\"message-container\">\r\n		<span class=\"message\"><strong>Sorry!</strong>We couldn't find this image. It may have been deleted by its owner or Imgur may be overworked at the moment.</span>\r\n	</div>\r\n</div>";
  });

this["JST"]["mobileInstructionsView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"image\"></div>\r\n<div class=\"message\">\r\n	<h3>Swipe left to see more or right to go back.</h3>\r\n	<button ontouchstart=\"\">Got it!</button>\r\n</div>\r\n";
  });

return this["JST"];

});