import React, {Component} from 'react'
import './App.css'
import moment from 'moment'
// import sortBy from 'sort-by'
import {connect} from 'react-redux'
import {getPosts, getCategories, ratePost} from './actions'

// const api = "http://localhost:3001"

class App extends Component {

componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();

}
  
render() {    

  const UP = {option: "upVote"};
  const DN = {option: "downVote"};

  return (      
      <div className="container-fluid">
        {this.props.postsIsLoading ? 
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div> :
        <div className="row">
        <div className="col-10 list-group">
        {this.props.posts[0] && this.props.posts.map((post, index) => 
              <a key={post.id} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1"><i className="fa fa-angle-right" aria-hidden="true"></i> {post.title}</h5>
                  {post.edited ? <small>{moment.utc(post.timestamp).format("ddd, MMM Do YYYY, h:mm a")}<strong><span className="blue-focus"> - Edited</span></strong></small>
                  :
                  <small>{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
                </div>
                {post.body.length > 75 ? <p className="mb-1">{post.body.substring(0, 75)}... <small><span className="blue-focus">Read more.</span></small></p>
                :
                <p className="mb-1">{post.body}</p>  } 
                <small className="post-details">Author: <strong>{post.author}</strong> • <strong className="score">Score: {post.voteScore}</strong> • <strong><span className="blue-focus"><i className="fa fa-tag" aria-hidden="true"></i> {post.category}</span></strong> • {post.comments.length} comment(s)</small>
                <div className="btn-group" role="group" aria-label="up and downvote">
                  <button onClick={() => this.props.ratePost(UP, post, index)} type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                  <button onClick={() => this.props.ratePost(DN, post, index)} type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
                </div>                
                <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
                  <button type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                  <button type="button" className="button"><i className="fa fa-eraser" aria-hidden="true"></i></button>
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
                  <a className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 blue-focus"><i className="fa fa-tag" aria-hidden="true"></i> all • <span className="post-count">{this.props.posts.length} post(s)</span></h6>
                    </div>
                  </a>
                  {this.props.categoriesIsLoading ?         
                  <div className="spinner">
                  <div className="cube1"></div>
                  <div className="cube2"></div>
                  </div> :

                  <div>
                  {this.props.categories[0] && this.props.categories.map((category, index) =>
                  <a key={index} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 blue-focus"><i className="fa fa-tag" aria-hidden="true"></i> {category.name} • <span className="post-count">{this.props.posts.filter(post => post.category === category.name).length} post(s)</span></h6>
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
      posts: state.posts,
      categories: state.categories,
      postsHasErrored: state.postsHasErrored,
      postsIsLoading: state.postsIsLoading,
      categoriesHasErrored: state.categoriesHasErrored,
      categoriesIsLoading: state.categoriesIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getPosts: () => dispatch(getPosts()),
      getCategories: () => dispatch(getCategories()),
      ratePost: (rate, id, index) => dispatch(ratePost(rate, id, index))
      //categoryChanger: (category) => dispatch(categoryChanger(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
