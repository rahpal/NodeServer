ko.validation.configure({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
});

function viewModel(){

	var that = this;

	that.userFormData = {
		username : ko.observable().extend({ required: true, maxLength: 20 }),
		password : ko.observable().extend({ required: true, maxLength: 12 })
	};

	that.loginUser = function(){
		// send data to server
		var validateForm = ko.validation.group(that.userFormData, {deep: true});
		if(validateForm().length === 0){
			// Make ajax call to send the data
			$.ajax({
				  url: "/login/submit",
				  type: "POST",
				  data: { id : 1 }
				}).success(function(response){
					//alert(JSON.stringify(response));
					location.href = "/home/index";
				});
		}
	};

	that.registerUser = function(){
		location.href = '/login/register';
	};
}

ko.applyBindings(new viewModel());