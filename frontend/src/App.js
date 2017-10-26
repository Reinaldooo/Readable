import React, {Component} from 'react'
import './App.css'
import { connect } from 'react-redux'
import { ratePost, deletePost } from './actions'
import Root from './components/Root'
import PostDetail from './components/PostDetail'
import { Route } from 'react-router-dom'
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

render() {

  return (      
      <div>
        <Route exact path='/test' component={PostDetail}/>
        <Route exact path='/' component={Root}/>
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
      ratePost: (rate, id, index)     => dispatch(ratePost(rate, id, index)),
      deletePost: (id)                => dispatch(deletePost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
