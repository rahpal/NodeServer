"use strict";

var loginController = new controller("login");
var _view = new view("login");

loginController.setAction("/index", "GET", function(req, res){
	_view.renderView("index");
});

loginController.setAction("/submit", "POST", function(req, res){
	//viewengine.renderView("login/submit");
	// Get the data and check the request object.
	req.setEncoding("utf8");
	req.on("data", function(chunk){
		console.log(chunk);
	});

	req.on("end", function(chunk){
		res.end();
	});
});

loginController.setAction("/about", "GET", function(req, res){
	//viewengine.renderView("login/submit");
});

loginController.setAction("/contact", "GET", function(req, res){
	//viewengine.renderView("login/submit");
});