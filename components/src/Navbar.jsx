import React from 'react'
import $ from 'jquery'
import NavItem from '../dist/NavItem'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.open()
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
      let scrolledFromTop = $(window).scrollTop()
      let windowHeight = $(window).height() - 200
      let documentHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) / 2;
      let factor = 120 / windowHeight
      let converted = scrolledFromTop * factor
      let logoDescended = (-120 + converted) < 0 ? (-120 + converted) : 0
      let ulDescended = (converted + 50) < 200 ? (converted + 50) : 200
      if (this.props.route === "/") this.setState({
        logo_style: {
          top: `${logoDescended}px`,
          cursor: 'pointer'
        },
        ul_style: {
          marginTop: `${ulDescended}px`
        },
        style: {
          left: this.state ? this.state.style.left : 0,
          boxShadow: (scrolledFromTop < (documentHeight - 80)) && (scrolledFromTop > (windowHeight * 2)) && (this.state.class === 'open') ? '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)' : 'none',
          background: (scrolledFromTop < (documentHeight - 80)) && (scrolledFromTop > (windowHeight * 2)) && (this.state.class === 'open') ? 'white' : 'transparent'
        }
      })
      else this.setState({
        logo_style: {
          top: 0,
          cursor: 'pointer'
        },
        ul_style: {
          marginTop: 200
        },
        style: {
          left: 0,
          boxShadow: (scrolledFromTop < (documentHeight - 80)) && (scrolledFromTop > (windowHeight * 2)) && (this.state.class === 'open') ? '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)' : 'none',
          background: (scrolledFromTop < (documentHeight - 80)) && (scrolledFromTop > (windowHeight * 2)) && (this.state.class === 'open') ? 'white' : 'transparent'
        }
      })
      if (scrolledFromTop > (windowHeight - 200)) this.close()
      else this.open()
    }
  }

  scrollToTop() {
    if (this.props.route !== "/") window.location.href = "/"
    else $("html, body").animate({
      scrollTop: 0
    }, 500);
  }

  open() {
    let scrolledFromTop = $(window).scrollTop()
    let windowHeight = $(window).height()
    this.setState({
      class: 'open',
      logo_class: 'nav-logo logo-color',
      style: {
        left: '0px',
        boxShadow: (scrolledFromTop > (windowHeight * 2)) ? '0 6px 12px 0 rgba(0,0,0,0.16), 0 4px 12px 0 rgba(0,0,0,0.22)' : 'none',
        background: (scrolledFromTop > (windowHeight * 2)) ? 'white' : 'transparent'
      }
    });
  }

  close() {
    let scrolledFromTop = $(window).scrollTop()
    let windowHeight = $(window).height()
    if (scrolledFromTop > (windowHeight - 200)) this.setState({
      class: 'closed',
      logo_class: 'nav-logo logo-bw',
      style: {
        left: '-200px',
        boxShadow: 'none',
        background: (scrolledFromTop > (windowHeight * 2)) ? 'white' : 'transparent'
      }
    });
  }

  render() {
    if (!this.state) return null;
    return (
      <nav className={this.state.class} style={this.state.style} onMouseEnter={this.open.bind(this)} onMouseLeave={this.close.bind(this)} onMouseMove={this.open.bind(this)}>
        <div className={this.state.logo_class} style={this.state.logo_style} onClick={this.scrollToTop.bind(this)}></div>
        <ul id="nav-items" style={this.state.ul_style}>
          <NavItem url="/projects" icon="circle" color="blk" locale={this.props.locale} translate="NAVBAR.PROJECTS"/>
          <NavItem url="/about" icon="square" color="blk" locale={this.props.locale} translate="NAVBAR.ABOUT"/>
          <NavItem url="/contact" icon="triangle" color="blk" locale={this.props.locale} translate="NAVBAR.CONTACT"/>
        </ul>
      </nav>
    )
  }

}

export default Navbar
