import React from 'react'
import { connect } from 'react-redux'

import EditableTag from './EditableTag'
import EditableItem from './EditableItem'
import './AdminPage.scss'

class AdminPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selProject: -1,
			selExperience
		}
	}

	render() {
		const { selProject, selExperience } = this.state
		return (
			<article className='content admin-page'>
				<h1>Tags</h1>
				<div className='editable-tags'>
					{this.props.tags.map((tag, i) => <EditableTag key={i} tag={tag} />)}
					<button onClick={() => { }}>+ Add a Tag</button>
				</div>

				<h1>Projects</h1>
				<div className='editable-projects'>
					{this.props.projects.map((prj, i) => <EditableItem key={i} item={prj} selected={selProject === i} />)}
					<button onClick={() => { }}>+ Add a Project</button>
				</div>

				<h1>Experiences</h1>
				<div className='editable-experiences'>
					{this.props.experiences.map((exp, i) => <EditableItem key={i} item={exp} selected={selExperience === i} />)}
					<button onClick={() => { }}>+ Add an Experience</button>
				</div>
			</article>
		)
	}
}

AdminPage.defaultProps = {
	tags: [],
	projects: [],
	experiences: []
}

function mapStateToProps(state) {
	const tags = []
	for (let tagName in state.tags.data) {
		tags.push(state.tags.data[tagName])
	}
	tags.sort((a, b) => a.sort_order - b.sort_order)

	return {
		tags: tags,
		projects: state.projects.data,
		experiences: state.experiences.data
	}
}

export default connect(mapStateToProps)(AdminPage)

