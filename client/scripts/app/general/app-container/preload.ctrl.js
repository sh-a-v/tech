app.controller('PreloadCtrl', ['$scope', function ($scope) {
  $scope.preload = {
    active: true,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('$viewContentLoaded', this.deactivate.bind(this));
    },

    activate: function () {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this._broadcastPreloadActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this._broadcastPreloadDeactivated();
    },

    isActive: function () {
      return this.active;
    },

    _broadcastPreloadActivated: function () {
      $scope.$broadcast('preload:activated');
    },

    _broadcastPreloadDeactivated: function () {
      $scope.$broadcast('preload:deactivated');
    }
  };

  var self = $scope.preload;

  self.initialize();
}]);
