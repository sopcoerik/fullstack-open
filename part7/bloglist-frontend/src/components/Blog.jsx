import { useState } from 'react'

const Blog = ({ blog, onLikeClick, onRemoveClick }) => {
	const [showMoreDetails, setShowMoreDetails] = useState(false)

	return (
		<div>
			{blog.title} {blog.author}{' '}
			<button onClick={() => setShowMoreDetails(!showMoreDetails)}>
				{showMoreDetails ? 'hide' : 'view'}
			</button>
			{showMoreDetails && (
				<>
					<a
						href={blog.url}
						style={{ marginBottom: '-12px', display: 'block' }}
					>
						{blog.url}
					</a>
					<p style={{ marginBottom: '-12px' }}>
						{blog.likes} likes{' '}
						<button onClick={() => onLikeClick(blog)}>like</button>
					</p>
					<p>{blog.user && blog.user.name}</p>
					<button onClick={() => onRemoveClick(blog)}>
						remove blog
					</button>
				</>
			)}
		</div>
	)
}

export default Blog
