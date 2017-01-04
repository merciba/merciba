'use strict'

const React = require('react'),
  Promise = require('bluebird'),
  path = require('path'),
  ReactDOMServer = require('react-dom/server'),
  pug = require('pug'),
  App = React.createFactory(require('../components/dist/App').default);

const fs = Promise.promisifyAll(require('fs'))
const render = (file, locals) => {
  return Promise.resolve(pug.renderFile(path.join(__dirname, '..', 'views', file), locals))
}

module.exports = function(app) {

	app.route({
	  get: {
      '/': function * () {
        try {
          let reactHtml = ReactDOMServer.renderToString(App({}));
          let html = yield render('index.pug', { title: '', reactOutput: reactHtml, route: '/' });

          this.response.success(html)
        }
        catch (e) {
          this.response.error(e)
        }
      },

      '/projects': function * () {
        try {
          let reactHtml = ReactDOMServer.renderToString(App({ route: '/projects' }));
          let html = yield render('index.pug', { title: 'Projects | ', reactOutput: reactHtml, route: '/projects' });

          this.response.success(html)
        }
        catch (e) {
          this.response.error(e)
        }
      },

      '/project/:project': function * () {
        try {
          let title = ''
          if (this.params.project === 'perengo') title = 'Perengo'
          if (this.params.project === 'sweet-unity-farms') title = 'Sweet Unity Farms'
          if (this.params.project === 'software') title = 'Open-Source Software'

          let reactHtml = ReactDOMServer.renderToString(App({ route: `/project/${this.params.project}` }));
          let html = yield render('index.pug', { title: `${title} | `, reactOutput: reactHtml, route: `/project/${this.params.project}` });

          this.response.success(html)
        }
        catch (e) {
          this.response.error(e)
        }
      },

      '/about': function * () {
        try {
          let reactHtml = ReactDOMServer.renderToString(App({ route: `/about` }));
          let html = yield render('index.pug', { title: 'About Us | ', reactOutput: reactHtml, route: `/about` });

          this.response.success(html)
        }
        catch (e) {
          this.response.error(e)
        }
      },

      '/contact': function * () {
        try {
          let reactHtml = ReactDOMServer.renderToString(App({ route: `/contact` }));
          let html = yield render('index.pug', { title: 'Contact Us | ', reactOutput: reactHtml, route: `/contact` });

          this.response.success(html)
        }
        catch (e) {
          this.response.error(e)
        }
      },

      '/locales/:lang': function * () {
        try {
          this.response.serveFile(path.join(__dirname, '..', 'i18n', this.params.lang + '.json'));
        }
        catch (e) {
          this.response.error(e)
        }
      }

	  }
	});

};
