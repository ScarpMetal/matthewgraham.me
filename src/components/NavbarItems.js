import React from 'react'
import { NavLink } from 'react-router-dom'

import SocialHorizontal from './SocialHorizontal'

class NavbarItems extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			hamburgerExpanded: false
		}

		this.expandHamburger = this.expandHamburger.bind(this)
	}

	render() {
		const activeStyle = { fontWeight: 'bold' }
		return (
			<>
				<ul className='horizontal-nav-items'>
					<li><NavLink to='/projects' activeStyle={activeStyle}>Projects</NavLink></li>
					<li><NavLink to='/experience' activeStyle={activeStyle}>Experience</NavLink></li>
					<li><NavLink to='/contact' activeStyle={activeStyle}>Contact</NavLink></li>
					<li><a href='#'>Resume</a></li>
				</ul>
				<button type='button' onClick={this.expandHamburger} style={{ display: 'none' }}>Hamburger</button>
				{this.state.hamburgerExpanded && <div className='vertical-nav-items'>
					<NavLink to='/projects' activeStyle={activeStyle}>Projects</NavLink>
					<NavLink to='/experience' activeStyle={activeStyle}>Experience</NavLink>
					<NavLink to='/contact' activeStyle={activeStyle}>Contact</NavLink>
					<a href='#'>Resume</a>
					<SocialHorizontal />
				</div>}
			</>
		)
	}

	expandHamburger() {
		this.setState(prevState => ({ hamburgerExpanded: !prevState.hamburgerExpanded }))
	}
}

export default NavbarItems