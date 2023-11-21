import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./reducers/filterReducer"
import anecdoteReducer from "./reducers/anecdoteReducer"

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdoteReducer
  }
})