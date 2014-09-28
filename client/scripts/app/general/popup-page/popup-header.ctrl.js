app.controller('PopupHeaderCtrl', ['$scope', function ($scope) {
  $scope.popupHeader = {
    initilaize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    }
  };

  var self = $scope.popupHeader;

  self.initilaize();
}]);
