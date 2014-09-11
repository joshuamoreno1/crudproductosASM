'use strict';
/**
 * @ngdoc directive
 * @name productosApp.directive:managerProduct
 * @description
 * # managerProduct
 */
angular.module('productosApp')
  .directive('managerproduct', function (Utils, Product) {
    return {
      templateUrl: 'scripts/directives/managerproduct.html',
      restrict: 'E',
      replace: true,
      scope:{          
          productselected:'='          
      },
      link: function postLink(scope, element, attrs) {
          
          var productSelectedBackUp = null;
          scope.isEditing = false;
          scope.isAdding = false;
          
          scope.main = function(){            
              scope.$watch('productselected', function(newval){                                
                  if(angular.isDefined(newval) && newval != null && angular.isDefined(newval.name)){
                      productSelectedBackUp = angular.copy(newval);    
                      scope.isEditing = true;
                      scope.calcValueGain(newval.cost,newval.gain);
                  }else{
                      productSelectedBackUp = null;    
                      scope.isEditing = false;
                      scope.productselected = undefined;
                  }                  
              });
              scope.$watch('productselected.gain', scope.validGain); 
          };
          
          scope.accept = function(){              
              if(scope.isEditing){
                  scope.isEditing = false;   
                  scope.$parent.productselected = {};
              }
              if(scope.isAdding && scope.validateProduct(scope.productselected)){                  
                  if(angular.isDefined(scope.$parent.listProducts)){                     
                      scope.$parent.listProducts.push(angular.copy(scope.productselected));
                      scope.productselected = {};
                      scope.isAdding = false;                      
                  }
              }
          }
          
          scope.validateProduct = function(product){
              var result = true;
              for(var attr in product){
                  if(angular.isUndefined(product[attr]) || product[attr] === ''){
                    result = false;
                      break;
                  }
              }
              return result;
          }
          
          scope.cancel = function(){  
              if(scope.isEditing && productSelectedBackUp != null){
                  for(var attr in productSelectedBackUp){
                    scope.productselected[attr] = productSelectedBackUp[attr];
                  }
                  scope.productselected = {};
              }else if(scope.isAdding){                  
                  scope.productselected = {};
              }    
              scope.isAdding = false;
              scope.isEditing = false;
          }
          
          scope.addProduct = function(){  
              scope.isEditing = false;
              scope.isAdding = true;
              scope.productselected = new Product('',undefined,undefined,'','');
          }  
           
          scope.validGain = function(newval,oldval){
              if(newval !== undefined){                               
                if(!scope.checkGain(newval)){
                  scope.productselected.gain = oldval;
                }                  
              }
          }   
          
          scope.checkGain = function(val){               
              return !isNaN(val) && val >= 0 && val <= 100;
          }
          
          //Calcular valor de un producto multiplicando el costo por el valor de la ganacia deseada.
          scope.calcValueGain = function(cost,gain){
            var gainInt = Utils.parseInteger(gain,10); 
            var value;
            if(scope.checkGain(gainInt) && angular.isDefined(scope.productselected)){
                value = Utils.calcValueGain(Utils.parseInteger(cost,10), gainInt); 
            }
            scope.productselected.value = value;
          }          
          
          scope.main();
      }
    };
  });