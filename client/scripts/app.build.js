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
    })

    .controller('AppCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.desktopMenuActive = true;
        $scope.mobileMenuActive = false;

        $scope.isDesktopWidth = function () {
            return $window.innerWidth > 1024;
        };

        $scope.isDesktopMenuActive = function () {
            return $scope.desktopMenuActive;
        };
        $scope.isMobileMenuActive = function () {
            return $scope.mobileMenuActive;
        };

        $scope.toggleMenu = function () {
            if ($scope.isDesktopWidth()) {
                $scope.desktopMenuActive = !$scope.desktopMenuActive;
            } else {
                $scope.mobileMenuActive = !$scope.mobileMenuActive;
            }
        };
    }]);

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("cabinet.html","<h1>Cabinet</h1>\n");
$templateCache.put("catalog.html","<h1>Catalog</h1>");
$templateCache.put("collections.html","<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\">\n    <title></title>\n</head>\n<body>\n\n</body>\n</html>");
$templateCache.put("menu.html","<div class=\"s-menu-inner-wrapper\">\n    <ul class=\"s-menu-list\">\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <a class=\"s-menu-list-item-link\" ui-sref=\"search\">\n                <span class=\"s-menu-list-item-link-icon\"><i class=\"s-icon s-icon-search\"></i></span>\n                <span class=\"s-menu-list-item-link-body\">Поиск</span>\n            </a>\n        </li>\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <a class=\"s-menu-list-item-link\" ui-sref=\"cabinet\">\n                <span class=\"s-menu-list-item-link-icon\"><i class=\"s-icon s-icon-cabinet\"></i></span>\n                <span class=\"s-menu-list-item-link-body\">Кабинет</span>\n            </a>\n        </li>\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <a class=\"s-menu-list-item-link\" ui-sref=\"catalog\">\n                <span class=\"s-menu-list-item-link-icon\"><i class=\"s-icon s-icon-catalog\"></i></span>\n                <span class=\"s-menu-list-item-link-body\">Каталог</span>\n            </a>\n        </li>\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <a class=\"s-menu-list-item-link\" ui-sref=\"collections\">\n                <span class=\"s-menu-list-item-link-icon\"><i class=\"s-icon s-icon-collections\"></i></span>\n                <span class=\"s-menu-list-item-link-body\">Коллекции</span>\n            </a>\n        </li>\n    </ul>\n</div>");}]);

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
    .controller('MenuCtrl', ['$scope', function ($scope) {

    }]);

menu
    .directive('menuView', function () {
        return {
            restrict: 'A',
            templateUrl: 'menu.html',
            controller: 'MenuCtrl'
        };
    });