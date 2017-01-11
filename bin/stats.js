#!/usr/bin/env node

var bot = require('../').bot
var queue = bot.createQueue()

queue.complete(function (err, ids) {
  if (err) {
    console.error(err)
  } else {
    console.log('complete')
    ids.forEach(function (id) {
      console.log(id)
    })
  }
})

queue.active(function (err, ids) {
  if (err) {
    console.error(err)
  } else {
    console.log('active')
    ids.forEach(function (id) {
      console.log(id)
    })
  }
})

queue.inactive(function (err, ids) {
  if (err) {
    console.error(err)
  } else {
    console.log('inactive')
    ids.forEach(function (id) {
      console.log(id)
    })
    bot.shutdown()
  }
})
