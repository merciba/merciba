import React from 'react'
import $ from 'jquery'
import Promise from 'bluebird'
import Navbar from '../dist/Navbar'
import Project from '../dist/Project'
import About from '../dist/About'
import Contact from '../dist/Contact'

let lang = 'en' // Force english, remove for production

class App extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        let windowHeight = $(window).height()
        let windowWidth = $(window).width()
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.handleScroll()
        getLocale()
          .then((locale) => {
            this.setState({
              locale,
              loading: true,
              logo: {
                margin: `${(windowHeight - 585) / 2}px ${(windowWidth / 3)}px`
              }
            })
            this.styleElements()
          })
      }
    }

    componentWillUnmount() {
      if (typeof window !== 'undefined') window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
      // Scroll handler. Fired on each scroll
    }

    imageLoaded() {
      let loading = !imagesLoaded(this.refs.projects)
      this.setState({
        loading,
      })
      if (!loading) this.loaded()
    }

    loaded() {
      setTimeout(() => window.scroll(0, 0))
    }

    styleProject(project) {
      $(this.refs.logo).hide()
      $(this.refs.projects).find(`#${project}`).show()
      $(this.refs.projects).find(`#${project}`).css("padding-top", 0)
      $(this.refs.projects).find(`#${project} .section-scroll`).css("margin-top", "6%")
      $(this.refs.projects).find(`#${project} .section-fixed`).css("opacity", 1)
    }

    styleElements() {
      let position = $(window).scrollTop()
      let regex = new RegExp('/project/')

      if (regex.test(this.props.route)) {

        $(this.refs.projects).find('section').hide()

        if (this.props.route === "/project/perengo") this.styleProject("perengo")
        else if (this.props.route === "/project/sweet-unity-farms") this.styleProject("sweet-unity")
        else if (this.props.route === "/project/software") this.styleProject("software")
        else window.location.href = "/"
      }
      else {
        switch (this.props.route) {
          case "/":
            $(this.refs.about).hide()
            $(this.refs.contact).hide()
            break;
          case "/projects":
            $(this.refs.logo).hide()
            $(this.refs.about).hide()
            $(this.refs.contact).hide()
            $(this.refs.projects).find('section:first-child').css("padding-top", 0)
            $(this.refs.projects).find('section:first-child .section-scroll').css("margin-top", "6%")
            $(this.refs.projects).find('section:first-child .section-fixed').css("opacity", 1)
            break;
          case "/about":
            $(this.refs.logo).hide()
            $(this.refs.projects).hide()
            $(this.refs.contact).hide()
            break;
          case "/contact":
            $(this.refs.logo).hide()
            $(this.refs.projects).hide()
            $(this.refs.about).hide()
            break;
          default:
            window.location.href = "/"
            break;
        }
      }

    }

    render() {
      if (!this.state) return null;
      return (
        <main role="main">
          <div className="spinner" style={this.state.loading ? { display: 'block', position: 'fixed' } : { display: 'none' }}></div>
          <Navbar route={this.props.route} locale={this.state.locale} ref="navbar"/>
          <article className="container logo-container" ref="logo">
            <img id="main-logo" src="https://s3.amazonaws.com/merciba.com/assets/merciba-logo.png" style={this.state.logo} onLoad={this.imageLoaded.bind(this)} />
          </article>
          <article className="container projects-container" ref="projects">
            <Project
              ref="perengo"
              name="perengo"
              url="/project/perengo"
              route={this.props.route}
              scrollSide="section-scroll left"
              fixedSide="section-fixed right"
              imageStyle={{ maxWidth: "400px" }}
              title="MAIN.PROJECTS.PERENGO.TITLE"
              description="MAIN.PROJECTS.PERENGO.DESCRIPTION"
              tags={[
                "MAIN.TAGS.PRD_DESIGN",
                "MAIN.TAGS.FE_DEV",
                "MAIN.TAGS.BE_DEV"
              ]}
              images={[
                "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-1.png",
                "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-2.png",
                "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-3.png",
                "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-4.png",
                "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-5.png",
                "https://s3.amazonaws.com/merciba.com/assets/projects/perengo/perengo-6.png"
              ]}
              locale={this.state.locale}
              onImageLoaded={this.imageLoaded.bind(this)} />
            <Project
              ref="sweetUnity"
              name="sweet-unity"
              url="/project/sweet-unity-farms"
              route={this.props.route}
              scrollSide="section-scroll right"
              fixedSide="section-fixed left"
              imageStyle={{ maxWidth: "100%" }}
              title="MAIN.PROJECTS.SWEET_UNITY.TITLE"
              description="MAIN.PROJECTS.SWEET_UNITY.DESCRIPTION"
              tags={[
                "MAIN.TAGS.UI_DESIGN",
                "MAIN.TAGS.FE_DEV",
                "MAIN.TAGS.E_COMM"
              ]}
              images={[
                "https://s3.amazonaws.com/merciba.com/assets/projects/sweet_unity/sweetunity-1.png"
              ]}
              locale={this.state.locale}
              onImageLoaded={this.imageLoaded.bind(this)} />
            <Project
              ref="software"
              name="software"
              url="https://github.com/merciba"
              route={this.props.route}
              scrollSide="section-scroll left"
              fixedSide="section-fixed right"
              title="MAIN.PROJECTS.SOFTWARE.TITLE"
              description="MAIN.PROJECTS.SOFTWARE.DESCRIPTION"
              cards={[
                { title: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_1.TITLE", description: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_1.DESCRIPTION", imageUrl: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/softwarebkg-1.png", link: { text: "MAIN.PROJECTS.SOFTWARE.LINK_TEXT", href: "https://github.com/merciba/paquet" }},
                { title: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_2.TITLE", description: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_2.DESCRIPTION", imageUrl: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/softwarebkg-2.jpg", link: { text: "MAIN.PROJECTS.SOFTWARE.LINK_TEXT", href: "https://github.com/alfonsogoberjr/knearest" }},
                { title: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_3.TITLE", description: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_3.DESCRIPTION", imageUrl: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/softwarebkg-3.jpg", link: { text: "MAIN.PROJECTS.SOFTWARE.LINK_TEXT", href: "https://github.com/merciba/ascii-mirror" }},
                { title: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_4.TITLE", description: "MAIN.PROJECTS.SOFTWARE.CARDS.CARD_4.DESCRIPTION", imageUrl: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/softwarebkg-4.jpg", link: { text: "MAIN.PROJECTS.SOFTWARE.LINK_TEXT", href: "https://github.com/merciba/orequire" }}
              ]}
              icons={[
                { img: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/Npm-logo.svg.png", href: "https://www.npmjs.com/~merciba"},
                { img: "https://s3.amazonaws.com/merciba.com/assets/projects/open_source_software/nodejs_logo.png", href: "https://nodejs.org" }
              ]}
              tags={[
                "MAIN.TAGS.DEV"
              ]}
              locale={this.state.locale}
              onImageLoaded={this.imageLoaded.bind(this)} />
          </article>
          <article className="about" ref="about">
            <About
              cards={[
                { title: "ABOUT.PAGE_1.CARDS.CARD_1.TITLE", description: "ABOUT.PAGE_1.CARDS.CARD_1.DESCRIPTION" },
                { title: "ABOUT.PAGE_1.CARDS.CARD_2.TITLE", description: "ABOUT.PAGE_1.CARDS.CARD_2.DESCRIPTION" },
                { title: "ABOUT.PAGE_1.CARDS.CARD_3.TITLE", description: "ABOUT.PAGE_1.CARDS.CARD_3.DESCRIPTION" }
              ]}
              title="ABOUT.PAGE_1.TITLE"
              description="ABOUT.PAGE_1.DESCRIPTION"
              locale={this.state.locale} />
          </article>
          <article className="contact" ref="contact">
            <Contact />
          </article>
          <footer>
            <div className="footer" ref="footer">
              <div>&copy; 2017 Merciba LLC</div>
            </div>
          </footer>
        </main>
      )
    }
}

function imagesLoaded(parentNode) {
  const imgElements = parentNode.querySelectorAll('img');
  for (const img of imgElements) {
    if (!img.complete) return false;
  }
  return true;
}

function getLocale() {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined') {
      if (!lang) lang = window.navigator.language[0] + window.navigator.language[1];
      require('es6-promise').polyfill();
      const isoFetch = require('isomorphic-fetch')

      fetch(`/locales/${lang}`)
        .then((res) => {
          if (res.status === 200) return res.json()
          else return fetch(`/locales/en`).then((r) => r.json())
        })
        .then((res) => {
          resolve(res)
        })
    }
    else {
      const osLocale = require('os-locale')
      const path = require('path')
      let locale
      osLocale()
        .then((res) => {
          lang = res[0] + res[1];
          try {
            locale = require(path.join(__dirname, '..', '..', 'i18n', `${lang}.json`));
          }
          catch (e) {
            locale = require(path.join(__dirname, '..', '..', 'i18n', `en.json`));
          }
          resolve(locale)
        })
    }
  })
}

export default App
