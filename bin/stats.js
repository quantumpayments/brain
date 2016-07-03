#!/usr/bin/env node

var bot           = require('../').bot
var CronJob       = require('cron').CronJob
var child_process = require('child_process')
var kue           = require('kue')
var last          = require('array-last')
var wc_db         = require('wc_db')


var queue = bot.createQueue()

queue.complete( function( err, ids ) {
  console.log('complete')
  ids.forEach( function( id ) {
    console.log(id)
  })
})


queue.active( function( err, ids ) {
  console.log('active')
  ids.forEach( function( id ) {
    console.log(id)
  })
})


queue.inactive( function( err, ids ) {
  console.log('inactive')
  ids.forEach( function( id ) {
    console.log(id)
  })
  bot.shutdown()
})
