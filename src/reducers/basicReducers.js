import produce from 'immer'

import {
	FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE,
	CREATE_TAG_START, CREATE_TAG_SUCCESS, CREATE_TAG_FAILURE,
	EDIT_TAG_START, EDIT_TAG_SUCCESS, EDIT_TAG_FAILURE,
	BATCH_EDIT_TAGS_START, BATCH_EDIT_TAGS_SUCCESS, BATCH_EDIT_TAGS_FAILURE,
	DELETE_TAG_START, DELETE_TAG_SUCCESS, DELETE_TAG_FAILURE,

	FETCH_PROJECTS_START, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
	CREATE_PROJECT_START, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
	EDIT_PROJECT_START, EDIT_PROJECT_SUCCESS, EDIT_PROJECT_FAILURE,
	EDIT_PUSH_PROJECT_START, EDIT_PUSH_PROJECT_SUCCESS, EDIT_PUSH_PROJECT_FAILURE,
	BATCH_EDIT_PROJECTS_START, BATCH_EDIT_PROJECTS_SUCCESS, BATCH_EDIT_PROJECTS_FAILURE,
	DELETE_PROJECT_START, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE,
	DELETE_PROJECT_FILE_START, DELETE_PROJECT_FILE_SUCCESS, DELETE_PROJECT_FILE_FAILURE,
	UPLOAD_PROJECT_IMAGE_START, UPLOAD_PROJECT_IMAGE_SUCCESS, UPLOAD_PROJECT_IMAGE_FAILURE,

	FETCH_EXPERIENCES_START, FETCH_EXPERIENCES_SUCCESS, FETCH_EXPERIENCES_FAILURE,
	CREATE_EXPERIENCE_START, CREATE_EXPERIENCE_SUCCESS, CREATE_EXPERIENCE_FAILURE,
	EDIT_EXPERIENCE_START, EDIT_EXPERIENCE_SUCCESS, EDIT_EXPERIENCE_FAILURE,
	EDIT_PUSH_EXPERIENCE_START, EDIT_PUSH_EXPERIENCE_SUCCESS, EDIT_PUSH_EXPERIENCE_FAILURE,
	BATCH_EDIT_EXPERIENCES_START, BATCH_EDIT_EXPERIENCES_SUCCESS, BATCH_EDIT_EXPERIENCES_FAILURE,
	DELETE_EXPERIENCE_START, DELETE_EXPERIENCE_SUCCESS, DELETE_EXPERIENCE_FAILURE,
	DELETE_EXPERIENCE_FILE_START, DELETE_EXPERIENCE_FILE_SUCCESS, DELETE_EXPERIENCE_FILE_FAILURE,
	UPLOAD_EXPERIENCE_IMAGE_START, UPLOAD_EXPERIENCE_IMAGE_SUCCESS, UPLOAD_EXPERIENCE_IMAGE_FAILURE,

	SELECT_TAG, FILTER_SELECT_TAG,
	SELECT_PROJECT, SELECT_EXPERIENCE,

} from '../global/actionTypes'
import initialState from './initialState'


/*
	Tags Reducer
*/
export const tagsReducer = produce((draft, action) => {
	switch (action.type) {
		// Fetch
		case FETCH_TAGS_START:
			draft.isLoading = true
			break

		case FETCH_TAGS_SUCCESS:
			draft.isLoading = false
			draft.data = action.payload.tags
			break

		case FETCH_TAGS_FAILURE:
			draft.isLoading = false
			draft.error = action.error
			break

		// Create
		case CREATE_TAG_START:
			draft.isCreating = true
			break

		case CREATE_TAG_SUCCESS:
			draft.isCreating = false
			draft.selectedTagId = action.payload.id
			draft.data[action.payload.id] = action.payload
			break

		case CREATE_TAG_FAILURE:
			draft.isCreating = false
			draft.error = action.error
			break

		// Edit
		case EDIT_TAG_START:
			draft.isEditing = true
			break

		case EDIT_TAG_SUCCESS:
			draft.isEditing = false
			let { data, id } = action.payload
			draft.data[id] = { ...draft.data[id], ...data }
			break

		case EDIT_TAG_FAILURE:
			draft.isEditing = false
			draft.error = action.error
			break

		// Batch Edit
		case BATCH_EDIT_TAGS_START:
			draft.isBatchEditing = true
			break

		case BATCH_EDIT_TAGS_SUCCESS:
			draft.isBatchEditing = false
			action.payload.forEach(({ id, payload }) => {
				draft.data[id] = { ...draft.data[id], ...payload }
			})
			break

		case BATCH_EDIT_TAGS_FAILURE:
			draft.isBatchEditing = false
			draft.error = action.error
			break

		// Delete
		case DELETE_TAG_START:
			draft.isDeleting = true
			break

		case DELETE_TAG_SUCCESS:
			draft.isDeleting = false
			delete draft.data[action.payload]
			break

		case DELETE_TAG_FAILURE:
			draft.isDeleting = false
			draft.error = action.error
			break

		// Select
		case FILTER_SELECT_TAG:
			draft.data[action.payload].selected = !draft.data[action.payload].selected
			break

		case SELECT_TAG:
			draft.selectedTagId = action.payload ? action.payload : null
			break
	}
}, initialState.tags)


