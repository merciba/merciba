import React from 'react'
import $ from 'jquery'
import Text from '../dist/Text'

class About extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (window.isMobile()) {
        $('main').on('scroll', this.handleScroll.bind(this));
        this.handleScroll()
      }
      else {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.handleScroll()
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    if (typeof window !== 'undefined') {
      let pos = $(window).scrollTop()
      let page1 = this.stylePage1({ pos, breakpoint: $(window).height() / 4 })
      let page3 = this.stylePage3({ pos, start: $(document).height() - ($(window).height() * 1.5) })
      this.setState({
        page1,
        page3
      })
    }
  }

  stylePage1({ pos, breakpoint }) {
    if (window.isMobile()) {
      return { opacity: 1 }
    }
    else {
      if (pos > breakpoint) return { opacity: 0 }
      else return { opacity: 1 }
    }
  }

  stylePage3({ pos, start }) {
    if (window.isMobile()) {
      return {
        style: { opacity: 1 },
        img1: this.props.page3.img1,
        img2: this.props.page3.img2,
        img2Style: { opacity: 1 }
      }
    }
    else {
      if ((pos === 0) || (pos < start)) {
        return {
          style: { top: '10%', opacity: 0 },
          img1: this.props.page3.img1,
          img2: this.props.page3.img2,
          img2Style: { position: 'absolute', top: '40%', opacity: 0 }
        }
      }
      else {
        return {
          style: { top: '10%', opacity: 1 },
          img1: this.props.page3.img1,
          img2: this.props.page3.img2,
          img2Style: { position: 'absolute', top: '40%', opacity: 1 }
        }
      }
    }
  }

  renderScrollContainer() {
    if (typeof window !== 'undefined') return { position: 'absolute', marginTop: '20%' }
    else return {}
  }

  renderPage1() {
    if (typeof window !== 'undefined') {
      if (window.isMobile()) return (
        <div className="about-page-1" ref="page1">
          <div className="about-summary" style={{ opacity: 1 }}>
            <Text locale={this.props.locale} tag="div" sel="about-title" translate={this.props.title} />
            <Text locale={this.props.locale} tag="div" sel="about-description" translate={this.props.description} />
          </div>
          <div className="about-cards">
            {getCards.call(this)}
          </div>
        </div>
      )
      else return (
        <div className="about-page-1" ref="page1">
          <div className="about-cards">
            {getCards.call(this)}
          </div>
          <div className="about-summary" style={this.state ? this.state.page1 : { opacity: 1 }}>
            <Text locale={this.props.locale} tag="div" sel="about-title" translate={this.props.title} />
            <Text locale={this.props.locale} tag="div" sel="about-description" translate={this.props.description} />
          </div>
        </div>
      )

      function getCards() {
        return this.props.cards.map((card, index) => {
          return <div key={`card-${index}`} className="about-card" style={{ background: `url('${card.img}') no-repeat`}}>
              <Text locale={this.props.locale} sel="about-card-title" translate={card.title} />
              <Text locale={this.props.locale} sel="about-card-description" translate={card.description} />
            </div>
          })
      }
    }
  }

  renderPage2() {
    if (typeof window !== 'undefined') {
      return (
        <div className="about-page-2" ref="page2">
          {this.props.cols.map((col, index) => {
            return <div key={`vertical-col-${index}`} className="about-vertical-col">
              <img className="about-vertical-img" src={col.img} />
              <Text locale={this.props.locale} sel="about-vertical-title" translate={col.title}/>
              {col.items.map((item, index) => <Text key={index} locale={this.props.locale} sel="about-vertical-text" translate={item} />)}
            </div>
          })}
        </div>
      )
    }
  }

  renderPage3() {
    if (window.isMobile()) return (
      <div className="about-page-3" ref="page3">
        <div ref="fixed">
          <Text tag="div" locale={this.props.locale} sel="section-title" translate={this.props.page3.title} />
          <Text tag="p" locale={this.props.locale} sel="section-description" translate={this.props.page3.description} />
        </div>
        <div>
          <img
            src={this.props.page3.img2}
            onLoad={this.imageLoaded.bind(this)}/>
        </div>
      </div>
    )
    else return (
      <div className="about-page-3" ref="page3">
        <div className="section-scroll right" style={this.renderScrollContainer()}>
          <img
            style={{ position: 'absolute', top: '40%' }}
            src={this.props.page3.img1}
            onLoad={this.imageLoaded.bind(this)}/>
          <img
            style={(this.state ? this.state.page3.img2Style : { position: 'absolute', top: '40%', opacity: 0 })}
            src={this.props.page3.img2}
            onLoad={this.imageLoaded.bind(this)}/>
        </div>
        <div className="section-fixed left" style={(this.state ? this.state.page3.style : this.props.page3.style)} ref="fixed">
          <Text tag="div" locale={this.props.locale} sel="section-title" translate={this.props.page3.title} />
          <Text tag="p" locale={this.props.locale} sel="section-description" translate={this.props.page3.description} />
        </div>
      </div>
    )
  }

  imageLoaded() {
    this.props.onImageLoaded(this.refs.gallery)
  }

  render() {
    if (!this.state) return null;
    return (
      <div id="about" ref="gallery">
        {this.renderPage1()}
        {this.renderPage2()}
        {this.renderPage3()}
      </div>
    )
  }

}

export default About
