/*
 * Converter functions
 *
 * Author: Raghuvir Kasturi
 * Date: 20/01/2015
 */

var _ = require('underscore');
var util = require('./util');

module.exports = {

  /*
   * Converts hex to RGB
   *
   * @param   {String}  colour  The hexcode representation
   * @return  {Array}           The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   */
  hexToRGB: function(colour) {

    // Return black for invalid hex length
    if (colour.length > 7 || colour.length === 5 || colour.length === 1 || colour.length === 2) {
      return [0,0,0];
    }

    // Strip the #
    if (colour[0] === '#' && (colour.length === 7 || colour.length === 4)) {
      if (colour.indexOf('#') > -1) {
        colour = colour.slice(1);
      }
    }

    // Expand shortform hex (#000)
    if (colour.length === 3) {
      colour = _.reduce(colour.split(''), function(memo, val) {
        if (memo.length === 1) {
          memo = memo + memo;
        }
        var double = val + val;
        return memo + double;
      });
    }

    // Validate
    var validNums = _.range(0,10).toString().split('');
    var validChars = 'ABCDEF'.split('');
    var isValid = _.every(colour.split(''), function(val) {
      var fVal = val.toString().toUpperCase();
      return (_.contains(validNums, fVal) || _.contains(validChars, fVal));
    });

    // Convert
    if (isValid) {
      var full = parseInt(colour, 16);
      return [(full >> 16) & 255, (full >> 8) & 255, full & 255];
    } else {
      return [0,0,0];
    }
  },


  /*
   * Converts RGB to Hex
   *
   * @param  {Array}  colour  The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   * @return {String}         The Hexcode representation
   */
  rgbToHex: function(colour) {
    return '#'+colour[0].toString(16)+colour[1].toString(16)+colour[2].toString(16);
  },


  /*
   * Converts HSL to RGB
   *
   * @param   {Array}  colour  The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   * @return  {Array}          The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   */
  hslToRGB: function(colour) {

    // Check input
    if (!Array.isArray(colour)) {
      return [0,0,0];
    }

    var h = colour[0];
    var s = colour[1];
    var l = colour[2];

    // normalize S & L
    var iR = [0,100];
    var oR = [0,1];
    s = util.scale(s, iR, oR);
    l = util.scale(l, iR, oR);

    var c = (1 - Math.abs((2*l) - 1)) * s;
    var x = c * (1 - Math.abs(((h/60) % 2) - 1));
    var m = l - (c/2);

    var rgbP;

    switch (true) {
      case ((0 <= h && h < 60) || h === 360):
        rgbP = [c,x,0];
        break;
      case (60 <= h && h < 120):
        rgbP = [x,c,0];
        break;
      case (120 <= h && h < 180):
        rgbP = [0,c,x];
        break;
      case (180 <= h && h < 240):
        rgbP = [0,x,c];
        break;
      case (240 <= h && h < 300):
        rgbP = [x,0,c];
        break;
      case (300 <= h && h < 360):
        rgbP = [c,0,x];
        break;
    }

    return _.map(rgbP, function(val) {
      return Math.round((val + m) * 255);
    });
  },


  /*
   * Converts RGB to HSL
   *
   * @param   {Array}  colour  The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   * @return  {Array}          The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   */

  rgbToHSL: function(colour) {

    // Check input
    if (!Array.isArray(colour)) {
      return [0,0,0];
    }

    // Set up rgb vars
    var iR = [0,255];
    var oR = [0,1];
    var r = util.scale(colour[0], iR, oR);
    var g = util.scale(colour[1], iR, oR);
    var b = util.scale(colour[2], iR, oR);

    var max = Math.max(r,g,b);
    var min = Math.min(r,g,b);

    var delta = max - min;

    var h, s, l;

    // Calculate Hue
    switch (max) {
      case r:
        h = Math.round(60 * (((g - b) / delta) % 6));
        break;
      case g:
        h = Math.round(60 * (((b - r) / delta) + 2));
        break;
      case b:
        h = Math.round(60 * (((r - g) / delta) + 4));
        break;
    }

    // S & L scales
    var slInputR = [0,1];
    var slOutputR = [0,100];


    // Calculate Lightness
    l = util.scale(((max + min) / 2), slInputR, slOutputR);
    l = +l.toFixed(1);

    // Calculate Saturation
    if (delta === 0) {
      s = 0;
    } else {
      s = util.scale(delta / (1 - Math.abs((2 * ((max + min)/2)) - 1)), slInputR, slOutputR);
      s = +s.toFixed(1);
    }

    return [h,s,l];
  },


  /*
   * Converts HSV to RGB
   *
   * @param   {Array}  colour  The HSV representation (h: {0,360}, s: {0,100}, v: {0,100})
   * @return  {Array}          The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   */
  hsvToRGB: function(colour) {
    // Check input
    if (!Array.isArray(colour)) {
      return [0,0,0];
    }

    var h = colour[0];
    var s = colour[1];
    var v = colour[2];

    // normalize S & V
    var iR = [0,100];
    var oR = [0,1];
    s = util.scale(s, iR, oR);
    v = util.scale(v, iR, oR);

    var c = v * s;
    var x = c * (1 - Math.abs(((h/60) % 2) - 1));
    var m = v - c;

    var rgbP;

    switch (true) {
      case ((0 <= h && h < 60) || h === 360):
        rgbP = [c,x,0];
        break;
      case (60 <= h && h < 120):
        rgbP = [x,c,0];
        break;
      case (120 <= h && h < 180):
        rgbP = [0,c,x];
        break;
      case (180 <= h && h < 240):
        rgbP = [0,x,c];
        break;
      case (240 <= h && h < 300):
        rgbP = [x,0,c];
        break;
      case (300 <= h && h < 360):
        rgbP = [c,0,x];
        break;
    }

    return _.map(rgbP, function(val) {
      return Math.round((val + m) * 255);
    });
  },


  /*
   * Converts RGB to HSV
   *
   * @param   {Array}  colour  The RGB representation (r: {0,255}, g: {0,255}, b: {0,255})
   * @return  {Array}          The HSV representation (h: {0,360}, s: {0,100}, v: {0,100})
   */

  rgbToHSV: function(colour) {

    // Check input
    if (!Array.isArray(colour)) {
      return [0,0,0];
    }

    // Set up rgb vars
    var iR = [0,255];
    var oR = [0,1];
    var r = util.scale(colour[0], iR, oR);
    var g = util.scale(colour[1], iR, oR);
    var b = util.scale(colour[2], iR, oR);

    var max = Math.max(r,g,b);
    var min = Math.min(r,g,b);

    var delta = max - min;

    var h, s, v;

    // Calculate Hue
    switch (max) {
      case r:
        h = Math.round(60 * (((g - b) / delta) % 6));
        break;
      case g:
        h = Math.round(60 * (((b - r) / delta) + 2));
        break;
      case b:
        h = Math.round(60 * (((r - g) / delta) + 4));
        break;
    }

    // S & L scales
    var slInputR = [0,1];
    var slOutputR = [0,100];

    // Calculate Lightness
    v = util.scale(max, slInputR, slOutputR);
    v = +v.toFixed(1);

    // Calculate Saturation
    if (delta === 0) {
      s = 0;
    } else {
      s = util.scale((delta / max), slInputR, slOutputR);
      s = +s.toFixed(1);
    }

    return [h,s,v];
  }
};