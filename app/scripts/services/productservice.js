'use strict';
/**
 * @ngdoc service
 * @name productosApp.ProductServiceRest
 * @description
 * # ProductServiceRest
 * Factory in the productosApp.
 */
angular.module('productosApp')
    .factory('ProductService', function($resource) {
        return $resource(
            '/rest/productos/:id', {
                id: "@id"
            }, {
                'update': {
                    method: 'PUT'
                }
            }
        );
    });
