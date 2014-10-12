app.controller('PreloadCtrl', ['$scope', function ($scope) {
  $scope.loading = {
    requests: [],

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('$viewContentLoaded', this.deactivate.bind(this));
    },

    addRequest: function (req) {
      this.requests.push(req);
    },

    removeRequest: function (req) {
      this.requests = _.without(this.requests, req);
    },

    isActive: function () {
      return Boolean(this.requests.length);
    },

    _broadcastPreloadActivated: function () {
      $scope.$broadcast('loading:activated');
    },

    _broadcastPreloadDeactivated: function () {
      $scope.$broadcast('loading:deactivated');
    }
  };

  var self = $scope.preload;

  self.initialize();
}]);
