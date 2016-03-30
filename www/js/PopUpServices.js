var popUpServices = angular.module('popUpServices', []);

PopUps = function($ionicPopup){
    var self = this;
    
    self.changeLanguage = function(scope, then){
		$ionicPopup.show({
			title: scope.messages.settings.popUp.language,
            scope: scope,
			templateUrl: 'pages/languagePopUp.html',
            buttons: [
		    	{
		    		text: '<b>' + scope.messages.settings.popUp.submit + '</b>',
		    		type: 'button-positive',
		    		onTap: function(e) {
		    			then();
		    		}
		    	}
		    ]
		});
	};
	
	return {
        changeLanguage: self.changeLanguage
	};
};

popUpServices.factory('PopUps', ['$ionicPopup', PopUps]);