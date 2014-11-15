'use strict';
/**
 * @ngdoc directive
 * @name productosApp.directive:tableProducts
 * @description
 * # tableProducts
 */
angular.module('productosApp')
    .directive('tableproducts', function(Utils, $mdSidenav) {
        return {
            templateUrl: 'scripts/directives/tableproducts.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.editProduct = function(product) {
                    if (!Utils.isEditing && !Utils.isAdding) {
                        scope.productselected = {};
                        scope.productselected = product;
                        $mdSidenav('right').open();
                    }
                }

                scope.deleteProduct = function(product) {
                    if (!Utils.isEditing && !Utils.isAdding) {
                        var index = scope.listProducts.indexOf(product);
                        if (index > -1) {
                            product.$delete({
                                id: product.productDTO.code
                            }, function() {
                                scope.listProducts.splice(index, 1);
                                scope.productselected = undefined;
                            }, function() {});
                        }
                    }
                };
            }
        };
    });
