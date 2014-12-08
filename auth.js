//Authentication and authorization
var _auth = (function(){

	var url = require("url");

	function auth(){

		var that = this;

		that.onAuthorization = function(){
			var req = this.request,
				res = this.response,
				token;

			//console.log(req.headers);
			if(!!req.headers["csrf_token"]){
				//console.log('token');
				token = req.headers["csrf_token"];
				_validateToken(token);
			}else{
				//console.log('token1');
				return false;
			}
		};

		//Private function 
		var _validateToken = function(token){
			if(token === 'drapal'){
				return true;
			}

			return false;
		};

	};

	return auth;

})();

module.exports = new _auth();