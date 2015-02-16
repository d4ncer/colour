var mocha = require('mocha');
var chai = require('chai');
var Colour = require('../index');
var convert = require('../lib/converters');
var manipulate = require('../lib/manipulations');
chai.should();

describe('Create', function() {
  it('should not accept array arguments', function() {
    (function() {
      new Colour([1,2,3]);
    }).should.throw(TypeError);
  });

  it('should create a new colour object', function() {
    var colour = new Colour('#e27a3f');
    colour.should.be.a('object');
  });

  it('should have the _r, _g, _b, _a properties', function() {
    var colour = new Colour('#e27a3f');
    colour.should.have.property('_r');
    colour.should.have.property('_g');
    colour.should.have.property('_b');
    colour.should.have.property('_a');
  });

  it('should have the arrarize, objectify, toHex, toHexa, toRGB, toRGBa, toHSL, toHSLa, toHSV, toHSVa methods', function() {
    var colour = new Colour('#e27a3f');
    (colour.arrarize).should.be.a('function');
    (colour.objectify).should.be.a('function');
    (colour.toHex).should.be.a('function');
    (colour.toHexa).should.be.a('function');
    (colour.toRGB).should.be.a('function');
    (colour.toRGBa).should.be.a('function');
    (colour.toHSL).should.be.a('function');
    (colour.toHSLa).should.be.a('function');
    (colour.toHSV).should.be.a('function');
    (colour.toHSVa).should.be.a('function');
  })
});

describe('Convert (internal)', function(){
  it('should convert hex to RGB with full hex', function() {
    var colour = new Colour('#e27a3f');
    (colour._r).should.equal(226);
    (colour._g).should.equal(122);
    (colour._b).should.equal(63);
  });

  it('should convert hex to RGB with shortform hex', function() {
    var colour = new Colour('a3f');
    (colour._r).should.equal(170);
    (colour._g).should.equal(51);
    (colour._b).should.equal(255);
  });

  it('should return black for hex with invalid length', function() {
    var colour = new Colour('argxbasdfs');
    (colour._r).should.equal(0);
    (colour._g).should.equal(0);
    (colour._b).should.equal(0);
  });

  it('should return black for hex with invalid value', function() {
    var colour = new Colour('#j7za3f');
    (colour._r).should.equal(0);
    (colour._g).should.equal(0);
    (colour._b).should.equal(0);
  });

  it('should convert RGB to hex', function() {
    var hex = convert.rgbToHex([226, 122, 63]);
    hex.should.equal('#e27a3f');
  });

  it('should convert HSL to RGB', function() {
    var colour = new Colour({type: 'HSL', value: [359, 50.2, 59.8], alpha: 1});
    (colour._r).should.equal(204);
    (colour._g).should.equal(101);
    (colour._b).should.equal(103);
  });

  it('should convert HSLa to RGBa', function() {
    var colour = new Colour({type: 'HSL', value: [359, 50.2, 59.8]}, { alpha: 0.5 });
    (colour._r).should.equal(204);
    (colour._g).should.equal(101);
    (colour._b).should.equal(103);
    (colour._a).should.equal(0.5);
  });

  it('should convert RGB to HSL', function() {
    var hsl = convert.rgbToHSL([226, 122, 63]);
    (hsl[0]).should.equal(22);
    (hsl[1]).should.equal(73.8);
    (hsl[2]).should.equal(56.7);
  });

  it('should convert HSV to RGB', function() {
    var colour = new Colour({ type: 'HSV', value: [22, 72.1, 88.6] });
    (colour._r).should.equal(226);
    (colour._g).should.equal(123);
    (colour._b).should.equal(63);
  });

  it('should convert HSVa to RGBa', function() {
    var colour = new Colour({ type: 'HSV', value: [22, 72.1, 88.6] }, { alpha: 0.5 });
    (colour._r).should.equal(226);
    (colour._g).should.equal(123);
    (colour._b).should.equal(63);
    (colour._a).should.equal(0.5);
  });

  it('should convert RGB to HSV', function() {
    var hsv = convert.rgbToHSV([226, 123, 63]);
    (hsv[0]).should.equal(22);
    (hsv[1]).should.equal(72.1);
    (hsv[2]).should.equal(88.6);
  });
});

describe('Convert (external)', function() {

  var colour;

  beforeEach(function(done) {
    colour = new Colour('#e27a3f', { alpha: 0.7 });
    done();
  });

  it('should convert to RGB', function() {
    var rgb = colour.toRGB();
    (rgb[0]).should.equal(226);
    (rgb[1]).should.equal(122);
    (rgb[2]).should.equal(63);
  });

  it('should convert to RGBa', function() {
    var rgba = colour.toRGBa();
    (rgba[0]).should.equal(226);
    (rgba[1]).should.equal(122);
    (rgba[2]).should.equal(63);
    (rgba[3]).should.equal(0.7);
  });

  it('should convert to Hex', function() {
    var hex = colour.toHex();
    hex.should.equal('#e27a3f');
  });

  it('should convert to Hex with alpha', function() {
    var hexa = colour.toHexa();
    (hexa[0]).should.equal('#e27a3f');
    (hexa[1]).should.equal(0.7);
  });

  it('should convert to HSL', function() {
    var hsl = colour.toHSL();
    (hsl[0]).should.equal(22);
    (hsl[1]).should.equal(73.8);
    (hsl[2]).should.equal(56.7);
  });

  it('should convert to HSLa', function() {
    var hsla = colour.toHSLa();
    (hsla[0]).should.equal(22);
    (hsla[1]).should.equal(73.8);
    (hsla[2]).should.equal(56.7);
    (hsla[3]).should.equal(0.7);
  });

  it('should convert to HSV', function() {
    var hsv = colour.toHSV();
    (hsv[0]).should.equal(22);
    (hsv[1]).should.equal(72.1);
    (hsv[2]).should.equal(88.6);
  });

  it('should convert to HSVa', function() {
    var hsva = colour.toHSVa();
    (hsva[0]).should.equal(22);
    (hsva[1]).should.equal(72.1);
    (hsva[2]).should.equal(88.6);
    (hsva[3]).should.equal(0.7);
  });
});

