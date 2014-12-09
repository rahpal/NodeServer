"use strict";

var http = require("http"),
	fs = require('fs'),
	path = require("path"),
	mime = require("mime"),
	root = __dirname;

// include external apis
var auth = require('./auth');

function errorFactory(){
	// Error Code

	this.BAD_REQUEST = 400;
	this.NOT_FOUND = 404;
	this.UNAUTHORIZED = 403;
	this.INTERNAL_SERVER_ERROR = 500;
	this.METHOD_NOT_ALLOWED = 405;

	// instance member
	this.badRequestError = function(){
		return "Bad Request Error";
	};

	this.fileNotFoundError = function(){
		return "Not Found";
	};

	this.unauthorized = function(){
		return "Unauthorized";
	};

	this.internalServerError = function(){
		return "Internal Server Error";
	};

	this.methodNotAllowed = function(){
		return "Method Not Allowed";
	};
}

function app(){ };

app.prototype.errors = new errorFactory();

app.prototype.routes = [];

app.prototype.config = {
	controllerPath: path.join(root + "/controllers"),
	viewPath: path.join(root + "/views"),
	viewExtension: ".html" // default
};

app.prototype.initLoad = function(){
	console.log("InitLoad InProgress...");

	var controllerPath = this.config.controllerPath;

	if(fs.existsSync(controllerPath)){
		fs.readdir(controllerPath, function(error, files){
			files.forEach(function(file, index, files){
				require(path.join(controllerPath + '/' + file));
			});
		});

		console.log("InitLoad Done...");
	}else{
		response.statusCode = this.errors.METHOD_NOT_ALLOWED;
		response.end(that.errors.fileNotFoundError());
	}
};

app.prototype.setPath = function(path, httpMethod, callback, attribute){
	///<summary> Setting path and its corresponding action callback </summary>

	this.routes.forEach(function(route, index, routes){
		if(route["path"].toLowerCase() === path.toLowerCase()){
			throw new Error("Duplicate routes present. Cannot procees further...");
		}
	});

	this.routes.push({
		path : path, // url (relative)
		httpMethod : httpMethod,  // GET or POST
		callback : callback,  // callback function
		attribute : !!attribute ? attribute: {auth: false}
	});

	//console.log(this.routes);
};

app.prototype.render = function(filePath){

	var mimeType = mime.lookup(filePath),
		viewPath = this.config.viewPath,
		requestedFilePath = path.join(viewPath, filePath),
		stream,
		request = this.request,
		response = this.response,
		that = this;

	console.log(requestedFilePath + request.method);
	switch(request.method){
		case 'GET':  
			fs.stat(requestedFilePath, function(error, stats){
				if(error){
					if(error.code === 'ENOENT'){
						response.statusCode = that.errors.NOT_FOUND;
						response.end("Not Found");
					}else{
						response.statusCode = that.errors.INTERNAL_SERVER_ERROR;
						response.end("Internal Server Error");
					}
				} else {
					response.setHeader("Content-Length",stats.size);
					response.setHeader("Content-Type", mimeType);
					response.statusCode = 200;
					// Read the file from the server location
					stream = fs.createReadStream(requestedFilePath);
					stream.pipe(response);
					stream.on("error", function(error){
						response.statusCode = that.errors.INTERNAL_SERVER_ERROR;
						response.end("Internal Server Error");
					});
				}
			});
			break;
		case 'POST':
			var item = null;
			request.setEncoding("utf8");
			request.on("data", function(reqChunk){
				item +=reqChunk;
				console.log(item);
			});

			request.on("end", function(){
				// response.end(item);
				// Save this data in Indexed DB
				fs.stat(requestedFilePath, function(error, stats){
					if(error){
						if(error.code === 'ENOENT'){
							response.statusCode = that.errors.NOT_FOUND;
							response.end("Not Found");
						}else{
							response.statusCode = that.errors.INTERNAL_SERVER_ERROR;
							response.end("Internal Server Error");
						}
					} else {
						response.setHeader("Content-Length",stats.size);
						response.setHeader("Content-Type", mimeType);
						response.statusCode = 200;
						// Read the file from the server location
						stream = fs.createReadStream(requestedFilePath);
						stream.pipe(response);
						stream.on("error", function(error){
							response.statusCode = that.errors.INTERNAL_SERVER_ERROR;
							response.end("Internal Server Error");
						});
					}
				});
			});
			break;
	}
};

app.prototype.startServer = function(port){

	var that = this;

	var url = require("url"); // Get the file server root directory path

		http.createServer(function(request, response){
			if(!!request){
				//console.log(request.url);
				var parsedUrl = url.parse(request.url),
					routeFound = false;
				console.log("Url : "+parsedUrl.pathname);
				that.routes.forEach(function(route, index, array){
					if(parsedUrl.pathname.toLowerCase().indexOf(route.path.toLowerCase()) !== -1){
						that.request = request;
						that.response = response;
						//console.log(path.extname(parsedUrl.pathname));
						console.log("auth: "+route.attribute.auth);
						// check for authorization/ authentication
						if(route.attribute.auth && !auth.onAuthorization.call(that)){
							response.statusCode = that.errors.UNAUTHORIZED;
							response.end(that.errors.unauthorized());
							return;
						}

						if(path.extname(parsedUrl.pathname) === ""){
							route.callback.call(that, request, response);
						}else{
							// render assocaited files here.
							that.render(parsedUrl.pathname.toLowerCase());
						}
						routeFound = true;
						return false;
					}
				});

				if(!routeFound){
					// Route does not exist.
					response.end(that.errors.fileNotFoundError());
				}
			}
		}).listen(port);

	console.log("Server started...");
};

module.exports = new app();