var champServices = angular.module('champServices', []);

var services_champ = {};

services_champ.AllData = function(){
    var self = this;
    
    self.messages = Messages_en;
    
    self.page = {
        title: "Champions"
    };
    
    self.language = "english";
    
    self.changeLanguage = function(language){};
    
    if(localStorage.getItem("language")){
        var language = localStorage.getItem("language");
        self.language = language;
        switch(language) {
            case "dutch":
                self.messages = Messages_nl;
                break;
            case "german":
                self.messages = Messages_de;
                break;
            default:
                self.messages = Messages_en;
        }
    }    
    
    return {
        messages: self.messages,
        page: self.page,
        language: self.language,
        changeLanguage: self.changeLanguage
    };
};

services_champ.Camera = function($q){
	return {
	    getPicture: function(options) {
	      var q = $q.defer();
	      navigator.camera.getPicture(function(result) {
	        // Do any magic you need
	        q.resolve(result);
	      }, function(err) {
	    	q.reject(err);
	      }, options);
	
	      return q.promise;
	    }
	};
};	

champServices.factory('Camera', ['$q', services_champ.Camera]);
champServices.service('AllData', [services_champ.AllData]);