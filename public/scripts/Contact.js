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

var _reactGoogleRecaptcha = require('react-google-recaptcha');

var _reactGoogleRecaptcha2 = _interopRequireDefault(_reactGoogleRecaptcha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Contact = function (_React$Component) {
  _inherits(Contact, _React$Component);

  function Contact(props) {
    _classCallCheck(this, Contact);

    return _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).call(this, props));
  }

  _createClass(Contact, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (typeof window !== 'undefined') {
        this.props.fields.map(function (field) {
          var fields = {};
          if (fields.type === 'checkbox') fields[field.name] = '';else fields[field.name] = '';
          _this2.setState(fields);
        });
        this.setState({ submitted: { display: 'none' }, form: { display: 'block', opacity: 1, visibility: 'visible' } });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
<<<<<<< HEAD
      if (typeof window !== 'undefined') {
        var fields = {};
        fields[event.target.name] = event.target.value || event.target.checked;
        Object.keys(fields).map(function (field) {
          return !fields[field] ? fields[field] = '' : null;
        });
        this.setState(fields);
        this.validate();
=======
      var _this3 = this;

      if (typeof window !== 'undefined') {
        (function () {
          var fields = {};
          fields[event.target.name] = event.target.value || event.target.checked;
          Object.keys(fields).map(function (field) {
            return !fields[field] ? fields[field] = '' : null;
          });
          _this3.setState(fields);
          _this3.validate();
        })();
>>>>>>> a882b0a13f8e251bbe24df5db4d99fa08eb9fa75
      }
    }
  }, {
    key: 'handleCaptcha',
    value: function handleCaptcha(response) {
      this.setState({ 'g-recaptcha-response': response });
      this.validate();
    }
  }, {
    key: 'getFormField',
    value: function getFormField(field) {
      if (field.type === 'textarea') return _react2.default.createElement('textarea', { name: field.name, value: this.state[field.name], onChange: this.handleChange.bind(this) });else if (field.type === 'text') return _react2.default.createElement('input', { name: field.name, type: field.type, value: this.state[field.name], onChange: this.handleChange.bind(this) });else if (field.type === 'checkbox') return _react2.default.createElement('input', { name: field.name, type: field.type, value: this.state[field.name], onChange: this.handleChange.bind(this) });else return null;
    }
  }, {
    key: 'imageLoaded',
    value: function imageLoaded() {
      this.props.onImageLoaded(this.refs.gallery);
    }
  }, {
    key: 'validate',
    value: function validate() {
      var emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.state['g-recaptcha-response'] && emailValid.test(this.state.email) && this.state.name && (this.state.message || this.state.subscribe)) (0, _jquery2.default)(this.refs.submit).removeAttr('disabled');else (0, _jquery2.default)(this.refs.submit).attr('disabled', true);
    }
  }, {
    key: 'submit',
    value: function submit(e) {
<<<<<<< HEAD
      var _this3 = this;
=======
      var _this4 = this;
>>>>>>> a882b0a13f8e251bbe24df5db4d99fa08eb9fa75

      e.preventDefault();
      _jquery2.default.post('/contact', {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
        subscribe: this.state.subscribe,
        'g-recaptcha-response': this.state['g-recaptcha-response']
      }).done(function () {
        console.log('Submitted');
<<<<<<< HEAD
        _this3.setState({ form: { display: 'none' }, submitted: { display: 'block', opacity: 1, visibility: 'visible' } });
=======
        _this4.setState({ form: { display: 'none' }, submitted: { display: 'block', opacity: 1, visibility: 'visible' } });
>>>>>>> a882b0a13f8e251bbe24df5db4d99fa08eb9fa75
      });
    }
  }, {
    key: 'getContactForm',
    value: function getContactForm() {
<<<<<<< HEAD
      var _this4 = this;
=======
      var _this5 = this;
>>>>>>> a882b0a13f8e251bbe24df5db4d99fa08eb9fa75

      return _react2.default.createElement(
        'form',
        { className: 'contact-form', style: this.state.form, onSubmit: this.submit.bind(this) },
        this.props.fields.map(function (field) {
          return _react2.default.createElement(
            'div',
            { key: field.name, onClick: function onClick(e) {
                return field.type === 'checkbox' ? (0, _jquery2.default)(e.target).next().click() : null;
              } },
            _react2.default.createElement(
              'label',
              { htmlFor: field.name },
<<<<<<< HEAD
              _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this4.props.locale, translate: field.text })
            ),
            _this4.getFormField(field)
=======
              _react2.default.createElement(_Text2.default, { tag: 'div', locale: _this5.props.locale, translate: field.text })
            ),
            _this5.getFormField(field)
>>>>>>> a882b0a13f8e251bbe24df5db4d99fa08eb9fa75
          );
        }),
        _react2.default.createElement(_reactGoogleRecaptcha2.default, { ref: 'recaptcha', sitekey: '6LfZ6hAUAAAAAGRWkvMyGA1epGTbA8D1xUuX32xE', onChange: this.handleCaptcha.bind(this) }),
        _react2.default.createElement('input', { type: 'submit', ref: 'submit', disabled: true })
      );
    }
  }, {
    key: 'getSubmittedCard',
    value: function getSubmittedCard() {
      return _react2.default.createElement(
        'div',
        { className: 'contact-submitted', style: this.state.submitted },
        _react2.default.createElement(_Text2.default, { tag: 'div', sel: 'contact-submitted-text', locale: this.props.locale, translate: this.props.submitted.text }),
        _react2.default.createElement('img', { src: this.props.submitted.img, className: 'contact-submitted-image', onLoad: this.imageLoaded.bind(this) })
      );
    }
  }, {
    key: 'renderContactPage',
    value: function renderContactPage() {
      if (window.isMobile()) {
        return _react2.default.createElement(
          'div',
          { id: 'contact' },
          _react2.default.createElement(
            'div',
            { className: 'section-fixed', ref: 'fixed', style: { opacity: 1, marginTop: 144 } },
            _react2.default.createElement(_Text2.default, { tag: 'div', locale: this.props.locale, sel: 'section-title', translate: this.props.title }),
            _react2.default.createElement(_Text2.default, { tag: 'p', locale: this.props.locale, sel: 'section-description', translate: this.props.description })
          ),
          _react2.default.createElement(
            'div',
            { className: 'section-scroll', ref: 'scroll', style: { marginTop: 48 } },
            this.getSubmittedCard(),
            this.getContactForm()
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { id: 'contact' },
          _react2.default.createElement(
            'div',
            { className: 'section-scroll right', ref: 'scroll', style: { marginTop: '10%' } },
            this.getSubmittedCard(),
            this.getContactForm()
          ),
          _react2.default.createElement(
            'div',
            { className: 'section-fixed left', ref: 'fixed', style: { opacity: 1, marginBottom: 0 } },
            _react2.default.createElement(_Text2.default, { tag: 'div', locale: this.props.locale, sel: 'section-title', translate: this.props.title }),
            _react2.default.createElement(_Text2.default, { tag: 'p', locale: this.props.locale, sel: 'section-description', translate: this.props.description })
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) return null;
      return this.renderContactPage();
    }
  }]);

  return Contact;
}(_react2.default.Component);

exports.default = Contact;