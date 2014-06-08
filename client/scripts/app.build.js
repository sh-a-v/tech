'use strict';

var app = angular.module('app', ['ui.router', 'menu']);

app.config( function ($stateProvider, $locationProvider) {
    $stateProvider
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
});

app.controller('AppCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.desktopMenuActive = true;
    $scope.phoneMenuActive = false;

    $scope.isDesktopWidth = function () {
        return $window.innerWidth > 1024;
    };

    $scope.isDesktopMenuActive = function () {
        return $scope.desktopMenuActive;
    };
    $scope.isPhoneMenuActive = function () {
        return $scope.phoneMenuActive;
    };

    $scope.toggleMenu = function () {
        if ($scope.isDesktopWidth()) {
            $scope.desktopMenuActive = !$scope.desktopMenuActive;
        } else {
            $scope.phoneMenuActive = !$scope.phoneMenuActive;
        }
    };
}]);

var menu = angular.module('menu', ['ui.router']);

menu.controller('MenuCtrl', ['$scope', function ($scope) {

}]);
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("cabinet.html","<h1>Cabinet</h1>\n");
$templateCache.put("catalog.html","<h1>Catalog</h1>");}]);
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
