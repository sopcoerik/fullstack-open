import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { BlogsView } from './components/BlogsView'
import { LoginView } from './components/LoginView'
import { useNotification } from './hooks/useNotification'

const App = () => {
	const [user, setUser] = useState(null)
	const [blogs, setBlogs] = useState([])
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	})

	const [blogDetails, setBlogDetails] = useState({
		title: '',
		author: '',
		url: '',
		likes: 0,
		user: '',
	})
	const { pushNewNotification } = useNotification()

	useEffect(() => {
		const user = JSON.parse(
			window.localStorage.getItem('blogListLoggedInUser')
		)

		if (user) {
			setUser(user)
		}
	}, [])

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	const resetCredentials = () =>
		setCredentials({
			username: '',
			password: '',
		})

	const resetBlogDetails = () =>
		setBlogDetails({ title: '', author: '', url: '' })

	const handleCredentialChange = ({ target }) =>
		setCredentials({ ...credentials, [target.name]: target.value })

	const handleLoginSubmit = async e => {
		e.preventDefault()

		try {
			const user = await loginService.login(credentials)

			setUser(user)
			window.localStorage.setItem(
				'blogListLoggedInUser',
				JSON.stringify(user)
			)

			resetCredentials()
			pushNewNotification(`Welcome, ${user.name}`, 'success')
		} catch (error) {
			resetCredentials()

			pushNewNotification(error.response.data.error, 'error')
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('blogListLoggedInUser')
		setUser(null)
	}

	const handleBlogDetailValueChange = ({ target }) =>
		setBlogDetails({ ...blogDetails, [target.name]: target.value })

	const handleCreateBlogFormSubmit = async e => {
		e.preventDefault()

		try {
			const createdBlog = await blogService.create(
				blogDetails,
				user.token
			)
			const blogs = await blogService.getAll()

			setBlogs(blogs)
			resetBlogDetails()
			pushNewNotification(
				`Created ${createdBlog.title} ${createdBlog.author} blog`,
				'success'
			)
		} catch (error) {
			resetBlogDetails()
			pushNewNotification(error.response.data.error, 'error')
		}
	}

	const handleLikeClick = async blog => {
		try {
			await blogService.like(blog, user.token)

			const updatedBlogs = await blogService.getAll()
			setBlogs(updatedBlogs)
			pushNewNotification(
				`You liked ${blog.title}, by ${blog.author}`,
				'success'
			)
		} catch (error) {
			pushNewNotification(error.response.data.error, 'error')
		}
	}

	const handleRemoveClick = async blog => {
		try {
			const didUserConfirm = window.confirm(
				`Do you want to remove ${blog.title} by ${blog.author}?`
			)
			if (didUserConfirm) {
				await blogService.remove(blog.id, user.token)
				setBlogs(
					blogs.filter(currentBlog => currentBlog.id !== blog.id)
				)
				pushNewNotification(
					'Successfully removed blog from the list',
					'success'
				)
			}
		} catch (error) {
			pushNewNotification(error.response.data.error, 'error')
		}
	}

	return (
		<div>
			{user === null ? (
				<LoginView
					credentials={credentials}
					onCredentialsChange={handleCredentialChange}
					onLoginSubmit={handleLoginSubmit}
				/>
			) : (
				<BlogsView
					blogs={blogs}
					user={user}
					onLogoutClick={handleLogout}
					blogDetails={blogDetails}
					onValueChange={handleBlogDetailValueChange}
					onSubmit={handleCreateBlogFormSubmit}
					onLikeClick={handleLikeClick}
					onRemoveClick={handleRemoveClick}
				/>
			)}
		</div>
	)
}

export default App
