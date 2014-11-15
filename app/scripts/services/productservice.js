'use strict';
/**
 * @ngdoc service
 * @name productosApp.ProductServiceRest
 * @description
 * # ProductServiceRest
 * Factory in the productosApp.
 */
var urlServices = 'http://localhost:8080';
angular.module('productosApp')
    .factory('ProductService', function($resource) {
        return $resource(
            urlServices + '/rest/productos/:id', {
                id: "@id"
            }, {
                'update': {
                    method: 'PUT'
                }
            }
        );
});