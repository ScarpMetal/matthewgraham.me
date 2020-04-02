import { NavLink, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { hot } from 'react-hot-loader'

import logoSVG from '../assets/logo.svg'
import HomePage from './HomePage'
import ProjectsPage from './containers/ProjectsPage'
import ExperiencesPage from './containers/ExperiencesPage'
import ContactPage from './ContactPage'
import NotFoundPage from './NotFoundPage'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			hamburgerExpanded: false
		}

		this.expandHamburger = this.expandHamburger.bind(this)
	}

	render() {
		const activeStyle = { fontWeight: 'bold' }
		const { hamburgerExpanded } = this.state
		return (
			<>
				<nav className='main-nav'>
					<NavLink className='logo' exact to='/' activeStyle={activeStyle}>
						<img src={logoSVG} />
					</NavLink>
					<ul className='horizontal-nav-items'>
						<li><NavLink to='/projects' activeStyle={activeStyle}>Projects</NavLink></li>
						<li><NavLink to='/experience' activeStyle={activeStyle}>Experience</NavLink></li>
						<li><NavLink to='/contact' activeStyle={activeStyle}>Contact</NavLink></li>
						<li><a href='#'>Resume</a></li>
					</ul>
					<button type='button' onClick={this.expandHamburger} style={{ display: 'none' }}>Hamburger</button>
					{hamburgerExpanded &&
						<div>
							<NavLink to='/projects' activeStyle={activeStyle}>Projects</NavLink>
							<NavLink to='/experience' activeStyle={activeStyle}>Experience</NavLink>
							<NavLink to='/contact' activeStyle={activeStyle}>Contact</NavLink>
							<a href='#'>Resume</a>
							<ul>
								<li>CodePen</li>
								<li>LinkedIn</li>
								<li>GitHub</li>
								<li>Twitter</li>
							</ul>
						</div>
					}
				</nav>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/projects' component={ProjectsPage} />
					<Route path='/experience' component={ExperiencesPage} />
					<Route path='/contact' component={ContactPage} />
					<Route component={NotFoundPage} />
				</Switch>
				<footer className='main-footer'>
					<p>Copyright © 2020 Matthew Graham • <a href='#'>Privacy & Terms</a></p>
				</footer>
			</>
		)
	}

	expandHamburger() {
		this.setState(prevState => ({ hamburgerExpanded: !prevState.hamburgerExpanded }))
	}
}

App.propTypes = {
	children: PropTypes.element
}

export default hot(module)(App)
