#!/usr/bin/env node

var bot = require('../').bot

var job = { '11': { 'title': '11 unknowns search' } }

// main
bot.addJob(job).then(function (ret) {
  console.log(ret.id)
  bot.shutdown()
}).catch(function (err) {
  console.error(err)
  bot.shutdown()
})
