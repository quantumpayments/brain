#!/usr/bin/env node

module.exports = {
  check     : check,
  strToAddr : strToAddr
}


// requires
var bitcore = require('bitcore-lib')
var debug   = require('debug')('find')
var fs      = require('fs')


/**
 * check
 * @param  {Object} haystack string or array of strings to check
 * @param  {Array} n array to check
 */
function check(haystack, n) {
  haystack = [].concat( haystack );

  for (var i = 0; i < haystack.length; i++) {
    var address = strToAddr(haystack[i], true);
    debug(address.toString());
    debug(success(address.toString(), n));

    address = strToAddr(haystack[i], false);
    debug(address.toString());
    debug(success(address.toString(), n));

  }
}


/**
 * Converts string to an address
 * @param  {String} str           The string to be hashed
 * @param  {boolean} uncompressed Uncompressed or not
 * @return {Object}               Public Key Address
 */
function strToAddr(str, uncompressed) {

  var value = new Buffer(str)
  var hash = bitcore.crypto.Hash.sha256(value)
  var bn = bitcore.crypto.BN.fromBuffer(hash)
  var privateKey = new bitcore.PrivateKey(bn)


  var wif = bitcore.PrivateKey(bn).toWIF()

  var publicKey1 = new bitcore.PublicKey(privateKey)

  var pointx = publicKey1.point.x.toString('hex')
  var pointy = publicKey1.point.y.toString('hex')

  //padding left
  pointx = String("00000000" + pointx).slice(-64)
  pointy = String("00000000" + pointy).slice(-64)

  var publicKey2 = new bitcore.PublicKey('04' + pointx + pointy)

  var addr1 = publicKey1.toAddress(); //compressed - 19eA3hUfKRt7aZymavdQFXg5EZ6KCVKxr8
  var addr2 = publicKey2.toAddress(); //uncompressed - 1HKqKTMpBTZZ8H5zcqYEWYBaaWELrDEXeE

  if (uncompressed) {
    return addr1
  } else {
    return addr2
  }

}
