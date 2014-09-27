app.controller('MenuCtrl', ['$scope', '$state', function ($scope, $state) {
  $scope.menu = {
    active: $scope.windowSize.isDesktopWidth() ? true : false,
    activeItem: null,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('windowSize:changed', this.setDefaultState.bind(this));
    },

    setDefaultState: function () {
      $scope.windowSize.isDesktopWidth() ? this.activate() : this.deactivate();
    },

    activate: function () {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this._broadcastMenuActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this._broadcastMenuDeactivated();
    },

    toggle: function () {
      this.isActive() ? this.deactivate() : this.activate();
      this._broadcastMenuToggled();
    },

    isActive: function () {
      return this.active;
    },

    _broadcastMenuActivated: function () {
      $scope.$broadcast('menu:activated');
    },

    _broadcastMenuDeactivated: function () {
      $scope.$broadcast('menu:deactivated');
    },

    _broadcastMenuToggled: function () {
      $scope.$broadcast('menu:toggled');
    }
  };

  var self = $scope.menu;

  self.initialize();
}]);
