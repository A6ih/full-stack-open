const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    return response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or invalid' })
    }

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    }

    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body
    const newBlog = await Blog.findById(request.params.id)
    if (!newBlog) return response.status(404).end

    newBlog.title = title
    newBlog.author = author
    newBlog.url = url
    newBlog.likes = likes

    const updatedBlog = await newBlog.save()
    return response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
