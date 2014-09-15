'use strict';

describe('Service: Utils', function () {

  // load the service's module
  beforeEach(module('productosApp'));

  // instantiate service
  var Utils;
  beforeEach(inject(function (_Utils_) {
    Utils = _Utils_;
  }));

  it('Utils is Defined', function () {
    expect(!!Utils).toBe(true);
  });
    
  it('Utils is Defined/Undefined', function () {
    var x;
    expect(Utils.isDefined(x)).toBe(false);
    expect(Utils.isUndefined(x)).toBe(true);
  });
    
  it('Utils calcValueGain', function () {    
    expect(Utils.calcValueGain(100,10)).toEqual(110);    
  });
    
  it('Utils parseInteger', function () {    
    expect(Utils.parseInteger('5',10)).toEqual(5);
  });
});
