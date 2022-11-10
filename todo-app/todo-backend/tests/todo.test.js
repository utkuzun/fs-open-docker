const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const supertest = require('supertest')

const Todo = require('../mongo/models/Todo')
const testHelpers = require('../util/testHelpers')

const app = require('../app')
const api = supertest(app)

describe('blogs api tests', () => {
  beforeEach(async () => {
    let mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { dbName: 'testTodo' })

    await Todo.deleteMany({})
    await Todo.insertMany(testHelpers.initialTodos)
  }, 10000)

  afterEach(async () => {
    await mongoose.connection.close()
  })

  test('gets correct amount of blogs', async () => {
    const response = await api.get('/todos')

    expect(response.body).toHaveLength(testHelpers.initialTodos.length)
  })

  test('gets json data', async () => {
    await api
      .get('/todos')
      .expect(200)
      .expect('Content-type', 'application/json; charset=utf-8')
  })

  test('add a todo', async () => {
    const todo = { text: 'final add', done: true }

    await api.post('/todos/').send(todo).expect(200)

    const response = await api.get('/todos')

    expect(response.body).toHaveLength(testHelpers.initialTodos.length + 1)
  })
})

//   test('toJSON methods', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body[0].id).toBeDefined()
//     expect(response.body[0]._id).not.toBeDefined()
//   })

//   test('test post request', async () => {
//     const user = testHelpers.initialUsers[0]

//     const {
//       body: { token },
//     } = await api
//       .post('/auth/login')
//       .send({ username: user.username, password: user.password })
//       .expect(200)

//     const blogtoAdd = {
//       title: 'kamile',
//       author: 'mal',
//       url: 'mal.com',
//       likes: 11,
//     }

//     await api.post('/api/blogs').send(blogtoAdd).expect(401)

//     await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(blogtoAdd)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const response = await api.get('/api/blogs')
//     expect(response.body).toHaveLength(testHelpers.initialBlogs.length + 1)
//     expect(response.body.map((blog) => blog.title)).toContain(blogtoAdd.title)
//   })

//   test('test default value for likes 0', async () => {
//     const blogtoAdd = {
//       title: 'mal',
//       author: 'mal',
//       url: 'mal.com',
//     }

//     const user = testHelpers.initialUsers[0]

//     const {
//       body: { token },
//     } = await api
//       .post('/auth/login')
//       .send({ username: user.username, password: user.password })
//       .expect(200)

//     const response = await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(blogtoAdd)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     expect(response.body.blog.likes).toBeDefined()
//     expect(response.body.blog.likes).toBe(0)
//   })

//   test('test required for url and title', async () => {
//     const blogWOTitle = {
//       title: '',
//       author: 'mal',
//       url: 'mal.com',
//     }

//     const blogWOUrl = {
//       title: 'utku',
//       author: 'mal',
//       url: '',
//     }

//     const user = testHelpers.initialUsers[0]

//     const {
//       body: { token },
//     } = await api
//       .post('/auth/login')
//       .send({ username: user.username, password: user.password })
//       .expect(200)

//     await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(blogWOTitle)
//       .expect(400)

//     await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(blogWOUrl)
//       .expect(400)
//   })

//   test('delete a post', async () => {
//     const { body: blogsBefore } = await api.get('/api/blogs')
//     const blogToDelete = blogsBefore[0]

//     const userRight = testHelpers.initialUsers.find(
//       (item) => item.username === blogToDelete.user.username
//     )
//     const userWrong = testHelpers.initialUsers.find(
//       (item) => item.username !== userRight.username
//     )

//     const {
//       body: { token: tokenRight },
//     } = await api
//       .post('/auth/login')
//       .send({ username: userRight.username, password: userRight.password })
//       .expect(200)

//     const {
//       body: { token: tokenWrong },
//     } = await api
//       .post('/auth/login')
//       .send({ username: userWrong.username, password: userWrong.password })
//       .expect(200)

//     await api
//       .delete(`/api/blogs/${blogToDelete.id}`)
//       .set('Authorization', `bearer ${tokenWrong}`)
//       .expect(404)

//     await api
//       .delete(`/api/blogs/${blogToDelete.id}`)
//       .set('Authorization', `bearer ${tokenRight}`)
//       .expect(204)

//     const { body: blogsAfter } = await api.get('/api/blogs')

//     expect(blogsAfter).toHaveLength(blogsBefore.length - 1)
//     expect(blogsAfter.map((blog) => blog.title)).not.toContain(
//       blogToDelete.title
//     )
//   })

//   test('update a posts likes', async () => {
//     const { body: blogsBefore } = await api.get('/api/blogs/')

//     const blogToUpdate = blogsBefore[0]

//     const {
//       body: { blog },
//     } = await api
//       .patch(`/api/blogs/${blogToUpdate.id}`)
//       .send({ likes: 41 })
//       .expect(200)

//     expect(blog.likes).toBe(41)
//   })
