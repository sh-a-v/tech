app
    .controller('WindowSizeCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.isWindowDesktopWidth = function () {
            return $scope.windowSize.width > 1024;
        };

        $scope.saveWindowSize = function () {
            $scope.windowSize = {
                width: $window.innerWidth,
                height: $window.innerHeight
            };
        };
    }])

    .controller('MenuStateCtrl', ['$scope', function ($scope) {
        $scope.menuState = {
            desktopMenuActive: true,
            mobileMenuActive: false
        };

        $scope.toggleMenu = function () {
            if ($scope.isWindowDesktopWidth()) {
                $scope.menuState.desktopMenuActive = !$scope.menuState.desktopMenuActive;
            } else {
                $scope.menuState.mobileMenuActive = !$scope.menuState.mobileMenuActive;
            }
        };

        $scope.getMenuStateAsString = function () {
            return JSON.stringify($scope.menuState);
        };
    }]);