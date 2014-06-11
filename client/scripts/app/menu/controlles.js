menu
    .controller('MenuCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.initMenuItemState = function () {
            $scope.menuItem = {
                el: null,
                activeState: !$state.is('index')
            };
        };
        $scope.toggleMenuItemState = function ($event) {
            $scope.menuItem.activeState = !$scope.menuItem.activeState;
            $scope.menuItem.el = angular.element($event.currentTarget).parent();
        };
        $scope.getMenuItemState = function () {
            return $scope.menuItem.activeState ? 'expanded' : 'collapsed';
        };
    }]);