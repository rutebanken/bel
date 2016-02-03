'use strict';

angular.module('bel.import-result', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/import-result', {
    templateUrl: 'import-result/import-result.html',
    controller: 'ImportResultCtrl'
  });
}])

.controller('ImportResultCtrl', [function() {

}]);
