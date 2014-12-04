"use strict";

var loginController = new controller("login");
var viewengine = new viewEngine();

loginController.setAction("/index", "GET", function(req, res){
	viewengine.renderView("login/index");
});

loginController.setAction("/submit", "GET", function(req, res){
	viewengine.renderView("login/submit");
});