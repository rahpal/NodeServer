"use strict";

var loginController = new controller("login");
var _view = new view("login");

var qs = require('querystring');
var mysql = require('mysql');
var utils = require('../utils');

loginController.setAction("/index", "GET", function(req, res){
	_view.renderView("index");
});

loginController.setAction("/login", "POST", function(req, res){
	console.log(utils);

	utils.getPayloadData(req, function(data){

		var connection = mysql.createConnection(require('../connectionstring'));

		connection.connect();

		var query = connection.query("SELECT * FROM USERS WHERE Username = ? AND Password = ?", [data.Username, data.Password], function(err, results){
			if(err) 
				console.log(err.message);
			else
				if(results.length > 0){
					console.log(results);
					res.end(JSON.stringify({ 'isValid': true }));
				}else{
					res.end(JSON.stringify({ 'isValid': false }));
				}

		});
		//console.log(query.sql);
		connection.end();
	});

});

loginController.setAction("/register", "GET", function(req, res){
	_view.renderView("register");
});

loginController.setAction("/submit", "POST", function(req, res){

	utils.getPayloadData(req, function(data){

		var connection = mysql.createConnection(require('../connectionstring'));

		connection.connect();

		var query = connection.query("INSERT INTO Users SET ?", data, function(err){
			if(err) 
				console.log(err.message);
			else
				console.log("user created");
		}); 
		//console.log(query.sql);
		connection.end();

		res.end();
	});
});

loginController.setAction("/contact", "GET", function(req, res){
	//viewengine.renderView("login/submit");
});