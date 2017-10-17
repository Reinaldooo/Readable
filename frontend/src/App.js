import React, {Component} from 'react'
import './App.css'
import moment from 'moment'
// import sortBy from 'sort-by'
import {connect} from 'react-redux'
import {getPosts, categoryChanger, ratePost} from './actions'

// const api = "http://localhost:3001"

class App extends Component {

componentDidMount() {
    this.props.getPosts()
}
  
render() {    

  const UP = {option: "upVote"};
  const DN = {option: "downVote"};

  return (      
      <div className="container-fluid">
        {this.props.isLoading ? 
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div> :
        <div className="row">
        <div className="col-10 list-group">
        {this.props.posts[0] && this.props.posts.map((post, index) => 
              <a key={post.id} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{post.title}</h5>
                  {post.edited ? <small>{moment.utc(post.timestamp).format("ddd, MMM Do YYYY, h:mm a")}<strong><span className="blue-focus"> - Edited</span></strong></small>
                  :
                  <small>{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
                </div>
                {post.body.length > 75 ? <p className="mb-1">{post.body.substring(0, 75)}... <small><span className="blue-focus">Read more.</span></small></p> : <p className="mb-1">{post.body}</p>  } 
                <small>Author: <strong>{post.author}</strong> • Score: <strong>{post.voteScore}</strong> • <span className="blue-focus">#{post.category}</span> • {post.comments.length} comment(s)</small>
                <div className="btn-group" role="group" aria-label="up and downvote">
                  <button onClick={() => this.props.ratePost(UP, post, index)} type="button" className="btn btn-info btn-sm"><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                  <button onClick={() => this.props.ratePost(DN, post, index)} type="button" className="btn btn-info btn-sm"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                </div>                
                <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
                  <button type="button" className="btn btn-info btn-sm">Edit</button>
                  <button type="button" className="btn btn-info btn-sm">Delete</button>
                </div>
              </a>
          )}
          </div>
              <div className="col list-group">
              <a className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Categories</h5>
                </div>
                </a>
                <a onClick={this.props.getPosts} className="list-group-item list-group-item-action flex-column align-items-start">
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
      getPosts: () => dispatch(getPosts()),
      ratePost: (rate, id, index) => dispatch(ratePost(rate, id, index)),
      categoryChanger: (category) => dispatch(categoryChanger(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
