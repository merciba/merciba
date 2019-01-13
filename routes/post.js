'use strict'

const React = require('react'),
  Promise = require('bluebird'),
  path = require('path'),
  request = require('request-promise'),
  orequire = require('orequire')

const controllers = {
  message: require('../controllers/message'),
  subscribe: require('../controllers/subscribe')
}

module.exports = {
  '/contact': function * () {
    try {
      if (this.request.body && this.request.body['g-recaptcha-response']) {
        let form = { secret: process.env.RECAPTCHA_SECRET, response: this.request.body['g-recaptcha-response'] }
        let recaptcha = yield request({ method: 'POST', uri: 'https://www.google.com/recaptcha/api/siteverify', form })
        let message, subscription
        if (JSON.parse(recaptcha).success) {
          if (this.request.body.name && this.request.body.email && this.request.body.message) message = yield controllers.message(this.request.body)
          if (this.request.body.name && this.request.body.email && this.request.body.subscribe) subscription = yield controllers.subscribe(this.request.body)
        }
      }
      this.response.success({ status: 'submitted' })
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  }
}
