app.user.directive('profile', function () {
  return {
    restrict: 'EA',
    templateUrl: 'popup-pages/profile.html',
    controller: 'ProfileCtrl',
    link: function (scope, el, attrs) {
      scope.user.profile.view = {
        profileEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('user:profileActivated', this.show.bind(this));
          scope.$on('user:profileDeactivated', this.hide.bind(this));
        },

        show: function () {
          Velocity(this.profileEl, {
            top: 0
          }, {
            display: 'inline-block',
            duration: 300,
            easing: 'easy-out'
          });
        },

        hide: function () {
          Velocity(this.profileEl, 'reverse', {
            display: 'none',
            duration: 300,
            easing: 'easy-out'
          });
        }
      };

      var self = scope.user.profile.view;

      self.initialize();
    }
  }
});
