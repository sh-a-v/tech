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