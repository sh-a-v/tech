app.controller('WindowSizeCtrl', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window) {
  $scope.windowSize = {
    width: null,
    height: null,

    initialize: function () {
      this.setEventListeners();
      this.saveSize();
    },

    setEventListeners: function () {
      $scope.$on('window:resized', this.saveSize.bind(this));
    },

    isDesktopWidth: function () {
      return this.width > 1024;
    },

    saveSize: function () {
      this.width = $window.innerWidth;
      this.height = $window.innerHeight;

      this._broadcastWindowSizeChanged();
    },

    _broadcastWindowSizeChanged: function () {
      $scope.$broadcast('windowSize:changed');
    }
  };

  var self = $scope.windowSize;

  self.initialize();
}]);
