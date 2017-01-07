'use strict'

const MailChimp = require('mailchimp').MailChimpAPI,
  Mandrill = require('mandrill-api/mandrill'),
  Promise = require('bluebird')

const mailchimp = new MailChimp(process.env.MAILCHIMP_KEY, { version : '2.0' })
const mandrill = new Mandrill.Mandrill(process.env.MANDRILL_KEY);

module.exports = {
  '/message': function * () {
    try {
      let message = {
          "html": `<p>${this.request.body.message}</p>`,
          "subject": `${this.request.body.name}/Merciba Introduction`,
          "from_email": "hello@merciba.com",
          "from_name": this.request.body.name,
          "to": [{
                  "email": "team@merciba.com",
                  "name": "Merciba Team",
                  "type": "to"
              }],
          "headers": {
              "Reply-To": this.request.body.email
          },
          "tags": [ "contact" ]
      }

      let email = yield sendEmail({ message, async: true })
      this.response.success({ result: email })
    }
    catch (email) {
      this.response.success({ result: email })
    }
  },
  '/subscribe': function * () {
    try {
      let subscription = yield subscribe({ id: process.env.MAILCHIMP_ID, email: { email: this.request.body.email }})
      this.response.success({ result: subscription })
    }
    catch (e) {
      this.response.error(500, e)
    }
  }
}

function subscribe(options) {
  return (callback) => mailchimp.call('lists', 'subscribe', options, callback)
}

function sendEmail(message) {
  return (callback) => mandrill.messages.send(message, callback)
}
