import React from 'react'
import $ from 'jquery'
import Text from 'Text'
import Slider from 'react-slick'

class Project extends React.Component {
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
        if (this.props.route === "/") {
          if ($(window).scrollTop() === 0) $('main a').hide();
          else $('main a').show();
        }
        else {
          let routePaths = this.props.route.split('/')
          $('.projects-container > section:first-child').css({
            marginTop: 26,
            paddingTop: 0
          })
          $('.projects-container > section:first-child div.section-scroll').css("margin", 0)
        }
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    if (typeof window !== 'undefined') {
      let top = $(window).height(),
          style = this.calculateStyle({ pos: $(window).scrollTop(), viewportHeight: $(window).height() })

      this.setState({
        style
      })
    }
  }

  calculateStyle(opts) {
    if (window.isMobile()) {
      return { visibility: 'visible', opacity: 1, width: '100%' }
    }
    else {
      let scrollSide = $(`#${this.props.name} .section-scroll`)
      let offset = scrollSide.offset()
      let top = (opts.viewportHeight / 6)
      let breakpoints = {}
      if (scrollSide && offset && offset.top) {
        breakpoints.begin = offset.top - 250
        breakpoints.end = (offset.top + scrollSide.height()) - (opts.viewportHeight / 2)
        if (opts.pos > breakpoints.begin) {
          if ((opts.pos > breakpoints.begin) && (opts.pos < breakpoints.end)) return { visibility: 'visible', opacity: 1, top }
          else return { visibility: 'hidden', opacity: 0, top }
        }
        else return { visibility: 'hidden', opacity: 0, top }
      }
      else return { visibility: 'hidden', opacity: 0, top }
    }
  }

  imageLoaded() {
    this.props.onImageLoaded(this.refs.gallery)
  }

  getScrollSide() {
    if (typeof window !== 'undefined') {
      if (this.props.cards && this.props.cards.length) {
        return this.props.cards.map((card, index) => {
          return (<div key={`card-${index}`} className="card">
            <img src={card.imageUrl} onLoad={this.imageLoaded.bind(this)}/>
            <Text tag="div" locale={this.props.locale} sel="card-title" translate={card.title} />
            <Text tag="div" locale={this.props.locale} sel="card-description" translate={card.description} />
            <a href={card.link.href} target="_blank">
              <Text tag="div" locale={this.props.locale} sel="card-link" target="_blank" translate={card.link.text} />
            </a>
          </div>)
        })
      }
      if (this.props.images && this.props.images.length) {
        return this.props.images.map((url, index) => {
          return <img
            style={this.props.imageStyle ? this.props.imageStyle : {}}
            key={`${this.props.name}-${index}`}
            src={url}
            onLoad={this.imageLoaded.bind(this)}/>
        })
      }
    }
  }

  getSlideShow() {
    if (typeof window !== 'undefined') {
      if (this.props.cards && this.props.cards.length) {
        return this.props.cards.map((card, index) => {
          return (<div key={`card-${index}`} className="card">
            <img src={card.imageUrl} onLoad={this.imageLoaded.bind(this)}/>
            <Text tag="div" locale={this.props.locale} sel="card-title" translate={card.title} />
            <Text tag="div" locale={this.props.locale} sel="card-description" translate={card.description} />
            <a href={card.link.href} target="_blank">
              <Text tag="div" locale={this.props.locale} sel="card-link" target="_blank" translate={card.link.text} />
            </a>
          </div>)
        })
      }
      if (this.props.images && this.props.images.length) {
        let settings = {
          dots: true,
          speed: 500,
          slidesToShow: 1,
          arrows: false,
          adaptiveHeight: true,
          centerMode: true,
          centerPadding: '5%'
        }
        return (
          <Slider {...settings}>
            {this.props.images.map((url, index) => {
              return <div key={`${this.props.name}-${index}`} className="slide"><img
                src={url}
                onLoad={this.imageLoaded.bind(this)}/></div>
            })}
          </Slider>
        )
      }
      else return null
    }
  }

  render() {
    if (!this.state) return null;
    if (window.isMobile()) return (
      <section id={this.props.name} >
        <div style={this.state.style} ref="fixed">
          <a href={this.props.url} target="_blank" ><Text tag="div" locale={this.props.locale} sel="section-title" translate={this.props.title}/></a>
          <Text tag="p" locale={this.props.locale} sel="section-description" translate={this.props.description}/>
          <div className="section-tags">
            {this.props.tags.map((tag) => <Text tag="div" locale={this.props.locale} key={tag} translate={tag}/>)}
          </div>
          {this.props.icons ? this.props.icons.map((icon, index) => <a href={icon.href} target="_blank" style={this.state.links} key={`link-${index}`}><img className="software-logo" key={`icon-${index}`} src={icon.img} onLoad={this.imageLoaded.bind(this)}/></a>) : <span></span>}
        </div>
        <div ref="gallery">
          {this.getSlideShow()}
        </div>
      </section>
    )
    else return (
      <section id={this.props.name} >
        <div className={this.props.scrollSide} ref="gallery">
          {this.getScrollSide()}
        </div>
        <div className={this.props.fixedSide} style={this.state.style} ref="fixed">
          <a href={this.props.url} target="_blank" ><Text tag="div" locale={this.props.locale} sel="section-title" translate={this.props.title}/></a>
          <Text tag="p" locale={this.props.locale} sel="section-description" translate={this.props.description}/>
          <div className="section-tags">
            {this.props.tags.map((tag) => <Text tag="div" locale={this.props.locale} key={tag} translate={tag}/>)}
          </div>
          {this.props.icons ? this.props.icons.map((icon, index) => <a href={icon.href} target="_blank" style={this.state.links} key={`link-${index}`}><img className="software-logo" key={`icon-${index}`} src={icon.img} onLoad={this.imageLoaded.bind(this)}/></a>) : <span></span>}
        </div>
      </section>
    )
  }

}

Project.propTypes = {
  onImageLoaded: React.PropTypes.func
}

export default Project
