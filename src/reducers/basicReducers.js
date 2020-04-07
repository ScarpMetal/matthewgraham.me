import produce from 'immer'

import {
	FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE,
	FETCH_PROJECTS_START, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
	FETCH_EXPERIENCES_START, FETCH_EXPERIENCES_SUCCESS, FETCH_EXPERIENCES_FAILURE,
	SELECT_TAG, SELECT_PROJECT, SELECT_EXPERIENCE
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

		case SELECT_TAG:
			draft.data[action.payload].selected = !draft.data[action.payload].selected
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

		case SELECT_EXPERIENCE:
			draft.selectedIndex = action.payload !== draft.selectedIndex ? action.payload : -1
			break
	}
}, initialState.experiences)
