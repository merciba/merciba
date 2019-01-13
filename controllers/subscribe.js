'use strict'

const Promise = require('bluebird'),
      MailChimp = require('mailchimp-api-v3')

module.exports = (options) => {
  return new Promise((resolve, reject) => {

    let mailchimp = { post: (obj) => Promise.resolve({}) }
    try{
      mailchimp = new MailChimp(process.env.MAILCHIMP_KEY)
    }
    catch (e) {
      console.log(`MAILCHIMP_KEY is not properly set, value is ${process.env.MAILCHIMP_KEY}`)
    }

    mailchimp.post({ path: `/lists/${process.env.MAILCHIMP_LIST_ID}/members`, body: { "email_address": options.email, "status": "subscribed" }})
      .then((result) => {
        resolve(result)
      }, resolve)
  })
}
