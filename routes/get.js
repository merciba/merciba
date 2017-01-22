'use strict'

const React = require('react'),
  Promise = require('bluebird'),
  path = require('path'),
  ReactDOMServer = require('react-dom/server'),
  App = React.createFactory(require('../components/dist/App').default);

module.exports = {
  '/': function * () {
    try {
      let reactHtml = ReactDOMServer.renderToString(App({}));
      let html = yield this.render('index.pug', { title: '', reactOutput: reactHtml, route: '/' });

      this.response.success(html)
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  },

  '/projects': function * () {
    try {
      let reactHtml = ReactDOMServer.renderToString(App({ route: '/projects' }));
      let html = yield this.render('index.pug', { title: 'Projects | ', reactOutput: reactHtml, route: '/projects' });

      this.response.success(html)
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  },

  '/project/:project': function * () {
    try {
      let title = ''
      if (this.params.project === 'perengo') title = 'Perengo'
      if (this.params.project === 'sweet-unity-farms') title = 'Sweet Unity Farms'
      if (this.params.project === 'software') title = 'Open-Source Software'

      let reactHtml = ReactDOMServer.renderToString(App({ route: `/project/${this.params.project}` }));
      let html = yield this.render('index.pug', { title: `${title} | `, reactOutput: reactHtml, route: `/project/${this.params.project}` });

      this.response.success(html)
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  },

  '/about': function * () {
    try {
      let reactHtml = ReactDOMServer.renderToString(App({ route: `/about` }));
      let html = yield this.render('index.pug', { title: 'About Us | ', reactOutput: reactHtml, route: `/about` });

      this.response.success(html)
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  },

  '/contact': function * () {
    try {
      let reactHtml = ReactDOMServer.renderToString(App({ route: `/contact` }));
      let html = yield this.render('index.pug', { title: 'Contact Us | ', reactOutput: reactHtml, route: `/contact` });

      this.response.success(html)
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  },

  '/locales/:lang': function * () {
    try {
      this.response.serveFile(path.join(__dirname, '..', 'i18n', this.params.lang + '.json'));
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  }
}
