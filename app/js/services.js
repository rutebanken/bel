'use strict';

angular.module("bel.services").factory('operationalStatusService', ['$http', 'appConfig', function($http, config) {

	if (!config.nabu || !config.nabu.baseUrl) {
		console.log("Expected configuration config.nabu.baseUrl");
	}

	function getStatuses(providerId) {
		console.log("HTTP: getStatuses()");
		return $http.get(config.nabu.baseUrl + '/opstatus/' + providerId + '/status').
		then(function(data) {
			console.log(data);
			return data.data;
		});
	};


	function uploadFile(file, providerId) {
		var backendUrl = config.nabu.baseUrl + '/opstatus/' + providerId + '/uploadFile';
		console.log("HTTP: Uploading file with name '" + file.name + "' to '" + backendUrl + "'.");

		var fd = new FormData();
		fd.append('file', file, file.name);

		return $http.post(backendUrl, fd, {
			// this cancels AngularJS normal serialization of request
			transformRequest: angular.identity,
			// this lets browser set `Content-Type: multipart/form-data`
			// header and proper data boundary
			headers: {
				'Content-Type': undefined
			}
		}).then(function successCallback(response) {
			console.log("Success");
		}, function errorCallback(response) {
			console.log("Something went wrong");
		})
	};


	return {
		getStatuses: getStatuses,
		uploadFile: uploadFile
	}

}]);
