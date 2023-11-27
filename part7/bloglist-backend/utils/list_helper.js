/* eslint-disable no-unused-vars */

const dummy = blogs => 1

const totalLikes = blogs =>
  blogs.length === 0
    ? 0
    : blogs.reduce((likeCount, blog) => likeCount + blog.likes, 0)

const favoriteBlog = blogs => {
  if(blogs.length === 0) return null

  const favorite = blogs.reduce((firstBlog, secondBlog) => secondBlog.likes > firstBlog.likes ? secondBlog : firstBlog)

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = blogs => {
  const blogSummaries = blogs.reduce((accumulator, blog) => {
    if(!accumulator[blog.author]) {
      accumulator[blog.author] = 1
    } else {
      accumulator[blog.author]++
    }

    return accumulator
  }, {})

  const mostBlogs = Object.keys(blogSummaries).reduce((accumulator, authorName) => {
    if(!accumulator.author && !accumulator.blogs) {
      accumulator.author = authorName
      accumulator.blogs = blogSummaries[authorName]
    } else if(accumulator.blogs < blogSummaries[authorName]) {
      accumulator.author = authorName
      accumulator.blogs = blogSummaries[authorName]
    }

    return accumulator
  }, {})

  return mostBlogs
}

const mostLikes = blogs => {
  const blogSummaries = blogs.reduce((accumulator, blog) => {
    if(!accumulator[blog.author]) {
      accumulator[blog.author] = blog.likes
    } else {
      accumulator[blog.author] += blog.likes
    }

    return accumulator
  }, {})

  const mostLikes = Object.keys(blogSummaries).reduce((accumulator, authorName) => {
    if(!accumulator.author && !accumulator.blogs) {
      accumulator.author = authorName
      accumulator.likes = blogSummaries[authorName]
    } else if(accumulator.likes < blogSummaries[authorName]) {
      accumulator.author = authorName
      accumulator.likes = blogSummaries[authorName]
    }

    return accumulator
  }, {})

  return mostLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }