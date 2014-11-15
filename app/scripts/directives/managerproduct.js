'use strict';
/**
 * @ngdoc directive
 * @name productosApp.directive:managerProduct
 * @description
 * # managerProduct
 */
angular.module('productosApp')
    .directive('managerproduct', function(Utils, Product, ProductService, $mdSidenav, $mdDialog) {
        return {
            templateUrl: 'scripts/directives/managerproduct.html',
            restrict: 'E',
            replace: true,
            scope: {
                productselected: '='
            },
            link: function postLink(scope, element, attrs) {

                var productSelectedBackUp = null;
                scope.Utils = Utils;

                scope.main = function() {
                    scope.$watch('productselected', function(newval) {
                        if (!Utils.isAdding) {
                            if (angular.isDefined(newval) && newval != null && angular.isDefined(newval.productDTO) && angular.isDefined(newval.productDTO.name)) {
                                productSelectedBackUp = angular.copy(newval);
                                Utils.isEditing = true;
                                scope.calcValueGain(newval.productDTO.cost, newval.productDTO.gain);
                            } else {
                                productSelectedBackUp = null;
                                Utils.isEditing = false;
                                scope.productselected = undefined;
                            }
                        }
                    });
                    scope.$watch('productselected.productDTO.gain', scope.validGain);
                };

                scope.accept = function($event) {
                    if (scope.validateProduct(scope.productselected.productDTO, $event)) {
                        if (Utils.isEditing) {
                            scope.productselected.$update({
                                id: scope.productselected.productDTO.code
                            }, function(response) {
                                ProductService.query().$promise.then(function(response) {
                                    if (angular.isDefined(response[0]) && angular.isDefined(response[0].result) && response[0].result === false) {} else {
                                        scope.$parent.listProducts = response;
                                        $mdSidenav('right').close();
                                        scope.$parent.productselected = {};
                                        Utils.isEditing = false;
                                        Utils.isAdding = false;
                                    }
                                }, function(error) {});
                            });
                        }
                        if (Utils.isAdding) {
                            if (angular.isDefined(scope.$parent.listProducts)) {
                                scope.productselected.productDTO.gain = Utils.parseInteger(scope.productselected.productDTO.gain, 10);
                                var productselected = new ProductService(angular.copy(scope.productselected));
                                var pC = angular.copy(productselected);
                                productselected.$save(function(response) {
                                    productselected = pC;
                                    $mdSidenav('right').close();
                                    scope.$parent.listProducts.push(productselected);
                                    scope.productselected = {};
                                    Utils.isEditing = false;
                                    Utils.isAdding = false;
                                });
                            }
                        }
                    }
                }

                scope.validateProduct = function(product, $event) {
                    var result = true;
                    for (var attr in product) {
                        if (angular.isUndefined(product[attr]) || product[attr] === '') {
                            result = false;
                            break;
                        }
                    }
                    if (!result) {
                        scope.incompleteDataPopUp($event);
                    }
                    return result;
                }


                scope.cancel = function() {
                    if (Utils.isEditing && productSelectedBackUp != null) {
                        for (var attr in productSelectedBackUp.productDTO) {
                            scope.productselected.productDTO[attr] = productSelectedBackUp.productDTO[attr];
                        }
                        scope.productselected = {};
                    } else if (Utils.isAdding) {
                        scope.productselected = {};
                    }
                    Utils.isAdding = false;
                    Utils.isEditing = false;
                    $mdSidenav('right').close();
                }

                scope.validGain = function(newval, oldval) {
                    if (newval !== undefined) {
                        if (!scope.checkGain(newval)) {
                            scope.productselected.productDTO.gain = oldval;
                        }
                    }
                }

                scope.checkGain = function(val) {
                    return !isNaN(val) && val >= 0 && val <= 100;
                }

                //Calcular valor de un producto multiplicando el costo por el valor de la ganacia deseada.
                scope.calcValueGain = function(cost, gain) {
                    var gainInt = Utils.parseInteger(gain, 10);
                    var value;
                    if (scope.checkGain(gainInt) && angular.isDefined(scope.productselected)) {
                        value = Utils.calcValueGain(Utils.parseInteger(cost, 10), gainInt);
                    }
                    scope.productselected.productDTO.value = value;
                }

                scope.incompleteDataPopUp = function($event) {
                    $mdDialog.show({
                        templateUrl: 'views/incompleteData.html',
                        targetEvent: $event,
                        controller: function($scope, $mdDialog) {
                            $scope.ok = function() {
                                $mdDialog.hide();
                            };
                        }
                    }).then(function() {}, function() {});
                };

                scope.main();
            }
        };
    });
