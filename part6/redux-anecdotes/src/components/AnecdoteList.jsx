import { useSelector, useDispatch } from 'react-redux'
import { voteExistingAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationSlice'

export const AnecdoteList = () => {
  const filterValue = useSelector(state => state.filter)
  const anecdotes = useSelector(
    state => filterValue 
      ? state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase())) 
      : state.anecdotes
  )
  const dispatch = useDispatch()

  const handleVoteAnecdote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(voteExistingAnecdote(updatedAnecdote))
    dispatch(newNotification(`voted ${anecdote.content}`, 5))
  }

  return [...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVoteAnecdote(anecdote)}>vote</button>
      </div>
    </div>
  )
}