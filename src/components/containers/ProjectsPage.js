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
				<aside className='timeline-scrollbar'></aside>
				<article className='content'>
					<h1>Projects</h1>
					<TagFilters />
					{this.props.projects.length === 0 &&
						<p style={{
							marginTop: 40,
							fontStyle: 'italic',
							fontSize: 14
						}}>
							{this.props.isLoading ? 'Loading...' : 'No projects found, please select more tags.'}
						</p>
					}
					<div className='projects-wrapper'>
						{this.props.projects.map((proj, i) => <Project key={proj.id} project={proj} />)}
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
		return !project.tags || !project.tags.length || project.tags.some(tagName => state.tags.data[tagName].selected)
	})
	return {
		projects: projects,
		isLoading: state.projects.isLoading
	}
}

export default connect(mapStateToProps)(ProjectsPage)
