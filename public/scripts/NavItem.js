'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Text = require('Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavItem = function (_React$Component) {
  _inherits(NavItem, _React$Component);

  function NavItem(props) {
    _classCallCheck(this, NavItem);

    return _possibleConstructorReturn(this, (NavItem.__proto__ || Object.getPrototypeOf(NavItem)).call(this, props));
  }

  _createClass(NavItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var active = null;
      if (this.props.route === '/projects' && this.props.translate === 'NAVBAR.PROJECTS') active = 'active';
      if (this.props.route === '/about' && this.props.translate === 'NAVBAR.ABOUT') active = 'active';
      if (this.props.route === '/contact' && this.props.translate === 'NAVBAR.CONTACT') active = 'active';
      if (this.props.icon && this.props.color) this.setState({
        active: active,
        icon_id: this.props.icon + '-icon',
        icon_url: 'https://s3.amazonaws.com/merciba.com/assets/menu-' + this.props.icon + '-' + this.props.color + '.svg'
      });
    }
  }, {
    key: 'getIcon',
    value: function getIcon() {
      if (this.props.position === "top") return _react2.default.createElement('object', { id: this.state.icon_id, className: 'menu-icon', data: this.state.icon_url, type: 'image/svg+xml' });else if (this.props.position === "bottom") {
        if (this.props.icon) return _react2.default.createElement('i', { className: 'menu-icon ' + this.props.icon, 'aria-hidden': 'true' });else return null;
      } else return null;
    }
  }, {
    key: 'getText',
    value: function getText() {
      if (this.props.translate && this.props.locale) return _react2.default.createElement(_Text2.default, { tag: 'p', locale: this.props.locale, translate: this.props.translate });else return null;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) return null;
      return _react2.default.createElement(
        'li',
        { className: this.state.active },
        _react2.default.createElement(
          'a',
          { href: this.props.url, target: this.props.position === "top" ? "_self" : "_blank" },
          this.getIcon(),
          this.getText()
        )
      );
    }
  }]);

  return NavItem;
}(_react2.default.Component);

exports.default = NavItem;