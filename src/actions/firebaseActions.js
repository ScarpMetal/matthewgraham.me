import { db } from '../firebase'

const fetchStart = (type) => ({ type })
const fetchSuccess = (type, payload) => ({ type, payload })
const fetchFailure = (type, error) => ({ type, error })

function fetchCollectionArray(collectionName) {
	const upperName = collectionName.toUpperCase()
	return dispatch => {
		dispatch(fetchStart(`FETCH_${upperName}_START`))
		return db.collection(collectionName).get()
			.then(qs => {
				const data = []
				qs.forEach(doc => {
					data.push(doc.data())
				})
				return dispatch(fetchSuccess(`FETCH_${upperName}_SUCCESS`, { data }))
			})
			.catch(err => dispatch(fetchFailure(`FETCH_${upperName}_FAILURE`, err)))
	}
}

export const fetchProjects = () => fetchCollectionArray('projects')
export const fetchExperiences = () => fetchCollectionArray('experiences')

export function fetchTags() {
	return dispatch => {
		dispatch(fetchStart(`FETCH_TAGS_START`))
		return db.collection('tags').get()
			.then(qs => {
				const tags = {}
				qs.forEach(doc => {
					tags[doc.id] = { ...doc.data(), selected: true }
				})
				return dispatch(fetchSuccess(`FETCH_TAGS_SUCCESS`, { tags }))
			})
			.catch(err => dispatch(fetchFailure(`FETCH_TAGS_FAILURE`, err)))
	}
}

export function addTag(data) {
	//return func
}