/*
	Projects Reducer
*/
export const projectsReducer = produce((draft, action) => {
	let project, projectIndex

	switch (action.type) {
		// Fetch
		case FETCH_PROJECTS_START:
			draft.isLoading = true
			break

		case FETCH_PROJECTS_SUCCESS:
			draft.isLoading = false
			draft.data = action.payload.data
			break

		case FETCH_PROJECTS_FAILURE:
			draft.isLoading = false
			draft.error = action.error
			break

		// Create
		case CREATE_PROJECT_START:
			draft.isCreating = true
			break

		case CREATE_PROJECT_SUCCESS:
			draft.isCreating = false
			draft.data.push(action.payload)
			break

		case CREATE_PROJECT_FAILURE:
			draft.isCreating = false
			draft.error = action.error
			break

		// Edit
		case EDIT_PROJECT_START:
		case EDIT_PUSH_PROJECT_START:
			draft.isEditing = true
			break

		case EDIT_PROJECT_SUCCESS:
			draft.isEditing = false
			projectIndex = draft.data.findIndex(proj => proj.id === action.payload.id)
			draft.data[projectIndex] = { ...draft.data[projectIndex], ...action.payload.data }
			draft.data.sort((a, b) => a.sort_order - b.sort_order)
			break

		case EDIT_PUSH_PROJECT_SUCCESS:
			draft.isEditing = false
			projectIndex = draft.data.findIndex(proj => proj.id === action.payload.id)
			for (let key in action.payload.data) {
				draft.data[projectIndex][key] = [...draft.data[projectIndex][key], action.payload.data[key]]
			}
			break

		case EDIT_PROJECT_FAILURE:
		case EDIT_PUSH_PROJECT_FAILURE:
			draft.isEditing = false
			draft.error = action.error
			break

		// Batch Edit
		case BATCH_EDIT_PROJECTS_START:
			draft.isBatchEditing = true
			break

		case BATCH_EDIT_PROJECTS_SUCCESS:
			draft.isBatchEditing = false
			action.payload.forEach(({ id, payload }) => {
				const projectIndex = draft.data.findIndex(proj => proj.id === id)
				draft.data[projectIndex] = { ...draft.data[projectIndex], ...payload }
			})
			draft.data.sort((a, b) => a.sort_order - b.sort_order)
			break

		case BATCH_EDIT_PROJECTS_FAILURE:
			draft.isBatchEditing = false
			draft.error = action.error
			break

		// Delete
		case DELETE_PROJECT_START:
			draft.isDeleting = true
			draft.selectedIndex = draft.data.findIndex(proj => proj.id === action.payload)
			break

		case DELETE_PROJECT_SUCCESS:
			draft.isDeleting = false
			draft.data.splice(draft.data.findIndex(proj => proj.id === action.payload), 1)
			draft.selectedIndex = -1
			break

		case DELETE_PROJECT_FAILURE:
			draft.isDeleting = false
			draft.error = action.error
			break

		case DELETE_PROJECT_FILE_START:
			draft.isEditing = true
			break

		case DELETE_PROJECT_FILE_SUCCESS:
			draft.isEditing = false
			break

		case DELETE_PROJECT_FILE_FAILURE:
			draft.isEditing = false
			draft.error = action.error
			break

		// Upload
		case UPLOAD_PROJECT_IMAGE_START:
			draft.isUploading = true
			break

		case UPLOAD_PROJECT_IMAGE_SUCCESS:
			draft.isUploading = false
			break

		case UPLOAD_PROJECT_IMAGE_FAILURE:
			draft.isUploading = false
			draft.error = action.payload.error

		// Select
		case SELECT_PROJECT:
			draft.selectedIndex = action.payload !== draft.selectedIndex ? action.payload : -1
			break
	}
}, initialState.projects)


