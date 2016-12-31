import React from 'react'
import $ from 'jquery'
import Text from '../dist/Text'

class About extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      console.log('About page ready.')
    }
  }

  renderCards() {
    if (typeof window !== 'undefined') {
      return this.props.cards.map((card, index) => {
        return <div key={`card-${index}`} className="about-card">
            <Text locale={this.props.locale} sel="about-card-title" translate={card.title} />
            <Text locale={this.props.locale} sel="about-card-description" translate={card.description} />
          </div>
        })
    }
  }

  render() {
    return (
      <div id="about">
        <div className="about-page-1">
          <div className="about-cards">
            {this.renderCards()}
          </div>
          <div className="about-summary">
            <Text locale={this.props.locale} tag="div" sel="about-title" translate={this.props.title} />
            <Text locale={this.props.locale} tag="div" sel="about-description" translate={this.props.description} />
          </div>
        </div>
      </div>
    )
  }

}

export default About
