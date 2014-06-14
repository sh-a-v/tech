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
