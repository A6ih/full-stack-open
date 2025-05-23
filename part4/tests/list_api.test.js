const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

describe('returns', () => {
  test('as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs', async () => {
    const result = await api.get('/api/blogs')

    assert.strictEqual(result.body.length, blogs.length)
  })
})

test('unique identifier property of the blog posts is named id', async () => {
  const responseArr = (await api.get('/api/blogs')).body
  const keys = responseArr.map((object) => Object.keys(object))
  const checkId = keys
    .map((arr) => arr.includes('id'))
    .every((value) => value === true)
  const checkFalseId = keys
    .map((arr) => arr.includes('_id'))
    .every((value) => value === false)

  const id = checkId && checkFalseId ? 'id' : false

  assert.strictEqual(id, 'id')
})

test('post request successfully creates a new blog', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, blogs.length + 1)
})

test('if the likes property is missing, default the likes value to 0', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  const response = await api.post('/api/blogs').send(newBlog)

  assert.strictEqual(response.body.likes, 0)
})

describe('blog without', () => {
  test('title is not added', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('url is not added', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

test('a blog can be deleted', async () => {
  const AllBlogs = await Blog.find({})
  const blogsAtStart = AllBlogs.map((blog) => blog.toJSON())
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const newBlogs = await Blog.find({})
  const blogsAtEnd = newBlogs.map((blog) => blog.toJSON())

  const titles = blogsAtEnd.map((blog) => blog.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, blogs.length - 1)
})

test('likes in a blog can be updated', async () => {
  const initialBlogs = (await Blog.find({})).map((blog) => blog.toJSON())
  const blogToUpdate = { ...initialBlogs[0] }

  blogToUpdate.likes = 11

  await api
    .put(`/api/blogs/${initialBlogs[0].id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = (await Blog.find({})).map((blog) => blog.toJSON())
  assert.strictEqual(updatedBlogs[0].likes, blogToUpdate.likes)
})

after(async () => {
  await mongoose.connection.close()
})
