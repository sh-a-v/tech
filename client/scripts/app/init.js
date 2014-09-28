'use strict';

var app = angular.module('app', ['ui.router', 'ngResource', 'ngTouch', 'app.user']);

app.config( function ($stateProvider, $locationProvider, $resourceProvider) {
  $stateProvider
    .state('index', {
      url: '/'
    })
    .state('search', {
      url: '/search'
    })
    .state('cabinet', {
      url: '/cabinet',
      templateUrl: 'content-pages/cabinet.html'
    })
    .state('catalog', {
      url: '/catalog',
      templateUrl: 'content-pages/catalog.html'
    })
    .state('collections', {
      url: '/collections',
      templateUrl: 'content-pages/collections.html'
    });

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });

  $resourceProvider
    .defaults.stripTrailingSlashes = true;
});
