import React from 'react'
import '../App.css'
import Root from './Root'
import PostDetail from './PostDetail'
import Nav from '../stateless/Nav'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class App extends React.Component {

  render() {

    return (
      <Router>
        <div className="app">
          <Nav />
          <Switch>
            <Route exact path='/' render={(props) => <Root {...props} category="home" />}/>
            <Route exact path='/:category' render={(props) => <Root {...props} category={true} />}/>
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
