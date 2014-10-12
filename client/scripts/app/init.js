'use strict';

var app = angular.module('app', ['ui.router', 'ngResource', 'ngTouch', 'app.user']);

app.config(function ($stateProvider, $locationProvider, $resourceProvider, $httpProvider) {
  $stateProvider
    .state('index', {
      url: '/',
      title: 'Engineerium'
    })
    .state('search', {
      url: '/search',
      title: 'Поиск'
    })
    .state('cabinet', {
      url: '/cabinet',
      templateUrl: 'content-pages/cabinet.html',
      title: 'Кабинет'
    })
    .state('catalog', {
      url: '/catalog',
      templateUrl: 'content-pages/catalog.html',
      title: 'Каталог'
    })
    .state('collections', {
      url: '/collections',
      templateUrl: 'content-pages/collections.html',
      title: 'Коллекции'
    });

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });

  $resourceProvider
    .defaults.stripTrailingSlashes = true;

  $httpProvider
    .interceptors.push('QueriesInterceptor');
});
