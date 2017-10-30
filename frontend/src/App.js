import React, {Component} from 'react'
import './App.css'
import { connect } from 'react-redux'
import Root from './components/Root'
import {getPosts, getCategories, getPostsCategorized} from './actions'
import PostDetail from './components/PostDetail'
import Category from './components/Category'
import Nav from './components/Nav'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
//import uuidv4 from 'uuid/v4'

class App extends Component {

render() {

  return (      
      <Router>
        <div> 
          <Nav categories={this.props.categories}/>
          <Switch>
            <Route exact path='/' component={Root} />
            <Route exact path='/:category' component={Category} />
            <Route exact path='/:category/:id' component={PostDetail} />
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
    categoriesAreLoading: state.categoriesAreLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: ()                    => dispatch(getPosts()),
    getPostsCategorized: (category) => dispatch(getPostsCategorized(category)),
    getCategories: ()               => dispatch(getCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
