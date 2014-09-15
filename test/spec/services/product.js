'use strict';

describe('Factory: Product', function () {

  // load the service's module
  beforeEach(module('productosApp'));

  // instantiate service
  var Product;
  beforeEach(inject(function (_Product_) {
    Product = _Product_;
  }));

  it('Product is Defined', function () {
    expect(!!Product).toBe(true);
  });
    
  it('Product Constructor is Correct', function () {
    var product = new Product('Arroz', 1100, 1, '', 'Roa');
      expect(product.name).toEqual('Arroz');
      expect(product.cost).toEqual(1100);
      expect(product.gain).toEqual(1);
      expect(product.value).toEqual('');
      expect(product.producer).toEqual('Roa');
  });

});
