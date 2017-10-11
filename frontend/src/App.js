import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'User',
  'Content-Type': 'application/json'
}


class App extends Component {   
  state = {
    posts: [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        Edited: false
      },
      {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology. jhsjdhfsdghhsgfjksdhfksdhfkjsdhfkjhsdkjfhskjdfsdkjjhsdhgsgfsgdyfgsygdfysdgf',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        Edited: true
      }
    ],
    nextId: 0
  }

  Post = (post) =>
  fetch(`http://localhost:3001/posts/8xf0y6ziyjabvozdd253nd`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(post)
  }).then(res => res.json()).then(res => console.log(res))

  // Post = (post) =>
  // fetch(`http://localhost:3001/posts`, {
  //   method: 'GET',
  //   headers
  // }).then(res => res.json()).then(res => console.log(res))
  

  // savePost = (post) =>
  // fetch(`${api}/posts`, {
  //  method: 'POST',
  //  headers: headers,
  //  body: JSON.stringify(post)
  // }).then(res => res.json())

// Example Post

  // {
  //   id: '8xf0y6ziyjabvozddfyhfghsdff',
  //   timestamp: 14671668758512,
  //   title: 'test',
  //   body: 'tste',
  //   author: 'test',
  //   category: 'tes' }
  updateId = (arg) => {
    console.log(arg)
      this.setState((state) => ({
          nextId: this.state.nextId + 1 
      }))
  }


  render() {
    return (
      <div className="container-fluid">
        <header>
        </header>
        <div className="row">
        <div className="col-10 list-group">
        {this.state.posts.map(post => 
              <a key={post.id} onClick={this.updateId} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{post.title}</h5>
                {post.Edited ? <small>{moment.utc(post.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}<strong> - Edited</strong></small> : <small>{moment.utc(post.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}</small>}
                
                </div>
                {post.body.length > 75 ? <p className="mb-1">{post.body.substring(0, 75)}... <small>Read more.</small></p> : <p className="mb-1">{post.body}</p>  } 
                <small>Author: <strong>{post.author}</strong> | Score: <strong>{post.voteScore}</strong> Hue: {this.state.nextId}</small>
                
                </a>
          )}
          </div>
              <div className="col list-group">
              <a href="/" className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Categories</h5>
                </div>
                </a>
              <a href="/" className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">React</h6>
                </div>
                </a>
              <a href="/" className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">Redux</h6>
                </div>
                </a>
              <a href="/" className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">Udacity</h6>
                </div>
                </a>
              
              </div>
        </div>
      </div>
    );
  }
}

export default App;
