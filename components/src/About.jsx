import React from 'react'
import $ from 'jquery'
import Text from '../dist/Text'

class About extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll.bind(this));
      this.handleScroll()
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    if (typeof window !== 'undefined') {
      let pos = $(window).scrollTop()
      let page1 = this.renderPage1({ pos, breakpoint: $(window).height() / 4 })
      let page3 = this.renderPage3({ pos, start: $(document).height() - ($(window).height() * 1.5) })
      this.setState({
        page1,
        page3
      })
    }
  }

  renderPage1({ pos, breakpoint }) {
    if (pos > breakpoint) return { opacity: 0 }
    else return { opacity: 1 }
  }

  renderPage3({ pos, start }) {
    if ((pos === 0) || (pos < start)) {
      return {
        style: { top: '20%', opacity: 0 },
        img1: this.props.page3.img1,
        img2: this.props.page3.img2,
        img2Style: { position: 'absolute', top: 48, opacity: 0 }
      }
    }
    else {
      return {
        style: { top: '20%', opacity: 1 },
        img1: this.props.page3.img1,
        img2: this.props.page3.img2,
        img2Style: { position: 'absolute', top: 48, opacity: 1 }
      }
    }
  }

  renderScrollContainer() {
    if (typeof window !== 'undefined') return { position: 'absolute', height: $(window).height() / 1.5 }
    else return {}
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

  renderVerticalColumns() {
    if (typeof window !== 'undefined') {
      return this.props.cols.map((col, index) => {
        return <div key={`vertical-col-${index}`} className="about-vertical-col">
          <img className="about-vertical-img" src={col.img} />
          <Text locale={this.props.locale} sel="about-vertical-title" translate={col.title}/>
          {col.items.map((item, index) => <Text key={index} locale={this.props.locale} sel="about-vertical-text" translate={item} />)}
        </div>
      })
    }
  }

  imageLoaded() {
    this.props.onImageLoaded(this.refs.gallery)
  }

  render() {
    if (!this.state) return null;
    return (
      <div id="about" ref="gallery">
        <div className="about-page-1" ref="page1">
          <div className="about-cards">
            {this.renderCards()}
          </div>
          <div className="about-summary" style={this.state ? this.state.page1 : { opacity: 1 }}>
            <Text locale={this.props.locale} tag="div" sel="about-title" translate={this.props.title} />
            <Text locale={this.props.locale} tag="div" sel="about-description" translate={this.props.description} />
          </div>
        </div>
        <div className="about-page-2" ref="page2">
          {this.renderVerticalColumns()}
        </div>
        <div className="about-page-3" ref="page3">
          <div className="section-scroll right" style={this.renderScrollContainer()}>
            <img
              style={{ position: 'absolute', top: 48 }}
              src={this.props.page3.img1}
              onLoad={this.imageLoaded.bind(this)}/>
            <img
              style={(this.state ? this.state.page3.img2Style : { position: 'absolute', top: 48, opacity: 0 })}
              src={this.props.page3.img2}
              onLoad={this.imageLoaded.bind(this)}/>
          </div>
          <div className="section-fixed left" style={(this.state ? this.state.page3.style : this.props.page3.style)} ref="fixed">
            <Text tag="div" locale={this.props.locale} sel="section-title" translate={this.props.page3.title} />
            <Text tag="p" locale={this.props.locale} sel="section-description" translate={this.props.page3.description} />
          </div>
        </div>
      </div>
    )
  }

}

export default About
