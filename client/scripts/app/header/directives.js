app.header
    .directive('headerView', function () {
        return {
            restrict: 'A',
            templateUrl: 'header.html',
            controller: 'HeaderCtrl'
        }
    });