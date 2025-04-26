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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
