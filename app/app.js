'use strict';

angular.module('bel.services', []);

var module = angular.module('bel', [
  'ngRoute',
  'bel.status-list',
  'bel.import-result',
  'bel.version',
  'bel.statusFilters',
  'bel.services',
  'jsonFormatter'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/status-list'
  });
}]);

angular.element(document).ready(function() {
  console.log("Read config from file before angular bootstrap");

  getJson('config/config.json', function(config) {
    module.value('appConfig', config);

    console.log("Calling angular bootstrap");
    angular.bootstrap(document, ['bel']);

  }, function(error) {
    console.log("Error reading configuration file 'config/config.json'. Angular bootstrap will not be called.");
    console.log(error);
  });
});

function getJson(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      } else {
        error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}
