'use strict'

const Mandrill = require('mandrill-api/mandrill'),
      Promise = require('bluebird')

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    let mandrill = { messages: { send: (payload, cb) => cb(null, {})}}

    try {
      mandrill = new Mandrill.Mandrill(process.env.MANDRILL_KEY);
    }
    catch (e) {
      console.log(`MANDRILL_KEY is not properly set, value is ${process.env.MANDRILL_KEY}`)
    }

    let payload = {
        message: {
          "html": `<p>${options.message}</p>`,
          "subject": `Introduction: ${options.name}`,
          "from_email": "hello@merciba.com",
          "from_name": options.name,
          "to": [{
                  "email": "team@merciba.com",
                  "name": "Merciba Team",
                  "type": "to"
              }],
          "headers": {
              "Reply-To": options.email
          },
          "tags": [ "contact" ]
      },
      async: true
    }

    mandrill.messages.send(payload, (err, result) => {
      console.log(err, result)
      resolve({ err, result })
    })
  })
}
