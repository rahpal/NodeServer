"use strict";

var loginController = new controller("login");
var _view = new view("login");

var qs = require('querystring');
var mysql = require('mysql');

loginController.setAction("/index", "GET", function(req, res){
	_view.renderView("index");
});

loginController.setAction("/login", "POST", function(req, res){
	// Get the data and check the request object.
	var payload = '';

	req.setEncoding("utf8");
	req.on("data", function(chunk){
		payload+= chunk; 
		console.log("data rec:"+chunk);
	});

	req.on("end", function(){
		//res.setHeader("Set-Cookie", "cookie=test");
		var parsedPayload = qs.parse(payload);
		console.log(parsedPayload);

		var connection = mysql.createConnection(require('../connectionstring'));

		connection.connect();

		var query = connection.query("SELECT * FROM USERS WHERE Username = ? AND Password = ?", [parsedPayload.Username, parsedPayload.Password], function(err, results){
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
	var payload = '';

	req.setEncoding("utf8");
	req.on("data", function(chunk){
		payload+= chunk; 
		console.log("data rec:"+chunk);
	});

	req.on("end", function(){
		//res.setHeader("Set-Cookie", "cookie=test");
		var parsedPayload = qs.parse(payload);
		console.log(parsedPayload);
		
		res.write(JSON.stringify({'csrf_token': 'drapal'}));
		//res.end();
		var connection = mysql.createConnection(require('../connectionstring'));

		connection.connect();

		var query = connection.query("INSERT INTO Users SET ?", parsedPayload, function(err){
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