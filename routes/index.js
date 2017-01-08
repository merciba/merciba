'use strict'

const get = require('./get')

module.exports = function(app) {
  app.route({
    get: get
  })
};
