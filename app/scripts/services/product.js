'use strict';

/**
 * @ngdoc service
 * @name productosApp.Product
 * @description
 * # Product
 * Factory in the productosApp.
 */
angular.module('productosApp')
  .factory('Product', function () {    
    return function (name, cost, gain, value, producer){
        this.name = name;
        this.cost = cost;
        this.gain = gain;
        this.value = value;
        this.producer = producer;
    }
  });
