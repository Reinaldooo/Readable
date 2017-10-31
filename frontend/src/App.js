import React, {Component} from 'react'
import './App.css'
import Root from './components/Root'
import PostDetail from './components/PostDetail'
import Category from './components/Category'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import uuidv4 from 'uuid/v4'

class App extends Component {

render() {

  return (      
      <Router>
        <div> 
          <Nav/>
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

export default App;
