"use strict";

var qs = require('querystring'),
	url = require('url');

module.exports = {

	getPayloadData: function(req, callback){
		if(!!req){

			switch(req.method){
				case 'POST': 
					var payload = '';
					
					req.setEncoding("utf8"); // set encoding
					req.on("data", function(chunk){
						payload+=chunk;
						console.log("payload : "+chunk);
					});

					req.on("end", function(){
						console.log(payload);
						if(!!payload){
							var parsedPayload = qs.parse(payload);
							//console.log(parsedPayload);
							callback(parsedPayload);
						}
					});
					break;
				case 'GET':
					var query = qs.parse(url.parse(request.url).query);
					callback(query);
					break;
			}
		}
	}	

};
