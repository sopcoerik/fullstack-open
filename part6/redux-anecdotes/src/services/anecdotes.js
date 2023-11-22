import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

export const voteAnecdote = async (data) => {
  const response = await axios.put(baseUrl + `/${data.id}`, data)
  return response.data
}