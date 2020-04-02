import React from 'react'
import { connect } from 'react-redux'

import Project from '../Project'

class ProjectsPage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<aside className='timeline-scrollbar'>Timeline Scrollbar</aside>
				<article className='content'>
					<h1>Projects</h1>
					<ul>
						<li>Featured</li>
						<li>Javascript</li>
						<li>Java</li>
						<li>Python</li>
					</ul>
					<div>
						<Project />
						<Project />
						<Project />
						<Project />
						<Project />
						<Project />
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
