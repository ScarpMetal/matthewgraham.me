import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import EditableTag from './EditableTag'
import EditableItem from './EditableItem'
import {
	createTag, createProject, createExperience,
	editTag, editProject, editExperience,
	batchEditTags, batchEditProjects, batchEditExperiences,
	deleteTag, deleteProject, deleteExperience, uploadExperienceImage,
	deleteProjectFile, deleteExperienceFile,
	uploadProjectImage
} from '../../actions/firebaseActions'
import { requestLoginPopup, fetchUser } from '../../firebase'
import { selectProject, selectExperience } from '../../actions/basicActions'
import { reorderItems } from '../../global/utils'
import './AdminPage.scss'

class AdminPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			user: 'Loading'
		}

		this.handleGoogleLogin = this.handleGoogleLogin.bind(this)
		this.handleTagsReorder = this.handleTagsReorder.bind(this)
		this.handleProjectsReorder = this.handleProjectsReorder.bind(this)
		this.handleExperiencesReorder = this.handleExperiencesReorder.bind(this)
	}

	componentDidMount() {
		fetchUser(user => this.setState({ user }))
	}

	handleGoogleLogin() {
		requestLoginPopup()
			.then(user => this.setState({ user }))
			.catch(err => console.error(err))
	}

	render() {
		const { sortedTags, tags, projects, experiences } = this.props
		const { user } = this.state

		return (
			<article className='content admin-page'>
				{!user && <button onClick={this.handleGoogleLogin}>Google Sign-In</button>}
				{user === 'Loading' && <p>Loading Credentials...</p>}
				{user && user.hasOwnProperty('admin') && !user.admin && <p>You are not authorized to view this page.</p>}
				{user && user.admin && <>
					<h1>Tags</h1>
					{tags.isBatchEditing && <p className='loading-list loading-tags'>Saving...</p>}
					<DragDropContext onDragEnd={this.handleTagsReorder}>
						<Droppable
							droppableId='admin-tags-list'
							type='tags'
							direction='horizontal'
						>
							{provided =>
								<div
									className='editable-tags-wrapper'
								>
									<ul
										className={`editable-tags ${tags.isBatchEditing ? 'loading' : ''}`}
										ref={provided.innerRef}
									>
										{sortedTags.map(tag => {
											return (
												<EditableTag
													key={tag.id}
													tag={tag}
													onDelete={() => { this.props.deleteTag(tag.id) }}
													onSave={data => { this.props.editTag(tag.id, data) }}
												/>
											)
										})}
										{provided.placeholder}
									</ul>
									<button type='button' className='add-another-button' key='add-tag-button'
										disabled={tags.isCreating}
										onClick={() => {
											let sortOrder = Infinity
											if (tags) {
												// Find the max sort_order in the tags data
												let maxSortOrder = 0
												for (let id in tags.data) {
													const tagSortOrder = tags.data[id].sort_order
													if (tagSortOrder > maxSortOrder) maxSortOrder = tagSortOrder
												}
												sortOrder = maxSortOrder + 1
											}
											this.props.createTag(sortOrder)
										}}
									>{tags.isCreating ? 'Creating...' : '+ Add a Tag'}</button>
								</div>
							}
						</Droppable>
					</DragDropContext>

					<h1>Projects</h1>
					{projects.isBatchEditing && <p className='loading-list'>Saving...</p>}
					<DragDropContext onDragEnd={this.handleProjectsReorder}>
						<Droppable droppableId='admin-projects-list' type='projects'>
							{provided =>
								<div
									className={`editable-projects ${projects.isBatchEditing ? 'loading' : ''}`}
									ref={provided.innerRef}
								>
									{projects.data.map((proj, i) => {
										const selected = projects.selectedIndex === i
										return (
											<EditableItem
												key={proj.id}
												item={proj}
												selected={selected}
												isDeleting={selected && projects.isDeleting}
												isEditing={selected && projects.isEditing}
												isUploading={selected && projects.isUploading}
												onSelect={() => { this.props.selectProject(i) }}
												onDelete={e => { e.stopPropagation(); this.props.deleteProject(proj.id) }}
												onSave={data => { this.props.editProject(proj.id, data) }}
												onCancel={() => { this.props.selectProject(-1) }}
												onUpload={(file, callback) => { this.props.uploadProjectImage(proj.id, file, callback) }}
												deleteFile={path => { this.props.deleteProjectFile(path) }}
											/>
										)
									})}
									{provided.placeholder}
								</div>
							}
						</Droppable>
					</DragDropContext>
					<button type='button' className='add-another-button' key='add-project-button'
						disabled={projects.isCreating}
						onClick={() => {
							let sortOrder = Infinity
							if (projects) {
								sortOrder = projects.data[projects.data.length - 1].sort_order + 1
							}
							this.props.createProject(sortOrder)
						}}
					>{projects.isCreating ? 'Creating...' : '+ Add a Project'}</button>

					<h1>Experiences</h1>
					{experiences.isBatchEditing && <p className='loading-list'>Saving...</p>}
					<DragDropContext onDragEnd={this.handleExperiencesReorder}>
						<Droppable droppableId='admin-experiences-list' type='experiences'>
							{provided =>
								<div
									className={`editable-experiences ${experiences.isBatchEditing ? 'loading' : ''}`}
									ref={provided.innerRef}
								>
									{experiences.data.map((exp, index) => {
										const selected = experiences.selectedIndex === index
										return (
											<EditableItem
												key={exp.id}
												item={exp}
												selected={selected}
												isDeleting={selected && experiences.isDeleting}
												isEditing={selected && experiences.isEditing}
												isUploading={selected && experiences.isUploading}
												onSelect={() => { this.props.selectExperience(index) }}
												onDelete={e => { e.stopPropagation(); this.props.deleteExperience(exp.id) }}
												onSave={data => { this.props.editExperience(exp.id, data) }}
												onCancel={() => { this.props.selectExperience(-1) }}
												onUpload={(file, callback) => { this.props.uploadExperienceImage(exp.id, file, callback) }}
												deleteFile={path => { this.props.deleteExperienceImage(path) }}
											/>
										)
									})}
									{provided.placeholder}
								</div>
							}

						</Droppable>
					</DragDropContext>
					<button type='button' className='add-another-button' key='add-experience-button'
						disabled={experiences.isCreating}
						onClick={() => {
							let sortOrder = Infinity
							if (experiences) {
								sortOrder = experiences.data[experiences.data.length - 1].sort_order + 1
							}
							this.props.createExperience(sortOrder)
						}}
					>{experiences.isCreating ? 'Creating...' : '+ Add an Experience'}</button>
				</>}
			</article >
		)
	}

	handleTagsReorder({ source, destination }) {
		const { sortedTags } = this.props
		const sortedItems = reorderItems([...sortedTags], source.index, destination.index)
		const dataItems = getSortOrderChanges(sortedItems)

		this.props.batchEditTags(dataItems)
	}

	handleProjectsReorder({ source, destination }) {
		const { projects } = this.props
		const sortedItems = reorderItems([...projects.data], source.index, destination.index)
		const dataItems = getSortOrderChanges(sortedItems)

		this.props.batchEditProjects(dataItems)
	}

	handleExperiencesReorder({ source, destination }) {
		const { experiences } = this.props
		const sortedItems = reorderItems([...experiences.data], source.index, destination.index)
		const dataItems = getSortOrderChanges(sortedItems)

		this.props.batchEditExperiences(dataItems)
	}
}

