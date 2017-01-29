'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Navbar = require('Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Project = require('Project');

var _Project2 = _interopRequireDefault(_Project);

var _About = require('About');

var _About2 = _interopRequireDefault(_About);

var _Contact = require('Contact');

var _Contact2 = _interopRequireDefault(_Contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lang = 'en'; // Force english, remove for production

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      if (!this.state) return null;
      return _react2.default.createElement(
        'main',
        { role: 'main', ref: 'gallery', 'data-enhance': window.isMobile(), style: window.isMobile() ? { height: (0, _jquery2.default)(window).height() } : null },
        _react2.default.createElement('div', { className: 'spinner', style: this.state.loading ? { display: 'block', position: 'fixed' } : { display: 'none' } }),
        _react2.default.createElement(
          'div',
          { className: 'changeOrientation' },
          _react2.default.createElement(
            'div',
            null,
            'Landscape orientation is not supported. Please rotate your device back to portrait mode.'
          )
        ),
        this.getNavbar(),
        this.props.route === "/" ? this.getLanding() : null,
        this.props.route === "/" || /project/i.test(this.props.route) ? this.getProjects() : null,
        this.props.route === "/about" ? this.getAbout() : null,
        this.props.route === "/contact" ? this.getContact() : null
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (typeof window !== 'undefined') {
        (function () {
          var windowHeight = (0, _jquery2.default)(window).height();
          var windowWidth = (0, _jquery2.default)(window).width();
          window.addEventListener('scroll', _this2.handleScroll.bind(_this2));
          getLocale().then(function (locale) {
            if (window.isMobile()) {
              window.onorientationchange = function () {
                if (window.orientation === 0) {
                  (0, _jquery2.default)('nav').hide();
                  _this2.setState({ loading: true });
                  window.location.reload();
                }
              };
              _this2.setState({
                locale: locale,
                loading: true
              });
            } else {
              _this2.setState({
                locale: locale,
                loading: true,
                logo: {
                  margin: (windowHeight - 585) / 2 + 'px ' + windowWidth / 3 + 'px'
                }
              });
              _this2.styleElements();
            }
          });
        })();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof window !== 'undefined') window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      // Scroll handler. Fired on each scroll

    }
  }, {
    key: 'imageLoaded',
    value: function imageLoaded() {
      var loading = !imagesLoaded(this.refs.gallery);
      if (this.state.loading) this.setState({ loading: loading });
      if (!loading) this.loaded();
    }
  }, {
    key: 'loaded',
    value: function loaded() {
      var _this3 = this;

      setTimeout(function () {
        if (window.isMobile()) {
          (0, _jquery2.default)('html, body, #app, main').css('height', (0, _jquery2.default)(window).height());
          (0, _jquery2.default)(_this3.refs.navbar).data('position', 'fixed');
          (0, _jquery2.default)('#main-logo').css({
            margin: ((0, _jquery2.default)(window).height() - (0, _jquery2.default)('#main-logo').height()) / 4 + 'px -7%'
          });
        } else {
          (0, _jquery2.default)('html, body, #app').css('height', (0, _jquery2.default)(document).height());
          (0, _jquery2.default)('footer').show();
          (0, _jquery2.default)('.ui-page-theme-a').removeClass('ui-page-theme-a');
        }
      });
    }
  }, {
    key: 'styleProject',
    value: function styleProject(project) {
      (0, _jquery2.default)(this.refs.projects).find('#' + project).show();
      (0, _jquery2.default)(this.refs.projects).find('#' + project).css("padding-top", 0);
      (0, _jquery2.default)(this.refs.projects).find('#' + project + ' .section-scroll').css("margin-top", "6%");
      (0, _jquery2.default)(this.refs.projects).find('#' + project + ' .section-fixed').css({ "opacity": 1, "visibility": "visible" });
    }
  }, {
    key: 'styleElements',
    value: function styleElements() {
      var position = (0, _jquery2.default)(window).scrollTop();
      var regex = new RegExp('/project/');

      if (regex.test(this.props.route)) {

        (0, _jquery2.default)(this.refs.projects).find('section').hide();

        if (this.props.route === "/project/perengo") this.styleProject("perengo");else if (this.props.route === "/project/sweet-unity-farms") this.styleProject("sweet-unity");else if (this.props.route === "/project/software") this.styleProject("software");else window.location.href = "/";
      } else {
        switch (this.props.route) {
          case "/":
            break;
          case "/projects":
            (0, _jquery2.default)(this.refs.projects).find('section:first-child').css("padding-top", 0);
            (0, _jquery2.default)(this.refs.projects).find('section:first-child .section-scroll').css("margin-top", "6%");
            (0, _jquery2.default)(this.refs.projects).find('section:first-child .section-fixed').css({ "opacity": 1, "visibility": "visible" });
            (0, _jquery2.default)('#nav-items li:not(.active) a p').css('color', '#A2A5A9');
            break;
          case "/about":
            (0, _jquery2.default)('#nav-items li:not(.active) a p').css('color', '#A2A5A9');
            (0, _jquery2.default)('.left').css('#top', '0%');
            (0, _jquery2.default)('.about-page-3 .left').css('opacity', 0);
            break;
          case "/contact":
            (0, _jquery2.default)('#nav-items li:not(.active) a p').css('color', '#A2A5A9');
            break;
          default:
            window.location.href = "/";
            break;
        }
      }
    }
  }, {
    key: 'getNavbar',
    value: function getNavbar() {
      return _react2.default.createElement(_Navbar2.default, {
        route: this.props.route,
        locale: this.state.locale,
        links: [{ url: "/projects", icon: "circle", text: "NAVBAR.PROJECTS" }, { url: "/about", icon: "square", text: "NAVBAR.ABOUT" }, { url: "/contact", icon: "triangle", text: "NAVBAR.CONTACT" }],
        bottomLinks: [{ url: "https://instagram.com/mercibaco", icon: "fa fa-instagram" }, { url: "https://twitter.com/mercibaco", icon: "fa fa-twitter" }],
        blog: { url: "https://medium.com/merciba", text: "NAVBAR.BLOG" },
        onImageLoaded: this.imageLoaded.bind(this),
        ref: 'navbar' });
    }
  }, {
    key: 'getLanding',
    value: function getLanding() {
      if (this.props.route === "/") {
        return _react2.default.createElement(
          'article',
          { className: 'container logo-container', ref: 'logo' },
          _react2.default.createElement('img', { id: 'main-logo', src: 'https://s3.amazonaws.com/merciba.com/assets/merciba-logo.png', style: this.state.logo, onLoad: this.imageLoaded.bind(this) })
        );
      } else return null;
    }
  }, {
    key: 'getProjects',
    value: function getProjects() {
      var regex = new RegExp('/project/');

      if (this.props.route === "/projects" || this.props.route === "/" || regex.test(this.props.route)) {
        return _react2.default.createElement(
          'article',
          { className: 'container projects-container', ref: 'projects' },
          _react2.default.createElement(_Project2.default, {
            ref: 'perengo',
            name: 'perengo',
            url: 'https://perengo.com',
            route: this.props.route,
            scrollSide: 'section-scroll left',
            fixedSide: 'section-fixed right',
            imageStyle: { maxWidth: "400px" },
            title: 'MAIN.PROJECTS.PERENGO.TITLE',
            description: 'MAIN.PROJECTS.PERENGO.DESCRIPTION',
            tags: ["MAIN.TAGS.PRD_DESIGN", "MAIN.TAGS.FE_DEV", "MAIN.TAGS.BE_DEV"],
            images: ["https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-1.png", "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-2.png", "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-3.png", "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-4.png", "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-5.png", "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-6.png"],
            locale: this.state.locale,
            onImageLoaded: this.imageLoaded.bind(this) }),
          _react2.default.createElement(_Project2.default, {
            ref: 'sweetUnity',
            name: 'sweet-unity',
            url: 'https://sweetunityfarmscoffee.com',
            route: this.props.route,
            scrollSide: 'section-scroll right',
            fixedSide: 'section-fixed left',
            imageStyle: { maxWidth: "100%" },
            title: 'MAIN.PROJECTS.SWEET_UNITY.TITLE',
            description: 'MAIN.PROJECTS.SWEET_UNITY.DESCRIPTION',
            tags: ["MAIN.TAGS.UI_DESIGN", "MAIN.TAGS.FE_DEV", "MAIN.TAGS.E_COMM"],
            images: ["https://s3.amazonaws.com/merciba.com/assets/projects/sweet_unity/sweetunity-1.jpg"],
            locale: this.state.locale,
            onImageLoaded: this.imageLoaded.bind(this) }),
          _react2.default.createElement(_Project2.default, {
            ref: 'software',
            name: 'software',
            url: 'https://github.com/merciba',
            route: this.props.route,
            scrollSide: 'section-scroll left',
            fixedSide: 'section-fixed right',
            title: 'MAIN.PROJECTS.SOFTWARE.TITLE',
            description: 'MAIN.PROJECTS.SOFTWARE.DESCRIPTION',
            cards: [{ title: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_1.TITLE", description: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_1.DESCRIPTION", imageUrl: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/softwarebkg-1.png", link: { text: "MAIN.PROJECTS.SOFTWARE.LINK_TEXT", href: "https://github.com/merciba/paquet" } }, { title: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_2.TITLE", description: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_2.DESCRIPTION", imageUrl: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/softwarebkg-2.jpg", link: { text: "MAIN.PROJECTS.SOFTWARE.LINK_TEXT", href: "https://github.com/alfonsogoberjr/knearest" } }, { title: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_3.TITLE", description: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_3.DESCRIPTION", imageUrl: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/softwarebkg-3.jpg", link: { text: "MAIN.PROJECTS.SOFTWARE.LINK_TEXT", href: "https://github.com/merciba/ascii-mirror" } }, { title: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_4.TITLE", description: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_4.DESCRIPTION", imageUrl: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/softwarebkg-4.jpg", link: { text: "MAIN.PROJECTS.SOFTWARE.LINK_TEXT", href: "https://github.com/merciba/orequire" } }],
            icons: [{ img: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/Npm-logo.svg.png", href: "https://www.npmjs.com/~merciba" }, { img: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/nodejs_logo.png", href: "https://nodejs.org" }, { img: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/GitHub-Mark-120px-plus.png", href: "https://github.com/merciba" }],
            tags: ["MAIN.TAGS.DEV"],
            locale: this.state.locale,
            onImageLoaded: this.imageLoaded.bind(this) })
        );
      } else return null;
    }
  }, {
    key: 'getAbout',
    value: function getAbout() {
      if (this.props.route === "/about") {
        return _react2.default.createElement(
          'article',
          { className: 'about', ref: 'about' },
          _react2.default.createElement(_About2.default, {
            cards: [{ title: "ABOUT.PAGE_1.CARDS.CARD_1.TITLE", description: "ABOUT.PAGE_1.CARDS.CARD_1.DESCRIPTION", img: window.isMobile() ? "https://s3.amazonaws.com/merciba.com/assets/about/mobile-processbkg-iterative.jpg" : "https://s3.amazonaws.com/merciba.com/assets/about/desktop-processbkg-iterative.jpg" }, { title: "ABOUT.PAGE_1.CARDS.CARD_2.TITLE", description: "ABOUT.PAGE_1.CARDS.CARD_2.DESCRIPTION", img: window.isMobile() ? "https://s3.amazonaws.com/merciba.com/assets/about/mobile-processbkg-collaborative.jpg" : "https://s3.amazonaws.com/merciba.com/assets/about/desktop-processbkg-collaborative.jpg" }, { title: "ABOUT.PAGE_1.CARDS.CARD_3.TITLE", description: "ABOUT.PAGE_1.CARDS.CARD_3.DESCRIPTION", img: window.isMobile() ? "https://s3.amazonaws.com/merciba.com/assets/about/mobile-processbkg-flex.jpg" : "https://s3.amazonaws.com/merciba.com/assets/about/desktop-processbkg-flex.jpg" }],
            title: 'ABOUT.PAGE_1.TITLE',
            description: 'ABOUT.PAGE_1.DESCRIPTION',
            cols: [{
              img: "https://s3.amazonaws.com/merciba.com/assets/about/about-design.gif",
              title: "ABOUT.PAGE_2.LEFT.TITLE",
              items: ["ABOUT.PAGE_2.LEFT.DESCRIPTION.BRANDING_ID", "ABOUT.PAGE_2.LEFT.DESCRIPTION.WIREFRAMING", "ABOUT.PAGE_2.LEFT.DESCRIPTION.UI_DSGN", "ABOUT.PAGE_2.LEFT.DESCRIPTION.PRD_DSGN", "ABOUT.PAGE_2.LEFT.DESCRIPTION.CPGN_CREATIVE", "ABOUT.PAGE_2.LEFT.DESCRIPTION.ART_DIR", "ABOUT.PAGE_2.LEFT.DESCRIPTION.BRANDED_DIGITAL"]
            }, {
              img: "https://s3.amazonaws.com/merciba.com/assets/about/about-tech.gif",
              title: "ABOUT.PAGE_2.MIDDLE.TITLE",
              items: ["ABOUT.PAGE_2.MIDDLE.DESCRIPTION.HTML_CSS", "ABOUT.PAGE_2.MIDDLE.DESCRIPTION.JS_NODE", "ABOUT.PAGE_2.MIDDLE.DESCRIPTION.NATIVE", "ABOUT.PAGE_2.MIDDLE.DESCRIPTION.SERVER_SIDE_ENG", "ABOUT.PAGE_2.MIDDLE.DESCRIPTION.CMS_PLATFORM", "ABOUT.PAGE_2.MIDDLE.DESCRIPTION.SEO", "ABOUT.PAGE_2.MIDDLE.DESCRIPTION.TRNG_CONSULT"]
            }, {
              img: "https://s3.amazonaws.com/merciba.com/assets/about/about-strategy.gif",
              title: "ABOUT.PAGE_2.RIGHT.TITLE",
              items: ["ABOUT.PAGE_2.RIGHT.DESCRIPTION.MKTG_STRATEGY", "ABOUT.PAGE_2.RIGHT.DESCRIPTION.SM_STRATEGY", "ABOUT.PAGE_2.RIGHT.DESCRIPTION.PM", "ABOUT.PAGE_2.RIGHT.DESCRIPTION.USR_ANALYTICS", "ABOUT.PAGE_2.RIGHT.DESCRIPTION.USR_PERSONA", "ABOUT.PAGE_2.RIGHT.DESCRIPTION.BRAND_STRATEGY", "ABOUT.PAGE_2.RIGHT.DESCRIPTION.IN_HOUSE_TRNG"]
            }],
            page3: {
              title: "ABOUT.PAGE_3.TITLE",
              description: "ABOUT.PAGE_3.DESCRIPTION",
              img1: "https://s3.amazonaws.com/merciba.com/assets/about/about-image-1.png",
              img2: "https://s3.amazonaws.com/merciba.com/assets/about/about-image-2.png",
              style: { top: '20%', opacity: 0 }
            },
            locale: this.state.locale,
            onImageLoaded: this.imageLoaded.bind(this) })
        );
      } else return null;
    }
  }, {
    key: 'getContact',
    value: function getContact() {
      if (this.props.route === "/contact" || this.props.route === "/contacted") {
        return _react2.default.createElement(
          'article',
          { className: 'contact', ref: 'contact' },
          _react2.default.createElement(_Contact2.default, {
            fields: [{ text: "CONTACT.FORM.NAME", type: "text", name: "name" }, { text: "CONTACT.FORM.EMAIL", type: "text", name: "email" }, { text: "CONTACT.FORM.MESSAGE", type: "textarea", name: "message" }, { text: "CONTACT.FORM.SUBSCRIBE", type: "checkbox", name: "subscribe" }],
            title: 'CONTACT.TITLE',
            description: 'CONTACT.DESCRIPTION',
            locale: this.state.locale,
            route: this.props.route,
            submitted: { img: "https://s3.amazonaws.com/merciba.com/assets/contact/formbkg-confirm.jpg", text: "CONTACT.SUBMITTED" },
            onImageLoaded: this.imageLoaded.bind(this)
          })
        );
      } else return null;
    }
  }]);

  return App;
}(_react2.default.Component);

function imagesLoaded(parentNode) {
  var imgElements = (0, _jquery2.default)(parentNode).find('img');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = imgElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var img = _step.value;

      if (!img.complete) return false;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
}

function getLocale() {
  return new _bluebird2.default(function (resolve, reject) {
    if (typeof window !== 'undefined') {
      if (!lang) lang = window.navigator.language[0] + window.navigator.language[1];
      require('es6-promise').polyfill();
      var isoFetch = require('isomorphic-fetch');

      fetch('/locales/' + lang).then(function (res) {
        if (res.status === 200) return res.json();else return fetch('/locales/en').then(function (r) {
          return r.json();
        });
      }).then(function (res) {
        resolve(res);
      });
    } else {
      (function () {
        var osLocale = require('os-locale');
        var path = require('path');
        var locale = void 0;
        osLocale().then(function (res) {
          lang = res[0] + res[1];
          try {
            locale = require(path.join(__dirname, '..', 'i18n', lang + '.json'));
          } catch (e) {
            locale = require(path.join(__dirname, '..', 'i18n', 'en.json'));
          }
          resolve(locale);
        });
      })();
    }
  });
}

exports.default = App;