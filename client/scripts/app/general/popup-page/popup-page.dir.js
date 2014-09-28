app.directive('popupPage', function () {
  return {
    restrict: 'EA',
    controller: 'PopupPageCtrl',
    link: function (scope, el, attrs) {
      scope.popupPage.view = {
        popupPageEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('popupPage:activated', this.show.bind(this));
          scope.$on('popupPage:deactivated', this.hide.bind(this));
        },

        show: function () {
          Velocity(this.popupPageEl, {
            opacity: 1
          }, {
            display: 'inline-block',
            duration: 200
          });
        },

        hide: function () {
          Velocity(this.popupPageEl, 'reverse', {
            display: 'none',
            duration: 200
          });
        }
      };

      var self = scope.popupPage.view;

      self.initialize();
    }
  }
});
