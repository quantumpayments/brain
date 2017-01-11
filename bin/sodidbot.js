#!/usr/bin/env node

var CronJob = require('cron').CronJob
var exec = require('child_process').exec

// init
var interval = 60
var length = '11'

var config = require('../config/config')
var kue = require('kue')
var queue = kue.createQueue(config.kue)

// cron
try {
  new CronJob('*/' + interval + ' * * * * *', function () {
    console.log('Running Cron every ' + interval + ' seconds')
  }, null, true, 'America/Los_Angeles')
} catch (e) {
  console.error(e)
}

// process queue
queue.process(length, function (job, done) {
  console.log(job.data)
  console.log('running : ' + job.data.title)
  var cmd = '/var/www/ld/quantumpayments/brain/bin/worker.js "' + job.data.mid + job.data.end + '"'
  console.log(cmd)
  exec(cmd, function (err, stdout, stderr) {
    if (err) {
      console.error(err)
      done()
    } else {
      console.log(stdout)
      done()
    }
  })
})

queue.activeCount(function (err, total) { // others are activeCount, completeCount, failedCount, delayedCount
  if (err) {
    console.error(err)
  } else {
    console.log(total)
  }
})

// server
kue.app.listen(3333)
