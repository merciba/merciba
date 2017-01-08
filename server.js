'use strict'

const Paquet = require('paquet'),
  app = new Paquet('es6'),
  path = require('path'),
  pug = require('pug'),
  Promise = require('bluebird'),
  mime = require('mime-types'),
  request = require('request-promise'),
  orequire = require('orequire')

require('dotenv').config({silent: true})

const controllers = orequire('./controllers')

app.start({
    port: 5000,
    name: 'merciba',
    public: __dirname + '/public',
    middleware: {
      '/*': function * (next) {
        // middleware placeholder
        this.response.set('Content-Type', mime.lookup(this.request.url))
        this.render = (file, locals) => Promise.resolve(pug.renderFile(path.join(__dirname, 'views', file), locals))
        if (this.request.query && this.request.query['g-recaptcha-response']) {
          let form = { secret: process.env.RECAPTCHA_SECRET, response: this.request.query['g-recaptcha-response'] }
          let recaptcha = yield request({ method: 'POST', uri: 'https://www.google.com/recaptcha/api/siteverify', form })
          let message, subscription
          if (JSON.parse(recaptcha).success) {
            if (this.request.query.name && this.request.query.email && this.request.query.message) message = yield controllers.message(this.request.query)
            if (this.request.query.name && this.request.query.email && (this.request.subscribe === 'true')) subscription = yield controllers.subscribe(this.request.query)
          }
          this.response.redirect('/contacted')
        }
        else yield next;
      }
    }
});

require('./routes')(app);
