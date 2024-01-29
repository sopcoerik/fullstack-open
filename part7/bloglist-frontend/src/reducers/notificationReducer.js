export const NEW_NOTIFICATION = 'notification/new-notification'
export const RESET_NOTIFICATION = 'notification/reset-notification'

const initialState = {
	message: '',
	type: '',
}

export const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_NOTIFICATION: {
			const { message, type } = action.payload

			const newState = {
				message,
				type,
			}

			return newState
		}
		case RESET_NOTIFICATION: {
			const newState = {
				message: '',
				type: '',
			}

			return newState
		}
		default: {
			return state
		}
	}
}
