#!/usr/bin/env node

var CronJob       = require('cron').CronJob
var child_process = require('child_process')
var kue           = require('kue')

// init
var queue = kue.createQueue({
  prefix: 'q',
  redis: {
    port: 6380
  }
})

var mid      = process.argv[2] || "Z"

// job
var job = queue.create('11', {
  "title": '11 unknowns search',
  "mid": mid,
  "end" : "/#me1"
}).save( function(err){
  if( !err ) {
    console.log( job.id )
  }
  process.exit()
})