describe('Manipulate (internal)', function() {
  it('should change the alpha if provided a value', function() {
    var colour = new Colour('#e27a3f', { alpha: 1 });
    (colour.alpha()).should.equal(1);
    (colour.alpha(0.3)).should.equal(0.3);
  });

  it('should lighten a colour', function() {
    var lightened = manipulate.lighten([359, 50.2, 59.8], 15);
    (lightened[0]).should.equal(359);
    (lightened[1]).should.equal(50.2);
    (lightened[2]).should.equal(74.8);
  });

  it('should lighten a colour without value', function() {
    var lightened = manipulate.lighten([359, 50.2, 59.8]);
    (lightened[0]).should.equal(359);
    (lightened[1]).should.equal(50.2);
    (lightened[2]).should.equal(69.8);
  });

  it('should darken a colour', function() {
    var darkened = manipulate.darken([359, 50.2, 59.8], 15);
    (darkened[0]).should.equal(359);
    (darkened[1]).should.equal(50.2);
    (darkened[2]).should.equal(44.8);
  });

  it('should darken a colour without value', function() {
    var darkened = manipulate.darken([359, 50.2, 59.8]);
    (darkened[0]).should.equal(359);
    (darkened[1]).should.equal(50.2);
    (darkened[2]).should.equal(49.8);
  });

  it('should saturate a colour', function() {
    var saturated = manipulate.saturate([359, 50.2, 59.8], 15);
    (saturated[0]).should.equal(359);
    (saturated[1]).should.equal(65.2);
    (saturated[2]).should.equal(59.8);
  });

  it('should saturate a colour without value', function() {
    var saturated = manipulate.saturate([359, 50.2, 59.8]);
    (saturated[0]).should.equal(359);
    (saturated[1]).should.equal(60.2);
    (saturated[2]).should.equal(59.8);
  });

  it('should desaturate a colour', function() {
    var desaturated = manipulate.desaturate([359, 50.2, 59.8], 15);
    (desaturated[0]).should.equal(359);
    (desaturated[1]).should.equal(35.2);
    (desaturated[2]).should.equal(59.8);
  });

  it('should desaturate a colour without value', function() {
    var desaturated = manipulate.desaturate([359, 50.2, 59.8]);
    (desaturated[0]).should.equal(359);
    (desaturated[1]).should.equal(40.2);
    (desaturated[2]).should.equal(59.8);
  });

  it('should transform a colour to grayscale', function() {
    var grayscale = manipulate.grayscale([100, 50, 70]);
    (grayscale[0]).should.equal(100);
    (grayscale[1]).should.equal(0);
    (grayscale[2]).should.equal(70);
  });
});

describe('Manipulate (external)', function() {
  var colour;

  beforeEach(function(done) {
    colour = new Colour('#e27a3f', { alpha: 0.7 });
    done();
  });

  it('should return the object for chaining', function() {
    var nC = colour.lighten(10);
    nC.should.be.an.instanceof(Colour);
  });

  it('should lighten the colour', function() {
    var originalLightness = colour.toHSL()[2];
    colour.lighten();
    var newLightness = colour.toHSL()[2];
    newLightness.should.equal(originalLightness+10);
  });

  it('should darken the colour', function() {
    var originalLightness = colour.toHSL()[2];
    colour.darken();
    var newLightness = colour.toHSL()[2];
    newLightness.should.equal(originalLightness-10);
  });

  it('should saturate the colour', function() {
    var originalSaturation = colour.toHSL()[1];
    colour.saturate(9);
    var newSaturation = colour.toHSL()[1];
    newSaturation.should.equal(originalSaturation+9);
  });

  it('should desaturate the colour', function() {
    var originalSaturation = colour.toHSL()[1];
    colour.desaturate();
    var newSaturation = colour.toHSL()[1];
    newSaturation.should.equal(originalSaturation-10);
  });

  it('should convert a colour to grayscale', function() {
    colour.grayscale();
    var newSaturation = colour.toHSL()[1];
    newSaturation.should.equal(0);
  });
});

describe('Validate', function() {

  it('should test for grayscale', function() {
    var colour = new Colour('#d1d1d1');
    (colour.isGrayscale()).should.be.true;
  });

  it('should test for colour', function() {
    var colour = new Colour('#e27a3f');
    (colour.isColour()).should.be.true;
  });
});
