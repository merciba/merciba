'use strict'

const get = require('./get')
const post = require('./post')

module.exports = function(app) {
  app.route({
    get: get,
    post: post
  })
};
