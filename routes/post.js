'use strict'

const MailChimp = require('mailchimp').MailChimpAPI,
  Promise = require('bluebird')

const mcInstance = new MailChimp(process.env.MAILCHIMP_KEY, { version : '2.0' })
const mailchimp = Promise.promisifyAll(mcInstance)

module.exports = {
  '/message': function * () {
    try {

    }
    catch (e) {
      this.response.error(e)
    }
  },
  '/subscribe': function * () {
    try {
      let subscription = yield mailchimp.call('lists', 'subscribe', { id: process.env.MAILCHIMP_ID, email: { email: this.request.body.email }})
      console.log("New Subscriber: " + data.email + "\nResults: ", subscription)
      this.response.success({ status: "Success" })
    }
    catch (e) {
      this.response.error(e)
    }
  }
}
