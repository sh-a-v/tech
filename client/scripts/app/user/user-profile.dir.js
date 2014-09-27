app.user.directive('profile', function () {
  return {
    restrict: 'EA',
    templateUrl: 'popup-pages/profile.html',
    controller: 'ProfileCtrl',
    link: function (scope, el, attrs) {
      scope.user.profile.view = {
        authEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('user:profileActivated', this.show.bind(this));
          scope.$on('user:profileDeactivated', this.hide.bind(this));
        },

        show: function () {

        },

        hide: function () {

        }
      };

      var self = scope.user.profile.view;

      self.initialize();
    }
  }
});
