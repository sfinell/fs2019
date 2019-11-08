const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const emptyListWithNoBlogs = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithSeveralBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Just For Test',
    author: 'Me Self',
    url: 'http://me.self.fi/~meself',
    likes: 7,
    __v: 1
  },
  {
    _id: '5a422aa71b54a676234d17f7',
    title: 'Not so popular blog',
    author: 'Not Me',
    url: 'http://not.me/',
    likes: 1,
    __v: 9
  }
]

describe('total likes', () => {
  test('when list is empty likes is zero', () => {
    const result = listHelper.totalLikes(emptyListWithNoBlogs)
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has multiple blogs then likes are counted together', () => {
    const result = listHelper.totalLikes(listWithSeveralBlogs)
    expect(result).toBe(13)
  })
})

describe('favorite blog', () => {
  test('when list is empty favorite is null', () => {
    const result = listHelper.favoriteBlog(emptyListWithNoBlogs)
    expect(result).toBe(null)
  })
  test('when list has only one blog favorite is that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0]) // toBe() would work as well
  })
  test('when list has multiple blogs then favorite is blog with highest likes', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    expect(result).toBe(listWithSeveralBlogs[1])
  })
})
