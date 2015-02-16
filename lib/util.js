/*
 * Util functions
 *
 * Author: Raghuvir Kasturi
 * Date: 20/01/2015
 */

module.exports = {
  /*
   * Scale function
   *
   * @param   {Number}  val             The value to be scaled
   * @param   {Array}   inputRange      The current range that the value sits within
   * @param   {Array}   outputRange     The range to be scaled to
   * @return  {Number}                  The scaled value
   */
  scale: function(val, inputRange, outputRange) {
    return ( val - inputRange[ 0 ] ) * ( outputRange[ 1 ] - outputRange[ 0 ] ) / ( inputRange[ 1 ] - inputRange[ 0 ] ) + outputRange[ 0 ];
  }

};