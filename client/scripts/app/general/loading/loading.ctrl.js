app.controller('LoadingCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
  $scope.loading = {
    requestsCount: 0,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $rootScope.$on('server:request', this.addRequest.bind(this));
      $rootScope.$on('server:response', this.removeRequest.bind(this));
    },

    addRequest: function () {
      this.requestsCount += 1;
    },

    removeRequest: function () {
      this.requestsCount -= 1;
    },

    isActive: function () {
      return Boolean(this.requestsCount);
    }
  };

  var self = $scope.loading;

  self.initialize();
}]);
