'use strict';

angular.module('bel.status-list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/status-list', {
    templateUrl: 'status-list/status-list.html',
    controller: 'StatusListCtrl'
  });
}])

.controller('StatusListCtrl', ['$scope', '$http', '$location', 'operationalStatusService',
  function($scope, $http, $location, operationalStatusService) {

    //TODO Hard-coded for POC
    $scope.provider = {
      providerId: 2,
      providerName: "Leverandør_2"
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
