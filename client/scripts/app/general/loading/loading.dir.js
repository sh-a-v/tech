app.directive('preload', ['$window', function ($window) {
  return {
    restrict: 'EA',
    controller: 'PreloadCtrl',
    link: function (scope, el, attrs) {
      scope.preload.view = {
        loadingEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
        }
      };

      var self = scope.preload.view;

      self.initialize();
    }
  }
}]);
