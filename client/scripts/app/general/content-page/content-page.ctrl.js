app.controller('ContentPageCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
  $scope.contentPage = {
    shift: false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('menu:toggled', this.toggleShift.bind(this));
      $scope.$on('windowSize:changed', this.unsetShift.bind(this));
    },

    setShift: function () {
      if (this.isShifted()) {
        return;
      }

      this.shift = true;
      this._broadcastContentPageShiftSet();
    },

    unsetShift: function () {
      if (!this.isShifted()) {
        return;
      }

      this.shift = false;
      this._broadcastContentPageShiftUnset();
    },

    toggleShift: function () {
      this.isShifted() ? this.unsetShift() : this.setShift();
    },

    isShifted: function () {
      return this.shift;
    },

    _broadcastContentPageShiftSet: function () {
      $scope.$broadcast('contentPage:shiftSet');
    },

    _broadcastContentPageShiftUnset: function () {
      $scope.$broadcast('contentPage:shiftUnset');
    }
  };

  var self = $scope.contentPage;

  self.initialize();
}]);
