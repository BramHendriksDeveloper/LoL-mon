var championsControllers = angular.module('championsControllers', []);
var controllers = {};

function capFirst(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}

controllers.AllController = function($scope, AllData, $ionicSideMenuDelegate, $ionicPlatform, $window){
    $scope.messages = AllData.messages;
    $scope.page = AllData.page;
    
    AllData.changeLanguage = function(language){
        AllData.language = language;
        localStorage.setItem("language", language);
        switch(language) {
            case "dutch":
                $scope.messages = Messages_nl;
                break;
            case "german":
                $scope.messages = Messages_de;
                break;
            default:
                $scope.messages = Messages_en;
                AllData.messages = $scope.messages;
        }
    };
    
    $scope.toggleLeft = function(){
		$ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.toChampions = function(){
        $ionicSideMenuDelegate.toggleLeft();
        AllData.page.title = $scope.messages.menu.champions;
        window.location.replace("#/champions");
    };
    
    $scope.toChampion = function(id, name){
        var url = "#/champions/" + id;
        AllData.page.title = name;
        window.location.replace(url);
    };
    
    $scope.toParties = function(){
        $ionicSideMenuDelegate.toggleLeft();
        AllData.page.title = $scope.messages.menu.parties;
        window.location.replace("#/parties");
    };
      
    $scope.toSettings = function(){
        $ionicSideMenuDelegate.toggleLeft();
        AllData.page.title = $scope.messages.menu.settings;
        window.location.replace("#/settings");
    };
    
    $scope.openLoLAPI = function(){
        window.open("https://developer.riotgames.com/", "_system");
    };
};

controllers.ChampionsController = function($scope, $ionicScrollDelegate, AllChampions, AllData){
    $ionicScrollDelegate.scrollTop();
    var functions = {};
    $scope.freeListfreeList = [];
    
    functions.noDataFail = function(){
        alert(AllData.messages.alert.firstTime);
    };
    
    functions.fillChamps = function(results){
        $scope.champions = results;
        console.log(results);
    };
    
    functions.fillFreeList = function(results){
        $scope.freeList = results;
        console.log(results);
    };
    
    AllChampions.getAllFreeChampions(functions.fillFreeList);
    AllChampions.getAllChampions(functions.fillChamps, functions.noDataFail);
};

controllers.ChampionController = function($scope, $ionicScrollDelegate, AllChampions, AllData, $routeParams){
    $ionicScrollDelegate.scrollTop();
    var functions = {};
    $scope.checked = true;
    
    var id = $routeParams.championID;
    
    $scope.toggleBlob = function(){
    	 $scope.checked = ! $scope.checked;
        $ionicScrollDelegate.scrollTop();
    };
    
    functions.fillDetails = function(results){
        $scope.champion = results;
        console.log(results);
    };
    
    AllChampions.getChampion(id, functions.fillDetails, function(){console.log("faal");});
};

controllers.PartiesController = function($scope, $ionicScrollDelegate, AllData, Camera){
    $ionicScrollDelegate.scrollTop();
    var functions = {};
    $scope.hidegeoloc = true;
    $scope.marker = {
    	id: 0,
    	coords: {latitude: 0, longitude: 0}	
    };
    $scope.map = { center: { latitude: 49.6903580, longitude: 8.3888203 }, zoom: 3 };
    
    $scope.getLocation = function(){
    	navigator.geolocation.getCurrentPosition(
    		function _onSuccess(geolocation) {
    			$scope.map = { 
    				center: { 
    					latitude: geolocation.coords.latitude, 
    					longitude: geolocation.coords.longitude 
    				}, zoom: 15};
    			$scope.marker = {
			    	id: 0,
			    	coords: $scope.map.center	
			    };
    		}, 
    		function _onError(){
    			console.log("Geoloc-fail");
    		}, {enableHighAccuracy:false});
    };
    $scope.takePicture = function(){
	    Camera.getPicture().then(function(imageURI) {
	      console.log(imageURI);
	    }, function(err) {
	      console.err(err);
	    });
    };
};

controllers.SettingsController = function($scope, $ionicScrollDelegate, AllData, PopUps){
    $ionicScrollDelegate.scrollTop();
    var functions = {};
    $scope.settings = {
        language : AllData.language
    };
    
    $scope.clearCache = function(){        
        var confirm = window.confirm(AllData.messages.alert.cache);
        if (confirm == true) {
            localStorage.clear();
        }
    };
    
    $scope.changeLanguage = function(){
        PopUps.changeLanguage($scope, function(){
            AllData.changeLanguage($scope.settings.language);
        });
    };
};

championsControllers.controller('AllController', ['$scope', 'AllData', '$ionicSideMenuDelegate', '$ionicPlatform', '$window', controllers.AllController]);
championsControllers.controller('ChampionsController', ['$scope', '$ionicScrollDelegate', 'AllChampions', 'AllData', controllers.ChampionsController]);
championsControllers.controller('ChampionController', ['$scope', '$ionicScrollDelegate', 'AllChampions', 'AllData', '$routeParams', controllers.ChampionController]);
championsControllers.controller('PartiesController', ['$scope', '$ionicScrollDelegate', 'AllData', 'Camera', controllers.PartiesController]);
championsControllers.controller('SettingsController', ['$scope', '$ionicScrollDelegate', 'AllData', 'PopUps', controllers.SettingsController]);