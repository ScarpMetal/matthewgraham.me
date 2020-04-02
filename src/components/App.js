/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from 'react-router-dom'

import HomePage from './HomePage'
import ProjectsPage from './containers/ProjectsPage'
import ExperiencePage from './containers/ExperiencePage'
import ContactPage from './ContactPage'
import NotFoundPage from './NotFoundPage'
import PropTypes from 'prop-types'
import React from 'react'
import { hot } from 'react-hot-loader'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

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
			<div>
				<nav>
					<NavLink exact to='/' activeStyle={activeStyle}>Home</NavLink>
					<ul>
						<li><NavLink to='/projects' activeStyle={activeStyle}>Projects</NavLink></li>
						<li><NavLink to='/experience' activeStyle={activeStyle}>Experience</NavLink></li>
						<li><NavLink to='/contact' activeStyle={activeStyle}>Contact</NavLink></li>
						<li><a href='#'>Resume</a></li>
					</ul>
					<aside class='social-vertical'>
						<li><a href='https://codepen.io/ScarpMetal'>Codepen
							<img src='' />
						</a></li>
						<li><a href='#'>LinkedIn
							<img src='' />
						</a></li>
						<li><a href='#'>Github
							<img src='' />
						</a></li>
						<li><a href='#'>Twitter
							<img src='' />
						</a></li>
					</aside>
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
					<Route path='/experience' component={ExperiencePage} />
					<Route path='/contact' component={ContactPage} />
					<Route component={NotFoundPage} />
				</Switch>
				<footer>
					<p>Copyright © 2020 Matthew Graham • <a href='#'>Privacy & Terms</a></p>
				</footer>
			</div>
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
