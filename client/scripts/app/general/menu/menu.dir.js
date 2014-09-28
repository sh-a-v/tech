app.directive('menu', ['$window', function ($window) {
  return {
    restrict: 'EA',
    templateUrl: 'menu.html',
    controller: 'MenuCtrl',
    link: function (scope, el, attrs) {
      scope.menu.view = {
        menuEl: el,
        menuItemEls: {
          search: angular.element(document.getElementById('menu-item-search')),
          cabinet: angular.element(document.getElementById('menu-item-cabinet')),
          catalog: angular.element(document.getElementById('menu-item-catalog')),
          collections: angular.element(document.getElementById('menu-item-collections'))
        },

        desktopShiftValue: -300,
        tabletAndPhoneShiftValue: 300,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('menu:activated', this.show.bind(this));
          scope.$on('menu:deactivated', this.hide.bind(this));
          scope.$on('menu:itemToggled', this.toggleItemEl.bind(this));
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
            translateZ: 0,
            opacity: opacityValue
          }, {
            duration: 400,
            easing: 'easy-out',
            display: 'inline-block'
          });
        },

        reverseShift: function () {
          Velocity(this.menuEl, 'reverse', {
            duration: 400,
            easing: 'easy-out'
          });
        },

        toggleItemEl: function (e, itemName) {
          var itemEl = this.menuItemEls[itemName];
          itemEl.toggleClass('expanded');
        }
      };

      var self = scope.menu.view;

      self.initialize();
    }
  };
}]);
