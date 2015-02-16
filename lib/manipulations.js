/*
 * Manipulation functions
 *
 * Author: Raghuvir Kasturi
 * Date: 20/01/2015
 */

module.exports = {

  /*
   * Lighten a colour by a set amount.
   *
   * @param   {Array}    colour    The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   * @param   {Number}   value     The value to add to the lightness (v: {0,100}). Defaults to 10.
   * @return  {Array}              The lightened colour in HSL
   */
  lighten: function(colour, value) {

    value = value || 10;

    var h = colour[0];
    var s = colour[1];
    var l = colour[2];
    var lV = l + value;

    l = lV > 100 ? 100 : lV;

    return [h,s,l];

  },


  /*
   * Darken a colour by a set amount.
   *
   * @param   {Array}    colour    The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   * @param   {Number}   value     The value to remove from the lightness (v: {0,100}). Defaults to 10.
   * @return  {Array}              The darkened colour in HSL
   */
  darken: function(colour, value) {

    value = value || 10;

    var h = colour[0];
    var s = colour[1];
    var l = colour[2];
    var dV = l - value;

    l = dV < 0 ? 0 : dV;

    return [h,s,l];
  },


  /*
   * Saturate a colour by a set amount.
   *
   * @param   {Array}    colour    The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   * @param   {Number}   value     The value to add to the saturation (s: {0,100}). Defaults to 10.
   * @return  {Array}              The saturated colour in HSL
   */
  saturate: function(colour, value) {

    value = value || 10;

    var h = colour[0];
    var s = colour[1];
    var l = colour[2];
    var sS = s + value;

    s = sS > 100 ? 100 : sS;

    return [h,s,l];
  },


  /*
   * Desaturate a colour by a set amount.
   *
   * @param   {Array}    colour    The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   * @param   {Number}   value     The value to remove from the saturation (s: {0,100}). Defaults to 10.
   * @return  {Array}              The desaturated colour in HSL
   */
  desaturate: function(colour, value) {

    value = value || 10;

    var h = colour[0];
    var s = colour[1];
    var l = colour[2];
    var dS = s - value;

    s = dS < 0 ? 0 : dS;

    return [h,s,l];
  },


  /*
   * Transforms colour to grayscale
   *
   * @param   {Array}    colour    The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   * @return  {Array}              The grayscale colour in HSL
   */
  grayscale: function(colour) {

    var h = colour[0];
    var s = colour[1];
    var l = colour[2];

    s = s === 0 ? s : 0;

    return [h,s,l];
  }
};