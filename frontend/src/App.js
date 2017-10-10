import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'User',
  'Content-Type': 'application/json'
}


class App extends Component { 
  

  // Post = (post) =>
  // fetch(`http://localhost:3001/posts`, {
  //   method: 'POST',
  //   headers,
  //   body: JSON.stringify(post)
  // }).then(res => res.json()).then(res => console.log(res))

  Post = (post) =>
  fetch(`http://localhost:3001/posts`, {
    method: 'GET',
    headers
  }).then(res => res.json()).then(res => console.log(res))
  

  // savePost = (post) =>
  // fetch(`${api}/posts`, {
  //  method: 'POST',
  //  headers: headers,
  //  body: JSON.stringify(post)
  // }).then(res => res.json())

// Example Post

  // {
  //   id: '8xf0y6ziyjabvozddfyhfghsdff',
  //   timestamp: 14671668758512,
  //   title: 'test',
  //   body: 'tste',
  //   author: 'test',
  //   category: 'tes' }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro" onClick={this.Post}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
