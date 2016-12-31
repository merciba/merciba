import React from 'react'
import $ from 'jquery'
import Text from '../dist/Text'

class Contact extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      console.log('Contact page ready.')
    }
  }

  render() {
    return (
      <div>Contact</div>
    )
  }

}

export default Contact
