import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ratePost, deletePost, rateComment, deleteComment, getPosts, getCategories, editPost, addComment, editComment } from '../actions'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import uuidv4 from 'uuid/v4'
import EditPost from './EditPost';
import EditComment from '../stateless/EditComment';
import AddComment from '../stateless/AddComment';
import PostDetailed from '../stateless/PostDetailed';
import Comment from '../stateless/Comment';

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
    if (this.props.posts[0] === undefined) {
      this.props.getPosts()
      this.props.getCategories()
    }
  }

  cancelEdit = () => {
    this.setState({ editComment: false, edit: false, backButton: true })
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
    this.setState({ addComment: false, backButton: true })
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
    this.setState({ edit: false, body: '', title: '', id: null, indexPost: null, backButton: true })
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
    this.setState({ edit: false, editComment: false, body: '', title: '', id: null, indexPost: null, backButton: true })
  }

  cancelCommentEditOrAdd = () => {
    this.setState({ editComment: false, addComment: false, edit: false, backButton: true })
  }
  
  handleChange = (event, option) => {
    option === "title"
      ?
      this.setState({ title: event.target.value })
      :
      this.setState({ body: event.target.value })
  }

  render() {

    const post = this.props.posts[0] && this.props.posts.find(post => post.id === this.props.match.params.id)
    const indexPost = post && this.props.posts.indexOf(post)
    const UP = { option: "upVote" }
    const DN = { option: "downVote" }

    return (
      <div className="container post-detail-margin">
        {
          this.state.addComment &&
          <AddComment
            handleSubmitAdd={this.handleSubmitAdd}
            cancelCommentEditOrAdd={this.cancelCommentEditOrAdd}
          />
        }
        {
          this.state.edit &&
          <EditPost
            handleSubmitEdit={this.handleSubmitEdit}
            body={this.state.body}
            handleChange={this.handleChange}
            cancelEdit={this.cancelEdit}
            title={this.state.title}
          />
        }
        {
          this.state.editComment &&
          <EditComment 
            handleSubmitEditComment={this.handleSubmitEditComment}
            body={this.state.body}
            handleChange={this.handleChange}
            cancelCommentEditOrAdd={this.cancelCommentEditOrAdd}
          />
        }

        {post ?
          <div className="post-detail-page">
            {
              this.state.backButton &&
              <div>
                <Link className="close-post-detail" to="/">Close</Link>
                <small onClick={() => { window.scrollTo(0, 0); this.setState({ addComment: true, backButton: false }) }} className="add-comments">Add Comment</small>
              </div>
            }
            <PostDetailed 
              post={post}
              indexPost={indexPost}
              ratePost={this.props.ratePost}
              handleEditPost={this.handleEditPost}
              deletePost={this.props.deletePost}
              UP={UP}
              DN={DN}
            />
            <div className="comments">
              {
                post.comments.length > 0 ? post.comments.map((comment, indexComment) =>
                <Comment 
                  key={comment.id}
                  comment={comment}
                  rateComment={this.props.rateComment}
                  UP={UP}
                  DN={DN}
                  indexPost={indexPost}
                  post={post}
                  indexComment={indexComment}
                  handleEditComment={this.handleEditComment}
                  deleteComment={this.props.deleteComment}
                />
              ) 
              :
                <li key="Nocomments" className="list-group-item list-group-item-action flex-column align-items-start comments">
                  <p className="mb-1-body">No comments yet.</p>
                </li>
              }
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
    ratePost: (rate, id, index, sortFactor, score) => dispatch(ratePost(rate, id, index, sortFactor, score)),
    deletePost: (id) => {
      dispatch(deletePost(id));
      setTimeout(function () { window.location = "/"; }, 500);
    },
    rateComment: (rate, id, indexComment, indexPost, newScore) => dispatch(rateComment(rate, id, indexComment, indexPost, newScore)),
    deleteComment: (id, indexComment, indexPost) => dispatch(deleteComment(id, indexComment, indexPost)),
    getPosts: () => dispatch(getPosts()),
    getCategories: () => dispatch(getCategories()),
    editPost: (post, id, indexPost) => dispatch(editPost(post, id, indexPost)),
    addComment: (comment, indexPost) => dispatch(addComment(comment, indexPost)),
    editComment: (id, indexPost, indexComment, comment) => dispatch(editComment(id, indexPost, indexComment, comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
