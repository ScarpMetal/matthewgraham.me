import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import { NavLink, Link, Route, Switch } from 'react-router-dom'

import logoSVG from '../assets/logo.svg'
import NavbarItems from './NavbarItems'
import HomePage from './HomePage'
import AdminPage from './containers/AdminPage'
import ProjectsPage from './containers/ProjectsPage'
import ExperiencesPage from './containers/ExperiencesPage'
import ContactPage from './ContactPage'
import NotFoundPage from './NotFoundPage'
import * as apiActions from '../actions/firebaseActions'

class App extends React.Component {

	componentDidMount() {
		const { apiActions } = this.props
		console.log('apiActions', apiActions)
		//apiActions.fetchTags()
		apiActions.fetchProjects()
		//apiActions.fetchExperiences()
	}

	render() {

		return (
			<>
				<nav className='main-nav'>
					<Link className='logo' to='/'>
						<img src={logoSVG} />
					</Link>
					<Switch>
						<Route path='/admin' component={() =>
							<span className='admin-console-label'>Admin Console</span>
						} />
						<Route component={NavbarItems} />
					</Switch>

				</nav>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/admin' component={AdminPage} />
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
}

App.propTypes = {
	children: PropTypes.element
}

function mapStateToProps(state) {
	console.log('state', state)
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		apiActions: bindActionCreators(apiActions, dispatch)
	}
}

export default hot(module)(
	connect(mapStateToProps, mapDispatchToProps)(App)
)
