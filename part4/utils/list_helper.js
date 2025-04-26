const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  const copy = [...blogs]

  copy.sort((a, b) => b.likes - a.likes)

  return blogs.length === 0 ? 0 : copy[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0

  let copy = [...blogs]

  const resultArr = []

  while (copy.length > 0) {
    const author = copy[0].author
    const tempArr = copy.filter((blog) => author === blog.author)
    const obj = { author: author, blogs: tempArr.length }
    resultArr.push(obj)
    copy = copy.filter((blogs) => author !== blogs.author)
  }

  resultArr.sort((a, b) => b.blogs - a.blogs)

  return resultArr[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0

  let copy = [...blogs]

  const resultArr = []

  while (copy.length > 0) {
    const author = copy[0].author
    const tempArr = copy.filter((blog) => author === blog.author)
    const obj = {
      author: author,
      likes: tempArr.reduce((acc, curr) => acc + curr.likes, 0),
    }
    resultArr.push(obj)
    copy = copy.filter((blogs) => author !== blogs.author)
  }

  resultArr.sort((a, b) => b.likes - a.likes)

  return resultArr[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
