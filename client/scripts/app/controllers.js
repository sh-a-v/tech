
app.controller('AppCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.desktopMenuActive = true;
    $scope.phoneMenuActive = false;

    $scope.isDesktopWidth = function () {
        return $window.innerWidth > 1024;
    };

    $scope.isDesktopMenuActive = function () {
        return $scope.desktopMenuActive;
    };
    $scope.isPhoneMenuActive = function () {
        return $scope.phoneMenuActive;
    };

    $scope.toggleMenu = function () {
        if ($scope.isDesktopWidth()) {
            $scope.desktopMenuActive = !$scope.desktopMenuActive;
        } else {
            $scope.phoneMenuActive = !$scope.phoneMenuActive;
        }
    };
}]);