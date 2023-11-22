import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationSlice'
export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = async (e) => {
    e.preventDefault()
    let content = e.target.input.value
    const newAnecdote = {
      content,
      votes: 0
    }
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(newNotification(`created anecdote ${content}`, 5))
    e.target.input.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name='input' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}