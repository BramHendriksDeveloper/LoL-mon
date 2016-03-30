var champApp = angular.module('champApp', [
    'ngRoute',
    'uiGmapgoogle-maps',
    'championsControllers',
    'champServices',
    'dataServices',
    'popUpServices',
    'ionic'
]);

champApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {	  
	    if(window.StatusBar) {
	       StatusBar.styleDefault();
	    }
    });
});

champApp.config(['$routeProvider', 'uiGmapGoogleMapApiProvider',
	function($routeProvider, uiGmapGoogleMapApiProvider) {
		$routeProvider.
    	when('/champions', {
        	templateUrl: 'pages/champions.html',
        	controller: 'ChampionsController'
        }).
    	when('/champions/:championID', {
        	templateUrl: 'pages/champion.html',
        	controller: 'ChampionController'
        }).
        when('/parties', {
        	templateUrl: 'pages/parties.html',
        	controller: 'PartiesController'
        }).
        when('/settings', {
        	templateUrl: 'pages/settings.html',
        	controller: 'SettingsController'
        }).
        otherwise({
        	redirectTo: '/champions'
        });
    
	    uiGmapGoogleMapApiProvider.configure({
	        key: 'AIzaSyCb45ld3Bj5JAJtbDSIIG22cUmC88VlQDE',
	        v: '3',
	        libraries: 'weather,geometry,visualization'
	    });
	}
]);

champApp.filter('freeFilter', function () {  
    return function(inputs, filterValues, bool) {
        if(bool){
            var output = [];
            angular.forEach(inputs, function (input) {
            if (filterValues.indexOf(input.id) !== -1)
                output.push(input);
            });
            return output;
        }else{
           return inputs; 
        }   
   };
});