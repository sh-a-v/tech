app.user.directive('auth', function () {
  return {
    restrict: 'EA',
    templateUrl: 'popup-pages/auth.html',
    controller: 'AuthCtrl',
    link: function (scope, el, attrs) {
      scope.user.auth.view = {
        authEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('user:authActivated', this.show.bind(this));
          scope.$on('user:authDeactivated', this.hide.bind(this));
        },

        show: function () {

        },

        hide: function () {

        }
      };

      var self = scope.user.auth.view;

      self.initialize();
    }
  }
});
