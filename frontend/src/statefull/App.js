import React, {Component} from 'react'
import '../App.css'
import Root from './Root'
import PostDetail from './PostDetail'
import Category from './Category'
import Nav from '../stateless/Nav'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

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
            <Route render={() => (
              <div className="error">
              Sorry, we could not find the page you are looking for!
              <Link className="error" to="/"> Click <strong>here</strong> to go back.</Link>
              </div>
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
