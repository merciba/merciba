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
        <object id={this.state.icon_id} className="menu-icon" data={this.state.icon_url} type="image/svg+xml" ></object>
        <Text tag="p" locale={this.props.locale} translate={this.props.translate} />
      </li>
    )
  }

}

export default NavItem
