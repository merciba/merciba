'use strict'

const Promise = require('bluebird'),
      MailChimp = require('mailchimp-api-v3')

try{
  const mailchimp = new MailChimp(process.env.MAILCHIMP_KEY)
}
catch (e) {
  const mailchimp = { post: (obj) => Promise.resolve({}) }
}

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    mailchimp.post({ path: `/lists/${process.env.MAILCHIMP_LIST_ID}/members`, body: { "email_address": options.email, "status": "subscribed" }})
      .then((result) => {
        resolve(result)
      }, reject)
  })
}
