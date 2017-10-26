import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {getPosts, getCategories, ratePost, deletePost, getPostsCategorized} from '../actions'
import { Link } from 'react-router'
//import uuidv4 from 'uuid/v4'

class PostDetail extends Component {

componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
}
    

render() {
  return (      
    <div className="container">
            <div className="post-detail-page">
            {this.props.posts[5] &&
              <a key={this.props.posts[5].id} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5><i className="fa fa-angle-right" aria-hidden="true"></i> {this.props.posts[5].title}</h5>
                  <Link to="/"><h6>Go back</h6></Link>
                  {this.props.posts[5].edited ? <small>{moment.utc(this.props.posts[5].timestamp).format("ddd, MMM Do YYYY, h:mm a")}<strong><span className="orange-focus"> - Edited</span></strong></small>
                  :
                  <small>{moment.utc(this.props.posts[5].timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
                </div>
                {
                <p className="mb-1-body">{this.props.posts[5].body}</p>} 
                <small className="post-details">Author: <strong>{this.props.posts[5].author}</strong> • <strong className="score">{this.props.posts[5].voteScore} {this.props.posts[5].voteScore === 1 || this.props.posts[5].voteScore === -1 ? <span className="post-count">point</span> : <span className="post-count">points</span>}</strong> • <strong><span className="orange-focus"><i className="fa fa-tag" aria-hidden="true"></i> {this.props.posts[5].category}</span></strong> • {this.props.posts[5].comments.length} {this.props.posts[5].comments.length === 1 ? "comment" : "comments"}</small>
                <div className="btn-group" role="group" aria-label="up and downvote">
                  <button type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                  <button type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
                </div>                
                <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
                  <button type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                  <button onClick={() => this.props.deletePost(this.props.posts[5].id)}type="button" className="button delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
              </a>
          }
            </div>
            <div>
            {this.props.posts[5] && this.props.posts[5].comments[0] ? this.props.posts[5].comments.map((comment, index) => 
              <a key={comment.id} className="list-group-item list-group-item-action flex-column align-items-start comments">
                <div className="d-flex w-100 justify-content-between">
                  <small className="post-details">Comment by: <strong>{comment.author}</strong></small>
                  <small>{moment.utc(comment.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>
                </div>
                <p className="mb-1-body"><i className="fa fa-angle-right" aria-hidden="true"></i> {comment.body}</p>
                <small className="post-details"><strong className="score">{comment.voteScore} {comment.voteScore === 1 || comment.voteScore === -1 ? <span className="post-count">point</span> : <span className="post-count">points</span>}</strong></small>
                <div className="btn-group" role="group" aria-label="up and downvote">
                  <button type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                  <button type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
                </div>                
                <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
                  <button type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                  <button type="button" className="button delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
              </a>
            ) : 
            <a key="Nocomments" className="list-group-item list-group-item-action flex-column align-items-start comments">
            <p className="mb-1-body">No comments yet. Click here to add one.</p>
            </a>}
            </div>
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
      getPostsCategorized: (category) => dispatch(getPostsCategorized(category)),
      getCategories: ()               => dispatch(getCategories()),
      ratePost: (rate, id, index)     => dispatch(ratePost(rate, id, index)),
      deletePost: (id)                => dispatch(deletePost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
