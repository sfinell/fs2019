const loadsh = require('loadsh')

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

const mostBlogs = (blogs) => {
  const blogCounts = loadsh.countBy(blogs, 'author');

//  console.log('reduce method:')
//  const mostBlogs = loadsh.reduce(blogCounts, (accumulator, value, key, collection) => {
////    console.log('accu:', accumulator, ', value:', value, ', key:', key, ', collection:', collection)
//    if (!accumulator || value > Object.values(accumulator)[0]) {
//      return {[key]: value}
//    }
//    return accumulator
//  }, null)

//  console.log('sort method:')
  if (blogs.length === 0) return null
  const sortedBlogCounts = loadsh.sortBy(Object.entries(blogCounts),[o => -o[1]])
  const mostBlogs = {[sortedBlogCounts[0][0]]: sortedBlogCounts[0][1]}

  return mostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
//  const blogsByAuthor = loadsh.groupBy(blogs, 'author');
//  console.log('blogsByAuthor:', blogsByAuthor)
//  console.log('mapping:')

  const mostLikes = loadsh.chain(blogs).groupBy('author')
//  .map((value, key, collection) => {
//      console.log('in map, value', value, ', key:', key) //, ', collection:', collection)
//    return {[key]: loadsh.sumBy(value, 'likes')}
//  })
  .map((value, key, collection) => ({[key]: loadsh.sumBy(value, 'likes')}))
//  .sortBy([(o) => {
//    const jeps = -Object.values(o)[0]
//    console.log('o:', o, ', values:', Object.values(o), ', jeps:', jeps)
//    return -Object.values(o)[0]}])
  .sortBy([(o) => -Object.values(o)[0]])
  .head().value()

//  console.log('mostLikes:', mostLikes)
  return mostLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
