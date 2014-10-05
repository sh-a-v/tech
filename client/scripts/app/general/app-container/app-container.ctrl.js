app.controller('AppContainerCtrl', ['$scope', '$state', function ($scope, $state) {
  $scope.appContainer = {
    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    },

    getCurrentStateTitle: function () {
      return $state.current.title;
    }
  };

  var self = $scope.appContainer;

  self.initialize();
}]);
