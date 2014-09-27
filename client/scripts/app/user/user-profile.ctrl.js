app.user.controller('ProfileCtrl', ['$scope', function ($scope) {
  $scope.user.profile = {
    name: 'Профиль',
    active: false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    },

    activate: function () {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this._broadcastUserProfileActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this._broadcastUserProfileDeactivated();
    },

    toggleState: function () {
      this.activeState ? this.deactivateState() : this.activateState();
    },

    getState: function () {
      return $scope.user.profile.activeState ? 'visible' : 'hidden';
    },

    isActive: function () {
      return this.active;
    },

    _broadcastUserProfileActivated: function () {
      $scope.$broadcast('user:profileActivated');
      $scope.$broadcast('popup:activated');
    },

    _broadcastUserProfileDeactivated: function () {
      $scope.$broadcast('user:profileDeactivated');
      $scope.$broadcast('popup:deactivated');
    }
  }
}]);
