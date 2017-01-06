const Paquet = require('paquet'),
  app = new Paquet('es6'),
  path = require('path'),
  pug = require('pug'),
  Promise = require('bluebird'),
  mime = require('mime-types')

require('dotenv').config({silent: true})

app.start({
    port: 5000,
    name: 'merciba',
    public: __dirname + '/public',
    middleware: {
      '/*': function * (next) {
        // middleware placeholder
        this.response.set('Content-Type', mime.lookup(this.request.url))
        this.render = (file, locals) => Promise.resolve(pug.renderFile(path.join(__dirname, 'views', file), locals))
        yield next;
      }
    }
});

require('./routes')(app);
