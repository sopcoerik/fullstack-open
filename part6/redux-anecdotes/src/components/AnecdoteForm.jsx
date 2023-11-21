import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = (e) => {
    e.preventDefault()
    dispatch(create(e.target.input.value))
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