import React from 'react'
import $ from 'jquery'
import Text from '../dist/Text'

class Logo extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      console.log('logo mounted.')
      let windowHeight = $(window).height()
      this.setState({
        style: {
          margin: `${(windowHeight - 585) / 2}px auto`
        }
      })
    }
  }

  render() {
    if (!this.state) return null;
    return (
      <div id="main-logo" style={this.state.style}></div>
    )
  }

}

export default Logo
