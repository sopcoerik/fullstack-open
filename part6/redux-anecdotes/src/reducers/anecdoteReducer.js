import { createSlice } from "@reduxjs/toolkit"
import { createAnecdote, getAll, voteAnecdote } from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    update(state, action) {
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    },
    create(state, action) {
      return state.concat(action.payload)
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const { update, create, set } = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const data = await getAll()
    dispatch(set(data))
  }
}

export const createNewAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await createAnecdote(data)
    dispatch(create(newAnecdote))
  }
}

export const voteExistingAnecdote = (data) => {
  return async dispatch => {
    const updatedAnecdote = await voteAnecdote(data)
    dispatch(update(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer