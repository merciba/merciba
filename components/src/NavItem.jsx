import React from 'react'
import Text from '../dist/Text'

class NavItem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.icon && this.props.color) this.setState({
      icon_id: `${this.props.icon}-icon`,
      icon_url: `https://s3.amazonaws.com/merciba.com/assets/menu-${this.props.icon}-${this.props.color}.svg`
    })
  }

  getIcon() {
    if (this.props.position === "top") return <object id={this.state.icon_id} className="menu-icon" data={this.state.icon_url} type="image/svg+xml" ></object>
    else if (this.props.position === "bottom") {
      if (this.props.icon) return <i className={`menu-icon ${this.props.icon}`} aria-hidden="true"></i>
      else return null
    }
    else return null
  }

  getText() {
    if (this.props.translate && this.props.locale) return <Text tag="p" locale={this.props.locale} translate={this.props.translate} />
    else return null
  }

  render() {
    if (!this.state) return null;
    return (
      <li>
        <a href={this.props.url} target={this.props.position === "top" ? "_self" : "_blank"}>
          {this.getIcon()}
          {this.getText()}
        </a>
      </li>
    )
  }

}

export default NavItem
