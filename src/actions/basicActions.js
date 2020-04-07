import { SELECT_PROJECT, SELECT_EXPERIENCE } from '../global/actionTypes'

export function selectProject(index) {
	return {
		type: SELECT_PROJECT,
		payload: index
	}
}

export function selectExperience(index) {
	return {
		type: SELECT_EXPERIENCE,
		payload: index
	}
}
