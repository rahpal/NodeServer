"use strict";

// Get the HTTP object.
var http = require("http"), 
	fs = require("fs"),
	url = require("url"),
	path = require("path"),
	mime = require("mime"),
	qs = require("querystring"),
	root = __dirname; // Get the file server root directory path

// Creating server
http.createServer(function(request, response){
	
	if(!!request){
		var parsedUrl = url.parse(request.url);
			var requestedFilePath = path.join(root, parsedUrl.pathname !== '/' ? parsedUrl.pathname: '/index.html'),
			stream,
			// Get the mimetype.
			mimeType = mime.lookup(parsedUrl.pathname),
			qsObject;
			
		switch(request.method){
			case 'GET':  
				if(!!parsedUrl.query){
					qsObject = qs.parse(parsedUrl.query);
					console.log(qsObject);
				}

				fs.stat(requestedFilePath, function(error, stats){
					if(error){
						if(error.code === 'ENOENT'){
							response.statusCode = 404;
							response.end("File Not Found");
						}else{
							response.statusCode = 500;
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
							response.statusCode = 500;
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
					//console.log(item);
				});

				request.on("end", function(){
					// response.end(item);
					// Save this data in Indexed DB
				});
				break;
		}
	}
}).listen(9090);

console.log("Server started...");