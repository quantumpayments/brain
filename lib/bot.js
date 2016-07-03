#!/usr/bin/env node

module.exports = {
  addJob      : addJob,
  createQueue : createQueue,
  getConfig   : getConfig,
  shutdown    : shutdown
}


// requires
var debug = require('debug')('qpm_brain:bot')
var kue   = require('kue')


/**
 * create queue
 * @param  {object} config Optional config.
 * @return {object} Kue queue object or error.
 */
function createQueue(config) {

  config = config || getConfig()
  if (!config || !config.kue) {
    return Error('Config is required')
  }
  var queue = kue.createQueue(config.kue)

  queue = kue.createQueue({
    prefix: 'q',
    redis: {
      port: 6380
    }
  })

  return queue

}


/**
 * Shutdown the queue.
 * @param  {object} queue Optional queue.
 */
function shutdown(queue) {

  var timeout = 5000

  queue = queue || createQueue()

  queue.shutdown(timeout, function(err) {
    process.exit(0)
  })

}


/**
 * Get config.
 * @param  {string} The path of the config file.
 * @return {object} The config.
 */
function getConfig(path) {

  var defaultPath = '../config/config'
  path = path || defaultPath
  var config = require(path)
  return config

}


/**
 * Adds a job to the queue
 * @param {object} job      The job to add
 * @param {string} priority The job priority low | normal | medium | high | critical
 * @param {object} queue    The optional queue.
 * @return {object} Promise with job or error.
 */
function addJob(job, priority, queue) {

  debug(job)

  return new Promise(function(resolve, reject) {

    if (!job) {
      reject(new Error('No job'))
    }

    var priorities = ['low', 'normal', 'medium', 'high', 'critical']
    if (!priority) {
      priority = 'normal'
    } else if (priorites.indexOf(priority) === -1) {
      priority = 'normal'
    }

    queue = queue || createQueue()

    for (ind in job) {
      var j = queue.create(ind, job[ind]).priority(priority).save(function(err) {
        if (err) {
          reject(err)
        } else {
          resolve(j)
        }
      })
    }

  })

}
