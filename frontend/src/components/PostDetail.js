import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import { ratePost, deletePost, rateComment, deleteComment, getPosts, getCategories } from '../actions'
import { Link } from 'react-router-dom'
//import uuidv4 from 'uuid/v4'

class PostDetail extends Component {

  componentDidMount() {
    if(this.props.posts[0] === undefined) {
    this.props.getPosts()
    this.props.getCategories()
    }  
} 


render() {

  const post = this.props.posts[0] && this.props.posts.find(post => post.id === this.props.match.params.id)
  const indexPost = post && this.props.posts.indexOf(post)
  const UP = {option: "upVote"}
  const DN = {option: "downVote"}

  return (      
    <div className="container">
            {post ?              
            <div className="post-detail-page">
              <Link className="add-comments" to="/addcomment"><small>Add Comment</small></Link>      
              <Link className="add-comments" to="/"><small>Home</small></Link>      
              <a className="list-group-item list-group-item-action flex-column align-items-start border-radius">
                <div className="d-flex w-100 justify-content-between">
                  <h5><i className="fa fa-angle-right" aria-hidden="true"></i> {post.title}</h5>
                  {post.edited ? <small>{moment.utc(post.timestamp).format("ddd, MMM Do YYYY, h:mm a")}<strong><span className="orange-focus"> - Edited</span></strong></small>
                  :
                  <small>{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
                </div>
                {
                <p className="mb-1-body">{post.body}</p>} 
                <small className="post-details">Author: <strong>{post.author}</strong> • <strong className="score">{post.voteScore} {post.voteScore === 1 || post.voteScore === -1 ? <span className="post-count">point</span> : <span className="post-count">points</span>}</strong> • <strong><span className="orange-focus"><i className="fa fa-tag" aria-hidden="true"></i> {post.category}</span></strong> • {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}</small>
                <div className="btn-group" role="group" aria-label="up and downvote">
                <button onClick={() => this.props.ratePost(UP, post.id, indexPost)} type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                <button onClick={() => this.props.ratePost(DN, post.id, indexPost)} type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
                </div>                
                <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
                  <button type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                  <button onClick={() => this.props.deletePost(post.id)}type="button" className="button delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
              </a>
              
            <div>
            {post.comments.length > 0 ? post.comments.map((comment, indexComment) => 
              <a key={comment.id} className="list-group-item list-group-item-action flex-column align-items-start comments">
                <div className="d-flex w-100 justify-content-between">
                  <small className="post-details">Comment by: <strong>{comment.author}</strong></small>
                  <small>{moment.utc(comment.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>
                </div>
                <p className="mb-1-body"><i className="fa fa-angle-right" aria-hidden="true"></i> {comment.body}</p>
                <small className="post-details"><strong className="score">{comment.voteScore} {comment.voteScore === 1 || comment.voteScore === -1 ? <span className="post-count">point</span> : <span className="post-count">points</span>}</strong></small>
                <div className="btn-group" role="group" aria-label="up and downvote">
                  <button onClick={() => this.props.rateComment(UP, comment.id, indexComment, indexPost)} type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                  <button onClick={() => this.props.rateComment(DN, comment.id, indexComment, indexPost)} type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
                </div>                
                <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
                  <button type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                  <button onClick={() => this.props.deleteComment(comment.id, indexComment, indexPost)} type="button" className="button delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
              </a>
            ) : 
            <a key="Nocomments" className="list-group-item list-group-item-action flex-column align-items-start comments">
            <p className="mb-1-body">No comments yet.</p>
            </a>}
            </div>
        </div>
        :
        <div>
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div>
        <div className="error">
          Looking for your post. If this screen show up for more than 5 seconds, this post might have been deleted.
          <Link className="error" to="/">Click <strong>here</strong> to go back.</Link>
        </div>
        </div>
      }
    </div>    
    );
  }
}

const mapStateToProps = (state) => {
  return {
      posts:                state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      ratePost: (rate, id, index)                      => dispatch(ratePost(rate, id, index)),
      deletePost: (id)                                 => {
        dispatch(deletePost(id));
        setTimeout(function(){ window.location = "/"; }, 500);
      },
      rateComment: (rate, id, indexComment, indexPost) => dispatch(rateComment(rate, id, indexComment, indexPost)),
      deleteComment: (id, indexComment, indexPost)     => dispatch(deleteComment(id, indexComment, indexPost)),
      getPosts: ()                                     => dispatch(getPosts()),
      getCategories: ()                                => dispatch(getCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
