import React from 'react'
import $ from 'jquery'
import Promise from 'bluebird'
import Navbar from '../dist/Navbar'
import Project from '../dist/Project'

let lang = 'en' // Force english, remove for production

class App extends React.Component {
    constructor(props) {
      super(props);
      console.log(`Initializing app with props: `, props)
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        let windowHeight = $(window).height()
        getLocale()
          .then((locale) => {
            this.setState({
              locale,
              loading: true,
              logo: {
                margin: `${(windowHeight - 585) / 2}px auto`
              }
            })
          })
      }
    }

    imageLoaded() {
      let loading = !imagesLoaded(this.refs.projects)
      this.setState({
        loading,
      })
      console.log(loading)
    }

    render() {
      if (!this.state) return null;
      return (
        <main role="main">
          <div className="spinner" style={this.state.loading ? { display: 'block', position: 'fixed' } : { display: 'none' }}></div>
          <Navbar locale={this.state.locale}/>
          <article className="container">
            <div id="main-logo" style={this.state.logo}></div>
          </article>
          <article className="container" ref="projects">
            <Project
              name="perengo"
              url="https://perengo.com"
              scrollSide="section-scroll left"
              fixedSide="section-fixed right"
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
              name="sweet-unity"
              url="https://perengo.com"
              scrollSide="section-scroll right"
              fixedSide="section-fixed left"
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
              name="software"
              url="https://github.com/merciba"
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
              onImageLoaded={this.imageLoaded.bind(this)}
              last={true} />
          </article>
          <footer>
            <div className="footer">
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
