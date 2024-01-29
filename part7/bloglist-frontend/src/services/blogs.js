import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (blog, token) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}

	const response = await axios.post(baseUrl, blog, config)
	return response.data
}

const like = async (blog, token) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}

	const newBlog = {
		...blog,
		likes: blog.likes + 1,
	}

	const response = await axios.put(baseUrl + `/${blog.id}`, newBlog, config)
	return response.data
}

const remove = async (blogId, token) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}

	const response = await axios.delete(baseUrl + `/${blogId}`, config)
	return response.data
}

export default { getAll, create, like, remove }
