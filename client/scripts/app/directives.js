app
    .directive('resize', ['$window', function ($window) {
        return {
            restrict: 'A',
            controller: 'WindowSizeCtrl',
            link: function (scope, elem, attrs) {
                scope.saveWindowSize();

                angular.element($window)
                    .on('resize', scope.saveWindowSize);
            }
        };
    }])

    .directive('menuState', function () {
        return {
            restrict: 'A',
            controller: 'MenuStateCtrl',
            link: function (scope, elem, attrs) {
                var
                    desktopMenuClass = 'desktop-menu-active',
                    mobileMenuClass = 'mobile-menu-active';

                scope.$watch(scope.getMenuStateAsString, function(state) {
                    if (scope.isWindowDesktopWidth()) {
                        scope.menuState.desktopMenuActive ? elem.addClass(desktopMenuClass) : elem.removeClass(desktopMenuClass);
                    } else {
                        scope.menuState.mobileMenuActive ? elem.addClass(mobileMenuClass) : elem.removeClass(mobileMenuClass);
                    }
                })
            }
        };
    });