// View Engine
"use strict";

var view = (function(){

	var path = require('path'),
		fs = require('fs'),
		root = __dirname;

	function _view(name){

		var that = this;

		that.defaultViewExtension = !!app.config.viewExtension ? app.config.viewExtension: ".html";

		that.renderView = function(viewName){
			//app.render(viewName + app.config.viewExtension);
			var viewExists;

			viewExists = that.lookup(viewName);
			if(viewExists){
				app.render(path.join(name, viewName + that.defaultViewExtension));
			}
		};

		// lookup for the given "view"
		that.lookup = function(viewName){
			//var path;

			var resolvedFilePath = path.resolve(app.config.viewPath, name, viewName);
			//var dir = path.dirname(loc);
			if(!!resolvedFilePath){
				resolvedFilePath = this.resolve(resolvedFilePath);
			}
			console.log(resolvedFilePath);
			return resolvedFilePath;
		};

		that.resolve = function(resolvedFilePath){

			var stat = this.tryStat(resolvedFilePath);
			console.log("2:"+resolvedFilePath);
			if (!!stat && stat.isFile()) {
			    return true;
			}

			resolvedFilePath = path.join(resolvedFilePath + that.defaultViewExtension);
			console.log("3:"+resolvedFilePath);
			stat = this.tryStat(resolvedFilePath);

			if (!!stat && stat.isFile()) {
			    return true;
			}

			return false;
		};

		that.tryStat = function(path) {
		  	console.log("path: "+ path);

			try {
				return fs.statSync(path);
			} catch (e) {
				return undefined;
			}
		}
	};

	return _view;

})();

module.exports = view;