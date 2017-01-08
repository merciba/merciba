'use strict'

const Promise = require('bluebird'),
      MailChimp = require('mailchimp-api-v3')

const mailchimp = new MailChimp(process.env.MAILCHIMP_KEY)

module.exports = (options) => {
  console.log(options)
  return new Promise((resolve, reject) => {
    mailchimp.post({ path: `/lists/${process.env.MAILCHIMP_LIST_ID}/members`, body: { "email_address": options.email, "status": "subscribed" }})
      .then((result) => {
        console.log(result)
        resolve(result)
      }, reject)
  })
}
