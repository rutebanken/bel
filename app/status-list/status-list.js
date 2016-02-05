'use strict';

angular.module('bel.status-list', ['ngRoute', 'ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/status-list', {
    templateUrl: 'status-list/status-list.html',
    controller: 'StatusListCtrl'
  });
}])

.controller('StatusListCtrl', ['$scope', '$http', '$location', 'Upload', '$timeout', 'appConfig',
  'operationalStatusService',
  function($scope, $http, $location, Upload, $timeout, config, operationalStatusService) {

    if (!config.nabu || !config.nabu.baseUrl) {
      console.log("Expected configuration config.nabu.baseUrl");
    }

    //TODO Hard-coded for POC
    $scope.provider = {
      providerId: 42,
      providerName: "Flybussekspressen"
    }

    $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        var backendUrl = config.nabu.baseUrl + '/opstatus/' + $scope.provider.providerId +
          '/uploadFile';
        console.log("HTTP: Uploading file with name '" + file.name + "' to '" + backendUrl + "'.");
        file.upload = Upload.upload({
          url: backendUrl,
          data: {
            file: file
          }
        });

        file.upload.then(function(response) {
          $timeout(function() {
            file.result = response.data;
          });
          updateStatus();
        }, function(response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function(evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        });
      }
    }



    $scope.init = function() {
      console.log("Init")
      updateStatus()
    }

    var updateStatus = function() {
      console.log("Update status");
      operationalStatusService.getStatuses($scope.provider.providerId).then(
        function(statuses) {
          $scope.statuses = statuses;
          console.log($scope.statuses)
        })
    };

    $scope.add = function() {
      var file = document.getElementById('file').files[0];
      operationalStatusService.uploadFile(file, $scope.provider.providerId).then(
        function() {
          updateStatus()
        }
      )
    };

    $scope.importResult = function(correlationId) {
      $location.path("/import-result/" + correlationId);
    };

    $scope.reload = function() {
      location.reload();
    }

  }

])
