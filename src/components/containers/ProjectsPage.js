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
						{this.props.projects.map((proj, i) => <Project key={i} project={proj} />)}
					</div>
				</article>
			</>
		)
	}
}

ProjectsPage.defaultProps = {
	projects: [],
	isLoading: false
}

function mapStateToProps(state) {
	const projects = state.projects.data.filter(project => {
		return !project.tags || project.tags.some(tagName => state.tags.data[tagName].selected)
	})
	return {
		projects: projects,
		isLoading: state.projects.isLoading
	}
}

export default connect(mapStateToProps)(ProjectsPage)
