import produce from 'immer'

import {
	FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE,
	CREATE_TAG_START, CREATE_TAG_SUCCESS, CREATE_TAG_FAILURE,
	EDIT_TAG_START, EDIT_TAG_SUCCESS, EDIT_TAG_FAILURE,
	DELETE_TAG_START, DELETE_TAG_SUCCESS, DELETE_TAG_FAILURE,

	FETCH_PROJECTS_START, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
	CREATE_PROJECT_START, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
	EDIT_PROJECT_START, EDIT_PROJECT_SUCCESS, EDIT_PROJECT_FAILURE,
	DELETE_PROJECT_START, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE,

	FETCH_EXPERIENCES_START, FETCH_EXPERIENCES_SUCCESS, FETCH_EXPERIENCES_FAILURE,
	CREATE_EXPERIENCE_START, CREATE_EXPERIENCE_SUCCESS, CREATE_EXPERIENCE_FAILURE,
	EDIT_EXPERIENCE_START, EDIT_EXPERIENCE_SUCCESS, EDIT_EXPERIENCE_FAILURE,
	DELETE_EXPERIENCE_START, DELETE_EXPERIENCE_SUCCESS, DELETE_EXPERIENCE_FAILURE,

	SELECT_TAG, FILTER_SELECT_TAG,
	SELECT_PROJECT, SELECT_EXPERIENCE,

} from '../global/actionTypes'
import initialState from './initialState'

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export const tagsReducer = produce((draft, action) => {
	switch (action.type) {
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

		case EDIT_TAG_START:
			draft.isEditing = true
			break

		case EDIT_TAG_SUCCESS:
			draft.isEditing = false
			const { data, id } = action.payload
			draft.data[id] = { ...draft.data[id], ...data }
			break

		case EDIT_TAG_FAILURE:
			draft.isEditing = false
			draft.error = action.error
			break

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

		case FILTER_SELECT_TAG:
			draft.data[action.payload].selected = !draft.data[action.payload].selected
			break

		case SELECT_TAG:
			draft.selectedTagId = action.payload ? action.payload : null
			break
	}
}, initialState.tags)

export const projectsReducer = produce((draft, action) => {
	switch (action.type) {
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

		case EDIT_PROJECT_START:
			draft.isEditing = true
			break

		case EDIT_PROJECT_SUCCESS:
			draft.isEditing = false
			const projectIndex = draft.data.findIndex(proj => proj.id === action.payload.id)
			draft.data[projectIndex] = { ...draft.data[projectIndex], ...action.payload.data }
			break

		case EDIT_PROJECT_FAILURE:
			draft.isEditing = false
			draft.error = action.error
			break

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

		case SELECT_PROJECT:
			draft.selectedIndex = action.payload !== draft.selectedIndex ? action.payload : -1
			break
	}
}, initialState.projects)

export const experiencesReducer = produce((draft, action) => {
	switch (action.type) {
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

		case EDIT_EXPERIENCE_START:
			draft.isEditing = true
			break

		case EDIT_EXPERIENCE_SUCCESS:
			draft.isEditing = false
			const experienceIndex = draft.data.findIndex(exp => exp.id === action.payload.id)
			draft.data[experienceIndex] = { ...draft.data[experienceIndex], ...action.payload.data }
			break

		case EDIT_EXPERIENCE_FAILURE:
			draft.isEditing = false
			draft.error = action.error
			break

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

		case SELECT_EXPERIENCE:
			draft.selectedIndex = action.payload !== draft.selectedIndex ? action.payload : -1
			break
	}
}, initialState.experiences)
