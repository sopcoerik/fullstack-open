import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      console.log(action)
      return action.payload
    },
    clearNotification() {
      return '' 
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const newNotification = (content, seconds) => {
  return dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => dispatch(clearNotification()), seconds * 1000)
  }
}

export default notificationSlice.reducer