const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

describe('user creation', () => {
  test('returns status 400 for missing credentials w/ error message', async () => {
    const user = {
      name: 'newname',
      username: '',
      password: 'ne'
    }

    const response = await api.post('/api/users').send(user).expect(400)
    expect(response.body.error).toBe('400 | Bad request | username and/or password required')
  })

  test('user gets created successfully', async () => {
    const user = {
      name: 'newname',
      username: 'newusername',
      password: 'newpassword'
    }

    await api.post('/api/users').send(user).expect(201)
  })

  test('returns status 400 for short credentials w/ error message', async () => {
    const user = {
      name: 'newname',
      username: 'ne',
      password: 'ne'
    }

    const response = await api.post('/api/users').send(user).expect(400)
    expect(response.body.error).toBe('400 | Bad request | short name or password (atleast 3 chars)')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})