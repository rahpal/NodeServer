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
	
	that.login = function(){
		// send data to server
		var validateForm = ko.validation.group(that.userFormData, {deep: true});
		if(validateForm().length === 0){
			// Make ajax call to send the data
		}
	};
}

ko.applyBindings(new viewModel());