menu
    .directive('menuView', function () {
        return {
            restrict: 'A',
            templateUrl: 'menu.html',
            controller: 'MenuCtrl',
            link: function (scope, elem, attrs) {
                scope.$watch(scope.getMenuItemState, function (state) {
                    var
                        el = scope.menuItem.el;

                    if (el) {
                        scope.menuItem.activeState ? el.addClass('active') : el.removeClass('active');
                    }
                });
            }
        };
    });