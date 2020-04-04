import objectAssign from 'object-assign'
import produce from 'immer'

import {
	FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE,
	FETCH_PROJECTS_START, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
	FETCH_EXPERIENCES_START, FETCH_EXPERIENCES_SUCCESS, FETCH_EXPERIENCES_FAILURE,
	SELECT_TAG
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

export function projectsReducer(state = initialState.projects, action) {
	let newState
	switch (action.type) {
		case FETCH_PROJECTS_START:
			return objectAssign({}, state, { isLoading: true })

		case FETCH_PROJECTS_SUCCESS:
			newState = objectAssign({}, state)
			newState.isLoading = false
			newState.data = action.payload.data
			return newState

		case FETCH_PROJECTS_FAILURE:
			newState = objectAssign({}, state)
			newState.isLoading = false
			newState.error = action.error
			return newState

		default:
			return state
	}
}

export function experiencesReducer(state = initialState.experiences, action) {
	let newState

	switch (action.type) {
		case FETCH_EXPERIENCES_START:
			return objectAssign({}, state, { isLoading: true })

		case FETCH_EXPERIENCES_SUCCESS:
			newState = objectAssign({}, state)
			newState.isLoading = false
			newState.data = action.payload.data
			return newState

		case FETCH_EXPERIENCES_FAILURE:
			newState = objectAssign({}, state)
			newState.isLoading = false
			newState.error = action.error
			return newState

		default:
			return state
	}
}
