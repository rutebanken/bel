var operationalStatusServices = angular.module('operationalStatusServices', ['ngResource']);

operationalStatusServices.factory('OpStatus', ['$resource',
  function($resource){
    return $resource('http://localhost:8080/opstatus:providerid∕', {providerId:2}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);

  operationalStatusServices.factory('FileUpload', ['$resource',
    function($resource){
      return $resource('http://localhost:8080/opstatus/fileupload/:providerid', { providerId:2}, {
        upload: {method:'POST', params:{}}
      });
    }]);
