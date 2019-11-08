const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0
  blogs.forEach( blog => {
    totalLikes += blog.likes
  })
  return totalLikes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null
  let highestLikes = -1
  blogs.forEach( blog => {
    if (blog.likes > highestLikes) {
      highestLikes = blog.likes
      favoriteBlog = blog
    }
  })
  return favoriteBlog
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
