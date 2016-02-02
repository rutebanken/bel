'use strict';

angular.module('bel.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', 'operationalStatusService', function($scope, $http,
    operationalStatusService) {

    //TODO Hard-coded for POC
    $scope.providerId = 2

    $scope.init = function() {
      console.log("Init")
      updateStatus()
    }

    var updateStatus = function() {
      console.log("Update status");
      operationalStatusService.getStatuses($scope.providerId).then(
        function(statuses) {
          $scope.statuses = statuses;
          console.log($scope.statuses)
        })
    };

    $scope.add = function() {
      var file = document.getElementById('file').files[0];
      operationalStatusService.uploadFile(file, $scope.providerId).then(
        function() {
          updateStatus()
        }
      )
    };

  }

])
