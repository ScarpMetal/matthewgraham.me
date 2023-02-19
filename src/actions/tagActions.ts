import { SELECT_TAG, FILTER_SELECT_TAG, FILTER_SELECT_ALL_TAGS, FILTER_UNSELECT_ALL_TAGS } from '../global/actionTypes'

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

export function filterSelectAllTags() {
	return {
		type: FILTER_SELECT_ALL_TAGS
	}
}

export function filterUnselectAllTags() {
	return {
		type: FILTER_UNSELECT_ALL_TAGS
	}
}
