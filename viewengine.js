// View Engine

var viewEngine = (function(){

	function _viewEngine(){

		var that = this;

		that.renderView = function(viewName){
			app.render(viewName + app.config.viewExtension);
		};
	};

	return _viewEngine;
})();

module.exports = viewEngine;