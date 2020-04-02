import React from 'react'
import { connect } from 'react-redux'

import SocialSidebar from '../SocialSidebar'
import TagFilters from './TagFilters'
import Project from '../Project'

import './ProjectsPage.scss'

class ProjectsPage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<SocialSidebar />
				<aside className='timeline-scrollbar'>Timeline Scrollbar</aside>
				<article className='content'>
					<h1>Projects</h1>
					<TagFilters />

					<div className='projects-wrapper'>
						<Project project={{ images: ['hi', 'yeah'] }} />
						<Project project={{ images: [] }} />
						<Project project={{ images: [] }} />
						<Project project={{ images: ['hi', 'yeah', 'okay'] }} />
						<Project project={{ images: [] }} />
						<Project project={{ images: ['hi', 'yeah'] }} />
					</div>
				</article>
			</>
		)
	}
}

function mapStateToProps(props) {
	return {}
}

export default connect(mapStateToProps)(ProjectsPage)
