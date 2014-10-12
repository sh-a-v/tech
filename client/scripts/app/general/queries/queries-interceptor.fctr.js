app.factory('QueriesInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
  var serverBroadcast = {
    _broadcastServerRequest: function () {
      $rootScope.$emit('server:request');
    },

    _broadcastServerResponse: function () {
      $rootScope.$emit('server:response');
    },

    _broadcastServerError: function () {
      $rootScope.$emit('server:error');
    }
  };

  return {
    request: function (config) {
      serverBroadcast._broadcastServerRequest();
      return config;
    },

    response: function (response) {
      serverBroadcast._broadcastServerResponse();
      return response;
    },

    responseError: function (response) {
      serverBroadcast._broadcastServerResponse();
      serverBroadcast._broadcastServerError();

      return $q.reject(response);
    }
  };
}]);
