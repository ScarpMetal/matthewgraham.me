import { db } from '../firebase'

const fetchStart = (type) => ({ type })
const fetchSuccess = (type, payload) => ({ type, payload })
const fetchFailure = (type, error) => ({ type, error })

function fetchCollection(collectionName) {
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

export const fetchTags = () => fetchCollection('tags')
export const fetchProjects = () => fetchCollection('projects')
export const fetchExperiences = () => fetchCollection('experiences')
