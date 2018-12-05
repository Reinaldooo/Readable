import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import { ratePost, deletePost, rateComment, deleteComment, getPosts, getCategories, editPost, addComment, editComment } from '../actions'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import uuidv4 from 'uuid/v4'

class PostDetail extends Component {

state = { 
    edit: false,
    editComment: false,
    title: '',
    body: '',
    id: '',
    addComment: false,
    backButton: true
}  

componentDidMount() {
  if(this.props.posts[0] === undefined) {
  this.props.getPosts()
  this.props.getCategories()
}  
}

handleSubmitAdd = (e) => {
  e.preventDefault()
  const post = this.props.posts.find(post => post.id === this.props.match.params.id)
  const comment = serializeForm(e.target, { hash: true })
  const indexPost = this.props.posts.indexOf(post)
  comment.timestamp = Date.now()
  comment.id = uuidv4()
  comment.parentId = this.props.match.params.id
  this.props.addComment(comment, indexPost)
  this.setState({addComment: false, backButton: true})
}

handleEditPost = (post) => {
  window.scrollTo(0, 0);
  this.setState({
    edit: true,
    editComment: false, 
    body: post.body, 
    title: post.title, 
    id: post.id, 
    indexPost: this.props.posts.indexOf(post),
    backButton: false
  })
}

handleSubmitEdit = (e) => {
  e.preventDefault()
  const post = serializeForm(e.target, { hash: true })
  post.edited = true
  this.props.editPost(post, this.state.id, this.state.indexPost)
  this.setState({edit: false, body: '', title: '', id: null, indexPost: null, backButton:true})
}

handleEditComment = (comment, indexComment, post) => {
  window.scrollTo(0, 0);
  this.setState({
    editComment: true,
    edit: false,
    body: comment.body, 
    id: comment.id, 
    indexPost: this.props.posts.indexOf(post),
    indexComment,
    backButton: false
  })
}

handleSubmitEditComment = (e) => {
  e.preventDefault()
  const comment = serializeForm(e.target, { hash: true })
  comment.timestamp = Date.now()
  this.props.editComment(this.state.id, this.state.indexPost, this.state.indexComment, comment)
  this.setState({edit: false, editComment: false, body: '', title: '', id: null, indexPost: null, backButton:true})
}

handleChange(event) {
  this.setState({body: event.target.value})
}

render() {

  const post = this.props.posts[0] && this.props.posts.find(post => post.id === this.props.match.params.id)
  const indexPost = post && this.props.posts.indexOf(post)
  const UP = {option: "upVote"}
  const DN = {option: "downVote"}

  return (      
    <div className="container post-detail-margin">
      {this.state.addComment && 
          <div className="list-group-item list-group-item-action flex-column align-items-start add-post-form">
            <form onSubmit={this.handleSubmitAdd} className="create-post-form">
               <div className="create-post-details">
                  <input type="text" name="author" placeholder="Username"/>
                  <textarea placeholder="Comment" name="body" rows="3" cols="50" />
                  <button>Add Comment</button>
                  <button onClick={() => this.setState({addComment: false, edit: false, backButton: true})}>Cancel</button>
              </div>
            </form>
          </div>
          }

        {this.state.edit && 
          <div className="list-group-item list-group-item-action flex-column align-items-start add-post-form">
            <form onSubmit={this.handleSubmitEdit} className="create-post-form">
               <div className="create-post-details">
                    <textarea value={this.state.body} onChange={(e) => this.handleChange(e)} placeholder="Post content" name="body" rows="3" cols="50" />
                  <button>Edit Post</button>
                  <button onClick={() => this.setState({editComment: false, edit: false, backButton: true})}>Cancel</button>
              </div>
            </form>
          </div>
          }
          {this.state.editComment && 
          <div className="list-group-item list-group-item-action flex-column align-items-start add-post-form">
            <form onSubmit={this.handleSubmitEditComment} className="create-post-form">
               <div className="create-post-details">
                    <textarea value={this.state.body} onChange={(e) => this.handleChange(e)} placeholder="Post content" name="body" rows="3" cols="50" />
                  <button>Edit Comment</button>
                  <button onClick={() => this.setState({editComment: false, edit: false, backButton: true})}>Cancel</button>
              </div>
            </form>
          </div>
          }
          
            {post ?              
            <div className="post-detail-page">
              {this.state.backButton &&
              <div>
              <Link className="close-post-detail" to="/">Close</Link>
              <small onClick={() => { window.scrollTo(0, 0); this.setState({addComment: true, backButton: false})}} className="add-comments">Add Comment</small>
              </div>
              }
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
                  <button onClick={() => this.handleEditPost(post)} type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
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
                  <button onClick={() => this.handleEditComment(comment, indexComment, post)} type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
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
      posts: state.posts
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
      getCategories: ()                                => dispatch(getCategories()),      
      editPost: (post, id, indexPost)         => dispatch(editPost(post, id, indexPost)),
      addComment: (comment, indexPost)        => dispatch(addComment(comment, indexPost)),
      editComment: (id, indexPost, indexComment, comment)        => dispatch(editComment(id, indexPost, indexComment, comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
