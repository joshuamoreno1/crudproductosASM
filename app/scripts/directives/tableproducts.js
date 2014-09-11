'use strict';
/**
 * @ngdoc directive
 * @name productosApp.directive:tableProducts
 * @description
 * # tableProducts
 */
angular.module('productosApp')
  .directive('tableproducts', function () {
    return {
      templateUrl: 'scripts/directives/tableproducts.html',
      restrict: 'E',     
      link: function postLink(scope, element, attrs) {
          scope.editProduct = function(product){
              scope.productselected = {};
              scope.productselected = product;                       
          }
          
          scope.deleteProduct = function(product){
            var index = scope.listProducts.indexOf(product); 
            if(index > -1){
                scope.listProducts.splice(index,1);
                scope.productselected = undefined;
            } 
          };
      }
    };
  });
