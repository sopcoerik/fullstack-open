import { useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdotes"
import { useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import { NotificationContext } from "../context/NotificationContext"
const AnecdoteForm = () => {

  const { newNotification } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const anecdoteCreationMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries('anecdotes'),
    onError: (error) => newNotification(error.response.data.error, 5)
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    anecdoteCreationMutation.mutate({content, votes: 0})
    event.target.anecdote.value = ''
    newNotification('created ' + content, 5)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
