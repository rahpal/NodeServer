"use strict";

var app = require("./app");

console.log(app.__proto__);

app.setPath('/', 'GET', function(req, res){
	res.end("Hi");
});

app.setPath('/login', 'GET', function(req, res){
	// login logic
	res.end("Login");
});

app.startServer(9090);