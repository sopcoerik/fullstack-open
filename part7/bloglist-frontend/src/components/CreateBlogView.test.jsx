import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { CreateBlogView } from './CreateBlogView'

describe('<CreateBlogView />', () => {
	test('onSubmit handler gets called on form submission', async () => {
		const mockOnSubmit = jest.fn(e => e.preventDefault())
		render(<CreateBlogView onSubmit={mockOnSubmit} />)

		const user = userEvent.setup()

		const createBlogButton = screen.getByText('create new blog')
		await user.click(createBlogButton)

		const submitButton = screen.getByText('create')
		await user.click(submitButton)

		expect(mockOnSubmit.mock.calls).toHaveLength(1)
	})
})
