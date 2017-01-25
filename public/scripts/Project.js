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

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Project = function (_React$Component) {
  _inherits(Project, _React$Component);

  function Project(props) {
    _classCallCheck(this, Project);

    return _possibleConstructorReturn(this, (Project.__proto__ || Object.getPrototypeOf(Project)).call(this, props));
  }

  _createClass(Project, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof window !== 'undefined') {
        if (window.isMobile()) {
          (0, _jquery2.default)('main').on('scroll', this.handleScroll.bind(this));
          this.handleScroll();
        } else {
          window.addEventListener('scroll', this.handleScroll.bind(this));
          this.handleScroll();
          if (this.props.route === "/") {
            if ((0, _jquery2.default)(window).scrollTop() === 0) (0, _jquery2.default)('main a').hide();else (0, _jquery2.default)('main a').show();
          } else {
            var routePaths = this.props.route.split('/');
            (0, _jquery2.default)('.projects-container > section:first-child').css({
              marginTop: 26,
              paddingTop: 0
            });
            (0, _jquery2.default)('.projects-container > section:first-child div.section-scroll').css("margin", 0);
          }
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
        var top = (0, _jquery2.default)(window).height(),
            style = this.calculateStyle({ pos: (0, _jquery2.default)(window).scrollTop(), viewportHeight: (0, _jquery2.default)(window).height() });

        this.setState({
          style: style
        });
      }
    }
  }, {
    key: 'calculateStyle',
    value: function calculateStyle(opts) {
      if (window.isMobile()) {
        return { visibility: 'visible', opacity: 1, width: '100%' };
      } else {
        var scrollSide = (0, _jquery2.default)('#' + this.props.name + ' .section-scroll');
        var offset = scrollSide.offset();
        var top = opts.viewportHeight / 6;
        var breakpoints = {};
        if (scrollSide && offset && offset.top) {
          breakpoints.begin = offset.top - 250;
          breakpoints.end = offset.top + scrollSide.height() - opts.viewportHeight / 2;
          if (opts.pos > breakpoints.begin) {
            if (opts.pos > breakpoints.begin && opts.pos < breakpoints.end) return { visibility: 'visible', opacity: 1, top: top };else return { visibility: 'hidden', opacity: 0, top: top };
          } else return { visibility: 'hidden', opacity: 0, top: top };
        } else return { visibility: 'hidden', opacity: 0, top: top };
      }
    }
  }, {
    key: 'imageLoaded',
    value: function imageLoaded() {
      this.props.onImageLoaded(this.refs.gallery);
    }
  }, {
    key: 'getScrollSide',
    value: function getScrollSide() {
      var _this2 = this;

      if (typeof window !== 'undefined') {
        if (this.props.cards && this.props.cards.length) {
          return this.props.cards.map(function (card, index) {
            return _react2.default.createElement(
              'div',
              { key: 'card-' + index, className: 'card' },
              _react2.default.createElement('img', { src: card.imageUrl, onLoad: _this2.imageLoaded.bind(_this2) }),
              _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this2.props.locale, sel: 'card-title', translate: card.title }),
              _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this2.props.locale, sel: 'card-description', translate: card.description }),
              _react2.default.createElement(
                'a',
                { href: card.link.href, target: '_blank' },
                _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this2.props.locale, sel: 'card-link', target: '_blank', translate: card.link.text })
              )
            );
          });
        }
        if (this.props.images && this.props.images.length) {
          return this.props.images.map(function (url, index) {
            return _react2.default.createElement('img', {
              style: _this2.props.imageStyle ? _this2.props.imageStyle : {},
              key: _this2.props.name + '-' + index,
              src: url,
              onLoad: _this2.imageLoaded.bind(_this2) });
          });
        }
      }
    }
  }, {
    key: 'getSlideShow',
    value: function getSlideShow() {
      var _this3 = this;

      if (typeof window !== 'undefined') {
        if (this.props.cards && this.props.cards.length) {
          return this.props.cards.map(function (card, index) {
            return _react2.default.createElement(
              'div',
              { key: 'card-' + index, className: 'card' },
              _react2.default.createElement('img', { src: card.imageUrl, onLoad: _this3.imageLoaded.bind(_this3) }),
              _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this3.props.locale, sel: 'card-title', translate: card.title }),
              _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this3.props.locale, sel: 'card-description', translate: card.description }),
              _react2.default.createElement(
                'a',
                { href: card.link.href, target: '_blank' },
                _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this3.props.locale, sel: 'card-link', target: '_blank', translate: card.link.text })
              )
            );
          });
        }
        if (this.props.images && this.props.images.length) {
          var settings = {
            dots: true,
            speed: 500,
            slidesToShow: 1,
            arrows: false,
            adaptiveHeight: true,
            centerMode: true,
            centerPadding: '5%'
          };
          return _react2.default.createElement(
            _reactSlick2.default,
            settings,
            this.props.images.map(function (url, index) {
              return _react2.default.createElement(
                'div',
                { key: _this3.props.name + '-' + index, className: 'slide' },
                _react2.default.createElement('img', {
                  src: url,
                  onLoad: _this3.imageLoaded.bind(_this3) })
              );
            })
          );
        } else return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (!this.state) return null;
      if (window.isMobile()) return _react2.default.createElement(
        'section',
        { id: this.props.name },
        _react2.default.createElement(
          'div',
          { style: this.state.style, ref: 'fixed' },
          _react2.default.createElement(
            'a',
            { href: this.props.url, target: '_blank' },
            _react2.default.createElement(_Text2.default, { tag: 'div', locale: this.props.locale, sel: 'section-title', translate: this.props.title })
          ),
          _react2.default.createElement(_Text2.default, { tag: 'p', locale: this.props.locale, sel: 'section-description', translate: this.props.description }),
          _react2.default.createElement(
            'div',
            { className: 'section-tags' },
            this.props.tags.map(function (tag) {
              return _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this4.props.locale, key: tag, translate: tag });
            })
          ),
          this.props.icons ? this.props.icons.map(function (icon, index) {
            return _react2.default.createElement(
              'a',
              { href: icon.href, target: '_blank', style: _this4.state.links, key: 'link-' + index },
              _react2.default.createElement('img', { className: 'software-logo', height: '50', key: 'icon-' + index, src: icon.img, onLoad: _this4.imageLoaded.bind(_this4) })
            );
          }) : _react2.default.createElement('span', null)
        ),
        _react2.default.createElement(
          'div',
          { ref: 'gallery' },
          this.getSlideShow()
        )
      );else return _react2.default.createElement(
        'section',
        { id: this.props.name },
        _react2.default.createElement(
          'div',
          { className: this.props.scrollSide, ref: 'gallery' },
          this.getScrollSide()
        ),
        _react2.default.createElement(
          'div',
          { className: this.props.fixedSide, style: this.state.style, ref: 'fixed' },
          _react2.default.createElement(
            'a',
            { href: this.props.url, target: '_blank' },
            _react2.default.createElement(_Text2.default, { tag: 'div', locale: this.props.locale, sel: 'section-title', translate: this.props.title })
          ),
          _react2.default.createElement(_Text2.default, { tag: 'p', locale: this.props.locale, sel: 'section-description', translate: this.props.description }),
          _react2.default.createElement(
            'div',
            { className: 'section-tags' },
            this.props.tags.map(function (tag) {
              return _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this4.props.locale, key: tag, translate: tag });
            })
          ),
          this.props.icons ? this.props.icons.map(function (icon, index) {
            return _react2.default.createElement(
              'a',
              { href: icon.href, target: '_blank', style: _this4.state.links, key: 'link-' + index },
              _react2.default.createElement('img', { className: 'software-logo', height: '50', key: 'icon-' + index, src: icon.img, onLoad: _this4.imageLoaded.bind(_this4) })
            );
          }) : _react2.default.createElement('span', null)
        )
      );
    }
  }]);

  return Project;
}(_react2.default.Component);

Project.propTypes = {
  onImageLoaded: _react2.default.PropTypes.func
};

exports.default = Project;