'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _NavItem = require('NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

var _Text = require('Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));
  }

  _createClass(Navbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof window !== 'undefined') {
        if (window.isMobile()) {
          this.setState({
            logo_style: {
              top: this.props.route === "/" ? -52 : 10
            },
            scroll: (0, _jquery2.default)('main').scrollTop(),
            style: {
              top: (0, _jquery2.default)(window).height() - 48
            },
            bottom_style: {
              bottom: (0, _jquery2.default)(window).height() - 85,
              background: 'white'
            }
          });
          (0, _jquery2.default)('main').on('scroll', this.handleScroll.bind(this));
          this.handleScroll();
        } else {
          this.open();
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
        if (window.isMobile()) {
          this.styleMobile();
        } else {
          this.styleDesktop();
        }
      }
    }
  }, {
    key: 'styleMobile',
    value: function styleMobile() {
      var scrolledFromTop = (0, _jquery2.default)('main').scrollTop();
      var windowHeight = (0, _jquery2.default)(window).height();
      var bottomOfLinks = windowHeight - 85;
      var topOfItems = windowHeight - 48;
      var top = topOfItems - scrolledFromTop;

      if (scrolledFromTop < bottomOfLinks) {
        this.setState({
          logo_style: {
            top: scrolledFromTop < bottomOfLinks - 150 && this.props.route === "/" ? -52 : 10
          },
          style: {
            top: top > 79 && this.props.route === "/" ? top : 79,
            boxShadow: this.props.route === "/" ? 'none' : '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)'
          },
          bottom_style: {
            bottom: bottomOfLinks,
            background: 'white'
          }
        });
      } else if (scrolledFromTop < windowHeight) {
        if (scrolledFromTop < this.state.scroll) this.showMobileNav(windowHeight);else {
          this.setState({
            logo_style: {
              top: this.props.route === "/" ? -52 : 10
            },
            style: {
              top: windowHeight - scrolledFromTop,
              boxShadow: '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)'
            },
            bottom_style: {
              bottom: windowHeight - (windowHeight - scrolledFromTop),
              background: 'white'
            }
          });
        }
      } else {
        this.setState({
          logo_style: {
            top: -52
          },
          style: {
            top: 0,
            boxShadow: '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)'
          },
          bottom_style: {
            bottom: windowHeight,
            background: 'white'
          }
        });
        if (scrolledFromTop < this.state.scroll) this.showMobileNav(windowHeight);
      }
      this.setState({
        scroll: scrolledFromTop
      });
    }
  }, {
    key: 'styleDesktop',
    value: function styleDesktop() {
      var scrolledFromTop = (0, _jquery2.default)(window).scrollTop();
      var windowHeight = (0, _jquery2.default)(window).height() - 200;
      var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) / 2;
      var factor = 120 / windowHeight;
      var converted = scrolledFromTop * factor;
      var logoDescended = -120 + converted < 0 ? -120 + converted : 0;
      var ulTopDescended = converted + 50 < 200 ? converted + 50 : 200;
      var ulBottomAscended = 65;

      var logo_style = {
        opacity: this.state && this.state.class === "closed" ? 0 : 1,
        top: this.props.route === "/" ? logoDescended + 'px' : 0,
        cursor: 'pointer'
      };
      var bw_logo_style = {
        opacity: this.state && this.state.class === "closed" ? 1 : 0,
        top: this.props.route === "/" ? logoDescended + 'px' : 0,
        cursor: 'pointer'
      };
      var top_style = {
        marginTop: this.props.route === "/" ? ulTopDescended + 'px' : 200
      };
      var bottom_style = {
        bottom: this.props.route === "/" ? ulBottomAscended + 'px' : 65
      };
      var style = {
        left: this.state && this.state.style.left ? this.state.style.left : -200,
        boxShadow: scrolledFromTop < (0, _jquery2.default)(document).height() - (0, _jquery2.default)(window).height() - 80 && scrolledFromTop > windowHeight * 2 && this.state.class === 'open' ? '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)' : 'none',
        background: scrolledFromTop < (0, _jquery2.default)(document).height() - (0, _jquery2.default)(window).height() - 80 && scrolledFromTop > windowHeight * 2 && this.state.class === 'open' ? 'white' : 'transparent'
      };

      this.setState({
        logo_style: logo_style,
        bw_logo_style: bw_logo_style,
        top_style: top_style,
        bottom_style: bottom_style,
        style: style
      });
      if (scrolledFromTop > windowHeight - 200) this.close();else this.open();
    }
  }, {
    key: 'scrollToTop',
    value: function scrollToTop() {
      if (this.props.route !== "/") window.location.href = "/";else (0, _jquery2.default)("html, body, main").animate({
        scrollTop: 0
      }, 500);
    }
  }, {
    key: 'showMobileNav',
    value: function showMobileNav(windowHeight) {
      var logo_style = {
        top: 10
      };
      var style = {
        top: 85,
        boxShadow: '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)'
      };
      var bottom_style = {
        bottom: windowHeight - 85,
        background: 'white'
      };
      this.setState({
        logo_style: logo_style,
        bottom_style: bottom_style,
        style: style
      });
    }
  }, {
    key: 'open',
    value: function open() {
      if (window.isMobile()) return;else {
        var scrolledFromTop = (0, _jquery2.default)(window).scrollTop();
        var windowHeight = (0, _jquery2.default)(window).height();
        var logo_style = {
          opacity: 1,
          top: this.props.route === "/" ? (0, _jquery2.default)('.nav-logo').css('top') : 0,
          cursor: 'pointer'
        };
        var bw_logo_style = {
          opacity: 0,
          top: this.props.route === "/" ? (0, _jquery2.default)('.nav-logo').css('top') : 0,
          cursor: 'pointer'
        };
        this.setState({
          logo_style: logo_style,
          bw_logo_style: bw_logo_style,
          class: 'open',
          style: {
            left: '0px',
            boxShadow: scrolledFromTop > windowHeight * 2 ? '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)' : 'none',
            background: scrolledFromTop > windowHeight * 2 ? 'white' : 'transparent'
          }
        });
      }
    }
  }, {
    key: 'close',
    value: function close() {
      if (window.isMobile()) return;else {
        var scrolledFromTop = (0, _jquery2.default)(window).scrollTop();
        var windowHeight = (0, _jquery2.default)(window).height();
        var logo_style = {
          opacity: 0,
          top: this.props.route === "/" ? (0, _jquery2.default)('.nav-logo').css('top') : 0,
          cursor: 'pointer'
        };
        var bw_logo_style = {
          opacity: 1,
          top: this.props.route === "/" ? (0, _jquery2.default)('.nav-logo').css('top') : 0,
          cursor: 'pointer'
        };
        if (scrolledFromTop > windowHeight - 200) this.setState({
          logo_style: logo_style,
          bw_logo_style: bw_logo_style,
          class: 'closed',
          style: {
            left: '-200px',
            boxShadow: 'none',
            background: 'transparent'
          }
        });
      }
    }
  }, {
    key: 'getTopLinks',
    value: function getTopLinks() {
      var _this2 = this;

      return this.props.links.map(function (link, index) {
        return _react2.default.createElement(_NavItem2.default, { key: 'nav-item-' + index, url: link.url, icon: link.icon, color: 'blk', locale: _this2.props.locale, translate: link.text, route: _this2.props.route, position: 'top' });
      });
    }
  }, {
    key: 'getBottomLinks',
    value: function getBottomLinks() {
      var _this3 = this;

      return this.props.bottomLinks.map(function (link, index) {
        if (link.icon) return _react2.default.createElement(_NavItem2.default, { key: 'nav-link-' + index, url: link.url, icon: link.icon, color: 'blk', locale: _this3.props.locale, position: 'bottom' });else return _react2.default.createElement(_NavItem2.default, { key: 'nav-link-' + index, url: link.url, color: 'blk', locale: _this3.props.locale, translate: link.text, position: 'bottom' });
      });
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
        'nav',
        { className: this.state.class, style: this.state.style, onMouseEnter: this.open.bind(this), onMouseLeave: this.close.bind(this), onMouseMove: this.open.bind(this) },
        _react2.default.createElement('img', { src: 'https://s3.amazonaws.com/merciba.com/assets/mercibalogo-sm.svg', className: 'nav-logo color-logo', style: this.state.logo_style, onClick: this.scrollToTop.bind(this), onTouchStart: this.scrollToTop.bind(this), onLoad: this.imageLoaded.bind(this) }),
        _react2.default.createElement('img', { src: 'https://s3.amazonaws.com/merciba.com/assets/mercibalogo-sm-bw.svg', className: 'nav-logo', style: this.state.bw_logo_style, onClick: this.scrollToTop.bind(this), onLoad: this.imageLoaded.bind(this) }),
        _react2.default.createElement(
          'ul',
          { id: 'nav-items', style: this.state.top_style, ref: 'top' },
          this.getTopLinks()
        ),
        _react2.default.createElement(
          'ul',
          { id: 'nav-links', style: this.state.bottom_style, ref: 'bottom' },
          this.getBottomLinks(),
          _react2.default.createElement(
            'li',
            { id: 'blog-link' },
            _react2.default.createElement(
              'a',
              { href: this.props.blog.url, target: '_blank' },
              _react2.default.createElement(_Text2.default, { tag: 'div', locale: this.props.locale, translate: this.props.blog.text })
            )
          )
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;