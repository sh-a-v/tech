app
  .controller('WindowSizeCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.windowSize = {
      width: null,
      height: null,
      isDesktopWidth: function () {
        return this.width > 1024
      },
      saveSize: function () {
        $scope.windowSize.width = $window.innerWidth;
        $scope.windowSize.height = $window.innerHeight;
      }
    };
  }])

  .controller('MainStateCtrl', ['$scope', function ($scope) {
    $scope.mainState = {
      el: null,
      initEl: function (el) {
        this.el = el;
      }
    }
  }])

  .controller('HeaderCtrl', ['$scope', function ($scope) {
    $scope.header = {

    };
  }]);