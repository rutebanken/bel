'use strict';

angular.module('myApp.view1', ['ngRoute', 'operationalStatusServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', 'OpStatus', 'FileUpload', function($scope, $http, OpStatus, FileUpload) {
    // $scope.$log = $log;

    $scope.add = function(){

    var file = document.getElementById('file').files[0];
          // r = new FileReader();

    console.log("Received file with name " + file.name)

    var backendUrl = 'http://localhost:8080/opstatus/uploadFile';

    var fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('providerId', '2');

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
