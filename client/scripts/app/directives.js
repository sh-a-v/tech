app
    .directive('resize', ['$window', function ($window) {
        return {
            restrict: 'A',
            controller: 'WindowSizeCtrl',
            link: function (scope, elem, attrs) {
                var
                    windowSize = scope.windowSize;

                windowSize.saveSize();

                angular.element($window)
                    .on('resize', windowSize.saveSize);
            }
        };
    }])

    .directive('mainState', function () {
        return {
            restrict: 'A',
            controller: 'MainStateCtrl',
            link: function (scope, el, attrs) {
                var
                    mainState = scope.mainState,
                    windowSize = scope.windowSize,

                    desktopMenuClass = 'desktop-menu-active',
                    mobileMenuClass = 'mobile-menu-active';

                mainState.view = {
                    toggleMenu: function () {
                        if (windowSize.isDesktopWidth()) {
                            scope.menu.state.desktopActive ? el.addClass(desktopMenuClass) : el.removeClass(desktopMenuClass);
                        } else {
                            scope.menu.state.mobileActive ? el.addClass(mobileMenuClass) : el.removeClass(mobileMenuClass);
                        }
                    }
                };

                mainState.initEl(el);

                setTimeout(function () {
                    scope.$watch(scope.menu.getStateAsString, function() {
                        mainState.view.toggleMenu();
                    });
                }, 0);
            }
        }
    });