import React from 'react'
import $ from 'jquery'
import Text from '../dist/Text'
import ReCAPTCHA from 'react-google-recaptcha'

class Contact extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.props.fields.map((field) => {
        let fields = {}
        if (fields.type === 'checkbox') fields[field.name] = ''
        else fields[field.name] = ''
        this.setState(fields)
      })
      this.setState({ submitted: { display: 'none' }, form: { display: 'block', opacity: 1, visibility: 'visible' }})
    }
  }

  handleChange(event) {
    if (typeof window !== 'undefined') {
      let fields = {}
      fields[event.target.name] = event.target.value || event.target.checked
      Object.keys(fields).map((field) => (!fields[field]) ? fields[field] = '' : null)
      this.setState(fields)
      this.validate()
    }
  }

  handleCaptcha(response) {
    this.setState({ 'g-recaptcha-response': response })
    this.validate()
  }

  getFormField(field) {
    if (field.type === 'textarea') return <textarea name={field.name} value={this.state[field.name]} onChange={this.handleChange.bind(this)}></textarea>
    else if (field.type === 'text') return <input name={field.name} type={field.type} value={this.state[field.name]} onChange={this.handleChange.bind(this)} />
    else if (field.type === 'checkbox') return <input name={field.name} type={field.type} value={this.state[field.name]} onChange={this.handleChange.bind(this)} />
    else return null
  }

  imageLoaded() {
    this.props.onImageLoaded(this.refs.gallery)
  }

  validate() {
    let emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (this.state['g-recaptcha-response'] && emailValid.test(this.state.email) && this.state.name && (this.state.message || this.state.subscribe)) $(this.refs.submit).removeAttr('disabled')
    else $(this.refs.submit).attr('disabled', true)
  }

  submit(e) {
    e.preventDefault()
    $.post('/contact', {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
      subscribe: this.state.subscribe,
      'g-recaptcha-response': this.state['g-recaptcha-response']
    })
      .done(() => {
        console.log('Submitted')
        this.setState({ form: { display: 'none' }, submitted: { display: 'block', opacity: 1, visibility: 'visible' }})
      })
  }

  getContactForm() {
    return <form className="contact-form" style={this.state.form} onSubmit={this.submit.bind(this)}>
      {this.props.fields.map((field) => {
        return <div key={field.name} onClick={(e) => field.type === 'checkbox' ? $(e.target).next().click() : null}>
          <label htmlFor={field.name}>
            <Text tag="div" locale={this.props.locale} translate={field.text} />
          </label>
          {this.getFormField(field)}
        </div>
      })}
      <ReCAPTCHA ref="recaptcha" sitekey="6LfZ6hAUAAAAAGRWkvMyGA1epGTbA8D1xUuX32xE" onChange={this.handleCaptcha.bind(this)} />
      <input type="submit" ref="submit" disabled />
    </form>
  }

  getSubmittedCard() {
    return <div className="contact-submitted" style={this.state.submitted}>
      <Text tag="div" sel="contact-submitted-text" locale={this.props.locale} translate={this.props.submitted.text} />
      <img src={this.props.submitted.img} className="contact-submitted-image" onLoad={this.imageLoaded.bind(this)}/>
    </div>
  }

  renderContactPage() {
    if (window.isMobile()) {
      return <div id="contact">
        <div className="section-fixed" ref="fixed" style={{ opacity: 1, marginTop: 144 }}>
          <Text tag="div" locale={this.props.locale} sel="section-title" translate={this.props.title} />
          <Text tag="p" locale={this.props.locale} sel="section-description" translate={this.props.description} />
        </div>
        <div className="section-scroll" ref="scroll" style={{ marginTop: 48 }}>
          {this.getSubmittedCard()}
          {this.getContactForm()}
        </div>
      </div>
    }
    else {
      return <div id="contact">
        <div className="section-scroll right" ref="scroll" style={{ marginTop: '10%'}}>
          {this.getSubmittedCard()}
          {this.getContactForm()}
        </div>
        <div className="section-fixed left" ref="fixed" style={{ opacity: 1, marginTop: '20%', marginBottom: 0 }}>
          <Text tag="div" locale={this.props.locale} sel="section-title" translate={this.props.title} />
          <Text tag="p" locale={this.props.locale} sel="section-description" translate={this.props.description} />
        </div>
      </div>
    }

  }

  render() {
    if (!this.state) return null;
    return this.renderContactPage()
  }
}

export default Contact
