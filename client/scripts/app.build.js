'use strict';

var
    app = angular.module('app', ['ui.router', 'ngTouch', 'menu']);

app
    .config( function ($stateProvider, $locationProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    'viewMenu': { templateUrl: 'menu.html' }
                }
            })
            .state('cabinet', {
                url: '/cabinet/',
                templateUrl: 'cabinet.html'
            })
            .state('catalog', {
                url: '/catalog/',
                templateUrl: 'catalog.html'
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
$templateCache.put("menu.html","<div class=\"s-menu-inner-wrapper\">\n    <p>mmmmmmm</p>\n</div>");}]);

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
    .directive('techMenu', ['$scope', function ($scope) {

    }]);