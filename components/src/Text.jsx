import React from 'react'
import Promise from 'bluebird'

class Text extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.translate()
  }

  translate() {
    let tokens = this.props.translate.split('.')
    let translation = JSON.parse(JSON.stringify(this.props.locale))
    for (let i = 0; i < tokens.length; i++) {
      if (translation[tokens[i]]) translation = translation[tokens[i]];
      else throw new Error(`Error translating: Could not find traslation ${this.props.translate}`);
    }
    this.setState({translation});
  }

  render() {
    if (!this.state) return null;
    else if (this.props.tag === 'p') return (<p className={this.props.sel ? this.props.sel : "translated"}>{this.state.translation}</p>)
    else if (this.props.tag === 'div') return (<div className={this.props.sel ? this.props.sel : "translated"}>{this.state.translation}</div>)
    else if (this.props.tag === 'span') return (<span className={this.props.sel ? this.props.sel : "translated"}>{this.state.translation}</span>)
    else if (this.props.tag === 'h1') return (<h1 className={this.props.sel ? this.props.sel : "translated"}>{this.state.translation}</h1>)
    else if (this.props.tag === 'h2') return (<h2 className={this.props.sel ? this.props.sel : "translated"}>{this.state.translation}</h2>)
    else if (this.props.tag === 'h3') return (<h3 className={this.props.sel ? this.props.sel : "translated"}>{this.state.translation}</h3>)
    else return (<p>{this.state.translation}</p>)
  }

}

export default Text
