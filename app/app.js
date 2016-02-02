'use strict';

// Declare app level module which depends on views, and components
angular.module('bel', [
  'ngRoute',
  'bel.view1',
  'bel.view2',
  'bel.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