/**
 * Gets only the changes to sort_order for each item in the array
 * @param {Object[]} sortedItems
 * @param {string} sortedItems[].id
 * @param {number} sortedItems[].sort_order 
 * 
 * @returns an array of batch edits to make to item's sort_orders
 */
function getSortOrderChanges(sortedItems) {
	return sortedItems
		.map((item, index) => ({ id: item.id, original_sort_order: item.sort_order, sort_order: index }))
		.filter(({ original_sort_order, sort_order }) => original_sort_order !== sort_order)
		.map(({ id, sort_order }) => ({ id, payload: { sort_order } }))
}

function mapStateToProps(state) {
	const sortedTags = []
	for (let id in state.tags.data) {
		sortedTags.push(state.tags.data[id])
	}
	sortedTags.sort((a, b) => a.sort_order - b.sort_order)

	return {
		sortedTags: sortedTags,
		tags: state.tags,
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
		batchEditTags: dataItems => dispatch(batchEditTags(dataItems)),
		batchEditProjects: dataItems => dispatch(batchEditProjects(dataItems)),
		batchEditExperiences: dataItems => dispatch(batchEditExperiences(dataItems)),
		deleteTag: id => dispatch(deleteTag(id)),
		deleteProject: id => dispatch(deleteProject(id)),
		deleteExperience: id => dispatch(deleteExperience(id)),
		deleteProjectFile: path => dispatch(deleteProjectFile(path)),
		deleteExperienceFile: path => dispatch(deleteExperienceFile(path)),
		uploadProjectImage: (id, file, callback) => dispatch(uploadProjectImage(id, file, callback)),
		uploadExperienceImage: (id, file, callback) => dispatch(uploadExperienceImage(id, file, callback)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)

