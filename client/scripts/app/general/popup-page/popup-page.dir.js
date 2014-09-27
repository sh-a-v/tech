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

        },

        hide: function () {

        }
      };

      var self = scope.popupPage.view;

      self.initialize();
    }
  }
});
