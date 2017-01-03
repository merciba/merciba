import React from 'react'
import Text from '../dist/Text'

class NavItem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setState({
      icon_id: `${this.props.icon}-icon`,
      icon_url: `https://s3.amazonaws.com/merciba.com/assets/menu-${this.props.icon}-${this.props.color}.svg`
    })
  }

  render() {
    if (!this.state) return null;
    return (
      <li>
        <a href={this.props.url} >
          { this.props.position === "top" ?
            <object id={this.state.icon_id} className="menu-icon" data={this.state.icon_url} type="image/svg+xml" ></object> :
            <i className={`menu-icon ${this.props.icon}`} aria-hidden="true"></i> }
          { this.props.translate ? <Text tag="p" locale={this.props.locale} translate={this.props.translate} /> : <span></span> }
        </a>
      </li>
    )
  }

}

export default NavItem
