'use strict';

var
    app = angular.module('app', ['ui.router', 'ngTouch', 'menu']);

app
    .config( function ($stateProvider, $locationProvider) {
        $stateProvider
            .state('index', {
                url: '/'
                /*views: {
                    'viewMenu': { templateUrl: 'menu.html' }
                }*/
            })
            .state('search', {
                url: '/search/'
            })
            .state('cabinet', {
                url: '/cabinet/',
                templateUrl: 'cabinet.html'
            })
            .state('catalog', {
                url: '/catalog/',
                templateUrl: 'catalog.html'
            })
            .state('collections', {
                url: '/collections/',
                templateUrl: 'collections.html'
            });

        $locationProvider
            .html5Mode(true);
    });

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("cabinet.html","<h1>Cabinet</h1>\n");
$templateCache.put("catalog.html","<h1>Catalog</h1>");
$templateCache.put("collections.html","<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\">\n    <title></title>\n</head>\n<body>\n\n</body>\n</html>");
$templateCache.put("menu.html","<div class=\"s-menu-inner-wrapper\">\n    <ul class=\"s-menu-list\">\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"toggleMenuItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"search\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-search\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Поиск</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\"></div>\n        </li>\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"toggleMenuItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"cabinet\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-cabinet\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Кабинет</span>\n                </a>\n            </div>\n        </li>\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"toggleMenuItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"catalog\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-catalog\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Каталог</span>\n                </a>\n            </div>\n        </li>\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"toggleMenuItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"collections\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-collections\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Коллекции</span>\n                </a>\n            </div>\n        </li>\n    </ul>\n</div>");}]);
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

        $scope.toggleMenuState = function () {
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

                scope.toggleMenu = function () {
                    if (scope.isWindowDesktopWidth()) {
                        scope.menuState.desktopMenuActive ? elem.addClass(desktopMenuClass) : elem.removeClass(desktopMenuClass);
                    } else {
                        scope.menuState.mobileMenuActive ? elem.addClass(mobileMenuClass) : elem.removeClass(mobileMenuClass);
                    }
                };

                scope.$watch(scope.getMenuStateAsString, function(state) {
                    scope.toggleMenu();
                });
            }
        };
    });
var
    menu = angular.module('menu', ['ui.router']);
/**
 * Controllers
 */

/**
 * Directives
 */
/**
 * Models
 */

/**
 * Services
 */

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