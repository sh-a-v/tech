'use strict';

var
    app = angular.module('app', ['ui.router', 'ngTouch', 'header', 'menu']);

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
                templateUrl: 'content-pages/cabinet.html'
            })
            .state('catalog', {
                url: '/catalog/',
                templateUrl: 'content-pages/catalog.html'
            })
            .state('collections', {
                url: '/collections/',
                templateUrl: 'content-pages/collections.html'
            });

        $locationProvider
            .html5Mode(true);
    });

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("header.html","<div class=\"s-header-button s-header-button-menu\" ng-click=\"menu.toggleState()\" ng-class=\"{active: menu.getState()}\"><i class=\"s-icon s-icon-menu\"></i></div>\n<div class=\"s-header-right-buttons\">\n    <div class=\"s-header-button s-header-button-user\"><i class=\"s-icon s-icon-user\"></i></div>\n</div>");
$templateCache.put("menu.html","<div class=\"s-menu-inner-wrapper\">\n    <ul class=\"s-menu-list\">\n\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"menu.toggleItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"search\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-search\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Поиск</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\" menu-item-search></div>\n        </li>\n\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"menu.toggleItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"cabinet\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-cabinet\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Кабинет</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\" menu-item-cabinet></div>\n        </li>\n\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"menu.toggleItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"catalog\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-catalog\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Каталог</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\" menu-item-catalog></div>\n        </li>\n\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"menu.toggleItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"collections\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-collections\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Коллекции</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\" menu-item-collections></div>\n        </li>\n\n    </ul>\n</div>");
$templateCache.put("content-pages/cabinet.html","<h1>Cabinet</h1>\n");
$templateCache.put("content-pages/catalog.html","<h1>Catalog</h1>");
$templateCache.put("content-pages/collections.html","<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\">\n    <title></title>\n</head>\n<body>\n\n</body>\n</html>");}]);
app
    .controller('WindowSizeCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.windowSize = {
            width: null,
            height: null,
            isDesktopWidth: function () {
                return this.width > 1024
            },
            saveSize: function () {
                $scope.windowSize.width = $window.innerWidth;
                $scope.windowSize.height = $window.innerHeight;
            }
        };
    }])

    .controller('MainStateCtrl', ['$scope', function ($scope) {
        $scope.mainState = {
            el: null,
            initEl: function (el) {
                this.el = el;
            }
        }
    }]);
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
var
    header = angular.module('header', []);
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

header
    .controller('HeaderCtrl', ['$scope', function ($scope) {
        $scope.header = {

        };
    }]);
header
    .directive('headerView', function () {
        return {
            restrict: 'A',
            templateUrl: 'header.html',
            controller: 'HeaderCtrl'
        }
    });
menu
    .controller('MenuCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.menu = {
            el: null,
            state: {
                desktopActive: true,
                mobileActive: false
            },
            item: {
                el: null,
                activeState: null
            },
            initEl: function (el) {
                this.el = el;
            },
            getState: function () {
                return $scope.windowSize.isDesktopWidth() ? this.state.desktopActive : this.state.mobileActive;
            },
            getStateAsString: function () {
                return JSON.stringify($scope.menu.state);
            },
            toggleState: function () {
                if ($scope.windowSize.isDesktopWidth()) {
                    this.state.desktopActive = !this.state.desktopActive;
                } else {
                    this.state.mobileActive = !this.state.mobileActive;
                }
            },
            setItemEl: function ($event) {
                this.item.el = angular.element($event.currentTarget).parent();
            },
            setItemState: function () {
                this.item.activeState = !$state.is('index');
            },
            getItemState: function () {
                return $scope.menu.item.activeState ? 'expanded' : 'collapsed';
            },
            toggleItemState: function ($event) {
                this.item.activeState = !this.item.activeState;
                this.setItemEl($event);
            }
        };
    }]);
menu
    .directive('menuView', ['$window', function ($window) {
        return {
            restrict: 'A',
            templateUrl: 'menu.html',
            controller: 'MenuCtrl',
            link: function (scope, el, attrs) {
                var
                    menu = scope.menu;

                menu.view = {
                    toggleMenuItem: function () {
                        if (menu.item && menu.item.el) {
                            menu.item.activeState ? menu.item.el.addClass('active') : menu.item.el.removeClass('active');
                        }
                    }
                };

                menu.initEl(el);

                setTimeout(function () {
                    menu.setItemState();

                    scope.$watch(menu.getItemState, function (state) {
                        menu.view.toggleMenuItem();
                    });
                }, 0);
            }
        };
    }])

    .directive('menuItemSearch', function () {
        return {
            restrict: 'A',
            controller: ''
        }
    })
    .directive('menuItemCabinet', function () {
        return {
            restrict: 'A',
            controller: ''
        }
    })
    .directive('menuItemCatalog', function () {
        return {
            restrict: 'A',
            controller: ''
        }
    })
    .directive('menuItemCollections', function () {
        return {
            restrict: 'A',
            controller: ''
        }
    });