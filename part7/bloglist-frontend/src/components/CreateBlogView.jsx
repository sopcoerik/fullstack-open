import { useState } from 'react'

export const CreateBlogView = ({
	title,
	author,
	url,
	onValueChange,
	onSubmit,
}) => {
	const [showCreateBlog, setShowCreateBlog] = useState(false)

	if (!showCreateBlog) {
		return (
			<button onClick={() => setShowCreateBlog(true)}>
				create new blog
			</button>
		)
	}

	const handleSubmit = e => {
		onSubmit(e)
		setShowCreateBlog(false)
	}

	return (
		<>
			<h1>Create new blog</h1>
			<form
				onSubmit={handleSubmit}
				id='test--blog-form'
			>
				<div>
					title:
					<input
						id='test--title-input'
						type='text'
						name='title'
						value={title}
						onChange={onValueChange}
					/>
				</div>
				<div>
					author:
					<input
						id='test--author-input'
						type='text'
						name='author'
						value={author}
						onChange={onValueChange}
					/>
				</div>
				<div>
					url:
					<input
						id='test--url-input'
						type='text'
						name='url'
						value={url}
						onChange={onValueChange}
					/>
				</div>
				<button type='submit'>create</button>
			</form>
			<button onClick={() => setShowCreateBlog(false)}>cancel</button>
		</>
	)
}
