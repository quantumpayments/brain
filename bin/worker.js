#!/usr/bin/env node

var find = require('../')

var check     = find.check
var strToAddr = find.strToAddr

var n = require('../data/data.js')

n = n || [ '1HUBHMij46Hae75JPdWjeZ5Q7KaL7EFRSD' ]


/**
 * version as a command
 */
function bin(argv) {
  var ret = check(argv[2], n)
  console.log(ret)
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}
