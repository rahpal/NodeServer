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
			var formData ={
				Username: that.userFormData.username(),
				Password: that.userFormData.password(),
			};
			$.ajax({
				  url: "/login/login",
				  type: "POST",
				  data: formData
				}).success(function(response, data){
					//alert(JSON.stringify(response));
					var parsedResponse = JSON.parse(response);
					if(parsedResponse.isValid){
						location.href = "/home/index";
					}else{
						alert("Invalid Credentials");
					}
				}).error(function(){
					alert("Error");
				});
		}else{
			validateForm.showAllMessages(true);
		}
	};

	that.registerUser = function(){
		location.href = '/login/register';
	};
}

ko.applyBindings(new viewModel());