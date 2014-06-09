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
