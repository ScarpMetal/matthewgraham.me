import { SELECT_TAG, ADD_TAG } from '../global/actionTypes'

export function selectTag(tagName) {
	return {
		type: SELECT_TAG,
		payload: tagName
	}
}
