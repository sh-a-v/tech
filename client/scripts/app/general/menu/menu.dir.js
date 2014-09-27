app.directive('menu', ['$window', function ($window) {
  return {
    restrict: 'EA',
    templateUrl: 'menu.html',
    controller: 'MenuCtrl',
    link: function (scope, el, attrs) {
      scope.menu.view = {
        menuEl: el,

        desktopShiftValue: -300,
        tabletAndPhoneShiftValue: 300,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('menu:activated', this.show.bind(this));
          scope.$on('menu:deactivated', this.hide.bind(this));
        },

        show: function () {
          scope.windowSize.isDesktopWidth() ? this.reverseShift() : this.shift();
        },

        hide: function () {
          scope.windowSize.isDesktopWidth() ? this.shift() : this.reverseShift();
        },

        shift: function () {
          var translateXValue = scope.windowSize.isDesktopWidth() ? this.desktopShiftValue : this.tabletAndPhoneShiftValue;
          var opacityValue = scope.windowSize.isDesktopWidth() ? 0 : 1;

          Velocity(this.menuEl, {
            translateX: translateXValue,
            opacity: opacityValue
          }, {
            duration: 200
          });
        },

        reverseShift: function () {
          Velocity(this.menuEl, 'reverse', {
            duration: 200
          });
        }
      };

      var self = scope.menu.view;

      self.initialize();
    }
  };
}]);
