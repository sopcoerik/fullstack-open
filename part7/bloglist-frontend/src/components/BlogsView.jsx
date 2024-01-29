import PropTypes from 'prop-types'
import Blog from './Blog'
import { CreateBlogView } from './CreateBlogView'
import { useNotification } from '../hooks/useNotification'

export const BlogsView = ({
	onRemoveClick,
	onLikeClick,
	blogs,
	user,
	onLogoutClick,
	blogDetails,
	onValueChange,
	onSubmit,
}) => {
	const { notification } = useNotification()

	const getSortedBlogs = () => {
		const blogsCopy = [...blogs]
		blogsCopy.sort((a, b) => b.likes - a.likes)

		return blogsCopy
	}

	return (
		<>
			<h1>Blogs</h1>
			<div>
				<h3>logged in as {user.name}</h3>
				<button onClick={onLogoutClick}>logout</button>
			</div>
			{notification.message.length && notification.type === 'error' && (
				<div
					style={{
						backgroundColor: '#eeeeee',
						border: '2px red solid',
						borderRadius: '10px',
						color: 'red',
						padding: '0.5rem',
					}}
				>
					<h1>{notification.message}</h1>
				</div>
			)}
			{notification.message.length && notification.type === 'success' && (
				<div
					style={{
						backgroundColor: '#eeeeee',
						border: '2px green solid',
						borderRadius: '10px',
						color: 'green',
						padding: '0.5rem',
					}}
				>
					<h1>{notification.message}</h1>
				</div>
			)}
			<CreateBlogView
				title={blogDetails.title}
				author={blogDetails.author}
				url={blogDetails.url}
				onValueChange={onValueChange}
				onSubmit={onSubmit}
			/>
			{getSortedBlogs().map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					onLikeClick={onLikeClick}
					onRemoveClick={onRemoveClick}
				/>
			))}
		</>
	)
}

BlogsView.propTypes = {
	onRemoveClick: PropTypes.func.isRequired,
	onLikeClick: PropTypes.func.isRequired,
	blogs: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	onLogoutClick: PropTypes.func.isRequired,
	blogDetails: PropTypes.object.isRequired,
	onValueChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
}
