ko.validation.configure({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
});

function viewModel(){

	var that = this;

	that.registerFormData = {
		username : ko.observable().extend({ required: true, maxLength: 20 }),
		firstname : ko.observable().extend({ required: true }),
		lastname : ko.observable().extend({ required: true }),
		email : ko.observable().extend({ required: true, email: true }),
		password : ko.observable().extend({ required: true, maxLength: 12 })
	};

	that.submitUser = function(){
		// send data to server
		var validateForm = ko.validation.group(that.registerFormData, {deep: true});
		if(validateForm().length === 0){
			// Make ajax call to send the data
			var formData = {
				username: that.registerFormData.username(),
				firstname: that.registerFormData.firstname(),
				lastname: that.registerFormData.lastname(),
				email: that.registerFormData.email(),
				password: that.registerFormData.password()
			}

			$.ajax({
				  url: "/login/submit",
				  type: "POST",
				  data: JSON.stringify(formData),
				}).success(function(response){
					//alert(JSON.stringify(response));
					alert("data entered");
					location.href = '/login/index';
				}).error(function(err){
					//
				});
		}
	};
}

ko.applyBindings(new viewModel());