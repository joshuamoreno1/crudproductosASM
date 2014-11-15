describe('CRUD Products', function() {
    var ptor;
    var home = '/';
    var HttpBackend;
    var proxy;
    
    var mockModule = require('./mocked-backend');

    beforeEach(function() {
        browser.get(home);
        ptor = protractor.getInstance();
        ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    });

    it('test Add a new product (Happy Way)', function() {        
        ptor.sleep(10000);
        element(by.id('buttonAddNew')).click().then(function() {
            expect(ptor.isElementPresent(by.id('buttonAccept'))).toBe(true);
            element(by.id('productName')).sendKeys('Pan Ballena');
            element(by.id('productCost')).sendKeys(3000);
            element(by.id('productGain')).sendKeys(20);
            element(by.id('productProducer')).sendKeys('Bimbo');
            element(by.id('buttonAccept')).click().then(function() {
               
                ptor.sleep(20000);
                expect(ptor.isElementPresent(by.id('buttonAccept'))).toBe(false);
            }, function() {
                expect(false).toBe(true);
            });
        }, function() {
            expect(false).toBe(true);
        });
    });

    //    it('test Add a new product with Empty Fields', function() {        
    //        element(by.id('buttonAddNew')).click().then(function() {
    //            expect(ptor.isElementPresent(by.id('buttonAccept'))).toBe(true);
    //            element(by.id('productName')).clear();
    //            element(by.id('productCost')).clear();
    //            element(by.id('productGain')).sendKeys(20);
    //            element(by.id('productProducer')).sendKeys('');            
    //            element(by.id('buttonAccept')).click().then(function() { 
    //                browser.waitForAngular();
    //                expect(ptor.isElementPresent(by.id('buttonAccept'))).toBe(true);
    //            },function(){
    //                expect(false).toBe(true);
    //            });
    //        }, function() {
    //            expect(false).toBe(true);
    //        });
    //    });
    //    
    //    
    //    it('test Edit Product', function() {      
    //        var newName = 'Frijoles';
    //        var products = element.all(by.repeater('p in listProducts'));      
    //        element.all(by.repeater('p in listProducts')).then(function(rows) {            
    //            rows = rows;
    //            element(by.id('edit0')).click().then(function() {
    //            expect(ptor.isElementPresent(by.id('buttonAccept'))).toBe(true);
    //            element(by.id('productName')).clear().sendKeys(newName);
    //            element(by.id('productCost')).clear().sendKeys(2000);
    //            element(by.id('productGain')).clear().sendKeys(15);
    //            element(by.id('productProducer')).clear().sendKeys('Campesinos');
    //            element(by.id('buttonAccept')).click().then(function() { 
    //                expect(ptor.isElementPresent(by.id('buttonAccept'))).toBe(false);
    //                ptor.findElement(by.repeater('p in listProducts').row(0).column('name')).
    //                getText().then(function(text) {
    //                    expect(text).toEqual(newName);
    //                });
    //            },function(){
    //                expect(false).toBe(true);
    //            });
    //            },function(){
    //                expect(false).toBe(true);
    //            });
    //        });
    //    });
    //    
    //    it('test Delete Product', function() {
    //        var rows;
    //        var products = element.all(by.repeater('p in listProducts'));      
    //        element.all(by.repeater('p in listProducts')).then(function(rows) {            
    //            rows = rows;
    //            element(by.id('delete0')).click().then(function() {
    //                 element.all(by.repeater('p in listProducts')).then(function(rows2) {                    
    //                     expect(rows.length-1).toEqual(rows2.length);
    //                 });
    //            },function(){
    //                expect(false).toBe(true);
    //            });
    //        });
    //    });
});
