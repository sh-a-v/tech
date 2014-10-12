app.directive('windowSize', ['$window', function ($window) {
  return {
    restrict: 'A',
    controller: 'WindowSizeCtrl',
    link: function (scope, el, attrs) {
      scope.windowSize.view = {
        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          angular.element($window).on('resize', _.throttle(this._broadcastWindowResized, 300).bind(this));
        },

        _broadcastWindowResized: function () {
          scope.$broadcast('window:resized');
        }
      };

      var self = scope.windowSize.view;

      self.initialize();
    }
  };
}]);
