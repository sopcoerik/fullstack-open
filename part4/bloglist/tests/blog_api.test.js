const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "A simple blog",
    author: "SE",
    url: "simpleurl.blog",
    likes: 64
  },
  {
    title: "A Blog",
    author: "SE",
    url: "simpleurl.blog",
    likes: 24
  }
]

const initialUser = {
  name: 'testing-user',
  username: 'tester',
  password: 'tester'
}

let token

beforeAll(async () => {
  const response = await api.post('/api/login').send({
    username: initialUser.username,
    password: initialUser.password
  })

  token = response.body.token
})

beforeEach(async () => {

  await Blog.deleteMany({})

  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()

  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()
})

test("correctly returns data as json", async () => {
  await api.get("/api/blogs").expect(200).expect('Content-Type', /application\/json/)
})

test("two blogs are returned", async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(response => response.title)
  expect(contents).toContain('A Blog')
})

test('blogs have id defined', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

describe('blogs are saved correctly', () => {
  test('blog is present after post request', async () => {
    const newBlog = {
      title: "A Blog from tests",
      author: "SE",
      url: "testing.blog",
      likes: 7357
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)

    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(initialBlogs.length + 1)

    expect(blogs.body[2].title).toBe("A Blog from tests")
  })

  test('blog is saved with the correct content', async () => {
    const newBlog = {
      title: "A Blog from tests",
      author: "SE",
      url: "testing.blog",
      likes: 7357
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)

    const blogs = await api.get('/api/blogs')

    expect(blogs.body[2].title).toBe("A Blog from tests")
  })
})

test('if the likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: "A Blog from tests",
    author: "SE",
    url: "testing.blog"
  }

  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)

  const blogs = await api.get('/api/blogs')

  expect(blogs.body[2].likes).toBe(0)
})

test('if url or title is missing, backend responds with status code 400', async () => {
  const newBlog = {
    author: "SE",
  }

  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
})

test('single blog resource gets deleted correctly', async () => {
  const user = await User.find({ username: 'tester' })

  const newBlog = {
    title: "A Blog from tests",
    author: "SE",
    url: "testing.blog",
    user: user[0]._id.toString()
  }

  const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)
  await api.delete(`/api/blogs/${response.body.id}`).set('Authorization', `Bearer ${token}`).expect(204)
})

test('single blog gets updated correctly', async () => {
  const initialBlog = {
    title: "A Blog from tests",
    author: "SE",
    url: "testing.test"
  }

  const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(initialBlog)

  const updated = {
    title: response.body.title,
    author: response.body.author,
    url: "testing.testblog.com"
  }

  const updatedBlog = await api.put(`/api/blogs/${response.body.id}`).send(updated)

  expect(updatedBlog.body.title).toBe("A Blog from tests")
  expect(updatedBlog.body.url).toBe("testing.testblog.com")
})

test('blog creation fails if no token is provided', async () => {
  const initialBlog = {
    title: "A Blog from tests",
    author: "SE",
    url: "testing.test"
  }

  await api.post('/api/blogs').send(initialBlog).expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})