import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, voteAnecdote } from './services/anecdotes'
import { useContext } from 'react'
import { NotificationContext } from './context/NotificationContext'

const App = () => {

  const { newNotification } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const anecdoteVoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => queryClient.invalidateQueries('anecdotes')
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    anecdoteVoteMutation.mutate(votedAnecdote)
    newNotification('voted ' + anecdote.content, 5)
  }

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  if(query.isLoading) {
    return <div>data is loading...</div>
  }

  if(query.isError) {
    return <div>error loading data! service not available</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {query.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
