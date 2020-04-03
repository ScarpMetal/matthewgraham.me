import { combineReducers } from 'redux'
import { tagsReducer, projectsReducer, experiencesReducer } from './basicReducers'
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
	router: connectRouter(history),
	tags: tagsReducer,
	projects: projectsReducer,
	experiences: experiencesReducer
})

export default rootReducer
