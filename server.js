'use strict'

const Paquet = require('paquet'),
  app = new Paquet('es6'),
  path = require('path'),
  pug = require('pug'),
  Promise = require('bluebird'),
  mime = require('mime-types'),
  toobusy = require('toobusy-js')

toobusy.maxLag(1000)
toobusy.interval(250)

require('dotenv').config({silent: true})

app.start({
  port: 5000,
  name: 'merciba',
  public: __dirname + '/public',
  middleware: {
    '/*': function * (next) {
      this.response.set('Content-Type', mime.lookup(this.request.url))
      if (/woff|ttf/.test(this.request.url)) console.log(mime.lookup(this.request.url))
      this.render = (file, locals) => Promise.resolve(pug.renderFile(path.join(__dirname, 'views', file), locals))
      if (toobusy()) this.response.error(503, { mesage: 'Service Unavailable' })
      yield next;
    }
  }
});

require('./routes')(app);
