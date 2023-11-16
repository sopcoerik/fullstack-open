import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { BlogsView } from './components/BlogsView'
import { LoginView } from './components/LoginView'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [notifications, setNotifications] = useState({
    error: '',
    success: ''
  })
  const [blogDetails, setBlogDetails] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
    user: ''
  })

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('blogListLoggedInUser'))

    if(user) {
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const resetCredentials = () => setCredentials({
    username: '',
    password: ''
  })

  const resetNotifications = (type) => setTimeout(() => setNotifications({ ...notifications, [type]: '' }), 5000)
  const resetBlogDetails = () => setBlogDetails({ title: '', author: '', url: '' })

  const handleCredentialChange = ({ target }) => setCredentials({ ...credentials, [target.name]: target.value })
  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('blogListLoggedInUser', JSON.stringify(user))
      resetCredentials()
    } catch(error) {
      resetCredentials()
      setNotifications({ ...notifications, error: 'Wrong Credentials' })
      resetNotifications('error')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('blogListLoggedInUser')
    setUser(null)
  }
  const handleBlogDetailValueChange = ({ target }) =>
    setBlogDetails({ ...blogDetails, [target.name]: target.value })

  const handleCreateBlogFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const createdBlog = await blogService.create(blogDetails, user.token)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      resetBlogDetails()
      setNotifications({ ...notifications, success: `Created ${createdBlog.title} ${createdBlog.author} blog` })
      resetNotifications('success')
    } catch(error) {
      resetBlogDetails()
      setNotifications({ ...notifications, error: error.response.data.error })
      resetNotifications('error')
    }
  }

  const handleLikeClick = async (blog) => {
    try {
      await blogService.like(blog, user.token)

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch(error) {
      setNotifications({ ...notifications, error: 'Failed to like blog' })
      resetNotifications('error')
    }
  }

  const handleRemoveClick = async(blog) => {
    try {
      const didUserConfirm = window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)
      if(didUserConfirm){
        await blogService.remove(blog.id, user.token)
        setBlogs(blogs.filter(currentBlog => currentBlog.id !== blog.id))
        setNotifications({ ...notifications, success: 'Successfully removed blog from the list' })
        resetNotifications('success')
      }
    } catch(error) {
      setNotifications({ ...notifications, error: 'Failed to remove blog' })
      resetNotifications('error')
    }
  }

  return (
    <div>
      {
        user === null
          ? <LoginView
            credentials={credentials}
            onCredentialsChange={handleCredentialChange}
            onLoginSubmit={handleLoginSubmit}
            notifications={notifications}
          />
          : <BlogsView
            blogs={blogs}
            user={user}
            onLogoutClick={handleLogout}
            blogDetails={blogDetails}
            notifications={notifications}
            onValueChange={handleBlogDetailValueChange}
            onSubmit={handleCreateBlogFormSubmit}
            onLikeClick={handleLikeClick}
            onRemoveClick={handleRemoveClick}
          />
      }
    </div>
  )
}

export default App