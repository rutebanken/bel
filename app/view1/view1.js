'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
    $scope.providerId = 2

    $scope.add = function(){
      var file = document.getElementById('file').files[0];
      var backendUrl = 'http://localhost:8080/opstatus/' + $scope.providerId + '/uploadFile';
      console.log("Uploading file with name '" + file.name + "' to '" + backendUrl + "'.");

      var fd = new FormData();
      fd.append('file', file, file.name);
      console.log("Posting to server");
      $http.post(backendUrl, fd, {
        // this cancels AngularJS normal serialization of request
        transformRequest: angular.identity,
        // this lets browser set `Content-Type: multipart/form-data`
        // header and proper data boundary
        headers: {'Content-Type': undefined}
        // headers: {'Content-Type':'multipart/form-data'}
      })

      .success(function(){
        console.log("Success")
      })

      .error(function(){
        console.log("Something went wrong")
      });

}}])
