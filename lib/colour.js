/*
 * Colour constructor & prototype
 *
 * Author: Raghuvir Kasturi
 * Date: 20/01/2015
 */

var convert = require('./converters');
var manipulate = require('./manipulations');
var validate = require('./validators');

/*
 * Colour constructor
 *
 * @param   {String, Object}  colour   The input colour as hex or object
 * @param   {Object}          opts     Additional parameters (alpha only at the moment)
 * @return  {Object}                   The new Colour instance
 */
var Colour = function(colour, opts) {

  var _tmpRGB;

  colour = colour || { type: 'RGB', value: [0,0,0] };
  opts = opts || { alpha: 1 };

  this._r = 0;
  this._g = 0;
  this._b = 0;
  this._a = 1;

  if (Array.isArray(colour) || Array.isArray(opts)) {
    throw new TypeError('Colour does not take array arguments');
  }

  if (typeof colour === 'string') {
    _tmpRGB = convert.hexToRGB(colour);
    this._r = _tmpRGB[0];
    this._g = _tmpRGB[1];
    this._b = _tmpRGB[2];
    this._a = opts.alpha;
  }

  if (typeof colour === 'object') {
    var type = colour.type.toLowerCase();

    if (type.indexOf('rgb') > -1) {
      this._r = colour.value[0];
      this._g = colour.value[1];
      this._b = colour.value[2];
      this._a = opts.alpha;
    }

    var convertFn = type + 'ToRGB';
    _tmpRGB = convert[convertFn](colour.value);
    this._r = _tmpRGB[0];
    this._g = _tmpRGB[1];
    this._b = _tmpRGB[2];
    this._a = opts.alpha || 1;
  }

};

Colour.prototype = {
  constructor: Colour,

  /*
   * Get/Set alpha
   *
   * @param   {Number}  alpha    The number to set current alpha/transparency. If not provided, returns existing alpha.
   * @return  {Number}           The alpha/transparency (a: {0,1})
   */
  alpha: function(alpha) {

    if (alpha && typeof alpha === 'number') {
      this._a = alpha;
    }

    return this._a;
  },


  /*
   * Convert RGB values into an array
   *
   * @return  {Array}            The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   */
  arrarize: function() {
    return [this._r, this._g, this._b];
  },


  /*
   * Sets the RGB values of the instance to some new value
   *
   * @param   {Array}  colour    The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   * @return  {Object}           The modified Colour instance
   */
  objectify: function(colour) {
    if (Array.isArray(colour)) {
      this._r = colour[0];
      this._g = colour[1];
      this._b = colour[2];
    }
    return this;
  },


  /*
   * Convert colour to Hex
   *
   * @return  {String}            The Hex representation
   */
  toHex: function() {
    var colour = this.arrarize();
    return convert.rgbToHex(colour);
  },


  /*
   * Convert colour to Hex with alpha
   *
   * @return  {Array}            Array of hex representation and alpha [hex, alpha]
   */
  toHexa: function() {
    var hex = this.toHex();
    var alpha = this.alpha();

    return [hex, alpha];
  },


  /*
   * Convert colour to RGB
   *
   * @return  {Array}            The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   */
  toRGB: function() {
    return this.arrarize();
  },


  /*
   * Convert colour to RGB with alpha
   *
   * @return  {Array}            The RGBa representation (r: {0,255}, g: {0,255}, b: {0,255}, a: {0,1})
   */
  toRGBa: function() {
    var colour = this.arrarize();
    var alpha = this.alpha();

    colour.push(alpha);

    return colour;
  },


  /*
   * Convert colour to HSL
   *
   * @return  {Array}            The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   */
  toHSL: function() {
    var colour = this.arrarize();

    return convert.rgbToHSL(colour);
  },


  /*
   * Convert colour to HSLa
   *
   * @return  {Array}            The HSLa representation (h: {0,360}, s: {0,100}, l: {0,100}, a: {0,1})
   */
  toHSLa: function() {
    var hsl = this.toHSL();
    var alpha = this.alpha();

    hsl.push(alpha);

    return hsl;
  },


  /*
   * Convert colour to HSV
   *
   * @return  {Array}            The HSV representation (h: {0,360}, s: {0,100}, v: {0,100})
   */
  toHSV: function() {
    var colour = this.arrarize();

    return convert.rgbToHSV(colour);
  },


  /*
   * Convert colour to HSVa
   *
   * @return  {Array}            The HSVa representation (h: {0,360}, s: {0,100}, v: {0,100}, a: {0,1})
   */
  toHSVa: function() {
    var hsv = this.toHSV();
    var alpha = this.alpha();

    hsv.push(alpha);

    return hsv;
  },


  /*
   * Lighten colour by value
   *
   * @param   {Number}   value   The amount to lighten the colour by (value: {0,100})
   * @return  {Object}           The modified Colour instance
   */
  lighten: function(value) {
    var hsl = this.toHSL();
    var lC = value ? manipulate.lighten(hsl, value) : manipulate.lighten(hsl);
    var rgb = convert.hslToRGB(lC);

    return this.objectify(rgb);
  },


  /*
   * Darken colour by value
   *
   * @param   {Number}   value   The amount to darken the colour by (value: {0,100})
   * @return  {Object}           The modified Colour instance
   */
  darken: function(value) {
    var hsl = this.toHSL();
    var dC = value ? manipulate.darken(hsl, value) : manipulate.darken(hsl);
    var rgb = convert.hslToRGB(dC);

    return this.objectify(rgb);
  },


  /*
   * Saturate colour by value
   *
   * @param   {Number}   value   The amount to saturate the colour by (value: {0,100})
   * @return  {Object}           The modified Colour instance
   */
  saturate: function(value) {
    var hsl = this.toHSL();
    var sC = value ? manipulate.saturate(hsl, value) : manipulate.saturate(hsl);
    var rgb = convert.hslToRGB(sC);

    return this.objectify(rgb);
  },


  /*
   * Desaturate colour by value
   *
   * @param   {Number}   value   The amount to desaturate the colour by (value: {0,100})
   * @return  {Object}           The modified Colour instance
   */
  desaturate: function(value) {
    var hsl = this.toHSL();
    var dsC = value ? manipulate.desaturate(hsl, value) : manipulate.desaturate(hsl);
    var rgb = convert.hslToRGB(dsC);

    return this.objectify(rgb);
  },


  /*
   * Transform colour to grayscale
   *
   * @return  {Object}           The modified Colour instance
   */
  grayscale: function() {
    var hsl = this.toHSL();
    var gC = manipulate.grayscale(hsl);
    var rgb = convert.hslToRGB(gC);

    return this.objectify(rgb);
  },


  /*
   * Checks if colour is grayscale
   *
   * @return  {Boolean}            Is colour grayscale?
   */
  isGrayscale: function() {
    var hsl = this.toHSL();

    return validate.isGrayscale(hsl);
  },


  /*
   * Checks if colour is a colour (not grayscale)
   *
   * @return  {Boolean}            Is colour a colour?
   */
  isColour: function() {
    return !this.isGrayscale();
  }
};

module.exports = Colour;