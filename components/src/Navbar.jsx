import React from 'react'
import $ from 'jquery'
import NavItem from '../dist/NavItem'
import Text from '../dist/Text'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (window.isMobile()) {
        this.setState({
          style: {
            top: $(window).height() - 48
          },
          bottom_style: {
            bottom: $(window).height() - 95,
            background: 'white'
          },
          original_bottom: $(window).height() - 95
        })
        window.addEventListener('scroll', this.handleScroll.bind(this));
      }
      else {
        this.open()
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
      if (window.isMobile()) {
        this.styleMobile()
      }
      else {
        this.styleDesktop()
      }
    }
  }

  styleMobile() {
    let scrolledFromTop = $(window).scrollTop()
    let windowHeight = $(window).height()
    let bottomOfLinks = windowHeight - 48
    let top = bottomOfLinks - scrolledFromTop
    let factor = 62 / bottomOfLinks
    let converted = scrolledFromTop * factor
    let logoDescended = (-52 + converted) < 10 ? (-52 + converted) : 10
    if (scrolledFromTop < bottomOfLinks) {
      this.setState({
        logo_style: {
          top: logoDescended
        },
        style: {
          top: top > 79 ? top : 79
        },
        bottom_style: {
          bottom: windowHeight - 95,
          background: 'white'
        }
      })
    }
    else if (scrolledFromTop < windowHeight) {
      this.setState({
        style: {
          top: windowHeight - scrolledFromTop
        },
        bottom_style: {
          bottom: bottomOfLinks - (bottomOfLinks - scrolledFromTop),
          background: 'white'
        }
      })
    }
    else {
      this.setState({
        logo_style: {
          top: 10
        },
        style: this.state.style,
        bottom_style: {
          bottom: windowHeight,
          background: 'white'
        }
      })
    }
  }

  styleDesktop() {
    let scrolledFromTop = $(window).scrollTop()
    let windowHeight = $(window).height() - 200
    let documentHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) / 2;
    let factor = 120 / windowHeight
    let converted = scrolledFromTop * factor
    let logoDescended = (-120 + converted) < 0 ? (-120 + converted) : 0
    let ulTopDescended = (converted + 50) < 200 ? (converted + 50) : 200
    let ulBottomAscended = 90

    let logo_style = {
      opacity: this.state && (this.state.class === "closed") ? 0 : 1,
      top: this.props.route === "/" ? `${logoDescended}px` : 0,
      cursor: 'pointer'
    }
    let bw_logo_style = {
      opacity: this.state && (this.state.class === "closed") ? 1 : 0,
      top: this.props.route === "/" ? `${logoDescended}px` : 0,
      cursor: 'pointer'
    }
    let top_style = {
      marginTop: this.props.route === "/" ? `${ulTopDescended}px` : 200
    }
    let bottom_style = {
      bottom: this.props.route === "/" ? `${ulBottomAscended}px` : 90
    }
    let style = {
      left: (this.state && this.state.style.left ? this.state.style.left : -200),
      boxShadow: (scrolledFromTop < ($(document).height() - $(window).height() - 80)) && (scrolledFromTop > (windowHeight * 2)) && (this.state.class === 'open') ? '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)' : 'none',
      background: (scrolledFromTop < ($(document).height() - $(window).height() - 80)) && (scrolledFromTop > (windowHeight * 2)) && (this.state.class === 'open') ? 'white' : 'transparent'
    }

    this.setState({
      logo_style,
      bw_logo_style,
      top_style,
      bottom_style,
      style
    })
    if (scrolledFromTop > (windowHeight - 200)) this.close()
    else this.open()
  }

  scrollToTop() {
    if (this.props.route !== "/") window.location.href = "/"
    else $("html, body").animate({
      scrollTop: 0
    }, 500);
  }

  open() {
    if (window.isMobile()) {

    }
    else {
      let scrolledFromTop = $(window).scrollTop()
      let windowHeight = $(window).height()
      let logo_style = {
        opacity: 1,
        top: this.props.route === "/" ? $('.nav-logo').css('top') : 0,
        cursor: 'pointer'
      }
      let bw_logo_style = {
        opacity: 0,
        top: this.props.route === "/" ? $('.nav-logo').css('top') : 0,
        cursor: 'pointer'
      }
      this.setState({
        logo_style,
        bw_logo_style,
        class: 'open',
        style: {
          left: '0px',
          boxShadow: (scrolledFromTop > (windowHeight * 2)) ? '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)' : 'none',
          background: (scrolledFromTop > (windowHeight * 2)) ? 'white' : 'transparent'
        }
      });
    }
  }

  close() {
    if (window.isMobile()) {

    }
    else {
      let scrolledFromTop = $(window).scrollTop()
      let windowHeight = $(window).height()
      let logo_style = {
        opacity: 0,
        top: this.props.route === "/" ? $('.nav-logo').css('top') : 0,
        cursor: 'pointer'
      }
      let bw_logo_style = {
        opacity: 1,
        top: this.props.route === "/" ? $('.nav-logo').css('top') : 0,
        cursor: 'pointer'
      }
      if (scrolledFromTop > (windowHeight - 200)) this.setState({
        logo_style,
        bw_logo_style,
        class: 'closed',
        style: {
          left: '-200px',
          boxShadow: 'none',
          background: 'transparent'
        }
      });
    }
  }

  getTopLinks() {
    return this.props.links.map((link, index)=> {
      return <NavItem key={`nav-item-${index}`} url={link.url} icon={link.icon} color="blk" locale={this.props.locale} translate={link.text} position="top"/>
    })
  }

  getBottomLinks() {
    return this.props.bottomLinks.map((link, index)=> {
      if (link.icon) return <NavItem key={`nav-link-${index}`} url={link.url} icon={link.icon} color="blk" locale={this.props.locale} position="bottom"/>
      else return <NavItem key={`nav-link-${index}`} url={link.url} color="blk" locale={this.props.locale} translate={link.text} position="bottom"/>
    })
  }

  imageLoaded() {
    this.props.onImageLoaded(this.refs.gallery)
  }

  render() {
    if (!this.state) return null;
    return (
      <nav className={this.state.class} style={this.state.style} onMouseEnter={this.open.bind(this)} onMouseLeave={this.close.bind(this)} onMouseMove={this.open.bind(this)}>
        <img src="https://s3.amazonaws.com/merciba.com/assets/mercibalogo-sm.svg" className="nav-logo color-logo" style={this.state.logo_style} onClick={this.scrollToTop.bind(this)} onLoad={this.imageLoaded.bind(this)} />
        <img src="https://s3.amazonaws.com/merciba.com/assets/mercibalogo-sm-bw.svg" className="nav-logo" style={this.state.bw_logo_style} onClick={this.scrollToTop.bind(this)} onLoad={this.imageLoaded.bind(this)} />
        <ul id="nav-items" style={this.state.top_style} ref="top">
          {this.getTopLinks()}
        </ul>
        <ul id="nav-links" style={this.state.bottom_style} ref="bottom">
          {this.getBottomLinks()}
          <li id="blog-link"><a href={this.props.blog.url} target="_blank"><Text tag="div" locale={this.props.locale} translate={this.props.blog.text} /></a></li>
        </ul>
      </nav>
    )
  }

}

export default Navbar
