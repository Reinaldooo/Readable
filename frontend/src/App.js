import React, {Component} from 'react'
import './App.css'
import moment from 'moment'
// import sortBy from 'sort-by'
import {connect} from 'react-redux'
import {postsFetchData, categoryChanger} from './actions'

// const headers = {
//   'Accept': 'application/json',
//   'Authorization': 'User',
//   'Content-Type': 'application/json'
// }
const api = "http://localhost:3001"

class App extends Component {

// savePost = (post) => fetch(`${api}/posts`, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(post)
//   })
//   .then(posts => posts.json())

componentDidMount() {
    this.props.fetchData()
}

// saveComment = (post) =>
//   fetch(`${api}/comments`, {
//    method: 'POST',
//    headers: headers,
//    body: JSON.stringify(post)
//   })
//   .then(res => {res.json();
//   console.log(res)})
  
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
                {post.edited ? <small>{moment.utc(post.timestamp).format("ddd, MMM Do YYYY, h:mm a")}<strong><span className="blue-focus"> - Edited</span></strong></small> : <small>{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
                </div>
                {console.log(post)}
                {post.body.length > 75 ? <p className="mb-1">{post.body.substring(0, 75)}... <small><span className="blue-focus">Read more.</span></small></p> : <p className="mb-1">{post.body}</p>  } 
                <small>Author: <strong>{post.author}</strong> • Score: <strong>{post.voteScore}</strong> • <span className="blue-focus">#{post.category}</span> • comment(s)</small>
                </a>
          )}
          </div>
              <div className="col list-group">
              <a className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Categories</h5>
                </div>
                </a>
                <a onClick={() => this.props.fetchData(`${api}/posts`)} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1 blue-focus">#all</h6>
                </div>
                </a>
              <a onClick={() => this.props.categoryChanger("react")} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1 blue-focus">#react</h6>
                </div>
                </a>
              <a onClick={() => this.props.categoryChanger("redux")} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1 blue-focus">#redux</h6>
                </div>
                </a>
              <a onClick={() => this.props.categoryChanger("udacity")} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1 blue-focus">#udacity</h6>
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
      fetchData: (url) => dispatch(postsFetchData(url)),
      categoryChanger: (category) => dispatch(categoryChanger(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
