// base controller
// return constructor.
var controller = (function (){
	"use strict";

	var path = require("path");

	function _controller(name){
		var that = this;

		that.name = name;
		that.setAction = function(actionName, verb, callback, attr){
			var fullyQualifiedPath;

			if(actionName.indexOf('/') === -1){
				actionName = '/'+ actionName;
			}

			fullyQualifiedPath = '/' + name + actionName;

			app.setPath(fullyQualifiedPath, verb, function(req, res){
				callback(req, res);
			}, attr);
		};
	};

	return _controller;

})();

module.exports = controller;