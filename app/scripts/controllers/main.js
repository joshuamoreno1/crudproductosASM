'use strict';
/**
 * @ngdoc function
 * @name productosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the productosApp
 */
angular.module('productosApp')
    .controller('MainCtrl', function($scope, $timeout, $mdSidenav, Product, Utils, ProductService) {
        $scope.productselected;
        $scope.listProducts;
        $scope.Utils = Utils;

        $scope.main = function() {
            ProductService.query().$promise.then(function(response) {
                console.log(response);
                if (angular.isDefined(response[0]) && angular.isDefined(response[0].result) && response[0].result === false) {
                    $scope.errorQuery();
                } else {
                    $scope.listProducts = response;
                }
            }, function(error) {
                console.log(error);
                $scope.errorQuery();
            });
        }

        $scope.errorQuery = function() {
            $scope.listProducts = [];
        };

        $scope.addProduct = function() {
            $scope.productselected = {
                productDTO: new Product('0', '', undefined, undefined, '', '')
            };
            Utils.isEditing = false;
            Utils.isAdding = true;
            $mdSidenav('right').open();
        }

        $scope.main();

    });
