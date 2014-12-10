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

	that.messageBar = ko.observable(false);

	that.submitUser = function(){
		// send data to server
		var validateForm = ko.validation.group(that.registerFormData, {deep: true});
		if(validateForm().length === 0){
			// Make ajax call to send the data
			var formData = {
				Username: that.registerFormData.username(),
				Firstname: that.registerFormData.firstname(),
				Lastname: that.registerFormData.lastname(),
				Email: that.registerFormData.email(),
				Password: that.registerFormData.password()
			}

			$.ajax({
				  url: "/login/submit",
				  type: "POST",
				  data: formData,
				}).success(function(response){
					//alert(JSON.stringify(response));
					that.messageBar(true);
					//location.href = '/login/index';
				}).error(function(err){
					// handle error
				});
		}else{
			validateForm.showAllMessages(true);
		}
	};
}

ko.applyBindings(new viewModel());