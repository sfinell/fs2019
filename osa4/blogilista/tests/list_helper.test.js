const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
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

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const emptyListWithNoBlogs = []

  test('when list is empty likes is zero', () => {
    const result = listHelper.totalLikes(emptyListWithNoBlogs)
    expect(result).toBe(0)
  })

  const listWithTwoBlogs = [
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
  ]

  test('when list has multiple blogs then likes are counted together', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(12)
  })

})
