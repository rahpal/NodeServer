"use strict";

var homeController = new controller("home");
var _view = new view("home");

homeController.setAction("/index", "GET", function(req, res){
	_view.renderView("index");
}, {auth: false});

homeController.setAction("/update", "GET", function(req, res){
	//_view.renderView("test");
}, {auth: true});