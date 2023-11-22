import { createContext, useReducer } from "react";
import PropTypes from 'prop-types'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {

  const notificationReducer = (state = '', action) => {
    switch(action.type) {
      case 'newNotification':
        return action.payload
      case 'clearNotification':
        return ''
      default: return state
    }
  }

  const [notification, dispatchNewNotification] = useReducer(notificationReducer, '')

  const clearNotification = () => dispatchNewNotification({type: 'clearNotification'})

  const newNotification = (payload, seconds) => {
    dispatchNewNotification({type: 'newNotification', payload})
    setTimeout(() => clearNotification(), seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{notification, newNotification}}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.object
}