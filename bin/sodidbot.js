#!/usr/bin/env node

var CronJob       = require('cron').CronJob
var child_process = require('child_process')
var kue           = require('kue')

// init
var interval = 60
var length   = '11'

var kue = require('kue');
var config = require('../config/config')
var queue = kue.createQueue(config.kue)


// cron
new CronJob('*/'+ interval +' * * * * *', function() {
  console.log('Running Cron every '+ interval +' seconds')


}, null, true, 'America/Los_Angeles')


// process queue
queue.process(length, function(job, done){
  console.log(job.data)
  console.log('running : ' + job.data.title);
  var cmd = '/var/www/ld/quantumpayments/brain/bin/worker.js "' + job.data.mid + job.data.end + '"'
  console.log(cmd);
  child_process.exec(cmd, function(err, stdout, stderr){
    if (err) {
      console.error(err);
      done()
    } else {
      console.log(stdout);
      done()
    }
  })
})


// check queue
queue.activeCount( function( err, total ) { // others are activeCount, completeCount, failedCount, delayedCount
  console.log(total)
})


// server
kue.app.listen(3333)
