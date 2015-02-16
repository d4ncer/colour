/*
 * Validator functions
 *
 * Author: Raghuvir Kasturi
 * Date: 20/01/2015
 */

module.exports = {

  /*
   * Check if colour is grayscale
   *
   * @param   {Array}    colour    The HSL representation (h: {0,360}, s: {0,100}, l: {0,100})
   * @return  {Boolean}            Is colour grayscale?
   */
  isGrayscale: function(colour) {

    var s = colour[1];

    return s === 0;

  }

};