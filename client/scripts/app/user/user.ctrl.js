app.user.controller('UserCtrl', ['$scope', function ($scope) {
  $scope.user = {
    authentication: false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('popupPage:deactivated', this.hideUser.bind(this));
    },

    isAuthenticated: function () {
      return this.authentication;
    },

    showUser: function () {
      this.isAuthenticated() ? this.profile.activate() : this.auth.activate();
    },

    hideUser: function () {
      this.isAuthenticated() ? this.profile.deactivate() : this.auth.deactivate();
    }
  };

  var self = $scope.user;

  self.initialize();
}]);
