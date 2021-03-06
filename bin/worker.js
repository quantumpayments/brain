#!/usr/bin/env node

module.exports = bin

var find = require('../')

var checkTrialsInAddresses = find.checkTrialsInAddresses

var n = require('../data/data.js')

n = n || [ '1HUBHMij46Hae75JPdWjeZ5Q7KaL7EFRSD' ]

var stem = process.env['STEM'] || ''

/**
 * version as a command
 */
function bin (argv) {
  var ret = checkTrialsInAddresses(stem + argv[2], n)
  console.log(ret)
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}
