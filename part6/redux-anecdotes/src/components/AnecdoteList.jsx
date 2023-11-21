import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationSlice'

export const AnecdoteList = () => {
  const filterValue = useSelector(state => state.filter)
  const anecdotes = useSelector(
    state => filterValue 
      ? state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase())) 
      : state.anecdotes
  )
  const dispatch = useDispatch()

  const handleVoteAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`voted for ${anecdote.content}`))
  }

  return [...anecdotes].sort((a, b) => a.votes - b.votes).map(anecdote =>
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