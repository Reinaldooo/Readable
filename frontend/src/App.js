import React, { Component } from 'react'
import './App.css'
import moment from 'moment'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { postsFetchData } from './actions'

const headers = {
  'Accept': 'application/json',
  'Authorization': 'User',
  'Content-Type': 'application/json'
}

const api = "http://localhost:3001"


class App extends Component {   
  state = {
  }

  post = () =>
  fetch(`${api}/posts`, {
    method: 'GET',
    headers
    //body: JSON.stringify(post)
  }).then(posts => posts.json()).then(posts => {
    this.setState({posts: posts.sort(sortBy('-voteScore'))});
  console.log(this.state.posts) }
  )

  poste = () =>
  fetch(`${api}/posts/2/comments`, {
    method: 'GET',
    headers
    //body: JSON.stringify(post)
  }).then(posts => posts.json()).then(posts => console.log(posts)
  )

  componentDidMount() {
    this.props.fetchData(`${api}/posts`)
}

  saveComment = (post) =>
   fetch(`${api}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(post)
   }).then(res => {res.json();
  console.log(res)})
  
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
        {this.props.isLoading ? 
        <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
        </div> :
        <div className="row">
        <div className="col-10 list-group">
        {this.props.posts[0] && this.props.posts.map(post => 
              <a key={post.id} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{post.title}</h5>
                {post.edited ? <small>{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}<strong> - Edited</strong></small> : <small>{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
                
                </div>
                {post.body.length > 75 ? <p className="mb-1">{post.body.substring(0, 75)}... <small><span className="read-more">Read more.</span></small></p> : <p className="mb-1">{post.body}</p>  } 
                <small>Author: <strong>{post.author}</strong> • Score: <strong>{post.voteScore}</strong> • #{post.category}</small>
                </a>
          )}
          </div>
              <div className="col list-group">
              <a className="list-group-item list-group-item-action flex-column align-items-start">
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
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      posts: state.posts,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(postsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
