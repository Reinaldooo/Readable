const clone = require('clone')

let db = {}

const defaultData = {
  "1": {
    id: '1',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    edited: false
  },
  "2": {
    id: '2',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: 1,
    deleted: false,
    edited: false
  },
  "3": {
    id: '3',
    timestamp: 1507907893799,
    title: 'Should the reviewer approve my project?',
    body: "Well i think you should. I worked pretty hard on this, and even added an auto crop at 75 chars.",
    author: 'Student',
    category: 'udacity',
    voteScore: 12,
    deleted: false,
    edited: true
  },
  "4": {
    id: '4',
    timestamp: 1500000000000,
    title: "I think you should approve Reinaldo's project",
    body: "He worked pretty hard.",
    author: "Reinaldo's friend",
    category: 'udacity',
    voteScore: 10,
    deleted: false,
    edited: true
  },
  "5": {
    id: '5',
    timestamp: 1507907000000,
    title: 'I added four posts on the server',
    body: 'I hope thats allowed!',
    author: 'Student',
    category: 'udacity',
    voteScore: 8,
    deleted: false,
    edited: true
  },
  "6": {
    id: '6',
    timestamp: 1507900000000,
    title: 'Just another post',
    body: 'To test out the category changer',
    author: 'Student',
    category: 'react',
    voteScore: 9,
    deleted: false,
    edited: true
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      edited: false
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}
