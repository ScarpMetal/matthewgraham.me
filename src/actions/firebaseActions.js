import { db } from '../firebase'
import {
	FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE,
	CREATE_TAG_START, CREATE_TAG_SUCCESS, CREATE_TAG_FAILURE,
	EDIT_TAG_START, EDIT_TAG_SUCCESS, EDIT_TAG_FAILURE,
	DELETE_TAG_START, DELETE_TAG_SUCCESS, DELETE_TAG_FAILURE,
} from '../global/actionTypes'

const debug = true
/* 
	Generic Action Types for Async Actions 
*/
const asyncStart = (type, payload) => {
	if (debug) console.log({ type, payload })
	return { type, payload }
}
const asyncSuccess = (type, payload) => {
	if (debug) console.log({ type, payload })
	return { type, payload }
}
const asyncFailure = (type, error) => {
	if (debug) console.log({ type, error })
	return { type, error }
}


/* 
	FETCH Functions 
*/
export function fetchTags() {
	return dispatch => {
		dispatch(asyncStart(FETCH_TAGS_START))
		return db.collection('tags').get()
			.then(qs => {
				const tags = {}
				qs.forEach(doc => {
					const data = doc.data()
					tags[data.name] = { ...data, id: doc.id, selected: true }
				})
				return dispatch(asyncSuccess(FETCH_TAGS_SUCCESS, { tags }))
			})
			.catch(err => dispatch(asyncFailure(FETCH_TAGS_FAILURE, err)))
	}
}

function fetchCollectionArray(collectionName) {
	const upperName = collectionName.toUpperCase()
	return dispatch => {
		dispatch(asyncStart(`FETCH_${upperName}_START`))
		return db.collection(collectionName).orderBy('sort_order').get()
			.then(qs => {
				const data = []
				qs.forEach(doc => {
					data.push({ ...doc.data(), id: doc.id })
				})
				return dispatch(asyncSuccess(`FETCH_${upperName}_SUCCESS`, { data }))
			})
			.catch(err => dispatch(asyncFailure(`FETCH_${upperName}_FAILURE`, err)))
	}
}

export const fetchProjects = () => fetchCollectionArray('projects')
export const fetchExperiences = () => fetchCollectionArray('experiences')


/* 
	CREATE Functions 
*/
export function createTag(data = {}) {
	if (debug) console.log('createTag', data)
	return dispatch => {
		dispatch(asyncStart(CREATE_TAG_START))
		const newDoc = {
			name: 'New Tag',
			color: '#e6e6e6',
			sort_order: Infinity,
			...data
		}
		return db.collection('tags').add(newDoc)
			.then(doc => dispatch(asyncSuccess(CREATE_TAG_SUCCESS, { ...newDoc, id: doc.id })))
			.catch(err => dispatch(asyncFailure(CREATE_TAG_FAILURE, err)))
	}
}

function createCollectionItem(collectionName, data = {}) {
	if (debug) console.log('createCollectionItem', collectionName, data)
	const upperName = collectionName.toUpperCase().slice(0, -1)
	return dispatch => {
		dispatch(asyncStart(`CREATE_${upperName}_START`))
		const newDoc = {
			title: 'New Item',
			source_name: '',
			source_url: '',
			date_info: '',
			description: '',
			tags: [],
			images: [],
			sort_order: Infinity,
			...data
		}
		return db.collection(collectionName).add(newDoc)
			.then(doc => dispatch(asyncSuccess(`CREATE_${upperName}_SUCCESS`, { ...newDoc, id: doc.id })))
			.catch(err => dispatch(asyncFailure(`CREATE_${upperName}_FAILURE`, err)))
	}
}

export const createProject = data => createCollectionItem('projects', data)
export const createExperience = data => createCollectionItem('experiences', data)

/*
	EDIT Functions
*/
function editCollectionItem(collectionName, id, data) {
	if (debug) console.log('editCollectionItem', collectionName, id, data)
	const upperName = collectionName.toUpperCase().slice(0, -1)
	return dispatch => {
		dispatch(asyncStart(`EDIT_${upperName}_START`, id))
		return db.collection(collectionName).doc(id).set(data)
			.then(() => dispatch(asyncSuccess(`EDIT_${upperName}_SUCCESS`, { id, data })))
			.catch(err => dispatch(asyncFailure(`EDIT_${upperName}_FAILURE`, err)))
	}
}
export const editTag = (id, data) => editCollectionItem('tags', id, data)
export const editProject = (id, data) => editCollectionItem('projects', id, data)
export const editExperience = (id, data) => editCollectionItem('experiences', id, data)


/* 
	DELETE Functions
*/
function deleteCollectionItem(collectionName, id) {
	if (debug) console.log('deleteCollectionItem', collectionName, id)
	const upperName = collectionName.toUpperCase().slice(0, -1)
	return dispatch => {
		dispatch(asyncStart(`DELETE_${upperName}_START`, id))
		return db.collection(collectionName).doc(id).delete()
			.then(() => dispatch(asyncSuccess(`DELETE_${upperName}_SUCCESS`, id)))
			.catch(err => dispatch(asyncFailure(`DELETE_${upperName}_FAILURE`, err)))
	}
}

export const deleteTag = id => deleteCollectionItem('tags', id)
export const deleteProject = id => deleteCollectionItem('projects', id)
export const deleteExperience = id => deleteCollectionItem('experiences', id)

