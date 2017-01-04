import React from 'react'
import $ from 'jquery'
import Text from '../dist/Text'

class Contact extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      $(this.refs.fixed).css({
        opacity: 1,
        marginTop: $(window).height() / 3
      });
      $(this.refs.scroll).css({
        marginTop: 180,
        marginBottom: 0
      });
    }
  }

  getContactForm() {
    return <form className="contact-form">
      {this.props.fields.map((field) => {
        return <div key={field.name}>
          <label htmlFor={field.name}>
            <Text tag="div" locale={this.props.locale} translate={field.text} />
          </label>
          {field.type === 'textarea' ? <textarea name={field.name}></textarea> : <input name={field.name} type={field.type} />}
        </div>
      })}
      <input type="submit" />
    </form>
  }

  render() {
    return (
      <div id="contact">
        <div className="section-scroll right" ref="scroll">
          {this.getContactForm()}
        </div>
        <div className="section-fixed left" ref="fixed">
          <Text tag="div" locale={this.props.locale} sel="section-title" translate={this.props.title} />
          <Text tag="p" locale={this.props.locale} sel="section-description" translate={this.props.description} />
        </div>
      </div>
    )
  }
}

export default Contact
