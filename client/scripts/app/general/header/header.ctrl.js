app.controller('HeaderCtrl', ['$scope', function ($scope) {
  $scope.header = {
    initilaize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    }
  };

  var self = $scope.header;

  self.initilaize();
}]);
