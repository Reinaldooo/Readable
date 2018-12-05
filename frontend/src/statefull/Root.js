import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import uuidv4 from 'uuid/v4'
import Select from 'react-select'
import { getPosts, getCategories, ratePost, deletePost, getPostsCategorized, sortPosts, addPost, editPost } from '../actions'
import EditPost from './EditPost'
import AddPost from '../stateless/AddPost'
import Post from '../stateless/Post'

const selectOptions = [
  { value: '-voteScore', label: 'Score' },
  { value: '-timestamp', label: 'Date' },
  { value: '-commentsNumber', label: 'Comments Number' }
]
class Root extends PureComponent {
  state = {
    sortFactor: "-voteScore",
    add: false,
    addButtonText: "Add Post",
    edit: false,
    title: '',
    body: '',
    id: ''
  }

  toggleAdd = () => {
    this.state.add ?
      this.setState({
        add: false,
        addButtonText: "Add Post"
      })
      :
      this.setState({
        add: true,
        edit: false,
        addButtonText: "Cancel"
      })
  }

  handleSubmitAdd = (e) => {
    e.preventDefault()
    const post = serializeForm(e.target, { hash: true })
    post.timestamp = Date.now()
    post.id = uuidv4()
    this.props.addPost(post)
    this.setState({ add: false })
  }

  handleEdit = (post, index) => {
    window.scrollTo(0, 0);
    this.setState({
      edit: true,
      body: post.body,
      title: post.title,
      id: post.id,
      indexPost: index
    })
  }

  handleChange = (event, option) => {
    option === "title"
      ?
      this.setState({ title: event.target.value })
      :
      this.setState({ body: event.target.value })
  }

  handleSubmitEdit = (e) => {
    e.preventDefault()
    const post = serializeForm(e.target, { hash: true })
    post.edited = true
    this.props.editPost(post, this.state.id, this.state.indexPost)
    this.setState({ edit: false, body: '', title: '', id: null, indexPost: null })
  }

  handleSort = (e) => {
    this.setState({ sortFactor: e.value });
    this.props.sortPosts(e.value)
  }

  cancelEdit = () => {
    this.setState({ edit: false })
  }

  componentDidMount() {
    if (this.props.category !== "home") {
      const category = this.props.match.params.category
      this.props.getPostsCategorized(category)
      this.props.getCategories()
    } else {
      this.props.getPosts()
      this.props.getCategories()
    }
  }

  componentDidUpdate(prevProps) {
    const currentCategory = this.props.match.params.category
    if (this.props.match.params.category !== prevProps.match.params.category) {
      if (!this.props.match.params.category) {
        this.props.getPosts()
      } else {
        this.props.getPostsCategorized(currentCategory)
      }
    }
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="options">
          <div className="add-post" role="button" onClick={this.toggleAdd}>{this.state.addButtonText}</div>
          <Select
            onChange={this.handleSort}
            options={selectOptions}
            placeholder="Sort by:"
            className="sort-select"
            isSearchable={true}
          />
        </div>
        {
          this.props.postsAreLoading ?
            <div className="spinner">
              <div className="cube1"></div>
              <div className="cube2"></div>
            </div>
            :
            <div className="row">
              <div className="posts">
                {
                  this.state.add &&
                  <AddPost 
                    handleSubmitAdd={this.handleSubmitAdd}
                    toggleAdd={this.toggleAdd}
                  />
                }
                {
                  this.state.edit &&
                  <EditPost
                    handleSubmitEdit={this.handleSubmitEdit}
                    title={this.state.title}
                    body={this.state.body}
                    handleChange={this.handleChange}
                    cancelEdit={this.cancelEdit}
                  />
                }
                {
                  (this.props.posts.length > 0 && !this.state.add)
                  ? this.props.posts.map((post, index) =>
                    <Post
                      key={post.id}
                      post={post}
                      index={index}
                      sortFactor={this.state.sortFactor}
                      ratePost={this.props.ratePost}
                      handleEdit={this.handleEdit}
                      deletePost={this.props.deletePost}
                    />
                  )
                  : <div className="error">
                      {
                        !this.state.add ?
                          <div>No posts! Why don't you <Link className="error" to="/addpost"><strong>add</strong> one?</Link></div>
                          :
                          null
                      }
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
    posts: state.posts,
    categories: state.categories,
    postsHasErrored: state.postsHasErrored,
    postsAreLoading: state.postsAreLoading,
    categoriesHasErrored: state.categoriesHasErrored,
    categoriesAreLoading: state.categoriesAreLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts()),
    sortPosts: (sortBy) => dispatch(sortPosts(sortBy)),
    getPostsCategorized: (category) => dispatch(getPostsCategorized(category)),
    getCategories: () => dispatch(getCategories()),
    ratePost: (rate, id, index, sortFactor, newScore) => dispatch(ratePost(rate, id, index, sortFactor, newScore)),
    deletePost: (id) => dispatch(deletePost(id)),
    addPost: (post) => dispatch(addPost(post)),
    editPost: (post, id, indexPost) => dispatch(editPost(post, id, indexPost))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
