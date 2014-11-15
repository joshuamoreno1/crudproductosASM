exports.httpBackendMock = function() {
    angular.module('httpBackendMock', ['productosApp', 'ngMockE2E'])
    .run(function($httpBackend) {
        console.log('Test platform bootstrapping');  
         $httpBackend.whenGET('/rest/productos').respond(200, [{
                    "productDTO": {
                        "code": "10",
                        "name": "fsdf",
                        "cost": 10,
                        "gain": 1,
                        "value": 10,
                        "producer": "sdfsdf"
                    }
                }, {
                    "productDTO": {
                        "code": "3",
                        "name": "Pasas",
                        "cost": 1000,
                        "gain": 1,
                        "value": 1010,
                        "producer": "sdfsdf"
                    }
                }]);    
        
        $httpBackend.whenPOST('/rest/productos').respond(200, {
            "code": 200,
            "message": "Agregado correctamente",
            "result": "11"
        });
        $httpBackend.whenPUT('/rest/productos/11').respond(200, {
            "code": 200,
            "message": "Actualizado correctamente panecillo",
            "result": false
        });
     
        console.log('Test platform bootstrapping ... done');
    });
}