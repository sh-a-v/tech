app.controller('PopupPageCtrl', ['$scope', function ($scope) {
  $scope.popupPage = {
    active: false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('popup:activated', this.activate.bind(this));
      $scope.$on('popup:deactivated', this.deactivate.bind(this));
    },

    activate: function () {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this._broadcastPopupPageActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this._broadcastPopupPageDeactivated();
    },

    toggle: function () {
      this.isActive() ? this.deactivate() : this.activate();
    },

    isActive: function () {
      return this.active;
    },

    _broadcastPopupPageActivated: function () {
      $scope.$broadcast('popupPage:activated');
    },

    _broadcastPopupPageDeactivated: function () {
      $scope.$broadcast('popupPage:deactivated');
    }
  };

  var self = $scope.popupPage;

  self.initialize();
}]);
