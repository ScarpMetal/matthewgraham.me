import { firestore } from 'firebase'
import { db, uploadFBFile, deleteFBFile } from '../firebase'
import {
	FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE,
} from '../global/actionTypes'

const debug = false


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
const asyncFailure = (type, error, payload) => {
	if (debug) console.log({ type, error, payload })
	return { type, error, payload }
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
					tags[doc.id] = { ...data, id: doc.id, selected: true }
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
function createCollectionItem(collectionName, data = {}) {
	if (debug) console.log('createCollectionItem', collectionName, data)
	const upperName = collectionName.toUpperCase().slice(0, -1)
	return dispatch => {
		dispatch(asyncStart(`CREATE_${upperName}_START`))
		return db.collection(collectionName).add(data)
			.then(doc => dispatch(asyncSuccess(`CREATE_${upperName}_SUCCESS`, { ...data, id: doc.id })))
			.catch(err => dispatch(asyncFailure(`CREATE_${upperName}_FAILURE`, err)))
	}
}
export const createTag = data => createCollectionItem('tags', {
	name: 'New Tag',
	color: '#e6e6e6',
	sort_order: Infinity,
	...data
})
export const createProject = data => createCollectionItem('projects', {
	title: 'New Project',
	source_name: '',
	source_url: '',
	date_info: '',
	description: '',
	tags: [],
	images: [],
	sort_order: Infinity,
	...data
})
export const createExperience = data => createCollectionItem('experiences', {
	title: 'New Experience',
	source_name: '',
	source_url: '',
	date_info: '',
	description: '',
	tags: [],
	images: [],
	sort_order: Infinity,
	...data
})


/*
	EDIT Functions
*/
function editCollectionItem(collectionName, id, data) {
	if (debug) console.log('editCollectionItem', collectionName, id, data)
	const upperName = collectionName.toUpperCase().slice(0, -1)
	return dispatch => {
		dispatch(asyncStart(`EDIT_${upperName}_START`, id))
		return db.collection(collectionName).doc(id).update(data)
			.then(() => dispatch(asyncSuccess(`EDIT_${upperName}_SUCCESS`, { id, data })))
			.catch(err => dispatch(asyncFailure(`EDIT_${upperName}_FAILURE`, err)))
	}
}
export const editTag = (id, data) => editCollectionItem('tags', id, data)
export const editProject = (id, data) => editCollectionItem('projects', id, data)
export const editExperience = (id, data) => editCollectionItem('experiences', id, data)

function pushCollectionItem(collectionName, id, data) {
	if (debug) console.log('editCollectionItem', collectionName, id, data)
	const upperName = collectionName.toUpperCase().slice(0, -1)
	return dispatch => {
		dispatch(asyncStart(`EDIT_PUSH_${upperName}_START`, id))
		const fbData = {}
		for (let key in data) {
			fbData[key] = firestore.FieldValue.arrayUnion(data[key])
		}
		return db.collection(collectionName).doc(id).update(fbData)
			.then(() => dispatch(asyncSuccess(`EDIT_PUSH_${upperName}_SUCCESS`, { id, data })))
			.catch(err => dispatch(asyncFailure(`EDIT_PUSH_${upperName}_FAILURE`, err)))
	}
}

/**
 * Atomically edits multiple collection items in the firestore
 * @param {string} collectionName 
 * @param {Object[]} dataItems
 * @param {string} dataItems[].id 
 * @param {string} dataItems[].payload
 */
function batchEditCollectionItems(collectionName, dataItems) {
	if (debug) console.log('batchEditCollectionItems', collectionName, dataItems)
	const upperName = collectionName.toUpperCase()
	return dispatch => {
		dispatch(asyncStart(`BATCH_EDIT_${upperName}_START`))
		const batch = db.batch()
		const collection = db.collection(collectionName)
		dataItems.forEach(({ id, payload }) => {
			batch.update(collection.doc(id), payload)
		})
		//return
		return batch.commit()
			.then(() => dispatch(asyncSuccess(`BATCH_EDIT_${upperName}_SUCCESS`, dataItems)))
			.catch(err => dispatch(asyncFailure(`BATCH_EDIT_${upperName}_FAILURE`, err)))
	}
}

/**
 * Atomically edits multiple tags in the firestore
 * @param {Object[]} dataItems
 * @param {string} dataItems[].id 
 * @param {string} dataItems[].payload
 */
export const batchEditTags = dataItems => batchEditCollectionItems('tags', dataItems)

/**
 * Atomically edits multiple projects in the firestore
 * @param {Object[]} dataItems
 * @param {string} dataItems[].id 
 * @param {string} dataItems[].payload
 */
export const batchEditProjects = dataItems => batchEditCollectionItems('projects', dataItems)

/**
 * Atomically edits multiple experiences in the firestore
 * @param {Object[]} dataItems
 * @param {string} dataItems[].id 
 * @param {string} dataItems[].payload
 */
export const batchEditExperiences = dataItems => batchEditCollectionItems('experiences', dataItems)


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

function deleteCollectionFile(collectionName, path) {
	if (debug) console.log('deleteCollectionFile', path)
	const upperName = collectionName.toUpperCase().slice(0, -1)
	return dispatch => {
		dispatch(asyncStart(`DELETE_${upperName}_FILE_START`))
		return deleteFBFile(path)
			.then(() => dispatch(asyncSuccess(`DELETE_${upperName}_FILE_SUCCESS`)))
			.catch(err => dispatch(asyncFailure(`DELETE_${upperName}_FILE_FAILURE`, err)))
	}
}
export const deleteProjectFile = path => deleteCollectionFile('projects', path)
export const deleteExperienceFile = path => deleteCollectionFile('experiences', path)


/*
	UPLOAD Functions
*/
function uploadCollectionItemImage(collectionName, id, file, callback) {
	if (debug) console.log('uploadCollectionItem', collectionName, file)
	const upperName = collectionName.toUpperCase().slice(0, -1)
	return dispatch => {
		dispatch(asyncStart(`UPLOAD_${upperName}_IMAGE_START`))
		const path = `images/${upperName}-${id}-${Date.now()}-${file.name}`
		return uploadFBFile(path, file)
			.then(snapshot => snapshot.ref.getDownloadURL())
			.then(url => {
				callback({ url, path })
				return dispatch(asyncSuccess(`UPLOAD_${upperName}_IMAGE_SUCCESS`, { id, data: { url, path } }))
				return dispatch(pushCollectionItem(collectionName, id, { images: imageURL }))
			})
			.catch(err => dispatch(asyncFailure(`UPLOAD_${upperName}_IMAGE_FAILURE`, err)))
	}
}
export const uploadProjectImage = (id, file, callback) => uploadCollectionItemImage('projects', id, file, callback)
export const uploadExperienceImage = (id, file, callback) => uploadCollectionItemImage('experiences', id, file, callback)
