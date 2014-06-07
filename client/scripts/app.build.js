'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $locationProvider) {
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
