app.directive('preload', ['$window', function ($window) {
  return {
    restrict: 'EA',
    controller: 'PreloadCtrl',
    link: function (scope, el, attrs) {
      scope.preload.view = {
        preloadEl: el,

        initialize: function () {

        },

        setEventListeners: function () {
          scope.$on('preload:activated', this.showPreload.bind(this));
          scope.$on('preload:deactivated', this.hidePreload.bind(this));
        },

        showPreload: function () {
          this.preloadEl.addClass('active');
        },

        hidePreload: function () {
          this.preloadEl.removeClass('active');
        }
      };

      var self = scope.preload.view;

      self.initialize();
    }
  }
}]);
