import { useDispatch, useSelector } from 'react-redux'
import {
	NEW_NOTIFICATION,
	RESET_NOTIFICATION,
} from '../reducers/notificationReducer'
import { useRef } from 'react'

const NOTIFICATION_RESET_TIME = 5000

const newNotification = (notificationMessage, notificationType) => ({
	type: NEW_NOTIFICATION,
	payload: {
		message: notificationMessage,
		type: notificationType,
	},
})

const resetPreviousNotification = () => ({
	type: RESET_NOTIFICATION,
})

export const useNotification = () => {
	const timerIdRef = useRef(null)

	const dispatch = useDispatch()
	const notification = useSelector(state => state.notification)

	const createNewNotification = (message, type) =>
		dispatch(newNotification(message, type))

	const resetNotification = () => dispatch(resetPreviousNotification())

	const initializeNotificationReset = () => {
		if (timerIdRef.current) {
			clearTimeout(timerIdRef.current)
		}

		timerIdRef.current = setTimeout(() => {
			resetNotification()
		}, NOTIFICATION_RESET_TIME)
	}

	const pushNewNotification = (message, type) => {
		createNewNotification(message, type)

		initializeNotificationReset()
	}

	return {
		notification,
		pushNewNotification,
	}
}
