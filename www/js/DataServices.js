var dataServices = angular.module('dataServices', ['ngResource']);

var services_data = {};
var dataCallers = {};

services_data.AllChampions = function($http){
    var self = this;
    
    self.getAllChampions = function(onSucces, onFail){
        if(localStorage.getItem("allChamps")){
            onSucces(JSON.parse(localStorage.getItem("allChamps")));
        }else{
            dataCallers.getAllChampions($http, onSucces, onFail);      
        }
	};
	
	self.getAllFreeChampions = function(onSucces){
		dataCallers.getAllFreeChampions($http, onSucces, function(){
            if(localStorage.getItem("freeList")){
                onSucces(JSON.parse(localStorage.getItem("freeList")));
            }
        });
	};
    
    self.getChampion = function(id, onSucces, onFail){
        if(localStorage.getItem(id)){
            onSucces(JSON.parse(localStorage.getItem(id)));
        }else{
            dataCallers.getChampion(id, $http, onSucces, onFail);        
        }
    };
    
    return {
        getAllChampions: self.getAllChampions,
        getAllFreeChampions: self.getAllFreeChampions,
        getChampion: self.getChampion
    };
};

dataCallers.euwURL = "https://euw.api.pvp.net";
dataCallers.globalURL = "https://global.api.pvp.net";
dataCallers.apiKey = "api_key=000e525c-65cf-4739-a963-2f18dec526cc";

dataCallers.getAllChampions = function($http, onSucces, onFail){
    $http.get(dataCallers.globalURL + '/api/lol/static-data/euw/v1.2/champion?champData=image&' + dataCallers.apiKey)
    .then(function(results) {
        var resultList = [];

        for(var i in results.data.data){
            var result = results.data.data[i];
            var tempChampion = {
                id: result.id,
                name: result.name,
                title: result.title,
                image: {
                    h: result.image.h,
                    w: result.image.w,
                    x: result.image.x,
                    y: result.image.y,
                    sprite: result.image.sprite
                }
            };
            resultList.push(tempChampion);
        }
            
        localStorage.setItem("allChamps", JSON.stringify(resultList));  
             
        onSucces(resultList);
    }, function(response) {
        onFail(response);
    });
};

dataCallers.getAllFreeChampions = function($http, onSucces, onFail){
    $http.get(dataCallers.euwURL + '/api/lol/euw/v1.2/champion?freeToPlay=true&' + dataCallers.apiKey)
    .then(function(results) {
        var resultList = [];
        results.data.champions.forEach(function(object){
            resultList.push(object.id);
        });    
        
        localStorage.setItem("freeList", JSON.stringify(resultList));
            
        onSucces(resultList);
    }, function(response) {
        onFail(response);
    });
};

dataCallers.getChampion = function(id, $http, onSucces, onFail){
    $http.get(dataCallers.globalURL + '/api/lol/static-data/euw/v1.2/champion/' + id + "?champData=all&" + dataCallers.apiKey)
    .then(function(results) {
        var result = results.data;
        var tempChampion = {
            blurb: result.blurb,
            id: result.id,
            lore: result.lore,
            name: result.name,
            key: result.key,
            title: result.title,
            spells: result.spells,
            passive: result.passive
        };
        
        localStorage.setItem(tempChampion.id, JSON.stringify(tempChampion));
        onSucces(tempChampion);
    }, function(response) {
        onFail(response);
    });
};

dataServices.factory('AllChampions', ['$http', services_data.AllChampions]);