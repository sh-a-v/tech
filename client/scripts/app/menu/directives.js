menu
    .directive('menuView', ['$window', function ($window) {
        return {
            restrict: 'A',
            templateUrl: 'menu.html',
            controller: 'MenuCtrl',
            link: function (scope, elem, attrs) {
                scope.toggleMenuItem = function () {
                    if (scope.menuItem && scope.menuItem.el) {
                        scope.menuItem.activeState ? scope.menuItem.el.addClass('active') : scope.menuItem.el.removeClass('active');
                    }
                };

                setTimeout(function () {
                    scope.initMenuItemState();

                    scope.$watch(scope.getMenuItemState, function (state) {
                        scope.toggleMenuItem();
                    });
                }, 0);
            }
        };
    }]);