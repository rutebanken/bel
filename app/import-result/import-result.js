'use strict';

angular.module('bel.import-result', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/import-result/:correlationId', {
    templateUrl: 'import-result/import-result.html',
    controller: 'ImportResultCtrl'
  });
}])

.controller('ImportResultCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  console.log("correlationId: " + $routeParams.correlationId);

  $scope.file = "gtfs.zip"

  $scope.result = {
    "stats": {
      "line_count": 5,
      "route_count": 13,
      "connection_link_count": 0,
      "time_table_count": 14,
      "stop_area_count": 8,
      "access_point_count": 0,
      "vehicle_journey_count": 42,
      "journey_pattern_count": 13
    }
  }

}]);
