#!/usr/bin/env node

require('console.table')
var kue       = require('kue')
var rdf       = require('rdf-shell')
var Sequelize = require('sequelize')


// init
var interval = 4
var queue = kue.createQueue({
  prefix: 'q',
  redis: {
    port: 6380
  }
})

var items    = []

queue.complete( function( err, ids ) { // others are active, complete, failed, delayed
  // you may want to fetch each id to get the Job object out of it...
  for (var i = 0; i < ids.length; i++) {
    //console.log(ids[i])
    kue.Job.get( ids[i], function( err, job ) {
      // Your application should check if job is a stuck one
      var data = job.data
      //console.log(img);
      //items.push(job)
      job.remove(function(err){
      if (err) throw err;
        console.log('removed completed job');
      })
    })
  }

  setTimeout(process, 2000)



})


function process() {
  //console.log('processing')
  var results = []
  for (var i = 0; i < items.length; i++) {
    var data = items[i].data
    var cmd  = data.cmd
    //console.log(data.cmd);
    if (results.indexOf(cmd) !== -1) {
      //console.log('DUP');
      items[i].remove(function(err){
      if (err) throw err;
        console.log('removed completed job');
      });
    } else {
      console.log(cmd);
      results.push(cmd)
    }
  }

  // finnally
  queue.shutdown( 5000, function(err) {
    //process.exit( 0 );
  })


  //console.log(results);

}
