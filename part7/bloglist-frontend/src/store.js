import { combineReducers, createStore } from 'redux'
import { notificationReducer } from './reducers/notificationReducer'
import { useSelector } from 'react-redux'

const appReducer = combineReducers({
	notification: notificationReducer,
})

export const store = createStore(appReducer)
