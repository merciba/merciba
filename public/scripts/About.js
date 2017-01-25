'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Text = require('Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_React$Component) {
  _inherits(About, _React$Component);

  function About(props) {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this, props));
  }

  _createClass(About, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof window !== 'undefined') {
        if (window.isMobile()) {
          (0, _jquery2.default)('main').on('scroll', this.handleScroll.bind(this));
          this.handleScroll();
        } else {
          window.addEventListener('scroll', this.handleScroll.bind(this));
          this.handleScroll();
        }
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
      if (typeof window !== 'undefined') {
        var pos = (0, _jquery2.default)(window).scrollTop();
        var page1 = this.stylePage1({ pos: pos, breakpoint: (0, _jquery2.default)(window).height() / 4 });
        var page3 = this.stylePage3({ pos: pos, start: (0, _jquery2.default)(document).height() - (0, _jquery2.default)(window).height() * 1.5 });
        this.setState({
          page1: page1,
          page3: page3
        });
      }
    }
  }, {
    key: 'stylePage1',
    value: function stylePage1(_ref) {
      var pos = _ref.pos,
          breakpoint = _ref.breakpoint;

      if (window.isMobile()) {
        return { opacity: 1 };
      } else {
        if (pos > breakpoint) return { opacity: 0 };else return { opacity: 1 };
      }
    }
  }, {
    key: 'stylePage3',
    value: function stylePage3(_ref2) {
      var pos = _ref2.pos,
          start = _ref2.start;

      if (window.isMobile()) {
        return {
          style: { opacity: 1 },
          img1: this.props.page3.img1,
          img2: this.props.page3.img2,
          img2Style: { opacity: 1 }
        };
      } else {
        if (pos === 0 || pos < start) {
          return {
            style: { opacity: 0 },
            img1: this.props.page3.img1,
            img2: this.props.page3.img2,
            img2Style: { position: 'absolute', top: '40%', opacity: 0 }
          };
        } else {
          return {
            style: { opacity: 1 },
            img1: this.props.page3.img1,
            img2: this.props.page3.img2,
            img2Style: { position: 'absolute', top: '40%', opacity: 1 }
          };
        }
      }
    }
  }, {
    key: 'renderScrollContainer',
    value: function renderScrollContainer() {
      if (typeof window !== 'undefined') return { position: 'absolute' };else return {};
    }
  }, {
    key: 'renderPage1',
    value: function renderPage1() {
      if (typeof window !== 'undefined') {
        var getCards = function getCards() {
          var _this2 = this;

          return this.props.cards.map(function (card, index) {
            return _react2.default.createElement(
              'div',
              { key: 'card-' + index, className: 'about-card', style: { background: 'url(\'' + card.img + '\') no-repeat' } },
              _react2.default.createElement(_Text2.default, { locale: _this2.props.locale, sel: 'about-card-title', translate: card.title }),
              _react2.default.createElement(_Text2.default, { locale: _this2.props.locale, sel: 'about-card-description', translate: card.description })
            );
          });
        };

        if (window.isMobile()) return _react2.default.createElement(
          'div',
          { className: 'about-page-1', ref: 'page1' },
          _react2.default.createElement(
            'div',
            { className: 'about-summary', style: { opacity: 1 } },
            _react2.default.createElement(_Text2.default, { locale: this.props.locale, tag: 'div', sel: 'about-title', translate: this.props.title }),
            _react2.default.createElement(_Text2.default, { locale: this.props.locale, tag: 'div', sel: 'about-description', translate: this.props.description })
          ),
          _react2.default.createElement(
            'div',
            { className: 'about-cards' },
            getCards.call(this)
          )
        );else return _react2.default.createElement(
          'div',
          { className: 'about-page-1', ref: 'page1' },
          _react2.default.createElement(
            'div',
            { className: 'about-cards' },
            getCards.call(this)
          ),
          _react2.default.createElement(
            'div',
            { className: 'about-summary', style: this.state ? this.state.page1 : { opacity: 1 } },
            _react2.default.createElement(_Text2.default, { locale: this.props.locale, tag: 'div', sel: 'about-title', translate: this.props.title }),
            _react2.default.createElement(_Text2.default, { locale: this.props.locale, tag: 'div', sel: 'about-description', translate: this.props.description })
          )
        );
      }
    }
  }, {
    key: 'renderPage2',
    value: function renderPage2() {
      var _this3 = this;

      if (typeof window !== 'undefined') {
        return _react2.default.createElement(
          'div',
          { className: 'about-page-2', ref: 'page2' },
          this.props.cols.map(function (col, index) {
            return _react2.default.createElement(
              'div',
              { key: 'vertical-col-' + index, className: 'about-vertical-col' },
              _react2.default.createElement('img', { className: 'about-vertical-img', src: col.img, onLoad: _this3.imageLoaded.bind(_this3) }),
              _react2.default.createElement(_Text2.default, { locale: _this3.props.locale, sel: 'about-vertical-title', translate: col.title }),
              col.items.map(function (item, index) {
                return _react2.default.createElement(_Text2.default, { key: index, locale: _this3.props.locale, sel: 'about-vertical-text', translate: item });
              })
            );
          })
        );
      }
    }
  }, {
    key: 'renderPage3',
    value: function renderPage3() {
      if (window.isMobile()) return _react2.default.createElement(
        'div',
        { className: 'about-page-3', ref: 'page3' },
        _react2.default.createElement(
          'div',
          { ref: 'fixed' },
          _react2.default.createElement(_Text2.default, { tag: 'div', locale: this.props.locale, sel: 'section-title', translate: this.props.page3.title }),
          _react2.default.createElement(_Text2.default, { tag: 'p', locale: this.props.locale, sel: 'section-description', translate: this.props.page3.description })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('img', {
            src: this.props.page3.img2,
            onLoad: this.imageLoaded.bind(this) })
        )
      );else return _react2.default.createElement(
        'div',
        { className: 'about-page-3', ref: 'page3' },
        _react2.default.createElement(
          'div',
          { className: 'section-scroll right', style: this.renderScrollContainer() },
          _react2.default.createElement('img', {
            style: { position: 'absolute', top: '40%' },
            src: this.props.page3.img1,
            onLoad: this.imageLoaded.bind(this) }),
          _react2.default.createElement('img', {
            style: this.state ? this.state.page3.img2Style : { position: 'absolute', top: '40%', opacity: 0 },
            src: this.props.page3.img2,
            onLoad: this.imageLoaded.bind(this) })
        ),
        _react2.default.createElement(
          'div',
          { className: 'section-fixed left', style: this.state ? this.state.page3.style : this.props.page3.style, ref: 'fixed' },
          _react2.default.createElement(_Text2.default, { tag: 'div', locale: this.props.locale, sel: 'section-title', translate: this.props.page3.title }),
          _react2.default.createElement(_Text2.default, { tag: 'p', locale: this.props.locale, sel: 'section-description', translate: this.props.page3.description })
        )
      );
    }
  }, {
    key: 'imageLoaded',
    value: function imageLoaded() {
      this.props.onImageLoaded(this.refs.gallery);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) return null;
      return _react2.default.createElement(
        'div',
        { id: 'about', ref: 'gallery' },
        this.renderPage1(),
        this.renderPage2(),
        this.renderPage3()
      );
    }
  }]);

  return About;
}(_react2.default.Component);

exports.default = About;