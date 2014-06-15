app.auth
    .directive('authView', function () {
        return {
            restrict: 'A',
            templateUrl: 'popup-pages/auth.html',
            controller: 'AuthCtrl'
        }
    });
