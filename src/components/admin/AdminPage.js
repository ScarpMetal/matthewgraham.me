import React from 'react'
import { connect } from 'react-redux'

import EditableTag from './EditableTag'
import EditableItem from './EditableItem'
import {
	createTag, createProject, createExperience,
	editTag, editProject, editExperience,
	deleteTag, deleteProject, deleteExperience,
} from '../../actions/firebaseActions'
import { selectProject, selectExperience } from '../../actions/basicActions'
import './AdminPage.scss'
import produce from 'immer'

class AdminPage extends React.Component {

	render() {
		const { projects, experiences } = this.props
		return (
			<article className='content admin-page'>
				<h1>Tags</h1>
				<div className='editable-tags'>
					{this.props.tags.map((tag, i) => {
						return (
							<EditableTag key={i} tag={tag} />
						)
					})}
				</div>
				<button type='button' className='add-another-button'
					onClick={() => {
						let sort_order = Infinity
						if (this.props.tags) {
							sort_order = this.props.tags[this.props.tags.length - 1].sort_order
						}
						this.props.createTag(sort_order)
					}}
				>+ Add a Tag</button>

				<h1>Projects</h1>
				<div className='editable-projects'>
					{projects.data.map((proj, i) => {
						const selected = projects.selectedIndex === i
						return (
							<EditableItem key={proj.id} item={proj}
								selected={selected}
								isDeleting={selected && projects.isDeleting}
								isEditing={selected && projects.isEditing}
								onSelect={() => { this.props.selectProject(i) }}
								onDelete={e => { e.stopPropagation(); this.props.deleteProject(proj.id) }}
								onSave={data => { this.props.editProject(proj.id, data) }}
								onCancel={() => { this.props.selectProject(-1) }}
							/>
						)
					})}
				</div>
				<button type='button' className='add-another-button' disabled={projects.isCreating}
					onClick={() => {
						let sort_order = Infinity
						if (this.props.projects.data) {
							sort_order = this.props.projects.data[this.props.projects.data.length - 1].sort_order + 1
						}
						this.props.createProject(sort_order)
					}}
				>{projects.isCreating ? 'Creating...' : '+ Add a Project'}</button>

				<h1>Experiences</h1>
				<div className='editable-experiences'>
					{experiences.data.map((exp, i) => {
						const selected = experiences.selectedIndex === i
						return (
							<EditableItem key={exp.id} item={exp}
								selected={selected}
								isDeleting={selected && experiences.isDeleting}
								isEditing={selected && experiences.isEditing}
								onSelect={() => { this.props.selectExperience(i) }}
								onDelete={e => { e.stopPropagation(); this.props.deleteExperience(exp.id) }}
								onSave={data => { this.props.editExperience(exp.id, data) }}
								onCancel={() => { this.props.selectExperience(-1) }}
							/>
						)
					})}
				</div>
				<button type='button' className='add-another-button'
					disabled={experiences.isCreating}
					onClick={() => {
						let sort_order = Infinity
						if (experiences) {
							sort_order = this.props.experiences.data[this.props.experiences.data.length - 1].sort_order + 1
						}
						this.props.createExperience(sort_order)
					}}
				>{experiences.isCreating ? 'Creating...' : '+ Add an Experience'}</button>

			</article>
		)
	}
}

function mapStateToProps(state) {
	const tags = []
	for (let tagName in state.tags.data) {
		tags.push(state.tags.data[tagName])
	}
	tags.sort((a, b) => a.sort_order - b.sort_order)
	console.log('projects', state.projects)
	return {
		tags: tags,
		projects: state.projects,
		experiences: state.experiences,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectProject: index => dispatch(selectProject(index)),
		selectExperience: index => dispatch(selectExperience(index)),
		createTag: sort_order => dispatch(createTag({ sort_order })),
		createProject: sort_order => dispatch(createProject({ sort_order })),
		createExperience: sort_order => dispatch(createExperience({ sort_order })),
		editTag: (id, data) => dispatch(editTag(id, data)),
		editProject: (id, data) => dispatch(editProject(id, data)),
		editExperience: (id, data) => dispatch(editExperience(id, data)),
		deleteTag: tagName => dispatch(deleteTag(tagName)),
		deleteProject: id => dispatch(deleteProject(id)),
		deleteExperience: id => dispatch(deleteExperience(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)

