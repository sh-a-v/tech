app.directive('contentPage', function () {
  return {
    restrict: 'EA',
    controller: 'ContentPageCtrl',
    link: function (scope, el, attrs) {
      scope.contentPage.view = {
        contentPageEl: el,

        desktopShiftValue: -150,
        tabletAndPhoneShiftValue: 300,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('contentPage:shiftSet', this.shift.bind(this));
          scope.$on('contentPage:shiftUnset', this.reverseShift.bind(this));
        },

        shift: function () {
          var translateXValue = scope.windowSize.isDesktopWidth() ? this.desktopShiftValue : this.tabletAndPhoneShiftValue;

          Velocity(this.contentPageEl, {
            translateX: translateXValue
          }, {
            duration: 200
          });
        },

        reverseShift: function () {
          Velocity(this.contentPageEl, 'reverse', {
            duration: 200
          });
        }
      };

      var self = scope.contentPage.view;

      self.initialize();
    }
  };
});
