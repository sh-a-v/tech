app.user.controller('UserCtrl', ['$scope', function ($scope) {
  $scope.user = {
    authentication: false,
    publisher: false,
    admin: false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('popupPage:deactivated', this.hideUser.bind(this));
    },

    setUser: function (user) {
      this.authentication = user.authentication;
      this.publisher = Boolean(user.publisher);
      this.admin = Boolean(user.admin);
    },

    showUser: function () {
      this.isAuthenticated() ? this.profile.activate() : this.auth.activate();
    },

    hideUser: function () {
      this.isAuthenticated() ? this.profile.deactivate() : this.auth.deactivate();
    },

    isAuthenticated: function () {
      return this.authentication;
    },

    isUsual: function () {
      return !this.isAdmin() && !this.isAdmin();
    },

    isPublisher: function () {
      return this.publisher;
    },

    isAdmin: function () {
      return this.admin;
    }
  };

  var self = $scope.user;

  self.initialize();
}]);
