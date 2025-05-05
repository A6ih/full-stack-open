const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    return response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    }

    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
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
