#!/usr/bin/env node

var find = require('../')

var strToAddr = find.strToAddr



/**
 * version as a command
 */
function bin(argv) {
  var address = strToAddr(argv[2])
  console.log(address.toString())
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}
