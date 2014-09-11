'use strict';

/**
 * @ngdoc overview
 * @name productosApp
 * @description
 * # productosApp
 *
 * Main module of the application.
 */
angular
  .module('productosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })      
      .otherwise({
        redirectTo: '/'
      });
  });