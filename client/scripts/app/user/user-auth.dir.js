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
          Velocity(this.authEl, {
            top: 0
          }, {
            display: 'inline-block',
            duration: 300
          });
        },

        hide: function () {
          Velocity(this.authEl, 'reverse', {
            display: 'none',
            duration: 300
          });
        }
      };

      var self = scope.user.auth.view;

      self.initialize();
    }
  }
});
