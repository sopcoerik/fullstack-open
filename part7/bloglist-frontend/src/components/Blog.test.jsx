import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'

const testBlog = {
  title: 'testblog',
  author: 'testauthor',
  url: 'testurl',
  likes: 1
}

describe('<Blog />', () => {
  const mockHandler = jest.fn()

  beforeEach(() => {
    render(<Blog blog={testBlog} onLikeClick={mockHandler}/>)
  })

  test('it renders only title and author by default', () => {
    screen.getByText('testblog testauthor')
  })

  test('it renders url and likes when "view" button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)
    screen.getByText('testurl')
    screen.getByText('1 likes')
  })

  test('if like button is clicked twice, handler is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    await user.click(viewButton)
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})