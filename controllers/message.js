'use strict'

const Mandrill = require('mandrill-api/mandrill'),
      Promise = require('bluebird')

const mandrill = new Mandrill.Mandrill(process.env.MANDRILL_KEY);

module.exports = (options) => {
  console.log(options)
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

  return new Promise((resolve, reject) => {
    mandrill.messages.send(payload, (err, result) => {
      console.log(err, result)
      resolve({ err, result })
    })
  })
}
