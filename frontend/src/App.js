import React, {Component} from 'react'
import './App.css'
import { connect } from 'react-redux'
import Root from './components/Root'
import {getPosts, getCategories, ratePost, deletePost, getPostsCategorized} from './actions'
import PostDetail from './components/PostDetail'
var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter
var Route = ReactRouter.Route
var Switch = ReactRouter.Switch
//import uuidv4 from 'uuid/v4'

/*
TODO:

User name form

Detail page design
-Should have form to add comment.
-Form to edit comment

Start routing research

*/

class App extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
}   

render() {

  return (      
      <Router>
        <div> 
          <Switch>
            <Route exact path='/' component={Root} />
            <Route exact path='/:post' component={PostDetail} />
            <Route render={() => <p className="error">Not found.</p>} />
          </Switch>
        </div>
      </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
