#!/usr/bin/env node

// requires
var solidbot   = require('../')
var podcatcher = require('podcatcher');


podcatcher.getAll('http://feeds.feedburner.com/NodeUp', function(err, meta, articles) {
  if (err) console.log(err);
  //console.log(meta);
  articles.forEach(function(item) {
    console.log(item.guid)
  });
});
