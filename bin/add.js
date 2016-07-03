#!/usr/bin/env node

var bot = require('../').bot
var kue = require('kue')

// init
var queue = bot.createQueue()
var mid      = process.argv[2] || "Z"

var job = {'11':
  {
    "title": '11 unknowns search',
    "mid": mid,
    "end" : "/#me1"
  }
}


// main
bot.addJob(job).then(function(ret){
  console.log(ret.id)
  bot.shutdown()
}).catch(function(err){
  console.error(err)
  bot.shutdown()
})
