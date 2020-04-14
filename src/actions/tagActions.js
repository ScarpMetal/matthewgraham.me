import { SELECT_TAG, FILTER_SELECT_TAG } from '../global/actionTypes'

export function selectTag(id) {
	return {
		type: SELECT_TAG,
		payload: id
	}
}

export function filterSelectTag(id) {
	return {
		type: FILTER_SELECT_TAG,
		payload: id
	}
}
