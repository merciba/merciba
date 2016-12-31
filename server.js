const Paquet = require('paquet')
const app = new Paquet('es6')
const path = require('path')
const Promise = require('bluebird')
const mime = require('mime-types')

app.start({
    port: 5000,
    name: 'merciba',
    public: __dirname + '/public',
    views: __dirname +'/views',
    middleware: {
      '/*': function * (next) {
        // middleware placeholder
        this.response.set('Content-Type', mime.lookup(this.request.url))
        yield next;
      }
    }
});

require('./routes')(app);
