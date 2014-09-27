app.controller('AppContainerCtrl', ['$scope', function ($scope) {
  $scope.appContainer = {
    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    }
  };

  var self = $scope.appContainer;

  self.initialize();
}]);
