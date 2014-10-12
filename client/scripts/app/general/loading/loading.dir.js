app.directive('loading', ['$window', function ($window) {
  return {
    restrict: 'EA',
    controller: 'LoadingCtrl'
  };
}]);