/*
	Experiences Reducer
*/
export const experiencesReducer = produce((draft, action) => {
	let experience, experienceIndex

	switch (action.type) {
		// Fetch
		case FETCH_EXPERIENCES_START:
			draft.isLoading = true
			break

		case FETCH_EXPERIENCES_SUCCESS:
			draft.isLoading = false
			draft.data = action.payload.data
			break

		case FETCH_EXPERIENCES_FAILURE:
			draft.isLoading = false
			draft.error = action.error
			break

		// Create
		case CREATE_EXPERIENCE_START:
			draft.isCreating = true
			break

		case CREATE_EXPERIENCE_SUCCESS:
			draft.isCreating = false
			draft.data.push(action.payload)
			break

		case CREATE_EXPERIENCE_FAILURE:
			draft.isCreating = false
			draft.error = action.error
			break

		// Edit
		case EDIT_EXPERIENCE_START:
		case EDIT_PUSH_EXPERIENCE_START:
			draft.isEditing = true
			break

		case EDIT_EXPERIENCE_SUCCESS:
			draft.isEditing = false
			experienceIndex = draft.data.findIndex(exp => exp.id === action.payload.id)
			draft.data[experienceIndex] = { ...draft.data[experienceIndex], ...action.payload.data }
			draft.data.sort((a, b) => a.sort_order - b.sort_order)
			break

		case EDIT_PUSH_EXPERIENCE_SUCCESS:
			draft.isEditing = false
			experience = draft.data.find(exp => exp.id === action.payload.id)
			for (let key in action.payload.data) {
				experience[key] = [...experience[key], action.payload.data[key]]
			}
			break

		case EDIT_EXPERIENCE_FAILURE:
		case EDIT_PUSH_EXPERIENCE_FAILURE:
			draft.isEditing = false
			draft.error = action.error
			break

		// Batch Edit
		case BATCH_EDIT_EXPERIENCES_START:
			draft.isBatchEditing = true
			break

		case BATCH_EDIT_EXPERIENCES_SUCCESS:
			draft.isBatchEditing = false
			action.payload.forEach(({ id, payload }) => {
				const experienceIndex = draft.data.findIndex(exp => exp.id === id)
				draft.data[experienceIndex] = { ...draft.data[experienceIndex], ...payload }
			})
			draft.data.sort((a, b) => a.sort_order - b.sort_order)
			break

		case BATCH_EDIT_EXPERIENCES_FAILURE:
			draft.isBatchEditing = false
			draft.error = action.error
			break

		// Delete
		case DELETE_EXPERIENCE_START:
			draft.isDeleting = true
			draft.selectedIndex = draft.data.findIndex(exp => exp.id === action.payload)
			break

		case DELETE_EXPERIENCE_SUCCESS:
			draft.isDeleting = false
			draft.data.splice(draft.data.findIndex(project => project.id === action.payload), 1)
			draft.selectedIndex = -1
			break

		case DELETE_EXPERIENCE_FAILURE:
			draft.isDeleting = false
			draft.error = action.error
			break

		case DELETE_EXPERIENCE_FILE_START:
			draft.isEditing = true
			break

		case DELETE_EXPERIENCE_FILE_SUCCESS:
			draft.isEditing = false
			break

		case DELETE_EXPERIENCE_FILE_FAILURE:
			draft.isEditing = false
			draft.error = action.error
			break

		// Upload
		case UPLOAD_EXPERIENCE_IMAGE_START:
			draft.isUploading = true
			break

		case UPLOAD_EXPERIENCE_IMAGE_SUCCESS:
			draft.isUploading = false
			experience = draft.data.find(exp => exp.id === action.payload.id)
			experience.images.push(action.payload.imageURL)
			break

		case UPLOAD_EXPERIENCE_IMAGE_FAILURE:
			draft.isUploading = false
			draft.error = action.payload.error

		// Select
		case SELECT_EXPERIENCE:
			draft.selectedIndex = action.payload !== draft.selectedIndex ? action.payload : -1
			break
	}
}, initialState.experiences)
