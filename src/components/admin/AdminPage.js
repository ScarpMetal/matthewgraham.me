import React from 'react'
import { connect } from 'react-redux'


import EditableTag from './EditableTag'
import EditableItem from './EditableItem'
import { selectProject, selectExperience } from '../../actions/basicActions'
import './AdminPage.scss'


class AdminPage extends React.Component {

	render() {
		const { selProject, selExperience } = this.props
		return (
			<article className='content admin-page'>
				<h1>Tags</h1>
				<div className='editable-tags'>
					{this.props.tags.map((tag, i) =>
						<EditableTag key={i} tag={tag} />
					)}
					<button type='button' className='add-another-button' onClick={() => { }}>+ Add a Tag</button>
				</div>

				<h1>Projects</h1>
				<div className='editable-projects'>
					{this.props.projects.map((prj, i) =>
						<EditableItem key={i} item={prj}
							selected={selProject === i}
							onSelect={() => { this.props.selectProject(i) }}
							onSave={() => { }}
							onCancel={() => { this.props.selectProject(-1) }}
						/>
					)}
					<button type='button' className='add-another-button' onClick={() => { }}>+ Add a Project</button>
				</div>

				<h1>Experiences</h1>
				<div className='editable-experiences'>
					{this.props.experiences.map((exp, i) =>
						<EditableItem key={i} item={exp}
							selected={selExperience === i}
							onSelect={() => { this.props.selectExperience(i) }}
							onSave={() => { }}
							onCancel={() => { this.props.selectExperience(-1) }}
						/>
					)}
					<button type='button' className='add-another-button' onClick={() => { }}>+ Add an Experience</button>
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
		selProject: state.projects.selectedIndex,
		experiences: state.experiences.data,
		selExperience: state.experiences.selectedIndex
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectProject: index => dispatch(selectProject(index)),
		selectExperience: index => dispatch(selectExperience(index))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)

