'use strict';

angular.module("bel.services").factory('operationalStatusService', ['$http', 'appConfig', function($http, config) {

	if (!config.nabu || !config.nabu.baseUrl) {
		console.log("Expected configuration config.nabu.baseUrl");
	}

	function getStatuses(providerId) {
		var backendUrl = config.nabu.baseUrl + '/opstatus/' + providerId + '/status'
		console.log("HTTP: getStatuses() on " + backendUrl);
		return $http.get(backendUrl).
		then(function(data) {
			console.log(data);
			return data.data;
		});
	};

	return {
		getStatuses: getStatuses
	}

}]);
