'use strict';
/**
 * @ngdoc function
 * @name productosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the productosApp
 */
angular.module('productosApp')
  .controller('MainCtrl',function ($scope,Product) {
    $scope.productselected;
    $scope.listProducts = [];
    $scope.listProducts.push(new Product('Arroz', 1100, 1, '', 'Roa'));
    $scope.listProducts.push(new Product('Papas', 1500, 5, '', 'Papas la francesca'));  
    $scope.listProducts.push(new Product('Diablitos', 5500, 4, '', 'Diablitos El Sabor'));    
  });