'use strict'

const React = require('react'),
  Promise = require('bluebird'),
  path = require('path')

module.exports = {
  '/': function * () {
    try {
      let html = yield this.render('index.pug', { title: '', route: '/' });

      this.response.success(html)
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  },

  '/projects': function * () {
    try {
      let html = yield this.render('index.pug', { title: 'Projects | ', route: '/projects' });

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

      let html = yield this.render('index.pug', { title: `${title} | `, route: `/project/${this.params.project}` });

      this.response.success(html)
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  },

  '/about': function * () {
    try {
      let html = yield this.render('index.pug', { title: 'About Us | ', route: `/about` });

      this.response.success(html)
    }
    catch (e) {
      this.response.error(500, e.toString())
    }
  },

  '/contact': function * () {
    try {
      let html = yield this.render('index.pug', { title: 'Contact Us | ', route: `/contact` });

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
