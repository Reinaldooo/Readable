import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {getPosts, getCategories, ratePost, deletePost, getPostsCategorized, sortPosts } from '../actions'
import { Link } from 'react-router-dom'

//import uuidv4 from 'uuid/v4'

class Root extends Component {
state = { 
  user: "Guest"
}  

componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
}

render() {

  const UP = {option: "upVote"};
  const DN = {option: "downVote"};

  return (      
      <div className="container-fluid">
        {this.props.postsAreLoading ? 
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div> :
        <div className="row">
        <div className="col-10 list-group">
        {this.props.posts.length > 0 ? this.props.posts.map((post, index) => 
              <a key={post.id} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <Link className="mb-1" to={`/${post.id}`}><h5><i className="fa fa-angle-right" aria-hidden="true"></i> {post.title}</h5></Link>
                  {post.edited ? <small>{moment.utc(post.timestamp).format("ddd, MMM Do YYYY, h:mm a")}<strong><span className="orange-focus"> - Edited</span></strong></small>
                  :
                  <small>{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
                </div>
                {post.body.length > 75 ? <p className="mb-1">{post.body.substring(0, 75)}... <Link className="orange-focus" to={`/${post.id}`}><small>Read more.</small></Link></p>
                :
                <p className="mb-1">{post.body}</p>} 
                <small className="post-details">Author: <strong>{post.author}</strong> • <strong className="score">{post.voteScore} {post.voteScore === 1 || post.voteScore === -1 ? <span className="post-count">point</span> : <span className="post-count">points</span>}</strong> • <strong><span className="orange-focus"><i className="fa fa-tag" aria-hidden="true"></i> {post.category}</span></strong> • <Link to={`/${post.id}`}>{post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}</Link></small>
                <div className="btn-group" role="group" aria-label="up and downvote">
                  <button onClick={() => this.props.ratePost(UP, post.id, index)} type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                  <button onClick={() => this.props.ratePost(DN, post.id, index)} type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
                </div>                
                <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
                  <button type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                  <button onClick={() => this.props.deletePost(post.id)}type="button" className="button delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
              </a>
          ) : <div className="error">No posts! Why don't you <Link className="error" to="/addpost"><strong>add</strong> one?</Link></div>}
          </div>                
                <div className="col list-group">
                  <a onClick={() => this.props.sortPosts("-timestamp")} className="list-group-item list-group-item-action flex-column align-items-start cursor">
                    <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1 orange-focus">Sort By <strong>Time</strong></h6>
                    </div>
                  </a>
                  <a onClick={() => this.props.sortPosts("-voteScore")} className="list-group-item list-group-item-action flex-column align-items-start cursor">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 orange-focus">Sort By <strong>Score</strong></h6>
                    </div>
                  </a>
                  <a onClick={this.props.getPosts} className="list-group-item list-group-item-action flex-column align-items-start cursor">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 orange-focus"><i className="fa fa-tag" aria-hidden="true"></i> all</h6>
                    </div>
                  </a>
                  {this.props.categoriesAreLoading ?         
                  <div className="spinner">
                  <div className="cube1"></div>
                  <div className="cube2"></div>
                  </div> :
                  <div>
                  {this.props.categories[0] && this.props.categories.map((category, index) =>
                  <a key={index} onClick={() => this.props.getPostsCategorized(category.name)} className="list-group-item list-group-item-action flex-column align-items-start cursor">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 orange-focus"><i className="fa fa-tag" aria-hidden="true"></i> {category.name} • <span className="post-count">{this.props.postsCount.filter(post => post.category === category.name).length} {this.props.postsCount.filter(post => post.category === category.name).length === 1 ? "post" : "posts"}</span></h6>
                    </div>
                  </a>  
                  )}
                  </div>
                  }
                </div>
            </div>
        }
        </div>     
    );
  }
}

const mapStateToProps = (state) => {
  return {
      posts:                state.posts,
      categories:           state.categories,
      postsHasErrored:      state.postsHasErrored,
      postsAreLoading:      state.postsAreLoading,
      categoriesHasErrored: state.categoriesHasErrored,
      categoriesAreLoading: state.categoriesAreLoading,
      postsCount:           state.postsCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getPosts: ()                    => dispatch(getPosts()),
      sortPosts: (sortBy)             => dispatch(sortPosts(sortBy)),
      getPostsCategorized: (category) => dispatch(getPostsCategorized(category)),
      getCategories: ()               => dispatch(getCategories()),
      ratePost: (rate, id, index)     => dispatch(ratePost(rate, id, index)),
      deletePost: (id)                => dispatch(deletePost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
