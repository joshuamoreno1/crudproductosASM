'use strict';

/**
 * @ngdoc service
 * @name productosApp.Utils
 * @description
 * # Utils
 * Service in the productosApp.
 */
angular.module('productosApp')
    .service('Utils', function Utils() {

        this.isEditing = false;
        this.isAdding = false;

        this.isDefined = angular.isDefined;

        this.isUndefined = angular.isUndefined;

        this.calcValueGain = function(cost, gain) {
            if (isNaN(gain) || isNaN(cost)) {
                return 0;
            } else {
                return cost + (cost * (gain / 100));
            }
        }

        this.parseInteger = function(value, base) {
            return parseInt(value, base);
        }
    });
